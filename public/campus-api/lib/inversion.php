<?php
// Campus · ronda de inversión del proyecto en grupo (creado 20-10-2026 para
// 1º DAM presencial). Tras los pitches, cada equipo reparte su dinero ficticio
// entre los OTROS equipos. Reglas duras:
//   · Un voto por EQUIPO (no por persona): quien lo registre da igual, el
//     registro es único por equipo y se puede actualizar mientras esté abierto.
//   · Prohibido invertir en el propio equipo.
//   · Importes en múltiplos de 10, hasta cupo_por_persona × miembros del equipo.
//   · Solo mientras el profesor tenga la ronda abierta.
declare(strict_types=1);
if (!defined('CAMPUS_API')) { http_response_code(404); exit; }

function inversion_config(int $grupo_id): array
{
  $c = fila('SELECT abierta, cupo FROM app_campus_inversion_config WHERE grupo_id = ?', [$grupo_id]);
  return ['abierta' => $c ? (bool)$c['abierta'] : false, 'cupo' => $c ? (int)$c['cupo'] : 100];
}

function inversion_config_asegurar(int $grupo_id): void
{
  q('INSERT IGNORE INTO app_campus_inversion_config (grupo_id, abierta, cupo, created_at, updated_at)
       VALUES (?, 0, 100, ?, ?)', [$grupo_id, ahora(), ahora()]);
}

/** Votos del grupo: [{equipo_id, repartido, importe_total, created_at}]. */
function inversion_votos(int $grupo_id): array
{
  return filas(
    'SELECT equipo_id, invertidor_usuario_id, repartido, importe_total, created_at
       FROM app_campus_inversion WHERE grupo_id = ? ORDER BY equipo_id',
    [$grupo_id]
  );
}

/** Caja recibida por equipo y votos emitidos (solo de equipos existentes). */
function inversion_resumen(int $grupo_id): array
{
  $equipos = equipos_lista($grupo_id);
  if (!$equipos) return [];
  $ids = array_map(fn($e) => (int)$e['id'], $equipos);
  $votos = inversion_votos($grupo_id);

  $recibido = array_fill_keys($ids, 0);
  $por_quien = []; // eq_origen => [dest_id => €]
  foreach ($votos as $v) {
    $map = json_o_nulo($v['repartido']) ?: [];
    $por_quien[(int)$v['equipo_id']] = $map;
    foreach ($map as $dest => $imp) {
      $dest = (int)$dest; $imp = (int)$imp;
      if (isset($recibido[$dest]) && $imp > 0) $recibido[$dest] += $imp;
    }
  }
  $salida = [];
  foreach ($equipos as $e) {
    $salida[] = [
      'id' => $e['id'],
      'nombre' => $e['nombre'],
      'miembros' => count($e['miembros']),
      'ha_votado' => isset($por_quien[$e['id']]),
      'recibido' => $recibido[$e['id']],
      'voto' => $por_quien[$e['id']] ?? null,
    ];
  }
  return $salida;
}

/** Estado para el alumno: mi equipo, otros equipos, config, mi voto si existe. */
function accion_inversion_estado(): never
{
  $u = exigir('alumno');
  $grupo = grupo_de($u);
  if (!$grupo) fallo(409, 'Todavía no estás en ningún grupo del curso. Díselo al profesor.');
  $gid = (int)$grupo['id'];
  $cfg = inversion_config($gid);
  $mi = equipo_de_alumno((int)$u['id']);
  if (!$mi) fallo(409, 'Necesitas un equipo para invertir. Forma uno en «Mi equipo».');

  $votos = inversion_votos($gid);
  $mi_voto = null;
  foreach ($votos as $v) {
    if ((int)$v['equipo_id'] === (int)$mi['id']) { $mi_voto = json_o_nulo($v['repartido']) ?: []; break; }
  }
  responder([
    'grupo_id' => $gid,
    'abierta' => $cfg['abierta'],
    'cupo_persona' => $cfg['cupo'],
    'mi_equipo_id' => (int)$mi['id'],
    'miembros' => count($mi['miembros']),
    'cupo_equipo' => $cfg['cupo'] * count($mi['miembros']),
    'mi_voto' => $mi_voto,
    'equipos' => inversion_resumen($gid),
  ]);
}

/** Enviar/actualizar el voto del equipo (único por equipo). */
function accion_inversion_votar(array $in): never
{
  $u = exigir('alumno');
  $grupo = grupo_de($u);
  if (!$grupo) fallo(409, 'No estás en ningún grupo.');
  $gid = (int)$grupo['id'];
  $cfg = inversion_config($gid);
  if (!$cfg['abierta']) fallo(403, 'La ronda de inversión está cerrada. Pídeselo al profesor.');

  $mi = equipo_de_alumno((int)$u['id']);
  if (!$mi) fallo(409, 'Necesitas un equipo para invertir.');
  $eq_id = (int)$mi['id'];
  $cupo_eq = $cfg['cupo'] * count($mi['miembros']);

  $repartido = $in['repartido'] ?? null;
  if (!is_array($repartido) || !$repartido) fallo(422, 'Indica a qué equipos asignas el dinero.');
  if (count($repartido) > 30) fallo(422, 'Demasiados destinatarios.');

  // Destinatarios válidos: equipos del grupo que no sean el mío.
  $validos = [];
  foreach (equipos_lista($gid) as $e) if ((int)$e['id'] !== $eq_id) $validos[(int)$e['id']] = (int)$e['miembros'];
  $total = 0;
  $limpio = [];
  foreach ($repartido as $dest => $imp) {
    $dest = (int)$dest; $imp = is_string($imp) ? (int)$imp : (int)$imp;
    if (!isset($validos[$dest])) fallo(422, 'No puedes invertir en tu propio equipo (o ese equipo ya no existe).');
    if ($imp < 0) fallo(422, 'Los importes no pueden ser negativos.');
    if ($imp % 10 !== 0) fallo(422, 'Los importes deben ser múltiplos de 10 €.');
    if ($imp === 0) continue;
    if ($imp > $cupo_eq) fallo(422, "Un solo equipo no puede recibir más que todo vuestro cupo ($cupo_eq €).");
    $limpio[$dest] = $imp;
    $total += $imp;
  }
  if (!$limpio) fallo(422, 'Reparte algo de dinero entre los otros equipos.');
  if ($total > $cupo_eq) fallo(422, "Os pasáis del cupo: tenéis $cupo_eq € ({$cfg['cupo']} € × " . count($mi['miembros']) . ' personas).');

  q(
    'INSERT INTO app_campus_inversion (grupo_id, equipo_id, invertidor_usuario_id, repartido, importe_total, created_at)
     VALUES (?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE repartido = VALUES(repartido), importe_total = VALUES(importe_total),
       invertidor_usuario_id = VALUES(invertidor_usuario_id), created_at = VALUES(created_at)',
    [$gid, $eq_id, (int)$u['id'], json_encode($limpio, JSON_UNESCAPED_UNICODE), $total, ahora()]
  );
  accion_inversion_estado();
}

// ── Profesorado ───────────────────────────────────────────────────────────────

function accion_prof_inversion(array $in): never
{
  exigir('profesor');
  $gid = ent($in, 'grupo_id');
  inversion_config_asegurar($gid);
  responder([
    'grupo_id' => $gid,
    'config' => inversion_config($gid),
    'equipos' => inversion_resumen($gid),
    'votos' => array_map(fn($v) => [
      'equipo_id' => (int)$v['equipo_id'],
      'por' => (int)$v['invertidor_usuario_id'],
      'repartido' => json_o_nulo($v['repartido']) ?: [],
      'total' => (int)$v['importe_total'],
      'cuando' => $v['created_at'],
    ], inversion_votos($gid)),
  ]);
}

function accion_prof_inversion_abrir(array $in): never
{
  exigir('profesor');
  $gid = ent($in, 'grupo_id');
  $abierta = bool_de($in, 'abierta', true);
  $cupo = isset($in['cupo']) ? ent($in, 'cupo') : 100;
  if ($cupo < 10 || $cupo > 500 || $cupo % 10 !== 0) fallo(422, 'El cupo por persona debe ser un múltiplo de 10 entre 10 y 500.');
  inversion_config_asegurar($gid);
  q('UPDATE app_campus_inversion_config SET abierta = ?, cupo = ?, updated_at = ? WHERE grupo_id = ?',
    [$abierta ? 1 : 0, $cupo, ahora(), $gid]);
  accion_prof_inversion(['grupo_id' => $gid]);
}

/** Borrar el voto de un equipo para que pueda volver a registrarlo (con la ronda abierta). */
function accion_prof_inversion_reset(array $in): never
{
  exigir('profesor');
  $gid = ent($in, 'grupo_id');
  $eq = ent($in, 'equipo_id');
  q('DELETE FROM app_campus_inversion WHERE grupo_id = ? AND equipo_id = ?', [$gid, $eq]);
  accion_prof_inversion(['grupo_id' => $gid]);
}
