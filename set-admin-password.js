// ==========================================================
// One-time (or whenever-you-want-to-change-it) setup script.
// Run: node set-admin-password.js <username> <password>
// Writes admin-auth.json with a salted hash — never the plaintext
// password itself. This file is gitignored; keep it off any public repo.
// ==========================================================
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const [, , username, password] = process.argv;

if (!username || !password) {
  console.error('Usage: node set-admin-password.js <username> <password>');
  process.exit(1);
}
if (password.length < 8) {
  console.error('Password must be at least 8 characters.');
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString('hex');
const hash = crypto.scryptSync(password, salt, 64).toString('hex');
// signs session cookies (see admin-server.js) — lets login sessions be
// verified without a server-side session store, so they survive process
// restarts and work correctly even if the host runs multiple instances
const sessionSecret = crypto.randomBytes(32).toString('hex');

const authFile = path.join(__dirname, 'admin-auth.json');
fs.writeFileSync(authFile, JSON.stringify({ username, salt, hash, sessionSecret }, null, 2), 'utf8');

console.log(`Saved credentials for "${username}" to admin-auth.json.`);
console.log('Restart admin-server.js for this to take effect.');
