import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import ProductBlock from "./ProductBlock";
import ArticleSidebar from "./ArticleSidebar";
import ExerciseCard from "./ExerciseCard";
import { getBreadcrumbs, getProducts } from "@/lib/content";
import { articleLd, breadcrumbLd } from "@/lib/seo";
import type { ExerciseEntry } from "@/lib/content";

function fmt(d?: string): string {
  if (!d) return "";
  const dt = new Date(d.replace(" ", "T"));
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
}

// Plantilla de páginas de "ejercicios resueltos" (zona de programación): intro
// teórica + tarjetas de ejercicio con solución desplegable y código resaltado.
// Comparte la maqueta de los artículos (2 columnas + barra lateral) para
// mantener la coherencia del sitio.
export default function ExercisesTemplate({ entry }: { entry: ExerciseEntry }) {
  const crumbs = getBreadcrumbs(entry.path);
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <Breadcrumbs items={crumbs} />
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-10">
        <article className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {entry.title}
          </h1>
          {entry.date && <p className="mt-2 text-sm text-zinc-500">{fmt(entry.date)}</p>}
          {entry.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={entry.image} alt="" className="mt-6 w-full rounded-xl object-cover" />
          )}

          {entry.intro && (
            <div
              className="prose prose-zinc mt-8 max-w-none prose-a:text-blue-600 prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: entry.intro }}
            />
          )}

          {entry.exercises.map((ex) => (
            <ExerciseCard
              key={ex.n}
              title={ex.title}
              statementHtml={ex.statementHtml}
              code={ex.code}
              lines={ex.lines}
              lang={ex.lang}
            />
          ))}

          <ProductBlock products={getProducts(3)} />
        </article>

        <aside className="mt-12 lg:mt-0">
          <ArticleSidebar currentPath={entry.path} />
        </aside>
      </div>
      <JsonLd data={[articleLd(entry), breadcrumbLd(crumbs)]} />
    </div>
  );
}
