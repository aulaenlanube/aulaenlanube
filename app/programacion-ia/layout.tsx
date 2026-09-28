import BarraCampus from "./_campus/BarraCampus";

// Zona del Curso de Programación con IA: las páginas de contenido son públicas;
// si hay sesión abierta en el campus, arriba aparece el acceso al panel.
export default function CursoIALayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BarraCampus />
      {children}
    </>
  );
}
