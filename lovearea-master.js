// ==========================================================
// Shared helper for the 27 lovearea templates' admin-edited "master copy"
// data. There's no template file to edit for these the way there is for
// templates/*.html — their real defaults live inside the minified bundle
// — so this is a full data snapshot per slug instead, read fresh on every
// call (same pattern as template-visibility.js) so an admin save takes
// effect immediately with no restart needed. admin-server.js writes it;
// site-server.js reads it (new customizations start from it, and bare
// preview links show it via lovearea/index.html's own boot script).
// ==========================================================
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'lovearea-master.json');

function readAll() {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return {};
  }
}

function getMaster(slug) {
  return readAll()[slug] || null;
}

function setMaster(slug, data) {
  const all = readAll();
  all[slug] = data;
  fs.writeFileSync(file, JSON.stringify(all, null, 2), 'utf8');
}

module.exports = { getMaster, setMaster };
