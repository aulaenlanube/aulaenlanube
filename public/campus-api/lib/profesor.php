<?php
// Campus · acciones del profesor: grupos, alumnado (altas con credenciales),
// entregas, seguimiento y calificación.
declare(strict_types=1);
if (!defined('CAMPUS_API')) { http_response_code(404); exit; }

// ── Credenciales ──────────────────────────────────────────────────────────────

// Palabras para contraseñas legibles (sin tildes ni eñes, fáciles de dictar):
// palabra-palabra-NNN → ~9 millones de combinaciones, con límite de intentos.
const PALABRAS_CLAVE = [
  'nube', 'luna', 'sol', 'rio', 'mar', 'pino', 'roble', 'tigre', 'lince', 'koala',
  'panda', 'puma', 'delfin', 'faro', 'isla', 'monte', 'valle', 'playa', 'bosque', 'rayo',
  'trueno', 'cometa', 'astro', 'orbita', 'pixel', 'byte', 'codigo', 'script', 'nodo', 'datos',
  'robot', 'chip', 'laser', 'radar', 'sonar', 'piano', 'violin', 'tambor', 'flauta', 'jazz',
  'rock', 'tango', 'mango', 'kiwi', 'limon', 'fresa', 'cereza', 'pera', 'coco', 'menta',
  'canela', 'cacao', 'miel', 'azul', 'verde', 'ambar', 'coral', 'jade', 'plata', 'bronce',
  'cobre', 'acero', 'papel', 'lapiz', 'tinta', 'libro', 'mapa', 'ancla', 'vela', 'remo',
  'barco', 'tren', 'cohete', 'dron', 'globo', 'zorro', 'lobo', 'oso', 'aguila', 'halcon',
  'buho', 'gato', 'nutria', 'foca', 'ballena', 'pulpo', 'medusa', 'cactus', 'helecho', 'girasol',
  'volcan', 'glaciar', 'duna', 'oasis', 'cumbre', 'bahia', 'puente', 'torre', 'castillo', 'molino',
];

function clave_aleatoria(): string
{
  $n = count(PALABRAS_CLAVE);
  $a = PALABRAS_CLAVE[random_int(0, $n - 1)];
  do { $b = PALABRAS_CLAVE[random_int(0, $n - 1)]; } while ($b === $a);
  return $a . '-' . $b . '-' . random_int(100, 999);
}

function sin_tildes(string $s): string
{
  $s = mb_strtolower($s);
  return strtr($s, [
    'á' => 'a', 'à' => 'a', 'ä' => 'a', 'â' => 'a', 'ã' => 'a',
    'é' => 'e', 'è' => 'e', 'ë' => 'e', 'ê' => 'e',
    'í' => 'i', 'ì' => 'i', 'ï' => 'i', 'î' => 'i',
    'ó' => 'o', 'ò' => 'o', 'ö' => 'o', 'ô' => 'o', 'õ' => 'o',
    'ú' => 'u', 'ù' => 'u', 'ü' => 'u', 'û' => 'u',
    'ñ' => 'n', 'ç' => 'c', '·' => '', "'" => '',
  ]);
}

/** «María José» + «García López» → maria.garcia (único: maria.garcia2, 3…). */
function usuario_libre(string $nombre, string $apellidos): string
{
  $pal = fn(string $s) => preg_replace('/[^a-z0-9]/', '', explode(' ', trim(sin_tildes($s)) . ' ')[0]);
  $base = $pal($nombre);
  $ape = $pal($apellidos);
  if ($base === '') $base = 'alumno';
  if ($ape !== '') $base .= '.' . $ape;
  $base = substr($base, 0, 40);
  $cand = $base;
  for ($i = 2; fila('SELECT 1 FROM app_campus_usuarios WHERE usuario = ?', [$cand]); $i++) {
    $cand = $base . $i;
  }
  return $cand;
}

function alumno_de_profesor(int $id): array
{
  $a = fila("SELECT * FROM app_campus_usuarios WHERE id = ? AND rol = 'alumno'", [$id]);
  if (!$a) fallo(404, 'Ese alumno no existe.');
  return $a;
}

function grupo_existente(int $id): array
{
  $g = fila('SELECT * FROM app_campus_grupos WHERE id = ?', [$id]);
  if (!$g) fallo(404, 'Ese grupo no existe.');
  return $g;
}

function grupo_publico(array $g): array
{
  return [
    'id' => (int)$g['id'],
    'nombre' => $g['nombre'],
    'curso' => $g['curso'],
    'anyo' => $g['anyo'],
    'archivado' => (bool)$g['archivado'],
  ];
}

function alumno_publico(array $a): array
{
  return [
    'id' => (int)$a['id'],
    'usuario' => $a['usuario'],
    'nombre' => $a['nombre'],
    'apellidos' => $a['apellidos'],
    'email' => $a['email'],
    'grupo_id' => $a['grupo_id'] === null ? null : (int)$a['grupo_id'],
    'activo' => (bool)$a['activo'],
    'ultimo_acceso' => $a['ultimo_acceso'],
    'created_at' => $a['created_at'],
  ];
}

// Un envío está «por corregir» si no tiene nota publicada o si el alumno lo
// ha actualizado después de la última corrección.
const SQL_POR_CORREGIR = '(n.id IS NULL OR n.publicada = 0 OR e.updated_at > n.updated_at)';

// ── Resumen ───────────────────────────────────────────────────────────────────

function accion_prof_resumen(): never
{
  exigir('profesor');
  $grupos = filas(
    "SELECT g.*,
       (SELECT COUNT(*) FROM app_campus_usuarios u WHERE u.grupo_id = g.id AND u.rol = 'alumno' AND u.activo = 1) AS alumnos,
       (SELECT COUNT(*) FROM app_campus_envios e
          JOIN app_campus_usuarios u ON u.id = e.alumno_id
          LEFT JOIN app_campus_notas n ON n.entrega_id = e.entrega_id AND n.alumno_id = e.alumno_id
         WHERE u.grupo_id = g.id AND " . SQL_POR_CORREGIR . ") AS por_corregir
     FROM app_campus_grupos g
     ORDER BY g.archivado, g.curso, g.nombre"
  );
  $entregas = filas(
    'SELECT x.*,
       (SELECT COUNT(*) FROM app_campus_envios e WHERE e.entrega_id = x.id) AS envios,
       (SELECT COUNT(*) FROM app_campus_notas n WHERE n.entrega_id = x.id AND n.publicada = 1) AS publicadas
     FROM app_campus_entregas x ORDER BY x.curso, x.orden, x.id'
  );
  responder([
    'grupos' => array_map(fn($g) => grupo_publico($g) + ['alumnos' => (int)$g['alumnos'], 'por_corregir' => (int)$g['por_corregir']], $grupos),
    'entregas' => array_map(fn($e) => entrega_publica($e) + ['envios' => (int)$e['envios'], 'publicadas' => (int)$e['publicadas']], $entregas),
  ]);
}

// ── Grupos ────────────────────────────────────────────────────────────────────

function accion_prof_grupo_guardar(array $in): never
{
  exigir('profesor');
  $nombre = txt($in, 'nombre', 120, true, 'nombre del grupo');
  $curso = curso_valido(txt($in, 'curso', 20));
  $anyo = txt($in, 'anyo', 9, false) ?: '2026-27';
  if (!preg_match('/^\d{4}-\d{2}$/', $anyo)) fallo(422, 'El curso académico va como 2026-27.');
  $archivado = bool_de($in, 'archivado') ? 1 : 0;
  if (!empty($in['id'])) {
    $g = grupo_existente(ent($in, 'id'));
    q('UPDATE app_campus_grupos SET nombre = ?, curso = ?, anyo = ?, archivado = ? WHERE id = ?', [$nombre, $curso, $anyo, $archivado, $g['id']]);
    $id = (int)$g['id'];
  } else {
    q('INSERT INTO app_campus_grupos (nombre, curso, anyo, archivado, created_at) VALUES (?, ?, ?, 0, ?)', [$nombre, $curso, $anyo, ahora()]);
    $id = (int)db()->lastInsertId();
  }
  responder(['grupo' => grupo_publico(grupo_existente($id))]);
}

function accion_prof_grupo_borrar(array $in): never
{
  exigir('profesor');
  $g = grupo_existente(ent($in, 'id'));
  $n = (int)fila('SELECT COUNT(*) n FROM app_campus_usuarios WHERE grupo_id = ?', [$g['id']])['n'];
  if ($n > 0) fallo(409, "El grupo tiene $n alumnos: muévelos o bórralos antes (o archívalo).");
  q('DELETE FROM app_campus_grupos WHERE id = ?', [$g['id']]);
  responder();
}

function accion_prof_grupo(array $in): never
{
  exigir('profesor');
  $g = grupo_existente(ent($in, 'id'));
  $alumnos = filas(
    "SELECT * FROM app_campus_usuarios WHERE grupo_id = ? AND rol = 'alumno' ORDER BY apellidos, nombre",
    [$g['id']]
  );
  responder(['grupo' => grupo_publico($g), 'alumnos' => array_map('alumno_publico', $alumnos)]);
}

// ── Alumnado ──────────────────────────────────────────────────────────────────

/** Alta de uno o varios alumnos. Devuelve sus credenciales (la contraseña solo se ve aquí). */
function accion_prof_alumnos_crear(array $in): never
{
  exigir('profesor');
  $g = grupo_existente(ent($in, 'grupo_id'));
  $lista = $in['alumnos'] ?? null;
  if (!is_array($lista) || !$lista) fallo(422, 'No hay alumnos que dar de alta.');
  if (count($lista) > 80) fallo(422, 'Como mucho 80 alumnos de una vez.');
  $limpia = [];
  foreach (array_values($lista) as $i => $a) {
    if (!is_array($a)) fallo(422, 'Lista de alumnos no válida.');
    $fila = $i + 1;
    $nombre = txt($a, 'nombre', 80, true, "nombre (fila $fila)");
    $apellidos = txt($a, 'apellidos', 120, false);
    $email = txt($a, 'email', 190, false);
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) fallo(422, "El correo de la fila $fila no es válido.");
    $limpia[] = [$nombre, $apellidos, $email !== '' ? mb_strtolower($email) : null];
  }
  $creados = transaccion(function () use ($limpia, $g) {
    $out = [];
    foreach ($limpia as [$nombre, $apellidos, $email]) {
      $usuario = usuario_libre($nombre, $apellidos);
      $clave = clave_aleatoria();
      q(
        "INSERT INTO app_campus_usuarios (rol, usuario, nombre, apellidos, email, grupo_id, pass_hash, activo, created_at)
         VALUES ('alumno', ?, ?, ?, ?, ?, ?, 1, ?)",
        [$usuario, $nombre, $apellidos, $email, $g['id'], password_hash($clave, PASSWORD_DEFAULT), ahora()]
      );
      $out[] = ['id' => (int)db()->lastInsertId(), 'nombre' => $nombre, 'apellidos' => $apellidos, 'usuario' => $usuario, 'password' => $clave];
    }
    return $out;
  });
  responder(['credenciales' => $creados, 'grupo' => grupo_publico($g)]);
}

function accion_prof_alumno_guardar(array $in): never
{
  exigir('profesor');
  $a = alumno_de_profesor(ent($in, 'id'));
  $nombre = txt($in, 'nombre', 80, true, 'nombre');
  $apellidos = txt($in, 'apellidos', 120, false);
  $email = txt($in, 'email', 190, false);
  if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) fallo(422, 'El correo no es válido.');
  $grupo = grupo_existente(ent($in, 'grupo_id'));
  $activo = bool_de($in, 'activo', true) ? 1 : 0;
  q(
    'UPDATE app_campus_usuarios SET nombre = ?, apellidos = ?, email = ?, grupo_id = ?, activo = ? WHERE id = ?',
    [$nombre, $apellidos, $email !== '' ? mb_strtolower($email) : null, $grupo['id'], $activo, $a['id']]
  );
  if (!$activo) q('DELETE FROM app_campus_sesiones WHERE usuario_id = ?', [$a['id']]);
  responder(['alumno' => alumno_publico(alumno_de_profesor((int)$a['id']))]);
}

/** Nueva contraseña para un alumno (y le cierra las sesiones abiertas). */
function accion_prof_alumno_clave(array $in): never
{
  exigir('profesor');
  $a = alumno_de_profesor(ent($in, 'id'));
  $clave = clave_aleatoria();
  q('UPDATE app_campus_usuarios SET pass_hash = ? WHERE id = ?', [password_hash($clave, PASSWORD_DEFAULT), $a['id']]);
  q('DELETE FROM app_campus_sesiones WHERE usuario_id = ?', [$a['id']]);
  q('DELETE FROM app_campus_intentos WHERE usuario = ?', [$a['usuario']]);
  responder(['credencial' => ['id' => (int)$a['id'], 'nombre' => $a['nombre'], 'apellidos' => $a['apellidos'], 'usuario' => $a['usuario'], 'password' => $clave]]);
}

/** Borra un alumno con TODAS sus entregas y notas (irreversible). */
function accion_prof_alumno_borrar(array $in): never
{
  exigir('profesor');
  $a = alumno_de_profesor(ent($in, 'id'));
  q('DELETE FROM app_campus_usuarios WHERE id = ?', [$a['id']]);
  responder();
}

// ── Entregas ──────────────────────────────────────────────────────────────────

function accion_prof_entrega_guardar(array $in): never
{
  exigir('profesor');
  $curso = curso_valido(txt($in, 'curso', 20));
  $proyecto = txt($in, 'proyecto', 40, true, 'proyecto');
  $sesion = txt($in, 'sesion', 40, false);
  foreach ([$proyecto, $sesion] as $idc) {
    if ($idc !== '' && !preg_match('/^[a-z0-9-]{1,40}$/', $idc)) fallo(422, 'Proyecto o sesión no válidos.');
  }
  $titulo = txt($in, 'titulo', 160, true, 'título');
  $instr = txt($in, 'instrucciones', 20000, false);
  $tipo = txt($in, 'tipo', 20);
  if (!in_array($tipo, TIPOS_ENTREGA, true)) fallo(422, 'Tipo de entrega no válido.');
  $rubrica = txt($in, 'rubrica', 40, false);
  if ($rubrica !== '' && !preg_match('/^[a-z0-9-]{1,40}$/', $rubrica)) fallo(422, 'Rúbrica no válida.');
  $limite = fecha_de($in, 'fecha_limite');
  $abierta = bool_de($in, 'abierta', true) ? 1 : 0;
  $visible = bool_de($in, 'visible', true) ? 1 : 0;
  $orden = isset($in['orden']) && $in['orden'] !== '' ? max(-9999, min(9999, (int)$in['orden'])) : 0;
  $vals = [$curso, $proyecto, $sesion !== '' ? $sesion : null, $titulo, $instr, $tipo, $rubrica !== '' ? $rubrica : null, $limite, $abierta, $visible, $orden];

  if (!empty($in['id'])) {
    $id = ent($in, 'id');
    if (!fila('SELECT 1 FROM app_campus_entregas WHERE id = ?', [$id])) fallo(404, 'Esa entrega no existe.');
    q(
      'UPDATE app_campus_entregas SET curso = ?, proyecto = ?, sesion = ?, titulo = ?, instrucciones = ?, tipo = ?,
         rubrica = ?, fecha_limite = ?, abierta = ?, visible = ?, orden = ? WHERE id = ?',
      [...$vals, $id]
    );
  } else {
    q(
      'INSERT INTO app_campus_entregas (curso, proyecto, sesion, titulo, instrucciones, tipo, rubrica, fecha_limite, abierta, visible, orden, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [...$vals, ahora()]
    );
    $id = (int)db()->lastInsertId();
  }
  responder(['entrega' => entrega_publica(fila('SELECT * FROM app_campus_entregas WHERE id = ?', [$id]))]);
}

function accion_prof_entrega_borrar(array $in): never
{
  exigir('profesor');
  $id = ent($in, 'id');
  $n = (int)fila('SELECT COUNT(*) n FROM app_campus_envios WHERE entrega_id = ?', [$id])['n'];
  if ($n > 0 && !bool_de($in, 'forzar')) {
    fallo(409, "Esta entrega ya tiene $n envíos de alumnos. Ciérrala u ocúltala en lugar de borrarla.");
  }
  q('DELETE FROM app_campus_entregas WHERE id = ?', [$id]);
  responder();
}

// ── Seguimiento y notas ───────────────────────────────────────────────────────

/** Todo lo de un grupo: alumnado, entregas de su curso, envíos y notas (también borradores). */
function accion_prof_seguimiento(array $in): never
{
  exigir('profesor');
  $g = grupo_existente(ent($in, 'grupo_id'));
  $alumnos = filas("SELECT * FROM app_campus_usuarios WHERE grupo_id = ? AND rol = 'alumno' ORDER BY apellidos, nombre", [$g['id']]);
  $entregas = filas('SELECT * FROM app_campus_entregas WHERE curso = ? ORDER BY orden, id', [$g['curso']]);
  [$marcas, $ids] = en_lista(array_column($alumnos, 'id'));
  $envios = filas("SELECT * FROM app_campus_envios WHERE alumno_id IN ($marcas)", $ids);
  $notas = filas("SELECT * FROM app_campus_notas WHERE alumno_id IN ($marcas)", $ids);
  responder([
    'grupo' => grupo_publico($g),
    'alumnos' => array_map('alumno_publico', $alumnos),
    'entregas' => array_map('entrega_publica', $entregas),
    'envios' => array_map('envio_publico', $envios),
    'notas' => array_map(fn($n) => nota_publica($n, true) + ['origen' => $n['origen'], 'nota_privada' => $n['nota_privada']], $notas),
  ]);
}

function valoraciones_limpias(mixed $v): ?string
{
  if ($v === null || $v === []) return null;
  if (!is_array($v)) fallo(422, 'Valoraciones no válidas.');
  $out = [];
  foreach ($v as $k => $x) {
    if (!is_string($k) || !preg_match('/^[a-z0-9-]{1,40}$/', $k) || !is_array($x)) fallo(422, 'Valoraciones no válidas.');
    $n = $x['n'] ?? null;
    if (!is_int($n) || $n < 0 || $n > 9) fallo(422, 'Nivel de rúbrica no válido.');
    $c = isset($x['c']) ? trim((string)$x['c']) : '';
    if (mb_strlen($c) > 3000) fallo(422, 'Comentario de criterio demasiado largo.');
    $out[$k] = $c !== '' ? ['n' => $n, 'c' => $c] : ['n' => $n];
  }
  return json_encode($out, JSON_UNESCAPED_UNICODE);
}

function minimos_limpios(mixed $v): ?string
{
  if ($v === null || $v === []) return null;
  if (!is_array($v)) fallo(422, 'Requisitos mínimos no válidos.');
  $out = [];
  foreach ($v as $k => $x) {
    if (!is_string($k) || !preg_match('/^[a-z0-9-]{1,40}$/', $k)) fallo(422, 'Requisitos mínimos no válidos.');
    $out[$k] = (bool)$x;
  }
  return json_encode($out, JSON_UNESCAPED_UNICODE);
}

/**
 * Guarda (o publica) la corrección de un alumno. La nota la calcula el panel
 * con la rúbrica compartida (lib/campus/rubricas.ts); aquí solo se valida y se
 * guarda. Al guardar desde el panel, la corrección pasa a ser del profesor
 * (origen 'profesor'), aunque partiera de una propuesta de la IA o de una
 * doble corrección (que se descarta: el detalle ya no coincidiría con la nota).
 */
function accion_prof_nota_guardar(array $in): never
{
  exigir('profesor');
  $entregaId = ent($in, 'entrega_id');
  $alumno = alumno_de_profesor(ent($in, 'alumno_id'));
  if (!fila('SELECT 1 FROM app_campus_entregas WHERE id = ?', [$entregaId])) fallo(404, 'Esa entrega no existe.');
  $nota = $in['nota'] ?? null;
  if ($nota !== null) {
    if (!is_int($nota) && !is_float($nota)) fallo(422, 'Nota no válida.');
    if ($nota < 0 || $nota > 10) fallo(422, 'La nota va de 0 a 10.');
    $nota = round((float)$nota, 2);
  }
  $publicada = bool_de($in, 'publicada') ? 1 : 0;
  $ahora = ahora();
  $previa = fila('SELECT publicada, publicada_at FROM app_campus_notas WHERE entrega_id = ? AND alumno_id = ?', [$entregaId, $alumno['id']]);
  $publicadaAt = $publicada ? (($previa && (int)$previa['publicada'] === 1) ? $previa['publicada_at'] : $ahora) : null;
  $comentario = txt($in, 'comentario', 20000, false);
  $privada = txt($in, 'nota_privada', 20000, false);

  q(
    "INSERT INTO app_campus_notas (entrega_id, alumno_id, valoraciones, minimos, nota, no_evaluable, comentario, nota_privada, origen, publicada, publicada_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'profesor', ?, ?, ?)
     ON DUPLICATE KEY UPDATE valoraciones = VALUES(valoraciones), minimos = VALUES(minimos), nota = VALUES(nota),
       no_evaluable = VALUES(no_evaluable), comentario = VALUES(comentario), nota_privada = VALUES(nota_privada),
       correcciones = NULL, origen = 'profesor', publicada = VALUES(publicada), publicada_at = VALUES(publicada_at), updated_at = VALUES(updated_at)",
    [
      $entregaId, $alumno['id'],
      valoraciones_limpias($in['valoraciones'] ?? null),
      minimos_limpios($in['minimos'] ?? null),
      $nota, bool_de($in, 'no_evaluable') ? 1 : 0,
      $comentario !== '' ? $comentario : null,
      $privada !== '' ? $privada : null,
      $publicada, $publicadaAt, $ahora,
    ]
  );
  $n = fila('SELECT * FROM app_campus_notas WHERE entrega_id = ? AND alumno_id = ?', [$entregaId, $alumno['id']]);
  responder(['nota' => nota_publica($n, true) + ['origen' => $n['origen'], 'nota_privada' => $n['nota_privada']]]);
}

/** Publica o despublica una corrección tal cual está (p. ej., una doble corrección). */
function accion_prof_nota_estado(array $in): never
{
  exigir('profesor');
  $entregaId = ent($in, 'entrega_id');
  $alumno = alumno_de_profesor(ent($in, 'alumno_id'));
  $n = fila('SELECT * FROM app_campus_notas WHERE entrega_id = ? AND alumno_id = ?', [$entregaId, $alumno['id']]);
  if (!$n) fallo(404, 'Ese alumno no tiene corrección en esta entrega.');
  if ($n['origen'] === 'ia') fallo(409, 'Es una propuesta de la IA sin revisar: ábrela y guárdala antes de publicarla.');
  $publicar = bool_de($in, 'publicada');
  q(
    'UPDATE app_campus_notas SET publicada = ?, publicada_at = ? WHERE id = ?',
    [$publicar ? 1 : 0, $publicar ? ($n['publicada_at'] ?: ahora()) : null, $n['id']]
  );
  $n = fila('SELECT * FROM app_campus_notas WHERE id = ?', [$n['id']]);
  responder(['nota' => nota_publica($n, true) + ['origen' => $n['origen'], 'nota_privada' => $n['nota_privada']]]);
}

function accion_prof_nota_borrar(array $in): never
{
  exigir('profesor');
  q('DELETE FROM app_campus_notas WHERE entrega_id = ? AND alumno_id = ?', [ent($in, 'entrega_id'), ent($in, 'alumno_id')]);
  responder();
}

/**
 * Publica de golpe las correcciones de una entrega en un grupo: las del
 * profesor y las dobles correcciones. Las propuestas de la IA sin revisar se
 * quedan como borrador (y se cuentan en la respuesta).
 */
function accion_prof_notas_publicar(array $in): never
{
  exigir('profesor');
  $entregaId = ent($in, 'entrega_id');
  $g = grupo_existente(ent($in, 'grupo_id'));
  $st = q(
    "UPDATE app_campus_notas n JOIN app_campus_usuarios u ON u.id = n.alumno_id
        SET n.publicada = 1, n.publicada_at = ?
      WHERE n.entrega_id = ? AND u.grupo_id = ? AND n.publicada = 0 AND n.origen IN ('profesor', 'doble')",
    [ahora(), $entregaId, $g['id']]
  );
  $sinRevisar = (int)fila(
    "SELECT COUNT(*) n FROM app_campus_notas n JOIN app_campus_usuarios u ON u.id = n.alumno_id
      WHERE n.entrega_id = ? AND u.grupo_id = ? AND n.publicada = 0 AND n.origen = 'ia'",
    [$entregaId, $g['id']]
  )['n'];
  responder(['publicadas' => $st->rowCount(), 'ia_sin_revisar' => $sinRevisar]);
}
