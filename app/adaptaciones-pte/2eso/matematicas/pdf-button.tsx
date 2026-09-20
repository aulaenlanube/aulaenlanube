"use client";

// Botón «Descargar PDF»: abre todas las soluciones (<details>) antes de llamar a
// imprimir — el diálogo del navegador permite «Guardar como PDF». Oculto al imprimir.
export default function PdfButton({ label }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        document.querySelectorAll("details").forEach((d) => d.setAttribute("open", ""));
        window.print();
      }}
      className="no-print rounded-xl border border-blue-300 bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
    >
      ⬇ Descargar PDF
    </button>
  );
}
