# Integrations & MCPs

Verdict-led list of integrations / APIs / MCPs that have been considered
for this portfolio. Default position is **don't add it** — every
integration is a long-tail support cost and most portfolios don't need
the things they advertise.

## Add now

### GitHub Pages (already in use)

- **Purpose**: hosting.
- **Cost**: free, builds on push.
- **Risk**: Pages-supported plugin set is small; locks us to Jekyll 3.10.
- **Status**: in use. Don't migrate without a clear reason.

### Google Fonts (already in use)

- **Purpose**: Instrument Serif, DM Sans, JetBrains Mono.
- **Cost**: an external request per session; CSS is sub-1KB.
- **Privacy note**: Google logs the request. Acceptable tradeoff for a
  portfolio. Could self-host the .woff2 files if privacy becomes a
  priority.
- **Status**: in use.

### `ghchart.rshah.org` for the contribution graph (already in use)

- **Purpose**: live GitHub commit chart on the home page.
- **Cost**: one external SVG request, lazy-loaded.
- **Risk**: third-party uptime. If the service dies, the section silently
  breaks. Mitigation: `<noscript>` fallback already in place;
  IntersectionObserver only fires the request when the section enters
  viewport so it doesn't block page load.
- **Status**: in use.

### `img.shields.io` for case study badges (already in use)

- **Purpose**: last commit / stars / top-language badges on case study
  pages with a `github-url`.
- **Cost**: 3 SVG requests per case study page that has them.
- **Risk**: shields.io rate-limiting on heavy traffic — not a portfolio
  concern.
- **Status**: in use.

---

## Add later — when the need is real

### GitHub Actions: link-check on every PR

- **Purpose**: run `node scripts/link-check.js` against the freshly built
  `_site/` on every push to a feature branch.
- **Benefit**: stops broken-link regressions at PR time.
- **Complexity**: ~30 lines of YAML. No secrets needed.
- **Verdict**: add when the next person other than Paul is committing.

### Lighthouse CI

- **Purpose**: track performance and accessibility scores over time.
- **Benefit**: regressions show up as score drops in CI rather than as
  a vague "site feels slow".
- **Complexity**: GitHub Action + a `lighthouserc.json`. Free for OSS.
- **Verdict**: add later. The site is fast enough today that the signal
  would be flat — wait until a real perf or a11y change is in flight.

### `jekyll-redirect-from`

- **Purpose**: redirect old URLs (the legacy Bootstrap site had different
  paths, and the multi-word categories produce ugly URLs that may need
  rewriting later).
- **Benefit**: future-proof URL changes without 404ing inbound links.
- **Complexity**: trivial; already in the `github-pages` plugin allowlist
  in our Gemfile but not enabled in `_config.yml`.
- **Verdict**: add the day we change a URL.

### Plausible / Simple Analytics

- **Purpose**: traffic data without Google Analytics.
- **Benefit**: privacy-respecting numbers; meaningful for a portfolio.
- **Complexity**: one `<script>` in `head.html`.
- **Cost**: ~£9/mo (Plausible) or self-host.
- **Verdict**: add when there's traffic worth measuring.

### A real headless CMS for blog posts

- **Purpose**: edit blog posts without touching markdown files.
- **Benefit**: lower friction → more posts.
- **Complexity**: Decap CMS or Sanity sit on top of Jekyll well.
- **Verdict**: add only after a sustained pattern of writing emerges.
  Premature CMS infrastructure encourages procrastination ("I'll write
  when the CMS is set up").

---

## Not worth adding

### A chatbot ("Talk to my AI version of me")

- Looks like a tech demo, not a portfolio. People hire on evidence of
  shipping, not on novelty widgets. Distracts from the actual work.

### Service worker for offline caching

- Considered and rejected during phase 2. Silent stale-cache bugs are
  a long-term support cost; the site already loads fast enough on a
  warm cache. The first visit savings are zero.

### Custom cursor / magnetic hover / card tilt / Konami easter egg

- All declined. The brief itself flagged most as optional. They're
  micro-interactions that read as fussy on a calm editorial design.

### Light/dark mode toggle

- Declined. The site is intentionally dark — adding a light variant
  forks every CSS custom property and adds a maintenance burden for
  ~5% of users who would actively use it. Browsers respect
  `prefers-color-scheme: dark` for OS-level UI; the site itself is
  fine being one mode.

### A booking / calendar integration

- Calendly etc. — only adds value if the volume of "book a chat"
  requests is high enough that scheduling is friction. For a
  portfolio with a "Get in touch" CTA that opens an email, the cost
  of the integration > the friction it removes.

### LinkedIn API for live "Recent positions" / "Latest activity"

- LinkedIn's API isn't open; the integration would require LinkedIn's
  partner program. Not worth pursuing for a personal portfolio. The
  CV page is the source of truth for employment history.

### MCPs for filesystem / GitHub / Playwright

- Useful for **building** the portfolio (and the GitHub MCP is already
  available to Claude during development). Not appropriate as a
  runtime visitor-facing integration.

---

## Evaluation checklist for any new integration

When considering an addition, answer these:

1. What does a visitor get from this that they don't have today?
2. Could the same value be delivered with static content?
3. What happens when the third-party service is down?
4. What does the privacy story look like (cookies, IP logging, fingerprint)?
5. Who maintains it in 18 months?
6. Does it survive being added and then ignored for a year?

If you can't answer all six confidently, default to **no**.
