// Valida el staging vivo: muestrea URLs, comprueba HTTP 200 y que el <title>
// servido coincide con la verdad SEO (head.json). Uso: node tools/verify-staging.mjs
import fs from "node:fs";

const BASE = "https://aulaenlanube.com/preview-next";
const CONC = 5;
const heads = JSON.parse(fs.readFileSync("tools/data/head.json", "utf8"));

function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/\s+/g, " ").trim();
}

// muestra: 1 de cada 7 + casos límite garantizados
const edge = heads.filter((h) => /%[0-9a-f]{2}/i.test(h.path) || /collection-map/.test(h.path) || h.path === "/");
const sample = heads.filter((_, i) => i % 7 === 0);
const seen = new Set();
const targets = [...edge, ...sample].filter((h) => (seen.has(h.path) ? false : (seen.add(h.path), true)));

let ok = 0, diff = 0, bad = 0;
const problems = [];

async function one(h) {
  try {
    const res = await fetch(BASE + h.path, { headers: { "User-Agent": "verify" } });
    const html = await res.text();
    const title = decode((/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html) || [, ""])[1]);
    const want = decode(h.title);
    if (res.status !== 200) { bad++; problems.push(`HTTP ${res.status}  ${h.path}`); }
    else if (title !== want) { diff++; problems.push(`DIFF  ${h.path}\n   got:  ${title}\n   want: ${want}`); }
    else ok++;
  } catch (e) {
    bad++; problems.push(`ERR  ${h.path}  ${String(e)}`);
  }
}

const q = [...targets];
async function worker() { while (q.length) await one(q.shift()); }
await Promise.all(Array.from({ length: CONC }, worker));

console.log(`Muestra de ${targets.length} URLs sobre ${heads.length} totales`);
console.log(`OK: ${ok}  DIFF: ${diff}  404/err: ${bad}`);
if (problems.length) { console.log("\nProblemas:"); for (const p of problems.slice(0, 30)) console.log(" ", p); }
else console.log("\n✓ Todas las URLs muestreadas: 200 + título exacto.");
