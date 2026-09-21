import type { Metadata } from "next";
import PromptBlock from "@/components/PromptBlock";
import { RutaDelTema } from "../_svg/proceso";
import { vecinos } from "../_datos";
import {
  Cierre,
  Contraste,
  Dato,
  Dentro,
  FichaPrompt,
  Grabacion,
  H2,
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
  title: "Bloque 3 · Los 71 temas con IA — Del prompt a la plaza — Aula en la Nube",
  description:
    "La ruta completa para preparar un tema del temario de Tecnología con IA: esqueleto previo, lectura crítica, redacción propia, verificación normativa y simulador de tribunal. Con los cinco prompts copiables y la trampa de la referencia inventada.",
};

const { atras, adelante } = vecinos(3);

export default function Bloque3() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <Migas bloque={{ titulo: "Bloque 3", ruta: "/ponencia-tecnologia/temario-con-ia/" }} />
      <Portadilla
        n={3}
        tono="verde"
        minutos={20}
        titulo="Los 71 temas con IA"
        entradilla={
          <>
            Aquí es donde la IA te devuelve horas de verdad. Pero con una condición que conviene
            dejar clara desde la primera línea: <b>la IA acelera cómo estudias, no sustituye el
            estudio</b>. Este bloque es la ruta completa de un tema, estación por estación, con los
            cinco prompts que la recorren y los dos tramos en los que no puedes delegar nada.
          </>
        }
      />

      {/* ═══ 1. El terreno ════════════════════════════════════════════════ */}
      <H2 ante="El terreno" tono="verde">
        Qué ha cambiado y qué no
      </H2>
      <P>
        Tu temario lo fija la <b>Orden de 9 de septiembre de 1993</b>, mantenida en vigor por la{" "}
        <b>Orden ECD/191/2012</b>: 71 temas de energía, materiales, estructuras, sistemas de control,
        instalaciones, electrónica, dibujo, TIC y didáctica. Eso no lo ha tocado nadie. El{" "}
        <b>RD 276/2007</b> es otra cosa: el reglamento del proceso selectivo, es decir, cómo es el
        examen. El marco completo y verificado lo tienes en el{" "}
        <Dentro href="/ponencia-tecnologia/04-evaluacion/">bloque 6</Dentro>.
      </P>

      <Contraste
        bien={{
          titulo: "Lo que sí ha cambiado, y juega a tu favor",
          items: [
            <>
              <b>La velocidad de la primera pasada.</b> Lo que era una tarde de poner orden en un
              tema nuevo son ahora diez minutos de esqueleto más tu lectura.
            </>,
            <>
              <b>Tienes tribunal a demanda.</b> Ensayar la defensa ya no depende de encontrar a
              alguien que te pregunte: puedes hacerlo cada noche.
            </>,
            <>
              <b>«¿Cómo integrarías la IA en tu aula?»</b> es hoy un supuesto perfectamente
              plausible. Saber responderlo con criterio te distingue.
            </>,
            <>
              <b>Un agente de código</b> te da un laboratorio de bolsillo para la parte práctica que
              hace cinco años no existía.
            </>,
          ],
        }}
        mal={{
          titulo: "Lo que no ha cambiado ni va a cambiar",
          items: [
            <>
              <b>Se pregunta lo mismo.</b> El temario es idéntico: cambia cómo lo estudias, no qué te
              van a preguntar.
            </>,
            <>
              <b>La parte práctica mide que TÚ apliques</b> los conceptos a una situación real. Ahí
              no hay nadie más en la sala.
            </>,
            <>
              <b>La defensa es oral.</b> Cualquier párrafo que no domines del todo se nota en la
              tercera pregunta.
            </>,
            <>
              <b>El tiempo de lectura.</b> Un tema entra leyendo y escribiendo; no hay atajo, y
              cualquiera que te venda uno te está vendiendo humo.
            </>,
          ],
        }}
      />

      {/* ═══ 2. La ruta ═══════════════════════════════════════════════════ */}
      <H2 ante="El método" tono="verde">
        La ruta completa de un tema
      </H2>
      <P>
        Seis estaciones. La IA aparece en cuatro; en las otras dos estás tú solo, y son precisamente
        las que deciden si podrás defender lo que has escrito. Pulsa cualquier estación del diagrama
        para ver qué se hace exactamente en ella.
      </P>

      <RutaDelTema />

      <Nota tono="ambar" titulo="Las dos estaciones que no se delegan">
        La <b>lectura</b> (estación 2) y la <b>redacción</b> (estación 3) son tuyas. Todo lo que la
        IA escriba y llegue tal cual a tu tema es un párrafo que no sabrás defender cuando el vocal
        pregunte por él. Su sitio es antes (ordenar) y después (verificar y examinarte), no en medio.
      </Nota>

      {/* ═══ 3. Los cinco prompts ═════════════════════════════════════════ */}
      <H2 ante="Los prompts" tono="azul">
        Los cinco prompts de la ruta
      </H2>
      <P>
        Todos siguen la plantilla del{" "}
        <Dentro href="/ponencia-tecnologia/01-introduccion/">bloque 1</Dentro> y funcionan igual en
        Copilot Chat, en el Copilot de la web o en el chat de VS Code. Cambia solo lo que va entre
        corchetes.
      </P>

      <FichaPrompt
        tono="azul"
        etiqueta="Estación 1 · 10 min"
        titulo="El esqueleto, antes de abrir ningún libro"
      >
        <p className="mb-2">
          El mapa del tema antes de estudiarlo: qué bloques tiene, qué se pregunta de cada uno y qué
          vocabulario hay que saber de memoria. <b>No se entrega nunca</b>: es tu andamio.
        </p>
        <PromptBlock
          text={`# Rol
Eres catedrático de Tecnología de Secundaria con 25 años en tribunales de oposición.

# Contexto
Oposición al cuerpo de Secundaria, especialidad Tecnología, Comunitat Valenciana.
Temario de 71 temas (Orden de 9 de septiembre de 1993).
Voy a estudiar el tema [Nº]: "[TÍTULO EXACTO DEL TEMA]".

# Tarea
Dame el esqueleto del tema en una sola página.

# Reglas
1) Nunca inventes normativa: si no estás seguro de una norma, un número o una fecha, escribe [COMPROBAR].
2) Cada concepto técnico, con su magnitud y su unidad.
3) Sin introducción y sin conclusión de relleno.

# Formato
1) Bloques y sub-bloques, numerados.
2) Las cinco preguntas de tribunal más probables, de menor a mayor dificultad.
3) Diez términos que deba saber definir de memoria, con una línea cada uno.
4) Con qué otros temas del temario se cruza este, y por dónde.

# Control
Termina con tres preguntas incómodas que me haría un vocal sobre este tema. No me des las respuestas.`}
        />
      </FichaPrompt>

      <FichaPrompt
        tono="morado"
        etiqueta="Estación 3 · durante la redacción"
        titulo="El andamio: cuando un apartado se te atraviesa"
      >
        <p className="mb-2">
          Fíjate en lo que <b>no</b> pide este prompt: no pide que te escriba el apartado. Pide que
          te lo ordene para que lo escribas tú. Esa diferencia es todo el bloque.
        </p>
        <PromptBlock
          text={`Estoy redactando el apartado "[APARTADO]" del tema [Nº] y no me sale la estructura.

Te pego lo que llevo escrito:

[TU BORRADOR, AUNQUE ESTÉ A MEDIAS]

NO me lo reescribas. Haz esto:
1) Dime en qué orden deberían ir las ideas y por qué ese orden y no otro.
2) Señala qué falta que un vocal esperaría encontrar aquí.
3) Dame el vocabulario técnico preciso para tres o cuatro expresiones que yo he escrito de forma vaga
   (dime cuál era la vaga y cuál es la precisa).
4) Propón un ejemplo de aula concreto para cerrar el apartado: centro, curso y actividad.

Cifras con unidades. Si citas normativa y no estás seguro, escribe [COMPROBAR].`}
        />
      </FichaPrompt>

      <FichaPrompt
        tono="ambar"
        etiqueta="Estación 4 · 15 min"
        titulo="La verificación: caza de referencias inventadas"
      >
        <p className="mb-2">
          Antes de dar un tema por cerrado, pásale este filtro. Y después comprueba tú, a mano, cada
          cosa que te señale.
        </p>
        <PromptBlock
          text={`Te pego mi tema ya redactado:

[TU TEMA]

Actúa como revisor escéptico. NO lo reescribas. Devuélveme una tabla con:
| Afirmación del texto | Tipo (norma / cifra / estándar / dato histórico) | ¿Puedes confirmarla con seguridad? | Qué debería comprobar yo y dónde |

Reglas:
- Marca como DUDOSA cualquier norma, número, fecha, estándar UNE/ISO o porcentaje del que no estés
  completamente seguro. Prefiero diez falsos positivos a una referencia inventada.
- No completes ni corrijas los datos: solo señálalos.
- Al final, dime cuáles son las TRES afirmaciones más arriesgadas de todo el tema.`}
        />
      </FichaPrompt>

      <FichaPrompt
        tono="rosa"
        etiqueta="Estación 5 · 15 min"
        titulo="El simulador de tribunal"
      >
        <p className="mb-2">
          El mejor ensayo de defensa que existe, y es gratis. Úsalo con <b>tu</b> tema redactado,
          nunca con uno que te haya escrito él: el objetivo es que te interrogue sobre lo que vas a
          decir de verdad.
        </p>
        <PromptBlock
          text={`# Rol
Eres vocal de un tribunal de oposición de Tecnología de Secundaria (Comunitat Valenciana),
25 años de oficio y fama de pregunta incómoda.

# Contexto
Te pego mi tema tal y como lo voy a defender:

[TU TEMA]

# Tarea
Interrógame.

# Reglas
1) Cinco preguntas, DE UNA EN UNA. No pases a la siguiente hasta que yo conteste.
2) De menor a mayor dificultad. Al menos una de aplicación al aula y una técnica pura.
3) Al menos una tiene que atacar un punto flojo REAL de mi texto, no uno genérico.
4) No me des la respuesta correcta antes de que yo conteste.
5) Después de cada respuesta mía: qué falla, qué habría esperado el tribunal,
   y cómo lo diría yo en UNA frase.

# Control
Al terminar las cinco: nota del 1 al 10 con una línea de justificación,
y el único apartado del tema que me recomendarías repasar antes que ningún otro.`}
        />
      </FichaPrompt>

      <FichaPrompt
        tono="verde"
        etiqueta="Estación 6 · 5 min en días alternos"
        titulo="El repaso espaciado sobre tu propio texto"
      >
        <PromptBlock
          text={`Te pego mi tema [Nº]:

[TU TEMA]

Hazme diez preguntas relámpago sobre ÉL (no sobre el tema en general): definiciones, cifras,
relaciones entre conceptos y una de aplicación a aula. Una línea cada una.
Dámelas todas juntas, numeradas, sin las respuestas.
Cuando yo te mande las mías, corrígelas una a una en una sola línea por pregunta.`}
        />
      </FichaPrompt>

      {/* ═══ 4. La referencia inventada ═══════════════════════════════════ */}
      <H2 ante="El riesgo" tono="rosa">
        El enemigo: la referencia que no existe
      </H2>
      <P>
        Es el fallo más caro de usar IA en un tema, y no se parece a un error normal: los modelos
        citan reales decretos, normas UNE y porcentajes <b>con total seguridad</b>, sin ninguna señal
        de duda. Un vocal con el boletín abierto lo detecta en un minuto, y lo que se le queda no es
        el dato: es que no comprobaste.
      </P>
      <Rejilla cols={3}>
        <Tarjeta tono="rosa" titulo="Lo que más se inventa">
          Números y fechas de normas, referencias UNE/ISO, artículos concretos de un decreto,
          porcentajes de informes y atribuciones de citas a autores.
        </Tarjeta>
        <Tarjeta tono="ambar" titulo="Tu seguro">
          La regla del <b>[COMPROBAR]</b> en el bloque de reglas, más el prompt de verificación de
          arriba. No elimina el riesgo: lo convierte en una lista de tareas.
        </Tarjeta>
        <Tarjeta tono="verde" titulo="La comprobación real">
          BOE y DOGV, buscando por número y fecha. Si una norma no aparece, no existe — por muy bien
          que suene. Y si existe pero dice otra cosa, peor todavía.
        </Tarjeta>
      </Rejilla>

      <Nota tono="rosa" titulo="Regla de oro para el día del examen">
        En el examen escribes de memoria, así que <b>solo llevas dentro de la cabeza lo que hayas
        comprobado</b>. Una norma que solo has leído en un chat no es una norma que sepas: es una
        norma que te han dicho. Si tienes duda sobre una cita, en el examen se rodea la idea sin el
        número. Un tema sin número exacto pierde un matiz; un tema con un número falso pierde
        credibilidad entera.
      </Nota>

      {/* ═══ 4 bis. Datos citables ════════════════════════════════════════ */}
      <H2 ante="Munición" tono="azul">
        Cuatro cifras que sí puedes citar
      </H2>
      <P>
        Si te cae un supuesto sobre IA en el aula —y es hoy un supuesto perfectamente plausible—,
        una cifra bien citada vale más que un párrafo de opinión. Estas cuatro tienen fuente
        primaria, año y ámbito, que es lo que las hace defendibles. <b>Compruébalas tú antes de
        usarlas</b>: es exactamente lo que este bloque te está pidiendo que hagas siempre.
      </P>
      <Rejilla cols={2}>
        <Dato tono="azul" cifra="35 %">
          del profesorado español de <b>Secundaria</b> declara haber usado IA en su trabajo (28 % en
          Primaria; media OCDE, 36 %).
          <span className="mt-1 block text-[13px] text-zinc-400">
            OCDE, TALIS 2024 · informe español del INEE, octubre de 2025. Datos recogidos en 2024.
          </span>
        </Dato>
        <Dato tono="verde" cifra="51 %">
          de los desarrolladores <b>profesionales</b> usa herramientas de IA <b>a diario</b>; el 84 %
          las usa o piensa usarlas.
          <span className="mt-1 block text-[13px] text-zinc-400">
            Stack Overflow Developer Survey 2025, sobre 26.004 profesionales.
          </span>
        </Dato>
        <Dato tono="ambar" cifra="90 %">
          del alumnado de <b>FP de Grado Superior</b> ha usado alguna vez IA generativa — pero solo
          el <b>43 %</b> lo hace de forma habitual.
          <span className="mt-1 block text-[13px] text-zinc-400">
            Ayuda en Acción y CSIC, 2025. Encuesta a 355 docentes más entrevistas.
          </span>
        </Dato>
        <Dato tono="morado" cifra="62 %">
          de los jóvenes europeos de <b>16 a 24 años</b> usa IA generativa con fines de educación
          formal.
          <span className="mt-1 block text-[13px] text-zinc-400">
            Eurostat, diciembre de 2025 (población UE de 16 a 74 años: 32,7 %).
          </span>
        </Dato>
      </Rejilla>

      <Nota tono="rosa" titulo="Un ejemplo de cifra que no aguanta la comprobación">
        Circula mucho esta: <i>«el 72 % del sector TIC usa IA generativa para programar a diario»</i>.
        Suena redonda y se cita sin pestañear. Al ir a la fuente resulta que era una encuesta a{" "}
        <b>319 profesionales de informática de Estados Unidos</b> —no «el sector TIC»— y que ese 72 %
        suma desde quien la usa mucho hasta quien la usa poco: <b>«a diario» no lo dice el
        estudio</b>. La cifra no es falsa; lo falso es la frase que se ha construido con ella. Si un
        vocal tira de ese hilo, se te cae la afirmación entera por un dato que ni siquiera
        necesitabas.
        <span className="mt-2 block font-semibold">
          Una cifra sin ámbito, sin año y sin fuente primaria no es un argumento: es un riesgo.
        </span>
      </Nota>

      {/* ═══ 5. Práctica ══════════════════════════════════════════════════ */}
      <H2 ante="Para practicar" tono="verde">
        Qué hacer esta semana
      </H2>
      <Pasos
        tono="verde"
        items={[
          <>
            <b>Hoy:</b> pídele el esqueleto (estación 1) de <b>un tema que ya te sepas</b>. Verás
            enseguida qué acierta y qué se inventa, y eso te calibra para los 70 restantes.
          </>,
          <>
            <b>Esta semana:</b> pasa por el prompt de verificación un tema que ya tengas redactado.
            Casi todo el mundo encuentra al menos una referencia que no había comprobado.
          </>,
          <>
            <b>Cada noche, quince minutos:</b> simulador de tribunal sobre el tema del día. Es la
            hora de estudio con mejor relación entre esfuerzo y nota de toda la preparación.
          </>,
          <>
            <b>Antes de cada supuesto práctico:</b> pídele diez escenarios de aula distintos y
            quédate con el que más juego te dé. La IA pone el escenario; tu didáctica hace el resto.
          </>,
        ]}
      />

      <FichaPrompt
        tono="gris"
        etiqueta="Extra"
        titulo="Tu banco de supuestos didácticos"
      >
        <PromptBlock
          text={`Genera diez supuestos didácticos REALISTAS (nada de enunciados genéricos) sobre el tema [Nº]:
"[TÍTULO]", para Tecnología de ESO/Bachillerato en la Comunitat Valenciana.

Cada supuesto, en dos partes:
a) Contexto creíble: tipo de centro, localidad, curso, tamaño y perfil del grupo, recursos
   disponibles y UNA tensión real (algo que complique de verdad la clase).
b) Lo que se pide al aspirante.

Varía el tipo de tensión entre supuestos: grupo muy heterogéneo, alumnado con dificultades de
aprendizaje, proyecto interdisciplinar, taller con poca dotación, conflicto de convivencia,
familias desvinculadas, alumnado de altas capacidades, evaluación competencial, y uso de IA
por parte del alumnado.

No repitas escenario ni tensión. Sin introducción.`}
        />
      </FichaPrompt>

      <Cierre tono="verde">
        <b>Lo que te llevas de este bloque:</b> tu ventaja no es saberte el temario —eso lo intenta
        todo el mundo—. Tu ventaja es <b>recorrer cada tema con un método</b>: esqueleto antes,
        lectura y redacción tuyas, verificación implacable y un tribunal que te pregunta cada noche.
        Eso, sostenido durante meses, es una diferencia que se nota en la sala.
      </Cierre>

      <Grabacion matiz="El resumen en audio de este bloque es el que más se escucha andando: recuerda las seis estaciones en el orden correcto." />

      <NavPie atras={atras} adelante={adelante} />
    </div>
  );
}
