import type { Metadata } from "next";
import { RenderDoc } from "./render";

export const metadata: Metadata = {
  title: "Planificación del curso · docent",
  robots: { index: false, follow: false },
};

export default function PlanCursoPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6">
        <a href="/programacion-ia/plan/sesiones/" className="text-sm font-semibold text-[#1d4ed8] dark:text-blue-300 underline underline-offset-2">
          Ver el mapa de sesiones semana a semana →
        </a>
      </div>
      <RenderDoc doc="plan-curso-programacion-ia-2026-27.md" />
    </>
  );
}
