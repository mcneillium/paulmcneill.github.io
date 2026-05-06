# Missing & unused assets

## Status: nothing visibly broken

Every image referenced by a template, post frontmatter, data file, or
include resolves cleanly. `node scripts/link-check.js` against `_site/`
returns zero broken references. All six certification badges are
present in `img/certs/`. Both about photos are present in `img/about/`.

The asset audit findings below are about **cleanup** and **upgrades**,
not breakage.

---

## Unused legacy assets (~8.5 MB)

These predate the redesign and are no longer referenced anywhere.
Listed for sign-off — **do not delete without confirmation**.

| Path                                              | Size  | Notes                                  |
|---------------------------------------------------|-------|----------------------------------------|
| `img/header-bg.jpg`                               | 1.4 MB| Old hero bg; current hero is CSS-only |
| `img/map-image.png`                               | 364 KB| Stock world map; nothing references it |
| `img/data_analytics_svg/powerquery.png`           | small | Power Query screenshot, no callers     |
| `img/team/{1,2,3}.jpg`                            | 44 KB | Stock team photos from old template    |
| `img/logos/{aetuts,creative-market,designmodo,…}.jpg` | 32 KB | Old "as seen on" logos               |
| `img/portfolio/ai-assistant-thumbnail.jpg`        | 2.9 MB| Duplicate (`.png` is the active one)   |
| `img/portfolio/indevelopment.jpg`                 | small | Duplicate of `.png`                    |
| `img/portfolio/jshair-thumbnail.png`              | 565 KB| Old client                             |
| `img/portfolio/paramount-thumbnail.png`           | 14 KB | Old client                             |
| `img/portfolio/platinum-thumbnail.png`            | 46 KB | Old client                             |
| `img/portfolio/rathlin360-thumbnail.png`          | 530 KB| Old volunteer site (referenced in CV)  |
| `img/portfolio/roundicons{,-thumbnail}.png`       | 196 KB| Stock                                  |
| `img/portfolio/zingdp-thumbnail.png`              | 917 KB| Old client                             |
| `img/portfolio/industrial-temps-thumbnail.png`    | 1.2 MB| Duplicate (`industrial-temps-crm.png` is active) |

To remove (after sign-off):

```bash
git rm img/header-bg.jpg img/map-image.png \
  img/data_analytics_svg/powerquery.png \
  img/team/*.jpg img/logos/*.jpg \
  img/portfolio/ai-assistant-thumbnail.jpg \
  img/portfolio/indevelopment.jpg \
  img/portfolio/jshair-thumbnail.png img/portfolio/paramount-thumbnail.png \
  img/portfolio/platinum-thumbnail.png img/portfolio/rathlin360-thumbnail.png \
  img/portfolio/roundicons.png img/portfolio/roundicons-thumbnail.png \
  img/portfolio/zingdp-thumbnail.png \
  img/portfolio/industrial-temps-thumbnail.png

# also remove their generated webp/-thumb.webp siblings
git rm img/header-bg.webp img/header-bg-thumb.webp \
  # ...etc per file
```

---

## Asset upgrades worth doing

| What | Where | Why |
|------|-------|-----|
| Replace placeholder OG cover with one rendered using real Instrument Serif | `assets/img/og-image.png` | Currently uses a system-serif fallback because sharp can't subset Google Fonts mid-pipeline. Render once locally with a real `.ttf` and commit the PNG. |
| Architecture SVGs for AAC and Healthcare HCMS | `_includes/architecture/{aac-ai,healthcare}.html` | Aurora has one. Two more would round out the case studies. |
| Real `apple-touch-icon` rendered from a hand-tuned source | `assets/favicon/apple-touch-icon.png` | Currently auto-derived from `img/favicon.svg`. Acceptable, not great. |

---

## Things that **do not** need fixing

The previous brief mentioned "a lot of logos missing". After the audit
this isn't the case — all referenced logos resolve. If something looks
missing in a browser, it's likely:

- Browser cache holding an old build (hard refresh).
- GitHub Pages still rebuilding from the latest push.
- An ad-blocker / privacy extension blocking `img.shields.io`,
  `i.ytimg.com`, `ghchart.rshah.org`, or `cdn.jsdelivr.net` — not a
  source-of-truth issue.

If a specific page genuinely shows a broken image after a fresh load,
report the URL + element and the audit can be re-run against that
specific component.

---

## Asset rules going forward

- Run `npm run optimize:images` after adding any image to `img/`.
- Reference images via `{% include picture.html src="..." %}` to get
  the WebP source automatically.
- For tech logos: bundle a local SVG into `_includes/icons/tech/`
  rather than hot-linking from a CDN.
- For dashboard screenshots: prefer real screenshots over mockups, and
  store them inside the project's gallery folder
  (`img/portfolio/<project>/`) so the case study auto-detects them.
