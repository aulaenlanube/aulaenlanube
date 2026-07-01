// Verificador de disponibilidad de los enlaces de afiliado de Amazon.
//
// Recorre TODAS las fichas de producto (patrón <img>…<a href="amzn.to…">) de las
// landings, resuelve cada enlace corto, detecta si el producto sigue a la venta y
// escribe tools/data/unavailable-products.json con los que NO lo están. El build
// (lib/content.ts) lee ese fichero y marca esas fichas con "No disponible".
//
// Señales FIABLES (verificadas como estables entre peticiones):
//   · DISPONIBLE  -> la página tiene botón de compra / precio / opciones de compra.
//   · RETIRADO    -> Amazon responde 404 "Documento no encontrado" (producto borrado).
//   · AGOTADO     -> ficha viva pero sin ninguna vía de compra (doble confirmación).
// El literal "Actualmente no disponible" NO se usa: aparece en productos disponibles
// (carruseles, envíos…) y daba falsos positivos.
//
// Uso:  node tools/check-amazon.mjs            (comprueba y actualiza el JSON)
//       node tools/check-amazon.mjs --dry      (no escribe el JSON, solo informa)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const DATA = path.join(process.cwd(), "tools", "data");
const DRY = process.argv.includes("--dry");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const CARD_RE = /<img[^>]*\bsrc="([^"]+)"[^>]*>([\s\S]*?)<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;

// 1) Recolecta todas las fichas de afiliado de las landings (dedup por página+href).
const landings = JSON.parse(fs.readFileSync(path.join(DATA, "landings.json"), "utf8"));
const items = [];
for (const e of landings) {
  if (!e.content || !/amzn\.to|amazon\./i.test(e.content)) continue;
  CARD_RE.lastIndex = 0;
  let m;
  const seen = new Set();
  while ((m = CARD_RE.exec(e.content))) {
    const href = m[3];
    if (!/amzn\.to|amazon\./i.test(href)) continue;
    if (seen.has(href)) continue;
    seen.add(href);
    const title = m[2].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/^▷\s*/, "").trim();
    items.push({ page: e.path, href, title });
  }
}
console.error(`Fichas de afiliado a comprobar: ${items.length}`);

function fetchFollow(url, outFile) {
  const info = execFileSync("curl", [
    "-sL", "--compressed", "--max-time", "35", "-A", UA,
    "-H", "Accept-Language: es-ES,es;q=0.9", "-H", "Accept: text/html,application/xhtml+xml",
    "-o", outFile, "-w", "%{http_code}\t%{url_effective}", url,
  ], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  return info.trim();
}

function classify(body, status, finalUrl) {
  const asin = (finalUrl.match(/\/dp\/([A-Z0-9]{10})/) || finalUrl.match(/\/gp\/product\/([A-Z0-9]{10})/) || [])[1] || "";
  const title = (body.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ""])[1].replace(/\s+/g, " ").trim();
  const cart = body.includes("add-to-cart-button");
  const price = /class="a-offscreen">\s*[\d.,]+\s*€/.test(body) || body.includes("priceToPay") || body.includes('id="corePrice');
  const buyOptions = body.includes("Ver todas las opciones de compra") || body.includes("see-all-buying-choices");
  const purchasable = cart || price || buyOptions;
  const notFound = status === "404" || body.length < 5000 || !asin ||
    /^\s*Documento no encontrado\s*$/i.test(title) || /^\s*Amazon\.es\s*:?\s*$/i.test(title);
  const captcha = !notFound && (status === "503" || /validateCaptcha|Introduce los caracteres|Robot Check/i.test(body));
  let verdict;
  if (notFound) verdict = "RETIRADO";
  else if (captcha) verdict = "BLOQUEADO";
  else if (purchasable) verdict = "DISPONIBLE";
  else if (title) verdict = "AGOTADO";
  else verdict = "AMBIGUO";
  return { asin, title: title.slice(0, 60), verdict };
}

// 2) Comprueba cada enlace (con doble confirmación para agotados/bloqueos).
const RANK = { DISPONIBLE: 4, AGOTADO: 2, RETIRADO: 2, AMBIGUO: 1, BLOQUEADO: 0 };
const tmp = path.join(DATA, ".amz-body.tmp");
const results = [];
for (let i = 0; i < items.length; i++) {
  const it = items[i];
  let status = "", finalUrl = "", body = "";
  try { [status, finalUrl] = fetchFollow(it.href, tmp).split("\t"); body = fs.readFileSync(tmp, "utf8"); }
  catch { status = "ERR"; }
  let c = classify(body, status, finalUrl || "");
  if (["AGOTADO", "BLOQUEADO", "AMBIGUO"].includes(c.verdict) || status === "ERR") {
    await sleep(4000 + Math.floor(Math.random() * 3000));
    try {
      const [s2, u2] = fetchFollow(it.href, tmp).split("\t");
      const c2 = classify(fs.readFileSync(tmp, "utf8"), s2, u2 || "");
      if ((RANK[c2.verdict] ?? 0) > (RANK[c.verdict] ?? 0)) c = c2;
    } catch { /* mantiene el primer veredicto */ }
  }
  results.push({ ...it, ...c });
  console.error(`[${String(i + 1).padStart(3)}/${items.length}] ${c.verdict.padEnd(10)} ${it.title.slice(0, 30)}`);
  await sleep(500 + Math.floor(Math.random() * 700));
}
try { fs.unlinkSync(tmp); } catch {}

// 3) Escribe el JSON de no disponibles + informe por página.
const noDisp = results.filter((r) => r.verdict === "RETIRADO" || r.verdict === "AGOTADO");
const hrefs = [...new Set(noDisp.map((r) => r.href))];
const stamp = new Date().toISOString().slice(0, 10);
if (!DRY) {
  fs.writeFileSync(path.join(DATA, "unavailable-products.json"), JSON.stringify({
    generatedAt: stamp,
    note: "Enlaces de afiliado Amazon NO disponibles (RETIRADO=404 / AGOTADO=sin compra). Generado por tools/check-amazon.mjs. Se referencian por su URL amzn.to.",
    count: hrefs.length,
    hrefs,
  }, null, 2));
}
const count = (v) => results.filter((r) => r.verdict === v).length;
console.error(`\n===== RESUMEN =====`);
for (const v of ["DISPONIBLE", "AGOTADO", "RETIRADO", "BLOQUEADO", "AMBIGUO"]) console.error(`  ${v.padEnd(11)}: ${count(v)}`);
console.error(`\n${DRY ? "(dry-run, no se escribió el JSON) " : ""}No disponibles: ${hrefs.length}`);
const revisar = results.filter((r) => r.verdict === "BLOQUEADO" || r.verdict === "AMBIGUO");
if (revisar.length) {
  console.error("\nREVISAR MANUALMENTE (bloqueados/ambiguos, NO marcados):");
  for (const r of revisar) console.error(`  ${r.page} | ${r.title} | ${r.href}`);
}
