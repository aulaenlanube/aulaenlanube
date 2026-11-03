<?php
// Campus · acciones del alumno: su panel (entregas de su curso con su envío y
// sus notas publicadas) y entregar/actualizar una entrega.
declare(strict_types=1);
if (!defined('CAMPUS_API')) { http_response_code(404); exit; }

/**
 * Acepta «usuario/repo», «github.com/usuario/repo», la URL completa (con .git,
 * /tree/main… o lo que sea detrás) o la forma SSH «git@github.com:usuario/repo.git»
 * y devuelve la URL canónica https://github.com/usuario/repo.
 */
function normalizar_repo(string $v): string
{
  $v = trim($v);
  // Si pegan la URL de GitHub Pages (usuario.github.io/repo), se deduce el repo.
  if (preg_match('#^(?:https?://)?([A-Za-z0-9-]+)\.github\.io(?:/([A-Za-z0-9._-]+))?/?#i', $v, $m)) {
    $v = $m[1] . '/' . (($m[2] ?? '') !== '' ? $m[2] : $m[1] . '.github.io');
  }
  $v = preg_replace('#^git@github\.com:#i', 'https://github.com/', $v);
  $v = preg_replace('#^(https?://)?(www\.)?github\.com/#i', '', $v);
  $v = preg_replace('#\.git$#i', '', trim($v, '/'));
  $partes = explode('/', $v);
  if (count($partes) < 2) fallo(422, 'Escribe tu repositorio como usuario/repositorio o pega su dirección de GitHub.');
  [$dueno, $repo] = $partes;
  $repo = preg_replace('#\.git$#i', '', $repo);
  if (!preg_match('/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/', $dueno) || !preg_match('/^[A-Za-z0-9._-]{1,100}$/', $repo)) {
    fallo(422, 'Eso no parece un repositorio de GitHub. Ejemplo: https://github.com/tu-usuario/mi-web');
  }
  return "https://github.com/$dueno/$repo";
}

function normalizar_url(string $v, string $etiqueta): string
{
  $v = trim($v);
  if ($v !== '' && !preg_match('#^https?://#i', $v)) $v = 'https://' . $v;
  if (!filter_var($v, FILTER_VALIDATE_URL) || !preg_match('#^https?://[^/\s]+\.[^/\s]+#i', $v)) {
    fallo(422, "La dirección de $etiqueta no es válida.");
  }
  return $v;
}

/** Equipo del proyecto en grupo al que pertenece el alumno (id y nombre), o null. */
function equipo_del_alumno(int $alumno_id): ?array
{
  return fila(
    'SELECT e.id, e.nombre FROM app_campus_equipo_miembros m
       JOIN app_campus_equipos e ON e.id = m.equipo_id
      WHERE m.alumno_id = ?',
    [$alumno_id]
  );
}

/**
 * Para una entrega por equipos: el equipo del alumno con lo último que ha subido
 * cualquiera de sus miembros (repo/web) y, por persona, si ya tiene la entrega y
 * si ha escrito su propio comentario (su rol y su aportación).
 */
function equipo_de_entrega(array $equipo, int $entrega_id, int $yo): array
{
  $miembros = filas(
    'SELECT u.id, u.nombre, u.apellidos, v.repo, v.web, v.comentario, v.updated_at
       FROM app_campus_equipo_miembros m
       JOIN app_campus_usuarios u ON u.id = m.alumno_id
       LEFT JOIN app_campus_envios v ON v.alumno_id = u.id AND v.entrega_id = ?
      WHERE m.equipo_id = ?
      ORDER BY u.nombre, u.apellidos',
    [$entrega_id, (int)$equipo['id']]
  );
  $ultimo = null;
  foreach ($miembros as $m) {
    if ($m['updated_at'] !== null && ($ultimo === null || $m['updated_at'] > $ultimo['updated_at'])) $ultimo = $m;
  }
  return [
    'nombre' => $equipo['nombre'],
    'repo' => $ultimo['repo'] ?? null,
    'web' => $ultimo['web'] ?? null,
    'miembros' => array_map(fn($m) => [
      'id' => (int)$m['id'],
      'nombre' => trim($m['nombre'] . ' ' . $m['apellidos']),
      'yo' => (int)$m['id'] === $yo,
      'entregado' => $m['updated_at'] !== null,
      'comentario' => $m['comentario'] !== null && $m['comentario'] !== '' ? $m['comentario'] : null,
    ], $miembros),
  ];
}

/** Equipos del grupo-clase con su número de miembros (para elegir el tuyo). */
function equipos_para_elegir(int $grupo_id): array
{
  return array_map(fn($r) => ['id' => (int)$r['id'], 'nombre' => $r['nombre'], 'miembros' => (int)$r['n'], 'lleno' => (int)$r['n'] >= EQUIPO_MAX], filas(
    'SELECT e.id, e.nombre, COUNT(m.alumno_id) n FROM app_campus_equipos e
       LEFT JOIN app_campus_equipo_miembros m ON m.equipo_id = e.id
      WHERE e.grupo_id = ? GROUP BY e.id, e.nombre ORDER BY e.nombre',
    [$grupo_id]
  ));
}

/**
 * El alumno sin equipo elige el suyo desde una entrega por equipos. Al entrar
 * recibe lo que su equipo ya haya entregado en las entregas por equipos (sin
 * comentario: ese es de cada persona).
 */
function accion_alumno_unirse_equipo(array $in): never
{
  $u = exigir('alumno');
  $grupo = grupo_de($u);
  if (!$grupo) fallo(409, 'Todavía no estás en ningún grupo del curso. Díselo al profesor.');
  if (equipo_del_alumno((int)$u['id'])) fallo(409, 'Ya estás en un equipo. Si no es el tuyo, díselo al profesor.');
  $eq = fila('SELECT id, nombre FROM app_campus_equipos WHERE id = ? AND grupo_id = ?', [ent($in, 'equipo_id'), (int)$grupo['id']]);
  if (!$eq) fallo(404, 'Ese equipo no existe en tu clase.');
  $n = (int)fila('SELECT COUNT(*) n FROM app_campus_equipo_miembros WHERE equipo_id = ?', [$eq['id']])['n'];
  if ($n >= EQUIPO_MAX) fallo(409, 'El equipo ' . $eq['nombre'] . ' ya tiene ' . EQUIPO_MAX . ' personas. Si es el tuyo, díselo al profesor.');
  transaccion(function () use ($u, $eq, $grupo) {
    $ahora = ahora();
    q('INSERT INTO app_campus_equipo_miembros (alumno_id, equipo_id, es_lider, created_at) VALUES (?, ?, 0, ?)', [(int)$u['id'], (int)$eq['id'], $ahora]);
    $deEquipo = filas('SELECT id FROM app_campus_entregas WHERE curso = ? AND en_equipo = 1', [$grupo['curso']]);
    foreach ($deEquipo as $en) {
      $v = fila(
        'SELECT v.* FROM app_campus_envios v JOIN app_campus_equipo_miembros m ON m.alumno_id = v.alumno_id
          WHERE v.entrega_id = ? AND m.equipo_id = ? AND v.alumno_id <> ? ORDER BY v.updated_at DESC LIMIT 1',
        [(int)$en['id'], (int)$eq['id'], (int)$u['id']]
      );
      if (!$v) continue;
      q(
        'INSERT IGNORE INTO app_campus_envios (entrega_id, alumno_id, repo, web, texto, comentario, version, fuera_plazo, entregado_por, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, NULL, 1, ?, ?, ?, ?)',
        [(int)$en['id'], (int)$u['id'], $v['repo'], $v['web'], $v['texto'], (int)$v['fuera_plazo'], $v['entregado_por'] ?? $v['alumno_id'], $ahora, $v['updated_at']]
      );
    }
  });
  responder(['equipo' => ['id' => (int)$eq['id'], 'nombre' => $eq['nombre']]]);
}

function entregas_del_alumno(array $u): array
{
  $grupo = grupo_de($u);
  if (!$grupo) return [$grupo, []];
  $entregas = filas(
    'SELECT * FROM app_campus_entregas WHERE curso = ? AND visible = 1 ORDER BY orden, id',
    [$grupo['curso']]
  );
  $envios = [];
  foreach (filas('SELECT * FROM app_campus_envios WHERE alumno_id = ?', [$u['id']]) as $e) {
    $envios[(int)$e['entrega_id']] = envio_publico($e);
  }
  $notas = [];
  foreach (filas('SELECT * FROM app_campus_notas WHERE alumno_id = ? AND publicada = 1', [$u['id']]) as $n) {
    $pub = nota_publica($n);
    $notas[(int)$n['entrega_id']] = $pub;
  }
  $equipo = null;
  $hayDeEquipo = false;
  foreach ($entregas as $e) {
    if ((int)($e['en_equipo'] ?? 0)) { $hayDeEquipo = true; $equipo = equipo_del_alumno((int)$u['id']); break; }
  }
  // Sin equipo: los equipos de su clase, para que elija el suyo desde la entrega.
  $equiposClase = $hayDeEquipo && !$equipo ? equipos_para_elegir((int)$grupo['id']) : [];
  $salida = [];
  foreach ($entregas as $e) {
    $id = (int)$e['id'];
    $extra = [];
    if ((int)($e['en_equipo'] ?? 0)) {
      $extra['equipo'] = $equipo ? equipo_de_entrega($equipo, $id, (int)$u['id']) : null;
      if (!$equipo) $extra['equipos_clase'] = $equiposClase;
    }
    $salida[] = entrega_publica($e) + [
      'envio' => $envios[$id] ?? null,
      'nota' => $notas[$id] ?? null,
    ] + $extra;
  }
  return [$grupo, $salida];
}

function accion_alumno_panel(): never
{
  $u = exigir('alumno');
  [$grupo, $entregas] = entregas_del_alumno($u);
  responder([
    'usuario' => usuario_publico($u),
    'grupo' => $grupo,
    'entregas' => $entregas,
  ]);
}

function accion_alumno_entregar(array $in): never
{
  $u = exigir('alumno');
  $grupo = grupo_de($u);
  if (!$grupo) fallo(409, 'Todavía no estás en ningún grupo. Díselo al profesor.');
  $e = fila('SELECT * FROM app_campus_entregas WHERE id = ? AND curso = ? AND visible = 1', [ent($in, 'entrega_id'), $grupo['curso']]);
  if (!$e) fallo(404, 'Esa entrega no existe.');
  if (!(int)$e['abierta']) fallo(409, 'Esta entrega está cerrada: ya no admite cambios.');

  $repo = $web = $texto = null;
  $rawRepo = txt($in, 'repo', 250, false);
  $rawWeb = txt($in, 'web', 300, false);
  switch ($e['tipo']) {
    case 'github':
      if ($rawRepo === '') fallo(422, 'Falta la dirección de tu repositorio de GitHub.');
      $repo = normalizar_repo($rawRepo);
      if ($rawWeb !== '') $web = normalizar_url($rawWeb, 'tu web publicada');
      break;
    case 'url':
      if ($rawWeb === '') fallo(422, 'Falta la dirección que tienes que entregar.');
      $web = normalizar_url($rawWeb, 'la entrega');
      break;
    default:
      $texto = txt($in, 'texto', 20000, true, 'el texto de la entrega');
  }
  $comentario = txt($in, 'comentario', 2000, false);
  $ahora = ahora();
  $fueraPlazo = $e['fecha_limite'] && $ahora > $e['fecha_limite'] ? 1 : 0;

  // Entrega por equipos: lo que sube un miembro (repo/web/texto) vale para todo
  // su equipo; el comentario es de cada persona y no se copia.
  $companeros = [];
  if ((int)($e['en_equipo'] ?? 0)) {
    $equipo = equipo_del_alumno((int)$u['id']);
    if (!$equipo) fallo(409, 'Esta entrega es por equipos y todavía no estás en ninguno: elige tu equipo en esta misma entrega.');
    $companeros = array_map('intval', array_column(
      filas('SELECT alumno_id FROM app_campus_equipo_miembros WHERE equipo_id = ? AND alumno_id <> ?', [(int)$equipo['id'], (int)$u['id']]),
      'alumno_id'
    ));
  }

  transaccion(function () use ($e, $u, $repo, $web, $texto, $comentario, $fueraPlazo, $ahora, $companeros) {
    // En ON DUPLICATE KEY UPDATE las asignaciones van de izquierda a derecha: lo
    // que compara con lo anterior (entregado_por, y en los compañeros todo lo
    // demás) va antes de sobrescribir repo/web/texto.
    $igual = 'repo <=> VALUES(repo) AND web <=> VALUES(web) AND texto <=> VALUES(texto)';
    q(
      "INSERT INTO app_campus_envios (entrega_id, alumno_id, repo, web, texto, comentario, version, fuera_plazo, entregado_por, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         entregado_por = IF($igual, IFNULL(entregado_por, VALUES(entregado_por)), VALUES(entregado_por)),
         repo = VALUES(repo), web = VALUES(web), texto = VALUES(texto),
         comentario = VALUES(comentario), version = version + 1, fuera_plazo = VALUES(fuera_plazo),
         updated_at = VALUES(updated_at)",
      [$e['id'], $u['id'], $repo, $web, $texto, $comentario !== '' ? $comentario : null, $fueraPlazo, $u['id'], $ahora, $ahora]
    );
    // A los compañeros solo les cambia algo si cambia lo entregado: si alguien
    // solo añade su comentario, sus filas (y sus correcciones) no se tocan.
    foreach ($companeros as $id) {
      q(
        "INSERT INTO app_campus_envios (entrega_id, alumno_id, repo, web, texto, comentario, version, fuera_plazo, entregado_por, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, NULL, 1, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           version = IF($igual, version, version + 1),
           fuera_plazo = IF($igual, fuera_plazo, VALUES(fuera_plazo)),
           entregado_por = IF($igual, entregado_por, VALUES(entregado_por)),
           updated_at = IF($igual, updated_at, VALUES(updated_at)),
           repo = VALUES(repo), web = VALUES(web), texto = VALUES(texto)",
        [$e['id'], $id, $repo, $web, $texto, $fueraPlazo, $u['id'], $ahora, $ahora]
      );
    }
  });
  $envio = fila('SELECT * FROM app_campus_envios WHERE entrega_id = ? AND alumno_id = ?', [$e['id'], $u['id']]);
  $salida = ['envio' => envio_publico($envio)];
  if ((int)($e['en_equipo'] ?? 0)) $salida['equipo'] = equipo_de_entrega(equipo_del_alumno((int)$u['id']), (int)$e['id'], (int)$u['id']);
  responder($salida);
}
