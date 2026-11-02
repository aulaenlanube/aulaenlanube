import ModoVideo from "@/app/programacion-ia/_video/ModoVideo";

// Seminario de IA para docentes: páginas públicas que también se graban para
// el canal IA para docentes. Con `?video` en la URL no queda nada fijo encima
// (docs/paginas-para-video.md).
export default function SeminarioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ModoVideo />
      {children}
    </>
  );
}
