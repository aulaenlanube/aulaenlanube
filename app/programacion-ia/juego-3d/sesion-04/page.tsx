import type { Metadata } from "next";
import Visor3D from "../../_3d/Visor3D";
import { Bloque, C, Checklist, Codigo, Paso, Prompt, TONO, Tarjeta, cls } from "../../_video/piezas";
import { CabeceraSesion, ConceptosLaboratorio, Decisiones, IndicePasos, PieSesiones, Tropiezos } from "../sesiones";

export const metadata: Metadata = {
  title: "Sesión 4 · Físicas y reglas (hito 1: ya es un juego) — Chispa, juego 3D multijugador",
  description:
    "Cuarta sesión de Chispa: físicas con Rapier, el controlador de personaje, las reglas como lógica pura con 22 pruebas, rivales del ordenador por intención y la primera partida completa.",
};

// Página para vídeo (docs/paginas-para-video.md). Fuente de verdad:
// docs/chispa/sesiones/sesion-04.md. Cada «Qué se ha hecho» es un <Paso>; los
// prompts de «Cómo se pidió» van en PromptBlock. Los visores son los del
// grupo «Físicas» del laboratorio (app/programacion-ia/_3d/pasos.ts).

const PASOS = [
  "El mundo físico",
  "El motor del robot",
  "Reglas como lógica pura",
  "Las pruebas",
  "Los rivales",
  "Chispa, turbos y marcador",
  "La partida",
  "La cámara y su rayo",
];

const PROMPT_RAPIER = `Añade Rapier.
Funde todas las mallas con colision en un solo collider trimesh estático.
El robot es una cápsula cinemática movida con KinematicCharacterController (autostep 0,35, snap-to-ground).`;

const PROMPT_REGLAS = `Escribe las reglas de docs/diseno.md en src/reglas/partida.ts como funciones puras:
reciben el estado, el dt y dónde está cada robot, y devuelven las jugadas que han ocurrido.
Nada de three ni de DOM. Y sus pruebas con Vitest.`;

const PROMPT_RIVALES = `Quiero poder jugar solo.
Haz rivales que devuelvan una intención como la del teclado y usen el mismo motor que el jugador.`;

const PROMPT_SIMULA = `Simula 60 segundos de partida solo con rivales y dime batería, robos y caídas.`;

const COMPROBAR = `npm run pruebas    # 22 pruebas de las reglas
npm run dev`;

export default function ChispaSesion4() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <CabeceraSesion n={4} chips={["⚙️ Rapier", "🧪 22 pruebas con Vitest", "🤖 Tres rivales del ordenador", "🏁 Hito 1: mínimo jugable"]} />

      <IndicePasos pasos={PASOS} />

      {/* ───────────── QUÉ SE HA HECHO ───────────── */}
      <Paso
        id="paso-1"
        n={1}
        titulo="El mundo físico"
        entradilla={
          <>
            <C>src/fisica/mundo.ts</C>, con <b>Rapier</b>. Tres clases de cosas, cada una con su cuerpo:
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="El escenario" nivel={3} tono="gris" antetitulo="Un collider trimesh">
            UN collider de malla de triángulos hecho con las mallas marcadas con <C>colision</C> en Blender.
          </Tarjeta>
          <Tarjeta titulo="El ascensor" nivel={3} tono="ambar" antetitulo="Cuerpo cinemático">
            Lo mueve el código y empuja lo que tiene encima.
          </Tarjeta>
          <Tarjeta titulo="Cada robot" nivel={3} tono="azul" antetitulo="Una cápsula">
            Movida por el controlador de personaje de Rapier.
          </Tarjeta>
        </div>
      </Paso>

      <Bloque
        titulo="Los cuerpos del paso 1, en vivo"
        nivel={3}
        entradilla="El motor de físicas mueve las cosas por ti, pero tienes que decirle de qué tipo es cada una."
      >
        <Visor3D escena="cuerpos" />
      </Bloque>

      <Bloque
        titulo="Cuatro formas de chocar"
        nivel={3}
        entradilla="La física no choca con lo que ves, sino con la forma que eliges. El escenario de Chispa usa la última."
      >
        <Visor3D escena="colliders" />
      </Bloque>

      <Paso
        id="paso-2"
        n={2}
        titulo="El motor del robot"
        entradilla={
          <>
            En <C>src/jugador/control.ts</C>, el controlador de personaje de Rapier resuelve paredes, rampas y escalones.
            Encima, lo que hace que se sienta como un juego:
          </>
        }
      >
        <ul className="flex flex-wrap gap-2">
          {["inercia", "salto con margen (coyote y memoria)", "embestida", "empujón recibido", "muelles", "caída"].map((t) => (
            <li key={t} className={`rounded-full border px-3 py-1 text-lg font-semibold ${TONO.azul.chip}`}>
              {t}
            </li>
          ))}
        </ul>
      </Paso>

      <Bloque
        titulo="El robot es una cápsula"
        nivel={3}
        entradilla="Una malla animada con miles de triángulos que, para la física, es una simple cápsula."
      >
        <Visor3D escena="capsula" />
      </Bloque>

      <Paso
        id="paso-3"
        n={3}
        titulo="Las reglas, como lógica pura"
        entradilla={
          <>
            <C>src/reglas/partida.ts</C>: quién lleva la chispa, batería, robos, turbos y final. <b>Sin three, sin DOM, sin
            red.</b>
          </>
        }
      >
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
          <div className={`${cls.suave} min-w-0`}>
            <p className={`text-base font-bold uppercase tracking-wider ${TONO.gris.texto}`}>Recibe</p>
            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">el estado, el dt y dónde está cada robot</p>
          </div>
          <span aria-hidden className="text-center text-4xl font-extrabold text-zinc-400">
            →
          </span>
          <div className={`rounded-2xl border p-5 ${TONO.morado.caja}`}>
            <p className={`font-mono text-xl font-extrabold ${TONO.morado.texto}`}>partida.ts</p>
            <p className={`mt-1 text-lg ${TONO.morado.tinta}`}>funciones puras</p>
          </div>
          <span aria-hidden className="text-center text-4xl font-extrabold text-zinc-400">
            →
          </span>
          <div className={`${cls.suave} min-w-0`}>
            <p className={`text-base font-bold uppercase tracking-wider ${TONO.gris.texto}`}>Devuelve</p>
            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">las jugadas que han ocurrido</p>
          </div>
        </div>
        <p className={`mt-4 max-w-4xl text-lg ${cls.texto}`}>
          Lo que se ve y lo que suena reacciona a las jugadas, no al revés.
        </p>
      </Paso>

      <Paso
        id="paso-4"
        n={4}
        titulo="Las pruebas"
        entradilla={
          <>
            <C>pruebas/partida.test.ts</C>: <b>22 pruebas con Vitest</b> sobre las reglas. Se ejecutan en milisegundos, sin
            navegador.
          </>
        }
      />

      <Paso
        id="paso-5"
        n={5}
        titulo="Los rivales del ordenador"
        entradilla={
          <>
            <C>src/bots/cerebro.ts</C>: miran la partida y devuelven una <b>intención</b>, la misma que da el teclado. Siguen
            las rutas marcadas en Blender para subir a las terrazas, a la torre y cruzar a la isla.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tarjeta titulo="Jugador" nivel={3} tono="azul" antetitulo="Teclado, ratón o mando">
            La entrada produce una intención y el motor del robot la ejecuta.
          </Tarjeta>
          <Tarjeta titulo="Rival" nivel={3} tono="morado" antetitulo="Cerebro">
            El cerebro produce la misma intención y el mismo motor la ejecuta: no puede hacer nada que un jugador no pueda.
          </Tarjeta>
        </div>
      </Paso>

      <Paso
        id="paso-6"
        n={6}
        titulo="La chispa, los turbos y el marcador"
        entradilla={
          <>
            La chispa y los turbos, en <C>src/mundo/objetos.ts</C>. El marcador, en <C>src/ui/hud.ts</C>: HTML encima del lienzo.
          </>
        }
      />

      <Paso
        id="paso-7"
        n={7}
        titulo="La partida"
        entradilla={
          <>
            <C>src/partida.ts</C> junta todo en un paso fijo con un orden claro.
          </>
        }
      />

      <Paso
        id="paso-8"
        n={8}
        titulo="La cámara ya no atraviesa paredes"
        entradilla="Lanza un rayo y, si hay algo, se acerca."
      />

      <Bloque
        titulo="Un rayo para la cámara"
        nivel={3}
        entradilla="Sensores y rayos: no todo es chocar. La cámara del paso 8 usa el segundo."
      >
        <Visor3D escena="sensor" />
      </Bloque>

      {/* ───────────── CÓMO SE PIDIÓ ───────────── */}
      <Bloque id="prompts" titulo="Cómo se pidió: físicas y reglas" entradilla="Resumen de los prompts de la sesión.">
        <div className="space-y-4">
          <Prompt text={PROMPT_RAPIER} etiqueta="Prompt · Rapier" />
          <Prompt text={PROMPT_REGLAS} etiqueta="Prompt · las reglas" />
        </div>
      </Bloque>

      <Bloque titulo="Cómo se pidió: jugar solo y medir" nivel={3}>
        <div className="space-y-4">
          <Prompt text={PROMPT_RIVALES} etiqueta="Prompt · los rivales" />
          <Prompt text={PROMPT_SIMULA} etiqueta="Prompt · simular una partida" />
        </div>
      </Bloque>

      <Decisiones
        items={[
          ["008", "Las reglas son lógica pura", "Se prueban en milisegundos sin navegador; en red las ejecutará solo el anfitrión."],
          ["009", "Los robots no chocan entre sí", "En red cada uno ve a los demás con retraso. El contacto entre robots es una regla: la embestida."],
          ["010", "Los rivales devuelven una intención", "Misma velocidad, mismas físicas, mismo tiempo de recarga que un jugador."],
        ]}
      />

      <Bloque id="laboratorio" titulo="Conceptos del laboratorio" entradilla="Los que toca esta sesión. Cada uno lleva a su escena del Laboratorio 3D.">
        <ConceptosLaboratorio
          items={[
            ["Tres tipos de cuerpo rígido", "fisicas"],
            ["El collider no es la malla", "fisicas"],
            ["La cápsula del personaje", "fisicas"],
            ["Sensores y rayos", "fisicas"],
          ]}
        />
      </Bloque>

      <Bloque id="comprobar" titulo="Para comprobarlo" anchoJunto={600} junto={<Codigo code={COMPROBAR} etiqueta="Terminal · en la carpeta del juego" />}>
        <Checklist
          items={[
            { texto: "Mayúsculas (o clic) embiste. Si alcanzas a quien lleva la chispa, es tuya." },
            { texto: "Súbete al ascensor amarillo junto a la torre; píllate debajo: te aparta." },
            { texto: "F3 enseña fps, llamadas de dibujo y triángulos." },
            { texto: <>En la consola del navegador, <C>chispa.adelantar(60)</C> simula un minuto de golpe.</> },
          ]}
        />
      </Bloque>

      <Tropiezos
        items={[
          [
            "El robot no subía escalones",
            <>
              El <C>autostep</C> de Rapier deja de funcionar si en el mismo movimiento se le pide caer mucho. En el suelo basta
              con −0,02 por paso.
            </>,
          ],
          [
            "Los rivales empujaban contra la tarima",
            "Su velocidad era la que querían llevar, no la real, así que nunca se daban por atascados. Ahora se calcula con lo que el robot se ha movido de verdad.",
          ],
          [
            "El ascensor hundía al robot",
            "Al bajar sobre un robot, el controlador lo sacaba hacia abajo, a través de la cubierta. Si estás debajo, el ascensor no cuenta como obstáculo y te aparta hacia un lado.",
          ],
          [
            "Robos cada dos segundos",
            <>
              Con tres perseguidores no daba tiempo a nada. Inmunidad tras un robo de 1,4 s y rivales que reaccionan más tarde:
              dos números en <C>config.ts</C> y en <C>cerebro.ts</C>.
            </>,
          ],
        ]}
      />

      <PieSesiones actual={4} />
    </div>
  );
}
