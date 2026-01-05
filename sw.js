
const CACHE_NAME = 'estateearn-cache-v1';
const urlsToCache = [
  '/',
  '/dashboard.html',
  '/plans.html',
  '/referral.html',
  '/settings.html',
  '/investments.html',
  '/manifest.json',
  '/owner.png',
  '/plan2.png',
  '/plan3.png',
  '/plan4.png',
  // Add other CSS/JS files here
];

// Install Service Worker & cache files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
        .then(() => self.skipWaiting())
    );
});

// Activate Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.map(key => {
                if(key !== CACHE_NAME) return caches.delete(key);
            }));
        })
    );
    return self.clients.claim();
});

// Fetch request: Serve cached files if offline
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
