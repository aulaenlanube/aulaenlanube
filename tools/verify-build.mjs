// Verifica el export estático (out/) contra la verdad SEO (head.json):
// title exacto, canonical, presencia de description/OG.
// Uso: node tools/verify-build.mjs
import fs from "node:fs";

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = dir + "/" + e.name;
    if (e.isDirectory()) walk(p, acc);
    else if (e.name === "index.html") acc.push(p);
  }
  return acc;
}

function pick(re, html) {
  const m = re.exec(html);
  return m ? m[1].trim() : "";
}

function decodeHtml(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&raquo;/g, "»")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#0?39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/\s+/g, " ")
    .trim();
}

function normPath(p) {
  return p
    .split("/")
    .map((s) => {
      let c = s;
      for (let i = 0; i < 4; i++) {
        try { const d = decodeURIComponent(c); if (d === c) break; c = d; } catch { break; }
      }
      return c;
    })
    .join("/");
}

const heads = JSON.parse(fs.readFileSync("tools/data/head.json", "utf8"));
const byPath = new Map(heads.map((h) => [normPath(h.path), h]));

const files = walk("out").sort();
let ok = 0;
let diff = 0;
let nolive = 0;

for (const f of files) {
  const route = "/" + f.replace(/^out\//, "").replace(/index\.html$/, "");
  if (route.startsWith("/404/") || route.startsWith("/_not-found/")) continue;

  const html = fs.readFileSync(f, "utf8");
  const title = decodeHtml(pick(/<title[^>]*>([\s\S]*?)<\/title>/i, html));
  const canonical = pick(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i, html);
  const hasOg = /property="og:title"/i.test(html);
  const hasDesc = /name="description"/i.test(html);

  const live = byPath.get(normPath(route));
  const liveTitle = live ? decodeHtml(live.title) : null;
  let status;
  if (!live) {
    status = "NO-LIVE";
    nolive++;
  } else if (title === liveTitle) {
    status = "OK   ";
    ok++;
  } else {
    status = "DIFF ";
    diff++;
  }

  console.log(`${status} ${route}`);
  console.log(`      title: ${JSON.stringify(title)}`);
  if (live && title !== liveTitle) console.log(`      live : ${JSON.stringify(liveTitle)}`);
  console.log(`      canonical=${canonical}  og=${hasOg ? "yes" : "NO"}  desc=${hasDesc ? "yes" : "NO"}`);
}

console.log(`\n=== ${ok} OK, ${diff} DIFF, ${nolive} sin-live (home/etc) — ${files.length} archivos ===`);
