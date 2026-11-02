// Diagrama del bucle del agente (guía de OpenCode y portada del proyecto 2).
//
// Lenguaje de app/ponencia-tecnologia/_svg/base.tsx: tokens --dg-*, texto de 16
// o más, pintado 1:1 (maxWidth = minWidth = ancho del viewBox) y flechas con
// <marker> en userSpaceOnUse y refX = 10, así que todo trazo que apunta a una
// caja acaba a 6 unidades de su borde. Sin interacción: lo que cuenta cada
// pieza está escrito en ella (en vídeo no se pulsa nada). Cada <text> es corto
// y único: la cámara lo localiza por su texto.
//
// Geometría (comprobada a mano):
//   columnas x = 20 · 350 · 680 (ancho 260, huecos de 70) → ancho total 960
//   filas    y = 20 (alto 76) · 140 (permiso, alto 100) · 284 (alto 76) → alto 380
//   centros  x = 150 · 480 · 810 ; y = 58 · 190 · 322

const W = 960;
const H = 380;
const CW = 260;

type Tono = "azul" | "morado" | "verde" | "ambar" | "rosa" | "gris";

const NODOS: { x: number; y: number; h?: number; tono: Tono; lineas: string[]; discontinuo?: boolean }[] = [
  { x: 20, y: 20, tono: "gris", lineas: ["Tú pides", "«añade la orden listar»"] },
  { x: 350, y: 20, tono: "azul", lineas: ["Planifica", "qué mirar, qué cambiar"] },
  { x: 680, y: 20, tono: "morado", lineas: ["Usa una herramienta", "read · grep · edit · bash"] },
  { x: 680, y: 140, h: 100, tono: "rosa", lineas: ["Te pide permiso", "si la regla es ask", "tú: sí / no"], discontinuo: true },
  { x: 680, y: 284, tono: "verde", lineas: ["Ve el resultado", "contenido, diff, salida"] },
  { x: 350, y: 284, tono: "ambar", lineas: ["¿Ha terminado?", "compara con lo pedido"] },
  { x: 20, y: 284, tono: "gris", lineas: ["Termina y te avisa", "tú revisas y decides"] },
];

const FLECHAS = [
  "M280 58 H344", // pides → planifica
  "M610 58 H674", // planifica → herramienta
  "M810 96 V134", // herramienta → permiso
  "M810 240 V278", // permiso → resultado
  "M680 322 H616", // resultado → ¿terminado?
  "M350 322 H286", // ¿terminado? sí → termina
  "M480 284 V102", // ¿terminado? no → planifica
];

export default function BucleAgente({ uid = "bucle" }: { uid?: string }) {
  const marca = `${uid}-punta`;
  return (
    <figure className="rounded-2xl border border-zinc-200 p-4 dark:border-white/10" style={{ background: "var(--dg-fondo)" }}>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Bucle del agente: tú pides; el agente planifica, usa una herramienta (leer, buscar, editar o ejecutar), te pide permiso si la regla es ask, ve el resultado y comprueba si ha terminado. Si no, da otra vuelta. Cuando termina, te avisa y tú revisas."
          className="mx-auto block"
          style={{ maxWidth: W, minWidth: W }}
        >
          <defs>
            <marker id={marca} viewBox="0 0 10 8" refX={10} refY={4} markerWidth={10} markerHeight={8} markerUnits="userSpaceOnUse" orient="auto">
              <path d="M0 0 L10 4 L0 8 Z" fill="var(--dg-gris-linea)" />
            </marker>
          </defs>

          <g fill="none" stroke="var(--dg-gris-linea)" strokeWidth={2.5} markerEnd={`url(#${marca})`}>
            {FLECHAS.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>

          {NODOS.map((n) => {
            const h = n.h ?? 76;
            const cx = n.x + CW / 2;
            return (
              <g key={n.lineas[0]}>
                <rect
                  x={n.x}
                  y={n.y}
                  width={CW}
                  height={h}
                  rx={12}
                  fill="var(--dg-papel)"
                  stroke={`var(--dg-${n.tono}-linea)`}
                  strokeWidth={2}
                  strokeDasharray={n.discontinuo ? "7 5" : undefined}
                />
                {n.lineas.map((l, i) => (
                  <text
                    key={l}
                    x={cx}
                    y={n.y + 30 + i * 24}
                    textAnchor="middle"
                    fontSize={i === 0 ? 18 : 16}
                    fontWeight={i === 0 ? 800 : 500}
                    fill={i === 0 ? `var(--dg-${n.tono}-fuerte)` : "var(--dg-suave)"}
                  >
                    {l}
                  </text>
                ))}
              </g>
            );
          })}

          <text x={494} y={186} fontSize={16} fontWeight={800} fill="var(--dg-ambar-fuerte)">
            no: otra vuelta
          </text>
          <text x={494} y={210} fontSize={16} fontWeight={500} fill="var(--dg-suave)">
            muchas vueltas
          </text>
          <text x={315} y={312} fontSize={16} fontWeight={800} fill="var(--dg-verde-fuerte)" textAnchor="middle">
            sí
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-center text-lg text-zinc-700 dark:text-zinc-300">
        Un chat da <b>una</b> respuesta. Un agente da <b>muchas vueltas</b> a este bucle hasta acabar la tarea.
      </figcaption>
    </figure>
  );
}
