import Link from "@/components/Link";
import type { NavLink } from "@/lib/content";

const linkCls =
  "rounded hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600";

export default function Breadcrumbs({ items }: { items: NavLink[] }) {
  if (!items || items.length === 0) return null;
  return (
    <nav aria-label="Migas de pan" className="mb-4 text-xs text-zinc-500">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className={linkCls}>
            Inicio
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1">
            <span aria-hidden>/</span>
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-zinc-700">
                {c.title}
              </span>
            ) : (
              <Link href={c.path} className={linkCls}>
                {c.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
