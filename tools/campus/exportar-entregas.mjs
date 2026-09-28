// Paso 1 de la corrección asistida: exporta lo entregado en una entrega.
//   node tools/campus/exportar-entregas.mjs --entrega 1 [--grupo 3] [--local]
// Escribe .campus-trabajo/entrega-<id>/entregas.json (gitignored: son datos
// del alumnado, no se suben al repo público).

import fs from "node:fs";
import path from "node:path";
import { arg, conectar, destino, TRABAJO } from "./_bd.mjs";

const entregaId = Number(arg("entrega"));
const grupoId = arg("grupo") ? Number(arg("grupo")) : null;
if (!entregaId) {
  console.error("Uso: node tools/campus/exportar-entregas.mjs --entrega <id> [--grupo <id>] [--local]");
  process.exit(1);
}

const db = await conectar();
try {
  const [[entrega]] = await db.query("SELECT * FROM app_campus_entregas WHERE id = ?", [entregaId]);
  if (!entrega) throw new Error(`No existe la entrega ${entregaId}.`);
  const [filas] = await db.query(
    `SELECT u.id AS alumno_id, u.usuario, u.nombre, u.apellidos, g.id AS grupo_id, g.nombre AS grupo,
            e.repo, e.web, e.texto, e.comentario, e.version, e.fuera_plazo, e.updated_at,
            n.origen AS nota_origen, n.publicada AS nota_publicada, n.nota, n.no_evaluable, n.updated_at AS nota_updated_at
       FROM app_campus_envios e
       JOIN app_campus_usuarios u ON u.id = e.alumno_id
       LEFT JOIN app_campus_grupos g ON g.id = u.grupo_id
       LEFT JOIN app_campus_notas n ON n.entrega_id = e.entrega_id AND n.alumno_id = e.alumno_id
      WHERE e.entrega_id = ? ${grupoId ? "AND u.grupo_id = ?" : ""}
      ORDER BY g.nombre, u.apellidos, u.nombre`,
    grupoId ? [entregaId, grupoId] : [entregaId],
  );

  const envios = filas.map((f) => ({
    alumno_id: f.alumno_id,
    usuario: f.usuario,
    nombre: `${f.nombre} ${f.apellidos}`.trim(),
    grupo: f.grupo,
    repo: f.repo,
    web: f.web,
    texto: f.texto,
    comentario: f.comentario,
    version: f.version,
    fuera_plazo: !!f.fuera_plazo,
    entregada: f.updated_at,
    // Estado de la corrección actual, para no pisar el trabajo del profesor.
    correccion: f.nota_origen
      ? {
          origen: f.nota_origen,
          publicada: !!f.nota_publicada,
          nota: f.nota === null ? null : Number(f.nota),
          no_evaluable: !!f.no_evaluable,
          reenviada_despues: f.updated_at > f.nota_updated_at,
        }
      : null,
  }));

  const dir = path.join(TRABAJO, `entrega-${entregaId}`);
  fs.mkdirSync(dir, { recursive: true });
  const salida = {
    exportado: new Date().toISOString(),
    origen: destino(),
    entrega: { id: entrega.id, curso: entrega.curso, proyecto: entrega.proyecto, titulo: entrega.titulo, rubrica: entrega.rubrica, tipo: entrega.tipo, fecha_limite: entrega.fecha_limite },
    envios,
  };
  fs.writeFileSync(path.join(dir, "entregas.json"), JSON.stringify(salida, null, 2));
  const pendientes = envios.filter((e) => !e.correccion || (e.correccion.origen === "ia" && !e.correccion.publicada) || e.correccion.reenviada_despues).length;
  console.log(`✓ ${envios.length} envíos de «${entrega.titulo}» (${entrega.curso}) desde la ${destino()}`);
  console.log(`  ${pendientes} por corregir · ${path.relative(process.cwd(), path.join(dir, "entregas.json"))}`);
} finally {
  await db.end();
}
