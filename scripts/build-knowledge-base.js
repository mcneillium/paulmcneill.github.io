/* eslint-disable no-console */
/**
 * Build the chatbot knowledge base.
 *
 * Reads:  _data/{profile,experience,education,projects,skills,credentials,principles}.yml
 *         _posts/*.md (front matter + body)
 * Writes: workers/portfolio-bot/knowledge-base.json
 *
 * Each chunk has:
 *   { id, category, text, keywords[], tokens, embedding? }
 *
 * Embeddings:
 *   If CF_ACCOUNT_ID and CF_API_TOKEN are set in env, we hit Cloudflare's
 *   Workers AI embeddings endpoint (@cf/baai/bge-base-en-v1.5) and store
 *   the 768-dim float vector with each chunk. The worker can then do
 *   cosine-similarity retrieval.
 *
 *   Without those env vars, we still write the chunks + keywords. The
 *   worker has a BM25-style keyword fallback so it works either way —
 *   embeddings just make retrieval better.
 */
const fs = require('fs');
const path = require('path');

let yaml;
try {
  yaml = require('js-yaml');
} catch (e) {
  console.error('Missing dependency: js-yaml');
  console.error('Run:  npm install js-yaml');
  process.exit(1);
}

const ROOT = path.resolve(__dirname, '..');

function loadYaml(p) {
  return yaml.load(fs.readFileSync(p, 'utf8'));
}

function loadFrontMatterAndBody(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { fm: {}, body: raw };
  let fm = {};
  try {
    fm = yaml.load(m[1]) || {};
  } catch (e) {
    console.error(`front matter parse failed for ${file}: ${e.message}`);
  }
  return { fm, body: m[2] };
}

const data = {
  profile:     loadYaml(path.join(ROOT, '_data/profile.yml')),
  experience:  loadYaml(path.join(ROOT, '_data/experience.yml')),
  education:   loadYaml(path.join(ROOT, '_data/education.yml')),
  projects:    loadYaml(path.join(ROOT, '_data/projects.yml')),
  skills:      loadYaml(path.join(ROOT, '_data/skills.yml')),
  credentials: loadYaml(path.join(ROOT, '_data/credentials.yml')),
  principles:  loadYaml(path.join(ROOT, '_data/principles.yml')),
};

const chunks = [];
const push = (id, category, text, keywords = []) => {
  if (!text || !text.trim()) return;
  const t = text.trim().replace(/\s+/g, ' ');
  chunks.push({
    id,
    category,
    text: t,
    keywords: keywords.map(k => k.toLowerCase()).filter(Boolean),
    tokens: t.split(/\s+/).length,
  });
};

/* ------- profile -------- */
push('profile.bio', 'profile',
  `Paul Martin McNeill — ${data.profile.bio_short}\n\n${data.profile.bio_long}`,
  ['paul', 'about', 'bio', 'who', 'background', 'northern ireland']
);
push('profile.current', 'current',
  `What I'm currently working on: ${data.profile.current}`,
  ['current', 'now', 'this week', 'this month', 'what are you doing']
);
push('profile.availability', 'hiring',
  `Availability: ${data.profile.availability}`,
  ['hire', 'available', 'job', 'role', 'opportunity', 'freelance', 'contract', 'looking for work']
);
push('profile.contact', 'contact',
  `Contact details:\n` +
  `Email: ${data.profile.contact.email}\n` +
  `LinkedIn: ${data.profile.contact.linkedin}\n` +
  `GitHub: ${data.profile.contact.github}\n` +
  `X / Twitter: ${data.profile.contact.twitter}\n` +
  `YouTube: ${data.profile.contact.youtube}`,
  ['contact', 'email', 'reach', 'message', 'connect', 'linkedin', 'github']
);

/* ------- experience ------ */
(data.experience.roles || []).forEach((r, i) => {
  const text = `Role: ${r.role} at ${r.org}` +
    (r.start ? ` (${r.start}${r.end ? '–' + r.end : ''})` : '') +
    `\n` + (r.bullets || []).map(b => `- ${b}`).join('\n');
  push(`exp.${i}`, 'experience', text,
    [r.role, r.org, 'experience', 'work', 'job', 'history', 'career']);
});
(data.experience.volunteering || []).forEach((r, i) => {
  const text = `Volunteering: ${r.role} at ${r.org}` +
    (r.start ? ` (${r.start}${r.end ? '–' + r.end : ''})` : '') +
    `\n` + (r.bullets || []).map(b => `- ${b}`).join('\n');
  push(`vol.${i}`, 'volunteering', text,
    [r.role, r.org, 'volunteer', 'rspb', 'rathlin']);
});

/* ------- education ------- */
(data.education || []).forEach((e, i) => {
  push(`edu.${i}`, 'education',
    `${e.qualification} — ${e.institution || ''}${e.year ? ' (' + e.year + ')' : ''}.${e.detail ? ' ' + e.detail : ''}`,
    ['education', 'study', 'degree', 'university', 'open', 'bsc', 'm816',
     e.qualification, e.institution]);
});

/* ------- projects -------- */
(data.projects || []).forEach((p, i) => {
  const text = `Project: ${p.title}\nCategory: ${p.category}\n` +
    (p.impact ? `Impact: ${p.impact}\n` : '') +
    `${p.description}\n` +
    (p.tags ? `Tech: ${p.tags.join(', ')}\n` : '') +
    (p.github ? `GitHub: ${p.github}\n` : '') +
    (p.demo   ? `Demo: ${p.demo}\n`   : '');
  push(`proj.${i}`, 'project', text,
    [p.title, p.category, ...(p.tags || []), 'project', 'work', 'built', 'shipped']);
});

/* ------- skills tiers ------- */
(data.skills.tiers || []).forEach((t, i) => {
  push(`skill.${i}`, 'skills',
    `Skill tier — ${t.label} (${t.description}): ${(t.items || []).map(x => x.name).join(', ')}`,
    ['skill', 'stack', 'tech', 'tools', t.label]);
});

/* ------- credentials ------- */
const credText = (data.credentials || []).map(c =>
  `- ${c.name} (${c.issuer}${c.year ? ', ' + c.year : ''})`
).join('\n');
push('certs', 'credentials',
  `Certifications and memberships:\n${credText}`,
  ['cert', 'certification', 'qualif', 'membership', 'mbcs', 'iet', 'gcp', 'aws', 'tensorflow']);

/* ------- principles ------- */
(data.principles || []).forEach((p, i) => {
  push(`principle.${i}`, 'principles',
    `Principle ${p.num} — ${p.title}: ${p.body}`,
    ['principle', 'how i work', 'approach', 'methodology', p.title]);
});

/* ------- blog posts ------ */
const postsDir = path.join(ROOT, '_posts');
fs.readdirSync(postsDir).filter(f => f.match(/\.(md|markdown)$/)).forEach((f, i) => {
  const { fm, body } = loadFrontMatterAndBody(path.join(postsDir, f));
  if (fm.type !== 'blog') return;
  // Split blog body into ~2 chunks: intro (first 2 paragraphs) + rest
  const paras = body.replace(/<!--[\s\S]*?-->/g, '').split(/\n\n+/).filter(s => s.trim() && !s.startsWith('#'));
  const intro = paras.slice(0, 2).join(' ');
  const rest  = paras.slice(2).join(' ');
  push(`blog.${i}.intro`, 'blog',
    `Blog post — ${fm.title}: ${fm.description || ''} ${intro}`.slice(0, 1500),
    [fm.title, ...(fm.tags || []), 'blog', 'writing', 'post']);
  if (rest) push(`blog.${i}.body`, 'blog',
    `${fm.title} — continued: ${rest.slice(0, 1500)}`,
    [fm.title, ...(fm.tags || []), 'blog', 'writing']);
});

/* ------- embeddings (optional) ------- */
async function embedAll() {
  const acct  = process.env.CF_ACCOUNT_ID;
  const token = process.env.CF_API_TOKEN;
  if (!acct || !token) {
    console.log('CF_ACCOUNT_ID / CF_API_TOKEN not set — skipping embeddings.');
    console.log('Worker will fall back to keyword retrieval. Set both env vars and re-run to enable cosine retrieval.');
    return;
  }
  console.log('Embedding chunks via Cloudflare Workers AI…');
  const url = `https://api.cloudflare.com/client/v4/accounts/${acct}/ai/run/@cf/baai/bge-base-en-v1.5`;
  for (const c of chunks) {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'authorization': `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify({ text: [c.text] }),
    });
    if (!r.ok) {
      const t = await r.text();
      console.error(`embed failed for ${c.id}: ${r.status} ${t}`);
      continue;
    }
    const j = await r.json();
    const v = j?.result?.data?.[0];
    if (Array.isArray(v)) c.embedding = v;
  }
  const withEmb = chunks.filter(c => c.embedding).length;
  console.log(`Embedded ${withEmb} / ${chunks.length} chunks.`);
}

(async () => {
  await embedAll();
  const file = path.join(ROOT, 'workers/portfolio-bot/knowledge-base.json');
  fs.writeFileSync(file, JSON.stringify({
    built_at: new Date().toISOString(),
    embedding_model: chunks[0]?.embedding ? '@cf/baai/bge-base-en-v1.5' : null,
    chunks,
  }, null, 2));
  console.log(`Wrote ${path.relative(ROOT, file)} — ${chunks.length} chunks.`);
})().catch(e => { console.error(e); process.exit(1); });
