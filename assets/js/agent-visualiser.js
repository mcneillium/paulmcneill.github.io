/* Agent Workflow Visualiser
 * Step-by-step animated walkthrough of an AI agent reasoning.
 * No deps. Auto-plays once on viewport entry; controls for play/pause/step/reset.
 */
(() => {
  const root = document.getElementById('agentViz');
  if (!root) return;

  const stages       = Array.from(root.querySelectorAll('.agent-stage'));
  const playPauseBtn = document.getElementById('agentPlayPause');
  const stepBtn      = document.getElementById('agentStep');
  const resetBtn     = document.getElementById('agentReset');
  const speedBtns    = Array.from(root.querySelectorAll('.agent-viz__speed-btn'));
  const playPauseTxt = playPauseBtn ? playPauseBtn.querySelector('.agent-viz__btn-text') : null;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* tunables */
  const STEP_MS_BASE = 2200;   // 2.2 s per step at 1x
  let speed = 1;
  let timer = null;
  let current = -1;
  let playing = false;
  let autoStarted = false;

  function activate(idx) {
    current = idx;
    stages.forEach((el, i) => {
      el.classList.toggle('is-active',   i === idx);
      el.classList.toggle('is-complete', i <  idx);
    });
  }

  function setPlayingUI(state) {
    playing = state;
    if (!playPauseBtn) return;
    playPauseBtn.setAttribute('aria-pressed', state ? 'true' : 'false');
    playPauseBtn.setAttribute('aria-label', state ? 'Pause' : 'Play');
    if (playPauseTxt) playPauseTxt.textContent = state ? 'Pause' : 'Play';
    playPauseBtn.classList.toggle('is-playing', state);
  }

  function clearTimer() {
    if (timer) { clearTimeout(timer); timer = null; }
  }

  function next() {
    if (current >= stages.length - 1) {
      setPlayingUI(false);
      return;
    }
    activate(current + 1);
    if (playing) {
      timer = setTimeout(next, STEP_MS_BASE / speed);
    }
  }

  function play() {
    if (current >= stages.length - 1) reset(); // restart at end
    if (current < 0) activate(0);
    setPlayingUI(true);
    timer = setTimeout(next, STEP_MS_BASE / speed);
  }

  function pause() {
    clearTimer();
    setPlayingUI(false);
  }

  function step() {
    clearTimer();
    setPlayingUI(false);
    if (current < stages.length - 1) activate(current + 1);
  }

  function reset() {
    clearTimer();
    setPlayingUI(false);
    current = -1;
    stages.forEach(el => { el.classList.remove('is-active', 'is-complete'); });
  }

  /* events */
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => playing ? pause() : play());
  }
  if (stepBtn)  stepBtn.addEventListener('click', step);
  if (resetBtn) resetBtn.addEventListener('click', reset);
  speedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      speed = parseFloat(btn.dataset.speed) || 1;
      speedBtns.forEach(b => {
        const on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-checked', on ? 'true' : 'false');
      });
    });
  });

  /* auto-start on first viewport entry */
  if (reduced || !('IntersectionObserver' in window)) {
    // Show all steps statically under reduced motion
    stages.forEach(el => el.classList.add('is-complete'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !autoStarted) {
          autoStarted = true;
          // brief delay so the reveal-fadeUp finishes first
          setTimeout(play, 600);
        } else if (!entry.isIntersecting && playing) {
          pause();
        }
      });
    }, { threshold: 0.25 });
    io.observe(root);
  }
})();
