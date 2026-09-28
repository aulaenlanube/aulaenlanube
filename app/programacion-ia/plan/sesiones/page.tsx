import type { Metadata } from "next";
import { RenderDoc } from "../render";
import Link from "@/components/Link";

export const metadata: Metadata = {
  title: "Mapa de sesiones · docent",
  robots: { index: false, follow: false },
};

export default function SesionesPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6">
        <Link href="/programacion-ia/plan/" className="text-sm font-semibold text-[#1d4ed8] underline underline-offset-2">
          ← Volver a la planificación general
        </Link>
      </div>
      <RenderDoc doc="plan-curso-sesiones-2026-27.md" />
    </>
  );
}
