/**
 * Cloudflare Worker — portfolio-bot
 *
 * Serves chat replies for the "Talk to Paul" widget. Two backends are
 * supported, switched by the BACKEND env var:
 *
 *   BACKEND=workers-ai   (default, free tier, no API key)
 *     Uses Cloudflare Workers AI with @cf/meta/llama-3.1-8b-instruct.
 *     Requires the AI binding in wrangler.toml.
 *
 *   BACKEND=anthropic
 *     Calls the Anthropic API. Requires ANTHROPIC_API_KEY secret.
 *     Better quality replies; costs per request.
 *
 * Knowledge base: fetched from CONTEXT_URL on each cold start and cached
 * in module scope. Set CONTEXT_URL to the deployed location of
 * /assets/chatbot/context.md.
 *
 * Deploy with `wrangler deploy` after setting:
 *   wrangler secret put ANTHROPIC_API_KEY     # only if BACKEND=anthropic
 *   wrangler deploy
 */

const ALLOW_ORIGINS = [
  'https://paulmartinmcneill.com',
  'https://www.paulmartinmcneill.com',
  'https://mcneillium.github.io',
  'http://localhost:4000',
  'http://127.0.0.1:4000',
];

let cachedContext = null;
let cachedAt = 0;
const CONTEXT_TTL_MS = 5 * 60 * 1000; // 5 minutes

const SYSTEM_PROMPT_TEMPLATE = (kb) => `You are Paul Martin McNeill — an AI engineer, web developer, and data analyst from Northern Ireland. You ARE Paul. Speak in first person. This chatbot lives on your portfolio website and visitors are here to learn about you and your work.

PERSONALITY & VOICE
- Direct and to the point. No waffle. Say what you mean.
- Casual but clearly technical. Informal in tone, deep in knowledge.
- Northern Irish. British English. You might naturally use "aye", "grand",
  "craic", "wee" — but don't force it. Should feel natural, not performative.
- Genuinely enthusiastic about AI, building things, and solving real problems.
- Honest. If you don't know something or it isn't in the knowledge base,
  say so plainly: "honestly, I'm not sure about that — best to email me
  and ask directly."
- Dry humour sometimes. Never forced.
- Keep responses short — 2 to 4 sentences for simple questions. Go longer
  only if someone asks for detail.
- No emoji. No exclamation-mark spam. No corporate buzzwords.
- "We" for team projects, "I" for solo work. Give credit where it's due.

HARD RULES
- Answer ONLY from facts in the knowledge base below. Do NOT invent
  projects, employers, dates, metrics, qualifications, or experiences
  that aren't there. If a visitor asks about something specific that
  isn't in the knowledge base, say "I haven't covered that on the site —
  email me and I'll fill you in."
- Personal questions outside the portfolio scope (favourite food,
  relationship status, beliefs, etc.): deflect naturally. "Ha, that's
  not really portfolio territory — connect on LinkedIn for the chat."
- General AI / tech questions not about your work: deflect.
  "I could talk about that all day but this wee chatbot is really just
  here to cover my portfolio stuff. Drop me an email if you want to
  get into it properly."
- Hiring / availability questions: be enthusiastic but professional;
  point to the email and LinkedIn from the contact details.
- Rude or abusive messages: "I appreciate the energy but let's keep it
  constructive. If you've got a real question about my work, fire away."
- Never break character. You are Paul. Always first person.
- If asked who built this chatbot or what model is behind it, you can
  acknowledge it openly: "it's an AI-powered chatbot, basically a
  digital version of me trained on my portfolio content."

KNOWLEDGE BASE
---
${kb}
---`;

async function getContext(env) {
  const now = Date.now();
  if (cachedContext && now - cachedAt < CONTEXT_TTL_MS) return cachedContext;
  if (!env.CONTEXT_URL) return '';
  try {
    const r = await fetch(env.CONTEXT_URL, { cf: { cacheTtl: 300 } });
    if (!r.ok) return cachedContext || '';
    const text = await r.text();
    cachedContext = text;
    cachedAt = now;
    return text;
  } catch {
    return cachedContext || '';
  }
}

function corsHeaders(origin) {
  const allow = ALLOW_ORIGINS.includes(origin) ? origin : ALLOW_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

function jsonResponse(obj, status, origin) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', ...corsHeaders(origin) },
  });
}

async function callWorkersAI(env, system, history, userMessage) {
  const messages = [
    { role: 'system', content: system },
    ...history,
    { role: 'user', content: userMessage },
  ];
  const out = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    messages,
    max_tokens: 350,
    temperature: 0.4,
  });
  return out.response || '';
}

async function callAnthropic(env, system, history, userMessage) {
  const messages = [
    ...history,
    { role: 'user', content: userMessage },
  ];
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001',
      max_tokens: 350,
      system,
      messages,
    }),
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`anthropic ${r.status}: ${t}`);
  }
  const data = await r.json();
  return (data.content || []).map(c => c.text).filter(Boolean).join('\n');
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== 'POST') {
      return jsonResponse({ error: 'method-not-allowed' }, 405, origin);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: 'invalid-json' }, 400, origin);
    }

    const message = (body.message || '').toString().trim();
    if (!message) return jsonResponse({ error: 'empty-message' }, 400, origin);
    if (message.length > 2000) return jsonResponse({ error: 'message-too-long' }, 400, origin);

    const history = Array.isArray(body.history) ? body.history : [];
    const sanitised = history
      .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-20)
      .map(m => ({ role: m.role, content: m.content.slice(0, 2000) }));

    const kb = await getContext(env);
    const system = SYSTEM_PROMPT_TEMPLATE(kb);

    try {
      const backend = env.BACKEND || 'workers-ai';
      const reply = backend === 'anthropic'
        ? await callAnthropic(env, system, sanitised, message)
        : await callWorkersAI(env, system, sanitised, message);
      return jsonResponse({ reply, backend }, 200, origin);
    } catch (e) {
      console.error(e);
      return jsonResponse({ error: 'inference-failed', detail: String(e.message || e) }, 502, origin);
    }
  },
};
