"use strict";var precacheConfig=[["/countyLineBeeFarm/index.html","8c5b8d5b6d004464f33711f2b4064977"],["/countyLineBeeFarm/static/css/main.a352e10d.css","b7a1e54c8f8fa8f302a3be0a14e57642"],["/countyLineBeeFarm/static/js/main.43e5679d.js","2113da21dde863cad0a1cfe758577d4d"],["/countyLineBeeFarm/static/media/beeBack.56d92cce.jpg","56d92cceba5cddf89616c8b2f9dee8fd"],["/countyLineBeeFarm/static/media/beeLogo.d2a1cf0d.png","d2a1cf0d63103d66dd6b183cdc7dd2b2"],["/countyLineBeeFarm/static/media/beeLogoSmall.894d1f82.png","894d1f8273f61e689c29ae351077cbf1"],["/countyLineBeeFarm/static/media/beePic3.5fff2f17.png","5fff2f177f4e723715431394421d5e13"],["/countyLineBeeFarm/static/media/cuttingComb.89deaf6a.jpg","89deaf6ac9de464f355e760c230ec3b4"],["/countyLineBeeFarm/static/media/honey.3ced6a03.jpg","3ced6a0316d2899d0ef84a3712c2a91c"],["/countyLineBeeFarm/static/media/honeyHarvest.4d1b7e7c.jpg","4d1b7e7cf033d9a7badb4963c5bbf4d0"],["/countyLineBeeFarm/static/media/verticalLogo.e9f6a825.png","e9f6a8250ccbb8bdfb5818132a98d027"],["/countyLineBeeFarm/static/media/words.36237257.png","3623725792981cf8e52111582e3f5429"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),e=urlsToCacheKeys.has(n));var r="/countyLineBeeFarm/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});