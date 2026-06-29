import Link from "@/components/Link";
import type { HomeEntry } from "@/lib/content";

const PAYPAL = "https://www.paypal.com/donate/?hosted_button_id=BHP6VTDH58YNL";

const clean = (t: string) => t.replace(/^▷\s*/, "").trim();

// Iconos de las tarjetas (Libres / Materiales / En video), como en el original.
const ICONS: Record<string, React.ReactNode> = {
  Libres: <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.3l6.5-.9L12 2.5z" />,
  Materiales: <path d="M19 18H6a4 4 0 010-8 5.5 5.5 0 0110.7-1.3A4.5 4.5 0 0119 18z" />,
  "En video": <path d="M4 5h11a2 2 0 012 2v2.5l4-2.5v10l-4-2.5V17a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z" />,
};

function FeatureIcon({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current text-zinc-400" aria-hidden="true">
      {ICONS[title] ?? <circle cx="12" cy="12" r="9" />}
    </svg>
  );
}

function CourseCard({ href, title, image }: { href: string; title: string; image?: string }) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-xl border-2 border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={clean(title)} className="aspect-video w-full object-cover" loading="lazy" />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-sky-500 to-blue-700 p-3 text-center text-sm font-semibold text-white">
          {clean(title)}
        </div>
      )}
    </Link>
  );
}

const btnDark =
  "inline-block rounded-md bg-slate-700 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-800";

export default function HomeTemplate({ entry }: { entry: HomeEntry }) {
  const c = entry.content;
  const courses = entry.courses.filter((x) => x.image);

  // Reserva: si por lo que sea no se pudo parsear el contenido, mostramos al
  // menos la rejilla de cursos para no dejar el inicio vacío.
  if (!c) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold text-zinc-900">{entry.title}</h1>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {courses.map((x) => (
            <CourseCard key={x.path} href={x.path} title={x.title} image={x.image} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Bienvenida (hero oscuro) */}
      <section className="bg-slate-700 text-white">
        <div
          className="mx-auto max-w-6xl px-4 py-14 text-center text-lg leading-8 text-sky-50 [&_p]:mt-4 [&_p:first-child]:mt-0"
          dangerouslySetInnerHTML={{ __html: c.welcomeHtml }}
        />
      </section>

      {/* Teaser Zona friki */}
      <section className="bg-sky-50">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center">
          <div
            className="text-zinc-600 [&_p]:leading-7"
            dangerouslySetInnerHTML={{ __html: c.frikiHtml }}
          />
          <Link href="/zona-friki/" className={`mt-6 ${btnDark}`}>
            VER ZONA FRIKI
          </Link>
        </div>
      </section>

      {/* 100% GRATIS + tarjetas */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-700">
          Tutoriales y cursos de informática <span className="text-blue-600">100% GRATIS</span>
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {c.features.map((f) => (
            <div key={f.title} className="rounded-2xl border-2 border-sky-100 bg-sky-50/40 p-8 text-center">
              <div className="flex justify-center">
                <FeatureIcon title={f.title} />
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-slate-600">{f.title}</h3>
              <p className="mt-2 text-zinc-500">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programas gratuitos */}
      <section className="mx-auto max-w-6xl px-4 pb-6">
        <h2 className="text-center text-3xl font-semibold text-slate-600">Programas gratuitos</h2>
        <div
          className="prose prose-zinc mt-6 max-w-none text-zinc-700 prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: c.programasHtml }}
        />
      </section>

      {/* Rejilla de cursos */}
      <section className="bg-sky-50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-semibold uppercase tracking-wide text-slate-600">
            Cursos aulaenlanube
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {courses.map((x) => (
              <CourseCard key={x.path} href={x.path} title={x.title} image={x.image} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/cursos/" className={btnDark}>
              VER CURSOS
            </Link>
          </div>
        </div>
      </section>

      {/* ¿Dónde está la trampa? + donación */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-semibold text-slate-600">{c.trampaTitle}</h2>
        <div
          className="prose prose-zinc mt-6 max-w-none text-zinc-700 prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: c.trampaHtml }}
        />
        <div className="mt-8 text-center">
          <a
            href={PAYPAL}
            target="_blank"
            rel="noopener"
            className="inline-block rounded-md bg-amber-400 px-7 py-3 font-semibold text-zinc-900 shadow-sm transition hover:bg-amber-300"
          >
            HACER DONACIÓN
          </a>
        </div>
      </section>

      {/* Otros cursos */}
      <section className="bg-zinc-100 py-14">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-semibold uppercase tracking-wide text-slate-600">Otros cursos</h2>
          <div
            className="mt-6 text-zinc-600 [&_p]:leading-7"
            dangerouslySetInnerHTML={{ __html: c.otrosHtml }}
          />
          <Link href="/cursos/" className={`mt-6 ${btnDark}`}>
            VER CURSOS
          </Link>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      {c.faqs.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-center text-3xl font-semibold text-slate-600">Preguntas frecuentes</h2>
          <div className="mt-8 divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200">
            {c.faqs.map((f, i) => (
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
