/* "Talk to Paul" — chatbot frontend.
 * Posts to a configurable endpoint (default: a Cloudflare Worker that
 * proxies Workers AI). Fails gracefully into "demo mode" with a
 * static answer when no endpoint is configured.
 */

(() => {
  const root        = document.getElementById('chatbot');
  const fab         = document.getElementById('chatFab');
  const closeBtns   = document.querySelectorAll('[data-close="chatbot"]');
  const openBtns    = document.querySelectorAll('[data-open="chatbot"]');
  const body        = document.getElementById('chatBody');
  const form        = document.getElementById('chatForm');
  const input       = document.getElementById('chatInput');
  const send        = form ? form.querySelector('.chat__send') : null;
  const suggestions = document.getElementById('chatSuggestions');
  if (!root || !body || !form || !input) return;

  /* ------------- config -------------
   * Set window.CHATBOT_ENDPOINT in your site (e.g. via a small inline
   * script tag, or by editing this constant) to point at your deployed
   * Cloudflare Worker. Until then, the bot runs in "demo mode" with a
   * static fallback answer.
   */
  const ENDPOINT = (typeof window !== 'undefined' && window.CHATBOT_ENDPOINT)
    || ''; // e.g. 'https://paul-portfolio-bot.your-name.workers.dev/chat'

  const MAX_USER_MSGS_PER_SESSION = 25;
  const HISTORY_LIMIT = 10; // messages of context sent to the model

  let conversation = []; // [{role:'user'|'assistant', content:'...'}]
  let userMsgCount = 0;
  let prevFocus = null;

  /* ------------- ui helpers ------------- */
  function appendMsg(text, who, opts = {}) {
    const div = document.createElement('div');
    div.className = `chat__msg chat__msg--${who}${opts.error ? ' chat__msg--err' : ''}`;
    // textContent — never innerHTML — so any markup in the reply is safely escaped
    div.textContent = text;
    body.appendChild(div);
    if (opts.sources && opts.sources.length) {
      body.appendChild(renderSources(opts.sources));
    }
    body.scrollTop = body.scrollHeight;
    return div;
  }

  function renderSources(sources) {
    const det = document.createElement('details');
    det.className = 'chat-sources';
    const sum = document.createElement('summary');
    sum.textContent = `How I found this answer (${sources.length} source${sources.length === 1 ? '' : 's'})`;
    det.appendChild(sum);
    const list = document.createElement('ul');
    list.className = 'chat-sources__list';
    sources.forEach(s => {
      const li = document.createElement('li');
      li.className = 'chat-source';
      const cat = document.createElement('span');
      cat.className = 'chat-source__cat';
      cat.textContent = s.category || 'context';
      const sc = document.createElement('span');
      sc.className = 'chat-source__score';
      sc.textContent = s.score != null ? s.score.toFixed(2) : '—';
      const tx = document.createElement('span');
      tx.className = 'chat-source__text';
      tx.textContent = s.text || '';
      li.appendChild(cat); li.appendChild(sc); li.appendChild(tx);
      list.appendChild(li);
    });
    det.appendChild(list);
    return det;
  }

  function appendTyping() {
    const div = document.createElement('div');
    div.className = 'chat__msg chat__msg--bot chat__typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
  }

  function showSuggestions(show) {
    if (!suggestions) return;
    suggestions.classList.toggle('is-shown', show);
  }

  /* ------------- intro ------------- */
  function bootIntro() {
    if (body.dataset.booted) return;
    body.dataset.booted = '1';
    const greeting =
      "Hey — Paul here, sort of. Ask me about my projects, the NHS work, " +
      "tech stack, or how to get in touch.";
    appendMsg(greeting, 'bot');
    showSuggestions(true);
  }

  /* ------------- offline fallback -------------
   * Used when no ENDPOINT is configured. Pulls answers from the same
   * structured-data blob the terminal uses. Speaks in first person —
   * the visitor doesn't need to know whether they're talking to the
   * live model or the static fallback.
   */
  function demoAnswer(question) {
    const q = question.toLowerCase();
    let data;
    try {
      const node = document.getElementById('terminal-data');
      if (node) data = JSON.parse(node.textContent);
    } catch {}

    if (!data) {
      return "Hmm — can't read the page data on this device. Best to email me directly: paulmcneill1989@hotmail.co.uk.";
    }

    if (/(stack|tech|skill|tools|languages)/.test(q)) {
      const tiers = (data.skills?.tiers || []).map(t =>
        `${t.label}: ${(t.items || []).map(i => i.name).join(', ')}`).join('\n\n');
      return `Here's my stack, grouped by how often I reach for it:\n\n${tiers}`;
    }
    if (/(nhs|aurora|aac|crm|healthcare|industrial|domiciliary)/.test(q)) {
      const list = (data.projects || []).slice(0, 5).map(p =>
        `• ${p.title} — ${p.impact || p.description}`).join('\n');
      return `Recent stuff I've shipped:\n\n${list}\n\nWant the full write-up on any of them? Click through from the projects section, or open the terminal and try 'paul --project aurora'.`;
    }
    if (/(project|work|build|portfolio)/.test(q)) {
      const list = (data.projects || []).slice(0, 5).map(p =>
        `• ${p.title} — ${p.impact || p.description}`).join('\n');
      return `These are the ones I'd point a recruiter at first:\n\n${list}`;
    }
    if (/(hire|available|job|role|opportun|freelance|contract)/.test(q)) {
      return (data.profile?.availability ||
        "Aye, I'm open to AI engineering, ML, and full-stack roles — full-time, contract, or freelance.") +
        ` Best route is email: ${data.profile?.contact?.email || 'paulmcneill1989@hotmail.co.uk'}.`;
    }
    if (/(contact|email|reach|message|connect)/.test(q)) {
      return `Easiest is email: ${data.profile?.contact?.email}\nLinkedIn: ${data.profile?.contact?.linkedin}\nGitHub: ${data.profile?.contact?.github}`;
    }
    if (/(experience|history|cv|resume|career|years|background)/.test(q)) {
      const roles = (data.experience?.roles || []).map(r =>
        `• ${r.role} @ ${r.org} (${r.start}–${r.end})`).join('\n');
      return `Over 15 years across IT, data, and engineering. Roles in order:\n\n${roles}`;
    }
    if (/(education|study|degree|university|open|m816)/.test(q)) {
      const ed = (data.education || []).map(e =>
        `• ${e.qualification} — ${e.institution} ${e.year ? '(' + e.year + ')' : ''}`).join('\n');
      return `Education-wise:\n\n${ed}`;
    }
    if (/(cert|membership|qualif|gcp|aws|tensorflow)/.test(q)) {
      const certs = (data.credentials || []).map(c =>
        `• ${c.name} — ${c.issuer}${c.year ? ' (' + c.year + ')' : ''}`).join('\n');
      return `Certs and memberships:\n\n${certs}`;
    }
    if (/(current|now|right now|this week|this month|today)/.test(q)) {
      return data.profile?.current ||
        "Working on Aurora — Northern Ireland NHSCT-aligned analytics — and the M816 Data Management module at the OU.";
    }
    if (/(about|who|what do you do|introduce)/.test(q)) {
      return data.profile?.bio_short ||
        "AI engineer, web developer, and data analyst from Northern Ireland with 15+ years across IT, data, and engineering.";
    }
    return "Honestly, not sure I've got that on the site. Best to email me directly: paulmcneill1989@hotmail.co.uk — happy to chat properly.";
  }

  /* ------------- live mode ------------- */
  async function liveAnswer(question) {
    const recent = conversation.slice(-HISTORY_LIMIT * 2);
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: question,
        history: recent
      })
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      // Forward 429 (rate-limited) message verbatim if the server provided one
      if (res.status === 429) {
        try { const j = JSON.parse(txt); if (j.reply) return { reply: j.reply, sources: [] }; } catch {}
      }
      throw new Error(`Server replied ${res.status}: ${txt || 'no body'}`);
    }
    const data = await res.json();
    return {
      reply: data.reply || "Hmm, blank reply on my end — try again?",
      sources: Array.isArray(data.sources) ? data.sources : [],
    };
  }

  /* ------------- send a message ------------- */
  async function ask(question) {
    if (!question || !question.trim()) return;
    if (userMsgCount >= MAX_USER_MSGS_PER_SESSION) {
      appendMsg("Right, that's plenty for one sitting — if you've got more, fire me an email at paulmcneill1989@hotmail.co.uk and I'll reply properly.", 'bot');
      return;
    }
    showSuggestions(false);
    appendMsg(question, 'user');
    conversation.push({ role: 'user', content: question });
    userMsgCount++;
    input.value = '';
    if (send) send.disabled = true;

    const typing = appendTyping();
    try {
      const result = ENDPOINT
        ? await liveAnswer(question)
        : await new Promise(r => setTimeout(() => r({ reply: demoAnswer(question), sources: [] }), 350));
      typing.remove();
      appendMsg(result.reply, 'bot', { sources: result.sources });
      conversation.push({ role: 'assistant', content: result.reply });
    } catch (e) {
      typing.remove();
      appendMsg(
        "Couldn't reach my brain just now — give it another go, or email me directly: paulmcneill1989@hotmail.co.uk.",
        'bot',
        { error: true }
      );
      console.error('chatbot error', e);
    } finally {
      if (send) send.disabled = false;
      input.focus();
    }
  }

  /* ------------- events ------------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    ask(input.value.trim());
  });

  if (suggestions) {
    suggestions.querySelectorAll('.chat__chip').forEach(chip => {
      chip.addEventListener('click', () => ask(chip.dataset.q));
    });
  }

  function open() {
    prevFocus = document.activeElement;
    bootIntro();
    root.classList.add('is-open');
    root.setAttribute('aria-hidden', 'false');
    setTimeout(() => input.focus(), 50);
  }
  function close() {
    root.classList.remove('is-open');
    root.setAttribute('aria-hidden', 'true');
    if (prevFocus) prevFocus.focus();
  }

  openBtns.forEach(b => b.addEventListener('click', open));
  closeBtns.forEach(b => b.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('is-open')) close();
  });

  window.portfolioChat = { open, close };
})();
