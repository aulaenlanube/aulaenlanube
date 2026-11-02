import { Caja, Figura, Flecha, T, Zona, fuerte, linea, suave, type TonoSvg } from "@/app/programacion-ia/_video/svg";

// Figuras de la sesión 3 (evaluar y corregir). Diagramas estáticos para vídeo
// (docs/paginas-para-video.md): geometría calculada a mano y apuntada encima
// de cada figura, con las medidas de texto de _video/svg.tsx (sans 16 ≈ 9,5 px
// por carácter, negrita 18 ≈ 11,5). Cada <text> es corto y único en la página.

/* ------------------------------------------------------------------ */
/* El ciclo: tú defines → la IA propone → tú revisas → tú decides.     */
/* Cuatro cajas de 220 × 100 a y = 40, x = 20, 280, 540, 800 (huecos   */
/* de 40). Flechas a y = 90, del borde (+2) al siguiente (−6). Vuelta  */
/* de «revisas» a «defines» por debajo: x = 650 → y = 186 → x = 130 →  */
/* sube hasta 146 (6 bajo la caja). Rótulo a y = 210, centrado en 390  */
/* (41 car. ≈ 390 px: 195..585).                                       */
/* ------------------------------------------------------------------ */

export function CicloEvaluar() {
  const u = "s3-ciclo";
  return (
    <Figura
      uid={u}
      ancho={1040}
      alto={230}
      etiqueta="El ciclo de la evaluación con IA: tú defines los criterios, los pesos y la rúbrica; la IA propone una nota y un comentario con citas; tú revisas con el trabajo delante; tú decides, firmas la nota y la explicas. Si la propuesta no cuadra, vuelves a afinar la rúbrica o la nota."
      pie="La IA solo ocupa una de las cuatro casillas. Las otras tres son tuyas y no se delegan."
    >
      <Caja x={20} y={40} w={220} h={100} tono="azul" titulo="1 · Tú defines" lineas={["criterios, pesos", "y rúbrica"]} />
      <Caja x={280} y={40} w={220} h={100} tono="morado" titulo="2 · La IA propone" lineas={["nota y comentario", "con citas"]} relleno={suave("morado")} />
      <Caja x={540} y={40} w={220} h={100} tono="azul" titulo="3 · Tú revisas" lineas={["con el trabajo", "delante"]} />
      <Caja x={800} y={40} w={220} h={100} tono="verde" titulo="4 · Tú decides" lineas={["firmas la nota", "y la explicas"]} />

      <Flecha uid={u} d="M242 90 H274" />
      <Flecha uid={u} d="M502 90 H534" />
      <Flecha uid={u} d="M762 90 H794" />
      <Flecha uid={u} d="M650 142 V186 H130 V146" tono="ambar" discontinua />

      <T x={390} y={210} ancla="middle" peso={700} color={fuerte("ambar")}>
        si no cuadra, afinas la rúbrica o la nota
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Árbol de ponderación (ejemplo inventado de FP).                    */
/* Raíz 220 × 76 en x = 410, y = 16 (centro 520).                      */
/* RA: 200 × 76 a y = 140, x = 60, 420, 780 (centros 160, 520, 880).   */
/* CE del RA 2: 170 × 76 a y = 264, x = 245, 435, 625 (centros 330,    */
/* 520, 710; huecos de 20). Conectores en ángulo recto, punta a 6.     */
/* Notas de RA 1 y RA 3 a y = 250, centradas bajo su caja (19 car. ≈   */
/* 180 px: 70..250 y 790..970), por encima de la fila de CE (y ≥ 264). */
/* «Atención al cliente» (19 car. ≈ 180) cabe en 200 − 16 = 184.       */
/* ------------------------------------------------------------------ */

export function ArbolPonderacion() {
  const u = "s3-arbol";
  return (
    <Figura
      uid={u}
      ancho={1040}
      alto={356}
      etiqueta="Ejemplo de ponderación en FP: la nota del módulo es la media ponderada de tres resultados de aprendizaje (30, 45 y 25 por ciento). El RA 2 se reparte en tres criterios de evaluación: el a, 40 por ciento, con una práctica de taller; el b, 30 por ciento, con un examen escrito; y el c, 30 por ciento, con observación."
      pie="Ejemplo inventado. En ESO y Bachillerato, cambia RA por competencia específica y CE por criterio de evaluación."
    >
      <Caja x={410} y={16} w={220} h={76} tono="ambar" titulo="Nota del módulo" lineas={["media ponderada"]} relleno={suave("ambar")} />

      <Caja x={60} y={140} w={200} h={76} tono="azul" titulo="RA 1 · 30 %" lineas={["Planificación"]} />
      <Caja x={420} y={140} w={200} h={76} tono="azul" titulo="RA 2 · 45 %" lineas={["Presupuestos"]} relleno={suave("azul")} grosor={3} />
      <Caja x={780} y={140} w={200} h={76} tono="azul" titulo="RA 3 · 25 %" lineas={["Atención al cliente"]} />

      <Flecha uid={u} d="M520 94 V114 H160 V134" />
      <Flecha uid={u} d="M520 94 V134" />
      <Flecha uid={u} d="M520 94 V114 H880 V134" />

      <Caja x={245} y={264} w={170} h={76} tono="verde" titulo="CE a · 40 %" lineas={["práctica taller"]} />
      <Caja x={435} y={264} w={170} h={76} tono="verde" titulo="CE b · 30 %" lineas={["examen escrito"]} />
      <Caja x={625} y={264} w={170} h={76} tono="verde" titulo="CE c · 30 %" lineas={["observación"]} />

      <Flecha uid={u} d="M520 218 V240 H330 V258" tono="azul" />
      <Flecha uid={u} d="M520 218 V258" tono="azul" />
      <Flecha uid={u} d="M520 218 V240 H710 V258" tono="azul" />

      <T x={160} y={250} ancla="middle">
        sus CE: 50 % y 50 %
      </T>
      <T x={880} y={250} ancla="middle">
        sus CE: 60 % y 40 %
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* La prueba de los tres trabajos.                                     */
/* Trabajos: 200 × 76 en x = 20, y = 16, 114, 212 (centros 54, 152,    */
/* 250). Niveles: 220 × 56 en x = 560, y = 16, 88, 160, 232 (centros   */
/* 44, 116, 188, 260; acaban en 288). Flechas del borde derecho (222)  */
/* al izquierdo de cada nivel (554). Notas: 190 × 100 en x = 830,      */
/* y = 40 y 170. «dos trabajos caen» (17 car. ≈ 162) en 190 − 16.      */
/* ------------------------------------------------------------------ */

const NIVELES: { t: string; tono: TonoSvg }[] = [
  { t: "Insuficiente", tono: "rosa" },
  { t: "En desarrollo", tono: "ambar" },
  { t: "Competente", tono: "azul" },
  { t: "Excelente", tono: "verde" },
];

export function PruebaTresTrabajos() {
  const u = "s3-justicia";
  return (
    <Figura
      uid={u}
      ancho={1040}
      alto={304}
      etiqueta="La prueba de justicia: tres trabajos sin nombre, uno flojo (A01), uno medio (A02) y uno bueno (A03), caen en tres niveles distintos de la rúbrica: En desarrollo, Competente y Excelente. Si dos trabajos de calidad distinta caen en el mismo nivel, la rúbrica no pasa la prueba."
      pie="Tres trabajos de calidad distinta tienen que caer en tres niveles distintos. Si no, se reescribe la rúbrica."
    >
      <Caja x={20} y={16} w={200} h={76} tono="gris" titulo="Trabajo flojo" lineas={["código A01"]} />
      <Caja x={20} y={114} w={200} h={76} tono="gris" titulo="Trabajo medio" lineas={["código A02"]} />
      <Caja x={20} y={212} w={200} h={76} tono="gris" titulo="Trabajo bueno" lineas={["código A03"]} />

      {NIVELES.map((n, i) => (
        <Caja key={n.t} x={560} y={16 + i * 72} w={220} h={56} tono={n.tono} titulo={n.t} />
      ))}

      <Flecha uid={u} d="M222 54 L554 116" tono="verde" />
      <Flecha uid={u} d="M222 152 L554 188" tono="verde" />
      <Flecha uid={u} d="M222 250 L554 260" tono="verde" />

      <Caja x={830} y={40} w={190} h={100} tono="verde" titulo="Pasa la prueba" lineas={["cada trabajo cae", "en un nivel"]} />
      <Caja x={830} y={170} w={190} h={100} tono="rosa" titulo="No la pasa si…" lineas={["dos trabajos caen", "en el mismo nivel"]} discontinua />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Anonimizar: la lista se queda en tu ordenador.                      */
/* Zonas de 380 × 248: tu ordenador x = 16..396, Copilot x = 644..1024 */
/* (hueco 396..644 para los rótulos de las flechas, ≤ 22 car. ≈ 209).  */
/* Cajas de la izquierda: 166 × 100 en x = 36 y 214, y = 56; «Tú       */
/* reasignas» 344 × 76 en x = 36, y = 176. Derecha: 340 de ancho en    */
/* x = 664, y = 56 (alto 100) y 176 (alto 76). Flechas: ida a y = 86   */
/* (382 → 658), vuelta a y = 128 (662 → 386), rótulos a y = 76 y 152.  */
/* ------------------------------------------------------------------ */

export function Anonimizar() {
  const u = "s3-anon";
  return (
    <Figura
      uid={u}
      ancho={1040}
      alto={280}
      etiqueta="Cómo se anonimiza: en tu ordenador guardas la lista que une cada nombre con su código y preparas los trabajos con A01, A02 y sin nombres. A Copilot, con la cuenta del centro, solo le llegan la rúbrica y los trabajos con código; devuelve los comentarios por código y tú los reasignas a cada alumno."
      pie="La lista que une cada código con su nombre no sale nunca de tu ordenador. Copilot solo ve códigos."
    >
      <Zona x={16} y={16} w={380} h={248} tono="azul" rotulo="Tu ordenador" />
      <Caja x={36} y={56} w={166} h={100} tono="azul" titulo="La lista" lineas={["nombre → código", "solo aquí"]} />
      <Caja x={214} y={56} w={166} h={100} tono="azul" titulo="Los trabajos" lineas={["con A01, A02…", "sin nombres"]} />
      <Caja x={36} y={176} w={344} h={76} tono="azul" titulo="Tú reasignas" lineas={["cada comentario, a su alumno"]} />

      <Zona x={644} y={16} w={380} h={248} tono="verde" rotulo="Copilot con la cuenta del centro" />
      <Caja x={664} y={56} w={340} h={100} tono="verde" titulo="Copilot Chat" lineas={["aplica tu rúbrica", "y redacta por código"]} />
      <Caja x={664} y={176} w={340} h={76} tono="verde" titulo="Protección de datos" lineas={["no entrena con lo que pegas"]} />

      <Flecha uid={u} d="M382 86 H658" tono="azul" />
      <Flecha uid={u} d="M662 128 H386" tono="verde" />
      <Flecha uid={u} d="M297 158 V170" />

      <T x={520} y={76} ancla="middle" peso={700} color={fuerte("azul")}>
        rúbrica + trabajos
      </T>
      <T x={520} y={152} ancla="middle" peso={700} color={fuerte("verde")}>
        comentarios por código
      </T>
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El flujo de un examen: foto → rúbrica → propuesta → revisión →      */
/* decisión. Cajas de 170 × 76 a y = 30, x = 15 + i·210 (15, 225, 435, */
/* 645, 855; la última acaba en 1025). Flechas a y = 68. Leyenda a     */
/* y = 150: cuadros de 18 en x = 300, 480, 670 con su texto a +26.     */
/* «la tuya, entera» (15 car. ≈ 143) cabe en 170 − 16 = 154.           */
/* ------------------------------------------------------------------ */

const FLUJO: { t: string; l: string; tono: TonoSvg }[] = [
  { t: "1 · Foto", l: "hoja con código", tono: "azul" },
  { t: "2 · Rúbrica", l: "la tuya, entera", tono: "azul" },
  { t: "3 · Propuesta", l: "nota y citas", tono: "morado" },
  { t: "4 · Revisión", l: "tú, con la foto", tono: "azul" },
  { t: "5 · Decisión", l: "la nota es tuya", tono: "verde" },
];

const LEYENDA: { t: string; x: number; tono: TonoSvg }[] = [
  { t: "lo haces tú", x: 300, tono: "azul" },
  { t: "lo hace la IA", x: 480, tono: "morado" },
  { t: "decides tú", x: 670, tono: "verde" },
];

export function FlujoExamen() {
  const u = "s3-flujo";
  return (
    <Figura
      uid={u}
      ancho={1040}
      alto={176}
      etiqueta="Flujo para corregir un examen con IA en cinco pasos: la foto de la hoja con código en vez de nombre y tu rúbrica entera las pones tú; la propuesta de nota con citas la hace la IA; la revisión, con la foto delante, la haces tú; y la decisión de la nota es tuya."
      pie="Cinco pasos y solo uno es de la IA: la propuesta. Sin tu revisión no hay corrección."
    >
      {FLUJO.map((f, i) => (
        <Caja
          key={f.t}
          x={15 + i * 210}
          y={30}
          w={170}
          h={76}
          tono={f.tono}
          titulo={f.t}
          lineas={[f.l]}
          relleno={f.tono === "morado" ? suave("morado") : undefined}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Flecha key={i} uid={u} d={`M${187 + i * 210} 68 H${219 + i * 210}`} />
      ))}
      {LEYENDA.map((l) => (
        <g key={l.t}>
          <rect x={l.x} y={136} width={18} height={18} rx={4} fill={suave(l.tono)} stroke={linea(l.tono)} strokeWidth={2} />
          <T x={l.x + 26} y={151} color={fuerte(l.tono)} peso={700}>
            {l.t}
          </T>
        </g>
      ))}
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* El caso real: doble corrección anonimizada.                         */
/* Entrega 150 × 76 en x = 16, y = 92 (centro y = 130). Modelos de     */
/* 224 × 76 en x = 226: centro a y = 20 (centro 58), segundo a y = 164 */
/* (centro 202). Media 150 en x = 500; profesor 170 en x = 690;        */
/* alumno 140 en x = 890 (acaba en 1030); los tres a y = 92.           */
/* Bifurcación a x = 196 y unión a x = 475, llegando a 118 y 142.      */
/* ------------------------------------------------------------------ */

export function DobleCorreccion() {
  const u = "s3-doble";
  return (
    <Figura
      uid={u}
      ancho={1040}
      alto={256}
      etiqueta="La doble corrección del curso de Programación con IA: cada entrega la corrigen por separado, con la misma rúbrica, el modelo de IA del centro, con los datos dentro del instituto, y un segundo modelo que recibe la entrega anonimizada. Se hace la media, el profesor la revisa y la publica, y el alumno ve el método y el informe."
      pie="Dos correcciones independientes, la media y una persona que revisa y publica. El alumnado sabe cómo se ha hecho."
    >
      <Caja x={16} y={92} w={150} h={76} tono="gris" titulo="La entrega" lineas={["el proyecto"]} />
      <Caja x={226} y={20} w={224} h={76} tono="verde" titulo="Modelo del centro" lineas={["datos en el instituto"]} />
      <Caja x={226} y={164} w={224} h={76} tono="morado" titulo="Segundo modelo" lineas={["entrega anonimizada"]} />
      <Caja x={500} y={92} w={150} h={76} tono="ambar" titulo="Media" lineas={["misma rúbrica"]} relleno={suave("ambar")} />
      <Caja x={690} y={92} w={170} h={76} tono="azul" titulo="El profesor" lineas={["revisa y publica"]} />
      <Caja x={890} y={92} w={140} h={76} tono="azul" titulo="El alumno" lineas={["ve el método"]} />

      <Flecha uid={u} d="M168 130 H196 V58 H220" />
      <Flecha uid={u} d="M168 130 H196 V202 H220" />
      <Flecha uid={u} d="M452 58 H475 V118 H494" tono="verde" />
      <Flecha uid={u} d="M452 202 H475 V142 H494" tono="morado" />
      <Flecha uid={u} d="M652 130 H684" tono="ambar" />
      <Flecha uid={u} d="M862 130 H884" tono="azul" />
    </Figura>
  );
}

/* ------------------------------------------------------------------ */
/* Producto frente a producto + proceso.                               */
/* Zona de arriba 1008 × 104 en y = 16, con la caja «Entrega final»    */
/* 240 × 72 en x = 760, y = 36 (el rótulo ocupa ≈ 34..560).            */
/* Zona de abajo 1008 × 148 en y = 136; cinco cajas de 176 × 76 a      */
/* y = 184, x = 36 + i·198 (36, 234, 432, 630, 828; acaban en 1004).   */
/* Flechas a y = 222 (huecos de 22: del borde +2 al siguiente −6).     */
/* «en clase, a mano» (16 car. ≈ 152) cabe en 176 − 16 = 160.          */
/* ------------------------------------------------------------------ */

const HITOS: { t: string; l: string }[] = [
  { t: "1 · Idea", l: "en clase, a mano" },
  { t: "2 · Esbozo", l: "tú lo visas" },
  { t: "3 · Borrador", l: "con tus fuentes" },
  { t: "4 · Final", l: "y qué IA usó" },
  { t: "5 · Defensa", l: "3 minutos, oral" },
];

export function ProductoProceso() {
  const u = "s3-proceso";
  return (
    <Figura
      uid={u}
      ancho={1040}
      alto={300}
      etiqueta="Dos formas de pedir una tarea. Solo el producto, una entrega final un viernes, se puede encargar entera a una IA. Producto y proceso, en cinco hitos: la idea en clase y a mano, un esbozo que visa el docente, un borrador con las fuentes que da el docente, la versión final declarando qué IA se usó y una defensa oral de tres minutos."
      pie="Cada hito deja una evidencia en clase. Fingir todo el proceso cuesta más que hacer la tarea."
    >
      <Zona x={16} y={16} w={1008} h={104} tono="rosa" rotulo="Solo el producto: se puede encargar entero a una IA" />
      <Caja x={760} y={36} w={240} h={72} tono="rosa" titulo="Entrega final" lineas={["un viernes, y listo"]} />

      <Zona x={16} y={136} w={1008} h={148} tono="verde" rotulo="Producto y proceso: la IA ayuda, pero no lo hace todo" />
      {HITOS.map((h, i) => (
        <Caja key={h.t} x={36 + i * 198} y={184} w={176} h={76} tono="verde" titulo={h.t} lineas={[h.l]} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Flecha key={i} uid={u} d={`M${214 + i * 198} 222 H${228 + i * 198}`} tono="verde" />
      ))}
    </Figura>
  );
}
