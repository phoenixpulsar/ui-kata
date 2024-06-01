const assets = [
  "/",
  "styles.scss",
  "app.js",
  "sw-register.js",
  "firebase.js",
  "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("assets").then((cache) => {
      console.log("adding assets");
      return cache.addAll(assets);
    })
  );
});

// // Cache first
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((cacheResponse) => {
//       if (cacheResponse) {
//         // Cache hit
//         return cacheResponse;
//       } else {
//         // Cache miss
//         return fetch(event.request);

//         // return fetch(event.request).then((networkResponse) => {
//         //     return caches.open("assets").then((cache) => {
//         //       cache.put(event.request, networkResponse.clone());
//         //       return networkResponse;
//         //     });
//         //   });
//       }
//     })
//   );
// });

// State while revalidate strategy
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      // Even if the response is in the cache, we fetch it
      // and update the cache for future usage
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open("assets").then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
      // We use the currently cached version if it's there
      return cacheResponse || fetchPromise; // cached or a network fetch
    })
  );
});
