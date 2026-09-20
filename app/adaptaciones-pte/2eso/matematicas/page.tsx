import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Matemáticas · Números enteros — 2.º ESO · Adaptaciones PTE — Aula en la Nube",
  description:
    "Tres ejercicios típicos de números enteros de 2.º de ESO adaptados en cuatro niveles descendentes: 2º ESO, 1º ESO, 6º y 5º de primaria, con solución y indicaciones de qué se adapta en cada nivel.",
};

const chip =
  "inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700";

const nivel =
  "inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider";
const n2 = nivel + " border-violet-300 bg-violet-50 text-violet-700";
const n1 = nivel + " border-sky-300 bg-sky-50 text-sky-700";
const n6 = nivel + " border-emerald-300 bg-emerald-50 text-emerald-700";
const n5 = nivel + " border-amber-300 bg-amber-50 text-amber-700";

const tarjeta =
  "mt-8 scroll-mt-24 rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 p-5 shadow-sm sm:p-7";
const sub = "text-sm font-bold uppercase tracking-wide text-zinc-500";
const sol =
  "mt-3 rounded-xl border border-emerald-200 bg-white p-4 text-sm text-zinc-700";
const ad = "mt-2 rounded-xl border border-zinc-200 bg-white/70 p-4 text-[13px] text-zinc-600";

function Solucion({ children }: { children: ReactNode }) {
  return (
    <details className={sol}>
      <summary className="cursor-pointer select-none font-bold text-emerald-700">
        Ver solución
      </summary>
      <div className="mt-2 space-y-1">{children}</div>
    </details>
  );
}

function Adaptacion({ children }: { children: ReactNode }) {
  return (
    <div className={ad}>
      <span className={sub}>🔧 Qué se adapta:</span> {children}
    </div>
  );
}

export default function Pte2EsoMatematicas() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Programación e IA", path: "/zona-programacion/" },
          { title: "Adaptaciones PTE", path: "/adaptaciones-pte/" },
          { title: "2.º ESO", path: "/adaptaciones-pte/2eso/" },
          { title: "Matemáticas", path: "/adaptaciones-pte/2eso/matematicas/" },
        ]}
      />
      <span className={chip}>2.º de ESO · Matemáticas · Números enteros</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Números enteros: un ejercicio, cuatro niveles
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        Tres ejercicios típicos del bloque de <b>números</b> de 2.º de ESO (saberes básicos del
        anexo III del <b>Decreto 107/2022</b>, Comunitat Valenciana: números enteros, recta,
        orden y operaciones en contextos reales). Cada ejercicio se declina en cuatro niveles
        descendentes para que el mismo objetivo de aprendizaje sea accesible. La adaptación es de{" "}
        <b>acceso</b>, no de objetivo: el contexto, la situación y lo que se evalúa son los mismos.
      </p>

      <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-100 p-5 text-sm text-zinc-700">
        <b>Cómo usarlas:</b> el nivel de referencia es 2.º ESO; los tres siguientes son la misma
        situación con más andamiaje (recta precortada, números más pequeños, respuesta guiada),
        pensados para PTE de acceso y medidas de apoyo del <b>Decreto 104/2018</b> y la{" "}
        <b>Orden 20/2019</b>. Puedes imprimir cada tarjeta (botón de abajo) y repartir el mismo
        ejercicio en dos o tres versiones sin que nadie note que «es otro ejercicio»: es el mismo.
      </div>

      {/* ============ EJERCICIO 1: TEMPERATURAS ============ */}
      <section className={tarjeta}>
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          Ejercicio 1 · Temperaturas en la semana
        </h2>
        <p className="mt-1 text-sm text-zinc-600">
          Objetivo: leer, situar y ordenar números enteros en la recta numérica (temperaturas bajo
          cero).
        </p>

        <div className="mt-5">
          <span className={n2}>2.º ESO · nivel de referencia</span>
          <p className="mt-2 text-[15px] text-zinc-800">
            Anota las temperaturas mínimas de una semana de enero en Morella: lunes −3 °C, martes
            0 °C, miércoles −6 °C, jueves 2 °C y viernes −1 °C. <b>a)</b> Ordénalas de más fría a
            menos fría. <b>b)</b> ¿Qué día hizo más calor y qué día más frío? <b>c)</b> Calcula la
            diferencia de temperatura entre el miércoles y el jueves. <b>d)</b> Si el sábado la
            mínima fue de −4 °C y el domingo subió 5 grados, ¿qué temperatura marcó el termómetro?
          </p>
          <Solucion>
            <p><b>a)</b> −6 (miércoles), −3 (lunes), −1 (viernes), 0 (martes), 2 (jueves).</p>
            <p><b>b)</b> Más calor: jueves (2 °C). Más frío: miércoles (−6 °C).</p>
            <p><b>c)</b> 2 − (−6) = 2 + 6 = <b>8 °C</b> de diferencia.</p>
            <p><b>d)</b> −4 + 5 = <b>1 °C</b>.</p>
          </Solucion>
        </div>

        <div className="mt-4">
          <span className={n1}>1.º ESO · adaptación</span>
          <p className="mt-2 text-[15px] text-zinc-800">
            Estas son las temperaturas mínimas de un fin de semana de enero en una montaña de
            Castelló: sábado <b>−2 °C</b> y domingo <b>−5 °C</b>.{" "}
            <b>a)</b> Marcalas en la recta numérica (te la damos impresa). <b>b)</b> ¿Qué día hacía
            más frío? Rodea la respuesta: sábado / domingo. <b>c)</b> El lunes subió a 0 °C.
            ¿Cuántos grados subió desde el domingo?
          </p>
          <Adaptacion>
            Menos datos (2 días en vez de 5), números pequeños, recta impresa para marcar a mano y
            respuesta con opción cerrada en el apartado b. El apartado c mantiene la resta con
            enteros pero con el 0 como referencia.
          </Adaptacion>
          <Solucion>
            <p><b>a)</b> −5 a la izquierda de −2 en la recta.</p>
            <p><b>b)</b> Domingo (−5 °C).</p>
            <p><b>c)</b> De −5 a 0: subió <b>5 grados</b>.</p>
          </Solucion>
        </div>

        <div className="mt-4">
          <span className={n6}>6.º primaria · adaptación</span>
          <p className="mt-2 text-[15px] text-zinc-800">
            Mira el termómetro del patio a las 8 de la mañana: marcaba <b>−2 °C</b>.{" "}
            <b>a)</b> Escribe con número y signo la temperatura de la imagen. <b>b)</b> A las 12 h
            subió 6 grados. Dibuja en la recta el salto y escribe la temperatura del mediodía.{" "}
            <b>c)</b> ¿Era más fría la mañana (−2 °C) o la noche (−4 °C)?
          </p>
          <Adaptacion>
            Una sola magnitud (temperatura) y una sola operación; se añade apoyo visual directo
            (foto del termómetro) y la recta se usa como herramienta, no como dibujo libre. La
            comparación se plantea con lenguaje cotidiano («más fría»).
          </Adaptacion>
          <Solucion>
            <p><b>a)</b> −2 °C.</p>
            <p><b>b)</b> −2 + 6 = <b>4 °C</b>.</p>
            <p><b>c)</b> La noche: −4 °C es más frío que −2 °C.</p>
          </Solucion>
        </div>

        <div className="mt-4">
          <span className={n5}>5.º primaria · adaptación</span>
          <p className="mt-2 text-[15px] text-zinc-800">
            Con la misma foto del termómetro (−2 °C): <b>a)</b> Copia la temperatura y dí en voz
            alta: «dos grados bajo cero». <b>b)</b> En la recta recortada del 0 al 10 y del 0 al
            −10, coloca una pegatina donde estaba el termómetro por la mañana y otra 6 grados más
            arriba. <b>c)</b> Completa: «Al mediodía la temperatura era ___ grados, porque subió 6
            desde −2». Con la mano tapamos la resta; solo suma hacia arriba en la recta.
          </p>
          <Adaptacion>
            Solo sumas hacia arriba en la recta (sin restar con negativos), recta física
            recortable, respuesta con frase a completar y lectura oral del número. Se mantiene el
            objetivo: entender el número negativo como «bajo cero» en una recta.
          </Adaptacion>
          <Solucion>
            <p><b>a)</b> −2 °C.</p>
            <p><b>b)</b> Pegatinas en −2 y en +4.</p>
            <p><b>c)</b> «…era <b>4</b> grados, porque subió 6 desde −2».</p>
          </Solucion>
        </div>
      </section>

      {/* ============ EJERCICIO 2: CUENTA DEL BANCO ============ */}
      <section className={tarjeta}>
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          Ejercicio 2 · La cuenta del banco de Maria
        </h2>
        <p className="mt-1 text-sm text-zinc-600">
          Objetivo: sumar y restar enteros con signos en un contexto de ingresos y gastos (saldo
          posible negativo).
        </p>

        <div className="mt-5">
          <span className={n2}>2.º ESO · nivel de referencia</span>
          <p className="mt-2 text-[15px] text-zinc-800">
            Maria tiene 45 € en su cuenta. En una semana: lunes gasta 62 € en un videojuego;
            miércoles ingresa 20 € del abuelo; viernes gasta 14 € en el cine.{" "}
            <b>a)</b> Escribe cada movimiento como número con signo. <b>b)</b> ¿Cuál es su saldo el
            viernes? <b>c)</b> Interpreta el resultado: si sale negativo, ¿qué significa?{" "}
            <b>d)</b> ¿Cuánto necesita como mínimo el sábado para volver a saldo 0?
          </p>
          <Solucion>
            <p><b>a)</b> +45 (saldo inicial), −62, +20, −14.</p>
            <p><b>b)</b> 45 − 62 + 20 − 14 = <b>−11 €</b>.</p>
            <p><b>c)</b> Está en descubierto: debe 11 € al banco.</p>
            <p><b>d)</b> 11 € exactamente.</p>
          </Solucion>
        </div>

        <div className="mt-4">
          <span className={n1}>1.º ESO · adaptación</span>
          <p className="mt-2 text-[15px] text-zinc-800">
            Maria tiene 40 €. Miércoles: gasta 55 € en un videojuego. Viernes: el abuelo le ingresa
            20 €. <b>a)</b> Rellena la tabla de dos columnas (INGRESOS + / GASTOS −) con los 3
            números. <b>b)</b> Calcula el saldo paso a paso: primero todo junto de 40 + 20 y luego
            el gasto. <b>c)</b> ¿Paga el banco por ella? Escribe la frase: «Maria debe ___ €».
          </p>
          <Adaptacion>
            Tabla estructurada ingresos/gastos (apoyo organizativo), números redondos y más
            pequeños, y cálculo guiado en dos tiempos en vez de una sola cadena de signos.
          </Adaptacion>
          <Solucion>
            <p><b>a)</b> +40, +20 (ingresos) · −55 (gasto).</p>
            <p><b>b)</b> 40 + 20 = 60 · 60 − 55 = <b>5 €</b>… ¡esta vez sí le sobran! Revisa tú mismo:
              ¿y si el gasto hubiera sido 65 €? (<i>variante para el profe: −5 €</i>)</p>
            <p><b>c)</b> En este caso no debe nada: le quedan 5 €.</p>
          </Solucion>
        </div>

        <div className="mt-4">
          <span className={n6}>6.º primaria · adaptación</span>
          <p className="mt-2 text-[15px] text-zinc-800">
            Maria tiene 30 € ahorrados. Gasta 45 €. <b>a)</b> Dibuja la recta del 0 al 50 con una
            marca cada 5 y representa el salto hacia atrás. <b>b)</b> ¿Cuántos euros le faltan?{" "}
            <b>c)</b> Escríbelo con signo: si le faltan 15, se escribe <b>−15 €</b>. Eso es un
            número entero negativo.
          </p>
          <Adaptacion>
            Un solo movimiento (un gasto), la recta se dibuja primero en positivos (más familiar)
            y el negativo aparece al final, como <i>nombre</i> de lo que «falta». Menos términos:
            del 0 al 50.
          </Adaptacion>
          <Solucion>
            <p><b>a)</b> Salto de 45 hacia la izquierda desde el 30: se sale de la recta por debajo del 0.</p>
            <p><b>b)</b> Le faltan <b>15 €</b>.</p>
            <p><b>c)</b> Saldo: <b>−15 €</b>.</p>
          </Solucion>
        </div>

        <div className="mt-4">
          <span className={n5}>5.º primaria · adaptación</span>
          <p className="mt-2 text-[15px] text-zinc-800">
            Con monedas de 5 € sobre la mesa: Maria tiene 6 monedas (30 €) y quiere un juguete que
            vale 9 monedas (45 €). <b>a)</b> Coloca las monedas y las fichas del precio. ¿Cuántas
            monedas le faltan? <b>b)</b> Completa: «A Maria le <i>faltan</i> ___ €». <b>c)</b>
            Copia: «le faltan 15 = saldo −15».
          </p>
          <Adaptacion>
            Manipulativo (monedas y fichas físicas), una única sustracción pequeña resuelta por
            correspondencia «monedas que faltan», y el signo negativo se <i>copia</i> como
            etiqueta final. El concepto sigue presente; la operación, andamiada.
          </Adaptacion>
          <Solucion>
            <p><b>a)</b> Le faltan <b>3 monedas = 15 €</b>.</p>
            <p><b>b)</b> «A Maria le faltan <b>15</b> €».</p>
            <p><b>c)</b> Saldo: <b>−15</b>.</p>
          </Solucion>
        </div>
      </section>

      {/* ============ EJERCICIO 3: ASCENSOR ============ */}
      <section className={tarjeta}>
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          Ejercicio 3 · El ascensor del parking
        </h2>
        <p className="mt-1 text-sm text-zinc-600">
          Objetivo: operaciones encadenadas con enteros y paréntesis (plantas sótano = negativos).
        </p>

        <div className="mt-5">
          <span className={n2}>2.º ESO · nivel de referencia</span>
          <p className="mt-2 text-[15px] text-zinc-800">
            El ascensor está en el sótano 2 (−2). Sube 5 plantas, baja 3 y vuelve a subir 4.{" "}
            <b>a)</b> Escribe la operación con signos y paréntesis. <b>b)</b> ¿En qué planta se
            queda? <b>c)</b> Desde ahí, ¿cuántas plantas debe bajar para llegar al sótano 1 (−1)?{" "}
            <b>d)</b> Un compañero dice: «−2 + 5 − 3 + 4 = 4». ¿Le corriges o le confirmas?
          </p>
          <Solucion>
            <p><b>a)</b> (−2) + 5 − 3 + 4.</p>
            <p><b>b)</b> −2 → +3 → 0 → +4: planta <b>4</b>.</p>
            <p><b>c)</b> 4 − (−1) = 5 plantas hacia abajo.</p>
            <p><b>d)</b> (−2 + 5) = 3 · 3 − 3 = 0 · 0 + 4 = 4. Es <b>correcto</b>: confirma.</p>
          </Solucion>
        </div>

        <div className="mt-4">
          <span className={n1}>1.º ESO · adaptación</span>
          <p className="mt-2 text-[15px] text-zinc-800">
            El ascensor está en el sótano 1 (−1). Sube 4 plantas y luego baja 2.{" "}
            <b>a)</b> Dibuja un edificio con sótanos abajo y planta 0 marcada. <b>b)</b> Sigue el
            recorrido con flechas y escribe el número de cada parada. <b>c)</b> ¿En qué planta se
            queda?
          </p>
          <Adaptacion>
            Dos movimientos en vez de tres, números pequeños, y el edificio dibujado como recta
            numérica vertical (puente entre la recta horizontal y el contexto). Sin apartado de
            paréntesis: se introduce en la siguiente sesión.
          </Adaptacion>
          <Solucion>
            <p><b>b)</b> −1 → +3 → 1.</p>
            <p><b>c)</b> Planta <b>1</b>.</p>
          </Solucion>
        </div>

        <div className="mt-4">
          <span className={n6}>6.º primaria · adaptación</span>
          <p className="mt-2 text-[15px] text-zinc-800">
            El ascensor está en el sótano 2, que se escribe −2. Sube 3 plantas.{" "}
            <b>a)</b> En el dibujo del edificio, traza la flecha hacia arriba. <b>b)</b> Escribe la
            operación: (−2) + 3 = ___ . <b>c)</b> ¿Ha subido por encima de la planta 0? Sí / No.
          </p>
          <Adaptacion>
            Una sola suma, dibujo del edificio con las plantas numeradas impresas, y verificación
            con opción cerrada. El negativo ya aparece escrito (no hay que generarlo).
          </Adaptacion>
          <Solucion>
            <p><b>b)</b> (−2) + 3 = <b>1</b> → planta 1.</p>
            <p><b>c)</b> Sí, está en la planta 1.</p>
          </Solucion>
        </div>

        <div className="mt-4">
          <span className={n5}>5.º primaria · adaptación</span>
          <p className="mt-2 text-[15px] text-zinc-800">
            Maqueta de cartón: el profe coloca el imán (el ascensor) en la planta marcada «−2».{" "}
            <b>a)</b> Sube el imán 3 plantas. <b>b)</b> Di en voz alta: «estoy en la planta 1».{" "}
            <b>c)</b> Pega la etiqueta correcta en cada parada: «−2», «1».
          </p>
          <Adaptacion>
            Todo manipulativo (maqueta + imán + etiquetas), la operación se verbaliza antes que
            escribirse y las etiquetas se eligen de un par fijo. El resultado es el mismo que en
            todos los niveles: de −2 a +1.
          </Adaptacion>
          <Solucion>
            <p><b>b)</b> «Estoy en la <b>planta 1</b>».</p>
            <p><b>c)</b> Etiquetas: parada inicial «−2», final «1».</p>
          </Solucion>
        </div>
      </section>

      <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-[15px] text-emerald-900">
        <b>Nota de coherencia curricular:</b> los tres ejercicios trabajan el mismo saber básico —
        los números enteros y sus operaciones en contextos reales — desde 2.º ESO hasta la
        descentración a Primaria (Decreto 106/2022, 3.er ciclo: «números negativos en contextos
        habituales»). Son <b>adaptaciones de acceso y de andamiaje</b>, no reducción de objetivo:
        en los cuatro niveles el alumno llega a la misma idea. Validação: si la PTE del alumno
        exige también adaptación de contenido, elimina los apartados d) de 2.º ESO (trabajo con
        paréntesis y con la respuesta del compañero) y conserva a/b/c.
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/adaptaciones-pte/2eso/" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← 2.º de ESO
        </Link>
        <PrintButton />
      </div>
    </div>
  );
}
