this.addEventListener('install', function(event) {
  console.log('Install event');
  event.waitUntil(
    caches.open('v1')
      .then(function(cache) {
        return cache.addAll([
          '/mjhoward/sw-hack/master/',
          '/mjhoward/sw-hack/master/index.html'
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
  console.log('Fetch event:', event.request.url);
  var response;
  event.respondWith(caches.match(event.request).catch(function() {
    console.log('Not found in cache:');
    return fetch(event.request);
  }).then(function(r) {
        repsonse = r;
        caches.open('v1').then(function(cache) {
          cache.put(event.request, response);
        })
        console.log('Found in cache:', r);
        return repsonse.clone();        
      })
  );
  /*event.respondWith(
    caches.match(event.request).catch(function() {
      console.log('Not in cache');
      return fetch(event.request).then(function(response) {
        console.log('response: ',response);
        return caches.open('v1').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        })
      })
    })
  );*/
});

/*self.addEventListener("activate", function (event) {
  event.waitUntil(
    clients.claim().then(
      caches
        .keys()
        .then(function (cacheNames) {
          return Promise.all(
            cacheNames.map(function (cacheName) {
                return caches.delete(cacheName);
            })
          );
        })
    )
  )
});*/