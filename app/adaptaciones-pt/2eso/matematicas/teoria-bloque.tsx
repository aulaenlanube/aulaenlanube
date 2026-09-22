import { mdTex, texRaw } from "./tex";
import { Termohorizontal, TablaSignos, FichasColores, Jerarquia, Fases } from "./figuras";

// Renderiza el array `teoria` de un apartado: párrafos con LaTeX,
// tablas RAW (HTML de confianza) y figuras por clave «Fig:xxx».
export function TeoriaBloque({ items }: { items: string[] }) {
  return (
    <div className="pte-teoria mt-3 space-y-3 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
      {items.map((t, i) => {
        if (t.startsWith("RAW:"))
          return <div key={i} dangerouslySetInnerHTML={{ __html: texRaw(t.slice(4)) }} />;
        if (t === "Fig:termo") return <Termohorizontal key={i} />;
        if (t === "Fig:signos") return <TablaSignos key={i} />;
        if (t === "Fig:fichas") return <FichasColores key={i} />;
        if (t === "Fig:jerarquia") return <Jerarquia key={i} />;
        if (t === "Fig:fases") return <Fases key={i} />;
        return <p key={i} dangerouslySetInnerHTML={{ __html: mdTex(t) }} />;
      })}
    </div>
  );
}
