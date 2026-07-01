import JsonLd from "./JsonLd";
import { SITE_URL } from "@/lib/content";
import { breadcrumbLd } from "@/lib/seo";
import type { LegalEntry } from "@/lib/content";

const proseCls =
  "prose prose-zinc mt-8 max-w-none prose-headings:scroll-mt-24 prose-a:text-blue-600 prose-h2:text-2xl prose-h2:font-semibold prose-h2:text-slate-700 prose-h3:text-lg prose-table:text-sm prose-th:text-left";

function fmt(d?: string): string {
  if (!d) return "";
  const dt = new Date(`${d}T00:00:00`);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
}

export default function LegalTemplate({ entry }: { entry: LegalEntry }) {
  const crumbs = [{ path: entry.path, title: entry.title }];
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: entry.title,
    description: entry.description,
    url: SITE_URL + entry.path,
    inLanguage: "es-ES",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    dateModified: entry.updated,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-10">
      <article className="min-w-0">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          {entry.title}
        </h1>
        {entry.updated && (
          <p className="mt-2 text-sm text-zinc-500">
            Última actualización:{" "}
            <time dateTime={entry.updated}>{fmt(entry.updated)}</time>
          </p>
        )}
        <div className={proseCls} dangerouslySetInnerHTML={{ __html: entry.html }} />
      </article>
      <JsonLd data={[webPageLd, breadcrumbLd(crumbs)]} />
    </div>
  );
}
