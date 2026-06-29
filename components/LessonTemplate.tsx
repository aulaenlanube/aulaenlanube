import Link from "next/link";
import YouTubeLite from "./YouTubeLite";
import Breadcrumbs from "./Breadcrumbs";
import CourseNav from "./CourseNav";
import JsonLd from "./JsonLd";
import ProductBlock from "./ProductBlock";
import { getBreadcrumbs, getProducts } from "@/lib/content";
import { videoLd, breadcrumbLd } from "@/lib/seo";
import type { LessonEntry } from "@/lib/content";

export default function LessonTemplate({ entry }: { entry: LessonEntry }) {
  const l = entry.lesson;
  const crumbs = getBreadcrumbs(l.path);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <Breadcrumbs items={crumbs} />

      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
        {l.title}
      </h1>
      {entry.parent && (
        <p className="mt-2 text-sm text-zinc-500">
          Parte del curso{" "}
          <Link href={entry.parent.path} className="font-medium text-blue-600 hover:underline">
            {entry.parent.title}
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

      {entry.siblings.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
              Más de este curso
            </h2>
            {entry.parent && (
              <Link href={entry.parent.path} className="text-sm text-blue-600 hover:underline">
                Ver curso completo →
              </Link>
            )}
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {entry.siblings.slice(0, 8).map((s) => (
              <li key={s.path}>
                <Link
                  href={s.path}
                  className="flex items-center gap-3 rounded-lg border border-zinc-200 p-2 transition hover:bg-zinc-50"
                >
                  {s.videoId && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://i.ytimg.com/vi/${s.videoId}/hqdefault.jpg`}
                      alt=""
                      className="h-12 w-20 flex-none rounded object-cover"
                    />
                  )}
                  <span className="line-clamp-2 text-sm font-medium text-zinc-800">
                    {s.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <ProductBlock products={getProducts(2)} title="También te puede interesar" compact />

      <JsonLd data={[videoLd(l), breadcrumbLd(crumbs)]} />
    </article>
  );
}
