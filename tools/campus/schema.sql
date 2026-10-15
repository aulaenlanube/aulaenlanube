-- Campus del Curso de Programación con IA: grupos, alumnado, entregas y notas.
-- Tablas nuevas con prefijo app_campus_ en la misma MySQL del sitio. Idempotente
-- (CREATE TABLE IF NOT EXISTS): se puede volver a aplicar sin perder datos.
-- Aplicar en producción: node tools/campus/migrar.mjs
--
-- Las fechas se guardan en hora local de Madrid y las escribe siempre PHP
-- (nunca NOW() de MySQL), para no depender de la zona horaria del servidor.

CREATE TABLE IF NOT EXISTS app_campus_grupos (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre     VARCHAR(120) NOT NULL,
  curso      VARCHAR(20)  NOT NULL,              -- 'presencial' | 'semipresencial'
  anyo       VARCHAR(9)   NOT NULL DEFAULT '2026-27',
  archivado  TINYINT(1)   NOT NULL DEFAULT 0,
  created_at DATETIME     NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS app_campus_usuarios (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  rol           VARCHAR(10)  NOT NULL,           -- 'profesor' | 'alumno'
  usuario       VARCHAR(60)  NOT NULL,
  nombre        VARCHAR(80)  NOT NULL,
  apellidos     VARCHAR(120) NOT NULL DEFAULT '',
  email         VARCHAR(190) NULL,
  grupo_id      INT UNSIGNED NULL,
  pass_hash     VARCHAR(255) NOT NULL,
  activo        TINYINT(1)   NOT NULL DEFAULT 1,
  ultimo_acceso DATETIME     NULL,
  created_at    DATETIME     NOT NULL,
  UNIQUE KEY uq_usuario (usuario),
  KEY k_grupo (grupo_id),
  CONSTRAINT fk_campus_usuario_grupo FOREIGN KEY (grupo_id)
    REFERENCES app_campus_grupos (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sesiones de login: la cookie lleva un token aleatorio; aquí solo su SHA-256.
CREATE TABLE IF NOT EXISTS app_campus_sesiones (
  token_hash CHAR(64)     NOT NULL PRIMARY KEY,
  usuario_id INT UNSIGNED NOT NULL,
  expira     DATETIME     NOT NULL,
  creada     DATETIME     NOT NULL,
  ip         VARCHAR(45)  NULL,
  ua         VARCHAR(255) NULL,
  KEY k_usuario (usuario_id),
  KEY k_expira (expira),
  CONSTRAINT fk_campus_sesion_usuario FOREIGN KEY (usuario_id)
    REFERENCES app_campus_usuarios (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Intentos de login fallidos (límite de fuerza bruta por usuario y por IP).
CREATE TABLE IF NOT EXISTS app_campus_intentos (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  ip         VARCHAR(45)  NOT NULL,
  usuario    VARCHAR(60)  NOT NULL,
  created_at DATETIME     NOT NULL,
  KEY k_ip (ip, created_at),
  KEY k_usuario (usuario, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Entregas (tareas) de cada curso. proyecto/sesion = ids de lib/campus/catalogo.ts;
-- rubrica = id de lib/campus/rubricas.ts (NULL = nota numérica directa).
CREATE TABLE IF NOT EXISTS app_campus_entregas (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  curso         VARCHAR(20)  NOT NULL,
  proyecto      VARCHAR(40)  NOT NULL,
  sesion        VARCHAR(40)  NULL,
  titulo        VARCHAR(160) NOT NULL,
  instrucciones TEXT         NOT NULL,
  tipo          VARCHAR(20)  NOT NULL DEFAULT 'github',  -- 'github' | 'url' | 'texto'
  rubrica       VARCHAR(40)  NULL,
  fecha_limite  DATETIME     NULL,
  abierta       TINYINT(1)   NOT NULL DEFAULT 1,
  visible       TINYINT(1)   NOT NULL DEFAULT 1,
  orden         INT          NOT NULL DEFAULT 0,
  created_at    DATETIME     NOT NULL,
  KEY k_curso (curso, orden)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Lo que entrega cada alumno (una fila viva por alumno y entrega; version cuenta los reenvíos).
CREATE TABLE IF NOT EXISTS app_campus_envios (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  entrega_id  INT UNSIGNED NOT NULL,
  alumno_id   INT UNSIGNED NOT NULL,
  repo        VARCHAR(200) NULL,
  web         VARCHAR(300) NULL,
  texto       TEXT         NULL,
  comentario  TEXT         NULL,
  version     INT          NOT NULL DEFAULT 1,
  fuera_plazo TINYINT(1)   NOT NULL DEFAULT 0,
  created_at  DATETIME     NOT NULL,
  updated_at  DATETIME     NOT NULL,
  UNIQUE KEY uq_envio (entrega_id, alumno_id),
  KEY k_alumno (alumno_id),
  CONSTRAINT fk_campus_envio_entrega FOREIGN KEY (entrega_id)
    REFERENCES app_campus_entregas (id) ON DELETE CASCADE,
  CONSTRAINT fk_campus_envio_alumno FOREIGN KEY (alumno_id)
    REFERENCES app_campus_usuarios (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Equipos del proyecto en grupo (creado 15-10-2026): 4-5 personas por equipo,
-- un alumno = un equipo (PK en alumno_id). El curso que lo use decide mostrar la
-- herramienta; el reparto aleatorio lo lanza el profesorado.
CREATE TABLE IF NOT EXISTS app_campus_equipos (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  grupo_id   INT UNSIGNED NOT NULL,                -- grupo-clase (app_campus_grupos)
  nombre     VARCHAR(40)  NOT NULL,
  creado_por INT UNSIGNED NOT NULL,
  created_at DATETIME     NOT NULL,
  UNIQUE KEY uq_equipo (grupo_id, nombre),
  CONSTRAINT fk_equipo_grupo FOREIGN KEY (grupo_id)
    REFERENCES app_campus_grupos (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS app_campus_equipo_miembros (
  alumno_id  INT UNSIGNED NOT NULL PRIMARY KEY,    -- un alumno, un equipo
  equipo_id  INT UNSIGNED NOT NULL,
  es_lider   TINYINT(1)   NOT NULL DEFAULT 0,
  created_at DATETIME     NOT NULL,
  KEY k_equipo (equipo_id),
  CONSTRAINT fk_eqm_equipo FOREIGN KEY (equipo_id)
    REFERENCES app_campus_equipos (id) ON DELETE CASCADE,
  CONSTRAINT fk_eqm_alumno FOREIGN KEY (alumno_id)
    REFERENCES app_campus_usuarios (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Calificación de cada entrega. valoraciones = JSON {criterio: {n: nivel, c: comentario}};
-- minimos = JSON {requisito: bool}. origen 'ia' = propuesta de la corrección
-- asistida pendiente de revisar; el alumno solo ve las filas con publicada = 1.
CREATE TABLE IF NOT EXISTS app_campus_notas (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  entrega_id    INT UNSIGNED NOT NULL,
  alumno_id     INT UNSIGNED NOT NULL,
  valoraciones  TEXT         NULL,
  minimos       TEXT         NULL,
  nota          DECIMAL(4,2) NULL,
  no_evaluable  TINYINT(1)   NOT NULL DEFAULT 0,
  comentario    TEXT         NULL,
  nota_privada  TEXT         NULL,
  origen        VARCHAR(10)  NOT NULL DEFAULT 'profesor',  -- 'profesor' | 'ia'
  publicada     TINYINT(1)   NOT NULL DEFAULT 0,
  publicada_at  DATETIME     NULL,
  updated_at    DATETIME     NOT NULL,
  UNIQUE KEY uq_nota (entrega_id, alumno_id),
  KEY k_alumno (alumno_id),
  CONSTRAINT fk_campus_nota_entrega FOREIGN KEY (entrega_id)
    REFERENCES app_campus_entregas (id) ON DELETE CASCADE,
  CONSTRAINT fk_campus_nota_alumno FOREIGN KEY (alumno_id)
    REFERENCES app_campus_usuarios (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
