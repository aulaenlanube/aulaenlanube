import { Caja, Figura, Flecha, T, Zona, fuerte, linea, suave, type TonoSvg } from "@/app/programacion-ia/_video/svg";

// Figuras de la sesión 4 (docs/paginas-para-video.md). Geometría calculada a
// mano y apuntada encima de cada figura; medidas de texto de _video/svg.tsx
// (sans 16 ≈ 9,5 px por carácter, negrita 18 ≈ 11,5). Cada <text> es corto y
// único en toda la página, incluido el hilo de la cabecera (_hilo.tsx).

/* ------------------------------------------------------------------ */
/* De las horas a la temporalización                                   */
/* Entradas: 4 cajas de 240 × 52 a x = 20, y = 20 / 84 / 148 / 212     */
/* (centros 46, 110, 174, 238). Ramas de x = 262 a 284; colector       */
/* vertical en x = 284 (46..238) y flecha a y = 142 hasta 304.         */
/* «La IA» 310..480 × 104..180 · «Temporalización» 540..740 × 92..192  */
/* · «Tú revisas» 790..980 × 92..192. Vuelta discontinua: 885,194 →    */
/* y = 250 → x = 395 → sube a 186 (borde de «La IA» en 180).           */
/* Rótulo de la vuelta a y = 274 (centrado en 640: 436..844).          */
/* ------------------------------------------------------------------ */

const ENTRADAS = ["Horas del curso", "Sesiones semanales", "Calendario escolar", "RA o criterios"];

export function Temporalizacion() {
  const u = "s4-tempo";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={288}
      etiqueta="De las horas a la temporalización: las horas del curso, las sesiones semanales, el calendario escolar y los RA o criterios entran en la IA, que reparte y cuadra; sale una temporalización por unidades, semanas y horas, y tú la revisas con los festivos y el ritmo de tu grupo. Si algo no cuadra, se lo dices y da otra vuelta."
      pie="Los datos los pones tú; la IA hace las cuentas y el borrador; tú decides."
    >
      {ENTRADAS.map((t, i) => {
        const y = 20 + i * 64;
        return (
          <g key={t}>
            <Caja x={20} y={y} w={240} h={52} tono="gris" titulo={t} />
            <Flecha uid={u} d={`M262 ${y + 26} H284`} punta={false} />
          </g>
        );
      })}
      <Flecha uid={u} d="M284 46 V238" punta={false} />
      <Flecha uid={u} d="M284 142 H304" />

      <Caja x={310} y={104} w={170} h={76} tono="morado" titulo="La IA" lineas={["reparte y cuadra"]} />
      <Flecha uid={u} d="M482 142 H534" tono="morado" />
      <Caja x={540} y={92} w={200} h={100} tono="verde" titulo="Temporalización" lineas={["unidades, semanas", "y horas"]} />
      <Flecha uid={u} d="M742 142 H784" tono="verde" />
      <Caja x={790} y={92} w={190} h={100} tono="ambar" titulo="Tú revisas" lineas={["festivos y ritmo", "de tu grupo"]} />

      <Flecha uid={u} d="M885 194 V250 H395 V186" tono="ambar" discontinua />
      <T x={640} y={274} ancla="middle">
        si algo no cuadra, se lo dices y otra vuelta
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Correos y actas sin datos de más                                    */
/* Cinco cajas de 170 × 100 a y = 20; x = 15 + i·200 (15, 215, 415,    */
/* 615, 815; la última acaba en 985). Flechas a y = 70 de x + 172 a    */
/* x + 194. Aviso a y = 166, centrado en 500 (73 car. ≈ 694: 153..847).*/
/* Líneas ≤ 16 car. (≈ 152 px en 170 − 16).                           */
/* ------------------------------------------------------------------ */

const PASOS_CORREO: { titulo: string; lineas: [string, string]; tono: TonoSvg }[] = [
  { titulo: "Tus notas", lineas: ["en bruto y", "sin nombres"], tono: "gris" },
  { titulo: "En Copilot", lineas: ["con la cuenta", "del centro"], tono: "morado" },
  { titulo: "Borrador", lineas: ["acta, correo o", "comunicado"], tono: "azul" },
  { titulo: "Tu revisión", lineas: ["datos, tono", "y firma"], tono: "ambar" },
  { titulo: "Lo envías tú", lineas: ["desde tu correo", "o plataforma"], tono: "verde" },
];

export function CorreoSeguro() {
  const u = "s4-correo";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={184}
      etiqueta="De tus notas al envío: escribes tus notas en bruto y sin nombres, las trabajas en Copilot con la cuenta del centro, sale un borrador de acta, correo o comunicado, lo revisas (datos, tono y firma) y lo envías tú desde tu correo o tu plataforma."
      pie="La IA redacta el borrador; los nombres, el tono final y el botón de enviar son tuyos."
    >
      {PASOS_CORREO.map((p, i) => {
        const x = 15 + i * 200;
        return (
          <g key={p.titulo}>
            <Caja x={x} y={20} w={170} h={100} tono={p.tono} titulo={p.titulo} lineas={p.lineas} />
            {i < PASOS_CORREO.length - 1 ? <Flecha uid={u} d={`M${x + 172} 70 H${x + 194}`} /> : null}
          </g>
        );
      })}
      <T x={500} y={166} ancla="middle" peso={700} color={fuerte("rosa")}>
        En el chat, sin nombres ni datos de salud: el nombre lo pones tú al final
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Anatomía de un agente                                               */
/* Entradas 20..280 × (20, 112, 204), alto 76 (centros 58, 150, 242).  */
/* Ramas de 282 a 306; colector x = 306 (58..242); flecha a y = 150    */
/* hasta 344. «Tu petición» 350..570 × 20..72; flecha 460,74 → 106.    */
/* «Tu asistente» 350..570 × 112..188. Flecha 572 → 624 a y = 150.    */
/* «La respuesta» 630..900 × 100..200. Líneas ≤ 21 car. en 260 − 16.   */
/* ------------------------------------------------------------------ */

const PARTES: { titulo: string; linea: string; tono: TonoSvg }[] = [
  { titulo: "Instrucciones", linea: "quién es y sus reglas", tono: "azul" },
  { titulo: "Conocimiento", linea: "las webs que consulta", tono: "verde" },
  { titulo: "Herramientas", linea: "documentos e imágenes", tono: "ambar" },
];

export function AnatomiaAgente() {
  const u = "s4-anatomia";
  return (
    <Figura
      uid={u}
      ancho={920}
      alto={296}
      etiqueta="Anatomía de un agente: unas instrucciones (quién es y sus reglas), un conocimiento (las webs que consulta) y unas herramientas (crear documentos e imágenes) forman tu asistente, que ya lleva tu ficha dentro. Tú le haces una petición y te devuelve la respuesta con tu contexto, sin tener que pegar nada cada vez."
      pie="Un agente es un chat que ya sabe quién eres antes de que escribas nada."
    >
      {PARTES.map((p, i) => {
        const y = 20 + i * 92;
        return (
          <g key={p.titulo}>
            <Caja x={20} y={y} w={260} h={76} tono={p.tono} titulo={p.titulo} lineas={[p.linea]} />
            <Flecha uid={u} d={`M282 ${y + 38} H306`} punta={false} />
          </g>
        );
      })}
      <Flecha uid={u} d="M306 58 V242" punta={false} />
      <Flecha uid={u} d="M306 150 H344" />

      <Caja x={350} y={20} w={220} h={52} tono="gris" titulo="Tu petición" />
      <Flecha uid={u} d="M460 74 V106" />
      <Caja x={350} y={112} w={220} h={76} tono="morado" titulo="Tu asistente" lineas={["tu ficha ya dentro"]} relleno={suave("morado")} />
      <Flecha uid={u} d="M572 150 H624" tono="morado" />
      <Caja x={630} y={100} w={270} h={100} tono="gris" titulo="La respuesta" lineas={["con tu contexto, sin", "pegar nada cada vez"]} />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Lo que entra gratis y lo que no                                     */
/* Dos zonas de 474 × 200 a y = 16: x = 16 y x = 510. Elementos a      */
/* y = 76, 114, 152, 190; icono (r = 11) centrado en x + 32, y − 6;    */
/* texto a x + 52. El más largo, «Documentos de SharePoint u OneDrive» */
/* (35 car. ≈ 333) acaba en 562 + 333 = 895 < 984.                     */
/* ------------------------------------------------------------------ */

function Si({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={suave("verde")} stroke={linea("verde")} strokeWidth={2} />
      <path d={`M${x - 5} ${y} l3.5 3.5 l6.5 -7`} fill="none" stroke={fuerte("verde")} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function No({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={suave("rosa")} stroke={linea("rosa")} strokeWidth={2} />
      <path d={`M${x - 4.5} ${y - 4.5} l9 9 M${x + 4.5} ${y - 4.5} l-9 9`} fill="none" stroke={fuerte("rosa")} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  );
}

const GRATIS = ["Hasta 8.000 caracteres de instrucciones", "Hasta cuatro webs públicas", "Crear documentos, gráficos y código", "Crear imágenes"];
const DE_PAGO = ["Ficheros que subes al agente", "Documentos de SharePoint u OneDrive", "Tu correo, tus chats y tus reuniones"];

export function GratisDePago() {
  const u = "s4-licencia";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={232}
      etiqueta="Lo que entra gratis con la cuenta del centro al crear un agente: hasta 8.000 caracteres de instrucciones, hasta cuatro webs públicas, crear documentos, gráficos y código, y crear imágenes. Lo que no entra en la versión gratuita: ficheros que subes al agente, documentos de SharePoint u OneDrive, y tu correo, tus chats y tus reuniones. Los dos primeros, solo si se paga por uso."
      pie="Para tu asistente basta con la columna verde: tu ficha va en las instrucciones."
    >
      <Zona x={16} y={16} w={474} h={200} tono="verde" rotulo="Gratis con tu cuenta del centro" />
      {GRATIS.map((t, i) => {
        const y = 76 + i * 38;
        return (
          <g key={t}>
            <Si x={48} y={y - 6} />
            <T x={68} y={y} color={fuerte("verde")} peso={600}>
              {t}
            </T>
          </g>
        );
      })}
      <Zona x={510} y={16} w={474} h={200} tono="rosa" rotulo="No entra en la versión gratuita" />
      {DE_PAGO.map((t, i) => {
        const y = 76 + i * 38;
        return (
          <g key={t}>
            <No x={542} y={y - 6} />
            <T x={562} y={y} color={fuerte("rosa")} peso={600}>
              {t}
            </T>
          </g>
        );
      })}
      <T x={530} y={190}>
        Los dos primeros, solo si se paga por uso
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Dónde piensa cada IA                                                */
/* Zonas de 474 × 208 a y = 16: x = 16 y x = 510. Cajas de 190 × 76 a  */
/* y = 64: 40..230 y 276..466 (izquierda); 534..724 y 770..960         */
/* (derecha). Flechas a y = 102: 232 → 270 y 726 → 764. Pies de zona  */
/* a y = 196, centrados en 253 y 747.                                  */
/* ------------------------------------------------------------------ */

export function DondePiensa() {
  const u = "s4-local";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={240}
      etiqueta="Dónde piensa cada IA. Con LM Studio, todo ocurre en tu ordenador: escribes tu texto en LM Studio y lo responde un modelo abierto guardado en tu disco; funciona sin internet. Con Copilot, tu pregunta sale del navegador hacia los servidores de Microsoft, protegida por la cuenta del centro."
      pie="Las dos opciones son seguras para preparar clases; la local no necesita internet, pero sí un buen ordenador."
    >
      <Zona x={16} y={16} w={474} h={208} tono="verde" rotulo="LM Studio: todo en tu ordenador" />
      <Caja x={40} y={64} w={190} h={76} tono="gris" titulo="Tu texto" lineas={["en LM Studio"]} />
      <Flecha uid={u} d="M232 102 H270" tono="verde" />
      <Caja x={276} y={64} w={190} h={76} tono="verde" titulo="Modelo abierto" lineas={["en tu disco"]} />
      <T x={253} y={196} ancla="middle" peso={700} color={fuerte("verde")}>
        funciona sin internet
      </T>

      <Zona x={510} y={16} w={474} h={208} tono="azul" rotulo="En la nube, con Copilot" />
      <Caja x={534} y={64} w={190} h={76} tono="gris" titulo="Tu pregunta" lineas={["en el navegador"]} />
      <Flecha uid={u} d="M726 102 H764" tono="azul" />
      <Caja x={770} y={64} w={190} h={76} tono="azul" titulo="Servidores" lineas={["de Microsoft"]} />
      <T x={747} y={196} ancla="middle" peso={700} color={fuerte("azul")}>
        protegido con la cuenta del centro
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Tres preguntas para elegir                                          */
/* Cuatro cajas de 200 × 100 a y = 20: x = 20, 270, 520, 770. Flechas  */
/* verdes a y = 70 (x + 202 → x + 244). Bajadas rosas discontinuas en  */
/* x = 120, 370, 620 de 122 a 194. Caja de abajo 20..720 × 200..252.   */
/* Títulos ≤ 15 car. (≈ 173 px en 200 − 16); líneas ≤ 16 car.          */
/* ------------------------------------------------------------------ */

const PREGUNTAS: { titulo: string; lineas: [string, string] }[] = [
  { titulo: "Ahorra tiempo", lineas: ["cada semana, no", "una vez al año"] },
  { titulo: "Sin datos fuera", lineas: ["nada sale de tu", "ordenador"] },
  { titulo: "Un solo fichero", lineas: ["una página web", "sin servidor"] },
];

export function TresPreguntas() {
  const u = "s4-elige";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={264}
      etiqueta="Tres preguntas para elegir tu herramienta: ¿ahorra tiempo cada semana y no una vez al año?, ¿funciona sin que salga ningún dato de tu ordenador?, ¿cabe en un solo fichero, una página web sin servidor? Si las tres se cumplen, esa es la tuya: escribe su encargo. Si alguna falla, simplifícala o elige otra."
      pie="Tres síes y ya tienes herramienta para la sesión 5."
    >
      {PREGUNTAS.map((p, i) => {
        const x = 20 + i * 250;
        return (
          <g key={p.titulo}>
            <Caja x={x} y={20} w={200} h={100} tono="morado" titulo={p.titulo} lineas={p.lineas} />
            <Flecha uid={u} d={`M${x + 202} 70 H${x + 244}`} tono="verde" />
            <Flecha uid={u} d={`M${x + 100} 122 V194`} tono="rosa" discontinua />
          </g>
        );
      })}
      <Caja x={770} y={20} w={200} h={100} tono="verde" titulo="Esa es la tuya" lineas={["escribe ya", "su encargo"]} relleno={suave("verde")} grosor={3} />
      <Caja x={20} y={200} w={700} h={52} tono="rosa" titulo="Si alguna falla: simplifícala o elige otra" />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Del problema al encargo                                             */
/* Cuatro cajas de 210 × 100 a y = 20: x = 20, 270, 520, 770 (acaba en */
/* 980). Flechas a y = 70 (x + 212 → x + 244). Vuelta discontinua del  */
/* encargo (centro 625) a la entrevista (centro 375): 625,122 → 150 →  */
/* 375 → 126. Rótulo a y = 174, centrado en 500.                       */
/* ------------------------------------------------------------------ */

const ETAPAS: { titulo: string; lineas: [string, string]; tono: TonoSvg }[] = [
  { titulo: "Tu idea", lineas: ["contada en bruto,", "como a un compañero"], tono: "gris" },
  { titulo: "La entrevista", lineas: ["Copilot pregunta,", "tú respondes"], tono: "morado" },
  { titulo: "El encargo", lineas: ["una página con", "todo lo importante"], tono: "azul" },
  { titulo: "En la sesión 5", lineas: ["OpenCode lo", "construye"], tono: "rosa" },
];

export function DelProblemaAlEncargo() {
  const u = "s4-encargo";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={184}
      etiqueta="Del problema al encargo: cuentas tu idea en bruto, Copilot te entrevista con preguntas, sale un encargo de una página con todo lo importante y, en la sesión 5, OpenCode lo construye. Si al encargo le falta algo, vuelve a la entrevista con otra pregunta."
      pie="Lo que no está en el encargo no lo construye nadie: por eso merece diez minutos."
    >
      {ETAPAS.map((e, i) => {
        const x = 20 + i * 250;
        return (
          <g key={e.titulo}>
            <Caja x={x} y={20} w={210} h={100} tono={e.tono} titulo={e.titulo} lineas={e.lineas} />
            {i < ETAPAS.length - 1 ? <Flecha uid={u} d={`M${x + 212} 70 H${x + 244}`} /> : null}
          </g>
        );
      })}
      <Flecha uid={u} d="M625 122 V150 H375 V126" tono="morado" discontinua />
      <T x={500} y={174} ancla="middle">
        ¿falta algo? otra pregunta
      </T>
    </Figura>
  );
}
