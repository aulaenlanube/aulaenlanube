// Paso 2 de la corrección asistida: clona cada repositorio entregado y recoge
// EVIDENCIAS objetivas para la rúbrica (historial git, estructura, HTML/CSS/JS,
// web publicada, consola y móvil en un navegador real).
//   node tools/campus/analizar-repos.mjs --entrega 1 [--solo usuario1,usuario2] [--sin-navegador]
// Lee   .campus-trabajo/entrega-<id>/entregas.json   (paso 1)
// Deja  .campus-trabajo/entrega-<id>/repos/<usuario>/          (clon)
//       .campus-trabajo/entrega-<id>/evidencias/<usuario>.json  (+ capturas .png)
//       .campus-trabajo/entrega-<id>/resumen.md
//       .campus-trabajo/entrega-<id>/propuestas.plantilla.json  (mínimos objetivos ya sugeridos)
// Las evidencias NO son la nota: son la base para que la IA (o el profesor)
// valore cada criterio leyendo además el código. Ver docs/campus.md.

import fs from "node:fs";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { arg, TRABAJO } from "./_bd.mjs";

const entregaId = Number(arg("entrega"));
if (!entregaId) {
  console.error("Uso: node tools/campus/analizar-repos.mjs --entrega <id> [--solo u1,u2] [--sin-navegador]");
  process.exit(1);
}
const DIR = path.join(TRABAJO, `entrega-${entregaId}`);
const datos = JSON.parse(fs.readFileSync(path.join(DIR, "entregas.json"), "utf8"));
const solo = arg("solo")?.split(",").map((s) => s.trim());
const envios = datos.envios.filter((e) => e.repo && (!solo || solo.includes(e.usuario)));
fs.mkdirSync(path.join(DIR, "repos"), { recursive: true });
fs.mkdirSync(path.join(DIR, "evidencias"), { recursive: true });

// ── utilidades ────────────────────────────────────────────────────────────────

const git = (cwd, ...a) => execFileSync("git", a, { cwd, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }).trim();
const cuenta = (txt, re) => (txt.match(re) || []).length;
const IMAGEN = /\.(png|jpe?g|gif|webp|avif|svg|ico)$/i;

function urlPages(repo) {
  const m = repo.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)$/);
  if (!m) return null;
  const [, d, r] = m;
  return r.toLowerCase() === `${d.toLowerCase()}.github.io` ? `https://${d.toLowerCase()}.github.io/` : `https://${d.toLowerCase()}.github.io/${r}/`;
}

function ghDisponible() {
  return spawnSync("gh", ["auth", "status"], { stdio: "ignore" }).status === 0;
}
const GH = ghDisponible();
function gh(ruta) {
  const r = spawnSync("gh", ["api", ruta], { encoding: "utf8" });
  if (r.status !== 0) return null;
  try {
    return JSON.parse(r.stdout);
  } catch {
    return null;
  }
}

async function cargarPlaywright() {
  if (process.argv.includes("--sin-navegador")) return null;
  const candidatos = ["playwright"];
  const bin = spawnSync("sh", ["-c", "command -v playwright"], { encoding: "utf8" }).stdout.trim();
  if (bin) candidatos.push(path.join(path.dirname(fs.realpathSync(bin)), "index.mjs"), path.join(path.dirname(bin), "..", "playwright", "index.mjs"));
  for (const c of candidatos) {
    try {
      const m = await import(c.startsWith("/") ? `file://${c}` : c);
      const chromium = m.chromium ?? m.default?.chromium;
      const ejecutable = ["/usr/bin/chromium", "/usr/bin/google-chrome-stable", "/usr/bin/google-chrome"].find((p) => fs.existsSync(p));
      return await chromium.launch(ejecutable ? { executablePath: ejecutable } : {});
    } catch {}
  }
  console.warn("  (sin Playwright: se omite la prueba en navegador; usa --sin-navegador para no intentarlo)");
  return null;
}

// ── análisis de un repo ───────────────────────────────────────────────────────

function clonar(repo, dest) {
  fs.rmSync(dest, { recursive: true, force: true });
  const r = spawnSync("git", ["clone", "--quiet", "--no-single-branch", `${repo}.git`, dest], {
    encoding: "utf8",
    env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
  });
  if (r.status === 0) return null;
  const err = (r.stderr || "error al clonar").trim().split("\n").pop();
  // Sin credenciales, GitHub responde igual a un repo privado que a uno inexistente.
  return /could not read Username|not found|Authentication failed/i.test(err) ? "repositorio privado o inexistente" : err;
}

function analizarGit(dir) {
  const log = git(dir, "log", "--all", "--date=iso-strict", "--pretty=format:%h%x09%ad%x09%an%x09%s")
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      const [hash, fecha, autor, ...msg] = l.split("\t");
      return { hash, fecha, autor, mensaje: msg.join("\t") };
    });
  const flojo = /^(cambios?|final|update[sd]?|commit|fix|arreglos?|subida|subir|web|wip|test|prueba|asdf+|\.+|v\d+|ok|listo|changes?)$/i;
  const ramas = git(dir, "branch", "-r", "--format=%(refname:short)")
    .split("\n")
    .filter((b) => b && !b.endsWith("/HEAD") && b !== "origin");
  const dias = new Set(log.map((c) => c.fecha.slice(0, 10)));
  return {
    commits_total: log.length,
    commits_rama_principal: Number(git(dir, "rev-list", "--count", "HEAD")),
    merges: Number(git(dir, "rev-list", "--merges", "--all", "--count")),
    ramas: ramas.map((r) => r.replace(/^origin\//, "")),
    autores: [...new Set(log.map((c) => c.autor))],
    dias_con_commits: dias.size,
    primer_commit: log.at(-1)?.fecha ?? null,
    ultimo_commit: log[0]?.fecha ?? null,
    mensajes_flojos: log.filter((c) => flojo.test(c.mensaje.trim()) || c.mensaje.trim().length < 6).length,
    commits: log.slice(0, 120),
  };
}

function analizarFicheros(dir) {
  const ficheros = git(dir, "ls-files").split("\n").filter(Boolean);
  const porExt = {};
  let total = 0;
  const pesados = [];
  const imagenes = [];
  for (const f of ficheros) {
    const ext = path.extname(f).toLowerCase() || "(sin extensión)";
    porExt[ext] = (porExt[ext] || 0) + 1;
    let tam = 0;
    try {
      tam = fs.statSync(path.join(dir, f)).size;
    } catch {}
    total += tam;
    if (IMAGEN.test(f)) imagenes.push({ f, kb: Math.round(tam / 1024) });
    if (tam > 400 * 1024) pesados.push({ f, kb: Math.round(tam / 1024) });
  }
  const leer = (re) =>
    ficheros
      .filter((f) => re.test(f) && !/(^|\/)(node_modules|vendor|dist)\//.test(f) && !/\.min\.(js|css)$/.test(f))
      .map((f) => ({ f, txt: fs.readFileSync(path.join(dir, f), "utf8") }));
  return { ficheros, porExt, total_kb: Math.round(total / 1024), pesados, imagenes, leer };
}

function analizarCodigo(fx) {
  const html = fx.leer(/\.html?$/i);
  const css = fx.leer(/\.css$/i);
  const js = fx.leer(/\.(m?js|jsx|ts|tsx)$/i);
  const H = html.map((h) => h.txt).join("\n");
  const estilosInline = H.match(/<style[\s\S]*?<\/style>/gi)?.join("\n") ?? "";
  const scriptsInline = H.match(/<script(?![^>]*\bsrc=)[\s\S]*?<\/script>/gi)?.join("\n") ?? "";
  const C = css.map((c) => c.txt).join("\n") + estilosInline;
  const J = js.map((j) => j.txt).join("\n") + scriptsInline;
  const imgs = H.match(/<img\b[^>]*>/gi) ?? [];
  const forms = H.match(/<form\b[^>]*>/gi) ?? [];
  return {
    html: {
      paginas: html.map((h) => h.f),
      semanticas: Object.fromEntries(["header", "nav", "main", "section", "article", "aside", "footer"].map((t) => [t, cuenta(H, new RegExp(`<${t}\\b`, "gi"))])),
      divs: cuenta(H, /<div\b/gi),
      titles: html.filter((h) => /<title>[^<]{2,}<\/title>/i.test(h.txt)).length,
      meta_description: html.filter((h) => /<meta[^>]+name=["']description["']/i.test(h.txt)).length,
      open_graph: html.filter((h) => /<meta[^>]+property=["']og:/i.test(h.txt)).length,
      viewport: html.filter((h) => /<meta[^>]+name=["']viewport["']/i.test(h.txt)).length,
      lang: html.filter((h) => /<html[^>]+lang=/i.test(h.txt)).length,
      favicon: /<link[^>]+rel=["'][^"']*icon/i.test(H),
      img: imgs.length,
      img_sin_alt: imgs.filter((i) => !/\balt\s*=/i.test(i)).length,
      img_lazy: imgs.filter((i) => /loading=["']lazy/i.test(i)).length,
      svg_inline: cuenta(H, /<svg\b/gi),
      video: cuenta(H, /<video\b/gi),
      iframes: (H.match(/<iframe\b[^>]*src=["']([^"']+)/gi) ?? []).map((s) => s.replace(/.*src=["']/i, "")),
      estilos_inline_atributo: cuenta(H, /\sstyle=["']/gi),
    },
    contacto: {
      formularios: forms.map((f) => f.match(/action=["']([^"']*)/i)?.[1] ?? "(sin action)"),
      servicio_formulario: /formspree|web3forms|getform|formsubmit|basin|netlify/i.test(H + J),
      mailto: (H.match(/mailto:[^"'\s>]+/gi) ?? []).slice(0, 5),
      tel: (H.match(/tel:[^"'\s>]+/gi) ?? []).slice(0, 5),
      chatbot_o_api: /fetch\(|XMLHttpRequest|axios/i.test(J),
      validacion: /checkValidity|setCustomValidity|\brequired\b|pattern=/i.test(H + J),
    },
    css: {
      ficheros: css.map((c) => c.f),
      variables: cuenta(C, /--[\w-]+\s*:/g),
      media_queries: cuenta(C, /@media\b/g),
      modo_oscuro: /prefers-color-scheme|\[data-theme|\.dark\b|dark-mode|theme-dark/i.test(C + J),
      keyframes: cuenta(C, /@keyframes\b/g),
      transiciones: cuenta(C, /transition\s*:/g),
      grid_flex: { grid: cuenta(C, /display\s*:\s*grid/g), flex: cuenta(C, /display\s*:\s*flex/g) },
      fuentes: [...new Set((C + H).match(/fonts\.googleapis\.com[^"')\s]*|font-family\s*:[^;]+/gi) ?? [])].slice(0, 6),
    },
    js: {
      ficheros: js.map((j) => j.f),
      lineas: J.split("\n").length,
      listeners: cuenta(J, /addEventListener\(/g),
      modulos: /\bimport\s|\bexport\s/.test(J),
      localStorage: /localStorage/.test(J),
      fetch: cuenta(J, /fetch\(/g),
      observers: /IntersectionObserver|MutationObserver|ResizeObserver/.test(J),
      funciones: cuenta(J, /\bfunction\b|=>\s*[{(]/g),
    },
  };
}

function analizarDocs(fx) {
  const f = fx.ficheros;
  const readme = f.find((x) => /^readme(\.md)?$/i.test(x));
  const md = fx.leer(/\.md$/i);
  return {
    readme: readme ? { fichero: readme, lineas: fs.readFileSync(path.join(fx.base, readme), "utf8").split("\n").length } : null,
    adr: f.filter((x) => /(^|\/)(adr|decisions?|decisiones)(\/|[-_ ]|\.md)/i.test(x)),
    agentes: f.filter((x) => /(^|\/)(agents|claude|copilot-instructions)\.md$/i.test(x)),
    prompts: [...new Set([...f.filter((x) => /prompt/i.test(x)), ...md.filter((m) => cuenta(m.txt, /prompt/gi) >= 3).map((m) => m.f)])],
    otros_md: md.map((m) => m.f).slice(0, 20),
  };
}

function analizarGitHub(repo) {
  if (!GH) return { disponible: false };
  const [, d, r] = repo.match(/github\.com\/([^/]+)\/([^/]+)/) ?? [];
  const info = gh(`repos/${d}/${r}`);
  if (!info) return { disponible: true, accesible: false };
  const pulls = gh(`repos/${d}/${r}/pulls?state=all&per_page=100`) ?? [];
  const issues = (gh(`repos/${d}/${r}/issues?state=all&per_page=100`) ?? []).filter((i) => !i.pull_request);
  const pages = info.has_pages ? gh(`repos/${d}/${r}/pages`) : null;
  return {
    disponible: true,
    accesible: true,
    visibilidad: info.visibility,
    descripcion: info.description,
    homepage: info.homepage,
    pages: pages ? { url: pages.html_url, estado: pages.status } : null,
    pull_requests: pulls.map((p) => ({ n: p.number, titulo: p.title, estado: p.merged_at ? "merged" : p.state })),
    issues: issues.map((i) => ({ n: i.number, titulo: i.title, estado: i.state })),
  };
}

async function analizarWeb(url, navegador, usuario) {
  const out = { url, http: null };
  try {
    const r = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20000) });
    const txt = await r.text();
    out.http = r.status;
    out.url_final = r.url;
    out.title = txt.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? null;
  } catch (e) {
    out.http = `error: ${e.message}`;
  }
  if (!navegador || out.http !== 200) return out;
  const errores = [];
  const fallidos = [];
  for (const [modo, vp] of [["escritorio", { width: 1366, height: 900 }], ["movil", { width: 390, height: 844 }]]) {
    const ctx = await navegador.newContext({ viewport: vp, isMobile: modo === "movil", deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    p.on("console", (m) => m.type() === "error" && errores.push(`[${modo}] ${m.text()}`.slice(0, 300)));
    p.on("pageerror", (e) => errores.push(`[${modo}] ${e.message}`.slice(0, 300)));
    p.on("response", (r) => r.status() >= 400 && fallidos.push(`${r.status()} ${r.url()}`));
    try {
      await p.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      await p.waitForTimeout(800);
      await p.screenshot({ path: path.join(DIR, "evidencias", `${usuario}-${modo}.png`), fullPage: modo === "escritorio" });
      if (modo === "movil") {
        out.movil = await p.evaluate(() => ({
          ancho_documento: document.documentElement.scrollWidth,
          desborda: document.documentElement.scrollWidth > window.innerWidth + 2,
        }));
      } else {
        out.dom = await p.evaluate(() => ({
          enlaces: document.querySelectorAll("a[href]").length,
          formularios: [...document.forms].map((f) => ({ action: f.getAttribute("action"), campos: f.elements.length })),
          mailto: document.querySelectorAll('a[href^="mailto:"]').length,
          tel: document.querySelectorAll('a[href^="tel:"]').length,
          secciones: [...document.querySelectorAll("h1,h2")].map((h) => h.textContent.trim().slice(0, 60)).slice(0, 15),
          palabras: document.body.innerText.split(/\s+/).length,
        }));
      }
    } catch (e) {
      errores.push(`[${modo}] no carga: ${e.message.split("\n")[0]}`);
    }
    await ctx.close();
  }
  out.errores_consola = [...new Set(errores)];
  out.recursos_fallidos = [...new Set(fallidos)].slice(0, 20);
  return out;
}

/** Requisitos mínimos que se pueden comprobar sin criterio humano (sugerencias). */
function minimosSugeridos(ev) {
  const web = ev.web ?? {};
  const cont = ev.codigo?.contacto ?? {};
  const probado = Array.isArray(web.errores_consola);
  return {
    produccion: web.http === 200 && (!probado || web.errores_consola.length === 0),
    contacto: cont.servicio_formulario || cont.mailto?.length > 0 || cont.tel?.length > 0 || (web.dom?.mailto ?? 0) > 0,
    movil: probado && web.movil ? !web.movil.desborda && (ev.codigo?.html.viewport ?? 0) > 0 : (ev.codigo?.html.viewport ?? 0) > 0,
    git: (ev.git?.commits_total ?? 0) >= 10,
  };
}

// ── bucle principal ───────────────────────────────────────────────────────────

const navegador = await cargarPlaywright();
console.log(`Analizando ${envios.length} repos de «${datos.entrega.titulo}»${GH ? " (con gh)" : ""}${navegador ? " (con navegador)" : ""}…`);
const resumen = [];
for (const e of envios) {
  process.stdout.write(`  ${e.usuario.padEnd(22)} `);
  const dest = path.join(DIR, "repos", e.usuario);
  const ev = { usuario: e.usuario, nombre: e.nombre, alumno_id: e.alumno_id, repo: e.repo, analizado: new Date().toISOString() };
  const fallo = clonar(e.repo, dest);
  if (fallo) {
    ev.error_clon = fallo;
  } else {
    ev.git = analizarGit(dest);
    const fx = analizarFicheros(dest);
    fx.base = dest;
    ev.ficheros = { total: fx.ficheros.length, total_kb: fx.total_kb, por_extension: fx.porExt, pesados: fx.pesados, imagenes: fx.imagenes, lista: fx.ficheros.slice(0, 200) };
    ev.codigo = analizarCodigo(fx);
    ev.docs = analizarDocs(fx);
  }
  ev.github = analizarGitHub(e.repo);
  ev.web = await analizarWeb(e.web || urlPages(e.repo), navegador, e.usuario);
  ev.minimos_sugeridos = minimosSugeridos(ev);
  fs.writeFileSync(path.join(DIR, "evidencias", `${e.usuario}.json`), JSON.stringify(ev, null, 2));
  resumen.push(ev);
  console.log(fallo ? `✗ ${fallo}` : `✓ ${ev.git.commits_total} commits · web ${ev.web.http}${ev.web.errores_consola ? ` · ${ev.web.errores_consola.length} errores consola` : ""}`);
}
await navegador?.close();

// resumen.md
const si = (b) => (b ? "✓" : "✗");
const lineas = [
  `# Evidencias · ${datos.entrega.titulo} (${datos.entrega.curso})`,
  "",
  `Analizado: ${new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })} · rúbrica: ${datos.entrega.rubrica ?? "—"}`,
  "",
  "| Alumno | Commits | Ramas | PR | Web | Consola | Móvil | Contacto | SVG | Mínimos sugeridos |",
  "|---|---|---|---|---|---|---|---|---|---|",
  ...resumen.map((ev) => {
    const m = ev.minimos_sugeridos;
    if (ev.error_clon) return `| ${ev.nombre} | ✗ no se pudo clonar: ${ev.error_clon} | | | ${ev.web.http} | | | | | |`;
    const c = ev.codigo;
    const contacto = [c.contacto.servicio_formulario && "form", c.contacto.mailto.length && "mailto", c.contacto.tel.length && "tel", c.contacto.chatbot_o_api && "fetch"].filter(Boolean).join("+") || "—";
    return `| ${ev.nombre} | ${ev.git.commits_total} (${ev.git.mensajes_flojos} flojos) | ${ev.git.ramas.length} | ${ev.github.pull_requests?.length ?? "?"} | ${ev.web.http} | ${ev.web.errores_consola ? ev.web.errores_consola.length : "?"} | ${ev.web.movil ? (ev.web.movil.desborda ? "desborda" : "ok") : "?"} | ${contacto} | ${c.html.svg_inline + (ev.ficheros.por_extension[".svg"] ?? 0)} | P${si(m.produccion)} C${si(m.contacto)} M${si(m.movil)} G${si(m.git)} |`;
  }),
  "",
  "P = producción sin errores · C = contacto detectado (¡comprobar que funciona!) · M = móvil sin desbordar · G = ≥10 commits.",
];
fs.writeFileSync(path.join(DIR, "resumen.md"), lineas.join("\n") + "\n");

// Plantilla de propuestas (no pisa una existente)
const plantilla = {
  entrega_id: datos.entrega.id,
  rubrica: datos.entrega.rubrica,
  instrucciones:
    "Rellena valoraciones {criterio: {n: 0-3, c: comentario}} para TODOS los criterios de la rúbrica, revisa los mínimos sugeridos, escribe el comentario para el alumno y en «privado» las evidencias clave para el profesor. Importar: node tools/campus/importar-propuestas.mjs --entrega " + datos.entrega.id,
  propuestas: resumen.map((ev) => ({
    alumno_id: ev.alumno_id,
    usuario: ev.usuario,
    nombre: ev.nombre,
    minimos: ev.minimos_sugeridos,
    valoraciones: {},
    comentario: "",
    privado: "",
  })),
};
const fp = path.join(DIR, "propuestas.plantilla.json");
fs.writeFileSync(fp, JSON.stringify(plantilla, null, 2));
console.log(`\n✓ Evidencias en ${path.relative(process.cwd(), path.join(DIR, "evidencias"))}/ · resumen.md · propuestas.plantilla.json`);
