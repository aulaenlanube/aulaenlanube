import type { Metadata } from "next";
import Visor3D from "../../_3d/Visor3D";
import { Bloque, C, Checklist, Paso, Prompt, TONO, Tarjeta, cls } from "../../_video/piezas";
import { CabeceraSesion, ConceptosLaboratorio, Decisiones, IndicePasos, PieSesiones, Tropiezos } from "../sesiones";

export const metadata: Metadata = {
  title: "Sesión 3 · El protagonista: control, cámara y animación — Chispa, juego 3D multijugador",
  description:
    "Tercera sesión de Chispa: un robot CC0 con esqueleto y animaciones, una entrada común para teclado, ratón y mando, movimiento con inercia y una cámara en tercera persona.",
};

// Página para vídeo (docs/paginas-para-video.md). Fuente de verdad:
// docs/chispa/sesiones/sesion-03.md. Cada «Qué se ha hecho» es un <Paso>; los
// prompts de «Cómo se pidió» van en PromptBlock. Los visores reutilizan las
// escenas del laboratorio (app/programacion-ia/_3d/pasos.ts).

const PASOS = ["El modelo", "El personaje", "La entrada", "El movimiento", "La cámara", "Los números, juntos"];

const PROMPT_MODELO = `Carga robot.glb y dime qué materiales y qué animaciones trae antes de escribir nada.`;

const PROMPT_PERSONAJE = `Haz una clase Personaje que clone el modelo con su esqueleto,
permita cambiar el color del material Main
y pase de una animación a otra con un fundido.`;

const PROMPT_ENTRADA = `La entrada tiene que servir para teclado, ratón y mando, y devolver lo mismo.
Saltar y embestir son pulsaciones: solo valen en el paso en que se pulsan.`;

const PROMPT_CAMARA = `Cámara en tercera persona con giro e inclinación; que WASD sea relativo a la cámara.
Todos los números, a src/config.ts.`;

export default function ChispaSesion3() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <CabeceraSesion n={3} chips={["🤖 RobotExpressive · CC0", "🦴 Esqueleto y 14 animaciones", "🎮 Teclado, ratón y mando", "🎥 Tercera persona"]} />

      <IndicePasos pasos={PASOS} />

      {/* ───────────── QUÉ SE HA HECHO ───────────── */}
      <Paso
        id="paso-1"
        n={1}
        titulo="El modelo del robot"
        entradilla={
          <>
            <C>public/modelos/robot.glb</C>: <b>RobotExpressive</b>, con licencia CC0, esqueleto y 14 animaciones. Apuntado en{" "}
            <C>CREDITOS.md</C>.
          </>
        }
      />

      <Bloque
        titulo="El esqueleto del robot, en vivo"
        nivel={3}
        entradilla="El mismo robot de Chispa: por dentro lleva una jerarquía de huesos que mueve la malla."
      >
        <Visor3D escena="esqueleto" />
      </Bloque>

      <Paso
        id="paso-2"
        n={2}
        titulo="El personaje"
        entradilla={
          <>
            <C>src/jugador/personaje.ts</C> clona el modelo, le pone color y funde una animación con otra.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="Clón propio" nivel={3} tono="azul" antetitulo="Cada robot, el suyo">
            Su propio esqueleto y sus propios materiales.
          </Tarjeta>
          <Tarjeta titulo="Le pone color" nivel={3} tono="ambar" antetitulo="El material Main">
            Cada robot, de su color.
          </Tarjeta>
          <Tarjeta titulo="Funde animaciones" nivel={3} tono="verde" antetitulo="Sin cortes">
            Pasa de una a otra con un fundido.
          </Tarjeta>
        </div>
      </Paso>

      <Bloque
        titulo="Del reposo a correr, con fundido"
        nivel={3}
        entradilla="Cada animación es un clip con nombre. El personaje solo decide cuál suena y cuánto pesa cada uno."
      >
        <Visor3D escena="clips" />
      </Bloque>

      <Paso
        id="paso-3"
        n={3}
        titulo="La entrada"
        entradilla={
          <>
            <C>src/nucleo/entrada.ts</C>: teclado, ratón y mando acaban en la misma estructura, <C>Entrada</C>. El resto del
            juego no sabe qué dispositivo hay.
          </>
        }
      >
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <ul className="space-y-3">
            {["⌨️ Teclado", "🖱 Ratón", "🎮 Mando"].map((t) => (
              <li key={t} className={`${cls.suave} !p-4 text-lg font-bold text-zinc-900 dark:text-zinc-100`}>
                {t}
              </li>
            ))}
          </ul>
          <span aria-hidden className="text-center text-4xl font-extrabold text-zinc-400">
            →
          </span>
          <div className={`rounded-2xl border p-5 ${TONO.azul.caja}`}>
            <p className={`font-mono text-2xl font-extrabold ${TONO.azul.texto}`}>Entrada</p>
            <p className={`mt-2 text-lg ${TONO.azul.tinta}`}>
              Lo mismo venga de donde venga. Saltar y embestir son pulsaciones: solo valen en el paso en que se pulsan.
            </p>
          </div>
        </div>
      </Paso>

      <Paso
        id="paso-4"
        n={4}
        titulo="El movimiento"
        entradilla={
          <>
            <C>src/jugador/control.ts</C>: el robot se mueve sobre un suelo imaginario (las físicas llegan en la sesión 4) y se
            gira hacia donde va.
          </>
        }
      >
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {["aceleración", "inercia", "salto", "gravedad"].map((t) => (
            <li key={t} className={`${cls.tarjeta} !p-4 text-center text-xl font-bold text-zinc-900 dark:text-zinc-100`}>
              {t}
            </li>
          ))}
        </ul>
      </Paso>

      <Paso
        id="paso-5"
        n={5}
        titulo="La cámara en tercera persona"
        entradilla={
          <>
            <C>src/mundo/camara.ts</C>: gira con el ratón y sigue al jugador con retardo. El movimiento es relativo a ella: W
            siempre es «hacia donde miras».
          </>
        }
      />

      <Bloque
        titulo="Cuatro cámaras para un juego"
        nivel={3}
        entradilla="La misma escena y el mismo personaje. Chispa usa la de detrás del personaje."
      >
        <Visor3D escena="seguimiento" />
      </Bloque>

      <Paso
        id="paso-6"
        n={6}
        titulo="Los números, juntos"
        entradilla={
          <>
            Velocidad, salto, gravedad y cámara, todo en <C>src/config.ts</C>: para ajustar cómo se siente el robot se cambia
            un número, sin buscarlo por el código.
          </>
        }
      />

      {/* ───────────── CÓMO SE PIDIÓ ───────────── */}
      <Bloque id="prompts" titulo="Cómo se pidió: el robot" entradilla="Resumen de los prompts de la sesión.">
        <div className="space-y-4">
          <Prompt text={PROMPT_MODELO} etiqueta="Prompt · mirar antes de escribir" />
          <Prompt text={PROMPT_PERSONAJE} etiqueta="Prompt · el personaje" />
        </div>
      </Bloque>

      <Bloque titulo="Cómo se pidió: entrada y cámara" nivel={3}>
        <div className="space-y-4">
          <Prompt text={PROMPT_ENTRADA} etiqueta="Prompt · la entrada" />
          <Prompt text={PROMPT_CAMARA} etiqueta="Prompt · la cámara" />
        </div>
      </Bloque>

      <Decisiones
        items={[
          [
            "006",
            "Robot CC0 en vez de Mixamo",
            "Mixamo pide cuenta de Adobe y su licencia no deja repartir los modelos sueltos. Un CC0 se sube, se modifica y se redistribuye.",
          ],
          [
            "007",
            "La animación la decide el estado",
            "No las teclas: así sirve igual para el jugador, los robots remotos y los del ordenador.",
          ],
        ]}
      />

      <Bloque id="laboratorio" titulo="Conceptos del laboratorio" entradilla="Los que toca esta sesión. Cada uno lleva a su escena del Laboratorio 3D.">
        <ConceptosLaboratorio
          items={[
            ["El esqueleto que mueve la malla", "animacion"],
            ["Clips y mezcla de animaciones", "animacion"],
            ["Cámaras de juego", "luz"],
          ]}
        />
      </Bloque>

      <Bloque id="comprobar" titulo="Para comprobarlo" entradilla={<>Con <C>npm run dev</C> en marcha:</>}>
        <Checklist
          items={[
            {
              texto: "WASD o flechas para moverse, Espacio para saltar, ratón (clic para capturarlo) o Q y E para girar la cámara.",
              detalle: "Con mando: sticks, A y X.",
            },
            { texto: "En diagonal corre igual de rápido que en recto." },
            { texto: "Al soltar las teclas frena en un instante, no en seco: es la aceleración." },
          ]}
        />
      </Bloque>

      <Tropiezos
        items={[
          [
            "El robot salía diminuto",
            <>
              La caja de un modelo con huesos, medida en crudo, sale 100 veces mayor de lo que se ve. Hay que medirla con el
              esqueleto aplicado (<C>SkinnedMesh.computeBoundingBox</C>).
            </>,
          ],
          [
            "Clonar con esqueleto no es clone()",
            <>
              Los clones compartían huesos y se movían todos a la vez. Se usa <C>SkeletonUtils.clone</C>.
            </>,
          ],
          [
            "El robot desaparecía en el borde",
            <>
              Three.js descarta lo que queda fuera de la cámara con la caja de la malla en reposo, que no sigue a la animación.{" "}
              <C>frustumCulled = false</C> en el robot.
            </>,
          ],
          [
            "Un pilar tapaba la cámara",
            "Estaban justo detrás de los puntos de aparición. Se movieron en el guion de Blender y se regeneró el GLB: tres líneas, sin abrir Blender.",
          ],
        ]}
      />

      <PieSesiones actual={3} />
    </div>
  );
}
