this.addEventListener('install', function(event) {
  console.log('Install event');
  var baseUrl = '/mjhoward/sw-hack/master/';
  var localhost = '/';


  event.waitUntil(
    caches.open('v1')
      .then(function(cache) {
        return cache.addAll([
          baseUrl,
          baseUrl + 'index.html'
        ]);
      })
      .then(function() {
        console.log('All URLs cached');
      })
      .catch(function(error) {
        console.log('Cache failed:', error);
      })
  );
});

this.addEventListener('fetch', function(event) {
  var url = event.request.url;
  var matcher = url.match(/http:\/\/.*\/(.*)/);
  var path = matcher[1];
  return fetch(event.request).then(function(r) {
    return r;
  }).then(function(data) {
    event.waitUntil(
      caches.open('v1')
        .then(function(cache) {
          return cache.add(path);
        })
        .then(function() {
          console.log('All URLs cached');
        })
        .catch(function(error) {
          console.log('Cache failed:', error);
        })
    );
  }).catch(function() {
    event.respondWith(caches.match(event.request)).then(function(repsonse) {
      return caches.open('v1').then(function(cache) {
        return cache.match(path);
      });
    });
  });
});