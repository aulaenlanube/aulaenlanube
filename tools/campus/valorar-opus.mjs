// Paso 3 de la corrección asistida: Claude Opus valora cada alumno (evidencias +
// código del clon + rúbrica) y escribe propuestas-ia.json listo para
// importar-propuestas.mjs.  (creado 26-10-2026, corrección entrega 1)
//   node tools/campus/valorar-opus.mjs <entrega-id> [usuario...]   → todos los pendientes si no das usuarios
// Requiere: analizar-repos.mjs ejecutado antes · claude CLI autenticada.
// Idempotente: reejecutar solo valora los que falten (acumula en propuestas-ia.json).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { TRABAJO } from "./_bd.mjs";

const REPO = path.resolve(import.meta.dirname, "../..");
const entrega = Number(process.argv[2]);
if (!entrega) { console.error("uso: node tools/campus/valorar-opus.mjs <entrega> [usuario...]"); process.exit(1); }
const filtro = process.argv.slice(3);

const DIR = path.join(TRABAJO, `entrega-${entrega}`);
const RUBRICA = fs.readFileSync(path.join(REPO, "lib/campus/rubricas.ts"), "utf8");
const datosEntrega = JSON.parse(fs.readFileSync(path.join(DIR, "entregas.json"), "utf8"));
const tituloEntrega = datosEntrega.entrega.titulo;

const SALIDA = path.join(DIR, "propuestas-ia.json");
const previos = fs.existsSync(SALIDA) ? JSON.parse(fs.readFileSync(SALIDA, "utf8")) : { entrega_id: entrega, rubrica: "web-marca", propuestas: [] };
const hecho = new Set(previos.propuestas.map(p => p.usuario));

function promptPara(ev) {
  const clon = path.join(DIR, "repos", ev.usuario);
  const fich = path.join(DIR, "evidencias", ev.usuario + ".json");
  return `Eres el profesor de 1º DAM (curso Programación con IA, IES Simarro) corrigiendo la entrega «${tituloEntrega}» con la rúbrica oficial web-marca.

EVIDENCIAS OBJETIVAS (recogidas por un script sobre el repo clonado y la web publicada; JSON en ${fich}):
${JSON.stringify({ git: { commits_total: ev.git?.commits_total, flojos: ev.git?.flojos, ramas: ev.git?.ramas, ultimos: (ev.git?.log?.slice(0, 12) ?? []).map(l => l) }, minimos_sugeridos: ev.minimos_sugeridos, web: { status: ev.web?.status, consola: ev.web?.consola_error?.length ?? ev.web?.errores_consola ?? null, movil_desborda: ev.web?.movil_desborda, contacto: ev.web?.contacto, svg: ev.web?.svg }, github: ev.github, docs: ev.docs }, null, 1).slice(0, 5500)}

REPOSITORIO CLONADO (LEER con Read/Grep antes de puntuar criterios subjetivos): ${clon}
Inspecciona al menos: README, estructura de carpetas, index.html u otra página principal, CSS, JS, carpeta docs/, imágenes.

RÚBRICA COMPLETA (fuente única, criterios y niveles):
${RUBRICA.slice(0, 7000)}

REGLAS DE CORRECCIÓN:
- Los requisitos mínimos (produccion/contacto/movil/git) van true/false según la evidencia. produced=false o git=false ⇒ no evaluable (NE), pero puntúa igual todos los criterios.
- Pondera cada criterio con el descriptor literal del nivel. NO regales el 3: exige lo que dice el descriptor (p. ej. «Excelente» en proceso = historial-leíble con PRs/órdenes a la IA archivadas).
- Criterio «contacto»: detectarlo en el HTML no basta; si la web no carga (404/error), n=0.
- El comentario para el alumno («comentario») tiene que decir, en 3-5 frases amables y concretas en español: qué está bien, QUÉ LE FALTÓ para la máxima nota y la MEJORACÓN PRIORITARIA concreta y accionable (fichero/página/función). Trato de «tú».
- «privado»: 2-4 frases para el profe con evidencias clave (commits, errores consola, plantilla sin tocar, sospecha de copia).
- «c» por criterio: 1 línea de por qué ese nivel (referencia a evidencia concreta). Vacío solo si es 3 sin matices.

Devuelve EXCLUSIVAMENTE un JSON válido (sin markdown) con esta forma exacta:
{"alumno_id":${ev.alumno_id},"usuario":"${ev.usuario}","nombre":"${ev.nombre}","minimos":{"produccion":bool,"contacto":bool,"movil":bool,"git":bool},"valoraciones":{"contacto":{"n":0,"c":"…"},"contenido":{"n":0,"c":"…"},"diseno":{"n":0,"c":"…"},"medios":{"n":0,"c":"…"},"interactividad":{"n":0,"c":"…"},"arquitectura":{"n":0,"c":"…"},"proceso":{"n":0,"c":"…"}},"comentario":"…","privado":"…"}`;
}

let pendientes = fs.readdirSync(path.join(DIR, "evidencias")).filter(f => f.endsWith(".json")).map(f => f.replace(/\.json$/, ""))
  .filter(u => !hecho.has(u)).filter(u => !filtro.length || filtro.includes(u));
console.log(`Pendientes: ${pendientes.length}`);

for (const u of pendientes) {
  const ev = JSON.parse(fs.readFileSync(path.join(DIR, "evidencias", u + ".json"), "utf8"));
  const tmp = `/tmp/op-${u}.json`;
  fs.writeFileSync("/tmp/op-prompt.txt", promptPara(ev));
  const r = spawnSync("claude", ["-p", "--output-format", "text", "--allowedTools", "Read,Grep,Glob", "--max-turns", "25"],
    { input: fs.readFileSync("/tmp/op-prompt.txt", "utf8"), encoding: "utf8", timeout: 420000, maxBuffer: 32e6 });
  let txt = (r.stdout || "").trim();
  // extraer el objeto JSON (Opus puede envolverlo en texto)
  const ini = txt.indexOf("{");
  let obj = null;
  if (ini >= 0) { try { obj = JSON.parse(txt.slice(ini, txt.lastIndexOf("}") + 1)); } catch {} }
  if (!obj || !obj.valoraciones) { console.log(`  ✗ ${u}: sin JSON válido (${txt.slice(0, 120)})`); continue; }
  obj.usuario = u;
  previos.propuestas.push(obj);
  fs.writeFileSync(SALIDA, JSON.stringify(previos, null, 1));
  const nn = Object.values(obj.valoraciones).map(v => v.n);
  console.log(`  ✓ ${u}: niveles [${nn.join(",")}]`);
}
console.log(`Total propuestas: ${previos.propuestas.length}`);
