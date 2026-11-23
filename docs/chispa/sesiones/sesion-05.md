# Sesión 5 · Multijugador I: verse en la misma sala

**Etiqueta de git:** `sesion-05` · **Se ve en:** un menú; «Crear una sala» da un
código de cuatro letras; quien entra con ese código aparece en la azotea y todos
se ven moverse. Todavía sin reglas en red (y los demás se ven a saltos).

## Qué se ha hecho

1. **La conexión** (`src/red/cliente.ts`): un cliente de Supabase que habla con
   `/supabase` en el mismo origen que el juego, con la clave publicable. Cada
   jugador entra con una **cuenta anónima** (identificador estable, sin registro).
2. **La sala** (`src/red/sala.ts`): un canal de Realtime por código.
   **Presence** dice quién está; **Broadcast** reparte los mensajes.
3. **El protocolo** (`src/red/protocolo.ts`): la posición de un robot son seis
   números enteros, enviados 15 veces por segundo.
4. **La partida admite robots remotos** (`src/partida.ts`): no se simulan aquí;
   se pintan donde la red dice que están.
5. **El menú** (`src/ui/menu.ts`): nombre, color (se recuerdan), jugar contra el
   ordenador, crear sala o unirse. Un enlace `?sala=ABCD` entra directo.
6. **Secretos fuera del repo**: `.env.local` (ignorado) con la clave y la dirección
   del servidor; `.env.example` explica qué va en cada sitio.
7. **Prueba con dos navegadores** (`herramientas/dos-jugadores.mjs`): abre dos
   jugadores, los mete en una sala y comprueba que se ven y se ven moverse.

## Cómo se pidió (resumen de los prompts)

- «Añade supabase-js. El juego habla con `/supabase` en su mismo origen; en
  desarrollo, que Vite lo reenvíe al servidor (variable `SUPABASE_DESTINO` en
  `.env.local`). La clave publicable, en `VITE_SUPABASE_CLAVE`. Nada de eso en git.»
- «Haz una clase `Sala` sobre un canal de Realtime: Presence para saber quién
  está y Broadcast para los mensajes. Sin tocar la base de datos.»
- «Cada jugador envía su posición 15 veces por segundo, en un mensaje lo más
  pequeño posible. A los demás píntalos donde digan que están.»
- «Escríbeme una prueba que abra dos navegadores en la misma sala y compruebe que
  cada uno ve al otro y lo ve moverse.»

## Decisiones

011 (cada cliente manda en su robot), 012 (mismo origen) y 013 (cuentas
anónimas), en `docs/decisiones.md`.

## Conceptos del laboratorio que tocan

Lo que viaja por la red.

## Para comprobarlo

```bash
cp .env.example .env.local     # y rellenarlo
npm run dev
node herramientas/dos-jugadores.mjs
```

- Abre el juego en dos ventanas, crea una sala en una y únete en la otra.
- Fíjate en cómo se mueve el otro: **a saltos**. Llegan 15 posiciones por segundo
  y la pantalla pinta 60. Es el problema que resuelve la sesión 6.
- Cierra una ventana: en la otra, el robot desaparece a los pocos segundos.

## Tropiezos

- **La clave «publicable» se puede publicar; la «secreta», jamás.** La publicable
  va dentro del juego y cualquiera la ve en el navegador. Lo que protege los
  datos son las políticas de la base de datos (sesión 6).
- **Límites del servidor.** Supabase trae un tope de 100 mensajes por segundo para
  toda la instancia: con una clase entera no llega. En el servidor del centro se
  subió a 20 000 al instalarlo.
- **Dos pestañas del mismo navegador son el mismo jugador**: comparten la sesión
  anónima. Para probar con dos jugadores hacen falta dos navegadores o una
  ventana privada (la herramienta de prueba usa dos contextos separados).
- **Todos aparecían en el mismo punto.** Cada cliente se ponía a sí mismo el
  primero de la lista. El orden ahora es el de entrada en la sala, igual para todos.
