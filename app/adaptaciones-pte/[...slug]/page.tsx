import OldPteRedirect from "./redir";

// Seccion renombrada PTE -> PT: las URLs antiguas viven aqui y redirigen.
export default function Old() {
  return <OldPteRedirect />;
}

// Rutas antiguas conocidas (output: export exige lista finita).
export function generateStaticParams() {
  const ap = ["01-introduccion", "02-recta", "03-comparacion", "04-suma-resta", "05-combinadas", "06-problemas", "07-multiplicacion"];
  const acts = ["01", "02", "03", "04", "05"];
  const out: { slug: string[] }[] = [
    { slug: ["2eso"] },
    { slug: ["2eso", "matematicas"] },
    { slug: ["2eso", "matematicas", "tema-1"] },
    { slug: ["2eso", "matematicas", "tema-1", "completo"] },
    { slug: ["2eso", "matematicas", "01-temperaturas"] },
    { slug: ["2eso", "matematicas", "02-cuenta-banco"] },
    { slug: ["2eso", "matematicas", "03-ascensor"] },
  ];
  for (const a of ap) {
    out.push({ slug: ["2eso", "matematicas", "tema-1", a] });
    for (const n of acts) out.push({ slug: ["2eso", "matematicas", "tema-1", a, n] });
  }
  return out;
}
