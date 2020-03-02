importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

const {strategies} = workbox;
const {ExpirationPlugin} = workbox.expiration;
const {CacheableResponsePlugin} = workbox.cacheableResponse

workbox.routing.registerRoute(      // caching images
    /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
    new strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
);


workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,   // caching fonts and other underlying files 
    new strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
);


workbox.routing.registerRoute(  // caching other css and js files that are not cache 
    /\.(?:js|css)$/,
    new strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
);


workbox.precaching.precacheAndRoute([{"revision":"6e1267d9d946b0236cdf6ffd02890894","url":"favicon.ico"},{"revision":"ef8a02db437c74f2ecb0d88becc4b9d4","url":"index.html"},{"revision":"33dbdd0177549353eeeb785d02c294af","url":"logo192.png"},{"revision":"917515db74ea8d1aee6a246cfbcc0b45","url":"logo512.png"},{"revision":"d9d975cebe2ec20b6c652e1e4c12ccf0","url":"manifest.json"},{"revision":"fa1ded1ed7c11438a9b0385b1e112850","url":"robots.txt"},{"revision":"24c025436c8b1efb6b7334c5e5ca0f49","url":"workbox-ccfa3eec.js"}]);