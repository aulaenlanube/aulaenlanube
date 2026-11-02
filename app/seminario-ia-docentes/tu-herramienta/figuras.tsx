import { Caja, Figura, Flecha, T, Zona, fuerte, suave } from "@/app/programacion-ia/_video/svg";

// Figuras de «Tu herramienta, paso a paso» (docs/paginas-para-video.md):
// estáticas, 1:1, texto ≥ 16, cada <text> corto y único en la página.
// Medidas: sans 16 ≈ 9,5 px/carácter, negrita 18 ≈ 11,5. Las flechas acaban a
// 6 del borde de la caja a la que apuntan.

/* ------------------------------------------------------------------ */
/* Qué herramienta para qué momento                                     */
/* Zonas de 310 × 178 a y = 16: x = 16 · 345 · 674 (huecos de 19).     */
/* Dentro, cajas de 270 × 52 (solo título) a x = zona + 20, y = 60 y   */
/* 124. Título más largo: «Cuaderno de evaluación» (22 car. ≈ 253) en  */
/* 270 − 16 = 254. El ejemplo resuelto, con trazo de 4 y relleno.      */
/* ------------------------------------------------------------------ */

const COLUMNAS = [
  { x: 16, rotulo: "Preparar clases", tono: "verde" as const, cajas: ["Banco de preguntas", "Biblioteca de prompts"] },
  { x: 345, rotulo: "Evaluar y corregir", tono: "ambar" as const, cajas: ["Cuaderno de evaluación", "Rúbricas y feedback"] },
  { x: 674, rotulo: "Planificar el curso", tono: "morado" as const, cajas: ["Planificador del curso", "Formación en empresa"] },
];

export function CatalogoMomentos({ uid = "th-catalogo" }: { uid?: string }) {
  return (
    <Figura
      uid={uid}
      ancho={1000}
      alto={210}
      etiqueta="Seis herramientas por momento del curso. Preparar clases: banco de preguntas y biblioteca de prompts. Evaluar y corregir: cuaderno de evaluación (el ejemplo resuelto) y rúbricas y feedback. Planificar el curso: planificador del curso y seguimiento de la formación en empresa."
      pie="El cuaderno de evaluación, resaltado, es el ejemplo resuelto de esta página."
    >
      {COLUMNAS.map((c) => (
        <g key={c.rotulo}>
          <Zona x={c.x} y={16} w={310} h={178} tono={c.tono} rotulo={c.rotulo} />
          {c.cajas.map((t, i) => {
            const ejemplo = t === "Cuaderno de evaluación";
            return (
              <Caja
                key={t}
                x={c.x + 20}
                y={60 + i * 64}
                w={270}
                h={52}
                tono={c.tono}
                titulo={t}
                grosor={ejemplo ? 4 : 2}
                relleno={ejemplo ? suave(c.tono) : undefined}
              />
            );
          })}
        </g>
      ))}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Los seis bloques del encargo                                         */
/* Dos filas de tres cajas de 300 × 76: x = 20 · 350 · 680, y = 20 y   */
/* 120. Líneas de ≤ 25 car. (≈ 238) en 300 − 24 = 276.                 */
/* ------------------------------------------------------------------ */

const BLOQUES_ENCARGO = [
  { t: "Rol", l: "quién es el agente", tono: "azul" as const },
  { t: "Contexto", l: "quién eres y qué te pasa", tono: "azul" as const },
  { t: "Tarea", l: "las pantallas, una a una", tono: "verde" as const },
  { t: "Reglas", l: "cálculos y límites", tono: "ambar" as const },
  { t: "Formato", l: "un index.html y 5 líneas", tono: "morado" as const },
  { t: "Control", l: "que lo compruebe él antes", tono: "rosa" as const },
];

export function SeisBloques({ uid = "th-encargo" }: { uid?: string }) {
  return (
    <Figura
      uid={uid}
      ancho={1000}
      alto={216}
      etiqueta="Los seis bloques del encargo: rol, quién es el agente; contexto, quién eres y qué te pasa; tarea, las pantallas una a una; reglas, cálculos y límites; formato, un index.html y un resumen de cinco líneas; control, que lo compruebe antes de terminar."
    >
      {BLOQUES_ENCARGO.map((b, i) => (
        <Caja key={b.t} x={20 + (i % 3) * 330} y={20 + Math.floor(i / 3) * 100} w={300} h={76} tono={b.tono} titulo={b.t} lineas={[b.l]} />
      ))}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* De la nota de cada actividad a la nota final (A01 del ejemplo)       */
/* Columnas: actividades 20..200 · criterios 280..510 · RA 580..790 ·  */
/* nota final 850..990. Actividades a y = 60 y 190; criterios a y = 10, */
/* 120 y 230; RA a y = 65 y 230; final a y = 148 (todas de alto 76).   */
/* Cuentas: RA1 = 8 · 0,6 + 6,5 · 0,4 = 7,4; RA2 = 8; final =         */
/* 7,4 · 0,4 + 8 · 0,6 = 7,76 → 7,8.                                   */
/* ------------------------------------------------------------------ */

export function CalculoNota({ uid = "th-calculo" }: { uid?: string }) {
  return (
    <Figura
      uid={uid}
      ancho={1000}
      alto={320}
      etiqueta="Cómo calcula el cuaderno la nota de A01 en el ejemplo: el examen 1, con un 8, evalúa CE1.1 y CE2.1; la práctica 1, con un 6,5, evalúa CE1.2. RA1 es la media ponderada de CE1.1 (60 %) y CE1.2 (40 %): 7,4. RA2 es CE2.1: 8,0. La nota final pondera RA1 al 40 % y RA2 al 60 %: 7,76, que se redondea a 7,8."
      pie="Cada actividad alimenta sus criterios; los criterios, su RA; los RA, la nota final. Compruébalo con calculadora."
    >
      <Caja x={20} y={60} w={180} h={76} tono="gris" titulo="Examen 1" lineas={["nota 8"]} />
      <Caja x={20} y={190} w={180} h={76} tono="gris" titulo="Práctica 1" lineas={["nota 6,5"]} />
      <Caja x={280} y={10} w={230} h={76} tono="azul" titulo="CE1.1" lineas={["60 % del RA1 · 8,0"]} />
      <Caja x={280} y={120} w={230} h={76} tono="azul" titulo="CE1.2" lineas={["40 % del RA1 · 6,5"]} />
      <Caja x={280} y={230} w={230} h={76} tono="azul" titulo="CE2.1" lineas={["100 % del RA2 · 8,0"]} />
      <Caja x={580} y={65} w={210} h={76} tono="morado" titulo="RA1" lineas={["pesa 40 % · 7,4"]} />
      <Caja x={580} y={230} w={210} h={76} tono="morado" titulo="RA2" lineas={["pesa 60 % · 8,0"]} />
      <Caja x={850} y={148} w={140} h={76} tono="verde" titulo="Nota final" lineas={["7,76 → 7,8"]} grosor={4} />

      <Flecha uid={uid} d="M200 98 L274 52" />
      <Flecha uid={uid} d="M200 98 L274 262" />
      <Flecha uid={uid} d="M200 228 L274 162" />
      <Flecha uid={uid} d="M510 48 L574 96" tono="azul" />
      <Flecha uid={uid} d="M510 158 L574 110" tono="azul" />
      <Flecha uid={uid} d="M510 268 H574" tono="azul" />
      <Flecha uid={uid} d="M790 103 L844 180" tono="morado" />
      <Flecha uid={uid} d="M790 268 L844 194" tono="morado" />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* La cadena real: del plan a la versión 7                              */
/* Fila 1 (y = 20): el plan, v1, v2, v3 a x = 20 · 270 · 520 · 770.     */
/* Fila 2 (y = 150), de derecha a izquierda: v4 (770) · v5 (520) ·      */
/* v6 (270) · v7 (20). Cajas de 210 × 76; huecos de 40. Bajada de v3   */
/* a v4 en x = 875. Líneas de ≤ 19 car. (≈ 181) en 210 − 24 = 186.     */
/* ------------------------------------------------------------------ */

const VERSIONES = [
  { t: "El plan", l: "5 pantallas, 3 dudas", tono: "morado" as const },
  { t: "v1", l: "35 KB, cuentas bien", tono: "azul" as const },
  { t: "v2", l: "«abc» ya no borra", tono: "rosa" as const },
  { t: "v3", l: "rótulos en orden", tono: "rosa" as const },
  { t: "v4", l: "botón de ejemplo", tono: "verde" as const },
  { t: "v5", l: "aviso por alumno", tono: "rosa" as const },
  { t: "v6", l: "nombres enteros", tono: "rosa" as const },
  { t: "v7", l: "pie: cómo se hizo", tono: "verde" as const },
];

export function Versiones({ uid = "th-versiones" }: { uid?: string }) {
  const pos = [20, 270, 520, 770];
  return (
    <Figura
      uid={uid}
      ancho={1000}
      alto={246}
      etiqueta="La cadena real de mensajes: el plan propuso cinco pantallas y planteó tres dudas; la v1 ya calculaba bien; la v2 arregló que «abc» borrara una nota; la v3, los rótulos; la v4 añadió un botón de ejemplo; la v5, el aviso por alumno; la v6 enseña los nombres enteros; y la v7 añade el pie que cuenta cómo se hizo."
      pie="En rosa, los fallos que salieron al probar; en verde, las mejoras pedidas. Una cosa por mensaje."
    >
      {VERSIONES.map((v, i) => {
        const fila = i < 4 ? 0 : 1;
        const x = fila === 0 ? pos[i] : pos[7 - i];
        return <Caja key={v.t} x={x} y={fila === 0 ? 20 : 150} w={210} h={76} tono={v.tono} titulo={v.t} lineas={[v.l]} />;
      })}
      <Flecha uid={uid} d="M230 58 H264" />
      <Flecha uid={uid} d="M480 58 H514" />
      <Flecha uid={uid} d="M730 58 H764" />
      <Flecha uid={uid} d="M875 96 V144" />
      <Flecha uid={uid} d="M770 188 H736" />
      <Flecha uid={uid} d="M520 188 H486" />
      <Flecha uid={uid} d="M270 188 H236" />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* FP y ESO: la misma estructura                                        */
/* Filas a y = 20 y 134 (alto 76); columnas x = 20 · 370 · 720 (ancho  */
/* 260, huecos de 90). Flechas a y = 58 y 172. Lema en (500, 236).     */
/* ------------------------------------------------------------------ */

export function FpEso({ uid = "th-fpeso" }: { uid?: string }) {
  return (
    <Figura
      uid={uid}
      ancho={1000}
      alto={250}
      etiqueta="FP y ESO o Bachillerato tienen la misma estructura: en FP, el módulo profesional tiene resultados de aprendizaje con su peso y, dentro de cada uno, criterios de evaluación con su peso; en ESO y Bachillerato, la materia tiene competencias específicas con su peso y criterios dentro de cada una."
    >
      <Caja x={20} y={20} w={260} h={76} tono="azul" titulo="Módulo profesional" lineas={["Formación Profesional"]} />
      <Caja x={370} y={20} w={260} h={76} tono="azul" titulo="RA con su peso" lineas={["resultado de aprendizaje"]} />
      <Caja x={720} y={20} w={260} h={76} tono="azul" titulo="CE con su peso" lineas={["dentro de cada RA"]} />
      <Caja x={20} y={134} w={260} h={76} tono="verde" titulo="Materia" lineas={["ESO y Bachillerato"]} />
      <Caja x={370} y={134} w={260} h={76} tono="verde" titulo="Competencia y peso" lineas={["competencia específica"]} />
      <Caja x={720} y={134} w={260} h={76} tono="verde" titulo="Criterio y peso" lineas={["dentro de su competencia"]} />
      <Flecha uid={uid} d="M280 58 H364" tono="azul" />
      <Flecha uid={uid} d="M630 58 H714" tono="azul" />
      <Flecha uid={uid} d="M280 172 H364" tono="verde" />
      <Flecha uid={uid} d="M630 172 H714" tono="verde" />
      <T x={500} y={238} ancla="middle" peso={700} color={fuerte("gris")}>
        el modo FP o ESO solo cambia los rótulos: las cuentas son las mismas
      </T>
    </Figura>
  );
}
