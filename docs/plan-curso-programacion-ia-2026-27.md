# Curso de Programación con IA — Planificación integral 2026-27
### 1º DAM · IES Dr. Lluís Simarro · **PREVISIÓN PRIVADA (solo docent)**
_Última actualización: 2026-09-28 · autor: JARVIS + Edu_

## 0. Marco

- **Tesis del curso**: el alumno de FP no va a escribir código línea a línea; va a **dirigir agentes de IA** que lo escriben. Su trabajo real: especificar, decidir arquitectura y funcionalidad, validar resultado, integrar, entregar. Eso es lo que entrenamos, con herramientas de producción desde la semana 1.
- **Todo con los modelos del centro (titan, IA local)**: misma experiencia sin cuentas de pago ni dependencia exterior.
- **Método startup**: proyecto individual + micro-grupos de rol (arquitectura / producto / QA), demo pública cada viernes, repo vivo desde el primer día.
- **El código no se memoriza, se audita**: el alumno nunca es autor material, es **editor con criterio**. Toda evaluación va sobre especificación, decisiones, revisión y entrega.
- **Calendario real CV 26-27**: clases hasta **18 de junio de 2027**. No lectivos: puente 9-12 oct · Navidad **22 dic–6 ene** · Fallas **16-19 mar** · Pascua **25 mar–5 abr**. → **≈30-32 semanas lectivas efectivas**.

## 1. Estructura en 6 bloques de proyecto (cada uno = mini-empresa que lanza un producto)

| # | Bloque | Proyecto (producto real) | Semanas | Fecha aprox | Entregable publicable |
|---|--------|--------------------------|---------|-------------|----------------------|
| 0 | **Fundamentos del dev con IA** | Setup + "Hola mundo dirigido": CLAUDE.md/AGENTS.md del centro, método, prompt de especificación | S1-S4 | 29 sep – 23 oct | Repo plantilla + primera spec bien escrita + CI verde |
| 1 | **CLI** | `simarro-qa`: CLI que pregunta dudas de clase al RAG del centro (Python + Typer; empaquetada con pip) | S5-S8 | 26 oct – 20 nov | Paquete instalable + tests + GH Actions + README de producción |
| 2 | **SaaS web** | App web multiusuario real (Next.js + Postgres): MVP elegido por votación (reserva de material del ciclo / tablón de proyectos). Auth, despliegue en VPS propio del curso | S9-S14 | 23 nov – 19 dic (+11-22 ene) | URL pública en dominio del curso con usuarios reales del ciclo |
| 3 | **Escritorio** | Herramienta de aula empaquetada (Electron o Tauri): p. ej. monitor de GPUs de titan o lanzador del RAG. Instalador .deb/.msi firmado en teoría | S15-S18 | 25 ene – 12 feb | Instalador + auto-update explicado + demo en sobremesa del aula |
| 4 | **Videojuego** | Juego web/game jam (Godot 4 o Phaser): corto, pulido, con "release" en itch.io del curso | S19-S23 | 15 feb – 19 mar (antes de Fallas) | Build jugable pública + postmortem |
| 5 | **Móvil** | App Android con **Expo/React Native**: la misma idea del SaaS version bolsillo (notas, avisos). Prueba en **emulador + APK en móvil propio**; Play Store: proceso completo enseñado (closed test), sin cuenta de pago | S24-S29 | 7 abr – 14 may | APK instalable por QR + doc "cómo se publicaría" |
| 6 | **Integración y portfolio** | "Producto final a elección" en micro-grupos tipo startup: combina al menos 2 plataformas + IA. Semana de demo-day con invitado externo (empresa/DAW senior) | S30-S34 | 17 may – 18 jun | Demo-day + portfolio GitHub público por alumno |

> Las semanas exactas se recalculan cada trimestre contra el calendario del centro (fiestas locales). El orden **CLI → Web → Escritorio → Juego → Móvil** es deliberado: dificultad de empaquetado y feedback creciente, y cada bloque reutiliza git/CI/specs del anterior.

## 2. Ritmo semanal (plantilla fija, adaptable)

- **Lunes** — *Kickoff*: recap del anterior (2'), especificación asistida: el alumno dicta, la IA estructura, el alumno corta (15'), asignación de roles y issue en GitHub (10').
- **Miércoles** — *Build*: trabajo con agentes locales; el profe pasa por puestos auditando **decisiones**, no código (lo que no sabe explicar, no vale).
- **Viernes** — *Demo & merge*: demo de 3' por alumno/grupo, PR review cruzada entre pares con checklist, merge a main, y grabación del vídeo-semana del curso (serie YouTube).
- **Regla de oro**: toda PR necesita (a) spec de 10 líneas, (b) decisión anotada en ADR si cambia arquitectura, (c) prueba que demuestre que funciona. Sin eso no se mergea.

## 3. Herramientas no-código que SÍ se enseñan (el currículo oculto)

1. **GitHub completo**: ramas + PR + reviews, Issues/Projects (kanban), Actions (CI), Releases semver, Protect branch, Codespaces.
2. **Especificación**: plantillas de spec (problema → usuarios → criterios de aceptación → no-objetivos), spec-driven development; "el prompt es el nuevo pliego de condiciones".
3. **Contexto de agente**: AGENTS.md/CLAUDE.md, memorias, por qué un buen contexto vale más que un prompt largo.
4. **Arquitectura**: ADRs (Architecture Decision Records), diagramas de contexto/contenedor (C4 ligero) hechos con ayuda de IA, límites y APIs.
5. **QA con IA**: Playwright con screenshots, pruebas de humo, "el tribunal incómodo" (pedir a la IA que ataque su propio producto), rúbricas de revisión.
6. **Producto**: prioridades (RICE simple), MVP vs v2, métricas de uso reales del SaaS del curso, feedback de usuarios reales (el resto del ciclo).
7. **Diseño**: Figma básico + design systems que la IA aplica; tokens (color/tipo/espaciado) y por qué.
8. **Operaciones**: despliegue real (VPS, DNS, HTTPS), variables de entorno y secretos (lo que NO se sube), monitorización mínima (logs, uptime), rollback; **seguridad**: qué es un API key leak (caso real del curso: el `.gitignore` que se comía código), dependencias, permisos mínimos.
9. **Comunicación**: README que se sostiene solo, changelog, demo de 3 minutos, escribir para quien no estaba.

## 4. Evaluación

- **Portfolio GitHub vivo (40%)**: repos públicos, historial limpio, specs y ADRs, CI en verde — rúbrica por bloque.
- **Demo + defensa oral (30%)**: viernes semana bimestral; defensa tipo "por qué esta decisión y no otra" (calco de la defensa de Tecnología: coherencia con lo que el alumno cuenta).
- **Cuaderno de decisiones (20%)**: entradas breves: qué pedí a la IA, qué me devolvió, qué cambié y por qué. (AntiaI-fairy: se valora el criterio, no la prosa.)
- **Cochistencia del equipo (10%)**: reviews hechas, issues gestionados.
- **Nunca**: velocidad tipeando, memorizar APIs, "código a mano" — sería evaluar la era anterior.
- Recuperable: cada bloque deja "prueba de producción" (deploy/checklist) que puede rehacerse en periodo de recuperación.

## 5. Vídeo-semana (serie pública en Aula en la nube)

- Viernes se graba, domingo se publica (ya rodado: ep01 20-sep, ep02 27-sep ✅ automatizado con cron de detección).
- Regla de gancho fijada 22-sep: abrir **directo al tema**, "resumen de la semana N" después, "para los que no sabíais, esto es un curso…" al final; cada episodio vale solo; recap opcional.
- Cada bloque de proyecto termina con un **vídeo "producto en producción"** (más allá del resumen de clase): son los que venden el método.
- Playlist «Curso de Programación con IA» creada cuando haya 4+ episodios (cuando lo digas, la monto por API).

## 6. Riesgos y mitigación

- **Dependencia del agente sin criterio** → regla "lo que no puedes explicar no cuenta" + defensas orales.
- **Copio-pega de la IA sin auditar** → QA con IA + revisión cruzada con checklist + ADRs firmados.
- **Fricción de entornos (aula)** → imagen/preparador del centro con toolchain de cada bloque probada la semana previa por docent (yo).
- **Fallas de red/titan en clase** → todos los proyectos tienen modo offline con modelo local pequeño de respaldo.
- **Ánimo del grupo en bloques largos** → micro-sprints de 1 semana dentro de cada bloque, siempre algo publicable los viernes.
- **Fiestas locales/swap de días** → los "fines de bloque" se mueven, el orden de bloques no.

## 7. Qué necesito de ti (decisiones, sin prisa)

1. **Nombre del SaaS del curso** (votación o decisión) — cambia ejemplos de specs.
2. **¿Cuentas GitHub del centro** para el alumnado (org `ies-simarro-dam`) o cuentas propias? → prepáralo en semana 3.
3. **Invitado para el demo-day** (junio): ¿contacto del sector / DAW de otro centro / familia-empresa?
4. **Ritmo de publicación de la serie**: mantener viernes-grabación/domingo-publicación (actual) es lo óptimo — confirmar.
5. Si quieres, en S2 monto el **org + repos plantilla** y lo dejo listo para el alumnado (tarea delegable).

---
*Este documento es previsión viva: se actualiza tras cada bloque (lecciones aprendidas en el vídeo-semana + retro docent). Versión pública futura: cuando cada bloque esté rodado y validado, su página pública correspondiente en /programacion-ia/.*
