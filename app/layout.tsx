import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import NewsletterForm from "@/components/NewsletterForm";
import { getMenu } from "@/lib/content";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

const LOGO = "/wp-content/uploads/2021/03/Logo-CABECERA-web-1-1024x280.png";
const FOOTER_LOGO = "/wp-content/uploads/2021/03/Logo-aulaenlanube-2-768x570.png";
const FAVICON =
  "https://aulaenlanube.com/wp-content/uploads/2022/10/cropped-favicon-aulaenlanube-1-192x192.webp";
const YOUTUBE = "https://www.youtube.com/@aulaenlanube";

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

// Redes del pie original (handles de marca).
const SOCIAL = [
  { name: "Instagram", u: "https://www.instagram.com/aulaenlanube/", d: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.74.07-.89.04-1.37.19-1.69.31-.43.17-.73.36-1.05.68-.32.32-.51.62-.68 1.05-.12.32-.27.8-.31 1.69C3.26 8.5 3.25 8.85 3.25 12s0 3.5.07 4.74c.04.89.19 1.37.31 1.69.17.43.36.73.68 1.05.32.32.62.51 1.05.68.32.12.8.27 1.69.31 1.24.06 1.59.07 4.74.07s3.5 0 4.74-.07c.89-.04 1.37-.19 1.69-.31.43-.17.73-.36 1.05-.68.32-.32.51-.62.68-1.05.12-.32.27-.8.31-1.69.06-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.04-.89-.19-1.37-.31-1.69a2.8 2.8 0 0 0-.68-1.05 2.8 2.8 0 0 0-1.05-.68c-.32-.12-.8-.27-1.69-.31C15.5 4 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06Zm0 8.14A3.2 3.2 0 1 0 12 8.8a3.2 3.2 0 0 0 0 6.4Zm6.3-8.34a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" },
  { name: "YouTube", u: YOUTUBE, d: "M23.5 6.5a3 3 0 0 0-2.1-2.12C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.4.52A3 3 0 0 0 .5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 0 0 2.1 2.12c1.9.52 9.4.52 9.4.52s7.5 0 9.4-.52a3 3 0 0 0 2.1-2.12C24 15.6 24 12 24 12s0-3.6-.5-5.5ZM9.6 15.6V8.4l6.25 3.6L9.6 15.6Z" },
  { name: "GitHub", u: "https://github.com/aulaenlanube", d: "M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.3-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" },
  { name: "LinkedIn", u: "https://www.linkedin.com/in/edutorregrosa/", d: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z" },
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
