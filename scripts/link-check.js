#!/usr/bin/env node
/**
 * Static QA: scan _site/ for broken internal links and missing image refs.
 * Run after `bundle exec jekyll build`. Exits non-zero on issues so it can
 * be wired into CI.
 */
const fs = require('fs');
const path = require('path');

const SITE = path.resolve(__dirname, '..', '_site');
if (!fs.existsSync(SITE)) {
  console.error('No _site/ — run a Jekyll build first.');
  process.exit(2);
}

function* walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const s = fs.statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else if (name.endsWith('.html')) yield p;
  }
}

const HREF = /(?:href|src|data-src|content)=["']([^"']+)["']/g;
const SOURCE_SRCSET = /srcset=["']([^"']+)["']/g;

const issues = { brokenInternal: [], brokenSrcset: [] };
const seen = new Map();

const exists = (p) => {
  if (seen.has(p)) return seen.get(p);
  let ok = false;
  try { ok = fs.existsSync(p); } catch {}
  seen.set(p, ok);
  return ok;
};

const isInternal = (u) => {
  if (!u) return false;
  if (u.startsWith('//') || u.startsWith('http://') || u.startsWith('https://')) return false;
  if (u.startsWith('mailto:') || u.startsWith('tel:') || u.startsWith('data:') || u.startsWith('javascript:')) return false;
  if (u.startsWith('#')) return false;
  return true;
};

const resolve = (urlPath) => {
  let u = urlPath.split('#')[0].split('?')[0];
  if (!u.startsWith('/')) return null;
  try { u = decodeURI(u); } catch {}
  let target = path.join(SITE, u);
  if (u.endsWith('/')) target = path.join(target, 'index.html');
  return target;
};

for (const file of walk(SITE)) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(SITE, file);
  let m;
  while ((m = HREF.exec(html)) !== null) {
    const u = m[1];
    if (!isInternal(u)) continue;
    const target = resolve(u);
    if (!target) continue;
    if (!exists(target)) issues.brokenInternal.push(`${rel}: ${u}`);
  }
  while ((m = SOURCE_SRCSET.exec(html)) !== null) {
    const set = m[1];
    for (const item of set.split(',')) {
      const u = item.trim().split(/\s+/)[0];
      if (!isInternal(u)) continue;
      const target = resolve(u);
      if (!target) continue;
      if (!exists(target)) issues.brokenSrcset.push(`${rel}: ${u}`);
    }
  }
}

const total = issues.brokenInternal.length + issues.brokenSrcset.length;
if (total === 0) {
  console.log('✓ link-check clean (0 broken internal references)');
  process.exit(0);
}
console.error(`✗ ${total} broken references`);
if (issues.brokenInternal.length) {
  console.error('\n[broken hrefs/srcs]');
  for (const x of issues.brokenInternal) console.error('  ' + x);
}
if (issues.brokenSrcset.length) {
  console.error('\n[broken srcset entries]');
  for (const x of issues.brokenSrcset) console.error('  ' + x);
}
process.exit(1);
