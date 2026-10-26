// Carga la DOBLE CORRECCIÓN de una entrega: la del modelo del centro
// (propuestas.json, valorar-titan.mjs) y la de Opus sobre la entrega
// anonimizada (.campus-trabajo/opus-anon/), más el informe final. La nota es la
// media de las dos notas de rúbrica; un requisito mínimo cuenta como cumplido
// solo si lo dan las dos correcciones. Quedan como borrador «doble · lista»:
// el profesor las revisa en el panel y las publica con un botón.
//   node tools/campus/importar-doble.mjs --entrega 1 [--simular] [--forzar] [--local]
//
// No pisa correcciones del profesor ni notas publicadas (salvo --forzar).

import fs from "node:fs";
import path from "node:path";
import { ahora, arg, conectar, destino, TRABAJO } from "./_bd.mjs";

const emitir = process.emitWarning;
process.emitWarning = (w, ...resto) => (String(w).includes("Module type of") ? undefined : emitir.call(process, w, ...resto));
const { calcularNota, formatoNota, RUBRICAS } = await import("../../lib/campus/rubricas.ts");

const entregaId = Number(arg("entrega"));
if (!entregaId) {
  console.error("Uso: node tools/campus/importar-doble.mjs --entrega <id> [--simular] [--forzar] [--local]");
  process.exit(1);
}
const simular = process.argv.includes("--simular");
const forzar = process.argv.includes("--forzar");
const ANON = path.join(TRABAJO, "opus-anon");
const leer = (f) => JSON.parse(fs.readFileSync(f, "utf8"));

const centro = leer(path.join(TRABAJO, `entrega-${entregaId}`, "propuestas.json"));
if (centro.entrega_id !== entregaId) throw new Error("propuestas.json es de otra entrega.");
// mapa código anónimo → alumno (solo existe en este equipo)
const codigos = Object.entries(leer(path.join(ANON, "mapa.json"))).filter(([, m]) => m.entrega === entregaId);

/** Deja una corrección con solo los criterios y mínimos de la rúbrica, y su nota. */
function normalizar(rubrica, p) {
  const valoraciones = {};
  for (const c of rubrica.criterios) {
    const v = p.valoraciones?.[c.id];
    if (!Number.isInteger(v?.n) || v.n < 0 || v.n >= rubrica.niveles.length) throw new Error(`valoración no válida en «${c.id}»`);
    valoraciones[c.id] = v.c ? { n: v.n, c: String(v.c).slice(0, 3000) } : { n: v.n };
  }
  const minimos = Object.fromEntries(rubrica.minimos.map((m) => [m.id, p.minimos?.[m.id] === true]));
  const r = calcularNota(rubrica, valoraciones, minimos);
  return { valoraciones, minimos, nota: r.puntuacion, no_evaluable: r.noEvaluable, comentario: String(p.comentario ?? ""), privado: String(p.privado ?? "").replace(/^\[Propuesta IA\]\s*/, "") };
}

function informe(cod) {
  const f = path.join(ANON, "informes", `${cod}.json`);
  if (!fs.existsSync(f)) return null;
  const i = leer(f);
  const txt = (s) => String(s ?? "").replace(/\s*\[NOMBRE\]\s*/g, " ").trim();
  return {
    resumen: txt(i.resumen),
    por_que: txt(i.por_que),
    fortalezas: (i.fortalezas ?? []).map(txt),
    mejoras: (i.mejoras ?? []).map((m) => ({ area: txt(m.area), que: txt(m.que), como: txt(m.como) })),
    siguientes_pasos: (i.siguientes_pasos ?? []).map(txt),
  };
}

const db = await conectar();
try {
  const [[entrega]] = await db.query("SELECT * FROM app_campus_entregas WHERE id = ?", [entregaId]);
  const rubrica = entrega?.rubrica ? RUBRICAS[entrega.rubrica] : null;
  if (!rubrica) throw new Error("La entrega no existe o no tiene rúbrica.");

  let ok = 0;
  const saltadas = [];
  for (const [cod, m] of codigos) {
    const quien = m.usuario;
    try {
      const pc = centro.propuestas.find((p) => p.usuario === m.usuario);
      const po = leer(path.join(ANON, "resultados", `${cod}.json`));
      if (!pc) throw new Error("falta la corrección del centro");
      const [[al]] = await db.query("SELECT id FROM app_campus_usuarios WHERE usuario = ? AND rol = 'alumno'", [m.usuario]);
      if (!al) throw new Error("el alumno no existe");
      const a = normalizar(rubrica, pc);
      const b = normalizar(rubrica, po);
      const inf = informe(cod);
      if (!inf) throw new Error(`falta el informe final (${cod})`);
      const nota = Math.round(((a.nota + b.nota) / 2) * 100) / 100;
      const minimos = Object.fromEntries(rubrica.minimos.map((x) => [x.id, a.minimos[x.id] && b.minimos[x.id]]));
      const ne = Object.values(minimos).includes(false);

      const [[previa]] = await db.query("SELECT origen, publicada FROM app_campus_notas WHERE entrega_id = ? AND alumno_id = ?", [entregaId, al.id]);
      if (previa && (previa.origen === "profesor" || previa.publicada) && !forzar) {
        throw new Error(`ya tiene corrección del profesor${previa.publicada ? " publicada" : ""} (usa --forzar para sustituirla)`);
      }
      const correcciones = { modo: "doble", fecha: ahora().slice(0, 10), centro: a, opus: b, informe: inf };
      const privada = `Doble corrección: centro ${formatoNota(a.nota)}${a.no_evaluable ? " (NE)" : ""} · Opus ${formatoNota(b.nota)}${b.no_evaluable ? " (NE)" : ""} → media ${formatoNota(nota)}${ne ? " · NE" : ""}. Código anónimo enviado a Opus: ${cod}.`;
      console.log(`  ${quien.padEnd(30)} centro ${formatoNota(a.nota).padStart(5)} · opus ${formatoNota(b.nota).padStart(5)} → ${ne ? "NE " : ""}${formatoNota(nota)}`);
      if (!simular) {
        await db.query(
          `INSERT INTO app_campus_notas (entrega_id, alumno_id, valoraciones, minimos, nota, no_evaluable, comentario, nota_privada, correcciones, origen, publicada, publicada_at, updated_at)
           VALUES (?, ?, NULL, ?, ?, ?, ?, ?, ?, 'doble', 0, NULL, ?)
           ON DUPLICATE KEY UPDATE valoraciones = NULL, minimos = VALUES(minimos), nota = VALUES(nota), no_evaluable = VALUES(no_evaluable),
             comentario = VALUES(comentario), nota_privada = VALUES(nota_privada), correcciones = VALUES(correcciones),
             origen = 'doble', publicada = 0, publicada_at = NULL, updated_at = VALUES(updated_at)`,
          [entregaId, al.id, JSON.stringify(minimos), nota, ne ? 1 : 0, inf.resumen, privada, JSON.stringify(correcciones), ahora()],
        );
      }
      ok++;
    } catch (e) {
      saltadas.push(`${quien}: ${e.message}`);
    }
  }
  console.log(`\n${simular ? "SIMULACIÓN: se cargarían" : "✓ Cargadas"} ${ok} dobles correcciones (sin publicar) en la ${destino()}.`);
  if (saltadas.length) console.log(`Saltadas (${saltadas.length}):\n  - ${saltadas.join("\n  - ")}`);
} finally {
  await db.end();
}
