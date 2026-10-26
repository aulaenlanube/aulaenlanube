<?php
// Campus del Curso de Programación con IA · utilidades comunes de la API:
// conexión a la BD, lectura/validación de la entrada y respuestas JSON.
// Solo se carga desde api.php (si se pide este fichero por URL, 404).
declare(strict_types=1);
if (!defined('CAMPUS_API')) { http_response_code(404); exit; }

date_default_timezone_set('Europe/Madrid');

/** Error controlado: se devuelve al cliente como {ok:false, error} con su código HTTP. */
final class ErrorApi extends Exception
{
  public function __construct(public int $estado, string $mensaje)
  {
    parent::__construct($mensaje);
  }
}

function fallo(int $estado, string $mensaje): never
{
  throw new ErrorApi($estado, $mensaje);
}

function responder(array $datos = []): never
{
  echo json_encode(['ok' => true] + $datos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

/** Fecha/hora local (Madrid) en formato DATETIME. Todas las fechas las pone PHP. */
function ahora(int $desplazamiento = 0): string
{
  return date('Y-m-d H:i:s', time() + $desplazamiento);
}

// ── Base de datos ─────────────────────────────────────────────────────────────

/**
 * Credenciales: aeln-db-config.php, que vive FUERA del docroot (y del repo).
 * Se localiza subiendo directorios, igual que subscribe.php. Devuelve un array
 * con host, user, pass, name y port.
 */
function campus_config(): array
{
  $dir = __DIR__;
  for ($i = 0; $i < 8; $i++) {
    $p = $dir . '/aeln-db-config.php';
    if (is_file($p)) {
      $cfg = require $p;
      if (is_array($cfg)) return $cfg;
      break;
    }
    $padre = dirname($dir);
    if ($padre === $dir) break;
    $dir = $padre;
  }
  fallo(500, 'El campus no está configurado en este servidor.');
}

function db(): PDO
{
  static $pdo = null;
  if ($pdo instanceof PDO) return $pdo;
  $c = campus_config();
  $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $c['host'], (int)($c['port'] ?? 3306), $c['name']);
  $pdo = new PDO($dsn, $c['user'], $c['pass'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
  ]);
  return $pdo;
}

function q(string $sql, array $params = []): PDOStatement
{
  $st = db()->prepare($sql);
  $st->execute($params);
  return $st;
}

function fila(string $sql, array $params = []): ?array
{
  $r = q($sql, $params)->fetch();
  return $r === false ? null : $r;
}

function filas(string $sql, array $params = []): array
{
  return q($sql, $params)->fetchAll();
}

/** Ejecuta $fn dentro de una transacción (rollback si lanza). */
function transaccion(callable $fn): mixed
{
  $pdo = db();
  $pdo->beginTransaction();
  try {
    $r = $fn();
    $pdo->commit();
    return $r;
  } catch (Throwable $e) {
    $pdo->rollBack();
    throw $e;
  }
}

/** Lista de enteros para una cláusula IN (…) segura: devuelve [marcadores, valores]. */
function en_lista(array $ids): array
{
  $ids = array_values(array_unique(array_map('intval', $ids)));
  if (!$ids) $ids = [0];
  return [implode(',', array_fill(0, count($ids), '?')), $ids];
}

// ── Entrada ───────────────────────────────────────────────────────────────────

function entrada(): array
{
  static $in = null;
  if ($in !== null) return $in;
  $raw = file_get_contents('php://input') ?: '';
  if (strlen($raw) > 512 * 1024) fallo(413, 'La petición es demasiado grande.');
  $in = json_decode($raw, true);
  if (!is_array($in)) fallo(400, 'Petición no válida.');
  return $in;
}

/** Texto obligatorio (u opcional con $req=false → '' si falta), recortado y con tope de longitud. */
function txt(array $in, string $k, int $max, bool $req = true, string $etiqueta = ''): string
{
  $v = $in[$k] ?? '';
  if (!is_string($v) && !is_int($v) && !is_float($v)) fallo(422, 'Campo no válido: ' . ($etiqueta ?: $k) . '.');
  $v = trim((string)$v);
  if ($req && $v === '') fallo(422, 'Falta un dato: ' . ($etiqueta ?: $k) . '.');
  if (mb_strlen($v) > $max) fallo(422, 'Demasiado largo: ' . ($etiqueta ?: $k) . " (máximo $max caracteres).");
  return $v;
}

function ent(array $in, string $k): int
{
  $v = $in[$k] ?? null;
  if (is_int($v)) return $v;
  if (is_string($v) && preg_match('/^\d{1,10}$/', $v)) return (int)$v;
  fallo(422, "Falta un identificador válido ($k).");
}

function bool_de(array $in, string $k, bool $defecto = false): bool
{
  if (!array_key_exists($k, $in)) return $defecto;
  return filter_var($in[$k], FILTER_VALIDATE_BOOLEAN);
}

/** 'YYYY-MM-DDTHH:MM' (input datetime-local) o 'YYYY-MM-DD HH:MM[:SS]' → DATETIME, o null si viene vacío. */
function fecha_de(array $in, string $k): ?string
{
  $v = trim((string)($in[$k] ?? ''));
  if ($v === '') return null;
  $v = str_replace('T', ' ', $v);
  if (!preg_match('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/', $v)) fallo(422, 'Fecha no válida.');
  $d = DateTime::createFromFormat(strlen($v) === 16 ? 'Y-m-d H:i' : 'Y-m-d H:i:s', $v);
  if (!$d) fallo(422, 'Fecha no válida.');
  return $d->format('Y-m-d H:i:s');
}

const CURSOS = ['presencial', 'semipresencial'];
const TIPOS_ENTREGA = ['github', 'url', 'texto'];

function curso_valido(string $c): string
{
  if (!in_array($c, CURSOS, true)) fallo(422, 'Curso no válido.');
  return $c;
}

function ip_cliente(): string
{
  return substr((string)($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45);
}

// ── Formato de salida ─────────────────────────────────────────────────────────

function json_o_nulo(?string $s): mixed
{
  if ($s === null || $s === '') return null;
  $v = json_decode($s, true);
  return $v === null ? null : $v;
}

/**
 * Doble corrección (notas.correcciones). Al alumno no le llegan las notas
 * privadas de cada corrección; al profesor, sí.
 */
function correcciones_publicas(?string $json, bool $profesor): ?array
{
  $c = json_o_nulo($json);
  if (!is_array($c)) return null;
  if (!$profesor) {
    foreach (['centro', 'opus'] as $k) {
      if (is_array($c[$k] ?? null)) unset($c[$k]['privado']);
    }
  }
  return $c;
}

function nota_publica(array $n, bool $profesor = false): array
{
  return [
    'entrega_id' => (int)$n['entrega_id'],
    'alumno_id' => (int)$n['alumno_id'],
    'valoraciones' => json_o_nulo($n['valoraciones'] ?? null),
    'minimos' => json_o_nulo($n['minimos'] ?? null),
    'nota' => $n['nota'] === null ? null : (float)$n['nota'],
    'no_evaluable' => (bool)$n['no_evaluable'],
    'comentario' => $n['comentario'],
    'correcciones' => correcciones_publicas($n['correcciones'] ?? null, $profesor),
    'publicada' => (bool)$n['publicada'],
    'publicada_at' => $n['publicada_at'],
    'updated_at' => $n['updated_at'],
  ];
}

function entrega_publica(array $e): array
{
  return [
    'id' => (int)$e['id'],
    'curso' => $e['curso'],
    'proyecto' => $e['proyecto'],
    'sesion' => $e['sesion'],
    'titulo' => $e['titulo'],
    'instrucciones' => $e['instrucciones'],
    'tipo' => $e['tipo'],
    'rubrica' => $e['rubrica'],
    'fecha_limite' => $e['fecha_limite'],
    'abierta' => (bool)$e['abierta'],
    'visible' => (bool)$e['visible'],
    'orden' => (int)$e['orden'],
  ];
}

function envio_publico(array $e): array
{
  return [
    'entrega_id' => (int)$e['entrega_id'],
    'alumno_id' => (int)$e['alumno_id'],
    'repo' => $e['repo'],
    'web' => $e['web'],
    'texto' => $e['texto'],
    'comentario' => $e['comentario'],
    'version' => (int)$e['version'],
    'fuera_plazo' => (bool)$e['fuera_plazo'],
    'created_at' => $e['created_at'],
    'updated_at' => $e['updated_at'],
  ];
}
