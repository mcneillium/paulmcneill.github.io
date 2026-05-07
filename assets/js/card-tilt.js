/* Subtle 3D card tilt — desktop, fine pointer only.
 *
 * Bound to .proj-card and .exp-card. Skipped under prefers-reduced-motion
 * or on touch devices. Max ±2°, eased reset on leave.
 */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduced || !finePointer) return;

  const MAX_DEG = 2;
  const cards = document.querySelectorAll('.proj-card, .exp-card');
  if (cards.length === 0) return;

  cards.forEach(card => {
    let raf = null;
    let rect = null;
    card.style.transformStyle = 'preserve-3d';
    card.style.willChange = 'transform';

    function update(e) {
      if (!rect) return;
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2); // -1..1
      const dy = (e.clientY - cy) / (rect.height / 2); // -1..1
      const rx = (-dy * MAX_DEG).toFixed(2);
      const ry = ( dx * MAX_DEG).toFixed(2);
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }

    card.addEventListener('pointerenter', () => {
      rect = card.getBoundingClientRect();
      card.style.transition = 'transform 0.05s linear';
    });
    card.addEventListener('pointermove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = null; update(e); });
    });
    card.addEventListener('pointerleave', () => {
      card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.transform = '';
      rect = null;
    });
  });
})();
