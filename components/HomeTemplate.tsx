import Link from "next/link";
import ProductBlock from "./ProductBlock";
import { getProducts } from "@/lib/content";
import type { HomeEntry } from "@/lib/content";

export default function HomeTemplate({ entry }: { entry: HomeEntry }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Aula en la nube
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
          Cursos y tutoriales gratuitos de programación, informática y edición de
          vídeo e imagen.
        </p>
      </section>

      {entry.hubs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Cursos y secciones
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {entry.hubs.map((h) => (
              <Link
                key={h.path}
                href={h.path}
                className="rounded-xl border border-zinc-200 p-5 transition hover:border-zinc-300 hover:shadow-sm"
              >
                <div className="font-semibold text-zinc-900">{h.title}</div>
                <div className="mt-1 text-sm text-zinc-500">{h.count} páginas</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <ProductBlock products={getProducts()} title="Mis proyectos" />

      {entry.recentPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Del blog
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {entry.recentPosts.map((p) => (
              <li key={p.path}>
                <Link
                  href={p.path}
                  className="block rounded-lg border border-zinc-200 p-4 transition hover:bg-zinc-50"
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
