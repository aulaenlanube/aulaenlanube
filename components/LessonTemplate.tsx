import Link from "@/components/Link";
import YouTubeLite from "./YouTubeLite";
import Breadcrumbs from "./Breadcrumbs";
import CourseNav from "./CourseNav";
import JsonLd from "./JsonLd";
import ProductBlock from "./ProductBlock";
import { getBreadcrumbs, getProducts } from "@/lib/content";
import { videoLd, breadcrumbLd } from "@/lib/seo";
import type { LessonEntry } from "@/lib/content";

function clean(t: string): string {
  return t.replace(/^▷\s*/, "").trim();
}

function CourseSidebar({ entry }: { entry: LessonEntry }) {
  if (entry.courseList.length < 2) return null;
  return (
    <div className="rounded-xl border border-zinc-200 lg:sticky lg:top-20">
      <div className="border-b border-zinc-100 p-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
          Lecciones del curso
        </div>
        {entry.parent && (
          <Link href={entry.parent.path} className="line-clamp-2 text-sm font-medium text-blue-600 hover:underline">
            {clean(entry.parent.title)}
          </Link>
        )}
      </div>
      <ol className="max-h-[65vh] overflow-y-auto p-2 text-sm">
        {entry.courseList.map((c) => (
          <li key={c.path}>
            <Link
              href={c.path}
              aria-current={c.current ? "page" : undefined}
              className={
                "flex gap-2 rounded px-2 py-1.5 " +
                (c.current
                  ? "bg-blue-50 font-semibold text-blue-700"
                  : "text-zinc-600 hover:bg-zinc-50")
              }
            >
              <span className="text-zinc-400">{c.n}.</span>
              <span className="line-clamp-2">{clean(c.title)}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function LessonTemplate({ entry }: { entry: LessonEntry }) {
  const l = entry.lesson;
  const crumbs = getBreadcrumbs(l.path);

  const hasSidebar = entry.courseList.length >= 2;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <Breadcrumbs items={crumbs} />
      <div className={hasSidebar ? "lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-8" : ""}>
        <article className="min-w-0">
          {/* El contenido ocupa todo el ancho disponible (con o sin barra). */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">{l.title}</h1>
            {entry.parent && (
              <p className="mt-2 text-sm text-zinc-500">
                Parte del curso{" "}
                <Link href={entry.parent.path} className="font-medium text-blue-600 hover:underline">
                  {clean(entry.parent.title)}
                </Link>
              </p>
            )}

            <div className="mt-6">
              <YouTubeLite id={l.videoId} title={l.title} />
            </div>

            {entry.bodyHtml && (
              <div
                className="mt-8 text-[15px] leading-7 text-zinc-700 [&_a]:text-blue-600 [&_a]:underline [&_b]:font-semibold [&_del]:opacity-60 [&_p]:mt-4"
                dangerouslySetInnerHTML={{ __html: entry.bodyHtml }}
              />
            )}

            <CourseNav prev={entry.prev} next={entry.next} />
          </div>
        </article>

        {hasSidebar && (
          <aside className="mt-10 lg:mt-0">
            <CourseSidebar entry={entry} />
          </aside>
        )}
      </div>

      {/* Proyectos del autor: a todo el ancho para darles protagonismo. */}
      <ProductBlock products={getProducts(2)} />

      <JsonLd data={[videoLd(l), breadcrumbLd(crumbs)]} />
    </div>
  );
}
