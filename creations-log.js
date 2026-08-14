// ==========================================================
// Shared "mailbox" log: every time a visitor generates a shareable page
// on the public site, a small record gets appended here. site-server.js
// writes it, admin-server.js reads it — so you can see everyone's
// generated links from the admin panel, any time, without digging
// through the site/generated/ folder by hand.
// ==========================================================
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'creations-log.json');
const MAX_ENTRIES = 2000; // keep the log itself bounded; the actual generated

function readAll() {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return [];
  }
}

function logCreation({ id, slug, url, ip }) {
  const all = readAll();
  all.push({ id, slug, url, ip: ip || 'unknown', createdAt: new Date().toISOString() });
  const trimmed = all.length > MAX_ENTRIES ? all.slice(all.length - MAX_ENTRIES) : all;
  fs.writeFileSync(file, JSON.stringify(trimmed, null, 2), 'utf8');
}

function listCreations() {
  return readAll().slice().reverse(); // newest first
}

module.exports = { logCreation, listCreations };
