const CACHE_NAME = 'almeida-sattrack-v1';

// Lista de arquivos para salvar no cache
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Instalação: Salva os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Almeida SatTrack: Cache aberto e arquivos armazenados.');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Ativação: Limpa caches antigos se você atualizar a versão
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Almeida SatTrack: Limpando cache antigo.');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Estratégia: Tenta carregar do Cache primeiro, se não tiver, busca na rede
// Isso permite que o app funcione offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
