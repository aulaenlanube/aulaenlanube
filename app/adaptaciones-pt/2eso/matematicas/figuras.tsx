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

export function TablaSignos() {
  // Espejo del diagrama del libro: recuadros azul (+) y rojo (−).
  const sq = (x: number, y: number, pos: boolean) => (
    <rect key={x} x={x} y={y + 2} width={16} height={16} rx={3} fill={pos ? "#bfdbfe" : "#fecaca"} stroke={pos ? "#1d4ed8" : "#dc2626"} strokeWidth="1.5" />
  );
  const row = (y: number, a: boolean, b: boolean, r: boolean) => (
    <g key={y} fontFamily="system-ui" fontSize="12" fontWeight="bold">
      {sq(10, y, a)}
      <text x={33} y={y + 15} fill="#334155">·</text>
      {sq(40, y, b)}
      <text x={63} y={y + 15} fill="#334155">=</text>
      {sq(74, y, r)}
      <text x={100} y={y + 15} fontSize="10.5" fill="#475569">{r ? "positivo (+)" : "negativo (−)"}</text>
    </g>
  );
  return (
    <Figura caption="Regla de los signos (igual que en tu libro): mismo color = positivo · colores distintos = negativo. Vale igual para dividir.">
      <svg viewBox="0 0 180 108" className="h-36 w-auto max-w-full" role="img" aria-label="Tabla de signos con recuadros azules y rojos">
        {row(8, true, true, true)}
        {row(32, false, false, true)}
        {row(56, true, false, false)}
        {row(80, false, true, false)}
      </svg>
    </Figura>
  );
}

// Modelo de fichas para SUMAR/RESTAR (apartado 4): azul = +, rojo = −;
// cada pareja azul+rojo se anula y el color que sobra da el signo del resultado.
export function FichasColores() {
  const chips = (x0: number, y0: number, n: number, pos: boolean) =>
    Array.from({ length: n }, (_, i) => (
      <rect key={`${x0}-${i}`} x={x0 + i * 20} y={y0} width={16} height={16} rx={3}
        fill={pos ? "#bfdbfe" : "#fecaca"} stroke={pos ? "#1d4ed8" : "#dc2626"} strokeWidth="1.5" />
    ));
  // [y, azules, rojas, sobra: "azul"|"rojo"|null, etiqueta resultado]
  const filas: [number, number, number, "azul" | "rojo" | null, string][] = [
    [10, 3, 2, "azul", "= +1"],
    [40, 2, 5, "rojo", "= −3"],
    [70, 4, 4, null, "= 0"],
  ];
  return (
    <Figura caption="Sumar con fichas: azul = positivo, rojo = negativo. Cada pareja azul + rojo se anula (vale 0); el color que sobra es el signo del resultado.">
      <svg viewBox="0 0 300 96" className="h-28 w-auto max-w-full" role="img" aria-label="Tres combinaciones de fichas azules y rojas con su resultado">
        {filas.map(([y, az, ro, sobra, res]) => (
          <g key={y}>
            {chips(10, y - 2, az, true)}
            <text x={14 + az * 20} y={y + 11} fontSize="12" fontWeight="bold" fill="#334155">+</text>
            {chips(26 + az * 20, y - 2, ro, false)}
            <text x={44 + (az + ro) * 20} y={y + 11} fontSize="12" fontWeight="bold" fill="#334155">=</text>
            {sobra ? (
              <rect x={60 + (az + ro) * 20} y={y - 2} width={16} height={16} rx={3}
                fill={sobra === "azul" ? "#bfdbfe" : "#fecaca"} stroke={sobra === "azul" ? "#1d4ed8" : "#dc2626"} strokeWidth="1.5" />
            ) : (
              <text x={58 + (az + ro) * 20} y={y + 11} fontSize="13" fontWeight="bold" fill="#64748b">∅</text>
            )}
            <text x={84 + (az + ro) * 20} y={y + 11} fontSize="11" fontWeight="bold" fill="#0f172a">{res}</text>
          </g>
        ))}
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

// Termómetro HORIZONTAL para teoría (regla de Edu: la recta siempre horizontal).
export function Termohorizontal() {
  return (
    <Figura caption="El termómetro es una recta horizontal: a la izquierda, bajo cero (azul); a la derecha, sobre cero (rojo).">
      <svg viewBox="0 0 420 120" className="h-32 w-full max-w-full" role="img" aria-label="Termómetro horizontal con la escala de menos diez a más diez">
        <rect x="10" y="46" width="330" height="26" rx="13" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
        <rect x="10" y="46" width="165" height="26" rx="13" fill="#dbeafe" />
        <rect x="175" y="46" width="165" height="26" fill="#fee2e2" />
        <rect x="14" y="50" width="120" height="18" rx="9" fill="#3b82f6" />
        <circle cx="352" cy="59" r="17" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
        <g stroke="#334155" strokeWidth="1.5">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => <line key={i} x1={20 + i * 40} y1={40} x2={20 + i * 40} y2={46} />)}
        </g>
        <g fontSize="11" fill="#334155" fontFamily="system-ui" textAnchor="middle">
          {[["−10", 20], ["−5", 100], ["0", 180], ["5", 260], ["10", 330]].map(([t, x], i) => <text key={i} x={x} y={32}>{t}</text>)}
        </g>
        <line x1="180" y1="38" x2="180" y2="98" stroke="#0f172a" strokeWidth="2" strokeDasharray="4 3" />
        <text x="90" y="98" fontSize="11" fill="#1d4ed8" fontFamily="system-ui" textAnchor="middle">bajo cero (−)</text>
        <text x="270" y="98" fontSize="11" fill="#b91c1c" fontFamily="system-ui" textAnchor="middle">sobre cero (+)</text>
      </svg>
    </Figura>
  );
}

// Tarjeta de jerarquía de operaciones para teoría (apartado 5).
export function Jerarquia() {
  return (
    <Figura caption="Orden fijo: lo de arriba se hace primero. Los enteros no cambian la lista, solo el signo de cada término.">
      <svg viewBox="0 0 300 120" className="h-32 w-auto max-w-full" role="img" aria-label="Tarjeta con los cuatro niveles de la jerarquía de operaciones">
        {[["1. Paréntesis ( )", 12, "#6d28d9", "#ede9fe"], ["2. Potencias", 40, "#b45309", "#fef3c7"], ["3. · y :  (izq. → dcha.)", 68, "#0284c7", "#e0f2fe"], ["4. + y −  (izq. → dcha.)", 96, "#16a34a", "#dcfce7"]].map(([t, y, c, f], i) => (
          <g key={i}>
            <rect x="8" y={y as number} width="284" height="24" rx="6" fill={f as string} stroke={c as string} strokeWidth="1.5" />
            <text x="150" y={(y as number) + 16.5} fontSize="12" fontWeight="bold" fill={c as string} fontFamily="system-ui" textAnchor="middle">{t as string}</text>
          </g>
        ))}
      </svg>
    </Figura>
  );
}

// Fases del método de resolución (apartado 6).
export function Fases() {
  return (
    <Figura caption="El método en cuatro fases: traducir, esquematizar, escribir la operación y responder.">
      <svg viewBox="0 0 320 70" className="h-20 w-full max-w-full" role="img" aria-label="Cuatro fases numeradas con flechas">
        {[["1", "Subraya\ndatos", "#1d4ed8", "#dbeafe"], ["2", "Dibuja\nla recta", "#6d28d9", "#ede9fe"], ["3", "Escribe la\noperación", "#b45309", "#fef3c7"], ["4", "Responde\ncon unidades", "#15803d", "#dcfce7"]].map(([n, t, c, f], i) => (
          <g key={i} fontFamily="system-ui">
            <circle cx={34 + i * 84} cy={26} r={22} fill={f} stroke={c} strokeWidth="2" />
            <text x={34 + i * 84} y={31} fontSize="15" fontWeight="bold" fill={c} textAnchor="middle">{n}</text>
            <text x={34 + i * 84} y={62} fontSize="9.5" fill="#334155" textAnchor="middle">{t.split("\n")[0]} {t.split("\n")[1]}</text>
            {i < 3 && <path d={`M${58 + i * 84} 26 h14`} stroke="#94a3b8" strokeWidth="2" markerEnd="url(#fse)" />}
          </g>
        ))}
        <defs><marker id="fse" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0 0L5 2.5L0 5z" fill="#94a3b8" /></marker></defs>
      </svg>
    </Figura>
  );
}
