const CACHE_NAME = "einfachtool-cache-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
];

// Installations-Event: Dateien cachen
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Fetch-Event: Versuche aus Cache, sonst aus dem Netz
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
