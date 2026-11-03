import type { Metadata } from "next";
import { RenderDoc } from "../render";
import Link from "@/components/Link";

export const metadata: Metadata = {
  title: "Guion · Startup sesión 3 · docent",
  robots: { index: false, follow: false },
};

export default function GuionStartupSesion3Page() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6">
        <Link href="/programacion-ia/plan/sesiones/" className="text-sm font-semibold text-[#1d4ed8] dark:text-blue-300 underline underline-offset-2">
          ← Volver al mapa de sesiones
        </Link>
      </div>
      <RenderDoc doc="guion-startup-sesion-03-2026-11-03.md" />
    </>
  );
}
