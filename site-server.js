// ==========================================================
// Public-facing site server.
//   - Gallery of templates -> customize form -> shareable link.
//   - Deliberately does NOT serve admin.html / admin.js /
//     admin-server.js / admin-lib.js / admin-backups — this is
//     the server you'd point a real public domain at; the admin
//     panel (admin-server.js) is for your own local editing only
//     and should never be run on a public host.
//   - Reuses the same safe JSON-patch engine as the admin panel
//     (admin-lib.js) but never writes into the master template
//     files — every visitor's customization becomes its own new
//     generated page under site/generated/.
//   - Production-ready: gzip compression, cached static assets,
//     streamed file serving with HTTP Range support (so audio
//     players can seek), and won't crash the whole process on a
//     single bad request.
// ==========================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const zlib = require('zlib');
const { extractSnapshot, writeSnapshot } = require('./admin-lib');
const { isEnabled } = require('./template-visibility');
const { logCreation } = require('./creations-log');

const root = __dirname;
const templatesDir = path.join(root, 'templates');
const siteDir = path.join(root, 'site');
const generatedDir = path.join(siteDir, 'generated');
const uploadsDir = path.join(siteDir, 'uploads');
const loveCreationsDir = path.join(siteDir, 'lovearea-creations');
const LOVEAREA_SCHEMAS = JSON.parse(fs.readFileSync(path.join(root, 'lovearea-schemas.json'), 'utf8'));
const port = process.env.PORT || 8800;
const host = process.env.HOST || undefined; // undefined = all interfaces

const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css',
  '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.json': 'application/json', '.ico': 'image/x-icon', '.gif': 'image/gif',
  '.mp3': 'audio/mpeg', '.mp4': 'video/mp4',
};
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.svg']);

// Only these top-level paths are ever servable. Anything admin-related
// (admin.html, admin.js, admin.css, admin-server.js, admin-lib.js,
// admin-backups/) is simply not in this list, so it 404s even if someone
// guesses the URL. admin-thumbs is fine to expose — it's just cover images.
// "/assets/" and "/template/" (singular) belong to the lovearea.in
// templates (see below) — a client-rendered app that was built assuming
// it's deployed at domain root, so its own JS bundle references these
// exact absolute paths; they can't be moved under a namespaced prefix
// without patching the (large, minified) bundle itself.
const PUBLIC_PREFIXES = ['/templates/', '/_next/', '/cdn/', '/admin-thumbs/', '/site/', '/g/', '/assets/', '/template/'];

function isPubliclyServable(pathname) {
  if (pathname === '/') return true;
  if (LOVEAREA_ROOT_FILES.has(pathname)) return true;
  return PUBLIC_PREFIXES.some((p) => pathname.startsWith(p));
}

// The lovearea.in bundle also references a handful of loose files
// (background music + its favicon) at the absolute site root, same
// reason as above — its router/audio-player code has these exact
// filenames hardcoded. An explicit whitelist (rather than serving
// anything at root) keeps this from accidentally exposing arbitrary
// files if something else ever lands in that folder.
const LOVEAREA_ROOT_FILES = new Set([
  '/logo.png', '/logo.webp', '/heart-icon.webp',
  '/Preet Re.mp3', '/I Think They Call This Love.mp3', '/I love you .mp3', '/Perfect.mp3',
  '/SangRkhna.mp3', '/Tera Hone Laga.mp3', '/Tu Jo Mila.mp3', '/Until I Found You.mp3',
  '/a_thousand_year.mp3', '/balam_pichkari.mp3', '/happy-birthday.mp3', '/merenaamtu.mp3',
  '/romantic.mp3', '/tumho.mp3', '/tummile.mp3', '/AajSajeya.mp3',
]);

// Cache policy by path: content-hashed Next.js chunks never change under
// the same filename, so they're safe to cache forever. Template assets
// change rarely. HTML/generated pages and API responses should never be
// stale for a visitor, so they're not cached at all.
function cacheControlFor(urlPath, ext) {
  if (urlPath.startsWith('/_next/static/') || urlPath.startsWith('/lovearea/assets/')) return 'public, max-age=31536000, immutable';
  if (urlPath.startsWith('/cdn/') || urlPath.startsWith('/admin-thumbs/') || urlPath.startsWith('/lovearea/root-files/')) return 'public, max-age=86400';
  if (ext === '.html') return 'no-cache';
  // This site's own JS/CSS (not lovearea's content-hashed bundle) changes
  // as this project is actively worked on and has no cache-busting
  // filename hash — a stale cached copy silently keeps old behavior
  // (broken button routes, old API calls) well after a fix has shipped.
  if (urlPath.startsWith('/site/') && (ext === '.js' || ext === '.css')) return 'no-cache';
  return 'public, max-age=3600';
}

function clientIp(req) {
  // trust X-Forwarded-For only if you're actually behind a reverse proxy
  // you control (nginx etc.) — harmless if not, just falls back
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
}

function readJsonBody(req, limitBytes = 20 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let data = '';
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > limitBytes) { reject(new Error('upload too large')); req.destroy(); return; }
      data += chunk;
    });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

// gallery display order — anything not listed here just falls in after,
// in whatever order it's found on disk
const GALLERY_ORDER = [
  'girlfriends-day',
  'girlfriends-day-v2',
  'bestfriends-day',
  'cute-website-v2',
  'netflix-story',
  'special-apology',
];

function listTemplateSlugs() {
  const all = fs.readdirSync(templatesDir)
    .filter((f) => f.endsWith('.html'))
    .map((f) => f.replace(/\.html$/, ''))
    .filter((slug) => isEnabled(slug)); // hidden-from-public templates never appear here

  const priority = GALLERY_ORDER.filter((slug) => all.includes(slug));
  const rest = all.filter((slug) => !GALLERY_ORDER.includes(slug));
  return [...priority, ...rest];
}

function templateFile(slug) {
  if (!/^[a-z0-9-]+$/i.test(slug)) throw new Error('invalid slug');
  return path.join(templatesDir, slug + '.html');
}

// Templates sourced from lovearea.in — a client-rendered React app, not
// the Next.js flight-payload format the rest of this project's editing
// pipeline (admin-lib.js) understands. Editable through a separate path:
// the bundled JS was patched (see lovearea/assets/index-*.js) so each
// template's defaultData deep-merges a visitor override in at render
// time; lovearea-schemas.json holds each one's field shape for the
// customize form. slug is prefixed "love-" to keep it visually distinct
// from the Next.js template slugs and to guarantee no collision with
// anything already in templates/.
const LOVEAREA_TEMPLATES = [
  { category: 'birthday', design: 'dreamy-scrapbook', title: 'Dreamy Scrapbook (Birthday)' },
  { category: 'birthday', design: 'dreamy-cloudscape', title: 'Dreamy Cloudscape (Birthday)' },
  { category: 'birthday', design: 'birthday_template', title: 'Birthday Template' },
  { category: 'birthday', design: 'premium-surprise', title: 'Premium Surprise (Birthday)' },
  { category: 'birthday', design: 'midnight-romance', title: 'Midnight Romance (Birthday)' },
  { category: 'birthday', design: 'bestie_birthday', title: "Bestie's Birthday" },
  { category: 'birthday', design: 'sibling-birthday-quest', title: 'Sibling Birthday Quest' },
  { category: 'birthday', design: 'birthday-love-diary', title: 'Birthday Love Diary' },
  { category: 'birthday', design: 'disco-bestie', title: 'Disco Bestie (Birthday)' },
  { category: 'birthday', design: 'party-bash', title: 'Party Bash (Birthday)' },
  { category: 'valentine', design: 'ultimate_valentine', title: "Ultimate Valentine's" },
  { category: 'valentine', design: 'cupid', title: 'Cupid (Valentine)' },
  { category: 'valentine', design: 'love_adventure', title: 'Love Adventure (Valentine)' },
  { category: 'valentine', design: 'enchanted-valentine', title: 'Enchanted Valentine' },
  { category: 'valentine', design: 'artisan-affection', title: 'Artisan Affection (Valentine)' },
  { category: 'anniversary', design: 'first-anniversary', title: 'First Anniversary' },
  { category: 'anniversary', design: 'eternal-anniversary', title: 'Eternal Anniversary' },
  { category: 'anniversary', design: 'celestial-love', title: 'Celestial Love (Anniversary)' },
  { category: 'apology', design: 'ultimate-apology', title: 'Ultimate Apology' },
  { category: 'apology', design: 'cute-sorry', title: 'Cute Sorry (Apology)' },
  { category: 'holi', design: 'festive-joy', title: 'Festive Joy (Holi)' },
  { category: 'holi', design: 'color-my-heart', title: 'Color My Heart (Holi)' },
  { category: 'cheerup', design: 'mood-cheerup', title: 'Cheer Up' },
  { category: 'confession', design: 'proposal-surprise', title: 'Proposal Surprise (Confession)' },
  { category: 'crushday', design: 'crush-day', title: 'Crush Day' },
  { category: 'date', design: 'cute-date-asking', title: 'Cute Date Asking' },
  { category: 'girlfriendday', design: 'perfect-girlfriend', title: "Perfect Girlfriend's Day" },
].map((t) => ({
  slug: `love-${t.category}-${t.design}`.toLowerCase().replace(/_/g, '-'),
  title: t.title,
  editable: true,
  isLovearea: true,
  previewUrl: `/template/${t.category}/${t.design}?preview=true`,
}));

function newId() {
  return crypto.randomBytes(6).toString('base64url');
}

// small, self-contained credit badge injected into every page created
// through this site — this is the one "everyone can see" spot, since
// recipients of a shared page see it, not just whoever customized it.
//
// A plain injected <a> tag gets wiped: these templates recover from a
// (harmless, pre-existing) hydration mismatch by having React re-render
// document.body from scratch, which clears out anything not part of its
// own component tree. So instead of a static tag, this is a small script
// that (re-)adds the badge and watches for it being removed, putting it
// straight back — it survives no matter how many times React clears body.
const CREDIT_BADGE = `
<script>(function(){
  function addBadge(){
    if (document.getElementById('__ig_credit_badge')) return;
    var a = document.createElement('a');
    a.id = '__ig_credit_badge';
    a.href = 'https://instagram.com/anshxr.yn';
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = '\\u273F @anshxr.yn';
    a.style.cssText = 'position:fixed;bottom:14px;right:14px;z-index:2147483647;display:inline-flex;' +
      'align-items:center;gap:5px;background:rgba(255,255,255,0.92);backdrop-filter:blur(4px);' +
      'border:1px solid #e6ddfa;border-radius:999px;padding:7px 13px;font-size:11px;font-weight:700;' +
      'color:#5b21b6;text-decoration:none;box-shadow:0 6px 16px rgba(124,58,237,0.18);' +
      "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;";
    document.body.appendChild(a);
  }
  addBadge();
  document.addEventListener('DOMContentLoaded', addBadge);
  if (document.body) {
    new MutationObserver(addBadge).observe(document.body, { childList: true });
  }
})();</script>`;

function withCredit(html) {
  return html.includes('</body>') ? html.replace('</body>', CREDIT_BADGE + '</body>') : html + CREDIT_BADGE;
}

// A clean, original display name derived from the filename — deliberately
// NOT using the template's own embedded seo.title/description, since those
// are the source site's own marketing copy.
function titleFromSlug(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

async function handleApi(req, res, pathname) {
  // The bundled template app fires an analytics beacon on every page view
  // (POST /api/analytics/collect) and, if a Cloudflare integration is
  // present client-side, occasionally a stray GET here too. The real site
  // answers both with an empty 204; matching that keeps the console clean
  // instead of a harmless-but-noisy 404 on every single template load.
  if (pathname === '/api/analytics/collect') {
    res.writeHead(204); res.end();
    return;
  }

  // GET /api/templates/:id/reviews -> a template page's own "can this
  // visitor review it" widget calls this after hydration. The original
  // site's real answer is always this same harmless shape for a fresh
  // visitor; without it the widget's promise never resolves and the
  // template's whole page crashes with a Next.js "Connection closed"
  // error boundary.
  if (req.method === 'GET' && /^\/api\/templates\/[^/]+\/reviews$/.test(pathname)) {
    return sendJson(res, 200, { data: { canReview: false, existing: null } });
  }

  // GET /api/public/templates -> gallery cards
  if (req.method === 'GET' && pathname === '/api/public/templates') {
    const list = listTemplateSlugs().map((slug) => ({ slug, title: titleFromSlug(slug) }));
    return sendJson(res, 200, [...list, ...LOVEAREA_TEMPLATES]);
  }

  // GET /api/public/templates/:slug -> default content to prefill the form
  const getMatch = pathname.match(/^\/api\/public\/templates\/([^/]+)$/);
  if (req.method === 'GET' && getMatch) {
    try {
      if (!isEnabled(getMatch[1])) throw new Error('this template is not available');
      const html = fs.readFileSync(templateFile(getMatch[1]), 'utf8');
      return sendJson(res, 200, extractSnapshot(html));
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // POST /api/public/preview -> render {slug, snapshot, previewId} to a
  // small temp file served over a REAL http:// URL. The template's own
  // bundled app code breaks if loaded via srcdoc/blob: (it does a location
  // check early on that fails on non-http pseudo-URLs and kills the whole
  // frame), so previews need a real URL just like the final shared pages.
  // Reuses the same file per previewId (one per browser tab) so repeated
  // "Refresh preview" clicks don't pile up files on disk.
  if (req.method === 'POST' && pathname === '/api/public/preview') {
    try {
      const { slug, snapshot, previewId } = await readJsonBody(req);
      if (!/^[a-z0-9-]+$/i.test(previewId || '')) throw new Error('invalid previewId');
      if (!isEnabled(slug)) throw new Error('this template is not available');
      const html = fs.readFileSync(templateFile(slug), 'utf8');
      const rendered = withCredit(writeSnapshot(html, snapshot));
      fs.mkdirSync(generatedDir, { recursive: true });
      const fileName = `_preview-${previewId}.html`;
      fs.writeFileSync(path.join(generatedDir, fileName), rendered, 'utf8');
      return sendJson(res, 200, { url: `/site/generated/${fileName}` });
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // POST /api/public/create -> {slug, snapshot} -> permanent shareable page
  if (req.method === 'POST' && pathname === '/api/public/create') {
    try {
      const { slug, snapshot } = await readJsonBody(req);
      if (!isEnabled(slug)) throw new Error('this template is not available');
      const html = fs.readFileSync(templateFile(slug), 'utf8');
      const rendered = withCredit(writeSnapshot(html, snapshot));
      const id = newId();
      fs.mkdirSync(generatedDir, { recursive: true });
      fs.writeFileSync(path.join(generatedDir, `${id}.html`), rendered, 'utf8');
      const proto = req.headers['x-forwarded-proto'] || 'http';
      const fullUrl = `${proto}://${req.headers.host}/g/${id}`;
      logCreation({ id, slug, url: fullUrl, ip: clientIp(req) });
      return sendJson(res, 200, { id, url: `/g/${id}` });
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // GET /api/public/lovearea-schema/:slug -> {category, design, sample}
  // sample prefills the customize-love.html form; its shape came from
  // reading the bundled app's own default-data objects (see
  // lovearea-schemas.json / the extraction that produced it).
  const loveSchemaMatch = pathname.match(/^\/api\/public\/lovearea-schema\/([^/]+)$/);
  if (req.method === 'GET' && loveSchemaMatch) {
    const entry = LOVEAREA_SCHEMAS[loveSchemaMatch[1]];
    if (!entry) return sendJson(res, 404, { error: 'unknown template' });
    return sendJson(res, 200, entry);
  }

  // POST /api/public/lovearea/preview -> {slug, data, previewId} -> a live
  // preview, reusing the exact same /g/<id> render path (creation JSON +
  // the boot script's ?creation=<id> fetch) but under a short-lived
  // "_preview-<id>" id instead of a permanent one, overwritten on every
  // "Refresh preview" click from the same tab so repeated edits don't pile
  // up files on disk.
  if (req.method === 'POST' && pathname === '/api/public/lovearea/preview') {
    try {
      const { slug, data, previewId } = await readJsonBody(req);
      if (!/^[a-z0-9-]+$/i.test(previewId || '')) throw new Error('invalid previewId');
      const entry = LOVEAREA_SCHEMAS[slug];
      if (!entry) throw new Error('unknown template');
      const id = `_preview-${previewId}`;
      fs.mkdirSync(loveCreationsDir, { recursive: true });
      fs.writeFileSync(
        path.join(loveCreationsDir, `${id}.json`),
        JSON.stringify({ slug, category: entry.category, design: entry.design, data }),
        'utf8'
      );
      return sendJson(res, 200, { url: `/template/${entry.category}/${entry.design}?creation=${id}` });
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // POST /api/public/lovearea/create -> {slug, data} -> permanent shareable
  // page. Unlike the Next.js-template flow, nothing gets rendered to HTML
  // here — the visitor's edited data is just stored, and the patched
  // lovearea bundle renders it live (deep-merged onto the template's real
  // defaults) whenever /g/<id> is visited.
  if (req.method === 'POST' && pathname === '/api/public/lovearea/create') {
    try {
      const { slug, data } = await readJsonBody(req);
      const entry = LOVEAREA_SCHEMAS[slug];
      if (!entry) throw new Error('unknown template');
      const id = newId();
      fs.mkdirSync(loveCreationsDir, { recursive: true });
      fs.writeFileSync(
        path.join(loveCreationsDir, `${id}.json`),
        JSON.stringify({ slug, category: entry.category, design: entry.design, data }),
        'utf8'
      );
      const proto = req.headers['x-forwarded-proto'] || 'http';
      const fullUrl = `${proto}://${req.headers.host}/g/${id}`;
      logCreation({ id, slug, url: fullUrl, ip: clientIp(req) });
      return sendJson(res, 200, { id, url: `/g/${id}` });
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // GET /api/public/lovearea-creation/:id -> {slug, data}, fetched by
  // lovearea/index.html's boot script (before the app's module script
  // runs) whenever it's loaded via /g/<id>'s redirect with ?creation=<id>.
  const loveCreationMatch = pathname.match(/^\/api\/public\/lovearea-creation\/([A-Za-z0-9_-]+)$/);
  if (req.method === 'GET' && loveCreationMatch) {
    try {
      const raw = fs.readFileSync(path.join(loveCreationsDir, `${loveCreationMatch[1]}.json`), 'utf8');
      const { slug, data } = JSON.parse(raw);
      return sendJson(res, 200, { slug, data });
    } catch {
      return sendJson(res, 404, { error: 'not found' });
    }
  }

  // POST /api/public/upload -> a visitor's own photo/music, isolated from
  // the shared template-seeds assets used by the master templates.
  if (req.method === 'POST' && pathname === '/api/public/upload') {
    try {
      const { filename, dataBase64 } = await readJsonBody(req);
      if (!filename || !dataBase64) throw new Error('filename and dataBase64 are required');

      const ext = path.extname(filename).toLowerCase();
      // visitors can only replace static photos — no gifs, no audio
      const allowed = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
      if (!allowed.includes(ext)) throw new Error('unsupported file type: ' + ext);

      const buf = Buffer.from(dataBase64, 'base64');
      const maxBytes = 15 * 1024 * 1024;
      if (buf.length > maxBytes) throw new Error('file too large (max 15MB)');

      const ownerId = newId();
      const destDir = path.join(uploadsDir, ownerId);
      fs.mkdirSync(destDir, { recursive: true });
      const safeBase = path.basename(filename, ext).replace(/[^a-z0-9-_]/gi, '_');
      const uniqueName = `${safeBase}${ext}`;
      fs.writeFileSync(path.join(destDir, uniqueName), buf);

      return sendJson(res, 200, { url: `/site/uploads/${ownerId}/${uniqueName}` });
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  sendJson(res, 404, { error: 'not found' });
}

// ----------------------------------------------------------
// Static file serving: streamed (not loaded fully into memory),
// gzip-compressed for text assets, cached appropriately, and
// supports HTTP Range requests so audio (and any video) can seek.
// ----------------------------------------------------------
function serveStatic(req, res, urlPath) {
  const filePath = path.join(root, urlPath);

  // guard against path traversal escaping the project root
  if (!filePath.startsWith(root)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.stat(filePath, (statErr, stat) => {
    if (statErr || !stat.isFile()) {
      res.writeHead(404); res.end('Not found: ' + urlPath); return;
    }

    const ext = path.extname(filePath);
    const contentType = mime[ext] || 'application/octet-stream';
    const cacheControl = cacheControlFor(urlPath, ext);
    const range = req.headers.range;

    // Range requests (audio/video seeking) — served uncompressed, since
    // compressing a byte-range slice independently would produce garbage.
    if (range) {
      const m = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (m) {
        const start = m[1] ? parseInt(m[1], 10) : 0;
        const end = m[2] ? parseInt(m[2], 10) : stat.size - 1;
        if (start <= end && end < stat.size) {
          res.writeHead(206, {
            'Content-Type': contentType,
            'Content-Range': `bytes ${start}-${end}/${stat.size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': end - start + 1,
            'Cache-Control': cacheControl,
          });
          fs.createReadStream(filePath, { start, end }).pipe(res);
          return;
        }
      }
    }

    const acceptEncoding = req.headers['accept-encoding'] || '';
    const canGzip = COMPRESSIBLE.has(ext) && /\bgzip\b/.test(acceptEncoding) && stat.size > 512;

    const headers = {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
      'Accept-Ranges': 'bytes',
    };

    if (canGzip) {
      headers['Content-Encoding'] = 'gzip';
      res.writeHead(200, headers);
      fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(res);
    } else {
      headers['Content-Length'] = stat.size;
      res.writeHead(200, headers);
      fs.createReadStream(filePath).pipe(res);
    }
  });
}

// clean up any leftover preview temp files from previous runs
function cleanupStalePreviews() {
  try {
    fs.mkdirSync(generatedDir, { recursive: true });
    for (const f of fs.readdirSync(generatedDir)) {
      if (f.startsWith('_preview-')) fs.unlinkSync(path.join(generatedDir, f));
    }
  } catch {}
  try {
    fs.mkdirSync(loveCreationsDir, { recursive: true });
    for (const f of fs.readdirSync(loveCreationsDir)) {
      if (f.startsWith('_preview-')) fs.unlinkSync(path.join(loveCreationsDir, f));
    }
  } catch {}
}

// The actual request handler, exported so a merged single-process server
// (see server.js) can route to it by hostname alongside the admin panel's
// handler — sharing one filesystem so admin edits are visible immediately,
// instead of the two servers only being reachable as separate deployments
// with separate disks. Still fully runnable standalone (below).
function handleSiteRequest(req, res) {
  try {
    const pathname = decodeURIComponent(req.url.split('?')[0]);

    // A bundled template's own client-side router prefetches its site's
    // other nav links (home, login, products, ...) using Next.js's RSC
    // fetch protocol (a "_rsc" query param). Every one of those paths is
    // naturally 404 here except "/", which we do serve — but as our own
    // unrelated gallery HTML, not a valid RSC payload. The template's
    // flight-stream parser can't make sense of that and hard-crashes the
    // whole page with a "Connection closed" error. Treating any "_rsc"
    // request as not-found (matching what already happens for the other
    // nav links) avoids that; real browser navigation never sends "_rsc".
    if (pathname === '/' && req.url.includes('_rsc=')) {
      res.writeHead(404); res.end('Not found');
      return;
    }

    // Cloudflare's real-user-monitoring beacon, fired by the bundled
    // template app's own Cloudflare integration. Harmless 404 locally
    // (there's no Cloudflare here to receive it) but noisy; a quiet 204
    // matches what a real edge deployment would answer.
    if (pathname === '/cdn-cgi/rum') {
      res.writeHead(204); res.end();
      return;
    }

    if (pathname.startsWith('/api/')) {
      handleApi(req, res, pathname).catch((e) => sendJson(res, 500, { error: e.message }));
      return;
    }

    // A stale bookmark, browser autocomplete, or old link can still land
    // someone on the old customize form with a lovearea slug (?slug=love-…)
    // — that form's endpoints only know about the Next.js-template flow and
    // 400 for these. Redirect to the right form instead of erroring, no
    // matter how the visitor arrived at the URL.
    if (pathname === '/site/customize.html') {
      const slugParam = new URL(req.url, 'http://x').searchParams.get('slug') || '';
      if (Object.prototype.hasOwnProperty.call(LOVEAREA_SCHEMAS, slugParam)) {
        res.writeHead(302, { Location: `/site/customize-love.html?slug=${encodeURIComponent(slugParam)}` });
        res.end();
        return;
      }
    }

    if (!isPubliclyServable(pathname)) {
      res.writeHead(404); res.end('Not found');
      return;
    }

    // a disabled template's raw HTML is off-limits too, not just hidden
    // from the gallery listing
    const templateSlugMatch = pathname.match(/^\/templates\/([a-z0-9-]+)\.html$/i);
    if (templateSlugMatch && !isEnabled(templateSlugMatch[1])) {
      res.writeHead(404); res.end('Not found');
      return;
    }

    // pretty shareable URL: /g/<id> -> site/generated/<id>.html
    const gMatch = pathname.match(/^\/g\/([A-Za-z0-9_-]+)$/);

    // A lovearea.in creation shares the same /g/<id> link shape as every
    // other template, but there's no rendered HTML file for it — it's a
    // client-rendered app, so instead this redirects to the real client
    // route (?preview=false implied) with the creation id attached; the
    // app's own boot script fetches and injects the saved data before it
    // renders. Checked before the generated-HTML path below.
    if (gMatch) {
      try {
        const raw = fs.readFileSync(path.join(loveCreationsDir, `${gMatch[1]}.json`), 'utf8');
        const { category, design } = JSON.parse(raw);
        res.writeHead(302, { Location: `/template/${category}/${design}?creation=${gMatch[1]}` });
        res.end();
        return;
      } catch { /* not a lovearea creation — fall through to the normal /g/<id> path */ }
    }

    // lovearea.in templates: /assets/* and the loose root files (music,
    // favicon) map straight into lovearea/; any /template/<category>/<slug>
    // path is a client-side route the bundled React app resolves itself,
    // so every one of them gets the same index.html shell (SPA fallback)
    // rather than a matching file on disk.
    const urlPath = pathname === '/' ? '/site/index.html'
      : gMatch ? `/site/generated/${gMatch[1]}.html`
      : pathname.startsWith('/assets/') ? `/lovearea${pathname}`
      : LOVEAREA_ROOT_FILES.has(pathname) ? `/lovearea/root-files${pathname}`
      : pathname.startsWith('/template/') ? '/lovearea/index.html'
      : pathname;

    serveStatic(req, res, urlPath);
  } catch (e) {
    console.error('request handler error:', e);
    try { res.writeHead(500); res.end('Internal error'); } catch {}
  }
}

module.exports = { handleSiteRequest, cleanupStalePreviews };

// Only actually start listening when run directly (`node site-server.js`).
// When required by server.js (the merged single-deployment entry point),
// only the handler function above is used — server.js owns the listen()
// call, port, and process-level guards instead.
if (require.main === module) {
  cleanupStalePreviews();
  const server = http.createServer(handleSiteRequest);

  // A single bad request or edge-case bug should never take the whole site
  // down for everyone else — log it and keep serving.
  process.on('uncaughtException', (e) => console.error('uncaughtException:', e));
  process.on('unhandledRejection', (e) => console.error('unhandledRejection:', e));

  // Most hosting platforms (and `systemctl stop`, container restarts, etc.)
  // signal a shutdown with SIGTERM — exit cleanly instead of being killed
  // mid-request.
  function shutdown() {
    console.log('Shutting down…');
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 5000).unref();
  }
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  server.listen(port, host, () => {
    console.log(`Public site: http://localhost:${port}/`);
  });
}
