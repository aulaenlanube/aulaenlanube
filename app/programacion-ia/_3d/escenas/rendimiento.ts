// Escenas de «Rendimiento»: niveles de detalle (LOD) e instancias.

import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { COLOR, THREE, miles, suave, triangulos, type Fabrica } from "../motor";

// ── Cerca y lejos: niveles de detalle ───────────────────────────────────────
// La cámara está en z = 7. El objeto pasa por z = 0 (cerca), z = −12 (media) y
// z = −30 (lejos). Cambia de malla al cruzar 13 y 26 unidades de distancia.
// Recuadro abajo a la derecha: la malla que se está dibujando, en alambre.
export const lod: Fabrica = (e) => {
  e.luces({ sombras: false });
  e.suelo(90);
  e.mirar([0, 1.9, 7], [0, 1.1, -8]);

  const NIVELES: [number, number][] = [
    [200, 28],
    [56, 10],
    [16, 5],
  ];
  const material = new THREE.MeshStandardMaterial({ color: COLOR.morado, roughness: 0.4 });
  const objeto = new THREE.Group();
  const mallas = NIVELES.map(([tub, rad]) => {
    const m = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.28, tub, rad), material);
    objeto.add(m);
    return m;
  });
  objeto.position.y = 1.4;
  e.escena.add(objeto);
  // Postes cada 6 unidades, para que se note la distancia.
  for (let z = 0; z >= -36; z -= 6) {
    for (const x of [-2.6, 2.6]) {
      const poste = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1, 0.16), new THREE.MeshStandardMaterial({ color: e.tema.neutro }));
      poste.position.set(x, 0.5, z);
      e.escena.add(poste);
    }
  }

  // Escena aparte para el recuadro: la malla actual en alambre, siempre cerca.
  const lupa = new THREE.Scene();
  const camLupa = new THREE.PerspectiveCamera(40, 1, 0.1, 20);
  camLupa.position.set(0, 0, 4.2);
  const alambres = mallas.map((m) => {
    const a = new THREE.LineSegments(new THREE.WireframeGeometry(m.geometry), new THREE.LineBasicMaterial({ color: COLOR.morado }));
    lupa.add(a);
    return a;
  });

  const Z = [0, -12, -30];
  let z = 0;
  let nivel = 0;
  const fondo = new THREE.Color(e.tema.papel);
  const borde = new THREE.Color(COLOR.morado);

  return {
    actualizar({ paso, u, dt }) {
      const desde = Z[(paso + Z.length - 1) % Z.length];
      z = THREE.MathUtils.lerp(desde, Z[paso], suave(u * 2.6));
      objeto.position.z = z;
      objeto.rotation.y += dt * 0.5;
      const distancia = 7 - z;
      nivel = distancia < 13 ? 0 : distancia < 26 ? 1 : 2;
      mallas.forEach((m, i) => (m.visible = i === nivel));
      alambres.forEach((a, i) => {
        a.visible = i === nivel;
        a.rotation.y = objeto.rotation.y;
      });
    },
    pintar(r, ancho, alto) {
      r.render(e.escena, e.camara);
      const lado = Math.round(Math.min(ancho * 0.3, alto * 0.52));
      const x = ancho - lado - 12;
      const y = 12;
      r.setScissorTest(true);
      r.setScissor(x - 3, y - 3, lado + 6, lado + 6);
      r.setViewport(x - 3, y - 3, lado + 6, lado + 6);
      r.setClearColor(borde, 1);
      r.clear();
      r.setScissor(x, y, lado, lado);
      r.setViewport(x, y, lado, lado);
      r.setClearColor(fondo, 1);
      r.clear();
      r.render(lupa, camLupa);
      r.setScissorTest(false);
      r.setViewport(0, 0, ancho, alto);
      r.setClearColor(0x000000, 0);
    },
    dato: () => `a ${Math.round(7 - z)} m · ${miles(triangulos(mallas[nivel].geometry))} triángulos`,
    destruir() {
      for (const a of alambres) {
        a.geometry.dispose();
        a.material.dispose();
      }
    },
  };
};

// ── Muchos objetos, una sola llamada ────────────────────────────────────────
// 900 árboles (30×30) en un cuadrado de 26 de lado. El árbol es UNA geometría
// (tronco + copa fundidos, con el color en los vértices).
function arbol(): THREE.BufferGeometry {
  const pintar = (g: THREE.BufferGeometry, color: number) => {
    const c = new THREE.Color(color);
    const n = g.attributes.position.count;
    const datos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) c.toArray(datos, i * 3);
    g.setAttribute("color", new THREE.BufferAttribute(datos, 3));
    return g;
  };
  const tronco = pintar(new THREE.CylinderGeometry(0.07, 0.09, 0.4, 6).translate(0, 0.2, 0), 0x8b5a2b);
  const copa = pintar(new THREE.ConeGeometry(0.34, 0.95, 7).translate(0, 0.85, 0), 0x2f9e6a);
  const unido = mergeGeometries([tronco, copa]);
  tronco.dispose();
  copa.dispose();
  return unido;
}

export const instancias: Fabrica = (e) => {
  e.luces({ sombras: false });
  e.suelo(30, { rejilla: false });
  // Lo bastante lejos para que quepan todos: lo que queda fuera de la cámara
  // no se dibuja y la cuenta de llamadas bajaría sola.
  e.mirar([17, 15, 22], [0, -1.5, 0]);

  const LADO = 30;
  const N = LADO * LADO;
  const geo = arbol();
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.8 });

  // Posición, giro y tamaño de cada árbol: deterministas (sin Math.random).
  const azar = (i: number, k: number) => {
    const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
    return s - Math.floor(s);
  };
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const matriz = (i: number) => {
    const x = ((i % LADO) / (LADO - 1) - 0.5) * 26 + (azar(i, 1) - 0.5) * 0.6;
    const z = (Math.floor(i / LADO) / (LADO - 1) - 0.5) * 26 + (azar(i, 2) - 0.5) * 0.6;
    const s = 0.8 + azar(i, 3) * 0.7;
    q.setFromAxisAngle(THREE.Object3D.DEFAULT_UP, azar(i, 4) * Math.PI * 2);
    return m4.compose(new THREE.Vector3(x, 0, z), q, new THREE.Vector3(s, s, s));
  };

  const sueltas = new THREE.Group();
  for (let i = 0; i < N; i++) {
    const m = new THREE.Mesh(geo, mat);
    m.applyMatrix4(matriz(i));
    sueltas.add(m);
  }
  const instanciada = new THREE.InstancedMesh(geo, mat, N);
  for (let i = 0; i < N; i++) instanciada.setMatrixAt(i, matriz(i));
  instanciada.instanceMatrix.needsUpdate = true;
  const bosque = new THREE.Group();
  bosque.add(sueltas, instanciada);
  e.escena.add(bosque);

  let llamadas = 0;
  return {
    actualizar({ paso, dt }) {
      sueltas.visible = paso === 0;
      instanciada.visible = paso === 1;
      bosque.rotation.y += dt * 0.08;
    },
    pintar(r) {
      r.render(e.escena, e.camara);
      // Dato real del renderer: llamadas de dibujo de este fotograma (el suelo es 1).
      llamadas = r.info.render.calls;
    },
    dato: () => `${miles(N)} árboles · ${miles(llamadas)} llamadas de dibujo`,
  };
};
