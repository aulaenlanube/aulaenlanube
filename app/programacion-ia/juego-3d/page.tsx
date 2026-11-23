import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Bloque, C, Chip, TONO, Tarjeta, cls } from "../_video/piezas";
import { SESIONES, hrefSesion } from "./sesiones";

export const metadata: Metadata = {
  title: "Proyecto 3 · Chispa, videojuego 3D multijugador — Curso de Programación con IA",
  description:
    "Proyecto 3: Chispa, un videojuego 3D multijugador de navegador dibujado como pixel art. 10 robots, 6 escenarios y 21 objetos, en red con salas o contra el ordenador. Construido en 8 sesiones con un agente de programación.",
};

// Página para vídeo (docs/paginas-para-video.md): cada <Bloque> cabe en
// 1100×620 y el hilo del proyecto va en la portada. Lo que cuenta sale de la
// documentación del juego (docs/chispa/: README, diseño, postmortem y las 8
// sesiones). Las sesiones con página están en ./sesiones.tsx.

const INDICE: [string, string][] = [
  ["jugar", "Jugar y aprender"],
  ["juego", "Qué tiene el juego"],
  ["sesiones", "Las 8 sesiones"],
  ["reglas", "Las reglas del proyecto"],
];

const HILO: [string, string][] = [
  ["Diseño en una página", "con lo que entra y lo que queda fuera"],
  ["Hito 1 en la sesión 4", "un robot, la chispa y rivales: ya es un juego"],
  ["Versión 1.0 en la sesión 8", "en red, con salas, y publicada"],
];

const REGLAS: [string, string][] = [
  [
    "Diseño en una página, con filtro de alcance",
    "Mínimo jugable, versión 1.0 y fuera. Todo lo que estaba en «fuera» siguió fuera: el juego se acabó porque era pequeño.",
  ],
  [
    "Reglas como lógica pura, testeable sin navegador",
    "Sin three, sin DOM, sin red. Al llegar la red bastó con decidir quién las ejecuta: no hubo que tocarlas.",
  ],
  [
    "Herramientas para que el agente vea",
    "La captura sin pantalla y chispa.adelantar() convirtieron «creo que funciona» en «mira».",
  ],
  [
    "Medir antes de tocar el balance",
    "Simular partidas enteras y contar cambios de manos, rachas y diferencias, antes y después de tocar una regla.",
  ],
];

const RED: [string, string][] = [
  ["Cada jugador", "simula su robot y envía su posición 15 veces por segundo."],
  ["El anfitrión", "el más antiguo de la sala, ejecuta las reglas y envía el estado 5 veces por segundo. Si se va, hereda el siguiente."],
  ["Los demás robots", "se pintan interpolados, 100 ms en el pasado."],
  ["Al acabar", "cada jugador apunta su resultado en la base de datos; las políticas impiden escribir el de otro."],
];

const OTRA_VEZ = [
  "El anfitrión y los mensajes, dibujados en la sesión 1 aunque no se programen hasta la 5.",
  "La prueba de dos navegadores, el mismo día que el primer mensaje por la red.",
  "El panel de F3 con las llamadas de dibujo, desde la primera escena.",
];

/** Tarjeta de una sesión: enlazada si tiene página; si no, documentada y en preparación. */
function TarjetaSesion({ n }: { n: number }) {
  const s = SESIONES[n - 1];
  const dentro = (
    <>
      <span className="flex items-center gap-3">
        <span
          aria-hidden
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-extrabold ${s.publicada ? TONO.azul.disco : TONO.gris.disco}`}
        >
          {s.n}
        </span>
        <span className="text-lg font-bold leading-tight text-zinc-900 dark:text-zinc-100">{s.titulo}</span>
      </span>
      <span className={`mt-2 block ${cls.texto}`}>{s.seVe}</span>
      <span className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-zinc-900 px-2 py-0.5 font-mono text-base text-emerald-300">sesion-0{s.n}</span>
        {s.publicada ? (
          <span className={`text-base font-bold ${TONO.azul.texto}`}>Abrir la sesión →</span>
        ) : (
          <span className={`text-base font-semibold ${TONO.gris.texto}`}>Documentada · en preparación para vídeo</span>
        )}
      </span>
    </>
  );
  return s.publicada ? (
    <Link href={hrefSesion(s.n)} className={`${cls.tarjeta} flex h-full min-w-0 flex-col !p-4 transition hover:border-blue-300 dark:hover:border-blue-500/50`}>
      {dentro}
    </Link>
  ) : (
    <div className={`${cls.suave} flex h-full min-w-0 flex-col !p-4`}>{dentro}</div>
  );
}

export default function Juego3D() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* Portada */}
      <section data-bloque className="max-w-[1100px]">
        <Breadcrumbs
          grande
          items={[
            { title: "Curso de Programación con IA", path: "/programacion-ia/" },
            { title: "Juego 3D multijugador", path: "/programacion-ia/juego-3d/" },
          ]}
        />
        <Chip>Proyecto 3 · Juego 3D multijugador</Chip>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="text-blue-600 dark:text-blue-400">Chispa</span>: un videojuego 3D multijugador
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          De 2 a 8 robots se disputan <b>una chispa</b>: quien la lleva carga su batería; los demás le embisten para
          quitársela. Gana quien llega al 100 %. Es 3D de verdad, dibujado como <b>pixel art</b>, y se juega <b>en red</b>,
          con salas, o <b>contra el ordenador</b>. Es el juego de referencia del proyecto, construido sesión a sesión con un
          agente de programación.
        </p>

        <div className={`mt-5 rounded-2xl border p-5 ${TONO.verde.caja}`}>
          <p className={`text-base font-bold uppercase tracking-wider ${TONO.verde.texto}`}>El hilo del proyecto 3</p>
          <p className="mt-1 text-xl font-bold text-emerald-950 dark:text-emerald-50">
            Un juego pequeño que se acaba, porque lo que queda fuera se decide el primer día.
          </p>
          <ol className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
            {HILO.map(([t, d], i) => (
              <li key={t} className="flex items-start gap-3">
                <span aria-hidden className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${TONO.verde.disco}`}>
                  {i + 1}
                </span>
                <span>
                  <span className="block text-lg font-semibold text-emerald-950 dark:text-emerald-100">{t}</span>
                  <span className="block text-base text-emerald-900 dark:text-emerald-200">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {["🤖 10 robots", "🏙 6 escenarios", "🎁 21 objetos", "👥 De 2 a 8 jugadores", "🧱 Three.js · Rapier · Supabase Realtime"].map((m) => (
            <Chip key={m} tono="gris">
              {m}
            </Chip>
          ))}
        </div>
      </section>

      <Bloque titulo="En esta página">
        <nav aria-label="En esta página">
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {INDICE.map(([id, t], i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="flex h-full items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-base font-semibold text-zinc-800 transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-900 dark:text-zinc-200 dark:hover:border-blue-500/50"
                >
                  <span aria-hidden className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${TONO.azul.disco}`}>
                    {i + 1}
                  </span>
                  {t}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Bloque>

      {/* 1 · Jugar y aprender */}
      <Bloque
        id="jugar"
        titulo="Versión 3.1.0, publicada y jugable"
        entradilla="Está en el servidor del centro. Al lado, el laboratorio con los conceptos 3D que usa, cada uno en una escena en vivo."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Link
            href="https://titan/juegos/chispa/"
            className={`flex flex-col rounded-2xl border-2 p-6 transition hover:-translate-y-0.5 hover:shadow-lg ${TONO.verde.caja}`}
          >
            <span className={`text-base font-bold uppercase tracking-wider ${TONO.verde.texto}`}>v3.1.0 · servidor del centro</span>
            <span className="mt-1 text-3xl font-extrabold text-emerald-950 dark:text-emerald-50">▶ Jugar a Chispa</span>
            <span className="mt-2 flex-1 text-lg text-emerald-950 dark:text-emerald-100">
              Contra el ordenador (de 1 a 7 rivales) o en red: «Crear una sala» da un código de cuatro letras.
            </span>
            <span className={`mt-3 text-base font-semibold ${TONO.verde.texto}`}>
              Solo desde la red del instituto: fuera del centro no carga.
            </span>
          </Link>
          <Link
            href="/programacion-ia/juego-3d/laboratorio/"
            className={`flex flex-col rounded-2xl border-2 p-6 transition hover:-translate-y-0.5 hover:shadow-lg ${TONO.morado.caja}`}
          >
            <span className={`text-base font-bold uppercase tracking-wider ${TONO.morado.texto}`}>Material de consulta</span>
            <span className="mt-1 text-3xl font-extrabold text-violet-950 dark:text-violet-50">🧊 Laboratorio 3D</span>
            <span className="mt-2 flex-1 text-lg text-violet-950 dark:text-violet-100">
              20 escenas interactivas: ejes, mallas, luces, cámaras, esqueletos, físicas y red. Cada sesión enlaza las suyas.
            </span>
            <span className={`mt-3 text-base font-semibold ${TONO.morado.texto}`}>Abrir el laboratorio →</span>
          </Link>
        </div>
      </Bloque>

      {/* 2 · Qué tiene el juego */}
      <Bloque id="juego" titulo="Qué tiene el juego" entradilla="Tras la 1.0, el juego se amplió sin cambiar la regla central: llevar la chispa carga la batería.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tarjeta titulo="10 robots" nivel={3} tono="azul" antetitulo="Personajes">
            Cada uno con sus características y su habilidad especial: elegir robot es una decisión de juego, no solo de aspecto.
          </Tarjeta>
          <Tarjeta titulo="6 escenarios" nivel={3} tono="verde" antetitulo="Cada uno, con su truco">
            Uno del que nadie se cae, una fábrica con cintas y una barredora, un ring que encoge, un glaciar de hielo y viento,
            una estación con media gravedad…
          </Tarjeta>
          <Tarjeta titulo="21 objetos" nivel={3} tono="ambar" antetitulo="Tres familias">
            <b>Ventajas</b> (turbo, escudo, imán…), <b>trampas</b> (lastre, mareo, apagón…) y <b>armas</b> que se guardan y se
            disparan (cohete, mina, martillo…).
          </Tarjeta>
        </div>
        <p className={`mt-4 max-w-4xl text-lg ${cls.texto}`}>
          Y <b>presión sobre el líder</b>: a quien lleva la chispa mucho rato le pesa, los que persiguen al primero corren más
          y la caja sorpresa da armas al último. Todo poco a poco y con tope.
        </p>
      </Bloque>

      <Bloque titulo="El multijugador, en cuatro líneas" nivel={3} entradilla="Supabase Realtime en el mismo origen que el juego. Sin servidor propio que arbitre.">
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {RED.map(([t, d]) => (
            <li key={t} className={`${cls.tarjeta} min-w-0 !p-4`}>
              <span className="block text-lg font-bold text-zinc-900 dark:text-zinc-100">{t}</span>
              <span className={`mt-1 block ${cls.texto}`}>{d}</span>
            </li>
          ))}
        </ul>
      </Bloque>

      {/* 3 · Las 8 sesiones */}
      <Bloque
        id="sesiones"
        titulo="Sesiones 1 a 4: hasta el hito 1"
        entradilla={
          <>
            Cada sesión acaba en una etiqueta de git (<C>sesion-01</C>…) y cuenta qué se hizo, cómo se le pidió al agente y
            qué falló.
          </>
        }
      >
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <li key={n}>
              <TarjetaSesion n={n} />
            </li>
          ))}
        </ol>
      </Bloque>

      <Bloque titulo="Sesiones 5 a 8: red, juego completo y release" nivel={3} entradilla="Documentadas; sus páginas, en preparación para vídeo.">
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[5, 6, 7, 8].map((n) => (
            <li key={n}>
              <TarjetaSesion n={n} />
            </li>
          ))}
        </ol>
      </Bloque>

      {/* 4 · Las reglas del proyecto */}
      <Bloque id="reglas" titulo="Las reglas del proyecto" entradilla="Lo que mejor funcionó, según el postmortem del juego. Valen para cualquier juego que hagas con un agente.">
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {REGLAS.map(([t, d], i) => (
            <li key={t} className={`${cls.tarjeta} flex min-w-0 gap-4`}>
              <span aria-hidden className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-extrabold ${TONO.verde.disco}`}>
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-xl font-bold text-zinc-900 dark:text-zinc-100">{t}</span>
                <span className={`mt-1 block ${cls.texto}`}>{d}</span>
              </span>
            </li>
          ))}
        </ol>
      </Bloque>

      <Bloque titulo="Si se empezara otra vez" nivel={3} entradilla="Las tres cosas que el postmortem habría hecho antes.">
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {OTRA_VEZ.map((t, i) => (
            <li key={t} className={`rounded-2xl border p-5 ${TONO.ambar.caja}`}>
              <span className={`block text-2xl font-extrabold ${TONO.ambar.texto}`}>{i + 1}</span>
              <span className={`mt-1 block text-lg ${TONO.ambar.tinta}`}>{t}</span>
            </li>
          ))}
        </ol>
      </Bloque>

      <nav className="mt-16 flex max-w-[1100px] flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:flex-wrap sm:justify-between dark:border-white/10">
        {[
          ["/programacion-ia/", "← Curso de Programación con IA"],
          ["/programacion-ia/juego-3d/laboratorio/", "Laboratorio 3D"],
          [hrefSesion(1), "Sesión 1 · La idea y el bucle →"],
        ].map(([href, t]) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl border border-zinc-200 px-4 py-3 text-base font-semibold text-blue-700 hover:bg-zinc-50 dark:border-white/10 dark:text-blue-300 dark:hover:bg-white/5"
          >
            {t}
          </Link>
        ))}
      </nav>
    </div>
  );
}
