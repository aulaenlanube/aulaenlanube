// Clasifica y extrae el contenido volcado de WordPress (content.jsonl)
// en datos limpios: lessons / posts / landings, listo para migrar a app_*.
// Uso: node tools/classify.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(__dirname, 'data');

const lines = fs.readFileSync(path.join(DATA, 'content.jsonl'), 'utf8')
  .split('\n').filter(Boolean);
const items = lines.map((l) => JSON.parse(l));

// --- helpers Elementor ---
function walk(nodes, cb) {
  for (const n of nodes || []) {
    cb(n);
    if (n.elements) walk(n.elements, cb);
  }
}

function youtubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{11})/
  );
  return m ? m[1] : null;
}

// Ruta relativa real (permalink) -> pathname con barras inicial/final
function toPath(permalink) {
  if (!permalink) return null;
  try {
    const u = new URL(permalink);
    return u.pathname;
  } catch {
    return permalink;
  }
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function extractFromElementor(jsonStr) {
  const res = { video: null, texts: [], headings: [], widgets: {}, images: [], bodyHtml: '' };
  let data;
  try { data = JSON.parse(jsonStr || '[]'); } catch { return res; }
  const parts = [];
  walk(data, (n) => {
    if (n.elType !== 'widget') return;
    const wt = n.widgetType || 'unknown';
    res.widgets[wt] = (res.widgets[wt] || 0) + 1;
    const s = n.settings || {};
    if (wt === 'video') {
      const u = s.youtube_url || s.youtube || s.link || '';
      if (u && !res.video) res.video = u;
    } else if (wt === 'text-editor' && s.editor) {
      res.texts.push(s.editor);
      parts.push(s.editor);
    } else if (wt === 'heading' && s.title) {
      res.headings.push(s.title);
      parts.push(`<h2>${escHtml(s.title)}</h2>`);
    } else if (wt === 'image' && s.image && s.image.url) {
      res.images.push(s.image.url);
      parts.push(`<figure><img src="${s.image.url}" alt="${escHtml(s.image.alt || '')}" loading="lazy" /></figure>`);
    }
  });
  res.bodyHtml = parts.join('\n');
  return res;
}

// --- clasificacion ---
const lessons = [];
const posts = [];
const landings = [];
const anomalies = [];
const widgetTotals = {};
const families = {};

for (const it of items) {
  if (it.type === 'post') {
    posts.push({
      id: it.id, slug: it.slug, path: toPath(it.permalink),
      title: it.title, date: it.date, modified: it.modified,
      parent: it.parent, menuOrder: it.menu_order,
      content: it.content || '', contentLen: (it.content || '').length,
      yoastTitle: it.yoast_title || '', yoastDesc: it.yoast_desc || '',
      thumb: it.thumb_url || '', categories: it.categories || [],
    });
    continue;
  }

  // pages
  const ex = extractFromElementor(it.elementor);
  for (const [k, v] of Object.entries(ex.widgets)) {
    widgetTotals[k] = (widgetTotals[k] || 0) + v;
  }
  const vid = youtubeId(ex.video);

  if (vid) {
    const family = it.slug.split('-').slice(0, 2).join('-');
    families[family] = (families[family] || 0) + 1;
    lessons.push({
      id: it.id, slug: it.slug, path: toPath(it.permalink),
      title: it.title, videoId: vid,
      videoUrl: ex.video, desc: (ex.bodyHtml || '').trim(),
      parent: it.parent, menuOrder: it.menu_order, date: it.date,
      family, yoastTitle: it.yoast_title || '', yoastDesc: it.yoast_desc || '',
      thumb: it.thumb_url || '',
    });
  } else {
    landings.push({
      id: it.id, slug: it.slug, path: toPath(it.permalink),
      title: it.title, date: it.date,
      parent: it.parent, menuOrder: it.menu_order,
      content: it.content || '', contentLen: (it.content || '').length,
      elementorTexts: ex.texts, elementorHeadings: ex.headings, elementorImages: ex.images,
      elemLen: (it.elementor || '').length,
      hasVideoWidget: !!ex.widgets.video,
      topWidgets: Object.entries(ex.widgets).sort((a, b) => b[1] - a[1]).slice(0, 5),
      yoastTitle: it.yoast_title || '', yoastDesc: it.yoast_desc || '',
      thumb: it.thumb_url || '',
    });
    if ((it.content || '').length < 50 && (it.elementor || '').length < 1500) {
      anomalies.push({ id: it.id, slug: it.slug, title: it.title, reason: 'pagina fina sin video' });
    }
  }
}

// --- salida ---
fs.writeFileSync(path.join(DATA, 'lessons.json'), JSON.stringify(lessons, null, 2));
fs.writeFileSync(path.join(DATA, 'posts.json'), JSON.stringify(posts, null, 2));
fs.writeFileSync(path.join(DATA, 'landings.json'), JSON.stringify(landings, null, 2));

const familyList = Object.entries(families).sort((a, b) => b[1] - a[1]);
const lessonsNoDesc = lessons.filter((l) => !l.desc).length;
const lessonsNoYoast = lessons.filter((l) => !l.yoastTitle && !l.yoastDesc).length;

console.log('===== RESUMEN CLASIFICACION =====');
console.log('Total items:        ', items.length);
console.log('Posts (blog):       ', posts.length);
console.log('Lessons (video):    ', lessons.length);
console.log('Landings/otras:     ', landings.length);
console.log('Anomalias:          ', anomalies.length);
console.log('Lessons sin desc:   ', lessonsNoDesc);
console.log('Lessons sin yoast:  ', lessonsNoYoast);
console.log('\n===== FAMILIAS DE LECCIONES =====');
for (const [f, c] of familyList) console.log(String(c).padStart(4), f);
console.log('\n===== WIDGETS USADOS EN PAGINAS (total) =====');
for (const [w, c] of Object.entries(widgetTotals).sort((a, b) => b[1] - a[1])) {
  console.log(String(c).padStart(6), w);
}
console.log('\n===== LANDINGS / PAGINAS NO-LECCION (' + landings.length + ') =====');
for (const l of landings.sort((a, b) => b.contentLen - a.contentLen)) {
  console.log(`#${l.id} [${l.contentLen}c/${l.elemLen}e] ${l.slug}`);
}
console.log('\n===== MUESTRA 3 LECCIONES =====');
console.log(JSON.stringify(lessons.slice(0, 3), null, 2));
// --- analisis de rutas (profundidad de los permalinks) ---
const all = [...lessons, ...posts, ...landings];
const depth = {};
let noPath = 0;
for (const x of all) {
  if (!x.path) { noPath++; continue; }
  const d = x.path.split('/').filter(Boolean).length;
  depth[d] = (depth[d] || 0) + 1;
}
console.log('\n===== PROFUNDIDAD DE RUTAS (segmentos) =====');
for (const [d, c] of Object.entries(depth).sort((a, b) => a[0] - b[0])) {
  console.log('  ' + d + ' nivel(es): ' + c);
}
console.log('  sin path:', noPath);
console.log('\n===== MUESTRA DE RUTAS MAS PROFUNDAS =====');
for (const x of all.filter((a) => a.path).sort((a, b) => b.path.length - a.path.length).slice(0, 6)) {
  console.log('  ' + x.path);
}

console.log('\nArchivos escritos: lessons.json, posts.json, landings.json');
