import { Caja, Figura, Flecha, T, Zona, fuerte, linea, suave, type TonoSvg } from "@/app/programacion-ia/_video/svg";

// Figuras de la sesión 2 del seminario (docs/paginas-para-video.md). Geometría
// calculada a mano y apuntada encima de cada figura; medidas de texto de
// _video/svg.tsx (negrita 18 ≈ 11,5 px por carácter, 16 ≈ 9,5). Cada <text> es
// corto y único en toda la página (también frente a los del hilo de la cabecera).

/* ------------------------------------------------------------------ */
/* Del currículo al material                                           */
/* Cinco cajas de 180 × 100 a y = 20, separadas 32: x = 16 + i·212     */
/* (16, 228, 440, 652, 864; la última acaba en 1044). Flechas a y = 70 */
/* de x + 182 a la siguiente − 6. Rótulo bajo cada caja a y = 150.     */
/* Las dos del centro (lo de hoy) van con relleno y trazo 3.           */
/* ------------------------------------------------------------------ */

const CAMINO: { titulo: string; lineas: [string, string]; tono: TonoSvg; rotulo: string; hoy?: boolean }[] = [
  { titulo: "Currículo", lineas: ["lo que manda", "la norma"], tono: "gris", rotulo: "DOGV o BOE" },
  { titulo: "Tu ficha", lineas: ["tu grupo y", "tu contexto"], tono: "azul", rotulo: "de la sesión 1" },
  { titulo: "La unidad", lineas: ["FP: unidad", "ESO: situación"], tono: "verde", rotulo: "hoy, paso a paso", hoy: true },
  { titulo: "Materiales", lineas: ["fichas, láminas", "y preguntas"], tono: "verde", rotulo: "hoy, con ejemplos", hoy: true },
  { titulo: "Evaluación", lineas: ["criterios e", "instrumentos"], tono: "ambar", rotulo: "en la sesión 3" },
];

export function CaminoMaterial() {
  const u = "s2-camino";
  return (
    <Figura
      uid={u}
      ancho={1060}
      alto={170}
      etiqueta="El camino para preparar clase: del currículo a tu ficha, de la ficha a la unidad de trabajo o situación de aprendizaje, de ahí a los materiales y, por último, a la evaluación. Hoy se trabajan la unidad y los materiales."
      pie="El currículo y tu ficha ya los tienes; hoy recorres los dos tramos del centro. La evaluación es la sesión 3."
    >
      {CAMINO.map((c, i) => {
        const x = 16 + i * 212;
        return (
          <g key={c.titulo}>
            <Caja
              x={x}
              y={20}
              w={180}
              h={100}
              tono={c.tono}
              titulo={c.titulo}
              lineas={c.lineas}
              relleno={c.hoy ? suave(c.tono) : undefined}
              grosor={c.hoy ? 3 : 2}
            />
            <T x={x + 90} y={150} ancla="middle" peso={700} color={fuerte(c.tono)}>
              {c.rotulo}
            </T>
            {i < CAMINO.length - 1 ? <Flecha uid={u} d={`M${x + 182} 70 H${x + 206}`} /> : null}
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Sin fuentes frente a con cuaderno                                    */
/* Dos filas de cajas de alto 76: y = 40 (centro 78) e y = 164 (centro */
/* 202). Rótulo de fila a x = 16 (18 negrita; «Con cuaderno» ≈ 138 px, */
/* acaba en 154). Cajas: 176..396 (220), 440..650 (210), 700..980      */
/* (280). Flechas a la altura del centro: 398→434 y 652→694. Línea    */
/* discontinua de separación a y = 141.                                */
/* ------------------------------------------------------------------ */

export function SinConFuentes() {
  const u = "s2-fuentes";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={260}
      etiqueta="Sin fuentes, tu pregunta va a la memoria del modelo y la respuesta es genérica y puede inventar. Con un cuaderno, la misma pregunta busca solo en tus documentos y la respuesta dice de qué documento y página sale."
      pie="Con el cuaderno, Copilot busca primero en tus documentos y te dice de dónde sale cada cosa: lo compruebas en segundos."
    >
      <T x={16} y={84} tam={18} peso={800} color={fuerte("rosa")}>
        Sin fuentes
      </T>
      <Caja x={176} y={40} w={220} h={76} tono="gris" titulo="Tu pregunta" lineas={["sobre tu materia"]} />
      <Caja x={440} y={40} w={210} h={76} tono="gris" titulo="Su memoria" lineas={["lo que aprendió"]} />
      <Caja x={700} y={40} w={280} h={76} tono="rosa" titulo="Genérica" lineas={["puede inventar"]} />
      <Flecha uid={u} d="M398 78 H434" />
      <Flecha uid={u} d="M652 78 H694" tono="rosa" />

      <path d="M16 141 H984" fill="none" stroke={linea("gris")} strokeWidth={1.5} strokeDasharray="6 6" />

      <T x={16} y={208} tam={18} peso={800} color={fuerte("verde")}>
        Con cuaderno
      </T>
      <Caja x={176} y={164} w={220} h={76} tono="azul" titulo="La misma pregunta" lineas={["en el cuaderno"]} />
      <Caja x={440} y={164} w={210} h={76} tono="verde" titulo="Tus documentos" lineas={["busca solo ahí"]} />
      <Caja x={700} y={164} w={280} h={76} tono="verde" titulo="Con su fuente" lineas={["documento y página"]} relleno={suave("verde")} />
      <Flecha uid={u} d="M398 202 H434" tono="azul" />
      <Flecha uid={u} d="M652 202 H694" tono="verde" />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Enseñar (Teach): lo que entra y lo que sale                          */
/* Entradas (x = 16, w = 214, alto 76): y = 40 (centro 78) y 176       */
/* (centro 214). Enseñar: 272..468 × 96..196 (centro 146). Codos por    */
/* x = 250 hasta y = 128 y 164; flecha de salida 470→510 a y = 146.     */
/* Zona «Lo que te devuelve» 516..1052 × 8..292 (rótulo a y = 36).      */
/* Seis salidas de 244 × 70 en dos columnas (x = 532 y 796) y tres      */
/* filas (y = 52, 130, 208). «Criterio de evaluación» mide ≈ 205 px:     */
/* cabe con 16 de margen a la izquierda.                                */
/* ------------------------------------------------------------------ */

// Rótulos tal cual salen en «Enseñar» (Copilot en castellano, nov. 2026).
const SALIDAS: { titulo: string; linea: string }[] = [
  { titulo: "Plan de lección", linea: "una sesión, paso a paso" },
  { titulo: "Plan de unidad", linea: "varias lecciones seguidas" },
  { titulo: "Criterio de evaluación", linea: "la rúbrica (sesión 3)" },
  { titulo: "Cuestionario", linea: "crea un Microsoft Forms" },
  { titulo: "Tarjetas de estudio", linea: "y rellenar huecos" },
  { titulo: "Material adaptado", linea: "nivel de lectura y ejemplos" },
];

export function TeachSalidas() {
  const u = "s2-teach";
  return (
    <Figura
      uid={u}
      ancho={1060}
      alto={300}
      etiqueta="A Enseñar (Teach) le das tu ficha y tus criterios, o un material tuyo para adaptarlo. Devuelve un plan de lección, un plan de unidad, un criterio de evaluación (la rúbrica), un cuestionario que crea un Microsoft Forms, tarjetas de estudio o el material adaptado."
      pie="Le das tu contexto y Enseñar devuelve documentos editables: nada llega al alumnado sin que lo revises."
    >
      <Caja x={16} y={40} w={214} h={76} tono="azul" titulo="Ficha y criterios" lineas={["pegados en la caja"]} />
      <Caja x={16} y={176} w={214} h={76} tono="azul" titulo="Un material tuyo" lineas={["para adaptarlo"]} />
      <Caja
        x={272}
        y={96}
        w={196}
        h={100}
        tono="morado"
        titulo="Enseñar"
        lineas={["solo profesorado", "gratis con A1 y A3"]}
        relleno={suave("morado")}
        grosor={3}
      />
      <Flecha uid={u} d="M232 78 H250 V128 H266" tono="azul" />
      <Flecha uid={u} d="M232 214 H250 V164 H266" tono="azul" />
      <Flecha uid={u} d="M470 146 H510" tono="morado" />
      <Zona x={516} y={8} w={536} h={284} tono="morado" rotulo="Lo que te devuelve" />
      {SALIDAS.map((s, k) => (
        <Caja
          key={s.titulo}
          x={k % 2 === 0 ? 532 : 796}
          y={52 + 78 * Math.floor(k / 2)}
          w={244}
          h={70}
          tono="morado"
          titulo={s.titulo}
          lineas={[s.linea]}
          izquierda
        />
      ))}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Las piezas de una unidad                                            */
/* Fila 1 (y = 12): criterios 40..280 y grupo 720..960 (alto 76,       */
/* centro 50), reto 380..620 (alto 100, acaba en 112). Flechas a       */
/* y = 50: 282→374 y 718→626. Reto → zona: x = 500, 114→128.           */
/* Zona «La secuencia» 210..790 × 134..250; dentro, tres cajas de      */
/* 160 × 66 a y = 170 (x = 230, 420, 610); flechas a y = 203.          */
/* Zona → evaluación: 252→262. Evaluación 380..620 × 268..344. Vuelta: */
/* desde (378, 318) a x = 120 y arriba hasta la caja de criterios      */
/* (acaba en 88: punta en 94). Rótulos de la vuelta a x = 132,         */
/* y = 280 y 302 (≤ 15 car. ≈ 143 px, antes de la evaluación).         */
/* ------------------------------------------------------------------ */

export function PiezasUnidad() {
  const u = "s2-unidad";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={356}
      etiqueta="Las piezas de una unidad: tus criterios y tu grupo dan forma a un reto o producto final; de ahí sale la secuencia de sesiones (inicio, desarrollo y cierre) y, al final, la evaluación, que vuelve a los criterios para comprobar que ninguno se queda sin instrumento."
      pie="Una unidad sólida empieza en tus criterios y vuelve a ellos: cada uno con su actividad y su instrumento."
    >
      <Caja x={40} y={12} w={240} h={76} tono="ambar" titulo="Tus criterios" lineas={["copiados literales"]} />
      <Caja x={380} y={12} w={240} h={100} tono="verde" titulo="Reto o producto" lineas={["con sentido fuera", "del aula"]} relleno={suave("verde")} />
      <Caja x={720} y={12} w={240} h={76} tono="azul" titulo="Tu grupo" lineas={["el de tu ficha"]} />
      <Flecha uid={u} d="M282 50 H374" tono="ambar" />
      <Flecha uid={u} d="M718 50 H626" tono="azul" />

      <Flecha uid={u} d="M500 114 V128" tono="verde" />
      <Zona x={210} y={134} w={580} h={116} tono="verde" rotulo="La secuencia" />
      <Caja x={230} y={170} w={160} h={66} tono="verde" titulo="Inicio" lineas={["el reto"]} />
      <Caja x={420} y={170} w={160} h={66} tono="verde" titulo="Desarrollo" lineas={["practicar"]} />
      <Caja x={610} y={170} w={160} h={66} tono="verde" titulo="Cierre" lineas={["presentar"]} />
      <Flecha uid={u} d="M392 203 H414" tono="verde" />
      <Flecha uid={u} d="M582 203 H604" tono="verde" />

      <Flecha uid={u} d="M500 252 V262" tono="ambar" />
      <Caja x={380} y={268} w={240} h={76} tono="ambar" titulo="La evaluación" lineas={["criterio ↔ instrumento"]} />
      <Flecha uid={u} d="M378 318 H120 V94" tono="ambar" discontinua />
      <T x={132} y={280} color={fuerte("ambar")} peso={700}>
        ningún criterio
      </T>
      <T x={132} y={302} color={fuerte("ambar")} peso={700}>
        sin instrumento
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Las siete piezas del prompt de una lámina                            */
/* Hoja 9:16: 20..222 × 10..366 (202 × 356). Marcas numeradas (r = 12) */
/* en x = 206, y = 24, 55, 124, 178, 236, 288, 340. Leyenda a la       */
/* derecha: título (negrita 18) en x = 262, y = 36 + 50k; explicación  */
/* (16) 22 debajo (la más larga ≈ 435 px, acaba antes de 700). Guías   */
/* discontinuas de (220, marca) a (256, título − 6): bajan en orden,   */
/* no se cruzan. Dentro de la hoja, solo formas: barra del título,     */
/* ilustración, rótulos, recuadros, paleta y leyenda con flecha.       */
/* ------------------------------------------------------------------ */

const PIEZAS: { tono: TonoSvg; titulo: string; d: string; marca: number }[] = [
  { tono: "azul", titulo: "Formato y destino", d: "Vertical 9:16, en español y para tu curso concreto.", marca: 24 },
  { tono: "morado", titulo: "Título y subtítulo, literales", d: "Escríbelos tú entre comillas: si no, se inventa uno.", marca: 55 },
  { tono: "verde", titulo: "La ilustración central", d: "Describe la escena entera y desde dónde se ve.", marca: 124 },
  { tono: "ambar", titulo: "Cada elemento con su definición", d: "El 80 % del resultado: la frase exacta, dictada por ti.", marca: 178 },
  { tono: "rosa", titulo: "Recuadros de ideas clave", d: "Dos o tres frases que quieres que se queden.", marca: 236 },
  { tono: "gris", titulo: "Paleta y estilo", d: "Colores y estética: lo que la aleja del banco de imágenes.", marca: 288 },
  { tono: "azul", titulo: "Jerarquía y acabado", d: "Flechas, leyendas y letra grande: legible desde el fondo.", marca: 340 },
];

export function SietePiezas() {
  const u = "s2-lamina";
  const papel = "var(--dg-papel)";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={372}
      etiqueta="Anatomía de una lámina educativa: una hoja vertical con siete piezas numeradas —formato y destino, título y subtítulo literales, ilustración central, cada elemento con su definición, recuadros de ideas clave, paleta y estilo, y jerarquía y acabado— explicadas a la derecha."
      pie="La pieza 4 es la que más pesa: el texto de la lámina lo escribes tú; la IA solo lo dibuja."
    >
      {/* La hoja */}
      <rect x={20} y={10} width={202} height={356} rx={10} fill={papel} stroke={linea("gris")} strokeWidth={2} />
      <rect x={36} y={40} width={150} height={30} rx={6} fill={suave("morado")} stroke={linea("morado")} strokeWidth={2} />
      <circle cx={112} cy={124} r={40} fill={suave("verde")} stroke={linea("verde")} strokeWidth={2} />
      <circle cx={112} cy={124} r={13} fill={linea("verde")} />
      <path d="M88 154 L66 168 M136 154 L158 168" fill="none" stroke={linea("ambar")} strokeWidth={2} />
      <rect x={30} y={168} width={64} height={20} rx={4} fill={suave("ambar")} stroke={linea("ambar")} strokeWidth={2} />
      <rect x={128} y={168} width={64} height={20} rx={4} fill={suave("ambar")} stroke={linea("ambar")} strokeWidth={2} />
      <rect x={30} y={214} width={76} height={44} rx={6} fill={suave("rosa")} stroke={linea("rosa")} strokeWidth={2} />
      <rect x={116} y={214} width={76} height={44} rx={6} fill={suave("rosa")} stroke={linea("rosa")} strokeWidth={2} />
      {(["azul", "verde", "ambar", "rosa"] as TonoSvg[]).map((t, i) => (
        <rect key={t} x={34 + i * 26} y={278} width={20} height={20} rx={4} fill={fuerte(t)} />
      ))}
      <Flecha uid={u} d="M34 336 H74" tono="gris" />
      <rect x={86} y={328} width={96} height={6} rx={3} fill={linea("gris")} />
      <rect x={86} y={342} width={70} height={6} rx={3} fill={linea("gris")} />

      {/* Marcas, guías y leyenda */}
      {PIEZAS.map((p, k) => {
        const ty = 36 + 50 * k;
        return (
          <g key={p.titulo}>
            <path d={`M220 ${p.marca} L256 ${ty - 6}`} fill="none" stroke={linea("gris")} strokeWidth={1.5} strokeDasharray="4 4" />
            <circle cx={206} cy={p.marca} r={12} fill={fuerte(p.tono)} />
            <T x={206} y={p.marca + 6} ancla="middle" peso={800} color={papel}>
              {String(k + 1)}
            </T>
            <T x={262} y={ty} tam={18} peso={800} color={fuerte(p.tono)}>
              {p.titulo}
            </T>
            <T x={262} y={ty + 22}>
              {p.d}
            </T>
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Del guion a las diapositivas                                         */
/* Cuatro cajas de 200 × 100 a y = 20, separadas 50: x = 20, 270, 520, */
/* 770. Flechas a y = 70 de x + 202 a la siguiente − 6. Rótulo de quién */
/* lo hace bajo cada caja, a y = 150 (≤ 16 car. ≈ 152 px).             */
/* ------------------------------------------------------------------ */

const GUION: { titulo: string; lineas: [string, string]; tono: TonoSvg; rotulo: string }[] = [
  { titulo: "Tu guion", lineas: ["qué se entiende", "y en qué orden"], tono: "azul", rotulo: "lo pones tú" },
  { titulo: "Copilot", lineas: ["agente de", "PowerPoint"], tono: "morado", rotulo: "la IA maqueta" },
  { titulo: "Diapositivas", lineas: ["una idea en cada", "pocas palabras"], tono: "morado", rotulo: "lo que proyectas" },
  { titulo: "Tu revisión", lineas: ["datos, faltas y", "notas del orador"], tono: "verde", rotulo: "lo cierras tú" },
];

export function GuionDiapositivas() {
  const u = "s2-guion";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={165}
      etiqueta="Del guion a las diapositivas: tú escribes el guion, el agente de PowerPoint de Copilot lo maqueta en diapositivas de una idea cada una y tú revisas datos, faltas y notas del orador."
      pie="Lo que delegas es el diseño, nunca el discurso."
    >
      {GUION.map((g, i) => {
        const x = 20 + i * 250;
        return (
          <g key={g.titulo}>
            <Caja x={x} y={20} w={200} h={100} tono={g.tono} titulo={g.titulo} lineas={g.lineas} />
            <T x={x + 100} y={150} ancla="middle" peso={700} color={fuerte(g.tono)}>
              {g.rotulo}
            </T>
            {i < GUION.length - 1 ? <Flecha uid={u} d={`M${x + 202} 70 H${x + 244}`} /> : null}
          </g>
        );
      })}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* De Copilot a Aules                                                   */
/* Zonas a y = 10, alto 160: 8..202 (Copilot), 220..406 (tu ordenador) */
/* y 424..1028 (Aules); rótulo a y = 38. Cinco cajas de 170 × 76 a     */
/* y = 66: x = 20, 228, 440, 638, 836 (la última acaba en 1006).       */
/* Flechas a y = 104, del borde derecho + 2 a la siguiente − 6; las    */
/* que cruzan de zona miden 30 para que la punta no se pierda.         */
/* ------------------------------------------------------------------ */

const AULES: { titulo: string; linea: string; tono: TonoSvg; x: number }[] = [
  { titulo: "Tu prompt", linea: "pide el GIFT", tono: "azul", x: 20 },
  { titulo: "preguntas.txt", linea: "texto en UTF-8", tono: "gris", x: 228 },
  { titulo: "Importar", linea: "en el banco", tono: "ambar", x: 440 },
  { titulo: "Revisar", linea: "cada respuesta", tono: "rosa", x: 638 },
  { titulo: "Usarlas", linea: "como cuestionario", tono: "verde", x: 836 },
];

export function FlujoAules() {
  const u = "s2-aules";
  return (
    <Figura
      uid={u}
      ancho={1040}
      alto={180}
      etiqueta="De Copilot a Aules: en Copilot pides las preguntas en formato GIFT; en tu ordenador las guardas como fichero de texto; en Aules las importas en el banco de preguntas, revisas cada respuesta y las usas en un cuestionario."
      pie="La IA escribe el fichero; Aules lo importa; tú revisas cada respuesta antes de que lo vea el alumnado."
    >
      <Zona x={8} y={10} w={194} h={160} tono="azul" rotulo="En Copilot" />
      <Zona x={220} y={10} w={186} h={160} tono="gris" rotulo="En tu ordenador" />
      <Zona x={424} y={10} w={604} h={160} tono="ambar" rotulo="En Aules" />
      {AULES.map((a, i) => (
        <g key={a.titulo}>
          <Caja x={a.x} y={66} w={170} h={76} tono={a.tono} titulo={a.titulo} lineas={[a.linea]} mono={i === 1} />
          {i < AULES.length - 1 ? <Flecha uid={u} d={`M${a.x + 172} 104 H${AULES[i + 1].x - 6}`} /> : null}
        </g>
      ))}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Tu biblioteca de prompts                                             */
/* Cuatro cajas de 200 × 76 a y = 24, x = 20, 270, 520, 770 (hueco 50).*/
/* Flechas a y = 62. Vuelta: desde la última (870, 102) baja a 150,    */
/* va a x = 120 y sube hasta la primera (punta en 106). Rótulo de la   */
/* vuelta centrado en x = 495, y = 176.                                */
/* ------------------------------------------------------------------ */

const CICLO: { titulo: string; linea: string; tono: TonoSvg }[] = [
  { titulo: "Lo pruebas", linea: "con un caso real", tono: "azul" },
  { titulo: "Lo ajustas", linea: "hasta que rinde", tono: "morado" },
  { titulo: "Lo guardas", linea: "con sus huecos", tono: "verde" },
  { titulo: "Lo reutilizas", linea: "el curso que viene", tono: "ambar" },
];

export function BibliotecaPrompts() {
  const u = "s2-biblio";
  return (
    <Figura
      uid={u}
      ancho={1000}
      alto={190}
      etiqueta="El ciclo de un buen prompt: lo pruebas con un caso real, lo ajustas hasta que rinde, lo guardas con sus huecos y lo reutilizas el curso que viene; y cada vez que lo usas, lo mejoras."
      pie="Un prompt guardado con sus huecos es trabajo que no vuelves a hacer."
    >
      {CICLO.map((c, i) => {
        const x = 20 + i * 250;
        return (
          <g key={c.titulo}>
            <Caja x={x} y={24} w={200} h={76} tono={c.tono} titulo={c.titulo} lineas={[c.linea]} />
            {i < CICLO.length - 1 ? <Flecha uid={u} d={`M${x + 202} 62 H${x + 244}`} /> : null}
          </g>
        );
      })}
      <Flecha uid={u} d="M870 102 V150 H120 V106" tono="gris" discontinua />
      <T x={495} y={176} ancla="middle" peso={700}>
        y lo mejoras cada vez que lo usas
      </T>
    </Figura>
  );
}
