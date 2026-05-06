/* Paul McNeill — portfolio interactions
   Vanilla JS, no dependencies. */

(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const nav        = document.getElementById('nav');
  const navToggle  = document.getElementById('navToggle');
  const navLinks   = document.getElementById('navLinks');
  const progress   = document.querySelector('.scroll-progress');
  const backToTop  = document.querySelector('.back-to-top');

  /* -------- Scroll: nav bg + progress + back-to-top ----------------- */
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

  /* -------- Mobile menu --------------------------------------------- */
  if (navToggle && navLinks) {
    let lastFocused = null;
    const focusable = () => navLinks.querySelectorAll('a, button');
    const closeMenu = () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    };
    const openMenu = () => {
      lastFocused = document.activeElement;
      navToggle.classList.add('open');
      navLinks.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      const first = focusable()[0];
      if (first) first.focus();
    };
    navToggle.addEventListener('click', () => {
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (!navLinks.classList.contains('open')) return;
      if (e.key === 'Escape') { closeMenu(); return; }
      if (e.key === 'Tab') {
        const list = Array.from(focusable());
        if (list.length === 0) return;
        const first = list[0], last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* -------- Smooth anchor scroll ------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  /* -------- Reveal on scroll ---------------------------------------- */
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

  /* -------- Active section in nav ----------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');
  if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
    const setActive = (id) => {
      navAnchors.forEach(a => {
        const match = a.getAttribute('href') === '#' + id;
        a.classList.toggle('is-active', match);
        if (match) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    };
    const sectionObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(s => sectionObs.observe(s));
  }

  /* -------- Count-up for hero numeric stats ------------------------- */
  const stats = document.querySelectorAll('.hero__stat .num');
  if (stats.length && !reduced && 'IntersectionObserver' in window) {
    const animate = (el) => {
      const text = el.textContent.trim();
      const m = text.match(/^(\d+)(\D*)$/);
      if (!m) return;
      const target = parseInt(m[1], 10);
      const suffix = m[2] || '';
      const start = performance.now();
      const dur = 1200;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const cu = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animate(e.target); cu.unobserve(e.target); } });
    }, { threshold: 0.6 });
    stats.forEach(s => cu.observe(s));
  }

  /* -------- Lightbox for project galleries -------------------------- */
  const lightbox = document.getElementById('lightbox');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (lightbox && galleryItems.length) {
    const lbImg = lightbox.querySelector('.lightbox__img');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    let prevFocus = null;

    const open = (src, alt) => {
      prevFocus = document.activeElement;
      lbImg.src = src;
      lbImg.alt = alt || '';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };
    const close = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lbImg.src = '';
      if (prevFocus) prevFocus.focus();
    };

    galleryItems.forEach(btn => {
      btn.addEventListener('click', () => {
        const src = btn.dataset.src;
        const alt = btn.querySelector('img')?.alt;
        if (src) open(src, alt);
      });
    });
    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) close();
    });
  }
})();
