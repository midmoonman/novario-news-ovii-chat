// Novario Service Worker — PWA + Pure Web Push (no Firebase/FCM)
const CACHE_NAME = 'novario-v11';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

self.addEventListener('push', (event) => {
  console.log('[SW] Push Received:', event.data?.text());
  let data = {
    title: '📰 Novario',
    body: '🔴 Breaking Now — Live Coverage on Novario',
    icon: '/favicon.png',
    badge: '/favicon.png',
    url: '/news',
  };

  if (event.data) {
    try {
      const parsed = event.data.json();
      data = { ...data, ...parsed };
    } catch {
      data.body = event.data.text() || data.body;
    }
  }

  const origin = self.location.origin;

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: origin + '/favicon.png',
      badge: origin + '/favicon.png',
      renotify: true,
      vibrate: [200, 100, 200],
      requireInteraction: false,
      silent: false,
      data: { url: origin + '/news' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || self.location.origin + '/news';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
