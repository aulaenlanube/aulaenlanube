import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import ProductBlock from "./ProductBlock";
import ArticleSidebar from "./ArticleSidebar";
import { getBreadcrumbs, getProducts } from "@/lib/content";
import { articleLd, breadcrumbLd } from "@/lib/seo";
import type { ArticleEntry } from "@/lib/content";

function fmt(d?: string): string {
  if (!d) return "";
  const dt = new Date(d.replace(" ", "T"));
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
}

export default function ArticleTemplate({ entry }: { entry: ArticleEntry }) {
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
          <div
            className="prose prose-zinc mt-8 max-w-none prose-a:text-blue-600 prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: entry.html }}
          />
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
