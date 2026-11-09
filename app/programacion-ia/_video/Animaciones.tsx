"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Motor de las figuras animadas del curso (docs/paginas-para-video.md, «Figuras
// animadas»). Las reglas viven en app/globals.css; aquí solo se decide CUÁNDO:
//
//  · Si el navegador no debe animar (reducir movimiento, o la captura quieta
//    del motor de vídeo, que pone las duraciones a 0), no se toca nada: cada
//    figura se ve terminada, como sin JavaScript.
//  · Si puede, html lleva data-anima y cada figura [data-anim] espera, en su
//    primer fotograma, a entrar en pantalla (35 % visible): entonces se le pone
//    data-anim-listo y arranca. Una toma `grabar` del motor la ve moverse al
//    ritmo de su reloj virtual.
//  · Las que ya están a la vista al cargar no se esconden para volver a
//    aparecer (data-anim-quieta): se quedan terminadas.
//  · El botón [data-anim-repetir] de cada figura la vuelve a poner en marcha.

/** ¿Este navegador anima? La sonda lleva una animación de 1 s en globals.css. */
function animaElNavegador(): boolean {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const sonda = document.createElement("div");
  sonda.className = "an-sonda";
  sonda.style.cssText = "position:absolute;width:1px;height:1px;opacity:0;pointer-events:none";
  document.body.appendChild(sonda);
  const dur = parseFloat(getComputedStyle(sonda).animationDuration) || 0;
  sonda.remove();
  return dur >= 0.05;
}

function aLaVista(e: Element): boolean {
  const r = e.getBoundingClientRect();
  return r.bottom > 0 && r.top < innerHeight && r.height > 0;
}

/** Arranca (o vuelve a arrancar) las animaciones de una figura desde cero. */
function arrancar(f: Element) {
  f.setAttribute("data-anim-quieta", "");
  void (f as HTMLElement).offsetWidth; // fuerza el estilo sin animación antes de quitarlo
  f.removeAttribute("data-anim-quieta");
  f.setAttribute("data-anim-listo", "");
}

export default function Animaciones() {
  const ruta = usePathname();

  useEffect(() => {
    const raiz = document.documentElement;
    const figuras = [...document.querySelectorAll("[data-anim]")];
    if (!figuras.length || !animaElNavegador()) {
      raiz.removeAttribute("data-anima");
      return;
    }
    for (const f of figuras) {
      if (aLaVista(f)) f.setAttribute("data-anim-quieta", "");
    }
    raiz.setAttribute("data-anima", "");

    const vigia = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-anim-listo", "");
          vigia.unobserve(e.target);
        }
      },
      { threshold: 0.35 },
    );
    for (const f of figuras) if (!f.hasAttribute("data-anim-quieta")) vigia.observe(f);

    const repetir = (ev: MouseEvent) => {
      const boton = (ev.target as Element | null)?.closest?.("[data-anim-repetir]");
      const figura = boton?.closest("[data-anim]");
      if (figura) arrancar(figura);
    };
    document.addEventListener("click", repetir);
    return () => {
      vigia.disconnect();
      document.removeEventListener("click", repetir);
    };
  }, [ruta]);

  return null;
}

