<?php
// Campus · permisos para vídeos (creado 09-11-2026). Antes de publicar en el
// canal de YouTube Aula en la Nube un vídeo con webs del alumnado, el profesor
// pide permiso a cada alumno elegido (una fila por vídeo y alumno). El alumno
// lo ve en su aula, contesta sí o no y, si dice que sí, qué puede salir: su
// nombre (como él quiera), su repositorio, lo que su web cuenta de él o solo la
// web. Puede cambiar su respuesta cuando quiera. La nota no sale nunca.
declare(strict_types=1);
if (!defined('CAMPUS_API')) { http_response_code(404); exit; }

const PERMISO_CLAVE_RE = '/^[a-z0-9][a-z0-9-]{0,59}$/';
const PERMISO_MAX_ALUMNOS = 200;

/** ¿El error es porque la tabla aún no existe (desplegado antes de migrar)? */
function permisos_tabla_falta(PDOException $e): bool
{
  return $e->getCode() === '42S02';
}

function permiso_estado(array $p): string
{
  return $p['acepta'] === null ? 'pendiente' : ((int)$p['acepta'] ? 'si' : 'no');
}

function permiso_video_publico(array $p): array
{
  return [
    'id' => (int)$p['id'],
    'clave_video' => $p['clave_video'],
    'titulo' => $p['titulo'],
    'descripcion' => $p['descripcion'],
    'estado' => permiso_estado($p),
    'mostrar_nombre' => (bool)$p['mostrar_nombre'],
    'nombre_mostrar' => $p['nombre_mostrar'],
    'mostrar_repo' => (bool)$p['mostrar_repo'],
    'mostrar_info' => (bool)$p['mostrar_info'],
    'solo_web' => (bool)$p['solo_web'],
    'observaciones' => $p['observaciones'],
    'respondido_at' => $p['respondido_at'],
    'created_at' => $p['created_at'],
  ];
}

// ── Alumnado ──────────────────────────────────────────────────────────────────

/** Las peticiones de permiso del alumno (solo las suyas). */
function accion_alumno_permisos_video(): never
{
  $u = exigir('alumno');
  try {
    $filas = filas('SELECT * FROM app_campus_permisos_video WHERE alumno_id = ? ORDER BY created_at, id', [(int)$u['id']]);
  } catch (PDOException $e) {
    // Sin la tabla todavía, el aula sigue funcionando: simplemente no hay peticiones.
    if (permisos_tabla_falta($e)) responder(['permisos' => []]);
    throw $e;
  }
  responder(['permisos' => array_map('permiso_video_publico', $filas)]);
}

/**
 * El alumno contesta (o cambia su respuesta). Con «sí», «solo la web» excluye
 * lo demás; y si no marca nada, es que solo sale la web.
 */
function accion_alumno_permiso_video_responder(array $in): never
{
  $u = exigir('alumno');
  $p = fila('SELECT * FROM app_campus_permisos_video WHERE id = ? AND alumno_id = ?', [ent($in, 'id'), (int)$u['id']]);
  if (!$p) fallo(404, 'Esa petición de permiso no existe.');
  $acepta = $in['acepta'] ?? null;
  if (!is_bool($acepta)) fallo(422, 'Elige si tu web puede salir en el vídeo o no.');

  $nombre = $repo = $info = $solo = false;
  $nombreMostrar = $obs = null;
  if ($acepta) {
    $solo = bool_de($in, 'solo_web');
    if (!$solo) {
      $nombre = bool_de($in, 'mostrar_nombre');
      $repo = bool_de($in, 'mostrar_repo');
      $info = bool_de($in, 'mostrar_info');
      if (!$nombre && !$repo && !$info) $solo = true;
    }
    if ($nombre) {
      // Una sola línea: sin saltos ni espacios repetidos.
      $nombreMostrar = preg_replace('/\s+/u', ' ', txt($in, 'nombre_mostrar', 120, true, 'cómo quieres que salga tu nombre'));
    }
    $o = txt($in, 'observaciones', 1000, false, 'lo que prefieres que no salga');
    $obs = $o !== '' ? $o : null;
  }
  $ahora = ahora();
  q(
    'UPDATE app_campus_permisos_video
        SET acepta = ?, mostrar_nombre = ?, nombre_mostrar = ?, mostrar_repo = ?, mostrar_info = ?, solo_web = ?,
            observaciones = ?, respondido_at = ?, updated_at = ?
      WHERE id = ?',
    [$acepta ? 1 : 0, (int)$nombre, $nombreMostrar, (int)$repo, (int)$info, (int)$solo, $obs, $ahora, $ahora, (int)$p['id']]
  );
  responder(['permiso' => permiso_video_publico(fila('SELECT * FROM app_campus_permisos_video WHERE id = ?', [(int)$p['id']]))]);
}

// ── Profesorado ───────────────────────────────────────────────────────────────

/** Todas las peticiones, agrupadas por vídeo (el más reciente primero). */
function accion_prof_permisos_video(): never
{
  exigir('profesor');
  try {
    $filas = filas(
      'SELECT p.*, u.usuario, u.nombre, u.apellidos, u.activo, u.grupo_id, g.nombre AS grupo_nombre, g.curso
         FROM app_campus_permisos_video p
         JOIN app_campus_usuarios u ON u.id = p.alumno_id
         LEFT JOIN app_campus_grupos g ON g.id = u.grupo_id
        ORDER BY g.nombre, u.apellidos, u.nombre'
    );
  } catch (PDOException $e) {
    if (permisos_tabla_falta($e)) fallo(503, 'Falta la tabla de permisos para vídeos: aplica la migración (node tools/campus/migrar.mjs).');
    throw $e;
  }
  $videos = [];
  foreach ($filas as $f) {
    $c = $f['clave_video'];
    $v = $videos[$c] ?? ['clave_video' => $c, 'titulo' => $f['titulo'], 'descripcion' => $f['descripcion'], 'total' => 0, 'si' => 0, 'no' => 0, 'pendientes' => 0, 'created_at' => $f['created_at']];
    $v['total']++;
    $estado = permiso_estado($f);
    $v[$estado === 'pendiente' ? 'pendientes' : $estado]++;
    if ($f['created_at'] < $v['created_at']) $v['created_at'] = $f['created_at'];
    $videos[$c] = $v;
  }
  $videos = array_values($videos);
  usort($videos, fn($a, $b) => strcmp($b['created_at'], $a['created_at']) ?: strcmp($a['clave_video'], $b['clave_video']));
  responder([
    'videos' => $videos,
    'peticiones' => array_map(fn($f) => permiso_video_publico($f) + [
      'alumno_id' => (int)$f['alumno_id'],
      'usuario' => $f['usuario'],
      'nombre' => $f['nombre'],
      'apellidos' => $f['apellidos'],
      'activo' => (bool)$f['activo'],
      'grupo_id' => $f['grupo_id'] === null ? null : (int)$f['grupo_id'],
      'grupo' => $f['grupo_nombre'],
      'updated_at' => $f['updated_at'],
    ], $filas),
  ]);
}

/**
 * Crea la petición de un vídeo para varios alumnos. Idempotente: a quien ya la
 * tiene no se le toca la respuesta; si cambian el título o la descripción, se
 * actualizan en todas las filas del vídeo (es el mismo vídeo para todos).
 */
function accion_prof_permisos_video_crear(array $in): never
{
  exigir('profesor');
  $clave = mb_strtolower(txt($in, 'clave_video', 60, true, 'clave del vídeo'));
  if (!preg_match(PERMISO_CLAVE_RE, $clave)) fallo(422, 'La clave del vídeo va en minúsculas, con números y guiones (por ejemplo: mejores-webs-p1).');
  $titulo = txt($in, 'titulo', 200, true, 'título del vídeo');
  $descripcion = txt($in, 'descripcion', 2000, false, 'descripción del vídeo');
  $ids = $in['alumno_ids'] ?? [];
  if (!is_array($ids)) fallo(422, 'Lista de alumnos no válida.');
  $ids = array_values(array_unique(array_map('intval', $ids)));
  if (count($ids) > PERMISO_MAX_ALUMNOS) fallo(422, 'Como mucho ' . PERMISO_MAX_ALUMNOS . ' alumnos de una vez.');
  $existe = (bool)fila('SELECT 1 FROM app_campus_permisos_video WHERE clave_video = ? LIMIT 1', [$clave]);
  if (!$ids && !$existe) fallo(422, 'Elige al menos un alumno.');
  if ($ids) {
    [$marcas, $vals] = en_lista($ids);
    $n = (int)fila("SELECT COUNT(*) n FROM app_campus_usuarios WHERE rol = 'alumno' AND id IN ($marcas)", $vals)['n'];
    if ($n !== count($ids)) fallo(404, 'Alguno de los alumnos elegidos no existe.');
  }
  $r = transaccion(function () use ($clave, $titulo, $descripcion, $ids) {
    $ahora = ahora();
    $act = q(
      'UPDATE app_campus_permisos_video SET titulo = ?, descripcion = ?, updated_at = ?
        WHERE clave_video = ? AND (titulo <> ? OR descripcion <> ?)',
      [$titulo, $descripcion, $ahora, $clave, $titulo, $descripcion]
    )->rowCount();
    $creadas = 0;
    foreach ($ids as $id) {
      $creadas += q(
        'INSERT IGNORE INTO app_campus_permisos_video (clave_video, titulo, descripcion, alumno_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?)',
        [$clave, $titulo, $descripcion, $id, $ahora, $ahora]
      )->rowCount();
    }
    return ['creadas' => $creadas, 'ya_estaban' => count($ids) - $creadas, 'actualizadas' => $act];
  });
  responder($r);
}

/** Quita una petición que el alumno aún no ha contestado (las contestadas no se borran). */
function accion_prof_permiso_video_quitar(array $in): never
{
  exigir('profesor');
  $p = fila('SELECT id, acepta FROM app_campus_permisos_video WHERE id = ?', [ent($in, 'id')]);
  if (!$p) fallo(404, 'Esa petición no existe.');
  if ($p['acepta'] !== null) fallo(409, 'Ese alumno ya ha contestado: su respuesta no se borra.');
  q('DELETE FROM app_campus_permisos_video WHERE id = ? AND acepta IS NULL', [(int)$p['id']]);
  responder();
}
