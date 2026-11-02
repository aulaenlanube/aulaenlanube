#!/usr/bin/env node
// Revisa una página pensada para grabarse en vídeo (docs/paginas-para-video.md)
// tal como la ve el motor de grabación: Chromium a 1280×720 CSS, tema oscuro y
// `?video` (sin nada fijo encima). Después repite lo básico en móvil (390×844).
//
// Comprueba:
//   · cada bloque (<section data-bloque>) cabe en 1100×620;
//   · encabezados h1-h4 únicos y cortos; los «Paso N · …» son h2 y van seguidos;
//   · ningún texto visible por debajo de 16 px (también el de los SVG);
//   · contraste AA del texto HTML sobre su fondo real (con transparencias);
//   · prefijos únicos: dos h2/h3/h4/li/<text> no pueden empezar igual;
//   · nada fijo o pegajoso a la vista, nada invisible que dependa del ratón;
//   · nada escondido en un desplazamiento horizontal a 1280 ni desbordes en móvil.
//
// Uso:
//   node tools/video/revisar-pagina.mjs /programacion-ia/opencode/ [--base http://localhost:3000]
//        [--capturas <carpeta>] [--claro]
// --capturas guarda una imagen por bloque (escritorio y móvil) para mirarlas una a una.
// Sale con código 1 si encuentra algún problema.

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => {
  const i = args.indexOf(n);
  return i >= 0 ? args[i + 1] : d;
};
const ruta = args.find((a) => a.startsWith("/")) ?? "/";
const base = opt("--base", "http://localhost:3000");
const capturas = opt("--capturas", null);
const tema = args.includes("--claro") ? "light" : "dark";

const MAX_W = 1100;
const MAX_H = 620;
const MIN_PX = 15.5; // 16 px con margen para el redondeo de los SVG
const PREFIJO = 24; // caracteres con los que la cámara distingue un elemento

async function lanzarChromium() {
  const candidatos = ["playwright"];
  // mise instala playwright como paquete propio: se toma la versión más nueva de
  // su carpeta (sin llamar al envoltorio `playwright`, que hace `mise use` y
  // puede quedarse esperando a la red).
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

// Todo lo que se mide dentro de la página va en esta función (se serializa).
function medir({ MAX_W, MAX_H, MIN_PX, PREFIJO, movil }) {
  const problemas = [];
  const norm = (s) => (s ?? "").replace(/\s+/g, " ").trim();
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false;
    for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.display === "none" || cs.visibility === "hidden" || Number(cs.opacity) < 0.05) return false;
      if (cs.position === "absolute" && cs.clip !== "auto" && cs.clip !== "") return false; // sr-only
    }
    return true;
  };
  const bloques = [...document.querySelectorAll("[data-bloque]")];
  const titulo = (b) => norm(b.querySelector("h1,h2,h3,h4")?.textContent) || "(sin título)";

  // 1 · Tamaño de cada bloque
  const tam = bloques.map((b) => {
    const r = b.getBoundingClientRect();
    return { titulo: titulo(b), w: Math.round(r.width), h: Math.round(r.height) };
  });
  if (!movil) {
    for (const t of tam) {
      if (t.w > MAX_W || t.h > MAX_H) problemas.push(`bloque grande ${t.w}×${t.h}: «${t.titulo}»`);
    }
  }

  // 2 · Encabezados
  const hs = [...document.querySelectorAll("h1,h2,h3,h4")].filter(visible);
  const vistos = new Map();
  for (const h of hs) {
    const t = norm(h.textContent);
    if (vistos.has(t)) problemas.push(`encabezado repetido: ${h.tagName.toLowerCase()} «${t}»`);
    vistos.set(t, h);
    if ((h.tagName === "H2" || h.tagName === "H3") && t.length > 48) problemas.push(`encabezado largo (${t.length}): «${t}»`);
  }
  const pasos = hs.filter((h) => /^Paso\s/.test(norm(h.textContent)));
  pasos.forEach((h, i) => {
    const t = norm(h.textContent);
    const m = t.match(/^Paso (\d+) · \S/);
    if (h.tagName !== "H2") problemas.push(`paso que no es h2: «${t}»`);
    if (!m) problemas.push(`paso mal escrito (debe ser «Paso N · …»): «${t}»`);
    else if (Number(m[1]) !== i + 1) problemas.push(`paso fuera de orden: «${t}» (esperaba el ${i + 1})`);
  });

  // 3 · Letra mínima y contraste (solo dentro de los bloques)
  // Tailwind 4 da los colores en oklch(): se pinta cada uno en un píxel de un
  // canvas y se lee en RGB, que vale para cualquier espacio de color.
  const lienzo = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  const cache = new Map();
  const rgba = (css) => {
    if (!css || css === "transparent") return null;
    if (!cache.has(css)) {
      lienzo.clearRect(0, 0, 1, 1);
      lienzo.fillStyle = "#000";
      lienzo.fillStyle = css;
      lienzo.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = lienzo.getImageData(0, 0, 1, 1).data;
      cache.set(css, { r, g, b, a: a / 255 });
    }
    return cache.get(css);
  };
  const sobre = (c, f) => ({
    r: c.r * c.a + f.r * (1 - c.a),
    g: c.g * c.a + f.g * (1 - c.a),
    b: c.b * c.a + f.b * (1 - c.a),
    a: 1,
  });
  const lum = (c) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const fondoDe = (el) => {
    const capas = [];
    for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.backgroundImage && cs.backgroundImage !== "none") return null; // degradado: no se mide
      const c = rgba(cs.backgroundColor);
      if (c && c.a > 0) {
        capas.push(c);
        if (c.a >= 1) break;
      }
    }
    let f = capas.length && capas[capas.length - 1].a >= 1 ? capas.pop() : { r: 255, g: 255, b: 255, a: 1 };
    while (capas.length) f = sobre(capas.pop(), f);
    return f;
  };
  const yaPequeno = new Set();
  const yaContraste = new Set();
  for (const b of bloques) {
    const tw = document.createTreeWalker(b, NodeFilter.SHOW_TEXT);
    for (let n = tw.nextNode(); n; n = tw.nextNode()) {
      if (!n.textContent.trim()) continue;
      const el = n.parentElement;
      if (!el || !visible(el)) continue;
      const cs = getComputedStyle(el);
      let px = parseFloat(cs.fontSize);
      const svg = el.closest("svg");
      if (svg) {
        const ctm = el.getScreenCTM?.() ?? svg.getScreenCTM();
        if (ctm) px *= Math.hypot(ctm.a, ctm.b);
      }
      const corto = norm(n.textContent).slice(0, 40);
      if (px < MIN_PX && !yaPequeno.has(el)) {
        yaPequeno.add(el);
        problemas.push(`letra de ${px.toFixed(1)} px: «${corto}» (en «${titulo(b)}»)`);
      }
      if (svg || yaContraste.has(el)) continue;
      yaContraste.add(el);
      const c = rgba(cs.color);
      const f = fondoDe(el);
      if (!c || !f) continue;
      const t = sobre(c, f);
      const [l1, l2] = [lum(t), lum(f)].sort((x, y) => y - x);
      const ratio = (l1 + 0.05) / (l2 + 0.05);
      const grande = px >= 24 || (px >= 18.66 && Number(cs.fontWeight) >= 700);
      if (ratio < (grande ? 3 : 4.5)) problemas.push(`contraste ${ratio.toFixed(2)}:1: «${corto}» (en «${titulo(b)}»)`);
    }
  }

  // 4 · Prefijos únicos para la cámara
  const prefijos = new Map();
  const candidatos = [...document.querySelectorAll("[data-bloque] :is(h2,h3,h4,li,text)")].filter(visible);
  for (const el of candidatos) {
    const t = norm(el.textContent);
    if (!t) continue;
    const clave = `${el.tagName.toLowerCase()}:${t.slice(0, PREFIJO)}`;
    if (prefijos.has(clave) && prefijos.get(clave) !== t) problemas.push(`dos ${clave}… empiezan igual`);
    else if (prefijos.has(clave)) problemas.push(`repetido ${clave}`);
    prefijos.set(clave, t);
  }

  // 5 · Nada fijo a la vista
  for (const el of document.querySelectorAll("body *")) {
    const p = getComputedStyle(el).position;
    const r = el.getBoundingClientRect();
    const enPantalla = r.right > 0 && r.left < window.innerWidth && r.bottom > 0 && r.top < window.innerHeight;
    if ((p === "fixed" || p === "sticky") && enPantalla && visible(el)) {
      problemas.push(`elemento ${p}: <${el.tagName.toLowerCase()} class="${(el.className?.baseVal ?? el.className ?? "").slice(0, 60)}">`);
    }
  }

  // 6 · Nada que dependa del ratón ni oculto en un desplazamiento lateral
  for (const b of bloques) {
    for (const el of b.querySelectorAll("*")) {
      const cs = getComputedStyle(el);
      const clases = String(el.className?.baseVal ?? el.className ?? "");
      if (/(^|\s)(group-)?hover:(opacity|block|flex|visible|inline)/.test(clases) && cs.opacity !== "1") {
        problemas.push(`algo que solo aparece al pasar el ratón en «${titulo(b)}»`);
      }
      if (!movil && /(auto|scroll)/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 1) {
        problemas.push(`contenido escondido en desplazamiento lateral a 1280 (${el.scrollWidth}>${el.clientWidth}) en «${titulo(b)}»`);
      }
    }
  }
  // Texto que se sale por la derecha sin estar en una caja que se desliza.
  for (const b of bloques) {
    const tw = document.createTreeWalker(b, NodeFilter.SHOW_TEXT);
    for (let n = tw.nextNode(); n; n = tw.nextNode()) {
      if (!n.textContent.trim() || !n.parentElement || !visible(n.parentElement)) continue;
      if (getComputedStyle(n.parentElement).textOverflow === "ellipsis") continue; // recorte buscado (rótulos)
      const rango = document.createRange();
      rango.selectNodeContents(n);
      const r = rango.getBoundingClientRect();
      let caja = null;
      for (let e = n.parentElement; e && e !== b.parentElement; e = e.parentElement) {
        if (/(auto|scroll)/.test(getComputedStyle(e).overflowX)) caja = e;
      }
      const limite = caja ? caja.getBoundingClientRect().right + caja.scrollWidth : b.getBoundingClientRect().right;
      if (r.width > 0 && r.right > limite + 1) {
        problemas.push(`texto que se sale del bloque: «${norm(n.textContent).slice(0, 40)}» (en «${titulo(b)}»)`);
        break;
      }
    }
  }
  if (movil && document.documentElement.scrollWidth > window.innerWidth + 1) {
    problemas.push(`la página se desborda en móvil: ${document.documentElement.scrollWidth}px > ${window.innerWidth}px`);
  }

  return { problemas, tam };
}

const navegador = await lanzarChromium();
const url = new URL(ruta, base);
url.searchParams.set("video", "");
let fallos = 0;

for (const movil of [false, true]) {
  const ctx = await navegador.newContext({
    viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    colorScheme: tema,
    isMobile: movil,
    hasTouch: movil,
  });
  const pagina = await ctx.newPage();
  const errores = [];
  pagina.on("pageerror", (e) => errores.push(String(e)));
  // Las imágenes de /wp-content/ solo existen en el servidor: en local dan 404/500.
  pagina.on("console", (m) => m.type() === "error" && !m.text().startsWith("Failed to load resource") && errores.push(m.text()));
  pagina.on("response", (r) => r.status() >= 400 && !r.url().includes("/wp-content/") && errores.push(`${r.status()} ${r.url()}`));
  await pagina.goto(url.href, { waitUntil: "load", timeout: 120000 });
  await pagina.waitForFunction(() => document.documentElement.hasAttribute("data-video"), null, { timeout: 30000 });
  await pagina.evaluate(() => document.fonts.ready);
  const { problemas, tam } = await pagina.evaluate(medir, { MAX_W, MAX_H, MIN_PX, PREFIJO, movil });

  const nombre = movil ? "móvil 390×844" : "escritorio 1280×720";
  console.log(`\n── ${url.pathname} · ${nombre} · tema ${tema} · ${tam.length} bloques`);
  if (!movil) {
    for (const t of tam) {
      const marca = t.w > MAX_W || t.h > MAX_H ? "✗" : " ";
      console.log(`  ${marca} ${String(t.w).padStart(4)}×${String(t.h).padEnd(4)} ${t.titulo}`);
    }
  }
  const todos = [...problemas, ...errores.map((e) => `error en la consola: ${e.slice(0, 160)}`)];
  console.log(todos.length ? todos.map((p) => `  · ${p}`).join("\n") : "  sin problemas");
  fallos += todos.length;

  if (capturas) {
    const dir = path.join(capturas, movil ? "movil" : "escritorio");
    fs.mkdirSync(dir, { recursive: true });
    const bloques = await pagina.$$("[data-bloque]");
    for (const [i, b] of bloques.entries()) {
      const slug = (tam[i]?.titulo ?? "bloque")
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 40);
      await b.screenshot({ path: path.join(dir, `${String(i + 1).padStart(2, "0")}-${slug}.png`) });
    }
    console.log(`  capturas en ${dir}`);
  }
  await ctx.close();
}

await navegador.close();
console.log(fallos ? `\n${fallos} problema(s).` : "\nTodo en orden.");
process.exit(fallos ? 1 : 0);
