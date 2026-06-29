"use client";

import Link from "next/link";
import { useState } from "react";

export type MenuItem = { title: string; url: string; external?: boolean; children?: MenuItem[] };

function Leaf({ it, cls }: { it: MenuItem; cls: string }) {
  if (!it.url) return <span className={cls}>{it.title}</span>;
  if (it.external)
    return (
      <a href={it.url} target="_blank" rel="noopener" className={cls}>
        {it.title}
      </a>
    );
  return (
    <Link href={it.url} className={cls}>
      {it.title}
    </Link>
  );
}

const leafCls = "block rounded px-3 py-1.5 text-sm text-zinc-600 hover:bg-blue-50 hover:text-blue-700";

export default function SiteHeader({ menu, logo }: { menu: MenuItem[]; logo: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" aria-label="Inicio" className="flex flex-none items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="Aula en la nube" className="h-9 w-auto" />
        </Link>

        {/* Nav escritorio */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {menu.map((top) => (
            <div key={top.title} className="group relative">
              <Leaf
                it={top}
                cls="rounded px-3 py-2 text-sm font-medium text-zinc-700 hover:text-blue-600"
              />
              {top.children && top.children.length > 0 && (
                <div className="invisible absolute left-0 top-full z-50 translate-y-1 rounded-xl border border-zinc-200 bg-white p-3 opacity-0 shadow-xl transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {top.children.some((c) => c.children?.length) ? (
                    <div className="flex gap-5">
                      {top.children.map((c) => (
                        <div key={c.title} className="min-w-[190px]">
                          {c.children?.length ? (
                            <>
                              <Leaf it={c} cls="block rounded px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-400 hover:text-blue-700" />
                              <ul>{c.children.map((g) => <li key={g.title}><Leaf it={g} cls={leafCls} /></li>)}</ul>
                            </>
                          ) : (
                            <Leaf it={c} cls={leafCls} />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="min-w-[220px]">
                      {top.children.map((c) => <li key={c.title}><Leaf it={c} cls={leafCls} /></li>)}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
          <a
            href="https://www.youtube.com/@aulaenlanube"
            target="_blank"
            rel="noopener"
            className="ml-2 flex-none rounded-full bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            YouTube
          </a>
        </nav>

        {/* Botón móvil */}
        <button
          className="rounded p-2 text-zinc-700 lg:hidden"
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Menú móvil */}
      {mobileOpen && (
        <nav className="max-h-[80vh] overflow-y-auto border-t border-zinc-200 bg-white px-4 py-2 lg:hidden">
          {menu.map((top) => (
            <div key={top.title} className="border-b border-zinc-100 py-1">
              {top.children?.length ? (
                <details>
                  <summary className="cursor-pointer list-none py-2 text-sm font-semibold text-zinc-800">
                    {top.title} <span className="text-zinc-400">▾</span>
                  </summary>
                  <div className="pb-2 pl-2">
                    {top.children.map((c) => (
                      <div key={c.title}>
                        <Leaf it={c} cls={leafCls} />
                        {c.children?.length ? (
                          <div className="pl-3">{c.children.map((g) => <Leaf key={g.title} it={g} cls={leafCls} />)}</div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </details>
              ) : (
                <Leaf it={top} cls="block py-2 text-sm font-semibold text-zinc-800" />
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
