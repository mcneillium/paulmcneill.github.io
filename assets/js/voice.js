/* Voice picker: lets visitors choose the speaking voice and speed, like the
 * accent and font pickers. Uses the voices built into the visitor's browser,
 * so the list differs between devices. Saves the choice in localStorage
 * ('voice-name', 'voice-rate') and exposes window.siteVoice so every spoken
 * feature on the site (the portfolio assistant and the Voice board) uses it.
 * Recorded audio (narration, the board's natural voice) keeps its own voice.
 */
(function () {
  'use strict';

  var synth = window.speechSynthesis || null;
  var hasUtterance = typeof window.SpeechSynthesisUtterance !== 'undefined';
  var NAME_KEY = 'voice-name';
  var RATE_KEY = 'voice-rate';
  var RATE_MIN = 0.6, RATE_MAX = 1.6;

  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function save(k, v) {
    try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { /* private mode */ }
  }

  function allVoices() { return synth ? (synth.getVoices() || []) : []; }

  // English voices first (British, then other English), installed voices
  // before online ones, then everything else; alphabetical within groups.
  function sortedVoices() {
    function rank(v) {
      var r = /^en-GB/i.test(v.lang) ? 0 : /^en/i.test(v.lang) ? 1 : 2;
      return r * 2 + (v.localService ? 0 : 1);
    }
    return allVoices().slice().sort(function (a, b) {
      return (rank(a) - rank(b)) || a.name.localeCompare(b.name);
    });
  }

  function automatic() {
    var vs = sortedVoices();
    return vs.length && /^en/i.test(vs[0].lang) ? vs[0] : null;
  }

  function current() {
    var name = load(NAME_KEY);
    if (name) {
      var found = allVoices().filter(function (v) { return v.name === name; })[0];
      if (found) return found;
    }
    return automatic();
  }

  function rate() {
    var r = parseFloat(load(RATE_KEY));
    return r >= RATE_MIN && r <= RATE_MAX ? r : 1;
  }

  function utterance(text) {
    var u = new SpeechSynthesisUtterance(text);
    var v = current();
    if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = 'en-GB'; }
    u.rate = rate();
    return u;
  }

  function speak(text) {
    if (!synth || !hasUtterance) return false;
    synth.cancel();
    synth.speak(utterance(text));
    return true;
  }

  window.siteVoice = {
    available: !!(synth && hasUtterance),
    current: current,
    rate: rate,
    utterance: utterance,
    speak: speak
  };

  /* ── Picker UI ── */
  var wrap = document.getElementById('voicePicker');
  var btn = document.getElementById('voiceToggle');
  var panel = document.getElementById('voicePanel');
  var select = document.getElementById('voiceSelect');
  var speed = document.getElementById('voiceRate');
  var speedOut = document.getElementById('voiceRateOut');
  var preview = document.getElementById('voicePreview');
  if (!wrap || !btn || !panel || !select || !speed) return;
  if (!window.siteVoice.available) { wrap.hidden = true; return; }
  wrap.hidden = false;

  function label(v) {
    return v.name.replace(/\s*\(.*?\)\s*$/, '') + ', ' + v.lang + (v.localService ? '' : ', online');
  }

  function fill() {
    var chosen = load(NAME_KEY) || '';
    var vs = sortedVoices();
    select.textContent = '';
    var auto = document.createElement('option');
    var a = automatic();
    auto.value = '';
    auto.textContent = 'Automatic' + (a ? ' (' + a.name.replace(/\s*\(.*?\)\s*$/, '') + ')' : '');
    select.appendChild(auto);
    var groups = [
      ['British English', function (v) { return /^en-GB/i.test(v.lang); }],
      ['Other English', function (v) { return /^en/i.test(v.lang) && !/^en-GB/i.test(v.lang); }],
      ['Other languages', function (v) { return !/^en/i.test(v.lang); }]
    ];
    groups.forEach(function (g) {
      var members = vs.filter(g[1]);
      if (!members.length) return;
      var og = document.createElement('optgroup');
      og.label = g[0];
      members.forEach(function (v) {
        var o = document.createElement('option');
        o.value = v.name;
        o.textContent = label(v);
        og.appendChild(o);
      });
      select.appendChild(og);
    });
    select.value = vs.some(function (v) { return v.name === chosen; }) ? chosen : '';
  }

  function showRate() {
    var r = rate();
    speed.value = String(r);
    if (speedOut) speedOut.textContent = r.toFixed(1) + '×';
  }

  function sample() {
    speak('Hello. This is how I will read things to you on this site.');
  }

  fill();
  showRate();
  if (synth && typeof synth.addEventListener === 'function') {
    synth.addEventListener('voiceschanged', fill);
  } else if (synth) {
    synth.onvoiceschanged = fill;
  }

  select.addEventListener('change', function () {
    save(NAME_KEY, select.value || null);
    sample();
  });
  speed.addEventListener('input', function () {
    var r = Math.min(RATE_MAX, Math.max(RATE_MIN, parseFloat(speed.value) || 1));
    save(RATE_KEY, r === 1 ? null : String(r));
    showRate();
  });
  speed.addEventListener('change', sample);
  if (preview) preview.addEventListener('click', sample);

  function open() {
    wrap.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('mousedown', onOutside);
    fill();
  }
  function close() {
    wrap.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('mousedown', onOutside);
  }
  function onKeydown(e) { if (e.key === 'Escape') { close(); btn.focus(); } }
  function onOutside(e) { if (!wrap.contains(e.target)) close(); }

  btn.addEventListener('click', function () {
    if (wrap.classList.contains('is-open')) close(); else open();
  });
})();
