# Sesión 7 · Juego completo: estados, interfaz, sonido y pruebas

**Etiqueta de git:** `sesion-07` · **Se ve en:** el juego ya «se siente»: suena,
saltan chispas, la cámara tiembla al recibir un golpe, una flecha señala la
chispa, hay ayuda, ajustes y controles táctiles.

## Qué se ha hecho

1. **Sonido sin ficheros** (`src/audio/sonido.ts`): 15 efectos y una música de
   fondo hechos con Web Audio (osciladores, ruido y envolventes). Lo que pasa
   lejos suena más bajo.
2. **Partículas** (`src/mundo/particulas.ts`): un solo `Points` con 900 huecos que
   se reutilizan: estela de la embestida, polvo al aterrizar, destellos al coger,
   robar o recibir un golpe.
3. **Sensación de juego**: temblor de cámara al recibir un golpe, el campo de
   visión se abre al embestir, haz de luz sobre quien lleva la chispa y una
   flecha en el borde de la pantalla cuando no se ve.
4. **Rendimiento** (`src/mundo/azotea.ts`): las 117 mallas del escenario se funden
   en 13 (una por material). Tres niveles de calidad (resolución y sombras); en
   media y baja los robots llevan una sombra de disco.
5. **Ajustes** (`src/ajustes.ts`): volumen, música y calidad, guardados.
6. **Móvil y tableta** (`src/ui/tactil.ts`): joystick, zona para mirar y botones.
7. **Ayuda** (tecla H o botón «?») y **pantalla de carga** con aviso si el juego
   no puede arrancar.
8. **Comprobaciones automáticas** (`.github/workflows/ci.yml`): tipos, pruebas y
   compilación en cada subida.
9. **Playtest** (`docs/playtest.md`): doce problemas vistos y qué se hizo.

## Cómo se pidió (resumen de los prompts)

- «Añade sonido sin ficheros de audio: efectos con Web Audio para saltar,
  aterrizar, embestir, golpe, coger, robar, turbo, cuenta atrás y final. Y una
  música sencilla que se pueda apagar.»
- «Mira las llamadas de dibujo (F3). Funde las mallas del escenario que comparten
  material y dime cuántas quedan.»
- «Un sistema de partículas con una sola llamada de dibujo, sin crear ni destruir
  nada durante la partida.»
- «Controles táctiles que escriban en la misma entrada que el teclado.»
- «Juega una partida simulada y dime qué números te parecen raros.»

## Decisiones

017 (sonido generado), 018 (fundir el escenario) y 019 (calidad por niveles), en
`docs/decisiones.md`.

## Conceptos del laboratorio que tocan

Muchos objetos, una sola llamada · el presupuesto de un juego web · cerca y lejos.

## Para comprobarlo

- F3: llamadas de dibujo. Con 4 robots, unas 190 en calidad alta y unas 110 en media.
- Menú → Ajustes → Calidad baja: sin sombras y a resolución 1.
- En un móvil (o con las herramientas del navegador en modo táctil): aparece el
  joystick.
- `npm run pruebas` y `npm run prueba:red`.

## Tropiezos

- **El audio no suena hasta que el usuario toca algo.** Es una norma de los
  navegadores. El contexto de audio se crea con el primer clic o tecla.
- **La música se descuadraba** al programar cada nota con `setInterval`. Ahora el
  temporizador solo deja programadas las notas del próximo cuarto de segundo en
  el reloj del audio, que sí es exacto.
- **Fundir el escenario no bajó las llamadas.** Bajó las del escenario (de 117 a
  13), pero entonces lo que pesaba eran los robots: cada uno son 21 piezas, y con
  sombras se dibujan dos veces. De ahí la sombra de disco.
- **Al fundir, las físicas dejaban de tener de dónde sacar el collider.** Las
  mallas originales salen de la escena, pero se conservan para las físicas.
