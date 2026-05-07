/* Accent colour picker — lets visitors pick their preferred accent.
 *
 * Updates --accent / --accent-dim / --accent-glow on the documentElement.
 * Persists the chosen preset KEY (not the hex), so the dark/light variant
 * can swap automatically when the theme toggle flips.
 *
 * The preset table mirrors the inline bootstrap in _includes/head.html.
 * Keep both in sync.
 */
(() => {
  const ACCENTS = {
    lime:    { dark: '#c9f270', light: '#4a7c10', label: 'Lime'    },
    cyan:    { dark: '#22d3ee', light: '#0e7490', label: 'Cyan'    },
    purple:  { dark: '#a78bfa', light: '#6d28d9', label: 'Purple'  },
    rose:    { dark: '#fb7185', light: '#be123c', label: 'Rose'    },
    amber:   { dark: '#fbbf24', light: '#b45309', label: 'Amber'   },
    emerald: { dark: '#34d399', light: '#047857', label: 'Emerald' },
    blue:    { dark: '#60a5fa', light: '#2563eb', label: 'Blue'    },
    orange:  { dark: '#f97316', light: '#c2410c', label: 'Orange'  },
  };
  const DEFAULT_KEY = 'lime';

  const wrap   = document.getElementById('accentPicker');
  const btn    = document.getElementById('accentToggle');
  const panel  = document.getElementById('accentPanel');
  const swatches = panel ? panel.querySelector('.accent-picker__swatches') : null;
  if (!wrap || !btn || !panel || !swatches) return;

  function read() {
    let k;
    try { k = localStorage.getItem('accent-key'); } catch {}
    return ACCENTS[k] ? k : DEFAULT_KEY;
  }
  function isLightTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  function apply(key, persist = true) {
    const preset = ACCENTS[key] || ACCENTS[DEFAULT_KEY];
    const hex = preset[isLightTheme() ? 'light' : 'dark'];
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const s = document.documentElement.style;
    s.setProperty('--accent', hex);
    s.setProperty('--accent-dim',  `rgba(${r},${g},${b},0.28)`);
    s.setProperty('--accent-glow', `rgba(${r},${g},${b},0.35)`);
    document.documentElement.setAttribute('data-accent-key', key);
    if (persist) {
      try { localStorage.setItem('accent-key', key); } catch {}
    }
    // Mark the active swatch
    swatches.querySelectorAll('.accent-swatch').forEach(el => {
      const on = el.dataset.key === key;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-checked', on ? 'true' : 'false');
    });
  }

  // Render swatches
  Object.entries(ACCENTS).forEach(([key, preset]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'accent-swatch';
    b.dataset.key = key;
    b.setAttribute('role', 'radio');
    b.setAttribute('aria-checked', 'false');
    b.setAttribute('aria-label', preset.label);
    b.title = preset.label;
    // Show the dark hex on the swatch — it's the user's "memorable" colour
    b.style.setProperty('--swatch', preset.dark);
    b.innerHTML = '<span class="accent-swatch__dot" aria-hidden="true"></span>';
    b.addEventListener('click', () => apply(key));
    swatches.appendChild(b);
  });

  // Initialise from saved or default
  apply(read(), false);

  // Re-apply when the theme changes so the dark/light variant flips
  document.documentElement.addEventListener('themechange', () => apply(read(), false));
  // Hook into the theme toggle button — observe data-theme
  const obs = new MutationObserver(() => apply(read(), false));
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

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
