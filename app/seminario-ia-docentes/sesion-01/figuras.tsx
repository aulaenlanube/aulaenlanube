import { Caja, Figura, Flecha, T, TINTA, fuerte, linea, suave, type TonoSvg } from "@/app/programacion-ia/_video/svg";

// Figuras de la sesión 1 del seminario (docs/paginas-para-video.md). Estáticas:
// lo que cuenta cada pieza está escrito en ella. Geometría calculada a mano y
// apuntada encima de cada figura; medidas de texto de _video/svg.tsx (sans 16 ≈
// 9,5 px por carácter, negrita 18 ≈ 11,5). Cada <text> es corto y único en la
// página (tampoco puede empezar igual que los del hilo de la cabecera).

/* ------------------------------------------------------------------ */
/* La siguiente palabra                                                */
/* Fila 1 (y 40..140): cajas 20..350 y 400..620; flechas a y = 90.     */
/* Candidatas a x = 680 (texto ≤ 12 car. ≈ 114 → 794), barra desde 812 */
/* (92 % → 129 px), porcentaje tras la barra (≤ 987). Líneas base a    */
/* y = 72, 104, 136. Fila 2 (y 190..266): 20..350, 400..620, 680..980; */
/* flechas a y = 228.                                                  */
/* ------------------------------------------------------------------ */

const CANDIDATAS: { palabra: string; pct: number }[] = [
  { palabra: "cloroplastos", pct: 92 },
  { palabra: "hojas", pct: 6 },
  { palabra: "mitocondrios", pct: 1 },
];

export function SiguientePalabra() {
  const u = "s1-palabra";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={290}
      etiqueta="Cómo escribe un modelo de lenguaje: recibe el principio de una frase, calcula qué palabra suele venir detrás y elige la más probable (cloroplastos, 92 %). Si le pides una cita, hace el mismo cálculo sin consultar nada y puede devolver un número creíble que no existe."
      pie="Escribe lo más probable, no lo comprobado: por eso redacta tan bien… y a veces inventa."
    >
      <Caja x={20} y={40} w={330} h={100} tono="gris" titulo="Lo que escribes" lineas={["«Las plantas fabrican", "su alimento en los…»"]} />
      <Flecha uid={u} d="M350 90 H394" tono="azul" />
      <Caja x={400} y={40} w={220} h={100} tono="morado" titulo="El modelo" lineas={["calcula qué palabra", "suele venir detrás"]} />
      <Flecha uid={u} d="M620 90 H664" tono="morado" />

      <T x={680} y={36} peso={800} color={fuerte("verde")}>
        siguiente palabra probable
      </T>
      {CANDIDATAS.map((c, i) => {
        const y = 72 + i * 32;
        const w = Math.max(4, Math.round(c.pct * 1.4));
        return (
          <g key={c.palabra}>
            <T x={680} y={y} peso={700} color={TINTA}>
              {c.palabra}
            </T>
            <rect x={812} y={y - 14} width={w} height={18} rx={4} fill={i === 0 ? fuerte("verde") : linea("gris")} />
            <T x={812 + w + 8} y={y}>{`${c.pct} %`}</T>
          </g>
        );
      })}

      <Caja x={20} y={190} w={330} h={76} tono="gris" titulo="Si le pides una cita" lineas={["«Según el decreto…»"]} />
      <Flecha uid={u} d="M350 228 H394" tono="azul" />
      <Caja x={400} y={190} w={220} h={76} tono="morado" titulo="Mismo cálculo" lineas={["sin consultar nada"]} />
      <Flecha uid={u} d="M620 228 H674" tono="rosa" />
      <Caja x={680} y={190} w={300} h={76} tono="rosa" titulo="Un número creíble" lineas={["que puede no existir"]} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El mapa de tu Copilot                                               */
/* Cuenta 20..270 y Copilot 300..550 a y = 100..200; flechas a y = 150.*/
/* Zona «Lo que incluye» 580..1050 × 16..312. Rejilla 2 × 4 de 215 × 50 */
/* a x = 596 y 821 (acaba en 1036), y = 52, 116, 180, 244 (→ 294).     */
/* Caja discontinua 20..550 × 236..312. Título más largo de rejilla:   */
/* «Estudiar y aprender» (19 car.; medido ≈ 180 px) en 215 − 16 = 199. */
/* Rótulos tal cual en la interfaz en castellano (noviembre de 2026).  */
/* ------------------------------------------------------------------ */

const INCLUYE = [
  "Chat con la web",
  "Tus ficheros",
  "Imágenes",
  "Cuadernos",
  "Biblioteca",
  "Agentes",
  "Enseñar (Teach)",
  "Estudiar y aprender",
];

export function MapaCopilot() {
  const u = "s1-mapa";
  return (
    <Figura
      uid={u}
      ancho={1060}
      alto={330}
      etiqueta="Tu cuenta del centro (@edu.gva.es, Identitat Digital) da acceso a Copilot Chat en copilot.cloud.microsoft, con protección de datos de empresa. Incluye sin pagar: chat con la web, tus ficheros, imágenes, Cuadernos, Biblioteca, Agentes, Enseñar (Teach) para docentes y Estudiar y aprender. Sin licencia de pago, ya no hay Copilot dentro de Word y PowerPoint desde abril de 2026."
      pie="Una cuenta, una dirección y todo esto incluido. Lo que había dentro de Word, ya no."
    >
      <Caja x={20} y={100} w={250} h={100} tono="azul" titulo="Cuenta del centro" lineas={["@edu.gva.es", "Identitat Digital"]} />
      <Flecha uid={u} d="M270 150 H294" tono="azul" />
      <Caja x={300} y={100} w={250} h={100} tono="morado" titulo="Copilot Chat" lineas={["copilot.cloud.microsoft", "con escudo de protección"]} />
      <Flecha uid={u} d="M550 150 H574" tono="morado" />

      <rect x={580} y={16} width={470} height={296} rx={16} fill={suave("verde")} stroke={linea("verde")} strokeWidth={2} strokeDasharray="8 6" />
      <T x={598} y={42} peso={800} color={fuerte("verde")}>
        Lo que incluye, sin pagar
      </T>
      {INCLUYE.map((t, i) => {
        const x = i % 2 === 0 ? 596 : 821;
        const y = 52 + Math.floor(i / 2) * 64;
        const tono: TonoSvg = t.startsWith("Enseñar") || t.startsWith("Estudiar") ? "azul" : "verde";
        return <Caja key={t} x={x} y={y} w={215} h={50} tono={tono} titulo={t} />;
      })}

      <Caja
        x={20}
        y={236}
        w={530}
        h={76}
        tono="rosa"
        discontinua
        titulo="Dentro de Word y PowerPoint"
        lineas={["sin licencia de pago: ya no, desde abril de 2026"]}
      />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El semáforo de datos                                                */
/* Carcasa 20..110 × 10..300. Luces r = 34 en x = 65, y = 60/155/250.  */
/* Cajas 140..980 (840) × 84 a y = 18, 113, 208 (centros 60/155/250).  */
/* Flechas de 99 a 134. Línea más larga ≈ 70 car. (≈ 665) en 808.      */
/* ------------------------------------------------------------------ */

const LUCES: { tono: TonoSvg; titulo: string; linea: string }[] = [
  {
    tono: "verde",
    titulo: "Verde · sin datos personales",
    linea: "Cualquier IA para preparar clases, materiales y rúbricas genéricas.",
  },
  {
    tono: "ambar",
    titulo: "Ámbar · datos personales necesarios",
    linea: "Solo Copilot con tu @edu.gva.es, y lo mínimo: códigos, no nombres.",
  },
  {
    tono: "rosa",
    titulo: "Rojo · categorías especiales",
    linea: "Salud, NEE, situación familiar sensible… nunca, ni siquiera en Copilot.",
  },
];

export function Semaforo() {
  const u = "s1-semaforo";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={310}
      etiqueta="El semáforo de datos de la guía del CEFIRE: en verde, sin datos personales, cualquier IA para preparar clases; en ámbar, si un dato personal es imprescindible, solo Copilot con la cuenta @edu.gva.es y lo mínimo; en rojo, las categorías especiales (salud, NEE, situación familiar sensible), nunca, ni siquiera en Copilot."
      pie="La pregunta antes de pegar nada: ¿necesito este dato o consigo lo mismo sin él?"
    >
      <rect x={20} y={10} width={90} height={290} rx={22} fill="var(--dg-papel)" stroke={linea("gris")} strokeWidth={2} />
      {LUCES.map((l, i) => {
        const cy = 60 + i * 95;
        return (
          <g key={l.titulo}>
            <circle cx={65} cy={cy} r={34} fill={linea(l.tono)} />
            <Flecha uid={u} d={`M99 ${cy} H134`} tono={l.tono} />
            <Caja x={140} y={cy - 42} w={840} h={84} tono={l.tono} titulo={l.titulo} lineas={[l.linea]} izquierda relleno={suave(l.tono)} />
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Sin contexto, para el promedio                                      */
/* Dos filas de cajas de 76 a y = 20 y 134: 20..320, 380..620,         */
/* 680..980; flechas a y = 58 y 172 (320→374, 620→674).                */
/* Título más largo: «Encargo en seis bloques» (23 car. ≈ 265) en 284.  */
/* ------------------------------------------------------------------ */

export function SinContexto() {
  const u = "s1-promedio";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={230}
      etiqueta="Una pregunta vaga («Hazme una actividad») obliga a la IA a rellenar huecos con lo más típico y devuelve algo para nadie en concreto. Un encargo en seis bloques le permite ajustarse a lo que le cuentas y devuelve algo para tu grupo real."
      pie="La IA no sabe quién es tu grupo: si no se lo cuentas, escribe para el promedio."
    >
      <Caja x={20} y={20} w={300} h={76} tono="gris" titulo="Pregunta vaga" lineas={["«Hazme una actividad»"]} />
      <Flecha uid={u} d="M320 58 H374" />
      <Caja x={380} y={20} w={240} h={76} tono="morado" titulo="Rellena huecos" lineas={["con lo más típico"]} />
      <Flecha uid={u} d="M620 58 H674" />
      <Caja x={680} y={20} w={300} h={76} tono="gris" titulo="Para nadie en concreto" lineas={["genérica, sin tu nivel"]} discontinua />

      <Caja x={20} y={134} w={300} h={76} tono="azul" titulo="Encargo en seis bloques" lineas={["rol, contexto, tarea…"]} />
      <Flecha uid={u} d="M320 172 H374" tono="azul" />
      <Caja x={380} y={134} w={240} h={76} tono="morado" titulo="Se ajusta" lineas={["a lo que le cuentas"]} />
      <Flecha uid={u} d="M620 172 H674" tono="verde" />
      <Caja x={680} y={134} w={300} h={76} tono="verde" titulo="Para tu grupo real" lineas={["con tu nivel y tu tiempo"]} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El ciclo del metaprompt                                             */
/* Cuatro cajas de 230 × 76 a y = 30, x = 15, 275, 535, 795 (→ 1025);  */
/* flechas a y = 68 (245→269, 505→529, 765→789). Vuelta: de la última  */
/* (x = 910, borde 106) baja a 146, va a x = 130 y sube a 112.         */
/* Rótulo de la vuelta a y = 172, centrado en 520.                     */
/* ------------------------------------------------------------------ */

const CICLO: { titulo: string; linea: string; tono: TonoSvg }[] = [
  { titulo: "Tú, en bruto", linea: "como en el pasillo", tono: "gris" },
  { titulo: "Te pregunta", linea: "lo que le falta", tono: "morado" },
  { titulo: "Escribe el encargo", linea: "en seis bloques", tono: "morado" },
  { titulo: "Tú lo corriges", linea: "y lo guardas", tono: "verde" },
];

export function CicloMetaprompt() {
  const u = "s1-meta";
  return (
    <Figura
      uid={u}
      ancho={1040}
      alto={190}
      etiqueta="El ciclo del metaprompt: le cuentas en bruto lo que necesitas, la IA te pregunta lo que le falta, escribe el encargo en seis bloques y tú lo corriges y lo guardas; la próxima vez partes de ese encargo guardado."
      pie="Tú pones lo que la máquina no puede saber: tu grupo, tu tiempo y tu currículo."
    >
      {CICLO.map((c, i) => {
        const x = 15 + i * 260;
        return (
          <g key={c.titulo}>
            <Caja x={x} y={30} w={230} h={76} tono={c.tono} titulo={c.titulo} lineas={[c.linea]} />
            {i < CICLO.length - 1 ? <Flecha uid={u} d={`M${x + 230} 68 H${x + 254}`} tono="morado" /> : null}
          </g>
        );
      })}
      <Flecha uid={u} d="M910 106 V146 H130 V112" tono="azul" discontinua />
      <T x={520} y={172} ancla="middle">
        la próxima vez partes de tu encargo guardado
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Una ficha, cuatro usos                                              */
/* Ficha 20..270 × 96..196 (centro 146). Bus vertical en x = 340 de    */
/* 38 a 248. Cajas 420..980 (560) × 52 a y = 12, 82, 152, 222 (centros */
/* 38, 108, 178, 248); flechas 340 → 414.                              */
/* ------------------------------------------------------------------ */

const USOS: { titulo: string; tono: TonoSvg }[] = [
  { titulo: "Hoy: la pegas al empezar un chat", tono: "azul" },
  { titulo: "En el cuaderno: tu primera fuente", tono: "verde" },
  { titulo: "En tu asistente: sus instrucciones", tono: "morado" },
  { titulo: "En tu herramienta: su memoria", tono: "rosa" },
];

export function UnaFichaCuatroUsos() {
  const u = "s1-usos";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={290}
      etiqueta="Tu ficha es un documento en tu OneDrive que reutilizas en todo el seminario: hoy la pegas al empezar un chat; en la sesión 2 es la primera fuente de tu cuaderno; en la 4, las instrucciones de tu asistente; en la 5, la memoria de tu herramienta."
      pie="La escribes una vez y te acompaña en las cinco sesiones."
    >
      <Caja x={20} y={96} w={250} h={100} tono="azul" titulo="Tu ficha" lineas={["un documento en", "tu OneDrive"]} />
      <Flecha uid={u} d="M270 146 H340" tono="gris" punta={false} />
      <Flecha uid={u} d="M340 38 V248" tono="gris" punta={false} />
      {USOS.map((x, i) => {
        const y = 12 + i * 70;
        return (
          <g key={x.titulo}>
            <Flecha uid={u} d={`M340 ${y + 26} H414`} tono={x.tono} />
            <Caja x={420} y={y} w={560} h={52} tono={x.tono} titulo={x.titulo} izquierda />
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Una actividad, tres niveles                                         */
/* Base 350..650 × 10..86 (centro x = 500). Niveles de 300 × 76 a      */
/* y = 130: x = 20, 350, 680 (centros 170, 500, 830). Rúbrica          */
/* 350..650 × 246..322. Bajadas: 500,86 → 106 → a cada centro → 124.   */
/* Subidas a la rúbrica: 206 → 226 → 500 y 500,206 → 240.              */
/* ------------------------------------------------------------------ */

export function TresNiveles() {
  const u = "s1-niveles";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={330}
      etiqueta="Una actividad en tres niveles: el mismo enunciado base se gradúa en un nivel 1 guiado (con pasos y datos), un nivel 2 estándar y un nivel 3 abierto (decide y lo justifica); los tres se corrigen con una sola rúbrica."
      pie="Un enunciado, tres andamios y una rúbrica común: atiendes al grupo real sin triplicar el trabajo."
    >
      <Caja x={350} y={10} w={300} h={76} tono="gris" titulo="Mismo enunciado base" lineas={["la misma idea para todos"]} />
      <Flecha uid={u} d="M500 86 V106 H170 V124" tono="verde" />
      <Flecha uid={u} d="M500 86 V124" tono="azul" />
      <Flecha uid={u} d="M500 86 V106 H830 V124" tono="morado" />

      <Caja x={20} y={130} w={300} h={76} tono="verde" titulo="Nivel 1 · guiado" lineas={["con pasos y datos"]} />
      <Caja x={350} y={130} w={300} h={76} tono="azul" titulo="Nivel 2 · estándar" lineas={["el reto de siempre"]} />
      <Caja x={680} y={130} w={300} h={76} tono="morado" titulo="Nivel 3 · abierto" lineas={["decide y lo justifica"]} />

      <Flecha uid={u} d="M170 206 V226 H496" tono="gris" punta={false} />
      <Flecha uid={u} d="M830 206 V226 H504" tono="gris" punta={false} />
      <Flecha uid={u} d="M500 206 V240" tono="ambar" />
      <Caja x={350} y={246} w={300} h={76} tono="ambar" titulo="Una sola rúbrica" lineas={["nadie es de segunda"]} />
    </Figura>
  );
}
