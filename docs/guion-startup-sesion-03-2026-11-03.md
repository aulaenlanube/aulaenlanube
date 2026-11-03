# Guion docente · Startup en grupo · Sesión 3 · Punto de seguimiento
### Martes 3 de noviembre de 2026 · 1º DAM presencial · 3 horas (la entrega, ~1 h) · **PRIVADO (solo docent)**
_Página del alumnado: [/programacion-ia/proyecto-final-grupo/sesion-03/](/programacion-ia/proyecto-final-grupo/sesion-03/) — proyectarla al principio. Este guion dice qué hacer y qué decir en cada bloque._

## Objetivo de la sesión

- Es un **punto de seguimiento**, no una tarea de tres horas: recoger en versión corta lo que estaba pendiente para el 26 de octubre, de forma que les sirva para organizarse y seguir avanzando.
- Lo que se entrega hoy (alrededor de una hora): ficha v1 con el modelo de ingresos con números (README), roles y cuatro reglas (docs/equipo.md), idea y stack (docs/decisiones.md), las entrevistas que tengan y las 3 primeras issues del sprint 1, con el acceso del profe si el repo es privado.
- El resto de la sesión, a avanzar con el sprint 1 mientras el profe pasa por cada equipo.
- Lo demás (5 entrevistas, todo por PR, recorrido, arquitectura en Mermaid, AGENTS.md, main protegida) queda en la página como **«a desarrollar a partir de ahora»**, durante el sprint 1 (hasta el 17 de noviembre).

## Antes de clase (5 min)

- La entrega 5 ya está en el campus (presencial · Startup en grupo · Sesión 3, tipo GitHub, rúbrica «punto de seguimiento 1», fecha límite hoy a las 23:59). Comprobar en **Entregas** que está abierta y visible.
- Panel → **Equipos**: comprobar quién está en cada equipo. En un equipo de 3, alguien lleva dos piezas; en uno de 6, una pieza se hace en pareja.

## Cómo va

| Hora | Bloque | Qué hace el profe | Qué hacen ellos |
|---|---|---|---|
| 0:00 | Punto de seguimiento (10') | Proyectar la figura «hoy / a partir de ahora». Mensaje: «Hoy no es entregar mucho: es dejar escritas las bases. Lo de la derecha es para el sprint 1». Recordar que el 26 oct pasa a hoy | Sentarse por equipos |
| 0:10 | Pasos 1-6 · La entrega (~45') | Pasar por las mesas mirando dos cosas: la casilla del dinero del README y que las entrevistas no estén inventadas | Cada pieza, una persona, subida con su cuenta |
| 0:55 | Paso 7 · Acceso y entrega (5') | Recordar: entrega cada persona, mismo repo, comentario con rol y su parte | Invitar a aulaenlanube si es privado; entregar |
| 1:00 | A seguir avanzando (resto) | Seguimiento de 5 minutos por equipo con su README abierto (preguntas abajo) | Sprint 1: cada uno con su issue y su agente |

## Qué mirar en cada mesa

- **El dinero**: la casilla del modelo de ingresos con la división hecha (coste al mes ÷ lo que deja cada cliente). Sin números = no apto (es un mínimo).
- **Las entrevistas**: hechos del pasado («la última vez que…»), no opiniones sobre la idea. Si alguien no la tiene, que la haga durante el sprint 1; nunca una inventada.
- **Que cada persona suba algo con su cuenta**: es el tercer mínimo (un commit propio).
- **Datos personales**: ningún apellido ni teléfono real en el repo.

## Preguntas para el seguimiento por equipos

- ¿Qué ha cambiado en la ficha desde el pitch del 19 de octubre?
- ¿Cuántos clientes necesitáis para no perder dinero? ¿Dónde están?
- ¿Qué issue del sprint 1 es la más arriesgada y quién la lleva?
- ¿Qué vais a enseñar en la mini-demo del 17 de noviembre?

## Después de clase

- Aceptar las invitaciones de GitHub de los repos privados (hasta entonces no se ven). De golpe, con la cuenta aulaenlanube en `gh`:
  `gh api user/repository_invitations --jq '.[].id' | xargs -I{} gh api -X PATCH user/repository_invitations/{}`
- Corrección asistida: `/corregir-entrega 5` (rúbrica `startup-arranque`; cuatro criterios miran el repo del equipo y uno, «Tu aportación de hoy», es individual: mirar los commits de cada persona con su cuenta).
- Es una **entrega de proceso**: apta si cumple los tres mínimos (acceso, ficha con números, un commit propio). La rúbrica solo mira lo pedido hoy; lo de «a partir de ahora» entra en la revisión de la fase 1.
