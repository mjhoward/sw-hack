function addAllFiles() {
  var isLocal = true;
  var baseUrl = isLocal ? '/' : '/mjhoward/sw-hack/master/';

  var arr = [baseUrl]

  for (var i = 1; i < 19; i ++) {
    (function(idx) {
      var offset = (idx < 10) ? 0 : ''
      var url =  baseUrl + 'assets/equation-neqn0' + offset + idx + '.gif'
      arr.push(url)
    })(i);
  }

  for (var i = 1; i < 6; i ++) {
    (function(idx) {
      var url =  baseUrl + 'figures/nfig00' + idx + '.jpg'
      arr.push(url)
    })(i);
  }

  for (var i = 1; i < 19; i ++) {
    (function(idx) {
      var offset = (idx < 10) ? 0 : ''
      var url =  baseUrl + 'assets/equation-nueq0' + offset + idx + '.gif'
      arr.push(url)
    })(i);
  }

  for (var i = 1; i < 51; i ++) {
    (function(idx) {
      var url =  baseUrl + 'assets/equation-tex2gif-stack-' + idx + '.gif'
      arr.push(url)
    })(i);
  }

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

  arr.push(baseUrl + 'assets/fonts/open-sans.css');
  arr.push(baseUrl + 'assets/fonts/Italic/OpenSans-Italic.woff2');
  arr.push(baseUrl + 'assets/fonts/Regular/OpenSans-Regular.woff2');
  arr.push(baseUrl + 'assets/fonts/Semibold/OpenSans-Semibold.woff2');

  return arr;

}


this.addEventListener('install', function(event) {
  console.log('Install event');

  var arr = addAllFiles();
  console.log(arr)

  event.waitUntil(
    caches.open('v1')
      .then(function(cache) {
        return cache.addAll(arr);
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