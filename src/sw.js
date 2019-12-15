self.addEventListener('install', event => {
  console.log('Service installed!');
});

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

self.addEventListener('activate', function(e) {
  console.log('active!');
});

self.addEventListener('message', e => {
  if (e.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
