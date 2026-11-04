# Portfolio assistant deployment

The frontend calls the Cloudflare Worker configured at
`chatbot.endpoint` in `_config.yml`. The Worker retrieves portfolio
passages from its bundled knowledge base and sends them to
`@cf/meta/llama-3.1-8b-instruct-fp8-fast` using the Workers AI binding.

## Enforced limits

- 100 inference attempts per UTC day across the whole website.
- 10 inference attempts per UTC hour and 20 per UTC day per IP address.
- 256 generated tokens per reply.
- 6,000 UTF-8 bytes of prompt content per inference, plus model chat formatting.
- 500 characters per question, four history messages of 250 characters each.
- 8,192 bytes per HTTP body, checked while reading the stream.

A single SQLite Durable Object reserves each inference atomically before the
model runs. Counters survive Worker restarts and concurrent requests. Failed
inferences retain their reservation. If storage fails or the binding is
missing, inference stops. There are no model retries, embedding calls or
paid-provider fallbacks. The daily global cap also applies across changing IPs.

Only daily IP hashes and counters are stored. A midnight UTC alarm removes
expired counters. Messages and raw IP addresses are not saved by this code.
The hourly limit is a fixed UTC clock-hour window. People sharing an IP also
share its allowance. Greetings and questions without matching portfolio
context use local replies without model calls.

Cloudflare currently includes 10,000 Workers AI neurons per account per day.
On Workers Free, operations stop at the allowance. Workers Paid bills usage
above it. This model's published token rates and the application's limits
keep this assistant's maximum daily inference usage below that allowance.
Other Workers AI applications share the account allowance.
See https://developers.cloudflare.com/workers-ai/platform/pricing/ and
https://developers.cloudflare.com/durable-objects/platform/pricing/.
Do not upgrade the account or change the model to bypass free-plan limits.

## Deploy

From the repository root, refresh the bundled content after portfolio edits.

```powershell
node scripts/build-knowledge-base.js
cd workers/portfolio-bot
.\node_modules\.bin\wrangler.cmd login
.\node_modules\.bin\wrangler.cmd deploy --dry-run --outdir .wrangler/dry-run
node --test test/usage.test.mjs
.\node_modules\.bin\wrangler.cmd deploy
```

The Worker is deployed separately from GitHub Pages. Frontend or privacy
copy changes also need the normal Jekyll build and GitHub Pages deployment.

The model and application limits are constants in `src/index.js` and
`src/usage-budget.js`. The Durable Object namespace and migration live in
`wrangler.toml`. Preserve the namespace and its singleton name when deploying
so deployment does not reset an active day's budget.
