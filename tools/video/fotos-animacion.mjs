#!/usr/bin/env node
// Fotos de las figuras animadas ([data-anim]) de una página, en varios instantes
// de su animación, para revisarlas a ojo antes de grabar (docs/paginas-para-video.md,
// «Figuras animadas»). Abre la página como el motor de vídeo (Chromium 1280×720,
// oscuro, ?video, SIN reducir movimiento), lleva cada figura al centro de la
// pantalla, espera a que arranque y la fotografía en cada instante. Deja una hoja
// por figura: los fotogramas de dos en dos, con su segundo encima.
//
// Uso:
//   node tools/video/fotos-animacion.mjs /programacion-ia/cli/sesion-03/ --base http://localhost:3123 \
//        --salida <carpeta> [--tiempos 0,0.4,1,2,4] [--solo 3] [--claro]
// --solo n: solo la figura n (contando desde 1, en el orden de la página).

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => {
  const i = args.indexOf(n);
  return i >= 0 ? args[i + 1] : d;
};
const ruta = args.find((a) => a.startsWith("/")) ?? "/";
const base = opt("--base", "http://localhost:3000");
const salida = opt("--salida", "fotos-animacion");
const tiempos = opt("--tiempos", "0,0.4,1,2,4").split(",").map(Number);
const solo = opt("--solo", null);
const tema = args.includes("--claro") ? "light" : "dark";

async function lanzarChromium() {
  const candidatos = ["playwright"];
  const raiz = `/home/${process.env.USER}/.local/share/mise/installs/npm-playwright`;
  if (fs.existsSync(raiz)) {
    const versiones = fs
      .readdirSync(raiz)
      .filter((v) => /^\d+\.\d+\.\d+$/.test(v))
      .sort((x, y) => x.localeCompare(y, undefined, { numeric: true }));
    for (const v of versiones.reverse()) candidatos.push(path.join(raiz, v, "node_modules", "playwright", "index.mjs"));
  }
  for (const c of candidatos) {
    try {
      const m = await import(c.startsWith("/") ? `file://${c}` : c);
      const chromium = m.chromium ?? m.default?.chromium;
      return await chromium.launch();
    } catch {}
  }
  console.error("No encuentro Playwright (mise use -g npm:playwright).");
  process.exit(2);
}

const navegador = await lanzarChromium();
const ctx = await navegador.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1, colorScheme: tema, reducedMotion: "no-preference" });
const pagina = await ctx.newPage();
const url = new URL(ruta, base);
url.searchParams.set("video", "");
await pagina.goto(url.href, { waitUntil: "load", timeout: 120000 });
await pagina.waitForFunction(() => document.documentElement.hasAttribute("data-video"), null, { timeout: 30000 });
await pagina.evaluate(() => document.fonts.ready);
const anima = await pagina.evaluate(() => document.documentElement.hasAttribute("data-anima"));
if (!anima) console.log("Aviso: la página no ha activado las animaciones (¿no hay figuras animadas?).");

const figuras = await pagina.$$("[data-anim]");
fs.mkdirSync(salida, { recursive: true });
console.log(`${figuras.length} figuras animadas en ${url.pathname}`);

for (const [i, f] of figuras.entries()) {
  if (solo && Number(solo) !== i + 1) continue;
  const titulo = await f.evaluate((e) => {
    const s = e.closest("[data-bloque]");
    return (s?.querySelector("h1,h2,h3")?.textContent ?? "figura").trim();
  });
  // Si ya arrancó (o estaba a la vista al cargar), se repite desde cero.
  await f.evaluate((e) => {
    e.scrollIntoView({ block: "center" });
    if (e.hasAttribute("data-anim-listo") || e.hasAttribute("data-anim-quieta")) {
      e.setAttribute("data-anim-quieta", "");
      void e.offsetWidth;
      e.removeAttribute("data-anim-quieta");
      e.setAttribute("data-anim-listo", "");
    }
  });
  await f.evaluate((e) => new Promise((ok) => {
    if (e.hasAttribute("data-anim-listo")) return ok();
    new MutationObserver((_, o) => { if (e.hasAttribute("data-anim-listo")) { o.disconnect(); ok(); } }).observe(e, { attributes: true });
  }));
  const t0 = Date.now();
  const fotos = [];
  for (const t of tiempos) {
    const falta = t * 1000 - (Date.now() - t0);
    if (falta > 0) await pagina.waitForTimeout(falta);
    fotos.push({ t, png: (await f.screenshot()).toString("base64") });
  }
  const hoja = await ctx.newPage();
  await hoja.setViewportSize({ width: 1700, height: 400 });
  await hoja.setContent(`<body style="margin:0;background:#111;color:#eee;font:16px system-ui">
    <div style="padding:8px 12px;font-weight:700">${i + 1} · ${titulo.replace(/</g, "&lt;")}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 8px 8px;align-items:start">${fotos
      .map((x) => `<div style="min-width:0"><div style="padding:2px 0">${x.t} s</div><img style="width:100%;display:block" src="data:image/png;base64,${x.png}"></div>`)
      .join("")}</div></body>`);
  const slug = titulo.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
  const destino = path.join(salida, `${String(i + 1).padStart(2, "0")}-${slug}.png`);
  await hoja.screenshot({ path: destino, fullPage: true });
  await hoja.close();
  console.log(`  ${destino}`);
}

await navegador.close();
