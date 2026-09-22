import type { Metadata } from "next";
import PromptBlock from "@/components/PromptBlock";
import LogicaDigitalApp from "../_apps/logica-digital";
import { Chip, Dentro, H2, Lista, Migas, NavPie, Nota, P, Rejilla, Tarjeta } from "../_ui/piezas";

export const metadata: Metadata = {
  title: "Laboratorio de lógica digital · 4.º de ESO — IA para opositores de Tecnología — Aula en la Nube",
  description:
    "Aplicación interactiva de puertas lógicas, tablas de verdad y retos con enunciado real para 4.º de ESO (Tecnología, electrónica digital). Creada con un agente de código, con el prompt exacto que la generó publicado debajo.",
};

export default function AppLogicaDigital() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <Migas bloque={{ titulo: "Lógica digital", ruta: "/ponencia-tecnologia/app-logica-digital/" }} />

      <div className="flex flex-wrap items-center gap-2">
        <Chip tono="azul">4.º de ESO</Chip>
        <Chip tono="gris">Tecnología · Electrónica digital</Chip>
        <Chip tono="verde">Un solo prompt</Chip>
      </div>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
        Laboratorio de lógica digital
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        Puertas lógicas, tablas de verdad y seis retos con enunciado real. Pruébala aquí mismo —
        funciona con el ratón, con el dedo y con el teclado— y después baja a ver{" "}
        <b>el encargo exacto que la creó</b>. No hay ningún truco escondido: lo que hay debajo es
        literalmente lo que se le pidió.
      </p>

      {/* ── La aplicación ──────────────────────────────────────────────── */}
      <div className="mt-8">
        <LogicaDigitalApp />
      </div>

      {/* ── El prompt ──────────────────────────────────────────────────── */}
      <H2 ante="La receta" tono="azul">
        El prompt exacto que la generó
      </H2>
      <P>
        Organizado con los seis bloques del{" "}
        <Dentro href="/ponencia-tecnologia/01-introduccion/">bloque 1</Dentro>. Fíjate en la
        proporción: la descripción de lo que tiene que hacer ocupa el triple que cualquier otra cosa,
        y hay un bloque entero dedicado a exigir que la lógica sea correcta. Eso no es exceso de
        celo: es lo que separa esta aplicación de una demo que se cae en la segunda pregunta de un
        alumno.
      </P>

      <PromptBlock
        text={`# Rol
Eres ingeniero de software especializado en aplicaciones educativas interactivas
y conoces el currículo de Tecnología de la ESO.

# Contexto
Soy profesor de Tecnología. Necesito una aplicación web para 4.º de ESO,
bloque de electrónica digital: puertas lógicas, tablas de verdad y funciones booleanas.
La voy a usar proyectada en clase y también en los portátiles del alumnado.
Esta aplicación es una pieza de escaparate: tiene que verse EXCELENTE
y tener pedagogía real, no ser una demo de juguete.

# Tarea
Construye «Laboratorio de lógica digital», una aplicación de una sola pantalla
con tres modos, conmutables con pestañas accesibles.

1) EXPLORAR.
El alumno elige una puerta entre NOT, AND, OR, NAND, NOR y XOR. En un lienzo oscuro
tipo banco de trabajo se dibuja el símbolo ANSI/IEEE correcto de esa puerta (distintivo
y reconocible: el semicírculo de la AND, el escudo curvo de la OR, la doble curva de la XOR,
el circulito de negación de NAND/NOR/NOT). Dos interruptores A y B (solo A si es NOT) que
el alumno conmuta con ratón o teclado; los cables se colorean según lleven 0 o 1 y la salida
enciende un LED. Debajo, la tabla de verdad completa de esa puerta con la fila actual
resaltada en vivo. Al lado, una tarjeta que explica la puerta en una frase llana («la AND
solo da 1 cuando las DOS entradas valen 1»), su expresión booleana (S = A · B, S = A + B,
S = A ⊕ B, S = ¬(A · B)…) y una analogía cotidiana de una línea.

2) MONTAR.
Un circuito de dos puertas encadenadas: tres entradas A, B y C, y dos huecos (la puerta 1
recibe A y B; la puerta 2 recibe la salida de la puerta 1 y la entrada C). El alumno elige
qué puerta va en cada hueco desde un desplegable, conmuta las tres entradas y ve propagarse
los valores por los cables, con el valor 0/1 rotulado en cada tramo. Se muestra la tabla de
verdad de las 8 combinaciones del circuito completo, recalculada en vivo, con la fila actual
resaltada. Un panel plantea un objetivo con enunciado real («que la alarma suene solo si la
puerta está abierta Y el sistema está armado, salvo que se haya pulsado el botón de
anulación») y comprueba automáticamente si la combinación de puertas elegida cumple la tabla
objetivo, avisando en cuántas filas de 8 coincide.

3) RETOS.
Seis retos de dificultad creciente, cada uno con un enunciado del mundo real (alarma de una
vivienda, riego automático de un invernadero, luz de un ascensor, detector de cinturón de
seguridad, ventilación de un taller, control de un semáforo de obra). En cada reto el alumno
decide la salida (0 o 1) para cada fila de la tabla de verdad, o elige la puerta que resuelve
el enunciado. Corrección inmediata con explicación del porqué en cada fila fallada: no solo
«mal», sino qué condición se cumple y qué debería salir. Barra de progreso y marcador de
aciertos. Botón de reintentar. Al terminar los seis, un resumen con el recuento y una frase
de cierre según el resultado. Nada punitivo: cada error se explica.

# Reglas
1) Una sola pantalla, sin recarga y sin enrutado.
2) Sin librerías externas, sin CDN y sin imágenes externas: todo gráfico va en SVG.
   Tiene que funcionar sin internet, porque en el aula 12 no hay wifi.
3) Accesible: todo se opera con teclado; los interruptores son botones reales con aria-pressed;
   los cambios de estado se anuncian con aria-live; los SVG informativos llevan role="img"
   con su descripción; foco visible con anillo.
4) Responsive de verdad: legible en un móvil de 360 px de ancho y espectacular proyectado
   en 1080p. Nunca puede haber scroll horizontal de la página.
5) No bases ninguna información SOLO en una animación.
6) Geometría SVG calculada con constantes, no a ojo: nada se solapa ni se sale del viewBox,
   y ningún texto por debajo de 13 px efectivos.
7) RIGOR: las tablas de verdad, los símbolos ANSI y la propagación lógica tienen que ser
   exactos. Un profesor de Tecnología va a ver esto proyectado. Revisa una por una las seis
   tablas de verdad y los seis enunciados: el enunciado en lenguaje natural tiene que
   corresponder EXACTAMENTE con la tabla que se pide. Compruébalo a mano antes de darlo
   por bueno.

# Formato
Paleta sobria: azul para lo primario, verde para el acierto y para la señal a 1, ámbar para
los avisos, rosa para el error, grises para lo neutro. El banco de trabajo donde vive el
circuito, en panel oscuro, para que contraste proyectado: cables a 0 en gris azulado, a 1 en
verde, y el LED encendido con halo. Tarjetas con borde suave y sombra ligera. Todo en español
de España, con tuteo al alumnado.

# Control
Antes de darlo por terminado: ejecútalo, recorre los tres modos entero y comprueba a mano la
lógica de las seis tablas de verdad. Cuando acabes, dime qué has dado por supuesto que yo no
te había dicho.`}
      />

      {/* ── Qué mirar ──────────────────────────────────────────────────── */}
      <H2 ante="Qué mirar" tono="verde">
        Las cuatro frases del prompt que hacen todo el trabajo
      </H2>
      <Lista
        tono="verde"
        items={[
          <>
            <b>«Corrección inmediata con explicación del porqué en cada fila fallada: no solo
            mal».</b> Sin esa frase, lo que recibes es un test con un marcador. Con ella, recibes
            material de aula. <b>La pedagogía hay que pedirla explícitamente</b> — nunca viene sola.
          </>,
          <>
            <b>«Sin librerías externas, sin CDN […] porque en el aula 12 no hay wifi».</b> Una
            restricción con su motivo pegado. Sin ella, vendría con tres dependencias de internet y
            el día que falle la red se cae la clase entera.
          </>,
          <>
            <b>«Cada enunciado tiene que corresponder EXACTAMENTE con la tabla que se pide».</b>{" "}
            Aquí es donde se juega la credibilidad delante de alumnado y de tribunal: un enunciado
            que no cuadra con su tabla lo detecta el primer alumno espabilado.
          </>,
          <>
            <b>«Dime qué has dado por supuesto que yo no te había dicho».</b> El bloque de control.
            Es la pregunta que te enseña dónde estaba flojo tu encargo, y la que convierte el
            siguiente prompt en uno mejor.
          </>,
        ]}
      />

      <Nota tono="ambar" titulo="Lo que el prompt no evitó, y por qué hay que verificar">
        Ni el mejor encargo sustituye al <b>paso 3 del ciclo agéntico</b>. Aquí hubo que ejecutar la
        aplicación entera, jugar los seis retos y repasar las tablas una por una. En el camino
        aparecieron cosas que corregir: dos rótulos del circuito que se pisaban al propagar los
        valores, y un fallo de diseño más serio —irse a repasar una tabla borraba el progreso de los
        retos, justo lo que la propia aplicación anima a hacer—. Eso no lo detecta nadie leyendo
        código: se detecta usándolo.
      </Nota>

      <H2 ante="Para tu aula" tono="azul">
        Cómo la conviertes en la tuya
      </H2>
      <Rejilla cols={3}>
        <Tarjeta tono="azul" titulo="Cambia el contexto de los retos">
          Los seis enunciados son de vivienda, invernadero, ascensor, coche, taller y obra. Si tu
          centro es de una comarca industrial concreta, píde los seis con contextos de ahí: se
          enganchan mucho más.
        </Tarjeta>
        <Tarjeta tono="verde" titulo="Súbela de nivel">
          Para 1.º de Bachillerato: pide que añada simplificación por álgebra de Boole y mapas de
          Karnaugh de tres variables, con los pasos visibles. Es una petición y dos minutos.
        </Tarjeta>
        <Tarjeta tono="ambar" titulo="Publícala">
          Con GitHub Pages tienes un enlace que se abre en cualquier ordenador sin instalar nada. El
          paso a paso está en el{" "}
          <Dentro href="/ponencia-tecnologia/03-laboratorio/">bloque 5</Dentro>.
        </Tarjeta>
      </Rejilla>

      <NavPie
        atras={{ titulo: "5 · El laboratorio", ruta: "/ponencia-tecnologia/03-laboratorio/" }}
        adelante={{
          titulo: "Ensayo de tracción · 1.º Bach",
          ruta: "/ponencia-tecnologia/app-ensayo-traccion/",
        }}
      />
    </div>
  );
}
