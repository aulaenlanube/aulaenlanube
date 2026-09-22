"use client";

import {
  AMPLIO,
  FS,
  FS_TIT,
  Lienzo,
  Pildora,
  Rotulo,
  SUAVE,
  TENUE,
  TINTA,
  TONOS,
  Tramo,
  Zona,
  anchoPildora,
  type Ctx,
  type Paso,
  type Tono,
} from "./base";

// ════════════════════════════════════════════════════════════════════════════
// Diagrama del BLOQUE 6 · El mapa de OposicionesIA.
//
// Cuatro columnas —los cuatro momentos de la preparación— y debajo de cada una
// las herramientas que sirven en ese momento. Las columnas pueden tener un
// número distinto de fichas: se alinean por arriba y el alto del viewBox sale
// de la columna más larga.
//
// Rejilla: columnas de 192 en x = 16, 228, 440 y 652 (hueco 20, margen 16).
// Cabecera en y = 46 (alto 32) y fichas desde y = 116, encadenadas en vertical.
// ════════════════════════════════════════════════════════════════════════════

const COL_W = 192;
const COLS = [16, 228, 440, 652];
const Y_CABECERA = 46;
const H_CABECERA = 32;
const Y_FICHA = 116;
const H_FICHA = 74;
const HUECO_FICHA = 12;

type Ficha = { id: string; titulo: string; pie: string };
type Columna = { id: string; tono: Tono; momento: string; fichas: Ficha[] };

const COLUMNAS: Columna[] = [
  {
    id: "estudiar",
    tono: "azul",
    momento: "Para estudiar",
    fichas: [
      { id: "temario", titulo: "Temario", pie: "71 temas escritos" },
      { id: "videoteca", titulo: "Videoteca", pie: "vídeos propios" },
      { id: "repaso", titulo: "Repaso", pie: "2.142 tarjetas" },
    ],
  },
  {
    id: "practicar",
    tono: "verde",
    momento: "Para practicar",
    fichas: [
      { id: "supuestos", titulo: "Supuestos", pie: "180 con solución" },
      { id: "test", titulo: "Test", pie: "1.223 preguntas" },
      { id: "examenes", titulo: "Exámenes", pie: "foto y corrección" },
    ],
  },
  {
    id: "entregar",
    tono: "ambar",
    momento: "Para entregar",
    fichas: [
      { id: "programacion", titulo: "Programación", pie: "con tu plantilla" },
      { id: "normativa", titulo: "Normativa", pie: "currículo y DOGV" },
    ],
  },
  {
    id: "dirigir",
    tono: "morado",
    momento: "Para dirigirte",
    fichas: [
      { id: "plan", titulo: "Plan semanal", pie: "a tu ritmo" },
      { id: "chat", titulo: "Chat", pie: "sobre tu normativa" },
      { id: "telegram", titulo: "Telegram", pie: "en el móvil" },
    ],
  },
];

const MAS_FICHAS = Math.max(...COLUMNAS.map((c) => c.fichas.length));
const ALTO_MAPA = Y_FICHA + MAS_FICHAS * H_FICHA + (MAS_FICHAS - 1) * HUECO_FICHA + 16;

const PASOS: Paso[] = [
  {
    id: "estudiar",
    tono: "azul",
    titulo: "Para estudiar · el contenido ya escrito",
    texto:
      "Es la diferencia con un chat: los temas no se generan cuando los pides, están redactados y revisados de antemano. La IA entra después, para que tú te hagas tu versión, no para escribir el original.",
  },
  {
    id: "temario",
    tono: "azul",
    titulo: "Temario · 71 temas, en cuatro niveles",
    texto:
      "Cada tema existe en cuatro versiones que se cambian con una pestaña —esencial, resumen, completo y tema de examen—, con su esquema visual, su mazo de tarjetas, marcador fluorescente y descarga a PDF con formato de entrega. En Tecnología, el tema completo ronda las 8.500 palabras y el de examen las 3.800.",
    clave: "Y está en castellano, valenciano, gallego y euskera: 71 temas × 4 idiomas.",
  },
  {
    id: "videoteca",
    tono: "azul",
    titulo: "Videoteca · vídeos servidos por la propia plataforma",
    texto:
      "No son enlaces a YouTube: el reproductor es propio, con subtítulos, velocidad de 0,75× a 2×, reanudación donde lo dejaste y comentarios anclados a un minuto concreto. Hay vídeos de tema, de supuesto y de normativa; cuántos hay publicados de cada especialidad depende del momento.",
  },
  {
    id: "repaso",
    tono: "azul",
    titulo: "Repaso espaciado · 2.142 tarjetas",
    texto:
      "Entre 23 y 35 tarjetas por tema, servidas con repetición espaciada sobre lo que ya has dado. Es la estación 6 de la ruta del bloque 3, pero hecha y sin que tengas que montarla tú.",
  },
  {
    id: "practicar",
    tono: "verde",
    titulo: "Para practicar · escribir y que te corrijan",
    texto:
      "Aquí está lo que más se parece a un ensayo general: escribes a mano y contrarreloj, fotografías las hojas, la plataforma las transcribe, tú corriges la transcripción y después te corrige con rúbrica y nota orientativa.",
    clave: "La corrección se ancla a los criterios reales del tribunal de tu convocatoria.",
  },
  {
    id: "supuestos",
    tono: "verde",
    titulo: "Supuestos · 180 resueltos, en 12 categorías",
    texto:
      "Quince supuestos por cada uno de los doce bloques de la parte práctica: electrotecnia en continua y en alterna, electrónica analógica y digital, mecanismos, estructuras, neumática e hidráulica, máquinas térmicas, materiales y ensayos, dibujo técnico, control y robótica, y proyecto y explotación didáctica.",
    clave: "Ese reparto no es casual: es el de la parte práctica de Tecnología en la Comunitat Valenciana.",
  },
  {
    id: "test",
    tono: "verde",
    titulo: "Test · 1.223 preguntas por categoría",
    texto:
      "Organizadas por los mismos doce bloques, para los días en los que no da el cuerpo para escribir un tema entero pero sí para media hora de repaso activo.",
  },
  {
    id: "examenes",
    tono: "verde",
    titulo: "Exámenes · lo escribes a mano y le haces una foto",
    texto:
      "Escribes el tema como en el examen real, fotografías las hojas y la plataforma las transcribe y las ordena; corriges tú la transcripción página a página y después te corrige estructura, contenido, ortografía y te da una calificación orientativa con su rúbrica. Guarda el historial para que veas la progresión.",
  },
  {
    id: "entregar",
    tono: "ambar",
    titulo: "Para entregar · lo que se le da al tribunal",
    texto:
      "La parte que no es estudiar sino producir un documento que cumple unas reglas de formato muy concretas, y donde se pierden puntos tontos.",
  },
  {
    id: "programacion",
    tono: "ambar",
    titulo: "Programación · con la plantilla de tu convocatoria puesta",
    texto:
      "Un constructor guiado de las secciones y las situaciones de aprendizaje que ya trae las reglas de tu convocatoria: número de unidades, extensión máxima, tipografía e interlineado. Exporta a Word, guarda versiones y las restaura. Y si ya tienes la tuya escrita, puedes subirla en PDF y que te la corrija por contenido y por formato.",
    clave: "Para la Comunitat Valenciana está anclada al Anexo II de la Orden 1/2025 (DOGV 10036).",
  },
  {
    id: "normativa",
    tono: "ambar",
    titulo: "Normativa · el currículo de tu comunidad, ordenado",
    texto:
      "Normativa estatal y autonómica de tu especialidad enlazada a su fuente oficial, con las fichas de materia de ESO y Bachillerato. Para Tecnología en la Comunitat Valenciana están las ocho materias que imparte la especialidad, con sus competencias, saberes básicos y criterios, tomados literalmente del decreto.",
    clave: "Es el antídoto contra la referencia inventada del bloque 3: aquí la norma está, con su enlace.",
  },
  {
    id: "dirigir",
    tono: "morado",
    titulo: "Para dirigirte · que no se te haga bola",
    texto:
      "Lo que evita que una preparación de meses se convierta en estudiar lo que apetece cada día. Plan, seguimiento y alguien a quien preguntar a las once de la noche.",
  },
  {
    id: "plan",
    tono: "morado",
    titulo: "Plan semanal · y diario de estudio",
    texto:
      "Un test de nivel por temas, un plan semanal que se ajusta a tu fecha de examen y a tus resultados, un diario donde apuntas lo que has hecho —dictándolo, si quieres— y resúmenes semanales y mensuales. Además, el calendario de la convocatoria se suscribe en tu móvil.",
  },
  {
    id: "chat",
    tono: "morado",
    titulo: "Chat · pero sobre TU documentación",
    texto:
      "La diferencia con un chat genérico es que consulta la documentación oficial de tu especialidad y tu comunidad antes de responderte. Es el mismo método del bloque 2 —adjuntar tus fuentes y preguntar solo sobre ellas—, pero con las fuentes ya cargadas.",
  },
  {
    id: "telegram",
    tono: "morado",
    titulo: "Agente de Telegram · en el móvil",
    texto:
      "El mismo agente, en la aplicación de mensajería, con avisos que tú configuras: repaso diario, resumen semanal y los hitos de la convocatoria. Va según el plan contratado.",
  },
];

function FichaCaja({
  ficha,
  x,
  y,
  tono,
  ctx,
}: {
  ficha: Ficha;
  x: number;
  y: number;
  tono: Tono;
  ctx: Ctx;
}) {
  const t = TONOS[tono];
  const activo = ctx.sel === ficha.id;
  const cx = x + COL_W / 2;
  return (
    <Zona ctx={ctx} paso={ficha.id} etiqueta={`Ver: ${ficha.titulo}, ${ficha.pie}`}>
      <rect
        x={x - 5}
        y={y - 5}
        width={COL_W + 10}
        height={H_FICHA + 10}
        rx={16}
        fill="none"
        stroke={t.borde}
        strokeWidth={3}
        className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />
      <rect
        x={x}
        y={y}
        width={COL_W}
        height={H_FICHA}
        rx={12}
        fill={activo ? t.suave : "var(--dg-papel)"}
        stroke={t.linea}
        strokeWidth={activo ? 2.5 : 1.5}
        style={{ transition: "fill 150ms ease, stroke-width 150ms ease" }}
      />
      <rect
        x={x - 8}
        y={y - 8}
        width={COL_W + 16}
        height={H_FICHA + 16}
        rx={18}
        fill="none"
        stroke={TINTA}
        strokeWidth={2}
        strokeDasharray="5 4"
        className="opacity-0 group-focus-visible:opacity-100"
      />
      <Rotulo x={cx} y={y + 31} texto={ficha.titulo} tam={FS_TIT} peso={700} color={t.fuerte} ancla="middle" />
      <Rotulo x={cx} y={y + 54} texto={ficha.pie} tam={FS} peso={500} color={SUAVE} ancla="middle" />
    </Zona>
  );
}

export function MapaPlataforma() {
  return (
    <Lienzo
      ancho={AMPLIO}
      alto={ALTO_MAPA}
      pasos={PASOS}
      etiqueta="Mapa de OposicionesIA por momentos de la preparación: para estudiar, temario, videoteca y repaso; para practicar, supuestos, test y exámenes; para entregar, programación y normativa; para dirigirte, plan semanal, chat y agente de Telegram."
      pie="Las herramientas, ordenadas por el momento en que las necesitas. Pulsa cualquiera para ver qué hace."
      dibuja={(ctx) => (
        <>
          <Rotulo x={16} y={28} texto="QUÉ HAY DENTRO, POR MOMENTOS" tam={FS} peso={800} color={TINTA} />
          <Rotulo
            x={AMPLIO - 16}
            y={28}
            texto="las cifras son las de Tecnología"
            tam={FS}
            peso={500}
            color={TENUE}
            ancla="end"
          />

          {COLUMNAS.map((col, ci) => {
            const x0 = COLS[ci];
            const cx = x0 + COL_W / 2;
            return (
              <g key={col.id}>
                <Zona ctx={ctx} paso={col.id} etiqueta={`Ver el momento: ${col.momento}`}>
                  <g className="transition-opacity duration-150 group-hover:opacity-80">
                    <Pildora
                      x={x0 + (COL_W - anchoPildora(col.momento)) / 2}
                      y={Y_CABECERA}
                      texto={col.momento}
                      tono={col.tono}
                      alto={H_CABECERA}
                    />
                  </g>
                </Zona>
                <Tramo
                  x1={cx}
                  y1={Y_CABECERA + H_CABECERA}
                  x2={cx}
                  y2={Y_FICHA - 6}
                  tono={col.tono}
                  uid={ctx.uid}
                  grosor={2.5}
                />
                {col.fichas.map((f, i) => {
                  const y = Y_FICHA + i * (H_FICHA + HUECO_FICHA);
                  return (
                    <g key={f.id}>
                      {i > 0 ? (
                        <line
                          x1={cx}
                          y1={y - HUECO_FICHA}
                          x2={cx}
                          y2={y}
                          stroke={TONOS[col.tono].borde}
                          strokeWidth={2.5}
                        />
                      ) : null}
                      <FichaCaja ficha={f} x={x0} y={y} tono={col.tono} ctx={ctx} />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </>
      )}
    />
  );
}
