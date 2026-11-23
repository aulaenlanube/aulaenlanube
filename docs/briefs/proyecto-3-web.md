# Brief: Proyecto 3 (Chispa) reflejado en la web del curso

Trabajas en `~/aulaenlanube` (rama `main`, recién fusionado el branch `juego-3d`).
Objetivo: que el Curso de Programación con IA refleje el **Proyecto 3 — Chispa,
videojuego 3D multijugador** ya construido y publicado. La documentación del
juego está copiada dentro de este repo en `docs/chispa/` (no accedas a ninguna
ruta fuera de `~/aulaenlanube`).

## Contexto que debes leer antes de escribir nada
- Los documentos del juego están COPIADOS en este repo bajo `docs/chispa/`
  (fuente de verdad, solo lectura: `README.md`, `diseno.md`, `decisiones.md`,
  `postmortem.md` y `sesiones/sesion-01.md` … `sesion-08.md`). Nada fuera de
  `~/aulaenlanube`.
- `docs/chispa/README.md` — qué es Chispa, reglas, robots, escenarios, objetos.
- `docs/chispa/sesiones/sesion-01.md` … `sesion-08.md` — las 8 sesiones
  reales: qué se hizo, cómo se pidió al agente (prompts resumidos), qué se aprendió.
- `docs/chispa/diseno.md` y `docs/chispa/decisiones.md` — el diseño y las 57 decisiones.
- `docs/paginas-para-video.md` y `docs/estilos-de-pagina.md` en ESTE repo — las reglas
  de maquetación para grabación (bloque 1100×620, h2 «Paso N · …» únicos, PromptBlock,
  modo `?video`). La página `app/programacion-ia/juego-3d/laboratorio/page.tsx` (recién
  fusionada) es el ejemplo vivo de página de este proyecto; imita su estructura.
- `app/programacion-ia/cli/page.tsx` y `app/programacion-ia/cli/sesion-01/page.tsx` —
  el patrón de página de proyecto y de sesión del curso (Proyecto 2).

## Tareas (en este orden)

### T1 — Portada del proyecto: `app/programacion-ia/juego-3d/page.tsx`
Página-índice del Proyecto 3 al estilo de `cli/page.tsx`:
- Qué es Chispa en una frase (robots que se disputan una chispa, 2-8 jugadores,
  pixel art en 3D), 10 robots, 6 escenarios, 21 objetos, en red con salas o contra
  el ordenador.
- Estado: **v3.1.0, publicado y jugable en el servidor del centro** (enlace a
  `https://titan/juegos/chispa/`; nota: la red requiere estar en el instituto).
- Las 8 sesiones como tarjetas (título real de cada `docs/sesiones/sesion-0N.md`)
  enlazadas a `/programacion-ia/juego-3d/sesion-0N/` (T2).
- El enlace al `Laboratorio 3D` (escenas interactivas) bien visible.
- Las «reglas del proyecto» que salen del README/postmortem del juego: diseño en
  una página con filtro de alcance, reglas como lógica pura testeable sin
  navegador, herramientas para que el agente vea (capturas), medir antes de tocar
  el balance.

### T2 — Sesiones 1 a 4 publicadas: `app/programacion-ia/juego-3d/sesion-0N/page.tsx`
Una página por sesión (N=1..4) generada fielmente desde `docs/chispa/sesiones/sesion-0N.md`
(fuente de verdad; no inventes pasos ni prompts).
Formato de página de sesión del curso (como `cli/sesion-01/`): encabezado con
etiqueta de git (`sesion-0N`), «Qué se ha hecho» como pasos `h2` «Paso N · …»
cumpliendo las 7 reglas de `docs/paginas-para-video.md` (títulos `h2` únicos, sin
URL ni números de commit visibles), los prompts de «Cómo se
pidió» en `PromptBlock`, y un pie «8 sesiones documentadas — las 5 a 8, en
preparación para vídeo». **Incluye en cada página un `<Visor3D>` del laboratorio
cuando la sesión trate un concepto que una escena del laboratorio cubra** (p. ej.
sesión 1 → escena `escena`, sesión 4 físicas → grupo `fisicas`): mira cómo lo usa
`laboratorio/page.tsx` y `pasos.ts`; si no hay escena natural, no lo fuerces.
Sesiones 5-8: sin página todavía; la portada (T1) las menciona como documentadas.

### T3 — Visibles desde el curso
- `app/programacion-ia/page.tsx`: donde dice «Ahora: proyecto 2…» pasar a
  «Ahora: proyecto 3, **Chispa**, un videojuego 3D multijugador» con su tarjeta
  enlazando a `/programacion-ia/juego-3d/` (respeta la estructura de tarjetas
  existente; el proyecto 2 sigue visible como terminado).
- `docs/plan-curso-programacion-ia-2026-27.md`: la fila P3 pasaba «juego 2D» a
  **videojuego 3D multijugador en navegador (Chispa: Three.js + Rapier + Supabase
  Realtime), publicado v3.1** y la nota de hilo P1→P2→P3 actualizada en
  consecuencia. Cambio mínimo, sin reescribir el plan.

## Reglas duras
- No hagas `git commit`, `git push`, despliegue, `ssh`, `rsync` ni nada fuera del
  árbol: escribes ficheros y punto (yo cierro los commits).
- `docs/chispa/` es documentación de solo lectura: no la edites ni la borres.
- No toques `node_modules` ni `pnpm-lock.yaml` (no añades dependencias: three y
  rapier ya están).
- Español de España en todo texto visible. Sin comillas raras de IA: el tono es el
  del resto del sitio (frases directas, sin adjetivos de marketing).
- Verifica tu trabajo: `npx tsc -p tsconfig.json --noEmit` al final (debe dar 0) y
  revisa que los enlaces internos apuntan a rutas que has creado.
- Al final escribe `docs/briefs/proyecto-3-web-commits.sh` (sin ejecutarlo):
  `set -euo pipefail`, tsc, `git add` de los ficheros concretos de T1-T3 + el
  registro + el brief, un commit por tarea con mensaje en español, y opción
  `--solo-comprobar` que solo compila. Nada de push ni deploy.
- Añade al final de este fichero un bloque `## Registro proyecto-3-web` con la
  tabla paso → estado → qué se comprobó.

## Registro proyecto-3-web

Hecho el 2026-11-23. Sin commits, push ni despliegue: los commits, con
`bash docs/briefs/proyecto-3-web-commits.sh` (antes, `--solo-comprobar`).

| Paso | Estado | Qué se comprobó |
|---|---|---|
| Lectura | ✔ | `docs/chispa/` (README, diseño, decisiones 001-010, postmortem, sesiones 1-8), `paginas-para-video.md`, `laboratorio/page.tsx`, `_3d/pasos.ts`, `_video/piezas.tsx`, `cli/page.tsx` y `cli/sesion-0N/`. `docs/chispa/` no se ha tocado. |
| T1 · portada | ✔ escrita | `app/programacion-ia/juego-3d/page.tsx`: qué es Chispa, hilo del proyecto (filtro de alcance → hito 1 → 1.0), v3.1.0 con enlace a `https://titan/juegos/chispa/` y aviso de red del instituto, tarjeta grande del Laboratorio 3D, robots/escenarios/objetos, el multijugador en cuatro líneas, las 8 sesiones (1-4 enlazadas; 5-8 «documentada · en preparación para vídeo») y las 4 reglas del proyecto + «si se empezara otra vez» (postmortem). |
| T1 · común | ✔ escrito | `app/programacion-ia/juego-3d/sesiones.tsx`: títulos y «se ve» de las 8 sesiones (copiados de cada `sesion-0N.md`), cabecera con `git tag sesion-0N`, índice de pasos, decisiones, conceptos del laboratorio, tropiezos y el pie «8 sesiones documentadas · las 5 a 8, en preparación para vídeo». |
| T2 · sesiones 1-4 | ✔ escritas | Un `Paso` por cada punto de «Qué se ha hecho» (7, 7, 6 y 8 pasos), `h2` «Paso N · …» seguidos y de 48 caracteres como mucho; prompts de «Cómo se pidió» literales en `Prompt` (PromptBlock), dos por bloque; sin URL ni números de commit visibles (se quitó el comentario `localhost` de «Para comprobarlo»). Visores: S1 `camara` y `ejes`; S2 `texturas`, `instancias` y `luces`; S3 `esqueleto`, `clips` y `seguimiento`; S4 `cuerpos`, `colliders`, `capsula` y `sensor` (grupo Físicas). Las escenas `escena` y el grupo `fisicas` del brief no existen en `pasos.ts`: se usaron las equivalentes. Títulos de bloque elegidos para no empezar igual que los pasos de los visores (`li`). |
| T3 · portada del curso | ✔ | `app/programacion-ia/page.tsx`: las dos tarjetas de grupo dicen «Ahora: proyecto 3, Chispa, un videojuego 3D multijugador»; nueva fila con dos tarjetas del mismo estilo: Proyecto 3 · Ahora → `/programacion-ia/juego-3d/` y Proyecto 2 · Terminado → `/programacion-ia/cli/`. |
| T3 · plan | ✔ | `docs/plan-curso-programacion-ia-2026-27.md`: fila P3 (de «juego web 2D… GitHub Pages» a videojuego 3D multijugador en navegador, Chispa: Three.js + Rapier + Supabase Realtime, publicado v3.1, con enlaces) y la frase del hilo P1→P2→P3. Estado y semanas de P3, sin tocar. |
| Enlaces internos | ✔ | Todos los `href` internos de los ficheros nuevos y de la portada del curso apuntan a rutas que existen (`juego-3d/`, `juego-3d/laboratorio/`, `juego-3d/sesion-01..04/`, `cli/`, `opencode/`, `presencial/`, `semipresencial/`, `acceso/`, `video-semana/`); las anclas del laboratorio (`#espacio`, `#objetos`, `#luz`, `#rendimiento`, `#animacion`, `#fisicas`) existen. Las sesiones 5-8 no enlazan a ninguna parte. |
| tsc | ⚠ sin ejecutar | En esta sesión no se pudo lanzar `npx tsc` (pedía permiso). Tipos revisados a mano contra `piezas.tsx`, `Visor3D.tsx` (`NombreEscena`) y `tsconfig.json`. **Lanza `--solo-comprobar` antes de los commits.** |
| Revisor de vídeo | ⬜ pendiente | No se ha pasado `tools/video/revisar-pagina.mjs` ni `fotos-visor3d.mjs` (necesitan `pnpm dev`): queda comprobar que cada bloque cabe en 1100×620, sobre todo los de cuatro tropiezos y la portada de cada sesión. |
| Script de commits | ✔ escrito, sin ejecutar | `docs/briefs/proyecto-3-web-commits.sh`: `set -euo pipefail`, tsc, se para si no está en `main`, 4 commits (T1, T2, T3 y este registro), cada uno solo con sus ficheros (`git commit -- rutas`); `--solo-comprobar` solo compila. |
