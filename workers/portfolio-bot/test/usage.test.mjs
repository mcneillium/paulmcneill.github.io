import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const bundle = await readFile(new URL('../.wrangler/dry-run/index.js', import.meta.url), 'utf8');
const { default: worker, UsageBudget } = await import('data:text/javascript;base64,' + Buffer.from(bundle).toString('base64'));

function storage() {
  const values = new Map();
  let queue = Promise.resolve();
  const store = {
    async get(key) { return structuredClone(values.get(key)); },
    async put(key, value) { values.set(key, structuredClone(value)); },
    async setAlarm() {},
    async deleteAll() { values.clear(); },
    transaction(callback) {
      const result = queue.then(() => callback(store));
      queue = result.catch(() => {});
      return result;
    },
  };
  return store;
}

function reserve(object, number) {
  return object.fetch(new Request('https://budget/reserve', {
    method: 'POST', body: JSON.stringify({ client: number.toString(16).padStart(64, '0') }),
  })).then(response => response.json());
}

test('concurrent callers cannot exceed the persistent global cap', async () => {
  const store = storage();
  const object = new UsageBudget({ storage: store });
  const results = await Promise.all(Array.from({ length: 120 }, (_, index) => reserve(object, index)));
  assert.equal(results.filter(result => result.allowed).length, 100);
  const restarted = new UsageBudget({ storage: store });
  assert.equal((await reserve(restarted, 500)).reason, 'daily-budget');
});

test('hourly and daily visitor limits persist and reset on a new day', async () => {
  const store = storage();
  const object = new UsageBudget({ storage: store });
  const results = await Promise.all(Array.from({ length: 12 }, () => reserve(object, 1)));
  assert.equal(results.filter(result => result.allowed).length, 10);
  const state = await store.get('budget');
  state.clients['1'.padStart(64, '0')].hour--;
  state.clients['1'.padStart(64, '0')].dayCount = 20;
  await store.put('budget', state);
  assert.equal((await reserve(object, 1)).reason, 'visitor-limit');
  state.day = '2000-01-01';
  await store.put('budget', state);
  assert.equal((await reserve(object, 1)).allowed, true);
  assert.equal((await store.get('budget')).total, 1);
});

function request(body, headers = {}) {
  return new Request('https://portfolio-bot.test', {
    method: 'POST', headers: {
      origin: 'https://paulmartinmcneill.com',
      'cf-connecting-ip': '192.0.2.1', ...headers,
    }, body: JSON.stringify(body),
  });
}

test('denied or unavailable budget prevents every model call', async () => {
  let calls = 0;
  const AI = { run: async () => { calls++; return { response: 'test' }; } };
  const response = await worker.fetch(request({ message: 'Tell me about Aurora Power BI' }), {
    AI, USAGE_BUDGET: {
      idFromName: value => value,
      get: () => ({ fetch: async () => Response.json({ allowed: false, reason: 'daily-budget' }) }),
    },
  });
  assert.equal(response.status, 429);
  assert.equal((await worker.fetch(request({ message: 'Tell me about Aurora' }), { AI })).status, 502);
  assert.equal(calls, 0);
});

test('model call uses capped tokens and bounded history', async () => {
  let invocation;
  const response = await worker.fetch(request({
    message: 'Tell me about Aurora Power BI',
    history: Array.from({ length: 5 }, () => ({ role: 'assistant', content: 'a'.repeat(500) })),
  }), {
    AI: { run: async (model, options) => { invocation = { model, options }; return { response: 'Portfolio reply' }; } },
    USAGE_BUDGET: {
      idFromName: value => value,
      get: () => ({ fetch: async () => Response.json({ allowed: true }) }),
    },
  });
  assert.equal(response.status, 200);
  assert.equal(invocation.options.max_tokens, 256);
  assert.equal(invocation.options.messages.length, 6);
  assert.ok(invocation.model.startsWith('@cf/'));
  const inputBytes = new TextEncoder().encode(invocation.options.messages.map(message => message.content).join('')).byteLength;
  assert.ok(inputBytes <= 6000);
});

test('invalid bodies and streamed oversized input never reach the model', async () => {
  assert.equal((await worker.fetch(request(null), {})).status, 400);
  assert.equal((await worker.fetch(request({ message: 'a'.repeat(9000) }), {})).status, 413);
  assert.equal((await worker.fetch(request({ message: 'Aurora' }, { origin: 'https://example.com' }), {})).status, 403);
});
