# Sesión 1 · La idea, la escena y el bucle

**Etiqueta de git:** `sesion-01` · **Se ve en:** un cubo que gira sobre una rejilla,
con sombra, cámara que se mueve con el ratón y un contador de fps.

## Qué se ha hecho

1. **Diseño en una página** (`docs/diseno.md`): la idea, el bucle de juego, las
   reglas con números, los controles y, lo más importante, el **filtro de alcance**
   (mínimo jugable / versión 1.0 / fuera).
2. **Proyecto**: Vite + TypeScript + Three.js. `npm run dev` y a mirar.
3. **Instrucciones para el agente** (`AGENTS.md`; `CLAUDE.md` solo lo importa):
   stack, cómo se organiza el código, órdenes y lo que no se toca.
4. **La escena** (`src/mundo/escena.ts`): renderer, cámara en perspectiva, luz de
   relleno y un sol con sombras.
5. **El bucle** (`src/nucleo/bucle.ts`): lógica a paso fijo de 1/60 s y dibujo
   aparte.
6. **Los ojos del agente** (`herramientas/captura.mjs`): abre el juego sin
   pantalla y guarda una imagen.
7. **Publicado** desde el primer día (`npm run desplegar`).

## Cómo se pidió (resumen de los prompts)

- «Lee `docs/diseno.md`. Monta un proyecto Vite + TypeScript + Three.js con una
  escena mínima: suelo con rejilla, un cubo que gira con sombra y OrbitControls.
  Separa la escena (`src/mundo/escena.ts`) del bucle (`src/nucleo/bucle.ts`).»
- «El bucle tiene que tener un paso fijo de 1/60 s para la lógica y otro para
  pintar. Explícame en un comentario por qué.»
- «Hazme una herramienta que abra el juego en Chromium sin pantalla y guarde una
  captura, para que puedas ver lo que has hecho.»

## Decisiones

001 (stack), 002 (paso fijo) y 003 (dónde se publica), en `docs/decisiones.md`.

## Conceptos del laboratorio que tocan

Los tres ejes · posición, rotación y escala · el grafo de escena · la cámara por
dentro.

## Para comprobarlo

```bash
npm run dev                      # http://localhost:5173
node herramientas/captura.mjs    # deja capturas/captura.png
```

- El cubo gira a la misma velocidad aunque el contador de fps baje (paso fijo).
- Al cambiar el tamaño de la ventana, la imagen no se deforma.

## Tropiezos

- Sin tarjeta gráfica (un servidor, un contenedor) WebGL no arranca solo: hay que
  lanzar Chromium con `--use-angle=swiftshader` para que dibuje por software.
- `base: "./"` en `vite.config.ts`: sin eso, al publicar en una subcarpeta el
  navegador busca los ficheros en la raíz del servidor y la página sale en blanco.
