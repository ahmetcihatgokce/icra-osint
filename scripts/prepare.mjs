import { copyFileSync } from "node:fs";
copyFileSync(
  "node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
  "public/pdf.worker.min.mjs",
);
import sharp from "sharp";
for (const size of [192, 512])
  await sharp("public/icon.svg")
    .resize(size)
    .png()
    .toFile("public/icon-" + size + ".png");
