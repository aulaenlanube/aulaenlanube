# Guion docente · Startup en grupo · Sesión 3 · Kickoff
### Martes 3 de noviembre de 2026 · 1º DAM presencial · 3 horas · **PRIVADO (solo docent)**
_Página del alumnado: [/programacion-ia/proyecto-final-grupo/sesion-03/](/programacion-ia/proyecto-final-grupo/sesion-03/) — proyectarla y seguir su orden. Este guion dice qué hacer y qué decir en cada bloque._

## Objetivo de la sesión

- Recoger **hoy** lo que estaba pendiente para el 26 de octubre (repo, ficha v1, entrevistas, decisiones), ordenado como el **kit de arranque** de un equipo profesional: ficha v1, entrevistas, acuerdo de equipo, recorrido del primer cliente, decisiones, arquitectura, AGENTS.md y el sprint 1 en el tablero.
- Que el kit se haga **como se trabajará todo el curso**: cada pieza con dueño, en su rama, con su PR revisado por otra persona. Así cada alumno deja evidencia individual (commit + PR + revisión) desde el primer día.
- Que cada equipo salga sabiendo qué construye en el sprint 1 y quién lleva cada tarea.
- Mensaje de fondo: con agentes, programar es barato; lo caro es que cinco personas y cinco agentes tiren cada uno para un lado. El kickoff y el AGENTS.md común lo evitan.

## Antes de clase (10 min)

- La entrega ya está creada en el campus (presencial · Startup en grupo · Sesión 3, tipo GitHub, rúbrica «Kit de arranque», fecha límite hoy a las 23:59). Comprobar en **Entregas** que está abierta y visible.
- Panel → **Equipos**: comprobar quién está en cada equipo. Los equipos van de 3 a 6 personas: en el de 6, una pieza va en pareja; en el de 3, alguien lleva dos piezas (lo dice la figura del reparto).
- Tener a mano la cuenta **aulaenlanube** para aceptar invitaciones durante la clase (ver «Después de clase» para hacerlo de golpe).

## Minuto a minuto

| Hora | Bloque | Qué hace el profe | Qué hacen ellos |
|---|---|---|---|
| 0:00 | Kickoff (10') | Gancho: «En una startup de verdad, el día 1 no se programa: se decide y se escribe». Proyectar el kit (figura del repo) y la entrega de hoy. Decir que el 26 oct pasa a hoy | Escuchar; sentarse por equipos |
| 0:10 | Paso 1 · Auditoría y reparto (15') | Pasar por las mesas: ¿hay organización? ¿está el código en un repo personal? (transferirlo). Que la issue «Kit de arranque» tenga un nombre en cada casilla | Issue #1 con dueños |
| 0:25 | Paso 2 · Acuerdo de equipo (20') | Insistir en dos cosas: «terminado significa…» y «si alguien no cumple…». Si un equipo lo despacha en 5 minutos, preguntar: «¿qué pasa si el lead técnico no viene dos semanas?» | docs/equipo.md entre todos |
| 0:45 | Pasos 3-9 · Piezas en paralelo (55') | Primero, que todos sepan crear rama y PR (paso 3). Luego, puesto por puesto: mirar la casilla del dinero del README y que las entrevistas no estén inventadas | Cada uno, su pieza, su rama, su PR |
| 1:40 | Descanso (10') | — | — |
| 1:50 | Paso 10 · Revisión cruzada (20') | Vigilar que nadie fusiona su propio PR y que hay un comentario útil por PR (no «LGTM») | Revisar, comentar, fusionar |
| 2:10 | Paso 11 · Sprint 1 (20') | Que las 3 issues sean verticales (una función de principio a fin) y tengan «dado… cuando… entonces…» | Issues con etiqueta sprint-1, hito, responsable y revisor |
| 2:30 | Readout (20') | 3' por equipo + 1 pregunta de la clase. Cronometrar | Proyectar el repo y contarlo |
| 2:50 | Acceso y entrega (10') | Recordar: entrega cada persona, mismo repo, comentario con rol y PR | Invitar a aulaenlanube si es privado; entregar |

## Qué mirar en cada mesa

- **El dinero**: la casilla del modelo de ingresos con la división hecha (coste al mes ÷ lo que deja cada cliente). Sin números = no apto (es un mínimo).
- **Las entrevistas**: hechos del pasado («la última vez que…»), no opiniones sobre la idea. Si alguien no la tiene, que suba con quién y cuándo, nunca una inventada.
- **El MVP y el recorrido**: si un paso del recorrido necesita una función que no está en las 3 del MVP, una de las dos cosas está mal.
- **Datos personales**: ningún apellido ni teléfono real en el repo.
- **AGENTS.md**: que tenga la sección «Prohibido» (main, claves, datos reales, librerías sin ADR).

## Preguntas para el readout (si la clase no pregunta)

- ¿Qué ha cambiado en la ficha desde el pitch del 19 de octubre?
- ¿Cuántos clientes necesitáis para no perder dinero? ¿Dónde están?
- ¿Qué issue del sprint 1 es la más arriesgada y quién la lleva?
- ¿Qué regla del acuerdo de equipo os va a costar más cumplir?

## Después de clase

- Aceptar las invitaciones de GitHub de los repos privados (hasta entonces no se ven). De golpe, con la cuenta aulaenlanube en `gh`:
  `gh api user/repository_invitations --jq '.[].id' | xargs -I{} gh api -X PATCH user/repository_invitations/{}`
- Corrección asistida: `/corregir-entrega <id>` (la rúbrica es `startup-arranque`; cuatro criterios son del repo del equipo y uno, «Tu aportación de hoy», es individual: mirar commits, PR y revisiones de cada persona con su cuenta).
- Es una **entrega de proceso**: apta si cumple los tres mínimos (acceso, ficha con números, un commit propio). La puntuación de la rúbrica es la foto del arranque para la revisión de la fase 1.
