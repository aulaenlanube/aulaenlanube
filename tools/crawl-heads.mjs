// Crawl del <head> real de las URLs vivas de aulaenlanube.com.
// Captura la "verdad SEO": title, description, canonical, robots, OG, JSON-LD,
// estado HTTP y redirecciones. Solo lectura (GET), concurrencia educada.
// Uso: node tools/crawl-heads.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(__dirname, 'data');
const ORIGIN = 'https://aulaenlanube.com';
const CONCURRENCY = 5;
const TIMEOUT_MS = 20000;
const RETRIES = 2;
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const read = (f) => JSON.parse(fs.readFileSync(path.join(DATA, f), 'utf8'));
const lessons = read('lessons.json');
const posts = read('posts.json');
const landings = read('landings.json');

const targets = [
  ...lessons.map((x) => ({ kind: 'lesson', id: x.id, path: x.path })),
  ...posts.map((x) => ({ kind: 'post', id: x.id, path: x.path })),
  ...landings.map((x) => ({ kind: 'landing', id: x.id, path: x.path })),
];
// home
if (!targets.find((t) => t.path === '/')) targets.unshift({ kind: 'home', id: 0, path: '/' });

function pick(re, html, g = 1) {
  const m = re.exec(html);
  return m ? m[g].trim() : '';
}
function metaContent(html, attr, val) {
  const re = new RegExp(
    `<meta[^>]*\\b${attr}\\s*=\\s*["']${val}["'][^>]*>`,
    'i'
  );
  const tag = pick(re, html, 0);
  if (!tag) return '';
  return pick(/\bcontent\s*=\s*["']([\s\S]*?)["']/i, tag);
}
function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&hellip;/g, '…')
    .replace(/&nbsp;/g, ' ');
}

function parseHead(html) {
  const headMatch = /<head[\s\S]*?<\/head>/i.exec(html);
  const head = headMatch ? headMatch[0] : html.slice(0, 60000);

  const title = decodeEntities(pick(/<title[^>]*>([\s\S]*?)<\/title>/i, head));
  const description = decodeEntities(metaContent(head, 'name', 'description'));
  const robots = metaContent(head, 'name', 'robots');
  const canonicalTag = pick(/<link[^>]*rel=["']canonical["'][^>]*>/i, head, 0);
  const canonical = canonicalTag ? pick(/href\s*=\s*["']([^"']+)["']/i, canonicalTag) : '';

  const ogTitle = decodeEntities(metaContent(head, 'property', 'og:title'));
  const ogDescription = decodeEntities(metaContent(head, 'property', 'og:description'));
  const ogImage = metaContent(head, 'property', 'og:image');
  const ogType = metaContent(head, 'property', 'og:type');

  // primer h1 del body
  const h1 = decodeEntities(pick(/<h1[^>]*>([\s\S]*?)<\/h1>/i, html).replace(/<[^>]+>/g, ''));

  // JSON-LD
  const ld = [];
  const ldRe = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = ldRe.exec(html))) {
    const raw = m[1].trim();
    let types = [];
    try {
      const obj = JSON.parse(raw);
      const graph = obj['@graph'] || (Array.isArray(obj) ? obj : [obj]);
      types = graph.map((g) => g && g['@type']).filter(Boolean).flat();
    } catch { /* ignore parse errors */ }
    ld.push({ types });
  }

  return { title, description, robots, canonical, ogTitle, ogDescription, ogImage, ogType, h1, jsonld: ld };
}

async function fetchWithRetry(url) {
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        redirect: 'follow',
        signal: ctrl.signal,
        headers: { 'User-Agent': UA, Accept: 'text/html' },
      });
      const html = await res.text();
      clearTimeout(t);
      return { status: res.status, finalUrl: res.url, html };
    } catch (e) {
      clearTimeout(t);
      if (attempt === RETRIES) return { status: 0, finalUrl: url, html: '', error: String(e) };
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
    }
  }
}

const results = [];
let done = 0;
async function worker(queue) {
  while (queue.length) {
    const tgt = queue.shift();
    const url = ORIGIN + tgt.path;
    const r = await fetchWithRetry(url);
    const head = r.html ? parseHead(r.html) : {};
    const finalPath = (() => { try { return new URL(r.finalUrl).pathname; } catch { return r.finalUrl; } })();
    results.push({
      ...tgt,
      requestedUrl: url,
      status: r.status,
      finalPath,
      redirected: finalPath !== tgt.path,
      error: r.error || '',
      ...head,
    });
    done++;
    if (done % 50 === 0) console.error(`  ...${done}/${targets.length}`);
  }
}

console.error(`Crawling ${targets.length} URLs (concurrency ${CONCURRENCY})...`);
const queue = [...targets];
await Promise.all(Array.from({ length: CONCURRENCY }, () => worker(queue)));

results.sort((a, b) => a.path.localeCompare(b.path));
fs.writeFileSync(path.join(DATA, 'head.json'), JSON.stringify(results, null, 2));

// --- resumen ---
const ok = results.filter((r) => r.status === 200);
const non200 = results.filter((r) => r.status !== 200);
const redirected = results.filter((r) => r.redirected && r.status >= 200 && r.status < 400);
const noindex = results.filter((r) => /noindex/i.test(r.robots || ''));
const noDesc = ok.filter((r) => !r.description);
const noCanon = ok.filter((r) => !r.canonical);
const ldTypes = {};
for (const r of results) for (const l of r.jsonld || []) for (const t of l.types || []) ldTypes[t] = (ldTypes[t] || 0) + 1;

console.log('\n===== RESUMEN CRAWL =====');
console.log('Total:            ', results.length);
console.log('HTTP 200:         ', ok.length);
console.log('No 200:           ', non200.length);
console.log('Redirigidas:      ', redirected.length);
console.log('noindex:          ', noindex.length);
console.log('Sin description:  ', noDesc.length);
console.log('Sin canonical:    ', noCanon.length);
console.log('\nTipos JSON-LD encontrados:');
for (const [t, c] of Object.entries(ldTypes).sort((a, b) => b[1] - a[1])) console.log('  ', String(c).padStart(4), t);
if (non200.length) {
  console.log('\nURLs NO 200 (primeras 20):');
  for (const r of non200.slice(0, 20)) console.log('  ', r.status, r.path, r.error);
}
if (redirected.length) {
  console.log('\nREDIRECCIONES (primeras 20):');
  for (const r of redirected.slice(0, 20)) console.log('  ', r.path, '->', r.finalPath);
}
console.log('\nEjemplos de title real:');
for (const r of ok.slice(0, 5)) console.log('  ', JSON.stringify(r.title), '|', r.path);
console.log('\nEscrito: tools/data/head.json');
