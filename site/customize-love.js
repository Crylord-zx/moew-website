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

let categoryDesign = null; // { category, design }
const form = createLoveAreaForm(document.getElementById('fields'));

const templateTitleEl = document.getElementById('templateTitle');
const createBtn = document.getElementById('createBtn');
const createStatusEl = document.getElementById('createStatus');
const previewFrame = document.getElementById('customizeFrame');
const refreshPreviewBtn = document.getElementById('refreshPreviewBtn');

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function init() {
  if (!slug) {
    templateTitleEl.textContent = 'No template chosen';
    document.getElementById('fields').innerHTML = '<p class="hint">Go back and pick a template first.</p>';
    createBtn.hidden = true;
    return;
  }
  try {
    const res = await fetch(`/api/public/lovearea-schema/${encodeURIComponent(slug)}`);
    const out = await res.json();
    if (!res.ok) throw new Error(out.error || 'failed to load');
    categoryDesign = { category: out.category, design: out.design };
    templateTitleEl.textContent = slug.replace(/^love-/, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    if (isAdminMode) {
      createBtn.textContent = 'Save as master copy →';
      document.querySelector('#customizeSidebar .hint').textContent =
        'This becomes the new default for every future customization and preview link — not a single shareable page.';
    }
    form.setData(JSON.parse(JSON.stringify(out.sample)));
    await refreshPreview();
  } catch (e) {
    templateTitleEl.textContent = 'Could not load this template';
    document.getElementById('fields').innerHTML = `<p class="hint" style="color:#dc2626">${escapeHtml(e.message)}</p>`;
    createBtn.hidden = true;
  }
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
  if (!form.getData()) return;
  previewFrame.classList.add('loading');
  try {
    const res = await fetch('/api/public/lovearea/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, data: form.getData(), previewId }),
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
        body: JSON.stringify({ data: form.getData() }),
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
      body: JSON.stringify({ slug, data: form.getData() }),
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
