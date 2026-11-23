import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Visor3D from "../../_3d/Visor3D";
import { Aviso, Bloque, C, Chip, Tarjeta, TONO, cls } from "../../_video/piezas";

export const metadata: Metadata = {
  title: "Laboratorio 3D: los conceptos de un videojuego, en vivo — Curso de Programación con IA",
  description:
    "Veinte escenas 3D reales que se explican solas: ejes, mallas, materiales, texturas, luces, cámaras, niveles de detalle, esqueletos y animaciones, cuerpos rígidos, colliders, sensores, rayos y qué viaja por la red en un juego multijugador.",
};

// Página para vídeo (docs/paginas-para-video.md, «Visores 3D»): cada <Bloque>
// cabe en 1100×620 y lleva UN visor. Los visores recorren solos su guion
// (app/programacion-ia/_3d/pasos.ts); los pasos son <li> con texto único en
// toda la página para que la cámara los encuentre.

const INDICE: [string, string][] = [
  ["espacio", "El espacio"],
  ["objetos", "Los objetos"],
  ["luz", "Luz y cámara"],
  ["rendimiento", "Rendimiento"],
  ["animacion", "Animación"],
  ["fisicas", "Físicas"],
  ["red", "Red"],
];

/** Tabla «cómo se llama esto cuando se lo pides al agente». */
function Vocabulario({ filas }: { filas: [string, ReactNode, string][] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10">
      <table className="w-full border-collapse text-left text-base">
        <thead>
          <tr className="bg-zinc-100 text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
            <th className="px-4 py-2.5 font-bold">Lo que quieres</th>
            <th className="px-4 py-2.5 font-bold">Cómo se llama en el código</th>
            <th className="px-4 py-2.5 font-bold">Para qué lo pides</th>
          </tr>
        </thead>
        <tbody>
          {filas.map(([que, codigo, para]) => (
            <tr key={que} className="border-t border-zinc-200 bg-white align-top dark:border-white/10 dark:bg-slate-900">
              <td className="px-4 py-2.5 font-semibold text-zinc-900 dark:text-zinc-100">{que}</td>
              <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300">{codigo}</td>
              <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300">{para}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Laboratorio3D() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* Portada */}
      <section data-bloque className="max-w-[1100px]">
        <Breadcrumbs
          grande
          items={[
            { title: "Curso de Programación con IA", path: "/programacion-ia/" },
            { title: "Juego 3D multijugador", path: "/programacion-ia/juego-3d/" },
            { title: "Laboratorio 3D", path: "/programacion-ia/juego-3d/laboratorio/" },
          ]}
        />
        <Chip>Proyecto 3 · Material de consulta</Chip>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Laboratorio 3D: los conceptos, en vivo</h1>
        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          Tu agente va a escribir el código de tu juego, pero <b>eres tú quien le dice qué hacer</b>. Para pedirle «ponle
          un collider de cápsula» o «instancia los árboles» tienes que saber qué es cada cosa. Aquí están los conceptos de
          un videojuego 3D, cada uno en una <b>escena real</b> que se explica sola: mírala, gírala y quédate con la
          palabra.
        </p>
        <div className={`mt-5 rounded-2xl border p-5 ${TONO.verde.caja}`}>
          <p className={`text-base font-bold uppercase tracking-wider ${TONO.verde.texto}`}>Cómo usar esta página</p>
          <p className="mt-1 text-xl font-bold text-emerald-950 dark:text-emerald-50">
            No se estudia de una vez: se vuelve a ella en cada sesión.
          </p>
          <p className="mt-2 text-lg text-emerald-950 dark:text-emerald-100">
            Cada sesión del proyecto enlaza aquí los conceptos que le tocan. Las escenas están hechas con las mismas
            herramientas que vas a usar: <b>Three.js</b> para dibujar y <b>Rapier</b> para las físicas.
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Chip tono="gris">🧊 20 escenas en vivo</Chip>
          <Chip tono="gris">🖱 Se giran arrastrando</Chip>
          <Chip tono="gris">🧱 Three.js</Chip>
          <Chip tono="gris">⚙️ Rapier</Chip>
          <Chip tono="gris">🗣 Vocabulario para tu agente</Chip>
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

      {/* ══════════ 1 · El espacio ══════════ */}
      <Bloque
        id="espacio"
        etiqueta="1 · El espacio"
        titulo="Un mundo con tres ejes"
        entradilla="En 2D una posición son dos números. En 3D son tres, y hay que saber cuál es cuál."
      >
        <Visor3D escena="ejes" />
      </Bloque>

      <Bloque
        titulo="Posición, rotación y escala"
        nivel={3}
        entradilla="Son las tres cosas que puedes cambiarle a cualquier objeto. En gris, cómo estaba al principio."
      >
        <Visor3D escena="transformaciones" />
      </Bloque>

      <Bloque
        titulo="El grafo de escena: padres e hijos"
        nivel={3}
        entradilla="Los objetos se cuelgan unos de otros. Un hijo se coloca respecto a su padre, no respecto al mundo."
      >
        <Visor3D escena="grafo" />
      </Bloque>

      <Bloque titulo="Vocabulario del espacio" nivel={3} entradilla="Las palabras que entiende tu agente cuando le hablas de dónde están las cosas.">
        <Vocabulario
          filas={[
            ["Un punto o una dirección", <C key="c">Vector3(x, y, z)</C>, "Posiciones, velocidades, hacia dónde mira algo."],
            ["Mover, girar, escalar", <><C>position</C> · <C>rotation</C> · <C>scale</C></>, "Colocar cualquier objeto de la escena."],
            ["El contenedor de todo", <C key="c">Scene</C>, "Lo que no esté añadido a la escena no se dibuja."],
            ["Agrupar objetos", <><C>Group</C> · <C>padre.add(hijo)</C></>, "Un coche y sus ruedas, una mano y lo que lleva."],
            ["Arriba", "el eje Y", "En Blender arriba es Z: al exportar a GLB se convierte solo."],
          ]}
        />
      </Bloque>

      {/* ══════════ 2 · Los objetos ══════════ */}
      <Bloque
        id="objetos"
        etiqueta="2 · Los objetos"
        titulo="Una malla son triángulos"
        entradilla="Da igual que sea un personaje, un coche o una montaña: por dentro es una lista de puntos unidos de tres en tres."
      >
        <Visor3D escena="malla" />
      </Bloque>

      <Bloque
        titulo="Más triángulos, más coste"
        nivel={3}
        entradilla="El detalle se paga en cada fotograma. Un modelo de una tienda puede traer cien veces más de lo que tu juego necesita."
      >
        <Visor3D escena="detalle" />
      </Bloque>

      <Bloque
        titulo="Materiales: cómo responde a la luz"
        nivel={3}
        entradilla="La malla da la forma; el material dice de qué está hecha. Con dos números, rugosidad y metalicidad, sale casi todo."
      >
        <Visor3D escena="materiales" />
      </Bloque>

      <Bloque
        titulo="Texturas: imágenes sobre la malla"
        nivel={3}
        entradilla="Una textura es una imagen que cambia el material punto a punto. A la derecha, la imagen; a la izquierda, puesta."
      >
        <Visor3D escena="texturas" />
      </Bloque>

      <Bloque titulo="Vocabulario de los objetos" nivel={3} entradilla="Un objeto visible es siempre una geometría más un material.">
        <Vocabulario
          filas={[
            ["Un objeto que se ve", <C key="c">Mesh(geometría, material)</C>, "Todo lo que se dibuja en tu juego."],
            ["La forma", <C key="c">BufferGeometry</C>, "Vértices, triángulos, normales y coordenadas UV."],
            ["El material realista", <><C>MeshStandardMaterial</C>: <C>roughness</C>, <C>metalness</C></>, "El que traen los modelos GLB. Necesita luces."],
            ["Las texturas", <><C>map</C> · <C>normalMap</C> · <C>roughnessMap</C></>, "Color, relieve falso y brillo por zonas."],
            ["Un modelo hecho fuera", <><C>GLTFLoader</C> · fichero <C>.glb</C></>, "Cargar lo que sale de Blender, Mixamo o una tienda."],
          ]}
        />
      </Bloque>

      {/* ══════════ 3 · Luz y cámara ══════════ */}
      <Bloque
        id="luz"
        etiqueta="3 · Luz y cámara"
        titulo="Cuatro tipos de luz"
        entradilla="Sin luz, un material realista se ve negro. Cada tipo ilumina de una manera y cuesta distinto."
      >
        <Visor3D escena="luces" />
      </Bloque>

      <Bloque
        titulo="La cámara por dentro"
        nivel={3}
        entradilla="Una cámara es una pirámide: lo que queda dentro se dibuja. En el recuadro, lo que ve la cámara dibujada."
      >
        <Visor3D escena="camara" />
      </Bloque>

      <Bloque
        titulo="Cámaras de juego"
        nivel={3}
        entradilla="La misma escena y el mismo personaje. Elegir la cámara es elegir a qué género se parece tu juego."
      >
        <Visor3D escena="seguimiento" />
      </Bloque>

      <Bloque titulo="Vocabulario de luz y cámara" nivel={3} entradilla="Las sombras son lo más caro de la iluminación: se piden solo donde se notan.">
        <Vocabulario
          filas={[
            ["Luz de relleno", <><C>AmbientLight</C> · <C>HemisphereLight</C></>, "Que nada quede negro del todo. No da sombras."],
            ["El sol", <C key="c">DirectionalLight</C>, "La luz principal de un exterior, con sombras."],
            ["Bombillas y focos", <><C>PointLight</C> · <C>SpotLight</C></>, "Antorchas, farolas, faros de un coche."],
            ["Activar sombras", <><C>castShadow</C> · <C>receiveShadow</C></>, "Quién proyecta sombra y quién la recibe."],
            ["La cámara normal", <C key="c">PerspectiveCamera(fov, aspect, near, far)</C>, "Casi todos los juegos 3D."],
            ["Sin perspectiva", <C key="c">OrthographicCamera</C>, "Estrategia, puzles, vista isométrica."],
          ]}
        />
      </Bloque>

      {/* ══════════ 4 · Rendimiento ══════════ */}
      <Bloque
        id="rendimiento"
        etiqueta="4 · Rendimiento"
        titulo="Cerca y lejos: niveles de detalle"
        entradilla="Lo que está lejos ocupa cuatro píxeles. Dibujarlo con todos sus triángulos es tirar el tiempo de la tarjeta gráfica."
      >
        <Visor3D escena="lod" />
      </Bloque>

      <Bloque
        titulo="Muchos objetos, una sola llamada"
        nivel={3}
        entradilla="Cada objeto distinto es una orden a la tarjeta gráfica. Si son copias de la misma malla, pueden ir en una sola."
      >
        <Visor3D escena="instancias" />
      </Bloque>

      <Bloque
        titulo="El presupuesto de un juego web"
        nivel={3}
        entradilla="Tu juego tiene que ir fluido en un portátil del aula, no solo en tu ordenador. Números orientativos para no pasarte:"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Tarjeta titulo="16 ms por fotograma" nivel={4} tono="azul" antetitulo="El tiempo">
            A 60 imágenes por segundo, todo (lógica, físicas, dibujo) cabe en 16 milisegundos.
          </Tarjeta>
          <Tarjeta titulo="Menos de 200 llamadas" nivel={4} tono="morado" antetitulo="El dibujo">
            Llamadas de dibujo por fotograma. Se mira en <C>renderer.info.render.calls</C>.
          </Tarjeta>
          <Tarjeta titulo="Unos 300 000 triángulos" nivel={4} tono="verde" antetitulo="Las mallas">
            A la vez en pantalla. Un personaje de tienda puede traer 100 000 él solo.
          </Tarjeta>
          <Tarjeta titulo="Texturas de 1024 px" nivel={4} tono="ambar" antetitulo="La memoria">
            Una de 4096 ocupa 16 veces más memoria de vídeo que una de 1024.
          </Tarjeta>
        </div>
      </Bloque>

      {/* ══════════ 5 · Animación ══════════ */}
      <Bloque
        id="animacion"
        etiqueta="5 · Animación"
        titulo="El esqueleto que mueve la malla"
        entradilla="Un personaje no se anima vértice a vértice: se le mete un esqueleto dentro y se mueven los huesos."
      >
        <Visor3D escena="esqueleto" />
      </Bloque>

      <Bloque
        titulo="Clips y mezcla de animaciones"
        nivel={3}
        entradilla="Cada animación es un clip con nombre. Tu código solo decide cuál suena y cuánto pesa cada uno."
      >
        <Visor3D escena="clips" />
      </Bloque>

      <Bloque titulo="Vocabulario de animación" nivel={3} entradilla="Así se llaman las piezas de una animación de personaje en Three.js.">
        <Vocabulario
          filas={[
            ["Malla con esqueleto", <><C>SkinnedMesh</C> · <C>Bone</C></>, "Personajes y criaturas. Sale así de Mixamo o de Blender."],
            ["Una animación", <C key="c">AnimationClip</C>, "Idle, Walking, Running, Jump: cada una, un clip con nombre."],
            ["Quien las reproduce", <><C>AnimationMixer</C> · <C>clipAction(clip)</C></>, "Uno por personaje; se actualiza en cada fotograma."],
            ["Pasar de una a otra", <C key="c">crossFadeTo(otra, 0.3)</C>, "Fundir medio segundo en vez de cortar en seco."],
            ["Una sola vez", <C key="c">setLoop(LoopOnce)</C>, "Saltar, golpear, morir: acciones que no se repiten."],
          ]}
        />
      </Bloque>

      {/* ══════════ 6 · Físicas ══════════ */}
      <Bloque
        id="fisicas"
        etiqueta="6 · Físicas"
        titulo="Tres tipos de cuerpo rígido"
        entradilla="El motor de físicas mueve las cosas por ti, pero tienes que decirle de qué tipo es cada una."
      >
        <Visor3D escena="cuerpos" />
      </Bloque>

      <Bloque
        titulo="El collider no es la malla"
        nivel={3}
        entradilla="La física no choca con lo que ves, sino con una forma sencilla que tú eliges. En verde, esa forma."
      >
        <Visor3D escena="colliders" />
      </Bloque>

      <Bloque
        titulo="La cápsula del personaje"
        nivel={3}
        entradilla="El caso más habitual: una malla animada con miles de triángulos que choca como una simple cápsula."
      >
        <Visor3D escena="capsula" />
      </Bloque>

      <Bloque
        titulo="Rebote y rozamiento"
        nivel={3}
        entradilla="Dos números por collider deciden cómo se siente al chocar: hielo, goma, barro o una pelota."
      >
        <Visor3D escena="rebote" />
      </Bloque>

      <Bloque
        titulo="Sensores y rayos"
        nivel={3}
        entradilla="No todo es chocar. Con estas dos herramientas se programa casi toda la lógica de un juego."
      >
        <Visor3D escena="sensor" />
      </Bloque>

      <Bloque titulo="Vocabulario de físicas" nivel={3} entradilla="Los nombres son los de Rapier, el motor de físicas del proyecto.">
        <Vocabulario
          filas={[
            ["Suelo, paredes", <C key="c">RigidBodyDesc.fixed()</C>, "Lo que nunca se mueve."],
            ["Cajas, pelotas", <C key="c">RigidBodyDesc.dynamic()</C>, "Lo que mueven la gravedad y los golpes."],
            ["Plataformas, personaje", <C key="c">RigidBodyDesc.kinematicPositionBased()</C>, "Lo que mueves tú desde el código."],
            ["La forma que choca", <><C>ColliderDesc.cuboid</C> · <C>ball</C> · <C>capsule</C> · <C>convexHull</C> · <C>trimesh</C></>, "De más barata a más cara."],
            ["Zona que avisa", <C key="c">setSensor(true)</C>, "Metas, monedas, zonas de daño, puertas."],
            ["Mirar qué hay delante", <C key="c">world.castRay(rayo, distancia, true)</C>, "¿Piso suelo? ¿Hay pared? ¿A qué apunto?"],
          ]}
        />
      </Bloque>

      {/* ══════════ 7 · Red ══════════ */}
      <Bloque
        id="red"
        etiqueta="7 · Red"
        titulo="Lo que viaja por la red"
        entradilla="En un juego multijugador cada jugador ve su propia copia del mundo. Por la red viajan solo unos pocos números."
      >
        <Visor3D escena="red" />
      </Bloque>

      <Aviso titulo="Por qué no se envía todo" tono="azul">
        <p>
          Enviar la posición en cada fotograma serían 60 mensajes por segundo y por jugador. Con 8 jugadores, cada uno
          recibiría 420 por segundo. Con <b>10 o 15 por segundo</b> y dibujando entre medias, se ve igual de bien y la red
          aguanta a toda la clase jugando a la vez.
        </p>
      </Aviso>

      <Bloque titulo="Créditos de esta página" nivel={3}>
        <p className={`text-lg ${cls.texto}`}>
          El robot es <b>RobotExpressive</b>, de Tomás Laulhé (Quaternius), con modificaciones de Don McCurdy, publicado
          con licencia <b>CC0</b>. Las texturas se generan en el momento, sin descargar imágenes. Las escenas usan{" "}
          <Link href="https://threejs.org/" className={cls.enlace}>
            Three.js
          </Link>{" "}
          y{" "}
          <Link href="https://rapier.rs/" className={cls.enlace}>
            Rapier
          </Link>
          . En tu juego tendrás que llevar una lista igual: de dónde sale cada cosa y con qué licencia.
        </p>
      </Bloque>

      <nav className="mt-16 flex max-w-[1100px] flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:flex-wrap sm:justify-between dark:border-white/10">
        {[
          ["/programacion-ia/", "← Curso de Programación con IA"],
          ["/programacion-ia/opencode/", "Guía de OpenCode"],
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
