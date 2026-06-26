const CACHE_NAME = "navjeevan-cache-v1";
const OFFLINE_URL = "/offline.html";

const ASSETS_TO_CACHE = [
  "/",
  "/offline.html",
  "/manifest.json",
  "/favicon.ico",
  "/navjeevanLogo.jpeg",
];

// Install Event - cache core shell assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching app shell assets");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event - clear old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Clearing old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - network-first with cache fallback
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // Skip non-GET requests (like POST submissions) and cross-origin chrome extensions, etc.
  if (event.request.method !== "GET") {
    return;
  }

  // Handle local navigation or API requests (Network First, Cache Fallback)
  if (requestUrl.origin === self.location.origin) {
    // If it's a static file (e.g. JS, CSS, images under _next/static or public), use Cache First
    if (
      requestUrl.pathname.startsWith("/_next/") ||
      requestUrl.pathname.endsWith(".js") ||
      requestUrl.pathname.endsWith(".css") ||
      requestUrl.pathname.endsWith(".jpg") ||
      requestUrl.pathname.endsWith(".jpeg") ||
      requestUrl.pathname.endsWith(".png") ||
      requestUrl.pathname.endsWith(".svg") ||
      requestUrl.pathname.endsWith(".webp") ||
      requestUrl.pathname.endsWith(".woff2")
    ) {
      event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request).then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return networkResponse;
          });
        })
      );
    } else {
      // For pages and APIs, do Network First, then fallback to Cache, then fallback to offline.html
      event.respondWith(
        fetch(event.request)
          .then((networkResponse) => {
            // Cache the newly fetched page
            if (networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            return caches.match(event.request).then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // If it's a page navigation request, return offline fallback page
              if (event.request.mode === "navigate") {
                return caches.match(OFFLINE_URL);
              }
              return new Response(JSON.stringify({ success: false, error: "Offline" }), {
                headers: { "Content-Type": "application/json" }
              });
            });
          })
      );
    }
  }
});
