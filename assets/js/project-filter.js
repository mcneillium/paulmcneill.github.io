(() => {
  const filter = document.querySelector('.proj-filter');
  const grid   = document.getElementById('projectsGrid');
  const toggle = document.getElementById('projToggle');
  if (!filter || !grid) return;

  const cards = Array.from(grid.querySelectorAll('.proj-card'));
  const buttons = Array.from(filter.querySelectorAll('.proj-filter__btn'));
  const VISIBLE_LIMIT = 3;
  const hiddenCount = Math.max(0, cards.length - VISIBLE_LIMIT);
  let expanded = false;
  let currentFilter = 'all';

  function apply() {
    const matchAll = currentFilter === 'all';
    cards.forEach((card, i) => {
      if (matchAll) {
        card.classList.remove('is-filtered-out');
        const beyond = i >= VISIBLE_LIMIT && !expanded;
        card.classList.toggle('is-hidden', beyond);
      } else {
        card.classList.remove('is-hidden');
        card.classList.toggle('is-filtered-out', card.dataset.category !== currentFilter);
      }
    });

    buttons.forEach(b => {
      const on = b.dataset.filter === currentFilter;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    if (toggle) {
      toggle.style.display = matchAll && hiddenCount > 0 ? '' : 'none';
    }
  }

  buttons.forEach(b => b.addEventListener('click', () => {
    currentFilter = b.dataset.filter;
    if (currentFilter !== 'all') expanded = false;
    apply();
  }));

  if (toggle && hiddenCount > 0) {
    toggle.addEventListener('click', () => {
      expanded = !expanded;
      toggle.innerHTML = expanded
        ? 'Show less'
        : `View all projects <span class="proj-show-more__count">(${hiddenCount} more)</span>`;
      apply();
    });
  }
})();
