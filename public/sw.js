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

  // Ensure absolute URLs for mobile system UI compatibility
  const origin = self.location.origin;
  
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon.startsWith('http') ? data.icon : origin + data.icon,
      badge: data.badge.startsWith('http') ? data.badge : origin + data.badge,
      tag: data.tag + '-' + Date.now(), // Force unique tag to bypass collapse
      renotify: true,
      vibrate: [200, 100, 200],
      requireInteraction: true, // Keep it on screen until seen
      silent: false,
      data: { url: data.url.startsWith('http') ? data.url : origin + data.url },
    }).catch(err => console.error('[SW] Notification Error:', err))
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
