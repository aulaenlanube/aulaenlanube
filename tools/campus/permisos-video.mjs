// Permisos del alumnado para salir en un vídeo del canal de YouTube (tabla
// app_campus_permisos_video; el alumno contesta en su aula y puede cambiarlo).
//
//   node tools/campus/permisos-video.mjs crear --video <clave> --titulo "…" [--descripcion "…"] \
//        --usuarios a,b,c [--simular] [--local]
//   node tools/campus/permisos-video.mjs exportar --video <clave> [--salida ruta] [--entrega <id>] [--local]
//
// crear: pide permiso a esos alumnos (usuario del campus, con o sin
//   @alu.edu.gva.es). Idempotente: a quien ya tiene la petición de ese vídeo no
//   se le toca la respuesta; si cambian el título o la descripción, se
//   actualizan en todas las filas del vídeo. Con el vídeo ya creado, --titulo y
//   --descripcion son opcionales (se mantienen los que hay).
// exportar: JSON por alumno (estado, qué deja que salga, observaciones, fecha)
//   en .campus-trabajo/permisos-video-<clave>.json (gitignored: datos del
//   alumnado). Con --entrega <id> añade la web entregada (si ha dicho que sí) y
//   el repositorio (solo si deja que salga).
//
// Como el resto de tools/campus, va contra PRODUCCIÓN salvo con --local.

import fs from "node:fs";
import path from "node:path";
import { ahora, arg, conectar, destino, RAIZ, TRABAJO } from "./_bd.mjs";

const DOMINIO = "@alu.edu.gva.es";
const CLAVE_RE = /^[a-z0-9][a-z0-9-]{0,59}$/;
const orden = process.argv[2];
const simular = process.argv.includes("--simular");

function uso(msg) {
  if (msg) console.error(`✗ ${msg}\n`);
  console.error(
    [
      "Uso:",
      '  node tools/campus/permisos-video.mjs crear --video <clave> --titulo "…" [--descripcion "…"] --usuarios a,b,c [--simular] [--local]',
      "  node tools/campus/permisos-video.mjs exportar --video <clave> [--salida ruta] [--entrega <id>] [--local]",
    ].join("\n"),
  );
  process.exit(1);
}

if (orden !== "crear" && orden !== "exportar") uso();
const clave = (arg("video") ?? "").trim().toLowerCase();

const db = await conectar();
try {
  if (orden === "crear") await crear();
  else await exportar();
} finally {
  await db.end();
}

/** Alumno del campus por usuario o correo (con o sin el dominio de la GVA). */
async function buscarAlumno(dato) {
  const t = dato.trim().toLowerCase();
  const [filas] = t.includes("@")
    ? await db.query("SELECT id, usuario, nombre, apellidos, email FROM app_campus_usuarios WHERE rol = 'alumno' AND (email = ? OR usuario = ?)", [t, t.split("@")[0]])
    : await db.query("SELECT id, usuario, nombre, apellidos, email FROM app_campus_usuarios WHERE rol = 'alumno' AND (usuario = ? OR email = ?)", [t, t + DOMINIO]);
  if (filas.length > 1) {
    const exacto = filas.filter((f) => f.usuario === t || f.usuario === t.split("@")[0]);
    return exacto.length === 1 ? exacto[0] : { ambiguo: filas.map((f) => f.usuario) };
  }
  return filas[0] ?? null;
}

async function crear() {
  if (!CLAVE_RE.test(clave)) uso("--video: la clave va en minúsculas, con números y guiones (por ejemplo: mejores-webs-p1).");
  const usuarios = (arg("usuarios") ?? "").split(/[\s,;]+/).map((u) => u.trim()).filter(Boolean);
  if (!usuarios.length) uso("--usuarios: indica al menos un usuario del campus (separados por comas).");

  const [[previo]] = await db.query("SELECT titulo, descripcion FROM app_campus_permisos_video WHERE clave_video = ? ORDER BY id LIMIT 1", [clave]);
  const titulo = (arg("titulo") ?? previo?.titulo ?? "").trim();
  const descripcion = (arg("descripcion") ?? previo?.descripcion ?? "").trim();
  if (!titulo) uso("--titulo: es obligatorio la primera vez que se pide permiso para un vídeo.");
  if (titulo.length > 200) uso("--titulo: máximo 200 caracteres.");
  if (descripcion.length > 2000) uso("--descripcion: máximo 2000 caracteres.");

  // Primero se comprueba la lista entera: si falta alguien, no se escribe nada.
  const alumnos = [];
  const fallos = [];
  for (const u of new Set(usuarios.map((x) => x.toLowerCase()))) {
    const a = await buscarAlumno(u);
    if (!a) fallos.push(`${u}: no existe ningún alumno con ese usuario o correo`);
    else if (a.ambiguo) fallos.push(`${u}: coincide con varios (${a.ambiguo.join(", ")}); usa el usuario exacto`);
    else if (!alumnos.some((x) => x.id === a.id)) alumnos.push(a);
  }
  if (fallos.length) {
    console.error(`✗ No se ha creado nada en la ${destino()}:\n  ${fallos.join("\n  ")}`);
    process.exit(1);
  }

  const [ya] = await db.query(
    `SELECT alumno_id FROM app_campus_permisos_video WHERE clave_video = ? AND alumno_id IN (${alumnos.map(() => "?").join(",")})`,
    [clave, ...alumnos.map((a) => a.id)],
  );
  const tienen = new Set(ya.map((f) => f.alumno_id));
  const nuevos = alumnos.filter((a) => !tienen.has(a.id));
  const [[{ n: cambianTexto }]] = await db.query(
    "SELECT COUNT(*) n FROM app_campus_permisos_video WHERE clave_video = ? AND (titulo <> ? OR descripcion <> ?)",
    [clave, titulo, descripcion],
  );

  console.log(`${simular ? "SIMULACIÓN · " : ""}Vídeo «${clave}» · ${titulo} · ${destino()}`);
  for (const a of alumnos) console.log(`  ${tienen.has(a.id) ? "= ya la tiene" : "+ nueva     "}  ${a.usuario}`);
  const ya_estaban = alumnos.length - nuevos.length;
  console.log(
    `  ${nuevos.length} ${nuevos.length === 1 ? "nueva" : "nuevas"} · ${ya_estaban} ya ${ya_estaban === 1 ? "estaba" : "estaban"} (no se toca su respuesta)` +
      (cambianTexto ? ` · título/descripción actualizados en ${cambianTexto}` : ""),
  );
  if (!nuevos.length && !cambianTexto) {
    console.log("✓ Nada que cambiar: ya estaba todo.");
    return;
  }
  if (simular) {
    console.log("  (sin --simular se guarda)");
    return;
  }

  await db.beginTransaction();
  try {
    const t = ahora();
    if (cambianTexto) {
      await db.query(
        "UPDATE app_campus_permisos_video SET titulo = ?, descripcion = ?, updated_at = ? WHERE clave_video = ? AND (titulo <> ? OR descripcion <> ?)",
        [titulo, descripcion, t, clave, titulo, descripcion],
      );
    }
    for (const a of nuevos) {
      await db.query(
        "INSERT IGNORE INTO app_campus_permisos_video (clave_video, titulo, descripcion, alumno_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
        [clave, titulo, descripcion, a.id, t, t],
      );
    }
    await db.commit();
  } catch (e) {
    await db.rollback();
    throw e;
  }
  console.log(`✓ Guardado. El alumnado lo verá al entrar en su aula.`);
}

async function exportar() {
  if (!clave) {
    const [videos] = await db.query(
      `SELECT clave_video, MIN(titulo) titulo, COUNT(*) total, SUM(acepta = 1) si, SUM(acepta = 0) no, SUM(acepta IS NULL) pendientes
         FROM app_campus_permisos_video GROUP BY clave_video ORDER BY MIN(created_at) DESC`,
    );
    if (!videos.length) uso(`--video: todavía no hay ninguna petición en la ${destino()}.`);
    console.error(`Vídeos en la ${destino()}:`);
    for (const v of videos) {
      const n = Number(v.total);
      console.error(`  ${v.clave_video} · ${v.titulo} · ${n} ${n === 1 ? "alumno" : "alumnos"} (${Number(v.si)} sí, ${Number(v.no)} no, ${Number(v.pendientes)} sin contestar)`);
    }
    uso("--video: elige una clave.");
  }
  const entregaId = arg("entrega") ? Number(arg("entrega")) : null;
  if (arg("entrega") && !entregaId) uso("--entrega: tiene que ser el número de la entrega.");

  const [filas] = await db.query(
    `SELECT p.*, u.usuario, u.nombre, u.apellidos, g.nombre AS grupo
            ${entregaId ? ", e.repo AS envio_repo, e.web AS envio_web" : ""}
       FROM app_campus_permisos_video p
       JOIN app_campus_usuarios u ON u.id = p.alumno_id
       LEFT JOIN app_campus_grupos g ON g.id = u.grupo_id
       ${entregaId ? "LEFT JOIN app_campus_envios e ON e.alumno_id = p.alumno_id AND e.entrega_id = ?" : ""}
      WHERE p.clave_video = ?
      ORDER BY g.nombre, u.apellidos, u.nombre`,
    entregaId ? [entregaId, clave] : [clave],
  );
  if (!filas.length) uso(`--video: no hay peticiones para «${clave}» en la ${destino()}.`);

  const alumnos = filas.map((f) => {
    const estado = f.acepta === null ? "pendiente" : f.acepta ? "si" : "no";
    const si = estado === "si";
    const contestado = estado !== "pendiente";
    return {
      usuario: f.usuario,
      nombre_completo: `${f.nombre} ${f.apellidos}`.trim(),
      grupo: f.grupo,
      estado,
      acepta: contestado ? si : null,
      // Pendiente = no hay permiso todavía: nada de lo demás vale.
      mostrar_nombre: contestado ? !!f.mostrar_nombre : null,
      nombre_mostrar: si && f.mostrar_nombre ? f.nombre_mostrar : null,
      mostrar_repo: contestado ? !!f.mostrar_repo : null,
      mostrar_info: contestado ? !!f.mostrar_info : null,
      solo_web: contestado ? !!f.solo_web : null,
      observaciones: si ? f.observaciones : null,
      respondido: f.respondido_at,
      ...(entregaId ? { web: si ? f.envio_web : null, repo: si && f.mostrar_repo ? f.envio_repo : null } : {}),
    };
  });
  const resumen = {
    total: alumnos.length,
    si: alumnos.filter((a) => a.estado === "si").length,
    no: alumnos.filter((a) => a.estado === "no").length,
    pendientes: alumnos.filter((a) => a.estado === "pendiente").length,
  };
  const salida = {
    exportado: new Date().toISOString(),
    origen: destino(),
    video: { clave, titulo: filas[0].titulo, descripcion: filas[0].descripcion },
    ...(entregaId ? { entrega: entregaId } : {}),
    resumen,
    alumnos,
  };

  const fichero = path.resolve(arg("salida") ?? path.join(TRABAJO, `permisos-video-${clave}.json`));
  fs.mkdirSync(path.dirname(fichero), { recursive: true });
  fs.writeFileSync(fichero, JSON.stringify(salida, null, 2) + "\n");
  console.log(`✓ «${clave}» desde la ${destino()}: ${resumen.si} sí · ${resumen.no} no · ${resumen.pendientes} sin contestar`);
  for (const a of alumnos) {
    const que = a.estado !== "si" ? [] : a.solo_web ? ["solo la web"] : [a.mostrar_nombre && `nombre «${a.nombre_mostrar}»`, a.mostrar_repo && "repo", a.mostrar_info && "info"].filter(Boolean);
    if (a.observaciones) que.push("con observaciones");
    console.log(`  ${a.estado.padEnd(9)} ${[a.usuario, ...que].join(" · ")}`);
  }
  const rel = path.relative(RAIZ, fichero);
  console.log(`  → ${rel.startsWith("..") ? fichero : rel}`);
}
