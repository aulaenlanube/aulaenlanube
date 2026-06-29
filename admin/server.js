require("dotenv").config({ path: __dirname + "/.env.local" });
const express = require("express");
const cookieSession = require("cookie-session");
const crypto = require("crypto");
const { spawn } = require("child_process");
const path = require("path");
const pool = require("./db");

const PROJECT_DIR = path.join(__dirname, "..");
const app = express();
app.use(express.urlencoded({ extended: true, limit: "8mb" }));
app.use("/tinymce", express.static(path.join(__dirname, "node_modules", "tinymce")));
app.use(
  cookieSession({
    name: "aeln_admin",
    secret: process.env.SESSION_SECRET || "dev-secret",
    maxAge: 8 * 60 * 60 * 1000,
    sameSite: "lax",
    httpOnly: true,
  })
);

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

const esc = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function layout(title, body, head = "") {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} · Admin</title>
<style>
 *{box-sizing:border-box}
 body{font-family:system-ui,-apple-system,sans-serif;margin:0;background:#f4f4f5;color:#18181b}
 header{background:#18181b;color:#fff;padding:12px 20px;display:flex;justify-content:space-between;align-items:center}
 header nav{display:flex;align-items:center;gap:14px}
 header a{color:#fff;text-decoration:none}
 .wrap{max-width:980px;margin:0 auto;padding:20px}
 table{width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden}
 th,td{text-align:left;padding:9px 11px;border-bottom:1px solid #e4e4e7;font-size:14px;vertical-align:top}
 tr:hover td{background:#fafafa}
 .tag{font-size:11px;padding:2px 7px;border-radius:4px;background:#e4e4e7;text-transform:uppercase;letter-spacing:.03em}
 input,textarea,select{width:100%;padding:8px;border:1px solid #d4d4d8;border-radius:6px;font:inherit;background:#fff}
 textarea{font-family:ui-monospace,monospace;font-size:13px}
 label{display:block;margin:14px 0 4px;font-size:13px;font-weight:600;color:#52525b}
 .btn{display:inline-block;background:#2563eb;color:#fff;border:0;padding:9px 16px;border-radius:6px;font:inherit;cursor:pointer;text-decoration:none}
 .btn.gray{background:#52525b}.btn.green{background:#16a34a}.btn.red{background:#dc2626}
 .row{display:flex;gap:12px;flex-wrap:wrap}.row>div{flex:1;min-width:200px}
 .muted{color:#71717a;font-size:13px}
 .card{background:#fff;border-radius:8px;padding:18px}
 a{color:#2563eb}
 h2{margin:.2em 0 .6em}
</style>${head}</head><body>${body}</body></html>`;
}

function chrome(inner) {
  return `<header><strong>Aula en la nube · Admin</strong>
  <nav><a href="/">Contenido</a><a href="/products">Productos</a><a href="/new">+ Nuevo</a>
  <form action="/publish" method="post" style="margin:0"><button class="btn green" style="padding:5px 12px">Publicar</button></form>
  <a href="/logout">Salir</a></nav></header><div class="wrap">${inner}</div>`;
}

const TINY = `<script src="/tinymce/tinymce.min.js"></script>
<script>
window.addEventListener('DOMContentLoaded',function(){
  tinymce.init({
    selector:'#body', license_key:'gpl', promotion:false, branding:false, height:480,
    menubar:'edit insert format table', convert_urls:false,
    plugins:'lists link image code table autolink',
    toolbar:'undo redo | blocks | bold italic | bullist numlist | link image table | code'
  });
});
</script>`;

function authed(req) { return req.session && req.session.ok; }
app.use((req, res, next) => {
  if (req.path === "/login" || authed(req)) return next();
  if (req.method === "GET") return res.redirect("/login");
  return res.status(401).send("No autorizado");
});

app.get("/login", (req, res) => {
  res.send(layout("Entrar", `<div class="wrap"><div class="card" style="max-width:360px;margin:60px auto">
    <h2>Entrar</h2>
    <form method="post" action="/login">
      <label>Contraseña de administrador</label>
      <input type="password" name="password" autofocus>
      <br><br><button class="btn">Entrar</button>
    </form>
    ${req.query.e ? '<p class="muted" style="color:#dc2626">Contraseña incorrecta</p>' : ""}
    </div></div>`));
});
app.post("/login", (req, res) => {
  const p = String(req.body.password || "");
  let ok = false;
  if (ADMIN_PASSWORD && p.length === ADMIN_PASSWORD.length)
    ok = crypto.timingSafeEqual(Buffer.from(p), Buffer.from(ADMIN_PASSWORD));
  ok ? ((req.session.ok = true), res.redirect("/")) : res.redirect("/login?e=1");
});
app.get("/logout", (req, res) => { req.session = null; res.redirect("/login"); });

app.get("/", async (req, res) => {
  const type = req.query.type || "", q = req.query.q || "";
  const where = [], args = [];
  if (type) { where.push("type=?"); args.push(type); }
  if (q) { where.push("(title LIKE ? OR slug LIKE ?)"); args.push("%" + q + "%", "%" + q + "%"); }
  const sql = "SELECT id,type,slug,title,status,path FROM app_content " +
    (where.length ? "WHERE " + where.join(" AND ") + " " : "") +
    "ORDER BY updated_at DESC, id DESC LIMIT 300";
  const [rows] = await pool.query(sql, args);
  const opts = ["lesson", "post", "page"].map((t) => `<option ${t === type ? "selected" : ""}>${t}</option>`).join("");
  const filterBar = `<form method="get" style="margin-bottom:14px;display:flex;gap:8px">
    <select name="type" style="max-width:160px"><option value="">Todos los tipos</option>${opts}</select>
    <input name="q" placeholder="Buscar título o slug…" value="${esc(q)}">
    <button class="btn gray">Filtrar</button></form>`;
  const trs = rows.map((r) =>
    `<tr><td><span class="tag">${esc(r.type)}</span></td>
     <td><a href="/edit/${r.id}">${esc(r.title)}</a><div class="muted">${esc(r.path)}</div></td>
     <td>${r.status === "draft" ? '<span class="tag" style="background:#fde68a">borrador</span>' : esc(r.status)}</td></tr>`
  ).join("");
  res.send(layout("Contenido", chrome(
    `<div style="display:flex;justify-content:space-between;align-items:center"><h2>Contenido (${rows.length}${rows.length === 300 ? "+" : ""})</h2><a class="btn" href="/new">+ Nuevo</a></div>
     ${filterBar}<table><thead><tr><th>Tipo</th><th>Título / URL</th><th>Estado</th></tr></thead><tbody>${trs}</tbody></table>`
  )));
});

function contentForm(r, action, isNew) {
  return `<form method="post" action="${action}">
    <div class="row">
      <div><label>Tipo</label><select name="type">
        ${["lesson", "post", "page"].map((t) => `<option ${r.type === t ? "selected" : ""}>${t}</option>`).join("")}
      </select></div>
      <div><label>Estado</label><select name="status">
        <option ${r.status === "publish" ? "selected" : ""}>publish</option>
        <option ${r.status === "draft" ? "selected" : ""}>draft</option>
      </select></div>
    </div>
    <label>Título</label><input name="title" value="${esc(r.title)}" required>
    <div class="row">
      <div><label>Slug</label><input name="slug" value="${esc(r.slug)}" required></div>
      <div><label>URL completa (path, con / final)</label><input name="path" value="${esc(r.path)}" placeholder="/mi-slug/" required></div>
    </div>
    <label>SEO title (etiqueta &lt;title&gt;)</label><input name="seo_title" value="${esc(r.seo_title)}">
    <label>SEO description</label><input name="seo_desc" value="${esc(r.seo_desc)}">
    <label>Video ID de YouTube (solo lecciones)</label><input name="video_id" value="${esc(r.video_id)}" placeholder="dQw4w9WgXcQ">
    <label>Contenido</label><textarea id="body" name="body" rows="16">${esc(r.body)}</textarea>
    <br><br><button class="btn">${isNew ? "Crear" : "Guardar cambios"}</button>
    ${isNew ? "" : `<a class="btn gray" href="https://aulaenlanube.com/preview-next${esc(r.path)}" target="_blank" rel="noopener">Ver en staging</a>`}
  </form>`;
}

app.get("/new", (req, res) => {
  const r = { type: "post", status: "draft", title: "", slug: "", path: "", seo_title: "", seo_desc: "", video_id: "", body: "" };
  res.send(layout("Nuevo", chrome(`<a href="/">← Volver</a><h2>Nuevo contenido</h2>${contentForm(r, "/new", true)}`), TINY));
});

app.post("/new", async (req, res) => {
  const b = req.body;
  const slug = (b.slug || "").trim();
  const pathv = (b.path || "").trim() || "/" + slug + "/";
  const [[{ m }]] = await pool.query("SELECT COALESCE(MAX(id),0)+1 AS m FROM app_content");
  await pool.query(
    "INSERT INTO app_content (id,type,slug,path,parent_id,menu_order,title,seo_title,seo_desc,video_id,body,status,published_at,updated_at) VALUES (?,?,?,?,0,0,?,?,?,?,?,?,NOW(),NOW())",
    [m, b.type, slug, pathv, b.title, b.seo_title || b.title + " – Aula en la nube", b.seo_desc, b.video_id || null, b.body, b.status]
  );
  res.redirect("/edit/" + m + "?s=1");
});

app.get("/edit/:id", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM app_content WHERE id=?", [req.params.id]);
  if (!rows.length) return res.status(404).send("No existe");
  const r = rows[0];
  res.send(layout("Editar", chrome(
    `<a href="/">← Volver al listado</a>
     <div style="display:flex;justify-content:space-between;align-items:center">
       <h2>Editar <span class="tag">${esc(r.type)}</span></h2>
       <form method="post" action="/delete/${r.id}" onsubmit="return confirm('¿Borrar definitivamente este contenido?')">
         <button class="btn red" style="padding:6px 12px">Borrar</button>
       </form>
     </div>
     ${req.query.s ? '<p class="muted" style="color:#16a34a">Guardado ✓ (pulsa Publicar para regenerar el sitio)</p>' : ""}
     ${contentForm(r, "/edit/" + r.id, false)}`
  ), TINY));
});

app.post("/edit/:id", async (req, res) => {
  const b = req.body;
  await pool.query(
    "UPDATE app_content SET type=?,title=?,slug=?,path=?,seo_title=?,seo_desc=?,video_id=?,status=?,body=?,updated_at=NOW() WHERE id=?",
    [b.type, b.title, b.slug, b.path, b.seo_title, b.seo_desc, b.video_id || null, b.status, b.body, req.params.id]
  );
  res.redirect("/edit/" + req.params.id + "?s=1");
});

app.post("/delete/:id", async (req, res) => {
  await pool.query("DELETE FROM app_content WHERE id=?", [req.params.id]);
  res.redirect("/");
});

/* ---------- Productos (bloques que sustituyen a la publicidad) ---------- */
function productForm(p, action, isNew) {
  return `<form method="post" action="${action}">
    <label>Nombre</label><input name="name" value="${esc(p.name)}" required>
    <label>URL (enlace)</label><input name="url" value="${esc(p.url)}" placeholder="https://..." required>
    <label>Imagen (URL, opcional)</label><input name="image" value="${esc(p.image)}">
    <label>Descripción</label><input name="description" value="${esc(p.description)}">
    <div class="row">
      <div><label>Texto del botón (CTA)</label><input name="cta" value="${esc(p.cta)}" placeholder="Ver más"></div>
      <div><label>Etiqueta (badge, opcional)</label><input name="badge" value="${esc(p.badge)}"></div>
    </div>
    <div class="row">
      <div><label>Orden</label><input name="sort" type="number" value="${esc(p.sort == null ? 0 : p.sort)}"></div>
      <div><label>Activo</label><select name="active">
        <option value="1" ${String(p.active) !== "0" ? "selected" : ""}>Sí</option>
        <option value="0" ${String(p.active) === "0" ? "selected" : ""}>No</option>
      </select></div>
    </div>
    <br><button class="btn">${isNew ? "Crear producto" : "Guardar"}</button>
  </form>`;
}

app.get("/products", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM app_products ORDER BY sort, id");
  const trs = rows.map((p) =>
    `<tr><td><a href="/products/edit/${p.id}">${esc(p.name)}</a><div class="muted">${esc(p.url)}</div></td>
     <td>${p.active ? "Sí" : "No"}</td><td>${esc(p.sort)}</td></tr>`).join("");
  res.send(layout("Productos", chrome(
    `<div style="display:flex;justify-content:space-between;align-items:center"><h2>Productos (${rows.length})</h2><a class="btn" href="/products/new">+ Nuevo producto</a></div>
     <p class="muted">Estos bloques sustituyen a la publicidad: aparecen en lecciones, artículos y la home.</p>
     <table><thead><tr><th>Producto</th><th>Activo</th><th>Orden</th></tr></thead><tbody>${trs}</tbody></table>`
  )));
});
app.get("/products/new", (req, res) => {
  res.send(layout("Nuevo producto", chrome(
    `<a href="/products">← Volver</a><h2>Nuevo producto</h2>${productForm({ name: "", url: "", image: "", description: "", cta: "", badge: "", sort: 0, active: 1 }, "/products/new", true)}`
  )));
});
app.post("/products/new", async (req, res) => {
  const b = req.body;
  await pool.query(
    "INSERT INTO app_products (name,url,image,description,cta,badge,active,sort) VALUES (?,?,?,?,?,?,?,?)",
    [b.name, b.url, b.image, b.description, b.cta || "Ver más", b.badge, b.active === "0" ? 0 : 1, Number(b.sort) || 0]
  );
  res.redirect("/products");
});
app.get("/products/edit/:id", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM app_products WHERE id=?", [req.params.id]);
  if (!rows.length) return res.status(404).send("No existe");
  const p = rows[0];
  res.send(layout("Editar producto", chrome(
    `<a href="/products">← Volver</a>
     <div style="display:flex;justify-content:space-between;align-items:center"><h2>Editar producto</h2>
       <form method="post" action="/products/delete/${p.id}" onsubmit="return confirm('¿Borrar este producto?')"><button class="btn red" style="padding:6px 12px">Borrar</button></form>
     </div>${productForm(p, "/products/edit/" + p.id, false)}`
  )));
});
app.post("/products/edit/:id", async (req, res) => {
  const b = req.body;
  await pool.query(
    "UPDATE app_products SET name=?,url=?,image=?,description=?,cta=?,badge=?,active=?,sort=? WHERE id=?",
    [b.name, b.url, b.image, b.description, b.cta || "Ver más", b.badge, b.active === "0" ? 0 : 1, Number(b.sort) || 0, req.params.id]
  );
  res.redirect("/products");
});
app.post("/products/delete/:id", async (req, res) => {
  await pool.query("DELETE FROM app_products WHERE id=?", [req.params.id]);
  res.redirect("/products");
});

app.post("/publish", (req, res) => {
  const child = spawn("bash", ["tools/publish.sh"], { cwd: PROJECT_DIR, env: { ...process.env, MSYS_NO_PATHCONV: "1" } });
  let out = "";
  child.stdout.on("data", (d) => (out += d.toString()));
  child.stderr.on("data", (d) => (out += d.toString()));
  child.on("error", (e) => (out += "\nERROR al lanzar bash: " + e.message));
  child.on("close", (code) => {
    const okMsg = code === 0 ? "✅ Publicado" : "❌ Falló (código " + code + ")";
    res.send(layout("Publicar", chrome(
      `<h2>Publicar — ${okMsg}</h2>
       <p class="muted">MySQL → JSON → build estático → despliegue a staging.</p>
       <pre style="background:#18181b;color:#e4e4e7;padding:14px;border-radius:8px;overflow:auto;font-size:12px;white-space:pre-wrap;max-height:420px">${esc(out) || "(sin salida)"}</pre>
       <a class="btn" href="https://aulaenlanube.com/preview-next/" target="_blank" rel="noopener">Ver staging</a>
       <a class="btn gray" href="/">Volver</a>`
    )));
  });
});

const PORT = process.env.PORT || 4399;
app.listen(PORT, "127.0.0.1", () => console.log("Admin en http://127.0.0.1:" + PORT));
