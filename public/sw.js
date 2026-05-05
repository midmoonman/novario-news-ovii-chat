// Novario Service Worker — minimal, required for PWA install prompt
const CACHE_NAME = 'novario-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Network-first strategy — always serve fresh content
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
