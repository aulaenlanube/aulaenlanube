import { md, mdRaw } from "./texto";
import { Fig } from "./figuras";

// Renderiza el array `teoria` de un bloque: párrafos con marcado en línea,
// tablas RAW (HTML de confianza) y figuras por clave «Fig:xxx».
export function TeoriaBloque({ items }: { items: string[] }) {
  return (
    <div className="pte-teoria mt-3 space-y-3 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
      {items.map((t, i) => {
        // Las tablas de lengua tienen hasta cinco columnas: van en su propio
        // carril con scroll para que no desborden la página en un móvil.
        if (t.startsWith("RAW:"))
          return (
            <div key={i} className="w-full overflow-x-auto">
              <div className="min-w-[460px]" dangerouslySetInnerHTML={{ __html: mdRaw(t.slice(4)) }} />
            </div>
          );
        if (t.startsWith("Fig:")) return <Fig key={i} k={t.slice(4)} />;
        return <p key={i} dangerouslySetInnerHTML={{ __html: md(t) }} />;
      })}
    </div>
  );
}
