# Curso de Programación con IA — Planificación 2026-27
### 1º DAM · IES Dr. Lluís Simarro · **PREVISIÓN PRIVADA (solo docent)**
_Última actualización: 2026-09-29 · autor: JARVIS + Edu · recalculada contra lo que el grupo ha hecho de verdad (S1-S2 dadas, serie de vídeo en marcha, proyecto 1 lanzado y con tutoriales publicados)_

## 0. Marco

- **Tesis del curso**: el alumno de FP no va a escribir código línea a línea; va a **dirigir agentes de IA** que lo escriben. Su trabajo real: especificar, decidir, validar el resultado, integrar y entregar. El código no se memoriza, **se audita**: el alumno es editor con criterio, no autor material.
- **Con los modelos del centro como motor** (IA local, sin cuentas de pago). Lo que el centro todavía no pueda dar (proxy con clave) se cubre con vías gratuitas sin API key: el alumnado **jamás** pone una clave propia en un proyecto del curso.
- **Método startup**: proyecto individual con micro-roles (producto / arquitectura / QA), repo vivo desde el primer día, entrega y defensa por proyecto con la **rúbrica publicada por delante**.
- **Una sesión semanal** (la serie de vídeo marca el ritmo: se graba el fin de semana, se publica el domingo). Fechas de esta previsión ancladas al calendario escolar CV 26-27: **puente 9-12 oct · Navidad 22 dic – 6 ene · Fallas 16-19 mar · Pascua 25 mar – 5 abr · fin de curso 18 jun**. Si el día lectivo del grupo se mueve, JARVIS recalcula la tabla al cerrar cada semana — lo que no cambia es el **orden de proyectos**.

## 1. Primera evaluación · 3 proyectos (S1-S13: 22 sep → 15 dic)

> Desglose completo semana a semana → [Mapa de sesiones](/programacion-ia/plan/sesiones/)

| # | Proyecto | Qué es | Semanas | Estado |
|---|----------|--------|---------|--------|
| P1 | **Web personal de marca** | La web del alumno, publicada en GitHub Pages con git y README: decidir marca, dirigir al agente, iterar contra la rúbrica y defender. Material ya publicado: [portada del proyecto](/programacion-ia/web-personal/), sesiones [1](/programacion-ia/sesion-01/)·[2](/programacion-ia/sesion-02/)·[3](/programacion-ia/sesion-03/) y los [4 tutoriales para subir nota](/programacion-ia/tutoriales/) | S2-S4 (arrancada en S2) | 🔶 EN CURSO |
| P2 | **CLI «tareas con IA»** | Aplicación de terminal que usa el sistema operativo y combina IA para tareas sencillas sobre los **propios ficheros**: ordenar descargas, renombrar por fechas, resumir documentos, generar READMEs… con **acciones predefinidas en un fichero de configuración** (lo potente del proyecto: el alumno define las acciones, el agente las implementa) | S5-S8 | ⬜ |
| P3 | **Videojuego** | Juego web 2D pequeño y pulido, publicado y jugable por cualquiera (Phaser o canvas puro, mismo GitHub Pages): spec de diversión, bucle de juego, assets generados con IA y curados a mano, playtest cruzado, release y postmortem | S9-S12 | ⬜ |

**S13 (15 dic)**: defensa final de evaluación + portfolio, y cierre de notas justo antes de Navidad (**22 dic – 6 ene**).

El hilo entre los tres es deliberado: la **web** enseña a publicar y a decidir (marca, rúbrica, criterio); la **CLI** enseña sistema — terminal, ficheros, permisos, secretos, pruebas — y a dar poder al usuario con configuración externa; el **juego** enseña estados, balance y pulido, la parte de producto que más se nota. Y los tres comparten el esqueleto: spec de 10 líneas → dirigir al agente → auditar → probar → publicar → defender.

## 2. Ritmo semanal (plantilla fija)

- **Clase** — kickoff (2'): recap de la semana anterior + especificación asistida (el alumno dicta, la IA estructura, el alumno corta). Después, trabajo con los agentes del centro; el profe pasa por puestos auditando **decisiones**, no código.
- **Regla de oro**: cada entrega necesita (a) spec de 10 líneas, (b) decisión anotada (ADR o cuaderno), (c) prueba de que funciona. Sin eso, no cuenta.
- **Viernes/fin de semana** — demo, merge a main y grabación del **vídeo-semana** (se publica el domingo).

## 3. Herramientas que SÍ se enseñan (currículo oculto, repartido en los 3 proyectos)

1. **GitHub completo** (P1): ramas + PR, issues, Actions, releases, protect branch — en marcha desde S2.
2. **Especificación** (los 3): plantillas de spec — problema → usuarios → criterios de aceptación → no-objetivos; «el prompt es el nuevo pliego de condiciones».
3. **Terminal y sistema operativo** (P2): rutas, permisos, `PATH`, subprocess — el SO como plataforma de trabajo, no como pantalla.
4. **Secretos y configuración** (P2): qué es una API key, por qué vive fuera del repo, `.gitignore` antes del primer commit; config externa (las acciones predefinidas en JSON, no en el código).
5. **QA con IA** (P2-P3): pruebas escritas por el agente y auditadas por el alumno; «pedir a la IA que ataque su propio producto».
6. **Arquitectura ligera** (P2-P3): ADRs, diagrama de un contenedor, módulos: por qué la lógica va separada de la interfaz.
7. **Diseño y producto** (P1-P3): tokens (color/tipo), MVP vs v2, priorizar; en P3, game feel y curva de dificultad.
8. **Comunicación**: README que se sostiene solo, changelog, demo de 3 minutos, postmortem (P3).

## 4. Evaluación (primer evaluación)

- **Cada proyecto se evalúa con su rúbrica publicada antes de acabar**: P1 ya tiene la suya (`RUBRICA_WEB_MARCA`, 7 criterios con descriptores literales, visible en el [campus](/programacion-ia/acceso/) y explicada en la portada del proyecto). Las rúbricas de P2 (CLI) y P3 (juego) se publican en el campus las semanas S4 y S8.
- Común a los tres: **repo con historial real** (commits que cuentan el proceso), **cuaderno de decisiones** (qué pedí, qué devolvió la IA, qué cambié y por qué) y **defensión oral o grabada** con la rúbrica en la mano.
- **Nunca** se evalúa: velocidad tipeando, memorizar APIs o sintaxis, «código a mano» — sería evaluar la era anterior.
- Recuperable: cada proyecto deja una «prueba de producción» (web publicada / paquete instalable / juego jugable) reproducible en el periodo de recuperación.

## 5. Serie «El curso, en vídeo» (pública, en Aula en la nube)

Grabación viernes/sábado → publicación domingo. Norma de gancho (22-sep): abrir directo al tema, «resumen de la semana N» después, «para los que no sabíais, esto es un curso» al final; cada episodio vale solo.

| Ep | Semana | Tema | Estado |
|---|---|---|---|
| ep01 | S1 | «Soy profe de DAM y este año no voy a enseñar a programar como hasta ahora» | ✔ publicado |
| ep02 | S2 | «Crear una web real desde cero sin escribir una línea de código» (arranque de P1 + git) | ✔ publicado |
| ep03 | S3 | La rúbrica por dentro: iterar contra criterios, no contra gustos | 🔶 esta semana |
| … | — | un episodio por semana; los días de release (S4, S8, S12) llevan vídeo propio de producto | plan |

[Índice de la serie →](/programacion-ia/video-semana/) · Playlist «Curso de Programación con IA» cuando haya 4+ episodios.

## 6. Segunda y tercera evaluación (borrador — se detallan en enero)

Cerrada la primera evaluación con 3 productos publicados, la dirección prevista para después de Navidad (a confirmar con el resultado real de P1-P3):

- **Evaluación 2 (ene – mar)**: app web multiusuario real (el «SaaS del curso»: base de datos, despliegue en VPS propio) y empaquetado/distribución — el salto de «mi web» a «producto con usuarios». Fallas (16-19 mar) y la semana de Pascua ya descontadas.
- **Evaluación 3 (abr – jun)**: proyecto libre en micro-grupos tipo startup combinando al menos 2 plataformas + IA, **demo-day con invitado externo** (17 may – 18 jun) y portfolio final del curso.
- Decisiones que se toman en enero: qué producto multiusuario (votación), formato del demo-day, invitado.

## 7. Riesgos y mitigación

- **Dependencia del agente sin criterio** → «lo que no puedes explicar no cuenta» + defensa con rúbrica en la mano (ya probado en P1).
- **Copio-pega sin auditar** → pruebas obligatorias y revisión cruzada desde P2.
- **Fricción de entorno en el aula** → el profe prueba la toolchain de cada proyecto la semana previa (la de P1 ya está rodada: los [tutoriales](/programacion-ia/tutoriales/) recogen los atascos reales detectados).
- **Fallas de red/modelos en clase** → todo proyecto con modo degradado: la CLI hace sus acciones predefinidas sin IA; el juego no depende de red.
- **Claves y datos** → ninguna API key personal en ningún repo del curso; los modelos del centro, cuando exista el proxy (clave en servidor), y vías gratuitas sin clave mientras tanto (lo documenta el tutorial del chatbot).
- **Fiestas y cambios de día** → se mueven las fechas, nunca el orden de proyectos.

---
*Previsión viva: este documento y el [mapa semanal](/programacion-ia/plan/sesiones/) forman la fuente de verdad (en el repo: `docs/plan-curso-programacion-ia-2026-27.md` y `docs/plan-curso-sesiones-2026-27.md`). JARVIS los actualiza al cerrar cada semana (lecciones del vídeo-semana + retro docent).*
