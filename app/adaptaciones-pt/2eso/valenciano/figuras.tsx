import type { ReactElement } from "react";
import { Figura } from "./ui";

// Iconos y diagramas de Valencià · Adaptaciones PT.
// Geometría explícita (nada «a ojo»): cada caja lleva su x/y/ancho calculado
// y los textos van centrados sobre el centro real de su caja. Todos los SVG
// llevan aria-label descriptivo y role="img" (no son interactivos).

// ───────────────────────── Iconos de actividad (40×40) ─────────────────────
export function Icono({ k }: { k: string }) {
  const s = { width: 40, height: 40, viewBox: "0 0 40 40", "aria-hidden": true } as const;
  const line = { fill: "none", strokeWidth: 2, strokeLinecap: "round" as const };
  switch (k) {
    case "repaso": // libreta con lápiz
      return (
        <svg {...s}>
          <rect x="8" y="6" width="22" height="28" rx="3" fill="#eff6ff" stroke="#2563eb" />
          <path d="M13 13h12M13 19h12M13 25h7" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M27 27l6-6 3 3-6 6h-3z" fill="#fde68a" stroke="#b45309" />
        </svg>
      );
    case "chat": // dos bocadillos
      return (
        <svg {...s}>
          <rect x="4" y="7" width="22" height="15" rx="4" fill="#dbeafe" stroke="#2563eb" />
          <path d="M10 22l-2 5 6-5z" fill="#dbeafe" stroke="#2563eb" />
          <rect x="17" y="18" width="19" height="13" rx="4" fill="#dcfce7" stroke="#16a34a" />
          <path d="M30 31l2 4-5-4z" fill="#dcfce7" stroke="#16a34a" />
        </svg>
      );
    case "megafono":
      return (
        <svg {...s}>
          <path d="M9 16h6l11-7v22l-11-7H9z" fill="#fef3c7" stroke="#b45309" />
          <rect x="4" y="16" width="6" height="8" rx="2" fill="#fde68a" stroke="#b45309" />
          <path d="M30 15c3 3 3 7 0 10" stroke="#b45309" {...line} />
        </svg>
      );
    case "carta":
      return (
        <svg {...s}>
          <rect x="5" y="10" width="30" height="20" rx="3" fill="#fff" stroke="#2563eb" />
          <path d="M5 12l15 10 15-10" fill="none" stroke="#2563eb" strokeWidth="1.8" />
        </svg>
      );
    case "antena":
      return (
        <svg {...s}>
          <path d="M20 14v20" stroke="#475569" strokeWidth="2.2" />
          <path d="M14 34l6-14 6 14" fill="none" stroke="#475569" strokeWidth="1.8" />
          <path d="M13 12c4-5 10-5 14 0" stroke="#0284c7" {...line} />
          <path d="M9 7c7-7 15-7 22 0" fill="none" stroke="#0284c7" strokeWidth="1.6" />
          <circle cx="20" cy="14" r="2.6" fill="#0284c7" />
        </svg>
      );
    case "etiqueta":
      return (
        <svg {...s}>
          <path d="M5 13l12-6 18 8-12 6z" fill="#dbeafe" stroke="#2563eb" />
          <path d="M23 21v10l-18-8V13" fill="#eff6ff" stroke="#2563eb" />
          <circle cx="13" cy="13" r="2" fill="#2563eb" />
        </svg>
      );
    case "paleta":
      return (
        <svg {...s}>
          <path d="M20 6c8 0 14 5 14 11s-6 6-8 8-1 6-6 6c-8 0-14-6-14-12S12 6 20 6z" fill="#fdf4ff" stroke="#7c3aed" />
          <circle cx="15" cy="14" r="2.4" fill="#dc2626" />
          <circle cx="23" cy="12" r="2.4" fill="#2563eb" />
          <circle cx="27" cy="19" r="2.4" fill="#16a34a" />
          <circle cx="15" cy="23" r="2.4" fill="#f59e0b" />
        </svg>
      );
    case "lupa":
      return (
        <svg {...s}>
          <circle cx="18" cy="17" r="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.2" />
          <path d="M25 24l9 9" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "puzzle":
      return (
        <svg {...s}>
          <path d="M6 8h11v4a3 3 0 006 0V8h11v11h-4a3 3 0 000 6h4v9H6z" fill="#ede9fe" stroke="#7c3aed" />
          <path d="M17 24a3 3 0 00-6 0" fill="none" stroke="#7c3aed" strokeWidth="1.4" />
        </svg>
      );
    case "arbol": // familia de palabras
      return (
        <svg {...s}>
          <path d="M20 34V20" stroke="#78350f" strokeWidth="2.4" />
          <path d="M20 24l-8-5M20 24l8-5" stroke="#78350f" strokeWidth="1.8" />
          <circle cx="20" cy="9" r="6" fill="#bbf7d0" stroke="#16a34a" />
          <circle cx="10" cy="17" r="5" fill="#dcfce7" stroke="#16a34a" />
          <circle cx="30" cy="17" r="5" fill="#dcfce7" stroke="#16a34a" />
        </svg>
      );
    case "libro":
      return (
        <svg {...s}>
          <path d="M5 9c5-2 10-2 15 1v23c-5-3-10-3-15-1z" fill="#dbeafe" stroke="#2563eb" />
          <path d="M35 9c-5-2-10-2-15 1v23c5-3 10-3 15-1z" fill="#eff6ff" stroke="#2563eb" />
          <path d="M20 10v22" stroke="#2563eb" strokeWidth="1.4" />
        </svg>
      );
    case "lira": // lírica
      return (
        <svg {...s}>
          <path d="M11 32V12a9 9 0 0118 0v20" fill="none" stroke="#7c3aed" strokeWidth="2.2" />
          <path d="M16 31V13M20 31V11M24 31V13" stroke="#a78bfa" strokeWidth="1.6" />
          <rect x="8" y="31" width="24" height="4" rx="2" fill="#ede9fe" stroke="#7c3aed" />
        </svg>
      );
    case "mascaras": // teatro
      return (
        <svg {...s}>
          <path d="M4 10h15v11a7.5 7.5 0 01-15 0z" fill="#fef3c7" stroke="#b45309" />
          <path d="M8 15h1.5M14 15h1.5M9 23c2 1.6 4 1.6 6 0" fill="none" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M21 14h15v11a7.5 7.5 0 01-15 0z" fill="#ede9fe" stroke="#7c3aed" />
          <path d="M25 19h1.5M31 19h1.5M26 28c2-1.6 4-1.6 6 0" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "tilde":
      return (
        <svg {...s}>
          <rect x="6" y="6" width="28" height="28" rx="6" fill="#fef3c7" stroke="#b45309" />
          <text x="20" y="29" fontSize="20" fontWeight="bold" fill="#b45309" textAnchor="middle" fontFamily="system-ui">á</text>
        </svg>
      );
    case "palmas": // golpes de voz
      return (
        <svg {...s}>
          <path d="M6 24c0-6 3-9 6-9v-6a2 2 0 014 0v6h1V7a2 2 0 014 0v8h1v-5a2 2 0 014 0v12c0 6-4 10-10 10S6 30 6 24z" fill="#fde68a" stroke="#b45309" />
          <path d="M31 10l4-3M32 17h5M31 24l4 3" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "tarjetas":
      return (
        <svg {...s}>
          <rect x="4" y="12" width="18" height="22" rx="3" fill="#fee2e2" stroke="#dc2626" transform="rotate(-8 13 23)" />
          <rect x="17" y="8" width="18" height="22" rx="3" fill="#dcfce7" stroke="#16a34a" transform="rotate(8 26 19)" />
        </svg>
      );
    case "oreja": // escucha / oral
      return (
        <svg {...s}>
          <path d="M13 34c0-6-2-7-4-11-3-7 1-15 9-15s11 6 11 11c0 6-6 5-6 9s-3 4-5 4-5-1-5 2z" fill="#ffe4e6" stroke="#be123c" />
          <path d="M17 15c2-3 6-1 5 2-.8 2.4-3 2-3 5" fill="none" stroke="#be123c" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "semaforo":
      return (
        <svg {...s}>
          <rect x="12" y="4" width="16" height="30" rx="5" fill="#f1f5f9" stroke="#334155" />
          <circle cx="20" cy="12" r="4" fill="#dc2626" />
          <circle cx="20" cy="20" r="4" fill="#f59e0b" />
          <circle cx="20" cy="28" r="4" fill="#16a34a" />
        </svg>
      );
    case "verdad":
      return (
        <svg {...s}>
          <circle cx="20" cy="20" r="14" fill="#f1f5f9" stroke="#334155" />
          <path d="M13 20l5 5 9-11" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "lapiz":
      return (
        <svg {...s}>
          <path d="M8 32l2-6 16-16 4 4-16 16z" fill="#fde68a" stroke="#b45309" />
          <path d="M26 10l3-3 4 4-3 3z" fill="#fca5a5" stroke="#b91c1c" />
          <path d="M8 32l4-1-3-3z" fill="#334155" />
        </svg>
      );
    default: // "letras" — genérico
      return (
        <svg {...s}>
          <rect x="5" y="11" width="30" height="18" rx="4" fill="#fff" stroke="#334155" />
          <text x="20" y="25" fontSize="12" fontWeight="bold" fill="#6d28d9" textAnchor="middle" fontFamily="system-ui">A B C</text>
        </svg>
      );
  }
}

// ───────────────────────────── Primitivas de diagrama ──────────────────────
const SANS = "system-ui, -apple-system, Segoe UI, sans-serif";

type CajaProps = {
  x: number; y: number; w: number; h: number;
  fill: string; stroke: string; r?: number;
};
function Caja({ x, y, w, h, fill, stroke, r = 10 }: CajaProps) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth="2" />;
}

function Txt({
  x, y, children, size = 12, fill = "#334155", peso = 400, anchor = "middle", cursiva = false,
}: {
  x: number; y: number; children: string; size?: number; fill?: string;
  peso?: number; anchor?: "middle" | "start" | "end"; cursiva?: boolean;
}) {
  return (
    <text
      x={x} y={y} fontSize={size} fill={fill} fontWeight={peso} textAnchor={anchor}
      fontFamily={SANS} fontStyle={cursiva ? "italic" : "normal"}
    >
      {children}
    </text>
  );
}

// Punta de flecha dibujada a mano (sin <marker>: estos diagramas son
// estáticos y así no hacen falta ids únicos).
function Punta({ x, y, dir = "derecha" }: { x: number; y: number; dir?: "derecha" | "abajo" }) {
  const d = dir === "derecha" ? `M${x} ${y} l-11 -6 v12 z` : `M${x} ${y} l-6 -11 h12 z`;
  return <path d={d} fill="#475569" />;
}

// ────────────────────────── Fig:circuito · comunicación ────────────────────
export function Circuit() {
  // Rejilla: missatge (215-345) sobre la fletxa emisor(18-144) → receptor(416-542).
  const chips: [number, number, string, string, string, string][] = [
    [18, 170, "CODI", "la llengua o el sistema de signes", "#ede9fe", "#7c3aed"],
    [196, 168, "CANAL", "per on viatja el missatge", "#dcfce7", "#16a34a"],
    [372, 170, "CONTEXT", "on, quan i amb qui", "#fef3c7", "#b45309"],
  ];
  return (
    <Figura caption="El circuit de la comunicació: algú (emissor) envia un missatge a algú (receptor). Perquè funcione necessiten un codi compartit, un canal i un context.">
      <svg viewBox="0 0 560 200" className="h-auto w-full min-w-[520px] max-w-full" role="img" aria-label="Esquema del circuit de la comunicació: emissor, missatge, receptor, codi, canal i context">
        <Caja x={215} y={14} w={130} h={36} r={18} fill="#eff6ff" stroke="#2563eb" />
        <Txt x={280} y={38} size={14} peso={700} fill="#1d4ed8">MISSATGE</Txt>
        <path d="M280 50 v26" stroke="#2563eb" strokeWidth="1.6" strokeDasharray="4 4" />

        <Caja x={18} y={62} w={126} h={56} fill="#dbeafe" stroke="#2563eb" />
        <Txt x={81} y={87} size={13} peso={700} fill="#1d4ed8">EMISSOR</Txt>
        <Txt x={81} y={104} size={10.5} fill="#475569">parla o escriu</Txt>

        <Caja x={416} y={62} w={126} h={56} fill="#dbeafe" stroke="#2563eb" />
        <Txt x={479} y={87} size={13} peso={700} fill="#1d4ed8">RECEPTOR</Txt>
        <Txt x={479} y={104} size={10.5} fill="#475569">escolta o llegix</Txt>

        <path d="M150 90 H403" stroke="#475569" strokeWidth="2.4" />
        <Punta x={414} y={90} />

        {chips.map(([x, w, t, sub, fill, stroke]) => (
          <g key={t}>
            <Caja x={x} y={138} w={w} h={46} fill={fill} stroke={stroke} />
            <Txt x={x + w / 2} y={158} size={12} peso={700} fill={stroke}>{t}</Txt>
            <Txt x={x + w / 2} y={174} size={10} fill="#475569">{sub}</Txt>
          </g>
        ))}
      </svg>
    </Figura>
  );
}

export function Funcions() {
  // Seis tarjetas 2×3: función → elemento que destaca.
  const cells: [number, number, string, string, string][] = [
    [14, 14, "EXPRESSIVA", "l'emissor", "«Tinc fam.»"],
    [196, 14, "CONATIVA", "el receptor", "«Tanqueu la porta!»"],
    [378, 14, "REFERENCIAL", "el context", "«Ix a les 8:00.»"],
    [14, 106, "POÈTICA", "la forma", "«El gegant del pi…»"],
    [196, 106, "METALINGÜÍSTICA", "el codi", "«Diftong: què és?»"],
    [378, 106, "FÀTICA", "el canal", "«Em sents?»"],
  ];
  return (
    <Figura caption="Cada funció del llenguatge posa el focus en un element del circuit: per això, mirant un enunciat, es pot endevinar quina funció complix.">
      <svg viewBox="0 0 560 196" className="h-auto w-full min-w-[520px] max-w-full" role="img" aria-label="Les sis funcions del llenguatge amb l'element de la comunicació que destaca cadascuna">
        {cells.map(([x, y, t, el, ex]) => (
          <g key={t}>
            <Caja x={x} y={y} w={168} h={76} fill="#f5f3ff" stroke="#7c3aed" />
            <Txt x={x + 84} y={y + 24} size={12} peso={700} fill="#6d28d9">{t}</Txt>
            <Txt x={x + 84} y={y + 43} size={10.5} fill="#475569">{`→ destaca ${el}`}</Txt>
            <Txt x={x + 84} y={y + 63} size={11} fill="#0f172a" cursiva>{ex}</Txt>
          </g>
        ))}
      </svg>
    </Figura>
  );
}

export function Paraules() {
  // Mapa: CLASSES DE PARAULES → variables (5) / invariables (3).
  const vars: [number, string, string][] = [
    [56, "NOM", "gos, gossa"],
    [128, "ADJECTIU", "xic simpàtic"],
    [200, "DETERMINANT", "el, la seua"],
    [272, "PRONOM", "jo, ells"],
    [344, "VERB", "caminava"],
  ];
  const inv: [number, string, string][] = [
    [56, "PREPOSICIÓ", "a, amb, de"],
    [128, "CONJUNCIÓ", "però, i"],
    [200, "ADVERBI", "tard, molt"],
  ];
  return (
    <Figura caption="Les huit classes de paraules: cinc variables (porten flexió de gènere, nombre, persona…) i tres d'invariables. Les preposicions i les conjuncions pertanyen al grup dels conectors.">
      <svg viewBox="0 0 560 300" className="h-auto w-full min-w-[520px] max-w-full" role="img" aria-label="Esquema de les classes de paraules: variables i invariables">
        <Caja x={170} y={8} w={220} h={36} r={18} fill="#ecfdf5" stroke="#059669" />
        <Txt x={280} y={32} size={14} peso={700} fill="#047857">CLASSES DE PARAULES</Txt>

        <Caja x={18} y={66} w={230} h={168} fill="#f8fafc" stroke="#94a3b8" />
        <Txt x={133} y={88} size={12} peso={700} fill="#334155">VARIABLES · canvien de forma</Txt>
        {vars.map(([y, t, ex]) => (
          <g key={t}>
            <Caja x={34} y={y} w={112} h={24} r={12} fill="#dcfce7" stroke="#16a34a" />
            <Txt x={90} y={y + 16} size={11} peso={700} fill="#14532d">{t}</Txt>
            <Txt x={160} y={y + 16} size={11} fill="#475569" anchor="start">{ex}</Txt>
          </g>
        ))}

        <Caja x={312} y={66} w={230} h={168} fill="#f8fafc" stroke="#94a3b8" />
        <Txt x={427} y={88} size={12} peso={700} fill="#334155">INVARIABLES · no canvien</Txt>
        {inv.map(([y, t, ex]) => (
          <g key={t}>
            <Caja x={328} y={y} w={124} h={24} r={12} fill="#fef3c7" stroke="#b45309" />
            <Txt x={390} y={y + 16} size={11} peso={700} fill="#78350f">{t}</Txt>
            <Txt x={466} y={y + 16} size={11} fill="#475569" anchor="start">{ex}</Txt>
          </g>
        ))}
        <Caja x={328} y={248} w={198} h={24} r={12} fill="#fee2e2" stroke="#b91c1c" />
        <Txt x={427} y={264} size={11} peso={700} fill="#991b1b">INTERJECCIÓ · visca, hola!</Txt>

        <path d="M240 44 Q150 52 133 62" fill="none" stroke="#475569" strokeWidth="1.6" />
        <path d="M320 44 Q410 52 427 62" fill="none" stroke="#475569" strokeWidth="1.6" />
      </svg>
    </Figura>
  );
}

export function Sintagmes() {
  // Cinco tipos de sintagma según el núcleo, como el mapa del libro.
  const rows: [string, string, string][] = [
    ["SN · nominal", "nucli: nom o pronom", "el pare de Miquel"],
    ["SV · verbal", "nucli: verb", "no anirem a la biblioteca"],
    ["SAdj. · adjectival", "nucli: adjectiu", "un poc cansat"],
    ["SAdv. · adverbial", "nucli: adverbi", "molt lluny de ma casa"],
    ["SPrep. · preposicional", "preposició + SN", "des de ca sa tia"],
  ];
  return (
    <Figura caption="Segons la categoria gramatical del nucli, distingim cinc classes de sintagmes. El nucli és la paraula que mana: si la traiem, el sintagma es trenca.">
      <svg viewBox="0 0 560 236" className="h-auto w-full min-w-[520px] max-w-full" role="img" aria-label="Les cinc classes de sintagmes amb el nucli i un exemple">
        <Caja x={14} y={10} w={172} h={30} r={14} fill="#ecfdf5" stroke="#059669" />
        <Txt x={100} y={30} size={12} peso={700} fill="#047857">CLASSES DE SINTAGMES</Txt>
        {rows.map(([t, nucli, ex], i) => {
          const y = 56 + i * 36;
          return (
            <g key={t}>
              <Caja x={14} y={y} w={172} h={28} fill="#f8fafc" stroke="#94a3b8" />
              <Txt x={100} y={y + 19} size={11.5} peso={700} fill="#334155">{t}</Txt>
              <Caja x={204} y={y} w={170} h={28} fill="#fef3c7" stroke="#b45309" />
              <Txt x={289} y={y + 19} size={11} fill="#78350f">{nucli}</Txt>
              <Txt x={392} y={y + 19} size={11.5} fill="#1e3a8a" anchor="start" cursiva>{ex}</Txt>
              <path d={`M190 ${y + 14} H198`} stroke="#475569" strokeWidth="1.6" />
            </g>
          );
        })}
      </svg>
    </Figura>
  );
}

export function Puntuacio() {
  // Signos principales con su pausa / función, en dos columnas.
  const items: [string, string, string][] = [
    [",", "coma", "pausa xicoteta; enumeracions i incisos"],
    [".", "punt", "final d'oració, paràgraf o text"],
    [";", "punt i coma", "pausa mitjana; separa elements amb comes"],
    [":", "dos punts", "enumeració, exemple o citació"],
    ["…", "punts suspensius", "omissió o suspens"],
    ["! ?", "exclamació / interrogació", "entönació; un sol signe, obert i tancat"],
  ];
  return (
    <Figura caption="Els signes de puntuació no són adorns: marquen les pauses i l'entönació de la lectura. Sense ells, un text no s'entén igual.">
      <svg viewBox="0 0 560 208" className="h-auto w-full min-w-[520px] max-w-full" role="img" aria-label="Els signes de puntuació principals amb la seua funció">
        {items.map(([s, nom, func], i) => {
          const col = i % 2, row = Math.floor(i / 2);
          const x = 14 + col * 276, y = 12 + row * 64;
          return (
            <g key={nom}>
              <Caja x={x} y={y} w={262} h={56} fill="#f8fafc" stroke="#94a3b8" />
              <Caja x={x + 10} y={y + 10} w={44} h={36} r={10} fill="#dbeafe" stroke="#2563eb" />
              <Txt x={x + 32} y={y + 35} size={16} peso={700} fill="#1d4ed8">{s}</Txt>
              <Txt x={x + 66} y={y + 25} size={11.5} peso={700} fill="#334155" anchor="start">{nom}</Txt>
              <Txt x={x + 66} y={y + 43} size={10} fill="#475569" anchor="start">{func}</Txt>
            </g>
          );
        })}
      </svg>
    </Figura>
  );
}

export function Vocals() {
  // Vocals tòniques: 5 grafies, 7 sons; e/o obertes o tancades.
  return (
    <Figura caption="En valencià hi ha cinc grafies vocàliques però set vocals tònicies: la e i la o poden sonar obertes (è, ò) o tancades (é, ó). Les àtones són sempre tancades.">
      <svg viewBox="0 0 560 190" className="h-auto w-full min-w-[520px] max-w-full" role="img" aria-label="Les vocals tònicies en valencià: e i o obertes o tancades">
        <Caja x={14} y={14} w={120} h={36} r={18} fill="#ecfdf5" stroke="#059669" />
        <Txt x={74} y={38} size={13} peso={700} fill="#047857">A · E · I · O · U</Txt>
        <Txt x={74} y={70} size={10.5} fill="#475569">cinc grafies</Txt>
        <Txt x={74} y={86} size={10.5} fill="#475569">set sons tònicis</Txt>

        <Caja x={170} y={14} w={176} h={76} fill="#f8fafc" stroke="#94a3b8" />
        <Txt x={258} y={36} size={12} peso={700} fill="#334155">E tònica</Txt>
        <Txt x={204} y={58} size={11} fill="#1d4ed8" anchor="start">oberta è: mel, pèl</Txt>
        <Txt x={204} y={78} size={11} fill="#b45309" anchor="start">tancada é: paper, gent</Txt>

        <Caja x={370} y={14} w={176} h={76} fill="#f8fafc" stroke="#94a3b8" />
        <Txt x={458} y={36} size={12} peso={700} fill="#334155">O tònica</Txt>
        <Txt x={404} y={58} size={11} fill="#1d4ed8" anchor="start">oberta ò: sol, rock</Txt>
        <Txt x={404} y={78} size={11} fill="#b45309" anchor="start">tancada ó: dolç, color</Txt>

        <Caja x={170} y={106} w={376} h={36} fill="#fef3c7" stroke="#b45309" />
        <Txt x={358} y={129} size={11.5} fill="#78350f">Àtones (i, u i les altres sense accent): sempre tancades</Txt>
        <Caja x={170} y={152} w={376} h={30} fill="#fee2e2" stroke="#b91c1c" />
        <Txt x={358} y={172} size={11} fill="#991b1b">Atenció: mai *Jusep, mai *artista → Josep, artista</Txt>
      </svg>
    </Figura>
  );
}

// Despachador por clave (lo usan la teoría, las actividades y el exportador).
export const FIGS: Record<string, () => ReactElement> = {
  circuit: Circuit,
  funcions: Funcions,
  paraules: Paraules,
  sintagmes: Sintagmes,
  puntuacio: Puntuacio,
  vocals: Vocals,
};

export function Fig({ k }: { k: string }) {
  const C = FIGS[k];
  return C ? <C /> : null;
}
