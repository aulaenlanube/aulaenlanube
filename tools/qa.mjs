// QA exhaustivo del staging: recorre las 565 URLs y comprueba estado, título,
// enlaces internos rotos, imágenes que faltan y restos de WordPress.
// Uso: node tools/qa.mjs
import fs from "node:fs";

const BASE = "https://aulaenlanube.com/preview-next";
const ORIGIN = "https://aulaenlanube.com";
const CONC = 6;

const heads = JSON.parse(fs.readFileSync("tools/data/head.live.json", "utf8"));

function norm(p) {
  return p.split("/").map((s) => {
    let c = s;
    for (let i = 0; i < 4; i++) { try { const d = decodeURIComponent(c); if (d === c) break; c = d; } catch { break; } }
    return c;
  }).join("/");
}
function decode(s) {
  return (s || "")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();
}

const validNorm = new Set(heads.map((h) => norm(h.path)));
const titleByNorm = new Map(heads.map((h) => [norm(h.path), decode(h.title)]));

const targets = heads.map((h) => h.path);
const UA = "qa-bot";

async function get(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 20000);
  try {
    const r = await fetch(url, { redirect: "manual", signal: ctrl.signal, headers: { "User-Agent": UA } });
    const html = r.status >= 200 && r.status < 300 ? await r.text() : "";
    clearTimeout(t);
    return { status: r.status, html };
  } catch (e) { clearTimeout(t); return { status: 0, html: "", err: String(e) }; }
}

const badStatus = [];
const titleDiff = [];
const brokenLinks = new Map(); // brokenPath -> count
const artifacts = [];
const thin = [];
const imageSet = new Set();
let done = 0;

async function checkPage(path) {
  const { status, html, err } = await get(BASE + path);
  if (status !== 200) { badStatus.push(`${status || err} ${path}`); return; }

  const title = decode((/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html) || [, ""])[1]);
  const want = titleByNorm.get(norm(path));
  if (want && title !== want) titleDiff.push({ path, got: title, want });

  // enlaces internos (Next prefija con /preview-next)
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    let h = m[1];
    if (!h.startsWith("/preview-next/")) continue;
    let target = h.slice("/preview-next".length).replace(/[?#].*$/, "");
    if (target.startsWith("/wp-content") || target.startsWith("/_next") || target === "/") continue;
    if (/\.[a-z0-9]{1,6}$/i.test(target)) continue; // ficheros/assets (favicon.ico, .xml...)
    if (!target.endsWith("/")) target += "/";
    if (!validNorm.has(norm(target))) brokenLinks.set(target, (brokenLinks.get(target) || 0) + 1);
  }

  // imágenes de contenido (wp-content) -> recopilar para comprobar
  for (const m of html.matchAll(/(?:src|href)="(\/wp-content\/uploads\/[^"]+)"/g)) imageSet.add(m[1]);
  for (const m of html.matchAll(/content="(https:\/\/aulaenlanube\.com\/wp-content\/uploads\/[^"]+)"/g)) imageSet.add(m[1].replace(ORIGIN, ""));

  // restos de WordPress
  const flags = [];
  if (/\[(?:vc_|et_pb|elementor|caption|gallery|embed|wpforms|contact-form)/i.test(html)) flags.push("shortcode");
  if (/%%\w+%%/.test(html)) flags.push("token-yoast");
  if (/adsbygoogle|googlesyndication/i.test(html)) flags.push("adsense");
  if (/\belementor-(?:widget|element|section)\b/.test(html)) flags.push("elementor-class");
  if (flags.length) artifacts.push(`${path} [${flags.join(",")}]`);

  // páginas finas (posible migración rota): cuerpo del <article>/<main> muy corto
  const main = (/<main[\s\S]*?<\/main>/i.exec(html) || [""])[0];
  const text = main.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length < 120) thin.push(`${path} (${text.length} chars)`);

  done++;
  if (done % 100 === 0) console.error(`  ...${done}/${targets.length}`);
}

console.error(`QA de ${targets.length} URLs...`);
let q = [...targets];
await Promise.all(Array.from({ length: CONC }, async () => { while (q.length) await checkPage(q.shift()); }));

// comprobar imágenes únicas (HEAD)
console.error(`Comprobando ${imageSet.size} imágenes únicas...`);
const images = [...imageSet];
const missingImages = [];
let qi = [...images];
async function checkImg() {
  while (qi.length) {
    const p = qi.shift();
    const r = await get(ORIGIN + p);
    if (r.status !== 200) missingImages.push(`${r.status} ${p}`);
  }
}
await Promise.all(Array.from({ length: CONC }, checkImg));

const rep = (title, arr, n = 25) => {
  console.log(`\n=== ${title}: ${arr.length} ===`);
  for (const x of arr.slice(0, n)) console.log("  " + (typeof x === "string" ? x : JSON.stringify(x)));
  if (arr.length > n) console.log(`  ... (+${arr.length - n} más)`);
};
console.log("\n========== RESUMEN QA ==========");
console.log(`Páginas:            ${targets.length}`);
console.log(`Estado != 200:      ${badStatus.length}`);
console.log(`Título distinto:    ${titleDiff.length}`);
console.log(`Enlaces internos rotos (únicos): ${brokenLinks.size}`);
console.log(`Imágenes que faltan: ${missingImages.length} de ${images.length}`);
console.log(`Páginas con restos WP: ${artifacts.length}`);
console.log(`Páginas finas:      ${thin.length}`);
rep("ESTADO != 200", badStatus);
rep("TÍTULO DISTINTO", titleDiff.map((d) => `${d.path}\n     got:  ${d.got}\n     want: ${d.want}`));
rep("ENLACES INTERNOS ROTOS", [...brokenLinks.entries()].sort((a, b) => b[1] - a[1]).map(([p, c]) => `${p}  (${c} veces)`));
rep("IMÁGENES QUE FALTAN", missingImages);
rep("RESTOS DE WORDPRESS", artifacts);
rep("PÁGINAS FINAS", thin);
