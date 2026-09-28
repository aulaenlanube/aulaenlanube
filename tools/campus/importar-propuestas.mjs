// Paso 4 de la corrección asistida: carga las propuestas de nota (hechas por la
// IA a partir de las evidencias) como BORRADORES «IA · revisar» en el panel.
//   node tools/campus/importar-propuestas.mjs --entrega 1 [--fichero ruta.json] [--simular] [--forzar] [--local]
// Por defecto lee .campus-trabajo/entrega-<id>/propuestas.json.
//
// Nunca publica nada: el profesor abre cada propuesta, la ajusta y la publica.
// Tampoco pisa correcciones del profesor ni notas publicadas (salvo --forzar).
// La nota se calcula con la MISMA rúbrica que el panel (lib/campus/rubricas.ts).

import fs from "node:fs";
import path from "node:path";
import { ahora, arg, conectar, destino, TRABAJO } from "./_bd.mjs";

// La rúbrica es TypeScript (la comparte el panel): Node la carga quitando los
// tipos, y avisa de que package.json no declara "type": "module". Se silencia
// solo ese aviso, sin tocar el package.json del sitio.
const emitir = process.emitWarning;
process.emitWarning = (w, ...resto) => (String(w).includes("Module type of") ? undefined : emitir.call(process, w, ...resto));
const { calcularNota, formatoNota, RUBRICAS } = await import("../../lib/campus/rubricas.ts");

const entregaId = Number(arg("entrega"));
if (!entregaId) {
  console.error("Uso: node tools/campus/importar-propuestas.mjs --entrega <id> [--fichero propuestas.json] [--simular] [--forzar] [--local]");
  process.exit(1);
}
const fichero = arg("fichero") ?? path.join(TRABAJO, `entrega-${entregaId}`, "propuestas.json");
const simular = process.argv.includes("--simular");
const forzar = process.argv.includes("--forzar");
const doc = JSON.parse(fs.readFileSync(fichero, "utf8"));
if (doc.entrega_id !== entregaId) throw new Error(`El fichero es de la entrega ${doc.entrega_id}, no de la ${entregaId}.`);

const db = await conectar();
try {
  const [[entrega]] = await db.query("SELECT * FROM app_campus_entregas WHERE id = ?", [entregaId]);
  if (!entrega) throw new Error(`No existe la entrega ${entregaId}.`);
  const rubrica = entrega.rubrica ? RUBRICAS[entrega.rubrica] : null;
  if (!rubrica) throw new Error("La entrega no tiene rúbrica: la importación de propuestas solo funciona con rúbrica.");
  const criterios = new Set(rubrica.criterios.map((c) => c.id));
  const minimosIds = new Set(rubrica.minimos.map((m) => m.id));

  let ok = 0;
  const saltadas = [];
  for (const p of doc.propuestas ?? []) {
    const quien = p.usuario ?? `alumno ${p.alumno_id}`;
    const [[al]] = await db.query("SELECT id, usuario FROM app_campus_usuarios WHERE id = ? AND rol = 'alumno'", [p.alumno_id]);
    if (!al || (p.usuario && al.usuario !== p.usuario)) {
      saltadas.push(`${quien}: el alumno no existe o no coincide el usuario`);
      continue;
    }
    const valoraciones = {};
    for (const [k, v] of Object.entries(p.valoraciones ?? {})) {
      if (!criterios.has(k) || !Number.isInteger(v?.n) || v.n < 0 || v.n >= rubrica.niveles.length) {
        saltadas.push(`${quien}: valoración no válida en «${k}»`);
        continue;
      }
      valoraciones[k] = v.c ? { n: v.n, c: String(v.c).slice(0, 3000) } : { n: v.n };
    }
    const minimos = Object.fromEntries(Object.entries(p.minimos ?? {}).filter(([k]) => minimosIds.has(k)).map(([k, v]) => [k, v === true]));
    const r = calcularNota(rubrica, valoraciones, minimos);
    if (r.puntuacion === null) {
      saltadas.push(`${quien}: faltan criterios por valorar (${r.pendientes.join(", ")})`);
      continue;
    }
    const [[previa]] = await db.query("SELECT origen, publicada FROM app_campus_notas WHERE entrega_id = ? AND alumno_id = ?", [entregaId, al.id]);
    if (previa && (previa.origen === "profesor" || previa.publicada) && !forzar) {
      saltadas.push(`${quien}: ya tiene corrección del profesor${previa.publicada ? " publicada" : ""} (usa --forzar para sustituirla)`);
      continue;
    }
    const texto = `${r.noEvaluable ? "NE" : formatoNota(r.puntuacion)}${r.noEvaluable ? ` (rúbrica ${formatoNota(r.puntuacion)}; fallan: ${r.minimosFallidos.join(", ")})` : ""}`;
    console.log(`  ${quien.padEnd(22)} ${texto}`);
    if (!simular) {
      await db.query(
        `INSERT INTO app_campus_notas (entrega_id, alumno_id, valoraciones, minimos, nota, no_evaluable, comentario, nota_privada, origen, publicada, publicada_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ia', 0, NULL, ?)
         ON DUPLICATE KEY UPDATE valoraciones = VALUES(valoraciones), minimos = VALUES(minimos), nota = VALUES(nota),
           no_evaluable = VALUES(no_evaluable), comentario = VALUES(comentario), nota_privada = VALUES(nota_privada),
           origen = 'ia', publicada = 0, publicada_at = NULL, updated_at = VALUES(updated_at)`,
        [entregaId, al.id, JSON.stringify(valoraciones), JSON.stringify(minimos), r.puntuacion, r.noEvaluable ? 1 : 0, p.comentario || null, p.privado ? `[Propuesta IA] ${p.privado}` : "[Propuesta IA]", ahora()],
      );
    }
    ok++;
  }
  console.log(`\n${simular ? "SIMULACIÓN: se importarían" : "✓ Importadas"} ${ok} propuestas como borrador «IA · revisar» en la ${destino()}.`);
  if (saltadas.length) console.log(`Saltadas (${saltadas.length}):\n  - ${saltadas.join("\n  - ")}`);
} finally {
  await db.end();
}
