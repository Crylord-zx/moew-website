const params = new URLSearchParams(location.search);
const slug = params.get('slug');
// one stable id per tab, reused for every "Refresh preview" click so we
// overwrite the same temp file on the server instead of piling up new ones
const previewId = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2));

let currentSnapshot = null;

const fieldsEl = document.getElementById('fields');
const templateTitleEl = document.getElementById('templateTitle');
const createBtn = document.getElementById('createBtn');
const createStatusEl = document.getElementById('createStatus');
const previewFrame = document.getElementById('customizeFrame');
const refreshPreviewBtn = document.getElementById('refreshPreviewBtn');

// Visitors only get to edit plain text and static photos — not gifs or
// music. Keeps the form simple and avoids exposing "advanced" template
// internals that are easy to break (looping gifs, audio players, etc).
const EDITABLE_IMAGE_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
const LOCKED_EXT = ['.gif', '.mp3'];

function isAssetKey(key) { return /url$/i.test(key); }
function fileExt(value) { return (String(value).match(/\.[a-z0-9]+$/i) || [''])[0].toLowerCase(); }
function isLockedAsset(key, value) {
  const ext = fileExt(value);
  if (LOCKED_EXT.includes(ext)) return true;
  if (!ext && /song|music|audio/i.test(key)) return true; // no ext yet, but clearly an audio field
  return false;
}
function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function init() {
  if (!slug) {
    templateTitleEl.textContent = 'No template chosen';
    fieldsEl.innerHTML = '<p class="hint">Go back and pick a template first.</p>';
    createBtn.hidden = true;
    return;
  }
  const res = await fetch(`/api/public/templates/${encodeURIComponent(slug)}`);
  if (!res.ok) {
    templateTitleEl.textContent = 'Could not load this template';
    return;
  }
  currentSnapshot = await res.json();
  templateTitleEl.textContent = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  renderFields();
  await refreshPreview();
}

// Whole sections that are "advanced"/interactive rather than plain
// text+photo content — hidden entirely from the customize form, not just
// their individual gif/music fields. Their default content is left as-is
// in the final page; visitors just can't touch it.
const LOCKED_SECTION_PATTERN = /playlist|game/i;

function renderFields() {
  fieldsEl.innerHTML = '';
  let firstVisibleCard = null;

  currentSnapshot.sections.forEach((section, sIdx) => {
    if (LOCKED_SECTION_PATTERN.test(section.id)) return;

    const card = document.createElement('div');
    card.className = 'section-card collapsed';

    // collapsible header — click to expand/collapse this section, so the
    // sidebar isn't one giant unbroken list of every field at once
    const header = document.createElement('button');
    header.type = 'button';
    header.className = 'section-header';
    header.innerHTML = `<span>${escapeHtml(section.id)}</span><span class="chevron">▾</span>`;

    const body = document.createElement('div');
    body.className = 'section-body';
    const inner = document.createElement('div');
    inner.className = 'inner';
    body.appendChild(inner);

    let fieldCount = 0;
    Object.keys(section.values || {}).forEach((key) => {
      const fieldEl = renderField(sIdx, key, section.values[key]);
      if (fieldEl) { inner.appendChild(fieldEl); fieldCount++; }
    });

    // skip sections that only contained locked (gif/music) fields
    if (fieldCount === 0) return;

    header.addEventListener('click', () => card.classList.toggle('collapsed'));
    card.appendChild(header);
    card.appendChild(body);
    fieldsEl.appendChild(card);
    if (!firstVisibleCard) firstVisibleCard = card;
  });

  // open the first section by default so the panel isn't totally empty-looking
  if (firstVisibleCard) firstVisibleCard.classList.remove('collapsed');
}

function renderField(sIdx, key, value) {
  // gifs and music aren't editable by visitors — don't render a field at all
  if (isAssetKey(key) && isLockedAsset(key, value)) return null;

  const wrap = document.createElement('div');
  wrap.className = 'field';
  const label = document.createElement('label');
  label.textContent = key;
  wrap.appendChild(label);

  if (typeof value === 'object' && value !== null) {
    const ta = document.createElement('textarea');
    ta.value = JSON.stringify(value);
    ta.readOnly = true;
    wrap.appendChild(ta);
    return wrap;
  }

  if (isAssetKey(key)) {
    wrap.appendChild(renderAssetField(sIdx, key, value || ''));
    return wrap;
  }

  const str = String(value ?? '');
  const input = str.length > 60 || str.includes('\n') ? document.createElement('textarea') : document.createElement('input');
  if (input.tagName === 'INPUT') input.type = 'text';
  input.value = str;
  input.addEventListener('input', () => {
    currentSnapshot.sections[sIdx].values[key] = input.value;
  });
  wrap.appendChild(input);
  return wrap;
}

function renderAssetField(sIdx, key, value) {
  // only ever reached for editable photo fields now (gifs/music are
  // filtered out earlier in renderField)
  const row = document.createElement('div');
  row.className = 'asset-field';

  const preview = document.createElement('img');
  preview.className = 'asset-preview';
  preview.src = value || '';
  preview.onerror = () => { preview.style.opacity = 0.3; };

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
      status.textContent = 'GIFs can’t be replaced here.';
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
      currentSnapshot.sections[sIdx].values[key] = out.url;
      preview.src = out.url;
      status.textContent = 'Added ✓';
      status.className = 'upload-status ok';
    } catch (e) {
      status.textContent = 'Failed: ' + e.message;
      status.className = 'upload-status err';
    }
  });

  controls.appendChild(fileInput);
  controls.appendChild(status);
  row.appendChild(preview);
  row.appendChild(controls);
  return row;
}

async function refreshPreview() {
  if (!currentSnapshot) return;
  previewFrame.classList.add('loading');
  try {
    const res = await fetch('/api/public/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, snapshot: currentSnapshot, previewId }),
    });
    const out = await res.json();
    if (!res.ok) { console.error('preview failed:', out.error); return; }
    // real http:// URL, not srcdoc/blob — the template's own bundled app code
    // does a location check on load that breaks the whole frame on pseudo-URLs
    previewFrame.src = out.url + '?t=' + Date.now();
    previewFrame.addEventListener('load', () => previewFrame.classList.remove('loading'), { once: true });
  } catch (e) {
    previewFrame.classList.remove('loading');
  }
}
refreshPreviewBtn.addEventListener('click', refreshPreview);

createBtn.addEventListener('click', async () => {
  createBtn.disabled = true;
  createStatusEl.textContent = 'Creating your page…';
  createStatusEl.className = '';
  try {
    const res = await fetch('/api/public/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, snapshot: currentSnapshot }),
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

// small heart-burst celebration when the shareable page is created
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

// small click-ripple feedback on any .btn
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
