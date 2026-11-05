import type { Metadata } from "next";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

// ════════════════════════════════════════════════════════════════════════════
// Infraestructura IA del IES Simarro — ficha técnica en profundidad.
// Página autocontenida (Server Component puro, sin JS en cliente): todos los
// datos se extrajeron de la máquina viva el 05/11/2026 —docker inspect,
// /proc/1/cmdline, /metrics de vLLM, stats de HAProxy y logs de arranque—.
// Sin claves, sin IPs de acceso, sin datos personales.
// ════════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "TITAN · La infraestructura de IA de un instituto, en vivo — Aula en la Nube",
  description:
    "Ficha técnica del clúster de inferencia local del IES Simarro: 3× RTX PRO 6000 Blackwell, pool elástico de vLLM con Qwen3.8-Flash-Next NVFP4/FP8 a 512k de contexto, HAProxy leastconn, gateway LiteLLM, RAG con Qdrant y una plataforma FastAPI + React sin nube. Números reales, incidentes reales y las lecciones de cada decisión.",
};

// ── Piezas de maquetación (locales a esta página) ────────────────────────────

type Tono = "azul" | "verde" | "ambar" | "morado" | "rojo" | "gris";

function Chip({ children, tono = "azul" }: { children: ReactNode; tono?: Tono }) {
  const cls: Record<Tono, string> = {
    azul: "border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300",
    verde: "border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    ambar: "border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300",
    morado: "border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300",
    rojo: "border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300",
    gris: "border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-300",
  };
  return <span className={`inline-block rounded-full border px-3 py-0.5 text-xs font-semibold ${cls[tono]}`}>{children}</span>;
}

function H2({ id, num, children }: { id: string; num: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-14 flex items-baseline gap-3 text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
      <span className="font-mono text-base font-bold text-blue-600 dark:text-blue-400">{num}</span>
      {children}
    </h2>
  );
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{children}</h3>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</p>;
}

function Tabla({ cab, filas, nota }: { cab: string[]; filas: ReactNode[][]; nota?: string }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-zinc-300 dark:border-zinc-600 text-left">
            {cab.map((c) => (
              <th key={c} className="py-2 pr-4 font-semibold text-zinc-900 dark:text-zinc-100">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((f, i) => (
            <tr key={i} className="border-b border-zinc-200 dark:border-zinc-800 align-top">
              {f.map((cell, j) => (
                <td key={j} className="py-2 pr-4 text-zinc-700 dark:text-zinc-300">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {nota && <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{nota}</p>}
    </div>
  );
}

function Cod({ children, titulo }: { children: ReactNode; titulo?: string }) {
  return (
    <div className="mt-5 max-w-3xl overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-950">
      {titulo && (
        <div className="border-b border-zinc-800 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-zinc-400">{titulo}</div>
      )}
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-relaxed text-emerald-200/95">{children}</pre>
    </div>
  );
}

function K({ children }: { children: ReactNode }) {
  return <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-[13px] text-rose-600 dark:text-rose-400">{children}</code>;
}

function Leccion({ children, color = "ambar" }: { children: ReactNode; color?: "ambar" | "rojo" | "verde" }) {
  const cls =
    color === "rojo"
      ? "border-rose-300 dark:border-rose-500/40 bg-rose-50 dark:bg-rose-500/10"
      : color === "verde"
        ? "border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10"
        : "border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10";
  return (
    <div className={`mt-6 max-w-3xl rounded-xl border-l-4 p-4 ${cls}`}>
      <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Lección aprendida</p>
      <div className="mt-1 text-[14.5px] leading-relaxed text-zinc-800 dark:text-zinc-200">{children}</div>
    </div>
  );
}

export default function InfraestructuraIA() {
  const metricas = [
    { n: "3 × 96 GB", t: "RTX PRO 6000 Blackwell (GDDR7, SM120)" },
    { n: "512k", t: "tokens de contexto por réplica vLLM" },
    { n: "87 %", t: "acierto de prefix cache (métrica viva)" },
    { n: "96", t: "secuencias simultáneas de techo" },
  ];
  const indice: [string, string, string][] = [
    ["titan", "01", "El servidor TITAN"],
    ["modelo", "02", "El modelo: por qué este y no una API"],
    ["pool", "03", "El pool elástico de inferencia"],
    ["numeros", "04", "Números de rendimiento medidos"],
    ["gateway", "05", "Gateway: quién llama a qué"],
    ["plataforma", "06", "La plataforma del centro"],
    ["rag", "07", "RAG, OCR y voz: el resto del stack"],
    ["spark", "08", "Segunda línea: los DGX Spark"],
    ["red", "09", "Red y seguridad sin nube"],
    ["operacion", "10", "Operación, incidentes y lecciones"],
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <Breadcrumbs items={[{ path: "/pp1-simarro/infraestructura-ia/", title: "Infraestructura IA" }]} />

      <div className="flex flex-wrap items-center gap-2">
        <Chip>Ficha técnica · 05/11/2026</Chip>
        <Chip tono="morado">Curso de especialización · IA</Chip>
        <Chip tono="verde">Todo en el centro, sin nube</Chip>
      </div>

      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
        TITAN: la infraestructura de IA de un instituto
      </h1>
      <p className="mt-3 text-xl font-semibold tracking-tight text-zinc-500 dark:text-zinc-400">
        Del metal al chat de clase: inferencia local, pool elástico, RAG y las lecciones de cada decisión
      </p>

      <P>
        Esta página es la versión técnica de cómo está montado el sistema de IA del IES Simarro: el servidor, el
        modelo, el balanceador, el gateway, la plataforma y la red. Está pensada para gente que ya sabe de qué va{" "}
        <em>un token, un batch o un índice de similaridad</em>: cada bloque va al detalle —flags concretos, métricas
        reales extraídas de la máquina en vivo y las decisiones que costaron un incidente—. Los números de esta página
        se extrajeron del sistema <b>en marcha</b> el 5 de noviembre de 2026, no de una presentación comercial.
      </P>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {metricas.map((m) => (
          <div key={m.t} className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <p className="text-3xl font-extrabold tracking-tight text-blue-700 dark:text-blue-300">{m.n}</p>
            <p className="mt-1 text-[13px] leading-snug text-zinc-500 dark:text-zinc-400">{m.t}</p>
          </div>
        ))}
      </div>

      <nav className="mt-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 p-5" aria-label="Índice">
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Índice</p>
        <ol className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
          {indice.map(([id, num, t]) => (
            <li key={id}>
              <a href={`#${id}`} className="text-[15px] text-blue-700 dark:text-blue-300 hover:underline">
                <span className="font-mono text-xs text-zinc-400">{num}</span> {t}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* ── 01 ─────────────────────────────────────────────────────────────── */}
      <H2 id="titan" num="01">El servidor TITAN</H2>
      <P>
        Un único nodo físico en el centro hace de motor de todo: inferencia LLM, síntesis de voz, OCR, embeddings y la
        plataforma web. No es un rack de datacenter: es una workstation de gama profesional reconvertida en servidor.
      </P>
      <Tabla
        cab={["Recurso", "Detalle", "Por qué importa"]}
        filas={[
          [
            <b>3 × GPU</b>,
            <>NVIDIA RTX PRO 6000 Blackwell (Max-Q WS), <b>96 GB GDDR7</b> c/u</>,
            <>Arquitectura SM120: tensor cores nativos FP4/FP8 → el modelo cabecero va cuantizado mixed NVFP4+FP8 sin penalización</>,
          ],
          [
            "CPU",
            <>AMD Threadripper PRO 9995WX · 96 núcleos / 192 hilos, un solo dominio NUMA</>,
            "El offload de pesos a RAM necesita CPU y memoria suelta; y nadie quiere paginar a swap una carga de 180 GB",
          ],
          [
            "RAM",
            <>498 GB DDR5</>,
            <>Descarga de checkpoints de +180 GB y <K>VLLM_PLE_CPU_OFFLOAD</K> por réplica (§03)</>,
          ],
          [
            "Almacenamiento",
            <>RAID software <K>md0</K> · 15 TB, 16 % usado</>,
            "Modelos, corpus RAG, grabaciones de clase y backups en el mismo sitio: copia 3-2-1 sin contratos",
          ],
          [
            "SO / motor",
            <>Ubuntu 26.04 LTS · Docker 29 · Compose · vLLM en <b>imagen a medida</b> (build <K>8e685d1</K>) · CUDA 13</>,
            "Todo versionado en ficheros compose; nada de instaladores mágicos ni estado solo «en la máquina»",
          ],
          [
            "Driver",
            <>595.99.02</>,
            <>Detalle con historia: si el driver sube sin reiniciar el host, <K>nvidia-smi</K> miente (<em>NVML driver/library mismatch</em>) aunque la inferencia siga volando</>,
          ],
        ]}
      />
      <P>
        La idea de «una máquina, todo dentro» es deliberada: el centro no paga API por token, no saca datos del
        edificio y no depende de Internet para que un claustro entero use la IA a la vez. El coste real es la{" "}
        <em>disciplina operativa</em> que describe esta página: pools elásticos, watchdogs y runbooks, porque aquí no
        hay un equipo SRE de un proveedor detrás.
      </P>

      {/* ── 02 ─────────────────────────────────────────────────────────────── */}
      <H2 id="modelo" num="02">El modelo: por qué este y no una API</H2>
      <P>
        El modelo cabecero es <b>Qwen3.8-Flash-Next</b> con checkpoint <K>mixed-NVFP4-FP8</K> —revisión pinneada,
        montada solo lectura; 183,8 GB en disco, <b>72,07 GiB de pesos por GPU</b> según el log de arranque del motor—.
        No se eligió por el ranking de moda, sino por tres propiedades verificables en su <K>config.json</K>:
      </P>
      <Tabla
        cab={["Propiedad", "Valor real", "Consecuencia de ingeniería"]}
        filas={[
          [
            <b>MoE muy disperso</b>,
            <>512 expertos, <b>10 activos</b> por token (<K>moe_intermediate_size 640</K>)</>,
            <>La velocidad sigue a los parámetros <b>activos</b>, no a los totales: capacidad grande con coste de decode pequeño</>,
          ],
          [
            <b>Atención híbrida</b>,
            <>48 capas: <b>36 lineales + 12 completas</b> (una cada 4)</>,
            "El KV cache solo crece con las 12 capas completas → 512k de contexto caben en 14,5 GiB por réplica",
          ],
          [
            <b>GQA extremo</b>,
            "24 cabezas de consulta, solo 2 de KV · head_dim 256",
            "KV por token diminuto: multiplicar réplicas no multiplica la memoria de contexto",
          ],
          [
            <b>Contexto</b>,
            <>262.144 nativo → <b>524.288</b> con YaRN (factor 2,0, mrope interleave vía <K>--hf-overrides</K>)</>,
            "Un dossier de oposición de cientos de páginas entra entero en una sola petición, sin truncar ni ventana deslizante",
          ],
        ]}
      />
      <H3>La aritmética del KV cache, con cifras de la máquina</H3>
      <P>
        Cada token en contexto cuesta KV en las 12 capas completas: 2 cabezas × 256 dimensiones × 2 (K y V) × 2 bytes
        (bf16) ≈ <b>24,6 KB/token</b>. La reserva se fija <em>a mano</em> con <K>--kv-cache-memory=15569256448</K>{" "}
        (14,5 GiB, sin dejar que el perfilado automático decida), y el motor lo traduce en <K>604.705 tokens de KV</K>{" "}
        —literal del log—: cuadra con el coste por token. Con esa reserva la <em>máxima concurrencia para una petición
        del contexto completo es 1,15×</em>: una conversación puede ocupar los 512k enteros, pero entonces la tarjeta
        queda llena de contexto y las demás esperan. La reserva de KV es, literalmente, el presupuesto de memoria
        compartida entre todas las conversaciones vivas.
      </P>
      <H3>Cuánto cuesta «no usar la API» (y por qué sale a cuenta)</H3>
      <P>
        La pregunta de todo experto: ¿por qué no una API de terceros, que no obliga a mantener nada? Cuatro razones que
        sostienen esto en un centro público: <b>protección de datos con menores</b> (los datos del alumnado no salen del
        edificio); <b>coste marginal cero</b> (una tanda de ~25 exámenes generados por agentes, con ≈21k tokens de
        salida cada uno, sería una factura considerable en cualquier API: aquí son horas de GPU amortizada);{" "}
        <b>disponibilidad soberana</b> (la IA funciona con la fibra del instituto caída); y <b>valor docente</b>: el
        alumnado del ciclo puede auditarlo todo —del <K>cmdline</K> de vLLM a los percentiles de latencia— porque el
        sistema es suyo.
      </P>

      {/* ── 03 ─────────────────────────────────────────────────────────────── */}
      <H2 id="pool" num="03">El pool elástico: tres réplicas, un endpoint</H2>
      <P>
        Sobre las 3 GPU corren réplicas idénticas de vLLM con <b>TP=1</b> (una tarjeta cada una: el reparto de
        tensores entre GPUs solo compensa cuando el modelo no cabe, y aquí cabe cuantizado; además TP añade
        comunicación inter-GPU y acopla los fallos). Un <b>HAProxy 3.0 en red host</b> las agrega tras un único
        endpoint OpenAI-compatible, <K>:8000/v1</K>, con <K>balance leastconn</K> —cada petición va a la réplica con
        menos conexiones vivas, que en streaming LLM es el proxy correcto de «menos carga»—.
      </P>
      <P>
        La palabra <em>elástico</em> es la parte interesante: las réplicas <b>no</b> tienen el mismo estatus.
      </P>
      <Tabla
        cab={["GPU", "Papel", "Política"]}
        filas={[
          [
            <b>GPU 0 · qwen0</b>,
            "El chat del instituto",
            <>Nunca sale del pool: es el único server sin <K>disabled</K> en el cfg. Si HAProxy arranca de cero y nadie reconcilia, el endpoint <em>sigue sirviendo</em>. Es la garantía de servicio mínima; los scripts de gestión se niegan a bajar de una réplica sana sin <K>--force</K></>,
          ],
          [
            <b>GPU 1 · qwen1</b>,
            "Capacidad prestada",
            <>Arranca <b>fuera</b> del pool y entra solo tras un <em>smoke test con contenido</em>: que genere texto, no solo que responda <K>/health</K>. Así una recarga del balanceador no puede mandar tráfico a una GPU que se prestó a otro modelo</>,
          ],
          [
            <b>GPU 2 · qwen2</b>,
            "Prestada + auxiliares",
            "Compartida con voz (TTS), OCR y embeddings: o Qwen o auxiliares, nunca ambos (una réplica pide ~90 GiB). Los cuatro servicios auxiliares forman un solo interruptor; mientras la GPU sirve Qwen, la voz y la ingesta RAG están caídas",
          ],
        ]}
      />
      <P>
        El ciclo de vida lo gobierna un runbook con tres verbos: <K>titanctl release N --purpose X</K> (drena{" "}
        <em>sin cortar</em>: espera hasta 30 minutos a que terminen las generaciones en vuelo, y solo entonces para y
        libera la GPU para otro modelo), <K>titanctl restore N</K> (arranca, espera, smoke test y alta en el pool) y{" "}
        <K>titanctl reconcile</K> (ajusta el pool a la realidad de las GPUs). Un <em>timer</em> systemd cada 30 s hace
        de guardián: si el endpoint muere o la realidad y la configuración divergen, lo reconcilia él.
      </P>
      <H3>Los flags de cada réplica, tal cual corren</H3>
      <Cod titulo={String.raw`docker exec titan-qwen38-0 sh -c 'tr "\0" " " < /proc/1/cmdline'`}>
{`vllm serve /model --served-model-name qwen3.8-flash-next
  --tensor-parallel-size=1          # una GPU por réplica, sin TP
  --max-model-len=524288            # 512k vía YaRN (hf-overrides factor 2.0)
  --gpu-memory-utilization=0.97     # 94,4 GiB de los 96
  --kv-cache-memory=15569256448     # 14,5 GiB A MANO → 604.705 tokens de KV
  --max-num-seqs=32                 # techo por réplica → 96 secuencias en el pool
  --enable-prefix-caching           # 87 % de acierto medido (§04)
  --enable-auto-tool-choice --tool-call-parser=qwen3_coder
  --reasoning-parser=qwen3          # razonamiento visible en el stream
  env: VLLM_PLE_CPU_OFFLOAD=1       # pesos PLE (Per-Layer Embeddings) en RAM del host
  env: HF_HUB_OFFLINE=1             # imposible «tirar de la descarga»: aire puro`}
      </Cod>
      <P>
        Leer <K>/proc/1/cmdline</K> como fuente de verdad no es un truco cosmético: cuando se cambian flags de
        rendimiento de noche sobre varias réplicas, lo normal es que una quede con el flag nuevo y las otras con el
        viejo. La auditoría de uniformidad se hace al proceso, no al compose.
      </P>

      {/* ── 04 ─────────────────────────────────────────────────────────────── */}
      <H2 id="numeros" num="04">Números medidos (no estimados)</H2>
      <P>
        Todo esto sale de <K>/metrics</K> de vLLM, del CSV de stats de HAProxy y de <K>docker logs</K>, con el método
        anotado —que es la mitad del dato—. La regla de oro de la medición en casa: <em>un pico con 1-2 peticiones
        corriendo no es un techo de throughput, y un bench de 5 hilos no es la carga real</em>.
      </P>
      <Tabla
        cab={["Qué", "Número", "Cómo se midió"]}
        filas={[
          [
            <b>Prefill agregado</b>,
            <>≈ <b>17.400 tok/s</b></>,
            <>Delta de <K>vllm:prompt_tokens_total</K> en las 3 réplicas, ventana 45 s, con 17-21 sesiones de agentes reales activas</>,
          ],
          [
            <b>Generación agregada</b>,
            <>825 tok/s en carga real · 441 tok/s bench idle · 104 tok/s en serie</>,
            <>Ídem con <K>generation_tokens_total</K>; el bench usa <K>ignore_eos</K> y <K>max_tokens</K> fijo (5 flujos × 600 tok)</>,
          ],
          [
            <b>TTFT medio</b>,
            <>≈ <b>390 ms</b></>,
            <>Sum/count de <K>time_to_first_token_seconds</K> de una réplica (1.136 peticiones desde su arranque)</>,
          ],
          [
            <b>Latencia e2e media</b>,
            "12,2 s/petición",
            <>Sum/count de <K>e2e_request_latency_seconds</K>: son respuestas largas de agentes, no frases de chat</>,
          ],
          [
            <b>Prefix cache</b>,
            <>22,6 M aciertos / 26,0 M consultas = <b>87 %</b></>,
            <>Contadores <K>prefix_cache_hits/queries_total</K> de una réplica, acumulados desde su arranque</>,
          ],
          [
            <b>Ratio prompt:generación</b>,
            "26,0 M : 1,28 M ≈ 20 : 1",
            "El workload real es prefill-dominated: los agentes reenvían contextos enormes que el prefix-cache rescata en gran parte",
          ],
          [
            <b>Curva de escalado</b>,
            "4 sesiones ≈ 380 tok/s · 16 ≈ 1.150 · 25 a la vez = contraproducente",
            <>Bins de <K>«Avg generation throughput … Running: N reqs»</K> en los logs del logger de vLLM</>,
          ],
        ]}
      />
      <Leccion>
        La curva de escalado destruyó la hipótesis más ingenua: con 3×32 secuencias disponibles, meter 25 agentes a la
        vez <em>baja</em> el rendimiento por sesión (mediana de 77-108 min por subagente, y una tanda que hubo que
        relanzar) frente a oleadas de 8-12. Cada agente extra no añade GPU: reparte la misma. Y el cuello real resultó
        ser el <b>prefill</b>, no el decode —por eso las palancas efectivas fueron prompts más ligeros y afinidad de
        prefix-cache, y no subir <K>--max-num-seqs</K> a ciegas (16→32 sí se midió: +57 % de agregado; la siguiente
        palanca es cabecear ráfagas, no subir el techo medio)—.
      </Leccion>

      {/* ── 05 ─────────────────────────────────────────────────────────────── */}
      <H2 id="gateway" num="05">Gateway: quién llama a qué</H2>
      <P>Entre los consumidores y el pool hay dos puertas con funciones distintas:</P>
      <Tabla
        cab={["Puerta", "Qué es", "Para quién"]}
        filas={[
          [
            <b>HAProxy :8000</b>,
            <>Balance puro al pool vLLM: health-check <K>GET /health</K> cada 3 s (<K>fall 2 rise 2</K>), <K>redispatch</K> ante error de conexión, timeouts de 1 h para streaming largo</>,
            "La plataforma del centro: backend, grabadora, agentes internos. Una URL vale para cualquier número de réplicas vivas",
          ],
          [
            <b>LiteLLM :8300</b>,
            <>Gateway con API keys por cliente, presupuestos, registro de uso y <K>max_parallel_requests</K> por clave; expone variantes del mismo modelo (p. ej. <K>-thinking</K> con <K>enable_thinking</K>)</>,
            "Herramientas externas de agentes (CLI de código, asistentes) que entran por VPN bajo TLS con <K>/llmapi/v1</K>: una clave = identidad + límite + trazabilidad",
          ],
        ]}
      />
      <Cod titulo="haproxy.cfg (extracto real, réplicas 1 y 2 fuera del pool a propósito)">
{`frontend openai_front
  bind 0.0.0.0:8000
  monitor-uri /haproxy-health
  default_backend qwen_pool

backend qwen_pool
  balance leastconn
  option httpchk
  http-check send meth GET uri /health
  http-check expect status 200
  default-server check inter 3s fall 2 rise 2
  retries 2
  option redispatch
  server qwen0 127.0.0.1:8100            # chat: siempre en el pool
  server qwen1 127.0.0.1:8101 disabled   # prestada: entra con smoke test
  server qwen2 127.0.0.1:8102 disabled`}
      </Cod>
      <Leccion color="rojo">
        El rate-limit que parecía «GPU saturada» era la <b>clave de API</b>: una tanda de agentes devolvía 429 con el
        pool vacío. Diagnóstico que corta el ruido: <em>un 429 que llega en menos de 100 ms es la puerta, no el
        motor</em>. El límite real vive en la tabla de tokens de LiteLLM (<K>max_parallel_requests</K>: 16 → 64) y
        subirlo no exige reiniciar nada. Regla de dimensionado: una tanda de N agentes paralelos exige límite ≥ N en su
        clave, o tormenta de 429 y turnos muertos a medias sin que nada se caiga.
      </Leccion>

      {/* ── 06 ─────────────────────────────────────────────────────────────── */}
      <H2 id="plataforma" num="06">La plataforma del centro</H2>
      <P>
        La interfaz que usa el claustro y el alumnado —chat con voz, resúmenes, corrección de exámenes, corpus,
        grabadora de clases— es un monorepo desplegado en el mismo titan:
      </P>
      <Tabla
        cab={["Pieza", "Stack", "Detalle técnico relevante"]}
        filas={[
          [
            "Backend",
            <>Python · FastAPI · SQLAlchemy 2 <b>async</b> · Alembic (52 migraciones)</>,
            <>Proxy fino: <b>no ejecuta modelos</b>, llama al pool por HTTP (<K>host.docker.internal:8000/v1</K>, el truco <K>host-gateway</K> de Linux para cruzar la red de Docker). Streaming SSE y WebSocket con <K>proxy_buffering off</K> en nginx para que el primer token salga ya</>,
          ],
          [
            "Frontends",
            <>React 18 (chat) + React 19 (dashboard) · Vite · Tailwind</>,
            "SPAs servidas por el mismo nginx: un solo origen, sin CORS. i18n en tres lenguas (es/en/va)",
          ],
          [
            "Datos",
            <>PostgreSQL 15 · Redis 7</>,
            "Roles admin / profesorado / alumnado + departamento; el alta de usuarios viene de Moodle (auth externa), no hay registro libre",
          ],
          [
            "Permisos",
            "«Herramienta = permiso»",
            <>Cada herramienta del chat es una constante en un <K>frozenset</K> concedible y su tarjeta solo se pinta si está concedida. Añadir herramienta = constante + <K>include_router</K> con su dependency: el RBAC no se reescribe nunca</>,
          ],
          [
            "Workers",
            <>asyncio <b>in-process</b>, sin Celery ni Redis-cola</>,
            <>Semáforo por tipo de tarea + <K>recover</K> en el lifespan con backend de proceso único. Menos componentes que caen: el patrón completo levanta con un <K>docker compose up -d</K> —y muere igual de rápido—</>,
          ],
        ]}
      />
      <P>
        El flujo del chat, entero: navegador → nginx (TLS, CA propia) → FastAPI → HAProxy → réplica vLLM → stream SSE
        de vuelta. Todo local, todo en la misma máquina, todo auditable.
      </P>

      {/* ── 07 ─────────────────────────────────────────────────────────────── */}
      <H2 id="rag" num="07">RAG, OCR y voz: el resto del stack</H2>
      <H3>Vector search: Qdrant + BGE-M3 híbrido</H3>
      <P>
        El gateway RAG (servicio propio, FastAPI en :8001) usa <b>Qdrant</b> con cuatro colecciones separadas por
        semántica de recuperación, no por capricho: materiales del centro (la que consulta el chat),{" "}
        <em>normativa</em> —allí la recuperación significa otra cosa: manda la <b>vigencia</b>, las fuentes se enseñan
        con enlace y todo se re-ingesta por curso—, exámenes y ejercicios. Los embeddings los produce{" "}
        <K>BAAI/bge-m3</K> (1024 dimensiones, denso + sparse + multilingüe) servido por vLLM <b>en CPU</b>: es
        IO-bound y no debe comer VRAM del chat. La recuperación es híbrida (BM25 + vectorial + reranking): en un corpus
        normativo con términos exactos, el vectorial puro pierde frente a lo que siempre supo Lucene.
      </P>
      <H3>El corpus del centro: cinco decisiones que dan clase</H3>
      <P>
        La herramienta con la que el centro mete documentos en su base de conocimiento tiene detalles que merecen
        explicarse uno a uno: (1) va a la <em>misma colección</em> que consulta el chat, por eso un documento subido a
        las 10:00 cuenta a las 10:01 sin tocar el camino crítico; (2) el texto se extrae <em>dónde toca</em> —txt/csv/
        xlsx los lee el backend in-process, y PDF/DOCX/imágenes van al gateway, que tiene el OCR por GPU{" "}
        <K>DeepSeek-OCR</K>— porque la GPU que presta el OCR se libera a veces y el corpus no puede depender de eso
        para un simple .txt; (3) dos modos de ingesta, <em>inmediata</em> o <em>nocturna</em> (barrido a las 02:30: un
        despliegue a media mañana no se pone a vectorizar cuarenta documentos en horario de clase); (4) metadatos
        obligatorios desde el día 1 —departamento, nivel, etiquetas—, porque nadie rellena una taxonomía después sobre
        cien documentos ya subidos; y (5) <b>verificación de ingesta</b> con búsqueda de prueba desde el panel, en vez
        de «ya saldrá o no saldrá» en una conversación.
      </P>
      <H3>Voz y vídeo: TTS y render como servicios</H3>
      <P>
        <K>Qwen3-TTS</K> (1,7 B, 9 voces, 10 idiomas) sirve la API de audio de OpenAI (<K>POST /v1/audio/speech</K>) en
        seis réplicas de ~4,8 GiB de VRAM cada una —la co-localización forzada de §03; el modelo cabe en cualquier GPU
        libre—. El renderizador produce las vídeo-lecciones (guion → render → locución) en otro contenedor, y la{" "}
        <b>grabadora de clase</b> sube solo audio: <K>faster-whisper</K> en GPU transcribe con <em>semáforo=1</em>{" "}
        para no pisar el pool, y el resumen se genera contra el mismo pool de siempre. Cada capacidad es un servicio con
        su puerto, su healthcheck y su palanca de apagado —nada de librerías incrustadas que solo puedas usar «aquí»—.
      </P>

      {/* ── 08 ─────────────────────────────────────────────────────────────── */}
      <H2 id="spark" num="08">Segunda línea: los DGX Spark</H2>
      <P>
        Titan es un punto de fallo único, y eso en una infraestructura de centro no se lamenta: se combate con una
        segunda línea barata. Dos <b>pares de NVIDIA DGX Spark</b> (módulos GB10, 128 GB unificados CPU+GPU), cada par
        con su HAProxy propio (:8400 y :8401), y <b>LiteLLM repartiendo entre pares por </b><K>least-busy</K>: la misma
        clave de usuario vale en cualquiera de los dos; si un par se apaga, el otro absorbe sin que nadie cambie nada.
      </P>
      <P>
        Detalles que a un experto le van a gustar: cada par puede correr el modelo en <b>perfil DUAL</b> —paralelismo
        entre los dos nodos por fibra ConnectX-7 con NCCL— o en <b>perfil independiente</b> (dos máquinas pequeñas
        separadas, cada una con su pool). El par B todavía no puede con el DUAL: el cable funciona —los dos nodos se ven
        por IPv6 link-local a 0,9 ms—, pero su <K>netplan</K> no declara la dirección IPv4 link-local que NCCL necesita.
        Y un clásico del campo: los hostnames van <em>cruzados</em> respecto a las IPs (spark1 es la .114); el alias
        SSH manda, nunca el orden de las direcciones. Es un clúster de cuatro nodos sin presupuesto de clúster de
        cuatro nodos, con sus runbooks gemelos del de titan.
      </P>

      {/* ── 09 ─────────────────────────────────────────────────────────────── */}
      <H2 id="red" num="09">Red y seguridad: perímetro sin nube</H2>
      <P>
        El sistema vive en una red privada del centro. La superficie expuesta está pensada al revés que la de un SaaS:{" "}
        <b>por defecto nada</b>, y lo que se saca se saca con identidad.
      </P>
      <Tabla
        cab={["Tramo", "Montaje", "Razón técnica"]}
        filas={[
          [
            "Dentro del servidor",
            <>Prácticamente todos los servicios publican solo en <K>127.0.0.1</K>: vLLM 8100-8102, HAProxy :8000, LiteLLM :8300, backend :8200, render :8893…</>,
            "Nada de la IA es alcanzable desde la LAN del centro ni desde fuera: la única puerta pública del host es el nginx :443 de la plataforma",
          ],
          [
            "TLS",
            <>nginx :443 (TLS 1.2/1.3) con <b>CA propia del centro</b>, certificado desplegado en los equipos</>,
            "Sin depender de un emisor externo para servicios que nunca salen del edificio; la confianza distribuida es además control de dispositivos",
          ],
          [
            "Acceso remoto",
            <>OpenVPN cliente (2.7 con <K>DCO</K>) sobre UDP, con <K>ping 10</K> / <K>ping-restart 120</K></>,
            "El acceso de confianza entra <em>dentro</em> de la red, no al revés: titan nunca inicia conexiones salientes hacia casa",
          ],
          [
            "Agentes desde fuera",
            "VPN + LiteLLM bajo TLS con clave por herramienta",
            "Identidad, límite de concurrencia por clave y registro de uso: el rate limiting es un feature, no un obstáculo",
          ],
        ]}
      />
      <Leccion color="rojo">
        <b>El túnel zombi.</b> Un VPN puede estar <K>active (running)</K>, con su interfaz UP y en verde en el monitor,
        y no pasar un solo paquete: pasa tras un re-handshake TLS si la config no declara keepalive. Los síntomas que
        delatan el túnel y no la GPU: 100 % de pérdida al gateway <em>del túnel</em>, el <K>rx_packets</K> de tun0 plano
        con el <K>tx</K> creciendo, mientras el servidor responde a ping por la puerta normal. Diagnóstico: mide deltas
        rx/tx, no mires el estado del servicio. Fix permanente en la config: <K>ping</K> + <K>ping-restart</K> → se
        recupera solo en ~2 minutos.
      </Leccion>

      {/* ── 10 ─────────────────────────────────────────────────────────────── */}
      <H2 id="operacion" num="10">Operación: el sistema se defiende solo (porque le obligamos)</H2>
      <P>
        Infraestructura local en un centro no es «montar y olvidar»: es un ciclo de vigilancia, medición y runbooks. Lo
        que hay en marcha hoy:
      </P>
      <Tabla
        cab={["Mecanismo", "Qué hace"]}
        filas={[
          [
            "Watchdog horario",
            "Revisa en cadena túnel, ruta, SSH, motor de vídeo y el nginx :443; silencio = OK, alerta si algo cae tras reintento",
          ],
          [
            "Guardián del pool (30 s)",
            "Reconcilia el endpoint del pool: si :8000 muere, lo recupera él. Es red de seguridad, no permiso para romperlo",
          ],
          [
            "Reconciliar al arrancar",
            "Tras un reinicio del host, el pool se ajusta solo a la realidad de las GPUs: qué réplicas están vivas manda, no la configuración",
          ],
          [
            "Smoke test con contenido",
            <>Una réplica no entra al pool por responder <K>/health</K>: tiene que <em>generar texto</em></>,
          ],
          [
            "BASELINES.md",
            "Toda medida se anota con su configuración y su contexto (tanda activa vs idle): sin contexto, un número no es un dato, es una anécdota",
          ],
          [
            "drain → recreate → restore",
            "El ritual para cambiar flags de vLLM en producción sin cortar conversaciones en vuelo (y sin descubrir a las 3 de la mañana que solo se aplicó a una de tres réplicas)",
          ],
        ]}
      />
      <Leccion color="verde">
        El incidente que educó la operación: se recargó HAProxy con <K>docker restart</K>… y el endpoint estuvo muerto
        <b> 12 minutos</b>. Por qué: con <K>restart: unless-stopped</K>, una parada <em>deliberada</em> no se relanza —
        el gestor entiende que querías pararlo—. Desde entonces: recarga solo en caliente y validada (comprobar config
        → <K>-sf</K> → reconciliar), jamás <K>docker restart</K> del balanceador, y el guardián de 30 s como red.
        Lección general: <em>en un sistema pequeño, cada componente crítico necesita un gesto protegido y su opuesto
        prohibido, escritos en un runbook.</em>
      </Leccion>
      <P>
        Y el cierre, que es también la demostración: quien ha redactado esta ficha es un modelo corriendo{" "}
        <em>sobre la máquina que describe</em>, leyendo sus propios logs y métricas —la infraestructura auditándose a
        sí misma—. Eso es exactamente lo que ninguna API de terceros te deja hacer, y es la mejor diapositiva de la
        tarde.
      </P>

      <div className="mt-14 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 p-6 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          <b>Ficha técnica · IES Simarro · 5 de noviembre de 2026.</b> Los números se extrajeron en vivo del sistema en
          marcha (<K>docker inspect</K>, <K>/proc/1/cmdline</K>, <K>/metrics</K> de vLLM, stats de HAProxy y logs de
          arranque). Sin claves, sin IPs de acceso, sin datos de usuarios. Los picos de throughput con pocas peticiones
          son cargas reales, no barridos controlados de concurrencia: consúltese el método de cada cifra antes de
          citarla.
        </p>
      </div>
    </div>
  );
}
