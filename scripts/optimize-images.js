/* eslint-disable no-console */
/**
 * Generate optimized WebP versions next to every PNG/JPG in img/.
 * Also creates -thumb.webp at max 600w for grid/list use.
 * Originals are preserved as fallbacks.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..', 'img');
const SKIP_DIRS = new Set([]); // process all
const SUPPORTED = new Set(['.png', '.jpg', '.jpeg']);

// Bundled SVG icons must not contain <title> elements (they duplicate the
// adjacent visible label as a tooltip / screen-reader name) or @-prefixed
// tokens like @license (jekyll-mentions would mangle the rendered SVG).
const SVG_DIRS = [
  path.resolve(__dirname, '..', '_includes', 'icons'),
  path.resolve(__dirname, '..', 'assets', 'icons'),
];

function sanitizeSvgs() {
  let cleaned = 0;
  for (const dir of SVG_DIRS) {
    if (!fs.existsSync(dir)) continue;
    const svgs = [];
    (function walkSvg(d) {
      for (const name of fs.readdirSync(d)) {
        const p = path.join(d, name);
        if (fs.statSync(p).isDirectory()) walkSvg(p);
        else if (name.endsWith('.svg')) svgs.push(p);
      }
    })(dir);
    for (const file of svgs) {
      const src = fs.readFileSync(file, 'utf8');
      const out = src
        .replace(/<title>[^<]*<\/title>/g, '')
        .replace(/<!--[^>]*@[\s\S]*?-->/g, '');
      if (out !== src) {
        fs.writeFileSync(file, out);
        cleaned++;
        console.log(`sanitized ${path.relative(path.resolve(__dirname, '..'), file)}`);
      }
    }
  }
  if (cleaned) console.log(`Sanitized ${cleaned} SVG icon(s)`);
}

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const s = fs.statSync(p);
    if (s.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      walk(p, out);
    } else if (SUPPORTED.has(path.extname(name).toLowerCase())) {
      out.push(p);
    }
  }
  return out;
}

(async () => {
  sanitizeSvgs();

  const files = walk(ROOT);
  console.log(`Found ${files.length} source images under img/`);

  let savedBytes = 0;
  let skipped = 0;
  let processed = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const base = file.slice(0, -ext.length);
    const webp = base + '.webp';
    const thumb = base + '-thumb.webp';
    const origSize = fs.statSync(file).size;

    try {
      // Full-size WebP (skip if up-to-date)
      const needFull = !fs.existsSync(webp) || fs.statSync(webp).mtimeMs < fs.statSync(file).mtimeMs;
      if (needFull) {
        await sharp(file)
          .rotate()
          .webp({ quality: 80, effort: 5 })
          .toFile(webp);
      } else { skipped++; }

      // Thumbnail (max 600w)
      const needThumb = !fs.existsSync(thumb) || fs.statSync(thumb).mtimeMs < fs.statSync(file).mtimeMs;
      if (needThumb) {
        await sharp(file)
          .rotate()
          .resize({ width: 600, withoutEnlargement: true })
          .webp({ quality: 75, effort: 5 })
          .toFile(thumb);
      }

      const newSize = fs.statSync(webp).size;
      savedBytes += Math.max(0, origSize - newSize);
      processed++;
    } catch (e) {
      console.error(`FAIL ${file}: ${e.message}`);
    }
  }

  console.log(`Processed ${processed} images, ${skipped} unchanged.`);
  console.log(`Approx. WebP savings vs originals: ${(savedBytes / 1024 / 1024).toFixed(1)} MB`);
})();
