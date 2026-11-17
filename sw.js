// Apenas arquivos estaticos de instalacao. Nao armazenar HTML, API ou dados pessoais.
const CACHE = 'gunga-install-assets-v2';
const ASSETS = ['./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png','./manifest.webmanifest'];
self.addEventListener('install', e => {e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate', e => {e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('gunga-') && k !== CACHE).map(k => caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch', e => {if(e.request.method !== 'GET') return;const url = new URL(e.request.url);if(url.origin !== self.location.origin) return;if(ASSETS.some(a => url.pathname.endsWith('/'+a.slice(2)))) e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));});
