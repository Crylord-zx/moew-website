const params = new URLSearchParams(location.search);
const slug = params.get('slug');
// Reached only via the admin panel's own link for a lovearea template —
// saves become the new master default for everyone instead of a single
// shareable page. Harmless if guessed by a non-admin: the save endpoint
// itself lives in admin-server.js and is session-gated same as every
// other admin write.
const isAdminMode = params.get('admin') === '1';
// one stable id per tab, reused for every "Refresh preview" click so we
// overwrite the same temp file on the server instead of piling up new ones
const previewId = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2));

let currentData = null;
let categoryDesign = null; // { category, design }

const fieldsEl = document.getElementById('fields');
const templateTitleEl = document.getElementById('templateTitle');
const createBtn = document.getElementById('createBtn');
const createStatusEl = document.getElementById('createStatus');
const previewFrame = document.getElementById('customizeFrame');
const refreshPreviewBtn = document.getElementById('refreshPreviewBtn');

// Background music/audio isn't editable here (the upload endpoint only
// accepts images) — visitors keep the template's own default track.
const LOCKED_KEY_PATTERN = /song|music|audio|bgmusic/i;
// Fields whose name suggests a photo, even though these templates name
// them "...Key" — confirmed by reading the bundled app's own code that
// these values are used directly as an <img src>, not looked up anywhere.
const ASSET_KEY_PATTERN = /photo|image|picture|pic$/i;

function isPlainObject(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); }
function isUnresolvedRef(v) { return isPlainObject(v) && Object.prototype.hasOwnProperty.call(v, '__unresolvedRef__'); }
function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function labelFor(key) {
  return String(key).replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (c) => c.toUpperCase());
}
function getAtPath(obj, path) {
  return path.reduce((o, k) => (o == null ? o : o[k]), obj);
}
function setAtPath(obj, path, val) {
  let o = obj;
  for (let i = 0; i < path.length - 1; i++) o = o[path[i]];
  o[path[path.length - 1]] = val;
}
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
// a blank starting point for a new array item, shaped like the first
// existing item (strings/numbers/booleans reset to blank, nested
// structure kept so its own fields still render)
function blankLike(sample) {
  if (typeof sample === 'string') return '';
  if (typeof sample === 'number') return 0;
  if (typeof sample === 'boolean') return false;
  if (Array.isArray(sample)) return [];
  if (isPlainObject(sample)) {
    if (isUnresolvedRef(sample)) return sample; // keep icon refs as-is, never editable
    const out = {};
    for (const k of Object.keys(sample)) out[k] = blankLike(sample[k]);
    return out;
  }
  return sample;
}

async function init() {
  if (!slug) {
    templateTitleEl.textContent = 'No template chosen';
    fieldsEl.innerHTML = '<p class="hint">Go back and pick a template first.</p>';
    createBtn.hidden = true;
    return;
  }
  try {
    const res = await fetch(`/api/public/lovearea-schema/${encodeURIComponent(slug)}`);
    const out = await res.json();
    if (!res.ok) throw new Error(out.error || 'failed to load');
    categoryDesign = { category: out.category, design: out.design };
    currentData = JSON.parse(JSON.stringify(out.sample));
    templateTitleEl.textContent = slug.replace(/^love-/, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    if (isAdminMode) {
      createBtn.textContent = 'Save as master copy →';
      document.querySelector('#customizeSidebar .hint').textContent =
        'This becomes the new default for every future customization and preview link — not a single shareable page.';
    }
    renderFields();
    await refreshPreview();
  } catch (e) {
    templateTitleEl.textContent = 'Could not load this template';
    fieldsEl.innerHTML = `<p class="hint" style="color:#dc2626">${escapeHtml(e.message)}</p>`;
    createBtn.hidden = true;
  }
}

function renderFields() {
  fieldsEl.innerHTML = '';
  // Sections stay collapsed by default — some templates' first section is
  // a long array (e.g. 8+ poetry lines), and auto-expanding it made the
  // whole form thousands of pixels tall before a visitor had touched
  // anything. Expand-on-click only.
  Object.keys(currentData).forEach((key) => {
    const node = renderNode(key, currentData[key], [key], /* topLevel */ true);
    if (node) fieldsEl.appendChild(node);
  });
}

// Renders one value at `path` as either a leaf `.field` or a collapsible
// `.section-card` (objects/arrays), or returns null to skip it entirely
// (locked fields, or values we can't safely serialize like icon refs).
function renderNode(key, value, path) {
  if (LOCKED_KEY_PATTERN.test(String(key))) return null;
  if (isUnresolvedRef(value)) return null;
  if (typeof value === 'function') return null;

  if (Array.isArray(value)) return renderArrayField(key, value, path);
  if (isPlainObject(value)) return renderObjectField(key, value, path);
  if (typeof value === 'boolean') return renderBooleanField(key, value, path);
  if (typeof value === 'number') return renderNumberField(key, value, path);
  return renderStringField(key, value, path);
}

// Which section-cards (by path) a visitor has opened, preserved across
// renderFields() re-runs (e.g. after "+ Add another") so editing an array
// doesn't collapse the very section you're working in back shut.
const expandedPaths = new Set();

function makeSectionCard(key, path, bodyBuilder) {
  const pathKey = path.join('.');
  const card = document.createElement('div');
  card.className = 'section-card collapsed';
  const header = document.createElement('button');
  header.type = 'button';
  header.className = 'section-header';
  header.innerHTML = `<span>${escapeHtml(labelFor(key))}</span><span class="chevron">▾</span>`;
  const body = document.createElement('div');
  body.className = 'section-body';
  const inner = document.createElement('div');
  inner.className = 'inner';
  body.appendChild(inner);

  const count = bodyBuilder(inner);
  if (count === 0) return null; // nothing editable inside — skip the whole card

  if (expandedPaths.has(pathKey)) card.classList.remove('collapsed');
  header.addEventListener('click', () => {
    card.classList.toggle('collapsed');
    if (card.classList.contains('collapsed')) expandedPaths.delete(pathKey);
    else expandedPaths.add(pathKey);
  });
  card.appendChild(header);
  card.appendChild(body);
  return card;
}

function renderObjectField(key, obj, path) {
  return makeSectionCard(key, path, (inner) => {
    let count = 0;
    Object.keys(obj).forEach((k) => {
      const node = renderNode(k, obj[k], [...path, k]);
      if (node) { inner.appendChild(node); count++; }
    });
    return count;
  });
}

function renderArrayField(key, arr, path) {
  return makeSectionCard(key, path, (inner) => {
    arr.forEach((item, idx) => {
      const itemWrap = document.createElement('div');
      itemWrap.className = 'array-item';

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'remove-item';
      removeBtn.textContent = '✕ remove';
      removeBtn.addEventListener('click', () => {
        getAtPath(currentData, path).splice(idx, 1);
        renderFields();
      });
      itemWrap.appendChild(removeBtn);

      if (isPlainObject(item)) {
        Object.keys(item).forEach((k) => {
          const node = renderNode(k, item[k], [...path, idx, k]);
          if (node) itemWrap.appendChild(node);
        });
      } else {
        const node = renderNode(idx, item, [...path, idx]);
        if (node) itemWrap.appendChild(node);
      }
      inner.appendChild(itemWrap);
    });

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'add-item-btn';
    addBtn.textContent = '+ Add another';
    addBtn.addEventListener('click', () => {
      const target = getAtPath(currentData, path);
      const template = target.length > 0 ? target[target.length - 1] : '';
      target.push(blankLike(template));
      renderFields();
    });
    inner.appendChild(addBtn);
    return 1; // arrays always render (even empty, so "Add another" is reachable)
  });
}

function renderBooleanField(key, value, path) {
  const wrap = document.createElement('div');
  wrap.className = 'field checkbox-field';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = !!value;
  input.id = 'f_' + path.join('_');
  input.addEventListener('change', () => setAtPath(currentData, path, input.checked));
  const label = document.createElement('label');
  label.htmlFor = input.id;
  label.textContent = labelFor(key);
  wrap.appendChild(input);
  wrap.appendChild(label);
  return wrap;
}

function renderNumberField(key, value, path) {
  const wrap = document.createElement('div');
  wrap.className = 'field';
  const label = document.createElement('label');
  label.textContent = labelFor(key);
  wrap.appendChild(label);
  const input = document.createElement('input');
  input.type = 'number';
  input.value = value;
  input.addEventListener('input', () => setAtPath(currentData, path, input.value === '' ? 0 : Number(input.value)));
  wrap.appendChild(input);
  return wrap;
}

function renderStringField(key, value, path) {
  const wrap = document.createElement('div');
  wrap.className = 'field';
  const label = document.createElement('label');
  label.textContent = labelFor(key);
  wrap.appendChild(label);

  if (ASSET_KEY_PATTERN.test(String(key))) {
    wrap.appendChild(renderAssetField(value || '', path));
    return wrap;
  }

  const str = String(value ?? '');
  const input = str.length > 60 || str.includes('\n') ? document.createElement('textarea') : document.createElement('input');
  if (input.tagName === 'INPUT') input.type = 'text';
  input.value = str;
  input.addEventListener('input', () => setAtPath(currentData, path, input.value));
  wrap.appendChild(input);
  return wrap;
}

function renderAssetField(value, path) {
  const row = document.createElement('div');
  row.className = 'asset-field';

  // Several templates' default values here are just internal placeholder
  // labels (e.g. "photo1", "cat"), not real image paths — pointing an
  // <img> at one of those just shows a broken-image icon and a 404 in the
  // console. Show a plain placeholder box instead unless the value (or a
  // freshly uploaded photo) actually looks like a real URL.
  const previewSlot = document.createElement('div');
  function setPreview(src) {
    previewSlot.innerHTML = '';
    if (/^(https?:)?\/|^data:/i.test(String(src || ''))) {
      const img = document.createElement('img');
      img.className = 'asset-preview';
      img.src = src;
      img.onerror = () => setPreview(''); // fell through anyway — show placeholder
      previewSlot.appendChild(img);
    } else {
      const ph = document.createElement('div');
      ph.className = 'asset-preview';
      ph.textContent = '🖼️';
      ph.title = 'No photo yet';
      previewSlot.appendChild(ph);
    }
  }
  setPreview(value);

  const controls = document.createElement('div');
  controls.className = 'asset-controls';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/png,image/jpeg,image/webp,image/svg+xml';

  const status = document.createElement('span');
  status.className = 'upload-status';

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (!file) return;
    if (file.type === 'image/gif') {
      status.textContent = 'GIFs can’t be uploaded here.';
      status.className = 'upload-status err';
      fileInput.value = '';
      return;
    }
    status.textContent = 'Uploading…';
    status.className = 'upload-status';
    try {
      const dataBase64 = await fileToBase64(file);
      const res = await fetch('/api/public/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, dataBase64 }),
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error);
      setAtPath(currentData, path, out.url);
      setPreview(out.url);
      status.textContent = 'Added ✓';
      status.className = 'upload-status ok';
    } catch (e) {
      status.textContent = 'Failed: ' + e.message;
      status.className = 'upload-status err';
    }
  });

  controls.appendChild(fileInput);
  controls.appendChild(status);
  row.appendChild(previewSlot);
  row.appendChild(controls);
  return row;
}

// The template itself is a real, scrollable page — inside the small
// rounded phone-mockup frame here, its native scrollbar reads as a stray
// UI element rather than part of the preview. Same-origin, so a style tag
// can be injected directly; content still scrolls fine via touch/wheel,
// it just doesn't show the bar.
function hidePreviewScrollbar() {
  try {
    const doc = previewFrame.contentDocument;
    if (!doc) return;
    const style = doc.createElement('style');
    style.textContent = '::-webkit-scrollbar{display:none} html{scrollbar-width:none;-ms-overflow-style:none;}';
    doc.head.appendChild(style);
  } catch (e) { /* cross-origin or not-yet-ready — harmless no-op */ }
}

async function refreshPreview() {
  if (!currentData) return;
  previewFrame.classList.add('loading');
  try {
    const res = await fetch('/api/public/lovearea/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, data: currentData, previewId }),
    });
    const out = await res.json();
    if (!res.ok) { console.error('preview failed:', out.error); return; }
    previewFrame.src = out.url + '&t=' + Date.now();
    previewFrame.addEventListener('load', () => {
      previewFrame.classList.remove('loading');
      hidePreviewScrollbar();
    }, { once: true });
  } catch (e) {
    previewFrame.classList.remove('loading');
  }
}
refreshPreviewBtn.addEventListener('click', refreshPreview);

createBtn.addEventListener('click', async () => {
  createBtn.disabled = true;
  createStatusEl.textContent = isAdminMode ? 'Saving…' : 'Creating your page…';
  createStatusEl.className = '';
  try {
    if (isAdminMode) {
      const res = await fetch(`/api/lovearea/${encodeURIComponent(slug)}/master`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: currentData }),
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error);
      createStatusEl.textContent = 'Saved as master copy ✓';
      createStatusEl.className = '';
      return;
    }

    const res = await fetch('/api/public/lovearea/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, data: currentData }),
    });
    const out = await res.json();
    if (!res.ok) throw new Error(out.error);

    const fullUrl = location.origin + out.url;
    document.getElementById('shareLinkInput').value = fullUrl;
    document.getElementById('openLinkBtn').href = out.url;
    document.getElementById('qrImage').src =
      `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(fullUrl)}`;
    document.getElementById('successOverlay').hidden = false;
    burstHearts();
    createStatusEl.textContent = '';
  } catch (e) {
    createStatusEl.textContent = 'Failed: ' + e.message;
    createStatusEl.className = 'err';
  } finally {
    createBtn.disabled = false;
  }
});

document.getElementById('copyLinkBtn').addEventListener('click', () => {
  const input = document.getElementById('shareLinkInput');
  input.select();
  navigator.clipboard.writeText(input.value).catch(() => {});
});
document.getElementById('closeSuccessBtn').addEventListener('click', () => {
  location.href = '/';
});

function burstHearts() {
  const overlay = document.getElementById('successOverlay');
  const glyphs = ['♡', '✿', '💜', '💗'];
  for (let i = 0; i < 14; i++) {
    const el = document.createElement('span');
    el.className = 'burst-heart';
    el.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    el.style.left = (45 + Math.random() * 10) + '%';
    el.style.setProperty('--dx', (Math.random() * 240 - 120) + 'px');
    el.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg');
    el.style.animationDelay = (Math.random() * 0.15) + 's';
    el.style.fontSize = (14 + Math.random() * 14) + 'px';
    overlay.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  btn.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
});

init();
