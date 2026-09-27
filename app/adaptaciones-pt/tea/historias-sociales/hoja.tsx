import type { CSSProperties } from "react";
import { W, H, type El, type Hoja } from "./maqueta";
import { pictoSrc } from "./pictos";

// Pinta una hoja de la maqueta como SVG. Misma geometría que el PDF; el texto
// va en Helvetica o, en su defecto, en Arial / Liberation Sans / Nimbus Sans,
// que comparten métricas con ella, así que las líneas cortan igual.
const FUENTE = "Helvetica, Arial, 'Liberation Sans', 'Nimbus Sans', sans-serif";

const pts = (p: number[]) => p.map((v) => v.toFixed(1)).join(" ");

function pinta(e: El, i: number) {
  switch (e.k) {
    case "rect":
      return (
        <rect key={i} x={e.x} y={e.y} width={e.w} height={e.h} rx={e.r} fill={e.fill ?? "none"}
          stroke={e.stroke} strokeWidth={e.sw} strokeDasharray={e.dash?.join(" ")} />
      );
    case "circ":
      return <circle key={i} cx={e.cx} cy={e.cy} r={e.r} fill={e.fill ?? "none"} stroke={e.stroke} strokeWidth={e.sw} />;
    case "img":
      return <image key={i} href={pictoSrc(e.id)} x={e.x} y={e.y} width={e.w} height={e.h} preserveAspectRatio="xMidYMid meet" />;
    case "text":
      return (
        <text key={i} x={e.x} y={e.y} fontSize={e.size} fontWeight={e.bold ? 700 : 400} fill={e.fill}
          textAnchor={e.anchor ?? "start"}>
          {e.t}
        </text>
      );
    case "line":
      return (
        <polyline key={i} points={pts(e.pts)} fill="none" stroke={e.stroke} strokeWidth={e.sw}
          strokeLinecap="round" strokeLinejoin="round" strokeDasharray={e.dash?.join(" ")} />
      );
    case "poly":
      return <polygon key={i} points={pts(e.pts)} fill={e.fill ?? "none"} stroke={e.stroke} strokeWidth={e.sw} strokeLinejoin="round" />;
  }
}

export function HojaSvg({ hoja, className, style }: { hoja: Hoja; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={hoja.texto} className={className} style={style} fontFamily={FUENTE}>
      <rect width={W} height={H} fill="#ffffff" />
      {hoja.els.map(pinta)}
    </svg>
  );
}
