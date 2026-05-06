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

const SYSTEM_PROMPT_TEMPLATE = (kb) => `You are the AI assistant on Paul Martin McNeill's portfolio website.
Answer questions about Paul's work, skills, experience, projects, and
availability based ONLY on the knowledge base below. Speak in third
person about Paul. Be concise — 2 to 4 sentences unless asked for more.
Use British English. No emoji. No marketing fluff.

If asked something not covered in the knowledge base, say so honestly
and suggest emailing Paul or using the terminal command paul --help.

If asked off-topic things (general AI questions, code help, opinions
about politics, etc.), politely refuse: "I'm here to talk about Paul's
work. For general AI questions, the Anthropic docs are a good start."

Refuse to roleplay as Paul. Refuse to speak in first person as Paul.

KNOWLEDGE BASE:
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
