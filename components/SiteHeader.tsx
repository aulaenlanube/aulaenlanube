"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";

export type MenuItem = { title: string; url: string; external?: boolean; children?: MenuItem[] };
export type Social = { name: string; u: string; d: string };

const YOUTUBE = "https://www.youtube.com/@aulaenlanube";

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

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 flex-none fill-none stroke-current stroke-2 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState<string | null>(null);
  const pathname = usePathname();

  // Cierra el drawer al navegar.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Bloquea el scroll del fondo y permite cerrar con Escape mientras está abierto.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Retraso escalonado para la entrada de cada bloque del drawer.
  const stagger = (i: number) => ({ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" });
  const itemCls = `transition-all duration-500 ease-out ${
    open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
  }`;

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
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Fondo difuminado */}
      <div
        className={`fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      {/* Drawer a pantalla completa */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        className={`fixed inset-0 z-[70] flex flex-col bg-gradient-to-b from-slate-800 via-slate-800 to-slate-900 text-white transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        {/* Cabecera del drawer */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Link href="/" aria-label="Inicio" onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt="Aula en la nube" className="h-9 w-auto" />
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            className="rounded-full p-2 text-white/80 transition hover:rotate-90 hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Cuerpo desplazable */}
        <nav className="flex-1 overflow-y-auto px-5 py-5">
          <div style={stagger(0)} className={`pb-3 ${itemCls}`}>
            <SearchBox />
          </div>

          {menu.map((top, i) => {
            const kids = top.children ?? [];
            const isOpen = group === top.title;
            return (
              <div
                key={top.title}
                style={stagger(i + 1)}
                className={`border-b border-white/10 ${itemCls}`}
              >
                {kids.length > 0 ? (
                  <>
                    <button
                      onClick={() => setGroup(isOpen ? null : top.title)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between py-4 text-left text-lg font-semibold text-white"
                    >
                      <span className={isOpen ? "text-sky-300" : ""}>{top.title}</span>
                      <Chevron open={isOpen} />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-0.5 pb-4 pl-3">
                          {kids.map((c) => (
                            <div key={c.title}>
                              <Leaf
                                it={c}
                                cls="block rounded-lg px-3 py-2 text-[15px] text-white/85 transition hover:bg-white/10 hover:text-white"
                              />
                              {c.children?.length ? (
                                <div className="pl-3">
                                  {c.children.map((g) => (
                                    <Leaf
                                      key={g.title}
                                      it={g}
                                      cls="block rounded-lg px-3 py-1.5 text-sm text-white/65 transition hover:bg-white/10 hover:text-white"
                                    />
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Leaf
                    it={top}
                    cls="block py-4 text-lg font-semibold text-white transition hover:text-sky-300"
                  />
                )}
              </div>
            );
          })}
        </nav>

        {/* Pie del drawer: CTA + redes */}
        <div
          style={stagger(menu.length + 1)}
          className={`border-t border-white/10 px-5 py-5 ${itemCls}`}
        >
          <a
            href={YOUTUBE}
            target="_blank"
            rel="noopener"
            className="mb-4 flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 font-semibold text-white shadow-lg shadow-red-900/30 transition hover:bg-red-700"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M23.5 6.5a3 3 0 0 0-2.1-2.12C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.4.52A3 3 0 0 0 .5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 0 0 2.1 2.12c1.9.52 9.4.52 9.4.52s7.5 0 9.4-.52a3 3 0 0 0 2.1-2.12C24 15.6 24 12 24 12s0-3.6-.5-5.5ZM9.6 15.6V8.4l6.25 3.6L9.6 15.6Z" />
            </svg>
            Suscríbete en YouTube
          </a>
          <SocialRow social={social} />
        </div>
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
