const C='beam-register-v1',ASSETS=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(ASSETS.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
// network first so updates arrive, cache as the offline fallback; Google/GitHub API calls are never touched
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!='GET'||!(u.origin==location.origin||u.hostname=='cdnjs.cloudflare.com'))return;
 e.respondWith(fetch(r).then(res=>{if(res.ok||res.type=='opaque'){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{})}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))))});
