# Sesión 4 · Físicas y reglas (hito 1: ya es un juego)

**Etiqueta de git:** `sesion-04` · **Se ve en:** una partida completa para un
jugador contra tres rivales manejados por el ordenador: cuenta atrás, chispa,
embestidas, caídas, turbos, marcador y pantalla final.

## Qué se ha hecho

1. **El mundo físico** (`src/fisica/mundo.ts`): Rapier. El escenario es UN collider
   de malla de triángulos hecho con las mallas marcadas con `colision` en Blender;
   el ascensor, un cuerpo cinemático; cada robot, una cápsula.
2. **El motor del robot** (`src/jugador/control.ts`): el controlador de personaje
   de Rapier resuelve paredes, rampas y escalones. Encima: inercia, salto con
   margen (coyote y memoria), embestida, empujón recibido, muelles y caída.
3. **Las reglas, como lógica pura** (`src/reglas/partida.ts`): quién lleva la
   chispa, batería, robos, turbos, final. Sin three, sin DOM, sin red.
4. **Pruebas** (`pruebas/partida.test.ts`): 22 pruebas con Vitest sobre las reglas.
5. **Rivales** (`src/bots/cerebro.ts`): miran la partida y devuelven una
   *intención*, la misma que da el teclado. Siguen las rutas marcadas en Blender
   para subir a las terrazas, a la torre y cruzar a la isla.
6. **La chispa y los turbos** (`src/mundo/objetos.ts`) y **el marcador**
   (`src/ui/hud.ts`): HTML encima del lienzo.
7. **La partida** (`src/partida.ts`): junta todo en un paso fijo con un orden claro.
8. **La cámara ya no atraviesa paredes**: lanza un rayo y se acerca si hay algo.

## Cómo se pidió (resumen de los prompts)

- «Añade Rapier. Funde todas las mallas con `colision` en un solo collider
  `trimesh` estático. El robot es una cápsula cinemática movida con
  `KinematicCharacterController` (autostep 0,35, snap-to-ground).»
- «Escribe las reglas de `docs/diseno.md` en `src/reglas/partida.ts` como funciones
  puras: reciben el estado, el `dt` y dónde está cada robot, y devuelven las
  jugadas que han ocurrido. Nada de three ni de DOM. Y sus pruebas con Vitest.»
- «Quiero poder jugar solo. Haz rivales que devuelvan una intención como la del
  teclado y usen el mismo motor que el jugador.»
- «Simula 60 segundos de partida solo con rivales y dime batería, robos y caídas.»

## Decisiones

008 (reglas puras), 009 (los robots no chocan entre sí) y 010 (rivales por
intención), en `docs/decisiones.md`.

## Conceptos del laboratorio que tocan

Tres tipos de cuerpo rígido · el collider no es la malla · la cápsula del
personaje · sensores y rayos.

## Para comprobarlo

```bash
npm run pruebas    # 22 pruebas de las reglas
npm run dev
```

- Mayúsculas (o clic) embiste. Si alcanzas a quien lleva la chispa, es tuya.
- Súbete al ascensor amarillo junto a la torre; píllate debajo: te aparta.
- F3 enseña fps, llamadas de dibujo y triángulos.
- En la consola del navegador: `chispa.adelantar(60)` simula un minuto de golpe.

## Tropiezos

- **El robot no subía escalones.** El `autostep` de Rapier deja de funcionar si en
  el mismo movimiento se le pide caer mucho. En el suelo basta con −0,02 por paso.
- **Los rivales se quedaban empujando contra la tarima.** Su velocidad «era» la que
  querían llevar, no la real, así que nunca se daban por atascados. Ahora la
  velocidad se calcula con lo que el robot se ha movido de verdad.
- **El ascensor hundía al robot en el suelo.** Al bajar sobre un robot, el
  controlador lo sacaba por donde podía: hacia abajo, a través de la cubierta. Si
  estás debajo, el ascensor no cuenta como obstáculo y te aparta hacia un lado.
- **Robos cada dos segundos.** Con tres perseguidores no daba tiempo a nada. Se
  subió la inmunidad tras un robo a 1,4 s y se retrasó la reacción de los rivales.
  Son dos números en `config.ts` y en `cerebro.ts`.
