import type { ReactNode } from "react";

// Diagramas SVG de la Sesión 2 — «Git es un grafo de bolitas».
// Autocontenidos: sin dependencias externas, sin hooks, sin 'use client'.
// Servidor (App Router): componentes puros de JSX. Cada svg lleva viewBox
// responsive (width 100%), aria-label descriptivo y tipografía sans del navegador.
// Paleta coherente con la página: bolas azules #2563eb (main), moradas #7c3aed
// (ramas), flechas gris oscuro #3f3f46, texto casi negro #18181b, verde #059669.

const FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
const AZUL = "#2563eb";
const AZUL_OSCURO = "#1d4ed8";
const MORADO = "#7c3aed";
const MORADO_OSCURO = "#6d28d9";
const TINTA = "#18181b";
const GRAFITO = "#3f3f46";
const SUAVE = "#52525b";
const TENUE = "#71717a";
const APAGADO = "#e4e4e7";
const APAGADO_BORDE = "#a1a1aa";
const VERDE = "#059669";
const VERDE_OSCURO = "#047857";
const AMBAR = "#b45309";

function Marker({ id, color = GRAFITO }: { id: string; color?: string }) {
  return (
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="8"
      refY="5"
      markerWidth="6.5"
      markerHeight="6.5"
      orient="auto-start-reverse"
    >
      <path d="M0 0 L10 5 L0 10 z" fill={color} />
    </marker>
  );
}

function Bola({
  x,
  y,
  r = 26,
  color = AZUL,
  borde = TINTA,
  grosor = 2,
  letra,
  tam = 24,
  colorLetra = "#ffffff",
}: {
  x: number;
  y: number;
  r?: number;
  color?: string;
  borde?: string;
  grosor?: number;
  letra?: string;
  tam?: number;
  colorLetra?: string;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={color} stroke={borde} strokeWidth={grosor} />
      {letra ? (
        <text
          x={x}
          y={y + tam * 0.36}
          textAnchor="middle"
          fontSize={tam}
          fontWeight={800}
          fill={colorLetra}
        >
          {letra}
        </text>
      ) : null}
    </g>
  );
}

function BolaTachada({ x, y, letra }: { x: number; y: number; letra: string }) {
  return (
    <g opacity={0.85}>
      <circle cx={x} cy={y} r={26} fill={APAGADO} stroke={APAGADO_BORDE} strokeWidth={2} />
      <text x={x} y={y + 8} textAnchor="middle" fontSize={24} fontWeight={800} fill={TENUE}>
        {letra}
      </text>
      <line x1={x - 17} y1={y - 17} x2={x + 17} y2={y + 17} stroke={TENUE} strokeWidth={3.5} strokeLinecap="round" />
    </g>
  );
}

function Pill({
  x,
  y,
  w,
  texto,
  color = AMBAR,
  tam = 19,
}: {
  x: number;
  y: number;
  w: number;
  texto: string;
  color?: string;
  tam?: number;
}) {
  const h = 32;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill="#ffffff" stroke={color} strokeWidth={2} />
      <text x={x + w / 2} y={y + h / 2 + tam * 0.36} textAnchor="middle" fontSize={tam} fontWeight={800} fill={color}>
        {texto}
      </text>
    </g>
  );
}

function Fig({
  viewBox,
  etiqueta,
  pie,
  children,
}: {
  viewBox: string;
  etiqueta: string;
  pie: string;
  children: ReactNode;
}) {
  return (
    <figure className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 px-3 pt-3 pb-1">
      <div className="overflow-x-auto">
        <svg
          viewBox={viewBox}
          role="img"
          aria-label={etiqueta}
          className="mx-auto block w-full min-w-[720px]"
          style={{ maxWidth: 720, fontFamily: FONT }}
        >
          {children}
        </svg>
      </div>
      <figcaption className="mt-1.5 text-center text-[13px] font-medium text-zinc-500">{pie}</figcaption>
    </figure>
  );
}

// ── 1 · Cadena de commits ─────────────────────────────────────────────────
export function CadenaCommits() {
  return (
    <Fig
      viewBox="0 0 640 208"
      etiqueta="Cadena de tres commits A, B y C enlazados con flechas; la etiqueta HEAD apunta a C, el último."
      pie="Cada commit es una bola nueva enlazada a la anterior, y HEAD siempre apunta a la última. Misión 3."
    >
      <defs>
        <Marker id="d1-flecha" />
      </defs>
      <Pill x={432} y={16} w={80} texto="HEAD" />
      <line x1={472} y1={48} x2={470} y2={80} stroke={AMBAR} strokeWidth={2} strokeDasharray="4 4" />
      <line x1={120} y1={112} x2={244} y2={112} stroke={GRAFITO} strokeWidth={3} markerEnd="url(#d1-flecha)" />
      <line x1={310} y1={112} x2={434} y2={112} stroke={GRAFITO} strokeWidth={3} markerEnd="url(#d1-flecha)" />
      <Bola x={90} y={112} letra="A" />
      <Bola x={278} y={112} letra="B" />
      <Bola x={468} y={112} letra="C" />
      <text x={90} y={172} textAnchor="middle" fontSize={19} fontWeight={600} fill={TINTA}>
        «añadí el hero»
      </text>
      <text x={278} y={172} textAnchor="middle" fontSize={19} fontWeight={600} fill={TINTA}>
        «dos columnas»
      </text>
      <text x={468} y={172} textAnchor="middle" fontSize={19} fontWeight={600} fill={TINTA}>
        «parche menú»
      </text>
      <text x={612} y={118} textAnchor="end" fontSize={19} fill={SUAVE}>
        estás aquí
      </text>
    </Fig>
  );
}

// ── 2 · Dos ramas, dos diseños ────────────────────────────────────────────
export function RamasDosDisenos() {
  return (
    <Fig
      viewBox="0 0 680 300"
      etiqueta="Ramificación: la rama principal main avanza con commits azules A, B y C; una rama morada nace en B y crece en paralelo con dos commits, uno por cada diseño."
      pie="main (azul) sigue tranquila; tu experimento (morado) nace en B y crece en paralelo. Misión 5."
    >
      <defs>
        <Marker id="d2-flecha" />
        <Marker id="d2-flecha-morado" color={MORADO_OSCURO} />
      </defs>
      <text x={270} y={34} fontSize={19} fontWeight={700} fill={MORADO_OSCURO}>
        rama de experimentos: nada toca main
      </text>
      <path
        d="M 258 192 C 330 190, 372 112, 438 94"
        fill="none"
        stroke={MORADO_OSCURO}
        strokeWidth={3}
        strokeDasharray="7 6"
        markerEnd="url(#d2-flecha-morado)"
      />
      <line x1={110} y1={220} x2={216} y2={220} stroke={GRAFITO} strokeWidth={3} markerEnd="url(#d2-flecha)" />
      <line x1={280} y1={220} x2={386} y2={220} stroke={GRAFITO} strokeWidth={3} markerEnd="url(#d2-flecha)" />
      <line x1={498} y1={92} x2={584} y2={92} stroke={MORADO_OSCURO} strokeWidth={3} markerEnd="url(#d2-flecha-morado)" />
      <Bola x={80} y={220} letra="A" />
      <Bola x={248} y={220} letra="B" />
      <Bola x={418} y={220} letra="C" />
      <Bola x={470} y={92} color={MORADO} letra="D" />
      <Bola x={612} y={92} color={MORADO} letra="E" />
      <text x={520} y={227} fontSize={22} fontWeight={800} fill={TINTA}>
        main
      </text>
      <text x={668} y={227} textAnchor="end" fontSize={19} fontWeight={700} fill={AZUL_OSCURO}>
        azul
      </text>
      <text x={632} y={142} textAnchor="end" fontSize={19} fontWeight={700} fill={MORADO_OSCURO}>
        morado
      </text>
      <text x={280} y={152} fontSize={19} fill={MORADO_OSCURO}>
        nace de B
      </text>
      <text x={340} y={284} textAnchor="middle" fontSize={19} fill={SUAVE}>
        la misma carpeta: dos historias en paralelo, dos webs distintas
      </text>
    </Fig>
  );
}

// ── 3 · Merge ─────────────────────────────────────────────────────────────
export function MergeDiagrama() {
  return (
    <Fig
      viewBox="0 0 680 300"
      etiqueta="Fusión: la línea azul de main y la línea morada de la rama convergen con dos flechas en un commit de fusión más grande, donde HEAD pasa a main."
      pie="Dos líneas de historia, dos flechas, una bola-mayor de fusión: así entra tu diseño ganador. Misión 6."
    >
      <defs>
        <Marker id="d3-flecha" />
        <Marker id="d3-flecha-morado" color={MORADO_OSCURO} />
      </defs>
      <Pill x={500} y={26} w={80} texto="HEAD" />
      <line x1={540} y1={58} x2={550} y2={104} stroke={AMBAR} strokeWidth={2} strokeDasharray="4 4" />
      <line x1={110} y1={210} x2={214} y2={210} stroke={GRAFITO} strokeWidth={3} markerEnd="url(#d3-flecha)" />
      <path
        d="M 268 190 C 306 162, 324 106, 364 96"
        fill="none"
        stroke={MORADO_OSCURO}
        strokeWidth={3}
        strokeDasharray="7 6"
        markerEnd="url(#d3-flecha-morado)"
      />
      <line x1={272} y1={198} x2={510} y2={146} stroke={GRAFITO} strokeWidth={3} markerEnd="url(#d3-flecha)" />
      <line x1={428} y1={106} x2={510} y2={132} stroke={MORADO_OSCURO} strokeWidth={3} markerEnd="url(#d3-flecha-morado)" />
      <Bola x={80} y={210} letra="A" />
      <Bola x={240} y={210} letra="B" />
      <Bola x={400} y={90} color={MORADO} letra="D" />
      <circle cx={552} cy={152} r={40} fill={AZUL} stroke={MORADO} strokeWidth={6} />
      <text x={552} y={160} textAnchor="middle" fontSize={19} fontWeight={800} fill="#ffffff">
        merge
      </text>
      <text x={552} y={224} textAnchor="middle" fontSize={19} fontWeight={700} fill={TINTA}>
        los dos diseños, una decisión
      </text>
      <text x={80} y={262} textAnchor="middle" fontSize={19} fontWeight={800} fill={TINTA}>
        main
      </text>
      <text x={340} y={290} textAnchor="middle" fontSize={19} fill={SUAVE}>
        tras el merge, la rama experimento se borra sin miedo
      </text>
    </Fig>
  );
}

// ── 4 · Git ≠ GitHub ──────────────────────────────────────────────────────
export function GitVsGithub() {
  return (
    <Fig
      viewBox="0 0 720 360"
      etiqueta="Git y GitHub: un portátil con su carpeta .git donde ocurren los commits en local, y una nube de GitHub conectada por flechas: clone baja una vez, push sube, pull baja."
      pie="Git vive dentro de tu portátil (.git); GitHub es la copia que compartes. clone baja una vez; luego push sube y pull baja. Misión 2."
    >
      <defs>
        <Marker id="d4-flecha" />
      </defs>
      {/* Portátil */}
      <rect x={40} y={130} width={240} height={130} rx={14} fill="#ffffff" stroke={GRAFITO} strokeWidth={3} />
      <rect x={22} y={260} width={276} height={12} rx={6} fill={GRAFITO} />
      <path d="M 64 168 h 22 l 6 -10 h -28 z" fill="#fef9c3" stroke="#a16207" strokeWidth={2} />
      <rect x={64} y={166} width={70} height={42} rx={5} fill="#fef9c3" stroke="#a16207" strokeWidth={2} />
      <text x={99} y={194} textAnchor="middle" fontSize={20} fontWeight={800} fill="#854d0e">
        .git
      </text>
      <circle cx={76} cy={236} r={7} fill={AZUL} />
      <circle cx={98} cy={236} r={7} fill={AZUL} />
      <circle cx={120} cy={236} r={7} fill={AZUL} />
      {/* Bucle local de commit */}
      <path
        d="M 200 165 a 28 28 0 1 0 28 28"
        fill="none"
        stroke={GRAFITO}
        strokeWidth={3}
        markerEnd="url(#d4-flecha)"
      />
      <text x={214} y={240} textAnchor="middle" fontSize={19} fontWeight={800} fill={TINTA}>
        commit
      </text>
      <text x={160} y={300} textAnchor="middle" fontSize={19} fontWeight={800} fill={TINTA}>
        tu portátil · Git vive aquí
      </text>
      {/* Nube GitHub */}
      <g transform="translate(-246,-39) scale(1.5)">
        <path
          d="M 480 170 q -36 0 -36 -26 q 0 -22 24 -26 q 3 -32 38 -32 q 28 0 39 21 q 9 -7 20 -7 q 26 0 28 24 q 24 6 24 22 q 0 24 -32 24 z"
          fill="#ffffff"
          stroke={GRAFITO}
          strokeWidth={2}
        />
      </g>
      <text x={549} y={168} textAnchor="middle" fontSize={24} fontWeight={800} fill={TINTA}>
        GitHub
      </text>
      <text x={549} y={196} textAnchor="middle" fontSize={19} fill={SUAVE}>
        copia compartida
      </text>
      {/* Flechas de sincronización */}
      <line x1={430} y1={150} x2={292} y2={162} stroke={GRAFITO} strokeWidth={3} markerEnd="url(#d4-flecha)" />
      <text x={360} y={126} textAnchor="middle" fontSize={19} fontWeight={700} fill={AZUL_OSCURO}>
        clone ↓ (una vez)
      </text>
      <line x1={292} y1={196} x2={428} y2={182} stroke={GRAFITO} strokeWidth={3} markerEnd="url(#d4-flecha)" />
      <text x={360} y={180} textAnchor="middle" fontSize={19} fontWeight={700} fill={MORADO_OSCURO}>
        push ↑ sube lo tuyo
      </text>
      <line x1={428} y1={220} x2={292} y2={240} stroke={GRAFITO} strokeWidth={3} markerEnd="url(#d4-flecha)" />
      <text x={360} y={272} textAnchor="middle" fontSize={19} fontWeight={700} fill={AZUL_OSCURO}>
        pull ↓ baja lo que falta
      </text>
      <text x={360} y={338} textAnchor="middle" fontSize={19} fill={SUAVE}>
        Git funciona sin internet; el commit solo toca tu portátil
      </text>
    </Fig>
  );
}

// ── 5 · Pull Request ──────────────────────────────────────────────────────
export function PullRequestDiagrama() {
  return (
    <Fig
      viewBox="0 0 700 312"
      etiqueta="Pull request: la rama morada de la Persona A propone sus commits mediante una burbuja de revisión con un check verde y un comentario, y una flecha verde la fusiona en main."
      pie="Así trabajan los equipos: nadie entra en main sin que otra persona revise la PR. Misión 7 (bonus)."
    >
      <defs>
        <Marker id="d5-flecha" />
        <Marker id="d5-flecha-verde" color={VERDE} />
        <Marker id="d5-flecha-morado" color={MORADO_OSCURO} />
      </defs>
      <text x={140} y={96} textAnchor="middle" fontSize={19} fontWeight={700} fill={MORADO_OSCURO}>
        rama de la Persona A
      </text>
      <line x1={110} y1={150} x2={166} y2={150} stroke={MORADO_OSCURO} strokeWidth={3} markerEnd="url(#d5-flecha-morado)" />
      <Bola x={82} y={150} color={MORADO} letra="A" />
      <Bola x={194} y={150} color={MORADO} letra="B" />
      {/* Burbuja de PR */}
      <path d="M 262 132 L 236 152 L 262 172 Z" fill="#ffffff" stroke={GRAFITO} strokeWidth={2.5} />
      <rect x={262} y={92} width={238} height={108} rx={16} fill="#ffffff" stroke={GRAFITO} strokeWidth={2.5} />
      <text x={381} y={128} textAnchor="middle" fontSize={21} fontWeight={800} fill={TINTA}>
        PR: ¿revisamos?
      </text>
      <circle cx={294} cy={166} r={13} fill={VERDE} />
      <text x={294} y={172} textAnchor="middle" fontSize={16} fontWeight={800} fill="#ffffff">
        ✓
      </text>
      <text x={316} y={172} fontSize={19} fill={SUAVE}>
        «todo ok, aprobada»
      </text>
      <line x1={506} y1={146} x2={586} y2={146} stroke={VERDE} strokeWidth={3.5} markerEnd="url(#d5-flecha-verde)" />
      <Bola x={624} y={146} letra="M" />
      <text x={624} y={200} textAnchor="middle" fontSize={22} fontWeight={800} fill={TINTA}>
        main
      </text>
      <text x={624} y={228} textAnchor="middle" fontSize={19} fill={SUAVE}>
        entra fusionada
      </text>
      <text x={350} y={288} textAnchor="middle" fontSize={19} fill={SUAVE}>
        la PR es una rama que pide permiso para entrar en main
      </text>
    </Fig>
  );
}

// ── 6 · Máquina del tiempo ────────────────────────────────────────────────
export function MaquinaDelTiempo() {
  return (
    <Fig
      viewBox="0 0 720 380"
      etiqueta="Comparación entre reset y revert: con reset, HEAD retrocede y los commits posteriores aparecen atenuados y tachados; con revert, la historia avanza con una bola nueva con signo menos que anula la anterior."
      pie="reset borra el futuro; revert lo conserva y añade una bola que anula. Si ya hiciste push, usa revert. Misión 4."
    >
      <defs>
        <Marker id="d6-flecha" />
        <Marker id="d6-flecha-verde" color={VERDE} />
      </defs>
      {/* Fila 1: reset */}
      <text x={60} y={30} fontSize={20} fontWeight={800} fill={TINTA}>
        git reset: HEAD retrocede, el futuro desaparece
      </text>
      <path
        d="M 452 66 C 390 22, 296 18, 240 46"
        fill="none"
        stroke={GRAFITO}
        strokeWidth={3}
        strokeDasharray="7 6"
        markerEnd="url(#d6-flecha)"
      />
      <Pill x={170} y={52} w={80} texto="HEAD" />
      <line x1={210} y1={84} x2={210} y2={98} stroke={AMBAR} strokeWidth={2} strokeDasharray="4 4" />
      <line x1={110} y1={122} x2={176} y2={122} stroke={GRAFITO} strokeWidth={3} markerEnd="url(#d6-flecha)" />
      <Bola x={82} y={122} letra="A" />
      <Bola x={210} y={122} letra="B" />
      <BolaTachada x={336} y={122} letra="C" />
      <BolaTachada x={462} y={122} letra="D" />
      <text x={399} y={170} textAnchor="middle" fontSize={19} fontWeight={700} fill={AMBAR}>
        ¡ojo! si ya hiciste push, reescribes la historia
      </text>
      {/* Fila 2: revert */}
      <text x={60} y={230} fontSize={20} fontWeight={800} fill={TINTA}>
        git revert: avanzas con un commit que anula el anterior
      </text>
      <line x1={110} y1={290} x2={176} y2={290} stroke={GRAFITO} strokeWidth={3} markerEnd="url(#d6-flecha)" />
      <line x1={236} y1={290} x2={302} y2={290} stroke={GRAFITO} strokeWidth={3} markerEnd="url(#d6-flecha)" />
      <line x1={362} y1={290} x2={428} y2={290} stroke={GRAFITO} strokeWidth={3} markerEnd="url(#d6-flecha)" />
      <line x1={488} y1={290} x2={530} y2={290} stroke={VERDE} strokeWidth={3.5} markerEnd="url(#d6-flecha-verde)" />
      <Bola x={82} y={290} letra="A" />
      <Bola x={210} y={290} letra="B" />
      <Bola x={336} y={290} letra="C" />
      <Bola x={462} y={290} letra="D" />
      <Bola x={570} y={290} color="#ffffff" borde={VERDE} grosor={4} letra="−" tam={34} colorLetra={VERDE_OSCURO} />
      <text x={570} y={342} textAnchor="middle" fontSize={19} fontWeight={700} fill={VERDE_OSCURO}>
        revierte D
      </text>
      <text x={360} y={370} textAnchor="middle" fontSize={19} fill={SUAVE}>
        la historia nunca miente: revert suma, reset borra
      </text>
    </Fig>
  );
}

// ── Intro: miniatura del grafo ────────────────────────────────────────────
export function IntroGrafoBolitas() {
  return (
    <svg
      viewBox="0 0 360 150"
      role="img"
      aria-label="Miniatura: un grafo de bolitas azules en la línea main con una rama morada que se fusiona en una bola mayor."
      className="mx-auto block w-full"
      style={{ maxWidth: 360, fontFamily: FONT }}
    >
      <defs>
        <Marker id="d0-flecha" />
        <Marker id="d0-flecha-morado" color={MORADO_OSCURO} />
      </defs>
      <line x1={44} y1={104} x2={82} y2={104} stroke={GRAFITO} strokeWidth={2.5} markerEnd="url(#d0-flecha)" />
      <line x1={124} y1={104} x2={292} y2={72} stroke={GRAFITO} strokeWidth={2.5} markerEnd="url(#d0-flecha)" />
      <path
        d="M 116 88 C 142 60, 156 44, 184 40"
        fill="none"
        stroke={MORADO_OSCURO}
        strokeWidth={2.5}
        strokeDasharray="6 5"
        markerEnd="url(#d0-flecha-morado)"
      />
      <line x1={222} y1={48} x2={294} y2={61} stroke={MORADO_OSCURO} strokeWidth={2.5} markerEnd="url(#d0-flecha-morado)" />
      <Bola x={24} y={104} r={20} letra="A" tam={19} />
      <Bola x={104} y={104} r={20} letra="B" tam={19} />
      <Bola x={204} y={36} r={20} color={MORADO} letra="D" tam={19} />
      <circle cx={320} cy={70} r={28} fill={AZUL} stroke={MORADO} strokeWidth={4.5} />
      <text x={320} y={77} textAnchor="middle" fontSize={14} fontWeight={800} fill="#ffffff">
        merge
      </text>
      <text x={54} y={142} textAnchor="middle" fontSize={17} fontWeight={700} fill={TINTA}>
        main
      </text>
      <text x={204} y={12} textAnchor="middle" fontSize={16} fontWeight={700} fill={MORADO_OSCURO}>
        rama
      </text>
    </svg>
  );
}
