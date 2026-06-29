// Vuelca app_content (MySQL, solo status=publish) a los JSON que consume el build.
// Requiere DB_* en el entorno y el túnel SSH abierto (127.0.0.1:3307).
// Uso: node tools/db-to-json.mjs
import fs from "node:fs";
import mysql from "mysql2/promise";

const SITE = "https://aulaenlanube.com";
const DATA = "tools/data";

const conn = await mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3307),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dateStrings: true,
  charset: "utf8mb4",
});

const [rows] = await conn.query("SELECT * FROM app_content WHERE status='publish' ORDER BY id");
await conn.end();

const lessons = [], posts = [], landings = [], heads = [];
for (const r of rows) {
  heads.push({
    path: r.path,
    title: r.seo_title || r.title,
    description: r.seo_desc || "",
    canonical: SITE + r.path,
  });
  if (r.type === "lesson") {
    lessons.push({
      id: r.id, slug: r.slug, path: r.path, title: r.title,
      videoId: r.video_id || "", videoUrl: r.video_id ? "https://youtu.be/" + r.video_id : "",
      desc: r.body || "", parent: r.parent_id || 0, menuOrder: r.menu_order || 0,
      date: r.published_at || "", family: (r.slug || "").split("-").slice(0, 2).join("-"),
      yoastTitle: "", yoastDesc: r.seo_desc || "", thumb: r.og_image || "",
    });
  } else if (r.type === "post") {
    posts.push({
      id: r.id, slug: r.slug, path: r.path, title: r.title,
      date: r.published_at || "", modified: r.updated_at || "",
      parent: r.parent_id || 0, menuOrder: r.menu_order || 0,
      content: r.body || "", contentLen: (r.body || "").length,
      yoastTitle: "", yoastDesc: r.seo_desc || "", thumb: r.og_image || "", categories: [],
    });
  } else {
    landings.push({
      id: r.id, slug: r.slug, path: r.path, title: r.title,
      date: r.published_at || "", parent: r.parent_id || 0, menuOrder: r.menu_order || 0,
      content: r.body || "", contentLen: (r.body || "").length,
      elementorTexts: [], elementorHeadings: [], elementorImages: [], elemLen: 0, hasVideoWidget: false,
      yoastTitle: "", yoastDesc: r.seo_desc || "", thumb: r.og_image || "",
    });
  }
}

fs.writeFileSync(DATA + "/lessons.json", JSON.stringify(lessons));
fs.writeFileSync(DATA + "/posts.json", JSON.stringify(posts));
fs.writeFileSync(DATA + "/landings.json", JSON.stringify(landings));
fs.writeFileSync(DATA + "/head.json", JSON.stringify(heads));

console.log(`Regenerado desde MySQL: ${lessons.length} lecciones, ${posts.length} posts, ${landings.length} páginas (${heads.length} head).`);
