#!/usr/bin/env node
// Fotos de los visores 3D (figure[data-visor3d]) de una página, paso a paso,
// para revisarlos a ojo antes de grabar (docs/paginas-para-video.md, «Visores
// 3D»). Abre la página como el motor de vídeo (Chromium 1280×720, oscuro,
// ?video), lleva cada visor al centro, espera a que cargue su escena y lo
// fotografía en cada paso de su guion (pulsando el paso y esperando un poco).
// Deja una hoja por visor: el bloque entero en el primer paso y la escena sola
// en los demás.
//
// Uso:
//   node tools/video/fotos-visor3d.mjs /programacion-ia/juego-3d/laboratorio/ --base http://localhost:3123 \
//        --salida <carpeta> [--espera 1.8] [--solo malla,red] [--claro]
// --espera s: segundos dentro de cada paso antes de la foto.
// --solo a,b: solo esas escenas (por su nombre en pasos.ts).
// Sale con código 1 si algún visor no carga o lanza errores.

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => {
  const i = args.indexOf(n);
  return i >= 0 ? args[i + 1] : d;
};
const ruta = args.find((a) => a.startsWith("/")) ?? "/";
const base = opt("--base", "http://localhost:3000");
const salida = opt("--salida", "fotos-visor3d");
const espera = Number(opt("--espera", "1.8"));
const solo = opt("--solo", null)?.split(",") ?? null;
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
      // WebGL por software: sin pantalla no hay GPU que valga.
      return await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
    } catch {}
  }
  console.error("No encuentro Playwright (mise use -g npm:playwright).");
  process.exit(2);
}

const limpio = (s) => s.replace(/</g, "&lt;");

const navegador = await lanzarChromium();
const ctx = await navegador.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1, colorScheme: tema, reducedMotion: "no-preference" });
const pagina = await ctx.newPage();
const errores = [];
pagina.on("console", (m) => {
  if (m.type() === "error" && !/wp-content|favicon|Failed to load resource/.test(m.text())) errores.push(m.text());
});
pagina.on("pageerror", (e) => errores.push(String(e)));
const url = new URL(ruta, base);
url.searchParams.set("video", "");
await pagina.goto(url.href, { waitUntil: "load", timeout: 120000 });
await pagina.waitForFunction(() => document.documentElement.hasAttribute("data-video"), null, { timeout: 30000 });
await pagina.evaluate(() => document.fonts.ready);

const visores = await pagina.$$("figure[data-visor3d]");
fs.mkdirSync(salida, { recursive: true });
console.log(`${visores.length} visores 3D en ${url.pathname}`);
let fallos = 0;

for (const [i, f] of visores.entries()) {
  const nombre = await f.getAttribute("data-visor3d");
  if (solo && !solo.includes(nombre)) continue;
  await f.evaluate((e) => e.scrollIntoView({ block: "center" }));
  try {
    // La figura lleva data-estado="lista" cuando la escena ya se está pintando.
    await pagina.waitForFunction((e) => e.getAttribute("data-estado") === "lista", f, { timeout: 45000 });
  } catch {
    const texto = await f.evaluate((e) => e.querySelector("canvas")?.parentElement?.textContent ?? "");
    console.log(`  ✗ ${nombre}: no carga («${texto.trim()}»)`);
    fallos++;
    continue;
  }
  const pasos = await f.$$("ol > li button");
  const fotos = [];
  const antes = errores.length;
  for (const [k, boton] of pasos.entries()) {
    await boton.click();
    await pagina.waitForTimeout(espera * 1000);
    const texto = (await boton.evaluate((b) => b.firstElementChild?.textContent ?? "")).trim();
    const dato = (await f.evaluate((e) => e.querySelector("canvas ~ p.font-mono")?.textContent ?? "")).trim();
    const objetivo = k === 0 ? f : await f.$("canvas");
    fotos.push({ texto, dato, png: (await objetivo.screenshot()).toString("base64") });
  }
  const alto = await f.evaluate((e) => Math.round(e.closest("[data-bloque]")?.getBoundingClientRect().height ?? 0));
  const hoja = await ctx.newPage();
  await hoja.setViewportSize({ width: 1800, height: 400 });
  await hoja.setContent(`<body style="margin:0;background:#111;color:#eee;font:16px system-ui">
    <div style="padding:8px 12px;font-weight:700">${i + 1} · ${nombre} · bloque de ${alto} px de alto</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 8px 8px;align-items:start">${fotos
      .map((x) => `<div style="min-width:0"><div style="padding:2px 0">${limpio(x.texto)}${x.dato ? ` — <code>${limpio(x.dato)}</code>` : ""}</div><img style="width:100%;display:block" src="data:image/png;base64,${x.png}"></div>`)
      .join("")}</div></body>`);
  const destino = path.join(salida, `${String(i + 1).padStart(2, "0")}-${nombre}.png`);
  await hoja.screenshot({ path: destino, fullPage: true });
  await hoja.close();
  const nuevos = errores.slice(antes);
  console.log(`  ${nuevos.length ? "✗" : "✓"} ${destino}${alto > 620 ? `  (bloque alto: ${alto})` : ""}`);
  for (const e of nuevos) console.log(`      ${e.slice(0, 300)}`);
  if (nuevos.length) fallos++;
}

await navegador.close();
if (errores.length && !fallos) fallos = 1;
process.exit(fallos ? 1 : 0);
