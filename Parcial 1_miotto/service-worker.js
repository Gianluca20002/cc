// service-worker.js

const cacheName = 'app-cache-v1';
const precacheFiles = [
  '/',
  '/index.html',
  '/styles/styles.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        return cache.addAll(precacheFiles);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((name) => name !== cacheName)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => {
        self.clients.claim();
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});


