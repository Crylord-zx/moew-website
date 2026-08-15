// ==========================================================
// Admin panel frontend. Vanilla JS, no build step.
// Talks to admin-server.js's tiny JSON API.
// ==========================================================
let currentSlug = null;
let currentSnapshot = null;

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

function reloadPreview() {
  if (!currentSlug) return;
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
    const list = await res.json();
    templateListEl.innerHTML = '';
    list.forEach(({ slug, title, enabled, isLovearea, previewUrl }) => {
      const li = document.createElement('li');
      li.className = 'template-row';

      const btn = document.createElement('button');
      if (!enabled) btn.classList.add('disabled-template');
      // lovearea templates have no master copy to edit here — they use a
      // per-visitor override system (see customize-love.html), so the
      // subtitle and click action both point there instead of the
      // snapshot editor the other templates use.
      btn.innerHTML = `
        <img class="thumb" src="/admin-thumbs/${encodeURIComponent(slug)}.png" alt="" loading="lazy"
             onerror="this.style.visibility='hidden'" />
        <span class="label">${escapeHtml(title)}<span class="slug">${isLovearea ? 'no master copy — customize only' : escapeHtml(slug) + '.html'}</span></span>
      `;
      if (isLovearea) {
        btn.addEventListener('click', () => window.open(`/site/customize-love.html?slug=${encodeURIComponent(slug)}`, '_blank'));
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

      li.appendChild(btn);
      li.appendChild(toggleWrap);
      templateListEl.appendChild(li);
    });
  } catch (e) {
    templateListEl.innerHTML = `<li class="muted" style="color:#dc2626">Couldn't load templates: ${escapeHtml(e.message)}</li>`;
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function selectTemplate(slug, btnEl) {
  document.querySelectorAll('#templateList button').forEach((b) => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const res = await fetch(`/api/templates/${slug}`);
  if (!res.ok) {
    alert('Could not load this template: ' + (await res.json()).error);
    return;
  }
  currentSlug = slug;
  currentSnapshot = await res.json();

  mailboxViewEl.hidden = true;
  emptyEl.hidden = true;
  editorEl.hidden = false;
  saveStatusEl.textContent = '';
  historyPanel.hidden = true;
  editorTitleEl.textContent = (currentSnapshot.seo && currentSnapshot.seo.title) || slug;
  viewLiveLink.href = `/templates/${slug}.html`;
  reloadPreview();

  renderSections();
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
    const res = await fetch(`/api/templates/${currentSlug}/backups`);
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
    const res = await fetch(`/api/templates/${currentSlug}/restore`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const out = await res.json();
    if (!res.ok) throw new Error(out.error);

    // reload the form + preview to reflect the restored content
    const snapRes = await fetch(`/api/templates/${currentSlug}`);
    currentSnapshot = await snapRes.json();
    renderSections();
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
  emptyEl.hidden = true;
  editorEl.hidden = true;
  mailboxViewEl.hidden = false;
  loadMailbox();
});
refreshMailboxBtn.addEventListener('click', loadMailbox);

// show a live-ish unread count on load without switching views
(async () => {
  try {
    const res = await fetch('/api/creations');
    const list = await res.json();
    if (res.ok && list.length) { mailboxCountEl.hidden = false; mailboxCountEl.textContent = list.length; }
  } catch {}
})();

loadTemplateList();
