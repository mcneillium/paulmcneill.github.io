# Content gaps & TODOs

Everything in this doc needs **verified information** before publishing
to a wider audience. Search the repo for `TODO: REPLACE` and `TODO: confirm`
to find the in-source markers.

## Source-of-truth limitations

- This audit was done **without LinkedIn access** (the sandbox can't log
  into LinkedIn). All facts below trace to existing repo content (CV
  page, post bodies, `_config.yml`, `_data/credentials.yml`). When the
  LinkedIn profile and the repo disagree, LinkedIn wins.

## High priority — visible to visitors

### Confirmed project results and testimonials

Paul confirmed the published testimonial quotes, attributed names and numerical
project results on 4 November 2026. The testimonial data carries
`verified: true`, and the previously flagged impact fields record that
confirmation. Treat these as confirmed owner-supplied content in future reviews.

### 3. Blog posts

Two blog post stubs with `type: blog`:

- `_posts/2026-04-01-production-rag-pipelines.md`
- `_posts/2026-02-14-from-notebooks-to-pipelines.md`

Bodies contain `<!-- TODO: REPLACE -->` and outline-only prose. Either
write them or remove them. The Writing strip auto-hides if no posts
have `type: blog`, so removal is safe.

### 4. CV page facts

The CV (`/cv/index.html`) was rewritten by hand. Confirm:

- Date of First-Class BSc (currently 2025) — from the OU.
- Expected M816 Data Management completion (currently June 2026).
- Year of GCP ML Engineer cert (currently 2025).
- All employment dates and titles (Paramount Perceptions 2019–present,
  Industrial Temps 2018–19, Platinum Support & Care 2016–18).
- Contact email (currently `contact@paulmartinmcneill.com`) — different
  from `_config.yml` which has `paulmcneill1989@hotmail.co.uk`. Pick one
  authoritative address.

### 5. Architecture diagrams

Aurora has an inline SVG diagram. AAC and Healthcare HCMS would benefit
from one each. They aren't placeholders — the section just doesn't
render unless a post sets `architecture: <slug>` and a matching
`_includes/architecture/<slug>.html` exists. Add when you can sit with
each system and draw the real flow.

## Medium priority — copy that's fine but could be sharper

### Hero headline

`_includes/hero.html`:

> "Building intelligent digital systems"

Is fine. A sharper alternative grounded in actual work: "Production AI
for healthcare, accessibility, and the NHS" — but only if that framing
is what you want to lead with. **TODO: confirm** the positioning.

### About paragraph

`_includes/about.html` already references NHSCT, AAC, and analytics
work specifically. Tighten if a sentence feels generic. Otherwise hold.

### Footer copyright

`_includes/footer.html` reads "© {year} Paul Martin McNeill. Built from
scratch." The "Built from scratch" tagline is opinionated — keep or
swap for something neutral.

## Low priority — nice-to-have

- A short **"Currently"** line on the home or about page (e.g.
  "Currently: M816 at OU; building AI agents for X"). Common pattern in
  senior portfolios. Easy to add, hard to keep current.
- A **research / learning roadmap** section. Optional. Risk: another
  thing to keep up to date.
- A **publications / talks** section. Add only if there's something to
  list — empty sections are worse than no section.

## Confirmed evidence (do NOT mark as gaps)

These facts are present in the repo / config and don't need re-verification:

- Location: Northern Ireland (`_config.yml: profile.location`).
- Contact: paulmcneill1989@hotmail.co.uk (`_config.yml: email`).
- GitHub: github.com/mcneillium.
- LinkedIn: linkedin.com/in/paul-martin-mcneill-pp.
- X / Twitter: @McNeillium.
- YouTube channel: @McNeillium_AI.
- StackOverflow profile linked in `_config.yml`.
- Six certifications (with badge images) listed in
  `_data/credentials.yml`.
- Aurora Domiciliary Care GitHub repo
  (github.com/mcneillium/Aurora-Domiciliary-Care).
- AI Healthcare HCMS repo
  (github.com/mcneillium/AI_Enhanced_Social_HCMS).
- AI Assistant repo (github.com/mcneillium/ai_assistant).
