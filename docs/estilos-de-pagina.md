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
- **SEO**: ningún cambio de diseño debe tocar `<head>` (título, canónica, OG,
  JSON-LD). Verificar siempre con `node tools/verify-build.mjs`
  (objetivo: `565 OK, 0 DIFF`).

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
