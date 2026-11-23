# Sesión 2 · El mundo: geometría, materiales, texturas y luz

**Etiqueta de git:** `sesion-02` · **Se ve en:** la azotea flotante completa, con
su cielo y sus nubes; la cámara da vueltas alrededor.

## Qué se ha hecho

1. **El escenario, en Blender y por guion** (`herramientas/blender/azotea.py`): la
   cubierta octogonal, la tarima central, dos terrazas con rampa, la torre con su
   ascensor, una isla con puente, pilares, cajas, muretes, muelles y decorado.
   Se exporta a `public/modelos/azotea.glb` (350 kB, unos 4 200 triángulos).
2. **Un convenio para hablar con el juego**: cada objeto lleva en sus propiedades
   lo que el juego necesita saber (`colision`, `tipo`, `altura`…). Al exportar con
   «extras», llegan a Three.js en `userData`.
3. **La carga** (`src/mundo/azotea.ts`): lee el GLB, activa sombras, reparte las
   texturas y devuelve las marcas (apariciones, chispa, turbos, muelles, ascensor).
4. **Texturas sin descargar nada** (`src/mundo/texturas.ts`): losas de hormigón
   pintadas en un `<canvas>`: color, normales y rugosidad del mismo dibujo.
5. **Cielo y ambiente** (`src/mundo/cielo.ts`): cúpula con degradado, niebla del
   color del horizonte y 48 nubes en **una sola llamada de dibujo** (instancias).
6. **Luz**: un sol con sombras que cubre toda la azotea, luz de relleno y un mapa
   de entorno para que lo metálico refleje algo.
7. **Créditos** (`CREDITOS.md`): empieza el registro de qué es de quién.

## Cómo se pidió (resumen de los prompts)

- «Escribe un guion de Blender (bpy + bmesh) que genere la azotea de
  `docs/diseno.md` y la exporte a GLB. Las medidas, en constantes arriba. Cada
  objeto que choque lleva la propiedad `colision = 1`; los puntos especiales son
  vacíos con `tipo`.»
- «Carga el GLB. No busques los objetos por nombre: usa `userData`.»
- «El suelo se ve plano. Genera con canvas una textura de losas de 2 m con su mapa
  de normales y de rugosidad, y aplícala a los materiales `suelo` y `losa`.»
- «Añade cielo, niebla y nubes instanciadas. Enséñame las llamadas de dibujo y los
  triángulos en el panel.»

## Decisiones

004 (escenario por guion) y 005 (propiedades en vez de nombres), en
`docs/decisiones.md`.

## Conceptos del laboratorio que tocan

Una malla son triángulos · más triángulos, más coste · materiales · texturas ·
cuatro tipos de luz · muchos objetos, una sola llamada.

## Para comprobarlo

```bash
blender --background --python herramientas/blender/azotea.py   # regenera el GLB
npm run dev
```

- Panel de datos: unas 185 llamadas de dibujo y 12 000 triángulos. El presupuesto
  es 200 y 300 000: de triángulos sobra, de llamadas vamos justos (se arregla en
  la sesión 7 fundiendo mallas).
- Cambia `ALTO_TORRE` en el guion, vuelve a exportar y recarga: la torre crece y
  el ascensor y el muelle se ajustan solos.

## Tropiezos

- **Blender tiene Z hacia arriba; Three.js, Y.** El exportador lo convierte, pero
  un ángulo guardado como propiedad no: hay que convertirlo a mano (ver
  `aparicion` en `azotea.ts`).
- **Los colores de Blender son lineales.** Un `#8a93a3` escrito tal cual sale
  lavado: el guion lo convierte con `hex_a_rgb`.
- **Las coordenadas UV hay que crearlas.** Una malla hecha por guion no tiene UV, y
  sin UV la textura no sabe dónde ir. El guion las calcula por proyección de cubo
  (1 unidad de UV = 4 m).
- **Las sombras no se veían**: la luz de relleno era tan fuerte que las tapaba.
  Menos relleno y más sol.
