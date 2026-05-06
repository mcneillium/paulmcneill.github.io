/* Terminal — CLI-style portfolio explorer.
   Pure frontend. All data comes from the JSON blob written by Liquid. */

(() => {
  const root      = document.getElementById('terminal');
  if (!root) return;
  const body      = document.getElementById('terminalBody');
  const output    = document.getElementById('terminalOutput');
  const input     = document.getElementById('terminalInput');
  const dataNode  = document.getElementById('terminal-data');
  if (!body || !output || !input || !dataNode) return;

  let data;
  try { data = JSON.parse(dataNode.textContent); }
  catch (e) { console.error('terminal data parse failed', e); return; }

  /* ---------- helpers ---------- */
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

  const linkify = (s) => esc(s).replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener">$1</a>'
  );

  const print = (html, cls = '') => {
    const div = document.createElement('div');
    if (cls) div.className = cls;
    div.innerHTML = html;
    output.appendChild(div);
    body.scrollTop = body.scrollHeight;
  };

  const printCmd = (raw) => {
    print(`<span class="terminal__prompt">paul@portfolio:~$</span> <span>${esc(raw)}</span>`, 'terminal__cmd');
  };

  const blank = () => print('&nbsp;');

  const hr = () => print('<span class="dim">────────────────────────────</span>');

  /* ---------- command implementations ---------- */
  const commands = {};

  commands.help = () => {
    print('<span class="label">Available commands</span>');
    const rows = [
      ['paul --about',       'Bio and background'],
      ['paul --skills',      'Tech stack by tier'],
      ['paul --projects',    'List of projects'],
      ['paul --project X',   'Detail on project X (e.g. aurora)'],
      ['paul --experience',  'Work history'],
      ['paul --education',   'Education'],
      ['paul --certs',       'Certifications & memberships'],
      ['paul --contact',     'Email and social links'],
      ['paul --principles',  'How I work'],
      ['paul --current',     'What I\'m doing now'],
      ['paul --hire',        'Availability'],
      ['paul --social',      'Social links'],
      ['paul --stack',       'Tech stack as ASCII'],
      ['echo &lt;text&gt;',        'Echo text back'],
      ['history',            'Command history'],
      ['clear',              'Clear the screen'],
      ['matrix',             'Easter egg'],
    ];
    rows.forEach(([cmd, desc]) =>
      print(`  <span class="ok">${cmd.padEnd(24, ' ')}</span> <span class="dim">${desc}</span>`)
    );
  };

  commands.about = () => {
    print('<span class="heading">About</span>');
    print(esc(data.profile.bio_short));
    blank();
    print('<span class="dim">' + esc(data.profile.bio_long) + '</span>');
    blank();
    print('<span class="label">Location</span> ' + esc(data.profile.location));
  };

  commands.skills = () => {
    print('<span class="heading">Skills</span>');
    (data.skills.tiers || []).forEach((tier) => {
      blank();
      print(`<span class="label">${esc(tier.label)}</span> <span class="dim">— ${esc(tier.description)}</span>`);
      const items = (tier.items || []).map(i => i.name).join(', ');
      print('  ' + esc(items));
    });
  };

  commands.projects = () => {
    print('<span class="heading">Projects</span>');
    (data.projects || []).forEach(p => {
      print(`  <span class="ok">${esc(p.title)}</span>`);
      print(`  <span class="dim">  ${esc(p.category || '')} · ${esc(p.impact || '')}</span>`);
    });
    blank();
    print('<span class="dim">Try: paul --project aurora</span>');
  };

  commands.project = (arg) => {
    if (!arg) { print('<span class="warn">Usage: paul --project &lt;slug&gt;</span>'); return; }
    const needle = arg.toLowerCase();
    const p = (data.projects || []).find(p =>
      (p.title || '').toLowerCase().includes(needle) ||
      (p.url   || '').toLowerCase().includes(needle)
    );
    if (!p) { print(`<span class="err">No project matching "${esc(arg)}". Try: paul --projects</span>`); return; }
    print(`<span class="heading">${esc(p.title)}</span>`);
    print(`<span class="label">Category</span> ${esc(p.category || '')}`);
    if (p.impact) print(`<span class="label">Impact</span>  <span class="ok">${esc(p.impact)}</span>`);
    print(`<span class="label">Tags</span>     ${esc((p.tags || []).join(', '))}`);
    if (p.github) print(`<span class="label">GitHub</span>   ${linkify(p.github)}`);
    if (p.demo)   print(`<span class="label">Demo</span>     ${linkify(p.demo)}`);
    if (p.url)    print(`<span class="label">Read</span>     <a href="${esc(p.url)}">${esc(p.url)}</a>`);
    blank();
    print(esc(p.description || ''));
  };

  commands.experience = () => {
    print('<span class="heading">Experience</span>');
    (data.experience.roles || []).forEach(r => {
      blank();
      const dates = r.start && r.end ? `${r.start} – ${r.end}` : (r.end || '');
      print(`<span class="ok">${esc(r.role)}</span> <span class="dim">@ ${esc(r.org)}</span> <span class="dim">${esc(dates)}</span>`);
      (r.bullets || []).forEach(b => print(`  · ${esc(b)}`));
    });
    if (data.experience.volunteering && data.experience.volunteering.length) {
      blank();
      print('<span class="label">Volunteering</span>');
      data.experience.volunteering.forEach(r => {
        print(`<span class="ok">${esc(r.role)}</span> <span class="dim">@ ${esc(r.org)} · ${esc(r.start)} – ${esc(r.end)}</span>`);
        (r.bullets || []).forEach(b => print(`  · ${esc(b)}`));
      });
    }
  };

  commands.education = () => {
    print('<span class="heading">Education</span>');
    (data.education || []).forEach(e => {
      blank();
      print(`<span class="ok">${esc(e.qualification)}</span>`);
      print(`<span class="dim">  ${esc(e.institution)}${e.year ? ' · ' + esc(e.year) : ''}</span>`);
      if (e.detail) print(`  ${esc(e.detail)}`);
    });
  };

  commands.certs = () => {
    print('<span class="heading">Certifications &amp; memberships</span>');
    (data.credentials || []).forEach(c => {
      print(`  <span class="ok">${esc(c.name)}</span> <span class="dim">— ${esc(c.issuer)}${c.year ? ' · ' + esc(c.year) : ''}</span>`);
    });
  };

  commands.contact = () => {
    print('<span class="heading">Contact</span>');
    if (data.profile.contact?.email) print(`<span class="label">Email</span>    <a href="mailto:${esc(data.profile.contact.email)}">${esc(data.profile.contact.email)}</a>`);
    Object.entries(data.profile.contact || {}).forEach(([k, v]) => {
      if (k === 'email') return;
      print(`<span class="label">${esc(k.padEnd(8, ' '))}</span> ${linkify(v)}`);
    });
  };

  commands.principles = () => {
    print('<span class="heading">How I work</span>');
    (data.principles || []).forEach(p => {
      blank();
      print(`<span class="ok">${esc(p.num)} ${esc(p.title)}</span>`);
      print(`  <span class="dim">${esc(p.body)}</span>`);
    });
  };

  commands.current = () => {
    print('<span class="heading">Currently</span>');
    print(esc(data.profile.current));
  };

  commands.hire = () => {
    print('<span class="heading">Availability</span>');
    if (data.available) {
      print('<span class="ok">● Available</span>');
      blank();
      print(esc(data.profile.availability));
    } else {
      print('<span class="warn">Not currently taking new work — but always open to a chat.</span>');
    }
    blank();
    print(`Drop a line: <a href="mailto:${esc(data.profile.contact.email)}">${esc(data.profile.contact.email)}</a>`);
  };

  commands.social = () => {
    print('<span class="heading">Social</span>');
    (data.social || []).forEach(s => {
      print(`<span class="label">${esc((s.title || '').padEnd(14, ' '))}</span> ${linkify(s.url)}`);
    });
  };

  commands.stack = () => {
    print('<pre>      ┌─────────────────────────────────────────────┐\n' +
          '      │  Python · TypeScript · React · Node · Next  │\n' +
          '      ├─────────────────────────────────────────────┤\n' +
          '      │  Power BI · Pandas · SQL · Postgres         │\n' +
          '      ├─────────────────────────────────────────────┤\n' +
          '      │  TensorFlow · LangChain · OpenAI · Claude   │\n' +
          '      ├─────────────────────────────────────────────┤\n' +
          '      │  Docker · Azure · GCP · Firebase · Git      │\n' +
          '      └─────────────────────────────────────────────┘</pre>');
  };

  commands.clear = () => { output.innerHTML = ''; };
  commands.history = () => history.forEach((h, i) => print(`  ${i + 1}  ${esc(h)}`));
  commands.echo = (rest) => print(esc(rest));

  /* easter eggs */
  commands.matrix = () => {
    print('<span class="ok">wake up, paul...</span>');
    let lines = 0;
    const id = setInterval(() => {
      const row = Array.from({length: 60}, () =>
        Math.random() < 0.5 ? String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96)) : ' '
      ).join('');
      print(`<span style="color:#28c840">${esc(row)}</span>`);
      if (++lines >= 12) clearInterval(id);
    }, 80);
  };

  commands['sudo-hire-paul'] = () => {
    print('<span class="ok">[sudo] permission granted.</span>');
    setTimeout(() => print('<span class="ok">drafting offer letter...</span>'), 400);
    setTimeout(() => print('<span class="ok">sending email...</span>'), 900);
    setTimeout(() => print(`<span class="ok">done. paul will be in touch — try <a href="mailto:${esc(data.profile.contact.email)}">${esc(data.profile.contact.email)}</a></span>`), 1400);
  };

  /* ---------- parser ---------- */
  function parse(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return null;
    if (trimmed === 'help' || trimmed === 'paul' || trimmed === 'paul --help' || trimmed === '--help') return { name: 'help', arg: '' };
    if (trimmed === 'clear' || trimmed === 'cls')   return { name: 'clear', arg: '' };
    if (trimmed === 'history')                     return { name: 'history', arg: '' };
    if (trimmed === 'matrix')                      return { name: 'matrix', arg: '' };
    if (/^sudo\s+hire\s+paul$/.test(trimmed))      return { name: 'sudo-hire-paul', arg: '' };
    if (trimmed.startsWith('echo '))               return { name: 'echo', arg: trimmed.slice(5) };

    const m = trimmed.match(/^paul\s+--([a-z]+)(?:\s+(.+))?$/i);
    if (m) return { name: m[1].toLowerCase(), arg: m[2] || '' };
    return { name: '_unknown', arg: trimmed };
  }

  /* ---------- run ---------- */
  function run(rawCommand) {
    const parsed = parse(rawCommand);
    if (!parsed) return;
    if (parsed.name === '_unknown') {
      print(`<span class="err">command not found: ${esc(parsed.arg)}</span>`);
      print('<span class="dim">type <span class="ok">help</span> for available commands</span>');
      return;
    }
    const fn = commands[parsed.name];
    if (!fn) {
      print(`<span class="err">unknown command: ${esc(parsed.name)}</span>`);
      return;
    }
    try { fn(parsed.arg); } catch (e) { print(`<span class="err">${esc(e.message)}</span>`); }
  }

  /* ---------- history & tab completion ---------- */
  const history = [];
  let historyIdx = -1;

  const COMMANDS = ['help', 'clear', 'history', 'echo', 'matrix', 'sudo hire paul'];
  const FLAGS = ['--about','--skills','--projects','--project','--experience','--education','--certs','--contact','--principles','--current','--hire','--social','--stack','--help'];

  function complete(value) {
    if (value.startsWith('paul ')) {
      const rest = value.slice(5);
      const matches = FLAGS.filter(f => f.startsWith(rest));
      if (matches.length === 1) return 'paul ' + matches[0];
    } else {
      const matches = COMMANDS.filter(c => c.startsWith(value));
      if (matches.length === 1) return matches[0];
    }
    return value;
  }

  /* ---------- input handling ---------- */
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const value = input.value;
      printCmd(value);
      input.value = '';
      if (value.trim()) {
        history.push(value);
        historyIdx = history.length;
        run(value);
      }
    } else if (e.key === 'ArrowUp') {
      if (history.length === 0) return;
      e.preventDefault();
      historyIdx = Math.max(0, historyIdx - 1);
      input.value = history[historyIdx] || '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      historyIdx = Math.min(history.length, historyIdx + 1);
      input.value = history[historyIdx] || '';
    } else if (e.key === 'Tab') {
      e.preventDefault();
      input.value = complete(input.value);
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      commands.clear();
    }
  });

  body.addEventListener('click', () => input.focus());

  /* ---------- open / close (wired by main.js) ---------- */
  let prevFocus = null;
  let booted = false;

  const banner = () => {
    print('<pre class="ok">' +
      '  ____            _ \n' +
      ' |  _ \\ __ _ _   _| |\n' +
      ' | |_) / _` | | | | |\n' +
      ' |  __/ (_| | |_| | |\n' +
      ' |_|   \\__,_|\\__,_|_|\n' +
      '</pre>');
    print('<span class="dim">portfolio terminal · type <span class="ok">help</span> to begin</span>');
    blank();
  };

  function open() {
    prevFocus = document.activeElement;
    if (!booted) { banner(); booted = true; }
    root.classList.add('is-open');
    root.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input.focus(), 50);
  }
  function close() {
    root.classList.remove('is-open');
    root.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (prevFocus) prevFocus.focus();
  }

  // expose
  window.portfolioTerminal = { open, close };

  // wire up triggers and close
  document.querySelectorAll('[data-open="terminal"]').forEach(el => {
    el.addEventListener('click', open);
  });
  document.querySelectorAll('[data-close="terminal"]').forEach(el => {
    el.addEventListener('click', close);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('is-open')) close();
  });
})();
