import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import { getBreadcrumbs } from "@/lib/content";
import { breadcrumbLd } from "@/lib/seo";
import type { CourseIndexEntry } from "@/lib/content";

export default function CourseIndexTemplate({ entry }: { entry: CourseIndexEntry }) {
  const crumbs = getBreadcrumbs(entry.path);
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        {entry.title}
      </h1>
      {entry.intro && <p className="mt-3 text-zinc-600">{entry.intro}</p>}
      <p className="mt-2 text-sm text-zinc-400">{entry.items.length} elementos</p>

      <ul className="mt-6 divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200">
        {entry.items.map((it) => (
          <li key={it.path}>
            <Link href={it.path} className="flex items-center gap-4 p-3 transition hover:bg-zinc-50">
              {it.videoId ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://i.ytimg.com/vi/${it.videoId}/hqdefault.jpg`}
                  alt=""
                  className="h-12 w-20 flex-none rounded object-cover"
                />
              ) : (
                <span className="flex h-12 w-20 flex-none items-center justify-center rounded bg-zinc-100 text-lg">
                  {it.isSection ? "📚" : "📄"}
                </span>
              )}
              <span className="min-w-0">
                <span className="block truncate font-medium text-zinc-900">{it.title}</span>
                {it.isSection && <span className="text-xs text-zinc-400">Sección</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <JsonLd data={breadcrumbLd(crumbs)} />
    </div>
  );
}
