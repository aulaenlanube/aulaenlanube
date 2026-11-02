import { Caja, Figura, Flecha, T, fuerte, suave, type TonoSvg } from "@/app/programacion-ia/_video/svg";
import { SESIONES } from "./_datos";

/* ------------------------------------------------------------------ */
/* El hilo del seminario: cada sesión deja una pieza y la sesión 5     */
/* las junta en tu herramienta.                                        */
/* Cinco cajas de 184 × 100 a y = 44, separadas 25: x = 20 + i·209     */
/* (20, 229, 438, 647, 856; la última acaba en 1040). Rótulo «Sesión N» */
/* a y = 30 sobre cada caja. Flechas a y = 94 entre el borde derecho   */
/* (+2) y el izquierdo de la siguiente (−6). Alto total 160.          */
/* Texto más largo del título: «La herramienta» (14 car. negrita 18    */
/* ≈ 161 px) en 184 − 16 = 168. Líneas de 16: ≤ 17 car. (≈ 162 px).   */
/* ------------------------------------------------------------------ */

const PIEZAS: { titulo: string; lineas: [string, string] }[] = [
  { titulo: "La ficha", lineas: ["el contexto que", "pegas siempre"] },
  { titulo: "El cuaderno", lineas: ["tus fuentes y", "tus prompts"] },
  { titulo: "Las rúbricas", lineas: ["y un protocolo", "de corrección"] },
  { titulo: "El asistente", lineas: ["tu agente y el", "encargo de la app"] },
  { titulo: "La herramienta", lineas: ["una web propia", "que funciona sola"] },
];

/** `actual`: la sesión que se resalta (sin él, todas en color: la portada). */
export function HiloSeminario({ actual, uid = "hilo" }: { actual?: number; uid?: string }) {
  const pie = actual
    ? `Hoy, en la sesión ${actual}: ${SESIONES[actual - 1].pieza.toLowerCase()}. La sesión 5 junta todas las piezas.`
    : "Cada sesión deja una pieza; en la sesión 5 las juntas en tu propia herramienta.";
  return (
    <Figura
      uid={uid}
      ancho={1060}
      alto={160}
      etiqueta="El hilo del seminario: la ficha (sesión 1), el cuaderno y los prompts (sesión 2), las rúbricas (sesión 3), el asistente y el encargo (sesión 4) y la herramienta (sesión 5), que junta todo lo anterior."
      pie={pie}
    >
      {PIEZAS.map((p, i) => {
        const x = 20 + i * 209;
        const s = SESIONES[i];
        const tono = s.tono as TonoSvg;
        const activa = actual === undefined || actual === s.n;
        const t: TonoSvg = activa ? tono : "gris";
        return (
          <g key={p.titulo}>
            <T x={x + 92} y={30} ancla="middle" peso={800} color={fuerte(t)}>
              {`Sesión ${s.n}`}
            </T>
            <Caja
              x={x}
              y={44}
              w={184}
              h={100}
              tono={t}
              titulo={p.titulo}
              lineas={p.lineas}
              relleno={actual === s.n ? suave(tono) : undefined}
              grosor={actual === s.n ? 4 : 2}
              discontinua={!activa}
            />
            {i < PIEZAS.length - 1 ? <Flecha uid={uid} d={`M${x + 186} 94 H${x + 203}`} tono="gris" /> : null}
          </g>
        );
      })}
    </Figura>
  );
}
