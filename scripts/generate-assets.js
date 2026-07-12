/* eslint-disable no-console */
/**
 * Generate static visual assets for the portfolio:
 *   - assets/textures/noise.png         (200x200, gaussian-like)
 *   - assets/textures/dot-grid.svg      (subtle dot grid)
 *   - assets/img/og-image.png           (1200x630 social card)
 *   - assets/img/og-image-project.png   (project variant)
 *   - assets/favicon/{16,32}x{16,32}.png, apple-touch-icon, android-chrome-{192,512}.png, site.webmanifest
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const out = (...p) => path.join(ROOT, ...p);
const ensureDir = (p) => fs.mkdirSync(path.dirname(p), { recursive: true });

(async () => {
  // ----- Noise texture (200x200) ----------------------------------
  {
    const size = 200;
    const buf = Buffer.alloc(size * size * 4);
    for (let i = 0; i < size * size; i++) {
      // Gaussian-ish via Box-Muller
      const u1 = Math.random() || 1e-9;
      const u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      const v = Math.max(0, Math.min(255, 128 + z * 60));
      buf[i * 4]     = v;
      buf[i * 4 + 1] = v;
      buf[i * 4 + 2] = v;
      buf[i * 4 + 3] = 255;
    }
    const file = out('assets/textures/noise.png');
    ensureDir(file);
    await sharp(buf, { raw: { width: size, height: size, channels: 4 } })
      .png({ compressionLevel: 9 })
      .toFile(file);
    console.log('wrote', path.relative(ROOT, file));
  }

  // ----- Dot grid SVG ---------------------------------------------
  {
    const dotSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
  <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.06)"/>
</svg>`;
    const file = out('assets/textures/dot-grid.svg');
    ensureDir(file);
    fs.writeFileSync(file, dotSvg);
    console.log('wrote', path.relative(ROOT, file));
  }

  // ----- OG images -------------------------------------------------
  const ogSvg = (label) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g1" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#f97316" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#f97316" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="10%" cy="90%" r="55%">
      <stop offset="0%" stop-color="#785aff" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#785aff" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#0a0a0b"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <g font-family="'Instrument Serif', 'Times New Roman', serif" fill="#ededee">
    <text x="80" y="180" font-size="36" fill="#f97316" font-family="'JetBrains Mono', monospace" letter-spacing="3">${label}</text>
    <text x="80" y="320" font-size="120" letter-spacing="-3">Paul Martin McNeill</text>
    <text x="80" y="400" font-size="48" fill="#a8a8ad">AI Engineer · Web Developer · Data Analyst</text>
  </g>
  <g transform="translate(80,500)">
    <rect x="0" y="0" width="60" height="2" fill="#f97316"/>
    <text x="80" y="6" font-family="'JetBrains Mono', monospace" font-size="20" fill="#a8a8ad" letter-spacing="2">paulmartinmcneill.com</text>
  </g>
</svg>`;

  for (const [label, fname] of [
    ['PORTFOLIO',  'assets/img/og-image.png'],
    ['CASE STUDY', 'assets/img/og-image-project.png'],
    ['THE LAB',    'assets/img/og-image-lab.png'],
  ]) {
    const file = out(fname);
    ensureDir(file);
    await sharp(Buffer.from(ogSvg(label))).png().toFile(file);
    console.log('wrote', path.relative(ROOT, file));
  }

  // ----- Favicon set from existing img/favicon.svg -----------------
  {
    const src = out('img/favicon.svg');
    if (fs.existsSync(src)) {
      const sizes = [
        { name: 'favicon-16x16.png',         w: 16  },
        { name: 'favicon-32x32.png',         w: 32  },
        { name: 'apple-touch-icon.png',      w: 180 },
        { name: 'android-chrome-192x192.png',w: 192 },
        { name: 'android-chrome-512x512.png',w: 512 },
      ];
      const svg = fs.readFileSync(src);
      for (const s of sizes) {
        const file = out('assets/favicon', s.name);
        ensureDir(file);
        await sharp(svg).resize(s.w, s.w, { fit: 'contain', background: { r:10, g:10, b:11, alpha:0 } })
          .png({ compressionLevel: 9 })
          .toFile(file);
        console.log('wrote', path.relative(ROOT, file));
      }
      const manifest = {
        name: "Paul Martin McNeill",
        short_name: "PMcNeill",
        icons: [
          { src: "/assets/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/assets/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
        ],
        theme_color: "#0a0a0b",
        background_color: "#0a0a0b",
        display: "standalone"
      };
      const manifestFile = out('assets/favicon/site.webmanifest');
      fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2));
      console.log('wrote', path.relative(ROOT, manifestFile));
    }
  }
})().catch(e => { console.error(e); process.exit(1); });
