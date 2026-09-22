"use client";

import {
  AMPLIO,
  Caja,
  Curva,
  FS,
  FS_TIT,
  FONDO,
  Lienzo,
  MEDIO,
  Numero,
  Parrafo,
  Pildora,
  Rotulo,
  SUAVE,
  TENUE,
  TINTA,
  TONOS,
  Tramo,
  Nodo,
  altoApilado,
  altoCaja,
  anchoPildora,
  apilar,
  parteEnLineas,
  type Paso,
  type Tono,
} from "./base";

// ════════════════════════════════════════════════════════════════════════════
// Diagramas del BLOQUE 1 · El método: prompts que rinden.
// Geometría calculada a partir de los datos (nunca a ojo): el alto del viewBox
// se deduce de las líneas en las que cae cada texto, así que añadir o alargar
// un bloque nunca deja el diagrama cortado ni con un hueco al final.
// ════════════════════════════════════════════════════════════════════════════

const grados = (g: number) => (g * Math.PI) / 180;
const puntoX = (cx: number, r: number, g: number) => cx + r * Math.cos(grados(g));
const puntoY = (cy: number, r: number, g: number) => cy + r * Math.sin(grados(g));
/** Arco de circunferencia en sentido horario, de g1 a g2 (grados). */
const arco = (cx: number, cy: number, r: number, g1: number, g2: number) =>
  `M ${puntoX(cx, r, g1).toFixed(1)} ${puntoY(cy, r, g1).toFixed(1)} ` +
  `A ${r} ${r} 0 0 1 ${puntoX(cx, r, g2).toFixed(1)} ${puntoY(cy, r, g2).toFixed(1)}`;

// ════════════════════════════════════════════════════════════════════════════
// 1 · Anatomía de un prompt profesional
// Rejilla: píldora monoespaciada en x = 16, caja en x = 155 (ancho 513).
// Cada bloque se apila con 16 de separación; la altura sale de parteEnLineas.
// ════════════════════════════════════════════════════════════════════════════

type Bloque = { id: string; mono: string; tono: Tono; titulo: string; d: string };

const BLOQUES: Bloque[] = [
  {
    id: "rol",
    mono: "# Rol",
    tono: "azul",
    titulo: "Quién contesta",
    d: "Un especialista concreto contesta distinto que «una IA». Di la especialidad, el nivel y los años de oficio.",
  },
  {
    id: "contexto",
    mono: "# Contexto",
    tono: "morado",
    titulo: "Para quién y para qué",
    d: "Etapa, curso o cuerpo, comunidad autónoma, norma que lo rige y qué vas a hacer después con la respuesta.",
  },
  {
    id: "tarea",
    mono: "# Tarea",
    tono: "verde",
    titulo: "Un solo encargo, en imperativo",
    d: "Un verbo y un entregable. Si hay dos encargos, son dos prompts distintos.",
  },
  {
    id: "reglas",
    mono: "# Reglas",
    tono: "ambar",
    titulo: "Lo que NO puede hacer",
    d: "Aquí se gana o se pierde: prohíbe el relleno, exige cifras con unidades y obliga a marcar [COMPROBAR] lo que no sepa seguro.",
  },
  {
    id: "formato",
    mono: "# Formato",
    tono: "rosa",
    titulo: "Con qué forma la quieres",
    d: "Extensión, estructura y destino: «dos folios, apartados numerados, sin introducción».",
  },
  {
    id: "control",
    mono: "# Control",
    tono: "gris",
    titulo: "Cómo compruebas que sirve",
    d: "Que cierre con tres preguntas de tribunal sobre lo que acaba de escribir. Si no las sabes responder, todavía no es tuyo.",
  },
];

const PASOS_ANATOMIA: Paso[] = [
  {
    id: "rol",
    tono: "azul",
    titulo: "# Rol — quién contesta",
    texto:
      "Sin rol, el modelo responde como una enciclopedia de nivel medio. Con rol, escoge el vocabulario, el nivel de detalle y hasta los ejemplos de ese oficio. Es la línea más barata y la que más cambia el resultado.",
    ejemplo:
      "# Rol\nEres catedrático de Tecnología de Secundaria con 25 años\nen tribunales de oposición de la Comunitat Valenciana.",
    clave: "Un rol concreto vale más que tres párrafos de instrucciones.",
  },
  {
    id: "contexto",
    tono: "morado",
    titulo: "# Contexto — para quién y para qué",
    texto:
      "El modelo no sabe si preparas 2.º de ESO o una oposición, ni si la respuesta va a un folio manuscrito o a una pantalla. Dale el marco: etapa, curso, comunidad, norma aplicable y destino final del texto.",
    ejemplo:
      "# Contexto\nOposición al cuerpo de Secundaria, especialidad Tecnología,\nComunitat Valenciana. Temario de 71 temas.\nLo que me des lo escribo a mano en dos horas de examen.",
    clave: "Si no dices el destino, te escribe para nadie.",
  },
  {
    id: "tarea",
    tono: "verde",
    titulo: "# Tarea — un solo encargo",
    texto:
      "Un verbo en imperativo y un entregable. «Ayúdame con el tema 34» no es una tarea; «redacta el esqueleto del tema 34 en una página» sí. Cuando pides dos cosas a la vez, las dos salen a medias.",
    ejemplo:
      "# Tarea\nRedacta el esqueleto del tema 34 en una sola página:\nbloques, sub-bloques y una frase de enlace entre bloques.",
    clave: "Dos encargos = dos prompts. Siempre.",
  },
  {
    id: "reglas",
    tono: "ambar",
    titulo: "# Reglas — los límites",
    texto:
      "Es el bloque que separa un texto de opositor de un texto de estudiante. Las restricciones no empobrecen la respuesta: la obligan a ser concreta. Y la regla del [COMPROBAR] es tu seguro contra la referencia inventada.",
    ejemplo:
      "# Reglas\n1) Nunca inventes normativa: si no estás seguro, escribe [COMPROBAR].\n2) Cada afirmación técnica, con su cifra y su unidad.\n3) Cero introducciones floridas y cero conclusiones de relleno.\n4) Si el encargo es demasiado grande, dime en cuántos pasos\n   me lo das y no empieces.",
    clave: "Prohibir es dirigir. Lo que no prohíbes, aparece.",
  },
  {
    id: "formato",
    tono: "rosa",
    titulo: "# Formato — la forma de la respuesta",
    texto:
      "Extensión, estructura y soporte. Si vas a copiar el resultado a mano en un examen, dilo: cambia por completo la densidad del texto. Si va a una diapositiva, también.",
    ejemplo:
      "# Formato\nMáximo dos folios. Apartados numerados.\nCada apartado: idea principal en negrita + tres líneas de desarrollo.\nSin introducción y sin despedida.",
  },
  {
    id: "control",
    tono: "gris",
    titulo: "# Control — la prueba de que es tuyo",
    texto:
      "El bloque que casi nadie escribe y el que más rendimiento da. Conviertes cada respuesta en un examen sobre esa respuesta. Si no sabes contestar las tres preguntas, ese texto todavía no lo has estudiado: lo has recibido.",
    ejemplo:
      "# Control\nTermina con tres preguntas incómodas que me haría un vocal\nsobre lo que acabas de escribir. No me des las respuestas.",
    clave: "La IA redacta; el control es lo que convierte el texto en conocimiento tuyo.",
  },
];

const X_PILL = 16;
const X_CAJA = 155;
const W_CAJA = MEDIO - 12 - X_CAJA; // 513
const CHARS_ANATOMIA = 56; // lo que cabe en W_CAJA a 16 px

// Reparto vertical, calculado una sola vez al cargar el módulo.
const PUESTOS = apilar(
  BLOQUES.map((b) => ({ ...b, lineas: parteEnLineas(b.d, CHARS_ANATOMIA) })),
  (b) => altoCaja(b.lineas.length),
  16,
  46,
);
const ALTO_ANATOMIA = altoApilado(PUESTOS, 14);

export function AnatomiaPrompt() {
  const puestos = PUESTOS;
  return (
    <Lienzo
      ancho={MEDIO}
      alto={ALTO_ANATOMIA}
      pasos={PASOS_ANATOMIA}
      etiqueta="Anatomía de un prompt profesional: seis bloques encadenados —rol, contexto, tarea, reglas, formato y control— cada uno con su encabezado y su función."
      pie="Seis bloques. Los cuatro primeros los escribe todo el mundo; los dos últimos son los que marcan la diferencia. Pulsa cualquiera."
      dibuja={(ctx) => (
        <>
          <Rotulo x={X_PILL} y={28} texto="EL PROMPT, BLOQUE A BLOQUE" tam={FS} peso={800} color={TINTA} />
          <Rotulo
            x={MEDIO - 12}
            y={28}
            texto="se pega tal cual en el chat"
            tam={FS}
            peso={500}
            color={TENUE}
            ancla="end"
          />
          {puestos.map((b, i) => {
            const centro = b.y + b.h / 2;
            const siguiente = puestos[i + 1];
            return (
              <g key={b.id}>
                {/* Raíl que encadena los bloques: es un único documento. */}
                {siguiente ? (
                  <Tramo
                    x1={X_PILL + 14}
                    y1={centro + 14}
                    x2={X_PILL + 14}
                    y2={siguiente.y + siguiente.h / 2 - 14}
                    tono="gris"
                    uid={ctx.uid}
                    punta={false}
                    grosor={2}
                    discontinuo
                  />
                ) : null}
                <Pildora x={X_PILL} y={centro - 14} texto={b.mono} tono={b.tono} mono />
                <Tramo
                  x1={X_PILL + anchoPildora(b.mono, true) + 6}
                  y1={centro}
                  x2={X_CAJA - 6}
                  y2={centro}
                  tono={b.tono}
                  uid={ctx.uid}
                  grosor={2.5}
                />
                <Caja
                  x={X_CAJA}
                  y={b.y}
                  w={W_CAJA}
                  h={b.h}
                  tono={b.tono}
                  ctx={ctx}
                  paso={b.id}
                  titulo={b.titulo}
                  lineas={b.lineas}
                  etiqueta={`Ver el bloque ${b.mono}: ${b.titulo}`}
                />
              </g>
            );
          })}
        </>
      )}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 2 · El metaprompt (el ciclo)
// Rejilla: centro (280, 252), anillo r = 152, nodos r = 70 en −90°, 0°, 90°,
// 180°. Los arcos se recortan 28° a cada lado para no entrar en el nodo.
// ════════════════════════════════════════════════════════════════════════════

const CX = 280;
const CY = 252;
const ANILLO = 152;
const R_NODO = 70;
const RECORTE = 29; // grados que se come cada nodo + 6 de aire

const NODOS_META: { id: string; g: number; tono: Tono; lineas: string[]; n: number }[] = [
  { id: "m1", g: -90, tono: "azul", lineas: ["Cuenta qué", "necesitas"], n: 1 },
  { id: "m2", g: 0, tono: "morado", lineas: ["Pide el", "PROMPT"], n: 2 },
  { id: "m3", g: 90, tono: "ambar", lineas: ["Retócalo", "tú"], n: 3 },
  { id: "m4", g: 180, tono: "verde", lineas: ["Ejecútalo", "en limpio"], n: 4 },
];

const PASOS_META: Paso[] = [
  {
    id: "m1",
    tono: "azul",
    titulo: "1 · Cuenta qué necesitas, en bruto",
    texto:
      "Aquí no hay que escribir bien. Suelta el encargo como se lo contarías a un compañero en el pasillo, con sus imprecisiones: qué quieres, para quién, con qué restricciones y qué te preocupa. Treinta segundos.",
    ejemplo:
      "Necesito algo para explicar las puertas lógicas en 4.º de ESO,\nque se vea bien proyectado, que el alumnado toque algo,\ny que no dependa de internet porque en el aula 12 no va.",
  },
  {
    id: "m2",
    tono: "morado",
    titulo: "2 · Pídele el prompt, no la respuesta",
    texto:
      "Este es el giro entero. En vez de pedirle la solución, le pides que escriba el encargo perfecto para conseguirla. El modelo conoce sus propios puntos ciegos mucho mejor que tú, y te devuelve un prompt con bloques que a ti no se te habrían ocurrido.",
    ejemplo:
      "No me des todavía la respuesta.\nEscribe el PROMPT ideal para conseguir lo que te acabo de contar.\nInclúyelo todo: rol, contexto, tarea, reglas, formato y control.\nAntes de escribirlo, hazme las preguntas que te falten por saber.",
    clave: "«Escríbeme el prompt» es la frase que más rendimiento da de toda la sesión.",
  },
  {
    id: "m3",
    tono: "ambar",
    titulo: "3 · Retócalo tú: aquí entra el criterio docente",
    texto:
      "El prompt que te devuelve es un borrador bueno, no un original. Tú le añades lo que la máquina no sabe: el curso exacto, el nivel real de tu grupo, el tiempo de que dispones, la norma que te obliga y las manías de tu tribunal. Eso no se delega.",
    clave: "Lo que corriges del prompt es exactamente lo que aportas como docente.",
  },
  {
    id: "m4",
    tono: "verde",
    titulo: "4 · Ejecútalo en una conversación nueva",
    texto:
      "Pega el prompt afinado en un chat limpio. Nuevo, sin el ruido de la conversación anterior: los modelos arrastran lo hablado, y ese arrastre te contamina el resultado. Si lo que sale no es lo que querías, no discutas con la respuesta: vuelve al paso 3 y arregla el prompt.",
    clave: "Se depura el prompt, no la respuesta. Discutir con la salida es perder el tiempo.",
  },
];

export function CicloMetaprompt() {
  return (
    <Lienzo
      ancho={560}
      alto={504}
      pasos={PASOS_META}
      etiqueta="Ciclo del metaprompt en cuatro pasos: cuentas qué necesitas, le pides que escriba el prompt, lo retocas tú y lo ejecutas en una conversación nueva."
      pie="El metaprompt: en vez de pedir la respuesta, pides el encargo. Pulsa cada paso del ciclo."
      dibuja={(ctx) => (
        <>
          {/* Arcos del ciclo, de nodo a nodo */}
          {NODOS_META.map((n, i) => {
            const sig = NODOS_META[(i + 1) % NODOS_META.length];
            const g1 = n.g + RECORTE;
            const g2 = (sig.g < n.g ? sig.g + 360 : sig.g) - RECORTE;
            return (
              <Curva
                key={`arco-${n.id}`}
                d={arco(CX, CY, ANILLO, g1, g2)}
                tono={n.tono}
                uid={ctx.uid}
                grosor={3}
              />
            );
          })}

          {/* Corazón del ciclo */}
          <circle cx={CX} cy={CY} r={62} fill={FONDO} />
          <circle cx={CX} cy={CY} r={58} fill="var(--dg-papel)" stroke={TONOS.gris.borde} strokeWidth={2} />
          {/* El rótulo del centro cabe holgado en el disco de r = 58: dos
              líneas de 16, la más ancha «METAPROMPT» (≈ 91 de caja). Nada más
              entra aquí — lo que se salga de esa circunferencia pisa los arcos. */}
          <Parrafo
            x={CX}
            y={CY - 6}
            lineas={["EL", "METAPROMPT"]}
            color={TINTA}
            peso={800}
            tam={FS}
            interlineado={20}
            ancla="middle"
          />

          {NODOS_META.map((n) => (
            <Nodo
              key={n.id}
              cx={puntoX(CX, ANILLO, n.g)}
              cy={puntoY(CY, ANILLO, n.g)}
              r={R_NODO}
              tono={n.tono}
              ctx={ctx}
              paso={n.id}
              n={n.n}
              lineas={n.lineas}
              etiqueta={`Paso ${n.n}: ${n.lineas.join(" ")}`}
            />
          ))}
        </>
      )}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 3 · La cadena de prompts
// Rejilla: raíl vertical en x = 110 con los discos numerados; cajas desde
// x = 150 hasta x = 668. El arco de «volver atrás» ocupa el canal izquierdo.
// ════════════════════════════════════════════════════════════════════════════

type Eslabon = { id: string; tono: Tono; titulo: string; d: string };

const CADENA: Eslabon[] = [
  {
    id: "c1",
    tono: "azul",
    titulo: "La semilla: qué es y para quién",
    d: "El primer prompt levanta la estructura entera de una vez. No pidas «una pantalla»: pide la aplicación completa, aunque salga tosca.",
  },
  {
    id: "c2",
    tono: "morado",
    titulo: "La lógica: las reglas y los datos",
    d: "Ahora las fórmulas, los valores reales con sus unidades y lo que pasa en cada caso. Si los datos son inventados, se nota a distancia.",
  },
  {
    id: "c3",
    tono: "verde",
    titulo: "La pedagogía: qué aprende quien lo usa",
    d: "Retroalimentación que explica el error, progresión de dificultad y enunciados con contexto real. Es el paso que casi nadie pide.",
  },
  {
    id: "c4",
    tono: "ambar",
    titulo: "La estética: que entre por los ojos",
    d: "Tipografía, color, ritmo y animación. Siempre después de la lógica: maquillar algo que aún no funciona es tiempo tirado.",
  },
  {
    id: "c5",
    tono: "rosa",
    titulo: "El pulido: un fallo por petición",
    d: "«El botón de reiniciar no limpia el marcador: arréglalo sin tocar nada más.» Una cosa cada vez, y comprobando entre medias.",
  },
];

const PASOS_CADENA: Paso[] = [
  {
    id: "c1",
    tono: "azul",
    titulo: "1 · La semilla",
    texto:
      "Un solo prompt largo que describe la aplicación entera: qué es, para qué curso, qué se ve en pantalla y qué hace el usuario. Saldrá tosca, y da igual: lo que necesitas es el esqueleto completo sobre el que iterar.",
    clave: "Pide la aplicación entera, no una pantalla. Iterar sobre algo completo es rápido; montarla a trozos, no.",
  },
  {
    id: "c2",
    tono: "morado",
    titulo: "2 · La lógica y los datos",
    texto:
      "Las fórmulas con sus unidades, los valores de tabla reales, los casos límite. Aquí es donde se separa una demo de una herramienta: un profesor de Tecnología detecta un dato inventado en tres segundos.",
    ejemplo:
      "Usa estos valores reales, no inventes ninguno:\nacero S275 → E = 210 GPa, límite elástico 275 MPa, rotura 430 MPa.\nComprueba las unidades: σ [MPa] = F [N] / A [mm²].",
  },
  {
    id: "c3",
    tono: "verde",
    titulo: "3 · La pedagogía",
    texto:
      "El paso que casi nadie pide y el que convierte un juguete en material de aula: que el error se explique en vez de castigarse, que la dificultad suba, que los enunciados tengan contexto real y que el alumnado pueda equivocarse sin penalización.",
    clave: "Si no pides pedagogía, te devuelve un test. La pedagogía se pide explícitamente.",
  },
  {
    id: "c4",
    tono: "ambar",
    titulo: "4 · La estética",
    texto:
      "Paleta, tipografía, espaciado, transiciones. Después de la lógica, nunca antes: si maquillas algo que aún no funciona, cada arreglo posterior te rompe el diseño y vuelves a empezar.",
  },
  {
    id: "c5",
    tono: "rosa",
    titulo: "5 · El pulido, de uno en uno",
    texto:
      "Cada fallo, su petición. Descríbelo como lo describirías a un compañero: qué hiciste, qué esperabas y qué pasó. Y comprueba tú después de cada arreglo, porque el agente da por bueno lo que no ha ejecutado.",
    clave: "«Arréglalo todo» devuelve un revoltijo. «Arregla esto, sin tocar lo demás» devuelve un arreglo.",
  },
];

const X_RAIL = 110;
const X_CADENA = 150;
const W_CADENA = MEDIO - 12 - X_CADENA; // 518
const CHARS_CADENA = 57;

const PUESTOS_CADENA = apilar(
  CADENA.map((e) => ({ ...e, lineas: parteEnLineas(e.d, CHARS_CADENA) })),
  (e) => altoCaja(e.lineas.length),
  18,
  46,
);
const LINEAS_VUELTA = parteEnLineas(
  "Si un paso empeora el resultado, no lo parchees: deshaz y vuelve al anterior. En una conversación no hay nada irreversible.",
  CHARS_CADENA,
);
const Y_VUELTA = altoApilado(PUESTOS_CADENA, 18);
const H_VUELTA = altoCaja(LINEAS_VUELTA.length);
const ALTO_CADENA = Y_VUELTA + H_VUELTA + 16;
const centroCadena = (i: number) => PUESTOS_CADENA[i].y + PUESTOS_CADENA[i].h / 2;

export function CadenaDePrompts() {
  const puestos = PUESTOS_CADENA;
  const centro = centroCadena;
  const yVuelta = Y_VUELTA;
  const hVuelta = H_VUELTA;
  const lineasVuelta = LINEAS_VUELTA;
  return (
    <Lienzo
      ancho={MEDIO}
      alto={ALTO_CADENA}
      pasos={[
        ...PASOS_CADENA,
        {
          id: "vuelta",
          tono: "gris",
          titulo: "La red de seguridad: volver atrás",
          texto:
            "Es la diferencia con programar a mano. Cada paso de la cadena es un punto al que puedes regresar: si el prompt 4 te destroza lo que funcionaba en el 3, deshaces y lo pides de otra forma. Por eso conviene atreverse a pedir cosas radicales.",
          clave: "Guarda cada versión que te guste (un commit, una copia de la carpeta). Volver atrás solo es gratis si guardaste.",
        },
      ]}
      etiqueta="Cadena de prompts en cinco eslabones: semilla, lógica y datos, pedagogía, estética y pulido, con una vuelta atrás desde el final hasta el tercer eslabón."
      pie="Una aplicación no sale de un prompt: sale de una cadena. Este es el orden que funciona. Pulsa cada eslabón."
      dibuja={(ctx) => (
        <>
          <Rotulo x={16} y={28} texto="LA CADENA, EN ORDEN" tam={FS} peso={800} color={TINTA} />
          <Rotulo
            x={MEDIO - 12}
            y={28}
            texto="una conversación, cinco encargos"
            tam={FS}
            peso={500}
            color={TENUE}
            ancla="end"
          />

          {puestos.map((e, i) => {
            const cy = centro(i);
            const sig = puestos[i + 1];
            return (
              <g key={e.id}>
                {sig ? (
                  <Tramo
                    x1={X_RAIL}
                    y1={cy + 21}
                    x2={X_RAIL}
                    y2={centro(i + 1) - 23}
                    tono={sig.tono}
                    uid={ctx.uid}
                    grosor={3}
                  />
                ) : null}
                <Tramo
                  x1={X_RAIL + 18}
                  y1={cy}
                  x2={X_CADENA - 6}
                  y2={cy}
                  tono={e.tono}
                  uid={ctx.uid}
                  grosor={2.5}
                />
                <Numero cx={X_RAIL} cy={cy} n={i + 1} tono={e.tono} />
                <Caja
                  x={X_CADENA}
                  y={e.y}
                  w={W_CADENA}
                  h={e.h}
                  tono={e.tono}
                  ctx={ctx}
                  paso={e.id}
                  titulo={e.titulo}
                  lineas={e.lineas}
                  etiqueta={`Ver el eslabón ${i + 1}: ${e.titulo}`}
                />
              </g>
            );
          })}

          {/* Vuelta atrás: del bloque final al eslabón 3, por el canal izquierdo.
              El último punto de control comparte la y del destino, así que la
              punta de flecha entra horizontal en el disco. */}
          <Curva
            d={`M ${X_CADENA - 6} ${yVuelta + hVuelta / 2} C 34 ${yVuelta + hVuelta / 2}, 34 ${centro(2)}, ${X_RAIL - 23} ${centro(2)}`}
            tono="gris"
            uid={ctx.uid}
            discontinua
            grosor={2.5}
          />
          <Caja
            x={X_CADENA}
            y={yVuelta}
            w={W_CADENA}
            h={hVuelta}
            tono="gris"
            ctx={ctx}
            paso="vuelta"
            titulo="Y si algo empeora, deshaz"
            lineas={lineasVuelta}
            relleno={TONOS.gris.suave}
            etiqueta="Ver la red de seguridad: volver atrás"
          />
        </>
      )}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 4 · Anatomía de una lámina generada con IA (infografía)
// Rejilla: hoja 9:16 de 264 × 470 en (20, 52); leyenda numerada a la derecha,
// disco en x = 330 y texto desde x = 356 hasta 848.
// ════════════════════════════════════════════════════════════════════════════

const HOJA_X = 20;
const HOJA_Y = 52;
const HOJA_W = 264;
const HOJA_H = 470;

type Pieza = { id: string; n: number; tono: Tono; titulo: string; d: string };

const PIEZAS: Pieza[] = [
  {
    id: "i1",
    n: 1,
    tono: "azul",
    titulo: "Formato y destino",
    d: "«Vertical 9:16, en español, para alumnado de 4.º de ESO». Sin esto te da un cuadrado en inglés para adultos.",
  },
  {
    id: "i2",
    n: 2,
    tono: "morado",
    titulo: "Título y subtítulo, literales",
    d: "Escríbelos tú entre comillas. Si los dejas a su aire, inventa uno genérico y encima con faltas.",
  },
  {
    id: "i3",
    n: 3,
    tono: "verde",
    titulo: "La ilustración central",
    d: "Describe la escena completa: qué elementos aparecen, cómo se relacionan y desde qué punto de vista se ve.",
  },
  {
    id: "i4",
    n: 4,
    tono: "ambar",
    titulo: "Los procesos, uno a uno, con su definición",
    d: "Aquí está el 80 % del resultado: lista cada proceso con la frase exacta que quieres que aparezca a su lado.",
  },
  {
    id: "i5",
    n: 5,
    tono: "rosa",
    titulo: "Los recuadros de ideas clave",
    d: "Dos o tres cajas laterales con lo que quieres que se quede en la cabeza. También literales.",
  },
  {
    id: "i6",
    n: 6,
    tono: "gris",
    titulo: "Paleta y estilo",
    d: "«Azules y turquesas, estética editorial científica, acentos elegantes». Es lo que hace que no parezca una imagen de banco.",
  },
  {
    id: "i7",
    n: 7,
    tono: "azul",
    titulo: "Jerarquía y acabado",
    d: "«Flechas claras, iconografía científica, leyendas, jerarquía visual cuidada, máxima legibilidad.»",
  },
];

const PASOS_INFO: Paso[] = PIEZAS.map((p) => ({
  id: p.id,
  tono: p.tono,
  titulo: `${p.n} · ${p.titulo}`,
  texto: p.d,
}));

PASOS_INFO[3].ejemplo =
  'Representa y explica claramente estos procesos:\n- Evaporación: "Transformación del agua líquida en vapor\n  por efecto de la energía solar"\n- Condensación: "Enfriamiento del vapor y formación de nubes"\n- Precipitación: "Caída del agua en forma de lluvia, nieve o granizo"';
PASOS_INFO[3].clave =
  "El texto de la lámina lo escribes tú. La IA solo lo dibuja: si no se lo dictas, se lo inventa.";
PASOS_INFO[0].clave = "Formato, idioma y nivel educativo: las tres cosas que siempre se olvidan.";

const X_DISCO = 330;
const X_TXT = 356;
const CHARS_INFO = 54; // hasta x = 848

const FILAS_INFO = apilar(
  PIEZAS.map((p) => ({ ...p, lineas: parteEnLineas(p.d, CHARS_INFO) })),
  (p) => 24 + 21 * p.lineas.length,
  12,
  66,
);
const ALTO_INFO = Math.max(altoApilado(FILAS_INFO, 4), HOJA_Y + HOJA_H + 16);

export function AnatomiaInfografia() {
  const filas = FILAS_INFO;

  // Dónde cae cada número sobre la hoja (coordenadas absolutas, calculadas
  // desde la esquina de la hoja para que muevan con ella).
  const hx = (f: number) => HOJA_X + HOJA_W * f;
  const hy = (f: number) => HOJA_Y + HOJA_H * f;
  const marcas: { id: string; n: number; tono: Tono; cx: number; cy: number }[] = [
    { id: "i1", n: 1, tono: "azul", cx: HOJA_X + HOJA_W - 28, cy: HOJA_Y + HOJA_H - 28 },
    { id: "i2", n: 2, tono: "morado", cx: hx(0.5), cy: HOJA_Y + 40 },
    { id: "i3", n: 3, tono: "verde", cx: hx(0.5), cy: hy(0.42) },
    { id: "i4", n: 4, tono: "ambar", cx: hx(0.16), cy: hy(0.42) },
    { id: "i5", n: 5, tono: "rosa", cx: hx(0.5), cy: hy(0.73) },
    { id: "i6", n: 6, tono: "gris", cx: hx(0.78), cy: hy(0.86) },
    { id: "i7", n: 7, tono: "azul", cx: hx(0.84), cy: hy(0.42) },
  ];

  return (
    <Lienzo
      ancho={AMPLIO}
      alto={ALTO_INFO}
      pasos={PASOS_INFO}
      etiqueta="Anatomía de una lámina educativa generada con IA: una hoja vertical 9:16 con siete piezas numeradas —formato, título, ilustración central, procesos, recuadros de ideas clave, paleta y jerarquía— explicadas en la leyenda."
      pie="Las siete piezas que tiene que llevar el prompt de una lámina. Quítale una y se nota. Pulsa cualquier número."
      dibuja={(ctx) => (
        <>
          <Rotulo x={HOJA_X} y={30} texto="UNA LÁMINA, SIETE PIEZAS" tam={FS} peso={800} color={TINTA} />
          <Rotulo x={X_TXT} y={30} texto="lo que tiene que decir tu prompt" tam={FS} peso={500} color={TENUE} />

          {/* ── La hoja ──────────────────────────────────────────────── */}
          <rect
            x={HOJA_X}
            y={HOJA_Y}
            width={HOJA_W}
            height={HOJA_H}
            rx={14}
            fill="var(--dg-papel)"
            stroke={TONOS.gris.borde}
            strokeWidth={2}
          />
          {/* Título y subtítulo */}
          <rect x={hx(0.08)} y={HOJA_Y + 26} width={HOJA_W * 0.84} height={28} rx={7} fill={TONOS.azul.suave} />
          <rect x={hx(0.2)} y={HOJA_Y + 62} width={HOJA_W * 0.6} height={12} rx={6} fill={TONOS.gris.borde} />

          {/* Ilustración central + procesos radiales */}
          <circle cx={hx(0.5)} cy={hy(0.42)} r={62} fill={TONOS.verde.suave} stroke={TONOS.verde.linea} strokeWidth={2} />
          <circle cx={hx(0.5)} cy={hy(0.42)} r={34} fill="var(--dg-papel)" stroke={TONOS.verde.borde} strokeWidth={2} />
          {[-140, -40, 40, 140].map((g) => (
            <g key={g}>
              <Tramo
                x1={puntoX(hx(0.5), 68, g)}
                y1={puntoY(hy(0.42), 68, g)}
                x2={puntoX(hx(0.5), 104, g)}
                y2={puntoY(hy(0.42), 104, g)}
                tono="ambar"
                uid={ctx.uid}
                grosor={2.5}
              />
              <rect
                x={puntoX(hx(0.5), 112, g) - 22}
                y={puntoY(hy(0.42), 112, g) - 8}
                width={44}
                height={16}
                rx={8}
                fill={TONOS.ambar.suave}
                stroke={TONOS.ambar.borde}
                strokeWidth={1.5}
              />
            </g>
          ))}

          {/* Recuadros de ideas clave */}
          {[0.68, 0.78].map((f) => (
            <rect
              key={f}
              x={hx(0.08)}
              y={hy(f)}
              width={HOJA_W * 0.84}
              height={30}
              rx={8}
              fill={TONOS.rosa.suave}
              stroke={TONOS.rosa.borde}
              strokeWidth={1.5}
            />
          ))}

          {/* Paleta */}
          {[0, 1, 2, 3, 4].map((i) => (
            <circle
              key={i}
              cx={hx(0.16) + i * 28}
              cy={hy(0.86)}
              r={11}
              fill={[TONOS.azul.linea, TONOS.verde.linea, TONOS.ambar.linea, TONOS.morado.linea, TONOS.gris.linea][i]}
              stroke="var(--dg-fondo)"
              strokeWidth={2}
            />
          ))}

          {/* Marcas numeradas, pulsables */}
          {marcas.map((m) => (
            <g
              key={m.id}
              role="button"
              tabIndex={0}
              aria-label={`Ver la pieza ${m.n}`}
              aria-pressed={ctx.sel === m.id}
              aria-describedby={ctx.panelId}
              onClick={() => ctx.activar(m.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  ctx.activar(m.id);
                }
              }}
              className="group cursor-pointer outline-none"
            >
              <circle cx={m.cx} cy={m.cy} r={24} fill="transparent" />
              <circle
                cx={m.cx}
                cy={m.cy}
                r={21}
                fill="none"
                stroke={TONOS[m.tono].borde}
                strokeWidth={3}
                className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
              />
              {ctx.sel === m.id ? (
                <circle cx={m.cx} cy={m.cy} r={21} fill="none" stroke={TONOS[m.tono].linea} strokeWidth={3} />
              ) : null}
              <circle
                cx={m.cx}
                cy={m.cy}
                r={25}
                fill="none"
                stroke={TINTA}
                strokeWidth={2}
                strokeDasharray="5 4"
                className="opacity-0 group-focus-visible:opacity-100"
              />
              <Numero cx={m.cx} cy={m.cy} n={m.n} tono={m.tono} r={15} />
            </g>
          ))}

          {/* ── La leyenda ───────────────────────────────────────────── */}
          {filas.map((f) => (
            <g
              key={f.id}
              role="button"
              tabIndex={0}
              aria-label={`Ver la pieza ${f.n}: ${f.titulo}`}
              aria-pressed={ctx.sel === f.id}
              aria-describedby={ctx.panelId}
              onClick={() => ctx.activar(f.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  ctx.activar(f.id);
                }
              }}
              className="group cursor-pointer outline-none"
            >
              <rect
                x={X_DISCO - 22}
                y={f.y - 20}
                width={AMPLIO - 12 - (X_DISCO - 22)}
                height={f.h + 8}
                rx={11}
                fill={ctx.sel === f.id ? TONOS[f.tono].suave : "transparent"}
                stroke={ctx.sel === f.id ? TONOS[f.tono].linea : "transparent"}
                strokeWidth={2}
                className="transition-colors duration-150 group-hover:fill-zinc-100 dark:group-hover:fill-white/10"
              />
              <rect
                x={X_DISCO - 25}
                y={f.y - 23}
                width={AMPLIO - 12 - (X_DISCO - 25) + 3}
                height={f.h + 14}
                rx={13}
                fill="none"
                stroke={TINTA}
                strokeWidth={2}
                strokeDasharray="5 4"
                className="opacity-0 group-focus-visible:opacity-100"
              />
              <Numero cx={X_DISCO} cy={f.y - 2} n={f.n} tono={f.tono} r={15} />
              <Rotulo
                x={X_TXT}
                y={f.y + 3}
                texto={f.titulo}
                tam={FS_TIT}
                peso={700}
                color={TONOS[f.tono].fuerte}
              />
              <Parrafo x={X_TXT} y={f.y + 26} lineas={f.lineas} color={SUAVE} tam={FS} interlineado={21} />
            </g>
          ))}
        </>
      )}
    />
  );
}
