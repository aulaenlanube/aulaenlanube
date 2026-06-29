import Link from "next/link";
import ProductBlock from "./ProductBlock";
import { getProducts } from "@/lib/content";
import type { HomeEntry } from "@/lib/content";

export default function HomeTemplate({ entry }: { entry: HomeEntry }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 px-6 py-16 text-center text-white shadow-sm sm:py-20">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Aprende informática, programación y edición
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-sky-50">
          Cursos y tutoriales <strong>100% gratuitos</strong>: Java, Google, GIMP, OBS y mucho más.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/cursos/"
            className="rounded-full bg-white px-6 py-3 font-semibold text-blue-700 shadow-sm transition hover:bg-sky-50"
          >
            Ver cursos
          </Link>
          <Link
            href="/zona-programacion/"
            className="rounded-full px-6 py-3 font-semibold text-white ring-1 ring-white/50 transition hover:bg-white/10"
          >
            Zona programación
          </Link>
        </div>
      </section>

      {entry.hubs.length > 0 && (
        <section className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Cursos y secciones
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {entry.hubs.map((h) => (
              <Link
                key={h.path}
                href={h.path}
                className="group rounded-2xl border border-zinc-200 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
                    ▶
                  </span>
                  <div className="font-semibold text-zinc-900">{h.title}</div>
                </div>
                <div className="mt-2 text-sm text-zinc-500">{h.count} páginas</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <ProductBlock products={getProducts()} title="Mis proyectos" />

      {entry.recentPosts.length > 0 && (
        <section className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Del blog</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {entry.recentPosts.map((p) => (
              <li key={p.path}>
                <Link
                  href={p.path}
                  className="block rounded-xl border border-zinc-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/30"
                >
                  <span className="font-medium text-zinc-900">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
