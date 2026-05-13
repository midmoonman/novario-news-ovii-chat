// Novario Service Worker — PWA + Pure Web Push (no Firebase/FCM)
const CACHE_NAME = 'novario-v8';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// ── This fires even when browser/PWA is fully closed ─────────────────────────
self.addEventListener('push', (event) => {
  console.log('[SW] Push Received:', event.data?.text());
  let data = {
    title: '📰 Novario',
    body: '🔴 Breaking Now — Live Coverage on Novario',
    icon: '/favicon.png',
    badge: '/favicon.png',
    url: '/news',
    tag: 'novario-news',
    renotify: true,
  };

  if (event.data) {
    try {
      const parsed = event.data.json();
      data = { ...data, ...parsed };
    } catch {
      data.body = event.data.text() || data.body;
    }
  }

  // Always show notification to ensure delivery reliability on mobile.
  // The 'tag' system handles deduplication if the app is already open.
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: data.badge,
      tag: data.tag,
      renotify: data.renotify,
      vibrate: [200, 100, 200, 100, 200],
      requireInteraction: false,
      silent: false,
      data: { url: data.url },
    })
  );
});

// ── Tapping the notification opens /news ─────────────────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/news';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      // If app is already open somewhere, focus it
      for (const client of list) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      // Otherwise open a new window
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
