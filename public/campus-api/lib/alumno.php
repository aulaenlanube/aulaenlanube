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
  $salida = [];
  foreach ($entregas as $e) {
    $id = (int)$e['id'];
    $salida[] = entrega_publica($e) + [
      'envio' => $envios[$id] ?? null,
      'nota' => $notas[$id] ?? null,
    ];
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

  q(
    'INSERT INTO app_campus_envios (entrega_id, alumno_id, repo, web, texto, comentario, version, fuera_plazo, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?)
     ON DUPLICATE KEY UPDATE repo = VALUES(repo), web = VALUES(web), texto = VALUES(texto),
       comentario = VALUES(comentario), version = version + 1,
       fuera_plazo = VALUES(fuera_plazo), updated_at = VALUES(updated_at)',
    [$e['id'], $u['id'], $repo, $web, $texto, $comentario !== '' ? $comentario : null, $fueraPlazo, $ahora, $ahora]
  );
  $envio = fila('SELECT * FROM app_campus_envios WHERE entrega_id = ? AND alumno_id = ?', [$e['id'], $u['id']]);
  responder(['envio' => envio_publico($envio)]);
}
