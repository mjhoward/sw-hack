function addAllFiles() {
  var isLocal = false;
  var baseUrl = isLocal ? '/' : '/mjhoward/sw-hack/master/';

  var arr = [baseUrl + 'index.html']

  // for (var i = 1; i < 19; i ++) {
  //   (function(idx) {
  //     var offset = (idx < 10) ? 0 : ''
  //     var url =  baseUrl + 'assets/equation-neqn0' + offset + idx + '.gif'
  //     arr.push(url)
  //   })(i);
  // }

 /* for (var i = 1; i < 6; i ++) {
    (function(idx) {
      var url =  baseUrl + 'figures/nfig00' + idx + '.jpg'
      arr.push(url)
    })(i);
  }*/

  // for (var i = 1; i < 19; i ++) {
  //   (function(idx) {
  //     var offset = (idx < 10) ? 0 : ''
  //     var url =  baseUrl + 'assets/equation-nueq0' + offset + idx + '.gif'
  //     arr.push(url)
  //   })(i);
  // }

  // for (var i = 1; i < 51; i ++) {
  //   (function(idx) {
  //     var url =  baseUrl + 'assets/equation-tex2gif-stack-' + idx + '.gif'
  //     arr.push(url)
  //   })(i);
  // }

  arr.push(baseUrl + 'assets/footer-logo.png');
  arr.push(baseUrl + 'assets/header-logo.png');
  arr.push(baseUrl + 'assets/wol-article.css');
  arr.push(baseUrl + 'assets/wol-common.css');
  arr.push(baseUrl + 'assets/cover.gif');
  arr.push(baseUrl + 'assets/olalertbanner.jpg');
  arr.push(baseUrl + 'assets/images/ajax-loader.gif');
  arr.push(baseUrl + 'assets/images/icons-aa.png');
  arr.push(baseUrl + 'assets/images/icons.png');


  arr.push(baseUrl + 'assets/wiley-article.js');
  arr.push(baseUrl + 'assets/wiley-common.js');
  arr.push(baseUrl + 'assets/wiley-require-2.1.6.js');
  arr.push(baseUrl + 'assets/modernizr.custom.js');

/*  arr.push(baseUrl + 'assets/open-sans.css');
  arr.push(baseUrl + 'assets/fonts/Italic/OpenSans-Italic.woff2');
  arr.push(baseUrl + 'assets/fonts/Regular/OpenSans-Regular.woff2');
  arr.push(baseUrl + 'assets/fonts/Semibold/OpenSans-Semibold.woff2');*/

  return arr;

}

var urlsToCache = addAllFiles();

/*[
'/mjhoward/sw-hack/master/index.html',
'/mjhoward/sw-hack/master/assets/wol-article.css'
]*/

this.addEventListener('install', function(event) {
  console.log('Install event');

  //var arr = addAllFiles();
  console.log(urlsToCache);

  event.waitUntil(
    caches.open('v1')
      .then(function(cache) {
        //return cache.addAll(arr);
        return cache.addAll(urlsToCache);
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
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        
        if (response) {
          return response;
        }
        
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open('v1')
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );

      })


      /*.then(function(r) {
        repsonse = r;
        caches.open('v1').then(function(cache) {
          cache.put(event.request, response);
        })
        console.log('Found in cache:', r);
        return repsonse.clone();        
      })*/
  );
});


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