import type { ReactNode } from "react";
import { Figura } from "./ui";

export type Marca = { x: number; label?: string; color?: "rojo" | "azul" | "verde" | "violeta" | "ambar" };

const COLORES: Record<string, string> = {
  rojo: "#dc2626",
  azul: "#0284c7",
  verde: "#16a34a",
  violeta: "#6d28d9",
  ambar: "#b45309",
};

// Recta numérica HORIZONTAL (regla de Edu 20-09: nunca vertical).
// Marca el 0 en el centro del tramo, graduación cada 1 o 2 unidades y puntos.
export function LineaH({
  desde,
  hasta,
  marcas,
  caption,
}: {
  desde: number;
  hasta: number;
  marcas: Marca[];
  caption?: ReactNode;
}) {
  const W = 520;
  const H = 86;
  const pad = 26;
  const px = (x: number) => pad + ((x - desde) * (W - 2 * pad)) / (hasta - desde);
  const paso = hasta - desde > 160 ? 40 : hasta - desde > 80 ? 20 : hasta - desde > 40 ? 10 : hasta - desde > 20 ? 4 : hasta - desde > 16 ? 2 : 1;
  const ticks: number[] = [];
  for (let i = desde; i <= hasta; i += paso) ticks.push(i);
  const cero = px(0);
  return (
    <Figura caption={caption}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-28 w-full max-w-full" role="img" aria-label="Recta numérica horizontal">
        {/* zonas frío/calor (solo si hay negativos) */}
        {desde < 0 && hasta > 0 && (
          <>
            <rect x={pad} y={30} width={cero - pad} height={18} fill="#dbeafe" opacity="0.55" />
            <rect x={cero} y={30} width={W - pad - cero} height={18} fill="#fee2e2" opacity="0.5" />
          </>
        )}
        <line x1={10} y1={39} x2={W - 10} y2={39} stroke="#475569" strokeWidth="2" />
        <path d={`M${W - 10} 39 l-7 -3.5v7z`} fill="#475569" />
        <path d={`M10 39 l7 -3.5v7z`} fill="#475569" />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={px(t)} y1={33} x2={px(t)} y2={45} stroke="#64748b" strokeWidth={t === 0 ? 2.4 : 1.4} />
            <text x={px(t)} y={60} fontSize="11" textAnchor="middle" fill={t === 0 ? "#0f172a" : "#64748b"} fontWeight={t === 0 ? 700 : 400} fontFamily="system-ui">
              {t}
            </text>
          </g>
        ))}
        {marcas.map((m, i) => {
          const c = COLORES[m.color || "azul"];
          return (
            <g key={i}>
              <circle cx={px(m.x)} cy={39} r={5.5} fill={c} stroke="#fff" strokeWidth="1.5" />
              {m.label ? (
                <text x={px(m.x)} y={20} fontSize="11" textAnchor="middle" fill={c} fontWeight={700} fontFamily="system-ui">
                  {m.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </Figura>
  );
}

// Iconos-objeto sencillos (40x40) para la cajita de cada actividad.
export function Icono({ k }: { k: string }) {
  const s = { width: 40, height: 40, viewBox: "0 0 40 40", "aria-hidden": true } as const;
  const line = { fill: "none", strokeWidth: 2, strokeLinecap: "round" as const };
  switch (k) {
    case "termometro": // horizontal: termómetro tumbado
      return (
        <svg {...s}>
          <rect x="6" y="16" width="22" height="8" rx="4" fill="#e0f2fe" stroke="#0284c7" />
          <circle cx="32" cy="20" r="5" fill="#ef4444" stroke="#b91c1c" />
          <rect x="12" y="18" width="16" height="4" rx="2" fill="#ef4444" />
          <path d="M10 10v4M18 10v4M26 10v4" stroke="#0369a1" strokeWidth="1.5" />
        </svg>
      );
    case "etiquetas":
      return (
        <svg {...s}>
          <rect x="4" y="8" width="14" height="12" rx="3" fill="#dcfce7" stroke="#16a34a" />
          <rect x="22" y="20" width="14" height="12" rx="3" fill="#fee2e2" stroke="#dc2626" />
          <path d="M8 14h6M11 11v6" stroke="#16a34a" {...line} />
          <path d="M26 26h6" stroke="#dc2626" {...line} />
        </svg>
      );
    case "banco":
      return (
        <svg {...s}>
          <rect x="5" y="10" width="30" height="20" rx="3" fill="#fef3c7" stroke="#b45309" />
          <circle cx="20" cy="20" r="6" fill="none" stroke="#b45309" />
          <path d="M20 15v10M17 17.5h6M17 22.5h6" stroke="#b45309" strokeWidth="1.5" />
        </svg>
      );
    case "rana":
      return (
        <svg {...s}>
          <ellipse cx="20" cy="24" rx="11" ry="8" fill="#bbf7d0" stroke="#16a34a" />
          <circle cx="14" cy="15" r="3.5" fill="#bbf7d0" stroke="#16a34a" />
          <circle cx="26" cy="15" r="3.5" fill="#bbf7d0" stroke="#16a34a" />
          <circle cx="14" cy="15" r="1.3" fill="#14532d" />
          <circle cx="26" cy="15" r="1.3" fill="#14532d" />
          <path d="M15 28c2 2 8 2 10 0" stroke="#14532d" {...line} />
        </svg>
      );
    case "ascensor":
      return (
        <svg {...s}>
          <rect x="10" y="4" width="20" height="32" rx="2" fill="#ede9fe" stroke="#6d28d9" />
          <path d="M10 15h20M10 25h20" stroke="#6d28d9" strokeWidth="1.2" />
          <rect x="15" y="26" width="10" height="7" rx="1.5" fill="#c4b5fd" stroke="#6d28d9" />
          <path d="M20 6l3 4h-6z" fill="#6d28d9" />
        </svg>
      );
    case "tesoro":
      return (
        <svg {...s}>
          <rect x="10" y="18" width="20" height="12" rx="2" fill="#fde68a" stroke="#b45309" />
          <path d="M10 22h20M20 18v12" stroke="#b45309" strokeWidth="1.5" />
          <path d="M20 6l4 6h-8z" fill="#b45309" />
          <circle cx="20" cy="13" r="2" fill="#fef3c7" stroke="#b45309" />
        </svg>
      );
    case "globos": // ciudades / temperatura mundo
      return (
        <svg {...s}>
          <circle cx="20" cy="22" r="13" fill="none" stroke="#0284c7" strokeWidth="2" />
          <path d="M7 22h26M20 9c-5 5-5 21 0 26M20 9c5 5 5 21 0 26" stroke="#0284c7" strokeWidth="1.3" fill="none" />
          <path d="M14 16l-8-6" stroke="#dc2626" strokeWidth="1.5" />
          <circle cx="6" cy="10" r="2" fill="#dc2626" />
        </svg>
      );
    case "congelador":
      return (
        <svg {...s}>
          <rect x="9" y="5" width="22" height="30" rx="3" fill="#e0f2fe" stroke="#0369a1" />
          <path d="M9 18h22" stroke="#0369a1" strokeWidth="1.5" />
          <path d="M18 24l2 2-2 2 2 2m-2-6h6m-6 0l2-2m-2 6l2 2" stroke="#0284c7" {...line} />
          <path d="M18 11l2 2-2 2m-2-3h6" stroke="#0369a1" {...line} />
        </svg>
      );
    case "aguila":
      return (
        <svg {...s}>
          <path d="M4 14c8-8 24-8 32 0-6 2-10 2-16 2s-10 0-16-2z" fill="#fef3c7" stroke="#92400e" />
          <circle cx="20" cy="13" r="2.5" fill="#92400e" />
          <path d="M20 16v4m-3-1l3 5 3-5" stroke="#92400e" {...line} />
        </svg>
      );
    case "mago":
      return (
        <svg {...s}>
          <path d="M20 4l12 26H8z" fill="#ede9fe" stroke="#6d28d9" />
          <path d="M12 24c4 2 12 2 16 0" stroke="#6d28d9" {...line} />
          <circle cx="27" cy="10" r="1.6" fill="#fbbf24" />
          <path d="M30 16l1.5 3 3 .5-2 2 .5 3-3-1.4-3 1.4.6-3-2-2 3-.5z" fill="#fbbf24" />
        </svg>
      );
    case "signos":
      return (
        <svg {...s}>
          <rect x="6" y="6" width="28" height="28" rx="4" fill="#f1f5f9" stroke="#334155" />
          <text x="20" y="18" fontSize="10" fontWeight="bold" fill="#16a34a" textAnchor="middle">+ = +</text>
          <text x="20" y="30" fontSize="10" fontWeight="bold" fill="#dc2626" textAnchor="middle">+ = −</text>
        </svg>
      );
    case "verdad":
      return (
        <svg {...s}>
          <circle cx="20" cy="20" r="14" fill="#f1f5f9" stroke="#334155" />
          <path d="M13 20l5 5 9-11" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "letras":
      return (
        <svg {...s}>
          <rect x="6" y="12" width="28" height="16" rx="3" fill="#fff" stroke="#334155" />
          <text x="20" y="25" fontSize="12" fontWeight="bold" fill="#6d28d9" textAnchor="middle">A B C</text>
        </svg>
      );
    case "dados":
      return (
        <svg {...s}>
          <rect x="6" y="6" width="13" height="13" rx="3" fill="#fee2e2" stroke="#dc2626" />
          <rect x="21" y="21" width="13" height="13" rx="3" fill="#dcfce7" stroke="#16a34a" />
          <circle cx="12.5" cy="12.5" r="1.8" fill="#dc2626" />
          <circle cx="27.5" cy="27.5" r="1.8" fill="#16a34a" />
        </svg>
      );
    default: // "recta" — genérico
      return (
        <svg {...s}>
          <path d="M5 20h30" stroke="#475569" strokeWidth="2" />
          <path d="M35 20l-4-2.5v5z" fill="#475569" />
          <path d="M13 15v10M20 13v14M27 15v10" stroke="#0284c7" strokeWidth="2" />
        </svg>
      );
  }
}
