/* Paul McNeill — portfolio interactions
   Vanilla JS, no dependencies. */

(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const nav        = document.getElementById('nav');
  const navToggle  = document.getElementById('navToggle');
  const navLinks   = document.getElementById('navLinks');
  const progress   = document.querySelector('.scroll-progress');
  const backToTop  = document.querySelector('.back-to-top');

  /* ------------------------------------------------------------------ */
  /* Scroll: nav background + progress bar + back-to-top                 */
  /* ------------------------------------------------------------------ */
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct  = docH > 0 ? (y / docH) * 100 : 0;

      if (nav) nav.classList.toggle('scrolled', y > 40);
      if (progress) progress.style.width = pct + '%';
      if (backToTop) backToTop.classList.toggle('is-visible', y > 600);

      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------ */
  /* Mobile menu                                                         */
  /* ------------------------------------------------------------------ */
  if (navToggle && navLinks) {
    const closeMenu = () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) closeMenu();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Smooth anchor scroll (with offset for fixed nav)                    */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({
        top,
        behavior: reduced ? 'auto' : 'smooth'
      });
    });
  });

  /* ------------------------------------------------------------------ */
  /* Reveal on scroll                                                    */
  /* ------------------------------------------------------------------ */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (reduced || !('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(getComputedStyle(el).getPropertyValue('--delay')) || 0;
            setTimeout(() => el.classList.add('is-visible'), delay);
            io.unobserve(el);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(el => io.observe(el));
    }
  }
})();
