import type { Metadata } from "next";
import Visor3D from "../../_3d/Visor3D";
import { Bloque, C, Checklist, Codigo, Paso, Prompt, TONO, Tarjeta, cls } from "../../_video/piezas";
import { CabeceraSesion, ConceptosLaboratorio, Decisiones, IndicePasos, PieSesiones, Tropiezos } from "../sesiones";

export const metadata: Metadata = {
  title: "Sesión 2 · El mundo: geometría, materiales, texturas y luz — Chispa, juego 3D multijugador",
  description:
    "Segunda sesión de Chispa: la azotea generada con un guion de Blender, propiedades en vez de nombres, texturas pintadas en canvas, cielo con nubes instanciadas y un sol con sombras.",
};

// Página para vídeo (docs/paginas-para-video.md). Fuente de verdad:
// docs/chispa/sesiones/sesion-02.md. Cada «Qué se ha hecho» es un <Paso>; los
// prompts de «Cómo se pidió» van en PromptBlock. Los visores reutilizan las
// escenas del laboratorio (app/programacion-ia/_3d/pasos.ts).

const PASOS = [
  "El escenario por guion",
  "Un convenio con el juego",
  "La carga",
  "Texturas sin descargar",
  "Cielo y ambiente",
  "La luz",
  "Créditos",
];

const PROMPT_GUION = `Escribe un guion de Blender (bpy + bmesh) que genere la azotea de docs/diseno.md y la exporte a GLB.
Las medidas, en constantes arriba.
Cada objeto que choque lleva la propiedad colision = 1; los puntos especiales son vacíos con tipo.`;

const PROMPT_CARGA = `Carga el GLB. No busques los objetos por nombre: usa userData.`;

const PROMPT_TEXTURA = `El suelo se ve plano.
Genera con canvas una textura de losas de 2 m con su mapa de normales y de rugosidad,
y aplícala a los materiales suelo y losa.`;

const PROMPT_CIELO = `Añade cielo, niebla y nubes instanciadas.
Enséñame las llamadas de dibujo y los triángulos en el panel.`;

const COMPROBAR = `blender --background --python herramientas/blender/azotea.py   # regenera el GLB
npm run dev`;

export default function ChispaSesion2() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <CabeceraSesion n={2} chips={["🧊 Blender por guion", "📦 azotea.glb · 350 kB", "🎨 Texturas en canvas", "☁️ 48 nubes, 1 llamada"]} />

      <IndicePasos pasos={PASOS} />

      {/* ───────────── QUÉ SE HA HECHO ───────────── */}
      <Paso
        id="paso-1"
        n={1}
        titulo="El escenario, en Blender y por guion"
        entradilla={
          <>
            <C>herramientas/blender/azotea.py</C> construye la azotea y la exporta a <C>public/modelos/azotea.glb</C>: 350 kB,
            unos 4 200 triángulos.
          </>
        }
      >
        <ul className="flex flex-wrap gap-2">
          {[
            "la cubierta octogonal",
            "la tarima central",
            "dos terrazas con rampa",
            "la torre con su ascensor",
            "una isla con puente",
            "pilares",
            "cajas",
            "muretes",
            "muelles",
            "decorado",
          ].map((t) => (
            <li key={t} className={`rounded-full border px-3 py-1 text-base font-semibold ${TONO.azul.chip}`}>
              {t}
            </li>
          ))}
        </ul>
        <p className={`mt-4 max-w-4xl text-lg ${cls.texto}`}>
          El agente puede escribir y corregir un guion, pero no mover vértices con el ratón. Las medidas quedan a la vista y en
          git se ve qué cambió.
        </p>
      </Paso>

      <Paso
        id="paso-2"
        n={2}
        titulo="Un convenio para hablar con el juego"
        entradilla={
          <>
            Cada objeto lleva en sus propiedades lo que el juego necesita saber. Al exportar con «extras», llegan a Three.js en{" "}
            <C>userData</C>.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="colision" nivel={3} mono tono="azul" antetitulo="Propiedad">
            El objeto choca: entra en las físicas.
          </Tarjeta>
          <Tarjeta titulo="tipo" nivel={3} mono tono="azul" antetitulo="Propiedad">
            Un punto especial: aparición, chispa, turbo, muelle…
          </Tarjeta>
          <Tarjeta titulo="altura" nivel={3} mono tono="azul" antetitulo="Propiedad">
            Y cualquier otro dato que el juego necesite saber.
          </Tarjeta>
        </div>
      </Paso>

      <Paso
        id="paso-3"
        n={3}
        titulo="La carga del GLB"
        entradilla={
          <>
            <C>src/mundo/azotea.ts</C> lee el GLB, activa sombras, reparte las texturas y devuelve las marcas.
          </>
        }
      >
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {["apariciones", "chispa", "turbos", "muelles", "ascensor"].map((t) => (
            <li key={t} className={`${cls.suave} !p-4 text-center text-lg font-bold text-zinc-900 dark:text-zinc-100`}>
              {t}
            </li>
          ))}
        </ul>
      </Paso>

      <Paso
        id="paso-4"
        n={4}
        titulo="Texturas sin descargar nada"
        entradilla={
          <>
            <C>src/mundo/texturas.ts</C> pinta losas de hormigón en un <C>&lt;canvas&gt;</C>: color, normales y rugosidad, los
            tres del mismo dibujo.
          </>
        }
      />

      <Bloque
        titulo="Las capas de una textura, en vivo"
        nivel={3}
        entradilla="Color, normales y rugosidad, como en el paso 4. A la derecha, la imagen; a la izquierda, puesta."
      >
        <Visor3D escena="texturas" />
      </Bloque>

      <Paso
        id="paso-5"
        n={5}
        titulo="Cielo y ambiente"
        entradilla={
          <>
            <C>src/mundo/cielo.ts</C>: cúpula con degradado, niebla del color del horizonte y 48 nubes en <b>una sola llamada de
            dibujo</b> (instancias).
          </>
        }
      />

      <Bloque
        titulo="Cientos de copias en una llamada"
        nivel={3}
        entradilla="Lo mismo que las nubes, con árboles: si son copias de la misma malla, van todas en una llamada."
      >
        <Visor3D escena="instancias" />
      </Bloque>

      <Paso
        id="paso-6"
        n={6}
        titulo="La luz"
        entradilla="Un sol con sombras que cubre toda la azotea, luz de relleno y un mapa de entorno para que lo metálico refleje algo."
      />

      <Bloque titulo="Los cuatro tipos de luz, en vivo" nivel={3} entradilla="El sol y el relleno del paso 6, junto a los otros dos. Cada tipo ilumina de una manera y cuesta distinto.">
        <Visor3D escena="luces" />
      </Bloque>

      <Paso
        id="paso-7"
        n={7}
        titulo="Créditos"
        entradilla={
          <>
            Empieza <C>CREDITOS.md</C>: el registro de qué es de quién.
          </>
        }
      />

      {/* ───────────── CÓMO SE PIDIÓ ───────────── */}
      <Bloque id="prompts" titulo="Cómo se pidió: el escenario" entradilla="Resumen de los prompts de la sesión.">
        <div className="space-y-4">
          <Prompt text={PROMPT_GUION} etiqueta="Prompt · el guion de Blender" />
          <Prompt text={PROMPT_CARGA} etiqueta="Prompt · la carga" />
        </div>
      </Bloque>

      <Bloque titulo="Cómo se pidió: texturas y cielo" nivel={3}>
        <div className="space-y-4">
          <Prompt text={PROMPT_TEXTURA} etiqueta="Prompt · la textura" />
          <Prompt text={PROMPT_CIELO} etiqueta="Prompt · el cielo" />
        </div>
      </Bloque>

      <Decisiones
        items={[
          ["004", "El escenario, con un guion de Blender", "Descartados: modelarlo a mano, montarlo con primitivas en el código o comprar uno hecho."],
          [
            "005",
            "Propiedades, no nombres",
            <>
              Blender renombra solo (<C>caja.001</C>) y el exportador limpia los nombres. Una propiedad no se rompe al duplicar.
            </>,
          ],
        ]}
      />

      <Bloque id="laboratorio" titulo="Conceptos del laboratorio" entradilla="Los que toca esta sesión. Cada uno lleva a su escena del Laboratorio 3D.">
        <ConceptosLaboratorio
          items={[
            ["Una malla son triángulos", "objetos"],
            ["Más triángulos, más coste", "objetos"],
            ["Materiales: cómo responde a la luz", "objetos"],
            ["Texturas: imágenes sobre la malla", "objetos"],
            ["Cuatro tipos de luz", "luz"],
            ["Muchos objetos, una sola llamada", "rendimiento"],
          ]}
        />
      </Bloque>

      <Bloque id="comprobar" titulo="Para comprobarlo" anchoJunto={760} junto={<Codigo code={COMPROBAR} etiqueta="Terminal · en la carpeta del juego" />}>
        <Checklist
          items={[
            {
              texto: "Panel de datos: unas 185 llamadas de dibujo y 12 000 triángulos.",
              detalle: "El presupuesto es 200 y 300 000: de triángulos sobra, de llamadas vamos justos (se arregla en la sesión 7 fundiendo mallas).",
            },
            {
              texto: <>Cambia <C>ALTO_TORRE</C> en el guion, vuelve a exportar y recarga.</>,
              detalle: "La torre crece y el ascensor y el muelle se ajustan solos.",
            },
          ]}
        />
      </Bloque>

      <Tropiezos
        items={[
          [
            "Blender tiene Z hacia arriba; Three.js, Y",
            <>
              El exportador lo convierte, pero un ángulo guardado como propiedad no: hay que convertirlo a mano (ver{" "}
              <C>aparicion</C> en <C>azotea.ts</C>).
            </>,
          ],
          [
            "Los colores de Blender son lineales",
            <>
              Un <C>#8a93a3</C> escrito tal cual sale lavado: el guion lo convierte con <C>hex_a_rgb</C>.
            </>,
          ],
          [
            "Las coordenadas UV hay que crearlas",
            "Una malla hecha por guion no tiene UV, y sin UV la textura no sabe dónde ir. El guion las calcula por proyección de cubo (1 unidad de UV = 4 m).",
          ],
          ["Las sombras no se veían", "La luz de relleno era tan fuerte que las tapaba. Menos relleno y más sol."],
        ]}
      />

      <PieSesiones actual={2} />
    </div>
  );
}
