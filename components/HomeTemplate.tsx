import Link from "next/link";
import ProductBlock from "./ProductBlock";
import { getProducts } from "@/lib/content";
import type { HomeEntry } from "@/lib/content";

const clean = (t: string) => t.replace(/^▷\s*/, "").trim();

function Card({ href, title, image, sub }: { href: string; title: string; image?: string; sub?: string }) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-2xl border border-zinc-200 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="aspect-video w-full object-cover" loading="lazy" />
      ) : (
        <div className="aspect-video w-full bg-gradient-to-br from-sky-500 to-blue-700" />
      )}
      <div className="p-4">
        <div className="font-semibold text-zinc-900 group-hover:text-blue-700">{clean(title)}</div>
        {sub ? <div className="mt-1 text-sm text-zinc-500">{sub}</div> : null}
      </div>
    </Link>
  );
}

export default function HomeTemplate({ entry }: { entry: HomeEntry }) {
  return (
    <div>
      <section className="bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:py-24">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Tutoriales y cursos de informática <span className="text-amber-300">100% gratis</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sky-50">
            Aprende programación, informática y edición de vídeo e imagen: Java, Google, GIMP, OBS y mucho más.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/cursos/" className="rounded-full bg-white px-6 py-3 font-semibold text-blue-700 shadow-sm transition hover:bg-sky-50">
              Ver todos los cursos
            </Link>
            <a href="https://www.youtube.com/@aulaenlanube" target="_blank" rel="noopener" className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700">
              Mi canal de YouTube
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 pb-4">
        {entry.courses.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Cursos</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {entry.courses.map((c) => (
                <Card key={c.path} href={c.path} title={c.title} image={c.image} sub={`${c.count} lecciones`} />
              ))}
            </div>
          </section>
        )}

        {entry.sections.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Más zonas</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {entry.sections.map((s) => (
                <Card key={s.path} href={s.path} title={s.title} image={s.image} sub={`${s.count} páginas`} />
              ))}
            </div>
          </section>
        )}

        <ProductBlock products={getProducts()} title="Mis proyectos" />

        {entry.recentPosts.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Del blog</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {entry.recentPosts.map((p) => (
                <li key={p.path}>
                  <Link href={p.path} className="block rounded-xl border border-zinc-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/30">
                    <span className="font-medium text-zinc-900">{clean(p.title)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
