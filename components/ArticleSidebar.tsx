import Link from "@/components/Link";
import SearchBox from "./SearchBox";
import { getRecentPosts } from "@/lib/content";

// Barra lateral de las páginas de artículo: buscador + "Últimas publicaciones"
// (posts recientes con su miniatura), como en el WordPress original.
export default function ArticleSidebar({ currentPath }: { currentPath?: string }) {
  const recent = getRecentPosts(6).filter((p) => p.path !== currentPath).slice(0, 5);
  return (
    <div className="space-y-8 lg:sticky lg:top-20">
      <SearchBox />

      {recent.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Últimas publicaciones
          </h2>
          <ul className="mt-4 space-y-4">
            {recent.map((p) => (
              <li key={p.path}>
                <Link href={p.path} className="group flex gap-3">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="h-16 w-24 flex-none rounded-md object-cover"
                    />
                  ) : (
                    <div className="h-16 w-24 flex-none rounded-md bg-gradient-to-br from-sky-500 to-blue-700" />
                  )}
                  <span className="text-sm font-semibold leading-snug text-blue-700 group-hover:underline">
                    {p.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
