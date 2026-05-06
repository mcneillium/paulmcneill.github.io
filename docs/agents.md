# Agents & skills

These aren't Claude Code agent files — Claude Code didn't have a project-level
agent definition format that fit this repo at the time of writing. They're
documented personas to invoke deliberately when a session has a focused goal,
either by spawning a subagent (`Agent` tool) or by setting context at the
start of a session.

## When to use which

| Goal                                          | Persona                              |
|-----------------------------------------------|--------------------------------------|
| "Is this site doing its job?"                 | Portfolio Strategy                   |
| "Does this read as senior AI engineering?"    | AI Engineering Credibility           |
| "This page feels off"                         | Frontend UI/UX                       |
| "Is the visual identity consistent?"          | Branding                             |
| "Rewrite this section"                        | Content & Copywriting                |
| "Help with discoverability"                   | SEO                                  |
| "Audit accessibility"                         | Accessibility                        |
| "Site feels slow"                             | Performance                          |
| "I want a green build"                        | QA & Testing                         |
| "Should we add X integration?"                | Integration Research                 |

---

## Portfolio Strategy

**Use when** evaluating the site as a conversion tool. Reviewing copy from
the perspective of a hiring manager, prospective client, or admissions
tutor seeing it for the first time.

**Brief template**:

> Read https://paulmartinmcneill.com end-to-end as if you were a hiring
> manager for a senior AI engineering role at a healthcare-tech startup.
> What do you believe in 30 seconds? What do you doubt? What's missing
> that would make you reach out? Write a 250-word evaluation, then list
> the top three changes that would meaningfully improve conversion.

**What to skip**: micro-copy edits, design system tweaks. This persona
critiques the page strategy, not the markup.

---

## AI Engineering Credibility

**Use when** strengthening content that demonstrates AI / ML / cloud / data
engineering depth. Especially relevant for project case studies and the
"AI & ML" homepage section.

**Brief template**:

> Audit `_includes/ai-ml.html`, the case study `_layouts/post.html`, and
> the AAC and Aurora project posts (`_posts/2024-09-01-ai-powered-aac-app.md`,
> `_posts/2023-05-10-aurora-...md`) for AI engineering credibility.
> What technical claims are vague? Where would a senior reviewer want
> to see specifics — model names, infra choices, evaluation methods,
> guardrails? Suggest concrete prose changes.

**Don't**: hallucinate metrics. If a number isn't in the post, say so
and suggest "TODO: REPLACE" rather than inventing.

---

## Frontend UI / UX

**Use when** working on layout, hierarchy, responsive issues, interaction
design, or component consistency.

**Brief template**:

> Open the home page in 320px, 768px, and 1440px viewports and audit:
> visual hierarchy, spacing rhythm, hit targets, focus order, motion
> respect for `prefers-reduced-motion`, and any element that breaks
> the dark editorial aesthetic.

---

## Branding

**Use when** something feels off-tone. Reviewing colour use, font
weights, brand voice consistency, logo treatment.

**Owns**: `:root` custom properties, `--accent` usage rules, font-display
hierarchy, brand vs functional colour separation.

---

## Content & Copywriting

**Use when** prose needs improvement — generic phrasing, missing impact
metrics, weak headlines.

**Rules**:
- British English.
- No invented facts.
- Specific > vague — replace "various dashboards" with names, replace
  "improved performance" with the actual figure.
- Replace TODO markers with real content where evidence exists; leave
  TODOs flagged where it doesn't.

---

## SEO

**Use when** working on `_includes/head.html`, sitemap, robots, structured
data, page titles, OG images.

**Don't keyword-stuff.** Sites that read naturally rank well; sites that
read like SEO spam don't.

---

## Accessibility

**Use when** auditing keyboard navigation, screen-reader output, contrast,
focus management, semantic HTML.

**Tooling we don't have in-process**: axe-core, Lighthouse, real screen
readers. Document findings in `docs/accessibility-review.md` for an
out-of-process audit.

---

## Performance

**Use when** the site feels heavy or after adding new assets.

Quick wins to check: are new images going through `<picture>`? Are large
PNGs that should be JPGs / WebPs? Is JS doing layout work in a scroll
handler without rAF batching?

Document findings in `docs/performance-review.md`.

---

## QA & Testing

**Use after every substantive change**:

```bash
LANG=C.utf8 bundle exec jekyll build && node scripts/link-check.js
```

Document new test scripts in `docs/qa-checklist.md`.

---

## Integration Research

**Use when** considering whether to add an MCP, API, plugin, or external
service.

**Default**: don't add it. Each integration is a long-tail support cost.

Document each evaluation in `docs/integrations-and-mcps.md` with a
verdict: "Add now", "Add later", or "Not worth it".
