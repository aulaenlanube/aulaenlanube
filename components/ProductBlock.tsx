import type { Product } from "@/lib/content";

// Degradados de marca por proyecto (los productos no tienen imagen propia).
const GRADIENTS = [
  "from-blue-600 to-indigo-700",
  "from-violet-600 to-fuchsia-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
];

export default function ProductBlock({
  products,
  title = "Otros proyectos del autor",
  compact = false,
}: {
  products: Product[];
  title?: string;
  compact?: boolean;
}) {
  if (!products || products.length === 0) return null;

  const cols =
    compact || products.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="mt-14">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 p-6 dark:from-slate-900 dark:to-blue-950/40 ring-1 ring-blue-100 dark:ring-blue-500/20 sm:p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">{title}</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Estos son otros proyectos creados por Edu Torregrosa. ¡Échales un vistazo!
          </p>
        </div>

        <div className={`mt-6 grid gap-5 ${cols}`}>
          {products.map((p, i) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener"
              className="group flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-sm ring-1 ring-zinc-200 dark:ring-white/10 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:ring-blue-200 dark:hover:ring-blue-500/30"
            >
              <div
                className={`relative flex h-28 items-center justify-center bg-gradient-to-br p-4 ${GRADIENTS[i % GRADIENTS.length]}`}
              >
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt="" className="h-full w-full object-contain" />
                ) : (
                  <span className="text-center text-xl font-extrabold leading-tight text-white drop-shadow-sm">
                    {p.name}
                  </span>
                )}
                {p.badge ? (
                  <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-bold text-slate-700 shadow-sm">
                    {p.badge}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{p.name}</div>
                {p.description ? (
                  <p className="mt-1 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{p.description}</p>
                ) : (
                  <span className="flex-1" />
                )}
                <span className="mt-4 inline-flex w-fit items-center gap-1 rounded-full bg-slate-700 px-5 py-2 text-sm font-semibold text-white transition group-hover:bg-blue-600">
                  {p.cta || "Ver más"}
                  <span className="transition group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
