// ==========================================================
// Core logic for reading and rewriting a template's editable
// content (text + image/audio URLs) that's embedded inside the
// Next.js "flight" payload of each preview .html file.
//
// How it works:
//   Each preview page streams its data as a series of
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
