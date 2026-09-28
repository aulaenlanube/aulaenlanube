<?php
// Campus · autenticación: login con límite de intentos, sesiones con token en
// cookie HttpOnly (en BD solo se guarda su SHA-256) y control de rol.
declare(strict_types=1);
if (!defined('CAMPUS_API')) { http_response_code(404); exit; }

const COOKIE_SESION = 'aeln_campus';
// Cookie legible por JS SOLO como pista para la interfaz (qué panel enseñar, si
// merece la pena preguntar a la API). No da acceso a nada: manda la de sesión.
const COOKIE_PISTA = 'aeln_campus_rol';

const DURACION_SESION = 12 * 3600;        // un día de clase
const DURACION_RECORDAR = 30 * 24 * 3600; // «recordarme en este equipo»
const VENTANA_INTENTOS = 15 * 60;
const MAX_FALLOS_USUARIO = 8;
const MAX_FALLOS_IP = 60;                 // un aula entera sale por la misma IP

// Hash de relleno: si el usuario no existe se verifica contra él igualmente,
// para que el tiempo de respuesta no delate qué usuarios existen.
const HASH_RELLENO = '$2y$10$YxwmhbpogHYtcpJoapPAB.OFHMOoiSSXIxTGziPxh.xHhWwo5jpze';

function es_https(): bool
{
  return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || strtolower((string)($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '')) === 'https'
    || (string)($_SERVER['SERVER_PORT'] ?? '') === '443';
}

function poner_cookie(string $nombre, string $valor, int $expira, bool $httpOnly): void
{
  setcookie($nombre, $valor, [
    'expires' => $expira,
    'path' => '/',
    'secure' => es_https(),
    'httponly' => $httpOnly,
    'samesite' => 'Lax',
  ]);
}

function borrar_cookies(): void
{
  poner_cookie(COOKIE_SESION, '', time() - 3600, true);
  poner_cookie(COOKIE_PISTA, '', time() - 3600, false);
}

/** Usuario de la sesión actual (fila de app_campus_usuarios) o null. */
function usuario_actual(): ?array
{
  static $cache = false;
  if ($cache !== false) return $cache;
  $cache = null;
  $tok = (string)($_COOKIE[COOKIE_SESION] ?? '');
  if (!preg_match('/^[a-f0-9]{64}$/', $tok)) return null;
  $u = fila(
    'SELECT u.* FROM app_campus_sesiones s
       JOIN app_campus_usuarios u ON u.id = s.usuario_id
      WHERE s.token_hash = ? AND s.expira > ? AND u.activo = 1',
    [hash('sha256', $tok), ahora()]
  );
  if (!$u) return null;
  // Último acceso, como mucho una escritura cada 5 minutos.
  if (!$u['ultimo_acceso'] || strtotime($u['ultimo_acceso']) < time() - 300) {
    q('UPDATE app_campus_usuarios SET ultimo_acceso = ? WHERE id = ?', [ahora(), $u['id']]);
  }
  return $cache = $u;
}

function exigir(string $rol): array
{
  $u = usuario_actual();
  if (!$u) fallo(401, 'Tu sesión ha caducado. Vuelve a entrar.');
  if ($u['rol'] !== $rol) fallo(403, 'No tienes permiso para esto.');
  return $u;
}

function grupo_de(array $u): ?array
{
  if (!$u['grupo_id']) return null;
  $g = fila('SELECT id, nombre, curso, anyo, archivado FROM app_campus_grupos WHERE id = ?', [$u['grupo_id']]);
  if (!$g) return null;
  return ['id' => (int)$g['id'], 'nombre' => $g['nombre'], 'curso' => $g['curso'], 'anyo' => $g['anyo'], 'archivado' => (bool)$g['archivado']];
}

function usuario_publico(array $u): array
{
  return [
    'id' => (int)$u['id'],
    'rol' => $u['rol'],
    'usuario' => $u['usuario'],
    'nombre' => $u['nombre'],
    'apellidos' => $u['apellidos'],
    'grupo' => $u['rol'] === 'alumno' ? grupo_de($u) : null,
  ];
}

// ── Acciones ──────────────────────────────────────────────────────────────────

function accion_login(array $in): never
{
  $usuario = mb_strtolower(txt($in, 'usuario', 60, true, 'usuario'));
  $pass = $in['password'] ?? '';
  if (!is_string($pass) || $pass === '' || strlen($pass) > 200) fallo(422, 'Escribe tu contraseña.');
  $ip = ip_cliente();

  $desde = ahora(-VENTANA_INTENTOS);
  $fallosUsuario = (int)fila('SELECT COUNT(*) n FROM app_campus_intentos WHERE usuario = ? AND created_at > ?', [$usuario, $desde])['n'];
  $fallosIp = (int)fila('SELECT COUNT(*) n FROM app_campus_intentos WHERE ip = ? AND created_at > ?', [$ip, $desde])['n'];
  if ($fallosUsuario >= MAX_FALLOS_USUARIO || $fallosIp >= MAX_FALLOS_IP) {
    fallo(429, 'Demasiados intentos fallidos. Espera 15 minutos o pide al profesor que te cambie la contraseña.');
  }

  $u = fila('SELECT * FROM app_campus_usuarios WHERE usuario = ?', [$usuario]);
  $ok = password_verify($pass, $u['pass_hash'] ?? HASH_RELLENO) && $u && (int)$u['activo'] === 1;
  if (!$ok) {
    q('INSERT INTO app_campus_intentos (ip, usuario, created_at) VALUES (?, ?, ?)', [$ip, $usuario, ahora()]);
    if (random_int(1, 20) === 1) q('DELETE FROM app_campus_intentos WHERE created_at < ?', [ahora(-86400)]);
    fallo(401, 'Usuario o contraseña incorrectos.');
  }

  if (password_needs_rehash($u['pass_hash'], PASSWORD_DEFAULT)) {
    q('UPDATE app_campus_usuarios SET pass_hash = ? WHERE id = ?', [password_hash($pass, PASSWORD_DEFAULT), $u['id']]);
  }
  q('DELETE FROM app_campus_intentos WHERE usuario = ?', [$usuario]);

  $recordar = bool_de($in, 'recordar');
  $duracion = $recordar ? DURACION_RECORDAR : DURACION_SESION;
  $tok = bin2hex(random_bytes(32));
  q(
    'INSERT INTO app_campus_sesiones (token_hash, usuario_id, expira, creada, ip, ua) VALUES (?, ?, ?, ?, ?, ?)',
    [hash('sha256', $tok), $u['id'], ahora($duracion), ahora(), $ip, mb_substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 255)]
  );
  q('UPDATE app_campus_usuarios SET ultimo_acceso = ? WHERE id = ?', [ahora(), $u['id']]);
  if (random_int(1, 20) === 1) q('DELETE FROM app_campus_sesiones WHERE expira < ?', [ahora()]);

  // Sin «recordarme», cookie de sesión del navegador (se va al cerrarlo): en los
  // ordenadores del aula no se queda nadie conectado.
  $expiraCookie = $recordar ? time() + $duracion : 0;
  poner_cookie(COOKIE_SESION, $tok, $expiraCookie, true);
  poner_cookie(COOKIE_PISTA, $u['rol'], $expiraCookie, false);

  responder(['usuario' => usuario_publico($u)]);
}

function accion_logout(): never
{
  $tok = (string)($_COOKIE[COOKIE_SESION] ?? '');
  if (preg_match('/^[a-f0-9]{64}$/', $tok)) {
    q('DELETE FROM app_campus_sesiones WHERE token_hash = ?', [hash('sha256', $tok)]);
  }
  borrar_cookies();
  responder();
}

function accion_yo(): never
{
  $u = usuario_actual();
  if (!$u) {
    // Cookie caducada o revocada: se limpia la pista para no volver a preguntar.
    if (isset($_COOKIE[COOKIE_PISTA]) || isset($_COOKIE[COOKIE_SESION])) borrar_cookies();
    responder(['usuario' => null]);
  }
  responder(['usuario' => usuario_publico($u)]);
}

/** Cambio de contraseña propio (alumno o profesor). Cierra el resto de sesiones abiertas. */
function accion_cambiar_password(array $in): never
{
  $u = usuario_actual();
  if (!$u) fallo(401, 'Tu sesión ha caducado. Vuelve a entrar.');
  $actual = $in['actual'] ?? '';
  $nueva = $in['nueva'] ?? '';
  if (!is_string($actual) || !is_string($nueva)) fallo(422, 'Datos no válidos.');
  if (!password_verify($actual, $u['pass_hash'])) fallo(422, 'La contraseña actual no es correcta.');
  if (mb_strlen($nueva) < 8) fallo(422, 'La nueva contraseña debe tener al menos 8 caracteres.');
  if (strlen($nueva) > 200) fallo(422, 'La nueva contraseña es demasiado larga.');
  q('UPDATE app_campus_usuarios SET pass_hash = ? WHERE id = ?', [password_hash($nueva, PASSWORD_DEFAULT), $u['id']]);
  $tok = (string)($_COOKIE[COOKIE_SESION] ?? '');
  q('DELETE FROM app_campus_sesiones WHERE usuario_id = ? AND token_hash <> ?', [$u['id'], hash('sha256', $tok)]);
  responder();
}
