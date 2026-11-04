/* Inspectable system walkthroughs and the site's quick navigator. */
(() => {
  const bench = document.getElementById('workbench');
  if (!bench) return;
  const switches = bench.querySelectorAll('[data-system]');
  const panels = bench.querySelectorAll('[data-system-panel]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer;
  let activePanel = panels[0];

  function selectStage(panel, stage) {
    panel.querySelectorAll('[data-stage]').forEach(node => {
      const selected = Number(node.dataset.stage) === stage;
      node.classList.toggle('is-selected', selected);
      node.setAttribute('aria-pressed', String(selected));
    });
    panel.querySelectorAll('[data-stage-detail]').forEach(detail => {
      detail.hidden = Number(detail.dataset.stageDetail) !== stage;
    });
  }

  function stopTrace() {
    window.clearTimeout(timer);
    bench.classList.remove('is-tracing');
    panels.forEach(panel => { panel.querySelector('.workbench__trace').disabled = false; });
  }

  switches.forEach(button => button.addEventListener('click', () => {
    stopTrace();
    switches.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    panels.forEach(panel => { panel.hidden = panel.dataset.systemPanel !== button.dataset.system; });
    activePanel = Array.from(panels).find(panel => !panel.hidden);
    selectStage(activePanel, 0);
  }));
  panels.forEach(panel => {
    panel.querySelectorAll('[data-stage]').forEach(node => node.addEventListener('click', () => {
      stopTrace();
      selectStage(panel, Number(node.dataset.stage));
    }));
    const trace = panel.querySelector('.workbench__trace');
    trace.hidden = false;
    trace.addEventListener('click', () => {
      stopTrace();
      trace.disabled = true;
      bench.classList.add('is-tracing');
      let stage = 0;
      selectStage(panel, stage);
      function next() {
        stage++;
        if (stage === panel.querySelectorAll('[data-stage]').length) {
          stopTrace();
          return;
        }
        selectStage(panel, stage);
        timer = window.setTimeout(next, reducedMotion.matches ? 2200 : 1800);
      }
      timer = window.setTimeout(next, 1800);
    });
  });
  bench.querySelector('.workbench__switch').hidden = false;
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopTrace(); });
})();

(() => {
  const dialog = document.getElementById('quickNavigator');
  if (!dialog) return;
  const input = dialog.querySelector('input');
  const items = Array.from(dialog.querySelectorAll('[data-nav-item]'));
  const empty = dialog.querySelector('.navigator__empty');
  let opener;
  let pendingAction;

  function filter() {
    const query = input.value.trim().toLowerCase();
    items.forEach(item => { item.hidden = !item.dataset.search.toLowerCase().includes(query); });
    empty.hidden = items.some(item => !item.hidden);
  }
  function open() {
    if (dialog.open) return;
    opener = document.activeElement;
    input.value = '';
    filter();
    dialog.showModal();
    input.focus();
  }
  function close() { dialog.close(); }
  document.querySelectorAll('[data-open-navigator]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', open);
  });
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (dialog.open) close();
      else open();
    }
  });
  input.addEventListener('input', filter);
  dialog.querySelector('[data-close-navigator]').addEventListener('click', close);
  dialog.addEventListener('close', () => {
    opener?.focus();
    if (pendingAction) {
      document.querySelector('[data-open="' + pendingAction + '"]')?.click();
      pendingAction = null;
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
    }
  });
  items.forEach(item => item.addEventListener('click', () => {
    pendingAction = item.dataset.navigatorAction;
    close();
  }));
  dialog.addEventListener('keydown', event => {
    const visible = items.filter(item => !item.hidden);
    if (!visible.length) return;
    const index = visible.indexOf(document.activeElement);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const next = index < 0
        ? (direction === 1 ? 0 : visible.length - 1)
        : (index + direction + visible.length) % visible.length;
      visible[next].focus();
    }
    if (event.key === 'Enter' && document.activeElement === input) {
      event.preventDefault();
      visible[0].click();
    }
  });
})();
