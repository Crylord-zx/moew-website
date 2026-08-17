// ==========================================================
// Shared helper for per-template category / order / featured state.
// Same pattern as template-visibility.js: a flat JSON file keyed by slug,
// read fresh on every call so admin panel changes reach the public site
// immediately, with no caching or restart needed.
// ==========================================================
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'template-categories.json');
const defsFile = path.join(__dirname, 'category-definitions.json');

// Categories that would otherwise hold only 1-3 templates are folded into
// the closest thematic neighbor instead of getting their own (near-empty)
// pill: confession/crush/date/girlfriend's-day -> valentine (all
// "pursuing someone" occasions), cheer-up -> friendship, holi -> other.
//
// This is the fixed set of valid category KEYS — those are load-bearing
// (guess rules, legacy remap, and every saved template's "category" field
// point at them) so they never change from the admin panel. What the admin
// panel CAN change per key is its display label, emoji, and pill order —
// see readCategoryDefs/setCategoryDef below, which layer overrides on top
// of these defaults.
const DEFAULT_CATEGORIES = [
  { key: 'birthday', label: 'Birthday', emoji: '🎂', order: 0 },
  { key: 'anniversary', label: 'Anniversary', emoji: '💍', order: 1 },
  { key: 'valentine', label: 'Valentine', emoji: '💘', order: 2 },
  { key: 'apology', label: 'Apology', emoji: '🙏', order: 3 },
  { key: 'friendship', label: 'Friendship', emoji: '🤝', order: 4 },
  { key: 'other', label: 'Other', emoji: '✨', order: 5 },
];
const CATEGORY_KEYS = new Set(DEFAULT_CATEGORIES.map((c) => c.key));

function readCategoryDefs() {
  try {
    return JSON.parse(fs.readFileSync(defsFile, 'utf8'));
  } catch {
    return {};
  }
}

// Live category list: DEFAULT_CATEGORIES with any admin-saved label/emoji/
// order overrides applied, PLUS any fully-custom categories the admin has
// added (stored the same way, just with no matching default to merge
// onto) — sorted by order. This is what both the admin panel's
// pill-management UI and the public gallery's pill nav read.
function getCategories() {
  const overrides = readCategoryDefs();
  const defaults = DEFAULT_CATEGORIES.map((c) => ({ ...c, ...(overrides[c.key] || {}) }));
  const custom = Object.keys(overrides)
    .filter((key) => !CATEGORY_KEYS.has(key))
    .map((key) => ({
      key,
      label: overrides[key].label || key,
      emoji: overrides[key].emoji || '🏷️',
      order: typeof overrides[key].order === 'number' ? overrides[key].order : 99,
      custom: true,
    }));
  return [...defaults, ...custom].sort((a, b) => a.order - b.order);
}

// Every valid category key right now — the fixed defaults plus whatever
// custom ones have been added — used to validate a template's assigned
// category (setMeta below) since that's no longer just the default set.
function allCategoryKeys() {
  const overrides = readCategoryDefs();
  return new Set([...CATEGORY_KEYS, ...Object.keys(overrides).filter((k) => !CATEGORY_KEYS.has(k))]);
}

function setCategoryDef(key, { label, order, emoji }) {
  // was CATEGORY_KEYS.has(key) — that's only the fixed 6 defaults, so any
  // edit (rename/reorder) on a category added later through addCategory()
  // always 400'd with "unknown category". allCategoryKeys() includes those.
  if (!allCategoryKeys().has(key)) throw new Error('unknown category');
  const overrides = readCategoryDefs();
  const next = { ...(overrides[key] || {}) };
  if (label !== undefined) {
    const trimmed = String(label).trim();
    if (!trimmed) throw new Error('label cannot be empty');
    next.label = trimmed;
  }
  if (emoji !== undefined) next.emoji = String(emoji).trim();
  if (order !== undefined) next.order = Number(order) || 0;
  overrides[key] = next;
  fs.writeFileSync(defsFile, JSON.stringify(overrides, null, 2), 'utf8');
  return getCategories().find((c) => c.key === key);
}

// Admin-added category. The key is slugified from the label and guaranteed
// unique against every existing key (default or custom) — templates,
// slugs, and routes never reference these auto-generated keys anywhere
// else, so there's no legacy-URL concern the way there is for the fixed
// defaults.
function addCategory({ label, emoji }) {
  const trimmedLabel = String(label || '').trim();
  if (!trimmedLabel) throw new Error('label is required');

  const existing = allCategoryKeys();
  let base = trimmedLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'category';
  let key = base;
  let n = 2;
  while (existing.has(key)) key = `${base}-${n++}`;

  const overrides = readCategoryDefs();
  const maxOrder = getCategories().reduce((m, c) => Math.max(m, c.order), -1);
  overrides[key] = { label: trimmedLabel, emoji: String(emoji || '🏷️').trim() || '🏷️', order: maxOrder + 1 };
  fs.writeFileSync(defsFile, JSON.stringify(overrides, null, 2), 'utf8');
  return getCategories().find((c) => c.key === key);
}

// Some callers (the lovearea.in templates) pass their ORIGINAL category as
// a fallback — that same string is also baked into their slug and their
// live /template/<category>/<design> route, so it can never be renamed at
// the source. This remaps only the display/gallery grouping, folding the
// once-standalone near-empty categories into a thematic neighbor.
const LEGACY_REMAP = {
  confession: 'valentine',
  crushday: 'valentine',
  date: 'valentine',
  girlfriendday: 'valentine',
  cheerup: 'friendship',
  holi: 'other',
};

function readAll() {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return {};
  }
}

function writeAll(all) {
  fs.writeFileSync(file, JSON.stringify(all, null, 2), 'utf8');
}

// Best-effort keyword guess for templates never categorized in the admin
// panel yet, so the gallery never shows an empty/uncategorized pile before
// anyone's touched the new admin controls. Checked in order, first match wins.
const GUESS_RULES = [
  [/birthday|bday/i, 'birthday'],
  [/anniversary/i, 'anniversary'],
  [/valentine|propose|proposal|confess|crush|\bdate\b|dating|girlfriend/i, 'valentine'],
  [/sorry|apolog/i, 'apology'],
  [/friend|cheer|comfort/i, 'friendship'],
];
function guessCategory(slug) {
  for (const [re, cat] of GUESS_RULES) {
    if (re.test(slug)) return cat;
  }
  return 'other';
}

// fallbackCategory lets callers pass a known category (e.g. lovearea
// templates already carry one) that wins over the keyword guess but is
// still overridable by an explicit admin save.
function getMeta(slug, fallbackCategory) {
  const all = readAll();
  const saved = all[slug] || {};
  const fallback = fallbackCategory && (LEGACY_REMAP[fallbackCategory] || fallbackCategory);
  return {
    category: saved.category || fallback || guessCategory(slug),
    order: typeof saved.order === 'number' ? saved.order : 0,
    featured: !!saved.featured,
    trending: !!saved.trending,
    recommended: !!saved.recommended,
  };
}

// fallbackCategory is threaded through here too (not just getMeta) so a
// save that only touches e.g. "trending" — never having set a category
// before — still resolves the right category afterwards instead of
// falling back to a same-slug keyword guess that may disagree with the
// lovearea entry's real source category.
function setMeta(slug, { category, order, featured, trending, recommended }, fallbackCategory) {
  const all = readAll();
  const next = { ...(all[slug] || {}) };
  if (category !== undefined) {
    if (!allCategoryKeys().has(category)) throw new Error('invalid category');
    next.category = category;
  }
  if (order !== undefined) next.order = Number(order) || 0;
  if (featured !== undefined) next.featured = !!featured;
  if (trending !== undefined) next.trending = !!trending;
  if (recommended !== undefined) next.recommended = !!recommended;
  all[slug] = next;
  writeAll(all);
  return getMeta(slug, fallbackCategory);
}

module.exports = { CATEGORY_KEYS, getCategories, setCategoryDef, addCategory, readAll, getMeta, setMeta, guessCategory };
