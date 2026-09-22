"use client";

import { useId, useState, type ReactNode } from "react";

// Diagramas interactivos de la Sesión 2 — «Git es un grafo de bolitas», con el
// lenguaje visual del commit-graph de GitHub: carriles verticales, bolas de
// radio constante con anillo blanco, nombre de rama en píldora monoespaciada en
// la cabecera de cada carril y, en cada paso, la orden que se ejecutó.
//
// COMPONENTE DE CLIENTE: al pulsar (o tocar, o Enter/Espacio con el teclado)
// una bola o un chip de comando, la pieza se resalta y el panel de debajo
// explica qué pasó en el grafo. Sin librerías externas: solo React.
//
// ── REGLAS DE GEOMETRÍA (para que nada se solape al reeditar) ────────────────
//  · Radio de bola R = 11 en TODOS los diagramas (incluida la miniatura), con
//    halo de fondo r = R+4 que abre el hueco por el que pasan los carriles.
//  · Los seis diagramas grandes usan viewBox de 560 de ancho y se pintan 1:1
//    (maxWidth = minWidth = ancho): un fontSize de 16 se ve SIEMPRE a 16 px,
//    también en móvil (allí el diagrama se desliza en horizontal).
//  · Nada de texto por debajo de 16 unidades = 16 px.
//  · Anchos monoespaciados EXACTOS: anchoMono() calcula la caja de chips y
//    píldoras a partir del número de caracteres (0,62 em por carácter cubre
//    Menlo/DejaVu 0,602 con un 3 % de margen), así que las cajas nunca se
//    quedan cortas. El texto sans se coloca en huecos verificados uno a uno.
//  · Márgenes: ningún elemento a menos de 10 unidades del borde del viewBox.
//  · FLECHAS: un único <marker> por tono con markerUnits="userSpaceOnUse" y
//    refX = 10 (la punta cae EXACTAMENTE en el final del trazo) y
//    orient="auto" (la punta gira sola según la dirección del trazo). Por eso
//    todas las líneas y curvas terminan a R+4 = 15 del centro de la bola de
//    destino: la punta queda tangente, con 4 de aire, y nunca clavada dentro.
//    Para que una curva entre derecha, su ÚLTIMO punto de control tiene que
//    estar alineado con el destino (es la tangente que orienta la punta).
//
// Los ids de <marker> y del panel se prefijan con useId() (aquí sí se puede:
// es un Componente de Cliente) para que dos instancias del mismo diagrama en
// la misma página no compartan ids.

// Los colores son tokens CSS (app/globals.css): el mismo dibujo se adapta al
// tema claro/oscuro sin JavaScript. Si alguna vez hay que serializar estos SVG
// para rasterizarlos aislados (como en el PDF de Adaptaciones PT), habrá que
// resolver los `var()` antes: fuera del documento no tienen valor.
// ── Paleta ──────────────────────────────────────────────────────────────────
const TONOS = {
  azul: { linea: "var(--dg-azul-linea)", fuerte: "var(--dg-azul-fuerte)", suave: "var(--dg-azul-suave)", borde: "var(--dg-azul-borde)" },
  morado: { linea: "var(--dg-morado-linea)", fuerte: "var(--dg-morado-fuerte)", suave: "var(--dg-morado-suave)", borde: "var(--dg-morado-borde)" },
  verde: { linea: "var(--dg-verde-linea)", fuerte: "var(--dg-verde-fuerte)", suave: "var(--dg-verde-suave)", borde: "var(--dg-verde-borde)" },
  ambar: { linea: "var(--dg-ambar-linea)", fuerte: "var(--dg-ambar-fuerte)", suave: "var(--dg-ambar-suave)", borde: "var(--dg-ambar-borde)" },
  gris: { linea: "var(--dg-gris-linea)", fuerte: "var(--dg-gris-fuerte)", suave: "var(--dg-gris-suave)", borde: "var(--dg-gris-borde)" },
} as const;

type Tono = keyof typeof TONOS;

const FONDO = "var(--dg-fondo)"; // fondo de la tarjeta: también es el halo de las bolas
const TINTA = "var(--dg-tinta)";
const SUAVE = "var(--dg-suave)";
const TENUE = "var(--dg-tenue)";
const BORRADO = "var(--dg-gris-borde)"; // relleno de las bolas que el reset se lleva por delante

// ── Métricas ────────────────────────────────────────────────────────────────
const R = 11; // radio de bola, constante en todos los diagramas
const HALO = R + 4; // 15: también es la distancia a la que acaban las flechas
const FS = 16; // tamaño base (mínimo legible en móvil)
const FS_MSG = 17; // mensajes de commit
const MONO = 0.62; // ancho de avance por carácter en la pila monoespaciada

const anchoMono = (texto: string, fs = FS) => texto.length * fs * MONO;
const anchoChip = (lineas: string[]) => 22 + Math.max(...lineas.map((l) => anchoMono(`$ ${l}`)));
const altoChip = (n: number) => 32 + 20 * (n - 1);
const anchoBadge = (texto: string) => 22 + anchoMono(texto);

// ── Datos de un paso ────────────────────────────────────────────────────────
type Paso = {
  id: string;
  tono: Tono;
  titulo: string;
  texto: string;
  cmd?: string; // orden de git, sin el «$» (es decoración, no se copia)
  accion?: string; // cuando el paso no es un comando, sino un botón de GitHub
};

type Ctx = {
  sel: string | null;
  activar: (id: string) => void;
  panelId: string;
  uid: string;
};

// ── Marcadores de punta de flecha (uno por tono) ────────────────────────────
function Marcadores({ uid }: { uid: string }) {
  return (
    <defs>
      {(Object.keys(TONOS) as Tono[]).map((t) => (
        <marker
          key={t}
          id={`${uid}-${t}`}
          viewBox="0 0 10 8"
          refX={10}
          refY={4}
          markerWidth={10}
          markerHeight={8}
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M0 0 L10 4 L0 8 Z" fill={TONOS[t].linea} />
        </marker>
      ))}
    </defs>
  );
}

// ── Piezas del grafo ────────────────────────────────────────────────────────

// Tramo de carril (vertical u horizontal) con punta de flecha opcional.
function Tramo({
  x1,
  y1,
  x2,
  y2,
  tono,
  uid,
  punta = true,
  discontinuo = false,
  grosor = 3,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tono: Tono;
  uid: string;
  punta?: boolean;
  discontinuo?: boolean;
  grosor?: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={TONOS[tono].linea}
      strokeWidth={grosor}
      strokeLinecap="butt"
      strokeDasharray={discontinuo ? "7 6" : undefined}
      markerEnd={punta ? `url(#${uid}-${tono})` : undefined}
    />
  );
}

// Curva de bifurcación o de fusión, al estilo del grafo de GitHub.
function Curva({
  d,
  tono,
  uid,
  punta = true,
  discontinua = false,
}: {
  d: string;
  tono: Tono;
  uid: string;
  punta?: boolean;
  discontinua?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={TONOS[tono].linea}
      strokeWidth={3}
      strokeDasharray={discontinua ? "7 6" : undefined}
      markerEnd={punta ? `url(#${uid}-${tono})` : undefined}
    />
  );
}

// Bola de commit: halo del color del fondo (abre hueco en el carril), relleno
// del tono y anillo blanco, como los nodos de github.com/usuario/repo/commits.
function Bola({
  x,
  y,
  tono,
  fusion = false,
  borrada = false,
  signo,
}: {
  x: number;
  y: number;
  tono: Tono;
  fusion?: boolean;
  borrada?: boolean;
  signo?: boolean;
}) {
  const t = TONOS[tono];
  return (
    <>
      <circle cx={x} cy={y} r={HALO} fill={FONDO} />
      {fusion ? (
        <circle cx={x} cy={y} r={R + 3.5} fill="none" stroke={TONOS.morado.linea} strokeWidth={2.5} />
      ) : null}
      <circle
        cx={x}
        cy={y}
        r={R - 1.5}
        fill={borrada ? BORRADO : t.linea}
        stroke="var(--dg-fondo)"
        strokeWidth={3}
      />
      {borrada ? (
        <g stroke={SUAVE} strokeWidth={2.5} strokeLinecap="round">
          <line x1={x - 5} y1={y - 5} x2={x + 5} y2={y + 5} />
          <line x1={x + 5} y1={y - 5} x2={x - 5} y2={y + 5} />
        </g>
      ) : null}
      {signo ? <rect x={x - 5.5} y={y - 1.5} width={11} height={3} rx={1.5} fill="var(--dg-sobre-tono)" /> : null}
    </>
  );
}

// Píldora monoespaciada: nombre de rama (obligatoria en toda rama dibujada),
// HEAD, o el nombre del remoto.
function Badge({ x, y, texto, tono }: { x: number; y: number; texto: string; tono: Tono }) {
  const t = TONOS[tono];
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={anchoBadge(texto)}
        height={28}
        rx={14}
        fill={t.suave}
        stroke={t.linea}
        strokeWidth={1.5}
      />
      <text
        x={x + 11}
        y={y + 19.6}
        className="font-mono"
        fontSize={FS}
        fontWeight={700}
        fill={t.fuerte}
      >
        {texto}
      </text>
    </g>
  );
}

const Hash = ({ x, y, texto }: { x: number; y: number; texto: string }) => (
  <text x={x} y={y + 5.4} className="font-mono" fontSize={FS} fill={TENUE}>
    {texto}
  </text>
);

const Msg = ({ x, y, texto }: { x: number; y: number; texto: string }) => (
  <text x={x} y={y + 5.5} fontSize={FS_MSG} fontWeight={500} fill={TINTA}>
    {texto}
  </text>
);

const Rotulo = ({
  x,
  y,
  texto,
  color = SUAVE,
  peso = 500,
  tam = FS,
  centrado = false,
}: {
  x: number;
  y: number;
  texto: string;
  color?: string;
  peso?: number;
  tam?: number;
  centrado?: boolean;
}) => (
  <text
    x={x}
    y={y}
    fontSize={tam}
    fontWeight={peso}
    fill={color}
    textAnchor={centrado ? "middle" : "start"}
  >
    {texto}
  </text>
);

// ── Interacción ─────────────────────────────────────────────────────────────

// Envoltorio pulsable: ratón, dedo y teclado (Enter / Espacio). El anillo de
// foco se pinta con :focus-visible, así que el teclado siempre deja marca.
function Zona({
  ctx,
  paso,
  etiqueta,
  children,
}: {
  ctx: Ctx;
  paso: string;
  etiqueta: string;
  children: ReactNode;
}) {
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={etiqueta}
      aria-pressed={ctx.sel === paso}
      aria-describedby={ctx.panelId}
      onClick={() => ctx.activar(paso)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
          e.preventDefault();
          ctx.activar(paso);
        }
      }}
      className="group cursor-pointer outline-none"
    >
      {children}
    </g>
  );
}

// Bola pulsable = bola + zona táctil de 48 px + anillos de hover/foco/selección.
function BolaPulsable({
  x,
  y,
  tono,
  ctx,
  paso,
  etiqueta,
  fusion,
  borrada,
  signo,
}: {
  x: number;
  y: number;
  tono: Tono;
  ctx: Ctx;
  paso: string;
  etiqueta: string;
  fusion?: boolean;
  borrada?: boolean;
  signo?: boolean;
}) {
  const t = TONOS[tono];
  return (
    <Zona ctx={ctx} paso={paso} etiqueta={etiqueta}>
      <circle cx={x} cy={y} r={24} fill="transparent" />
      <circle
        cx={x}
        cy={y}
        r={17}
        fill="none"
        stroke={t.borde}
        strokeWidth={3}
        className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />
      <Bola x={x} y={y} tono={tono} fusion={fusion} borrada={borrada} signo={signo} />
      {ctx.sel === paso ? (
        <circle cx={x} cy={y} r={17} fill="none" stroke={t.linea} strokeWidth={3} />
      ) : null}
      <circle
        cx={x}
        cy={y}
        r={21}
        fill="none"
        stroke={TINTA}
        strokeWidth={2}
        strokeDasharray="5 4"
        className="opacity-0 group-focus-visible:opacity-100"
      />
    </Zona>
  );
}

// Chip de comando: la orden que se tecleó en ese paso, pulsable.
function Chip({
  x,
  y,
  lineas,
  tono,
  ctx,
  paso,
}: {
  x: number;
  y: number;
  lineas: string[];
  tono: Tono;
  ctx: Ctx;
  paso: string;
}) {
  const t = TONOS[tono];
  const w = anchoChip(lineas);
  const h = altoChip(lineas.length);
  const activo = ctx.sel === paso;
  return (
    <Zona ctx={ctx} paso={paso} etiqueta={`Ver el paso: ${lineas.join(", después ")}`}>
      {/* Zona táctil: solo 4 de margen, para que dos chips apilados a 8 de
          distancia no se roben el toque el uno al otro. */}
      <rect x={x - 4} y={y - 4} width={w + 8} height={h + 8} fill="transparent" />
      <rect
        x={x - 3}
        y={y - 3}
        width={w + 6}
        height={h + 6}
        rx={11}
        fill="none"
        stroke={t.borde}
        strokeWidth={3}
        className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={activo ? t.suave : "var(--dg-papel)"}
        stroke={t.linea}
        strokeWidth={activo ? 2.5 : 1.5}
        style={{ transition: "fill 150ms ease, stroke-width 150ms ease" }}
      />
      <rect
        x={x - 5}
        y={y - 5}
        width={w + 10}
        height={h + 10}
        rx={12}
        fill="none"
        stroke={TINTA}
        strokeWidth={2}
        strokeDasharray="5 4"
        className="opacity-0 group-focus-visible:opacity-100"
      />
      {lineas.map((linea, i) => (
        <g key={linea}>
          <text
            x={x + 11}
            y={y + 21.6 + 20 * i}
            className="font-mono"
            fontSize={FS}
            fill={TENUE}
            aria-hidden="true"
          >
            $
          </text>
          <text
            x={x + 11 + 2 * FS * MONO}
            y={y + 21.6 + 20 * i}
            className="font-mono"
            fontSize={FS}
            fontWeight={600}
            fill={t.fuerte}
          >
            {linea}
          </text>
        </g>
      ))}
    </Zona>
  );
}

// ── Panel de detalle ────────────────────────────────────────────────────────

function BloqueComando({ cmd }: { cmd: string }) {
  const [copiado, setCopiado] = useState(false);
  return (
    <div className="relative mt-2">
      <pre className="overflow-x-auto rounded-lg bg-zinc-900 px-3 py-2.5 pr-24 font-mono text-[14px] leading-relaxed text-zinc-100">
        <span aria-hidden="true" className="select-none text-zinc-500 dark:text-zinc-400">
          ${" "}
        </span>
        {cmd}
      </pre>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard
            ?.writeText(cmd)
            .then(() => {
              setCopiado(true);
              setTimeout(() => setCopiado(false), 1500);
            })
            .catch(() => setCopiado(false));
        }}
        className="absolute right-2 top-2 rounded-md bg-zinc-700 px-2.5 py-1 text-[12px] font-semibold text-white transition hover:bg-zinc-600"
      >
        {copiado ? "copiado ✓" : "copiar"}
      </button>
    </div>
  );
}

function Panel({ paso, panelId, cerrar }: { paso: Paso | null; panelId: string; cerrar: () => void }) {
  return (
    <div id={panelId} aria-live="polite" className="mt-3">
      {paso ? (
        <div
          className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-3.5 shadow-sm"
          style={{ borderLeftWidth: 6, borderLeftColor: TONOS[paso.tono].linea }}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100">{paso.titulo}</p>
            <button
              type="button"
              onClick={cerrar}
              className="shrink-0 rounded-lg border border-zinc-300 dark:border-white/15 px-2.5 py-1 text-[12px] font-semibold text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-100 dark:hover:bg-white/10"
            >
              cerrar ✕
            </button>
          </div>
          {paso.cmd ? (
            // key por paso: al cambiar de paso, el botón vuelve a decir «copiar»
            <BloqueComando key={paso.id} cmd={paso.cmd} />
          ) : (
            <p className="mt-2 rounded-lg border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-2 text-[14px] font-semibold text-emerald-900 dark:text-emerald-200">
              {paso.accion}
            </p>
          )}
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">{paso.texto}</p>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-zinc-300 dark:border-white/15 bg-white/70 dark:bg-white/5 px-3.5 py-2.5 text-[13px] text-zinc-500 dark:text-zinc-400">
          Toca una bola o un comando del diagrama y aquí te cuento qué hizo Git en ese paso.
        </p>
      )}
    </div>
  );
}

// ── Lienzo común ────────────────────────────────────────────────────────────

function Lienzo({
  ancho,
  alto,
  etiqueta,
  pie,
  pasos,
  dibuja,
}: {
  ancho: number;
  alto: number;
  etiqueta: string;
  pie: string;
  pasos: Paso[];
  dibuja: (ctx: Ctx) => ReactNode;
}) {
  const [sel, setSel] = useState<string | null>(null);
  const bruto = useId();
  const uid = `g${bruto.replace(/[^a-zA-Z0-9]/g, "")}`;
  const panelId = `${uid}-panel`;
  const ctx: Ctx = {
    sel,
    panelId,
    uid,
    activar: (id) => setSel((actual) => (actual === id ? null : id)),
  };
  const activo = pasos.find((p) => p.id === sel) ?? null;
  return (
    <figure className="mt-4 rounded-xl border border-zinc-200 dark:border-white/10 p-3" style={{ background: FONDO }}>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${ancho} ${alto}`}
          role="group"
          aria-label={etiqueta}
          className="mx-auto block w-full"
          style={{ maxWidth: ancho, minWidth: ancho }}
        >
          <Marcadores uid={uid} />
          {dibuja(ctx)}
        </svg>
      </div>
      <p className="mt-1 text-center text-[12px] text-zinc-400 dark:text-zinc-400 sm:hidden">
        Desliza el diagrama de lado para verlo entero
      </p>
      <Panel paso={activo} panelId={panelId} cerrar={() => setSel(null)} />
      <figcaption className="mt-2 text-center text-[13px] font-medium text-zinc-500 dark:text-zinc-400">{pie}</figcaption>
    </figure>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 1 · Cadena de commits (Misión 3)
// Rejilla: carril main en x=52, columna de texto en x=78 (hash) y x=160
// (mensaje). Chips en x=78. Bolas en y=178 / 268 / 358 (paso 90).
// ════════════════════════════════════════════════════════════════════════════
const PASOS_CADENA: Paso[] = [
  {
    id: "init",
    tono: "gris",
    cmd: "git init",
    titulo: "git init · nace el repositorio",
    texto:
      "Git crea una carpeta oculta .git dentro de tu proyecto y empieza a vigilar los cambios. Todavía no hay ninguna bola: el grafo está vacío, solo existe el carril esperando su primer commit.",
  },
  {
    id: "c1",
    tono: "azul",
    cmd: 'git add . && git commit -m "hero con mi nombre"',
    titulo: "Primer commit · aparece la primera bola",
    texto:
      "add prepara los ficheros que quieres guardar y commit hace la foto con su mensaje. Nace la bola a1b2c3d y HEAD se coloca encima: ese es el primer punto al que podrás volver.",
  },
  {
    id: "c2",
    tono: "azul",
    cmd: 'git commit -m "menú móvil"',
    titulo: "Segundo commit · la cadena crece",
    texto:
      "La bola nueva nace enganchada a la anterior con una flecha: 7c4d9e2 viene de a1b2c3d. Esa cadena es tu historia, y por eso el mensaje tiene que explicar el porqué, no decir «cambios».",
  },
  {
    id: "c3",
    tono: "azul",
    cmd: 'git commit -m "footer limpio"',
    titulo: "Tercer commit · HEAD se mueve contigo",
    texto:
      "HEAD es la etiqueta que dice en qué bola estás ahora mismo. Cada commit la arrastra hasta la bola recién creada, así que HEAD siempre marca el último guardado de la rama.",
  },
];

export function CadenaCommits() {
  const commits = [
    { y: 178, hash: "a1b2c3d", msg: "«hero con mi nombre»", paso: "c1" },
    { y: 268, hash: "7c4d9e2", msg: "«menú para el móvil»", paso: "c2" },
    { y: 358, hash: "3f8a1b5", msg: "«footer más limpio»", paso: "c3" },
  ];
  return (
    <Lienzo
      ancho={560}
      alto={414}
      pasos={PASOS_CADENA}
      etiqueta="Grafo de la rama main con tres commits encadenados: git init abre el carril y cada git commit añade una bola nueva enganchada a la anterior; HEAD marca la última."
      pie="Cada commit es una bola nueva enganchada a la anterior, y HEAD siempre apunta a la última. Pulsa cualquier bola o comando. Misión 3."
      dibuja={(ctx) => (
        <>
          <Badge x={41} y={12} texto="main" tono="azul" />
          {/* Carril: discontinuo mientras no hay commits, sólido en cuanto los hay */}
          <Tramo x1={52} y1={46} x2={52} y2={163} tono="azul" uid={ctx.uid} punta={false} discontinuo />
          <Tramo x1={52} y1={189} x2={52} y2={253} tono="azul" uid={ctx.uid} />
          <Tramo x1={52} y1={279} x2={52} y2={343} tono="azul" uid={ctx.uid} />
          <Chip x={78} y={52} lineas={["git init"]} tono="gris" ctx={ctx} paso="init" />
          <Chip
            x={78}
            y={96}
            lineas={["git add .", 'git commit -m "hero con mi nombre"']}
            tono="azul"
            ctx={ctx}
            paso="c1"
          />
          <Chip x={78} y={206} lineas={['git commit -m "menú móvil"']} tono="azul" ctx={ctx} paso="c2" />
          <Chip x={78} y={296} lineas={['git commit -m "footer limpio"']} tono="azul" ctx={ctx} paso="c3" />
          {commits.map((c) => (
            <g key={c.hash}>
              <Hash x={78} y={c.y} texto={c.hash} />
              <Msg x={160} y={c.y} texto={c.msg} />
              <BolaPulsable
                x={52}
                y={c.y}
                tono="azul"
                ctx={ctx}
                paso={c.paso}
                etiqueta={`Ver el commit ${c.hash}, ${c.msg}`}
              />
            </g>
          ))}
          <Badge x={347} y={344} texto="HEAD" tono="ambar" />
          <Rotulo x={280} y={400} texto="cada commit apunta al anterior: eso es la cadena" centrado />
        </>
      )}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 2 · Dos ramas, dos diseños (Misión 5)
// Dos carriles: main en x=52, diseno-morado en x=170. Columna de texto: hash
// en x=196, mensaje en x=278. Chips en x=196 (ancho máximo disponible: 354).
// ════════════════════════════════════════════════════════════════════════════
const PASOS_RAMAS: Paso[] = [
  {
    id: "base",
    tono: "azul",
    cmd: "git log --oneline",
    titulo: "Punto de partida · dónde estás",
    texto:
      "Antes de ramificar, mira la historia: estás en main, con tu web guardada en a1b2c3d. Todo lo que hagas a partir de aquí saldrá de esta bola.",
  },
  {
    id: "crear",
    tono: "morado",
    cmd: "git checkout -b diseno-morado",
    titulo: "Se abre el carril morado",
    texto:
      "-b crea la rama y te salta a ella de un golpe. Todavía no hay ninguna bola morada: la rama arranca justo donde estabas, así que de momento las dos historias son idénticas.",
  },
  {
    id: "morado",
    tono: "morado",
    cmd: 'git commit -m "paleta morada"',
    titulo: "Primera bola en la rama",
    texto:
      "Ahora sí: la bola 7c4d9e2 nace en el carril morado, no en main. Puedes cambiar colores y tipografías a lo bestia, porque main sigue exactamente igual que antes.",
  },
  {
    id: "volver",
    tono: "azul",
    cmd: "git checkout main",
    titulo: "Vuelves al carril azul",
    texto:
      "Este es el momento «wow» de la sesión: al cambiar de rama, los ficheros de tu carpeta cambian solos y la web del navegador vuelve al diseño de main. Misma carpeta, otro universo.",
  },
  {
    id: "azul",
    tono: "azul",
    cmd: 'git commit -m "footer limpio"',
    titulo: "main sigue su camino",
    texto:
      "main avanza con su propia bola sin enterarse del morado. Las dos historias crecen en paralelo y no se pisan: por eso en cualquier empresa nadie experimenta en la rama principal.",
  },
];

export function RamasDosDisenos() {
  return (
    <Lienzo
      ancho={560}
      alto={410}
      pasos={PASOS_RAMAS}
      etiqueta="Dos carriles de commits: main en azul y diseno-morado en morado. La rama morada nace del commit a1b2c3d con git checkout -b, recibe su propio commit, y después main continúa por su cuenta con otro commit."
      pie="main (azul) sigue tranquila; tu experimento (morado) nace de la misma bola y crece en paralelo. Misión 5."
      dibuja={(ctx) => (
        <>
          <Badge x={41} y={12} texto="main" tono="azul" />
          <Badge x={159} y={12} texto="diseno-morado" tono="morado" />
          <line x1={30} y1={50} x2={530} y2={50} stroke="#e4e4e7" strokeWidth={1} />
          {/* Carril morado: el hueco de la columna antes de que nazca la rama */}
          <Tramo
            x1={170}
            y1={58}
            x2={170}
            y2={140}
            tono="morado"
            uid={ctx.uid}
            punta={false}
            discontinuo
            grosor={2}
          />
          {/* main: de A hasta B, recto */}
          <Tramo x1={52} y1={99} x2={52} y2={337} tono="azul" uid={ctx.uid} />
          {/* Bifurcación A → D (el último control está en vertical: la punta entra por arriba) */}
          <Curva d="M 52 95 C 52 150, 170 150, 170 201" tono="morado" uid={ctx.uid} />
          <Hash x={196} y={84} texto="a1b2c3d" />
          <Msg x={278} y={84} texto="«hero y menú listos»" />
          <BolaPulsable
            x={52}
            y={84}
            tono="azul"
            ctx={ctx}
            paso="base"
            etiqueta="Ver el commit a1b2c3d, el punto de partida"
          />
          <Chip x={196} y={112} lineas={["git checkout -b diseno-morado"]} tono="morado" ctx={ctx} paso="crear" />
          <Chip x={196} y={152} lineas={['git commit -m "paleta morada"']} tono="morado" ctx={ctx} paso="morado" />
          <Hash x={196} y={216} texto="7c4d9e2" />
          <Msg x={278} y={216} texto="«todo en morado»" />
          <BolaPulsable
            x={170}
            y={216}
            tono="morado"
            ctx={ctx}
            paso="morado"
            etiqueta="Ver el commit 7c4d9e2 de la rama diseno-morado"
          />
          <Chip x={196} y={248} lineas={["git checkout main"]} tono="azul" ctx={ctx} paso="volver" />
          <Chip x={196} y={288} lineas={['git commit -m "footer limpio"']} tono="azul" ctx={ctx} paso="azul" />
          <Hash x={196} y={352} texto="3f8a1b5" />
          <Msg x={278} y={352} texto="«footer limpio»" />
          <BolaPulsable
            x={52}
            y={352}
            tono="azul"
            ctx={ctx}
            paso="azul"
            etiqueta="Ver el commit 3f8a1b5 de main"
          />
          <Badge x={429} y={338} texto="HEAD" tono="ambar" />
          <Rotulo x={280} y={394} texto="misma carpeta, dos webs distintas según la rama" centrado />
        </>
      )}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 3 · Merge (Misión 6)
// Mismos carriles que el diagrama 2. La bola de fusión (x=52, y=348) recibe
// DOS flechas: la del carril azul y la curva morada que baja desde D.
// ════════════════════════════════════════════════════════════════════════════
const PASOS_MERGE: Paso[] = [
  {
    id: "rama",
    tono: "morado",
    cmd: 'git commit -m "paleta morada"',
    titulo: "La rama termina su diseño",
    texto:
      "El experimento morado ya está listo en su carril. Míralo en el navegador con calma: esto es lo que vas a decidir si entra o no en la web buena.",
  },
  {
    id: "destino",
    tono: "azul",
    cmd: "git checkout main",
    titulo: "Primero, colócate en el destino",
    texto:
      "Un merge siempre trae la otra rama HACIA donde estás. Si te olvidas de este paso, fusionarás al revés. Regla corta: ponte en main y desde ahí llama al morado.",
  },
  {
    id: "merge",
    tono: "verde",
    cmd: "git merge --no-ff diseno-morado",
    titulo: "La fusión: una bola con dos padres",
    texto:
      "Nace e1f2a3b, una bola especial a la que llegan DOS flechas: viene de main y del morado a la vez. --no-ff obliga a dejar esa bola aunque no hiciera falta, y así el grafo cuenta que hubo un experimento y una decisión.",
  },
  {
    id: "limpiar",
    tono: "gris",
    cmd: "git branch -d diseno-morado",
    titulo: "Y se borra la rama sin miedo",
    texto:
      "Los commits del morado ya están dentro de main, así que borrar la rama no borra nada de tu trabajo: solo quita la etiqueta. Ramas que sobran = repositorio ordenado.",
  },
];

export function MergeDiagrama() {
  return (
    <Lienzo
      ancho={560}
      alto={404}
      pasos={PASOS_MERGE}
      etiqueta="Fusión: la rama diseno-morado nace de main, recibe un commit propio, y después una bola de fusión en main recibe dos flechas, la del carril azul y la del carril morado."
      pie="Dos líneas de historia y una bola de fusión con dos flechas de entrada: así entra tu diseño ganador. Misión 6."
      dibuja={(ctx) => (
        <>
          <Badge x={41} y={12} texto="main" tono="azul" />
          <Badge x={159} y={12} texto="diseno-morado" tono="morado" />
          <line x1={30} y1={50} x2={530} y2={50} stroke="#e4e4e7" strokeWidth={1} />
          {/* main: de A a la bola de fusión */}
          <Tramo x1={52} y1={99} x2={52} y2={333} tono="azul" uid={ctx.uid} />
          {/* Bifurcación A → D */}
          <Curva d="M 52 95 C 52 140, 170 130, 170 165" tono="morado" uid={ctx.uid} />
          {/* Fusión D → M: entra por el cuadrante superior derecho de la bola (a 40°
              de la vertical) para no pisar la punta que llega por el carril azul.
              El último control (90.6, 302) está alineado con el centro de M, así
              que la punta apunta exactamente al centro, a 15 de él. */}
          <Curva d="M 170 191 C 170 280, 90.6 302, 61.6 336.5" tono="morado" uid={ctx.uid} />
          <Hash x={196} y={84} texto="a1b2c3d" />
          <Msg x={278} y={84} texto="«base común»" />
          <Bola x={52} y={84} tono="azul" />
          <Chip x={196} y={112} lineas={['git commit -m "paleta morada"']} tono="morado" ctx={ctx} paso="rama" />
          <Hash x={196} y={180} texto="7c4d9e2" />
          <Msg x={278} y={180} texto="«todo en morado»" />
          <BolaPulsable
            x={170}
            y={180}
            tono="morado"
            ctx={ctx}
            paso="rama"
            etiqueta="Ver el commit 7c4d9e2 de la rama diseno-morado"
          />
          <Chip x={196} y={212} lineas={["git checkout main"]} tono="azul" ctx={ctx} paso="destino" />
          <Chip x={196} y={252} lineas={["git merge --no-ff diseno-morado"]} tono="verde" ctx={ctx} paso="merge" />
          <Chip x={196} y={292} lineas={["git branch -d diseno-morado"]} tono="gris" ctx={ctx} paso="limpiar" />
          <Hash x={196} y={348} texto="e1f2a3b" />
          <Msg x={278} y={348} texto="«commit de fusión»" />
          <BolaPulsable
            x={52}
            y={348}
            tono="azul"
            ctx={ctx}
            paso="merge"
            fusion
            etiqueta="Ver el commit de fusión e1f2a3b, la bola con dos padres"
          />
          <Badge x={456} y={334} texto="HEAD" tono="ambar" />
          <Rotulo x={280} y={390} texto="main ya tiene tu diseño ganador dentro" centrado />
        </>
      )}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 4 · Git (tu portátil) vs GitHub (la nube) — Misión 2
// Dos tarjetas de 200 de ancho (16..216 y 344..544) y un pasillo libre de 128
// (216..344) con las tres flechas de sincronización. Los comandos, en chips
// pulsables debajo; al pulsar uno se resalta también su flecha.
// ════════════════════════════════════════════════════════════════════════════
const PASOS_NUBE: Paso[] = [
  {
    id: "commit",
    tono: "gris",
    cmd: 'git commit -m "cambios"',
    titulo: "El commit NO sale de tu portátil",
    texto:
      "Un commit solo escribe en la carpeta .git de tu ordenador. Funciona sin internet, y por eso puedes hacer veinte commits en el tren. Pero mientras no hagas push, en GitHub no hay ni rastro.",
  },
  {
    id: "push",
    tono: "morado",
    cmd: "git push -u origin main",
    titulo: "push · subes tus commits",
    texto:
      "push manda a GitHub las bolas que tienes de más. El -u solo hace falta la primera vez: deja emparejada tu rama main con la de GitHub (origin) para que luego baste con git push.",
  },
  {
    id: "pull",
    tono: "azul",
    cmd: "git pull",
    titulo: "pull · bajas lo que te falta",
    texto:
      "pull trae las bolas que hay en GitHub y no tienes. Lo necesitas cuando tocas el repo desde otro sitio o cuando trabajáis varios: si te dice «2 commits behind», es esto.",
  },
  {
    id: "clone",
    tono: "verde",
    cmd: "git clone https://github.com/ana/mi-web.git",
    titulo: "clone · te traes el repo entero",
    texto:
      "clone se usa UNA vez y en la otra dirección: crea en tu portátil una copia completa del repositorio, con toda su historia. Es lo que harás en la misión bonus con el repo de otra persona.",
  },
];

export function GitVsGithub() {
  return (
    <Lienzo
      ancho={560}
      alto={422}
      pasos={PASOS_NUBE}
      etiqueta="Git y GitHub: a la izquierda tu portátil, con tus ficheros, la carpeta .git y sus commits; a la derecha el repositorio en la nube. Entre los dos, tres flechas: clone baja una vez, push sube y pull baja."
      pie="Git vive dentro de tu portátil (.git); GitHub es la copia que compartes. clone baja una vez; luego push sube y pull baja. Misión 2."
      dibuja={(ctx) => (
        <>
          <Rotulo x={16} y={32} texto="TU PORTÁTIL · Git" color={TINTA} peso={700} tam={FS_MSG} />
          <Rotulo x={344} y={32} texto="GITHUB · la nube" color={TINTA} peso={700} tam={FS_MSG} />
          {/* Nubecita decorativa, a la derecha del rótulo de GitHub */}
          <path
            d="M 516 36 q -8 0 -8 -7 q 0 -6 6 -6.5 q 1 -8.5 9.5 -8.5 q 6.5 0 8.5 5.5 q 2 -2 4.5 -2 q 5.5 0 5.5 5.5 q 6 1 6 6 q 0 7 -7.5 7 z"
            fill="var(--dg-papel)"
            stroke={TENUE}
            strokeWidth={2}
          />
          {/* Tarjeta local */}
          <rect x={16} y={44} width={200} height={164} rx={14} fill="var(--dg-papel)" stroke={TONOS.gris.borde} strokeWidth={2} />
          <rect x={32} y={62} width={168} height={38} rx={9} fill="#f4f4f5" stroke="#e4e4e7" strokeWidth={1.5} />
          <text x={116} y={87} textAnchor="middle" fontSize={FS_MSG} fontWeight={700} fill={TINTA}>
            tus ficheros
          </text>
          <Tramo x1={116} y1={104} x2={116} y2={126} tono="gris" uid={ctx.uid} />
          <Rotulo x={130} y={121} texto="commit" color={TONOS.gris.fuerte} peso={700} />
          <rect x={32} y={130} width={168} height={62} rx={9} fill="#fffbeb" stroke="#fde68a" strokeWidth={1.5} />
          <text x={44} y={154} className="font-mono" fontSize={FS} fontWeight={700} fill={TONOS.ambar.fuerte}>
            .git
          </text>
          <Rotulo x={92} y={154} texto="tu historial" color={SUAVE} />
          <circle cx={48} cy={174} r={7} fill={TONOS.azul.linea} />
          <circle cx={70} cy={174} r={7} fill={TONOS.azul.linea} />
          <circle cx={92} cy={174} r={7} fill={TONOS.azul.linea} />
          <Rotulo x={108} y={179} texto="commits" color={SUAVE} />
          {/* Tarjeta de GitHub */}
          <rect x={344} y={44} width={200} height={164} rx={14} fill="var(--dg-papel)" stroke={TONOS.gris.borde} strokeWidth={2} />
          <rect x={360} y={62} width={168} height={38} rx={9} fill="#f4f4f5" stroke="#e4e4e7" strokeWidth={1.5} />
          <text x={444} y={87} textAnchor="middle" fontSize={FS_MSG} fontWeight={700} fill={TINTA}>
            repo: mi-web
          </text>
          <rect x={360} y={130} width={168} height={62} rx={9} fill="#eff6ff" stroke="#bfdbfe" strokeWidth={1.5} />
          <text x={372} y={154} className="font-mono" fontSize={FS} fontWeight={700} fill={TONOS.azul.fuerte}>
            origin/main
          </text>
          <circle cx={376} cy={174} r={7} fill={TONOS.azul.linea} />
          <circle cx={398} cy={174} r={7} fill={TONOS.azul.linea} />
          <circle cx={420} cy={174} r={7} fill={TONOS.azul.linea} />
          <Rotulo x={436} y={179} texto="commits" color={SUAVE} />
          {/* Pasillo de sincronización: rótulo encima, flecha debajo */}
          <Rotulo x={280} y={81} texto="clone" color={TONOS.verde.fuerte} peso={700} centrado />
          <g opacity={ctx.sel && ctx.sel !== "clone" ? 0.35 : 1} style={{ transition: "opacity 150ms ease" }}>
            <Tramo x1={338} y1={92} x2={222} y2={92} tono="verde" uid={ctx.uid} />
          </g>
          <Rotulo x={280} y={133} texto="push" color={TONOS.morado.fuerte} peso={700} centrado />
          <g opacity={ctx.sel && ctx.sel !== "push" ? 0.35 : 1} style={{ transition: "opacity 150ms ease" }}>
            <Tramo x1={222} y1={144} x2={338} y2={144} tono="morado" uid={ctx.uid} />
          </g>
          <Rotulo x={280} y={185} texto="pull" color={TONOS.azul.fuerte} peso={700} centrado />
          <g opacity={ctx.sel && ctx.sel !== "pull" ? 0.35 : 1} style={{ transition: "opacity 150ms ease" }}>
            <Tramo x1={338} y1={196} x2={222} y2={196} tono="azul" uid={ctx.uid} />
          </g>
          {/* Los cuatro comandos */}
          <Chip x={16} y={232} lineas={['git commit -m "cambios"']} tono="gris" ctx={ctx} paso="commit" />
          <Rotulo x={300} y={253} texto="solo en tu portátil" />
          <Chip x={16} y={272} lineas={["git push -u origin main"]} tono="morado" ctx={ctx} paso="push" />
          <Rotulo x={300} y={293} texto="sube tus commits" />
          <Chip x={16} y={312} lineas={["git pull"]} tono="azul" ctx={ctx} paso="pull" />
          <Rotulo x={152} y={333} texto="baja lo que falta" />
          <Chip
            x={16}
            y={352}
            lineas={["git clone https://github.com/ana/mi-web.git"]}
            tono="verde"
            ctx={ctx}
            paso="clone"
          />
          <Rotulo x={280} y={406} texto="sin push, GitHub no se entera de nada" centrado />
        </>
      )}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 5 · Pull Request (Misión 7, bonus)
// Carriles como en los diagramas 2 y 3. La tarjeta verde de la PR ocupa
// 196..476 en y=240..304; el merge con squash deja UNA bola nueva en main
// (por eso la curva de entrada es discontinua: la historia de la rama no viaja).
// ════════════════════════════════════════════════════════════════════════════
const PASOS_PR: Paso[] = [
  {
    id: "rama",
    tono: "morado",
    cmd: "git checkout -b mejora-texto",
    titulo: "En el repo de otra persona, tu rama",
    texto:
      "Nunca se toca la main de nadie directamente. Te clonas su repo, abres TU rama con un nombre que diga qué propones, y trabajas ahí: si metes la pata, su web no se entera.",
  },
  {
    id: "subir",
    tono: "morado",
    cmd: "git push -u origin mejora-texto",
    titulo: "Subes tu rama a GitHub",
    texto:
      "Tu rama sube a la nube con sus commits. En cuanto llega, GitHub enseña un botón verde de «Compare & pull request»: ya tiene con qué comparar tu rama contra main.",
  },
  {
    id: "pr",
    tono: "verde",
    accion: "Botón «Compare & pull request» en GitHub",
    titulo: "Pull request · pides permiso y revisión",
    texto:
      "Una PR no es un comando: es una conversación. Explicas qué cambias y por qué, la otra persona lo lee, comenta o pide cambios, y cuando le convence le da a aprobar. El check verde es ese visto bueno.",
  },
  {
    id: "squash",
    tono: "verde",
    cmd: "git merge --squash mejora-texto",
    titulo: "Squash and merge · entra en un solo commit",
    texto:
      "Con «Squash and merge», los commits de tu rama se aplastan en UNA bola nueva dentro de main. Por eso la flecha llega de puntos: entran tus cambios, no tu historia. En main queda una línea limpia.",
  },
];

export function PullRequestDiagrama() {
  return (
    <Lienzo
      ancho={560}
      alto={434}
      pasos={PASOS_PR}
      etiqueta="Pull request: en el repositorio de Ana, una rama llamada mejora-texto nace de main con un commit, se sube a GitHub, se abre una pull request aprobada con un check verde, y el squash and merge deja un único commit nuevo en main."
      pie="Así trabajan los equipos: nadie entra en main sin que otra persona revise la PR. Misión 7 (bonus)."
      dibuja={(ctx) => (
        <>
          <Badge x={41} y={12} texto="main" tono="azul" />
          <Badge x={159} y={12} texto="mejora-texto" tono="morado" />
          <line x1={30} y1={50} x2={530} y2={50} stroke="#e4e4e7" strokeWidth={1} />
          <Tramo x1={52} y1={93} x2={52} y2={367} tono="azul" uid={ctx.uid} />
          <Curva d="M 52 89 C 52 130, 170 122, 170 153" tono="morado" uid={ctx.uid} />
          {/* Squash: los cambios entran, la historia de la rama no (curva discontinua).
              Entra a 40° de la vertical para no solaparse con la punta del carril azul. */}
          <Curva d="M 170 179 C 170 300, 90.6 336, 61.6 370.5" tono="verde" uid={ctx.uid} discontinua />
          <Hash x={196} y={78} texto="a1b2c3d" />
          <Msg x={278} y={78} texto="«la web de Ana»" />
          <Bola x={52} y={78} tono="azul" />
          <Chip x={196} y={104} lineas={["git checkout -b mejora-texto"]} tono="morado" ctx={ctx} paso="rama" />
          <Hash x={196} y={168} texto="7c4d9e2" />
          <Msg x={278} y={168} texto="«mejoro un texto»" />
          <BolaPulsable
            x={170}
            y={168}
            tono="morado"
            ctx={ctx}
            paso="rama"
            etiqueta="Ver el commit 7c4d9e2 de tu rama mejora-texto"
          />
          <Chip x={196} y={194} lineas={["git push -u origin mejora-texto"]} tono="morado" ctx={ctx} paso="subir" />
          {/* Tarjeta de la pull request */}
          <Zona ctx={ctx} paso="pr" etiqueta="Ver el paso: abrir la pull request en GitHub">
            <rect x={190} y={234} width={292} height={76} fill="transparent" />
            <rect
              x={193}
              y={237}
              width={286}
              height={70}
              rx={15}
              fill="none"
              stroke={TONOS.verde.borde}
              strokeWidth={3}
              className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            />
            <rect
              x={196}
              y={240}
              width={280}
              height={64}
              rx={12}
              fill={ctx.sel === "pr" ? TONOS.verde.suave : "var(--dg-papel)"}
              stroke={TONOS.verde.linea}
              strokeWidth={ctx.sel === "pr" ? 2.5 : 1.5}
              style={{ transition: "fill 150ms ease, stroke-width 150ms ease" }}
            />
            <rect
              x={190}
              y={234}
              width={292}
              height={76}
              rx={17}
              fill="none"
              stroke={TINTA}
              strokeWidth={2}
              strokeDasharray="5 4"
              className="opacity-0 group-focus-visible:opacity-100"
            />
            <circle cx={218} cy={266} r={11} fill={TONOS.verde.linea} />
            <path
              d="M 213 266 l 3.5 3.5 l 7 -7.5"
              fill="none"
              stroke="var(--dg-sobre-tono)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x={240} y={272} fontSize={FS_MSG} fontWeight={700} fill={TINTA}>
              Pull request #1
            </text>
            <Rotulo x={214} y={294} texto="Ana la revisa y la aprueba" />
          </Zona>
          <Chip x={196} y={318} lineas={["git merge --squash mejora-texto"]} tono="verde" ctx={ctx} paso="squash" />
          <Hash x={196} y={382} texto="e1f2a3b" />
          <Msg x={278} y={382} texto="«Merge PR #1»" />
          <BolaPulsable
            x={52}
            y={382}
            tono="azul"
            ctx={ctx}
            paso="squash"
            etiqueta="Ver el commit e1f2a3b, la pull request ya fusionada en main"
          />
          <Rotulo x={280} y={418} texto="la PR es una rama que pide permiso para entrar" centrado />
        </>
      )}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 6 · Máquina del tiempo: reset vs revert (Misión 4)
// Dos columnas separadas por una divisoria en x=296. Izquierda (reset): carril
// en x=40, textos en x=62. Derecha (revert): carril en x=324, textos en x=346.
// Bolas cada 70: 140, 210, 280 (y 350 solo en revert).
// ════════════════════════════════════════════════════════════════════════════
const PASOS_TIEMPO: Paso[] = [
  {
    id: "reset",
    tono: "ambar",
    cmd: "git reset --hard HEAD~1",
    titulo: "reset · HEAD retrocede y el futuro desaparece",
    texto:
      "HEAD~1 significa «una bola hacia atrás». Con --hard, Git mueve HEAD ahí y deja tus ficheros exactamente como estaban: el commit que sobraba se queda huérfano y desaparece del grafo. Va de lujo mientras el destrozo sea SOLO tuyo.",
  },
  {
    id: "revert",
    tono: "verde",
    cmd: "git revert HEAD",
    titulo: "revert · una bola nueva que anula la anterior",
    texto:
      "revert no borra nada: crea un commit nuevo que deshace lo que hizo el último. La web vuelve a verse bien y la historia queda entera, con el error y con el arreglo. Si ya hiciste push, esta es la buena: nadie se queda con una historia distinta a la tuya.",
  },
];

export function MaquinaDelTiempo() {
  return (
    <Lienzo
      ancho={560}
      alto={412}
      pasos={PASOS_TIEMPO}
      etiqueta="Comparación entre reset y revert en la rama main. Con git reset --hard HEAD~1, HEAD retrocede una bola y el commit que sobraba aparece tachado y en gris. Con git revert HEAD, la historia sigue adelante y se añade una bola verde que anula el commit roto."
      pie="reset borra el futuro; revert lo conserva y añade una bola que anula. Si ya hiciste push, usa revert. Misión 4."
      dibuja={(ctx) => (
        <>
          <line x1={296} y1={8} x2={296} y2={400} stroke="#e4e4e7" strokeWidth={1} />
          {/* ── Columna izquierda: reset ── */}
          <Rotulo x={16} y={30} texto="reset · borras el futuro" color={TINTA} peso={700} tam={FS_MSG} />
          <Chip x={16} y={44} lineas={["git reset --hard HEAD~1"]} tono="ambar" ctx={ctx} paso="reset" />
          <Badge x={29} y={86} texto="main" tono="azul" />
          <Tramo x1={40} y1={155} x2={40} y2={195} tono="azul" uid={ctx.uid} />
          <Tramo x1={40} y1={225} x2={40} y2={265} tono="gris" uid={ctx.uid} punta={false} discontinuo />
          <Msg x={62} y={140} texto="«hero»" />
          <Bola x={40} y={140} tono="azul" />
          <Msg x={62} y={210} texto="«menú móvil»" />
          <Bola x={40} y={210} tono="azul" />
          <Badge x={192} y={196} texto="HEAD" tono="ambar" />
          <Msg x={62} y={280} texto="«lo rompí»" />
          <BolaPulsable
            x={40}
            y={280}
            tono="gris"
            borrada
            ctx={ctx}
            paso="reset"
            etiqueta="Ver el paso: el commit que el reset se lleva por delante"
          />
          {/* Vuelta de HEAD: sale del borde de la bola tachada y entra tangente en «menú móvil» */}
          <Curva d="M 29.4 269.4 C 14 260, 14 234, 29.4 220.6" tono="ambar" uid={ctx.uid} discontinua />
          <Rotulo x={16} y={324} texto="si ya hiciste push, no lo uses" color={TONOS.ambar.fuerte} peso={600} />
          {/* ── Columna derecha: revert ── */}
          <Rotulo x={300} y={30} texto="revert · sin borrar nada" color={TINTA} peso={700} tam={FS_MSG} />
          <Chip x={300} y={44} lineas={["git revert HEAD"]} tono="verde" ctx={ctx} paso="revert" />
          <Badge x={313} y={86} texto="main" tono="azul" />
          <Tramo x1={324} y1={155} x2={324} y2={195} tono="azul" uid={ctx.uid} />
          <Tramo x1={324} y1={225} x2={324} y2={265} tono="azul" uid={ctx.uid} />
          <Tramo x1={324} y1={295} x2={324} y2={335} tono="verde" uid={ctx.uid} />
          <Msg x={346} y={140} texto="«hero»" />
          <Bola x={324} y={140} tono="azul" />
          <Msg x={346} y={210} texto="«menú móvil»" />
          <Bola x={324} y={210} tono="azul" />
          <Msg x={346} y={280} texto="«lo rompí»" />
          <Bola x={324} y={280} tono="azul" />
          <Msg x={346} y={350} texto="«anula lo roto»" />
          <BolaPulsable
            x={324}
            y={350}
            tono="verde"
            signo
            ctx={ctx}
            paso="revert"
            etiqueta="Ver el paso: la bola nueva que anula el commit roto"
          />
          <Rotulo x={300} y={394} texto="la historia queda entera" color={TONOS.verde.fuerte} peso={600} />
        </>
      )}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Miniatura de la intro: el mismo lenguaje visual, en pequeño y sin
// interacción (es el aperitivo de la página, no una misión).
// ════════════════════════════════════════════════════════════════════════════
export function IntroGrafoBolitas() {
  const bruto = useId();
  const uid = `g${bruto.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    // El envoltorio lleva el mismo fondo que los demás diagramas (es el color
    // del halo de las bolas) y su propio scroll horizontal, para que la
    // miniatura no desborde la tarjeta blanca de la página en móvil.
    <div
      className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10 p-3"
      style={{ background: FONDO }}
    >
      <svg
        viewBox="0 0 340 200"
        role="img"
        aria-label="Miniatura de un grafo de Git: dos bolas azules en la rama main, una bola morada en la rama diseno-morado que nace de la primera, y una bola de fusión donde se juntan las dos."
        className="mx-auto block w-full"
        style={{ maxWidth: 340, minWidth: 340 }}
      >
        <Marcadores uid={uid} />
        <Badge x={41} y={10} texto="main" tono="azul" />
        <Badge x={159} y={10} texto="diseno-morado" tono="morado" />
        <Tramo x1={170} y1={44} x2={170} y2={90} tono="morado" uid={uid} punta={false} discontinuo grosor={2} />
        <Tramo x1={52} y1={85} x2={52} y2={155} tono="azul" uid={uid} />
        <Curva d="M 52 85 C 52 115, 170 90, 170 105" tono="morado" uid={uid} />
        <Curva d="M 170 135 C 170 158, 80.8 135.5, 61.6 158.5" tono="morado" uid={uid} />
        <Bola x={52} y={70} tono="azul" />
        <Msg x={196} y={70} texto="«tu web»" />
        <Bola x={170} y={120} tono="morado" />
        <Msg x={196} y={120} texto="«la morada»" />
        <Bola x={52} y={170} tono="azul" fusion />
        <Msg x={196} y={170} texto="«la elegida»" />
      </svg>
    </div>
  );
}
