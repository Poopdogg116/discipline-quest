const CACHE='discipline-quest-v1';
const CORE=['./','index.html','styles/main.css','src/app.js','data/moments.json','data/quotes.json','data/packs.json','manifest.webmanifest','assets/icons/icon-192.png','assets/icons/icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE))));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>event.respondWith(caches.match(event.request).then(response=>response||fetch(event.request))));