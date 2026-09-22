"use client";

import { CLAVE_TEMA } from "@/lib/tema";

// Botón de tema claro/oscuro de la cabecera.
//
// Tres detalles importantes:
//
// 1. No guarda el tema en estado de React. El icono visible lo decide el CSS
//    (`dark:hidden` / `hidden dark:block`), así que el HTML del servidor es
//    idéntico en los dos temas: ni hay desajuste de hidratación ni parpadeo.
// 2. El tema efectivo se lee del DOM (`data-theme`), que ya dejó puesto el
//    script en línea de app/layout.tsx antes del primer pintado.
// 3. Si la elección coincide con la del sistema, se borra la preferencia
//    guardada y el sitio vuelve a seguir al sistema (que es lo que la mayoría
//    espera al "devolver" el tema a su sitio).

export default function ThemeToggle({ className = "" }: { className?: string }) {
  function alternar() {
    const raiz = document.documentElement;
    const sistema = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const actual = raiz.getAttribute("data-theme") || sistema;
    const siguiente = actual === "dark" ? "light" : "dark";

    // Fundido breve del cambio de colores (globals.css lo ignora si el usuario
    // pidió reducir el movimiento).
    raiz.classList.add("aeln-tema-anim");
    window.setTimeout(() => raiz.classList.remove("aeln-tema-anim"), 320);

    try {
      if (siguiente === sistema) {
        raiz.removeAttribute("data-theme");
        localStorage.removeItem(CLAVE_TEMA);
      } else {
        raiz.setAttribute("data-theme", siguiente);
        localStorage.setItem(CLAVE_TEMA, siguiente);
      }
    } catch {
      // Sin almacenamiento (modo privado): al menos cambia esta página.
      raiz.setAttribute("data-theme", siguiente);
    }
  }

  return (
    <button
      type="button"
      onClick={alternar}
      className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg text-white/85 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${className}`}
    >
      {/* Luna (tema claro activo → pulsar lleva al oscuro) */}
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current dark:hidden" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
      {/* Sol (tema oscuro activo → pulsar lleva al claro) */}
      <svg
        viewBox="0 0 24 24"
        className="hidden h-5 w-5 fill-none stroke-current stroke-2 dark:block"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
          strokeLinecap="round"
        />
      </svg>
      {/* El nombre accesible sale del texto visible para lectores: el `span`
          oculto con `display:none` no cuenta, así que siempre se anuncia la
          acción correcta. */}
      <span className="sr-only dark:hidden">Activar el modo oscuro</span>
      <span className="sr-only hidden dark:block">Activar el modo claro</span>
    </button>
  );
}
