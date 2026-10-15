<?php
// API del campus del Curso de Programación con IA (panel del alumno y del
// profesor). Un único punto de entrada: POST JSON {accion, ...datos}.
//
// Seguridad:
//  - Solo POST con Content-Type JSON y la cabecera X-Campus: un formulario o un
//    enlace de otra web no pueden generar esa petición sin preflight CORS (que
//    aquí no se concede) → protección CSRF. Además la cookie va con SameSite=Lax.
//  - Si llega cabecera Origin, tiene que ser este mismo sitio.
//  - Sin credenciales en el código: se leen de aeln-db-config.php, fuera del docroot.
declare(strict_types=1);
define('CAMPUS_API', true);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex, nofollow');
header('Referrer-Policy: same-origin');

require __DIR__ . '/lib/base.php';
require __DIR__ . '/lib/auth.php';
require __DIR__ . '/lib/alumno.php';
require __DIR__ . '/lib/profesor.php';
require __DIR__ . '/lib/equipos.php';

const ACCIONES = [
  'login' => 'accion_login',
  'logout' => 'accion_logout',
  'yo' => 'accion_yo',
  'cuenta.password' => 'accion_cambiar_password',

  'alumno.panel' => 'accion_alumno_panel',
  'alumno.entregar' => 'accion_alumno_entregar',

  'equipos.estado' => 'accion_equipos_estado',
  'equipos.crear' => 'accion_equipos_crear',
  'equipos.anadir' => 'accion_equipos_anadir',
  'equipos.quitar' => 'accion_equipos_quitar',
  'equipos.disolver' => 'accion_equipos_disolver',
  'prof.equipos' => 'accion_prof_equipos',
  'prof.equipos.aleatorio' => 'accion_prof_equipos_aleatorio',
  'prof.equipo.borrar' => 'accion_prof_equipo_borrar',
  'prof.equipo.renombrar' => 'accion_prof_equipo_renombrar',
  'prof.equipo.anadir' => 'accion_prof_equipo_anadir',
  'prof.equipo.quitar' => 'accion_prof_equipo_quitar',
  'prof.equipo.mover' => 'accion_prof_equipo_mover',

  'prof.resumen' => 'accion_prof_resumen',
  'prof.grupo' => 'accion_prof_grupo',
  'prof.grupo.guardar' => 'accion_prof_grupo_guardar',
  'prof.grupo.borrar' => 'accion_prof_grupo_borrar',
  'prof.alumnos.crear' => 'accion_prof_alumnos_crear',
  'prof.alumno.guardar' => 'accion_prof_alumno_guardar',
  'prof.alumno.clave' => 'accion_prof_alumno_clave',
  'prof.alumno.borrar' => 'accion_prof_alumno_borrar',
  'prof.entrega.guardar' => 'accion_prof_entrega_guardar',
  'prof.entrega.borrar' => 'accion_prof_entrega_borrar',
  'prof.seguimiento' => 'accion_prof_seguimiento',
  'prof.nota.guardar' => 'accion_prof_nota_guardar',
  'prof.nota.borrar' => 'accion_prof_nota_borrar',
  'prof.notas.publicar' => 'accion_prof_notas_publicar',
];

try {
  if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fallo(405, 'Método no permitido.');
  }
  if (stripos((string)($_SERVER['CONTENT_TYPE'] ?? ''), 'application/json') !== 0) fallo(415, 'Se esperaba JSON.');
  if (($_SERVER['HTTP_X_CAMPUS'] ?? '') !== '1') fallo(403, 'Petición no permitida.');
  $origen = (string)($_SERVER['HTTP_ORIGIN'] ?? '');
  if ($origen !== '' && parse_url($origen, PHP_URL_HOST) !== strtok((string)($_SERVER['HTTP_HOST'] ?? ''), ':')) {
    fallo(403, 'Origen no permitido.');
  }

  $in = entrada();
  $accion = is_string($in['accion'] ?? null) ? $in['accion'] : '';
  $fn = ACCIONES[$accion] ?? null;
  if (!$fn) fallo(404, 'Acción desconocida.');
  $fn($in);
} catch (ErrorApi $e) {
  http_response_code($e->estado);
  echo json_encode(['ok' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
  error_log('[campus-api] ' . $e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine());
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Error interno del servidor. Inténtalo de nuevo en un momento.'], JSON_UNESCAPED_UNICODE);
}
