
const CACHE_NAME = 'pwa-feria-ventas-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx', // Vite se encarga de empaquetar esto en el build, pero lo incluimos por robustez.
  '/App.tsx',
  '/components/AdminDashboard.tsx',
  '/components/AdminSetupForm.tsx',
  '/components/AdminSummary.tsx',
  '/components/LoginForm.tsx',
  '/components/SellerPad.tsx',
  '/contexts/AuthContext.tsx',
  '/contexts/FeriaContext.tsx',
  '/services/localStorageService.ts',
  '/constants.ts',
  '/types.ts',
  'https://cdn.tailwindcss.com', // Tailwind CDN
  // URLs de los sonidos
  'https://www.soundjay.com/misc/sounds/bell-ring-01.mp3',
  'https://www.soundjay.com/misc/sounds/cash-register-01.mp3',
  // Añade aquí rutas a tus iconos si están en /icons/
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request. It's a stream so it can only be consumed once.
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response. It's a stream so it can only be consumed once.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});
    