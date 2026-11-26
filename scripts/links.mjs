import { readFileSync } from "node:fs";
const catalog = JSON.parse(
  readFileSync(new URL("../app/catalog.json", import.meta.url)),
);
await Promise.all(
  catalog.map(async (r) => {
    try {
      const response = await fetch(r.url, {
        signal: AbortSignal.timeout(15000),
      });
      await response.body?.cancel();
      console.log(response.status, r.name, response.url);
      if ([404, 410].includes(response.status)) process.exitCode = 1;
    } catch {
      console.log("Elle kontrol gerekli", r.name, r.url);
    }
  }),
);
