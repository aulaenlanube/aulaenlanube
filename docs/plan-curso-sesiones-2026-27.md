# Mapa de sesiones · Curso de Programación con IA 2026-27
### Desglose semana a semana hasta Navidad (primera evaluación) · **PREVISIÓN PRIVADA**
_Ortogonal al plan general (`plan-curso-programacion-ia-2026-27.md`): aquí es qué se hace cada semana. Actualizado 2026-09-29 — fechas contrastadas con lo realmente impartido y con la serie de vídeo. Si el día lectivo del grupo cambia, se recalcula la tabla; el orden de proyectos no se toca._

**Convenciones**: S = semana (una clase por semana). «Público» = tiene página en `/programacion-ia/`. Cada semana deja algo publicado el viernes. Primera evaluación = **3 proyectos**: web de marca (P1), CLI con IA (P2) y videojuego (P3).

---

## P1 · Web personal de marca — S2-S5 (21 sep → 23 oct) 🔶 EN CURSO
_[Portada del proyecto](/programacion-ia/web-personal/) · sesiones [1](/programacion-ia/sesion-01/) [2](/programacion-ia/sesion-02/) [3](/programacion-ia/sesion-03/) · [4 tutoriales](/programacion-ia/tutoriales/)]

| S | Semana | Qué se hace | Entregable |
|---|--------|-------------|------------|
| S1 ✔ | 14 sep | El cambio de método: por qué este curso no se memoriza sintaxis. Cuentas GitHub, perfil, primer prompt dirigido | Cuentas creadas + repo personal vacío ✔ |
| S2 ✔ | 21 sep | **Crear la web desde cero sin escribir código** (sesión 1) + **git de verdad** con su token y sus ramas (sesión 2). Primera web publicada en GitHub Pages | Web v1 publicada con repo y commits ✔ (ep02) |
| S3 ◐ | 28 sep | **La rúbrica por dentro** (sesión 3): qué pide cada criterio y cómo se ve el Excelente. Autoauditoría de su web con la rúbrica. Salen los 4 tutoriales para subir nota | Autoauditoría en `notas.txt` + plan de v2 (ep03) |
| S4 | 5 oct | **Iteración dirigida**: cada alumno ataca el criterio peor puntuado con un prompt de iteración (plantilla en tutorial 1). Revisión cruzada de PR en parejas | Web v2 + 10+ commits con historia |
| 🔻 | 9 oct | No lectivo (9 d'Octubat) | — |
| S5 | 12 oct | **Release day P1**: defensa oral de 5 min con la rúbrica en la mano + README técnico. Nota de proyecto | P1 evaluado + portfolio limpio |

**Herramientas enseñadas**: GitHub (ramas/PR/Actions), agente del centro, spec de 10 líneas, commits atómicos, Lighthouse básico.
**Riesgo known**: el token de GitHub (la mitad se atasca) — mitigado en ep02 y tutorial 1.

## Startup en grupo (solo presencial) — arranca el 19 oct y dura todo el curso
_Equipos de 4-5 formados en el campus (15 oct). Producto real: servidor + usuarios de fuera + Stripe. **Modelo de ingresos obligatorio desde el día 1** (también si es altruista): como mínimo cubre su mantenimiento. [Página del proyecto](/programacion-ia/proyecto-final-grupo/)._

| Fecha | Sesión | Qué se hace | Entregable |
|---|---|---|---|
| 19 oct | **Sesión 1 · Día 0** (2 h) — [página](/programacion-ia/proyecto-final-grupo/sesion-01/) · [guion docente](/programacion-ia/plan/startup-sesion-01/) | 1.ª hora: misión, 4 filtros, regla del dinero, taller problema → ficha con la IA de abogado del diablo. 2.ª hora: pitch de 3' + ronda de inversión ficticia + pivotar o perseverar | 26 oct: repo de la organización + ficha v1 (README) + 5 entrevistas |
| 20 oct | **Sesión 2 · Caja + arquitectura + sprint 1** (3 h) — [página](/programacion-ia/proyecto-final-grupo/sesion-02/) | Reparto de la caja recibida ayer (docs/presupuesto.md, auditoría IA) → taller de arquitectura por tipo de producto (juego / SaaS de servicio / voz con confirmación humana) → sprint 1: Issues con dueño+revisor, branches, PRs en parejas → mini-demos 3' | 26 oct: docs/presupuesto.md + docs/decisiones.md + 1 tarea fusionada en main |

## P2 · CLI «tareas con IA» — S6-S9 (19 oct → 13 nov)
_Mi proyecto del curso: una app de terminal que gestiona MIS ficheros con acciones predefinidas que yo configuro, combinando sistema operativo e IA. Nombre provisional: `simarro-tareas`._

| S | Semana | Qué se hace | Entregable |
|---|--------|-------------|------------|
| S6 | 19 oct | **Kickoff + terminal**: qué es una CLI y para qué sirve un dev. Live Server → terminal: rutas, `ls`, `cd`, `mkdir`, permisos. Instalar Python y el andamiaje con el agente: primera orden que funciona | `--ayuda` funcional en su equipo |
| S7 | 26 oct | **Acciones predefinidas** (sin IA todavía): el corazón del diseño — las acciones viven en `acciones.json` que escribe el ALUMNO («ordenar descargas por tipo», «renombrar fotos por fecha»…). La IA implementa el motor que las ejecuta. ADR: por qué config externa y no código | 3 acciones propias funcionando |
| S8 | 2 nov | **La capa IA**: los modelos del centro desde la terminal (endpoint local del aula — la clave NUNCA en el repo: `.env` + `.gitignore` antes del primer commit). Acciones con IA: resumir un texto, generar el README de una carpeta, renombrar por contenido. Modo sin red: las acciones predefinidas siguen funcionando | Acción IA demo en clase + `.gitignore` auditado |
| S9 | 9 nov | **Calidad y release**: tests que escribe el agente y audita el alumno (el caso feo: fichero inexistente, carpeta vacía), README de instalación (`pip install git+…`), GitHub Release v1.0. **Release day**: cada alumno instala y usa la CLI de otro | Paquete instalable + tag v1.0 + nota P2 |

**Herramientas**: terminal/SO, Python+Typer, `.env` y secretos, pytest, Actions, versionado semántico.
**Preparación profe (semana previa a S6)**: elegir librería (Typer) probada en los PCs del aula + endpoint de titan abierto al aula con límite.

## P3 · Videojuego — S10-S13 (16 nov → 14 dic)
_Juego web 2D pequeño y pulido, publicado en GitHub Pages y jugable por toda la clase. Mismo motor de siempre: spec → agente → auditar → publicar → defender._

| S | Semana | Qué se hace | Entregable |
|---|--------|-------------|------------|
| S10 | 16 nov | **Game design en una página**: qué máquina de estados tiene mi juego, cuánta diversión por minuto. Alcance deliberadamente pequeño (1 pantalla). Phaser o canvas según spec. Prototipo: «un cuadrado se mueve» | GDD de 1 página + repo + prototipo |
| S11 | 23 nov | **El bucle**: puntuación, vida/derrotas, dificultad progresiva — el estado del juego (mismo concepto que el mini-juego del tutorial 4 de medios, pero completo). Playtest cruzado en aula: juegan al del compañero, feedback en issues | Vertical slice jugable |
| S12 | 30 nov | **Pulido y assets con IA**: sonido, partículas, «juice» (la diferencia entre funciona y se siente bien); sprites generados con IA y curados a mano (igual que el SVG de P1: los revisas tú). Landing del juego en Pages | Build pública con página propia |
| S13 | 7 dic | **Torneo + postmortem**: todos juegan todos, ranking, defensa oral (por qué este bucle y no otro) y postmortem de media página | P3 evaluado + nota |

**Herramientas**: game feel, estados, GitHub Pages otra vez, playtest, postmortem.
**Preparación profe**: plantilla Phaser mínima probada en los equipos del aula.

## Cierre de evaluación — S14-S15 (14 dic – 21 dic)

| S | Semana | Qué se hace | Entregable |
|---|--------|-------------|------------|
| S14 | 14 dic | **Portfolio day**: los 3 proyectos enlazados desde la web de marca (¡P1 se actualiza con P2 y P3!), README raíz, limpieza de repos. Se les enseña el plan de la evaluación 2 | Portfolio público |
| S15 | 21 dic | Cierre de notas + retro del curso en vídeo (el de verdad: qué ha funcionado, qué no) + encuesta anónima al grupo | Notas 1ª ev. publicadas |
| 🔻 | **22 dic – 6 ene** | **NAVIDAD** | — |

## Evaluación 2 (borrador — se detalla en enero, 11 ene – 26 mar)

Dirección prevista, sujeta al resultado real de P1-P3: **app web multiusuario real** (base de datos, despliegue en servidor del curso — el salto de «mi web» a «producto con usuarios») y **publicación móvil** (la web del curso empaquetada). Fallas **16-19 mar** y **Pascua 25 mar – 5 abr** descontadas; detalle completo, al volver de Navidad.

---

### Evaluación y su anclaje a semanas
- **Cada proyecto con su rúbrica publicada por delante** (P1 ya pública en el campus; P2 y P3 se publican en S5 y S12).
- Común: repo con historial real + cuaderno de decisiones + defensa. Recuperable: cada proyecto deja una «prueba de producción» reproducible.
- La serie de vídeo acompaña: ep por semana, vídeo-propio en los release days (S5, S9, S13).

### Riesgos del mapa
- **S6 (terminal desde cero)**: mitad del grupo no la ha usado nunca → la sesión es guiada al 100% con la plantilla del profe probada la semana previa.
- **S8 depende del endpoint del centro**: si para el 2 nov no hay vía segura (proxy con clave en servidor), S8 se hace con la vía local del titan de clase; el modo sin IA de la CLI siempre funciona.
- **S13 diciembre** (excursiones/notas): el torneo se puede mover a S14 sin romper nada.
- Si una semana salta por causa mayor, se pierde sesión, no proyecto: los bloques van holgados a propósito.
