"use client";

import Link from "next/link";
import { useState } from "react";

export type MenuItem = { title: string; url: string; external?: boolean; children?: MenuItem[] };
export type Social = { name: string; u: string; d: string };

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

function SocialRow({ social, className = "" }: { social: Social[]; className?: string }) {
  return (
    <div className={`flex justify-center gap-3 ${className}`}>
      {social.map((s) => (
        <a
          key={s.name}
          href={s.u}
          target="_blank"
          rel="noopener"
          aria-label={s.name}
          title={s.name}
          className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-white transition hover:bg-white/25"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d={s.d} />
          </svg>
        </a>
      ))}
    </div>
  );
}

export default function SiteHeader({
  menu,
  logo,
  social,
}: {
  menu: MenuItem[];
  logo: string;
  social: Social[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Barra de menú (azul oscuro, fija al hacer scroll) */}
      <div className="sticky top-0 z-50 bg-slate-700 text-white shadow-sm">
        <div className="mx-auto w-full max-w-7xl px-4">
          {/* Nav escritorio */}
          <nav className="hidden w-full items-center justify-between lg:flex">
            {menu.map((top) => (
              <div key={top.title} className="group relative">
                <Leaf
                  it={top}
                  cls="block px-2 py-3 text-[15px] font-medium text-white/90 hover:text-white"
                />
                {top.children && top.children.length > 0 && (
                  <div className="invisible absolute left-0 top-full z-50 translate-y-1 rounded-xl border border-zinc-200 bg-white p-3 text-zinc-700 opacity-0 shadow-xl transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
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
          </nav>

          {/* Barra móvil: logo pequeño + hamburguesa */}
          <div className="flex items-center justify-between py-2 lg:hidden">
            <Link href="/" aria-label="Inicio" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt="Aula en la nube" className="h-8 w-auto" />
            </Link>
            <button
              className="rounded p-2 text-white"
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {mobileOpen && (
          <nav className="max-h-[80vh] overflow-y-auto border-t border-white/10 bg-slate-700 px-4 py-2 text-white lg:hidden">
            {menu.map((top) => (
              <div key={top.title} className="border-b border-white/10 py-1">
                {top.children?.length ? (
                  <details>
                    <summary className="cursor-pointer list-none py-2 text-sm font-semibold">
                      {top.title} <span className="text-white/50">▾</span>
                    </summary>
                    <div className="pb-2 pl-2">
                      {top.children.map((c) => (
                        <div key={c.title}>
                          <Leaf it={c} cls="block rounded px-3 py-1.5 text-sm text-white/80 hover:text-white" />
                          {c.children?.length ? (
                            <div className="pl-3">
                              {c.children.map((g) => (
                                <Leaf key={g.title} it={g} cls="block rounded px-3 py-1.5 text-sm text-white/70 hover:text-white" />
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Leaf it={top} cls="block py-2 text-sm font-semibold text-white" />
                )}
              </div>
            ))}
            <SocialRow social={social} className="py-4" />
          </nav>
        )}
      </div>

      {/* Banner: redes sociales + logo grande (se desplaza al hacer scroll) */}
      <div className="bg-slate-700 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 pb-8 pt-3">
          <SocialRow social={social} />
          <Link href="/" aria-label="Inicio" className="block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt="Aula en la nube" className="h-16 w-auto sm:h-20 lg:h-24" />
          </Link>
        </div>
      </div>
    </>
  );
}
