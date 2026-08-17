let ALL_TEMPLATES = [];
let CATEGORIES = [];
let activeCategory = ''; // '' = All
let searchQuery = '';

const galleryEl = document.getElementById('gallery');
const pillsEl = document.getElementById('categoryPills');
const pillHighlightEl = document.getElementById('categoryPills').querySelector('.pill-highlight');
const searchInput = document.getElementById('searchInput');
const resultCountEl = document.getElementById('resultCount');
const noResultsEl = document.getElementById('noResults');
const heroShowcaseEl = document.getElementById('heroShowcase');
const marqueeTrackEl = document.getElementById('marqueeTrack');

const BADGE_ICON = { featured: 'icon-star', trending: 'icon-flame', recommended: 'icon-heart' };

// category key straight out of the URL, e.g. /category/birthday -> "birthday"
function categoryFromPath() {
  const m = location.pathname.match(/^\/category\/([a-z0-9-]+)\/?$/i);
  return m ? m[1] : '';
}

async function loadGallery() {
  try {
    const [templatesRes, categoriesRes] = await Promise.all([
      fetch('/api/public/templates'),
      fetch('/api/public/categories'),
    ]);
    if (!templatesRes.ok) throw new Error('failed to load templates (' + templatesRes.status + ')');
    ALL_TEMPLATES = await templatesRes.json();
    CATEGORIES = categoriesRes.ok ? await categoriesRes.json() : [];

    activeCategory = categoryFromPath();
    renderPills();
    renderGallery();
    renderHeroShowcase();
    renderMarquee();
  } catch (e) {
    galleryEl.innerHTML = `<p class="muted" style="color:#dc2626">${escapeHtml(e.message)}</p>`;
  }
}

// "trending" / "recommended" are flags, not real categories — but they
// browse exactly like one (their own pill + their own /category/<key> URL),
// so they're handled as special pseudo-category keys throughout.
const SPECIAL_PILLS = [
  { key: 'trending', label: 'Trending', icon: 'icon-flame' },
  { key: 'recommended', label: 'Recommended', icon: 'icon-heart' },
];

function renderPills() {
  const known = new Set([...CATEGORIES.map((c) => c.key), ...SPECIAL_PILLS.map((p) => p.key)]);
  // if the URL points at a category with zero visible templates, fall back
  // to "All" rather than showing an empty pill row with nothing selected
  if (activeCategory && !known.has(activeCategory)) activeCategory = '';

  pillsEl.querySelectorAll('.pill').forEach((p) => p.remove());
  pillsEl.appendChild(makePill('', 'All', ALL_TEMPLATES.length, 'icon-grid'));
  SPECIAL_PILLS.forEach((p) => {
    const count = ALL_TEMPLATES.filter((t) => t[p.key]).length;
    if (count > 0) pillsEl.appendChild(makePill(p.key, p.label, count, p.icon));
  });
  CATEGORIES.forEach((c) => pillsEl.appendChild(makePill(c.key, `${c.emoji} ${c.label}`, c.count)));

  requestAnimationFrame(positionPillHighlight);
}

function makePill(key, label, count, icon) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'pill' + (key === activeCategory ? ' active' : '');
  btn.dataset.category = key;
  const iconSvg = icon ? `<svg class="pill-icon"><use href="#${icon}"/></svg>` : '';
  btn.innerHTML = `${iconSvg}${label} <span class="pill-count">${count}</span>`;
  btn.addEventListener('click', () => selectCategory(key));
  return btn;
}

// slides the single shared gradient highlight to sit exactly behind
// whichever pill is active, measured from the real DOM box (works for any
// pill width/height at any breakpoint without hardcoding either in CSS)
function positionPillHighlight() {
  const activeEl = pillsEl.querySelector('.pill.active');
  if (!activeEl) return;
  pillHighlightEl.style.width = activeEl.offsetWidth + 'px';
  pillHighlightEl.style.height = activeEl.offsetHeight + 'px';
  pillHighlightEl.style.transform = `translate(${activeEl.offsetLeft}px, ${activeEl.offsetTop}px)`;
  pillHighlightEl.classList.add('ready');
}
window.addEventListener('resize', () => positionPillHighlight());

function selectCategory(key) {
  if (key === activeCategory) return;
  activeCategory = key;
  const url = key ? `/category/${key}` : '/';
  history.pushState({ category: key }, '', url);
  pillsEl.querySelectorAll('.pill').forEach((p) => p.classList.toggle('active', p.dataset.category === key));
  positionPillHighlight();
  renderGallery();
}

window.addEventListener('popstate', () => {
  activeCategory = categoryFromPath();
  pillsEl.querySelectorAll('.pill').forEach((p) => p.classList.toggle('active', p.dataset.category === activeCategory));
  positionPillHighlight();
  renderGallery();
});

let searchDebounce;
searchInput.addEventListener('input', () => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    searchQuery = searchInput.value.trim().toLowerCase();
    renderGallery();
  }, 120);
});

function filteredTemplates() {
  const specialKeys = new Set(SPECIAL_PILLS.map((p) => p.key));
  return ALL_TEMPLATES.filter((t) => {
    if (activeCategory) {
      if (specialKeys.has(activeCategory)) {
        if (!t[activeCategory]) return false;
      } else if (t.category !== activeCategory) {
        return false;
      }
    }
    if (searchQuery && !t.title.toLowerCase().includes(searchQuery)) return false;
    return true;
  });
}

// IntersectionObserver-driven scroll reveal — cards animate in only once
// they actually enter the viewport, instead of every card in a 70+ item
// grid firing its entrance animation at once on mount (most of which
// nobody would ever see happen, off-screen)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const supportsHoverTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReduced;

function renderGallery() {
  const list = filteredTemplates();
  const doRender = () => {
    galleryEl.innerHTML = '';
    noResultsEl.hidden = list.length !== 0;
    resultCountEl.hidden = !(searchQuery || activeCategory);
    if (!resultCountEl.hidden) {
      resultCountEl.textContent = `${list.length} template${list.length === 1 ? '' : 's'}`;
    }

    list.forEach(({ slug, title, editable, previewUrl, isLovearea, featured, trending, recommended }, i) => {
      const card = document.createElement('div');
      card.className = 'card reveal';
      card.style.transitionDelay = `${Math.min(i * 25, 260)}ms`;

      const previewHref = previewUrl || `/templates/${encodeURIComponent(slug)}.html`;
      const customizeHref = isLovearea
        ? `/site/customize-love.html?slug=${encodeURIComponent(slug)}`
        : `/site/customize.html?slug=${encodeURIComponent(slug)}`;
      const canCustomize = editable !== false;

      // only one ribbon shows at a time — featured beats trending beats
      // recommended — so a triple-flagged card doesn't get a stack of
      // overlapping badges
      const badge = featured ? { cls: 'featured', label: 'Featured' }
        : trending ? { cls: 'trending', label: 'Trending' }
        : recommended ? { cls: 'recommended', label: 'Recommended' }
        : null;

      const actionsHtml = (svgSize) => `
        <a class="btn secondary small" href="${previewHref}" target="_blank" rel="noopener"><svg width="${svgSize}" height="${svgSize}"><use href="#icon-eye"/></svg> Preview</a>
        ${canCustomize ? `<a class="btn primary small" href="${customizeHref}"><svg width="${svgSize}" height="${svgSize}"><use href="#icon-pencil"/></svg> Customize</a>` : ''}
      `;

      card.innerHTML = `
        <div class="thumb-wrap">
          ${badge ? `<span class="featured-badge ${badge.cls}"><svg><use href="#${BADGE_ICON[badge.cls]}"/></svg>${badge.label}</span>` : ''}
          <img class="thumb" src="/admin-thumbs/${encodeURIComponent(slug)}.png" alt=""
               onerror="this.style.background='#f1ecfb'" />
          <div class="thumb-scrim">
            <div class="thumb-hover-actions card-actions">${actionsHtml(13)}</div>
          </div>
        </div>
        <div class="card-body">
          <h3>${escapeHtml(title)}</h3>
          <div class="card-actions mobile-only">${actionsHtml(13)}</div>
        </div>
      `;
      galleryEl.appendChild(card);
      revealObserver.observe(card);
      if (supportsHoverTilt) attachTilt(card);
    });
  };

  // View Transitions API gives a soft cross-fade/slide when the grid
  // contents change (category switch, search filter) — silently no-ops to
  // a plain re-render on browsers that don't support it (e.g. Firefox),
  // and is skipped entirely for users who've asked for reduced motion.
  if (!prefersReduced && document.startViewTransition) {
    document.startViewTransition(doRender);
  } else {
    doRender();
  }
}

// subtle 3D tilt that follows the cursor, desktop/mouse only (skipped on
// touch — there's no hover state to drive it, and it'd just be a
// permanently-tilted card after the last tap) and respects reduced-motion
function attachTilt(card) {
  const strength = 7; // max degrees of rotation
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg) translateZ(0)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
  });
}

// a little "product showcase" fan of 5 real templates under the hero copy
// — featured ones first (they're the ones worth showing off), padded out
// with whatever else is around if there aren't 5 featured yet
function renderHeroShowcase() {
  if (!heroShowcaseEl || ALL_TEMPLATES.length === 0) return;
  const featured = ALL_TEMPLATES.filter((t) => t.featured);
  const rest = ALL_TEMPLATES.filter((t) => !t.featured);
  const pick = [...featured, ...rest].slice(0, 5);

  heroShowcaseEl.innerHTML = pick.map(({ slug, title }) => `
    <div class="showcase-card">
      <img src="/admin-thumbs/${encodeURIComponent(slug)}.png" alt="${escapeHtml(title)}"
           onerror="this.closest('.showcase-card').style.background='linear-gradient(135deg,#e6ddfa,#f7d6e6)'" />
    </div>
  `).join('');
}

// scrolling marquee of category names — content is duplicated back-to-back
// so translateX(-50%) loops seamlessly with no visible seam/jump
// each word gets its own font/weight/style/case treatment (cycling through
// a curated set of 6 looks) instead of one uniform style repeated — a
// row of visually distinct words reads as a lot more alive than a plain
// evenly-styled line, closer to a hand-curated typographic banner than a
// generated list
const MARQUEE_VARIANTS_COUNT = 6;
function renderMarquee() {
  if (!marqueeTrackEl) return;
  const words = CATEGORIES.map((c) => c.label);
  if (words.length === 0) return;

  const oneSet = words.map((w, i) =>
    `<span class="marquee-item f${i % MARQUEE_VARIANTS_COUNT}">${escapeHtml(w)}</span><span class="marquee-dot">✦</span>`
  ).join('');
  marqueeTrackEl.innerHTML = oneSet + oneSet;
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
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

loadGallery();
