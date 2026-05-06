# Accessibility review

**Tooling caveat**: this review was done by reading source. axe-core,
Lighthouse, and a real screen reader haven't been run against the live
site from this environment. Any item below tagged `[needs verification]`
should be re-checked with real tooling before publishing claims about
WCAG compliance.

## What's already in place

- **Skip link** as the first focusable element on home and post layouts
  (`_layouts/default.html`, `_layouts/post.html`).
- **Mobile menu**: focus trap, Escape-to-close, restores prior focus on
  close. Implemented in `assets/js/main.js`.
- **Lightbox**: dialog semantics, focus restore on close, Escape-to-close.
- **Active section highlighting** in nav with `aria-current="true"` on
  the live link.
- **`:focus-visible` outlines** on all interactive elements via the
  global `:focus-visible` rule in `main.css`.
- **`prefers-reduced-motion`** branch in `main.css` cancels the marquee,
  fadeUp animations, and the noise overlay. JS animations
  (count-up, smooth-scroll) check `matchMedia` and skip when reduced.
- **Decorative SVGs** carry `aria-hidden="true"` via the `_includes/icon.html`
  partial.
- **Alt text** on all `<img>` elements is required by `_includes/picture.html`
  (the partial fails-loud with empty string rather than no attribute).
- **Semantic landmarks**: `<main id="main">`, `<nav>`, `<article>`,
  `<footer>` are used correctly.
- **Heading order**: home is `h1` (hero) → multiple `h2` per section →
  `h3` for cards. No skipped levels in `_includes/`.

## Items to verify with real tooling

- **Colour contrast** `[needs verification]`. Body text (`#ededee` on
  `#0a0a0b`) is fine — far above 4.5:1. The borderline is
  `--text-faint` (`#6b6b73`) on `#0a0a0b`, used for mono micro-labels
  (~11–12px). It calculates around 5.0:1 (AA passes) but only just;
  any reduction in the colour value would fail. Spot-check on the
  live site.
- **Reading order** under `prefers-reduced-motion` `[needs verification]`.
  The reveal animation hides elements until they enter the viewport;
  a screen reader should still encounter them. A quick VoiceOver / NVDA
  pass is worth doing.
- **Keyboard reachability of the lightbox close** `[needs verification]`.
  Implemented via the `lightbox__close` button which receives focus
  on open — but the button isn't part of the natural tab flow if
  focus somehow escapes. Worth verifying with Tab from inside.
- **Form controls**: there are no forms on the site (the contact
  section uses `mailto:` links). No labels to audit.

## Known compromises (deliberate)

- **The decorative noise overlay** (`body::after`) sits at z-index 9999
  with `pointer-events: none`. Screen readers ignore it. Sighted users
  with `prefers-reduced-motion` see it removed.
- **`<picture>` elements** don't take a figure caption. Captions live
  in surrounding HTML for the gallery and project hero.
- **Colour is not the only signal** for active nav links — they also
  get an underline, which doubles as the affordance for monochrome
  monitors and failing colour vision.

## Items not addressed

- **Reading-level / cognitive load** — not assessed. Copy aims at a
  technically literate audience.
- **Languages other than English** — `<html lang="en">` is set. No
  i18n is planned.
- **Live-region announcements** for the count-up stat animation —
  intentionally not announced. The eased numeric tween isn't
  meaningful content; the final value is the data.

## Manual checklist for future PRs

When adding new components, walk this list before merging:

- [ ] Tab order is sensible (no `tabindex` other than `-1` and `0`).
- [ ] Every interactive element has a visible focus state.
- [ ] Every icon-only button / link has an `aria-label`.
- [ ] Every `<img>` has alt text (or `alt=""` if purely decorative).
- [ ] Headings increment by one level (no `h2` → `h4`).
- [ ] No `outline: none` without a replacement focus state.
- [ ] Animations check `prefers-reduced-motion`.
- [ ] Colour contrast is at or above 4.5:1 for body, 3:1 for large
      text and UI components.

## How to run a real audit later

```bash
# axe via Playwright
npm i -D @playwright/test @axe-core/playwright
# write a tiny spec that visits "/" and "/cv/" and a sample post,
# runs axe.analyze(), asserts violations.length === 0.

# Lighthouse via CLI
npx -y lighthouse https://paulmartinmcneill.com \
  --only-categories=accessibility,performance,best-practices,seo \
  --output=json --output-path=./lighthouse.json --chrome-flags="--headless"
```

When run, capture results in `docs/accessibility-review.md` (this file)
and `docs/performance-review.md` so future audits compare against a
baseline.
