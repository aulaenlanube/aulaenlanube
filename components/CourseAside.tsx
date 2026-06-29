import Link from "@/components/Link";
import SearchBox from "./SearchBox";
import { getLatestCourses } from "@/lib/content";
import { SOCIAL } from "@/lib/social";

// Banner de la plataforma del autor OposicionesIA.com (sustituye al antiguo
// banner publicitario de terceros).
function OposicionesIaBanner() {
  return (
    <a
      href="https://oposicionesia.com/"
      target="_blank"
      rel="noopener"
      className="block overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 p-5 text-center text-white shadow-md ring-1 ring-slate-700 transition hover:ring-cyan-500/50"
    >
      <div className="text-[10px] font-semibold uppercase tracking-widest text-cyan-400">
        Recomendado · Edu Torregrosa
      </div>
      <div className="mt-2 text-2xl font-extrabold tracking-tight">
        Oposiciones<span className="text-cyan-400">IA</span>
      </div>
      <p className="mt-2 text-sm text-slate-300">
        Aprueba tu oposición con la potencia de la <strong>IA personalizada</strong>.
      </p>
      <ul className="mx-auto mt-3 w-fit space-y-1 text-left text-[13px] text-slate-200">
        <li>✓ Agentes IA por especialidad</li>
        <li>✓ +90.000 plazas por comunidad</li>
        <li>✓ Basado en la legislación oficial</li>
      </ul>
      <span className="mt-4 inline-block rounded-full bg-cyan-500 px-5 py-2 text-sm font-bold text-slate-900 transition hover:bg-cyan-400">
        Quiero mi plaza →
      </span>
    </a>
  );
}

export default function CourseAside() {
  const latest = getLatestCourses(4);
  return (
    <div className="space-y-7 lg:sticky lg:top-20">
      {/* Redes */}
      <div className="flex justify-center gap-3">
        {SOCIAL.map((s) => (
          <a
            key={s.name}
            href={s.u}
            target="_blank"
            rel="noopener"
            aria-label={s.name}
            title={s.name}
            className="flex h-9 w-9 items-center justify-center text-zinc-500 transition hover:text-blue-600"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
              <path d={s.d} />
            </svg>
          </a>
        ))}
      </div>

      <OposicionesIaBanner />

      <SearchBox />

      {latest.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Últimos cursos
          </h3>
          <div className="mt-3 space-y-3">
            {latest.map((c) => (
              <Link
                key={c.path}
                href={c.path}
                className="group block overflow-hidden rounded-lg ring-1 ring-zinc-200 transition hover:ring-blue-300"
              >
                {c.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.image} alt={c.title} loading="lazy" className="w-full object-cover" />
                ) : (
                  <div className="flex h-24 items-center justify-center bg-gradient-to-br from-sky-500 to-blue-700 p-2 text-center text-sm font-semibold text-white">
                    {c.title}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
