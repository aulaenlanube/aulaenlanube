import BarraCampus from "./_campus/BarraCampus";
import Animaciones from "./_video/Animaciones";
import ModoVideo from "./_video/ModoVideo";

// Zona del Curso de Programación con IA: las páginas de contenido son públicas;
// si hay sesión abierta en el campus, arriba aparece el acceso al panel. Con
// `?video` en la URL se graban sin nada fijo encima (docs/paginas-para-video.md);
// las figuras con [data-anim] se animan al entrar en pantalla (Animaciones).
export default function CursoIALayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BarraCampus />
      <ModoVideo />
      <Animaciones />
      {children}
    </>
  );
}
