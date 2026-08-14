// ==========================================================
// Admin panel server.
//   - Serves the same static files as server.js (templates,
//     _next assets, cdn assets) PLUS the admin UI itself.
//   - Exposes a small JSON API (no external dependencies) for
//     reading/writing each template's editable content and for
//     uploading replacement images/audio.
// ==========================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { extractSnapshot, writeSnapshot } = require('./admin-lib');
const { isEnabled, setEnabled } = require('./template-visibility');
const { listCreations } = require('./creations-log');

const root = __dirname;
const templatesDir = path.join(root, 'templates');
const cdnDir = path.join(root, 'cdn', 'template-seeds');
const backupsDir = path.join(root, 'admin-backups');
const authFile = path.join(root, 'admin-auth.json');
const port = process.env.PORT || 8899;
// Now that login is required, it's safe to listen on all interfaces by
// default — set HOST=127.0.0.1 instead if you'd rather keep using the
// SSH-tunnel approach even with auth in place.
const host = process.env.HOST || undefined;
const MAX_BACKUPS_PER_TEMPLATE = 30;

// ----------------------------------------------------------
// Authentication — username + password (set via set-admin-password.js,
// stored as a salted hash, never plaintext), a simple rate limiter on
// login attempts, and self-verifying signed session cookies.
//
// Sessions are NOT kept in server memory. A cookie holds
// {exp} + an HMAC signature made with a secret stored in admin-auth.json;
// any request can verify it standalone by recomputing the signature. This
// matters on real hosting: an in-memory session Map only works if every
// request lands on the exact same process, which isn't guaranteed on a
// host that runs multiple instances or restarts the app — those would
// silently log everyone out or reject a session created a moment ago on
// a different instance. A signed cookie has no such requirement.
// ----------------------------------------------------------
const SESSION_COOKIE = 'admin_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const loginAttempts = new Map(); // ip -> { count, windowStart }
const MAX_ATTEMPTS = 8;
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;

function loadAuthConfig() {
  try {
    return JSON.parse(fs.readFileSync(authFile, 'utf8'));
  } catch {
    return null;
  }
}

function verifyPassword(password, salt, expectedHash) {
  const hash = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHash, 'hex');
  return hash.length === expected.length && crypto.timingSafeEqual(hash, expected);
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now - entry.windowStart > ATTEMPT_WINDOW_MS) {
    loginAttempts.set(ip, { count: 0, windowStart: now });
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(ip) {
  const entry = loginAttempts.get(ip) || { count: 0, windowStart: Date.now() };
  entry.count++;
  loginAttempts.set(ip, entry);
}

function signToken(payload, secret) {
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
  return `${payloadB64}.${sig}`;
}

function verifyToken(token, secret) {
  const parts = String(token).split('.');
  if (parts.length !== 2) return null;
  const [payloadB64, sig] = parts;
  const expectedSig = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

function createSession(secret) {
  return signToken({ exp: Date.now() + SESSION_TTL_MS }, secret);
}

function parseCookies(req) {
  const header = req.headers.cookie || '';
  const out = {};
  header.split(';').forEach((part) => {
    const i = part.indexOf('=');
    if (i === -1) return;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  });
  return out;
}

function isAuthed(req) {
  const token = parseCookies(req)[SESSION_COOKIE];
  if (!token) return false;
  const config = loadAuthConfig();
  if (!config || !config.sessionSecret) return false;
  return !!verifyToken(token, config.sessionSecret);
}

// periodically sweep expired login-attempt windows so this Map doesn't
// grow forever on a long-running process
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of loginAttempts) if (now - entry.windowStart > ATTEMPT_WINDOW_MS) loginAttempts.delete(ip);
}, 10 * 60 * 1000).unref();

const mime = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.json': 'application/json', '.ico': 'image/x-icon', '.gif': 'image/gif',
  '.mp3': 'audio/mpeg',
};

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) });
  res.end(body);
}

function listTemplateSlugs() {
  return fs.readdirSync(templatesDir)
    .filter((f) => f.endsWith('.html'))
    .map((f) => f.replace(/\.html$/, ''));
}

function templateFile(slug) {
  // guard against path traversal — slug must be a bare filename component
  if (!/^[a-z0-9-]+$/i.test(slug)) throw new Error('invalid slug');
  return path.join(templatesDir, slug + '.html');
}

function backupIdFor(now = new Date()) {
  return now.toISOString().replace(/[:.]/g, '-') + '.html';
}

function backupDir(slug) {
  return path.join(backupsDir, slug);
}

// snapshot the CURRENT on-disk content before it gets overwritten, so every
// save/restore can always be undone. Keeps only the most recent N backups.
function makeBackup(slug, html) {
  const dir = backupDir(slug);
  fs.mkdirSync(dir, { recursive: true });
  const id = backupIdFor();
  fs.writeFileSync(path.join(dir, id), html, 'utf8');

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.html')).sort();
  const excess = files.length - MAX_BACKUPS_PER_TEMPLATE;
  if (excess > 0) {
    for (const f of files.slice(0, excess)) fs.unlinkSync(path.join(dir, f));
  }
  return id;
}

function backupIdToIso(id) {
  // "2026-08-14T06-15-32-123Z.html" -> "2026-08-14T06:15:32.123Z"
  const stem = id.replace(/\.html$/, '');
  const [datePart, timePart] = stem.split('T');
  const [h, m, s, msZ] = timePart.split('-');
  const ms = msZ.replace('Z', '');
  return `${datePart}T${h}:${m}:${s}.${ms}Z`;
}

function listBackups(slug) {
  const dir = backupDir(slug);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.html'))
    .sort()
    .reverse()
    .map((f) => ({ id: f, savedAt: backupIdToIso(f) }));
}

function backupIdSafe(id) {
  if (!/^[0-9TZ:.-]+\.html$/i.test(id)) throw new Error('invalid backup id');
  return id;
}

async function handleApi(req, res, pathname) {
  // GET /api/templates  -> list of {slug, title, enabled}
  if (req.method === 'GET' && pathname === '/api/templates') {
    const list = listTemplateSlugs().map((slug) => {
      try {
        const html = fs.readFileSync(templateFile(slug), 'utf8');
        const snap = extractSnapshot(html);
        return { slug, title: (snap.seo && snap.seo.title) || slug, enabled: isEnabled(slug) };
      } catch (e) {
        return { slug, title: slug, enabled: isEnabled(slug), error: e.message };
      }
    });
    return sendJson(res, 200, list);
  }

  // GET /api/creations -> every shareable link anyone has generated on
  // the public site, newest first (the "mailbox")
  if (req.method === 'GET' && pathname === '/api/creations') {
    return sendJson(res, 200, listCreations());
  }

  // POST /api/templates/:slug/visibility -> {enabled: true|false}
  const visibilityMatch = pathname.match(/^\/api\/templates\/([^/]+)\/visibility$/);
  if (req.method === 'POST' && visibilityMatch) {
    try {
      const slug = visibilityMatch[1];
      templateFile(slug); // throws if slug is invalid — also confirms it exists below
      if (!fs.existsSync(templateFile(slug))) throw new Error('template not found');
      const { enabled } = await readJsonBody(req);
      setEnabled(slug, !!enabled);
      return sendJson(res, 200, { ok: true, enabled: !!enabled });
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // GET /api/templates/:slug -> full snapshot
  const getMatch = pathname.match(/^\/api\/templates\/([^/]+)$/);
  if (req.method === 'GET' && getMatch) {
    try {
      const html = fs.readFileSync(templateFile(getMatch[1]), 'utf8');
      const snap = extractSnapshot(html);
      return sendJson(res, 200, snap);
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // POST /api/templates/:slug -> save edited snapshot (auto-backs up the
  // pre-save version first, so every save can be undone)
  if (req.method === 'POST' && getMatch) {
    try {
      const slug = getMatch[1];
      const body = await readJsonBody(req);
      const file = templateFile(slug);
      const html = fs.readFileSync(file, 'utf8');
      const newHtml = writeSnapshot(html, body);
      const backupId = makeBackup(slug, html);
      fs.writeFileSync(file, newHtml, 'utf8');
      return sendJson(res, 200, { ok: true, backupId });
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // GET /api/templates/:slug/backups -> list of previous versions
  const backupsMatch = pathname.match(/^\/api\/templates\/([^/]+)\/backups$/);
  if (req.method === 'GET' && backupsMatch) {
    try {
      return sendJson(res, 200, listBackups(backupsMatch[1]));
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // POST /api/templates/:slug/restore -> roll back to a previous backup.
  // The current (about-to-be-replaced) content is itself backed up first,
  // so a restore can always be undone too.
  const restoreMatch = pathname.match(/^\/api\/templates\/([^/]+)\/restore$/);
  if (req.method === 'POST' && restoreMatch) {
    try {
      const slug = restoreMatch[1];
      const body = await readJsonBody(req);
      const id = backupIdSafe(body.id);
      const backupPath = path.join(backupDir(slug), id);
      if (!fs.existsSync(backupPath)) throw new Error('backup not found');

      const file = templateFile(slug);
      const currentHtml = fs.readFileSync(file, 'utf8');
      makeBackup(slug, currentHtml);

      const restoredHtml = fs.readFileSync(backupPath, 'utf8');
      fs.writeFileSync(file, restoredHtml, 'utf8');
      return sendJson(res, 200, { ok: true });
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // POST /api/upload/:slug -> save an uploaded image/audio file
  const uploadMatch = pathname.match(/^\/api\/upload\/([^/]+)$/);
  if (req.method === 'POST' && uploadMatch) {
    try {
      const slug = uploadMatch[1];
      if (!/^[a-z0-9-]+$/i.test(slug)) throw new Error('invalid slug');
      const body = await readJsonBody(req);
      const { filename, dataBase64 } = body;
      if (!filename || !dataBase64) throw new Error('filename and dataBase64 are required');

      const ext = path.extname(filename).toLowerCase();
      const allowed = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.mp3'];
      if (!allowed.includes(ext)) throw new Error('unsupported file type: ' + ext);

      const safeBase = path.basename(filename, ext).replace(/[^a-z0-9-_]/gi, '_');
      const uniqueName = `${safeBase}-${crypto.randomBytes(3).toString('hex')}${ext}`;

      const destDir = path.join(cdnDir, slug);
      fs.mkdirSync(destDir, { recursive: true });
      const destFile = path.join(destDir, uniqueName);
      fs.writeFileSync(destFile, Buffer.from(dataBase64, 'base64'));

      const url = `/cdn/template-seeds/${slug}/${uniqueName}`;
      return sendJson(res, 200, { url });
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  sendJson(res, 404, { error: 'not found' });
}

function clientIp(req) {
  // trust X-Forwarded-For only if you're actually behind a reverse proxy
  // you control (nginx etc.) — harmless if not, just falls back
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
}

async function handleAuth(req, res, pathname) {
  if (req.method === 'POST' && pathname === '/api/auth/login') {
    const ip = clientIp(req);
    if (isRateLimited(ip)) return sendJson(res, 429, { error: 'too many attempts — try again later' });

    const config = loadAuthConfig();
    if (!config) return sendJson(res, 500, { error: 'no admin password set — run set-admin-password.js first' });
    if (!config.sessionSecret) {
      return sendJson(res, 500, { error: 'admin-auth.json is missing sessionSecret — re-run set-admin-password.js to regenerate it' });
    }

    const { username, password } = await readJsonBody(req);
    const ok = username === config.username && password && verifyPassword(password, config.salt, config.hash);
    if (!ok) {
      recordFailedAttempt(ip);
      return sendJson(res, 401, { error: 'wrong username or password' });
    }

    const token = createSession(config.sessionSecret);
    res.setHeader('Set-Cookie', `${SESSION_COOKIE}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_TTL_MS / 1000}`);
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === 'POST' && pathname === '/api/auth/logout') {
    // stateless tokens — nothing to invalidate server-side, just clear the cookie
    res.setHeader('Set-Cookie', `${SESSION_COOKIE}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`);
    return sendJson(res, 200, { ok: true });
  }

  return false; // not an auth route
}

// The actual request handler, exported so a merged single-process server
// (see server.js) can route to it by hostname alongside the public site's
// handler — sharing one filesystem so admin edits are visible immediately
// on the public side, instead of the two servers only being reachable as
// separate deployments with separate disks. Still fully runnable
// standalone (below).
function handleAdminRequest(req, res) {
  const pathname = decodeURIComponent(req.url.split('?')[0]);

  // login/logout are the only routes reachable without a session
  if (pathname === '/api/auth/login' || pathname === '/api/auth/logout') {
    Promise.resolve(handleAuth(req, res, pathname)).catch((e) => sendJson(res, 500, { error: e.message }));
    return;
  }

  // The template preview iframe loads a bundled template on this same
  // origin, and that template's own JS fires an analytics/RUM beacon it
  // doesn't wait on or care about the response to. Answering with a quiet
  // 204 instead of a 401 (session-gated) avoids noisy console errors while
  // previewing — matches the same exemption made in site-server.js.
  if (pathname === '/api/analytics/collect' || pathname === '/cdn-cgi/rum') {
    res.writeHead(204); res.end();
    return;
  }
  if (pathname === '/login' || pathname === '/login.html') {
    fs.readFile(path.join(root, 'admin-login.html'), (err, data) => {
      if (err) { res.writeHead(404); res.end('Not found'); return; }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
    return;
  }

  // everything else requires a valid session
  if (!isAuthed(req)) {
    if (pathname.startsWith('/api/')) return sendJson(res, 401, { error: 'not logged in' });
    res.writeHead(302, { Location: '/login' });
    res.end();
    return;
  }

  if (pathname.startsWith('/api/')) {
    handleApi(req, res, pathname).catch((e) => sendJson(res, 500, { error: e.message }));
    return;
  }

  const urlPath = pathname === '/' ? '/admin.html' : pathname;
  const filePath = path.join(root, urlPath);

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found: ' + urlPath); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

module.exports = { handleAdminRequest, loadAuthConfig, signToken, verifyToken };

// Only actually start listening when run directly (`node admin-server.js`).
// When required by server.js (the merged single-deployment entry point),
// only the handler function above is used — server.js owns the listen()
// call, port, and process-level guards instead.
if (require.main === module) {
  http.createServer(handleAdminRequest).listen(port, host, () => {
    console.log(`Admin panel: http://localhost:${port}/admin.html`);
    console.log(`Templates:   http://localhost:${port}/templates/<slug>.html`);
    if (!loadAuthConfig()) {
      console.log(`\n⚠ No admin password set yet. Run: node set-admin-password.js <username> <password>\n`);
    }
  });
}
