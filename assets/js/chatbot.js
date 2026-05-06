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
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
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
      "Hi — I'm a small AI built into Paul's portfolio. " +
      "Ask me about Paul's projects, tech stack, NHS work, or how to get in touch.";
    appendMsg(greeting, 'bot');
    showSuggestions(true);
  }

  /* ------------- demo mode fallback ------------- */
  // Used when no ENDPOINT is configured. Pulls answers from the terminal
  // data blob (same data set that powers the terminal).
  function demoAnswer(question) {
    const q = question.toLowerCase();
    let data;
    try {
      const node = document.getElementById('terminal-data');
      if (node) data = JSON.parse(node.textContent);
    } catch {}

    const intro = "(Demo mode — the live chatbot isn't deployed yet, so I'm answering from the structured data on the page. ";
    const tail  = "Try the Terminal button for the full set of answers, or email Paul directly.)";

    if (!data) return intro + "I can't read the page data right now. " + tail;

    if (/(stack|tech|skill)/.test(q)) {
      const tiers = (data.skills?.tiers || []).map(t =>
        `${t.label}: ${(t.items || []).map(i => i.name).join(', ')}`).join('\n\n');
      return `Paul's stack, by tier:\n\n${tiers}`;
    }
    if (/(project|work|build|nhs|aurora|aac|crm)/.test(q)) {
      const list = (data.projects || []).slice(0, 5).map(p =>
        `• ${p.title} — ${p.impact || p.description}`).join('\n');
      return `Recent projects:\n\n${list}\n\nFor any one of them, type 'paul --project <name>' in the terminal.`;
    }
    if (/(hire|available|job|role|opportun)/.test(q)) {
      return data.profile?.availability ||
        "Paul is open to AI engineering and ML opportunities — drop a line at paulmcneill1989@hotmail.co.uk.";
    }
    if (/(contact|email|reach|message)/.test(q)) {
      return `Email: ${data.profile?.contact?.email}\nGitHub: ${data.profile?.contact?.github}\nLinkedIn: ${data.profile?.contact?.linkedin}`;
    }
    if (/(experience|history|cv|resume|career)/.test(q)) {
      const roles = (data.experience?.roles || []).map(r =>
        `${r.role} @ ${r.org} (${r.start}–${r.end})`).join('\n');
      return `Work history:\n\n${roles}`;
    }
    if (/(education|study|degree|university|open)/.test(q)) {
      const ed = (data.education || []).map(e =>
        `${e.qualification} — ${e.institution} ${e.year ? '(' + e.year + ')' : ''}`).join('\n');
      return `Education:\n\n${ed}`;
    }
    if (/(cert|membership|qualif)/.test(q)) {
      const certs = (data.credentials || []).map(c =>
        `• ${c.name} — ${c.issuer}${c.year ? ' (' + c.year + ')' : ''}`).join('\n');
      return `Certifications & memberships:\n\n${certs}`;
    }
    return intro + "I'd answer that better with the live model. For now, try asking about Paul's projects, stack, experience, education, or availability. " + tail;
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
      throw new Error(`Server replied ${res.status}: ${txt || 'no body'}`);
    }
    const data = await res.json();
    return data.reply || "(empty response)";
  }

  /* ------------- send a message ------------- */
  async function ask(question) {
    if (!question || !question.trim()) return;
    if (userMsgCount >= MAX_USER_MSGS_PER_SESSION) {
      appendMsg("That's enough for one session — drop Paul a real email instead.", 'bot');
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
      const reply = ENDPOINT
        ? await liveAnswer(question)
        : await new Promise(r => setTimeout(() => r(demoAnswer(question)), 350));
      typing.remove();
      appendMsg(reply, 'bot');
      conversation.push({ role: 'assistant', content: reply });
    } catch (e) {
      typing.remove();
      appendMsg(
        "Something went wrong reaching the assistant. Try again, or email Paul directly at paulmcneill1989@hotmail.co.uk.",
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
