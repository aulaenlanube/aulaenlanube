# Páginas para vídeo

Reglas para las páginas del Curso de Programación con IA que se graban para la
serie **«Programación con IA · Tutoriales en pantalla»**. Se estrenaron con el
proyecto 2 (`/programacion-ia/opencode/`, `/programacion-ia/cli/` y sus
sesiones) y valen para los proyectos siguientes. Completan, no sustituyen, a
[estilos-de-pagina.md](estilos-de-pagina.md).

## Cómo se graban

Un motor abre la página en **Chromium a 1280×720 CSS, en modo oscuro**, y una
cámara virtual hace zoom, pone un foco (recuadro) sobre un elemento o subraya
línea a línea mientras habla la voz. La cámara **localiza los elementos por su
etiqueta y el texto con que empiezan**: `h2:Paso 3 · …`, `li:read…`,
`text:Planifica`.

Se graba siempre con **`?video`** en la URL
(`/programacion-ia/opencode/?video`). Ese modo (`_video/ModoVideo.tsx` +
`app/globals.css`) quita lo fijo que taparía el contenido —la barra de menú deja
de ser pegajosa, se ocultan el aviso de cookies y el botón «volver arriba»— y
apaga el desplazamiento suave, para que la cámara mande sobre el movimiento.

## Las siete reglas

1. **Un bloque, una idea, una pantalla.** Cada bloque cabe en **1100×620 CSS**
   como mucho. Si no cabe, se parte en dos bloques o se pasa a dos columnas
   (`junto`), nunca se encoge la letra.
2. **Cada parte de un diagrama es un elemento con su propio texto, corto y
   único**: SVG con `<text>` o HTML, nunca texto dentro de una imagen. Así la
   cámara puede enfocar cada parte por separado.
3. **Encabezados h2/h3 cortos y únicos** (48 caracteres como mucho). Los pasos se
   titulan **«Paso N · …»**, son siempre `h2` y van seguidos (1, 2, 3…) en toda
   la página.
4. **Piezas visuales, no párrafos**: el bucle del agente, comparaciones a dos
   columnas, permisos con iconos, la anatomía de una orden, árboles de carpetas,
   terminales con salida real, líneas de tiempo, tarjetas, checklists y rúbricas.
   El contenido pedagógico no se reescribe: se transforma en piezas.
5. **Prompts y código en `PromptBlock`**, una línea por elemento
   (`<span data-linea="n">`), para que la cámara subraye línea a línea.
6. **Modo oscuro impecable, nada por debajo de 16 px, nada fijo encima y nada
   que solo se vea al pasar el ratón**: lo que cuenta cada pieza está escrito,
   sin pulsar. (Por eso los diagramas pulsables con panel de `_svg/base.tsx` no
   sirven para vídeo.)
7. **El hilo del proyecto se ve desde la portada.** En el proyecto 2: cada alumno
   se construye una herramienta útil para él y reutilizable, que automatiza algo
   que detecta que le hace perder tiempo.

## Piezas (`app/programacion-ia/_video/`)

| Pieza | Para qué |
|---|---|
| `Bloque` | La unidad de grabación: `<section data-bloque>` con su `h2`/`h3`, antetítulo (`etiqueta`) y `entradilla`. Con `junto` va a dos columnas: texto a la izquierda y un fichero largo a la derecha (`anchoJunto` 600, 700 o 760). |
| `Paso` | Igual que `Bloque`, con el disco numerado y el título «Paso N · …» en `h2`. |
| `Aviso` | Bloque-caja tintada con título: la idea que hay que retener. |
| `Tarjeta`, `Lista`, `Chip`, `C` | Tarjeta con título (h3/h4), viñetas, píldora y código en línea. |
| `DosColumnas` | «X frente a Y»: chat/agente, plan/build, proyecto/global. |
| `Permiso`, `Regla`, `IconoPermiso` | allow / ask / deny con su icono a la vista. |
| `Codigo`, `Prompt` | `PromptBlock` a 16 px con rótulo; `Codigo` además resalta (`resaltado.ts`). Con `rango` enseña solo unas líneas y el botón copia el fichero entero: así un fichero largo se reparte en varias pantallas. |
| `Terminal` | Órdenes y su salida real, cada línea un elemento; el `$` va fuera del texto de la línea y el botón copia solo las órdenes. |
| `Teclas` | Atajos con teclas dibujadas: `ctrl+x u`. |
| `Anatomia` | Una orden troceada con el nombre de cada parte (programa, subcomando, argumento, opción…). |
| `LineaTiempo` | Hitos en vertical (semanas, sesiones), con fecha, enlace y puntos. |
| `Arbol`, `AntesDespues` | Árbol de carpetas en monoespaciada (cada fila, su elemento; las ramas ├─ └─ van fuera del texto) y el par antes → orden → después para enseñar qué hace una acción con tus ficheros. |
| `Checklist` | Lista de comprobación con casillas dibujadas (sin pulsar). |
| `CriterioRubrica` | Un criterio de la rúbrica casilla a casilla: los cuatro niveles con su porcentaje y su descriptor literal; `resaltar` marca la casilla a la que apunta la semana. |
| `bucle.tsx` | El bucle del agente en SVG, sin interacción. |
| `svg.tsx` | Primitivas de los diagramas: `Figura` (marco 1:1 con sus flechas), `Caja`, `Flecha`, `Zona`, `T`. Cada caja es un `<g data-caja>` para que el revisor compruebe que sus textos no se salen. |

**Al menos un diagrama por sección**: un bloque de texto se entiende, pero en
vídeo se *ve* un dibujo (el camino de una petición, el recorrido de un permiso,
dónde vive cada fichero, capas que se fusionan, quién hace cada paso…). Los de
la guía de OpenCode están en `app/programacion-ia/opencode/figuras.tsx`, con la
geometría apuntada encima de cada uno.

Los ficheros de OpenCode que copia el alumnado (config global, `opencode.json` del
proyecto, `AGENTS.md`, agente revisor, comando, skill, MCP) viven en
`app/programacion-ia/_opencode/ficheros.ts`: la guía y las sesiones los importan
de ahí, así nunca se contradicen.

Reglas de dibujo de los SVG: las de los diagramas del curso (paleta en tokens
`--dg-*`, pintado 1:1 con `maxWidth = minWidth = ancho del viewBox` dentro de un
`overflow-x-auto`, flechas con `<marker>` en `userSpaceOnUse` y `refX = 10`,
geometría calculada y apuntada en el comentario de cabecera). Clases de Tailwind
siempre literales: cada tono de `TONO` lleva sus cadenas enteras.

## Cómo encajar un bloque que no cabe

- Un fichero largo junto a su explicación: `junto` (texto a la izquierda).
- Una lista larga: dos columnas, o dos bloques con títulos distintos
  («Reglas para ficheros» / «Reglas para órdenes»).
- Dos ejemplos que repetirían las mismas filas: una tabla con una fila por regla
  y una columna por caso (así cada texto sale una sola vez).
- JSON: agrupar en una línea lo que la explicación agrupa en una fila (las reglas
  de `bash` del `opencode.json`); el fichero sigue siendo el mismo.

## Revisión antes de enseñar una página

```bash
pnpm dev --port 3123
node tools/video/revisar-pagina.mjs /programacion-ia/opencode/ --base http://localhost:3123 \
     --capturas <carpeta>          # y otra vez con --claro
```

Mide en Chromium (oscuro, `?video`, 1280×720 y luego 390×844): tamaño de cada
bloque, encabezados repetidos o largos, pasos mal numerados, letra por debajo de
16 px (también en los SVG), contraste AA del texto sobre su fondo real, dos
elementos que empiezan igual (o uno que es el principio de otro, como «sí» y
«sí, solo esta vez»), textos de un SVG que se salen de su caja o se pisan,
elementos fijos a la vista, cosas que solo
aparecen con el ratón, contenido escondido en un desplazamiento lateral y texto
que se sale en móvil. Con `--capturas` deja una imagen por bloque: hay que
mirarlas. Sale con código 1 si encuentra algo.

En local, los logos de `/wp-content/` dan error (solo existen en el servidor): el
revisor los ignora.
