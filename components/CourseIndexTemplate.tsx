import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import { getBreadcrumbs } from "@/lib/content";
import { breadcrumbLd } from "@/lib/seo";
import type { CourseIndexEntry, CourseCard } from "@/lib/content";

const clean = (t: string) => t.replace(/^▷\s*/, "").trim();

// Tarjeta de curso = solo la portada (como en el original /cursos/).
function PortadaCard({ c }: { c: CourseCard }) {
  return (
    <Link
      href={c.path}
      className="group block overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      {c.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={c.image} alt={clean(c.title)} loading="lazy" className="aspect-video w-full object-cover" />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-sky-500 to-blue-700 p-3 text-center text-sm font-semibold text-white">
          {clean(c.title)}
        </div>
      )}
    </Link>
  );
}

// Portada de cursos (/cursos/): rejillas de portadas + advertencia + FAQ.
function CoursesLanding({ entry }: { entry: CourseIndexEntry }) {
  return (
    <div>
      {/* Cursos aulaenlanube (fondo oscuro, sigue de la cabecera) */}
      <section className="bg-slate-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-center text-3xl font-bold uppercase tracking-wide">Cursos aulaenlanube</h1>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {entry.coursesGrid!.map((c) => (
              <PortadaCard key={c.path} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Otros cursos (fondo claro) */}
      {entry.otherCourses && entry.otherCourses.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-center text-3xl font-semibold uppercase tracking-wide text-slate-600">
              Otros cursos
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {entry.otherCourses.map((c) => (
                <PortadaCard key={c.path} c={c} />
              ))}
            </div>

            {entry.advertencia && (
              <div className="mt-10 rounded-lg border border-red-200 bg-red-50 p-6 text-red-800">
                <h3 className="text-lg font-bold uppercase tracking-wide">Advertencia</h3>
                <p className="mt-2 leading-7">{entry.advertencia}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Preguntas frecuentes */}
      {entry.faqs && entry.faqs.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-center text-3xl font-semibold text-slate-600">Preguntas frecuentes</h2>
          <div className="mt-8 divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200">
            {entry.faqs.map((f, i) => (
              <details key={i} className="group bg-sky-50/40 open:bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-medium text-slate-700">
                  {f.q}
                  <span className="text-blue-500 transition group-open:rotate-90">▸</span>
                </summary>
                <div
                  className="px-5 pb-5 text-zinc-600 [&_a]:text-blue-600 [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: f.a }}
                />
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Landing de sección (p.ej. /zona-programacion/): hero + intro + cursos + aviso + últimas entradas.
function SectionLanding({ entry }: { entry: CourseIndexEntry }) {
  const s = entry.section!;
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      {s.heroImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={s.heroImage} alt="" className="w-full rounded-xl object-cover" />
      )}
      <h1 className="mt-8 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{entry.title}</h1>
      {s.introHtml && (
        <div
          className="prose prose-zinc mt-4 max-w-none text-zinc-700 prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: s.introHtml }}
        />
      )}

      {s.courseCards.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-slate-600">{s.coursesTitle}</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {s.courseCards.map((c) => (
              <PortadaCard key={c.path} c={c} />
            ))}
          </div>
        </section>
      )}

      {s.notice && (
        <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-6 text-red-800">
          <h3 className="text-lg font-bold">…en construcción</h3>
          <p className="mt-2 leading-7">{s.notice}</p>
        </div>
      )}

      {s.recentPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-600">{s.recentTitle}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {s.recentPosts.map((p) => (
              <Link key={p.path} href={p.path} className="group block">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt="" loading="lazy" className="aspect-video w-full rounded-lg object-cover" />
                ) : (
                  <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-sky-500 to-blue-700" />
                )}
                <h3 className="mt-2 font-semibold text-blue-700 group-hover:underline">{clean(p.title)}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function CourseIndexTemplate({ entry }: { entry: CourseIndexEntry }) {
  const crumbs = getBreadcrumbs(entry.path);

  // Portada de cursos con su diseño propio.
  if (entry.coursesGrid) {
    return (
      <>
        <CoursesLanding entry={entry} />
        <JsonLd data={breadcrumbLd(crumbs)} />
      </>
    );
  }

  // Landing de sección "en construcción" (zona programación).
  if (entry.section) {
    return (
      <>
        <SectionLanding entry={entry} />
        <JsonLd data={breadcrumbLd(crumbs)} />
      </>
    );
  }

  // Resto de índices de curso: lista de lecciones (con miniatura de YouTube).
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{entry.title}</h1>
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
