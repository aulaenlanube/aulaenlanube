import type { Metadata } from "next";
import PromptBlock from "@/components/PromptBlock";
import { AnatomiaPrompt, CadenaDePrompts, CicloMetaprompt } from "../_svg/metodo";
import { vecinos } from "../_datos";
import {
  Cierre,
  Contraste,
  Dentro,
  FichaPrompt,
  Fuera,
  H2,
  Lista,
  Migas,
  NavPie,
  Nota,
  P,
  Pasos,
  Portadilla,
  Rejilla,
  Tarjeta,
} from "../_ui/piezas";

export const metadata: Metadata = {
  title: "Bloque 1 · Prompts que rinden — IA para opositores de Tecnología — Aula en la Nube",
  description:
    "Los seis bloques de un prompt profesional (rol, contexto, tarea, reglas, formato y control), el metaprompt para que la IA escriba el encargo por ti, y las cadenas de prompts con las que se construye una aplicación completa. Con diagramas interactivos y prompts copiables.",
};

const { atras, adelante } = vecinos(1);

export default function Bloque1() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <Migas bloque={{ titulo: "Bloque 1", ruta: "/ponencia-tecnologia/01-introduccion/" }} />
      <Portadilla
        n={1}
        tono="azul"
        minutos={20}
        titulo="Prompts que rinden"
        entradilla={
          <>
            Todo lo que viene después depende de este bloque. La diferencia entre quien saca cosas
            mediocres de la IA y quien saca material de tribunal no está en la herramienta ni en el
            modelo: está en <b>cómo se escribe el encargo</b>. Veinte minutos para aprender la
            plantilla, el truco que la duplica y el orden en que se encadenan las peticiones.
          </>
        }
      />

      {/* ═══ 1. El problema ═══════════════════════════════════════════════ */}
      <H2 ante="El punto de partida" tono="azul">
        Por qué la IA te contesta flojo
      </H2>
      <P>
        Cuando alguien dice «lo probé y no me sirvió», casi siempre había escrito algo como{" "}
        <i>«hazme un tema sobre estructuras»</i>. Un modelo no tiene forma de saber si eres opositor
        o alumno de 2.º de ESO, si escribes a mano en un examen o preparas una diapositiva, ni si
        necesitas dos folios o veinte. Ante la duda, responde <b>para el promedio</b>: correcto,
        genérico y sin una sola cifra útil.
      </P>
      <P>
        La buena noticia es que esto se arregla con texto, no con dinero. Un prompt bien construido
        cambia el resultado más que cambiar de modelo o pagar una suscripción.
      </P>

      <Contraste
        bien={{
          titulo: "Lo que devuelve un encargo dirigido",
          items: [
            "Cifras con sus unidades y normativa con número y año.",
            "La estructura que le has pedido, sin introducción de relleno.",
            "Los puntos dudosos marcados para que tú los compruebes.",
            "Tres preguntas incómodas al final, para ver si lo has entendido.",
          ],
        }}
        mal={{
          titulo: "Lo que devuelve «hazme un tema sobre…»",
          items: [
            "Tres párrafos de introducción que no dicen nada.",
            "Afirmaciones sin cifras: «es muy importante», «resulta fundamental».",
            "Normativa citada con seguridad absoluta y a veces inventada.",
            "Una extensión al azar que no te sirve ni para el examen ni para clase.",
          ],
        }}
      />

      {/* ═══ 2. La anatomía ═══════════════════════════════════════════════ */}
      <H2 ante="La plantilla" tono="azul">
        Los seis bloques de un prompt profesional
      </H2>
      <P>
        Esta es la plantilla que se usa durante toda la sesión y que sirve exactamente igual para
        redactar un tema, para montar una programación de aula o para encargarle una aplicación a un
        agente. Los cuatro primeros bloques los escribe casi todo el mundo; los dos últimos son los
        que separan un texto de estudiante de un texto de opositor.
      </P>

      <AnatomiaPrompt />

      <P>
        Aquí la tienes montada entera. Cambia solo lo que va entre corchetes: el resto es tu firma y
        no se toca.
      </P>

      <FichaPrompt
        tono="azul"
        etiqueta="Prompt 1 · la plantilla"
        titulo="Tu prompt de partida, para cualquier encargo serio"
      >
        <PromptBlock
          text={`# Rol
Eres [ESPECIALISTA CONCRETO: p. ej. "catedrático de Tecnología de Secundaria con 25 años en tribunales de oposición"].

# Contexto
Oposición al cuerpo de profesores de Secundaria, especialidad Tecnología, Comunitat Valenciana.
Temario de 71 temas. Lo que me des tiene que poder defenderse delante de un tribunal técnico.
Destino del texto: [A MANO EN EL EXAMEN / PRESENTACIÓN / MATERIAL DE AULA].

# Tarea
[UN SOLO ENCARGO, EN IMPERATIVO Y CON UN ENTREGABLE CLARO.]

# Reglas
1) Nunca inventes normativa: si no estás seguro de una norma, un número o una fecha, escribe [COMPROBAR].
2) Cada afirmación técnica, con su cifra y su unidad.
3) Cero introducciones floridas y cero conclusiones de relleno.
4) Si el encargo es demasiado grande para una respuesta, dime en cuántos pasos me lo das y no empieces.

# Formato
[EXTENSIÓN + ESTRUCTURA: p. ej. "máximo dos folios, apartados numerados, idea principal en negrita".]

# Control
Termina con tres preguntas incómodas que me haría un vocal sobre lo que acabas de escribir.
No me des las respuestas.`}
        />
      </FichaPrompt>

      <Nota tono="verde" titulo="El bloque que casi nadie escribe">
        <b>#&nbsp;Control</b> convierte cada respuesta en un examen sobre esa respuesta. Si no sabes
        contestar las tres preguntas, ese texto todavía no lo has estudiado: lo has recibido. Es el
        hábito más barato de adquirir y el que más diferencia marca en la defensa oral.
      </Nota>

      {/* ═══ 3. El metaprompt ═════════════════════════════════════════════ */}
      <H2 ante="El multiplicador" tono="morado">
        El metaprompt: pídele el encargo, no la respuesta
      </H2>
      <P>
        Escribir seis bloques cada vez cansa. Y hay algo mejor: <b>el modelo conoce sus propios
        puntos ciegos mejor que tú</b>. Así que en lugar de pedirle la solución, le pides que escriba
        el prompt perfecto para conseguirla. Te devuelve un encargo con restricciones que a ti no se
        te habrían ocurrido, y tú le añades lo que la máquina no puede saber: tu curso, tu grupo, tu
        tiempo y tu tribunal.
      </P>

      <CicloMetaprompt />

      <FichaPrompt
        tono="morado"
        etiqueta="Prompt 2 · el metaprompt"
        titulo="La frase que más rendimiento da de toda la sesión"
      >
        <p className="mb-2">
          Cuéntale en bruto lo que necesitas, como se lo contarías a un compañero en el pasillo, y
          cierra con esto:
        </p>
        <PromptBlock
          text={`No me des todavía la respuesta.

Escribe el PROMPT ideal para conseguir lo que te acabo de contar. Inclúyelo todo:
- Rol: qué especialista debería responder.
- Contexto: etapa, curso, comunidad autónoma, normativa aplicable y destino del texto.
- Tarea: un solo encargo, en imperativo.
- Reglas: qué NO puede hacer (inventar normativa, rellenar, dar cifras sin unidades…).
- Formato: extensión y estructura exactas.
- Control: cómo comprobaré yo que la respuesta sirve.

Antes de escribirlo, hazme las preguntas que te falten por saber. Hazlas todas de una vez.`}
        />
      </FichaPrompt>

      <Nota tono="ambar" titulo="Dónde entra tu criterio">
        El prompt que te devuelve es un <b>borrador bueno</b>, no un original. Lo que tú le corriges
        —el nivel real de tu grupo, los 50 minutos de clase, la normativa que te obliga, las manías
        del tribunal— es exactamente lo que aportas como docente. Eso no se delega, y es lo que un
        tribunal sí sabe distinguir.
      </Nota>

      <Rejilla cols={3}>
        <Tarjeta tono="morado" titulo="Úsalo cuando…">
          El encargo es importante y lo vas a repetir: un tema, una unidad didáctica, una rúbrica,
          una aplicación. Compensa gastar dos minutos en el prompt.
        </Tarjeta>
        <Tarjeta tono="gris" titulo="No lo uses cuando…">
          La pregunta es de una línea y la respuesta también. Para «¿cómo se dice <i>tornillo
          prisionero</i> en inglés técnico?» no hace falta ceremonia.
        </Tarjeta>
        <Tarjeta tono="verde" titulo="Guarda lo que funcione">
          Cuando un prompt te dé un resultado redondo, guárdalo en un documento. En dos meses tendrás
          tu propio repertorio y no volverás a empezar de cero.
        </Tarjeta>
      </Rejilla>

      {/* ═══ 4. Las cadenas ═══════════════════════════════════════════════ */}
      <H2 ante="La escala" tono="verde">
        Las cadenas de prompts: cuando un encargo no cabe en uno solo
      </H2>
      <P>
        Una aplicación, una unidad didáctica completa o una programación de curso no salen de un
        prompt: salen de una <b>conversación con un orden</b>. Y el orden importa, porque cada paso
        se construye sobre el anterior. Este es el que funciona.
      </P>

      <CadenaDePrompts />

      <Nota tono="verde" titulo="Esto no es teoría: está publicado entero">
        En{" "}
        <Fuera href="https://aulaenlanube.com/cadenas-de-prompts/">
          aulaenlanube.com/cadenas-de-prompts
        </Fuera>{" "}
        tienes cuatro aplicaciones educativas con <b>la conversación completa que las creó</b>, prompt
        a prompt y en orden: el simulador del sistema solar en 3D (31 prompts), la mesa de crafteo de
        física (24), la célula animal (18) y un <i>tower defense</i> educativo (22). Ábrelas y lee la
        cadena: se ve exactamente dónde se pide la lógica, dónde la pedagogía y dónde la estética.
      </Nota>

      <H2 ante="El error caro" tono="rosa">
        Los cuatro fallos que se repiten siempre
      </H2>
      <Lista
        tono="rosa"
        items={[
          <>
            <b>Pedir dos cosas a la vez.</b> «Redáctame el tema y hazme las diapositivas» devuelve
            dos cosas mediocres. Son dos prompts.
          </>,
          <>
            <b>Discutir con la respuesta en vez de arreglar el prompt.</b> Si lo que sale no es lo
            que querías, el fallo está arriba. Vuelve al encargo, no al resultado.
          </>,
          <>
            <b>Seguir en la misma conversación cuando ya se ha torcido.</b> Los modelos arrastran
            todo lo hablado. Cuando una conversación se enreda, se abre otra limpia y se pega el
            prompt corregido.
          </>,
          <>
            <b>Pedir la estética antes que la lógica.</b> Maquillar algo que todavía no funciona es
            tiempo tirado: cada arreglo posterior te rompe el diseño.
          </>,
        ]}
      />

      {/* ═══ 5. Práctica ══════════════════════════════════════════════════ */}
      <H2 ante="Para practicar" tono="azul">
        Tres ejercicios para esta semana
      </H2>
      <Pasos
        tono="azul"
        items={[
          <>
            <b>Hoy:</b> coge el prompt de la plantilla y pídele el esqueleto de un tema que ya
            domines. Como lo dominas, verás enseguida qué acierta y qué se inventa. Ese contraste es
            la mejor forma de calibrar la herramienta.
          </>,
          <>
            <b>Mañana:</b> el mismo encargo, pero por metaprompt. Compara los dos prompts: ¿qué
            restricciones añadió que tú no habías escrito?
          </>,
          <>
            <b>Esta semana:</b> pásale el prompt de la plantilla a un compañero de preparación y
            pedid los dos el mismo tema. Los resultados no serán iguales. Comentar por qué es la
            forma más rápida de aprender a dirigirla.
          </>,
        ]}
      />

      <Cierre tono="azul">
        <b>Lo que te llevas de este bloque:</b> seis bloques de prompt, un ciclo de metaprompt y un
        orden para las cadenas. Con eso solo, todo lo que viene después —Copilot, los temas, las
        láminas y las aplicaciones— rinde el doble. Sin eso, ninguna herramienta te va a salvar.
      </Cierre>


      <P>
        ¿Te has quedado con ganas de más prompts ya montados? Los tienes por uso en{" "}
        <Dentro href="/programacion-ia/">el curso de programación con IA</Dentro>.
      </P>

      <NavPie atras={atras} adelante={adelante} />
    </div>
  );
}
