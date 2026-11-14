/* Voice playground: the AAC app's own core board and word-prediction engine,
   running in the page. The engine and board data come from voice-engine.js,
   which scripts/build-voice-engine.mjs builds from the app repository.

   The suggestion logic mirrors the app's src/services/suggestionEngine.js:
   one multi-word phrase completion first (if any), then next-word
   predictions, de-duplicated, six in total. Learning is off by default and
   only learns from messages that are spoken, as in the app. Nothing is
   stored or sent: reloading the page forgets everything. */
(function () {
  'use strict';

  var root = document.querySelector('[data-voice-play]');
  if (!root || !window.VoiceEngine) return;

  var E = window.VoiceEngine;
  var predictor = E.create({ learningEnabled: false });
  var K = 6;
  var state = { words: [], page: 'home', learning: false };
  var phraseAudio = {};
  try { phraseAudio = JSON.parse(root.getAttribute('data-phrase-audio') || '{}') || {}; } catch (e) { phraseAudio = {}; }
  var hasRecordings = Object.keys(phraseAudio).length > 0;
  function normalise(text) {
    return String(text).toLowerCase().replace(/[^a-z0-9' ]/g, '').replace(/\s+/g, ' ').trim();
  }
  var player = null;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function button(cls, text, label) {
    var b = el('button', cls, text);
    b.type = 'button';
    if (label) b.setAttribute('aria-label', label);
    return b;
  }

  /* ── Speech: the browser's own voices, preferring one installed on the device ── */
  var synth = window.speechSynthesis || null;
  function pickVoice() {
    if (!synth) return null;
    var voices = synth.getVoices() || [];
    var local = voices.filter(function (v) { return v.localService; });
    var pool = local.length ? local : voices;
    var byLang = function (re) { return pool.filter(function (v) { return re.test(v.lang); })[0]; };
    return byLang(/^en-GB/i) || byLang(/^en/i) || pool[0] || null;
  }

  /* ── Layout ── */
  var app = root.querySelector('[data-voice-app]');
  app.textContent = '';

  var bar = el('div', 'vp-bar');
  var msg = el('div', 'vp-msg');
  msg.setAttribute('role', 'status');
  msg.setAttribute('aria-live', 'polite');
  msg.setAttribute('aria-label', 'Message');
  var speakBtn = button('vp-btn vp-btn--speak', 'Speak');
  var backBtn = button('vp-btn', '⌫', 'Delete last word');
  var clearBtn = button('vp-btn', 'Clear', 'Clear message');
  var barBtns = el('div', 'vp-bar__btns');
  barBtns.append(speakBtn, backBtn, clearBtn);
  bar.append(msg, barBtns);
  var spoken = el('p', 'vp-spoken');
  spoken.setAttribute('aria-live', 'polite');
  var natural = el('div', 'vp-natural');
  var naturalBox = el('input');
  naturalBox.type = 'checkbox';
  naturalBox.id = 'vp-natural-toggle';
  var naturalLabel = el('label', '', 'Natural voice for common phrases');
  naturalLabel.setAttribute('for', 'vp-natural-toggle');
  var naturalList = el('details', 'vp-natural__list');
  naturalList.append(el('summary', '', 'Which phrases'));
  naturalList.append(el('p', '', Object.keys(phraseAudio).join(' \u00b7 ')));
  natural.append(naturalBox, naturalLabel, naturalList);
  natural.hidden = !hasRecordings;

  var sugWrap = el('div', 'vp-sugs');
  var sugLabel = el('p', 'vp-label', 'Suggested next');
  sugLabel.id = 'vp-sugs-label';
  var sugList = el('ul', 'vp-sugs__list');
  sugList.setAttribute('aria-labelledby', 'vp-sugs-label');
  sugWrap.append(sugLabel, sugList);

  var boardHead = el('div', 'vp-board__head');
  var pageTitle = el('p', 'vp-label');
  var homeBtn = button('vp-btn vp-btn--small', '← Home', 'Back to the home page');
  boardHead.append(pageTitle, homeBtn);
  var grid = el('div', 'vp-grid');
  grid.setAttribute('role', 'group');

  var typeForm = el('form', 'vp-type');
  var typeLabel = el('label', 'vp-label', 'Type a word that is not on the board');
  typeLabel.setAttribute('for', 'vp-type-input');
  var typeInput = el('input', 'vp-type__input');
  typeInput.id = 'vp-type-input';
  typeInput.type = 'text';
  typeInput.autocomplete = 'off';
  typeInput.maxLength = 30;
  typeInput.placeholder = 'e.g. Grandma';
  var typeBtn = button('vp-btn vp-btn--small', 'Add');
  typeBtn.type = 'submit';
  var typeRow = el('div', 'vp-type__row');
  typeRow.append(typeInput, typeBtn);
  typeForm.append(typeLabel, typeRow);

  var learn = el('div', 'vp-learn');
  var toggleId = 'vp-learn-toggle';
  var toggleRow = el('div', 'vp-learn__toggle');
  var toggle = el('input');
  toggle.type = 'checkbox';
  toggle.id = toggleId;
  toggle.setAttribute('role', 'switch');
  var toggleLabel = el('label', '', 'Learn from my messages');
  toggleLabel.setAttribute('for', toggleId);
  toggleRow.append(toggle, toggleLabel);
  var learnNote = el('p', 'vp-learn__note',
    'Off by default, as in the app. When on, Voice learns only from messages you Speak, never from taps you delete.');
  var stats = el('p', 'vp-learn__stats');
  stats.setAttribute('aria-live', 'polite');
  var learnedList = el('ul', 'vp-learn__words');
  var resetBtn = button('vp-btn vp-btn--small', 'Forget everything');
  learn.append(toggleRow, learnNote, stats, learnedList, resetBtn);

  var main = el('div', 'vp-main');
  var side = el('div', 'vp-side');
  main.append(bar, natural, spoken, sugWrap, boardHead, grid);
  side.append(learn, typeForm);
  app.append(main, side);

  /* ── Rendering ── */
  function suggestions() {
    var out = [];
    var words = state.words;
    try {
      if (words.length) {
        predictor.predictPhrases(words, { k: 1 }).forEach(function (ph) {
          if (ph.completion && ph.completion.split(' ').length > 1) {
            out.push({ word: ph.completion, reason: ph.reason, phrase: true });
          }
        });
      }
      predictor.predict(words, { k: K }).forEach(function (r) {
        var dup = out.some(function (o) { return o.word.toLowerCase() === r.label.toLowerCase(); });
        if (!dup) out.push({ word: r.label, reason: r.reason, personal: r.source === 'personal' });
      });
    } catch (e) { return []; }
    return out.slice(0, K);
  }

  function renderMessage() {
    msg.textContent = '';
    if (!state.words.length) {
      msg.append(el('span', 'vp-msg__empty', 'Tap words to build a message'));
    } else {
      state.words.forEach(function (w) { msg.append(el('span', 'vp-msg__word', w)); });
    }
    var empty = !state.words.length;
    speakBtn.disabled = empty;
    backBtn.disabled = empty;
    clearBtn.disabled = empty;
  }

  function renderSuggestions() {
    sugList.textContent = '';
    suggestions().forEach(function (s) {
      var li = el('li', 'vp-sug' + (s.personal || s.phrase ? ' vp-sug--personal' : ''));
      var take = button('vp-sug__take');
      // Visible text is the accessible name; the hidden comma makes it read as
      // "I, Common next word" rather than running the two together.
      take.append(el('span', 'vp-sug__word', s.word), el('span', 'sr-only', ', '), el('span', 'vp-sug__why', s.reason));
      take.addEventListener('click', function () {
        var before = state.words.slice();
        if (!s.phrase) predictor.recordSuggestionAccepted(s.word, before);
        state.words = before.concat(s.phrase ? s.word.split(' ') : [s.word]);
        update();
      });
      li.append(take);
      if (!s.phrase) {
        var hide = button('vp-sug__hide', '×', 'Don’t suggest “' + s.word + '” here');
        hide.title = 'Don’t suggest this here';
        hide.addEventListener('click', function () {
          predictor.dismissSuggestion(s.word, state.words);
          update();
          var first = sugList.querySelector('button');
          if (first) first.focus();
        });
        li.append(hide);
      }
      sugList.append(li);
    });
  }

  function renderBoard(focusFirst) {
    var page = E.pages[state.page] || E.pages.home;
    pageTitle.textContent = page.id === 'home' ? 'Core words' : page.label;
    grid.setAttribute('aria-label', page.label + ' words');
    homeBtn.hidden = page.id === 'home';
    grid.textContent = '';
    page.buttons.forEach(function (b) {
      var t = button('vp-tile' + (b.nav ? ' vp-tile--folder' : ''));
      t.style.backgroundColor = b.color;
      t.style.color = b.textColor;
      if (b.pic) {
        var pic = el('span', 'vp-tile__pic', b.pic);
        pic.setAttribute('aria-hidden', 'true');
        t.append(pic);
      }
      t.append(el('span', 'vp-tile__label', b.label));
      if (b.nav) t.setAttribute('aria-label', b.label + ', open folder');
      t.addEventListener('click', function () {
        if (b.nav) { state.page = b.nav; renderBoard(true); return; }
        state.words = state.words.concat([b.label]);
        update();
      });
      grid.append(t);
    });
    if (focusFirst) {
      var first = grid.querySelector('button');
      if (first) first.focus();
    }
  }

  function renderLearning() {
    var s = predictor.getPersonalStats();
    stats.textContent = s.summary;
    learnedList.textContent = '';
    predictor.getLearnedWords(8).forEach(function (w) {
      var li = el('li');
      li.append(el('span', '', w.display));
      var f = button('vp-btn vp-btn--tiny', 'Forget', 'Forget “' + w.display + '”');
      f.addEventListener('click', function () { predictor.forgetLearnedWord(w.word); update(); });
      li.append(f);
      learnedList.append(li);
    });
    resetBtn.hidden = s.sentences === 0 && s.dismissed === 0;
  }

  function update() {
    renderMessage();
    renderSuggestions();
    renderLearning();
  }

  /* ── Controls ── */
  speakBtn.addEventListener('click', function () {
    if (!state.words.length) return;
    var text = state.words.join(' ');
    var recording = naturalBox.checked ? phraseAudio[normalise(text)] : null;
    if (player) { player.pause(); player = null; }
    if (synth) synth.cancel();
    if (recording) {
      player = new Audio(recording);
      player.play().catch(function () {});
      if (state.learning) predictor.learnFromSpokenSentence(state.words.slice());
      spoken.textContent = 'Spoken in the recorded natural voice: \u201c' + text + '\u201d';
      update();
      return;
    }
    if (synth && typeof SpeechSynthesisUtterance !== 'undefined') {
      synth.cancel();
      var u = new SpeechSynthesisUtterance(text);
      var v = pickVoice();
      if (v) { u.voice = v; u.lang = v.lang; }
      synth.speak(u);
    }
    // As in the app, the message stays after Speak; only spoken messages train.
    if (state.learning) predictor.learnFromSpokenSentence(state.words.slice());
    var note = naturalBox.checked ? ' (no recording for this message, so your browser\u2019s voice was used)' : '';
    spoken.textContent = synth ? 'Spoken: \u201c' + text + '\u201d' + note : 'Your browser has no speech voices, so the message is shown instead: \u201c' + text + '\u201d';
    update();
  });
  backBtn.addEventListener('click', function () { state.words = state.words.slice(0, -1); update(); });
  clearBtn.addEventListener('click', function () { state.words = []; update(); });
  homeBtn.addEventListener('click', function () { state.page = 'home'; renderBoard(true); });
  typeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var w = typeInput.value.replace(/[^\p{L}\p{N}' -]/gu, '').trim();
    if (!w) return;
    state.words = state.words.concat(w.split(/\s+/));
    typeInput.value = '';
    update();
  });
  toggle.addEventListener('change', function () {
    state.learning = toggle.checked;
    predictor.setLearningEnabled(state.learning);
    update();
  });
  resetBtn.addEventListener('click', function () { predictor.resetPersonal(); update(); });

  root.classList.add('is-ready');
  renderBoard();
  update();
})();
