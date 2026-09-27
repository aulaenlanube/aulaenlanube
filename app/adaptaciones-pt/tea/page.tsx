import type { Metadata } from "next";
import Link from "@/components/Link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { chip, notaNormativa, tarjetaEnlace } from "./ui";
import { HISTORIAS, BASE } from "./historias-sociales/datos";

export const metadata: Metadata = {
  title: "Alumnado TEA · Adaptaciones PT — Aula en la Nube",
  description:
    "Materiales de apoyo visual para alumnado con trastorno del espectro autista (TEA) en secundaria: historias sociales con pictogramas ARASAAC, en versión chico y chica y descargables en PDF.",
};

export default function AlumnadoTea() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <Breadcrumbs
        items={[
          { title: "Programación e IA", path: "/zona-programacion/" },
          { title: "Adaptaciones PT", path: "/adaptaciones-pt/" },
          { title: "Alumnado TEA", path: "/adaptaciones-pt/tea/" },
        ]}
      />
      <span className={chip}>Atención a la diversidad · TEA</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Alumnado TEA</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Materiales para acompañar al <b>alumnado con trastorno del espectro autista</b> en el
        instituto. Todos siguen el mismo criterio: <b>apoyo visual</b> con pictogramas ARASAAC,
        lenguaje literal y en primera persona, una idea cada vez y el mismo formato de una hoja a
        otra, para que el alumno sepa qué esperar. Se descargan en PDF, listos para imprimir y
        plastificar.
      </p>

      <div className="mt-6 space-y-4">
        <Link href={`${BASE}/`} className={tarjetaEnlace}>
          <div className="w-10 flex-none text-3xl" aria-hidden>
            📘
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-800">Historias sociales</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Cuentos cortos que explican una situación del día a día —qué pasa, qué puedo sentir y
              qué puedo hacer— para anticiparla y responder con calma. {HISTORIAS.length === 1 ? "1 historia" : `${HISTORIAS.length} historias`}{" "}
              disponible{HISTORIAS.length === 1 ? "" : "s"}, en versión chico y chica.
            </p>
            <div className="mt-2 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Disponible →</div>
          </div>
        </Link>
      </div>

      <div className={notaNormativa}>
        <b>Marco (Comunitat Valenciana):</b> Decreto 104/2018, de 27 de julio (principios de
        equidad e inclusión) y Orden 20/2019, de 30 de abril (organización de la respuesta
        educativa para la inclusión). Los apoyos visuales y las historias sociales forman parte de
        la respuesta personalizada del alumno y conviene acordarlos con orientación y con la
        familia.
      </div>
    </div>
  );
}
