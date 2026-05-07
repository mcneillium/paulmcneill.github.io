/* Cursor spotlight — subtle radial glow that follows the cursor at the
 * page level, plus a per-card spotlight on .proj-card and .exp-card.
 * Desktop fine-pointer only; respects prefers-reduced-motion.
 */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduced || !finePointer) return;

  const root = document.documentElement;
  document.body.classList.add('has-spotlight');

  /* Page-level cursor — rAF-throttled */
  let pending = false;
  let lastX = 0, lastY = 0;
  function onMove(e) {
    lastX = e.clientX;
    lastY = e.clientY;
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      root.style.setProperty('--cursor-x', lastX + 'px');
      root.style.setProperty('--cursor-y', lastY + 'px');
    });
  }
  document.addEventListener('mousemove', onMove, { passive: true });
  // Initialise off-screen so the glow doesn't pop at 0,0 on first move
  root.style.setProperty('--cursor-x', '-9999px');
  root.style.setProperty('--cursor-y', '-9999px');

  /* Per-card spotlight — bound on enter, removed on leave for perf */
  const cards = document.querySelectorAll('.proj-card, .exp-card, .ai-card, .principle, .ml-card, .skill-tier, .testimonial');
  cards.forEach(card => {
    let frame = null;
    function update(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--card-x', x + 'px');
      card.style.setProperty('--card-y', y + 'px');
      frame = null;
    }
    card.addEventListener('pointerenter', () => card.classList.add('has-card-glow'));
    card.addEventListener('pointermove', (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => update(e));
    });
    card.addEventListener('pointerleave', () => {
      card.classList.remove('has-card-glow');
      if (frame) { cancelAnimationFrame(frame); frame = null; }
    });
  });
})();
