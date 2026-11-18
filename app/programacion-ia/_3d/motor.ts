// Motor de los visores 3D del curso (proyecto 3 · juego 3D multijugador).
// Este módulo importa three: se carga SOLO con import() desde Visor3D.tsx, así
// que no pesa en las páginas que no tienen visores.
//
// Cómo funciona:
//  · UN solo WebGLRenderer para toda la página (los navegadores limitan los
//    contextos WebGL a unos 16 y el laboratorio tiene más visores). Cada visor
//    es un <canvas> 2D: el motor pinta su escena en el renderer compartido y
//    copia el resultado con drawImage. Un visor fuera de pantalla no se pinta
//    y conserva su último fotograma.
//  · Cada escena es un guion: una lista de pasos con duración (pasos.ts). El
//    reloj avanza solo, así que en vídeo la escena se explica sin tocarla; en
//    la web se puede girar arrastrando y saltar de paso.
//  · El tiempo sale de la marca de requestAnimationFrame, no de Date.now():
//    así el reloj virtual del motor de grabación manda sobre el movimiento.

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";
import { clone as clonarEsqueleto } from "three/addons/utils/SkeletonUtils.js";
import { ESCENAS, type NombreEscena } from "./pasos";

export { THREE };

// ── Paleta (la de los diagramas del curso, en claro y en oscuro) ─────────────

export const COLOR = {
  azul: 0x3b82f6,
  morado: 0x8b5cf6,
  verde: 0x10b981,
  ambar: 0xf59e0b,
  rosa: 0xf43f5e,
  gris: 0x94a3b8,
  blanco: 0xf8fafc,
} as const;

export type Tema = {
  oscuro: boolean;
  suelo: number;
  rejilla: number;
  rejillaFuerte: number;
  tinta: string;
  papel: string;
  neutro: number;
};

function leerTema(): Tema {
  const raiz = document.documentElement;
  const pedido = raiz.getAttribute("data-theme");
  const oscuro = pedido ? pedido === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  return oscuro
    ? { oscuro, suelo: 0x1b2537, rejilla: 0x2c3a52, rejillaFuerte: 0x475873, tinta: "#e5e9f0", papel: "#0f172a", neutro: 0xcbd5e1 }
    : { oscuro, suelo: 0xe7ebf1, rejilla: 0xcfd6e0, rejillaFuerte: 0xa3aebf, tinta: "#18181b", papel: "#fafafa", neutro: 0x64748b };
}

// ── Lo que recibe y lo que devuelve una escena ───────────────────────────────

export type Fotograma = {
  /** Segundos desde el principio del guion. */
  t: number;
  /** Segundos desde el fotograma anterior (0 si está en pausa). */
  dt: number;
  /** Paso actual (índice en ESCENAS[nombre].pasos). */
  paso: number;
  /** Segundos dentro del paso. */
  tp: number;
  /** Avance del paso, de 0 a 1. */
  u: number;
  /** true en el primer fotograma de un paso (también al volver a empezar). */
  entra: boolean;
};

export type Modelo = { modelo: THREE.Object3D; clips: THREE.AnimationClip[] };

export type Entorno = {
  escena: THREE.Scene;
  camara: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  tema: Tema;
  /** Luz de estudio por defecto (ambiente + direccional con sombras). */
  luces(opciones?: { sombras?: boolean; ambiente?: number; sol?: number }): { ambiente: THREE.HemisphereLight; sol: THREE.DirectionalLight };
  /** Suelo que recibe sombras + rejilla. Devuelve el grupo. */
  suelo(tam?: number, opciones?: { rejilla?: boolean; color?: number }): THREE.Group;
  /** Mapa de entorno de estudio (para reflejos de los materiales PBR). */
  entorno(): THREE.Texture;
  /** Texto que siempre mira a la cámara. `alto` en unidades del mundo. */
  etiqueta(texto: string, opciones?: { color?: string; alto?: number; fondo?: boolean }): THREE.Sprite;
  /** El robot de ejemplo (CC0, Tomás Laulhé / Quaternius), ya escalado a `altura`. */
  robot(altura?: number): Promise<Modelo>;
  /** Coloca la cámara y el punto al que mira (también el de los controles). */
  mirar(posicion: [number, number, number], objetivo?: [number, number, number]): void;
};

export type EscenaViva = {
  actualizar(f: Fotograma): void;
  /** Dato en vivo que se enseña arriba a la derecha (triángulos, valores…). */
  dato?(): string;
  /** Pintado propio (vistas partidas). Si no está, se pinta escena + cámara. */
  pintar?(renderer: THREE.WebGLRenderer, ancho: number, alto: number): void;
  /** La escena mueve la cámara: se desactiva el giro con el ratón. */
  camaraPropia?: boolean;
  destruir?(): void;
};

export type Fabrica = (e: Entorno) => EscenaViva | Promise<EscenaViva>;

// ── Renderer compartido ──────────────────────────────────────────────────────

let renderer: THREE.WebGLRenderer | null = null;
let texturaEntorno: THREE.Texture | null = null;

function obtenerRenderer(): THREE.WebGLRenderer {
  if (renderer) return renderer;
  const r = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  r.setClearColor(0x000000, 0);
  r.shadowMap.enabled = true;
  r.shadowMap.type = THREE.PCFSoftShadowMap;
  r.toneMapping = THREE.ACESFilmicToneMapping;
  r.toneMappingExposure = 0.95;
  renderer = r;
  return r;
}

function obtenerEntorno(): THREE.Texture {
  if (texturaEntorno) return texturaEntorno;
  const r = obtenerRenderer();
  const pmrem = new THREE.PMREMGenerator(r);
  texturaEntorno = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  return texturaEntorno;
}

// ── Recursos comunes ─────────────────────────────────────────────────────────

let robotCargado: Promise<GLTF> | null = null;

function cargarRobot(): Promise<GLTF> {
  robotCargado ??= new GLTFLoader().loadAsync("/programacion-ia/modelos/robot.glb");
  return robotCargado;
}

function crearEtiqueta(tema: Tema, texto: string, opciones: { color?: string; alto?: number; fondo?: boolean } = {}): THREE.Sprite {
  const { color = tema.tinta, alto = 0.34, fondo = true } = opciones;
  const px = 64;
  const margen = 22;
  const lienzo = document.createElement("canvas");
  const c = lienzo.getContext("2d")!;
  const fuente = `700 ${px}px ui-sans-serif, system-ui, "Segoe UI", sans-serif`;
  c.font = fuente;
  const ancho = Math.ceil(c.measureText(texto).width) + margen * 2;
  lienzo.width = ancho;
  lienzo.height = px + margen * 2;
  c.font = fuente;
  if (fondo) {
    c.fillStyle = tema.papel;
    c.globalAlpha = 0.86;
    c.beginPath();
    c.roundRect(0, 0, lienzo.width, lienzo.height, 26);
    c.fill();
    c.globalAlpha = 1;
  }
  c.fillStyle = color;
  c.textBaseline = "middle";
  c.fillText(texto, margen, lienzo.height / 2 + 4);
  const textura = new THREE.CanvasTexture(lienzo);
  textura.colorSpace = THREE.SRGBColorSpace;
  textura.anisotropy = 4;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: textura, depthTest: false, transparent: true, toneMapped: false }));
  sprite.scale.set((alto * lienzo.width) / lienzo.height, alto, 1);
  sprite.renderOrder = 10;
  return sprite;
}

/** Libera geometrías, materiales y texturas de todo lo que cuelga de `raiz`. */
function liberar(raiz: THREE.Object3D) {
  raiz.traverse((o) => {
    const m = o as THREE.Mesh;
    m.geometry?.dispose?.();
    const materiales = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
    for (const mat of materiales) {
      for (const v of Object.values(mat)) {
        if (v instanceof THREE.Texture && v !== texturaEntorno) v.dispose();
      }
      mat.dispose();
    }
  });
}

// ── Visores ──────────────────────────────────────────────────────────────────

type Avisos = {
  /** Cambia el paso que se está viendo. */
  alCambiarPaso(paso: number): void;
  /** Cambia el dato en vivo (como mucho, unas cuantas veces por segundo). */
  alCambiarDato(dato: string): void;
};

export type Mando = {
  /** Salta a un paso y se queda repitiéndolo. */
  irA(paso: number): void;
  /** Sigue el guion entero (true) o se detiene (false). */
  reproducir(si: boolean): void;
  destruir(): void;
};

type Visor = {
  lienzo: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  escena: THREE.Scene;
  camara: THREE.PerspectiveCamera;
  controles: OrbitControls;
  viva: EscenaViva;
  duraciones: number[];
  total: number;
  t: number;
  pasoVisto: number;
  /** Si no es null, el guion se queda dando vueltas a este paso. */
  fijo: number | null;
  parado: boolean;
  visible: boolean;
  pintado: boolean;
  ultimoDato: string;
  tDato: number;
  avisos: Avisos;
};

const visores = new Set<Visor>();
let bucle = 0;
let marcaAnterior = 0;

function pasoEn(v: Visor, t: number): { paso: number; tp: number } {
  let resto = t;
  for (let i = 0; i < v.duraciones.length; i++) {
    if (resto < v.duraciones[i]) return { paso: i, tp: resto };
    resto -= v.duraciones[i];
  }
  return { paso: v.duraciones.length - 1, tp: v.duraciones[v.duraciones.length - 1] };
}

function inicioDe(v: Visor, paso: number): number {
  let t = 0;
  for (let i = 0; i < paso; i++) t += v.duraciones[i];
  return t;
}

function pintarVisor(v: Visor, dt: number, marca: number) {
  const r = obtenerRenderer();
  const ancho = v.lienzo.clientWidth;
  const alto = v.lienzo.clientHeight;
  if (ancho < 2 || alto < 2) return;
  const escala = Math.min(devicePixelRatio || 1, 2);
  const W = Math.round(ancho * escala);
  const H = Math.round(alto * escala);
  if (v.lienzo.width !== W || v.lienzo.height !== H) {
    v.lienzo.width = W;
    v.lienzo.height = H;
  }
  if (r.getPixelRatio() !== escala) r.setPixelRatio(escala);
  const tam = r.getSize(new THREE.Vector2());
  if (tam.x !== ancho || tam.y !== alto) r.setSize(ancho, alto, false);

  // Reloj del guion.
  const avance = v.parado ? 0 : dt;
  let entra = !v.pintado;
  v.t += avance;
  if (v.fijo !== null) {
    const ini = inicioDe(v, v.fijo);
    if (v.t >= ini + v.duraciones[v.fijo]) {
      v.t = ini;
      entra = true;
    }
  } else if (v.t >= v.total) {
    v.t -= v.total;
    entra = true;
  }
  const { paso, tp } = pasoEn(v, v.t);
  if (paso !== v.pasoVisto) {
    v.pasoVisto = paso;
    entra = true;
    v.avisos.alCambiarPaso(paso);
  }

  v.viva.actualizar({ t: v.t, dt: avance, paso, tp, u: tp / v.duraciones[paso], entra });
  if (!v.viva.camaraPropia) v.controles.update();

  const aspecto = ancho / alto;
  if (v.camara.aspect !== aspecto) {
    v.camara.aspect = aspecto;
    v.camara.updateProjectionMatrix();
  }
  r.setViewport(0, 0, ancho, alto);
  r.setScissorTest(false);
  r.clear();
  if (v.viva.pintar) v.viva.pintar(r, ancho, alto);
  else r.render(v.escena, v.camara);

  v.ctx.clearRect(0, 0, W, H);
  v.ctx.drawImage(r.domElement, 0, 0, W, H, 0, 0, W, H);
  v.pintado = true;

  if (v.viva.dato && marca - v.tDato > 120) {
    const dato = v.viva.dato();
    if (dato !== v.ultimoDato) {
      v.ultimoDato = dato;
      v.avisos.alCambiarDato(dato);
    }
    v.tDato = marca;
  }
}

function tic(marca: number) {
  bucle = 0;
  const dt = marcaAnterior ? Math.min((marca - marcaAnterior) / 1000, 0.1) : 0;
  marcaAnterior = marca;
  let alguno = false;
  for (const v of visores) {
    if (!v.visible) continue;
    alguno = true;
    pintarVisor(v, dt, marca);
  }
  if (alguno) bucle = requestAnimationFrame(tic);
  else marcaAnterior = 0;
}

function despertar() {
  if (!bucle) bucle = requestAnimationFrame(tic);
}

export function hayWebGL(): boolean {
  try {
    obtenerRenderer();
    return true;
  } catch {
    return false;
  }
}

/**
 * Monta una escena en un <canvas> 2D. `fabrica` es la escena ya importada.
 * Con `quieto`, arranca detenida en la mitad del primer paso (reducir
 * movimiento): se ve una imagen representativa y los pasos se pueden pulsar.
 */
export async function montarVisor(
  lienzo: HTMLCanvasElement,
  nombre: NombreEscena,
  fabrica: Fabrica,
  avisos: Avisos,
  opciones: { quieto?: boolean } = {},
): Promise<Mando> {
  const r = obtenerRenderer();
  const tema = leerTema();
  const escena = new THREE.Scene();
  const camara = new THREE.PerspectiveCamera(42, 16 / 9, 0.1, 200);
  camara.position.set(4, 3, 6);
  const controles = new OrbitControls(camara, lienzo);
  controles.enableZoom = false;
  controles.enablePan = false;
  controles.enableDamping = true;
  controles.dampingFactor = 0.08;
  controles.maxPolarAngle = Math.PI * 0.49;
  controles.minPolarAngle = 0.15;
  // OrbitControls pone touch-action: none; con pan-y el dedo sigue pudiendo
  // desplazar la página en vertical y el giro queda para el arrastre lateral.
  lienzo.style.touchAction = "pan-y";

  const entorno: Entorno = {
    escena,
    camara,
    renderer: r,
    tema,
    luces({ sombras = true, ambiente = 0.75, sol: fuerza = 1.9 } = {}) {
      const amb = new THREE.HemisphereLight(0xffffff, tema.oscuro ? 0x1e293b : 0xb6c2d2, ambiente);
      const sol = new THREE.DirectionalLight(0xffffff, fuerza);
      sol.position.set(4, 8, 5);
      sol.castShadow = sombras;
      sol.shadow.mapSize.set(1024, 1024);
      const c = sol.shadow.camera;
      c.left = c.bottom = -8;
      c.right = c.top = 8;
      c.near = 0.5;
      c.far = 30;
      sol.shadow.bias = -0.0004;
      sol.shadow.normalBias = 0.02;
      escena.add(amb, sol);
      return { ambiente: amb, sol };
    },
    suelo(tam = 16, { rejilla = true, color = tema.suelo } = {}) {
      const grupo = new THREE.Group();
      const plano = new THREE.Mesh(
        new THREE.PlaneGeometry(tam, tam),
        new THREE.MeshStandardMaterial({ color, roughness: 0.95, metalness: 0 }),
      );
      plano.rotation.x = -Math.PI / 2;
      plano.receiveShadow = true;
      grupo.add(plano);
      if (rejilla) {
        const g = new THREE.GridHelper(tam, tam, tema.rejillaFuerte, tema.rejilla);
        g.position.y = 0.002;
        grupo.add(g);
      }
      escena.add(grupo);
      return grupo;
    },
    entorno: obtenerEntorno,
    etiqueta: (texto, o) => crearEtiqueta(tema, texto, o),
    async robot(altura = 1.8) {
      const gltf = await cargarRobot();
      const modelo = clonarEsqueleto(gltf.scene);
      // La altura real se mide con el esqueleto aplicado: la geometría de un
      // modelo con huesos suele venir en otras unidades (aquí, 100 veces mayor).
      modelo.updateMatrixWorld(true);
      const caja = new THREE.Box3();
      modelo.traverse((o) => {
        const m = o as THREE.SkinnedMesh;
        if (m.isSkinnedMesh) {
          m.computeBoundingBox();
          caja.union(m.boundingBox!.clone().applyMatrix4(m.matrixWorld));
        } else if ((o as THREE.Mesh).isMesh) caja.expandByObject(o);
      });
      const k = altura / (caja.max.y - caja.min.y);
      modelo.scale.setScalar(k);
      modelo.traverse((o) => {
        if ((o as THREE.Mesh).isMesh) {
          o.castShadow = true;
          o.receiveShadow = true;
          // Cada clon con sus materiales: una escena puede volverlos
          // transparentes sin tocar a las demás.
          const m = o as THREE.Mesh;
          m.material = Array.isArray(m.material) ? m.material.map((x) => x.clone()) : m.material.clone();
        }
      });
      return { modelo, clips: gltf.animations };
    },
    mirar(posicion, objetivo = [0, 0, 0]) {
      camara.position.set(...posicion);
      controles.target.set(...objetivo);
      camara.lookAt(controles.target);
      controles.update();
    },
  };

  const viva = await fabrica(entorno);
  if (viva.camaraPropia) controles.enabled = false;

  const duraciones = ESCENAS[nombre].pasos.map((p) => p.dur);
  const v: Visor = {
    lienzo,
    ctx: lienzo.getContext("2d")!,
    escena,
    camara,
    controles,
    viva,
    duraciones,
    total: duraciones.reduce((a, b) => a + b, 0),
    t: opciones.quieto ? duraciones[0] / 2 : 0,
    pasoVisto: -1,
    fijo: null,
    parado: !!opciones.quieto,
    visible: false,
    pintado: false,
    ultimoDato: "",
    tDato: 0,
    avisos,
  };
  visores.add(v);

  const vigia = new IntersectionObserver(
    ([e]) => {
      v.visible = e.isIntersecting;
      if (v.visible) despertar();
    },
    { rootMargin: "120px" },
  );
  vigia.observe(lienzo);

  return {
    irA(paso) {
      v.fijo = paso;
      v.t = inicioDe(v, paso);
      v.pintado = false;
      v.parado = false;
      despertar();
    },
    reproducir(si) {
      v.parado = !si;
      if (si) v.fijo = null;
      despertar();
    },
    destruir() {
      vigia.disconnect();
      visores.delete(v);
      controles.dispose();
      viva.destruir?.();
      liberar(escena);
    },
  };
}

// ── Utilidades para las escenas ──────────────────────────────────────────────

/** Suaviza un avance 0..1 (arranca y frena despacio). */
export const suave = (x: number) => {
  const c = Math.min(1, Math.max(0, x));
  return c * c * (3 - 2 * c);
};

/** Interpola entre a y b. */
export const mezcla = (a: number, b: number, k: number) => a + (b - a) * k;

/** 0 → 1 → 0 a lo largo de un avance 0..1. */
export const idaYVuelta = (u: number) => 0.5 - 0.5 * Math.cos(u * Math.PI * 2);

/** Número con coma decimal, como se escribe en español. */
export const num = (x: number, decimales = 1) => x.toFixed(decimales).replace(".", ",").replace(/^-0(,0+)?$/, "0$1");

/** Miles con espacio fino: 12 480. */
export const miles = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** Triángulos de una geometría. */
export function triangulos(g: THREE.BufferGeometry): number {
  return (g.index ? g.index.count : g.attributes.position.count) / 3;
}
