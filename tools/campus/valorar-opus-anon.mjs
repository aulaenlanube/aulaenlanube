// Paso 3c (RGPD): Opus valora los PAQUETES ANONIMIZADOS (opus-anon/paquetes/Axx/)
// — nunca ve nombre, correo, usuario ni dominio; trabaja solo con el repo limpio
// y las evidencias del paquete. Escribe resultados/AXX.json y informes/AXX.json
// con el mismo formato que la ronda del 26-10 (claves: codigo, minimos,
// valoraciones, comentario, privado; informe: resumen, por_que, fortalezas,
// mejoras, siguientes_pasos, con [NOMBRE] donde iría el nombre).
//   node tools/campus/valorar-opus-anon.mjs [--entrega 2] [--paralelo 2]
// Idempotente: omite códigos que ya tengan resultado.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { arg, TRABAJO } from "./_bd.mjs";

const RAIZ = path.resolve(import.meta.dirname, "../..");
const ANON = path.join(TRABAJO, "opus-anon");
const PAQ = path.join(ANON, "paquetes");
const RES = path.join(ANON, "resultados");
const INF = path.join(ANON, "informes");
for (const d of [RES, INF]) fs.mkdirSync(d, { recursive: true });

const ENTREGA = Number(arg("entrega") ?? 0);
const RUBRICA = fs.readFileSync(path.join(RAIZ, "lib/campus/rubricas.ts"), "utf8");

const pendientes = fs.readdirSync(PAQ).filter((c) => /^A\d\d$/.test(c)).filter((c) => {
  if (fs.existsSync(path.join(RES, c + ".json"))) return false;
  if (!ENTREGA) return true;
  try { return JSON.parse(fs.readFileSync(path.join(PAQ, c, "paquete.json"), "utf8")).entrega_id === ENTREGA; } catch { return false; }
});
console.log(`Opus anonimizado: ${pendientes.length} paquetes (A: ${pendientes.join(", ")})`);

function prompt(cod) {
  const p = JSON.parse(fs.readFileSync(path.join(PAQ, cod, "paquete.json"), "utf8"));
  const ev = fs.readFileSync(path.join(PAQ, cod, "evidencias.json"), "utf8");
  return `Eres un evaluador externo corrigiendo la entrega «${p.titulo}» (rúbrica ${p.rubrica}) de un curso de 1º DAM. El paquete está ANONIMIZADO a propósito: no preguntes quién es, trata a la persona como «[NOMBRE]». Trabaja sobre ${PAQ}/${cod}/repo (estructura, README, HTML/CSS/JS, docs/).

EVIDENCIAS OBJETIVAS (recolectadas por script; la web fue medida por el centro, identidad suprimida):
${ev.slice(0, 6000)}

REGLAS DEL CENTRO (mandan): «produccion»=true si la web del alumno cargó con HTTP 200, AUNQUE hubiera 404 de recursos o avisos de consola (eso NO suspende: se anota como mejora en comentario y en privado). git=false si <10 commits. Un mínimo false ⇒ no_evaluable, pero puntúa todos los criterios igualmente. No regales el 3: «Excelente» exige lo que dice el descriptor literal.

RÚBRICA:
${RUBRICA.replace(/export (type|const)[^=]*=/g, " ").slice(0, 9000)}

Devuelve EXCLUSIVAMENTE un JSON (sin markdown) con esta forma exacta:
{"codigo":"${cod}","minimos":{"produccion":true,"contacto":true,"movil":true,"git":true},"valoraciones":{"contacto":{"n":2,"c":"…"},"contenido":{"n":2,"c":"…"},"diseno":{"n":2,"c":"…"},"medios":{"n":2,"c":"…"},"interactividad":{"n":2,"c":"…"},"arquitectura":{"n":2,"c":"…"},"proceso":{"n":2,"c":"…"}},"comentario":"3-6 frases tuteando a [NOMBRE]: qué bien, qué le faltó para el máximo, mejora prioritaria concreta","privado":"2-4 frases al professor con evidencias (commits, 404 exactos, sospecha plantilla). Empieza con «RELAX:» si aplicaste el mínimo relajado","informe":{"resumen":"una frase","por_que":"2-3 frases de justificación de nota","fortalezas":["…"],"mejoras":[{"area":"…","que":"…","como":"…"}],"siguientes_pasos":["…"]}}`;
}

let ok = 0, fail = 0;
for (const cod of pendientes) {
  const r = spawnSync("claude", ["-p", "--output-format", "text", "--model", "opus", "--allowedTools", "Read,Grep,Glob", "--max-turns", "30"],
    { input: prompt(cod), encoding: "utf8", timeout: 600000, maxBuffer: 32e6, cwd: PAQ });
  const txt = (r.stdout || "").trim();
  const ini = txt.indexOf("{"), fin = txt.lastIndexOf("}");
  let j = null;
  try { j = JSON.parse(txt.slice(ini, fin + 1)); } catch { /* abajo */ }
  if (!j || !j.valoraciones) { console.log(`  ✗ ${cod}: sin JSON válido (${txt.slice(0, 90)})`); fail++; continue; }
  const { informe, ...resto } = j;
  fs.writeFileSync(path.join(RES, cod + ".json"), JSON.stringify(resto, null, 1));
  fs.writeFileSync(path.join(INF, cod + ".json"), JSON.stringify({ codigo: cod, ...informe }, null, 1));
  const ns = Object.values(j.valoraciones).map((v) => v.n).join(",");
  console.log(`  ✓ ${cod} [${ns}] mins=${Object.entries(j.minimos).map(([k, v]) => k + (v ? "✓" : "✗")).join("")}`);
  ok++;
}
console.log(`Total: ${ok} ok, ${fail} fallos`);
