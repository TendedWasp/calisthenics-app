const CACHE_NAME = 'workout-store-v2';

// Add your specific repository name here
const REPO_NAME = '/calisthenics-app/'; 

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        REPO_NAME,
        REPO_NAME + 'index.html',
        REPO_NAME + 'manifest.json'
      ]);
    })
  );
});

self.addEventListener('activate', (e) => {
  // Clear old caches when we update the app
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
