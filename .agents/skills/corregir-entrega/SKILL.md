---
name: corregir-entrega
description: Corrige con la rúbrica una entrega del campus del Curso de Programación con IA (repos de GitHub del alumnado) y deja las notas como borradores «IA · revisar» en el panel del profesor. Úsala cuando pidan corregir, evaluar o puntuar una entrega del campus (p. ej. «/corregir-entrega 1», «corrige la entrega 1 del grupo 3»).
---

# Corregir una entrega del campus

Argumentos: id de la entrega (obligatorio), opcionalmente `--grupo <id>` y `--local`
(BD de pruebas de Docker en vez de producción). Todo el contexto está en `docs/campus.md`.

## Pasos

1. **Exportar** lo entregado:
   `node tools/campus/exportar-entregas.mjs --entrega <id> [--grupo <g>] [--local]`
   → `.campus-trabajo/entrega-<id>/entregas.json`. Si un envío ya tiene
   `correccion` del profesor (origen `profesor`) o publicada, **no lo corrijas**
   salvo que te lo pidan (la importación lo saltaría igualmente).

2. **Analizar** los repos:
   `node tools/campus/analizar-repos.mjs --entrega <id>`
   → `evidencias/<usuario>.json` (+ capturas `-escritorio.png` / `-movil.png`),
   `resumen.md` y `propuestas.plantilla.json`.

3. **Valorar** cada alumno con la rúbrica de la entrega (`lib/campus/rubricas.ts`,
   normalmente `web-marca`). Para cada uno:
   - Lee su `evidencias/<usuario>.json` y mira las capturas.
   - **Lee el código del clon** (`repos/<usuario>/`): el contenido real de las
     páginas, el CSS y el JS. Las cifras de las evidencias orientan, no deciden:
     «tiene formulario» no es «el formulario envía»; «hay 12 commits» no es «los
     mensajes cuentan decisiones».
   - Elige el nivel (0-3) de **todos** los criterios ajustándote al descriptor
     literal de la rúbrica; en caso de duda, el nivel inferior y dilo en el comentario.
   - Revisa los `minimos` sugeridos (son automáticos): `contacto` exige que
     funcione de verdad (action de Formspree/Web3Forms válido, mailto correcto…).
   - `c` de cada criterio: 1-2 frases concretas con la evidencia (fichero, commit,
     sección) y qué haría falta para el siguiente nivel.
   - `comentario` (lo lee el alumno): tono directo y amable, lo mejor que tiene,
     lo que más nota le daría y el siguiente paso concreto. Sin inventar nada.
   - `privado` (solo el profesor): evidencias clave y dudas para la defensa oral
     (p. ej. «¿sabe explicar el recorrido del formulario?»).
   Escribe el resultado en `.campus-trabajo/entrega-<id>/propuestas.json`
   (mismo formato que la plantilla: `valoraciones: {criterio: {n, c}}`).
   Si un repo no se pudo clonar (privado o inexistente), no inventes nota:
   déjalo fuera y avísalo.

4. **Importar** como borradores:
   `node tools/campus/importar-propuestas.mjs --entrega <id> --simular` y, si
   todo cuadra, sin `--simular`. Nunca uses `--forzar` sin que lo pidan.

5. **Informa** al profesor: tabla alumno → nota propuesta (o NE y por qué),
   repos que no se pudieron analizar, y recuérdale que las propuestas están en
   el panel como «IA · revisar»: las abre, ajusta y publica él.

Nunca publiques notas ni escribas en `app_campus_notas` por otra vía que no sea
`importar-propuestas.mjs`. Los datos de `.campus-trabajo/` son del alumnado:
no los copies fuera del proyecto ni los subas al repo.
