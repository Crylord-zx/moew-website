// ==========================================================
// Merged single-deployment entry point.
//
// Why this exists: on a PaaS host like Hostinger, each deployment gets
// its own isolated filesystem. Running site-server.js and admin-server.js
// as two separate deployments means an edit saved in the admin panel
// lands on the admin deployment's disk only — the public site deployment
// never sees it, since it's a completely different instance. This file
// runs BOTH handlers in one process on one shared filesystem, choosing
// which one answers each request. Now an admin save writes to the exact
// file the public site reads from.
//
// Two ways to reach the admin panel, both supported at once:
//
// 1. Subdomain — a hostname starting with "admin." (or matching
//    ADMIN_HOST exactly, if set) always gets the admin panel. Point an
//    "admin.<yourdomain>" subdomain at this same deployment.
//
// 2. Hidden path on your main domain — set ADMIN_UNLOCK_PATH to a secret
//    path only you know (e.g. "/enter-something-only-you-would-guess"),
//    as an environment variable on your host, NEVER hardcoded here or
//    committed to git. Visiting that exact path once sets a long-lived
//    signed cookie flagging your browser as "admin mode", then redirects
//    to "/". From then on, every request from that browser sees the
//    admin panel at the normal paths (/, /admin.html, /api/templates,
//    ...) — everyone else, with no such cookie, keeps seeing the public
//    site at those exact same paths. The real username/password login
//    still fully gates actual data underneath this — the cookie only
//    decides which app renders for a shared path like "/", it is not
//    itself a bypass of authentication.
//
//    If ADMIN_UNLOCK_PATH is never set, this second method is simply
//    disabled — only the subdomain method works.
//
// site-server.js and admin-server.js are both still fully runnable on
// their own (`node site-server.js` / `node admin-server.js`) for local
// dev or for a VPS setup where you'd rather keep them as genuinely
// separate processes — this file only changes how they're wired together
// when you want one deployment to serve both.
// ==========================================================
const http = require('http');
const { handleSiteRequest, cleanupStalePreviews } = require('./site-server');
const { handleAdminRequest, loadAuthConfig, signToken, verifyToken } = require('./admin-server');

const port = process.env.PORT || 8800;
const host = process.env.HOST || undefined; // undefined = all interfaces
const explicitAdminHost = process.env.ADMIN_HOST; // e.g. "admin.weddingduniya.in"
const adminUnlockPath = process.env.ADMIN_UNLOCK_PATH; // e.g. "/enter-only-you-know-this"

const ADMIN_MODE_COOKIE = 'admin_mode';
const ADMIN_MODE_TTL_MS = 365 * 24 * 60 * 60 * 1000; // 1 year

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

function hasAdminModeCookie(req) {
  const config = loadAuthConfig();
  if (!config || !config.sessionSecret) return false;
  const token = parseCookies(req)[ADMIN_MODE_COOKIE];
  if (!token) return false;
  return !!verifyToken(token, config.sessionSecret);
}

function isAdminHost(req) {
  const requestHost = (req.headers.host || '').split(':')[0].toLowerCase();
  if (explicitAdminHost && requestHost === explicitAdminHost.toLowerCase()) return true;
  return requestHost.startsWith('admin.');
}

cleanupStalePreviews();

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(req.url.split('?')[0]);

  // The hidden unlock path: set the cookie, then redirect away from it so
  // it never sits in the address bar or gets bookmarked mid-flow.
  if (adminUnlockPath && pathname === adminUnlockPath) {
    const config = loadAuthConfig();
    if (config && config.sessionSecret) {
      const token = signToken({ exp: Date.now() + ADMIN_MODE_TTL_MS }, config.sessionSecret);
      res.setHeader(
        'Set-Cookie',
        `${ADMIN_MODE_COOKIE}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${ADMIN_MODE_TTL_MS / 1000}`
      );
    }
    res.writeHead(302, { Location: '/' });
    res.end();
    return;
  }

  // Once a browser has the admin-mode cookie, every path on this domain
  // routes to the admin panel — including "/", so there was previously no
  // way back to see the public site in that same browser without manually
  // clearing cookies. This path clears just that one cookie (your actual
  // login session, if any, is untouched) and sends you back to "/", which
  // now resolves to the public site again. Doesn't need to be secret —
  // it only ever *leaves* admin mode, never grants it.
  if (pathname === '/exit-admin-mode') {
    res.setHeader('Set-Cookie', `${ADMIN_MODE_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
    res.writeHead(302, { Location: '/' });
    res.end();
    return;
  }

  if (isAdminHost(req) || hasAdminModeCookie(req)) {
    handleAdminRequest(req, res);
  } else {
    handleSiteRequest(req, res);
  }
});

// A single bad request or edge-case bug should never take the whole thing
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
  console.log(`Merged server listening on port ${port}`);
  console.log(`  Public site: any hostname not starting with "admin.", and no admin-mode cookie`);
  console.log(`  Admin panel: a hostname starting with "admin."${explicitAdminHost ? ` (or exactly "${explicitAdminHost}")` : ''}${adminUnlockPath ? `, or any browser that has visited the hidden unlock path` : ''}`);
  if (!adminUnlockPath) {
    console.log(`  (ADMIN_UNLOCK_PATH is not set — the hidden-path entry method is disabled, only the subdomain works)`);
  }
  if (!loadAuthConfig()) {
    console.log(`\n⚠ No admin password set yet. Run: node set-admin-password.js <username> <password>\n`);
  }
});
