import type { Product } from "@/lib/content";

export default function ProductBlock({
  products,
  title = "Mis proyectos",
  compact = false,
}: {
  products: Product[];
  title?: string;
  compact?: boolean;
}) {
  if (!products || products.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">{title}</h2>
      <div className={"mt-4 grid gap-4 " + (compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3")}>
        {products.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener"
            className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 transition hover:border-zinc-300 hover:shadow-md"
          >
            {p.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt="" className="h-32 w-full object-cover" />
            ) : (
              <div className="flex h-24 items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 px-3 text-center text-base font-bold text-white">
                {p.name}
              </div>
            )}
            <div className="flex flex-1 flex-col p-4">
              {p.badge ? (
                <span className="mb-1 inline-block w-fit rounded bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                  {p.badge}
                </span>
              ) : null}
              <div className="font-semibold text-zinc-900">{p.name}</div>
              {p.description ? <p className="mt-1 text-sm text-zinc-600">{p.description}</p> : null}
              <span className="mt-3 text-sm font-medium text-blue-600 group-hover:underline">
                {p.cta || "Ver más"} →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
