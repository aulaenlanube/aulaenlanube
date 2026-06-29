import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import ProductBlock from "./ProductBlock";
import { getBreadcrumbs, getProducts } from "@/lib/content";
import { breadcrumbLd } from "@/lib/seo";
import type { ArticleEntry } from "@/lib/content";

const clean = (t: string) => t.replace(/^▷\s*/, "").trim();

// Réplica de las landings "friki" del original: rejilla de tarjetas de producto
// de afiliado (imagen + título + botón "VER PRODUCTO"), igual que el Elementor
// original (4 columnas en escritorio).
export default function ProductGridTemplate({ entry }: { entry: ArticleEntry }) {
  const crumbs = getBreadcrumbs(entry.path);
  const cards = entry.cards ?? [];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        {entry.title}
      </h1>

      {entry.intro && (
        <div
          className="prose prose-zinc mt-4 max-w-none prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: entry.intro }}
        />
      )}

      {entry.subzones && entry.subzones.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {entry.subzones.map((s) => (
            <Link
              key={s.path}
              href={s.path}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-blue-300 hover:text-blue-700"
            >
              {s.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.image} alt="" className="h-6 w-6 rounded-full object-cover" />
              )}
              {clean(s.title)}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((c, i) => (
          <div
            key={i}
            className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex aspect-square items-center justify-center bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.src}
                alt={c.title}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 border-t border-zinc-100 p-3">
              <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-zinc-800">
                {c.title}
              </h3>
              <a
                href={c.href}
                target="_blank"
                rel="nofollow noopener sponsored"
                className="mt-auto rounded-lg bg-amber-400 px-3 py-2 text-center text-sm font-bold text-zinc-900 shadow-sm transition hover:bg-amber-300"
              >
                VER PRODUCTO
              </a>
            </div>
          </div>
        ))}
      </div>

      <ProductBlock products={getProducts(3)} title="Mis proyectos" />
      <JsonLd data={[breadcrumbLd(crumbs)]} />
    </div>
  );
}
