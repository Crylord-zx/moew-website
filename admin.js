// ==========================================================
// Admin panel frontend. Vanilla JS, no build step.
// Talks to admin-server.js's tiny JSON API.
// ==========================================================
let currentSlug = null;
let currentSnapshot = null;
// The 27 lovearea templates have no templates/*.html file or "sections"
// snapshot — their editable content is a plain data object instead (see
// lovearea-form.js, shared with the public customize page). This flag is
// how every shared control (save button, preview refresh, history) knows
// which mode it's currently in.
let currentIsLovearea = false;
let loveForm = null;
let loveCategoryDesign = null; // { category, design }
const lovePreviewId = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2));

const templateListEl = document.getElementById('templateList');
const emptyEl = document.getElementById('empty');
const editorEl = document.getElementById('editor');
const editorTitleEl = document.getElementById('editorTitle');
const sectionsEl = document.getElementById('sections');
const saveBtn = document.getElementById('saveBtn');
const saveStatusEl = document.getElementById('saveStatus');
const viewLiveLink = document.getElementById('viewLiveLink');
const previewFrame = document.getElementById('previewFrame');
const refreshPreviewBtn = document.getElementById('refreshPreviewBtn');
const historyBtn = document.getElementById('historyBtn');
const historyPanel = document.getElementById('historyPanel');
const historyListEl = document.getElementById('historyList');
const mailboxBtn = document.getElementById('mailboxBtn');
const mailboxViewEl = document.getElementById('mailboxView');
const mailboxListEl = document.getElementById('mailboxList');
const mailboxCountEl = document.getElementById('mailboxCount');
const refreshMailboxBtn = document.getElementById('refreshMailboxBtn');
const templateSearchInput = document.getElementById('templateSearchInput');
const categoryFilterSelect = document.getElementById('categoryFilterSelect');
const categoriesBtn = document.getElementById('categoriesBtn');
const categoriesViewEl = document.getElementById('categoriesView');
const categoriesBoardEl = document.getElementById('categoriesBoard');
const refreshCategoriesBtn = document.getElementById('refreshCategoriesBtn');
const categorySettingsListEl = document.getElementById('categorySettingsList');
const newCategoryEmojiInput = document.getElementById('newCategoryEmoji');
const newCategoryLabelInput = document.getElementById('newCategoryLabel');
const addCategoryBtn = document.getElementById('addCategoryBtn');

let CATEGORY_LIST = [];
let lastTemplateList = [];

async function loadCategoryList() {
  try {
    const res = await fetch('/api/categories');
    CATEGORY_LIST = await res.json();
    categoryFilterSelect.innerHTML = '<option value="">All categories</option>' +
      CATEGORY_LIST.map((c) => `<option value="${c.key}">${c.emoji} ${escapeHtml(c.label)}</option>`).join('');
  } catch {}
}

// small click-ripple feedback on any .btn, including ones added later
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

async function reloadPreview() {
  if (!currentSlug) return;
  if (currentIsLovearea) {
    if (!loveForm || !loveForm.getData()) return;
    try {
      const res = await fetch('/api/public/lovearea/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: currentSlug, data: loveForm.getData(), previewId: lovePreviewId }),
      });
      const out = await res.json();
      if (!res.ok) { console.error('preview failed:', out.error); return; }
      previewFrame.src = out.url + '&t=' + Date.now();
    } catch (e) { /* preview is best-effort — a failed refresh isn't fatal */ }
    return;
  }
  // cache-bust so the iframe always shows the just-saved file, not a cached copy
  previewFrame.src = `/templates/${currentSlug}.html?t=${Date.now()}`;
}
refreshPreviewBtn.addEventListener('click', reloadPreview);

const IMAGE_EXT = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
const AUDIO_EXT = ['.mp3'];

function isAssetKey(key) {
  return /url$/i.test(key);
}
function guessKind(key, value) {
  const ext = (String(value).match(/\.[a-z0-9]+$/i) || [''])[0].toLowerCase();
  if (AUDIO_EXT.includes(ext)) return 'audio';
  if (IMAGE_EXT.includes(ext)) return 'image';
  // no extension yet (empty value) — guess from the field name
  if (/song|music|audio/i.test(key)) return 'audio';
  return 'image';
}

async function loadTemplateList() {
  try {
    const res = await fetch('/api/templates');
    if (!res.ok) throw new Error(`API returned ${res.status} — are you running admin-server.js (not server.js)?`);
    lastTemplateList = await res.json();
    renderTemplateList();
  } catch (e) {
    templateListEl.innerHTML = `<li class="muted" style="color:#dc2626">Couldn't load templates: ${escapeHtml(e.message)}</li>`;
  }
}

function renderTemplateList() {
  const q = (templateSearchInput.value || '').trim().toLowerCase();
  const catFilter = categoryFilterSelect.value;
  const list = lastTemplateList.filter((t) => {
    if (catFilter && t.category !== catFilter) return false;
    if (q && !t.title.toLowerCase().includes(q) && !t.slug.toLowerCase().includes(q)) return false;
    return true;
  });

  try {
    templateListEl.innerHTML = '';
    if (list.length === 0) {
      templateListEl.innerHTML = '<li class="muted">No templates match.</li>';
      return;
    }
    list.forEach(({ slug, title, enabled, isLovearea, isImported, hasMaster, previewUrl, category, order, featured }) => {
      const li = document.createElement('li');
      li.className = 'template-row-wrap';

      const row = document.createElement('div');
      row.className = 'template-row';

      const btn = document.createElement('button');
      if (!enabled) btn.classList.add('disabled-template');
      // lovearea templates have no template file to edit here — their
      // master copy is a saved data snapshot instead, edited inline in
      // this same panel (selectLoveTemplate), so the subtitle reflects
      // whether one's been saved yet rather than always showing "no
      // master copy" regardless of actual state.
      const loveSubtitle = hasMaster ? 'master copy set — click to edit' : 'no master copy yet — click to set one';
      // imported templates (fetched from Youware/Lovable/etc.) have no
      // snapshot pipeline at all yet — preview + visibility/category only,
      // no click-to-edit, so the subtitle says so instead of implying one
      const subtitle = isImported ? 'imported — preview only, not yet editable' : isLovearea ? loveSubtitle : escapeHtml(slug) + '.html';
      btn.innerHTML = `
        <img class="thumb" src="/admin-thumbs/${encodeURIComponent(slug)}.png" alt="" loading="lazy"
             onerror="this.style.visibility='hidden'" />
        <span class="label">${escapeHtml(title)}<span class="slug">${subtitle}</span></span>
      `;
      if (isImported) {
        btn.classList.add('no-edit');
        btn.title = 'Preview-only template — open it via "View live" on the public site';
        btn.addEventListener('click', () => window.open(previewUrl, '_blank', 'noopener'));
      } else if (isLovearea) {
        btn.addEventListener('click', () => selectLoveTemplate(slug, btn));
      } else {
        btn.addEventListener('click', () => selectTemplate(slug, btn));
      }

      const toggleWrap = document.createElement('label');
      toggleWrap.className = 'visibility-toggle';
      toggleWrap.title = enabled ? 'Shown on public site — click to hide' : 'Hidden from public site — click to show';
      const toggleInput = document.createElement('input');
      toggleInput.type = 'checkbox';
      toggleInput.checked = enabled;
      toggleInput.addEventListener('click', (e) => e.stopPropagation());
      toggleInput.addEventListener('change', async () => {
        btn.classList.toggle('disabled-template', !toggleInput.checked);
        toggleWrap.title = toggleInput.checked ? 'Shown on public site — click to hide' : 'Hidden from public site — click to show';
        try {
          await fetch(`/api/templates/${encodeURIComponent(slug)}/visibility`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ enabled: toggleInput.checked }),
          });
        } catch {}
      });
      const slider = document.createElement('span');
      slider.className = 'slider';
      toggleWrap.appendChild(toggleInput);
      toggleWrap.appendChild(slider);

      row.appendChild(btn);
      row.appendChild(toggleWrap);

      li.appendChild(row);
      templateListEl.appendChild(li);
    });
  } catch (e) {
    templateListEl.innerHTML = `<li class="muted" style="color:#dc2626">Couldn't load templates: ${escapeHtml(e.message)}</li>`;
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function saveCategoryMeta(slug, patch) {
  try {
    await fetch(`/api/templates/${encodeURIComponent(slug)}/category`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    const entry = lastTemplateList.find((t) => t.slug === slug);
    if (entry) Object.assign(entry, patch);
  } catch {}
}

let searchDebounce;
templateSearchInput.addEventListener('input', () => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(renderTemplateList, 150);
});
categoryFilterSelect.addEventListener('change', renderTemplateList);

async function selectTemplate(slug, btnEl) {
  document.querySelectorAll('#templateList button').forEach((b) => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const res = await fetch(`/api/templates/${slug}`);
  if (!res.ok) {
    alert('Could not load this template: ' + (await res.json()).error);
    return;
  }
  currentSlug = slug;
  currentIsLovearea = false;
  currentSnapshot = await res.json();

  mailboxViewEl.hidden = true;
  categoriesViewEl.hidden = true;
  mailboxBtn.classList.remove('nav-active');
  categoriesBtn.classList.remove('nav-active');
  emptyEl.hidden = true;
  editorEl.hidden = false;
  saveStatusEl.textContent = '';
  historyPanel.hidden = true;
  historyBtn.hidden = false;
  saveBtn.textContent = 'Save changes';
  editorTitleEl.textContent = (currentSnapshot.seo && currentSnapshot.seo.title) || slug;
  viewLiveLink.href = `/templates/${slug}.html`;
  reloadPreview();

  renderSections();
}

// lovearea templates have no snapshot/backup system — their master copy
// is a plain data object (see lovearea-form.js), reusing the exact same
// editor panel, save button, and preview pane as the snapshot editor
// above, just pointed at a different set of endpoints.
async function selectLoveTemplate(slug, btnEl) {
  document.querySelectorAll('#templateList button').forEach((b) => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const res = await fetch(`/api/public/lovearea-schema/${encodeURIComponent(slug)}`);
  const out = await res.json();
  if (!res.ok) {
    alert('Could not load this template: ' + out.error);
    return;
  }
  currentSlug = slug;
  currentIsLovearea = true;
  loveCategoryDesign = { category: out.category, design: out.design };

  mailboxViewEl.hidden = true;
  categoriesViewEl.hidden = true;
  mailboxBtn.classList.remove('nav-active');
  categoriesBtn.classList.remove('nav-active');
  emptyEl.hidden = true;
  editorEl.hidden = false;
  saveStatusEl.textContent = '';
  historyPanel.hidden = true;
  historyBtn.hidden = false;
  saveBtn.textContent = 'Save as master copy';
  editorTitleEl.textContent = slug.replace(/^love-/, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  viewLiveLink.href = `/template/${out.category}/${out.design}?preview=true`;

  if (!loveForm) loveForm = createLoveAreaForm(sectionsEl);
  loveForm.setData(JSON.parse(JSON.stringify(out.sample)));
  reloadPreview();
}

function renderSections() {
  sectionsEl.innerHTML = '';
  currentSnapshot.sections.forEach((section, sIdx) => {
    const card = document.createElement('div');
    // collapsed by default — with a dozen-plus sections per template, an
    // all-expanded list was a very long scroll to get anywhere. First
    // section is opened below so the panel isn't empty-looking on load.
    card.className = 'section-card collapsed';

    const header = document.createElement('button');
    header.type = 'button';
    header.className = 'section-header';
    header.innerHTML = `
      <span class="titles">
        <h3>${escapeHtml(section.id)}</h3>
        <span class="kind">${escapeHtml(section.kind || '')}</span>
      </span>
      <span class="chevron">▾</span>
    `;
    header.addEventListener('click', () => card.classList.toggle('collapsed'));
    card.appendChild(header);

    const body = document.createElement('div');
    body.className = 'section-body';
    const inner = document.createElement('div');
    inner.className = 'inner';
    body.appendChild(inner);

    Object.keys(section.values || {}).forEach((key) => {
      const value = section.values[key];
      inner.appendChild(renderField(sIdx, key, value));
    });

    card.appendChild(body);
    sectionsEl.appendChild(card);
  });

  const first = sectionsEl.querySelector('.section-card');
  if (first) first.classList.remove('collapsed');
}

function renderField(sIdx, key, value) {
  const wrap = document.createElement('div');
  wrap.className = 'field';

  const label = document.createElement('label');
  label.textContent = key;
  wrap.appendChild(label);

  if (typeof value === 'object' && value !== null) {
    // rare/unexpected shape — show as read-only JSON so nothing breaks
    const ta = document.createElement('textarea');
    ta.value = JSON.stringify(value, null, 2);
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
  const row = document.createElement('div');
  row.className = 'asset-field';

  const kind = guessKind(key, value);
  let preview;
  if (kind === 'audio') {
    preview = document.createElement('div');
    preview.className = 'asset-preview audio';
    preview.textContent = '♪';
  } else {
    preview = document.createElement('img');
    preview.className = 'asset-preview';
    preview.src = value || '';
    preview.alt = '';
    preview.onerror = () => { preview.style.opacity = 0.3; };
  }

  const controls = document.createElement('div');
  controls.className = 'asset-controls';

  const urlInput = document.createElement('input');
  urlInput.type = 'text';
  urlInput.value = value;
  urlInput.placeholder = '/cdn/... or https://...';
  urlInput.addEventListener('input', () => {
    currentSnapshot.sections[sIdx].values[key] = urlInput.value;
    if (kind === 'image') preview.src = urlInput.value;
  });

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = kind === 'audio' ? 'audio/*' : 'image/*';

  const status = document.createElement('span');
  status.className = 'upload-status';

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (!file) return;
    status.textContent = 'Uploading…';
    status.className = 'upload-status';
    try {
      const dataBase64 = await fileToBase64(file);
      const res = await fetch(`/api/upload/${currentSlug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, dataBase64 }),
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error);
      urlInput.value = out.url;
      currentSnapshot.sections[sIdx].values[key] = out.url;
      if (kind === 'image') preview.src = out.url;
      status.textContent = 'Uploaded ✓ (remember to Save)';
      status.className = 'upload-status ok';
    } catch (e) {
      status.textContent = 'Upload failed: ' + e.message;
      status.className = 'upload-status err';
    }
  });

  controls.appendChild(urlInput);
  controls.appendChild(fileInput);
  controls.appendChild(status);

  row.appendChild(preview);
  row.appendChild(controls);
  return row;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

historyBtn.addEventListener('click', async () => {
  if (!currentSlug) return;
  historyPanel.hidden = !historyPanel.hidden;
  if (!historyPanel.hidden) await loadHistory();
});

async function loadHistory() {
  historyListEl.innerHTML = '<li class="empty">Loading…</li>';
  try {
    const url = currentIsLovearea ? `/api/lovearea/${currentSlug}/backups` : `/api/templates/${currentSlug}/backups`;
    const res = await fetch(url);
    const backups = await res.json();
    if (!res.ok) throw new Error(backups.error || 'failed to load history');

    if (backups.length === 0) {
      historyListEl.innerHTML = '<li class="empty">No previous versions yet — they appear here after your first save.</li>';
      return;
    }

    historyListEl.innerHTML = '';
    backups.forEach(({ id, savedAt }) => {
      const li = document.createElement('li');
      const when = document.createElement('span');
      when.textContent = new Date(savedAt).toLocaleString();
      const restoreBtn = document.createElement('button');
      restoreBtn.className = 'btn secondary restore-btn';
      restoreBtn.textContent = 'Restore';
      restoreBtn.addEventListener('click', () => restoreBackup(id));
      li.appendChild(when);
      li.appendChild(restoreBtn);
      historyListEl.appendChild(li);
    });
  } catch (e) {
    historyListEl.innerHTML = `<li class="empty" style="color:#dc2626">${escapeHtml(e.message)}</li>`;
  }
}

async function restoreBackup(id) {
  if (!confirm('Restore this version? Your current version will be backed up first, so this can be undone.')) return;
  try {
    const url = currentIsLovearea ? `/api/lovearea/${currentSlug}/restore` : `/api/templates/${currentSlug}/restore`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const out = await res.json();
    if (!res.ok) throw new Error(out.error);

    // reload the form + preview to reflect the restored content
    if (currentIsLovearea) {
      const schemaRes = await fetch(`/api/public/lovearea-schema/${encodeURIComponent(currentSlug)}`);
      const schemaOut = await schemaRes.json();
      loveForm.setData(JSON.parse(JSON.stringify(schemaOut.sample)));
    } else {
      const snapRes = await fetch(`/api/templates/${currentSlug}`);
      currentSnapshot = await snapRes.json();
      renderSections();
    }
    reloadPreview();
    await loadHistory();
    saveStatusEl.textContent = 'Restored ✓';
    saveStatusEl.className = 'ok';
  } catch (e) {
    alert('Restore failed: ' + e.message);
  }
}

saveBtn.addEventListener('click', async () => {
  if (!currentSlug) return;
  saveBtn.disabled = true;
  saveStatusEl.textContent = 'Saving…';
  saveStatusEl.className = '';
  try {
    if (currentIsLovearea) {
      const res = await fetch(`/api/lovearea/${encodeURIComponent(currentSlug)}/master`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: loveForm.getData() }),
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error);
      saveStatusEl.textContent = 'Saved as master copy ✓';
      saveStatusEl.className = 'ok';
      reloadPreview();
      loadTemplateList(); // refresh the "master copy set" subtitle
      return;
    }

    const res = await fetch(`/api/templates/${currentSlug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentSnapshot),
    });
    const out = await res.json();
    if (!res.ok) throw new Error(out.error);
    saveStatusEl.textContent = 'Saved ✓';
    saveStatusEl.className = 'ok';
    reloadPreview();
  } catch (e) {
    saveStatusEl.textContent = 'Save failed: ' + e.message;
    saveStatusEl.className = 'err';
  } finally {
    saveBtn.disabled = false;
  }
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
  await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
  location.href = '/login';
});

function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

async function loadMailbox() {
  mailboxListEl.innerHTML = '<div class="loading-row"><span class="spinner"></span> Loading…</div>';
  try {
    const res = await fetch('/api/creations');
    const list = await res.json();
    if (!res.ok) throw new Error(list.error || 'failed to load');

    mailboxCountEl.hidden = list.length === 0;
    mailboxCountEl.textContent = list.length;

    if (list.length === 0) {
      mailboxListEl.innerHTML = '<p class="mail-empty">No one has generated a page yet — links will show up here as soon as they do.</p>';
      return;
    }

    mailboxListEl.innerHTML = '';
    list.forEach(({ slug, url, ip, createdAt }) => {
      const row = document.createElement('div');
      row.className = 'mail-row';
      row.innerHTML = `
        <div class="mail-main">
          <div class="mail-slug">${escapeHtml(slug.replace(/-/g, ' '))}</div>
          <div class="mail-meta">${timeAgo(createdAt)} · ${escapeHtml(ip)}</div>
          <a class="mail-link" href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(url)}</a>
        </div>
      `;
      mailboxListEl.appendChild(row);
    });
  } catch (e) {
    mailboxListEl.innerHTML = `<p class="mail-empty" style="color:#dc2626">${escapeHtml(e.message)}</p>`;
  }
}

mailboxBtn.addEventListener('click', () => {
  document.querySelectorAll('#templateList button').forEach((b) => b.classList.remove('active'));
  mailboxBtn.classList.add('nav-active');
  categoriesBtn.classList.remove('nav-active');
  emptyEl.hidden = true;
  editorEl.hidden = true;
  categoriesViewEl.hidden = true;
  mailboxViewEl.hidden = false;
  loadMailbox();
});
refreshMailboxBtn.addEventListener('click', loadMailbox);

categoriesBtn.addEventListener('click', () => {
  document.querySelectorAll('#templateList button').forEach((b) => b.classList.remove('active'));
  categoriesBtn.classList.add('nav-active');
  mailboxBtn.classList.remove('nav-active');
  emptyEl.hidden = true;
  editorEl.hidden = true;
  mailboxViewEl.hidden = true;
  categoriesViewEl.hidden = false;
  loadCategoriesBoard();
});
refreshCategoriesBtn.addEventListener('click', loadCategoriesBoard);

let categoriesBoardList = [];

async function loadCategoriesBoard() {
  categoriesBoardEl.innerHTML = '<div class="loading-row"><span class="spinner"></span> Loading…</div>';
  try {
    await loadCategoryList(); // always fresh here — pill renames/reorders must show immediately
    renderCategorySettings();
    const res = await fetch('/api/templates');
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    categoriesBoardList = await res.json();
    renderCategoriesBoard();
  } catch (e) {
    categoriesBoardEl.innerHTML = `<p class="muted" style="color:#dc2626">Couldn't load: ${escapeHtml(e.message)}</p>`;
  }
}

// Category pill settings: rename label/emoji, and reorder the pills
// themselves (separate from reordering templates WITHIN a category, below).
function renderCategorySettings() {
  categorySettingsListEl.innerHTML = '';
  const sorted = [...CATEGORY_LIST].sort((a, b) => a.order - b.order);

  sorted.forEach((cat, i) => {
    const row = document.createElement('div');
    row.className = 'cat-def-row';

    const orderButtons = document.createElement('div');
    orderButtons.className = 'order-buttons';
    const upBtn = document.createElement('button');
    upBtn.type = 'button'; upBtn.innerHTML = '<svg><use href="#i-chevron-up"/></svg>'; upBtn.title = 'Move this pill earlier';
    upBtn.disabled = i === 0;
    upBtn.addEventListener('click', () => moveCategoryDef(sorted, i, -1));
    const downBtn = document.createElement('button');
    downBtn.type = 'button'; downBtn.innerHTML = '<svg><use href="#i-chevron-down"/></svg>'; downBtn.title = 'Move this pill later';
    downBtn.disabled = i === sorted.length - 1;
    downBtn.addEventListener('click', () => moveCategoryDef(sorted, i, 1));
    orderButtons.appendChild(upBtn);
    orderButtons.appendChild(downBtn);
    row.appendChild(orderButtons);

    const keyLabel = document.createElement('span');
    keyLabel.className = 'cat-def-key';
    keyLabel.textContent = cat.key;
    row.appendChild(keyLabel);

    const emojiInput = document.createElement('input');
    emojiInput.className = 'cat-def-emoji';
    emojiInput.value = cat.emoji;
    row.appendChild(emojiInput);

    const labelInput = document.createElement('input');
    labelInput.className = 'cat-def-label';
    labelInput.value = cat.label;
    row.appendChild(labelInput);

    const markDirty = () => row.classList.add('dirty');
    emojiInput.addEventListener('input', markDirty);
    labelInput.addEventListener('input', markDirty);

    const savedTag = document.createElement('span');
    savedTag.className = 'cat-def-saved';
    savedTag.textContent = 'Saved ✓';

    const saveBtnEl = document.createElement('button');
    saveBtnEl.type = 'button';
    saveBtnEl.className = 'cat-def-save';
    saveBtnEl.textContent = 'Save';
    saveBtnEl.addEventListener('click', async () => {
      try {
        await fetch(`/api/categories/${encodeURIComponent(cat.key)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ label: labelInput.value, emoji: emojiInput.value }),
        });
        cat.label = labelInput.value;
        cat.emoji = emojiInput.value;
        row.classList.remove('dirty');
        savedTag.classList.add('show');
        setTimeout(() => savedTag.classList.remove('show'), 1500);
        renderCategoriesBoard(); // pill label/emoji also shows in the move-select dropdowns below
      } catch {}
    });

    row.appendChild(saveBtnEl);
    row.appendChild(savedTag);
    categorySettingsListEl.appendChild(row);
  });
}

addCategoryBtn.addEventListener('click', async () => {
  const label = newCategoryLabelInput.value.trim();
  if (!label) { newCategoryLabelInput.focus(); return; }
  addCategoryBtn.disabled = true;
  try {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label, emoji: newCategoryEmojiInput.value.trim() }),
    });
    const out = await res.json();
    if (!res.ok) throw new Error(out.error);
    newCategoryLabelInput.value = '';
    newCategoryEmojiInput.value = '';
    await loadCategoryList();
    renderCategorySettings();
    renderCategoriesBoard();
  } catch (e) {
    alert("Couldn't add category: " + e.message);
  } finally {
    addCategoryBtn.disabled = false;
  }
});

async function moveCategoryDef(sorted, index, delta) {
  const target = index + delta;
  if (target < 0 || target >= sorted.length) return;
  const reordered = [...sorted];
  [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
  await Promise.all(reordered.map((cat, i) => {
    if (cat.order === i) return null;
    cat.order = i;
    return fetch(`/api/categories/${encodeURIComponent(cat.key)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: i }),
    });
  }));
  renderCategorySettings();
}

function sortedByOrder(items) {
  return [...items].sort((a, b) => (a.order - b.order) || a.title.localeCompare(b.title));
}

// Remembers which groups are collapsed across re-renders (every save
// re-runs renderCategoriesBoard) — without this every click-to-toggle
// would just spring back open on the next auto-refresh. Categories with
// more than 5 templates start collapsed on first load so the page isn't
// one giant scroll on open; the two pinned shelves stay open (they're
// usually short) but remain manually collapsible too.
const collapsedGroups = new Set();
let collapsedGroupsInitialized = false;

function renderCategoriesBoard() {
  categoriesBoardEl.innerHTML = '';

  if (!collapsedGroupsInitialized) {
    collapsedGroupsInitialized = true;
    const byCategory = {};
    categoriesBoardList.forEach((t) => { byCategory[t.category] = (byCategory[t.category] || 0) + 1; });
    Object.entries(byCategory).forEach(([key, count]) => { if (count > 5) collapsedGroups.add(key); });
  }

  categoriesBoardEl.appendChild(renderPinnedGroup('i-flame', 'Trending', 'trending'));
  categoriesBoardEl.appendChild(renderPinnedGroup('i-heart', 'Recommended', 'recommended'));

  const sortedCategories = [...CATEGORY_LIST].sort((a, b) => a.order - b.order);
  sortedCategories.forEach((cat) => {
    const items = sortedByOrder(categoriesBoardList.filter((t) => t.category === cat.key));
    categoriesBoardEl.appendChild(renderCategoryGroup(cat, items));
  });
}

// shared collapse/expand wiring for a group's header — click anywhere on
// the header (not just a tiny chevron target) to toggle
function makeCollapsible(group, header, collapseKey) {
  const chevron = document.createElement('span');
  chevron.className = 'cat-group-chevron';
  chevron.innerHTML = '<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  header.appendChild(chevron);
  header.classList.add('collapsible');
  if (collapsedGroups.has(collapseKey)) group.classList.add('collapsed');
  header.addEventListener('click', () => {
    const nowCollapsed = group.classList.toggle('collapsed');
    if (nowCollapsed) collapsedGroups.add(collapseKey); else collapsedGroups.delete(collapseKey);
  });
}

// Trending / Recommended aren't real categories — just flags that can sit
// on top of any category — so this section is a flat "everything currently
// flagged" overview with a quick way to unflag, not a full per-item editor
// (the category group below is where category/order/all three flags live).
function renderPinnedGroup(iconId, label, flagKey) {
  const group = document.createElement('div');
  group.className = 'cat-group pinned';

  const items = categoriesBoardList.filter((t) => t[flagKey]);

  const header = document.createElement('div');
  header.className = 'cat-group-header';
  header.innerHTML = `<span class="emoji"><svg><use href="#${iconId}"/></svg></span><h3>${escapeHtml(label)}</h3><span class="cat-count">${items.length}</span>`;
  group.appendChild(header);
  makeCollapsible(group, header, `__${flagKey}`);

  const body = document.createElement('div');
  body.className = 'cat-group-body';
  const inner = document.createElement('div');
  inner.className = 'cat-group-inner';
  body.appendChild(inner);
  group.appendChild(body);

  if (items.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'cat-group-empty';
    empty.textContent = `Nothing marked ${label.toLowerCase()} yet — use the toggle in a category below.`;
    inner.appendChild(empty);
    return group;
  }

  items.forEach((t) => {
    const row = document.createElement('div');
    row.className = 'cat-row';
    row.innerHTML = `
      <img class="thumb" src="/admin-thumbs/${encodeURIComponent(t.slug)}.png" alt="" loading="lazy" onerror="this.style.visibility='hidden'" />
      <div class="cat-row-title">${escapeHtml(t.title)}<span>${escapeHtml(t.category)}</span></div>
    `;
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = `flag-toggle ${flagKey} on`;
    removeBtn.title = `Remove from ${label}`;
    removeBtn.innerHTML = `<svg><use href="#${iconId}"/></svg>`;
    removeBtn.addEventListener('click', async () => {
      t[flagKey] = false;
      await saveCategoryMeta(t.slug, { [flagKey]: false });
      showSavedToast();
      renderCategoriesBoard();
    });
    row.appendChild(removeBtn);
    inner.appendChild(row);
  });

  return group;
}

function renderCategoryGroup(cat, items) {
  const group = document.createElement('div');
  group.className = 'cat-group';

  const header = document.createElement('div');
  header.className = 'cat-group-header';
  header.innerHTML = `<span class="emoji">${cat.emoji}</span><h3>${escapeHtml(cat.label)}</h3><span class="cat-count">${items.length}</span>`;
  group.appendChild(header);
  makeCollapsible(group, header, cat.key);

  const body = document.createElement('div');
  body.className = 'cat-group-body';
  const inner = document.createElement('div');
  inner.className = 'cat-group-inner';
  body.appendChild(inner);
  group.appendChild(body);

  if (items.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'cat-group-empty';
    empty.textContent = 'No templates in this category yet.';
    inner.appendChild(empty);
    return group;
  }

  items.forEach((t, i) => {
    const row = document.createElement('div');
    row.className = 'cat-row';

    const orderButtons = document.createElement('div');
    orderButtons.className = 'order-buttons';
    const upBtn = document.createElement('button');
    upBtn.type = 'button';
    upBtn.innerHTML = '<svg><use href="#i-chevron-up"/></svg>';
    upBtn.title = 'Move up — shows earlier in this category';
    upBtn.disabled = i === 0;
    upBtn.addEventListener('click', () => moveInCategory(cat.key, items, i, -1));
    const downBtn = document.createElement('button');
    downBtn.type = 'button';
    downBtn.innerHTML = '<svg><use href="#i-chevron-down"/></svg>';
    downBtn.title = 'Move down — shows later in this category';
    downBtn.disabled = i === items.length - 1;
    downBtn.addEventListener('click', () => moveInCategory(cat.key, items, i, 1));
    orderButtons.appendChild(upBtn);
    orderButtons.appendChild(downBtn);
    row.appendChild(orderButtons);

    const thumb = document.createElement('img');
    thumb.className = 'thumb';
    thumb.loading = 'lazy';
    thumb.src = `/admin-thumbs/${encodeURIComponent(t.slug)}.png`;
    thumb.alt = '';
    thumb.onerror = () => { thumb.style.visibility = 'hidden'; };
    row.appendChild(thumb);

    const title = document.createElement('div');
    title.className = 'cat-row-title';
    title.innerHTML = `${escapeHtml(t.title)}<span>${escapeHtml(t.slug)}</span>`;
    row.appendChild(title);

    const moveSelect = document.createElement('select');
    moveSelect.className = 'cat-move-select';
    moveSelect.title = 'Move to a different category';
    moveSelect.innerHTML = CATEGORY_LIST.map((c) =>
      `<option value="${c.key}" ${c.key === cat.key ? 'selected' : ''}>${c.emoji} ${escapeHtml(c.label)}</option>`
    ).join('');
    moveSelect.addEventListener('change', async () => {
      t.category = moveSelect.value;
      await saveCategoryMeta(t.slug, { category: moveSelect.value });
      showSavedToast();
      renderCategoriesBoard();
    });
    const moveSelectWrap = document.createElement('div');
    moveSelectWrap.className = 'cat-move-select-wrap';
    moveSelectWrap.appendChild(moveSelect);
    moveSelectWrap.insertAdjacentHTML('beforeend', '<svg class="cat-move-chevron"><use href="#i-chevron-down"/></svg>');
    row.appendChild(moveSelectWrap);

    const flags = document.createElement('div');
    flags.className = 'flag-toggles';
    flags.appendChild(makeFlagToggle(t, 'featured', 'i-star', 'Featured — pinned to the top of its category'));
    flags.appendChild(makeFlagToggle(t, 'trending', 'i-flame', 'Trending — shown in the Trending shelf'));
    flags.appendChild(makeFlagToggle(t, 'recommended', 'i-heart', 'Recommended — shown in the Recommended shelf'));
    row.appendChild(flags);

    inner.appendChild(row);
  });

  return group;
}

function makeFlagToggle(t, flagKey, iconId, title) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `flag-toggle ${flagKey}${t[flagKey] ? ' on' : ''}`;
  btn.title = title;
  btn.innerHTML = `<svg><use href="#${iconId}"/></svg>`;
  btn.addEventListener('click', async () => {
    const next = !t[flagKey];
    t[flagKey] = next;
    await saveCategoryMeta(t.slug, { [flagKey]: next });
    showSavedToast();
    renderCategoriesBoard();
  });
  return btn;
}

// Renumbers the WHOLE category (0, 1, 2, …) instead of just swapping two
// "order" values — every template starts at order:0, so a naive swap on
// the very first move would swap 0 with 0 and visibly do nothing.
async function moveInCategory(categoryKey, items, index, delta) {
  const target = index + delta;
  if (target < 0 || target >= items.length) return;
  const reordered = [...items];
  [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
  await Promise.all(reordered.map((t, i) => {
    if (t.order === i) return null;
    t.order = i;
    return saveCategoryMeta(t.slug, { order: i });
  }));
  showSavedToast();
  renderCategoriesBoard();
}

let savedToastTimer;
function showSavedToast() {
  let toast = document.getElementById('savedToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'savedToast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = '<svg><use href="#i-check"/></svg> Saved';
  toast.classList.add('show');
  clearTimeout(savedToastTimer);
  savedToastTimer = setTimeout(() => toast.classList.remove('show'), 1400);
}

// show a live-ish unread count on load without switching views
(async () => {
  try {
    const res = await fetch('/api/creations');
    const list = await res.json();
    if (res.ok && list.length) { mailboxCountEl.hidden = false; mailboxCountEl.textContent = list.length; }
  } catch {}
})();

loadCategoryList().then(loadTemplateList);
