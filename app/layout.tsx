import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "@/components/Link";
import SiteHeader from "@/components/SiteHeader";
import NewsletterForm from "@/components/NewsletterForm";
import { getMenu } from "@/lib/content";
import { SOCIAL } from "@/lib/social";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

const LOGO = "/wp-content/uploads/2021/03/Logo-CABECERA-web-1-1024x280.png";
const FOOTER_LOGO = "/wp-content/uploads/2021/03/Logo-aulaenlanube-2-768x570.png";
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

// Enlaces de la barra inferior, como en el pie original.
const FOOTER_LINKS = [
  { t: "Contacto", u: "/contacto/" },
  { t: "Política de privacidad", u: "/politica-de-privacidad/" },
  { t: "Condiciones de uso", u: "/condiciones-de-uso/" },
];

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

        {/* Orden de redes como en la cabecera original: IG, LinkedIn, YouTube, GitHub */}
        <SiteHeader menu={getMenu()} logo={LOGO} social={[SOCIAL[0], SOCIAL[3], SOCIAL[1], SOCIAL[2]]} />

        <main id="main" className="flex-1">{children}</main>

        <footer className="bg-slate-900 text-white">
          {/* Newsletter "¿Quieres más?" con formulario de suscripción */}
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                ¿Quieres{" "}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10">más?</span>
                  <svg
                    viewBox="0 0 100 50"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-x-3 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)]"
                  >
                    <ellipse cx="50" cy="25" rx="46" ry="21" fill="none" stroke="#fbbf24" strokeWidth="3" />
                  </svg>
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-lg text-zinc-300 lg:mx-0">
                Suscríbete si quieres recibir información actualizada de todos los cursos que voy publicando.
              </p>
            </div>
            <NewsletterForm />
          </div>

          {/* Barra inferior: logo · enlaces · redes */}
          <div className="border-t border-white/10">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-8 sm:flex-row sm:justify-between">
              <Link href="/" aria-label="Inicio" className="flex-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={FOOTER_LOGO} alt="Aula en la nube" className="h-14 w-auto" />
              </Link>
              <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                {FOOTER_LINKS.map((l) => (
                  <Link key={l.u} href={l.u} className="text-zinc-300 transition hover:text-white">
                    {l.t}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-none gap-3">
                {SOCIAL.map((s) => (
                  <a
                    key={s.name}
                    href={s.u}
                    target="_blank"
                    rel="noopener"
                    aria-label={s.name}
                    title={s.name}
                    className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-white transition hover:bg-white/25"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                      <path d={s.d} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright (como el original) */}
          <div className="border-t border-white/10 py-4 text-center text-sm font-semibold text-zinc-200">
            aulaenlanube {new Date().getFullYear()} <span className="text-red-500">❤</span> web de Edu Torregrosa Llácer
          </div>
        </footer>
      </body>
    </html>
  );
}
