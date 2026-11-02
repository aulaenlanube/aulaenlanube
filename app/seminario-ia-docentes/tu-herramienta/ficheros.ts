// Ficheros reales del ejemplo resuelto (cuaderno de evaluación por criterios),
// copiados tal cual de la carpeta donde OpenCode 2.2.5 construyó la herramienta.
// La sesión 5 y «Tu herramienta» los importan de aquí: nunca se contradicen.
// Los mismos AGENTS.md y opencode.json se descargan desde
// public/seminario-ia-docentes/herramientas/cuaderno-evaluacion/.

export const AGENTS_MD = String.raw`
# Cuaderno de evaluación por criterios

## Qué es
Una herramienta web para docentes: guarda los pesos de los criterios, las notas de
cada actividad y calcula la nota de cada criterio, de cada bloque y la final.

## Quién la usa
Docentes de la Comunitat Valenciana que evalúan por criterios:
- FP: resultados de aprendizaje (RA) con su peso y criterios de evaluación (CE) dentro de cada RA.
- ESO y Bachillerato: competencias específicas con su peso y criterios de evaluación dentro de cada una.
No saben programar: todo lo que vean tiene que entenderse sin explicaciones.

## Reglas que no se rompen
- Un único fichero: index.html, con el HTML, el CSS y el JavaScript dentro.
- Sin librerías, sin CDN y sin internet: tiene que funcionar abriéndolo con doble clic.
- Los datos solo se guardan en este navegador (localStorage). Nada se envía a ningún sitio.
- Todo en castellano. Notas de 0 a 10, con un decimal y coma decimal.
- Accesible: cada campo con su etiqueta, se maneja con el teclado y el contraste se lee bien.
- Modo claro y oscuro según el sistema.

## Cómo trabajar
- Antes de un cambio grande, explica tu plan en cinco líneas.
- Haz solo lo que se pide en cada mensaje y di qué has cambiado.
- No borres ficheros ni salgas de esta carpeta.
`.trim();

export const OPENCODE_JSON = String.raw`
{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "edit", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "webfetch", "resource": "*", "effect": "ask" },
    { "action": "external_directory", "resource": "*", "effect": "deny" }
  ],
  "policies": [
    { "action": "tool.use", "resource": "shell:rm *", "effect": "deny" },
    { "action": "tool.use", "resource": "shell:del *", "effect": "deny" },
    { "action": "tool.use", "resource": "shell:Remove-Item *", "effect": "deny" },
    { "action": "tool.use", "resource": "shell:sudo *", "effect": "deny" }
  ],
  "agents": {
    "plan": { "permissions": [{ "action": "edit", "resource": "*", "effect": "deny" }] },
    "explore": { "permissions": [{ "action": "edit", "resource": "*", "effect": "deny" }] }
  }
}
`.trim();

/** El encargo en seis bloques (va detrás de PLAN_INTRO en el primer mensaje). */
export const ENCARGO = String.raw`
# Rol
Eres desarrollador de aplicaciones web educativas y conoces cómo se evalúa por criterios en FP y en ESO y Bachillerato de la Comunitat Valenciana.

# Contexto
Soy docente y evalúo por criterios. En FP, cada módulo tiene resultados de aprendizaje (RA) con un peso en la nota final, y cada RA tiene criterios de evaluación (CE) con su peso dentro del RA. En ESO y Bachillerato es igual con competencias específicas y criterios de evaluación. Hoy lo llevo en una hoja de cálculo que se rompe cada vez que cambio un peso. Son datos de mi alumnado: no pueden salir de mi ordenador.

# Tarea
Crea el «Cuaderno de evaluación por criterios» en un único index.html, con cinco pestañas:
1. Configuración: elegir modo FP (RA y CE) o modo ESO/Bachillerato (competencias específicas y criterios); los rótulos cambian según el modo. Bloques (RA o competencias) con nombre y peso, y criterios dentro de cada bloque con nombre y peso.
2. Alumnado: lista por código (A01, A02…) o por nombre, con un aviso visible de que los datos solo están en este navegador.
3. Actividades: nombre de la actividad o instrumento y qué criterios evalúa (uno o varios).
4. Notas: tabla alumnado × actividades, con una nota de 0 a 10 en cada casilla.
5. Resultados: nota de cada criterio, de cada bloque y nota final de cada alumno.

# Reglas
- Nota de un criterio = media de las actividades que lo evalúan. Nota de un bloque = media ponderada de sus criterios. Nota final = media ponderada de los bloques. Un criterio sin notas no cuenta y se avisa.
- Aviso claro si los pesos de los bloques no suman 100, o si los de los criterios de un bloque no suman 100.
- Guardar solo en localStorage. Exportar e importar una copia en JSON. Exportar las notas finales en CSV. Botón de imprimir con un estilo de impresión limpio.
- Sigue las reglas de AGENTS.md.

# Formato
Un solo fichero index.html en esta carpeta. Al acabar, explícame en cinco líneas cómo se usa y qué has decidido tú por tu cuenta.

# Control
Antes de terminar, comprueba con un ejemplo pequeño (2 bloques, 3 criterios, 2 alumnos y 2 actividades) que las cuentas salen, y dime qué parte podría fallar con datos reales.
`.trim();

export const PLAN_INTRO = "Lee AGENTS.md. Te paso el encargo de mi herramienta. Todavía no escribas nada: dame tu plan en pocas líneas (pantallas, cómo guardarás los datos y cómo harás los cálculos) y las dudas que tengas.";

export const P_ADELANTE = "Respuestas a tus dudas: 1) sí, avisa y calcula igual. 2) No borres nada al cambiar de modo: solo cambian los rótulos. 3) sí, vacía = no evaluado. 4) De acuerdo con todo.\nAdelante: construye el index.html siguiendo el plan.";

export const P_NOTAS = "He probado la pestaña Notas como lo haría el alumno más trasto y hay un fallo que me puede hacer perder notas:\n- Si escribo «abc» en una casilla que tenía un 5, el 5 desaparece sin avisar.\n- Si escribo 11, la casilla enseña 11,0 pero se guarda un 10.\nQuiero que una nota no válida no cambie nada en silencio: la casilla se marca en rojo, sale un aviso que diga qué está mal y se conserva la nota anterior. Arregla solo esto y dime qué has cambiado.";

export const P_ROTULOS = "Tres detalles de los textos que se ven raros:\n- En Resultados, en modo FP, la columna dice «Nota ra»: debe decir «Nota RA».\n- En Configuración, el botón dice «Añadir ce»: debe decir «Añadir CE» (y en modo ESO, «Añadir criterio»).\n- Si un alumno no tiene nombre, sale «A01 ·» con un punto colgando: que salga solo «A01».\nArregla solo esto y dime qué has cambiado.";

export const P_EJEMPLO = "Quiero añadir una sola cosa: un botón «Cargar ejemplo» en Configuración que rellene un ejemplo pequeño (2 bloques, 3 criterios, 3 alumnos con código, 2 actividades y sus notas) para que un compañero pueda probar la herramienta en un minuto.\nSi ya hay datos, tiene que pedir confirmación antes de sustituirlos y recordar que exporte una copia.\nNo cambies nada de lo que ya funciona. Antes de tocar el fichero, dime en tres líneas cómo lo vas a hacer.";
