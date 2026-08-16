# How to add a new template

This covers the full pipeline for taking a template — whether it's a mirror
of a cutiepage.in page or a hand-built Next.js export like the "anuj"
templates — and turning it into something the admin panel and public site
can serve, customize, and share. There are **two source formats**; figure
out which one you're dealing with first, because the process is different.

## Which format is this?

Fetch/open the template's `index.html` (or main HTML file) and search it:

- Contains `<script>self.__next_f.push([1, "...` tags (a Next.js flight
  payload stream)? → **Format 1** (see below). This is what every
  cutiepage.in mirror looks like.
- No flight payload, just a static-exported page where every string is
  baked directly into a minified React chunk under
  `_next/static/chunks/app/`? → **Format 2** (the "anuj"-style templates).
  This is the format you'll hit for any hand-built/hand-mirrored Next.js
  static export.

Both end up readable/writable through the exact same shared module,
[`admin-lib.js`](admin-lib.js) — its top-of-file comment documents the two
formats in more technical detail than this doc. Neither `admin.js` nor
`customize.js` (the UI files) need to know which format a template uses;
all format-specific complexity is absorbed into `admin-lib.js`'s
`extractSnapshot`/`writeSnapshot` functions.

---

## Format 1 — cutiepage.in mirrors

These already ship a real `"snapshot":{...}` object inside their flight
stream — there's no hand-patching of JS required, just careful capturing.

**Checklist, in order:**

1. Fetch `https://www.cutiepage.in/preview/<slug>?embed=1` directly — **not**
   `/templates/<slug>`, which is the full commerce/marketing page (cart,
   reviews, pricing) that depends on a live backend and has no snapshot
   data at all. The `?embed=1` query param is required — without it you
   get a "← Back to details" chrome bar baked into the page.
   ```
   curl -H "User-Agent: Mozilla/5.0" https://www.cutiepage.in/preview/<slug>?embed=1
   ```
   Rewrite `https://cdn.cutiepage.in/` and `//cdn.cutiepage.in/` to `/cdn/`
   with sed.
2. Check for missing `/_next/static/...` (js/css/woff2) references against
   what's already in `extracted-templates/_next/static/`. Two are always
   "missing" and safe to ignore: the `%5BtemplateSlug%5D`-encoded duplicate
   of a path that exists decoded as `[templateSlug]`, and
   `polyfills-42372ed130431b0a.js` (legacy-browser-only, never actually
   needed).
3. Load the page in a real browser (Playwright) and watch for 404s on
   `.js`/`.css` under `/_next/static/chunks/` specifically — these are
   **dynamically-imported chunks**, referenced only at runtime, never as a
   literal string in the HTML, so a static grep will miss them. Fetch and
   copy in any that 404.
4. **If your source was a browser-saved "complete webpage" archive** (a
   folder literally named `1`, or anything with per-domain subfolders),
   check every chunk for corruption: `grep -o '? \.' file` and
   `grep -o '? ?' file`. Non-zero means JS `?.`/`??` tokens got mangled —
   fix with `sed -i 's/? \./?./g; s/? ?/??/g' file`. Chunks fetched
   directly via `curl` have never shown this; only archive-folder copies
   have.
5. Re-test in a real browser after each chunk addition; repeat step 3 —
   fixing one missing chunk sometimes reveals hydration proceeding further
   and needing another. Confirm zero `pageerror` events besides the
   ubiquitous harmless "Minified React error #418" hydration-mismatch
   warning (present on every template, old and new).
6. Verify admin-editability:
   ```js
   node -e "console.log(require('./admin-lib.js').extractSnapshot(require('fs').readFileSync('templates/<slug>.html','utf8')))"
   ```
   Should print `{sections: [...]}`. "no snapshot object found" means step
   1 used the wrong route.
7. Generate the gallery thumbnail (see **Thumbnails** section below).

---

## Format 2 — hand-built / statically-exported templates (the "anuj" style)

No server ever supplies data here — every string is hardcoded straight
into a minified React component's JSX. Instead of faking a snapshot, these
get a **one-time hand patch**: every hardcoded string is rewritten to read
from a global object, and the actual values are injected as inline data in
the page's own `<head>`.

### The pattern

Original chunk code:
```js
children: "Happy Birthday!"
```
Patched:
```js
children: (window.__PAGE_DATA__&&window.__PAGE_DATA__.heroTitle)||"Happy Birthday!"
```
Injected as the **first thing in `<head>`** (must run before the page's own
async chunk scripts, which can execute in any order relative to each
other):
```html
<script>
window.__PAGE_DATA__={"heroTitle":"Happy Birthday!", "heroSubtitle":"...", ...};
window.__PAGE_DATA_SECTIONS__=[
  {"id":"Loading Screen","keys":["loadingText"]},
  {"id":"Intro","keys":["heroTitle","heroSubtitle"]}
];
</script>
```
`window.__PAGE_DATA_SECTIONS__` is optional, UI-only grouping metadata —
it decides which collapsible section each field appears under in the
customize/admin form, and in what order. `admin-lib.js`'s `extractSnapshot`
uses it when present to split the flat data into multiple sections;
without it, everything lands in one synthetic `content` section. On save,
`writeSnapshot` always flattens every section's values back into one flat
object — the grouping is read-side only, never persisted per-edit, so you
never have to keep the sections list in sync with edits.

**Any array of repeated items** (a list of `{title, desc}` cards, a list
of compliments, photo captions, etc.) must be **flattened into
individually-editable numbered fields** — `item1Title`, `item1Desc`,
`item2Title`, ... — never left as one raw array field. The customize form
renders object/array-valued fields as read-only, so this is required for
them to actually be editable.

### Step-by-step

1. **Copy assets.** Copy the entire source folder's static assets into
   `extracted-templates/cdn/anuj-templates/<slug>/` — `_next/`, plus
   whatever the template actually references: `images/`, `gifs/`,
   `audio/`, `stickers/`, `favicon.ico`.

2. **Namespace every asset path.** Every root-relative path reference must
   become `/cdn/anuj-templates/<slug>/...`, in **both** the copied JS/CSS
   files and the final HTML. This includes:
   - `/_next/...` (script/link tags, and references inside JS)
   - `/favicon.ico` — check **both** forms: the plain `<link rel="icon"
     href="/favicon.ico">` tag in the raw HTML, **and** the escaped
     `\"href\":\"/favicon.ico\"` form that shows up again inside the
     Next.js flight-payload metadata script that re-renders the same
     `<link>` client-side. Missing the second form is an easy, easy-to-miss
     bug — the page looks fine, only the tab icon silently 404s.
   - `/images/...`, `/gifs/...`, `/audio/...`, `/stickers/...`
   - The webpack/turbopack runtime's own internal public-path string —
     something like `r.p="/_next/"` or `let t="/_next/"` inside the
     runtime chunk. Grep for `"/_next/"` as a standalone string literal
     assignment (not part of a longer path) to find it.

   **Before running any rewrite regex, check if paths are already
   rewritten** (grep for un-prefixed `"/_next`, `"/images`, etc. — zero
   matches means someone already ran this step). Blindly re-running a
   rewrite on already-rewritten paths matches the `/_next/` substring
   *inside* the already-correct `/cdn/anuj-templates/<slug>/_next/` path
   and double-prefixes it, corrupting every reference in the file. This
   happens most often when resuming a template that a previous, cut-off
   session or agent had partially finished.

3. **Catalog every editable string.** Read through the page's JS chunk(s)
   under `_next/static/chunks/app/` (there may be more than one
   contributing to a single page — check for dynamically-imported chunks
   too). Mentally walk the actual user flow start to finish — loading
   screen → intro → main content → any interactive steps (games, forms,
   reveals) → ending — so you don't miss a screen that only renders after
   a click. A regex sweep for `children:"..."` will usually miss:
   - Array-form JSX children: `children:["some text", ...]`
   - Text assigned to a variable and interpolated later
   - Emoji-adjacent strings where the emoji itself is stored as escaped
     surrogate-pair *text* (see gotcha below) and breaks a naive regex

   The most reliable way to catch what a static sweep misses: do an
   initial catalog pass, then do the Playwright click-through (step 6)
   *before* declaring the catalog complete, and read `page.textContent()`
   at each screen to compare against what you patched. If something on
   screen isn't backed by a `window.__PAGE_DATA__` field, go find it in
   the chunk and add it.

4. **Patch each string.** Replace every cataloged string with the
   `(window.__PAGE_DATA__&&window.__PAGE_DATA__.fieldName)||"original
   text"` pattern.

   **Gotcha — quote-wrapping.** Your replacement needle must include the
   surrounding `children:"..."` (or `varName="..."`, or JSX attribute)
   wrapper, not just the inner text. If you replace only the inner text,
   the original wrapping quotes are left stranded around your injected
   expression, producing something like `children:"(window.__PAGE_DATA__...)||"original"""`
   — a syntax error that only surfaces when you run a `new Function()`
   check (or worse, doesn't throw at all and just silently corrupts the
   chunk). Always construct the needle as the *whole* assignment,
   including its quotes/braces.

   **Gotcha — emoji encoding.** Some minified JS stores emoji as literal
   UTF-8 characters (an actual 💫 glyph in the file); others store the
   *literal text* of an escaped surrogate pair (`💫` as 12
   literal backslash/u/hex characters, not a real emoji glyph at all).
   Don't guess from how your editor or a Read tool renders the string —
   write a tiny Node script that reads the raw file and checks which form
   is actually present (`s.includes('💫')` vs `s.includes('\\uD83D\\uDCAB')`)
   before building your replacement needle.

   **Before every replacement**, verify uniqueness:
   `s.split(needle).length - 1` should equal exactly how many times you
   intend to replace (usually exactly 1). Never do a blind
   find-and-replace-all on a needle you haven't confirmed the count for —
   a needle that happens to match twice will silently corrupt the second
   occurrence too.

   **Don't forget to wire up every field you catalog.** If you add a field
   to your `DEFAULTS`/values object but forget the corresponding
   needle/replacement, the field will appear in the customize form and
   accept edits, but editing it will have zero effect on the live page.
   After patching, sanity-check that your replacement count matches your
   field count.

5. **Remove the watermark.** These templates carry an "anujbuilds.in" or
   "@anujbuilds" watermark in **two places**: a literal text div in the
   raw pre-hydration `index.html`, and a re-rendered JSX element inside
   the page's JS chunk. You must remove both, or the watermark flashes
   back in after client-side hydration replaces the pre-hydration content.
   Verify with a case-insensitive grep for zero remaining matches across
   the final HTML.

   Note: some templates also have a legitimate, unrelated
   `anujbuilds.in/products/<slug>` link inside a "want this for your own?"
   upsell popup — that's a real feature of the source template, not a
   watermark, and should be left alone. Only remove the literal branding
   text/element, not every string containing "anujbuilds".

6. **Syntax-check every patched file.**
   ```js
   node -e "new Function(require('fs').readFileSync('path/to/chunk.js','utf8'))"
   ```
   Run this on every JS file you touched, immediately after patching it,
   before moving on. This is the fastest way to catch the quote-wrapping
   gotcha above before it's buried under more changes.

7. **Write the final template file** to
   `extracted-templates/templates/<slug>.html`, with the
   `window.__PAGE_DATA__`/`window.__PAGE_DATA_SECTIONS__` script as the
   very first tag inside `<head>`.

8. **Round-trip verify** through the actual shared module, not just by
   eyeballing the JSON:
   ```js
   const {extractSnapshot, writeSnapshot} = require('./admin-lib.js');
   const fs = require('fs');
   const html = fs.readFileSync('templates/<slug>.html','utf8');
   const snap = extractSnapshot(html);
   // check snap.sections.length and total field count match what you patched
   const edited = writeSnapshot(html, snap);
   const reExtracted = extractSnapshot(edited);
   // confirm reExtracted deep-equals snap
   ```

9. **Real-browser verification with Playwright.** The site server
   (`site-server.js`) reads template HTML fresh from disk on every
   request — no restart needed for HTML edits. (It **does** cache
   `require()`'d modules like `admin-lib.js` in memory, so if you ever
   change that file, the running `site-server.js`/`admin-server.js`
   processes need a restart to pick it up — find their PIDs via
   `netstat -ano` or `Get-CimInstance Win32_Process`, stop, restart.)

   ```js
   const { chromium } = require('playwright');
   const browser = await chromium.launch();
   const page = await browser.newPage({ viewport: { width: 480, height: 800 } });
   page.on('pageerror', e => console.log('ERROR', e.message));
   page.on('response', r => {
     if (r.status() === 404 && r.url().includes('localhost:8800')) console.log('404', r.url());
   });
   await page.goto('http://localhost:8800/templates/<slug>.html', { waitUntil: 'networkidle' });
   // click through the ENTIRE flow, screen by screen
   ```
   Only `localhost:8800` 404s matter — external font/analytics 404s are
   expected and fine. Click through every step of the real flow (not just
   the first screen) — use `page.click('text=...')` for specific buttons,
   or a generic `button:visible` last-click strategy for flows with
   several buttons.  Zero `pageerror` events and zero local 404s required.

10. **Grep for leftover un-namespaced paths**, in both the final HTML and
    every copied asset file:
    ```
    grep -rloE '"/_next|"/images|"/favicon|"/gifs|"/stickers|"/audio' templates/<slug>.html cdn/anuj-templates/<slug>/
    ```
    Must be zero matches. **One known false positive**: Next's built-in
    image-loader code does `.indexOf("/_next/")` as a runtime substring
    check on an already-full URL — that's fine, it's not a hardcoded
    asset reference, leave it alone.

    Also check the *escaped* form for favicon specifically —
    `grep -oc '\\\\"href\\\\":\\\\"/favicon'` — since the plain-form grep
    above won't catch it inside the flight-payload metadata script.

11. **Check referenced assets actually exist on disk**, not just that
    paths are correctly prefixed — a correctly-namespaced path to a file
    that was never copied still 404s:
    ```js
    // grep every /cdn/anuj-templates/<slug>/....(png|jpg|gif|mp3|...) reference
    // out of the HTML + JS/CSS, then fs.existsSync() each one
    ```
    If the source capture is missing an asset entirely (this has happened
    — some source dumps are missing an `images/` or `audio/` folder that
    the page code still references), don't fabricate new imagery. Reuse
    the same generically-named placeholder asset from the closest sibling
    template already in the repo (e.g. `friendship-day-website` reused
    `until-we-meet-website`'s `1.avif`-`4.avif` set; `miss-you-site`
    reused `miss-you-v2`'s `images/`+`audio/bg.mp3`;
    `anniversary-site` reused `anniversary-v2`'s `bg.mp3`) — as long as
    the filenames/roles line up and it's not exposed as an editable field,
    this is the established, acceptable fallback.

12. **Generate the gallery thumbnail** (see **Thumbnails** below).

13. **Clean up.** Delete every scratch/patch/verification script you
    created inside `extracted-templates/` — don't leave `_scratch_*.js` or
    similar litter behind. Confirm you haven't touched `admin-lib.js`,
    `admin.js`, `customize.js`, `site.css`, or any other template's files.

---

## Thumbnails

Every template's gallery card needs `extracted-templates/admin-thumbs/<slug>.png`
— there's no auto-generation, skip it and the gallery shows a broken image
icon. Generate with Playwright:
```js
const page = await browser.newPage({ viewport: { width: 480, height: 800 } });
await page.goto('http://localhost:8800/templates/<slug>.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500-3000); // let animations/transitions settle
await page.screenshot({ path: 'admin-thumbs/<slug>.png', clip: { x: 0, y: 0, width: 480, height: 640 } });
```
Pick a wait time and moment that lands on a representative, visually clean
frame — not mid-transition, not the loading spinner if you can help it.

---

## Naming

Slugs should read as generic template names, not carry source branding —
e.g. `birthday-site`, not `anuj-birthday-site`. If you rename a slug after
the fact, rename both `templates/<old>.html`→`<new>.html` and
`admin-thumbs/<old>.png`→`<new>.png` together, and update the cdn folder
name (`cdn/anuj-templates/<old>/`→`<new>/`) plus every path reference
inside the HTML/JS that points at it.

---

## Safety net — don't ship broken work

Any `.html` file under `templates/` is **live and publicly visible by
default** the moment it exists — `isEnabled()` in
[`template-visibility.js`](template-visibility.js) defaults to `true`
unless a slug is explicitly listed as `false` in
`template-visibility.json`. This means a template you're still mid-way
through integrating is already reachable on the public gallery.

If you're going to leave a template in a partially-done state for any
length of time (an agent got interrupted, you're stepping away
mid-integration), **hide it immediately**:
```json
// template-visibility.json
{"my-half-done-slug": false}
```
This 404s both the gallery listing entry and direct access to
`/templates/<slug>.html`, without touching any files. Once you've finished
and fully verified it (steps 8-11 above all passing), remove the entry (or
set it back to nothing / delete the key) to make it live again. Keep
`template-visibility.json` as `{}` in the steady state — an entry lingering
there after a template is actually fixed just hides working content for no
reason.

**Don't trust a single pass of self-verification, your own or an agent's,
at face value.** The most reliable bugs to slip through are exactly the
"should be zero matches" checks — an un-namespaced favicon link, a
watermark remnant, a missing asset file — because they don't throw errors,
they just silently 404 or flash the wrong thing on screen. After any
integration (yours or a delegated agent's), re-run steps 8-11 yourself
independently before considering it done. This has caught real bugs
(a missed favicon rewrite, missing image/audio assets never present in a
source capture) that an agent's own "verified clean" summary missed.

---

## Parallelizing across many templates

If you're adding several templates at once, it's reasonable to hand each
one (or a small batch) to a background agent, giving it this exact
checklist. A few things worth knowing if you do:

- **Session/usage limits are account-wide**, not per-agent — running many
  agents in parallel can hit a shared limit and fail all of them
  simultaneously mid-task. When that happens, check the actual filesystem
  state of every template the failed batch was assigned (does
  `templates/<slug>.html` exist? does it have `__PAGE_DATA__` injected?
  does a thumbnail exist?) rather than assuming anything — a template can
  be left with assets copied and paths rewritten but no data injected yet,
  which is a "broken empty template" if left live.
- **An agent instructed to do N templates directly may instead spawn its
  own N sub-agents** rather than doing the work itself. This isn't
  necessarily wrong, but it means you lose direct visibility into whether
  those grandchild agents followed the checklist correctly — verify their
  output with the same rigor as anything else.
- **Give each parallel agent tight file-ownership boundaries** (only touch
  files under its own slug's paths) and tell it explicitly not to touch
  `admin-lib.js`/`admin.js`/`customize.js`/`site.css`/other templates, and
  to use uniquely-prefixed scratch filenames — two agents both scribbling
  to a generically-named `_scratch.js` at the same time is a real
  collision that has happened.
- Bake the gotchas above (quote-wrapping, emoji encoding, double-rewrite
  corruption, missing-field-wiring, watermark's two locations) directly
  into every agent's prompt, verbatim — they're not obvious and every one
  of them has caused a real bug in this repo at least once.
