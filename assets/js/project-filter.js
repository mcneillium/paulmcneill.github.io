/* Project filter — chips above the bento grid filter cards by category.
 * Pure DOM, no deps. Cards have data-category set at build time.
 */
(() => {
  const filter = document.querySelector('.proj-filter');
  const grid   = document.getElementById('projectsGrid');
  if (!filter || !grid) return;

  const cards = Array.from(grid.querySelectorAll('.proj-card'));
  const buttons = Array.from(filter.querySelectorAll('.proj-filter__btn'));

  function apply(slug) {
    const matchAll = slug === 'all';
    cards.forEach(card => {
      const match = matchAll || card.dataset.category === slug;
      card.classList.toggle('is-filtered-out', !match);
    });
    buttons.forEach(b => {
      const on = b.dataset.filter === slug;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  buttons.forEach(b => b.addEventListener('click', () => apply(b.dataset.filter)));
})();
