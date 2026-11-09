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

Las mismas reglas valen para el **Seminario de IA para docentes**
(`/seminario-ia-docentes/`, serie «Seminario de IA para docentes · en pantalla»
del canal IA para docentes): importa las piezas de `programacion-ia/_video/` y
añade las suyas en `app/seminario-ia-docentes/_ui.tsx` (cabecera de sesión con
el hilo, vídeo resumen, «Para ampliar», tarea). Lo que solo tiene sentido en la
web lleva la clase `sem-solo-web` y no sale en la grabación.

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
| `Codigo`, `Prompt` | `PromptBlock` a 16 px con rótulo; `Codigo` además resalta (`resaltado.ts`: shell, JSON, Markdown, Python y TOML; uno solo para todas las páginas, no hagas copias). Con `rango` enseña solo unas líneas y el botón copia el fichero entero: así un fichero largo se reparte en varias pantallas. |
| `Terminal` | Órdenes y su salida real, cada línea un elemento; el `$` va fuera del texto de la línea y el botón copia solo las órdenes. |
| `Teclas` | Atajos con teclas dibujadas: `ctrl+x u`. |
| `Anatomia` | Una orden troceada con el nombre de cada parte (programa, subcomando, argumento, opción…). |
| `LineaTiempo` | Hitos en vertical (semanas, sesiones), con fecha, enlace y puntos. |
| `Arbol`, `AntesDespues` | Árbol de carpetas en monoespaciada (cada fila, su elemento; las ramas ├─ └─ van fuera del texto) y el par antes → orden → después para enseñar qué hace una acción con tus ficheros. Con varios pares en la página, cada árbol lleva su `titulo` («Descargas, antes»): la cámara no distingue dos h4 iguales. |
| `Checklist` | Lista de comprobación con casillas dibujadas (sin pulsar). |
| `CriterioRubrica` | Un criterio de la rúbrica casilla a casilla: los cuatro niveles con su porcentaje y su descriptor literal; `resaltar` marca la casilla a la que apunta la semana. |
| `bucle.tsx` | El bucle del agente en SVG, sin interacción. |
| `svg.tsx` | Primitivas de los diagramas: `Figura` (marco 1:1 con sus flechas), `Caja`, `Flecha`, `Zona`, `T`, y para animar `Halo`, `Barra`, `Disco` y `an()` (ver «Figuras animadas»). Cada caja es un `<g data-caja>` para que el revisor compruebe que sus textos no se salen. |

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

## Figuras animadas (desde las sesiones 3 y 4 de la CLI)

Las figuras pueden **construirse pieza a pieza** al entrar en pantalla: cajas que
aparecen en orden, flechas que se dibujan, un destello que recorre la flecha (el
dato que viaja), barras que crecen, código que se teclea, un halo que late sobre
lo importante. Se ve en la web y en una **toma grabada** del motor (`"grabar": true`
en `tomas.json`, con su reloj virtual, a 1280×720 y `"movil": false`), al ritmo de
la voz. En la **captura quieta** (teselas) el motor pone las duraciones a 0, así
que la figura sale **terminada**: nada a medias ni escondido.

Regla de oro: **el estado final es el dibujo completo**. Sin JavaScript, al
imprimir, con «reducir movimiento» o en la captura quieta, la figura se ve entera;
lo que solo existe en movimiento (el destello, el halo) está apagado en una foto
fija y nunca tapa nada.

- **Cómo se marca.** `<Figura animada>` (en `_video/svg.tsx`) y, en cada pieza,
  `an={segundos}`: cuándo entra, contando desde que la figura se ve. `Caja`,
  `Flecha` (se dibuja y luego aparece la punta; con `pulso`, el destello en bucle),
  `T` (se funde, o `tipo="teclea"`), `Zona`, y las nuevas `Halo`, `Barra` y
  `Disco`. Para un elemento suelto, `{...an("aparece" | "surge" | "funde" |
  "desliza" | "traza" | "teclea" | "barra", d, dur)}`; un `<path>` que se dibuja
  necesita `pathLength={1}`. Sin `an`, la pieza está quieta: las figuras de antes
  no cambian.
- **Piezas HTML.** `Terminal animada` teclea cada orden (un paso por carácter) y
  hace aparecer su salida línea a línea; `Anatomia animada` saca las partes de una
  en una.
- **Cómo funciona.** Los `@keyframes an-*` viven en `app/globals.css`, bajo
  `html[data-anima]`; `_video/Animaciones.tsx` (montado en el layout del curso)
  solo decide **cuándo**: si el navegador anima, pone `data-anima` en `<html>` y un
  `IntersectionObserver` arranca cada figura cuando se ve al 35 %. Las que ya
  están a la vista al cargar se quedan quietas (`data-anim-quieta`). En la web hay
  un botón «Repetir animación»; con `?video` no sale.
- **Tiempos.** Una figura dura entre 3 y 5 s; las piezas entran en el orden en
  que las va a nombrar la voz (de izquierda a derecha, de la causa al efecto). En
  la toma grabada, la cámara debe **llegar** a la figura antes de que la voz la
  explique: la animación empieza al verla.
- **Revisión.** `revisar-pagina.mjs` mide las figuras terminadas (pide «reducir
  movimiento»). Para ver la animación:

```bash
node tools/video/fotos-animacion.mjs /programacion-ia/cli/sesion-03/ --base http://localhost:3123 \
     --salida <carpeta> [--tiempos 0.6,1.6,2.8,6] [--solo 5]
```

  Deja una hoja por figura con sus fotogramas en esos segundos: hay que mirarlas.

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
