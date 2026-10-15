<?php
// Campus · herramienta de equipos del proyecto en grupo (creado 15-10-2026).
// El alumnado crea y gestiona sus equipos (4-5 personas, uno por alumno); el
// profesorado ve el estado del grupo-clase y puede repartir aleatoriamente a
// quien no tenga equipo. Solo afecta a alumnos del propio grupo-clase.
declare(strict_types=1);
if (!defined('CAMPUS_API')) { http_response_code(404); exit; }

const EQUIPO_MIN = 4;
const EQUIPO_MAX = 5;

/** Todos los equipos de un grupo-clase con sus miembros (orden estables). */
function equipos_lista(int $grupo_id): array
{
  $equipos = filas(
    'SELECT id, nombre, creado_por, created_at FROM app_campus_equipos
      WHERE grupo_id = ? ORDER BY nombre, id',
    [$grupo_id]
  );
  if (!$equipos) return [];
  $ids = array_map(fn($e) => (int)$e['id'], $equipos);
  [$marcas, $vals] = en_lista($ids);
  $miembros = filas(
    "SELECT m.equipo_id, m.alumno_id, m.es_lider, u.nombre, u.apellidos, u.usuario
       FROM app_campus_equipo_miembros m
       JOIN app_campus_usuarios u ON u.id = m.alumno_id
      WHERE m.equipo_id IN ($marcas)
      ORDER BY m.es_lider DESC, u.nombre, u.apellidos",
    $vals
  );
  $por_equipo = [];
  foreach ($miembros as $m) {
    $por_equipo[(int)$m['equipo_id']][] = [
      'id' => (int)$m['alumno_id'],
      'nombre' => $m['nombre'],
      'apellidos' => $m['apellidos'],
      'usuario' => $m['usuario'],
      'lider' => (bool)$m['es_lider'],
    ];
  }
  $salida = [];
  foreach ($equipos as $e) {
    $salida[] = [
      'id' => (int)$e['id'],
      'nombre' => $e['nombre'],
      'created_at' => $e['created_at'],
      'miembros' => $por_equipo[(int)$e['id']] ?? [],
    ];
  }
  return $salida;
}

/** Alumnos del grupo-clase que NO tienen equipo (y no soy yo). */
function alumnos_sin_equipo(int $grupo_id, ?int $excepto_id = null): array
{
  $sql = 'SELECT u.id, u.nombre, u.apellidos, u.usuario
            FROM app_campus_usuarios u
            LEFT JOIN app_campus_equipo_miembros m ON m.alumno_id = u.id
           WHERE u.grupo_id = ? AND u.rol = ? AND u.activo = 1 AND m.alumno_id IS NULL';
  $params = [$grupo_id, 'alumno'];
  if ($excepto_id !== null) { $sql .= ' AND u.id <> ?'; $params[] = $excepto_id; }
  return filas($sql . ' ORDER BY u.nombre, u.apellidos', $params);
}

/** Equipo de un alumno (con miembros) o null. */
function equipo_de_alumno(int $alumno_id): ?array
{
  $fila = fila(
    'SELECT e.id, e.nombre, e.grupo_id, e.creado_por, e.created_at, m.es_lider
       FROM app_campus_equipo_miembros m
       JOIN app_campus_equipos e ON e.id = m.equipo_id
      WHERE m.alumno_id = ?',
    [$alumno_id]
  );
  if (!$fila) return null;
  foreach (equipos_lista((int)$fila['grupo_id']) as $e) {
    if ($e['id'] === (int)$fila['id']) return $e + ['yo_lider' => (bool)$fila['es_lider']];
  }
  return null;
}

/** Valida ids de compañeros nuevos: mismo grupo, activos, sin equipo. Devuelve filas. */
function validar_companeros(int $grupo_id, array $ids, int $alumno_actual): array
{
  $ids = array_values(array_unique(array_map('intval', $ids)));
  if (!$ids) fallo(422, 'Elige a los compañeros del equipo.');
  foreach ($ids as $id) if ($id === $alumno_actual) fallo(422, 'Tú ya estás en el equipo.');
  [$marcas, $vals] = en_lista($ids);
  $gente = filas(
    "SELECT u.id, u.grupo_id, u.rol, u.activo, (SELECT 1 FROM app_campus_equipo_miembros m WHERE m.alumno_id = u.id LIMIT 1) en_equipo
       FROM app_campus_usuarios u WHERE u.id IN ($marcas)",
    $vals
  );
  $encontrados = [];
  foreach ($gente as $g) {
    $encontrados[(int)$g['id']] = $g;
    if ((int)$g['grupo_id'] !== $grupo_id) fallo(422, 'Solo puedes formar equipo con compañeros de tu clase.');
    if ($g['rol'] !== 'alumno' || !(int)$g['activo']) fallo(422, 'Uno de los elegidos no está disponible.');
    if ($g['en_equipo']) fallo(409, 'Uno de los elegidos ya tiene equipo. Elige otra persona.');
  }
  if (count($encontrados) !== count($ids)) fallo(422, 'Alguno de los elegidos ya no está disponible.');
  return $ids;
}

function normalizar_nombre_equipo(string $v): string
{
  $v = trim(preg_replace('/\s+/', ' ', $v));
  if (mb_strlen($v) < 3) fallo(422, 'El nombre del equipo tiene que tener al menos 3 letras.');
  if (mb_strlen($v) > 40) fallo(422, 'El nombre del equipo es demasiado largo (máximo 40).');
  return $v;
}

// ── Alumnado ──────────────────────────────────────────────────────────────────

function accion_equipos_estado(): never
{
  $u = exigir('alumno');
  $grupo = grupo_de($u);
  if (!$grupo) fallo(409, 'Todavía no estás en ningún grupo del curso. Díselo al profesor.');
  responder([
    'grupo_id' => (int)$grupo['id'],
    'curso' => $grupo['curso'],
    'yo_id' => (int)$u['id'],
    'equipos' => equipos_lista((int)$grupo['id']),
    'mi_equipo' => equipo_de_alumno((int)$u['id']),
    'disponibles' => alumnos_sin_equipo((int)$grupo['id'], (int)$u['id']),
    'min' => EQUIPO_MIN,
    'max' => EQUIPO_MAX,
  ]);
}

function accion_equipos_crear(array $in): never
{
  $u = exigir('alumno');
  $grupo = grupo_de($u);
  if (!$grupo) fallo(409, 'Todavía no estás en ningún grupo del curso. Díselo al profesor.');
  if (equipo_de_alumno((int)$u['id'])) fallo(409, 'Ya tienes un equipo. Solo puedes estar en uno.');
  $nombre = normalizar_nombre_equipo(txt($in, 'nombre', 40, true, 'nombre del equipo'));
  $companeros = $in['miembros'] ?? null;
  if (!is_array($companeros)) fallo(422, 'Elige a los compañeros del equipo.');
  if (count($companeros) < EQUIPO_MIN - 1 || count($companeros) > EQUIPO_MAX - 1) {
    fallo(422, 'Un equipo es de ' . EQUIPO_MIN . ' a ' . EQUIPO_MAX . ' personas: elige entre ' . (EQUIPO_MIN - 1) . ' y ' . (EQUIPO_MAX - 1) . ' compañeros.');
  }
  $ids = validar_companeros((int)$grupo['id'], $companeros, (int)$u['id']);

  transaccion(function () use ($grupo, $u, $nombre, $ids) {
    $existe = fila('SELECT id FROM app_campus_equipos WHERE grupo_id = ? AND nombre = ?', [(int)$grupo['id'], $nombre]);
    if ($existe) fallo(409, 'Ya existe un equipo con ese nombre en tu clase. Ponle otro.');
    q('INSERT INTO app_campus_equipos (grupo_id, nombre, creado_por, created_at) VALUES (?, ?, ?, ?)',
      [(int)$grupo['id'], $nombre, (int)$u['id'], ahora()]);
    $eq = (int)db()->lastInsertId();
    if (!$eq) fallo(500, 'No se pudo crear el equipo.');
    q('INSERT INTO app_campus_equipo_miembros (alumno_id, equipo_id, es_lider, created_at) VALUES (?, ?, 1, ?)', [(int)$u['id'], $eq, ahora()]);
    foreach ($ids as $id) {
      q('INSERT INTO app_campus_equipo_miembros (alumno_id, equipo_id, es_lider, created_at) VALUES (?, ?, 0, ?)', [$id, $eq, ahora()]);
    }
  });
  accion_equipos_estado();
}

/** Añadir compañeros a mi equipo (cualquier miembro puede). */
function accion_equipos_anadir(array $in): never
{
  $u = exigir('alumno');
  $mi = equipo_de_alumno((int)$u['id']);
  if (!$mi) fallo(409, 'No tienes un equipo todavía.');
  $nuevos = $in['miembros'] ?? null;
  if (!is_array($nuevos) || !$nuevos) fallo(422, 'Elige a los compañeros que quieres añadir.');
  if (count($mi['miembros']) + count($nuevos) > EQUIPO_MAX) {
    fallo(422, 'El equipo de ' . $mi['nombre'] . ' no puede pasar de ' . EQUIPO_MAX . ' personas.');
  }
  $gid = (int)(fila('SELECT grupo_id FROM app_campus_usuarios WHERE id = ?', [(int)$u['id']])['grupo_id'] ?? 0);
  $ids = validar_companeros($gid, $nuevos, (int)$u['id']);
  $ts = ahora();
  foreach ($ids as $id) {
    q('INSERT INTO app_campus_equipo_miembros (alumno_id, equipo_id, es_lider, created_at) VALUES (?, ?, 0, ?)', [$id, (int)$mi['id'], $ts]);
  }
  accion_equipos_estado();
}

/** Salir de mi equipo (cualquiera) o quitar a alguien (solo el lider). */
function accion_equipos_quitar(array $in): never
{
  $u = exigir('alumno');
  $mi = equipo_de_alumno((int)$u['id']);
  if (!$mi) fallo(409, 'No tienes un equipo.');
  $alumno_id = ent($in, 'alumno_id');
  if ($alumno_id !== (int)$u['id'] && !$mi['yo_lider']) fallo(403, 'Solo quien creó el equipo puede quitar a otra persona. Para salir, quítate a ti mismo/a.');
  $objetivo = fila('SELECT alumno_id FROM app_campus_equipo_miembros WHERE equipo_id = ? AND alumno_id = ?', [(int)$mi['id'], $alumno_id]);
  if (!$objetivo) fallo(404, 'Esa persona no está en tu equipo.');

  transaccion(function () use ($mi, $u, $alumno_id) {
    q('DELETE FROM app_campus_equipo_miembros WHERE equipo_id = ? AND alumno_id = ?', [(int)$mi['id'], $alumno_id]);
    $quedan = filas('SELECT alumno_id, es_lider FROM app_campus_equipo_miembros WHERE equipo_id = ? ORDER BY created_at', [(int)$mi['id']]);
    if (!$quedan) {
      q('DELETE FROM app_campus_equipos WHERE id = ?', [(int)$mi['id']]);
    } elseif (!fila('SELECT 1 FROM app_campus_equipo_miembros WHERE equipo_id = ? AND es_lider = 1', [(int)$mi['id']])) {
      // el líder se fue: hereda el más antiguo
      q('UPDATE app_campus_equipo_miembros SET es_lider = 1 WHERE alumno_id = ?', [(int)$quedan[0]['alumno_id']]);
    }
  });
  accion_equipos_estado();
}

/** Disolver mi equipo (quien lo creó): deja a todos sin equipo. */
function accion_equipos_disolver(array $in): never
{
  $u = exigir('alumno');
  $mi = equipo_de_alumno((int)$u['id']);
  if (!$mi) fallo(409, 'No tienes un equipo.');
  if (!$mi['yo_lider']) fallo(403, 'Solo quien creó el equipo puede disolverlo.');
  transaccion(function () use ($mi) {
    q('DELETE FROM app_campus_equipo_miembros WHERE equipo_id = ?', [(int)$mi['id']]);
    q('DELETE FROM app_campus_equipos WHERE id = ?', [(int)$mi['id']]);
  });
  accion_equipos_estado();
}

// ── Profesorado ───────────────────────────────────────────────────────────────

function grupo_del_profe(int $grupo_id): array
{
  exigir('profesor');
  $g = fila('SELECT id, nombre, curso, anyo, archivado FROM app_campus_grupos WHERE id = ?', [$grupo_id]);
  if (!$g) fallo(404, 'Ese grupo no existe.');
  return $g;
}

function accion_prof_equipos(array $in): never
{
  $g = grupo_del_profe(ent($in, 'grupo_id'));
  responder(prof_equipos_payload($g));
}

function prof_equipos_payload(array $g, array $avisos = []): array
{
  return [
    'grupo_id' => (int)$g['id'],
    'grupo_nombre' => $g['nombre'],
    'curso' => $g['curso'],
    'equipos' => equipos_lista((int)$g['id']),
    'sin_equipo' => alumnos_sin_equipo((int)$g['id']),
    'min' => EQUIPO_MIN,
    'max' => EQUIPO_MAX,
    'avisos' => $avisos,
  ];
}

/** Reparto aleatorio de los alumnos SIN equipo. Los equipos existentes no se tocan. */
function accion_prof_equipos_aleatorio(array $in): never
{
  $g = grupo_del_profe(ent($in, 'grupo_id'));
  $sobrantes = alumnos_sin_equipo((int)$g['id']);
  $n = count($sobrantes);
  if (!$n) fallo(409, 'No queda nadie sin equipo en este grupo.');

  // nº de equipos: cerca de n/4.5, sin pasarse de 5 por equipo ni dejar equipos de 1
  $k = max(1, min((int)round($n / 4.5), $n));
  $k = max($k, (int)ceil($n / EQUIPO_MAX));                       // que quepan todos con ≤5
  if ($n < EQUIPO_MIN) $k = 1;                                     // 1-3 sobrantes: un solo equipo, con aviso
  $base = intdiv($n, $k);
  $rem = $n % $k;                                                 // $rem equipos de $base+1

  shuffle($sobrantes);
  $equipos = [];
  $puntero = 0;
  for ($i = 0; $i < $k; $i++) {
    $tam = $base + ($i < $rem ? 1 : 0);
    $equipos[] = array_slice($sobrantes, $puntero, $tam);
    $puntero += $tam;
  }

  $avisos = [];
  if ($n < EQUIPO_MIN) $avisos[] = "Quedaban $n sin equipo (menos de " . EQUIPO_MIN . '): se ha creado un equipo más pequeño; conviene completarlo o unirlo a otro.';
  foreach ($equipos as $e) if (count($e) < EQUIPO_MIN && $n >= EQUIPO_MIN) $avisos[] = 'Algún equipo ha quedado de ' . count($e) . ' personas por el reparto; siempre puedes mover a alguien a mano.';

  // nombres sin colisión con los existentes
  $usados = array_column(filas('SELECT nombre FROM app_campus_equipos WHERE grupo_id = ?', [(int)$g['id']]), 'nombre');
  $creados = [];
  $ts = ahora();
  $profe = usuario_actual();
  transaccion(function () use ($g, $equipos, &$usados, &$creados, $ts, $profe) {
    foreach ($equipos as $e) {
      $nombre = next_nombre_equipo($usados);
      $st = q('INSERT INTO app_campus_equipos (grupo_id, nombre, creado_por, created_at) VALUES (?, ?, ?, ?)',
        [(int)$g['id'], $nombre, (int)$profe['id'], $ts]);
      $eq = (int)db()->lastInsertId();
      foreach ($e as $idx => $a) {
        q('INSERT INTO app_campus_equipo_miembros (alumno_id, equipo_id, es_lider, created_at) VALUES (?, ?, ?, ?)',
          [(int)$a['id'], $eq, $idx === 0 ? 1 : 0, $ts]);
      }
      $creados[] = ['nombre' => $nombre, 'miembros' => array_map(fn($a) => trim($a['nombre'] . ' ' . $a['apellidos']), $e)];
    }
  });
  responder(prof_equipos_payload($g, $avisos) + ['creados' => $creados]);
}

/** Nombre «Equipo N» libre, N creciente. */
function next_nombre_equipo(array &$usados): string
{
  for ($n = 1; $n <= 199; $n++) {
    $cand = 'Equipo ' . $n;
    if (!in_array($cand, $usados, true)) { $usados[] = $cand; return $cand; }
  }
  fallo(500, 'Demasiados equipos en este grupo.');
}

/** Borrar un equipo (deja a sus miembros sin equipo). */
function accion_prof_equipo_borrar(array $in): never
{
  $g = grupo_del_profe(ent($in, 'grupo_id'));
  $eq = fila('SELECT id FROM app_campus_equipos WHERE id = ? AND grupo_id = ?', [ent($in, 'equipo_id'), (int)$g['id']]);
  if (!$eq) fallo(404, 'Ese equipo no existe en este grupo.');
  transaccion(function () use ($eq) {
    q('DELETE FROM app_campus_equipo_miembros WHERE equipo_id = ?', [(int)$eq['id']]);
    q('DELETE FROM app_campus_equipos WHERE id = ?', [(int)$eq['id']]);
  });
  accion_prof_equipos(['grupo_id' => (int)$g['id']]);
}
