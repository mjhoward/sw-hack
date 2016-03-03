this.addEventListener('install', function(event) {
  console.log('Install event');
  var baseUrl = '/mjhoward/sw-hack/master/';
  var localhost = '/';


  event.waitUntil(
    caches.open('v1')
      .then(function(cache) {
        return cache.addAll([
          localhost,
          localhost + 'index.html'
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
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    )
});







  // var url = event.request.url;
  // var matcher = url.match(/https:\/\/.*\/(.*)/);
  // var path = matcher[1];
  // fetch(event.request).then(function(r) {
  //   console.log('then after fetch', r);
  //   network = true;
  //   return r;
  // })




  // .then(function(data) {
  //   console.log('then with data', data);
  //   event.waitUntil(
  //     caches.open('v1')
  //       .then(function(cache) {
  //         console.log('adding path', path);
  //         return cache.add(path);
  //       })
  //       .then(function() {
  //         console.log('All URLs cached');
  //       })
  //       .catch(function(error) {
  //         console.log('Cache failed:', error);
  //       })
  //   );
  // });

  // caches.match(path).then(function(repsonse) {
  //   return response
  // }).then(function(data) {
  //   if (!network) {
  //      return cache.match(path);
  //   }
  // });