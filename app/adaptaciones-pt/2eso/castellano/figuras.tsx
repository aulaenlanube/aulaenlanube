import type { ReactElement } from "react";
import { Figura } from "./ui";

// Iconos y diagramas de Castellano · Adaptaciones PT.
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
export function Circuito() {
  // Rejilla: mensaje (215-345) sobre la flecha emisor(18-144) → receptor(416-542).
  const chips: [number, number, string, string, string, string][] = [
    [18, 170, "CÓDIGO", "el idioma o el sistema de signos", "#ede9fe", "#7c3aed"],
    [196, 168, "CANAL", "por dónde viaja el mensaje", "#dcfce7", "#16a34a"],
    [372, 170, "CONTEXTO", "dónde, cuándo y con quién", "#fef3c7", "#b45309"],
  ];
  return (
    <Figura caption="El circuito de la comunicación: alguien (emisor) manda un mensaje a alguien (receptor). Para que funcione hacen falta un código compartido, un canal y un contexto.">
      <svg viewBox="0 0 560 200" className="h-auto w-full min-w-[520px] max-w-full" role="img" aria-label="Esquema del circuito de la comunicación: emisor, mensaje, receptor, código, canal y contexto">
        <Caja x={215} y={14} w={130} h={36} r={18} fill="#eff6ff" stroke="#2563eb" />
        <Txt x={280} y={38} size={14} peso={700} fill="#1d4ed8">MENSAJE</Txt>
        <path d="M280 50 v26" stroke="#2563eb" strokeWidth="1.6" strokeDasharray="4 4" />

        <Caja x={18} y={62} w={126} h={56} fill="#dbeafe" stroke="#2563eb" />
        <Txt x={81} y={87} size={13} peso={700} fill="#1d4ed8">EMISOR</Txt>
        <Txt x={81} y={104} size={10.5} fill="#475569">habla o escribe</Txt>

        <Caja x={416} y={62} w={126} h={56} fill="#dbeafe" stroke="#2563eb" />
        <Txt x={479} y={87} size={13} peso={700} fill="#1d4ed8">RECEPTOR</Txt>
        <Txt x={479} y={104} size={10.5} fill="#475569">escucha o lee</Txt>

        <path d="M150 90 H403" stroke="#475569" strokeWidth="2.4" />
        <Punta x={414} y={90} />

        {chips.map(([x, w, t, sub, fill, stroke]) => (
          <g key={t}>
            <Caja x={x} y={138} w={w} h={46} fill={fill} stroke={stroke} />
            <Txt x={x + w / 2} y={158} size={12} peso={700} fill={stroke}>{t}</Txt>
            <Txt x={x + w / 2} y={174} size={10.5} fill="#475569">{sub}</Txt>
          </g>
        ))}
      </svg>
    </Figura>
  );
}

// ────────────────────── Fig:sintagma · sustantivo + adjetivo ───────────────
export function Sintagma() {
  return (
    <Figura caption="El sustantivo es el núcleo: manda. El determinante y el adjetivo se le ponen al lado y copian su género y su número.">
      <svg viewBox="0 0 560 190" className="h-auto w-full min-w-[520px] max-w-full" role="img" aria-label="Sintagma nominal las montañas nevadas con determinante, sustantivo núcleo y adjetivo, y la concordancia marcada debajo">
        <Txt x={95} y={44} size={11} peso={700} fill="#b45309">DETERMINANTE</Txt>
        <Txt x={265} y={44} size={11} peso={700} fill="#1d4ed8">SUSTANTIVO (núcleo)</Txt>
        <Txt x={455} y={44} size={11} peso={700} fill="#15803d">ADJETIVO</Txt>

        <Caja x={40} y={54} w={110} h={52} fill="#fef3c7" stroke="#b45309" />
        <Txt x={95} y={89} size={22} peso={700} fill="#78350f">las</Txt>

        <Caja x={170} y={54} w={190} h={52} fill="#dbeafe" stroke="#2563eb" />
        <Txt x={265} y={89} size={22} peso={700} fill="#1e3a8a">montañas</Txt>

        <Caja x={380} y={54} w={150} h={52} fill="#dcfce7" stroke="#16a34a" />
        <Txt x={455} y={89} size={22} peso={700} fill="#14532d">nevadas</Txt>

        <path d="M95 112 Q180 146 265 112" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeDasharray="5 4" />
        <path d="M265 112 Q360 146 455 112" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeDasharray="5 4" />
        <Txt x={280} y={168} size={12} peso={700} fill="#6d28d9">concuerdan en género (femenino) y número (plural)</Txt>
      </svg>
    </Figura>
  );
}

// ───────────────────────── Fig:derivacion · la máquina ─────────────────────
export function Derivacion() {
  return (
    <Figura caption="Derivar es montar una palabra nueva sobre un lexema: delante puede ir un prefijo y detrás un sufijo. El sufijo es el que decide si sale un sustantivo o un adjetivo.">
      <svg viewBox="0 0 560 212" className="h-auto w-full min-w-[520px] max-w-full" role="img" aria-label="Esquema de derivación: prefijo in- más lexema olvid más sufijo -able da el adjetivo inolvidable">
        <Txt x={94} y={30} size={11} peso={700} fill="#b45309">PREFIJO</Txt>
        <Txt x={280} y={30} size={11} peso={700} fill="#1d4ed8">LEXEMA</Txt>
        <Txt x={466} y={30} size={11} peso={700} fill="#15803d">SUFIJO</Txt>

        <Caja x={24} y={40} w={140} h={64} fill="#fef3c7" stroke="#b45309" />
        <Txt x={94} y={74} size={21} peso={700} fill="#78350f">in-</Txt>
        <Txt x={94} y={93} size={10.5} fill="#475569">va delante</Txt>

        <Txt x={178} y={80} size={20} peso={700} fill="#475569">+</Txt>

        <Caja x={192} y={40} w={176} h={64} fill="#dbeafe" stroke="#2563eb" />
        <Txt x={280} y={74} size={21} peso={700} fill="#1e3a8a">olvid</Txt>
        <Txt x={280} y={93} size={10.5} fill="#475569">lleva el significado</Txt>

        <Txt x={382} y={80} size={20} peso={700} fill="#475569">+</Txt>

        <Caja x={396} y={40} w={140} h={64} fill="#dcfce7" stroke="#16a34a" />
        <Txt x={466} y={74} size={21} peso={700} fill="#14532d">-able</Txt>
        <Txt x={466} y={93} size={10.5} fill="#475569">va detrás</Txt>

        <path d="M280 108 v16" stroke="#475569" strokeWidth="2.2" />
        <Punta x={280} y={136} dir="abajo" />

        <Caja x={170} y={140} w={220} h={46} r={23} fill="#ede9fe" stroke="#7c3aed" />
        <Txt x={280} y={170} size={22} peso={700} fill="#5b21b6">inolvidable</Txt>
        <Txt x={280} y={203} size={11.5} peso={700} fill="#6d28d9">palabra derivada · es un ADJETIVO</Txt>
      </svg>
    </Figura>
  );
}

// ─────────────────────── Fig:generos · los tres géneros ────────────────────
export function Generos() {
  return (
    <Figura caption="Los tres géneros se reconocen de un vistazo por su forma: bloques de prosa, versos cortos alineados o réplicas con guion y acotaciones.">
      <svg viewBox="0 0 560 214" className="h-auto w-full min-w-[520px] max-w-full" role="img" aria-label="Comparación de los tres géneros literarios: narrativa en prosa, lírica en verso y teatro en diálogo">
        {/* NARRATIVA · x 20-188 */}
        <Caja x={20} y={20} w={168} h={176} fill="#eff6ff" stroke="#2563eb" />
        <Txt x={104} y={44} size={14} peso={700} fill="#1d4ed8">NARRATIVA</Txt>
        {[68, 80, 92, 104].map((y, i) => (
          <rect key={y} x={36} y={y} width={i === 3 ? 92 : 136} height={5} rx={2.5} fill="#93c5fd" />
        ))}
        <Txt x={104} y={144} size={10.5} fill="#334155">Alguien CUENTA</Txt>
        <Txt x={104} y={159} size={10.5} fill="#334155">una historia, en prosa</Txt>
        <Txt x={104} y={180} size={10.5} peso={700} fill="#1d4ed8">cuento · novela · leyenda</Txt>

        {/* LÍRICA · x 202-370 */}
        <Caja x={202} y={20} w={168} h={176} fill="#faf5ff" stroke="#7c3aed" />
        <Txt x={286} y={44} size={14} peso={700} fill="#6d28d9">LÍRICA</Txt>
        {([[68, 96, "a"], [80, 74, "b"], [92, 100, "a"], [104, 70, "b"]] as [number, number, string][]).map(([y, w, rima]) => (
          <g key={y}>
            <rect x={224} y={y} width={w} height={5} rx={2.5} fill="#c4b5fd" />
            <Txt x={340} y={y + 6} size={10} peso={700} fill="#6d28d9">{rima}</Txt>
          </g>
        ))}
        <Txt x={286} y={144} size={10.5} fill="#334155">Un yo expresa lo que</Txt>
        <Txt x={286} y={159} size={10.5} fill="#334155">siente, en verso y con rima</Txt>
        <Txt x={286} y={180} size={10.5} peso={700} fill="#6d28d9">poema · canción · romance</Txt>

        {/* TEATRO · x 384-552 */}
        <Caja x={384} y={20} w={168} h={176} fill="#fffbeb" stroke="#b45309" />
        <Txt x={468} y={44} size={14} peso={700} fill="#b45309">TEATRO</Txt>
        {[68, 86].map((y) => (
          <g key={y}>
            <Txt x={404} y={y + 5} size={12} peso={700} anchor="start" fill="#b45309">—</Txt>
            <rect x={418} y={y} width={112} height={5} rx={2.5} fill="#fcd34d" />
          </g>
        ))}
        <Txt x={468} y={112} size={10.5} cursiva fill="#78716c">(entra corriendo)</Txt>
        <Txt x={468} y={144} size={10.5} fill="#334155">Los personajes DIALOGAN</Txt>
        <Txt x={468} y={159} size={10.5} fill="#334155">y se escribe para actuarlo</Txt>
        <Txt x={468} y={180} size={10.5} peso={700} fill="#b45309">tragedia · comedia · drama</Txt>
      </svg>
    </Figura>
  );
}

// ────────────────── Fig:acentos · agudas, llanas y esdrújulas ──────────────
type FilaAc = {
  y: number; tipo: string; sils: string[]; tonica: number;
  regla: [string, string]; fill: string; stroke: string;
};
const FILAS_AC: FilaAc[] = [
  { y: 30, tipo: "AGUDA", sils: ["ca", "mión"], tonica: 1, regla: ["Tilde si acaba en", "vocal, -n o -s"], fill: "#dbeafe", stroke: "#2563eb" },
  { y: 92, tipo: "LLANA", sils: ["ár", "bol"], tonica: 0, regla: ["Tilde si NO acaba en", "vocal, -n ni -s"], fill: "#dcfce7", stroke: "#16a34a" },
  { y: 154, tipo: "ESDRÚJULA", sils: ["pá", "ja", "ro"], tonica: 0, regla: ["Tilde SIEMPRE,", "sin excepciones"], fill: "#ede9fe", stroke: "#7c3aed" },
];

export function Acentos() {
  return (
    <Figura caption="La sílaba tónica (la que suena más fuerte) decide el tipo de palabra; el tipo y la letra final deciden si además lleva tilde.">
      <svg viewBox="0 0 560 234" className="h-auto w-full min-w-[520px] max-w-full" role="img" aria-label="Tabla visual de palabras agudas, llanas y esdrújulas con la sílaba tónica destacada y su regla de tilde">
        {FILAS_AC.map((f) => (
          <g key={f.tipo}>
            <Caja x={16} y={f.y} w={112} h={40} fill={f.fill} stroke={f.stroke} />
            <Txt x={72} y={f.y + 25} size={11.5} peso={700} fill={f.stroke}>{f.tipo}</Txt>
            {f.sils.map((sil, i) => {
              const x = 146 + i * 70;
              const on = i === f.tonica;
              return (
                <g key={sil + i}>
                  <Caja x={x} y={f.y} w={62} h={40} r={8} fill={on ? f.fill : "#f8fafc"} stroke={on ? f.stroke : "#cbd5e1"} />
                  <Txt x={x + 31} y={f.y + 26} size={16} peso={on ? 700 : 400} fill={on ? f.stroke : "#64748b"}>{sil}</Txt>
                  {on ? <path d={`M${x + 22} ${f.y - 6} q9 -9 18 0`} fill="none" stroke={f.stroke} strokeWidth="2.2" /> : null}
                </g>
              );
            })}
            <Txt x={368} y={f.y + 18} size={11} anchor="start" fill="#334155">{f.regla[0]}</Txt>
            <Txt x={368} y={f.y + 33} size={11} anchor="start" fill="#334155">{f.regla[1]}</Txt>
          </g>
        ))}
        <Txt x={280} y={218} size={11.5} peso={700} fill="#475569">El acento (golpe de voz) lo tienen todas; la tilde solo cuando lo manda la regla.</Txt>
      </svg>
    </Figura>
  );
}

// ─────────────────── Fig:silabas · golpes de voz y tónica ──────────────────
const SILS = ["bi", "blio", "te", "ca"];
const TONICA = 2;

export function Silabas() {
  // 4 cajas de 96 con separación 10 → 414 de ancho, centradas en 560: x0 = 73.
  return (
    <Figura caption="Cada sílaba es un golpe de voz. Una sola suena más fuerte que las demás: esa es la sílaba tónica.">
      <svg viewBox="0 0 560 162" className="h-auto w-full min-w-[520px] max-w-full" role="img" aria-label="La palabra biblioteca separada en cuatro sílabas con la sílaba tónica te destacada">
        {SILS.map((sil, i) => {
          const x = 73 + i * 106;
          const on = i === TONICA;
          return (
            <g key={sil}>
              <Caja x={x} y={48} w={96} h={48} r={10} fill={on ? "#fde68a" : "#f8fafc"} stroke={on ? "#b45309" : "#94a3b8"} />
              <Txt x={x + 48} y={81} size={22} peso={on ? 700 : 400} fill={on ? "#78350f" : "#475569"}>{sil}</Txt>
              <circle cx={x + 48} cy={32} r={on ? 10 : 6} fill={on ? "#f59e0b" : "#e2e8f0"} stroke={on ? "#b45309" : "#94a3b8"} strokeWidth="1.6" />
            </g>
          );
        })}
        <Txt x={333} y={18} size={11} peso={700} fill="#b45309">suena más fuerte</Txt>
        <Txt x={280} y={122} size={13} peso={700} fill="#78350f">4 sílabas = 4 golpes de voz</Txt>
        <Txt x={280} y={144} size={11} fill="#475569">La tónica es «te»: bi-blio-TE-ca. Las otras tres son átonas.</Txt>
      </svg>
    </Figura>
  );
}

// Despachador por clave (lo usan la teoría, las actividades y el exportador).
export const FIGS: Record<string, () => ReactElement> = {
  circuito: Circuito,
  sintagma: Sintagma,
  derivacion: Derivacion,
  generos: Generos,
  acentos: Acentos,
  silabas: Silabas,
};

export function Fig({ k }: { k: string }) {
  const C = FIGS[k];
  return C ? <C /> : null;
}
