// Novario Service Worker — PWA + Pure Web Push (no Firebase/FCM) ❤️
const CACHE_NAME = 'novario-v17';

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
  console.log('[SW] Push Received');
  
  event.waitUntil((async () => {
    let data = {
      title: '📰 Novario',
      body: '🔴 New Message — Open Chat to read',
      icon: '/favicon.png',
      badge: '/favicon.png',
      url: '/news',
    };

    if (event.data) {
      try {
        const parsed = event.data.json();
        if (parsed) data = { ...data, ...parsed };
      } catch (e) {
        const text = event.data.text();
        if (text) data.body = text;
      }
    }

    const origin = self.location.origin;
    const fullUrl = data.url.startsWith('http') ? data.url : origin + data.url;

    await self.registration.showNotification(data.title, {
      body: data.body,
      icon: origin + '/favicon.png',
      badge: origin + '/favicon.png',
      tag: 'novario-msg',
      renotify: true,
      vibrate: [200, 100, 200, 100, 200],
      requireInteraction: true, // Keep on screen on PC
      silent: false,
      actions: [
        { action: 'open', title: '📖 Read Now' }
      ],
      data: { url: fullUrl },
    });
  })());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || self.location.origin + '/news';

  // Handle specific actions if they were clicked
  if (event.action === 'open') {
    // Already handling below by opening the url
  }
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
