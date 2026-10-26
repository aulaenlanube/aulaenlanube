# Campus del Curso de Programación con IA

Zona privada del curso para **evaluar al alumnado**: el profesor crea grupos y
alumnos, reparte credenciales, publica entregas y corrige con la rúbrica; el
alumno ve sus sesiones, entrega desde su panel y recibe la nota explicada
criterio a criterio. Dos cursos independientes: **presencial** y
**semipresencial** (cada uno con sus grupos y sus entregas).

| URL | Quién | Qué |
|-----|-------|-----|
| `/programacion-ia/acceso/` | todos | Login (común; redirige al panel de cada rol) |
| `/programacion-ia/aula/` | alumno | Mi curso (proyectos → sesiones → entregas) · Mis notas · Cuenta |
| `/programacion-ia/profesor/` | profesor | Grupos por curso · Seguimiento y corrección · Entregas · Cuenta |
| `/programacion-ia/plan/` | profesor | Planificación privada (plan general + mapa de sesiones), con la misma sesión |
| `/campus-api/api.php` | — | API JSON (PHP) |

Las tres páginas son `noindex` y no están en el sitemap. Las páginas de
contenido del curso siguen siendo públicas; si hay sesión abierta, arriba sale
una franja «Conectado como… · Ir a mi aula» (`_campus/BarraCampus.tsx`).

## Arquitectura

El sitio es un **export estático** en Hostinger (sin Node en el servidor), así
que:

- **Backend = PHP 8.2 + la MySQL del sitio** (`public/campus-api/`, se publica
  con el resto de `out/`). Credenciales: `aeln-db-config.php`, fuera del docroot
  y del repo (el mismo fichero que usa `subscribe.php`). `lib/*.php` no se
  ejecuta por URL (guarda `CAMPUS_API` → 404).
- **Frontend = componentes cliente** (`app/programacion-ia/_campus/`) que llaman
  a la API con `fetch`. La navegación interna de cada panel va por hash
  (`#/grupo/3/corregir/1/12`) porque el export estático no admite rutas dinámicas.
- **Fuente única compartida** (TypeScript sin alias ni sintaxis no borrable,
  para que también la importe Node en `tools/campus`):
  - `lib/campus/catalogo.ts` — cursos → proyectos → sesiones (enlazan a las
    páginas públicas).
  - `lib/campus/rubricas.ts` — rúbricas y `calcularNota()`. La de la web de
    marca la pinta también la página pública de la sesión 03.
  - `lib/campus/cliente.ts` — cliente de la API y tipos.

### Planificación privada (misma sesión)

`public/programacion-ia/plan/.htaccess` reescribe cualquier petición de esa
carpeta a `campus-api/plan.php`, que solo sirve el fichero estático si hay un
**profesor con sesión en el campus**; sin sesión lleva al acceso (y tras entrar
vuelve al plan), y a un alumno lo manda a su aula. Sustituye al antiguo
candado Basic Auth, que pedía un segundo login. El deploy solo excluye el
`.htaccess` de la raíz, así que este se publica solo. En local lo emula
`tools/campus/dev/router.php`. Ojo: los `.md` del plan (`docs/plan-curso-*.md`)
están en el repo, que es público.

### Datos (tablas `app_campus_*`, `tools/campus/schema.sql`)

| Tabla | Para qué |
|-------|----------|
| `grupos` | nombre, curso (`presencial`/`semipresencial`), año, archivado |
| `usuarios` | profesor y alumnado; `pass_hash` bcrypt; `grupo_id`; activo; último acceso |
| `sesiones` | token de sesión (en BD solo su SHA-256), caducidad |
| `intentos` | fallos de login (límite de fuerza bruta) |
| `entregas` | por curso: proyecto/sesión del catálogo, tipo (`github`/`url`/`texto`), rúbrica, fecha límite, abierta, visible |
| `envios` | lo entregado (una fila viva por alumno y entrega; `version` cuenta reenvíos) |
| `notas` | valoraciones por criterio (JSON), mínimos, nota, NE, comentario, nota privada, `origen` (`profesor`/`ia`), publicada |

Las fechas las escribe siempre PHP en hora de Madrid (nunca `NOW()`).

### Reglas de evaluación

- Nota = Σ peso × % del nivel / 10 (sobre 10). Niveles 0 / 50 / 80 / 100 %.
- Si falla un **requisito mínimo** → **NE** (no evaluable). Se guarda la
  puntuación de la rúbrica para que el alumno vea cuánto sacaría al arreglarlo.
- El alumno **solo ve lo publicado**. Los borradores y las propuestas de la IA
  no le llegan hasta que el profesor publica.
- Si el alumno reenvía después de la corrección, la casilla pasa a «reenviada»
  y vuelve a contar como «por corregir».
- Entregas: mientras estén **abiertas** se pueden actualizar; pasada la fecha
  límite se admiten pero marcadas «fuera de plazo»; **cerrada** = no admite cambios.

### Seguridad

- Contraseñas bcrypt (`password_hash`); las del alumnado solo se ven al crearlas
  o regenerarlas (fichas imprimibles).
- Cookie de sesión HttpOnly + Secure + SameSite=Lax. Sin «recordarme» es cookie
  de navegador (no se queda nadie conectado en el aula); con él, 30 días.
- CSRF: la API solo acepta POST JSON con la cabecera `X-Campus: 1` (y comprueba
  `Origin`). Límite de login: 8 fallos/15 min por usuario, 60 por IP (el aula
  sale por una sola IP).
- Cambiar la contraseña, regenerarla o desactivar al alumno cierra sus sesiones.

## Uso diario (profesor)

1. **Grupos** → «+ Nuevo grupo presencial/semipresencial».
2. En el grupo → **+ Añadir alumnado**: pega la lista (una persona por línea:
   «Apellidos, Nombre», columnas de hoja de cálculo o «Nombre Apellidos»).
   Se generan usuario (`nombre.apellido`) y contraseña legible
   (`palabra-palabra-123`) → **Imprimir fichas** para repartirlas.
3. **Entregas**: cada curso tiene las suyas (se pueden crear en los dos a la vez).
4. **Seguimiento y notas**: matriz alumnos × entregas. Clic en una casilla →
   corrección con la rúbrica (clic en el nivel de cada criterio, mínimos,
   comentarios) → *Guardar borrador* / *Guardar y publicar* / *Guardar y siguiente*.
   «Publicar N revisadas» publica de golpe los borradores del profesor (nunca
   las propuestas de la IA sin revisar). **Exportar notas (CSV)** para ITACA.

## Corrección asistida por IA

Cuatro pasos; los datos del alumnado quedan en `.campus-trabajo/` (gitignored).
En Claude Code basta con pedir **`/corregir-entrega 1`** (skill en
`.claude/skills/corregir-entrega/`), que hace todo esto:

```bash
node tools/campus/exportar-entregas.mjs --entrega 1 [--grupo 3]   # 1. qué se ha entregado
node tools/campus/analizar-repos.mjs --entrega 1                   # 2. clona y recoge evidencias
node tools/campus/valorar-opus.mjs 1 [usuario]                     # 3. Claude Opus valora → propuestas-ia.json
node tools/campus/importar-propuestas.mjs --entrega 1 --simular    # 4. comprobar…
node tools/campus/importar-propuestas.mjs --entrega 1              #    …y cargar como borradores
```

- **Paso 2** deja por alumno `evidencias/<usuario>.json` (historial git con
  mensajes, ramas, PR/issues si `gh` está autenticado, ficheros, HTML
  semántico, meta/OG, alt, SVG, formularios/mailto, CSS variables/media
  queries/modo oscuro, JS, README/ADR/prompts, estado HTTP de la web, errores de
  consola y desbordamiento en móvil con Playwright + capturas), un `resumen.md`
  y `propuestas.plantilla.json` con los **mínimos objetivos ya sugeridos**.
- **Paso 3**: la IA lee evidencias + código del clon y rellena
  `propuestas.json` (todas las valoraciones `{n, c}`, mínimos, comentario para
  el alumno y en `privado` las evidencias clave para el profesor).
- **Paso 4** calcula la nota con la misma rúbrica del panel y la carga como
  borrador **«IA · revisar»**. No publica nada y no pisa correcciones del
  profesor ni notas publicadas (salvo `--forzar`). El profesor abre cada una,
  ajusta y publica; al guardarla pasa a ser suya.

Las herramientas van contra **producción** por túnel SSH (credenciales en
`admin/.env.local` y `tools/deploy.env`); con `--local`, contra la BD de Docker.

## Desarrollo y despliegue

```bash
bash tools/campus/dev.sh up      # MariaDB + PHP 8.2 en Docker → http://127.0.0.1:8088/programacion-ia/acceso/
                                 # profesor de pruebas: profe / profe-local-123
bash tools/campus/dev.sh build   # recompila el sitio (la API se monta en vivo: editar PHP no exige rebuild)
bash tools/campus/dev.sh down    # para y borra la BD de pruebas

node tools/campus/migrar.mjs                         # crea/actualiza tablas + entregas iniciales (idempotente)
node tools/campus/crear-profesor.mjs edu "Edu" "Torregrosa Llácer"
node tools/campus/crear-profesor.mjs edu --reset     # contraseña nueva si se pierde
bash tools/deploy-production.sh                      # publica el sitio (incluye campus-api/)
```

### Ampliar el curso

- **Nueva sesión o proyecto**: página pública como las demás + entrada en
  `lib/campus/catalogo.ts` (id de proyecto y de sesión). Si el semipresencial
  va por otro camino, basta con darle otra lista de `proyectos` en `CURSOS`.
- **Nueva entrega**: desde el panel (pestaña Entregas), apuntando al proyecto y
  sesión del catálogo. No hace falta desplegar.
- **Nueva rúbrica**: añadirla a `lib/campus/rubricas.ts` (ids en minúsculas con
  guiones) y a `RUBRICAS`; aparece sola en el selector de entregas.
