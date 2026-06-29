// Construye tools/data/app_content.json: filas unificadas para la tabla app_content.
// Uso: node tools/build-app-content.mjs
import fs from "node:fs";
import path from "node:path";

const DATA = "tools/data";
const read = (f) => JSON.parse(fs.readFileSync(path.join(DATA, f), "utf8"));
const lessons = read("lessons.json");
const posts = read("posts.json");
const landings = read("landings.json");
const heads = read("head.json");

function decode(s) {
  return (s || "")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&hellip;/g, "…").replace(/&nbsp;/g, " ")
    .replace(/&raquo;/g, "»").replace(/&laquo;/g, "«");
}
const headByPath = new Map(heads.map((h) => [h.path, h]));
const strip = (s) => (s || "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const seoTitle = (p, t) => (headByPath.get(p) ? decode(headByPath.get(p).title) : `${t} – Aula en la nube`);
const dt = (d) => (d && /^\d{4}-\d{2}-\d{2}/.test(d) ? d : null);
const ytThumb = (id) => (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "");

const rows = [];
for (const l of lessons)
  rows.push({
    id: l.id, type: "lesson", slug: l.slug, path: l.path,
    parent_id: l.parent || 0, menu_order: l.menuOrder || 0, title: l.title,
    seo_title: seoTitle(l.path, l.title), seo_desc: l.yoastDesc || strip(l.desc).slice(0, 158),
    video_id: l.videoId || null, body: l.desc || "", excerpt: "",
    og_image: l.thumb || ytThumb(l.videoId), status: "publish",
    published_at: dt(l.date), updated_at: dt(l.date),
  });
for (const p of posts)
  rows.push({
    id: p.id, type: "post", slug: p.slug, path: p.path,
    parent_id: p.parent || 0, menu_order: p.menuOrder || 0, title: p.title,
    seo_title: seoTitle(p.path, p.title), seo_desc: p.yoastDesc || strip(p.content).slice(0, 158),
    video_id: null, body: p.content || "", excerpt: "",
    og_image: p.thumb || "", status: "publish",
    published_at: dt(p.date), updated_at: dt(p.modified || p.date),
  });
for (const l of landings)
  rows.push({
    id: l.id, type: "page", slug: l.slug, path: l.path,
    parent_id: l.parent || 0, menu_order: l.menuOrder || 0, title: l.title,
    seo_title: seoTitle(l.path, l.title), seo_desc: l.yoastDesc || strip(l.content).slice(0, 158),
    video_id: null, body: l.content || (l.elementorTexts || []).join("\n"), excerpt: "",
    og_image: l.thumb || "", status: "publish",
    published_at: dt(l.date), updated_at: dt(l.date),
  });

fs.writeFileSync("tools/data/app_content.json", JSON.stringify(rows));
const byType = rows.reduce((a, r) => ((a[r.type] = (a[r.type] || 0) + 1), a), {});
console.log("Filas:", rows.length, "| por tipo:", JSON.stringify(byType));
