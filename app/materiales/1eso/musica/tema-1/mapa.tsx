import type { Idioma } from "../../../_idioma";
import { Glifo, Matis, MATISOS, Nota, Silenci, type Figura } from "../../../_musica/notacion";

// ════════════════════════════════════════════════════════════════════════════
// Mapa conceptual del tema 1 en UNA página (A4 apaisado: 1120 × 792).
//
// Es un único SVG con colores LITERALES (nada de var() ni currentColor): el
// botón de descarga lo serializa tal cual y lo rasteriza aislado para el PNG y
// el PDF, donde los tokens CSS no resolverían. Por eso también fija su tipo de
// letra (Helvetica/Arial) en vez de heredar el de la página.
//
// Geometría: todas las coordenadas son explícitas. Cabecera 0-50; raíz y las
// dos ramas 58-174; a la izquierda, la rama 1 (tres conceptos colgados de una
// columna vertebral en x = 36); a la derecha, la rama 2 en rejilla 2 × 2
// (columnas de 321 px con hueco de 20; el tronco central pasa por x = 761).
// Los textos van ya partidos en líneas que caben en su caja (se comprueba en
// el navegador midiendo cada <text> con getBBox).
// ════════════════════════════════════════════════════════════════════════════

export const MAPA_W = 1120;
export const MAPA_H = 792;

const FONT = "Helvetica, Arial, sans-serif";
const INK = "#18181b";
const MUTED = "#52525b";
const ENLLAC = "#475569";
const LINIA = "#94a3b8";

const C = {
  so: { c: "#0284c7", bg: "#f0f9ff" },
  soroll: { c: "#ea580c", bg: "#fff7ed" },
  silenci: { c: "#475569", bg: "#f8fafc" },
  altura: { c: "#dc2626", bg: "#fef2f2" },
  duracio: { c: "#d97706", bg: "#fffbeb" },
  intensitat: { c: "#059669", bg: "#ecfdf5" },
  timbre: { c: "#0d9488", bg: "#f0fdfa" },
};

const TX = {
  ca: {
    titol: "Tema 1 · El so i les seues qualitats",
    sub: "Música · 1r d'ESO · Mapa conceptual (llibre, pàg. 8-14)",
    arrel: "EL SO",
    b1: "1 · SO, SOROLL I SILENCI",
    b2: "2 · LES QUALITATS DEL SO",
    e1: "què és i què no és",
    e2: "té quatre",
    so: {
      enllac: "el so naix quan",
      titol: "UN COS VIBRA",
      linies: [
        "Produeix **ones sonores** que viatgen per un",
        "medi: l'aire, l'aigua, la fusta…",
        "L'**orella** les capta: el **timpà** vibra i envia",
        "la informació al **cervell**.",
        "**So**: sensació que ens arriba a l'orella per la",
        "vibració d'un **cos sonor**.",
      ],
    },
    soroll: {
      enllac: "no és el mateix que el",
      titol: "SOROLL",
      ona1: "so: ona regular",
      ona2: "soroll: ona irregular",
      linies: [
        "Excés de soroll = **contaminació acústica**.",
        "Danya la salut: comunicació, son, estrès,",
        "pèrdua d'oïda, conductes agressives.",
        "Fonts: transport, indústria,",
        "construcció i zones d'oci.",
        "Es mesura en **decibels (dB)** amb el",
        "**sonòmetre**.",
      ],
    },
    silenci: {
      enllac: "la seua absència és el",
      titol: "SILENCI",
      linies: [
        "**Absència** de so o soroll.",
        "La combinació de so i silenci és la",
        "**base de la creació musical**.",
        "Clau en la composició i la interpretació.",
      ],
    },
    altura: {
      titol: "ALTURA",
      sub: "greus ↔ aguts",
      linies: [
        "Distingeix sons **greus** i **aguts**.",
        "Es mesura en **hertzs (Hz)**:",
        "més Hz (vibracions/s) → **més agut**.",
        "Oïm de **20 Hz** a **20 000 Hz**.",
        "Per davall de 20 Hz: **infrasons**.",
        "Per damunt de 20 000 Hz: **ultrasons**.",
        "Es representa amb el **pentagrama** (5 línies",
        "i 4 espais), la **clau** i les **notes**:",
      ],
    },
    duracio: {
      titol: "DURACIÓ",
      sub: "llargs ↔ curts",
      linies: ["Distingeix sons **llargs** i **curts**.", "Es representa amb **figures** i **silencis**:"],
      noms: ["redona", "blanca", "negra", "corxera", "semicorx."],
      meitat: "Cada figura val **la meitat** que l'anterior.",
      barres: "**Barres de repetició**: cal repetir…",
      rep1: "des del principi",
      rep2: "el fragment entre les dues barres",
    },
    intensitat: {
      titol: "INTENSITAT",
      sub: "forts ↔ suaus",
      linies: ["Distingeix sons **forts** i **suaus**.", "**Matisos**, de més suau a més fort:"],
      reguladors: "**Reguladors**:",
      cresc: "**crescendo**: augmentar a poc a poc",
      dim: "**diminuendo**: disminuir a poc a poc",
    },
    timbre: {
      titol: "TIMBRE",
      sub: "qui o què sona",
      linies: ["Indica **qui o què** produeix el so.", "Així reconeixem **la veu** o", "**l'instrument** que sona."],
      exemple: "Exemple del llibre (pàg. 11)",
      instruments: "Xilòfon (fusta) i metal·lòfon (metall):",
      punts: [
        "**Altura**: plaques menudes → més agut",
        "**Duració**: el metal·lòfon dura més",
        "**Intensitat**: més força → més fort",
        "**Timbre**: cada instrument, el seu color",
      ],
    },
    peu: "aulaenlanube.com · Materials de 1r d'ESO · Música",
    llegir: "Es llig: concepte → *paraules d'enllaç* → concepte",
  },
  es: {
    titol: "Tema 1 · El sonido y sus cualidades",
    sub: "Música · 1.º ESO · Mapa conceptual (libro, pág. 8-14)",
    arrel: "EL SONIDO",
    b1: "1 · SONIDO, RUIDO Y SILENCIO",
    b2: "2 · LAS CUALIDADES DEL SONIDO",
    e1: "qué es y qué no es",
    e2: "tiene cuatro",
    so: {
      enllac: "el sonido nace cuando",
      titol: "UN CUERPO VIBRA",
      linies: [
        "Produce **ondas sonoras** que viajan por un",
        "medio: el aire, el agua, la madera…",
        "El **oído** las capta: el **tímpano** vibra y envía",
        "la información al **cerebro**.",
        "**Sonido**: sensación que nos llega al oído por",
        "la vibración de un **cuerpo sonoro**.",
      ],
    },
    soroll: {
      enllac: "no es lo mismo que el",
      titol: "RUIDO",
      ona1: "sonido: onda regular",
      ona2: "ruido: onda irregular",
      linies: [
        "Exceso de ruido = **contaminación acústica**.",
        "Daña la salud: comunicación, sueño, estrés,",
        "pérdida de oído, conductas agresivas.",
        "Fuentes: transporte, industria,",
        "construcción y zonas de ocio.",
        "Se mide en **decibelios (dB)** con el",
        "**sonómetro**.",
      ],
    },
    silenci: {
      enllac: "su ausencia es el",
      titol: "SILENCIO",
      linies: [
        "**Ausencia** de sonido o ruido.",
        "La combinación de sonido y silencio es la",
        "**base de la creación musical**.",
        "Clave en la composición y la interpretación.",
      ],
    },
    altura: {
      titol: "ALTURA",
      sub: "graves ↔ agudos",
      linies: [
        "Distingue sonidos **graves** y **agudos**.",
        "Se mide en **hercios (Hz)**:",
        "más Hz (vibraciones/s) → **más agudo**.",
        "Oímos de **20 Hz** a **20 000 Hz**.",
        "Por debajo de 20 Hz: **infrasonidos**.",
        "Por encima de 20 000 Hz: **ultrasonidos**.",
        "Se representa con el **pentagrama** (5 líneas",
        "y 4 espacios), la **clave** y las **notas**:",
      ],
    },
    duracio: {
      titol: "DURACIÓN",
      sub: "largos ↔ cortos",
      linies: ["Distingue sonidos **largos** y **cortos**.", "Se representa con **figuras** y **silencios**:"],
      noms: ["redonda", "blanca", "negra", "corchea", "semicorch."],
      meitat: "Cada figura vale **la mitad** que la anterior.",
      barres: "**Barras de repetición**: hay que repetir…",
      rep1: "desde el principio",
      rep2: "el fragmento entre las dos barras",
    },
    intensitat: {
      titol: "INTENSIDAD",
      sub: "fuertes ↔ suaves",
      linies: ["Distingue sonidos **fuertes** y **suaves**.", "**Matices**, de más suave a más fuerte:"],
      reguladors: "**Reguladores**:",
      cresc: "**crescendo**: aumentar poco a poco",
      dim: "**diminuendo**: disminuir poco a poco",
    },
    timbre: {
      titol: "TIMBRE",
      sub: "quién o qué suena",
      linies: ["Indica **quién o qué** produce el sonido.", "Así reconocemos **la voz** o", "**el instrumento** que suena."],
      exemple: "Ejemplo del libro (pág. 11)",
      instruments: "Xilófono (madera) y metalófono (metal):",
      punts: [
        "**Altura**: láminas pequeñas → más agudo",
        "**Duración**: el metalófono dura más",
        "**Intensidad**: más fuerza → más fuerte",
        "**Timbre**: cada instrumento, su color",
      ],
    },
    peu: "aulaenlanube.com · Materiales de 1.º ESO · Música",
    llegir: "Se lee: concepto → *palabras de enlace* → concepto",
  },
};

// ── Piezas ──────────────────────────────────────────────────────────────────

/** Línea de texto con **negrita** y *cursiva*. */
function Txt({
  x,
  y,
  s,
  size = 13,
  fill = INK,
  anchor,
  weight,
  italic,
}: {
  x: number;
  y: number;
  s: string;
  size?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  weight?: number;
  italic?: boolean;
}) {
  const parts = s.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return (
    <text x={x} y={y} fontSize={size} fill={fill} textAnchor={anchor} fontWeight={weight} fontStyle={italic ? "italic" : undefined}>
      {parts.map((p, i) =>
        p.startsWith("**") ? (
          <tspan key={i} fontWeight={700}>{p.slice(2, -2)}</tspan>
        ) : p.startsWith("*") && p.length > 2 ? (
          <tspan key={i} fontStyle="italic">{p.slice(1, -1)}</tspan>
        ) : (
          <tspan key={i}>{p}</tspan>
        ),
      )}
    </text>
  );
}

/** Caja de concepto. `banda`: cabecera de color (qualitats); si no, título de color. */
function Caixa({
  x,
  y,
  w,
  h,
  tono,
  titol,
  sub,
  banda,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tono: { c: string; bg: string };
  titol: string;
  sub?: string;
  banda?: boolean;
}) {
  return (
    <g data-caixa={`${x},${y},${w},${h}`}>
      <rect x={x} y={y} width={w} height={h} rx={12} fill={tono.bg} stroke={tono.c} strokeWidth={2} />
      {banda ? (
        <>
          <path d={`M ${x} ${y + 40} V ${y + 12} Q ${x} ${y} ${x + 12} ${y} H ${x + w - 12} Q ${x + w} ${y} ${x + w} ${y + 12} V ${y + 40} Z`} fill={tono.c} />
          <Txt x={x + 14} y={y + 26} s={titol} size={16} weight={700} fill="#ffffff" />
          {sub && <Txt x={x + w - 14} y={y + 26} s={sub} size={13} fill="#ffffff" anchor="end" />}
        </>
      ) : (
        <Txt x={x + 14} y={y + 24} s={titol} size={15} weight={700} fill={tono.c} />
      )}
    </g>
  );
}

function Linies({ x, y, linies, lh = 17, size = 13 }: { x: number; y: number; linies: string[]; lh?: number; size?: number }) {
  return (
    <>
      {linies.map((s, i) => (
        <Txt key={i} x={x} y={y + i * lh} s={s} size={size} />
      ))}
    </>
  );
}

/** Etiqueta de enlace sobre una línea: texto en cursiva con fondo blanco. */
function Enllac({ x, y, s }: { x: number; y: number; s: string }) {
  const w = s.length * 6.4 + 16;
  return (
    <g>
      <rect x={x - w / 2} y={y - 10} width={w} height={20} rx={10} fill="#ffffff" stroke={LINIA} strokeWidth={1} />
      <Txt x={x} y={y + 4.5} s={s} size={12.5} fill={ENLLAC} anchor="middle" italic />
    </g>
  );
}

function onda(x0: number, ample: number, yMig: number, f: (t: number) => number): string {
  const pts: string[] = [];
  for (let t = 0; t <= ample; t += 2) pts.push(`${x0 + t},${(yMig - f(t)).toFixed(1)}`);
  return "M" + pts.join(" L");
}

/** Pentagrama mini: cinc línies des de `y0`. */
function Pauta({ x1, x2, y0, sp }: { x1: number; x2: number; y0: number; sp: number }) {
  return (
    <g stroke={INK} strokeWidth={0.8}>
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={x1} x2={x2} y1={y0 + i * sp} y2={y0 + i * sp} />
      ))}
    </g>
  );
}

/** Barres de repetició en miniatura (sp = 4): `inici` afig «||:» a 1/3 del pentagrama. */
function MiniRepeticio({ x, y0, inici }: { x: number; y0: number; inici?: boolean }) {
  const sp = 4;
  const w = 48;
  const mig = y0 + 2 * sp;
  return (
    <g fill={INK}>
      <Pauta x1={x} x2={x + w} y0={y0} sp={sp} />
      {inici && (
        <>
          <rect x={x + 14} y={y0} width={2.5} height={4 * sp} />
          <rect x={x + 18.5} y={y0} width={0.9} height={4 * sp} />
          <circle cx={x + 22} cy={mig - 2} r={1.1} />
          <circle cx={x + 22} cy={mig + 2} r={1.1} />
        </>
      )}
      <circle cx={x + w - 7} cy={mig - 2} r={1.1} />
      <circle cx={x + w - 7} cy={mig + 2} r={1.1} />
      <rect x={x + w - 4.4} y={y0} width={0.9} height={4 * sp} />
      <rect x={x + w - 2.5} y={y0} width={2.5} height={4 * sp} />
    </g>
  );
}

// ── Disposició ──────────────────────────────────────────────────────────────

// Columna esquerra: x 50-400. Altura de cada caixa segons les seues línies.
const ESQ_X = 50;
const ESQ_W = 350;
const ONES_H = 56;
const alt = (n: number, extra = 0) => 34 + extra + n * 17 + 12;
const H_SO = alt(TX.ca.so.linies.length);
const H_SOROLL = alt(TX.ca.soroll.linies.length, ONES_H);
const H_SILENCI = alt(TX.ca.silenci.linies.length);
const GAP = 30;
const Y_SO = 204;
const Y_SOROLL = Y_SO + H_SO + GAP;
const Y_SILENCI = Y_SOROLL + H_SOROLL + GAP;

// Rejilla dreta.
const COL1 = 430;
const COL2 = 771;
const COL_W = 321;
const FILA1 = 212;
const FILA1_H = 272;
const FILA2 = 504;
const FILA2_H = 254;

const FIGURES: Figura[] = ["redona", "blanca", "negra", "corxera", "semicorxera"];
const VALORS = ["4", "2", "1", "½", "¼"];
const NOTES = ["do", "re", "mi", "fa", "sol", "la", "si", "do"];

export function MapaConceptual({ l, id }: { l: Idioma; id: string }) {
  const t = TX[l];
  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${MAPA_W} ${MAPA_H}`}
      width={MAPA_W}
      height={MAPA_H}
      role="img"
      aria-label={`${t.titol}. ${t.sub}`}
      fontFamily={FONT}
      className="block h-auto w-full min-w-[900px] print:min-w-0"
    >
      <rect width={MAPA_W} height={MAPA_H} fill="#ffffff" />

      {/* Capçalera */}
      <Txt x={28} y={34} s={t.titol} size={21} weight={700} />
      <Txt x={1092} y={34} s={t.sub} size={13} fill={MUTED} anchor="end" />
      <line x1={28} x2={1092} y1={46} y2={46} stroke="#e4e4e7" strokeWidth={1.5} />

      {/* Arrel i branques */}
      <g stroke={LINIA} strokeWidth={2} fill="none">
        <line x1={500} y1={106} x2={214} y2={138} />
        <line x1={620} y1={106} x2={761} y2={138} />
        {/* columna esquerra */}
        <line x1={36} y1={174} x2={36} y2={Y_SILENCI + 24} />
        {[Y_SO, Y_SOROLL, Y_SILENCI].map((y) => (
          <line key={y} x1={36} y1={y + 24} x2={ESQ_X} y2={y + 24} />
        ))}
        {/* arbre de les qualitats */}
        <line x1={761} y1={174} x2={761} y2={494} />
        <path d={`M ${COL1 + COL_W / 2} ${FILA1} V 194 H ${COL2 + COL_W / 2} V ${FILA1}`} />
        <path d={`M ${COL1 + COL_W / 2} ${FILA2} V 494 H ${COL2 + COL_W / 2} V ${FILA2}`} />
      </g>
      <rect x={440} y={58} width={240} height={48} rx={24} fill="#1e293b" />
      <Txt x={560} y={89} s={t.arrel} size={22} weight={700} fill="#ffffff" anchor="middle" />
      <rect x={28} y={138} width={372} height={36} rx={10} fill="#0369a1" />
      <Txt x={214} y={162} s={t.b1} size={15} weight={700} fill="#ffffff" anchor="middle" />
      <rect x={430} y={138} width={662} height={36} rx={10} fill="#6d28d9" />
      <Txt x={761} y={162} s={t.b2} size={15} weight={700} fill="#ffffff" anchor="middle" />
      <Enllac x={357} y={122} s={t.e1} />
      <Enllac x={690} y={122} s={t.e2} />

      {/* ── Rama 1 ── */}
      <Txt x={ESQ_X + 6} y={Y_SO - 8} s={t.so.enllac} size={12.5} fill={ENLLAC} italic />
      <Caixa x={ESQ_X} y={Y_SO} w={ESQ_W} h={H_SO} tono={C.so} titol={t.so.titol} />
      <Linies x={ESQ_X + 14} y={Y_SO + 46} linies={t.so.linies} />

      <Txt x={ESQ_X + 6} y={Y_SOROLL - 8} s={t.soroll.enllac} size={12.5} fill={ENLLAC} italic />
      <Caixa x={ESQ_X} y={Y_SOROLL} w={ESQ_W} h={H_SOROLL} tono={C.soroll} titol={t.soroll.titol} />
      <g fill="none" strokeWidth={2.2} strokeLinejoin="round">
        <path d={onda(ESQ_X + 22, 140, Y_SOROLL + 52, (x) => 11 * Math.sin((2 * Math.PI * x) / 28))} stroke="#0284c7" />
        <path
          d={onda(ESQ_X + 188, 140, Y_SOROLL + 52, (x) => 6 * Math.sin((2 * Math.PI * x) / 21) + 4.5 * Math.sin((2 * Math.PI * x) / 9.3 + 1) + 2.5 * Math.sin((2 * Math.PI * x) / 4.1 + 2))}
          stroke="#ea580c"
        />
      </g>
      <Txt x={ESQ_X + 92} y={Y_SOROLL + 80} s={t.soroll.ona1} size={11.5} fill={MUTED} anchor="middle" />
      <Txt x={ESQ_X + 258} y={Y_SOROLL + 80} s={t.soroll.ona2} size={11.5} fill={MUTED} anchor="middle" />
      <Linies x={ESQ_X + 14} y={Y_SOROLL + 46 + ONES_H} linies={t.soroll.linies} />

      <Txt x={ESQ_X + 6} y={Y_SILENCI - 8} s={t.silenci.enllac} size={12.5} fill={ENLLAC} italic />
      <Caixa x={ESQ_X} y={Y_SILENCI} w={ESQ_W} h={H_SILENCI} tono={C.silenci} titol={t.silenci.titol} />
      <Linies x={ESQ_X + 14} y={Y_SILENCI + 46} linies={t.silenci.linies} />

      {/* ── Rama 2: ALTURA ── */}
      <Caixa x={COL1} y={FILA1} w={COL_W} h={FILA1_H} tono={C.altura} titol={t.altura.titol} sub={t.altura.sub} banda />
      <Linies x={COL1 + 14} y={FILA1 + 60} linies={t.altura.linies} />
      <g fill={INK}>
        <Pauta x1={COL1 + 14} x2={COL1 + COL_W - 14} y0={FILA1 + 214} sp={7} />
        <Glifo n="gClef" x={COL1 + 18} y={FILA1 + 235} sp={7} />
        {NOTES.map((n, i) => {
          const x = COL1 + 58 + i * 31;
          const y = FILA1 + 249 - i * 3.5;
          return (
            <g key={i}>
              {i === 0 && <line x1={x - 3} x2={x + 14.8} y1={y} y2={y} stroke={INK} strokeWidth={0.8} />}
              <Glifo n="noteheadWhole" x={x} y={y} sp={7} />
              <Txt x={x + 6} y={FILA1 + 266} s={n} size={11} fill={MUTED} anchor="middle" />
            </g>
          );
        })}
      </g>

      {/* DURACIÓ */}
      <Caixa x={COL2} y={FILA1} w={COL_W} h={FILA1_H} tono={C.duracio} titol={t.duracio.titol} sub={t.duracio.sub} banda />
      <Linies x={COL2 + 14} y={FILA1 + 60} linies={t.duracio.linies} />
      <g fill={INK}>
        {FIGURES.map((f, i) => {
          const cx = COL2 + 46 + i * 58;
          return (
            <g key={f}>
              <Nota f={f} x={cx - 16} y={FILA1 + 134} sp={8} />
              <Silenci f={f} x={cx + 4} y={FILA1 + 126} sp={8} />
              {/* Sense pentagrama, la redona i la blanca (silencis) necessiten la seua línia: penja / s'hi recolza. */}
              {(f === "redona" || f === "blanca") && (
                <line x1={cx + 1} x2={cx + 16} y1={FILA1 + (f === "redona" ? 118 : 126)} y2={FILA1 + (f === "redona" ? 118 : 126)} stroke={INK} strokeWidth={0.9} />
              )}
              <Txt x={cx} y={FILA1 + 160} s={VALORS[i]} size={15} weight={700} anchor="middle" />
              <Txt x={cx} y={FILA1 + 175} s={t.duracio.noms[i]} size={11} fill={MUTED} anchor="middle" />
            </g>
          );
        })}
      </g>
      <Txt x={COL2 + 14} y={FILA1 + 197} s={t.duracio.meitat} />
      <Txt x={COL2 + 14} y={FILA1 + 217} s={t.duracio.barres} />
      <MiniRepeticio x={COL2 + 16} y0={FILA1 + 226} />
      <Txt x={COL2 + 74} y={FILA1 + 238} s={t.duracio.rep1} size={12.5} />
      <MiniRepeticio x={COL2 + 16} y0={FILA1 + 248} inici />
      <Txt x={COL2 + 74} y={FILA1 + 260} s={t.duracio.rep2} size={12.5} />

      {/* INTENSITAT */}
      <Caixa x={COL1} y={FILA2} w={COL_W} h={FILA2_H} tono={C.intensitat} titol={t.intensitat.titol} sub={t.intensitat.sub} banda />
      <Linies x={COL1 + 14} y={FILA2 + 60} linies={t.intensitat.linies} />
      <g fill={INK}>
        {MATISOS.map((m, i) => {
          const cx = COL1 + 38 + i * 49;
          return (
            <g key={m.m}>
              <Matis text={m.m} cx={cx} y={FILA2 + 112} sp={11} />
              <Txt x={cx} y={FILA2 + (i % 2 ? 146 : 132)} s={m.nom} size={11} fill={MUTED} anchor="middle" italic />
            </g>
          );
        })}
      </g>
      <path
        d={`M ${COL1 + 290} ${FILA2 + 154} L ${COL1 + 20} ${FILA2 + 160} L ${COL1 + 290} ${FILA2 + 166}`}
        fill="none"
        stroke={C.intensitat.c}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Txt x={COL1 + 14} y={FILA2 + 192} s={t.intensitat.reguladors} />
      <path d={`M ${COL1 + 50} ${FILA2 + 203} L ${COL1 + 18} ${FILA2 + 208} L ${COL1 + 50} ${FILA2 + 213}`} fill="none" stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
      <Txt x={COL1 + 60} y={FILA2 + 212} s={t.intensitat.cresc} />
      <path d={`M ${COL1 + 18} ${FILA2 + 225} L ${COL1 + 50} ${FILA2 + 230} L ${COL1 + 18} ${FILA2 + 235}`} fill="none" stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
      <Txt x={COL1 + 60} y={FILA2 + 234} s={t.intensitat.dim} />

      {/* TIMBRE */}
      <Caixa x={COL2} y={FILA2} w={COL_W} h={FILA2_H} tono={C.timbre} titol={t.timbre.titol} sub={t.timbre.sub} banda />
      <Linies x={COL2 + 14} y={FILA2 + 60} linies={t.timbre.linies} />
      <rect x={COL2 + 12} y={FILA2 + 118} width={COL_W - 24} height={124} rx={8} fill="#ffffff" stroke="#99f6e4" strokeWidth={1.5} />
      <Txt x={COL2 + 24} y={FILA2 + 138} s={t.timbre.exemple} size={12.5} weight={700} fill={C.timbre.c} />
      <Txt x={COL2 + 24} y={FILA2 + 157} s={t.timbre.instruments} size={12} fill={MUTED} />
      {t.timbre.punts.map((p, i) => (
        <g key={i}>
          <circle cx={COL2 + 28} cy={FILA2 + 172 + i * 18} r={4} fill={[C.altura.c, C.duracio.c, C.intensitat.c, C.timbre.c][i]} />
          <Txt x={COL2 + 38} y={FILA2 + 176 + i * 18} s={p} size={12} />
        </g>
      ))}

      {/* Peu */}
      <Txt x={28} y={781} s={t.llegir} size={11.5} fill={MUTED} />
      <Txt x={1092} y={781} s={t.peu} size={11.5} fill={MUTED} anchor="end" />
    </svg>
  );
}

// Comprobación de geometría en el build: la columna izquierda no puede pisar el pie.
if (Y_SILENCI + H_SILENCI > 768) throw new Error(`Mapa: la rama 1 se sale (${Y_SILENCI + H_SILENCI} > 768)`);
