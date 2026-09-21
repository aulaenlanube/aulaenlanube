import type { Metadata } from "next";
import PromptBlock from "@/components/PromptBlock";
import EnsayoTraccionApp from "../_apps/ensayo-traccion";
import { Chip, Dentro, H2, Lista, Migas, NavPie, Nota, P, Rejilla, Tarjeta } from "../_ui/piezas";

export const metadata: Metadata = {
  title: "Banco de ensayo de tracción · 1.º de Bachillerato — IA para opositores de Tecnología — Aula en la Nube",
  description:
    "Laboratorio virtual de ensayo de tracción para 1.º de Bachillerato (Tecnología e Ingeniería I): la curva tensión–deformación se dibuja mientras tiras de la probeta, con cinco materiales reales, descarga elástica y plástica y tres retos de dimensionado. Con el prompt exacto que la generó.",
};

export default function AppEnsayoTraccion() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <Migas
        bloque={{ titulo: "Ensayo de tracción", ruta: "/ponencia-tecnologia/app-ensayo-traccion/" }}
      />

      <div className="flex flex-wrap items-center gap-2">
        <Chip tono="ambar">1.º de Bachillerato</Chip>
        <Chip tono="gris">Tecnología e Ingeniería I · Materiales</Chip>
        <Chip tono="verde">Un solo prompt</Chip>
      </div>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
        Banco de ensayo de tracción
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600">
        La curva tensión–deformación no se explica: <b>se descubre tirando</b>. Elige material,
        dimensiona la probeta y aumenta la fuerza hasta romperla — y, sobre todo, prueba el botón de{" "}
        <b>soltar la fuerza</b> a media carga, que es donde está la idea que hay que llevarse. Debajo
        tienes el encargo exacto que generó esta aplicación.
      </p>

      {/* ── La aplicación ──────────────────────────────────────────────── */}
      <div className="mt-8">
        <EnsayoTraccionApp />
      </div>

      {/* ── El prompt ──────────────────────────────────────────────────── */}
      <H2 ante="La receta" tono="ambar">
        El prompt exacto que la generó
      </H2>
      <P>
        Mismo esquema de seis bloques que la otra aplicación, pero fíjate en la diferencia: aquí hay
        una <b>tabla de datos reales dictada línea a línea</b> y un <b>caso numérico de control</b>{" "}
        que el agente tiene que reproducir antes de dar nada por bueno. Cuando hay física de por
        medio, los datos no se delegan: se dictan.
      </P>

      <PromptBlock
        text={`# Rol
Eres ingeniero de software especializado en simulaciones educativas
y conoces la física de materiales a nivel de Bachillerato.

# Contexto
Soy profesor de Tecnología. Necesito un laboratorio virtual para 1.º de Bachillerato,
Tecnología e Ingeniería I, bloque de materiales y resistencia.
La idea pedagógica es que el alumnado DESCUBRA la curva tensión–deformación tirando
de una probeta, en vez de leerla en un libro.
Es una pieza de escaparate: tiene que verse excelente y tener pedagogía real.

# Tarea
Construye «Banco de ensayo de tracción», una aplicación de una sola pantalla.

ESCENA CENTRAL. Una máquina universal de ensayos: mordaza fija arriba, mordaza móvil abajo,
y entre ellas la probeta cilíndrica normalizada. Al aumentar la fuerza, la probeta se alarga
proporcionalmente en pantalla; al entrar en zona plástica el alargamiento se acelera; cerca
de la carga máxima aparece la estricción (el cuello se estrecha visiblemente en el centro);
al superar la deformación de rotura, la probeta se parte en dos con las superficies de
fractura separadas y el ensayo se detiene. Un rótulo permanente indica la fase actual:
«zona elástica», «zona plástica», «estricción», «rotura».

MANDOS. Selector de material; diámetro de la probeta en mm (de 4 a 20); longitud inicial L0
en mm (de 20 a 200); deslizador de fuerza F en kN; y un botón de «ensayo automático» que la
incrementa sola hasta la rotura, con pausa y reinicio.

Usa estos valores reales (de tablas técnicas habituales; cítalos en la app como orientativos):
- Acero S275 (estructural): E = 210 GPa, límite elástico 275 MPa, rotura 430 MPa, alargamiento 23 %.
- Aluminio 6061-T6: E = 69 GPa, límite elástico 275 MPa, rotura 310 MPa, alargamiento 12 %.
- Cobre recocido: E = 117 GPa, límite elástico 70 MPa, rotura 220 MPa, alargamiento 45 %.
- Fundición gris EN-GJL-250: E = 110 GPa, prácticamente sin zona plástica, rotura 250 MPa,
  alargamiento 0,6 % (material frágil: se rompe sin avisar).
- PLA impreso en 3D: E = 3,5 GPa, límite elástico 45 MPa, rotura 50 MPa, alargamiento 5 %.

GRÁFICA σ–ε. A la derecha, unos ejes con σ en MPa y ε en % donde la curva SE VA DIBUJANDO
conforme el alumno tira: no está dibujada de antemano. Sobre ella, un punto que marca el
estado actual. Cuando se superan, se rotulan los hitos: límite elástico, carga máxima y
punto de rotura. Zona elástica y zona plástica sombreadas de distinto color. El tramo
elástico tiene que ser una recta de pendiente E (σ = E · ε) y el plástico una curva que sube
hasta la resistencia a tracción y luego baja ligeramente hasta la rotura — salvo la fundición
gris, que rompe en plena recta elástica.

LECTURAS EN VIVO. Un panel de instrumentos con: área de la sección A = π·d²/4 en mm²,
tensión σ = F/A en MPa, alargamiento ΔL en mm, deformación unitaria ε = ΔL/L0 en %, y el
coeficiente de seguridad respecto del límite elástico (n = σe/σ). Cada magnitud con su
símbolo, su fórmula y su unidad, siempre visibles: es contenido de examen.

EL BOTÓN CLAVE: «SUELTA LA FUERZA». En cualquier momento el alumno puede pulsarlo y la
aplicación simula la descarga. Si estaba en zona elástica, la probeta vuelve EXACTAMENTE a su
longitud inicial y la app lo explica. Si estaba en zona plástica, queda deformación
permanente: la probeta se queda más larga, la gráfica dibuja la recta de descarga paralela al
tramo elástico hasta el eje, y se rotula la deformación remanente. Esta es la idea central
de todo el bloque: hazla protagonista.

TRES RETOS DE DIMENSIONADO, con corrección y razonamiento paso a paso:
1. Un tirante de acero S275 debe soportar 50 kN con coeficiente de seguridad 2.
   ¿Qué diámetro mínimo necesita?
2. Con una probeta de 10 mm de diámetro, ¿qué material aguanta más fuerza antes de
   deformarse permanentemente?
3. Una pieza de PLA impreso sustituye a una de aluminio en una fijación que soporta 3 kN.
   ¿Qué diámetro necesita cada una para no superar su límite elástico?

# Reglas
1) Una sola pantalla, sin recarga y sin enrutado.
2) Sin librerías externas, sin CDN y sin imágenes externas: todo gráfico en SVG.
3) Accesible: el deslizador es un <input type="range"> real y los campos numéricos son
   <input type="number"> con min/max/step y su etiqueta; los estados relevantes se anuncian
   con aria-live; la gráfica es role="img" con una descripción de la curva y del estado.
4) Responsive: legible en un móvil de 360 px y espectacular proyectado en 1080p.
   Nunca puede haber scroll horizontal de la página.
5) No bases información SOLO en una animación: el estado siempre está también escrito.
6) Números en español: coma decimal y unidades siempre presentes, separadas del número.
7) LAS UNIDADES TIENEN QUE CUADRAR. σ [MPa] = F [N] / A [mm²]; 1 kN = 1000 N;
   E en GPa = 1000 MPa; ε adimensional, mostrado en %.

# Formato
Azul para la zona elástica, ámbar para la plástica, rosa para la rotura, verde para el
acierto. La máquina y la gráfica viven en un panel oscuro para que contrasten proyectadas.
Geometría SVG calculada con constantes: nada se solapa ni se sale del viewBox, y ningún
texto por debajo de 13 px efectivos.

# Control
Antes de darlo por terminado, comprueba a mano este caso y dime el resultado:
acero S275, d = 10 mm, L0 = 100 mm, F = 20 kN
→ A = 78,54 mm²; σ = 254,6 MPa (aún elástico, n = 1,08); ε = 0,121 %; ΔL = 0,121 mm.
Si tus cálculos no reproducen esto, están mal.
Dime también qué has dado por supuesto que yo no te había dicho.`}
      />

      {/* ── Qué mirar ──────────────────────────────────────────────────── */}
      <H2 ante="Qué mirar" tono="verde">
        Lo que cambia cuando hay física de por medio
      </H2>
      <Lista
        tono="verde"
        items={[
          <>
            <b>Los datos se dictan, no se piden.</b> Si le dices «usa valores reales de acero»,
            inventa unos plausibles y a menudo incoherentes entre sí. Con la tabla dictada, lo que
            simula es lo que hay en las tablas técnicas que tú has elegido.
          </>,
          <>
            <b>El caso numérico de control es el mejor invento del prompt.</b> Un caso resuelto a
            mano, con su resultado escrito, convierte «espero que esté bien» en una comprobación que
            o pasa o no pasa. Cuesta dos minutos de calculadora y te ahorra defender una aplicación
            que calcula mal.
          </>,
          <>
            <b>«Hazla protagonista» dirige la jerarquía visual.</b> La descarga elástica frente a la
            plástica es LA idea del bloque. Si no dices cuál es la idea central, te devuelve todas
            las funciones del mismo tamaño y el alumnado no sabe dónde mirar.
          </>,
          <>
            <b>Las unidades, explícitas en el prompt.</b> Mezclar kN con N o GPa con MPa es el error
            clásico, y la aplicación quedaría preciosa y equivocada por un factor de mil.
          </>,
        ]}
      />

      <Nota tono="ambar" titulo="Dos cosas que salieron al verificar, y que valen como clase">
        Al comprobar los datos aparecieron dos discrepancias que no son un fallo del programa sino
        del propio modelo, y por eso están explicadas dentro de la aplicación. <b>La fundición
        gris:</b> con E = 110 GPa y rotura a 250 MPa, la ley de Hooke da ε = 0,23 %, no el 0,6 % que
        figura en las tablas — porque la fundición se curva desde el origen y no cumple Hooke con
        exactitud. Y el <b>reto 2</b> tiene truco: el acero S275 y el aluminio 6061-T6 comparten
        límite elástico, así que con el mismo diámetro <b>empatan</b>; la diferencia real está en la
        rigidez, en el aviso antes de romper y en el peso. Un empate es mejor pregunta de aula que
        una respuesta cómoda.
      </Nota>

      <H2 ante="Para tu aula" tono="ambar">
        Cómo la conviertes en la tuya
      </H2>
      <Rejilla cols={3}>
        <Tarjeta tono="ambar" titulo="Añade tus materiales">
          Dale la fila de tabla del material que trabajéis en el taller —un latón, un PETG, el acero
          de las varillas que uséis— y lo añade al selector. Una petición.
        </Tarjeta>
        <Tarjeta tono="azul" titulo="Enlázala con el ensayo real">
          Si tenéis máquina de ensayos, la secuencia es imbatible: predicen con la aplicación,
          ensayan de verdad y comparan. La discrepancia entre modelo y realidad es la mejor clase
          del trimestre.
        </Tarjeta>
        <Tarjeta tono="verde" titulo="Llévala a la defensa">
          Es una situación de aprendizaje entera: predicción, experimento, análisis del error y
          dimensionado con coeficiente de seguridad. Y tienes el enlace para que lo abran.
        </Tarjeta>
      </Rejilla>

      <P>
        El proceso completo —de la carpeta vacía al enlace público— está en el{" "}
        <Dentro href="/ponencia-tecnologia/03-laboratorio/">bloque 5</Dentro>.
      </P>

      <NavPie
        atras={{
          titulo: "Lógica digital · 4.º ESO",
          ruta: "/ponencia-tecnologia/app-logica-digital/",
        }}
        adelante={{ titulo: "5 · El laboratorio", ruta: "/ponencia-tecnologia/03-laboratorio/" }}
      />
    </div>
  );
}
