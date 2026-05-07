/* Font theme picker — six typography presets the visitor can switch
 * between. Persists the chosen KEY in localStorage; the bootstrap in
 * _includes/head.html applies it before paint so there's no flash.
 *
 * Keep the FONTS table in sync with the bootstrap copy.
 */
(() => {
  const FONTS = {
    editorial: {
      label: 'Editorial',
      sample: 'Aa',
      display: '"Instrument Serif", Georgia, serif',
      body:    '"DM Sans", system-ui, sans-serif',
      mono:    '"JetBrains Mono", ui-monospace, Menlo, monospace',
      href:    null,
    },
    modern: {
      label: 'Modern Sans',
      sample: 'Aa',
      display: '"Inter", system-ui, sans-serif',
      body:    '"Inter", system-ui, sans-serif',
      mono:    '"Fira Code", ui-monospace, monospace',
      href:    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap',
    },
    classic: {
      label: 'Classic',
      sample: 'Aa',
      display: '"Playfair Display", Georgia, serif',
      body:    '"Source Sans 3", system-ui, sans-serif',
      mono:    '"Source Code Pro", ui-monospace, monospace',
      href:    'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@400;500;600&family=Source+Code+Pro:wght@400;500&display=swap',
    },
    minimal: {
      label: 'Minimal',
      sample: 'Aa',
      display: '"Space Grotesk", system-ui, sans-serif',
      body:    '"Space Grotesk", system-ui, sans-serif',
      mono:    '"Space Mono", ui-monospace, monospace',
      href:    'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap',
    },
    terminal: {
      label: 'Terminal',
      sample: 'Aa',
      display: '"JetBrains Mono", ui-monospace, monospace',
      body:    '"JetBrains Mono", ui-monospace, monospace',
      mono:    '"JetBrains Mono", ui-monospace, monospace',
      href:    null, // already in the base stylesheet load
    },
    elegant: {
      label: 'Elegant',
      sample: 'Aa',
      display: '"Cormorant Garamond", Georgia, serif',
      body:    '"Nunito Sans", system-ui, sans-serif',
      mono:    '"JetBrains Mono", ui-monospace, monospace',
      href:    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Nunito+Sans:wght@400;500;600&display=swap',
    },
  };
  const DEFAULT_KEY = 'editorial';

  const wrap  = document.getElementById('fontPicker');
  const btn   = document.getElementById('fontToggle');
  const panel = document.getElementById('fontPanel');
  const list  = panel ? panel.querySelector('.font-picker__list') : null;
  if (!wrap || !btn || !panel || !list) return;

  function read() {
    let k;
    try { k = localStorage.getItem('font-key'); } catch {}
    return FONTS[k] ? k : DEFAULT_KEY;
  }

  function ensureStylesheet(preset, key) {
    if (!preset.href) return;
    if (document.querySelector(`link[data-font-theme="${key}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = preset.href;
    link.dataset.fontTheme = key;
    document.head.appendChild(link);
  }

  function apply(key, persist = true) {
    const preset = FONTS[key] || FONTS[DEFAULT_KEY];
    ensureStylesheet(preset, key);
    const s = document.documentElement.style;
    s.setProperty('--font-display', preset.display);
    s.setProperty('--font-body',    preset.body);
    s.setProperty('--font-mono',    preset.mono);
    document.documentElement.setAttribute('data-font-key', key);

    // Brief opacity dip on body to mask the reflow
    document.body.style.transition = 'opacity 0.18s ease';
    document.body.style.opacity = '0.92';
    requestAnimationFrame(() => {
      document.body.style.opacity = '';
    });

    list.querySelectorAll('.font-option').forEach(el => {
      const on = el.dataset.key === key;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-checked', on ? 'true' : 'false');
    });

    if (persist) {
      try { localStorage.setItem('font-key', key); } catch {}
    }
  }

  // Render rows
  Object.entries(FONTS).forEach(([key, preset]) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'font-option';
    b.dataset.key = key;
    b.setAttribute('role', 'radio');
    b.setAttribute('aria-checked', 'false');
    b.setAttribute('aria-label', preset.label);
    b.style.fontFamily = preset.display;
    b.innerHTML =
      `<span class="font-option__sample" style="font-family:${preset.display};">${preset.sample}</span>` +
      `<span class="font-option__name" style="font-family:${preset.body};">${preset.label}</span>` +
      `<span class="font-option__check" aria-hidden="true">●</span>`;
    b.addEventListener('click', () => apply(key));
    li.appendChild(b);
    list.appendChild(li);
  });

  // Initialise from saved key
  apply(read(), false);

  // Open / close popover
  function open() {
    wrap.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('mousedown', onOutside);
  }
  function close() {
    wrap.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('mousedown', onOutside);
  }
  function onKeydown(e) { if (e.key === 'Escape') { close(); btn.focus(); } }
  function onOutside(e) { if (!wrap.contains(e.target)) close(); }

  btn.addEventListener('click', () => {
    wrap.classList.contains('is-open') ? close() : open();
  });
})();
