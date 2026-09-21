import type { Metadata } from "next";
import PromptBlock from "@/components/PromptBlock";
import { AnatomiaInfografia } from "../_svg/metodo";
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
  title: "Bloque 4 · Materiales que entran por los ojos — IA para opositores de Tecnología — Aula en la Nube",
  description:
    "Cómo generar láminas didácticas, presentaciones y esquemas con IA que aguanten un proyector y un tribunal: las siete piezas del prompt de una imagen, la plantilla completa, cómo pasar de un guion a una presentación y los errores que delatan un material generado.",
};

const { atras, adelante } = vecinos(4);

export default function Bloque4() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <Migas bloque={{ titulo: "Bloque 4", ruta: "/ponencia-tecnologia/materiales-visuales/" }} />
      <Portadilla
        n={4}
        tono="rosa"
        minutos={20}
        titulo="Materiales que entran por los ojos"
        entradilla={
          <>
            Una lámina buena explica en diez segundos lo que un párrafo no consigue en tres minutos.
            Y hasta hace poco, conseguir una lámina buena significaba pagarla o pasarse la tarde
            peleando con un editor. Hoy se pide. Este bloque es{" "}
            <b>cómo se pide para que salga bien</b>: en la lámina, en la presentación y en el
            esquema.
          </>
        }
      />

      {/* ═══ 1. Por qué ═══════════════════════════════════════════════════ */}
      <H2 ante="Por qué importa" tono="rosa">
        Lo visual puntúa dos veces
      </H2>
      <P>
        Para un opositor de Tecnología, el material visual no es decoración: aparece en dos sitios
        donde se juega la nota.
      </P>
      <Rejilla>
        <Tarjeta tono="rosa" titulo="En la programación y en la defensa">
          Cuando presentas una situación de aprendizaje, lo que enseñas dice tanto como lo que
          cuentas. Un esquema propio, limpio y bien rotulado transmite que has preparado el material,
          no solo el texto. Y en la exposición oral te da algo a lo que señalar.
        </Tarjeta>
        <Tarjeta tono="azul" titulo="En el aula, cuando tengas la plaza">
          En Tecnología se explica lo que no se ve: corrientes, esfuerzos, señales, procesos. La
          lámina buena es literalmente la herramienta de la asignatura, y el tiempo que no gastas
          dibujándola lo gastas enseñando.
        </Tarjeta>
      </Rejilla>

      {/* ═══ 2. Las siete piezas ══════════════════════════════════════════ */}
      <H2 ante="La lámina" tono="rosa">
        Las siete piezas del prompt de una imagen
      </H2>
      <P>
        Aquí no vale el «hazme una infografía sobre la fotosíntesis»: eso devuelve un cartel bonito y
        vacío, en inglés y con faltas. Una lámina que se pueda proyectar en clase lleva siete piezas
        en el encargo, y falta una y se nota. Pulsa cualquier número del diagrama.
      </P>

      <AnatomiaInfografia />

      <Nota tono="ambar" titulo="La pieza 4 es el 80 % del resultado">
        <b>El texto de la lámina lo escribes tú.</b> El generador solo lo dibuja. Si le dices
        «explica el ciclo del agua», se inventa las definiciones; si le dictas cada proceso con la
        frase exacta que quieres a su lado, te devuelve tu contenido maquetado. Esa es toda la
        diferencia entre una imagen de adorno y un material de aula.
      </Nota>

      <FichaPrompt
        tono="rosa"
        etiqueta="Prompt 1 · la lámina"
        titulo="Plantilla completa de infografía educativa"
      >
        <p className="mb-2">
          Sustituye lo que va entre corchetes y dicta tú los procesos y las ideas clave. Funciona en
          el generador de imágenes de Copilot y en cualquier otro.
        </p>
        <PromptBlock
          text={`Crea una infografía educativa vertical en formato 9:16, en español, sobre "[TEMA]",
orientada a alumnado de [CURSO Y ETAPA]. Quiero un diseño muy profesional, editorial y
técnicamente riguroso, con estética de infografía académica moderna.

Composición: una ilustración central detallada de [DESCRIBE LA ESCENA COMPLETA: qué elementos
aparecen, cómo se relacionan y desde qué punto de vista se ve].

Título principal: "[TÍTULO EXACTO]".
Subtítulo: "[SUBTÍTULO EXACTO]".

Representa y explica claramente estos elementos, cada uno con su rótulo y su definición literal:
- [ELEMENTO 1]: "[DEFINICIÓN EXACTA, UNA LÍNEA]"
- [ELEMENTO 2]: "[DEFINICIÓN EXACTA, UNA LÍNEA]"
- [ELEMENTO 3]: "[DEFINICIÓN EXACTA, UNA LÍNEA]"
- [… hasta 8 o 10 elementos]

Añade recuadros laterales con estas ideas clave, literales:
- "[IDEA CLAVE 1]"
- "[IDEA CLAVE 2]"
- "[IDEA CLAVE 3]"

Paleta: [COLORES], con acentos elegantes.
Incluye flechas claras, iconografía técnica, leyendas y jerarquía visual muy cuidada.
Mucho detalle, máxima legibilidad y acabado profesional.`}
        />
      </FichaPrompt>

      <Nota tono="verde" titulo="Diecisiete láminas ya hechas, con su prompt a la vista">
        No hace falta que empieces en blanco. En{" "}
        <Fuera href="https://aulaenlanube.com/cadenas-de-prompts/">
          aulaenlanube.com/cadenas-de-prompts
        </Fuera>
        , pestaña <b>Infografías</b>, tienes diecisiete láminas educativas —el ciclo del agua, las
        leyes de Newton, el enlace químico, electricidad, electromagnetismo, arquitectura de
        internet, algoritmos…— y de cada una <b>el prompt exacto que la generó</b>. Cópiale el prompt
        a la que más se parezca a lo tuyo, cámbiale el tema y los elementos, y ya tienes la tuya. Las
        de electricidad, electromagnetismo, algoritmos y arquitectura de internet son directamente de
        tu temario.
      </Nota>

      <H2 ante="Control de calidad" tono="ambar">
        Qué revisar antes de proyectar nada
      </H2>
      <Contraste
        bien={{
          titulo: "Una lámina lista para clase",
          items: [
            "Los textos están bien escritos: sin faltas, sin palabras inventadas, con las tildes puestas.",
            "Los rótulos señalan lo que dicen que señalan (compruébalo uno a uno).",
            "Se lee desde la última fila: nada por debajo del tamaño de un titular de periódico.",
            "Los datos y las unidades son los tuyos, porque se los dictaste tú.",
          ],
        }}
        mal={{
          titulo: "Lo que delata una imagen generada",
          items: [
            "Texto con letras de más o palabras que no existen: es el fallo más frecuente y el más visible.",
            "Una flecha que apunta a otra cosa, o una etiqueta cambiada de sitio.",
            "Cifras inventadas en una gráfica de adorno. Un vocal de Tecnología lo ve al vuelo.",
            "Estética de banco de imágenes: bonita, genérica y sin una sola idea dentro.",
          ],
        }}
      />

      <Nota tono="rosa" titulo="La regla de los diez segundos">
        Proyecta la lámina, ponte al fondo del aula y cuenta hasta diez. Si en ese tiempo no has
        entendido de qué va, no sirve — por muy bien dibujada que esté. Vuelve al prompt, quita
        elementos y pide menos cosas más grandes.
      </Nota>

      {/* ═══ 3. Presentaciones ════════════════════════════════════════════ */}
      <H2 ante="La presentación" tono="morado">
        Del guion a las diapositivas, sin diapositivas de relleno
      </H2>
      <P>
        El error clásico es pedir «una presentación sobre X»: salen veinte diapositivas de viñetas
        genéricas que nadie escucha. La presentación se pide al revés: <b>primero escribes tú el
        guion</b> —qué quieres que se entienda, en qué orden— y después pides la maqueta. Lo que
        delegas es el diseño, nunca el discurso.
      </P>

      <FichaPrompt
        tono="morado"
        etiqueta="Prompt 2 · la presentación"
        titulo="De tu guion a una presentación defendible"
      >
        <PromptBlock
          text={`# Rol
Eres diseñador de materiales didácticos para Educación Secundaria.

# Contexto
Voy a explicar "[TEMA]" a [CURSO] en [Nº] minutos, proyectando.
Te pego mi guion, que es lo que quiero que se entienda y en qué orden:

[TU GUION: cinco o seis ideas, en orden, con una línea cada una]

# Tarea
Conviértelo en una presentación.

# Reglas
1) Una idea por diapositiva. Si una idea necesita dos, dímelo y pártela tú.
2) Máximo veinte palabras de texto por diapositiva: lo demás lo digo yo hablando.
3) Ninguna diapositiva de relleno: nada de "índice", "objetivos" ni "gracias por su atención".
4) No inventes datos. Si una diapositiva pide una cifra que yo no te he dado, escribe [DATO].
5) Todo en español y con el vocabulario técnico correcto de la materia.

# Formato
Para cada diapositiva: título (máx. 6 palabras) · texto en pantalla · qué digo yo en voz alta
(dos líneas) · qué imagen o esquema debería llevar.

# Control
Al final, dime qué tres diapositivas se caerían si me quedara sin tiempo, y por qué esas.`}
        />
      </FichaPrompt>

      <Lista
        tono="morado"
        items={[
          <>
            <b>Después, el diseño:</b> con ese guion diapositiva a diapositiva, el Copilot de
            PowerPoint te monta la presentación desde el documento sin que tengas que maquetar nada.
          </>,
          <>
            <b>La columna «qué digo yo en voz alta» es oro:</b> va a las notas del ponente y es
            exactamente lo que necesitas para ensayar una exposición cronometrada.
          </>,
          <>
            <b>Los <code className="rounded bg-zinc-100 px-1 py-0.5 text-[13px]">[DATO]</code> los
            rellenas tú.</b> Es la misma regla del [COMPROBAR] del bloque 3, aplicada a la
            presentación.
          </>,
        ]}
      />

      {/* ═══ 4. Esquemas ══════════════════════════════════════════════════ */}
      <H2 ante="El esquema" tono="verde">
        Cuando lo que hace falta es un diagrama, no una imagen
      </H2>
      <P>
        Hay contenidos que no se explican con una ilustración, sino con un esquema: un circuito, un
        diagrama de bloques de un sistema de control, un organigrama de procesos, una línea de
        tiempo. Para eso, un generador de imágenes es la herramienta equivocada —dibuja algo que{" "}
        <i>parece</i> un esquema—. Lo que quieres es que el agente te lo genere como{" "}
        <b>código de dibujo</b> (SVG), que es exacto, se puede corregir línea a línea y escala sin
        pixelarse.
      </P>
      <P>
        Los diagramas que estás viendo en esta misma ponencia están hechos así: son SVG con la
        geometría calculada, no imágenes. Por eso puedes pulsarlos.
      </P>

      <FichaPrompt tono="verde" etiqueta="Prompt 3 · el esquema" titulo="Un diagrama exacto, en SVG">
        <PromptBlock
          text={`Genérame un diagrama en SVG, en un único fichero, sobre "[QUÉ REPRESENTA]",
para proyectar en clase de [CURSO].

Contenido exacto (no añadas ni quites nada):
- Bloques: [LISTA DE BLOQUES, CON SU RÓTULO LITERAL]
- Conexiones: [QUÉ VA CON QUÉ, Y EN QUÉ SENTIDO]
- Rótulos de las conexiones: [SI LOS HAY]

Requisitos duros:
1) viewBox definido y escalable; sin fuentes externas ni imágenes enlazadas.
2) Ningún texto por debajo de 16 px efectivos: se ve desde el fondo del aula.
3) Geometría calculada con constantes, no a ojo: nada se solapa ni se sale del viewBox.
4) Flechas con <marker> y markerUnits="userSpaceOnUse", para que la punta caiga
   justo donde acaba el trazo.
5) Paleta de como mucho cuatro colores, legible también impreso en blanco y negro.
6) Un <title> y un <desc> describiendo el diagrama, para lectores de pantalla.

Cuando termines, dime qué has dado por supuesto que yo no te había dicho.`}
        />
      </FichaPrompt>

      <Nota tono="gris" titulo="Cómo se abre un SVG si no programas">
        Guarda lo que te dé en un fichero con extensión <code>.svg</code> y ábrelo con el navegador:
        se ve al instante. Para llevarlo a una presentación, PowerPoint e Impress insertan SVG
        directamente. Y si algo no te gusta, no lo retoques a mano: dile qué cambiar y te devuelve el
        fichero corregido.
      </Nota>

      {/* ═══ 5. Los límites ═══════════════════════════════════════════════ */}
      <H2 ante="Los límites" tono="ambar">
        Tres cosas que conviene tener claras
      </H2>
      <Lista
        tono="ambar"
        items={[
          <>
            <b>Personajes y marcas con derechos.</b> Ni en clase ni en una presentación de oposición:
            una lámina con un personaje reconocible de una franquicia es un problema evitable.
            Descríbele el personaje que quieres, no el que existe.
          </>,
          <>
            <b>Caras de personas reales.</b> Evítalas. Y nunca, bajo ningún concepto, la cara de
            alumnado: ni para generar, ni para editar, ni como referencia. Eso enlaza con lo que no
            se mete en un chat, del{" "}
            <Dentro href="/ponencia-tecnologia/02-herramientas-gratuitas/">bloque 2</Dentro>.
          </>,
          <>
            <b>Di que lo has generado.</b> En el aula, decir «esta lámina la he generado con IA y he
            corregido estas tres cosas» es una clase de pensamiento crítico gratis. Y ante un
            tribunal, es exactamente la actitud que se valora.
          </>,
        ]}
      />

      {/* ═══ 6. Práctica ══════════════════════════════════════════════════ */}
      <H2 ante="Para practicar" tono="rosa">
        Dos ejercicios de esta semana
      </H2>
      <Pasos
        tono="rosa"
        items={[
          <>
            <b>Coge una lámina de la galería</b> cuyo tema se parezca al tuyo, cópiale el prompt
            entero y cámbiale solo el tema, los elementos y las definiciones. Compara la tuya con la
            original: verás qué partes del prompt hacen qué.
          </>,
          <>
            <b>Escribe el guion de una explicación de diez minutos</b> que ya des —o que vayas a
            dar— y pásalo por el prompt de presentación. Fíjate sobre todo en la columna «qué digo yo
            en voz alta»: eso es tu exposición ensayada.
          </>,
        ]}
      />

      <Cierre tono="rosa">
        <b>Lo que te llevas de este bloque:</b> el contenido lo pones tú y el acabado lo pone la
        máquina, nunca al revés. Cuando dictas los textos, las definiciones y las ideas clave, lo que
        recibes es <b>tu material</b> bien maquetado. Cuando no los dictas, recibes un cartel bonito
        que no dice nada — y eso, proyectado, se nota desde la última fila.
      </Cierre>


      <NavPie atras={atras} adelante={adelante} />
    </div>
  );
}
