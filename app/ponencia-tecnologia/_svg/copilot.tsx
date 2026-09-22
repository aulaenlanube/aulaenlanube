"use client";

import {
  AMPLIO,
  Caja,
  FS,
  FS_TIT,
  FONDO,
  Lienzo,
  Parrafo,
  Pildora,
  Rotulo,
  SUAVE,
  TENUE,
  TINTA,
  TONOS,
  Tramo,
  Zona,
  altoCaja,
  parteEnLineas,
  type Ctx,
  type Paso,
  type Tono,
} from "./base";

// ════════════════════════════════════════════════════════════════════════════
// Diagramas del BLOQUE 2 · Copilot: el kit que ya tienes.
//
// Dos piezas: el MAPA (dónde vive cada Copilot y de qué cuenta cuelga) y el
// ÁRBOL (cuál abres para cada encargo). Toda la geometría sale de constantes
// con nombre; para reordenar columnas basta con cambiar COL_MS / COL_GH.
// ════════════════════════════════════════════════════════════════════════════

// ── Pictogramas de 28 × 28, trazados (sin relleno) ──────────────────────────

type Pictograma = "chat" | "documento" | "imagen" | "cuaderno" | "codigo" | "agente";

function Glifo({ x, y, tipo, color }: { x: number; y: number; tipo: Pictograma; color: string }) {
  const comun = {
    stroke: color,
    strokeWidth: 2.2,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden="true">
      {tipo === "chat" ? (
        <>
          <rect x={2} y={3} width={24} height={17} rx={5} {...comun} />
          <path d="M8 20 L8 26 L15 20" {...comun} />
        </>
      ) : null}
      {tipo === "documento" ? (
        <>
          <rect x={5} y={2} width={18} height={24} rx={3} {...comun} />
          <path d="M10 9 H18 M10 14 H18 M10 19 H15" {...comun} />
        </>
      ) : null}
      {tipo === "imagen" ? (
        <>
          <rect x={2} y={5} width={24} height={18} rx={4} {...comun} />
          <circle cx={9} cy={11} r={2.6} {...comun} />
          <path d="M4 20 L11 14 L16 19 L20 16 L24 20" {...comun} />
        </>
      ) : null}
      {tipo === "cuaderno" ? (
        <>
          <rect x={6} y={2} width={18} height={24} rx={3} {...comun} />
          <path d="M11 2 V26 M4 7 H11 M4 14 H11 M4 21 H11" {...comun} />
        </>
      ) : null}
      {tipo === "codigo" ? (
        <>
          <path d="M10 6 L3 14 L10 22" {...comun} />
          <path d="M18 6 L25 14 L18 22" {...comun} />
        </>
      ) : null}
      {tipo === "agente" ? (
        <>
          <rect x={4} y={9} width={20} height={15} rx={5} {...comun} />
          <path d="M14 3 V9" {...comun} />
          <circle cx={14} cy={3} r={2} {...comun} />
          <path d="M10 15.5 H10.01 M18 15.5 H18.01" {...comun} strokeWidth={3.4} />
        </>
      ) : null}
    </g>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 1 · El mapa: de qué cuenta cuelga cada Copilot
// Rejilla: cuentas en y = 46 (alto 32); repartidor horizontal en y = 106;
// fila de herramientas en y = 128, alto 116. Familia Microsoft de x = 16 a 522
// (4 columnas de 119, hueco 10) y familia GitHub de x = 552 a 844 (2 de 140).
// ════════════════════════════════════════════════════════════════════════════

const Y_CUENTA = 46;
const H_CUENTA = 32;
const Y_REPARTO = 106;
const Y_FILA = 128;
const H_FILA = 116;

type Herramienta = {
  id: string;
  x: number;
  w: number;
  tono: Tono;
  glifo: Pictograma;
  lineas: string[];
};

const COL_MS: Herramienta[] = [
  { id: "chat", x: 16, w: 119, tono: "azul", glifo: "chat", lineas: ["Copilot", "Chat"] },
  { id: "imagenes", x: 145, w: 119, tono: "morado", glifo: "imagen", lineas: ["Imágenes", "y láminas"] },
  { id: "cuadernos", x: 274, w: 119, tono: "morado", glifo: "cuaderno", lineas: ["Cuadernos", "y páginas"] },
  { id: "study", x: 403, w: 119, tono: "verde", glifo: "documento", lineas: ["Study and", "Learn"] },
];

const COL_GH: Herramienta[] = [
  { id: "vscode", x: 552, w: 140, tono: "verde", glifo: "codigo", lineas: ["Copilot en", "VS Code"] },
  { id: "agente", x: 704, w: 140, tono: "ambar", glifo: "agente", lineas: ["Modo", "agente"] },
];

const PASOS_MAPA: Paso[] = [
  {
    id: "cuenta-ms",
    tono: "azul",
    titulo: "Tu cuenta @edu.gva.es es la llave",
    texto:
      "Todo lo de la izquierda cuelga de la Identitat Digital con la que entras al correo del centro. La Conselleria asigna licencia educativa de Microsoft 365 a todo el profesorado, alumnado y personal de los centros públicos de titularidad de la Generalitat, en dos modalidades: A1 y A3. Desde octubre de 2025, las A3 van a familias concretas de FP, centros a distancia, conservatorios, enseñanzas artísticas superiores, EOI y CEFIRE; el resto del profesorado, un IES ordinario incluido, tiene A1: Office solo en web, 50 GB de correo, 100 GB de OneDrive y Teams.",
    clave: "Con A1 o con A3, Copilot Chat entra igual. No hay que instalar ni pagar nada aparte.",
  },
  {
    id: "chat",
    tono: "azul",
    titulo: "Copilot Chat · tu mesa de trabajo",
    texto:
      "Es donde vas a pasar el 80 % del tiempo: esqueletos de tema, reformulaciones al lenguaje del currículo, supuestos didácticos, rúbricas, correos difíciles y el simulador de tribunal. Con la cuenta del centro incluye búsqueda web, subida y análisis de ficheros, y protección de datos: lo que le pegas no alimenta el entrenamiento de los modelos. Se abre en la aplicación de Copilot, en el navegador, en Edge, en Outlook y en Teams.",
    clave: "Si solo te quedas con una herramienta de toda la sesión, que sea esta.",
  },
  {
    id: "imagenes",
    tono: "morado",
    titulo: "Imágenes y láminas de aula",
    texto:
      "La generación de imágenes viene incluida en el propio Copilot Chat con la cuenta educativa. Aquí nacen las láminas didácticas, los carteles y las portadas de unidad que luego proyectas o imprimes. La calidad depende casi por completo del prompt: una lámina buena lleva siete piezas, y las tienes en el bloque 4.",
    clave: "Revisa siempre los textos que salen dentro de la imagen: los generadores todavía escriben con faltas.",
  },
  {
    id: "cuadernos",
    tono: "morado",
    titulo: "Cuadernos y páginas",
    texto:
      "La parte que casi nadie usa y la que más tiempo ahorra a medio plazo. Un cuaderno reúne tus fuentes —apuntes, normativa, un PDF largo— y a partir de ahí preguntas solo sobre ellas, con guía de estudio y mapa mental incluidos. Una página es un borrador que se queda abierto, se edita y se comparte con un compañero de preparación.",
    clave: "Un cuaderno por tema fuerte: dentro metes tus fuentes y preguntas solo sobre lo tuyo.",
  },
  {
    id: "study",
    tono: "verde",
    titulo: "Study and Learn · el agente educativo",
    texto:
      "Un agente de Microsoft pensado para estudiar, disponible con las licencias educativas A1, A3 y A5 y con Copilot Chat activado. En vez de darte la respuesta, te guía con preguntas hasta que la sacas tú. Para un opositor es un compañero de repaso; para tu futura aula, la forma de que el alumnado use IA sin que le resuelva el ejercicio.",
  },
  {
    id: "cuenta-gh",
    tono: "verde",
    titulo: "Tu cuenta de GitHub, aparte y gratuita",
    texto:
      "Esta no depende del centro: te la abres tú en dos minutos. Y aquí está la mejor noticia de este bloque: GitHub Education ofrece GitHub Copilot Pro sin coste al profesorado verificado. Se solicita en github.com/education/teachers con el correo institucional y una prueba del vínculo laboral, y GitHub revisa la elegibilidad cada mes.",
    clave: "Solicítalo hoy aunque todavía no vayas a programar: la verificación tarda, y el plan gratuito normal se queda corto enseguida.",
  },
  {
    id: "vscode",
    tono: "verde",
    titulo: "Copilot dentro de VS Code",
    texto:
      "El editor de código con Copilot integrado: te completa mientras escribes y te responde en un chat lateral que sí ve los ficheros de tu proyecto. El plan gratuito limita los completados y las peticiones de chat al mes; con Pro de docente, los completados de código pasan a ser ilimitados y puedes elegir el modelo.",
  },
  {
    id: "agente",
    tono: "ambar",
    titulo: "El modo agente · aquí nacen las apps",
    texto:
      "La diferencia con el chat normal es enorme: en modo agente no te contesta, actúa. Crea ficheros, los edita, ejecuta órdenes en la terminal, lee el error que sale y vuelve a intentarlo. Está disponible también en el plan gratuito. Las dos aplicaciones del bloque 5 salieron de aquí, cada una de un solo prompt bien escrito.",
    clave: "El chat te dice cómo hacerlo. El agente lo hace, y te enseña el resultado para que lo verifiques tú.",
  },
  {
    id: "frontera",
    tono: "gris",
    titulo: "La frontera que conviene tener clara",
    texto:
      "Las cuatro de la izquierda trabajan con texto, documentos e imágenes: viven en el navegador. Las dos de la derecha trabajan con una carpeta de tu ordenador y crean ficheros de verdad. Confundirlas es lo que lleva a pedirle a un chat que «te haga la aplicación» y recibir un tocho de código que nadie ejecuta nunca.",
    clave: "Texto → izquierda. Ficheros y proyecto → derecha.",
  },
];

function Bloque({
  h,
  ctx,
  etiqueta,
}: {
  h: Herramienta;
  ctx: Ctx;
  etiqueta: string;
}) {
  const t = TONOS[h.tono];
  const activo = ctx.sel === h.id;
  const cx = h.x + h.w / 2;
  return (
    <Zona ctx={ctx} paso={h.id} etiqueta={etiqueta}>
      <rect
        x={h.x - 5}
        y={Y_FILA - 5}
        width={h.w + 10}
        height={H_FILA + 10}
        rx={16}
        fill="none"
        stroke={t.borde}
        strokeWidth={3}
        className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />
      <rect
        x={h.x}
        y={Y_FILA}
        width={h.w}
        height={H_FILA}
        rx={12}
        fill={activo ? t.suave : "var(--dg-papel)"}
        stroke={t.linea}
        strokeWidth={activo ? 2.5 : 1.5}
        style={{ transition: "fill 150ms ease, stroke-width 150ms ease" }}
      />
      <rect
        x={h.x - 8}
        y={Y_FILA - 8}
        width={h.w + 16}
        height={H_FILA + 16}
        rx={18}
        fill="none"
        stroke={TINTA}
        strokeWidth={2}
        strokeDasharray="5 4"
        className="opacity-0 group-focus-visible:opacity-100"
      />
      <Glifo x={cx - 14} y={Y_FILA + 18} tipo={h.glifo} color={t.linea} />
      <Parrafo
        x={cx}
        y={Y_FILA + 76}
        lineas={h.lineas}
        color={t.fuerte}
        peso={700}
        tam={FS}
        interlineado={20}
        ancla="middle"
      />
    </Zona>
  );
}

export function MapaCopilot() {
  const lineasFrontera = parteEnLineas(
    "Las cuatro de la izquierda trabajan con texto, documentos e imágenes. Las dos de la derecha trabajan con una carpeta de tu ordenador: crean ficheros de verdad.",
    72,
  );
  const yFrontera = Y_FILA + H_FILA + 26;
  const hFrontera = altoCaja(lineasFrontera.length);
  const alto = yFrontera + hFrontera + 16;

  const cxMs = (COL_MS[0].x + COL_MS[COL_MS.length - 1].x + COL_MS[COL_MS.length - 1].w) / 2;
  const cxGh = (COL_GH[0].x + COL_GH[COL_GH.length - 1].x + COL_GH[COL_GH.length - 1].w) / 2;

  return (
    <Lienzo
      ancho={AMPLIO}
      alto={alto}
      pasos={PASOS_MAPA}
      etiqueta="Mapa de Copilot: de la cuenta del centro cuelgan Copilot Chat, la generación de imágenes, los cuadernos y páginas, y el agente Study and Learn; de una cuenta de GitHub cuelgan Copilot en VS Code y su modo agente."
      pie="Dos cuentas, seis herramientas, un solo nombre comercial. Pulsa cualquiera para ver qué hace y cuándo usarla."
      dibuja={(ctx) => (
        <>
          <Rotulo x={16} y={28} texto="TODO ESTO SE LLAMA «COPILOT»" tam={FS} peso={800} color={TINTA} />
          <Rotulo
            x={AMPLIO - 16}
            y={28}
            texto="y no es lo mismo"
            tam={FS}
            peso={500}
            color={TENUE}
            ancla="end"
          />

          {/* ── Familia Microsoft ─────────────────────────────────────── */}
          <Zona ctx={ctx} paso="cuenta-ms" etiqueta="Ver: tu cuenta del centro, Microsoft 365 A1 o A3">
            <g className="group-hover:opacity-80">
              <Pildora
                x={16}
                y={Y_CUENTA}
                texto="Tu cuenta del centro · Microsoft 365 A1 / A3"
                tono="azul"
                alto={H_CUENTA}
              />
            </g>
          </Zona>
          <Tramo
            x1={cxMs}
            y1={Y_CUENTA + H_CUENTA}
            x2={cxMs}
            y2={Y_REPARTO}
            tono="azul"
            uid={ctx.uid}
            punta={false}
            grosor={2.5}
          />
          <line
            x1={COL_MS[0].x + COL_MS[0].w / 2}
            y1={Y_REPARTO}
            x2={COL_MS[3].x + COL_MS[3].w / 2}
            y2={Y_REPARTO}
            stroke={TONOS.azul.linea}
            strokeWidth={2.5}
          />
          {COL_MS.map((h) => (
            <Tramo
              key={`b-${h.id}`}
              x1={h.x + h.w / 2}
              y1={Y_REPARTO}
              x2={h.x + h.w / 2}
              y2={Y_FILA - 6}
              tono={h.tono}
              uid={ctx.uid}
              grosor={2.5}
            />
          ))}

          {/* ── Familia GitHub ────────────────────────────────────────── */}
          <Zona ctx={ctx} paso="cuenta-gh" etiqueta="Ver: tu cuenta de GitHub">
            <g className="group-hover:opacity-80">
              <Pildora x={552} y={Y_CUENTA} texto="Tu cuenta de GitHub · gratis" tono="verde" alto={H_CUENTA} />
            </g>
          </Zona>
          <Tramo
            x1={cxGh}
            y1={Y_CUENTA + H_CUENTA}
            x2={cxGh}
            y2={Y_REPARTO}
            tono="verde"
            uid={ctx.uid}
            punta={false}
            grosor={2.5}
          />
          <line
            x1={COL_GH[0].x + COL_GH[0].w / 2}
            y1={Y_REPARTO}
            x2={COL_GH[1].x + COL_GH[1].w / 2}
            y2={Y_REPARTO}
            stroke={TONOS.verde.linea}
            strokeWidth={2.5}
          />
          {COL_GH.map((h) => (
            <Tramo
              key={`b-${h.id}`}
              x1={h.x + h.w / 2}
              y1={Y_REPARTO}
              x2={h.x + h.w / 2}
              y2={Y_FILA - 6}
              tono={h.tono}
              uid={ctx.uid}
              grosor={2.5}
            />
          ))}

          {/* Separador entre familias */}
          <line
            x1={537}
            y1={Y_CUENTA - 6}
            x2={537}
            y2={Y_FILA + H_FILA + 6}
            stroke={TONOS.gris.borde}
            strokeWidth={2}
            strokeDasharray="6 7"
          />

          {[...COL_MS, ...COL_GH].map((h) => (
            <Bloque key={h.id} h={h} ctx={ctx} etiqueta={`Ver: ${h.lineas.join(" ")}`} />
          ))}

          <Caja
            x={16}
            y={yFrontera}
            w={AMPLIO - 32}
            h={hFrontera}
            tono="gris"
            ctx={ctx}
            paso="frontera"
            titulo="La frontera que conviene tener clara"
            lineas={lineasFrontera}
            relleno={TONOS.gris.suave}
          />
        </>
      )}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 2 · El árbol: ¿cuál abro para esto?
// Rejilla: raíz centrada en y = 24 (alto 56); cuatro ramas que bajan a las
// columnas de x = 16, 227, 438 y 649 (ancho 195, hueco 16).
// ════════════════════════════════════════════════════════════════════════════

const RAIZ_W = 330;
const RAIZ_X = (AMPLIO - RAIZ_W) / 2;
const RAIZ_Y = 22;
const RAIZ_H = 56;
const Y_COND = 150;
const H_COND = 96;
const Y_HERR = 288;
const H_HERR = 74;
const COL_W = 195;
const COLS = [16, 227, 438, 649];

type Rama = {
  id: string;
  tono: Tono;
  condicion: string[];
  herramienta: string[];
  glifo: Pictograma;
};

const RAMAS: Rama[] = [
  {
    id: "r-texto",
    tono: "azul",
    condicion: ["Un texto: tema,", "resumen, supuesto,", "rúbrica, correo"],
    herramienta: ["Copilot Chat"],
    glifo: "chat",
  },
  {
    id: "r-doc",
    tono: "morado",
    condicion: ["Un PDF largo, unos", "apuntes, normativa:", "algo que ya existe"],
    herramienta: ["Chat con el", "fichero adjunto"],
    glifo: "documento",
  },
  {
    id: "r-img",
    tono: "rosa",
    condicion: ["Una lámina, un", "cartel, un esquema", "para proyectar"],
    herramienta: ["El generador", "de imágenes"],
    glifo: "imagen",
  },
  {
    id: "r-app",
    tono: "ambar",
    condicion: ["Una aplicación,", "un simulador,", "código que se ejecuta"],
    herramienta: ["VS Code,", "modo agente"],
    glifo: "agente",
  },
];

const PASOS_ARBOL: Paso[] = [
  {
    id: "raiz",
    tono: "gris",
    titulo: "La pregunta que evita el 90 % de los disgustos",
    texto:
      "Casi todas las decepciones con la IA salen de haber abierto la herramienta equivocada: pedirle una aplicación a un chat, o pedirle un texto a un generador de imágenes. Antes de escribir nada, decide qué tipo de cosa quieres que exista al final.",
    clave: "¿Qué quiero que exista cuando termine: un texto, un documento, una imagen o un programa?",
  },
  {
    id: "r-texto",
    tono: "azul",
    titulo: "Quiero un texto → Copilot Chat",
    texto:
      "Esqueletos de tema, supuestos didácticos, reformulaciones al lenguaje del currículo, rúbricas, criterios de evaluación, correos a familias, el simulador de tribunal. Todo lo que acaba siendo palabras empieza aquí.",
  },
  {
    id: "r-doc",
    tono: "morado",
    titulo: "Ya existe el material → adjúntaselo al chat",
    texto:
      "Cuando el contenido ya está escrito —un PDF de cuarenta páginas, unos apuntes, una programación didáctica, el texto de una norma— no lo pegues a trozos: súbelo. Copilot Chat con la cuenta del centro admite ficheros y trabaja sobre ellos. Si vas a volver muchas veces a las mismas fuentes, mételas en un cuaderno y pregunta siempre ahí.",
    clave: "La trampa: da por buenas sus propias lecturas. Comprueba en el documento cualquier dato que vayas a usar.",
  },
  {
    id: "r-img",
    tono: "rosa",
    titulo: "Quiero una imagen → el generador de láminas",
    texto:
      "Láminas de aula, carteles, portadas de unidad, esquemas para proyectar. Aquí el prompt manda por encima de todo: mira las siete piezas del bloque 4 antes de pedir la primera.",
    clave: "Revisa siempre los textos que salen dentro de la imagen antes de proyectarla.",
  },
  {
    id: "r-app",
    tono: "ambar",
    titulo: "Quiero algo que se ejecute → modo agente",
    texto:
      "Simuladores, calculadoras, cuestionarios, laboratorios virtuales, cualquier cosa que el alumnado toque. El agente crea los ficheros, los prueba y corrige los errores que encuentra. Es lo que verás en el bloque 5 con las dos aplicaciones.",
    clave: "Si lo que quieres se abre en un navegador, tu herramienta es esta.",
  },
];

export function ArbolCopilot() {
  const yRaizBase = RAIZ_Y + RAIZ_H;
  const yCanal = 116; // altura del canal horizontal por el que se reparten las ramas
  const alto = Y_HERR + H_HERR + 18;

  return (
    <Lienzo
      ancho={AMPLIO}
      alto={alto}
      pasos={PASOS_ARBOL}
      etiqueta="Árbol de decisión: según si quieres un texto, trabajar sobre un documento que ya existe, una imagen o algo que se ejecute, la herramienta es Copilot Chat, el chat con el fichero adjunto, el generador de imágenes o VS Code en modo agente."
      pie="Elige por el resultado que quieres, no por la herramienta que te suena. Pulsa cualquier rama."
      dibuja={(ctx) => (
        <>
          {/* Raíz */}
          <Zona ctx={ctx} paso="raiz" etiqueta="Ver: la pregunta de partida">
            <rect
              x={RAIZ_X - 5}
              y={RAIZ_Y - 5}
              width={RAIZ_W + 10}
              height={RAIZ_H + 10}
              rx={34}
              fill="none"
              stroke={TONOS.gris.borde}
              strokeWidth={3}
              className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            />
            <rect
              x={RAIZ_X}
              y={RAIZ_Y}
              width={RAIZ_W}
              height={RAIZ_H}
              rx={28}
              fill={ctx.sel === "raiz" ? TONOS.gris.suave : "var(--dg-papel)"}
              stroke={TONOS.gris.fuerte}
              strokeWidth={2.5}
            />
            <rect
              x={RAIZ_X - 8}
              y={RAIZ_Y - 8}
              width={RAIZ_W + 16}
              height={RAIZ_H + 16}
              rx={36}
              fill="none"
              stroke={TINTA}
              strokeWidth={2}
              strokeDasharray="5 4"
              className="opacity-0 group-focus-visible:opacity-100"
            />
            <Rotulo
              x={AMPLIO / 2}
              y={RAIZ_Y + 35}
              texto="¿Qué quiero que exista al final?"
              tam={FS_TIT}
              peso={800}
              color={TINTA}
              ancla="middle"
            />
          </Zona>

          {/* Reparto: baja del centro al canal y de ahí a cada columna */}
          <line
            x1={AMPLIO / 2}
            y1={yRaizBase}
            x2={AMPLIO / 2}
            y2={yCanal}
            stroke={TONOS.gris.fuerte}
            strokeWidth={2.5}
          />
          <line
            x1={COLS[0] + COL_W / 2}
            y1={yCanal}
            x2={COLS[3] + COL_W / 2}
            y2={yCanal}
            stroke={TONOS.gris.fuerte}
            strokeWidth={2.5}
          />

          {RAMAS.map((r, i) => {
            const cx = COLS[i] + COL_W / 2;
            const t = TONOS[r.tono];
            return (
              <g key={r.id}>
                <Tramo
                  x1={cx}
                  y1={yCanal}
                  x2={cx}
                  y2={Y_COND - 6}
                  tono={r.tono}
                  uid={ctx.uid}
                  grosor={2.5}
                />
                {/* Condición */}
                <Zona ctx={ctx} paso={r.id} etiqueta={`Ver: ${r.condicion.join(" ")}`}>
                  <rect
                    x={COLS[i] - 5}
                    y={Y_COND - 5}
                    width={COL_W + 10}
                    height={H_COND + 10}
                    rx={16}
                    fill="none"
                    stroke={t.borde}
                    strokeWidth={3}
                    className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  />
                  <rect
                    x={COLS[i]}
                    y={Y_COND}
                    width={COL_W}
                    height={H_COND}
                    rx={12}
                    fill={ctx.sel === r.id ? t.suave : "var(--dg-papel)"}
                    stroke={t.linea}
                    strokeWidth={ctx.sel === r.id ? 2.5 : 1.5}
                    style={{ transition: "fill 150ms ease, stroke-width 150ms ease" }}
                  />
                  <rect
                    x={COLS[i] - 8}
                    y={Y_COND - 8}
                    width={COL_W + 16}
                    height={H_COND + 16}
                    rx={18}
                    fill="none"
                    stroke={TINTA}
                    strokeWidth={2}
                    strokeDasharray="5 4"
                    className="opacity-0 group-focus-visible:opacity-100"
                  />
                  <Rotulo
                    x={cx}
                    y={Y_COND + 26}
                    texto="si quiero…"
                    tam={FS}
                    peso={600}
                    color={TENUE}
                    ancla="middle"
                  />
                  <Parrafo
                    x={cx}
                    y={Y_COND + 50}
                    lineas={r.condicion}
                    color={SUAVE}
                    peso={500}
                    tam={FS}
                    interlineado={20}
                    ancla="middle"
                  />
                </Zona>

                <Tramo
                  x1={cx}
                  y1={Y_COND + H_COND}
                  x2={cx}
                  y2={Y_HERR - 6}
                  tono={r.tono}
                  uid={ctx.uid}
                  grosor={3}
                />

                {/* Herramienta */}
                <rect
                  x={COLS[i]}
                  y={Y_HERR}
                  width={COL_W}
                  height={H_HERR}
                  rx={12}
                  fill={t.suave}
                  stroke={t.linea}
                  strokeWidth={2}
                />
                <Glifo x={COLS[i] + 14} y={Y_HERR + H_HERR / 2 - 14} tipo={r.glifo} color={t.fuerte} />
                <Parrafo
                  x={COLS[i] + 52}
                  y={
                    Y_HERR +
                    H_HERR / 2 -
                    ((r.herramienta.length - 1) * 20) / 2 +
                    6
                  }
                  lineas={r.herramienta}
                  color={t.fuerte}
                  peso={700}
                  tam={FS}
                  interlineado={20}
                />
              </g>
            );
          })}

          <circle cx={AMPLIO / 2} cy={yCanal} r={5} fill={TONOS.gris.fuerte} />
          <circle cx={AMPLIO / 2} cy={yCanal} r={9} fill="none" stroke={FONDO} strokeWidth={3} />
        </>
      )}
    />
  );
}
