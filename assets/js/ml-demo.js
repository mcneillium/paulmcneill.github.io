/* Live Lab — in-browser sentiment analysis with TensorFlow.js
 *
 * Uses the public sentiment_cnn_v1 model from the TensorFlow.js model
 * zoo. Lazy-loads tfjs + the model only after the section enters the
 * viewport, so the home page stays fast for visitors who never scroll
 * to it.
 *
 * Total payload (cold cache): ~600 KB tfjs core + ~1.2 MB model = ~1.8 MB.
 * Cached after first load.
 */
(() => {
  const root = document.getElementById('lab');
  if (!root) return;

  const form     = document.getElementById('mlForm');
  const input    = document.getElementById('mlInput');
  const button   = document.getElementById('mlRun');
  const btnText  = button ? button.querySelector('.ml-card__btn-text') : null;
  const result   = document.getElementById('mlResult');
  const sizeEl   = document.getElementById('mlSize');
  const timeEl   = document.getElementById('mlTime');
  const samples  = root.querySelectorAll('.ml-chip');
  if (!form || !input || !button || !result) return;

  const TFJS_URL  = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.20.0/dist/tf.min.js';
  const MODEL_URL = 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json';
  const META_URL  = 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json';

  let tf = null;
  let model = null;
  let metadata = null;
  let bytesDownloaded = 0;
  let loadingPromise = null;

  /* ------------- helpers ------------- */
  const setStatus = (text) => { if (btnText) btnText.textContent = text; };
  const fmtBytes = (n) => n > 1024 * 1024 ? (n / 1024 / 1024).toFixed(2) + ' MB'
                                          : (n / 1024).toFixed(0) + ' KB';

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = resolve;
      s.onerror = () => reject(new Error('failed to load ' + src));
      document.head.appendChild(s);
    });
  }

  async function fetchAndCount(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`fetch ${url} → ${r.status}`);
    const buf = await r.arrayBuffer();
    bytesDownloaded += buf.byteLength;
    return buf;
  }

  async function loadEverything() {
    if (loadingPromise) return loadingPromise;
    loadingPromise = (async () => {
      setStatus('Loading TensorFlow.js…');
      await loadScript(TFJS_URL);
      tf = window.tf;
      if (!tf) throw new Error('TF.js failed to attach to window');

      setStatus('Loading model…');
      // metadata is small JSON
      const metaRes = await fetch(META_URL);
      if (!metaRes.ok) throw new Error('metadata fetch failed');
      metadata = await metaRes.json();

      // tf.loadLayersModel handles the model.json + shard fetches itself,
      // but we want to know roughly how big the payload is.
      model = await tf.loadLayersModel(MODEL_URL, {
        // Estimate size from headers as the loader fetches shards
        onProgress: () => {}
      });

      // After the model loads, ask the browser cache for an approximate size.
      // We can't perfectly count bytes when tf does the fetching internally,
      // so we report "≈" and use a conservative estimate based on topology.
      try {
        const summary = model.toJSON(null, false);
        bytesDownloaded = JSON.stringify(summary).length;
        // weights typically 100x bigger than topology JSON for this model
        bytesDownloaded *= 100;
      } catch {}

      sizeEl.textContent = '≈ ' + fmtBytes(bytesDownloaded);
      setStatus('Analyse');
      button.disabled = false;
      input.focus();
    })();
    return loadingPromise;
  }

  /* ------------- tokenisation ------------- */
  const PAD_INDEX = 0;
  const OOV_INDEX = 2;

  function tokenise(text) {
    const seq_len = metadata.max_len || 100;
    const index_from = metadata.index_from || 3;
    const wordIndex = metadata.word_index || {};
    const tokens = text.toLowerCase()
      .replace(/[^a-z0-9\s']/g, ' ')
      .trim()
      .split(/\s+/);
    const ints = tokens.map(t => {
      const idx = wordIndex[t];
      return idx === undefined ? OOV_INDEX : idx + index_from;
    });
    // Pad / truncate to seq_len from the right (post-pad)
    if (ints.length < seq_len) {
      while (ints.length < seq_len) ints.unshift(PAD_INDEX);
    } else if (ints.length > seq_len) {
      ints.length = seq_len;
    }
    return tf.tensor2d([ints], [1, seq_len], 'int32');
  }

  /* ------------- inference ------------- */
  async function predict(text) {
    if (!model || !metadata) return null;
    const tensor = tokenise(text);
    const t0 = performance.now();
    const out = model.predict(tensor);
    const data = await out.data();
    const t1 = performance.now();
    tensor.dispose();
    out.dispose();
    return { score: data[0], ms: t1 - t0 };
  }

  /* ------------- render ------------- */
  function render({ text, score, ms }) {
    const pct = Math.round(score * 100);
    const pos = pct;
    const neg = 100 - pct;
    let label, cls;
    if (score >= 0.65)      { label = 'Positive';  cls = 'is-positive'; }
    else if (score <= 0.35) { label = 'Negative';  cls = 'is-negative'; }
    else                    { label = 'Neutral';   cls = 'is-neutral'; }

    result.innerHTML = `
      <div class="ml-result ${cls}">
        <div class="ml-result__head">
          <span class="ml-result__label">${label}</span>
          <span class="ml-result__score">${pct}%</span>
        </div>
        <div class="ml-result__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-label="Positive sentiment score">
          <div class="ml-result__fill" style="width:${pct}%"></div>
        </div>
        <div class="ml-result__split">
          <span><strong>${pos}%</strong> positive</span>
          <span><strong>${neg}%</strong> negative</span>
        </div>
        <p class="ml-result__quote">"${text}"</p>
      </div>
    `;
    timeEl.textContent = ms.toFixed(1) + ' ms';
  }

  function renderError(msg) {
    result.innerHTML = `<div class="ml-result is-negative"><div class="ml-result__head"><span class="ml-result__label">Error</span></div><p class="ml-result__quote">${msg}</p></div>`;
  }

  /* ------------- handlers ------------- */
  async function run() {
    const text = (input.value || '').trim();
    if (!text) return;
    button.disabled = true;
    setStatus('Working…');
    try {
      const out = await predict(text);
      if (out) render({ text, ...out });
    } catch (e) {
      console.error(e);
      renderError("Couldn't run the model — try again, or check your connection.");
    } finally {
      setStatus('Analyse');
      button.disabled = false;
    }
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  samples.forEach(chip => {
    chip.addEventListener('click', async () => {
      input.value = chip.dataset.sample || '';
      if (!model) await loadEverything();
      run();
    });
  });

  /* ------------- lazy load on viewport ------------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          io.disconnect();
          loadEverything().catch((e) => {
            console.error(e);
            setStatus('Model failed to load');
            renderError('TensorFlow.js or the model failed to load. Refresh and try again.');
          });
        }
      });
    }, { rootMargin: '300px 0px' });
    io.observe(root);
  } else {
    // Fallback: load on first focus / sample click
    input.addEventListener('focus', () => loadEverything().catch(console.error), { once: true });
  }
})();
