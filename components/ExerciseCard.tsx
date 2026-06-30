import ExerciseSolution from "./ExerciseSolution";

// Tarjeta de un ejercicio resuelto: insignia con el número + enunciado (texto e
// imagen de ejemplo, siempre visibles) + solución desplegable con código.
export default function ExerciseCard({
  n,
  title,
  statementHtml,
  code,
  lines,
  lang = "Java",
}: {
  n: number;
  title: string;
  statementHtml: string;
  code?: string;
  lines?: string[];
  lang?: string;
}) {
  return (
    <section className="mt-8 scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 text-sm font-bold text-white shadow-sm">
          {n}
        </span>
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">{title}</h2>
      </div>

      <div
        className="prose prose-zinc mt-4 max-w-none text-[15px] prose-a:text-blue-600 prose-img:rounded-lg prose-img:ring-1 prose-img:ring-zinc-200"
        dangerouslySetInnerHTML={{ __html: statementHtml }}
      />

      {code && lines && lines.length > 0 ? (
        <ExerciseSolution code={code} lines={lines} lang={lang} />
      ) : null}
    </section>
  );
}
