// Paso 3 (variante centro): el LLM del IES (titan, réplica GPU 0 → :8100) valora
// la entrega con las evidencias + un resumen del código. Creado 26-10-2026 por
// protección de datos (regla Edu: lo que se devuelve al alumnado se corrige con
// el modelo del centro; la variante Opus queda solo como consulta en local).
//   node tools/campus/valorar-titan.mjs <entrega> [usuario...] [--paralelo N]
//   Regla de mínimos (Edu 26-10): «producción» = la web CARGA (HTTP 200). Los
//   404 de recursos sueltos o avisos de consola NO suspenden: se anotan en el
//   informe (privado y comentario) para corregirlos. Solo NE si la web no carga,
//   no hay repo accesible o <10 commits.
// Escribe propuestas.json (formato importar-propuestas.mjs). Idempotente.
import fs from "node:fs";
import path from "node:path";
import { arg, TRABAJO } from "./_bd.mjs";

const URL_API = process.env.TITAN_URL || "http://127.0.0.1:18100/v1/chat/completions"; // túnel SSH al :8100 (GPU0) de titan
const ENTREGA = Number(arg("entrega") ?? process.argv[2]);
if (!ENTREGA) { console.error("uso: node tools/campus/valorar-titan.mjs --entrega <id> [usuario...] [--paralelo 3]"); process.exit(1); }
const PARALELO = Number(arg("paralelo") ?? 3);
const filtro = process.argv.slice(3).filter((a) => !a.startsWith("--"));
if (filtro.length === 1 && filtro[0] === String(ENTREGA)) filtro.length = 0; // forma positional sin usuarios

const DIR = path.join(TRABAJO, `entrega-${ENTREGA}`);
const RUBRICA = fs.readFileSync(path.resolve(import.meta.dirname, "../../lib/campus/rubricas.ts"), "utf8");
const datosEntrega = JSON.parse(fs.readFileSync(path.join(DIR, "entregas.json"), "utf8"));
const SALIDA = path.join(DIR, "propuestas.json");
const previos = fs.existsSync(SALIDA) ? JSON.parse(fs.readFileSync(SALIDA, "utf8")) : { entrega_id: ENTREGA, rubrica: "web-marca" };
if (previos.entrega_id !== ENTREGA) throw new Error("propuestas.json es de otra entrega");
previos.propuestas ??= [];
const hecho = new Set(previos.propuestas.map((p) => p.usuario));

// ── digest del repo clonado (sustituye al Read/Grep del agente) ──────────────
const LEER = (f, max) => { try { return fs.readFileSync(f, "utf8").replace(/\r/g, "").slice(0, max); } catch { return ""; } };
function recorte(txt, max) { return txt.length > max ? txt.slice(0, max) + "\n…[cortado]" : txt; }
function listado(dir, limite = 400) {
  const out = [];
  (function walk(d, pref) {
    for (const e of fs.readdirSync(path.join(d), { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (e.name === ".git" || out.length > limite) continue;
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p, pref + e.name + "/");
      else out.push(`${pref}${e.name} ${fs.statSync(p).size}B`);
    }
  })(dir, "");
  return out;
}
function digest(clon, ev) {
  if (!fs.existsSync(clon)) return "REPO NO ACCESIBLE (no se pudo clonar: privado o inexistente).";
  const fich = listado(clon);
  const md = ["README.md", "readme.md", "README.txt", "LEEME.md"].map((f) => path.join(clon, f)).find((f) => fs.existsSync(f));
  const docs = [];
  for (const d of ["docs", "documentacion", "prompts", "adr"]) {
    const p = path.join(clon, d);
    if (fs.existsSync(p) && fs.statSync(p).isDirectory()) for (const f of fs.readdirSync(p).slice(0, 6)) docs.push(`## ${d}/${f}\n${recorte(LEER(path.join(p, f), 3000), 3000)}`);
  }
  const htmls = fich.filter((f) => f.endsWith(".html")).slice(0, 4).map((f) => recorte(LEER(path.join(clon, f), 12000), 12000));
  const css = fich.filter((f) => /\.(css|scss)$/.test(f)).sort((a, b) => Number(b.match(/(\d+)B/)?.[1] ?? 0) - Number(a.match(/(\d+)B/)?.[1] ?? 0)).slice(0, 1);
  const js = fich.filter((f) => f.endsWith(".js") && !f.includes("min.")).sort((a, b) => Number(b.match(/(\d+)B/)?.[1] ?? 0) - Number(a.match(/(\d+)B/)?.[1] ?? 0)).slice(0, 2);
  return [
    `FICHEROS (${fich.length}):\n${fich.slice(0, 200).join("\n")}`,
    md ? `README:\n${recorte(LEER(md, 6000), 6000)}` : "SIN README",
    docs.length ? `DOCS:\n${docs.join("\n")}` : "SIN carpeta docs/prompts/adr",
    `PÁGINAS HTML (primeras, recortadas):\n${htmls.map((h, i) => `--- html ${i + 1} ---\n${h}`).join("\n").slice(0, 40000)}`,
    css.length ? `CSS principal:\n${recorte(LEER(path.join(clon, css[0]), 6000), 6000)}` : "",
    js.length ? `JS principal:\n${js.map((f) => recorte(LEER(path.join(clon, f), 5000), 5000)).join("\n---\n").slice(0, 10000)}` : "SIN JS propio",
  ].filter(Boolean).join("\n\n").slice(0, 90000);
}

function prompt(ev) {
  const gitRes = { commits: ev.git?.commits_total, flojos: ev.git?.mensajes_flojos, ramas: (ev.git?.ramas ?? []).length, autores: ev.git?.autores, desde: ev.git?.primera_fecha, hasta: ev.git?.ultima_fecha, ultimos: (ev.git?.log ?? []).slice(0, 25).map((l) => (typeof l === "string" ? l : `${l.fecha ?? ""} ${l.mensaje ?? ""}`).slice(0, 110)) };
  const web = { http: ev.web?.http, url: ev.web?.url, title: ev.web?.title, errores_consola: (ev.web?.errores_consola ?? []).slice(0, 8), recursos_fallidos: (ev.web?.recursos_fallidos ?? []).slice(0, 8), movil: ev.web?.movil, consola_ok: (ev.web?.errores_consola ?? []).length === 0 };
  return `Eres el profesor de 1º DAM (IES Simarro, curso Programación con IA) corrigiendo la entrega «${datosEntrega.entrega.titulo}» con la rúbrica oficial web-marca. Valora AL ALUMNO ${ev.nombre} (${ev.usuario}).

EVIDENCIAS DE GIT Y GITHUB:
${JSON.stringify(gitRes, null, 1)}
PRs/issues: ${JSON.stringify(ev.github ?? null)}

EVIDENCIAS DE LA WEB PUBLICADA (navegador real Playwright):
${JSON.stringify(web, null, 1)}

CÓDIGO DEL REPOSITORIO (lista de ficheros + contenido de los principales):
${digest(path.join(DIR, "repos", ev.usuario), ev)}

RÚBRICA OFICIAL (niveles 0 Insuficiente · 1 En desarrollo · 2 Competente · 3 Excelente):
${RUBRICA.replace(/export (type|const)[^=]*=/g, " ").slice(0, 9000)}

REGLAS DE ESTE CURSO (decreto del profesor, mandan sobre cualquier duda):
1. Mínimos: «produccion» = true si la web CARGA con HTTP 200, AUNQUE haya recursos 404 o avisos de consola (regla relajada 26-10: eso NO suspende; pero DEBE quedar anotado en «privado» con la lista exacta y mencionarse en el «comentario» como mejora obligatoria). Falso solo si la web no carga (404/0 la raíz), no hay web o no se pudo clonar el repo. «contacto» = hay algún canal real (form mailto tel). «movil» = desborda=false si se midió; si no se midió (web muerta) false. «git» = commits ≥10.
2. Puntúa los 7 criterios con el descriptor literal del nivel. No regales el 3: «Excelente» exige justo lo que dice el descriptor (PRs, prompts archivados, ADRs…). Usa el digest del código: contenido propio vs plantilla sin tocar, SVG propios, semántica, variables CSS, etc.
3. «comentario» para el ALUMNO (tuteando, español, 3-6 frases amables y concretas): qué está bien de verdad, qué le faltó para el máximo y LA mejora prioritaria accionable (fichero/página/concreta). Si tiene 404 de recursos o consola sucia, díselo aquí como mejora (no como suspensos).
4. «privado» para el profe: 2-4 frases con evidencias (commits flojos, sospecha plantilla/clon, 404 exactos, errores consola exactos, fortalezas defensables en la evaluación). Empieza con «RELAX:» si aplicaste el mínimo de producción relajado, listando qué fallaría con la norma estricta.
5. Cada criterio lleva «c»: una línea justificando el nivel con evidencia concreta (vacío solo en un 3 limpio).

Responde EXCLUSIVAMENTE con este JSON (sin markdown ni texto alrededor):
{"alumno_id":${ev.alumno_id},"usuario":"${ev.usuario}","nombre":"${ev.nombre}","minimos":{"produccion":true,"contacto":true,"movil":true,"git":true},"valoraciones":{"contacto":{"n":2,"c":"…"},"contenido":{"n":2,"c":"…"},"diseno":{"n":2,"c":"…"},"medios":{"n":2,"c":"…"},"interactividad":{"n":2,"c":"…"},"arquitectura":{"n":2,"c":"…"},"proceso":{"n":2,"c":"…"}},"comentario":"…","privado":"…"}`;
}

async function callTitan(promptTxt, intento = 1) {
  const cuerpo = {
    model: "qwen3.8-flash-next",
    messages: [{ role: "user", content: promptTxt }],
    temperature: 0.3,
    reasoning_effort: "medium",
    max_tokens: intento >= 2 ? 16000 : 8000,
  };
  for (let espera = 0; ; espera = Math.min(espera + 5, 30)) {
    try {
      const r = await fetch(URL_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo) });
      if (r.status === 429) { await new Promise((s) => setTimeout(s, (espera + 5) * 1000)); continue; }
      if (!r.ok) throw new Error(`HTTP ${r.status} ${await r.text().then((t) => t.slice(0, 120))}`);
      const j = await r.json();
      const ch = j.choices?.[0];
      let txt = ch?.message?.content ?? "";
      const ini = txt.indexOf("{"), fin = txt.lastIndexOf("}");
      if (ini < 0 || fin < 0) throw new Error("sin JSON en respuesta");
      try { return JSON.parse(txt.slice(ini, fin + 1)); } catch { throw new Error("JSON inválido (¿truncado?)"); }
    } catch (e) {
      if (intento < 2 && /truncado|HTTP 4|fetch|ECONN|socket/i.test(String(e))) return callTitan(promptTxt, intento + 1);
      if (espera >= 25) throw e;
      await new Promise((s) => setTimeout(s, espera * 1000));
    }
  }
}

let usuarios = fs.readdirSync(path.join(DIR, "evidencias")).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""))
  .filter((u) => !hecho.has(u) && (!filtro.length || filtro.includes(u)));
console.log(`A valorar por titan: ${usuarios.length} (paralelo ${PARALELO})`);

let ok = 0, fails = 0;
async function trabaja(u) {
  const ev = JSON.parse(fs.readFileSync(path.join(DIR, "evidencias", u + ".json"), "utf8"));
  try {
    const obj = await callTitan(prompt(ev));
    if (!obj?.valoraciones || Object.keys(obj.valoraciones).length < 7) throw new Error("faltan criterios");
    obj.usuario = u; obj.nombre = ev.nombre; obj.alumno_id = ev.alumno_id;
    previos.propuestas = previos.propuestas.filter((p) => p.usuario !== u);
    previos.propuestas.push(obj);
    fs.writeFileSync(SALIDA, JSON.stringify(previos, null, 1));
    ok++;
    console.log(`  ✓ ${u} [${Object.values(obj.valoraciones).map((v) => v.n).join(",")}] P=${obj.minimos?.produccion ? "✓" : "✗"}`);
  } catch (e) { fails++; console.log(`  ✗ ${u}: ${String(e).slice(0, 140)}`); }
}
const cola = [...usuarios];
await Promise.all(Array.from({ length: Math.min(PARALELO, cola.length) }, async () => { while (cola.length) await trabaja(cola.shift()); }));
console.log(`Total en propuestas.json: ${previos.propuestas.length} (ok ${ok}, fallos ${fails})`);
process.exit(fails ? 2 : 0);
