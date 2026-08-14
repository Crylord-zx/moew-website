// ==========================================================
// Merged single-deployment entry point.
//
// Why this exists: on a PaaS host like Hostinger, each deployment gets
// its own isolated filesystem. Running site-server.js and admin-server.js
// as two separate deployments means an edit saved in the admin panel
// lands on the admin deployment's disk only — the public site deployment
// never sees it, since it's a completely different instance. This file
// runs BOTH handlers in one process on one shared filesystem, choosing
// which one answers each request by looking at the Host header. Now an
// admin save writes to the exact file the public site reads from.
//
// Routing: requests to a hostname starting with "admin." (or matching
// ADMIN_HOST exactly, if you set that env var) go to the admin panel;
// everything else goes to the public site. Point your main domain and an
// "admin.<yourdomain>" subdomain at this same deployment — no second
// deployment needed.
//
// site-server.js and admin-server.js are both still fully runnable on
// their own (`node site-server.js` / `node admin-server.js`) for local
// dev or for a VPS setup where you'd rather keep them as genuinely
// separate processes — this file only changes how they're wired together
// when you want one deployment to serve both.
// ==========================================================
const http = require('http');
const { handleSiteRequest, cleanupStalePreviews } = require('./site-server');
const { handleAdminRequest, loadAuthConfig } = require('./admin-server');

const port = process.env.PORT || 8800;
const host = process.env.HOST || undefined; // undefined = all interfaces
const explicitAdminHost = process.env.ADMIN_HOST; // e.g. "admin.weddingduniya.in"

function isAdminRequest(req) {
  const requestHost = (req.headers.host || '').split(':')[0].toLowerCase();
  if (explicitAdminHost) return requestHost === explicitAdminHost.toLowerCase();
  return requestHost.startsWith('admin.');
}

cleanupStalePreviews();

const server = http.createServer((req, res) => {
  if (isAdminRequest(req)) {
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
  console.log(`  Public site: any hostname not starting with "admin."`);
  console.log(`  Admin panel: a hostname starting with "admin."${explicitAdminHost ? ` (or exactly "${explicitAdminHost}")` : ''}`);
  if (!loadAuthConfig()) {
    console.log(`\n⚠ No admin password set yet. Run: node set-admin-password.js <username> <password>\n`);
  }
});
