# Estilos de página de la plataforma

Referencia de los distintos **tipos de página** del clon (Next.js) y las reglas
de diseño que deben aplicarse con coherencia. El enrutado vive en
`app/[[...path]]/page.tsx`; la lógica que decide el tipo, en `lib/content.ts`
(`getByPath`). Cada tipo (`Entry.kind`) se pinta con una plantilla de
`components/`.

## Taxonomía

| # | Estilo | Cómo se identifica (`getByPath`) | Plantilla | Layout | Barra lateral | Ejemplo |
|---|--------|----------------------------------|-----------|--------|---------------|---------|
| 1 | **Home** | Ruta `/` | `HomeTemplate` | 1 col, secciones a sangre (`max-w-6xl` interno) | — | `/` |
| 2 | **Lección de vídeo** | `lesson` sin `hub` | `LessonTemplate` | 2 col (`1fr / 19rem`) | `LessonSidebar` | `/cursos/curso-google-sites/curso-google-sites-pagina-inicio/` |
| 3 | **Hub de curso** (índice rico Elementor) | `lesson` con `entry.hub` (widget `posts`) | `HubTemplate` | 2 col (`1fr / 19rem`) | `CourseAside` | `/zona-programacion/java/` |
| 4 | **Artículo / post** | `post`, o landing sin hijos y <3 afiliados | `ArticleTemplate` | 2 col (`1fr / 19rem`) | `ArticleSidebar` | `/curso-javascript/` |
| 5 | **Rejilla de productos** | landing con ≥3 fichas de afiliado (`amzn.to`/`amazon.`) | `ProductGridTemplate` | 1 col, rejilla 4-col | — | `/zona-friki/` |
| 6a | **Portada de cursos** | `courseIndex` ruta `/cursos/` | `CourseIndexTemplate` → `CoursesLanding` | 1 col, secciones a sangre | — | `/cursos/` |
| 6b | **Índice de sección** | `courseIndex` ruta `/zona-programacion/` | `CourseIndexTemplate` → `SectionLanding` | 1 col | — | `/zona-programacion/` |
| 6c | **Índice de curso (defecto)** | `courseIndex` con hijos y <3 afiliados | `CourseIndexTemplate` | 2 col (`1fr / 19rem`) | `CourseAside` | `/cursos/curso-google-apps-script-avanzado/` |
| 7 | **Ejercicios resueltos** | landing con `OCULTAR` + `<xmp>` + ≥2 encabezados `Ejercicio N` | `ExercisesTemplate` | 2 col (`1fr / 19rem`) | `ArticleSidebar` | `/zona-programacion/java/ejercicios-recursividad-java/` |

Inventario aproximado: ~508 lecciones · ~23 posts · ~21 índices · ~5 rejillas de
productos · 2 ejercicios · 1 home.

## Reglas de coherencia

- **Ancho**: el contenedor principal es `max-w-6xl px-4`. El contenido a una
  columna usa `max-w-none` para ocupar todo el ancho disponible.
- **Layout de 2 columnas**: siempre `lg:grid lg:grid-cols-[minmax(0,1fr)_19rem]
  lg:gap-10`, con la barra lateral en `<aside className="mt-12 lg:mt-0">` y
  contenido `lg:sticky lg:top-20`.
- **Banner del autor (OposicionesIA)**: componente compartido
  `components/OposicionesIaBanner.tsx`. Aparece en **todas** las páginas con
  barra lateral: lección de vídeo, hub, post e índice de curso por defecto.
  No se incrusta en el `<article>` (va en el `<aside>`), así no afecta a la
  paridad SEO ni al contenido indexable.
- **Barras laterales**: comparten patrón (redes / banner / buscador / listados).
  `CourseAside` (cursos), `ArticleSidebar` (posts), `LessonSidebar` (lecciones).
- **Bloque "proyectos del autor"** (`ProductBlock`): a todo el ancho, al pie del
  contenido en lecciones, posts y rejillas. Distinto del banner lateral.
- **Botón «volver arriba»** (`components/ScrollToTop.tsx`): flotante abajo a la
  derecha, aparece pasados 400 px de scroll y lleva un aro que marca lo leído
  de la página. Mientras el aviso de cookies ocupa el borde inferior se esconde
  (por debajo de 51rem de ancho) para no quedar medio tapado; el aviso avisa de
  su presencia con `data-aviso` en `<html>`.
- **Cabecera móvil**: barra fija de 64 px (`h-16`) con el logo a `h-14`. En
  escritorio manda la barra de menú + el banner con las redes y el logo grande.
- **Menú** (`tools/data/menu.json`): las microwebs heredadas que conservan su
  propio diseño (PP1-Simarro, PIAR 2ESO, Cadenas de PROMPTS, Semana informática
  26) llevan `"external": true`, así que se abren en una pestaña nueva y no
  rompen la continuidad visual del sitio. Quitar una entrada del menú no quita
  la página: la URL sigue sirviéndose igual.
- **SEO**: ningún cambio de diseño debe tocar `<head>` (título, canónica, OG,
  JSON-LD). Verificar siempre con `node tools/verify-build.mjs`
  (objetivo: `565 OK, 0 DIFF`).

## Tema claro / oscuro

Todo el sitio tiene modo oscuro. El interruptor vive en la cabecera
(`components/ThemeToggle.tsx`, a la derecha del menú en escritorio y junto a la
hamburguesa en móvil) y la fontanería, en `lib/tema.ts` + `app/globals.css`.

**Cómo se activa** (variante `dark` definida con `@custom-variant`):

1. `<html data-theme="dark">` — elección explícita del usuario, guardada en
   `localStorage` (`aeln_tema`). Un script en línea del `<head>` la aplica
   mientras el navegador analiza el HTML, así que **no hay destello claro**.
2. `prefers-color-scheme: dark` — preferencia del sistema, mientras el usuario
   no haya pedido el tema claro (`data-theme="light"`). Funciona sin JavaScript.

Si la elección coincide con la del sistema, el botón borra la preferencia
guardada: el sitio vuelve a seguir al sistema. Todo ello dentro de
`@media screen`, de modo que **al imprimir siempre se usa el tema claro**.

**Equivalencias de color** (mismo criterio en todas las plantillas):

| Claro | Oscuro | Uso |
|-------|--------|-----|
| `bg-white` | `dark:bg-slate-900` | tarjeta / superficie |
| `bg-zinc-50` · `bg-zinc-100` | `dark:bg-white/5` · `dark:bg-white/10` | bandas y superficies suaves |
| `border-zinc-200` · `-300` | `dark:border-white/10` · `/15` | líneas (luz, no gris) |
| `text-zinc-900` · `-700` · `-500` | `dark:text-zinc-100` · `-300` · `-400` | jerarquía de texto |
| `text-zinc-400` | `dark:text-zinc-400` | el nivel «tenue» no baja de zinc-400: zinc-500 sobre el fondo oscuro se queda en 4,0:1, por debajo de la AA |
| `text-blue-700` · `-600` | `dark:text-blue-300` · `-400` | enlaces y acentos |
| `bg-<tono>-50` + `border-<tono>-200` | `dark:bg-<tono>-500/10` + `dark:border-<tono>-500/30` | cajas tintadas (aviso, nota, ejemplo) |
| `hover:bg-slate-800` | `dark:hover:bg-slate-600` | botones: en oscuro el hover **aclara** |

El fondo de página (`--background`) es más oscuro que la tarjeta, y el pie más
oscuro todavía: la jerarquía se lee sin necesidad de sombras.

**Casos que NO se invierten** (a propósito):

- Botones de color con texto oscuro (`bg-amber-400 text-zinc-900`) y el CTA cian
  del banner de OposicionesIA: el fondo no cambia, el texto tampoco.
- La caja de código (`CodeBlock`) y el pie: ya eran oscuros en los dos temas.
- La ficha de producto de la rejilla de afiliados: la foto de Amazon viene con
  fondo blanco, así que el hueco de la imagen sigue siendo blanco.
- Las **láminas de Adaptaciones PT** (`Figura`, clase `aeln-lamina`): dibujan
  tinta oscura sobre papel y se serializan tal cual para el PDF, así que
  conservan el papel blanco; en oscuro solo se les baja un poco el brillo.

**Diagramas SVG**: la paleta de `app/ponencia-tecnologia/_svg/base.tsx` y la del
diagrama de Git (`programacion-ia/sesion-02`) son tokens CSS (`--dg-*`,
declarados en `app/globals.css`), así que el mismo dibujo se adapta al tema sin
JavaScript: en oscuro las líneas suben de tono, los rellenos pasan a lavados
translúcidos y el papel se vuelve superficie elevada. Cuidado al reutilizar esos
tokens en SVG que haya que rasterizar aislados (PDF): allí `var()` no resuelve.

**Contenido migrado**: los contenedores de prosa llevan `dark:prose-invert` y
`dark:prose-a:text-blue-400`; las capturas se atenúan un poco en oscuro
(`filter: brightness(.92)`) y recuperan su aspecto al pasar el ratón.

## Páginas "hub" (Elementor)

Algunas lecciones son índices ricos hechos con Elementor (imagen, Google Slides,
vídeo, rejillas de tarjetas). El contenido plano migrado pierde esos widgets;
`parseHubBlocks` (en `lib/content.ts`) los reconstruye desde
`tools/data/content.jsonl` y se pintan con `HubTemplate`. Se activan cuando el
Elementor de la página contiene un widget `posts`.

## Páginas de "ejercicios resueltos" (zona de programación)

Páginas tipo lista de ejercicios con solución (el WordPress original usaba un
botón muerto "MOSTRAR / OCULTAR SOLUCIÓN" y código en `<xmp>`). `parseExercises`
(en `lib/content.ts`) trocea el contenido en intro + ejercicios; cada uno se
pinta como tarjeta (`ExerciseCard`) con enunciado e imagen de ejemplo visibles y
una solución desplegable (`ExerciseSolution` → `CodeBlock`):

- **Resaltado de sintaxis**: `lib/highlight.ts` tokeniza el código en tiempo de
  compilación (paleta tipo VS Code Dark+) y emite spans `.tok-*` ya escapados y
  troceados por líneas. El HTML coloreado va en el DOM (bueno para SEO).
- **Mostrar/Ocultar**: animación `grid-rows 0fr→1fr` + opacidad. El código se
  queda en el DOM pero con `inert`/`aria-hidden` mientras está plegado (fuera del
  orden de tabulación y del árbol de accesibilidad).
- **Copiar**: botón con `navigator.clipboard` (reserva `execCommand`) y aviso
  `aria-live` para lectores de pantalla; copia el código limpio, no el HTML.
- Se activan solo si la landing tiene `OCULTAR` + `<xmp>` + ≥2 encabezados
  `Ejercicio N` (`isExercisesContent`), para no afectar a otras páginas.
- El botón **Mostrar/Ocultar solución** va en la cabecera, a la derecha del
  título "Ejercicio N" (sin insignia numerada).

Los **artículos/posts con ejemplos de código** (p.ej. los de algoritmos)
reutilizan la misma caja `CodeBlock` (resaltado + copiar), pero **siempre
visible** (sin desplegable): `parseArticleParts` (en `lib/content.ts`) trocea el
HTML separando los `<pre><xmp>…</xmp></pre>` del texto y `ArticleTemplate` los
intercala. Ejemplos: `/que-es-la-recursividad-la-explicacion-definitiva/`,
`/los-mejores-algoritmos-ordenacion-quicksort-mergesort-heapsort/`.
