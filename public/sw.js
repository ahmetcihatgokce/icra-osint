const cacheName = "icra-shell-v1";
self.addEventListener("install", (event) =>
  event.waitUntil(
    caches
      .open(cacheName)
      .then((c) => c.addAll(["/", "/icon.svg", "/manifest.webmanifest"])),
  ),
);
self.addEventListener("activate", (event) =>
  event.waitUntil((async()=>{for(const name of await caches.keys())if(name.startsWith("icra-shell-")&&name!==cacheName)await caches.delete(name);await self.clients.claim()})()),
);
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (
    event.request.method !== "GET" ||
    url.origin !== self.location.origin ||
    url.search
  )
    return;
  if (
    url.pathname !== "/" &&
    !url.pathname.startsWith("/_next/static/") &&
    !["/pdf.worker.min.mjs", "/icon.svg", "/manifest.webmanifest"].includes(
      url.pathname,
    )
  )
    return;
  event.respondWith(
    (async () => {
      const cache = await caches.open(cacheName);
      try {
        const res = await fetch(event.request);
        if (res.ok) await cache.put(event.request, res.clone());
        return res;
      } catch {
        return (await cache.match(event.request)) || Response.error();
      }
    })(),
  );
});
