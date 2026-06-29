import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aulaenlanube.com"),
  title: "Aula en la nube – Tutoriales y cursos de informática",
  description:
    "Cursos y tutoriales gratuitos de programación, informática y edición: Java, Google, GIMP, OBS y mucho más.",
  robots:
    process.env.STAGING === "1"
      ? { index: false, follow: false }
      : { "max-image-preview": "large" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-zinc-900">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:shadow focus:ring-2 focus:ring-blue-600"
        >
          Saltar al contenido
        </a>
        <header className="border-b border-zinc-200">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
            <Link
              href="/"
              className="rounded text-lg font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              Aula en la nube
            </Link>
            <nav className="flex gap-5 text-sm font-medium text-zinc-600">
              <Link href="/cursos/" className="rounded hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                Cursos
              </Link>
              <Link href="/zona-programacion/" className="rounded hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                Programación
              </Link>
            </nav>
          </div>
        </header>
        <main id="main" className="flex-1">
          {children}
        </main>
        <footer className="mt-16 border-t border-zinc-200">
          <div className="mx-auto w-full max-w-5xl px-4 py-8 text-sm text-zinc-500">
            © Aula en la nube · Edu Torregrosa
          </div>
        </footer>
      </body>
    </html>
  );
}
