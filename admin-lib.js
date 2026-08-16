// ==========================================================
// Core logic for reading and rewriting a template's editable
// content (text + image/audio URLs).
//
// Two source formats, both ending up as a plain JS object handed
// to the caller:
//
// FORMAT 1 — cutiepage.in mirrors (templates/*.html, most of them).
//   Each page streams its data as a series of
//     <script>self.__next_f.push([1, "..."])</script>
//   tags. The browser just concatenates all of these strings
//   together in order before parsing them. So to edit the data
//   safely we:
//     1. find every push([1, "...")]) tag
//     2. decode + concatenate their string payloads into one
//        "full stream" string
//     3. find the `"snapshot":{...}` object inside that stream
//        (this holds every template's editable content)
//     4. parse it as JSON, hand it to the caller
//     5. on save: re-serialize the edited snapshot back into
//        the stream, then replace ALL the original push tags
//        with a single consolidated one (functionally identical
//        to the original many-small-chunks version).
//
// FORMAT 2 — hand-built templates with no server-supplied data at
// all (e.g. the "anuj" mirrors), where every string is hardcoded
// straight into a minified React component's JSX. There's no real
// "snapshot" prop to find, so instead of faking one, these get a
// one-time hand patch (see anuj-*-integration notes) that rewrites
// each hardcoded string to `(window.__PAGE_DATA__&&window.__PAGE_DATA__.field)||"original text"`,
// falling back to the original if no data is present. The page's
// own HTML then carries the actual values in a plain
//   <script>window.__PAGE_DATA__={...}</script>
// tag, injected as the very first thing in <head> (must run before
// the page's own async chunk scripts, which can execute in any
// order relative to each other). Reading/writing this is simpler
// than Format 1 — no concatenation, just find the object literal
// and swap it — so it's tried first; templates using Format 1 don't
// have this marker at all and fall through unaffected.
//
// Both admin.js and customize.js's form-building code hard-depend on
// the shape `{ sections: [{ id, values: {...} }] }` — that's what
// every Format 1 template's real snapshot already looks like, so
// there was never a reason to teach either UI file a second shape.
// Format 2's on-disk data is just a flat `{ field: value }` object
// (kept flat so the patched chunk can read `window.__PAGE_DATA__.field`
// directly, no path-reaching into a sections array). An optional second
// tag, `window.__PAGE_DATA_SECTIONS__=[{id,keys:[...]}]`, is static
// grouping metadata for the UI only — which fields the customize form
// should visually cluster into which collapsible card, and in what
// order. extractSnapshot uses it (when present) to split the flat data
// into multiple sections; without it, everything lands in one
// synthetic `content` section (the original behavior). writeSnapshot
// always flattens every section's `values` back into one object on
// save — the grouping is a read-side display concern, never persisted
// per-edit, so the metadata tag itself is left untouched on write.
// Neither UI file needs to know Format 2 exists.
// ==========================================================

const PUSH_RE = /<script>\s*self\.__next_f\.push\(\[1,\s*("(?:[^"\\]|\\.)*")\s*\]\)\s*<\/script>/g;

function findMatchingBrace(str, openIndex) {
  let depth = 0;
  let inString = false;
  for (let i = openIndex; i < str.length; i++) {
    const ch = str[i];
    if (inString) {
      if (ch === '\\') { i++; continue; }
      if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') { inString = true; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  throw new Error('no matching brace found');
}

function findMatchingBracket(str, openIndex) {
  let depth = 0;
  let inString = false;
  for (let i = openIndex; i < str.length; i++) {
    const ch = str[i];
    if (inString) {
      if (ch === '\\') { i++; continue; }
      if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') { inString = true; continue; }
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) return i;
    }
  }
  throw new Error('no matching bracket found');
}

const PAGE_DATA_MARKER = 'window.__PAGE_DATA__=';
const PAGE_DATA_SECTIONS_MARKER = 'window.__PAGE_DATA_SECTIONS__=';

function findPageDataObject(html) {
  const idx = html.indexOf(PAGE_DATA_MARKER);
  if (idx === -1) return null;
  const openBrace = html.indexOf('{', idx + PAGE_DATA_MARKER.length);
  const closeBrace = findMatchingBrace(html, openBrace);
  return { openBrace, closeBrace };
}

function findPageDataSections(html) {
  const idx = html.indexOf(PAGE_DATA_SECTIONS_MARKER);
  if (idx === -1) return null;
  const openBracket = html.indexOf('[', idx + PAGE_DATA_SECTIONS_MARKER.length);
  const closeBracket = findMatchingBracket(html, openBracket);
  return JSON.parse(html.slice(openBracket, closeBracket + 1));
}

function extractStream(html) {
  const matches = [...html.matchAll(PUSH_RE)];
  if (matches.length === 0) throw new Error('no flight-payload scripts found in this file');

  let fullStream = '';
  for (const m of matches) {
    fullStream += JSON.parse(m[1]);
  }

  const firstStart = html.indexOf(matches[0][0]);
  const lastMatch = matches[matches.length - 1];
  const lastEnd = html.indexOf(lastMatch[0]) + lastMatch[0].length;

  return { fullStream, firstStart, lastEnd };
}

function extractSnapshot(html) {
  const pageData = findPageDataObject(html);
  if (pageData) {
    const flat = JSON.parse(html.slice(pageData.openBrace, pageData.closeBrace + 1));
    const sectionsMeta = findPageDataSections(html);
    if (sectionsMeta) {
      const used = new Set();
      const sections = sectionsMeta.map(({ id, keys }) => {
        const values = {};
        for (const k of keys) { values[k] = flat[k]; used.add(k); }
        return { id, values };
      });
      const leftoverKeys = Object.keys(flat).filter((k) => !used.has(k));
      if (leftoverKeys.length) {
        const values = {};
        for (const k of leftoverKeys) values[k] = flat[k];
        sections.push({ id: 'other', values });
      }
      return { sections };
    }
    return { sections: [{ id: 'content', values: flat }] };
  }
  const { fullStream } = extractStream(html);
  const key = '"snapshot":';
  const keyIdx = fullStream.indexOf(key);
  if (keyIdx === -1) throw new Error('no "snapshot" object found in this template');
  const openBrace = fullStream.indexOf('{', keyIdx + key.length);
  const closeBrace = findMatchingBrace(fullStream, openBrace);
  const jsonText = fullStream.slice(openBrace, closeBrace + 1);
  return JSON.parse(jsonText);
}

function writeSnapshot(html, newSnapshot) {
  const pageData = findPageDataObject(html);
  if (pageData) {
    const flat = {};
    for (const section of newSnapshot.sections || []) {
      Object.assign(flat, section.values || {});
    }
    const newJson = JSON.stringify(flat);
    return html.slice(0, pageData.openBrace) + newJson + html.slice(pageData.closeBrace + 1);
  }
  const { fullStream, firstStart, lastEnd } = extractStream(html);
  const key = '"snapshot":';
  const keyIdx = fullStream.indexOf(key);
  const openBrace = fullStream.indexOf('{', keyIdx + key.length);
  const closeBrace = findMatchingBrace(fullStream, openBrace);

  const newSnapshotJson = JSON.stringify(newSnapshot);
  const newFullStream =
    fullStream.slice(0, openBrace) + newSnapshotJson + fullStream.slice(closeBrace + 1);

  const newScriptTag = `<script>self.__next_f.push([1, ${JSON.stringify(newFullStream)}])</script>`;
  return html.slice(0, firstStart) + newScriptTag + html.slice(lastEnd);
}

module.exports = { extractSnapshot, writeSnapshot };
