# Sesión 3 · El protagonista: control, cámara y animación

**Etiqueta de git:** `sesion-03` · **Se ve en:** un robot que corre y salta por la
azotea con la cámara detrás. Todavía atraviesa las paredes.

## Qué se ha hecho

1. **El modelo** (`public/modelos/robot.glb`): RobotExpressive, CC0, con esqueleto
   y 14 animaciones. Apuntado en `CREDITOS.md`.
2. **El personaje** (`src/jugador/personaje.ts`): clona el modelo (cada robot, su
   esqueleto y sus materiales), le pone color y funde una animación con otra.
3. **La entrada** (`src/nucleo/entrada.ts`): teclado, ratón y mando acaban en la
   misma estructura (`Entrada`). El resto del juego no sabe qué dispositivo hay.
4. **El movimiento** (`src/jugador/control.ts`): aceleración, inercia, salto y
   gravedad sobre un suelo imaginario. El robot se gira hacia donde va.
5. **La cámara** (`src/mundo/camara.ts`): tercera persona, gira con el ratón y
   sigue al jugador con retardo. El movimiento es relativo a ella.
6. **Los números, juntos** (`src/config.ts`): velocidad, salto, gravedad, cámara.

## Cómo se pidió (resumen de los prompts)

- «Carga `robot.glb` y dime qué materiales y qué animaciones trae antes de
  escribir nada.»
- «Haz una clase `Personaje` que clone el modelo con su esqueleto, permita cambiar
  el color del material `Main` y pase de una animación a otra con un fundido.»
- «La entrada tiene que servir para teclado, ratón y mando, y devolver lo mismo.
  Saltar y embestir son pulsaciones: solo valen en el paso en que se pulsan.»
- «Cámara en tercera persona con giro e inclinación; que WASD sea relativo a la
  cámara. Todos los números, a `src/config.ts`.»

## Decisiones

006 (robot CC0 en vez de Mixamo) y 007 (animación decidida por el estado), en
`docs/decisiones.md`.

## Conceptos del laboratorio que tocan

El esqueleto que mueve la malla · clips y mezcla de animaciones · cámaras de juego.

## Para comprobarlo

- WASD o flechas para moverse, Espacio para saltar, ratón (clic para capturarlo)
  o Q y E para girar la cámara. Con mando: sticks, A y X.
- En diagonal corre igual de rápido que en recto.
- Al soltar las teclas frena en un instante, no en seco: es la aceleración.

## Tropiezos

- **El robot salía diminuto.** La caja de un modelo con huesos, medida «en crudo»,
  sale 100 veces mayor de lo que se ve. Hay que medirla con el esqueleto aplicado
  (`SkinnedMesh.computeBoundingBox`).
- **Clonar un modelo con esqueleto no es `clone()`.** Los clones compartían huesos
  y se movían todos a la vez. Se usa `SkeletonUtils.clone`.
- **El robot desaparecía al acercarse al borde de la pantalla.** Three.js descarta
  lo que queda fuera de la cámara usando la caja de la malla en reposo, que no
  sigue a la animación. `frustumCulled = false` en el robot.
- **Un pilar tapaba la cámara al aparecer.** Los pilares estaban justo detrás de
  los puntos de aparición. Se movieron en el guion de Blender y se regeneró el GLB:
  tres líneas, sin abrir Blender.
