# Marca institucional para los documentos descargados

Banners oficiales del **IES Dr. Lluís Simarro** que se incrustan como
**cabecera** y **pie de página** en los ficheros que genera la herramienta de
**"Resumen de documentos"** (PDF y DOCX). Se repiten en todas las páginas.

> Solo afecta al resumen de documentos. El export normal de mensajes del chat
> NO lleva esta marca.

## Ficheros esperados

Coloca aquí dos imágenes (banners horizontales, a todo el ancho de la página):

| Fichero      | Contenido                                                        |
|--------------|------------------------------------------------------------------|
| `header.png` | Cabecera: Generalitat Valenciana · IES Dr. Lluís Simarro · Red Estatal de Centros de Excelencia de FP |
| `footer.png` | Pie: datos de contacto del centro + logos de financiación (UE NextGen, Ministerio, Plan de Recuperación, GVA, GVA Next) |

Se aceptan también `.jpg`, `.jpeg` o `.webp` (se usa la primera extensión que
exista). Recomendado **PNG**, a buena resolución y con poco margen blanco
alrededor (el alto se calcula solo a partir de la proporción de la imagen).

Si no hay ficheros, el documento se genera sin marca (no falla).

El código que los consume está en `../../export.py`
(`_build_pdf` / `_build_docx`, activado con `branding=True` desde
`build_summary_export`).
