"use client";

import {
  AMPLIO,
  Caja,
  Curva,
  FS,
  FS_GRANDE,
  FS_TIT,
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
  Zona,
  parteEnLineas,
  type Paso,
  type Tono,
} from "./base";
import { BLOQUES } from "../_datos";

// ════════════════════════════════════════════════════════════════════════════
// Diagramas de proceso: el reloj de la sesión, la ruta de un tema, el ciclo
// agéntico y la pregunta del vocal. Toda la geometría sale de constantes con
// nombre y del reparto proporcional de los minutos.
// ════════════════════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════════════════════
// 1 · El reloj de la sesión (portada)
// La barra reparte 828 unidades entre 120 minutos: cada bloque ocupa
// exactamente lo que dura. Debajo, la leyenda en dos columnas.
// ════════════════════════════════════════════════════════════════════════════

// Los datos del reloj salen de _datos.ts (módulo neutro): un solo sitio para
// el orden, los minutos y los títulos de los seis bloques.
type BloqueSesion = { id: string; n: number; tono: Tono; min: number; titulo: string; d: string };

const BLOQUES_SESION: BloqueSesion[] = BLOQUES.map((b) => ({
  id: `b${b.n}`,
  n: b.n,
  tono: b.tono,
  min: b.min,
  titulo: b.titulo,
  d: b.breve,
}));

const PASOS_SESION: Paso[] = BLOQUES_SESION.map((b) => ({
  id: b.id,
  tono: b.tono,
  titulo: `Bloque ${b.n} · ${b.titulo} (${b.min} min)`,
  texto: b.d,
}));

const X0 = 16;
const ANCHO_BARRA = AMPLIO - 32; // 828
const Y_BARRA = 52;
const H_BARRA = 46;
const TOTAL_MIN = BLOQUES_SESION.reduce((s, b) => s + b.min, 0);

// Reparto proporcional exacto, calculado al cargar el módulo: el último
// segmento absorbe el redondeo para que la barra acabe justo en el borde.
function repartirBarra() {
  const segmentos: (BloqueSesion & { x: number; w: number })[] = [];
  let x = X0;
  BLOQUES_SESION.forEach((b, i) => {
    const w =
      i === BLOQUES_SESION.length - 1
        ? X0 + ANCHO_BARRA - x
        : Math.round((ANCHO_BARRA * b.min) / TOTAL_MIN);
    segmentos.push({ ...b, x, w });
    x += w;
  });
  return segmentos;
}

const SEGMENTOS = repartirBarra();

// Leyenda: dos columnas de 404, tres filas.
const COL_W = 404;
const COLS_LEY = [X0, X0 + COL_W + 20];
const Y_LEY = 132;
const FILAS_LEY = SEGMENTOS.map((s, i) => ({
  ...s,
  lineas: parteEnLineas(s.d, 42),
  col: i % 2,
  fila: Math.floor(i / 2),
}));
const ALTO_FILA = 24 + 21 * 2 + 18; // dos líneas de cuerpo + aire
const ALTO_RELOJ = Y_LEY + ALTO_FILA * 3 + 10;

export function RelojSesion() {
  const segmentos = SEGMENTOS;
  const filas = FILAS_LEY;
  return (
    <Lienzo
      ancho={AMPLIO}
      alto={ALTO_RELOJ}
      pasos={PASOS_SESION}
      etiqueta="Reloj de la sesión: una barra de 120 minutos repartida en seis bloques —prompts 20, Copilot 20, temario 20, materiales 20, laboratorio 30 y tribunal 10— con la leyenda debajo."
      pie="Dos horas exactas. Cada bloque ocupa en la barra lo que dura de verdad. Pulsa cualquiera."
      dibuja={(ctx) => (
        <>
          <Rotulo x={X0} y={30} texto="DOS HORAS, SEIS BLOQUES" tam={FS} peso={800} color={TINTA} />
          <Rotulo
            x={AMPLIO - 16}
            y={30}
            texto="120 minutos"
            tam={FS}
            peso={700}
            color={TENUE}
            ancla="end"
          />

          {segmentos.map((s) => {
            const t = TONOS[s.tono];
            const activo = ctx.sel === s.id;
            return (
              <Zona key={s.id} ctx={ctx} paso={s.id} etiqueta={`Bloque ${s.n}: ${s.titulo}, ${s.min} minutos`}>
                <rect
                  x={s.x + 1.5}
                  y={Y_BARRA - 6}
                  width={s.w - 3}
                  height={H_BARRA + 12}
                  rx={12}
                  fill="none"
                  stroke={t.borde}
                  strokeWidth={3}
                  className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                />
                <rect
                  x={s.x + 1.5}
                  y={Y_BARRA}
                  width={s.w - 3}
                  height={H_BARRA}
                  rx={8}
                  fill={activo ? t.linea : t.suave}
                  stroke={t.linea}
                  strokeWidth={activo ? 2.5 : 1.5}
                  style={{ transition: "fill 150ms ease" }}
                />
                <rect
                  x={s.x - 2}
                  y={Y_BARRA - 9}
                  width={s.w + 4}
                  height={H_BARRA + 18}
                  rx={14}
                  fill="none"
                  stroke={TINTA}
                  strokeWidth={2}
                  strokeDasharray="5 4"
                  className="opacity-0 group-focus-visible:opacity-100"
                />
                <Rotulo
                  x={s.x + s.w / 2}
                  y={Y_BARRA + 21}
                  texto={String(s.n)}
                  tam={FS_GRANDE}
                  peso={800}
                  color={activo ? "#ffffff" : t.fuerte}
                  ancla="middle"
                />
                <Rotulo
                  x={s.x + s.w / 2}
                  y={Y_BARRA + 39}
                  texto={`${s.min} min`}
                  tam={FS}
                  peso={600}
                  color={activo ? "#ffffff" : t.fuerte}
                  ancla="middle"
                />
              </Zona>
            );
          })}

          {filas.map((f) => {
            const x0 = COLS_LEY[f.col];
            const y0 = Y_LEY + ALTO_FILA * f.fila;
            return (
              <Zona key={`ley-${f.id}`} ctx={ctx} paso={f.id} etiqueta={`Ver el bloque ${f.n}: ${f.titulo}`}>
                <rect
                  x={x0 - 8}
                  y={y0 - 22}
                  width={COL_W + 16}
                  height={ALTO_FILA - 4}
                  rx={12}
                  fill={ctx.sel === f.id ? TONOS[f.tono].suave : "transparent"}
                  stroke={ctx.sel === f.id ? TONOS[f.tono].linea : "transparent"}
                  strokeWidth={2}
                  className="transition-colors duration-150 group-hover:fill-zinc-100"
                />
                <rect
                  x={x0 - 11}
                  y={y0 - 25}
                  width={COL_W + 22}
                  height={ALTO_FILA + 2}
                  rx={14}
                  fill="none"
                  stroke={TINTA}
                  strokeWidth={2}
                  strokeDasharray="5 4"
                  className="opacity-0 group-focus-visible:opacity-100"
                />
                <Numero cx={x0 + 15} cy={y0 - 2} n={f.n} tono={f.tono} r={15} />
                <Rotulo
                  x={x0 + 40}
                  y={y0 + 3}
                  texto={f.titulo}
                  tam={FS_TIT}
                  peso={700}
                  color={TONOS[f.tono].fuerte}
                />
                <Parrafo x={x0 + 40} y={y0 + 26} lineas={f.lineas} color={SUAVE} tam={FS} interlineado={21} />
              </Zona>
            );
          })}
        </>
      )}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 2 · La ruta de un tema (serpiente de seis estaciones)
// Fila de arriba de izquierda a derecha, bajada por la derecha y fila de abajo
// de derecha a izquierda. Columnas fijas en x = 16, 296 y 576 (ancho 260).
// ════════════════════════════════════════════════════════════════════════════

const COLS_RUTA = [16, 296, 576];
const W_RUTA = 260;
const Y_SUP = 92;
const Y_INF = 288;
const H_RUTA = 128;

type Estacion = { id: string; n: number; tono: Tono; tiempo: string; titulo: string; d: string };

const RUTA: Estacion[] = [
  {
    id: "e1",
    n: 1,
    tono: "azul",
    tiempo: "10 min",
    titulo: "El esqueleto",
    d: "Antes de leer nada: bloques, sub-bloques, términos que hay que saber de memoria y temas con los que se cruza.",
  },
  {
    id: "e2",
    n: 2,
    tono: "morado",
    tiempo: "60 min",
    titulo: "Tu lectura",
    d: "Tus fuentes, con el esqueleto delante. Aquí la IA no toca: es la hora en la que el tema entra de verdad.",
  },
  {
    id: "e3",
    n: 3,
    tono: "verde",
    tiempo: "70 min",
    titulo: "Tu redacción",
    d: "Escribes tú. La IA hace de estructura y de diccionario, nunca de pluma: lo que se entrega es tuyo.",
  },
  {
    id: "e4",
    n: 4,
    tono: "ambar",
    tiempo: "15 min",
    titulo: "La verificación",
    d: "Norma por norma y cifra por cifra, al boletín oficial. Todo lo marcado [COMPROBAR] se comprueba o se cae.",
  },
  {
    id: "e5",
    n: 5,
    tono: "rosa",
    tiempo: "15 min",
    titulo: "El simulacro",
    d: "Le pegas tu tema y te interroga sin piedad. Lo que no sepas defender, vuelve al paso 2.",
  },
  {
    id: "e6",
    n: 6,
    tono: "gris",
    tiempo: "5 min/día",
    titulo: "El repaso",
    d: "Preguntas relámpago sobre tu propio tema, en días alternos. Es lo que evita olvidarlo en marzo.",
  },
];

const PASOS_RUTA: Paso[] = [
  {
    id: "e1",
    tono: "azul",
    titulo: "1 · El esqueleto, antes de abrir ningún libro",
    texto:
      "Diez minutos que ahorran la hora de desorden que tiene todo tema nuevo. Le pides el mapa: qué bloques tiene, qué se pregunta de cada uno, qué términos hay que saber definir sin mirar y con qué otros temas se cruza. Ese mapa no se entrega nunca: es tu andamio para estudiar.",
    ejemplo:
      "Dame el esqueleto del tema [Nº] «[TÍTULO]» en una sola página:\n1) Bloques y sub-bloques.\n2) Las cinco preguntas de tribunal más probables.\n3) Diez términos que deba saber definir de memoria, con una línea cada uno.\n4) Con qué otros temas del temario se cruza.\nSin introducciones. Listas numeradas.",
  },
  {
    id: "e2",
    tono: "morado",
    titulo: "2 · Tu lectura, con el mapa delante",
    texto:
      "La hora en la que el tema entra de verdad, y la única en la que la IA no pinta nada. Lees tus fuentes con el esqueleto al lado y vas marcando lo que el esqueleto prometía y tus apuntes no cubren: ese hueco es exactamente lo que te van a preguntar.",
    clave: "Si te saltas este paso, lo que redactes después no lo podrás defender. No hay atajo aquí.",
  },
  {
    id: "e3",
    tono: "verde",
    titulo: "3 · Tu redacción, con la IA de andamio",
    texto:
      "Escribes tú. La IA te sirve para ordenar un apartado que se te atraviesa, para encontrar la palabra técnica que no recuerdas o para comprobar que no te dejas un sub-bloque. Lo que sale de su teclado directo al tuyo es lo que luego no sabes defender.",
    clave: "Regla fija: ninguna frase llega al tema sin haber pasado por tus palabras.",
  },
  {
    id: "e4",
    tono: "ambar",
    titulo: "4 · La verificación: el paso que no se salta",
    texto:
      "El fallo más caro de usar IA en un tema es la cita de algo que no existe. Los modelos citan reales decretos, normas UNE y cifras con toda la seguridad del mundo. Cada norma, con su número, su fecha y su boletín. Cada dato técnico, con su fuente. Un vocal con el boletín abierto no perdona.",
    clave: "Todo lo que lleve [COMPROBAR] se comprueba o se quita. No hay término medio.",
  },
  {
    id: "e5",
    tono: "rosa",
    titulo: "5 · El simulacro de tribunal",
    texto:
      "El mejor ensayo de defensa que existe, y es gratis: le pegas tu tema ya redactado y le pides que te interrogue como un vocal con fama de incómodo, sin darte las respuestas hasta que contestes. Quince minutos de esto valen más que una tarde de repaso leyendo.",
    ejemplo:
      "Actúa como vocal de un tribunal de Tecnología de Secundaria,\nveinticinco años de oficio y fama de pregunta incómoda.\nTe pego mi tema:\n\n[TU TEMA]\n\nHazme cinco preguntas, de una en una, de menor a mayor dificultad.\nIncluye al menos una de aplicación al aula y una técnica pura.\nNo me des la respuesta hasta que yo conteste; después dime qué falla,\nqué habría respondido el tribunal y cómo lo diría yo en una frase.",
  },
  {
    id: "e6",
    tono: "gris",
    titulo: "6 · El repaso espaciado",
    texto:
      "Cinco minutos en días alternos: le pegas tu tema y le pides diez preguntas relámpago sobre él. Es lo que evita que en marzo te suene el tema 34 pero no sepas decir nada. Y como pregunta sobre TU texto, refuerza tu versión, no otra.",
  },
];

export function RutaDelTema() {
  const totalAlto = Y_INF + H_RUTA + 46;
  const sup = RUTA.slice(0, 3);
  const inf = RUTA.slice(3); // se pintan de derecha a izquierda

  const lineas = (d: string) => parteEnLineas(d, 29);

  return (
    <Lienzo
      ancho={AMPLIO}
      alto={totalAlto}
      pasos={PASOS_RUTA}
      etiqueta="Ruta de estudio de un tema en seis estaciones: esqueleto, lectura, redacción, verificación, simulacro y repaso, con el tiempo estimado de cada una."
      pie="Un tema entero, de principio a fin. La IA aparece en cuatro estaciones de seis; en las otras dos estás tú solo. Pulsa cualquiera."
      dibuja={(ctx) => (
        <>
          <Rotulo x={16} y={30} texto="LA RUTA DE UN TEMA" tam={FS} peso={800} color={TINTA} />
          <Rotulo
            x={AMPLIO - 16}
            y={30}
            texto="≈ 2 h 50 min la primera vez · 20 min cada repaso"
            tam={FS}
            peso={500}
            color={TENUE}
            ancla="end"
          />

          {/* Fila superior, de izquierda a derecha */}
          {sup.map((e, i) => {
            const x = COLS_RUTA[i];
            return (
              <g key={e.id}>
                <Pildora x={x} y={Y_SUP - 38} texto={e.tiempo} tono={e.tono} />
                {i < 2 ? (
                  <Tramo
                    x1={x + W_RUTA + 3}
                    y1={Y_SUP + H_RUTA / 2}
                    x2={COLS_RUTA[i + 1] - 6}
                    y2={Y_SUP + H_RUTA / 2}
                    tono={sup[i + 1].tono}
                    uid={ctx.uid}
                    grosor={3}
                  />
                ) : null}
                <Caja
                  x={x}
                  y={Y_SUP}
                  w={W_RUTA}
                  h={H_RUTA}
                  tono={e.tono}
                  ctx={ctx}
                  paso={e.id}
                  titulo={e.titulo}
                  lineas={lineas(e.d)}
                  etiqueta={`Ver la estación ${e.n}: ${e.titulo}`}
                />
                {/* El disco se pinta DESPUÉS de la caja: si va antes, el
                    relleno de la caja lo tapa. */}
                <Numero cx={x + W_RUTA - 22} cy={Y_SUP + 22} n={e.n} tono={e.tono} r={16} />
              </g>
            );
          })}

          {/* Bajada por la derecha: última de arriba → primera de abajo */}
          <Curva
            d={`M ${COLS_RUTA[2] + W_RUTA / 2} ${Y_SUP + H_RUTA + 3} L ${COLS_RUTA[2] + W_RUTA / 2} ${Y_INF - 6}`}
            tono="ambar"
            uid={ctx.uid}
            grosor={3}
          />

          {/* Fila inferior, de derecha a izquierda */}
          {inf.map((e, i) => {
            const x = COLS_RUTA[2 - i];
            return (
              <g key={e.id}>
                {i < 2 ? (
                  <Tramo
                    x1={x - 3}
                    y1={Y_INF + H_RUTA / 2}
                    x2={COLS_RUTA[2 - i - 1] + W_RUTA + 6}
                    y2={Y_INF + H_RUTA / 2}
                    tono={inf[i + 1].tono}
                    uid={ctx.uid}
                    grosor={3}
                  />
                ) : null}
                <Caja
                  x={x}
                  y={Y_INF}
                  w={W_RUTA}
                  h={H_RUTA}
                  tono={e.tono}
                  ctx={ctx}
                  paso={e.id}
                  titulo={e.titulo}
                  lineas={lineas(e.d)}
                  etiqueta={`Ver la estación ${e.n}: ${e.titulo}`}
                />
                <Numero cx={x + W_RUTA - 22} cy={Y_INF + 22} n={e.n} tono={e.tono} r={16} />
                <Pildora x={x} y={Y_INF + H_RUTA + 10} texto={e.tiempo} tono={e.tono} />
              </g>
            );
          })}
        </>
      )}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 3 · El ciclo agéntico (bucle cuadrado de cuatro pasos)
// Rejilla: columnas en x = 16 y 394 (ancho 270); filas en y = 56 y 266
// (alto 150). El bucle gira en sentido horario por los huecos.
// ════════════════════════════════════════════════════════════════════════════

const CW = 270;
const CX1 = 16;
const CX2 = MEDIO - 16 - CW; // 394
const CY1 = 56;
const CY2 = 266;
const CH = 150;

type PasoCiclo = { id: string; n: number; tono: Tono; titulo: string; d: string; x: number; y: number };

const CICLO: PasoCiclo[] = [
  {
    id: "a1",
    n: 1,
    tono: "azul",
    titulo: "Especificar",
    d: "Escribes qué tiene que existir al final, con sus reglas y sus límites. Es el prompt del bloque 1.",
    x: CX1,
    y: CY1,
  },
  {
    id: "a2",
    n: 2,
    tono: "morado",
    titulo: "Delegar",
    d: "El agente crea los ficheros, los edita y ejecuta órdenes. Tú miras. Dura de dos a cinco minutos.",
    x: CX2,
    y: CY1,
  },
  {
    id: "a3",
    n: 3,
    tono: "ambar",
    titulo: "Verificar",
    d: "Lo ejecutas TÚ y lo usas entero. Es el paso que casi nadie hace y el único que no se puede delegar.",
    x: CX2,
    y: CY2,
  },
  {
    id: "a4",
    n: 4,
    tono: "verde",
    titulo: "Dirigir",
    d: "Un fallo, una petición: «esto hace X y esperaba Y; arréglalo sin tocar lo demás». Y vuelta a empezar.",
    x: CX1,
    y: CY2,
  },
];

const PASOS_CICLO: Paso[] = [
  {
    id: "a1",
    tono: "azul",
    titulo: "1 · Especificar",
    texto:
      "Es el prompt, y es donde se decide el 80 % del resultado. Di qué tiene que existir al final, para quién, con qué restricciones duras y qué NO puede usar. Cuanto más concreta la restricción, menos sorpresas después.",
    clave: "Las restricciones que no escribes te las inventa él.",
  },
  {
    id: "a2",
    tono: "morado",
    titulo: "2 · Delegar",
    texto:
      "El agente se pone a trabajar: crea los ficheros, los escribe, ejecuta órdenes en la terminal, lee los errores que le salen y vuelve a intentarlo. Aquí tu trabajo es mirar, no interrumpir. Dos o tres minutos.",
  },
  {
    id: "a3",
    tono: "ambar",
    titulo: "3 · Verificar — el paso que no se delega",
    texto:
      "Abres lo que ha hecho y lo usas de principio a fin como lo usaría tu alumnado. Compruebas los datos, las fórmulas y los casos raros. Un agente da por bueno lo que no ha ejecutado, y afirma con total seguridad que algo funciona cuando no lo ha abierto.",
    clave: "Si no lo verificas, estás defendiendo lo que la IA cree que hizo, no lo que hizo.",
  },
  {
    id: "a4",
    tono: "verde",
    titulo: "4 · Dirigir",
    texto:
      "Un fallo, una petición. Descríbelo como a un compañero: qué hiciste, qué esperabas, qué pasó. Y cuando no entiendas por qué ocurre, no pidas el arreglo: pide la explicación primero. Ese es el criterio que un tribunal sí sabe distinguir.",
    ejemplo:
      "Antes de arreglar nada, explícame por qué pasa esto.\nCuando lo entienda, te pido el arreglo.",
    clave: "«Explícame el fallo antes de arreglarlo» es lo que convierte el uso de un agente en aprendizaje.",
  },
];

export function CicloAgentico() {
  const alto = CY2 + CH + 16;
  const cx1 = CX1 + CW / 2;
  const cx2 = CX2 + CW / 2;
  const cy1 = CY1 + CH / 2;
  const cy2 = CY2 + CH / 2;

  return (
    <Lienzo
      ancho={MEDIO}
      alto={alto}
      pasos={PASOS_CICLO}
      etiqueta="Ciclo agéntico en cuatro pasos que giran en bucle: especificar, delegar, verificar y dirigir, con verificar destacado como el paso que no se delega."
      pie="Cuatro pasos, en bucle, hasta que funciona. El tercero es el que separa a quien dirige la herramienta de quien solo la usa."
      dibuja={(ctx) => (
        <>
          {/* Bucle en sentido horario */}
          <Tramo x1={CX1 + CW + 3} y1={cy1} x2={CX2 - 6} y2={cy1} tono="morado" uid={ctx.uid} grosor={3} />
          <Tramo x1={cx2} y1={CY1 + CH + 3} x2={cx2} y2={CY2 - 6} tono="ambar" uid={ctx.uid} grosor={3} />
          <Tramo x1={CX2 - 3} y1={cy2} x2={CX1 + CW + 6} y2={cy2} tono="verde" uid={ctx.uid} grosor={3} />
          <Tramo x1={cx1} y1={CY2 - 3} x2={cx1} y2={CY1 + CH + 6} tono="azul" uid={ctx.uid} grosor={3} />

          {/* Rótulo del centro, dentro del hueco del bucle */}
          <Rotulo
            x={MEDIO / 2}
            y={CY1 + CH + 26}
            texto="EL CICLO"
            tam={FS}
            peso={800}
            color={TINTA}
            ancla="middle"
          />
          <Rotulo
            x={MEDIO / 2}
            y={CY1 + CH + 46}
            texto="AGÉNTICO"
            tam={FS}
            peso={800}
            color={TINTA}
            ancla="middle"
          />

          {CICLO.map((p) => (
            <g key={p.id}>
              <Caja
                x={p.x}
                y={p.y}
                w={CW}
                h={CH}
                tono={p.tono}
                ctx={ctx}
                paso={p.id}
                titulo={p.titulo}
                lineas={parteEnLineas(p.d, 30)}
                etiqueta={`Ver el paso ${p.n}: ${p.titulo}`}
              />
              <Numero cx={p.x + CW - 24} cy={p.y + 24} n={p.n} tono={p.tono} r={16} />
            </g>
          ))}
        </>
      )}
    />
  );
}
