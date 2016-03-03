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

var network = false;

this.addEventListener('fetch', function(event) {
  var url = event.request.url;
  var matcher = url.match(/https:\/\/.*\/(.*)/);
  var path = matcher[1];
  fetch(event.request).then(function(r) {
    console.log('then after fetch', r);
    network = true;
    return r;
  }).then(function(data) {
    console.log('then with data', data);
    event.waitUntil(
      caches.open('v1')
        .then(function(cache) {
          console.log('adding path', path);
          return cache.add(path);
        })
        .then(function() {
          console.log('All URLs cached');
        })
        .catch(function(error) {
          console.log('Cache failed:', error);
        })
    );
  });

  if (!network) {
      event.respondWith(caches.match(event.request)).then(function(repsonse) {
      console.log('responding', repsonse)
      return caches.open('v1').then(function(cache) {
        console.log('last cache')
        return cache.match(path);
      }).catch(function(error) {
          console.log('from cache failed', error);
        });
    });
  }
});