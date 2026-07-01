import Link from "@/components/Link";
import CourseAside from "./CourseAside";
import YouTubeLite from "./YouTubeLite";
import JsonLd from "./JsonLd";
import { getBreadcrumbs, SITE_URL } from "@/lib/content";
import { videoLd, breadcrumbLd, courseLd } from "@/lib/seo";
import type { HubEntry, HubBlock } from "@/lib/content";

const clean = (t: string) => t.replace(/^▷\s*/, "").trim();

// Tipografía del contenido textual, alineada con el resto de la plataforma.
const proseCls =
  "text-[15px] leading-7 text-zinc-700 [&_a]:text-blue-600 [&_a]:underline [&_b]:font-semibold [&_strong]:font-semibold " +
  "[&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-6 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6 [&_p]:mt-4 [&_p:first-child]:mt-0";

// Rejilla de tarjetas (solo imagen, como en el original: el texto va dentro de
// la propia portada). Enlaza a cada página hija.
function CardGrid({ block }: { block: Extract<HubBlock, { t: "cards" }> }) {
  const cols = block.columns >= 2 ? "sm:grid-cols-2" : "mx-auto max-w-md";
  return (
    <div className={`mt-6 grid grid-cols-1 gap-5 ${cols}`}>
      {block.items.map((c) => (
        <Link
          key={c.path}
          href={c.path}
          className="group block overflow-hidden rounded-xl ring-1 ring-zinc-200 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-blue-300"
        >
          {c.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={c.image} alt={clean(c.title)} loading="lazy" className="w-full object-cover" />
          ) : (
            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-sky-500 to-blue-700 p-4 text-center text-sm font-semibold text-white">
              {clean(c.title)}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

function AlertBox({ block }: { block: Extract<HubBlock, { t: "alert" }> }) {
  const danger = block.variant === "danger" || block.variant === "warning";
  return (
    <div
      className={`mt-6 rounded-lg border-l-4 px-5 py-4 ${
        danger ? "border-red-400 bg-red-50" : "border-blue-400 bg-blue-50"
      }`}
    >
      {block.title && (
        <p className={`font-bold ${danger ? "text-red-700" : "text-blue-700"}`}>{block.title}</p>
      )}
      {block.desc && (
        <p className={`mt-1 text-sm leading-6 ${danger ? "text-red-600" : "text-blue-700"}`}>{block.desc}</p>
      )}
    </div>
  );
}

function Block({ block }: { block: HubBlock }) {
  switch (block.t) {
    case "image":
      return (
        <figure className="mt-6 overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} className="w-full" />
        </figure>
      );
    case "heading":
      return <h2 className="mt-12 text-2xl font-bold text-slate-700 sm:text-3xl">{block.text}</h2>;
    case "html":
      return block.boxed ? (
        <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50/60 px-6 py-5">
          <div className={proseCls} dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      ) : (
        <div className={`mt-6 ${proseCls}`} dangerouslySetInnerHTML={{ __html: block.html }} />
      );
    case "slides":
      return (
        <div className="mt-6 aspect-video w-full overflow-hidden rounded-xl ring-1 ring-zinc-200">
          <iframe
            src={block.url}
            title="Presentación del curso"
            className="h-full w-full"
            loading="lazy"
            allowFullScreen
          />
        </div>
      );
    case "video":
      return (
        <div className="mt-6">
          <YouTubeLite id={block.videoId} title="Presentación del curso" />
        </div>
      );
    case "alert":
      return <AlertBox block={block} />;
    case "cards":
      return <CardGrid block={block} />;
  }
}

// Plantilla para páginas "hub" (índices de curso ricos al estilo Elementor):
// contenido reconstruido en orden + barra lateral, fiel al WordPress original.
export default function HubTemplate({ entry }: { entry: HubEntry }) {
  const blocks = entry.hub;
  const crumbs = getBreadcrumbs(entry.path);
  const hadTriangle = /^▷/.test(entry.title); // solo algunos títulos llevan "▷"

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-10">
        <article className="min-w-0">
          <h1 className="flex items-baseline gap-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            {hadTriangle && <span className="text-blue-500">▷</span>}
            <span>{clean(entry.title)}</span>
          </h1>
          {blocks.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </article>

        <aside className="mt-12 lg:mt-0">
          <CourseAside />
        </aside>
      </div>

      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          courseLd({
            name: clean(entry.title),
            description: entry.description,
            url: SITE_URL + entry.path,
            image: entry.image,
          }),
          ...(entry.lesson ? [videoLd(entry.lesson)] : []),
        ]}
      />
    </div>
  );
}
