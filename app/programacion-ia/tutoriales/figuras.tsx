// Figuras SVG de los tutoriales (web de marca). Dibujadas a mano, inline,
// sin JS: la animación es SMIL (funciona en cualquier navegador moderno y
// sobrevive al export estático). Colores: currentColor + clases de Tailwind,
// así se adaptan solos al modo oscuro. Se invocan desde el markdown con una
// línea en blanco: [FIG:token] → ver FIGURAS al final del fichero.
import type { ReactNode } from "react";

function Marco({
  id,
  viewBox,
  label,
  children,
}: {
  id: string;
  viewBox: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-6">
      <svg
        viewBox={viewBox}
        role="img"
        aria-label={label}
        className="mx-auto h-auto w-full max-w-3xl text-zinc-600 dark:text-zinc-300"
      >
        <defs>
          <marker id={`fl-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="fill-blue-600 dark:fill-blue-400" />
          </marker>
          <marker id={`fg-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="fill-emerald-600 dark:fill-emerald-400" />
          </marker>
          <marker id={`fm-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="fill-zinc-600 dark:fill-zinc-300" />
          </marker>
        </defs>
        {children}
      </svg>
      <figcaption className="mt-2 text-center text-[13px] italic text-zinc-500 dark:text-zinc-400">{label}</figcaption>
    </figure>
  );
}

// utilidades de dibujo
const caja =
  "rounded fill-white dark:fill-slate-900 stroke-zinc-400 dark:stroke-zinc-600";
const txt = (x: number, y: number, s: string, cls = "", size = 13, anchor: "middle" | "start" | "end" = "middle") => (
  <text x={x} y={y} textAnchor={anchor} fontSize={size} className={cls || "fill-zinc-700 dark:fill-zinc-300"}>
    {s}
  </text>
);
const txtFuerte = (x: number, y: number, s: string, size = 13) => txt(x, y, s, "fill-zinc-900 dark:fill-zinc-100 font-bold", size);
// Sin delays: animateMotion con begin>0 dejaría el círculo en (0,0) hasta ese
// momento (artefacto en la esquina). El desfase se logra con duraciones distintas.
const punto = (path: string, dur = "3.2s", color = "fill-blue-600 dark:fill-blue-400", r = 6) => (
  <circle r={r} className={color}>
    <animateMotion dur={dur} begin="0s" repeatCount="indefinite" path={path} />
  </circle>
);
const flecha = (d: string, id: string, color = "stroke-blue-600 dark:stroke-blue-400") => (
  <path d={d} fill="none" strokeWidth={2.5} markerEnd={`url(#fl-${id})`} className={color} />
);

// ── github-pages ─────────────────────────────────────────────────────────────

function FigCommit() {
  const id = "commit";
  const nodos = [
    { x: 110, t: "1 commit", m: "«estructura HTML de la home»" },
    { x: 260, t: "otro commit", m: "«colores de mi marca»" },
    { x: 410, t: "otro más", m: "«menú móvil que funciona»" },
    { x: 560, t: "y otro", m: "«foto real, no de stock»" },
  ];
  return (
    <Marco id={id} viewBox="0 0 670 210" label="Tu historial git: cada punto es una fotografía de la web con su mensaje; el cursor viaja porque tú decides a cuál volver.">
      <line x1={70} y1={95} x2={600} y2={95} strokeWidth={3} className="stroke-zinc-300 dark:stroke-zinc-700" />
      {nodos.map((n, i) => (
        <g key={n.t}>
          {/* miniatura de la web (fotografía) */}
          <rect x={n.x - 26} y={30} width={52} height={34} rx={6} className={caja} strokeWidth={1.8} />
          <rect x={n.x - 19} y={36} width={38} height={8} rx={2} className="fill-blue-200 dark:fill-blue-500/40" />
          <rect x={n.x - 19} y={48} width={38} height={4} rx={2} className="fill-zinc-200 dark:fill-zinc-700" />
          <rect x={n.x - 19} y={55} width={26} height={4} rx={2} className="fill-zinc-200 dark:fill-zinc-700" />
          <line x1={n.x} y1={64} x2={n.x} y2={88} strokeWidth={1.5} className="stroke-zinc-400 dark:stroke-zinc-600" />
          <circle cx={n.x} cy={95} r={9} className="fill-blue-600 dark:fill-blue-400" />
          {i === 3 && (
            <circle cx={n.x} cy={95} r={9} fill="none" strokeWidth={3} className="stroke-blue-500 dark:stroke-blue-400">
              <animate attributeName="r" values="9;24" dur="2.6s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0" dur="2.6s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            </circle>
          )}
          {txt(n.x, 128, n.t, "fill-zinc-700 dark:fill-zinc-300 font-semibold", 13)}
          {txt(n.x, 148, n.m, "fill-zinc-600 dark:fill-zinc-300", 11.5)}
        </g>
      ))}
      {/* cursor del tiempo viajando */}
      <g>
        <circle cy={95} r={16} fill="none" strokeWidth={3} className="stroke-amber-500">
          <animate attributeName="cx" values="110;260;410;560;560;110" keyTimes="0;0.25;0.5;0.75;0.9;1" dur="7s" repeatCount="indefinite" />
        </circle>
        {txt(335, 190, "«vas tres commits por detrás» = el cursor en otro punto de esta línea", "fill-zinc-600 dark:fill-zinc-300 italic", 12)}
      </g>
    </Marco>
  );
}

function FigRama() {
  const id = "rama";
  return (
    <Marco id={id} viewBox="0 0 670 230" label="Una rama es una sucursal de pruebas: experimentas arriba, y solo si funciona, la PR la devuelve a main (el punto verde).">
      <line x1={60} y1={150} x2={610} y2={150} strokeWidth={3.5} className="stroke-zinc-300 dark:stroke-zinc-700" />
      <circle cx={120} cy={150} r={8} className="fill-blue-600 dark:fill-blue-400" />
      {txt(120, 178, "main", "fill-zinc-700 dark:fill-zinc-300 font-bold", 14)}
      {/* la sucursal: crece con trazo animado */}
      <path
        d="M200 150 C 260 150, 250 60, 320 60 L 430 60"
        fill="none"
        strokeWidth={3}
        strokeDasharray={330}
        strokeDashoffset={330}
        className="stroke-emerald-600 dark:stroke-emerald-400"
      >
        <animate attributeName="stroke-dashoffset" values="330;330;0;0" keyTimes="0;0.15;0.55;1" dur="6s" repeatCount="indefinite" />
      </path>
      <circle cx={330} cy={60} r={8} className="fill-emerald-600 dark:fill-emerald-400" />
      <circle cx={430} cy={60} r={8} className="fill-emerald-600 dark:fill-emerald-400" />
      {txt(380, 38, "rama «nuevo-estilo»", "fill-emerald-700 dark:fill-emerald-300 font-bold", 13)}
      {txt(380, 84, "2 commits de experimento", "fill-zinc-600 dark:fill-zinc-300", 11.5)}
      {/* merge de vuelta */}
      <path
        d="M430 60 C 480 60, 480 150, 540 150"
        fill="none"
        strokeWidth={3}
        strokeDasharray={160}
        strokeDashoffset={160}
        className="stroke-emerald-600 dark:stroke-emerald-400"
      >
        <animate attributeName="stroke-dashoffset" values="160;160;0;0" keyTimes="0;0.5;0.8;1" dur="6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.5;0.8;1" dur="6s" repeatCount="indefinite" />
      </path>
      <circle cx={545} cy={150} r={10} className="fill-emerald-600 dark:fill-emerald-400">
        <animate attributeName="opacity" values="0.35;1;1" keyTimes="0;0.5;1" dur="6s" repeatCount="indefinite" />
      </circle>
      {txt(545, 178, "PR fusionada", "fill-emerald-700 dark:fill-emerald-300 font-bold", 13)}
      {txt(335, 215, "si el experimento sale mal, main no se entera: la rama se borra y ya", "fill-zinc-600 dark:fill-zinc-300 italic", 12)}
    </Marco>
  );
}

function FigToken() {
  const id = "token";
  return (
    <Marco id={id} viewBox="0 0 670 190" label="El token es un pase de una sola pieza: quien lo tiene, publica como tú. Por eso se ve una vez, no se comparte y no se sube.">
      <rect x={40} y={62} width={140} height={60} rx={12} className={caja} strokeWidth={2} />
      {txtFuerte(110, 90, "tu carpeta")}
      {txt(110, 108, "mi-web/", "fill-zinc-600 dark:fill-zinc-300", 11)}
      <rect x={265} y={62} width={140} height={60} rx={12} className={caja} strokeWidth={2} />
      {txtFuerte(335, 90, "github.com")}
      {txt(335, 108, "tu repo público", "fill-zinc-600 dark:fill-zinc-300", 11)}
      {/* llave */}
      <g>
        <circle cx={530} cy={78} r={13} fill="none" strokeWidth={4} className="stroke-amber-500" />
        <line x1={543} y1={78} x2={575} y2={78} strokeWidth={4} className="stroke-amber-500" strokeLinecap="round" />
        <line x1={566} y1={78} x2={566} y2={90} strokeWidth={4} className="stroke-amber-500" strokeLinecap="round" />
        <line x1={575} y1={78} x2={575} y2={92} strokeWidth={4} className="stroke-amber-500" strokeLinecap="round" />
        <animateTransform attributeName="transform" type="rotate" values="0 540 78; -8 540 78; 0 540 78" dur="2.8s" repeatCount="indefinite" />
      </g>
      {txt(545, 118, "el token", "fill-zinc-700 dark:fill-zinc-300 font-bold", 13)}
      {txt(545, 136, "ghp_… (se ve una vez)", "fill-zinc-600 dark:fill-zinc-300", 11)}
      {flecha("M185 92 L258 92", id)}
      {punto("M185 92 L258 92", "2.4s")}
      {flecha("M410 92 L495 82", id)}
      {punto("M410 92 L495 82", "2.4s", "fill-amber-500", 5)}
      {txt(335, 175, "git push = «sube estos commits usando mi pase»", "fill-zinc-600 dark:fill-zinc-300 italic", 12)}
    </Marco>
  );
}

function FigPages() {
  const id = "pages";
  return (
    <Marco id={id} viewBox="0 0 670 200" label="GitHub Pages: tus commits entran por la rama que elijas y salden publicados solos en 1-2 minutos. Tú no mueves nada más.">
      <rect x={30} y={55} width={150} height={64} rx={12} className={caja} strokeWidth={2} />
      {txtFuerte(105, 82, "commits")}
      {txt(105, 100, "tu trabajo", "fill-zinc-600 dark:fill-zinc-300", 11)}
      <rect x={255} y={55} width={160} height={64} rx={12} className={caja} strokeWidth={2} />
      {txtFuerte(335, 82, "rama publicada")}
      {txt(335, 100, "main o gh-pages", "fill-zinc-600 dark:fill-zinc-300", 11)}
      <rect x={495} y={55} width={150} height={64} rx={12} className={caja} strokeWidth={2} />
      {txtFuerte(570, 82, "tu web live")}
      {txt(570, 100, "usuario.github.io", "fill-zinc-500 dark:fill-zinc-300", 11)}
      {flecha("M185 87 L248 87", id)}
      {flecha("M420 87 L488 87", id)}
      {punto("M185 87 L248 87", "1.8s")}
      {punto("M420 87 L488 87", "1.8s", "fill-emerald-600 dark:fill-emerald-400", 6)}
      {/* relojito girando sobre la segunda flecha */}
      <g>
        <circle cx={455} cy={48} r={11} fill="none" strokeWidth={2} className="stroke-zinc-400 dark:stroke-zinc-500" />
        <line x1={455} y1={48} x2={455} y2={40} strokeWidth={2} strokeLinecap="round" className="stroke-zinc-500 dark:stroke-zinc-400">
          <animateTransform attributeName="transform" type="rotate" from="0 455 48" to="360 455 48" dur="3s" repeatCount="indefinite" />
        </line>
        {txt(455, 130, "1-2 min, solo", "fill-zinc-600 dark:fill-zinc-300", 11)}
      </g>
      {txt(335, 175, "Settings → Pages → «Branch: main» → Save: eso es toda la configuración", "fill-zinc-600 dark:fill-zinc-300 italic", 12)}
    </Marco>
  );
}

// ── api-externa ──────────────────────────────────────────────────────────────

function FigApi() {
  const id = "api";
  return (
    <Marco id={id} viewBox="0 0 670 200" label="El widget, en cuatro tiempos: lo pides, te contestan con JSON, el código saca un valor y la pantalla lo pinta.">
      <rect x={25} y={55} width={140} height={62} rx={12} className={caja} strokeWidth={2} />
      {txtFuerte(95, 80, "tu web")}
      {txt(95, 98, "hace la petición", "fill-zinc-600 dark:fill-zinc-300", 11)}
      <rect x={230} y={55} width={150} height={62} rx={12} className={caja} strokeWidth={2} />
      {txtFuerte(305, 80, "la API")}
      {txt(305, 98, "open-meteo.com", "fill-zinc-600 dark:fill-zinc-300", 11)}
      <rect x={430} y={52} width={215} height={70} rx={12} className={caja} strokeWidth={2} />
      {txtFuerte(537, 74, "JSON de vuelta")}
      {txt(537, 92, '{"current": {', "fill-zinc-600 dark:fill-zinc-300 font-mono", 10.5)}
      {txt(537, 107, '"temperature_2m": 24.1}}', "fill-zinc-600 dark:fill-zinc-300 font-mono", 10.5)}
      {flecha("M170 76 L222 76", id)}
      {flecha("M385 76 L422 76", id, "stroke-emerald-600 dark:stroke-emerald-400")}
      {punto("M170 76 L222 76", "1.6s")}
      {punto("M385 76 L422 76", "1.6s", "fill-emerald-600 dark:fill-emerald-400", 6)}
      <text x={537} y={150} textAnchor="middle" fontSize={20} className="fill-blue-700 dark:fill-blue-300 font-bold">
        24.1°C en Xàtiva
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.45;0.6;1" dur="4s" repeatCount="indefinite" />
      </text>
      {flecha("M537 128 L537 136", id, "stroke-emerald-600 dark:stroke-emerald-400")}
      {txt(170, 178, "sin clave, sin tarjeta", "fill-zinc-600 dark:fill-zinc-300 italic", 11)}
    </Marco>
  );
}

function FigJson() {
  const id = "json";
  return (
    <Marco id={id} viewBox="0 0 670 200" label="El JSON llega con todo; el código de tu widget elige un valor (la línea azul) y pinta solo eso en la pantalla.">
      <rect x={30} y={20} width={290} height={150} rx={12} className={caja} strokeWidth={2} />
      {[
        '{',
        '  "latitude": 39.4,',
        '  "current": {',
        '    "temperature_2m": 24.1,',
        '    "wind_speed_10m": 3.2',
        '  }',
        '}',
      ].map((l, i) => (
        <g key={l}>
          {i === 3 && <rect x={44} y={90} width={262} height={20} rx={4} className="fill-blue-100 dark:fill-blue-500/20" />}
          {txt(50, 46 + i * 18, l, i === 3 ? "fill-blue-800 dark:fill-blue-200 font-mono font-bold" : "fill-zinc-600 dark:fill-zinc-300 font-mono", 12.5, "start")}
        </g>
      ))}
      {/* flecha al dato elegido */}
      <path d="M310 100 C 380 100, 390 80, 430 80" fill="none" strokeWidth={2.5} markerEnd={`url(#fg-${id})`} className="stroke-emerald-600 dark:stroke-emerald-400" />
      {punto("M310 100 C 380 100, 390 80, 430 80", "2.2s", "fill-emerald-600 dark:fill-emerald-400", 5)}
      {/* pantallita */}
      <rect x={445} y={40} width={200} height={90} rx={10} className={caja} strokeWidth={2} />
      <rect x={445} y={40} width={200} height={22} rx={10} className="fill-zinc-100 dark:fill-white/10" />
      <text x={545} y={76} textAnchor="middle" fontSize={11} className="fill-zinc-600 dark:fill-zinc-300">Hoy en Xàtiva</text>
      <text x={545} y={108} textAnchor="middle" fontSize={24} className="fill-blue-700 dark:fill-blue-300 font-extrabold">
        24.1°C
        <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
      </text>
      {txt(335, 192, "el resto del JSON se ignora: el widget solo pide el campo que le interesa", "fill-zinc-600 dark:fill-zinc-300 italic", 11.5)}
    </Marco>
  );
}

function FigCors() {
  const id = "cors";
  return (
    <Marco id={id} viewBox="0 0 670 190" label="CORS es el portero de la API. Con «Access-Control-Allow-Origin: *» deja pasar a cualquier web; la tuya funciona sin pedir permiso.">
      <rect x={30} y={55} width={150} height={62} rx={12} className={caja} strokeWidth={2} />
      {txtFuerte(105, 82, "tu widget")}
      {txt(105, 100, "en tu web", "fill-zinc-600 dark:fill-zinc-300", 11)}
      {/* portero con cabecera */}
      <line x1={330} y1={25} x2={330} y2={155} strokeWidth={3} strokeDasharray="2 8" strokeLinecap="round" className="stroke-amber-500" />
      <rect x={265} y={62} width={130} height={48} rx={8} className="fill-amber-50 dark:fill-amber-500/10 stroke-amber-400 dark:stroke-amber-500/60" strokeWidth={1.8} />
      {txt(330, 82, "Access-Control-", "fill-amber-800 dark:fill-amber-200 font-mono", 10.5)}
      {txt(330, 97, "Allow-Origin: *", "fill-amber-800 dark:fill-amber-200 font-mono font-bold", 10.5)}
      <rect x={480} y={55} width={160} height={62} rx={12} className={caja} strokeWidth={2} />
      {txtFuerte(560, 82, "la API contesta")}
      {txt(560, 100, "con tu dato", "fill-zinc-600 dark:fill-zinc-300", 11)}
      {flecha("M185 86 L258 86", id)}
      {flecha("M402 86 L472 86", id)}
      {punto("M185 86 L258 86", "2.6s")}
      {punto("M402 86 L472 86", "2.6s", "fill-emerald-600 dark:fill-emerald-400", 5)}
      {txt(335, 178, "las del tutorial (open-meteo, github, pollinations…) ponen «*»: puerta abierta", "fill-zinc-600 dark:fill-zinc-300 italic", 12)}
    </Marco>
  );
}

function FigError() {
  const id = "error";
  return (
    <Marco id={id} viewBox="0 0 670 195" label="Cuando algo no sale: copia el error tal cual de la consola (F12 → Console), pégalo en el chat y pide el arreglo. Pegar el error es el 90 % del debugging.">
      {/* consola */}
      <rect x={25} y={35} width={230} height={110} rx={12} className="fill-zinc-900 dark:fill-black stroke-zinc-500" strokeWidth={2} />
      <rect x={25} y={35} width={230} height={22} rx={12} className="fill-zinc-800" />
      <circle cx={42} cy={46} r={4} className="fill-red-500" />
      <circle cx={56} cy={46} r={4} className="fill-amber-500" />
      <circle cx={70} cy={46} r={4} className="fill-emerald-500" />
      {txt(40, 78, "Uncaught TypeError:", "fill-red-400 font-mono", 11.5, "start")}
      {txt(40, 95, "  Cannot read", "fill-red-400 font-mono", 11.5, "start")}
      {txt(40, 112, "properties of", "fill-red-400 font-mono", 11.5, "start")}
      {txt(40, 129, "undefined", "fill-red-400 font-mono", 11.5, "start")}
      {/* seleccionando el texto */}
      <rect x={34} y={84} width={180} height={18} rx={3} className="fill-blue-500/30">
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.3;0.7;1" dur="4s" repeatCount="indefinite" />
      </rect>
      {flecha("M262 90 L330 90", id)}
      {punto("M262 90 L330 90", "2s")}
      {/* burbuja al chat */}
      <rect x={340} y={55} width={185} height={72} rx={12} className={caja} strokeWidth={2} />
      {txt(355, 80, "«Este error me da:", "fill-zinc-700 dark:fill-zinc-300", 12, "start")}
      {txt(355, 98, "arregla y dime por", "fill-zinc-700 dark:fill-zinc-300", 12, "start")}
      {txt(355, 116, "qué pasaba» →", "fill-zinc-700 dark:fill-zinc-300", 12, "start")}
      {flecha("M532 91 L585 91", id)}
      {/* check verde */}
      <circle cx={615} cy={91} r={17} className="fill-emerald-100 dark:fill-emerald-500/20" />
      <path d="M606 91 l7 7 l12 -14" fill="none" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" className="stroke-emerald-600 dark:stroke-emerald-400">
        <animate attributeName="stroke-dasharray" values="0 40;40 0" dur="4s" repeatCount="indefinite" />
      </path>
      {txt(335, 175, "nunca describas el síntesis de oídas: pega el texto rojo exacto", "fill-zinc-600 dark:fill-zinc-300 italic", 12)}
    </Marco>
  );
}

// ── chatbot ──────────────────────────────────────────────────────────────────

function FigSistema() {
  const id = "sistema";
  return (
    <Marco id={id} viewBox="0 0 670 235" label="Cada pregunta viaja con dos mensajes: el del visitante (visible) y el de sistema (tus instrucciones, ocultas). El bot responde solo con permiso del segundo.">
      {/* carril de arriba: sistema (sellado) */}
      <rect x={25} y={18} width={250} height={44} rx={10} className="fill-amber-50 dark:fill-amber-500/10 stroke-amber-400 dark:stroke-amber-500/60" strokeWidth={1.8} />
      {txt(40, 36, "🔒 TU FICHA (prompt de sistema):", "fill-amber-800 dark:fill-amber-200 font-bold", 11.5, "start")}
      {txt(40, 52, "«responde con lo de la ficha, NUNCA…»", "fill-amber-800/80 dark:fill-amber-200/80", 10.5, "start")}
      {/* carril de abajo: visitante */}
      <rect x={25} y={92} width={250} height={44} rx={10} className={caja} strokeWidth={1.8} />
      {txt(40, 110, "💬 VISITANTE:", "fill-zinc-700 dark:fill-zinc-300 font-bold", 11.5, "start")}
      {txt(40, 126, "«¿qué estudios haces?»", "fill-zinc-600 dark:fill-zinc-400", 11, "start")}
      {/* los dos viajan al bot */}
      {flecha("M280 40 C 360 40, 380 90, 445 108", id, "stroke-amber-500 dark:stroke-amber-400")}
      {flecha("M280 114 C 350 114, 380 112, 445 112", id)}
      {punto("M280 40 C 360 40, 380 90, 445 108", "2.6s", "fill-amber-500", 5)}
      {punto("M280 114 C 350 114, 380 112, 445 112", "2.6s", "fill-blue-600 dark:fill-blue-400", 5)}
      {/* bot */}
      <g>
        <rect x={460} y={72} width={66} height={52} rx={14} className="fill-blue-600 dark:fill-blue-500" />
        <circle cx={480} cy={96} r={5} className="fill-white" />
        <circle cx={506} cy={96} r={5} className="fill-white" />
        <line x1={493} y1={72} x2={493} y2={60} strokeWidth={3} className="stroke-blue-600 dark:stroke-blue-500" />
        <circle cx={493} cy={56} r={4} className="fill-blue-600 dark:fill-blue-500">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* salida */}
      {flecha("M530 98 L570 98", id, "stroke-emerald-600 dark:stroke-emerald-400")}
      <rect x={575} y={70} width={80} height={56} rx={12} className={caja} strokeWidth={1.8} />
      {txt(615, 92, "«Estudio 1º", "fill-zinc-700 dark:fill-zinc-300", 10.5)}
      {txt(615, 106, "de DAM en el", "fill-zinc-700 dark:fill-zinc-300", 10.5)}
      {txt(615, 120, "Simarro»", "fill-zinc-700 dark:fill-zinc-300", 10.5)}
      {txt(335, 168, "el visitante no ve la ficha: por eso puedes exigir sin miedo", "fill-zinc-600 dark:fill-zinc-300 italic", 12)}
      {txt(335, 188, "las dos burbujas llegan SIEMPRE juntas en cada pregunta", "fill-zinc-600 dark:fill-zinc-300 italic", 12)}
    </Marco>
  );
}

function FigRecorrido() {
  const id = "recorrido";
  return (
    <Marco id={id} viewBox="0 0 670 240" label="El recorrido del dato que te van a preguntar en la defensa: 5 pasos, una vuelta completa.">
      {[
        { x: 90, y: 60, t: "burbuja", s: "visita" },
        { x: 260, y: 60, t: "script", s: "petición" },
        { x: 430, y: 60, t: "modelo IA", s: "sin clave" },
        { x: 590, y: 60, t: "respuesta", s: "texto" },
        { x: 590, y: 170, t: "pantalla", s: "burbuja" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 58} y={n.y - 26} width={116} height={52} rx={12} className={caja} strokeWidth={2} />
          {txtFuerte(n.x, n.y - 2, n.t, 13)}
          {txt(n.x, n.y + 16, n.s, "fill-zinc-600 dark:fill-zinc-300", 11)}
          {i < 3 && <line x1={n.x + 62} y1={n.y} x2={n.x + 108} y2={n.y} strokeWidth={2.5} markerEnd={`url(#fl-${id})`} className="stroke-blue-600 dark:stroke-blue-400" />}
          {i === 3 && <line x1={n.x} y1={n.y + 30} x2={n.x} y2={n.y + 76} strokeWidth={2.5} markerEnd={`url(#fl-${id})`} className="stroke-blue-600 dark:stroke-blue-400" />}
        </g>
      ))}
      {/* vuelta al visitante */}
      <path d="M532 172 C 400 228, 180 228, 96 100" fill="none" strokeWidth={2.5} strokeDasharray="6 6" markerEnd={`url(#fg-${id})`} className="stroke-emerald-600 dark:stroke-emerald-400" />
      {txt(300, 236, "el visitante recibe la respuesta en su burbuja — nadie vio la ficha", "fill-zinc-500 dark:fill-zinc-400 italic", 11.5)}
      {punto("M90 60 L260 60 L430 60 L590 60 L590 170 C 590 216, 190 224, 96 100", "6s", "fill-blue-600 dark:fill-blue-400", 6)}
    </Marco>
  );
}

function FigFiltros() {
  const id = "filtros";
  return (
    <Marco id={id} viewBox="0 0 670 210" label="Tres embudos de la ficha: qué sabe el bot, qué calla y qué pasa si insisten. Escrito por ti, en orden de importancia.">
      {[
        { y: 30, w: 420, c: "fill-blue-100 dark:fill-blue-500/20 stroke-blue-400 dark:stroke-blue-500/50", t: "SÍ responde: qué curso hago, contacto, proyectos…", x: 335 },
        { y: 88, w: 330, c: "fill-amber-50 dark:fill-amber-500/10 stroke-amber-400 dark:stroke-amber-500/60", t: "NUNCA: mi dirección, mi móvil, datos de terceros", x: 335 },
        { y: 146, w: 240, c: "fill-emerald-50 dark:fill-emerald-500/10 stroke-emerald-400 dark:stroke-emerald-500/60", t: "SI NO SABES: «eso pregúntamelo por correo»", x: 335 },
      ].map((f) => (
        <g key={f.t.slice(0, 8)}>
          <rect x={f.x - f.w / 2} y={f.y} width={f.w} height={44} rx={10} className={f.c} strokeWidth={2} />
          {txt(f.x, f.y + 27, f.t, "fill-zinc-800 dark:fill-zinc-200", 12)}
        </g>
      ))}
      <path d="M335 74 L335 88 M335 132 L335 146" strokeWidth={2.5} markerEnd={`url(#fm-${id})`} className="stroke-zinc-400 dark:stroke-zinc-500" fill="none" />
      {punto("M335 74 L335 146", "3s", "fill-blue-600 dark:fill-blue-400", 5)}
    </Marco>
  );
}

// ── medios ───────────────────────────────────────────────────────────────────

function FigSvgTexto() {
  const id = "svgtexto";
  return (
    <Marco id={id} viewBox="0 0 670 175" label="Un SVG no es una foto: es texto que describe formas. La IA escribe ese texto, tú lo pegas, y el navegador lo dibuja — por eso escala sin pixelarse y cambia de color con tu CSS.">
      <rect x={25} y={22} width={290} height={118} rx={12} className="fill-zinc-900 dark:fill-black stroke-zinc-500" strokeWidth={2} />
      {['<svg viewBox="0 0 64 64">', '  <circle cx="32" cy="32"', '    r="26" fill="none"', '    stroke="currentColor"', '    stroke-width="6"/>', "</svg>"].map((l, i) => (
        <text key={i} x={40} y={48 + i * 17} fontSize={11.5} className="fill-emerald-300 font-mono">
          {l}
        </text>
      ))}
      {flecha("M322 82 L400 82", id, "stroke-emerald-600 dark:stroke-emerald-400")}
      {punto("M322 82 L400 82", "2s", "fill-emerald-600 dark:fill-emerald-400", 5)}
      {/* el anillo renderizado, girando */}
      <g>
        <circle cx={480} cy={82} r={26} fill="none" strokeWidth={6} className="stroke-blue-600 dark:stroke-blue-400" strokeDasharray="120 50">
          <animateTransform attributeName="transform" type="rotate" from="0 480 82" to="360 480 82" dur="6s" repeatCount="indefinite" />
        </circle>
      </g>
      {txt(575, 78, "mismo color", "fill-zinc-600 dark:fill-zinc-400", 11.5)}
      {txt(575, 94, "que tu marca", "fill-zinc-600 dark:fill-zinc-400", 11.5)}
      {txt(335, 162, "currentColor = «el color del texto de alrededor»: modo oscuro gratis", "fill-zinc-600 dark:fill-zinc-300 italic", 12)}
    </Marco>
  );
}

function FigIconAnim() {
  const id = "iconanim";
  return (
    <Marco id={id} viewBox="0 0 670 160" label="Tres micro-animaciones con misión: aparecer al hacer scroll (orden de lectura), el icono que responde al pasar por encima («esto es interactivo») y un contador que crece (evidencia numérica).">
      {/* aparición al hacer scroll */}
      <g>
        <rect x={35} y={30} width={150} height={70} rx={10} className={caja} strokeWidth={1.8} />
        <rect x={50} y={44} width={120} height={10} rx={3} className="fill-blue-200 dark:fill-blue-500/40">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.2;0.45;1" dur="4.5s" repeatCount="indefinite" />
          <animate attributeName="y" values="60;60;44;44" keyTimes="0;0.2;0.45;1" dur="4.5s" repeatCount="indefinite" />
        </rect>
        <rect x={50} y={62} width={90} height={8} rx={3} className="fill-zinc-200 dark:fill-zinc-700">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.3;0.55;1" dur="4.5s" repeatCount="indefinite" />
        </rect>
        {txt(110, 122, "aparecer al entrar", "fill-zinc-600 dark:fill-zinc-300", 11)}
      </g>
      {/* icono hover */}
      <g>
        <rect x={260} y={30} width={150} height={70} rx={10} className={caja} strokeWidth={1.8} />
        <g>
          <path d="M318 48 l16 12 l-16 12 z" className="fill-emerald-500">
            <animateTransform attributeName="transform" type="translate" values="0 0; 8 0; 0 0" dur="2.6s" repeatCount="indefinite" />
          </path>
          <circle cx={358} cy={60} r={12} fill="none" strokeWidth={3} className="stroke-emerald-600 dark:stroke-emerald-400">
            <animate attributeName="r" values="12;14;12" dur="2.6s" repeatCount="indefinite" />
          </circle>
        </g>
        {txt(335, 122, "responder al cursor", "fill-zinc-600 dark:fill-zinc-300", 11)}
      </g>
      {/* contador */}
      <g>
        <rect x={485} y={30} width={150} height={70} rx={10} className={caja} strokeWidth={1.8} />
        <text x={560} y={78} textAnchor="middle" fontSize={26} className="fill-blue-700 dark:fill-blue-300 font-extrabold">
          12
          <animate attributeName="opacity" values="0.2;1;1" keyTimes="0;0.5;1" dur="3s" repeatCount="indefinite" />
        </text>
        {txt(560, 122, "contar lo que presumir", "fill-zinc-600 dark:fill-zinc-300", 11)}
      </g>
    </Marco>
  );
}

function FigVideo() {
  const id = "video";
  return (
    <Marco id={id} viewBox="0 0 670 175" label="El vídeo de tu web, bien puesto: con poster antes de cargar, sin autoplay y con controles — así no come datos ni molesta.">
      <rect x={145} y={22} width={380} height={108} rx={12} className="fill-zinc-900 dark:fill-black stroke-zinc-500" strokeWidth={2} />
      {/* poster: miniatura */}
      <rect x={160} y={34} width={350} height={84} rx={8} className="fill-zinc-800" />
      <rect x={170} y={42} width={90} height={14} rx={3} className="fill-blue-500/60" />
      <rect x={170} y={62} width={140} height={8} rx={3} className="fill-zinc-600" />
      <rect x={170} y={76} width={110} height={8} rx={3} className="fill-zinc-600" />
      {/* botón play pulsante */}
      <circle cx={335} cy={76} r={22} className="fill-white/90">
        <animate attributeName="r" values="20;23;20" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <path d="M329 66 l14 10 l-14 10 z" className="fill-zinc-900" />
      {/* barra de progreso (no autoplay: empieza a 0) */}
      <rect x={160} y={112} width={350} height={5} rx={2} className="fill-zinc-700" />
      <rect x={160} y={112} width={0} height={5} rx={2} className="fill-blue-500">
        <animate attributeName="width" values="0;0;120;350" keyTimes="0;0.35;0.7;1" dur="7s" repeatCount="indefinite" />
      </rect>
      {txt(335, 155, "poster = foto de portada · preload=none = no gasta datos hasta que le dan", "fill-zinc-600 dark:fill-zinc-300 italic", 12)}
    </Marco>
  );
}

function FigArbol() {
  const id = "arbol";
  const ramas = [
    { x: 90, w: 160, a: "«horario»", b: "«estudios»", r: "estudio 1º DAM", s: "2 frases, mi texto", amber: false },
    { x: 270, w: 160, a: "«contacto»", b: "«escribir»", r: "escríbeme a ___", s: "mi canal real", amber: false },
    { x: 450, w: 160, a: "«proyectos»", b: "«hecho»", r: "mira mi sección", s: "los de mi web", amber: false },
    { x: 630, w: 150, a: "no coincide", b: "nada", r: "«pídeme mi correo»", s: "mensaje por defecto", amber: true },
  ];
  return (
    <Marco id={id} viewBox="0 0 720 235" label="Un bot sin IA: la pregunta busca palabra clave y cae en una rama; si no coincide nada, el mensaje por defecto remite a tu contacto. Todo lo que dice está escrito por ti — por eso no puede inventar ni filtrar. Y funciona hasta sin red, con 0 KB de descarga.">
      <rect x={275} y={14} width={170} height={40} rx={10} className="fill-blue-50 dark:fill-blue-500/10 stroke-blue-400 dark:stroke-blue-500/60" strokeWidth={2} />
      {txt(360, 32, "el visitante escribe", "fill-blue-800 dark:fill-blue-200 font-bold", 12.5)}
      {txt(360, 47, "«¿qué estudias?»", "fill-blue-800/80 dark:fill-blue-200/80", 11)}
      {ramas.map((n) => (
        <g key={n.x}>
          <path d={`M360 54 C 360 80, ${n.x} 78, ${n.x} 100`} fill="none" strokeWidth={2} className={n.amber ? "stroke-amber-500/70" : "stroke-zinc-400 dark:stroke-zinc-600"} strokeDasharray={n.amber ? "5 4" : undefined} />
          <rect x={n.x - n.w / 2} y={100} width={n.w} height={34} rx={8} className={n.amber ? "fill-amber-50 dark:fill-amber-500/10 stroke-amber-400 dark:stroke-amber-500/60" : "fill-emerald-50 dark:fill-emerald-500/10 stroke-emerald-400 dark:stroke-emerald-500/60"} strokeWidth={1.6} />
          {txt(n.x, 114, n.amber ? n.a : `contiene ${n.a}`, n.amber ? "fill-amber-800 dark:fill-amber-200" : "fill-emerald-800 dark:fill-emerald-300", 11)}
          {txt(n.x, 127, n.amber ? n.b : `o ${n.b}`, n.amber ? "fill-amber-800 dark:fill-amber-200 font-bold" : "fill-emerald-800 dark:fill-emerald-300 font-bold", 11)}
          <path d={`M${n.x} 134 L${n.x} 156`} fill="none" strokeWidth={2} markerEnd={n.amber ? `url(#fm-${id})` : `url(#fg-${id})`} className={n.amber ? "stroke-amber-500" : "stroke-emerald-600 dark:stroke-emerald-400"} />
          <rect x={n.x - n.w / 2} y={158} width={n.w} height={44} rx={9} className={caja} strokeWidth={1.8} />
          {txt(n.x, 177, `«${n.r}»`, "fill-zinc-800 dark:fill-zinc-200 font-bold", 11.5)}
          {txt(n.x, 193, n.s, "fill-zinc-500 dark:fill-zinc-400", 10.5)}
        </g>
      ))}
    </Marco>
  );
}

function FigNiveles() {
  const id = "niveles";
  return (
    <Marco id={id} viewBox="0 0 670 235" label="Cuatro niveles de esfuerzo para el mismo criterio de «canal con respuesta automática»: cada escalón suma defensa, cada uno cuesta más. Empieza por abajo.">
      {[
        { y: 14, c: "stroke-zinc-400 dark:stroke-zinc-500", t: "1 · Árbol de reglas", s: "sin IA · 0 dependencias · siempre funciona", w: 280, x: 210, col: "fill-zinc-700 dark:fill-zinc-300" },
        { y: 68, c: "stroke-blue-400 dark:stroke-blue-500/60", t: "2 · API gratuita (pollinations)", s: "IA de verdad sin clave · puede saturar", w: 340, x: 180, col: "fill-blue-700 dark:fill-blue-300" },
        { y: 122, c: "stroke-emerald-400 dark:stroke-emerald-500/60", t: "3 · Modelo en el navegador (WebLLM)", s: "local y sin servidor · ~200-800 MB · WebGPU", w: 400, x: 150, col: "fill-emerald-700 dark:fill-emerald-300" },
        { y: 176, c: "stroke-amber-400 dark:stroke-amber-500/60", t: "4 · API del centro (proxy)", s: "clave en el servidor del IES · pendiente de habilitar", w: 460, x: 120, col: "fill-amber-700 dark:fill-amber-300" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x} y={n.y} width={n.w} height={42} rx={10} fill="transparent" strokeWidth={1.8} className={n.c} />
          {txt(n.x + 16, n.y + 18, n.t, `${n.col} font-bold`, 12.5, "start")}
          {txt(n.x + 16, n.y + 34, n.s, "fill-zinc-500 dark:fill-zinc-400", 10.5, "start")}
        </g>
      ))}
      <path d="M70 35 L70 197" fill="none" strokeWidth={2.5} markerEnd={`url(#fm-${id})`} className="stroke-zinc-400 dark:stroke-zinc-500" />
      {txt(52, 118, "esfuerzo →", "fill-zinc-500 dark:fill-zinc-400", 10.5)}
    </Marco>
  );
}

function FigJuego() {
  const id = "juego";
  const nodo = (x: number, y: number, t: string, sub: string, cls: string) => (
    <g>
      <rect x={x} y={y} width={150} height={46} rx={10} className={cls} strokeWidth={1.8} />
      {txt(x + 75, y + 20, t, "fill-zinc-900 dark:fill-zinc-100 font-bold", 12)}
      {txt(x + 75, y + 36, sub, "fill-zinc-600 dark:fill-zinc-400", 10.5)}
    </g>
  );
  return (
    <Marco id={id} viewBox="0 0 670 230" label="La máquina de estados de un mini-juego: cinco cajas y un bucle. Si el visitante puede explicar el juego en una frase, tú puedes explicarle a la IA qué construir — y a ti qué defender.">
      {nodo(30, 20, "INICIO", "botón «Jugar» + récord", "fill-blue-50 dark:fill-blue-500/10 stroke-blue-400 dark:stroke-blue-500/60")}
      {nodo(260, 20, "PREGUNTA / CARTAS", "4 opciones o 8 pares", "fill-zinc-100 dark:fill-slate-800 stroke-zinc-400 dark:stroke-zinc-500")}
      {nodo(490, 20, "¿ACIERTO?", "feedback inmediato", "fill-zinc-100 dark:fill-slate-800 stroke-zinc-400 dark:stroke-zinc-500")}
      {nodo(490, 130, "MARCADOR", "puntos + tiempo, localStorage", "fill-emerald-50 dark:fill-emerald-500/10 stroke-emerald-400 dark:stroke-emerald-500/60")}
      {nodo(30, 130, "FIN", "veredicto + «otra vez»", "fill-amber-50 dark:fill-amber-500/10 stroke-amber-400 dark:stroke-amber-500/60")}
      <line x1={180} y1={43} x2={256} y2={43} strokeWidth={2} markerEnd={`url(#fl-${id})`} className="stroke-blue-600 dark:stroke-blue-400" />
      <line x1={410} y1={43} x2={486} y2={43} strokeWidth={2} markerEnd={`url(#fl-${id})`} className="stroke-blue-600 dark:stroke-blue-400" />
      <path d={`M565 66 L565 126`} strokeWidth={2} markerEnd={`url(#fg-${id})`} className="stroke-emerald-600 dark:stroke-emerald-400" />
      <path d={`M490 148 C 430 148, 385 95, 345 68`} fill="none" strokeWidth={2} markerEnd={`url(#fl-${id})`} className="stroke-blue-600 dark:stroke-blue-400" />
      <text x={448} y={104} fontSize={10.5} className="fill-zinc-500 dark:fill-zinc-400">siguiente ronda</text>
      <path d={`M490 46 C 445 100, 340 112, 186 138`} fill="none" strokeWidth={2} strokeDasharray="5 5" markerEnd={`url(#fm-${id})`} className="stroke-zinc-500 dark:stroke-zinc-400" />
      <text x={300} y={125} fontSize={10.5} className="fill-zinc-500 dark:fill-zinc-400">3 fallos → fin</text>
      {punto("M180 43 L256 43", "2.6s", "fill-blue-600 dark:fill-blue-400", 5)}
      <text x={30} y={212} fontSize={11} className="fill-zinc-500 dark:fill-zinc-400 italic">sin librerías · sin red · teclado y ratón · prefers-reduced-motion respetado</text>
    </Marco>
  );
}

export const FIGURAS: Record<string, () => ReactNode> = {
  commit: FigCommit,
  rama: FigRama,
  token: FigToken,
  pages: FigPages,
  api: FigApi,
  json: FigJson,
  cors: FigCors,
  error: FigError,
  sistema: FigSistema,
  recorrido: FigRecorrido,
  filtros: FigFiltros,
  arbol: FigArbol,
  niveles: FigNiveles,
  svgtexto: FigSvgTexto,
  iconanim: FigIconAnim,
  video: FigVideo,
  juego: FigJuego,
};
