# Sesión 6 · Multijugador II: fluido, justo y persistente

**Etiqueta de git:** `sesion-06` · **Se ve en:** una sala con vestíbulo (código,
lista de jugadores, rivales del ordenador, botón de empezar); partidas completas
en red; los demás robots se mueven fluidos; ranking en el menú.

## Qué se ha hecho

1. **Interpolación** (`src/red/interpolacion.ts`, lógica pura con pruebas): los
   robots remotos se pintan 100 ms en el pasado, entre dos posiciones recibidas.
   Si faltan mensajes, un instante de inercia y luego quietos. Las reapariciones
   no se interpolan.
2. **Un anfitrión que arbitra** (`src/partida.ts`): quien lleva más tiempo en la
   sala ejecuta las reglas, mueve a los rivales del ordenador y envía el estado
   (5 veces por segundo) y las jugadas (al momento). Los demás copian.
3. **Embestidas en red**: quien cree haber embestido se lo dice al anfitrión; él
   lo comprueba con sus posiciones (con un margen por el retraso) y decide.
4. **Relevo de anfitrión**: si se va, el siguiente más antiguo hereda la partida,
   rivales incluidos. Todos tenían una copia del estado.
5. **Vestíbulo** (`src/ui/hud.ts`): se pasea por la azotea mientras llega la gente.
   El anfitrión añade o quita rivales y empieza. Botón para copiar el enlace.
6. **Base de datos** (`supabase/migraciones/001_ranking.sql`): `chispa_jugadores`,
   `chispa_resultados` y la vista `chispa_ranking`, con **RLS**: cada uno lee
   todo, pero solo escribe su ficha y su resultado.
7. **Guardado y ranking** (`src/datos/ranking.ts`): al acabar una partida entre
   personas, cada jugador apunta su fila. El menú enseña los cinco primeros.
8. **La prueba de dos navegadores** juega ahora una partida entera: sala, rival,
   empezar, coger, robar, final, ranking y relevo de anfitrión. 20 comprobaciones.

## Cómo se pidió (resumen de los prompts)

- «Los otros robots van a saltos. Quiero interpolación: píntalos 100 ms en el
  pasado entre las dos posiciones que rodean ese instante. Como lógica pura, con
  pruebas. Ten en cuenta que los relojes de dos equipos no coinciden.»
- «Las reglas solo las ejecuta el anfitrión: el más antiguo de la sala según
  Presence. Envía el estado 5 veces por segundo y las jugadas cuando ocurren.
  Los demás no deciden nada.»
- «Si el anfitrión se va, que herede el siguiente sin que la partida se pare.»
- «Tablas para el ranking con RLS: cualquiera con sesión lee; cada uno escribe
  solo lo suyo. Dime qué podría falsear un jugador y cómo lo limitamos.»

## Decisiones

014 (anfitrión con autoridad), 015 (interpolar con 100 ms) y 016 (cada jugador
apunta su resultado), en `docs/decisiones.md`.

## Conceptos del laboratorio que tocan

Lo que viaja por la red (los cuatro pasos: tu pantalla, lo que viaja, sin
interpolar, interpolando).

## Para comprobarlo

```bash
npm run pruebas                       # 33 pruebas (reglas, interpolación, protocolo)
bash herramientas/migrar.sh           # crea las tablas (se puede repetir)
node herramientas/dos-jugadores.mjs   # una partida entera con dos navegadores
```

- Con dos ventanas: fíjate en que el otro robot ya no va a saltos.
- Cierra la ventana del anfitrión en mitad de una partida: la otra sigue.
- En el servidor, sin sesión, la API del ranking responde 401.

## Tropiezos

- **«Publicable» no es «sin protección».** Con la clave publicable y sin sesión,
  las tablas no devuelven nada: los permisos son del rol `authenticated` y cada
  tabla tiene sus políticas. Sin políticas de `update` ni `delete` en los
  resultados, lo apuntado no se toca.
- **Lo que un tramposo sí podría hacer**: apuntarse un 100 % en una partida que no
  ha ganado. Se recorta con límites en la tabla (`check`), una sola fila por
  jugador y partida, y un índice único que impide dos ganadores. No es
  infalible: para eso haría falta un servidor que arbitre. Queda escrito.
- **Dos relojes.** Las posiciones llevan la hora de quien las envía; quien las
  recibe calcula el desfase con el mensaje que menos ha tardado.
- **El ascensor a saltos para los invitados.** Recibían el reloj 5 veces por
  segundo. Ahora cada uno lo adelanta por su cuenta entre un estado y el siguiente.
- **La prueba fallaba por esperar un tiempo fijo.** Sin tarjeta gráfica el juego
  va a cámara lenta. Las pruebas esperan a que pase algo, no a que pase el tiempo.
