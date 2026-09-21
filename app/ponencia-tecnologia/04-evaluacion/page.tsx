import type { Metadata } from "next";
import PrintButton from "@/components/PrintButton";
import { PreguntaDelVocal } from "../_svg/proceso";
import { vecinos } from "../_datos";
import {
  Cierre,
  Dentro,
  Grabacion,
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
  title: "Bloque 6 · Delante del tribunal — Del prompt a la plaza — Aula en la Nube",
  description:
    "Cómo se defiende una práctica hecha con un agente de código ante un tribunal de oposición, la regla «si te cambian una línea, respondes», el marco normativo verificado de la especialidad de Tecnología en la Comunitat Valenciana y la lista de control imprimible del día del examen.",
};

const { atras, adelante } = vecinos(6);

export default function Bloque6() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <Migas bloque={{ titulo: "Bloque 6", ruta: "/ponencia-tecnologia/04-evaluacion/" }} />
      <Portadilla
        n={6}
        tono="gris"
        minutos={10}
        titulo="Delante del tribunal"
        entradilla={
          <>
            Diez minutos para lo que decide todo lo anterior. Un tribunal no detecta si usaste IA:{" "}
            <b>detecta si entiendes lo que traes</b>. Este bloque es cómo se responde a la pregunta
            que rompe las defensas, el marco normativo con el que no se improvisa, y la lista que te
            llevas impresa.
          </>
        }
      />

      {/* ═══ 1. La pregunta ═══════════════════════════════════════════════ */}
      <H2 ante="El momento" tono="gris">
        «Y si aquí cambiamos esto, ¿qué pasa?»
      </H2>
      <P>
        Llega siempre, y no es una trampa: es la forma más rápida que tiene un vocal de saber si
        dominas lo que has traído. Las dos respuestas honestas son defendibles. Lo que no se puede
        defender es <b>no saber cuál de las dos es la tuya</b>. Pulsa cada rama.
      </P>

      <PreguntaDelVocal />

      <Nota tono="verde" titulo="Dilo sin rodeos: usar un agente no resta">
        En cualquier empresa de software se trabaja así, y en tu futura aula también. Decir{" "}
        <i>«he usado un agente de código como herramienta y he verificado el resultado»</i> es una
        respuesta profesional. Lo que resta es esconderlo y que se note, o traer doscientas líneas de
        las que dominas sesenta. Enseñar la conversación con el agente como evidencia de tu método
        suma; disimularla, no.
      </Nota>

      <H2 ante="La prueba" tono="azul">
        El mini-test de diez minutos, en casa
      </H2>
      <P>
        Hazlo la semana antes, con tu práctica delante. Si alguna respuesta es «no», tienes dos
        opciones: estudiar ese bloque hasta poder explicarlo, o <b>quitarlo</b>. Las dos son válidas;
        llevarlo a ciegas, no.
      </P>
      <Pasos
        tono="azul"
        items={[
          <>
            <b>Tapa la solución con un folio.</b> ¿Puedes contar qué hace el programa, de principio a
            fin, sin mirarlo?
          </>,
          <>
            <b>Destápala.</b> ¿Puedes explicar cada bloque de cinco o diez líneas en una frase, con
            tus palabras?
          </>,
          <>
            <b>Cambia mentalmente un dato de entrada.</b> ¿Sabes qué va a salir? ¿Y si lo pones
            negativo, o cero, o absurdamente grande?
          </>,
          <>
            <b>Cuenta un fallo que detectaste tú</b> y cómo lo corregiste. Si no tienes ninguno, es
            que no verificaste lo suficiente: vuelve al{" "}
            <Dentro href="/ponencia-tecnologia/03-laboratorio/">bloque 5</Dentro>.
          </>,
          <>
            <b>Enséñasela a alguien</b> y pídele que cambie una línea delante de ti. Es el ensayo más
            parecido a lo que va a pasar.
          </>,
        ]}
      />

      <H2 ante="Los frenos" tono="rosa">
        Lo que no conviene llevar
      </H2>
      <Lista
        tono="rosa"
        items={[
          <>
            <b>Tecnología de moda que no domines.</b> Si el agente te trae un armatoste con tres
            dependencias, pídelo otra vez en un solo fichero y sin librerías. Menos superficie, menos
            preguntas que no sabes responder.
          </>,
          <>
            <b>Datos inventados en una gráfica.</b> Un vocal de Tecnología reconoce un conjunto de
            datos falso a simple vista. Si necesitas datos, usa reales y di de dónde salen.
          </>,
          <>
            <b>Normativa que solo has leído en un chat.</b> Cada norma que cites, comprobada en su
            boletín, con su número y su fecha. Es la regla del{" "}
            <Dentro href="/ponencia-tecnologia/temario-con-ia/">bloque 3</Dentro> y aquí es donde se
            cobra.
          </>,
          <>
            <b>Una aplicación de ejemplo sin tocar.</b> Las dos de esta ponencia son ejemplos de
            método, no material para presentar. Cámbiale el contenido, el curso y el nombre, o no la
            lleves.
          </>,
          <>
            <b>Dependencias de internet.</b> Todo lo que necesite red puede fallar el día del
            examen. Lleva también una versión que funcione sin conexión y las capturas impresas.
          </>,
        ]}
      />

      {/* ═══ 2. El marco normativo ════════════════════════════════════════ */}
      <H2 ante="El terreno" tono="verde">
        Tu marco normativo, comprobado
      </H2>
      <P>
        Esto es lo contrario de lo que hace un chat: cada referencia con su número, su fecha y su
        boletín. Cópialo, pero <b>vuelve a comprobarlo tú</b> el año en que te presentes: parte de
        esto cambia de convocatoria en convocatoria, y lo que aquí figura está verificado a fecha de
        la sesión, no para siempre.
      </P>

      <Rejilla>
        <Tarjeta tono="verde" titulo="Temario · 71 temas">
          <b>Orden de 9 de septiembre de 1993</b> (BOE núm. 226, de 21 de septiembre de 1993),
          anexo III. Sigue vigente por el <b>artículo 2.a) de la Orden ECD/191/2012</b>, de 6 de
          febrero. Son exactamente <b>71 temas</b>. No existe un temario nuevo para «Tecnología y
          Digitalización».
        </Tarjeta>
        <Tarjeta tono="azul" titulo="La especialidad">
          El código de la especialidad en el cuerpo de Secundaria es el <b>219, Tecnología</b>. El{" "}
          <b>RD 286/2023</b>, de 18 de abril, atribuye a esa especialidad las materias{" "}
          <i>Tecnología</i>, <i>Digitalización</i> y <i>Tecnología y Digitalización</i> —Informática
          tiene preferencia en <i>Digitalización</i>—. <b>No existe una especialidad «Tecnología y
          Digitalización»</b>: es un error frecuente.
        </Tarjeta>
        <Tarjeta tono="morado" titulo="El proceso selectivo">
          <b>RD 276/2007</b>, cuya última modificación con efecto sobre el ingreso en los cuerpos
          docentes es el <b>RD 800/2022</b>, de 4 de octubre. La modificación de 2026 afecta solo al
          acceso a Inspección. Ponderación final: <b>dos tercios oposición y un tercio concurso</b>{" "}
          (art. 25.2).
        </Tarjeta>
        <Tarjeta tono="ambar" titulo="La primera prueba">
          Con más de 50 temas, el tema se elige <b>entre cuatro</b> extraídos al azar. En la
          convocatoria valenciana vigente la denominación va al revés que en el RD: <b>parte A</b> es
          el desarrollo escrito del tema (2 horas) y <b>parte B</b>, la prueba práctica. Cada parte
          vale <b>5 de los 10 puntos</b>, y no presentarse a la primera impide hacer la segunda.
        </Tarjeta>
        <Tarjeta tono="rosa" titulo="Los criterios del tema">
          Anexo VI de la convocatoria: <b>estructura 10 %</b>, <b>expresión y presentación 10 %</b>{" "}
          —lenguaje inclusivo incluido— y <b>conocimiento científico e innovación didáctica 80 %</b>.
          Los criterios de la prueba práctica los publican las comisiones antes del inicio del
          proceso: búscalos en cuanto salgan.
        </Tarjeta>
        <Tarjeta tono="gris" titulo="La segunda prueba">
          <b>Programación</b> de aula más una <b>situación de aprendizaje</b>, elegida entre tres
          extraídas al azar, con exposición y defensa orales. El número mínimo de situaciones
          desarrolladas y el formato exacto los fija <b>cada convocatoria</b>: es el dato que más
          cambia, así que léelo en la tuya y no en apuntes de otro año.
        </Tarjeta>
      </Rejilla>

      <Nota tono="ambar" titulo="Tres avisos que te ahorran un disgusto">
        <ul className="mt-1 space-y-2">
          <li>
            • <b>Valenciano:</b> se exige el <b>C1 de la JQCV</b> o equivalente —también valen el C2,
            el Certificat de Capacitació y el Diploma de Mestre de Valencià—. La exención del
            artículo 17 de la Ley 1/2024 alcanza solo a especialidades de FP: <b>Tecnología no está
            exenta</b>. Y ojo: el título que alegas como requisito ya no puntúa después como mérito.
          </li>
          <li>
            • <b>Tecnología no figuraba en la convocatoria de Secundaria de 2025</b>, que ya se
            celebró y se cerró. En junio de 2026 se aprobó una oferta de empleo docente, pero{" "}
            <b>el desglose por especialidades no estaba publicado</b> a fecha de esta sesión.
            Compruébalo en el DOGV antes de dar nada por hecho.
          </li>
          <li>
            • <b>Sobre IA, no cites normativa autonómica que no existe.</b> A día de hoy no hay
            publicada una instrucción de la Conselleria específica sobre uso de IA generativa en
            centros. Lo que sí puedes citar, y suma: el <b>CEFIRE específico de Inteligencia
            Artificial y Pensamiento Computacional</b> creado en 2025, el plan de alfabetización en
            IA del profesorado, el catálogo <b>Appsedu</b> de aplicaciones autorizadas y, en el plano
            estatal, las guías del <b>INTEF</b>.
          </li>
        </ul>
      </Nota>

      {/* ═══ 3. La lista ══════════════════════════════════════════════════ */}
      <H2 ante="Para imprimir" tono="gris">
        Tu lista de control del día del examen
      </H2>
      <P>
        Doce líneas. Imprímela y repásala la noche antes: no está pensada para que aprendas nada
        nuevo, sino para que no se te olvide nada de lo que ya sabes.
      </P>

      <div className="mt-5 rounded-2xl border-2 border-zinc-300 bg-white p-6">
        <ul className="space-y-3">
          {[
            "Una herramienta principal probada y una alternativa por si falla la red o la licencia.",
            "El prompt de seis bloques en papel, listo para usarlo si hay ordenador.",
            "Tu aplicación publicada, con el enlace anotado y comprobado desde otro dispositivo.",
            "Una copia de la aplicación que funcione sin conexión, por si no hay internet.",
            "Capturas impresas: la aplicación funcionando y el código en el editor.",
            "Tres fallos que detectaste y corregiste tú, con su explicación de una frase cada uno.",
            "Cada norma que vas a citar, comprobada en su boletín con número y fecha.",
            "Cada cifra que vas a citar, con su fuente, su año y su ámbito.",
            "El mini-test de diez minutos hecho, con alguien cambiándote una línea delante.",
            "Nada en tu práctica que no sepas explicar en una frase. Lo demás, recortado.",
            "La respuesta preparada a «¿y esto lo ha hecho una IA?»: sí, como herramienta, y lo verifiqué así.",
            "La respuesta preparada a «¿cómo integrarías la IA en tu aula?»: con lo que has hecho, no con opiniones.",
          ].map((t) => (
            <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-zinc-800">
              <span
                className="mt-0.5 h-5 w-5 flex-none rounded border-2 border-zinc-400"
                aria-hidden="true"
              />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex justify-end">
        <PrintButton />
      </div>

      <Cierre tono="gris">
        <b>El cierre de las dos horas:</b> no vas al examen a demostrar que sabes escribir código ni
        a demostrar que sabes usar una IA. Vas a demostrar que <b>sabes dirigir una herramienta,
        comprobar lo que te devuelve y explicar por qué cada decisión está donde está</b>. Eso, hoy,
        es exactamente lo que significa saber hacer Tecnología. Y es justo lo que un tribunal no
        puede generar por ti.
      </Cierre>

      <Grabacion matiz="El resumen escrito de este bloque cabe en una cara: es el que conviene llevar impreso junto a la lista de control." />

      <NavPie atras={atras} adelante={adelante} />
    </div>
  );
}
