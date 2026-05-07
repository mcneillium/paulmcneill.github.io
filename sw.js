/* Service worker for paulmartinmcneill.com
 *
 * Strategy:
 *   - HTML  → network-first, fall back to cache (avoids stale pages
 *             after a deploy; Pages cache busts when you push).
 *   - Static assets (CSS, JS, images, fonts) → cache-first, refresh
 *             in background. Filenames are stable enough that this is safe.
 *   - Cross-origin (shields.io, ghchart, ytimg, etc.) → never touched.
 *
 * Bump CACHE_VERSION when shipping a release that requires a flush.
 */
const CACHE_VERSION = 'pmcneill-v4-20260508';

const PRECACHE = [
  '/',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/assets/js/theme.js',
  '/assets/js/accent.js',
  '/assets/js/fonts.js',
  '/assets/js/card-tilt.js',
  '/assets/textures/noise.png',
  '/assets/textures/dot-grid.svg',
  '/img/favicon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(PRECACHE).catch(() => null))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => k !== CACHE_VERSION)
        .map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function isHTML(request) {
  if (request.mode === 'navigate') return true;
  const accept = request.headers.get('accept') || '';
  return accept.includes('text/html');
}

function isSameOrigin(url) {
  return url.origin === self.location.origin;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (!isSameOrigin(url)) return; // don't touch cross-origin

  // Never cache the chatbot context — it must be fresh after a build
  if (url.pathname.startsWith('/assets/chatbot/')) return;

  if (isHTML(request)) {
    // Network-first for HTML
    event.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(request, clone)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(request).then(r => r || caches.match('/')))
    );
    return;
  }

  // Cache-first for assets
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) {
        // Refresh in background
        fetch(request).then(res => {
          if (res && res.ok) {
            caches.open(CACHE_VERSION).then(c => c.put(request, res.clone())).catch(() => {});
          }
        }).catch(() => {});
        return cached;
      }
      return fetch(request).then(res => {
        if (res && res.ok) {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(request, clone)).catch(() => {});
        }
        return res;
      });
    })
  );
});
