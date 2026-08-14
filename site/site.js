async function loadGallery() {
  const galleryEl = document.getElementById('gallery');
  try {
    const res = await fetch('/api/public/templates');
    if (!res.ok) throw new Error('failed to load templates (' + res.status + ')');
    const list = await res.json();

    galleryEl.innerHTML = '';
    list.forEach(({ slug, title }, i) => {
      const card = document.createElement('div');
      card.className = 'card fade-in';
      card.style.animationDelay = `${Math.min(i * 30, 300)}ms`;
      card.innerHTML = `
        <img class="thumb" src="/admin-thumbs/${encodeURIComponent(slug)}.png" alt=""
             onerror="this.style.background='#f1ecfb'" />
        <div class="card-body">
          <h3>${escapeHtml(title)}</h3>
          <div class="card-actions">
            <a class="btn secondary small" href="/templates/${encodeURIComponent(slug)}.html" target="_blank" rel="noopener">👀 Preview</a>
            <a class="btn primary small" href="/site/customize.html?slug=${encodeURIComponent(slug)}">✏️ Customize</a>
          </div>
        </div>
      `;
      galleryEl.appendChild(card);
    });
  } catch (e) {
    galleryEl.innerHTML = `<p class="muted" style="color:#dc2626">${escapeHtml(e.message)}</p>`;
  }
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

loadGallery();
