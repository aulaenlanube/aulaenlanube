// Banner de la plataforma del autor OposicionesIA.com (sustituye al antiguo
// banner publicitario de terceros). Componente compartido por todas las barras
// laterales de la plataforma (cursos, lecciones de vídeo, hubs…).
export default function OposicionesIaBanner() {
  return (
    <a
      href="https://oposicionesia.com/"
      target="_blank"
      rel="noopener"
      className="block overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 p-5 text-center text-white shadow-md ring-1 ring-slate-700 transition hover:ring-cyan-500/50"
    >
      <div className="text-[10px] font-semibold uppercase tracking-widest text-cyan-400">
        Recomendado · Edu Torregrosa
      </div>
      <div className="mt-2 text-2xl font-extrabold tracking-tight">
        Oposiciones<span className="text-cyan-400">IA</span>
      </div>
      <p className="mt-2 text-sm text-slate-300">
        Aprueba tu oposición con la potencia de la <strong>IA personalizada</strong>.
      </p>
      <ul className="mx-auto mt-3 w-fit space-y-1 text-left text-[13px] text-slate-200">
        <li>✓ Agentes IA por especialidad</li>
        <li>✓ +90.000 plazas por comunidad</li>
        <li>✓ Basado en la legislación oficial</li>
      </ul>
      <span className="mt-4 inline-block rounded-full bg-cyan-500 px-5 py-2 text-sm font-bold text-slate-900 transition hover:bg-cyan-400">
        Quiero mi plaza →
      </span>
    </a>
  );
}
