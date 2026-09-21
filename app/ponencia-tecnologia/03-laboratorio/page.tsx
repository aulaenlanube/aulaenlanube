import type { Metadata } from "next";
import Link from "@/components/Link";
import PromptBlock from "@/components/PromptBlock";
import { CicloAgentico } from "../_svg/proceso";
import { vecinos } from "../_datos";
import {
  Chip,
  Cierre,
  Contraste,
  Dentro,
  ESTILO,
  FichaPrompt,
  Fuera,
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
  title: "Bloque 5 · El laboratorio: dos aplicaciones — Del prompt a la plaza — Aula en la Nube",
  description:
    "Programación agéntica para docentes de Tecnología: el ciclo especificar–delegar–verificar–dirigir, las dos aplicaciones de aula creadas con un solo prompt (4.º de ESO y 1.º de Bachillerato), la plantilla para pedir la tuya y cómo publicarla con un enlace que el tribunal pueda abrir.",
};

const { atras, adelante } = vecinos(5);

const APPS = [
  {
    ruta: "/ponencia-tecnologia/app-logica-digital/",
    curso: "4.º de ESO",
    titulo: "Laboratorio de lógica digital",
    d: "Seis puertas con su símbolo ANSI, tablas de verdad en vivo, un circuito de dos puertas que se monta y seis retos con enunciado real.",
    tono: "azul" as const,
  },
  {
    ruta: "/ponencia-tecnologia/app-ensayo-traccion/",
    curso: "1.º de Bachillerato",
    titulo: "Banco de ensayo de tracción",
    d: "Una probeta que se alarga, se estrangula y se rompe, la curva tensión–deformación dibujándose sola y el botón de soltar la fuerza.",
    tono: "ambar" as const,
  },
];

export default function Bloque5() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <Migas bloque={{ titulo: "Bloque 5", ruta: "/ponencia-tecnologia/03-laboratorio/" }} />
      <Portadilla
        n={5}
        tono="ambar"
        minutos={30}
        titulo="El laboratorio: dos aplicaciones"
        entradilla={
          <>
            Media hora con el portátil abierto. Aquí se ve lo que hace un agente de código cuando se
            le dirige bien: <b>de un prompt a una aplicación de aula que funciona</b>, en dos o tres
            minutos. Y, lo que más importa, el paso que casi nadie da y que decide la defensa:
            verificarla.
          </>
        }
      />

      {/* ═══ 1. Por qué ═══════════════════════════════════════════════════ */}
      <H2 ante="Por qué" tono="ambar">
        Por qué esto te interesa como opositor de Tecnología
      </H2>
      <Lista
        tono="ambar"
        items={[
          <>
            <b>Está literalmente en tu temario.</b> TIC, programación, sistemas de control,
            simulación, evaluación y didáctica. No estás haciendo algo «de informática»: estás
            haciendo tu asignatura.
          </>,
          <>
            <b>Es la parte práctica que nadie más lleva.</b> Presentarse con una aplicación tuya,
            funcionando, publicada y con un enlace que el tribunal abre en su ordenador es una
            diferencia que se ve en dos segundos.
          </>,
          <>
            <b>Contesta la pregunta de moda.</b> Cuando te pregunten cómo integrarías la IA en tu
            aula, la respuesta convincente no es una opinión: es enseñar lo que has hecho con ella y
            cómo lo verificaste.
          </>,
          <>
            <b>Y cuando tengas la plaza, lo vas a usar cada semana.</b> Un simulador para cada
            contenido difícil, hecho en una tarde. Eso antes no existía.
          </>,
        ]}
      />

      {/* ═══ 2. El ciclo ══════════════════════════════════════════════════ */}
      <H2 ante="El método" tono="ambar">
        El ciclo agéntico: cuatro pasos, en bucle
      </H2>
      <P>
        El modo agente no te contesta: <b>actúa</b>. Crea ficheros, los edita, ejecuta órdenes en la
        terminal, lee el error que sale y vuelve a intentarlo. Eso cambia tu papel: dejas de teclear
        y pasas a dirigir y verificar. Pulsa cada paso.
      </P>

      <CicloAgentico />

      <Nota tono="rosa" titulo="El paso 3 es el que se salta todo el mundo">
        Un agente <b>da por bueno lo que no ha ejecutado</b>, y te dirá con toda la seguridad del
        mundo que algo funciona sin haberlo abierto. Si no lo verificas tú, no estás defendiendo tu
        aplicación: estás defendiendo lo que la IA cree que hizo. Y esa distinción la detecta un
        tribunal en la segunda pregunta.
      </Nota>

      {/* ═══ 3. Las dos apps ══════════════════════════════════════════════ */}
      <H2 ante="La prueba" tono="verde">
        Dos aplicaciones, dos cursos, un prompt cada una
      </H2>
      <P>
        No son maquetas ni vídeos: ábrelas y úsalas. Cada una salió de <b>un solo encargo bien
        escrito</b>, y en su página tienes ese encargo publicado íntegro, para que veas exactamente
        qué frase produce qué comportamiento.
      </P>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {APPS.map((a) => {
          const e = ESTILO[a.tono];
          return (
            <Link
              key={a.ruta}
              href={a.ruta}
              className={`group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition ${e.tarjeta}`}
            >
              <Chip tono={a.tono}>{a.curso}</Chip>
              <h3 className="mt-3 text-[17px] font-extrabold tracking-tight text-zinc-900">
                {a.titulo}
              </h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-zinc-600">{a.d}</p>
              <p className={`mt-3 text-[13px] font-bold ${e.texto}`}>
                Probarla y ver su prompt{" "}
                <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </p>
            </Link>
          );
        })}
      </div>

      <Nota tono="verde" titulo="Lo que las dos tienen en común, y no es casualidad">
        Las dos funcionan <b>sin internet</b>, las dos se manejan con el teclado, las dos se leen en
        un móvil y las dos explican el error en vez de limitarse a marcarlo. Ninguna de esas cuatro
        cosas aparece sola: <b>las cuatro estaban pedidas en el prompt</b>. Lo que no pides, no
        viene.
      </Nota>

      {/* ═══ 4. El laboratorio ════════════════════════════════════════════ */}
      <H2 ante="Hazlo tú" tono="azul">
        El laboratorio, paso a paso
      </H2>
      <P>
        Esto es lo que se hace en directo en la sesión y lo que puedes repetir en casa. Si te quedas
        a medias, cada paso está aquí completo.
      </P>
      <Pasos
        tono="azul"
        items={[
          <>
            <b>Prepara el terreno.</b> Visual Studio Code instalado, extensión de GitHub Copilot,
            sesión iniciada con tu cuenta, y una carpeta vacía abierta —por ejemplo{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[13px]">~/tecno/app</code>—. El
            agente trabaja <b>dentro de esa carpeta</b> y no ve el resto de tu disco.
          </>,
          <>
            <b>Abre el chat en modo agente.</b> No es el chat normal: en el selector del panel de
            Copilot eliges el rol de agente. La diferencia es que puede crear y modificar ficheros y
            ejecutar órdenes — te pedirá permiso la primera vez.
          </>,
          <>
            <b>Pega el encargo completo.</b> Uno solo, largo, con sus seis bloques. No lo piques por
            trozos: en la primera pasada quieres la aplicación entera, aunque salga tosca.
          </>,
          <>
            <b>Déjalo trabajar y míralo.</b> Dos o tres minutos. Verás cómo crea ficheros, los
            escribe, ejecuta algo, se encuentra un error y lo arregla solo. Merece la pena mirar: se
            aprende viendo en qué orden hace las cosas.
          </>,
          <>
            <b>Ábrela y úsala entera.</b> De principio a fin, como la usaría tu alumnado más
            trasto. Comprueba los datos, las fórmulas, los casos raros y qué pasa al reiniciar.{" "}
            <b>Aquí es donde estás tú y no puede estar nadie más.</b>
          </>,
          <>
            <b>Corrige de uno en uno.</b> Un fallo, una petición, y verificas otra vez antes de
            pedir el siguiente. «Arréglalo todo» devuelve un revoltijo.
          </>,
          <>
            <b>Publícala.</b> Repositorio en GitHub, Settings → Pages, publicar desde la rama
            principal. En un minuto tienes una dirección pública del tipo{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[13px]">
              tuusuario.github.io/tu-app
            </code>
            . <b>Ese enlace va en tu defensa</b>: el tribunal lo abre sin instalar nada.
          </>,
        ]}
      />

      <FichaPrompt
        tono="ambar"
        etiqueta="Prompt · tu turno"
        titulo="La plantilla para pedir TU aplicación"
      >
        <p className="mb-2">
          Es la misma estructura que generó las dos de arriba. Rellena los corchetes con tu contenido
          y tu curso; el resto déjalo tal cual, porque el resto es lo que hace que funcione sin
          internet, se lea proyectado y explique los errores.
        </p>
        <PromptBlock
          text={`# Rol
Eres ingeniero de software especializado en aplicaciones educativas interactivas
y conoces el currículo de Tecnología de Secundaria.

# Contexto
Soy profesor de Tecnología. Necesito una aplicación web para [CURSO Y ETAPA],
sobre "[CONTENIDO EXACTO DEL CURRÍCULO]".
La voy a usar proyectada en clase y en los portátiles del alumnado.
La idea pedagógica es que el alumnado [QUÉ DESCUBRA O QUÉ PRACTIQUE].

# Tarea
Construye "[NOMBRE DE LA APLICACIÓN]", de una sola pantalla, con estas partes:
1) [LA ESCENA PRINCIPAL: qué se ve, qué se toca y qué pasa al tocarlo.]
2) [LOS MANDOS: qué puede cambiar el alumno y entre qué valores.]
3) [LAS LECTURAS: qué magnitudes se muestran, con su fórmula y su unidad.]
4) [LOS RETOS: cuántos, de qué dificultad creciente, y con qué enunciados reales.]

Datos que tienes que usar (no inventes ninguno):
- [DATO 1 CON SU VALOR Y SU UNIDAD]
- [DATO 2 CON SU VALOR Y SU UNIDAD]

# Reglas
1) Una sola pantalla, sin recarga y sin enrutado.
2) Sin librerías externas, sin CDN y sin imágenes externas: todo gráfico en SVG.
   Tiene que funcionar sin internet, porque en mi aula la wifi falla.
3) Accesible: todo se opera con teclado, los controles son elementos reales
   (botones, range, number) con su etiqueta, y los cambios se anuncian con aria-live.
4) Responsive: legible en un móvil de 360 px y espectacular proyectado en 1080p.
   Nunca puede haber scroll horizontal de la página.
5) Cuando el alumno se equivoque, explica POR QUÉ estaba mal, no solo que lo está.
   Nada punitivo: cada error se explica.
6) Geometría SVG calculada con constantes, no a ojo: nada se solapa ni se sale del viewBox.
7) Las unidades tienen que cuadrar. [ESCRIBE AQUÍ LA RELACIÓN ENTRE UNIDADES QUE IMPORTA.]
8) Todo en español de España, con tuteo al alumnado.

# Formato
Paleta sobria de cuatro colores. Lo que sea "el instrumento" va en panel oscuro
para que contraste proyectado; el resto, en tarjetas claras.

# Control
Antes de darlo por terminado, comprueba a mano este caso y dime el resultado:
[UN CASO QUE TÚ HAYAS RESUELTO CON CALCULADORA, CON SU RESULTADO ESCRITO].
Si tus cálculos no lo reproducen, están mal.
Dime también qué has dado por supuesto que yo no te había dicho.`}
        />
      </FichaPrompt>

      {/* ═══ 5. Las trampas ═══════════════════════════════════════════════ */}
      <H2 ante="Las trampas" tono="rosa">
        Cuatro cosas que pasan siempre la primera vez
      </H2>
      <Contraste
        bien={{
          titulo: "Lo que funciona",
          items: [
            <>
              <b>Pedir la aplicación entera</b> en la primera pasada, aunque salga tosca. Iterar
              sobre algo completo es rápido.
            </>,
            <>
              <b>«Explícame por qué pasa esto antes de arreglarlo».</b> Convierte cada fallo en una
              clase, y es exactamente lo que te preguntará el tribunal.
            </>,
            <>
              <b>Guardar las versiones que te gusten</b> con un commit. Volver atrás solo es gratis
              si guardaste.
            </>,
            <>
              <b>Terminar con «¿qué has dado por supuesto?»</b>: te enseña dónde estaba flojo tu
              encargo.
            </>,
          ],
        }}
        mal={{
          titulo: "Lo que te hace perder la tarde",
          items: [
            <>
              <b>Creerte que funciona porque lo dice.</b> Es el fallo número uno, y el único que un
              tribunal detecta seguro.
            </>,
            <>
              <b>Pedir la estética antes que la lógica.</b> Cada arreglo posterior te rompe el
              diseño y vuelves a empezar.
            </>,
            <>
              <b>Encadenar cinco arreglos sin comprobar entre medias.</b> Cuando algo se rompa, no
              sabrás cuál de los cinco fue.
            </>,
            <>
              <b>Aceptar tecnología que no entiendes.</b> Si te trae un armatoste que no sabes
              explicar, pídelo otra vez «sin librerías y en un solo fichero».
            </>,
          ],
        }}
      />

      <Rejilla cols={3}>
        <Tarjeta tono="ambar" titulo="Si se te agotan las peticiones">
          El plan gratuito de Copilot da 50 peticiones de chat al mes y se van rápido. Solicita el
          programa educativo de GitHub —<Dentro href="/ponencia-tecnologia/02-herramientas-gratuitas/">bloque 2</Dentro>— o
          reparte el trabajo: pocas peticiones largas y bien escritas rinden más que muchas cortas.
        </Tarjeta>
        <Tarjeta tono="azul" titulo="Si no sabes leer el código">
          No hace falta que lo escribas, pero sí que lo entiendas. Señala un bloque y pide:
          «explícame qué hace esto, línea a línea, como a alguien que enseña Tecnología en
          Secundaria». Eso es estudiar, no copiar.
        </Tarjeta>
        <Tarjeta tono="verde" titulo="Si quieres llevarlo a clase de verdad">
          Con{" "}
          <Fuera href="https://apps-educativas.com">apps-educativas.com</Fuera> puedes montar la
          clase, el grupo y los ejercicios alrededor de tu aplicación. Es el salto de «tengo una
          demo» a «tengo una actividad evaluable».
        </Tarjeta>
      </Rejilla>

      {/* ═══ 6. Práctica ══════════════════════════════════════════════════ */}
      <H2 ante="Para practicar" tono="ambar">
        Tu aplicación, esta semana
      </H2>
      <Pasos
        tono="ambar"
        items={[
          <>
            <b>Elige el contenido que peor se explica</b> de todo lo que preparas. Ese que siempre
            necesita dibujo en la pizarra. Ese es el candidato.
          </>,
          <>
            <b>Escribe el prompt con la plantilla</b>, incluido el caso numérico de control resuelto
            a mano. Diez minutos de preparación; son los que deciden el resultado.
          </>,
          <>
            <b>Ejecútalo, verifícalo y corrige tres cosas.</b> Anota cuáles: esas tres correcciones
            son tu mejor material de defensa, porque demuestran criterio propio.
          </>,
          <>
            <b>Publícala y guarda el enlace</b> junto a una captura de la aplicación y otra del
            código. Van en la diapositiva de tu práctica.
          </>,
        ]}
      />

      <Cierre tono="ambar">
        <b>Lo que te llevas de este bloque:</b> saber programar en 2026 no es teclear más rápido:
        es <b>especificar bien, verificar de verdad y saber explicar por qué cada decisión está
        ahí</b>. Lo primero lo aprendiste en el bloque 1; lo segundo no se delega; lo tercero es lo
        que se defiende en el bloque 6. Y por el camino te queda una aplicación con tu nombre.
      </Cierre>

      <Grabacion matiz="Este es el bloque que hay que volver a ver en vídeo: los pasos del agente se entienden mucho mejor viéndolos que leyéndolos." />

      <NavPie atras={atras} adelante={adelante} />
    </div>
  );
}
