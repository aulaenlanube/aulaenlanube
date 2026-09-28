<?php
// Puerta de la planificación privada (/programacion-ia/plan/…) con la MISMA
// sesión del campus: el .htaccess de esa carpeta reescribe cualquier petición
// hacia aquí, y solo se sirve el fichero estático si hay un profesor con
// sesión. Sin sesión → a la página de acceso del campus (y vuelta al plan).
// Sustituye al antiguo candado Basic Auth, que pedía un segundo login.
declare(strict_types=1);
define('CAMPUS_API', true);

require __DIR__ . '/lib/base.php';
require __DIR__ . '/lib/auth.php';

const PREFIJO_PLAN = '/programacion-ia/plan';

header('Cache-Control: private, no-store, max-age=0');
header('X-Robots-Tag: noindex, nofollow');
header('X-Content-Type-Options: nosniff');

$ruta = rawurldecode((string)parse_url((string)($_SERVER['REQUEST_URI'] ?? ''), PHP_URL_PATH));
if (!str_starts_with($ruta, PREFIJO_PLAN)) {
  http_response_code(404);
  exit;
}

try {
  $u = usuario_actual();
} catch (Throwable $e) {
  error_log('[campus-plan] ' . $e->getMessage());
  $u = null;
}

if (!$u || $u['rol'] !== 'profesor') {
  // Las páginas (HTML) llevan al login; el resto (datos de navegación de Next) solo recibe 401.
  $esPagina = str_ends_with($ruta, '/') || str_ends_with($ruta, '.html') || !str_contains(basename($ruta), '.');
  if ($esPagina) {
    $volver = str_ends_with($ruta, '.html') ? dirname($ruta) . '/' : rtrim($ruta, '/') . '/';
    $destino = $u ? '/programacion-ia/aula/' : '/programacion-ia/acceso/?volver=' . rawurlencode($volver);
    header('Location: ' . $destino, true, 302);
    exit;
  }
  http_response_code($u ? 403 : 401);
  header('Content-Type: text/plain; charset=utf-8');
  echo $u ? 'Solo para el profesorado.' : 'Inicia sesión en el campus.';
  exit;
}

// Resolver el fichero dentro de la carpeta del plan (sin salir de ella).
$base = realpath(dirname(__DIR__) . PREFIJO_PLAN);
$rel = substr($ruta, strlen(PREFIJO_PLAN));
if ($rel === '' || str_ends_with($rel, '/')) $rel .= ($rel === '' ? '/' : '') . 'index.html';
$fichero = $base ? realpath($base . $rel) : false;
if ($fichero && is_dir($fichero)) $fichero = realpath($fichero . '/index.html');
if (!$fichero || !str_starts_with($fichero, $base . DIRECTORY_SEPARATOR) || !is_file($fichero) || basename($fichero) === '.htaccess') {
  http_response_code(404);
  header('Content-Type: text/plain; charset=utf-8');
  echo 'No encontrado.';
  exit;
}

$tipos = ['html' => 'text/html; charset=utf-8', 'txt' => 'text/plain; charset=utf-8', 'json' => 'application/json'];
header('Content-Type: ' . ($tipos[strtolower(pathinfo($fichero, PATHINFO_EXTENSION))] ?? 'application/octet-stream'));
header('Content-Length: ' . filesize($fichero));
readfile($fichero);
