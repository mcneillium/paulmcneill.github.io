/* Theme toggle — wires the existing data-theme attribute to a button.
 * The bootstrap in head.html already applied the saved theme before paint;
 * this file only handles the click + persistence.
 */
(() => {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const root = document.documentElement;

  function current() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }
  function apply(theme, persist = true) {
    if (theme === 'light') root.setAttribute('data-theme', 'light');
    else                   root.removeAttribute('data-theme');
    btn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    btn.setAttribute('title', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    if (persist) {
      try { localStorage.setItem('theme', theme); } catch {}
    }
  }

  // Initialise button state
  apply(current(), false);

  // Click handler — adds a transient transition class so the swap eases
  btn.addEventListener('click', () => {
    root.classList.add('theme-switching');
    apply(current() === 'light' ? 'dark' : 'light');
    setTimeout(() => root.classList.remove('theme-switching'), 320);
  });

  // Track system preference if no explicit choice has been made
  const mq = window.matchMedia('(prefers-color-scheme: light)');
  mq.addEventListener('change', (e) => {
    let saved;
    try { saved = localStorage.getItem('theme'); } catch {}
    if (!saved) apply(e.matches ? 'light' : 'dark', false);
  });
})();
