<?php
// Endpoint de suscripción del formulario "¿Quieres más?".
// NO contiene credenciales: las lee de aeln-db-config.php, que vive FUERA del
// docroot (se localiza subiendo directorios). Guarda en la tabla app_subscribers
// del MySQL (no toca WordPress).
header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false]);
  exit;
}

// Localiza la config de BD subiendo directorios desde aquí.
$dir = __DIR__;
$cfg = null;
for ($i = 0; $i < 7; $i++) {
  $p = $dir . '/aeln-db-config.php';
  if (is_file($p)) { $cfg = require $p; break; }
  $parent = dirname($dir);
  if ($parent === $dir) break;
  $dir = $parent;
}
if (!is_array($cfg)) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'config']);
  exit;
}

$raw = file_get_contents('php://input');
$in = json_decode($raw, true);
if (!is_array($in)) { $in = $_POST; }

$name  = trim((string)($in['name'] ?? ''));
$email = trim((string)($in['email'] ?? ''));
$hp    = trim((string)($in['website'] ?? '')); // honeypot anti-bots

// Si el honeypot viene relleno, es un bot: fingimos éxito sin guardar.
if ($hp !== '') { echo json_encode(['ok' => true]); exit; }

if ($name === '' || mb_strlen($name) > 180 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'invalid']);
  exit;
}

$m = @new mysqli($cfg['host'], $cfg['user'], $cfg['pass'], $cfg['name'], $cfg['port'] ?? 3306);
if ($m->connect_errno) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'db']);
  exit;
}
$m->set_charset('utf8mb4');

$ip = substr((string)($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45);
$stmt = $m->prepare(
  'INSERT INTO app_subscribers (name, email, ip, created_at) VALUES (?, ?, ?, NOW())
   ON DUPLICATE KEY UPDATE name = VALUES(name)'
);
$stmt->bind_param('sss', $name, $email, $ip);
$ok = $stmt->execute();

echo json_encode(['ok' => (bool)$ok]);
