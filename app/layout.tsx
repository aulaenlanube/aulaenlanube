import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

const LOGO = "/wp-content/uploads/2021/03/Logo-CABECERA-web-1-1024x280.png";
const FAVICON =
  "https://aulaenlanube.com/wp-content/uploads/2022/10/cropped-favicon-aulaenlanube-1-192x192.webp";

export const metadata: Metadata = {
  metadataBase: new URL("https://aulaenlanube.com"),
  title: "Aula en la nube – Tutoriales y cursos de informática",
  description:
    "Cursos y tutoriales gratuitos de programación, informática y edición: Java, Google, GIMP, OBS y mucho más.",
  robots:
    process.env.STAGING === "1"
      ? { index: false, follow: false }
      : { "max-image-preview": "large" },
  icons: { icon: FAVICON, apple: FAVICON },
};

const FOOTER = {
  Canales: [
    { t: "Aula en la nube", u: "https://www.youtube.com/@aulaenlanube" },
    { t: "IA para docentes", u: "https://www.youtube.com/@ia-para-docentes" },
    { t: "PEPEZ Games", u: "https://www.youtube.com/@pepezgames" },
  ],
  Proyectos: [
    { t: "Apps Educativas", u: "https://apps-educativas.com/" },
    { t: "IA para docentes", u: "https://ia-para-docentes.com/" },
    { t: "Insignias", u: "https://insignias.org/" },
    { t: "Web personal", u: "https://edutorregrosa.com/" },
  ],
  Sígueme: [
    { t: "Instagram", u: "https://www.instagram.com/edutorregrosa" },
    { t: "Twitter / X", u: "https://x.com/_edu_torregrosa" },
    { t: "LinkedIn", u: "https://www.linkedin.com/in/edu-torregrosa-llacer/" },
  ],
};

function FooterCol({ title, items }: { title: string; items: { t: string; u: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.u}>
            <a href={i.u} target="_blank" rel="noopener" className="text-zinc-600 hover:text-blue-600">
              {i.t}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-zinc-900">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:shadow focus:ring-2 focus:ring-blue-600"
        >
          Saltar al contenido
        </a>

        <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" aria-label="Inicio" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO} alt="Aula en la nube" className="h-9 w-auto" />
            </Link>
            <nav className="flex items-center gap-5 text-sm font-medium text-zinc-600">
              <Link href="/cursos/" className="hover:text-blue-600">Cursos</Link>
              <Link href="/zona-programacion/" className="hover:text-blue-600">Programación</Link>
              <a
                href="https://www.youtube.com/@aulaenlanube"
                target="_blank"
                rel="noopener"
                className="rounded-full bg-red-600 px-3 py-1.5 text-white transition hover:bg-red-700"
              >
                YouTube
              </a>
            </nav>
          </div>
        </header>

        <main id="main" className="flex-1">{children}</main>

        <footer className="mt-16 border-t border-zinc-200 bg-zinc-50">
          <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO} alt="Aula en la nube" className="h-8 w-auto" />
              <p className="mt-3 text-sm text-zinc-500">
                Cursos y tutoriales gratuitos de informática, programación y edición.
              </p>
            </div>
            {Object.entries(FOOTER).map(([title, items]) => (
              <FooterCol key={title} title={title} items={items} />
            ))}
          </div>
          <div className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-400">
            © Aula en la nube · Edu Torregrosa
          </div>
        </footer>
      </body>
    </html>
  );
}
