import type { Metadata } from "next";
import Visor3D from "../../_3d/Visor3D";
import { Bloque, C, Checklist, Codigo, DosColumnas, Paso, Prompt, TONO, Tarjeta, cls } from "../../_video/piezas";
import { CabeceraSesion, ConceptosLaboratorio, Decisiones, IndicePasos, PieSesiones, Tropiezos } from "../sesiones";

export const metadata: Metadata = {
  title: "Sesión 1 · La idea, la escena y el bucle — Chispa, juego 3D multijugador",
  description:
    "Primera sesión de Chispa: diseño en una página con filtro de alcance, Vite + TypeScript + Three.js, AGENTS.md, la escena, el bucle a paso fijo y una herramienta de capturas para que el agente vea.",
};

// Página para vídeo (docs/paginas-para-video.md). Fuente de verdad:
// docs/chispa/sesiones/sesion-01.md. Cada «Qué se ha hecho» es un <Paso>; los
// prompts de «Cómo se pidió» van en PromptBlock. Los visores reutilizan las
// escenas del laboratorio (app/programacion-ia/_3d/pasos.ts).

const PASOS = [
  "Diseño en una página",
  "Vite, TypeScript y Three.js",
  "Instrucciones para el agente",
  "La escena",
  "El bucle",
  "Los ojos del agente",
  "Publicado",
];

const PROMPT_ESCENA = `Lee docs/diseno.md.
Monta un proyecto Vite + TypeScript + Three.js con una escena mínima: suelo con rejilla, un cubo que gira con sombra y OrbitControls.
Separa la escena (src/mundo/escena.ts) del bucle (src/nucleo/bucle.ts).`;

const PROMPT_BUCLE = `El bucle tiene que tener un paso fijo de 1/60 s para la lógica y otro para pintar.
Explícame en un comentario por qué.`;

const PROMPT_CAPTURA = `Hazme una herramienta que abra el juego en Chromium sin pantalla y guarde una captura,
para que puedas ver lo que has hecho.`;

const COMPROBAR = `npm run dev
node herramientas/captura.mjs    # deja capturas/captura.png`;

export default function ChispaSesion1() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <CabeceraSesion n={1} chips={["🧱 Vite · TypeScript · Three.js", "📄 docs/diseno.md", "🤖 AGENTS.md", "📸 Capturas sin pantalla"]} />

      <IndicePasos pasos={PASOS} />

      {/* ───────────── QUÉ SE HA HECHO ───────────── */}
      <Paso
        id="paso-1"
        n={1}
        titulo="Diseño en una página"
        entradilla={
          <>
            En <C>docs/diseno.md</C>: la idea, el bucle de juego, las reglas con números, los controles y, lo más importante,
            el <b>filtro de alcance</b>.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="Mínimo jugable" nivel={3} tono="verde" antetitulo="Hito 1 · sesión 4">
            Un robot que corre, salta y embiste por la azotea; la chispa se coge y da batería; se puede ganar. Rivales del
            ordenador para probarlo solo.
          </Tarjeta>
          <Tarjeta titulo="Versión 1.0" nivel={3} tono="azul" antetitulo="Sesión 8">
            Salas en red, anfitrión con autoridad, interpolación, reconexión, ranking guardado, menú, marcador, sonido, móvil y
            mando.
          </Tarjeta>
          <Tarjeta titulo="Fuera" nivel={3} tono="rosa" antetitulo="No se hace">
            Varios escenarios, chat, personalizar el robot más allá del color, espectadores, servidor propio que arbitre.
          </Tarjeta>
        </div>
      </Paso>

      <Paso
        id="paso-2"
        n={2}
        titulo="Vite, TypeScript y Three.js"
        entradilla={
          <>
            Sin motor de juego ni framework: <b>Vite</b> sirve y compila, <b>TypeScript</b> pone los tipos y <b>Three.js</b>{" "}
            dibuja. <C>npm run dev</C> y a mirar.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="Three.js" nivel={3} antetitulo="El dibujo en 3D">
            Es lo más documentado que hay, así que el agente acierta más.
          </Tarjeta>
          <Tarjeta titulo="Vite" nivel={3} antetitulo="Desarrollar y compilar">
            El resultado son ficheros estáticos que caben en cualquier servidor.
          </Tarjeta>
          <Tarjeta titulo="TypeScript estricto" nivel={3} antetitulo="Tipos">
            Avisa cuando el agente se inventa una función que no existe.
          </Tarjeta>
        </div>
      </Paso>

      <Paso
        id="paso-3"
        n={3}
        titulo="Instrucciones para el agente"
        entradilla={
          <>
            En <C>AGENTS.md</C> (<C>CLAUDE.md</C> solo lo importa): lo que el agente lee al empezar cada conversación.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["El stack", "Vite, TypeScript y Three.js."],
            ["Cómo se organiza", "Qué va en cada carpeta del código."],
            ["Las órdenes", "npm run dev, la captura, desplegar."],
            ["Lo que no se toca", "Lo que el agente no debe cambiar."],
          ].map(([t, d]) => (
            <Tarjeta key={t} titulo={t} nivel={3} tono="morado">
              {d}
            </Tarjeta>
          ))}
        </div>
      </Paso>

      <Paso
        id="paso-4"
        n={4}
        titulo="La escena"
        entradilla={
          <>
            En <C>src/mundo/escena.ts</C>: las cuatro piezas que necesita cualquier escena de Three.js para verse.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Tarjeta titulo="Renderer" nivel={3} tono="azul" antetitulo="Quien dibuja">
            Convierte la escena en la imagen del lienzo.
          </Tarjeta>
          <Tarjeta titulo="Cámara en perspectiva" nivel={3} tono="azul" antetitulo="Desde dónde">
            Lo lejano se ve más pequeño.
          </Tarjeta>
          <Tarjeta titulo="Luz de relleno" nivel={3} tono="ambar" antetitulo="Que nada quede negro">
            Ilumina todo por igual.
          </Tarjeta>
          <Tarjeta titulo="Un sol con sombras" nivel={3} tono="ambar" antetitulo="La luz principal">
            Da volumen y sombras al cubo.
          </Tarjeta>
        </div>
      </Paso>

      <Bloque
        titulo="La cámara del paso 4, en vivo"
        nivel={3}
        entradilla="Una cámara en perspectiva es una pirámide: solo se dibuja lo que queda dentro."
      >
        <Visor3D escena="camara" />
      </Bloque>

      <Paso
        id="paso-5"
        n={5}
        titulo="El bucle: lógica a paso fijo"
        entradilla={
          <>
            En <C>src/nucleo/bucle.ts</C>: la lógica avanza a <b>paso fijo de 1/60 s</b> y el dibujo va aparte. Por eso el
            cubo gira a la misma velocidad aunque bajen los fps.
          </>
        }
      >
        <DosColumnas
          centro="y aparte"
          a={{
            antetitulo: "siempre igual",
            titulo: "La lógica",
            tono: "verde",
            puntos: [
              "Avanza siempre en pasos de 1/60 s.",
              "Igual en un equipo lento que en uno rápido.",
              "Las físicas no se vuelven locas cuando un fotograma tarda.",
              "En red, todos simulan con el mismo paso.",
            ],
          }}
          b={{
            antetitulo: "cuando toca",
            titulo: "El dibujo",
            tono: "azul",
            puntos: ["Pinta lo que hay en ese momento.", "El contador de fps mide esta parte.", "Descartado: multiplicarlo todo por el dt de cada fotograma."],
          }}
        />
      </Paso>

      <Paso
        id="paso-6"
        n={6}
        titulo="Los ojos del agente"
        entradilla={
          <>
            <C>herramientas/captura.mjs</C> abre el juego <b>sin pantalla</b> y guarda una imagen. Así el agente mira lo que ha
            hecho en vez de suponerlo.
          </>
        }
      >
        <ol className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            ["Abre el juego", "En Chromium, sin ventana."],
            ["Guarda una imagen", "En capturas/captura.png."],
            ["El agente la mira", "De «creo que funciona» a «mira»."],
          ].map(([t, d], i) => (
            <li key={t} className={`${cls.tarjeta} flex min-w-0 gap-3 !p-4`}>
              <span aria-hidden className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${TONO.azul.disco}`}>
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-lg font-bold text-zinc-900 dark:text-zinc-100">{t}</span>
                <span className={`block ${cls.texto}`}>{d}</span>
              </span>
            </li>
          ))}
        </ol>
      </Paso>

      <Paso
        id="paso-7"
        n={7}
        titulo="Publicado desde el primer día"
        entradilla={
          <>
            Con <C>npm run desplegar</C>, el juego está en el servidor del centro desde la sesión 1, aunque solo sea un cubo.
          </>
        }
      />

      {/* ───────────── CÓMO SE PIDIÓ ───────────── */}
      <Bloque id="prompts" titulo="Cómo se pidió: la escena y el bucle" entradilla="Resumen de los prompts de la sesión.">
        <div className="space-y-4">
          <Prompt text={PROMPT_ESCENA} etiqueta="Prompt · la escena" />
          <Prompt text={PROMPT_BUCLE} etiqueta="Prompt · el bucle" />
        </div>
      </Bloque>

      <Bloque titulo="Cómo se pidió: la captura" nivel={3}>
        <Prompt text={PROMPT_CAPTURA} etiqueta="Prompt · los ojos del agente" />
      </Bloque>

      <Decisiones
        items={[
          ["001", "Three.js + Vite + TypeScript", "Sin motor ni framework. Descartados: Babylon.js, React Three Fiber y exportar un motor como Godot."],
          ["002", "Bucle con paso fijo de 1/60 s", "El juego se comporta igual en un equipo lento y en uno rápido."],
          ["003", "Servidor del centro", "En el mismo origen que el Supabase del curso: sin CORS ni permisos raros. GitHub Pages, descartado."],
        ]}
      />

      <Bloque id="laboratorio" titulo="Conceptos del laboratorio" entradilla="Los que toca esta sesión. Cada uno lleva a su escena del Laboratorio 3D.">
        <ConceptosLaboratorio
          items={[
            ["Un mundo con tres ejes", "espacio"],
            ["Posición, rotación y escala", "espacio"],
            ["El grafo de escena: padres e hijos", "espacio"],
            ["La cámara por dentro", "luz"],
          ]}
        />
      </Bloque>

      <Bloque titulo="El cubo y sus tres ejes" nivel={3} entradilla="El cubo de esta sesión vive aquí: cada posición son tres números.">
        <Visor3D escena="ejes" />
      </Bloque>

      <Bloque id="comprobar" titulo="Para comprobarlo" anchoJunto={600} junto={<Codigo code={COMPROBAR} etiqueta="Terminal · en la carpeta del juego" />}>
        <Checklist
          items={[
            { texto: "El cubo gira a la misma velocidad aunque el contador de fps baje (paso fijo)." },
            { texto: "Al cambiar el tamaño de la ventana, la imagen no se deforma." },
          ]}
        />
      </Bloque>

      <Tropiezos
        items={[
          [
            "Sin tarjeta gráfica, WebGL no arranca",
            <>
              En un servidor o un contenedor hay que lanzar Chromium con <C>--use-angle=swiftshader</C> para que dibuje por
              software.
            </>,
          ],
          [
            "Publicado en una subcarpeta, sale en blanco",
            <>
              Sin <C>base: &quot;./&quot;</C> en <C>vite.config.ts</C>, el navegador busca los ficheros en la raíz del servidor.
            </>,
          ],
        ]}
      />

      <PieSesiones actual={1} />
    </div>
  );
}
