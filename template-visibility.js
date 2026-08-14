// ==========================================================
// Shared helper for per-template show/hide state. Both admin-server.js
// (writes it) and site-server.js (reads it) use this — it's just a flat
// JSON file of slug -> enabled, read fresh on every call so changes made
// in the admin panel take effect on the public site immediately, with no
// caching or restart needed.
// ==========================================================
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'template-visibility.json');

function readAll() {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return {};
  }
}

// templates default to enabled unless explicitly turned off
function isEnabled(slug) {
  const all = readAll();
  return all[slug] !== false;
}

function setEnabled(slug, enabled) {
  const all = readAll();
  if (enabled) delete all[slug]; // keep the file small — only store overrides
  else all[slug] = false;
  fs.writeFileSync(file, JSON.stringify(all, null, 2), 'utf8');
}

module.exports = { isEnabled, setEnabled, readAll };
