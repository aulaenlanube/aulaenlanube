import type { Metadata } from "next";
import Acceso from "../_campus/Acceso";

export const metadata: Metadata = {
  title: "Acceso al aula · Curso de Programación con IA",
  description: "Acceso del alumnado y del profesorado al campus del Curso de Programación con IA.",
  robots: { index: false, follow: false },
};

export default function AccesoPage() {
  return <Acceso />;
}
