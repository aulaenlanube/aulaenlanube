import type { Metadata } from "next";
import PanelAlumno from "../_campus/PanelAlumno";

export const metadata: Metadata = {
  title: "Mi aula · Curso de Programación con IA",
  robots: { index: false, follow: false },
};

export default function AulaPage() {
  return <PanelAlumno />;
}
