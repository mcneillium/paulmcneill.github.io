(() => {
  const filter = document.querySelector('.proj-filter');
  const grid = document.getElementById('projectsGrid');
  const toggle = document.getElementById('projToggle');
  if (!filter || !grid) return;

  const cards = Array.from(grid.querySelectorAll('.proj-card'));
  const buttons = filter.querySelectorAll('[data-filter]');
  const visibleLimit = 3;
  const collapsedLabel = toggle?.innerHTML;
  let category = 'all';
  let expanded = false;

  function render() {
    const showAllCategories = category === 'all';
    cards.forEach((card, index) => {
      const visible = showAllCategories
        ? expanded || index < visibleLimit
        : card.dataset.category === category;
      card.classList.toggle('is-hidden', !visible);
    });
    buttons.forEach(button => {
      const active = button.dataset.filter === category;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (toggle) {
      toggle.hidden = !showAllCategories || cards.length <= visibleLimit;
      toggle.setAttribute('aria-expanded', String(expanded));
      if (expanded) toggle.textContent = 'Show fewer projects';
      else toggle.innerHTML = collapsedLabel;
    }
  }

  buttons.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.filter;
    expanded = false;
    render();
  }));
  if (toggle) toggle.addEventListener('click', () => {
    expanded = !expanded;
    render();
    if (expanded) cards[visibleLimit].focus();
  });

  render();
  filter.hidden = false;
})();
