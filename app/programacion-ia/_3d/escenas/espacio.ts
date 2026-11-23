// Escenas de «El espacio»: los tres ejes, las transformaciones y el grafo de escena.

import { COLOR, THREE, idaYVuelta, mezcla, num, suave, type Fabrica } from "../motor";

const ROJO = 0xef4444;
const VERDE = 0x22c55e;
const AZUL = 0x3b82f6;

/** Una flecha gruesa (cilindro + cono) a lo largo de un eje, desde el origen. */
function flechaEje(color: number, eje: "x" | "y" | "z", largo: number): THREE.Group {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.5, transparent: true });
  const palo = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, largo * 2, 12), mat);
  const punta = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.34, 16), mat);
  punta.position.y = largo + 0.1;
  g.add(palo, punta);
  if (eje === "x") g.rotation.z = -Math.PI / 2;
  if (eje === "z") g.rotation.x = Math.PI / 2;
  g.userData.mat = mat;
  return g;
}

// ── Los tres ejes ───────────────────────────────────────────────────────────
// Geometría: ejes de ±3 (X, Z) y 0..3 (Y); la bola recorre ±2,4 en X y Z y
// 0,25..2,4 en Y. Una línea vertical y un aro en el suelo marcan dónde cae.
export const ejes: Fabrica = (e) => {
  e.luces();
  e.suelo(8);
  e.mirar([5.2, 3.8, 6.4], [0, 0.9, 0]);

  const L = 3;
  const fx = flechaEje(ROJO, "x", L);
  const fy = flechaEje(VERDE, "y", L);
  const fz = flechaEje(AZUL, "z", L);
  e.escena.add(fx, fy, fz);
  const rot = [
    { t: e.etiqueta("X", { color: "#ef4444", alto: 0.5 }), p: [L + 0.6, 0.15, 0] },
    { t: e.etiqueta("Y", { color: "#16a34a", alto: 0.5 }), p: [0, L + 0.65, 0] },
    { t: e.etiqueta("Z", { color: "#3b82f6", alto: 0.5 }), p: [0, 0.15, L + 0.6] },
  ] as const;
  for (const r of rot) {
    r.t.position.set(r.p[0], r.p[1], r.p[2]);
    e.escena.add(r.t);
  }

  const bola = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 32, 20),
    new THREE.MeshStandardMaterial({ color: COLOR.ambar, roughness: 0.35 }),
  );
  bola.castShadow = true;
  const aro = new THREE.Mesh(
    new THREE.RingGeometry(0.2, 0.27, 32),
    new THREE.MeshBasicMaterial({ color: COLOR.ambar, side: THREE.DoubleSide }),
  );
  aro.rotation.x = -Math.PI / 2;
  const plomada = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 1, 0)]),
    new THREE.LineBasicMaterial({ color: COLOR.ambar }),
  );
  e.escena.add(bola, aro, plomada);

  const p = new THREE.Vector3();
  const ejesMat = [fx, fy, fz].map((f) => f.userData.mat as THREE.MeshStandardMaterial);

  return {
    actualizar({ paso, u, tp }) {
      const vaiven = Math.sin(u * Math.PI * 2);
      if (paso === 0) p.set(2.4 * vaiven, 0.25, 0);
      else if (paso === 1) p.set(0, mezcla(0.25, 2.4, idaYVuelta(u)), 0);
      else if (paso === 2) p.set(0, 0.25, 2.4 * vaiven);
      else p.set(2.2 * Math.sin(tp * 1.05), 1.3 + 1.05 * Math.sin(tp * 1.6), 2.2 * Math.cos(tp * 1.05));
      bola.position.copy(p);
      aro.position.set(p.x, 0.01, p.z);
      plomada.position.set(p.x, 0, p.z);
      plomada.scale.y = p.y;
      ejesMat.forEach((m, i) => (m.opacity = paso === 3 || paso === i ? 1 : 0.28));
      rot.forEach((r, i) => (r.t.material.opacity = paso === 3 || paso === i ? 1 : 0.35));
    },
    dato: () => `x ${num(p.x)} · y ${num(p.y)} · z ${num(p.z)}`,
  };
};

// ── Posición, rotación y escala ─────────────────────────────────────────────
// Una nave (morro hacia +X) y, en el origen, su silueta en alambre para
// comparar con cómo estaba.
function nave(material: THREE.Material): THREE.Group {
  const g = new THREE.Group();
  const morro = new THREE.Mesh(new THREE.ConeGeometry(0.42, 1.7, 5), material);
  morro.rotation.z = -Math.PI / 2;
  const alas = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 1.9), material);
  alas.position.x = -0.35;
  const cola = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.6, 0.08), material);
  cola.position.set(-0.6, 0.3, 0);
  g.add(morro, alas, cola);
  return g;
}

export const transformaciones: Fabrica = (e) => {
  e.luces();
  e.suelo(10);
  e.mirar([4.2, 3.4, 6.6], [0, 1.1, 0]);

  const Y0 = 1.2;
  const viva = nave(new THREE.MeshStandardMaterial({ color: COLOR.azul, roughness: 0.4, flatShading: true }));
  viva.traverse((o) => (o.castShadow = true));
  const fantasma = nave(new THREE.MeshBasicMaterial({ color: e.tema.neutro, wireframe: true, transparent: true, opacity: 0.45 }));
  fantasma.position.y = Y0;
  e.escena.add(viva, fantasma);

  let texto = "";
  const grados = (r: number) => `${Math.round(THREE.MathUtils.radToDeg(r))}°`;

  return {
    actualizar({ paso, u, tp }) {
      viva.position.set(0, Y0, 0);
      viva.rotation.set(0, 0, 0);
      viva.scale.setScalar(1);
      const k = Math.sin(u * Math.PI * 2);
      if (paso === 0) {
        viva.position.set(2.4 * k, Y0 + 0.7 * Math.sin(u * Math.PI * 4), 0);
        texto = `posición (${num(viva.position.x)}, ${num(viva.position.y)}, ${num(viva.position.z)})`;
      } else if (paso === 1) {
        viva.rotation.y = u * Math.PI * 2;
        viva.rotation.z = 0.35 * Math.sin(u * Math.PI * 4);
        texto = `rotación Y ${grados(viva.rotation.y)} · Z ${grados(viva.rotation.z)}`;
      } else if (paso === 2) {
        const s = 1 + 0.9 * Math.sin(u * Math.PI * 2) * (k > 0 ? 1 : 0.6);
        viva.scale.setScalar(s);
        texto = `escala ${num(s)}`;
      } else {
        viva.position.set(2.2 * Math.sin(tp * 1.2), Y0 + 0.5 * Math.sin(tp * 2.1), 1.4 * Math.cos(tp * 1.2));
        viva.rotation.y = tp * 1.2 + Math.PI / 2;
        viva.rotation.z = 0.3 * Math.sin(tp * 2.1);
        const s = 1 + 0.35 * Math.sin(tp * 1.7);
        viva.scale.setScalar(s);
        texto = `posición + rotación + escala ${num(s)}`;
      }
    },
    dato: () => texto,
  };
};

// ── El grafo de escena ──────────────────────────────────────────────────────
// sistema → sol → planeta → luna. El planeta es hijo DEL SOL (a 2,5 de
// distancia) y la luna, hija del planeta (a 0,75): girar al padre mueve al hijo.
export const grafo: Fabrica = (e) => {
  e.luces({ sombras: false, ambiente: 0.9, sol: 1.2 });
  e.suelo(12);
  e.mirar([0, 5.2, 7.4], [0, 1.2, 0]);

  const sistema = new THREE.Group();
  sistema.position.y = 1.5;
  const sol = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.75, 1),
    new THREE.MeshStandardMaterial({ color: COLOR.ambar, emissive: COLOR.ambar, emissiveIntensity: 0.55, flatShading: true, roughness: 0.6 }),
  );
  const planeta = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.34, 1),
    new THREE.MeshStandardMaterial({ color: COLOR.azul, flatShading: true, roughness: 0.5 }),
  );
  planeta.position.x = 2.5;
  const luna = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.13, 1),
    new THREE.MeshStandardMaterial({ color: e.tema.neutro, flatShading: true, roughness: 0.7 }),
  );
  luna.position.x = 0.75;
  const union = (largo: number, color: number) =>
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(largo, 0, 0)]),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.8 }),
    );
  const linea1 = union(2.5, COLOR.ambar);
  const linea2 = union(0.75, COLOR.azul);
  planeta.add(luna, linea2);
  sol.add(planeta, linea1);
  sistema.add(sol);
  e.escena.add(sistema);
  e.escena.add(new THREE.PointLight(0xffe2a8, 18, 12, 2).translateY(1.5));

  // Los rótulos no cuelgan de los objetos (heredarían su giro y su escala):
  // se recolocan en cada fotograma con la posición global de cada uno.
  const rotulos = [
    { o: sol as THREE.Object3D, s: e.etiqueta("sol", { alto: 0.32 }), dy: 1.05 },
    { o: planeta as THREE.Object3D, s: e.etiqueta("planeta: hijo del sol", { alto: 0.3 }), dy: 0.62 },
    { o: luna as THREE.Object3D, s: e.etiqueta("luna: hija del planeta", { alto: 0.28 }), dy: -0.4 },
  ];
  for (const r of rotulos) e.escena.add(r.s);
  const pos = new THREE.Vector3();

  return {
    actualizar({ paso, u, dt, entra }) {
      if (entra && paso === 0) {
        sol.rotation.set(0, 0, 0);
        planeta.rotation.set(0, 0, 0);
      }
      sol.rotation.y += dt * 0.9;
      planeta.rotation.y += dt * (paso >= 2 ? 2.6 : 0);
      planeta.visible = paso >= 1;
      luna.visible = linea2.visible = paso >= 2;
      sistema.position.x = paso === 3 ? 2.2 * Math.sin(suave(u) * Math.PI * 2) : 0;
      rotulos.forEach((r, i) => {
        r.o.getWorldPosition(pos);
        r.s.position.set(pos.x, pos.y + r.dy, pos.z);
        r.s.visible = i <= paso || paso === 3;
      });
    },
  };
};
