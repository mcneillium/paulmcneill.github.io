# docs/

Project documentation for `paulmcneill.github.io`. The starting point
is `../CLAUDE.md` for Claude sessions; everything else is reference.

| File                              | Use when |
|-----------------------------------|----------|
| `agents.md`                       | Spawning a focused subagent (Strategy, Credibility, UI/UX, etc.). |
| `content-gaps.md`                 | Finding everything still tagged `TODO: REPLACE` or `TODO: confirm`. |
| `content-inventory.md`            | Auditing every page and section by status. |
| `missing-assets.md`               | Audit of unused legacy images and asset upgrade ideas. |
| `integrations-and-mcps.md`        | Deciding whether to add a new integration / API / MCP. |
| `accessibility-review.md`         | Pre-publish accessibility checks + the manual checklist. |
| `performance-review.md`           | Structural performance assessment + how to baseline real metrics. |
| `qa-checklist.md`                 | The pre-push manual checklist + automated test commands. |
| `portfolio-roadmap.md`            | Prioritised list of next changes, immediate → long-term. |
| `research-portfolio-patterns.md`  | Patterns I borrowed from senior AI engineer portfolios and which I avoided. |

## Quick commands

```bash
# Build with the Pages-equivalent toolchain
npm run build

# Build + link check
npm run qa

# Local dev with livereload
npm run serve

# Image optimisation (after adding new images)
npm run optimize:images

# Visual asset regeneration (favicons, OG images, noise, dot grid)
npm run generate:assets
```
