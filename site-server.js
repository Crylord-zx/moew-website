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
const port = process.env.PORT || 8800;
const host = process.env.HOST || undefined; // undefined = all interfaces

const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css',
  '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.json': 'application/json', '.ico': 'image/x-icon', '.gif': 'image/gif',
  '.mp3': 'audio/mpeg',
};
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.svg']);

// Only these top-level paths are ever servable. Anything admin-related
// (admin.html, admin.js, admin.css, admin-server.js, admin-lib.js,
// admin-backups/) is simply not in this list, so it 404s even if someone
// guesses the URL. admin-thumbs is fine to expose — it's just cover images.
const PUBLIC_PREFIXES = ['/templates/', '/_next/', '/cdn/', '/admin-thumbs/', '/site/', '/g/'];

function isPubliclyServable(pathname) {
  if (pathname === '/') return true;
  return PUBLIC_PREFIXES.some((p) => pathname.startsWith(p));
}

// Cache policy by path: content-hashed Next.js chunks never change under
// the same filename, so they're safe to cache forever. Template assets
// change rarely. HTML/generated pages and API responses should never be
// stale for a visitor, so they're not cached at all.
function cacheControlFor(urlPath, ext) {
  if (urlPath.startsWith('/_next/static/')) return 'public, max-age=31536000, immutable';
  if (urlPath.startsWith('/cdn/') || urlPath.startsWith('/admin-thumbs/')) return 'public, max-age=86400';
  if (ext === '.html') return 'no-cache';
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
  // GET /api/public/templates -> gallery cards
  if (req.method === 'GET' && pathname === '/api/public/templates') {
    const list = listTemplateSlugs().map((slug) => ({ slug, title: titleFromSlug(slug) }));
    return sendJson(res, 200, list);
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
try {
  fs.mkdirSync(generatedDir, { recursive: true });
  for (const f of fs.readdirSync(generatedDir)) {
    if (f.startsWith('_preview-')) fs.unlinkSync(path.join(generatedDir, f));
  }
} catch {}

const server = http.createServer((req, res) => {
  try {
    const pathname = decodeURIComponent(req.url.split('?')[0]);

    if (pathname.startsWith('/api/')) {
      handleApi(req, res, pathname).catch((e) => sendJson(res, 500, { error: e.message }));
      return;
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
    const urlPath = pathname === '/' ? '/site/index.html'
      : gMatch ? `/site/generated/${gMatch[1]}.html`
      : pathname;

    serveStatic(req, res, urlPath);
  } catch (e) {
    console.error('request handler error:', e);
    try { res.writeHead(500); res.end('Internal error'); } catch {}
  }
});

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
