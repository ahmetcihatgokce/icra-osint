import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { gzipSync } from "node:zlib";

// Use the same React screens and guide as the hosted Next.js application.
const bundle = await build({
  stdin: {
    contents:
      "import {createRoot} from 'react-dom/client'; import Home from './app/page'; createRoot(document.getElementById('app')).render(<Home/>);",
    resolveDir: process.cwd(),
    loader: "tsx",
  },
  bundle: true,
  platform: "browser",
  format: "iife",
  minify: true,
  write: false,
  jsx: "automatic",
  define: {
    "process.env.NODE_ENV": '"production"',
    "process.env.NEXT_PUBLIC_PORTABLE": '"1"',
  },
});
const script = gzipSync(bundle.outputFiles[0].text).toString("base64");
const css = readFileSync("app/style.css", "utf8");
const html =
  '<!doctype html><html lang="tr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>İcraOSINT | İcra takibi rehberi</title><meta name="description" content="Yeni avukatlar için takip açılışı, tahsil ve dosya kapanışı"><style>' +
  css +
  '</style><body><div id="app">İcra takibi rehberi açılıyor…</div><script type="module">const payload=' +
  JSON.stringify(script) +
  ';async function unpack(s){const bytes=Uint8Array.from(atob(s),c=>c.charCodeAt(0));const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));return URL.createObjectURL(new Blob([await new Response(stream).arrayBuffer()],{type:"text/javascript"}))}try{const app=document.createElement("script");app.src=await unpack(payload);document.body.append(app)}catch{document.getElementById("app").textContent="Bu sürüm için güncel bir tarayıcı kullanın."}</script></body></html>';
mkdirSync("dist", { recursive: true });
writeFileSync("dist/icra-osint.html", html);
