# CLAUDE.md

Guidance for future Claude sessions working on this repository.

## Project

`paulmcneill.github.io` — Paul Martin McNeill's personal portfolio. Jekyll site,
served by GitHub Pages at https://paulmartinmcneill.com.

## Goals

The site exists to **convert visitors** — recruiters, prospective clients,
postgraduate admissions tutors, collaborators — into a meaningful next step
(email, LinkedIn connection, GitHub follow, CV download). It is not a blog,
not a CMS, and not a playground for animation libraries. Treat every change
through that lens: does it make a credible reader more likely to act?

## Audiences (in priority order)

1. **Hiring managers** for AI / ML engineering and full-stack roles.
2. **Prospective clients** for freelance or short-term consultancy.
3. **Postgraduate admissions** (M816 Data Management is in progress; further
   study is plausible).
4. **Peer collaborators** in AI/ML, healthcare tech, accessibility, NHS
   transformation work.

## Stack

- Jekyll **3.10** (pinned by the `github-pages ~> 232` gem).
- Pure CSS (custom properties, grid, `clamp()`, no Tailwind, no PostCSS).
- Vanilla ES2017+ JavaScript (no frameworks, no build step for JS).
- Liquid templating only.
- No JavaScript framework. No bundler. No SSR — Jekyll outputs static HTML.

## Folder structure

```
_config.yml             site config + profile
_data/
  projects.yml          homepage bento grid source of truth
  credentials.yml       certifications + memberships
  testimonials.yml      placeholder until verified
  principles.yml        How I Work cards
  skills.yml            tier-based skills (no % bars)
_includes/
  head.html             SEO, OG, JSON-LD, fonts, favicons
  nav.html              fixed nav with availability pill
  hero.html             full-vh hero
  marquee.html          icon + text scrolling band
  expertise.html        3 capability cards
  projects.html         12-col bento, driven by _data/projects.yml
  ai-ml.html            numbered AI/ML showcase
  skills.html           skill tiers
  principles.html       How I Work
  about.html            photo + text
  github-activity.html  ghchart.rshah.org embed
  credentials.html      cert/membership badges
  writing.html          blog strip (filters posts where type==blog)
  testimonials.html     social proof (placeholders flagged)
  videos.html           YouTube lite-embed strip
  contact.html          social/email pill links
  footer.html
  picture.html          <picture> partial (WebP source + fallback)
  icon.html             inline SVG with class injection
  architecture/         per-project SVG diagrams (currently aurora.html)
  icons/ui/             Lucide + brand SVGs
  icons/tech/           Devicon + Simple Icons
_layouts/
  default.html          home
  post.html             rich case study (impact, shields, gallery, lightbox)
  blank.html            CV + 404
assets/
  css/main.css          single stylesheet
  js/main.js            single bundle
  icons/                duplicate of _includes/icons (for direct img refs)
  textures/             noise.png + dot-grid.svg
  img/                  og-image.png, og-image-project.png
  favicon/              favicon set + site.webmanifest
img/
  about/                photos
  certs/                cert badges
  portfolio/            project hero + gallery folders (aurora/, aac-ai/, pscs/)
cv/index.html           CV page (uses blank layout)
404.html
scripts/
  optimize-images.js    generate .webp + thumb.webp siblings via sharp
  generate-assets.js    noise, dot-grid, OG images, favicon set
  link-check.js         post-build internal-link audit
docs/                   docs (this file's siblings)
```

## Development commands

```bash
# Local dev (Pages-equivalent toolchain)
bundle install
LANG=C.utf8 bundle exec jekyll serve --livereload
# or, if jekyll isn't on PATH:
LANG=C.utf8 vendor/bundle/ruby/3.3.0/bin/jekyll serve --livereload

# One-shot build
LANG=C.utf8 bundle exec jekyll build

# Image optimisation (run after adding new images to img/)
npm install
npm run optimize:images        # generates .webp + -thumb.webp siblings

# Visual asset regeneration (favicons, OG images, noise, dot grid)
node scripts/generate-assets.js

# Link / image existence check (after a build)
node scripts/link-check.js
```

The `LANG=C.utf8` prefix is needed locally because Jekyll 3.10's
sass-converter trips on UTF-8 source on a US-ASCII Ruby. GitHub Pages
runs with UTF-8 by default — no env needed there.

## Styling conventions

- One stylesheet, hand-written, in `assets/css/main.css`. No SCSS, no Tailwind.
- All colours, fonts, spacing, easing live in `:root` custom properties.
- Sections use BEM-ish naming: `.proj-card`, `.proj-card__media`, etc.
- Mobile-first where it makes sense. Breakpoints at **600px**, **768px**, **900px**.
- Container max-width is **1280px** via `--max-w`.
- Easing curves: `--ease-out` for surfaces, `--ease-spring` for buttons.
- Reduced-motion: every keyframe / transition that's not essential is
  cancelled inside the `@media (prefers-reduced-motion: reduce)` block.
  When adding motion, add a fallback there.

## Asset rules

- **Never** ship a raw image without running `npm run optimize:images` first.
  WebP siblings are what `<picture>` actually serves; originals are fallback.
- Refer to images via `{% include picture.html src=... %}` whenever possible.
- Tech / brand logos: bundle locally in `_includes/icons/tech/` (and copy to
  `assets/icons/tech/`) — never hot-link from a CDN at runtime.
- Reference UI icons via `{% include icon.html name="x" %}`. Don't paste raw
  SVG into templates unless it has bespoke geometry (architecture diagrams).
- **Never** introduce stock images of people, dashboards, or "AI". Use real
  screenshots of your work or styled placeholder gradients.

## SEO rules

- `_includes/head.html` already emits canonical, OG, Twitter Card, and
  JSON-LD (Person on home, Article on case studies). Don't duplicate.
- Page title is `{page.title} — Paul McNeill` for sub-pages, full slogan
  on home.
- OG image defaults: `/assets/img/og-image.png` for non-posts,
  `/assets/img/og-image-project.png` for posts. Override per-page with
  `og_image:` frontmatter.
- Don't keyword-stuff. The brief is to support natural searches for
  "Paul Martin McNeill", "AI engineer Northern Ireland", and similar.

## Accessibility rules

- Skip-link is the first focusable element on home and post layouts.
  Don't break it.
- Mobile menu must trap focus (already implemented in `main.js`).
- Lightbox must restore focus on close (already implemented).
- `:focus-visible` outline is non-negotiable. Don't override with
  `outline: none` without providing a replacement.
- All decorative SVGs need `aria-hidden="true"`. The `icon.html` partial
  injects this automatically.
- Colour contrast minimum: 4.5:1 for body text. The `--text-faint`
  (#6b6b73) on bg is borderline at small sizes — only use it for mono
  micro-labels.

## Performance rules

- One CSS file, one JS file, no third-party scripts at runtime.
- All images go through `<picture>` with WebP source.
- Below-fold media uses `loading="lazy"` and `decoding="async"`.
- Above-fold media uses `loading="eager"` and `fetchpriority="high"`
  (currently only the post hero).
- Don't add a service worker — silent stale-cache bugs aren't worth it
  on a content-light site.

## Content rules

- **No invented facts.** All metrics, dates, employers, certifications,
  membership statuses must trace to repo evidence (CV page, post
  bodies, _data files) or a verified source. If a number is uncertain,
  tag it `# TODO: REPLACE` (data files) or `<!-- TODO: REPLACE -->`
  (HTML).
- Avoid generic copy ("passionate developer", "innovative solutions").
- Specific > vague. Replace "many years" with the actual number.
  Replace "various dashboards" with named projects.
- Prose voice: confident, direct, technical-but-readable. British
  English (Paul is in NI). "ise" not "ize".

## Git workflow

- `main` is what GitHub Pages serves. Treat it as production.
- Use feature branches for substantial work (`feature/...`,
  `claude/...`). Merge via fast-forward when the branch is small and
  reviewed; squash for noisy histories.
- Don't commit `_site/`, `vendor/`, `node_modules/`, `package-lock.json`,
  or generated `Gemfile.lock` to feature branches without reason.
- Commit messages: imperative subject, body explains WHY (not WHAT).

## Testing

- `node scripts/link-check.js` after every build is the lowest-bar QA.
- See `docs/qa-checklist.md` for the full pre-publish checklist.
- No JS test runner. The codebase is small enough that human review +
  link check is the bar.

## Deployment

GitHub Pages auto-builds from `main` on push. There's no Action, no
preview environments, no staging. If the build breaks, the site
silently keeps serving the last successful build — check the
"Pages" tab in the repo for build errors.

## Known issues / live TODOs

See `docs/content-gaps.md` for content TODOs and
`docs/portfolio-roadmap.md` for prioritised next steps.

Highlights:

- **Pretty URLs include spaces** (`/cloud computing/...`,
  `/software development/...`) because old post `category:` values
  are multi-word title-case. Browser-tolerant but ugly. Roadmap item.
- **Three placeholder testimonials** are visible — flagged with the
  "Placeholder" pill until `verified: true`.
- **Two placeholder blog posts** with `type: blog` and `TODO: REPLACE`
  body markers.
- **Impact metrics on three projects** (Aurora, AAC, CRM-Industrial)
  are illustrative — flagged in frontmatter with `# TODO: REPLACE`.

## Agents / skills

See `docs/agents.md`. The repo doesn't ship Claude agent definitions
as files — that doc describes the personas and when to invoke each.

## Future roadmap (compressed)

See `docs/portfolio-roadmap.md` for the full version.

- Replace placeholder content with verified copy
- Add 2 more architecture diagrams (AAC, Healthcare HCMS)
- Migrate post `category:` values to kebab-case to remove URL spaces
- Trim ~8 MB of unused legacy images (audit list in
  `docs/missing-assets.md`)
- Optional GitHub Actions: link-check on every PR, Lighthouse CI
