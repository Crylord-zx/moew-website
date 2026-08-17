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
const { getCategories, setCategoryDef, addCategory, getMeta: getCategoryMeta, setMeta: setCategoryMeta } = require('./template-categories');
const { IMPORTED_TEMPLATES, EDITABLE_IMPORTED_SLUGS } = require('./imported-templates');
const IMPORTED_SLUGS = new Set(IMPORTED_TEMPLATES.map((t) => t.slug));
const { listCreations } = require('./creations-log');

const root = __dirname;
const templatesDir = path.join(root, 'templates');
const cdnDir = path.join(root, 'cdn', 'template-seeds');
const backupsDir = path.join(root, 'admin-backups');
const authFile = path.join(root, 'admin-auth.json');
// The 27 lovearea.in templates use a completely different editing
// mechanism (a patched bundle + per-visitor override data — see
// site-server.js / customize-love.html), not the snapshot-based
// extractSnapshot/writeSnapshot flow the rest of this file uses. There's
// no "master copy" to edit here the way there is for the templates/*.html
// ones — admin can only see them, toggle visibility, and customize a page
// the same way a visitor would.
const LOVEAREA_SCHEMAS = JSON.parse(fs.readFileSync(path.join(root, 'lovearea-schemas.json'), 'utf8'));
const { getMaster: getLoveMaster, setMaster: setLoveMaster } = require('./lovearea-master');
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
  // imported templates that have been made editable (Format 2 patched —
  // window.__PAGE_DATA__ injected) live at imported/<slug>/index.html,
  // not templates/<slug>.html — everything else (extractSnapshot,
  // writeSnapshot, backups, history) is agnostic to file location, so
  // this one branch is all that's needed to reuse the whole pipeline.
  if (EDITABLE_IMPORTED_SLUGS.has(slug)) {
    return path.join(root, 'imported', slug, 'index.html');
  }
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

// Same idea as the classic-template backups above, adapted for lovearea's
// plain-data master copies (.json instead of .html) — slugs are already
// namespaced ("love-..." never collides with a classic slug), so this
// reuses the exact same backupDir(slug) function and directory.
function loveBackupIdFor(now = new Date()) {
  return now.toISOString().replace(/[:.]/g, '-') + '.json';
}
function makeLoveBackup(slug, data) {
  const dir = backupDir(slug);
  fs.mkdirSync(dir, { recursive: true });
  const id = loveBackupIdFor();
  fs.writeFileSync(path.join(dir, id), JSON.stringify(data), 'utf8');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort();
  const excess = files.length - MAX_BACKUPS_PER_TEMPLATE;
  if (excess > 0) {
    for (const f of files.slice(0, excess)) fs.unlinkSync(path.join(dir, f));
  }
  return id;
}
function listLoveBackups(slug) {
  const dir = backupDir(slug);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .reverse()
    .map((f) => ({ id: f, savedAt: backupIdToIso(f.replace(/\.json$/, '.html')) }));
}
function loveBackupIdSafe(id) {
  if (!/^[0-9TZ:.-]+\.json$/i.test(id)) throw new Error('invalid backup id');
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
    const loveList = Object.entries(LOVEAREA_SCHEMAS).map(([slug, entry]) => ({
      slug,
      title: slug.replace(/^love-/, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      enabled: isEnabled(slug),
      isLovearea: true,
      hasMaster: !!getLoveMaster(slug),
      previewUrl: `/template/${entry.category}/${entry.design}?preview=true`,
      category: entry.category,
    }));
    const importedList = IMPORTED_TEMPLATES.map((t) => ({ ...t, enabled: isEnabled(t.slug) }));
    const merged = [...list, ...loveList, ...importedList].map((t) => ({ ...t, ...getCategoryMeta(t.slug, t.category) }));
    return sendJson(res, 200, merged);
  }

  // GET /api/categories -> the live taxonomy (defaults + any saved
  // label/emoji/order overrides), for populating the category <select> in
  // every template row and the category-settings panel
  if (req.method === 'GET' && pathname === '/api/categories') {
    return sendJson(res, 200, getCategories());
  }

  // POST /api/categories -> {label, emoji?}. Creates a brand-new category
  // (auto-slugified key, placed at the end of the pill order) — separate
  // from the fixed default six, but works identically everywhere else
  // (templates can be assigned to it, it gets its own pill/URL, etc.)
  if (req.method === 'POST' && pathname === '/api/categories') {
    try {
      const { label, emoji } = await readJsonBody(req);
      const cat = addCategory({ label, emoji });
      return sendJson(res, 200, { ok: true, ...cat });
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // POST /api/categories/:key -> {label?, emoji?, order?}. Renames a
  // category's display text/icon and/or moves it earlier or later in the
  // pill nav — the category KEY itself (birthday, valentine, …) is fixed,
  // since it's baked into every already-saved template's category field.
  const categoryDefMatch = pathname.match(/^\/api\/categories\/([^/]+)$/);
  if (req.method === 'POST' && categoryDefMatch) {
    try {
      const { label, emoji, order } = await readJsonBody(req);
      const def = setCategoryDef(categoryDefMatch[1], { label, emoji, order });
      return sendJson(res, 200, { ok: true, ...def });
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // POST /api/templates/:slug/category -> {category?, order?, featured?,
  // trending?, recommended?}. Lets admin put any template (classic or
  // lovearea) into a category, set its sort order within the gallery, and
  // flag it as featured / trending / recommended — the public gallery
  // reads this same stored metadata via template-categories.js.
  const categoryMatch = pathname.match(/^\/api\/templates\/([^/]+)\/category$/);
  if (req.method === 'POST' && categoryMatch) {
    try {
      const slug = categoryMatch[1];
      const loveEntry = LOVEAREA_SCHEMAS[slug];
      if (!loveEntry && !IMPORTED_SLUGS.has(slug)) {
        templateFile(slug);
        if (!fs.existsSync(templateFile(slug))) throw new Error('template not found');
      }
      const { category, order, featured, trending, recommended } = await readJsonBody(req);
      const meta = setCategoryMeta(slug, { category, order, featured, trending, recommended }, loveEntry && loveEntry.category);
      return sendJson(res, 200, { ok: true, ...meta });
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
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
      if (!LOVEAREA_SCHEMAS[slug] && !IMPORTED_SLUGS.has(slug)) {
        templateFile(slug); // throws if slug is invalid — also confirms it exists below
        if (!fs.existsSync(templateFile(slug))) throw new Error('template not found');
      }
      const { enabled } = await readJsonBody(req);
      setEnabled(slug, !!enabled);
      return sendJson(res, 200, { ok: true, enabled: !!enabled });
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // POST /api/lovearea/:slug/master -> {data} -> becomes the new default
  // every future customization and bare preview starts from. There's no
  // "master file" to edit for these the way there is for templates/*.html
  // (their real defaults live inside the minified bundle) — this is
  // instead a full data snapshot, read back by site-server.js's public
  // schema endpoint (for new customizations) and by lovearea/index.html's
  // own boot script (for bare, un-customized preview links), both merged
  // in the same deep-merge way a visitor's own saved override is.
  const loveMasterMatch = pathname.match(/^\/api\/lovearea\/([^/]+)\/master$/);
  if (req.method === 'POST' && loveMasterMatch) {
    try {
      const slug = loveMasterMatch[1];
      if (!LOVEAREA_SCHEMAS[slug]) throw new Error('unknown template');
      const { data } = await readJsonBody(req);
      // back up whatever was live before this save overwrites it — same
      // "every save is undoable" guarantee the classic templates have
      const previous = getLoveMaster(slug);
      let backupId = null;
      if (previous) backupId = makeLoveBackup(slug, previous);
      setLoveMaster(slug, data);
      return sendJson(res, 200, { ok: true, backupId });
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // GET /api/lovearea/:slug/backups -> list of {id, savedAt}
  const loveBackupsMatch = pathname.match(/^\/api\/lovearea\/([^/]+)\/backups$/);
  if (req.method === 'GET' && loveBackupsMatch) {
    try {
      if (!LOVEAREA_SCHEMAS[loveBackupsMatch[1]]) throw new Error('unknown template');
      return sendJson(res, 200, listLoveBackups(loveBackupsMatch[1]));
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // POST /api/lovearea/:slug/restore -> {id} -> restores that backup as
  // the current master (backing up the current one first, same as the
  // classic templates' restore — always reversible)
  const loveRestoreMatch = pathname.match(/^\/api\/lovearea\/([^/]+)\/restore$/);
  if (req.method === 'POST' && loveRestoreMatch) {
    try {
      const slug = loveRestoreMatch[1];
      if (!LOVEAREA_SCHEMAS[slug]) throw new Error('unknown template');
      const { id } = await readJsonBody(req);
      const safeId = loveBackupIdSafe(id);
      const backupPath = path.join(backupDir(slug), safeId);
      const restoredData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
      const current = getLoveMaster(slug);
      if (current) makeLoveBackup(slug, current);
      setLoveMaster(slug, restoredData);
      return sendJson(res, 200, { ok: true });
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // GET /api/templates/:slug -> full snapshot
  const getMatch = pathname.match(/^\/api\/templates\/([^/]+)$/);
  if (req.method === 'GET' && getMatch) {
    // A lovearea slug has no templates/*.html file to read — this branch
    // only exists so a stale/cached older admin.js hitting this endpoint
    // for one fails with a clear, expected error instead of a raw ENOENT
    // stack trace. The current admin.js never calls this endpoint for a
    // lovearea slug in the first place (it opens customize-love.html
    // instead), so this is a defensive backstop, not the normal path.
    if (LOVEAREA_SCHEMAS[getMatch[1]]) {
      return sendJson(res, 400, { error: 'This template has no editable snapshot here — use its "customize" link from the template list instead.' });
    }
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
    if (LOVEAREA_SCHEMAS[getMatch[1]]) {
      return sendJson(res, 400, { error: 'This template has no editable snapshot here — use its "customize" link from the template list instead.' });
    }
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
    // stateless tokens — nothing to invalidate server-side, just clear the
    // cookie. Also clear "admin_mode" (the hidden-path entry flag from
    // server.js) here, not just the login session — otherwise a full
    // logout still leaves the browser permanently routed to the admin
    // panel on every path, with no way back to the public site short of
    // manually clearing cookies. Harmless to set even when running
    // standalone (admin-server.js on its own has no such cookie to begin
    // with, so this is a no-op there).
    res.setHeader('Set-Cookie', [
      `${SESSION_COOKIE}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`,
      `admin_mode=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`,
    ]);
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
    const headers = { 'Content-Type': mime[ext] || 'application/octet-stream' };
    // The admin panel's own UI files (admin.html/admin.js/admin.css)
    // change as this project is actively worked on and have no
    // cache-busting filename hash — without this, a browser can keep
    // running stale JS well after a fix has shipped (this exact bug hit
    // the public site's site.js earlier and got the same fix there).
    if (/^\/admin\.(html|js|css)$/.test(urlPath)) headers['Cache-Control'] = 'no-cache';
    res.writeHead(200, headers);
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
