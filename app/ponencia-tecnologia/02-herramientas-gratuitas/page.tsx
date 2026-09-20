import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PromptBlock from "@/components/PromptBlock";

export const metadata: Metadata = {
  title: "Sección 2 · Tu kit gratuito — Ponencia Tecnología — Aula en la Nube",
  description:
    "Lo que hicimos juntos: las 3 capas de Copilot funcionando en tu portátil — la de tu licencia Education, la de web como red de emergencia, y GitHub Copilot en VS Code con modo agente. Instalación, límites reales y el prompt de rol.",
};

const chip =
  "inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700";

export default function PonenciaS2() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Programación e IA", path: "/zona-programacion/" },
          { title: "Ponencia Tecnología", path: "/ponencia-tecnologia/" },
          { title: "Sección 2", path: "/ponencia-tecnologia/02-herramientas-gratuitas/" },
        ]}
      />
      <span className={chip}>Sección 2 · Tu kit gratuito</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Tu kit gratuito: las 3 capas funcionando
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        El objetivo de esta sección era que salieras <b>con las 3 capas funcionando a la vez</b>:
        una de trabajo diario (el Copilot de tu licencia), una de respaldo (Copilot web) y la que se
        programa (VS Code + agente). «Copilot» suena a lo mismo — no lo es—. Aquí tienes cada una
        para donde debe ir y cómo la dejamos configurada en tu portátil.
      </p>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Capa 1 · El de tu licencia: Copilot Chat + Designer (M365 para Educación)</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        Tu centro tiene <b>Microsoft 365 para Educación</b> — la gran mayoría en C. Valenciana — y
        dentro viene <b>Copilot Chat + Designer sin coste adicional</b>. Es tu capa de trabajo diario,
        la que usaremos toda la sesión:
      </p>
      <ul className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <li>• <b>Chat de trabajo:</b> resumir temas, generar supuestos, reformular objetivos al lenguaje de la LOMLOE («competencia…», «criterio de evaluación de…»). Es el 80 % del trabajo mental del opositor: todo lo del bloque 1 se hace aquí.</li>
        <li>• <b>Designer:</b> genera imágenes y presentaciones desde texto. Si te piden material didáctico, es oro.</li>
        <li>• <b>Excel/Power BI:</b> preguntas de datos en lenguaje natural («¿tendencia de estos consumos?»), para los bloques de energía o sistemas de control.</li>
      </ul>
      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <b>Lo que comprobaste en directo:</b> <code>microsoft365.com</code> → Copilot. Si tu centro
        tiene la oferta paga de Copilot para Educación (desde 2025, ~18 $/usuario/mes), verás más
        funciones; <b>no dependas de nada que no puedas reproducir en cualquier PC</b>. Lo que
        siempre funciona es Copilot Chat + Designer — con eso es suficiente para la práctica.
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Capa 2 · Copilot web de Microsoft (tu red de emergencia)</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        El que se abre sin licencia con cuenta de Microsoft personal. Gratis, pero <b>no lo uses
        como principal</b>: no ve tus archivos (hay que pegárselos), su memoria es corta y para lo
        que ya hace, existen 50 herramientas iguales. Quédate 20 minutos para que tu cuenta personal
        esté lista: si en el examen te cae la red del tribunal, este sigue vivo.
      </p>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">Capa 3 · GitHub Copilot en VS Code (el que programa)</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        Aquí está la que <b>cambia tu parte práctica</b>, y la que más impresiona en la defensa
        oral. La dejamos configurada así en tu portátil:
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">Lo que hicimos juntos (tu instalación quedó así)</h3>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-zinc-600">
            <li>Cuenta de <b>GitHub</b> (github.com, 2 min) — la misma que usará el examen.</li>
            <li><b>VS Code</b> instalado (code.visualstudio.com).</li>
            <li>Extensión <b>GitHub Copilot</b> instalada y logueada con tu cuenta.</li>
            <li>Carpeta de trabajo <code>~/ponencia/quiz</code> abierta, con terminal lista.</li>
          </ol>
          <p className="mt-2 text-xs text-zinc-500">
            ¿Falló algo en la sesión? Repite pasos aquí — el resultado final debe ser la carpeta
            abierta y el chat de Copilot visible a la derecha.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold">Tus números (plan gratuito)</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600">
            <li><b>2.000 autocompletados</b> y <b>50 peticiones de chat agéntico</b> al mes — para estudiar + 1 proyecto, de sobra.</li>
            <li>El agente trabaja en <b>la carpeta del proyecto</b>: no ve el resto de tu disco.</li>
            <li><b>Pide paso a paso</b>, no «hazlo todo»: cada petición larga consume más.</li>
            <li>Si te quedas corto de un mes, avísame entre sesiones y lo resolvemos con otras keys gratuitas.</li>
          </ul>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">El prompt de rol: tu firma profesional</h2>
      <p className="mt-2 text-[15px] text-zinc-700">
        Antes del laboratorio, guardaste este prompt en las 3 capas (pega en el chat y listo). Es
        la diferencia entre «le he preguntado a la IA» y «la he dirigido» — <b>toda petición
        seria empieza con él</b> y cambia el encargo:
      </p>
      <PromptBlock text={`# Rol
Eres experto en [ÁREA DEL TEMA QUE ESTOY PREPARANDO, p. ej. "instalaciones eléctricas y normativa de edificaciones"].

# Contexto
Oposición de Tecnología (Secundaria, RD 276/2007), C. Valenciana.
Lo que pidas debe poder defenderse delante de un tribunal técnico:
cero relleno, números con unidades, normativa con número y año.

# Reglas de respuesta
1) Nunca inventes normativa: si no estás seguro, marca "[COMPROBAR]".
2) Si pido algo demasiado grande, dime "pídemelo en X pasos" y no empieces.
3) Estructura: respuesta corta → desarrollo → 3 preguntas incómodas de un vocal
   que me hagan responder antes de que sigas.

# Mi encargo
[PEGA AQUÍ TU PEDIDO: tema, suposición, programación didáctica, código...]`}/>
      <p className="mt-3 text-sm text-zinc-600">
        Cómo lo trabajas: sustituye el <code>[ÁREA…]</code> y el <code>[PEGA AQUÍ…]</code> en cada
        petición. El resto ya es tuyo — no lo cambies (las 3 reglas son lo que separa una respuesta
        de opositor de una respuesta de estudiante).
      </p>

      <h2 className="mt-8 text-xl font-extrabold tracking-tight">✏️ Tu material de repaso</h2>
      <ul className="mt-3 space-y-2 text-[15px] text-zinc-700">
        <li>• <b>Hoy mismo:</b> completa la instalación que se te quedó a medio (capas 1–3) con los pasos de arriba. 15 min.</li>
        <li>• <b>Dentro de 24 h:</b> con el prompt de rol + tu área, pide algo nuevo (p. ej. «compara el RD 276/2007 con lo relevante de LOMLOE en 1 página»). Comprueba si respondió con las 3 reglas: si no marcó [COMPROBAR] algo, tu prompt quedó incompleto — ajústalo.</li>
        <li>• <b>Antes de la práctica:</b> ten las 3 capas verificadas en un PC que no sea el tuyo (p. ej. el de casa) — el día del examen no hay segunda oportunidad.</li>
      </ul>

      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-[15px] text-emerald-900">
        <b>Cierre de la sección:</b> tienes 3 copilots funcionando y una firma de prompt. Ahora sí,
        laboratorio — la capa 3 se pone a trabajar en serio.
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-5">
        <Link href="/ponencia-tecnologia/01-introduccion/" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-zinc-50">
          ← Sección 1
        </Link>
        <Link href="/ponencia-tecnologia/03-laboratorio/" className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
          Sección 3 · Tu laboratorio →
        </Link>
      </div>
    </div>
  );
}
