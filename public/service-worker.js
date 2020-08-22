var CACHE_NAME = 'cache-v1';

var urlsToCache = [
  "/",
  "/styles.css",
  "/index.js",
  "/index.html",
  "/favicon.ico",
  "/db.js",
  "/assets/images/icons/favicon-16x16.png",
  "/assets/images/icons/favicon-32x32.png",
  "/assets/images/icons/favicon-192x192.png",
];


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.headers.get("accept").includes("text/html")) {
          return caches.match("/index.html");
        }
      });
    })
  );
});