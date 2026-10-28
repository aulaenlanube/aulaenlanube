"use client";

export default function PrintButton({ label = "🖨 Versión imprimible" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-xl bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:hover:bg-slate-600 print:hidden"
    >
      {label}
    </button>
  );
}
