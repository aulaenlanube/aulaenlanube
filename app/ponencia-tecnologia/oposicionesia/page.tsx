import type { Metadata } from "next";
import { MapaPlataforma } from "../_svg/plataforma";
import { vecinos } from "../_datos";
import {
  Cierre,
  Dato,
  Dentro,
  Fuera,
  H2,
  Lista,
  Migas,
  NavPie,
  Nota,
  P,
  Portadilla,
  Rejilla,
  Tarjeta,
} from "../_ui/piezas";

export const metadata: Metadata = {
  title: "Bloque 6 · OposicionesIA: dónde seguir — IA para opositores de Tecnología — Aula en la Nube",
  description:
    "Qué es OposicionesIA y qué herramientas tiene: temario en cuatro niveles, banco de supuestos con solución, corrección de exámenes escritos a mano, constructor de programación didáctica, normativa curricular y agente de estudio. Con lo que hay construido para Tecnología de Secundaria en la Comunitat Valenciana.",
};

const { atras, adelante } = vecinos(6);

const CATEGORIAS = [
  "Electrotecnia en corriente continua",
  "Electrotecnia en alterna y trifásica",
  "Electrónica analógica",
  "Electrónica digital",
  "Mecanismos y transmisión de movimiento",
  "Estructuras y resistencia de materiales",
  "Neumática e hidráulica",
  "Máquinas térmicas y termodinámica",
  "Materiales y ensayos",
  "Dibujo técnico y representación",
  "Control, automatismos y robótica",
  "Proyecto y explotación didáctica",
];

export default function Bloque6() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <Migas bloque={{ titulo: "Bloque 6", ruta: "/ponencia-tecnologia/oposicionesia/" }} />
      <Portadilla
        n={6}
        tono="gris"
        minutos={10}
        titulo="OposicionesIA: dónde seguir"
        entradilla={
          <>
            Los cinco bloques anteriores te enseñan a <b>dirigir</b> la herramienta. Este es el sitio
            donde el contenido <b>ya está hecho</b>: los 71 temas escritos, los supuestos resueltos y
            la programación con las reglas de tu convocatoria puestas. Diez minutos para ver qué hay
            dentro, qué sirve para cada momento y —con toda honestidad— qué puedes usar hoy y qué no.
          </>
        }
      />

      {/* ═══ 1. Qué es ════════════════════════════════════════════════════ */}
      <H2 ante="Qué es" tono="gris">
        No es un chat genérico
      </H2>
      <P>
        <Fuera href="https://oposicionesia.com">OposicionesIA</Fuera> es una plataforma de estudio
        para opositores docentes que combina dos cosas que normalmente van por separado:{" "}
        <b>un banco de contenido escrito y revisado a mano</b> —temas, supuestos, tests, normativa,
        vídeos— y <b>herramientas de IA</b> que corrigen, planifican y personalizan ese contenido
        según tu especialidad, tu comunidad y tu convocatoria.
      </P>
      <P>
        Esa distinción importa, y enlaza directamente con el{" "}
        <Dentro href="/ponencia-tecnologia/temario-con-ia/">bloque 3</Dentro>: los temas{" "}
        <b>no se generan cuando los pides</b>. Están redactados de antemano. La IA entra después —para
        corregirte, para interrogarte, para adaptar el tono— que es exactamente el reparto de papeles
        que hemos defendido toda la sesión.
      </P>

      {/* ═══ 2. El aviso honesto ══════════════════════════════════════════ */}
      <Nota tono="ambar" titulo="Lo primero, para no vender humo">
        <p>
          A día de hoy, <b>la especialidad de Tecnología todavía no se puede contratar</b>. En
          Secundaria, la única especialidad abierta a la venta es Informática, en las diecisiete
          comunidades. Las demás se van abriendo por orden de demanda y{" "}
          <b>Tecnología está en lista de espera</b>.
        </p>
        <p className="mt-2">
          Lo cuento porque es la verdad y porque la alternativa —enseñaros algo que luego no podéis
          usar— sería justo lo contrario de lo que predica esta sesión. Dicho eso: el material de
          Tecnología <b>ya está construido</b>, y lo que viene a continuación son las cifras reales de
          lo que hay hecho. Quien se apunta a la lista de espera es quien decide el orden de apertura.
        </p>
      </Nota>

      {/* ═══ 3. El mapa ═══════════════════════════════════════════════════ */}
      <H2 ante="El mapa" tono="azul">
        Doce herramientas, cuatro momentos
      </H2>
      <P>
        La forma útil de mirar la plataforma no es por menús, sino por el momento de la preparación
        en el que estás: estudiar, practicar, entregar y dirigirte. Pulsa cualquier ficha para ver qué
        hace.
      </P>

      <MapaPlataforma />

      {/* ═══ 4. Lo construido ═════════════════════════════════════════════ */}
      <H2 ante="Las cifras" tono="verde">
        Lo que hay hecho para Tecnología
      </H2>
      <P>
        Estas cifras son del banco de Tecnología, clonado ya a las diecisiete comunidades, con la
        Comunitat Valenciana como referencia curricular:
      </P>
      <Rejilla cols={3}>
        <Dato tono="azul" cifra="71">
          temas completos, cada uno en <b>cuatro niveles</b> —esencial, resumen, completo y tema de
          examen— y en <b>cuatro idiomas</b>: castellano, valenciano, gallego y euskera.
        </Dato>
        <Dato tono="verde" cifra="180">
          supuestos prácticos <b>con su solución</b>, repartidos a quince por cada uno de los doce
          bloques de la parte práctica.
        </Dato>
        <Dato tono="morado" cifra="1.223">
          preguntas tipo test organizadas por esos mismos doce bloques.
        </Dato>
        <Dato tono="rosa" cifra="2.142">
          tarjetas de repaso espaciado, entre veintitrés y treinta y cinco por tema.
        </Dato>
        <Dato tono="ambar" cifra="8.500">
          palabras de media tiene el tema completo; el tema de examen ronda las 3.800, que es lo que
          da tiempo a escribir a mano en dos horas.
        </Dato>
        <Dato tono="gris" cifra="8">
          materias de la Comunitat Valenciana con su currículo cargado literalmente del decreto: seis
          de ESO y dos de Bachillerato.
        </Dato>
      </Rejilla>

      <H2 ante="El detalle que convence" tono="verde">
        Los doce bloques de la parte práctica
      </H2>
      <P>
        Esto es lo que más dice de si un material está hecho para tu especialidad o es genérico: los
        supuestos no están repartidos «por temas», sino por los bloques por los que realmente cae la
        parte práctica de Tecnología.
      </P>
      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIAS.map((c, i) => (
          <div
            key={c}
            className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-[14px] text-zinc-700 shadow-sm"
          >
            <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-600 text-[11px] font-extrabold text-white">
              {i + 1}
            </span>
            <span>{c}</span>
          </div>
        ))}
      </div>
      <P>
        Quince supuestos resueltos en cada uno. Y fíjate en el último: <b>proyecto y explotación
        didáctica</b>, que es el que convierte un ejercicio técnico en una situación de aula — justo
        lo que separa un buen práctico de uno que solo resuelve números.
      </P>

      <Nota tono="verde" titulo="Dos cosas ancladas a la convocatoria valenciana">
        <ul className="mt-1 space-y-2">
          <li>
            • <b>La corrección de supuestos y exámenes</b> no puntúa con un criterio inventado: usa
            los criterios publicados del tribunal de Tecnología de la Comunitat Valenciana.
          </li>
          <li>
            • <b>El constructor de programación</b> trae puestas las reglas de formato del Anexo II de
            la Orden 1/2025 (DOGV 10036): número de unidades, extensión máxima, tipografía e
            interlineado. Son los puntos que se pierden tontamente.
          </li>
        </ul>
      </Nota>

      {/* ═══ 5. Cómo encaja ═══════════════════════════════════════════════ */}
      <H2 ante="Cómo encaja" tono="morado">
        Qué pone la sesión y qué pone la plataforma
      </H2>
      <P>
        No sustituye a nada de lo que has visto hoy: lo acelera. Lo que has aprendido a hacer a mano,
        aquí ya está hecho — y sigue haciendo falta que sepas dirigirlo.
      </P>
      <Rejilla>
        <Tarjeta tono="azul" titulo="Lo que te llevas de esta sesión">
          El método: escribir un prompt que rinda, pedirle el encargo antes que la respuesta,
          verificar siempre, y saber encargarle a un agente algo que funcione. <b>Eso es tuyo y vale
          para cualquier herramienta</b>, esta y las que vengan.
        </Tarjeta>
        <Tarjeta tono="verde" titulo="Lo que pone la plataforma">
          El contenido y el tiempo: los temas ya escritos, los supuestos ya resueltos, la normativa
          ya ordenada y con su enlace, y una corrección anclada a los criterios de tu tribunal.{" "}
          <b>Lo que no tienes que construir tú</b>.
        </Tarjeta>
      </Rejilla>
      <Lista
        tono="morado"
        items={[
          <>
            La <b>ruta del tema</b> del bloque 3 se recorre igual, pero las estaciones 1 y 6 —el
            esqueleto y el repaso— ya vienen hechas, y la 4 —la verificación— tiene la normativa
            enlazada a su fuente en vez de a un chat.
          </>,
          <>
            El <b>simulador de tribunal</b> que montas a mano en el bloque 3 aquí es el módulo de
            exámenes: escribes a mano, fotografías y te corrige con rúbrica.
          </>,
          <>
            Lo del bloque 2 sobre <b>adjuntar tus fuentes y preguntar solo sobre ellas</b> es lo que
            hace el chat de la plataforma de serie, con la documentación oficial de tu comunidad ya
            cargada.
          </>,
          <>
            Y lo del bloque 5 no lo cubre nadie por ti: <b>la aplicación de tu parte práctica la
            haces tú</b>, con lo que has aprendido hoy.
          </>,
        ]}
      />

      {/* ═══ 6. Qué puedes hacer hoy ══════════════════════════════════════ */}
      <H2 ante="Hoy mismo" tono="gris">
        Qué puedes ver ahora, sin cuenta y sin pagar
      </H2>
      <Rejilla>
        <Tarjeta tono="azul" titulo="Los temas de muestra">
          En{" "}
          <Fuera href="https://oposicionesia.com/ejemplos/temas">
            oposicionesia.com/ejemplos/temas
          </Fuera>{" "}
          están abiertos el <b>tema 1 y el tema 2 de Tecnología</b>, completos y sin registro. Es la
          forma honesta de juzgar el nivel: míralos y decide tú si están a la altura de lo que
          entregarías.
        </Tarjeta>
        <Tarjeta tono="ambar" titulo="La lista de espera">
          En{" "}
          <Fuera href="https://oposicionesia.com/secundaria">oposicionesia.com/secundaria</Fuera>{" "}
          eliges Tecnología y tu comunidad, ves los planes con su precio y dejas tu correo. Las
          especialidades se abren <b>por orden de demanda</b>, así que apuntarse es literalmente votar.
          Sin permanencia cuando se abra.
        </Tarjeta>
      </Rejilla>
      <P>
        Y si conoces a alguien que prepara <b>Informática</b> de Secundaria o cualquier especialidad
        de <b>Maestros</b>, esas sí están abiertas hoy.
      </P>

      <Cierre tono="gris">
        <b>El cierre de las dos horas:</b> hoy no te llevas una suscripción ni una herramienta
        concreta — las herramientas cambian cada seis meses. Te llevas <b>un método para dirigirlas</b>{" "}
        y la costumbre de comprobar lo que te devuelven. Eso es lo que sigue valiendo dentro de dos
        años, y lo que un tribunal nota en cuanto abres la boca.
      </Cierre>

      <NavPie atras={atras} adelante={adelante} />
    </div>
  );
}
