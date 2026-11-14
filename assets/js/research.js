/* Research page: wording toggle, lead-time tabs, print.
   The page is complete without this file. It only adds the controls. */

(() => {
  const root = document.querySelector('[data-research]');
  if (!root) return;

  const VIEW_KEY = 'research-view';
  const remember = value => { try { localStorage.setItem(VIEW_KEY, value); } catch (e) { /* private mode */ } };
  const recall = () => { try { return localStorage.getItem(VIEW_KEY); } catch (e) { return null; } };

  const press = (buttons, active) => {
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === active)));
  };

  /* -------- Plain or technical wording -------------------------------
     ?view=technical in the address wins over the saved choice, so a link
     can open the page in either wording. */
  const controls = root.querySelector('[data-research-controls]');
  if (controls) {
    const viewButtons = [...controls.querySelectorAll('[data-view]')];
    const setView = (view, save) => {
      const button = viewButtons.find(b => b.dataset.view === view);
      if (!button) return;
      root.dataset.view = view;
      press(viewButtons, button);
      if (save) remember(view);
    };

    const fromAddress = new URLSearchParams(window.location.search).get('view');
    setView(fromAddress || recall() || 'plain', false);

    viewButtons.forEach(b => b.addEventListener('click', () => {
      setView(b.dataset.view, true);
      const url = new URL(window.location.href);
      if (b.dataset.view === 'plain') url.searchParams.delete('view');
      else url.searchParams.set('view', b.dataset.view);
      history.replaceState(null, '', url);
    }));

    const printButton = controls.querySelector('[data-print]');
    if (printButton) printButton.addEventListener('click', () => window.print());

    controls.hidden = false;
  }

  /* -------- Spread chart: one lead time at a time -------------------- */
  root.querySelectorAll('[data-spread]').forEach(spread => {
    const tabs = spread.querySelector('[data-spread-tabs]');
    const panels = [...spread.querySelectorAll('.spread__panel')];
    if (!tabs || panels.length < 2) return;

    const buttons = [...tabs.querySelectorAll('[data-lead]')];
    const show = lead => {
      panels.forEach(p => { p.hidden = p.dataset.lead !== lead; });
      press(buttons, buttons.find(b => b.dataset.lead === lead));
    };
    buttons.forEach(b => b.addEventListener('click', () => show(b.dataset.lead)));

    spread.dataset.enhanced = '';
    tabs.hidden = false;
    // Open on the longest lead: it is where the models differ most.
    show(buttons[buttons.length - 1].dataset.lead);
  });
})();
