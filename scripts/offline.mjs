import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
const chunks = readdirSync("out/_next/static", {
  recursive: true,
  withFileTypes: true,
})
  .filter((x) => x.isFile() && /\.(css|js|woff2)$/.test(x.name))
  .map((x) => "/" + x.parentPath.replace(/^out\//, "") + "/" + x.name);
const files = [
  "/",
  "/manifest.webmanifest",
  "/icon.svg",
  "/icon-192.png",
  "/icon-512.png",
  "/pdf.worker.min.mjs",
  ...chunks,
];
const version = createHash("sha256")
  .update(readFileSync("out/index.html"))
  .digest("hex")
  .slice(0, 16);
const sw = readFileSync("public/sw.js", "utf8")
  .replace('"icra-shell-v1"', JSON.stringify("icra-shell-" + version))
  .replace(
    '["/", "/icon.svg", "/manifest.webmanifest"]',
    JSON.stringify(files),
  );
writeFileSync("out/sw.js", sw);
