# Mapa de sesiones · Curso de Programación con IA 2026-27
### Desglose semanal completo (S = sesión, 1/semana + sesión extra donde se indica) · **PREVISIÓN PRIVADA**
_Ortogonal al plan general (`plan-curso-programacion-ia-2026-27.md`): aquí es qué se hace cada lunes/miércoles/viernes. Actualizado 2026-09-28._

**Convenciones**: cada sesión = kickoff(L) + build(M) + demo/merge(V). «Público» = tiene página en /programacion-ia/. Fechas orientativas; se recalculan tras cada puente.

---

## BLOQUE 0 · Fundamentos del oficio con IA — S1-S4 (29 sep – 23 oct) 🔶 EN CURSO
| S | Fecha | Tema | Entregable |
|---|-------|------|-----------|
| S1 ✔ | 29 sep | El cambio de método: por qué no memorizamos sintaxis. Setup equipos + cuenta GitHub + primer prompt dirigido | Repo personal creado, perfil verde |
| S2 ✔ | 6 oct | Git/GitHub en carne viva: ramas, PR, merge (→ páginas públicas sesion-01/02/03) | Primera PR mergida por cada alumno |
| S3 ✔ | 13 oct | Web de marca: proyecto 1 lanzado + **rúbrica** (sesión reflexión publicada) | Web v1 en GitHub Pages |
| S4 | 20 oct | **Iteración dirigida por rúbrica**: cada alumno audita su web contra los 7 criterios y ataca el de menor puntuación; ADR y cuaderno de decisiones entran como hábito | Web v2 + cuaderno de decisiones iniciado |
| — | 9-12 oct | 🔻 PUENTE (no lectivo) | |

**Herramientas enseñadas**: GitHub (ramas/PR/issues), agente local del centro, spec de 10 líneas, Commits atómicos.
**Riesgo known**: la mitad se atasca en el token de GitHub (mitigado en vídeo ep02).

## BLOQUE 1 · CLI — S5-S8 (26 oct – 20 nov): `simarro-qa`
| S | Fecha | Tema | Entregable |
|---|-------|------|-----------|
| S5 | 26 oct | Qué es una CLI y por qué un dev vive en la terminal. Python + Typer: primera orden con --flags. Spec grupal → individual | `simarro-qa --ayuda` funcional |
| S6 | 2 nov | El corazón: conectar con la API del centro (el RAG responde dudas). Variables de entorno y secretos: qué nunca se sube | Pregunta → respuesta del RAG del centro |
| S7 | 9 nov | Calidad: tests con pytest escritos por el agente y auditados por ellos; manejo de errores (el caso feo: API caída) | Suite verde + demo de fallo controlado |
| S8 | 16 nov (extra 23 nov) | Empaquetado y release: pyproject, `pip install git+`, GitHub Release + Actions que empaqueta. **Release day**: cada alumno instala la CLI de otro | Paquete instalable + tag v1.0 |

**Herramientas**: terminal, pytest, GitHub Actions (por primera vez), versionado semántico, secretos.
**Producto vivo**: la CLI del grupo de mejor nota queda como utilería del aula.

## BLOQUE 2 · SaaS Web — S9-S14 (23 nov – 22 dic + 7-22 ene): la app del curso
| S | Fecha | Tema | Entregable |
|---|-------|------|-----------|
| S9 | 23 nov | Kickoff de producto: lluvia de candidatos (reserva material / tablón proyectos / intercambio libros), votación, spec maestra + roles startup (founder/CTO/QA por micro-grupo) | Spec v1 firmada por el grupo |
| S10 | 30 nov | Arquitectura: C4 ligero, qué es front/back/BD, por qué Next+Postgres. Plantilla del curso clonada | Diagrama de contenedores + repo del grupo |
| S11 | 7 dic | Auth real: registro/login de verdad (no demo). Modelos de datos | Un usuario creado en dev que persiste |
| S12 | 14 dic | CRUD completo de la feature estrella + validaciones. PR review cruzada de grupo | Feature mergida con tests |
| 🔻 | 23 dic – 6 ene | **NAVIDAD** | |
| S13 | 7 ene | Despliegue real: VPS del curso, DNS, HTTPS, variables. Cada grupo sube su MVP a URL propia | URL pública del grupo |
| S14 | 14 ene (extra 21 ene) | Usuarios reales: el resto del ciclo prueba la app; feedback → backlog → iteración. **Demo day SaaS** ante 2º DAM | MVP en producción + informe de uso |

**Herramientas**: Figma básico + tokens, ADRs, kanban de proyecto, métricas de uso, despliegue.
**Nota**: este bloque puede recortarse a 4 semanas si S9-S12 se desangran — la feature estrella es el mínimo viable, el resto v2.

## BLOQUE 3 · Escritorio — S15-S18 (25 feb – 12 mar): la herramienta de aula
| S | Fecha | Tema | Entregable |
|---|-------|------|-----------|
| S15 | 15 feb | ¿Por qué sigue existiendo el software de escritorio? Electron vs Tauri (decisión con ADR); reutilizamos la web del SaaS empaquetada | .deb que arranca en los PCs del aula |
| S16 | 22 feb | Integración con el sistema: leer hardware (monitor GPUs titan), notificaciones, config persistente | Widget de estado del centro |
| S17 | 1 mar | Instalador y firma: empaquetar para Windows y Linux, qué es code signing y por qué cuesta (el coste de producción real) | Instalador doble + ADR de plataforma |
| S18 | 8 mar | Auto-update y canal beta; **Release day escritorio** | App actualizándose sola en demo |

## BLOQUE 4 · Videojuego — S19-S23 (15 mar – 19 mar ✂ Fallas, 22 mar – 2 abr ✂ Pascua)
| S | Fecha | Tema | Entregable |
|---|-------|------|-----------|
| S19 | 15 mar | Game jam kickoff: premisa, alcance de 3 días de clase, engine (Godot o Phaser según grupo), game design doc de 1 página | GDD + repo + prototipo mueve un cuadro |
| 🔻 | 16-19 mar | **FALLAS** | |
| S20 | 22 mar | Bucle de juego: input, física, colisiones con agente; playtest cruzado en aula | Vertical slice jugable |
| S21 | 29 mar | Juice: partículas, sonido, screen shake — la diferencia entre «funciona» y «se siente bien» | Build con feedback sensorial |
| 🔻 | 25 mar-5 abr solapado / 6 abr vuelta | **PASCUA** | |
| S22 | 12 abr | Pulido + release en itch.io del curso: página, capturas, copy | Build pública jugable |
| S23 | 16 abr | Postmortem por grupo (qué mataríamos del diseño) | Informe + nota de bloque |

## BLOQUE 5 · Móvil — S24-S29 (19 abr – 14 may): Android de verdad
| S | Fecha | Tema | Entregable |
|---|-------|------|-----------|
| S24 | 19 abr | Expo/React Native: de web a componente; por qué «móvil no es una web dentro de un marco» | Pantalla que corre en su móvil |
| S25 | 26 abr | Navegación, formularios, estado offline-first: la app de avisos del ciclo (reutiliza el back del SaaS) | App conecta con la API del curso |
| S26 | 3 may | Cáscara nativa: cámara, notificaciones push, permisos (el usuario manda) | Push real recibido en clase |
| S27 | 10 may | Build APK + distribución por QR (Test Flight/Play internal). Emulador vs físico: las 5 mentiras del dev de móvil | APK instalada por 3 compañeros |
| S28 | 17 may | El camino a tienda: cuentas, tasas, firmas, fichero de la play, review y rechazos típicos — **se recorre el proceso completo hasta el umbral del pago, sin pagar** | «Release checklist» cumplido al 90% |
| S29 | 24 may (extra 31 may) | Iteración final del móvil según feedback + **Demo day móvil** | v1 móvil del grupo |

## BLOQUE 6 · Integración y portfolio — S30-S34 (31 may – 18 jun)
| S | Fecha | Tema | Entregable |
|---|-------|------|-----------|
| S30 | 31 may | Proyecto final a elección en micro-grupo (2+ plataformas + IA): pitch de 5 líneas, spec, ADR0 | Brief aprobado |
| S31-32 | 7-14 jun | Sprints con demo viernes; mentorías 1:1 por grupo (10 min cada uno) | Alpha funcional |
| S33 | 21 jun (extra) | Ensayo de defensa + portfolio GitHub: README raíz, limpieza de repos, carta de presentación técnica | Portfolio público |
| S34 | 28 jun ✂(ajustar a calendario) | **DEMO-DAY FINAL** con invitado externo: 6 min por grupo + defensa 4 min | Nota final + memoria del curso |

---

### Evaluación y su anclaje a sesiones
- Portfolio (40): se audita en S8, S14, S18, S23, S29, S33 (mini-notas de bloque acumulan).
- Demo+defensa (30): S14/S23/S29/S34.
- Cuaderno de decisiones (20): revisión mensual (S8, S18, S29).
- Coequipo (10): continua por PR reviews.
- **Recuperación**: cada bloque tiene «prueba de producción» re-hacible (deploy + checklist) en las dos semanas tras el cierre de bloque.

### Qué hace falta preparar (yo, la semana previa)
- S8: plantilla pyproject del curso. S9-S13: plantilla Next+Postgres + VPS del curso aprovisionado (¿nuevo o reutilizamos subdominio de aulaenlanube con contenedor en titan? → decidir en dic). S15: .deb probado en los PCs del aula. S19: Godot/Phaser en los equipos. S24: Expo + nodo 20 en aulas. S34: invitado.
- **Riesgos del mapa**: S13 post-Navidad = arranque frío (primera clase = repaso-juego); S19-21 en 4 días reales es justo → el juego puede bajar a «Phaser, 1 pantalla, pulida»; si titan cae una semana, todos los bloques tienen modo offline con modelo local pequeño.

### Vídeo-semana (serie pública)
S1 ✔ ep01 · S2 ✔ ep02 (27-sep) · S3 → ep03 (esta semana, ya con norma de gancho) · cada viernes se graba del día, se publica domingo. **Los «release day» (S8, S14, S18, S22, S29, S34) llevan vídeo propio de producto** — son los episodios que venden el método fuera del instituto. Playlist al llegar a ep04.
