# QA checklist

The site is small enough that automated test infrastructure isn't worth
the maintenance overhead. This is the manual checklist before publishing
substantive changes.

## Run before any push to `main`

```bash
# 1. Build with the Pages-equivalent toolchain
LANG=C.utf8 bundle exec jekyll build

# 2. Internal-link audit
node scripts/link-check.js

# 3. Verify the home page renders the new content
grep -c "your-new-class" _site/index.html
```

The build should complete with no Liquid exceptions. The link check
must report `✓ link-check clean`. Both are required.

## Manual smoke test (5 minutes)

Open the live site (or `_site/index.html` via a local server) and
walk this list:

### Home page

- [ ] Hero loads: title visible, CTAs work, stats animate count-up.
- [ ] Marquee scrolls smoothly with tech icons.
- [ ] Project cards: hover effects work, click goes to the case study.
- [ ] Impact ribbons show on cards that have `impact:` set.
- [ ] AI/ML showcase: numbered cards (01–04) render with tags.
- [ ] Skills tiers: chips show with icons.
- [ ] Principles: 4 numbered cards.
- [ ] About: photo, hover crossfade fires, text readable.
- [ ] GitHub contribution chart: loads when section scrolls into view.
- [ ] Credentials: 6 cert badges visible (3-col desktop, scroll on mobile).
- [ ] Writing strip: shows 2 placeholder posts (or hides if removed).
- [ ] Testimonials: 3 cards with "Placeholder" pill.
- [ ] Contact: 5 social pill links work.
- [ ] Footer: copyright + 3 links.
- [ ] Back-to-top button: appears after 600px scroll, returns to top.

### A case study page (e.g. Aurora)

- [ ] Hero meta: client / date / category.
- [ ] Impact banner shows under the meta.
- [ ] GitHub button + shields strip render.
- [ ] Architecture SVG renders (Aurora only currently).
- [ ] Cover image loads with `eager` priority.
- [ ] Body prose: max-width respected, heading hierarchy clean.
- [ ] Gallery: clicks open the lightbox, Escape closes, focus
      restores correctly.
- [ ] Prev/next navigation at the bottom.

### CV page (`/cv/`)

- [ ] Dark theme matches site.
- [ ] Print preview (Cmd+P / Ctrl+P): switches to clean light theme.
- [ ] Back-to-portfolio link works.

### 404 page (`/404.html`)

- [ ] Dark theme matches site.
- [ ] Back-to-home button works.

### Mobile (320px viewport)

- [ ] Nav becomes hamburger.
- [ ] Hamburger opens full-screen menu, traps focus, closes on link
      click and Escape.
- [ ] No horizontal scroll on any section.
- [ ] Marquee still readable (icons visible, not cut off).
- [ ] Skills tiers stack to one column.
- [ ] Credentials become horizontal scroll-snap row.

### Keyboard only

- [ ] Tab from the address bar reveals the skip link first.
- [ ] Skip link jumps to `#main`.
- [ ] Every link/button reachable.
- [ ] Visible focus state on every interactive element.

### Reduced motion

- [ ] Set `prefers-reduced-motion: reduce` in browser dev tools.
- [ ] Marquee stops animating.
- [ ] Reveal elements appear immediately (no fade-up).
- [ ] Noise overlay disappears.
- [ ] Count-up doesn't fire (numeric values shown statically).

## Build warnings to never ignore

- Liquid syntax errors (build fails).
- Missing include errors (build fails).
- Encoding errors during Sass conversion (Jekyll 3.10 + UTF-8 source —
  fix locally with `LANG=C.utf8`, no fix needed for Pages).

## When something breaks

1. Check the most recent commit's diff.
2. Run `node scripts/link-check.js` — if it fails, a recent change
   referenced an asset that doesn't exist.
3. Check the GitHub Pages "Build and deployment" tab in the repo for
   build logs.
4. Hard refresh in the browser (Pages caches aggressively).
