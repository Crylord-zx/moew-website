// ==========================================================
// Shared recursive form renderer for the 27 lovearea templates' data.
// Used by both site/customize-love.html (a visitor's own page, or
// admin's master-copy edit) — one implementation, one place to fix bugs,
// instead of two copies drifting apart. Exposes window.createLoveAreaForm.
// ==========================================================
(function () {
  const LOCKED_KEY_PATTERN = /song|music|audio|bgmusic/i;
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

  // containerEl: element to render fields into.
  // Returns { setData(data), getData() }. Sections stay collapsed by
  // default and remember their open/closed state across re-renders (e.g.
  // after "+ Add another") — a per-instance Set, not shared globally, so
  // multiple forms on the same page (shouldn't normally happen, but keeps
  // this safe) don't bleed into each other.
  function createLoveAreaForm(containerEl) {
    let currentData = null;
    const expandedPaths = new Set();

    function setData(data) {
      currentData = data;
      renderFields();
    }
    function getData() {
      return currentData;
    }

    function renderFields() {
      containerEl.innerHTML = '';
      if (!currentData) return;
      Object.keys(currentData).forEach((key) => {
        const node = renderNode(key, currentData[key], [key]);
        if (node) containerEl.appendChild(node);
      });
    }

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
      if (count === 0) return null;

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
        return 1;
      });
    }

    function renderBooleanField(key, value, path) {
      const wrap = document.createElement('div');
      wrap.className = 'field checkbox-field';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = !!value;
      input.id = 'f_' + path.join('_') + '_' + Math.random().toString(36).slice(2, 7);
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

      const previewSlot = document.createElement('div');
      function setPreview(src) {
        previewSlot.innerHTML = '';
        if (/^(https?:)?\/|^data:/i.test(String(src || ''))) {
          const img = document.createElement('img');
          img.className = 'asset-preview';
          img.src = src;
          img.onerror = () => setPreview('');
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

    return { setData, getData };
  }

  window.createLoveAreaForm = createLoveAreaForm;
})();
