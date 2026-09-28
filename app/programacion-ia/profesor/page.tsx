import type { Metadata } from "next";
import PanelProfesor from "../_campus/PanelProfesor";

export const metadata: Metadata = {
  title: "Panel del profesor · Curso de Programación con IA",
  robots: { index: false, follow: false },
};

export default function ProfesorPage() {
  return <PanelProfesor />;
}
