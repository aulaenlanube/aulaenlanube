import Link from "@/components/Link";
import type { NavLink } from "@/lib/content";

export default function CourseNav({ prev, next }: { prev?: NavLink; next?: NavLink }) {
  if (!prev && !next) return null;
  return (
    <nav className="mt-10 grid grid-cols-2 gap-3 border-t border-zinc-200 pt-6 text-sm">
      <div>
        {prev && (
          <Link
            href={prev.path}
            className="flex flex-col rounded-lg border border-zinc-200 p-3 transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            <span className="text-xs text-zinc-400">← Anterior</span>
            <span className="line-clamp-2 font-medium text-zinc-800">{prev.title}</span>
          </Link>
        )}
      </div>
      <div className="text-right">
        {next && (
          <Link
            href={next.path}
            className="flex flex-col items-end rounded-lg border border-zinc-200 p-3 transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            <span className="text-xs text-zinc-400">Siguiente →</span>
            <span className="line-clamp-2 font-medium text-zinc-800">{next.title}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
