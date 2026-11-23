// Escenas de «Físicas», con Rapier (el mismo motor que usa el proyecto):
// tipos de cuerpo, formas de colisión, la cápsula del personaje, rebote y
// rozamiento, sensores y rayos. Rapier se carga solo con estas escenas.

import RAPIER from "@dimforge/rapier3d-compat";
import { ConvexGeometry } from "three/addons/geometries/ConvexGeometry.js";
import { COLOR, THREE, num, suave, type Fabrica } from "../motor";

let listo: Promise<void> | null = null;
const iniciar = () => (listo ??= RAPIER.init());

const GRAVEDAD = { x: 0, y: -9.81, z: 0 };
const TIC = 1 / 60;

/** Convierte el tiempo de pantalla en pasos fijos de física (60 por segundo). */
function reloj() {
  let acum = 0;
  return (dt: number) => {
    acum += dt;
    let n = 0;
    while (acum >= TIC && n < 4) {
      acum -= TIC;
      n++;
    }
    if (n === 4) acum = 0;
    return n;
  };
}

type Par = { cuerpo: RAPIER.RigidBody; malla: THREE.Object3D };

/** Copia la posición y el giro de cada cuerpo físico a su malla. */
function sincronizar(pares: Par[]) {
  for (const { cuerpo, malla } of pares) {
    const t = cuerpo.translation();
    const q = cuerpo.rotation();
    malla.position.set(t.x, t.y, t.z);
    malla.quaternion.set(q.x, q.y, q.z, q.w);
  }
}

/** Número «al azar» pero siempre el mismo para el mismo i (sin Math.random). */
const azar = (i: number, k = 0) => {
  const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

// ── Tres tipos de cuerpo ────────────────────────────────────────────────────
// Losa estática de 9×0,3×6 (su cara de arriba en y = 0), muro al fondo, 12
// cajas dinámicas de 0,6 y una barra cinemática que barre de x = −5,2 a 3,4.
export const cuerpos: Fabrica = async (e) => {
  await iniciar();
  e.luces();
  e.mirar([0, 5.4, 9.8], [0, 0.5, 0]);

  const gris = new THREE.MeshStandardMaterial({ color: e.tema.oscuro ? 0x64748b : 0x94a3b8, roughness: 0.8 });
  const losa = new THREE.Mesh(new THREE.BoxGeometry(9, 0.3, 6), gris);
  losa.position.y = -0.15;
  losa.receiveShadow = true;
  const muro = new THREE.Mesh(new THREE.BoxGeometry(9, 1.2, 0.3), gris);
  muro.position.set(0, 0.6, -3);
  muro.castShadow = muro.receiveShadow = true;
  const barra = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1, 5.2), new THREE.MeshStandardMaterial({ color: COLOR.ambar, roughness: 0.5 }));
  barra.castShadow = true;
  e.escena.add(losa, muro, barra);

  const geoCaja = new THREE.BoxGeometry(0.6, 0.6, 0.6);
  const matCaja = new THREE.MeshStandardMaterial({ color: COLOR.azul, roughness: 0.5 });

  const rotulos = [
    e.etiqueta("estático", { alto: 0.34 }),
    e.etiqueta("dinámico", { alto: 0.34 }),
    e.etiqueta("cinemático", { alto: 0.34 }),
  ];
  rotulos[0].position.set(3.2, 0.3, 3.2);
  for (const r of rotulos) e.escena.add(r);

  let mundo: RAPIER.World | null = null;
  let cuerpoBarra: RAPIER.RigidBody;
  let cajas: Par[] = [];
  const pasos = reloj();
  const X0 = -5.2;

  const montar = () => {
    mundo?.free();
    for (const c of cajas) e.escena.remove(c.malla);
    cajas = [];
    mundo = new RAPIER.World(GRAVEDAD);
    const fijo = mundo.createRigidBody(RAPIER.RigidBodyDesc.fixed());
    mundo.createCollider(RAPIER.ColliderDesc.cuboid(4.5, 0.15, 3).setTranslation(0, -0.15, 0), fijo);
    mundo.createCollider(RAPIER.ColliderDesc.cuboid(4.5, 0.6, 0.15).setTranslation(0, 0.6, -3), fijo);
    cuerpoBarra = mundo.createRigidBody(RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(X0, 0.5, 0));
    mundo.createCollider(RAPIER.ColliderDesc.cuboid(0.25, 0.5, 2.6), cuerpoBarra);
  };

  const soltarCajas = () => {
    if (!mundo) return;
    for (let i = 0; i < 12; i++) {
      const cuerpo = mundo.createRigidBody(
        RAPIER.RigidBodyDesc.dynamic()
          .setTranslation(-2.6 + (i % 4) * 1.7 + azar(i, 1) * 0.5, 2.4 + Math.floor(i / 4) * 1.1, -1.4 + azar(i, 2) * 2.8)
          .setRotation(new THREE.Quaternion().setFromEuler(new THREE.Euler(azar(i, 3) * 3, azar(i, 4) * 3, azar(i, 5) * 3))),
      );
      mundo.createCollider(RAPIER.ColliderDesc.cuboid(0.3, 0.3, 0.3).setRestitution(0.15).setFriction(0.6), cuerpo);
      const malla = new THREE.Mesh(geoCaja, matCaja);
      malla.castShadow = malla.receiveShadow = true;
      e.escena.add(malla);
      cajas.push({ cuerpo, malla });
    }
  };

  montar();

  return {
    actualizar({ paso, entra, u, dt }) {
      if (entra && paso === 0) montar();
      if (entra && paso === 1) soltarCajas();
      if (!mundo) return;
      // La barra avanza durante el 65 % del paso y vuelve en el resto.
      const x = paso === 2 ? (u < 0.65 ? THREE.MathUtils.lerp(X0, 3.4, suave(u / 0.65)) : THREE.MathUtils.lerp(3.4, X0, suave((u - 0.65) / 0.35))) : X0;
      for (let n = pasos(dt); n > 0; n--) {
        cuerpoBarra.setNextKinematicTranslation({ x, y: 0.5, z: 0 });
        mundo.step();
      }
      sincronizar(cajas);
      const b = cuerpoBarra.translation();
      barra.position.set(b.x, b.y, b.z);
      rotulos[1].visible = paso >= 1 && cajas.length > 0;
      if (cajas.length) rotulos[1].position.copy(cajas[5].malla.position).add(new THREE.Vector3(0, 0.75, 0));
      rotulos[2].visible = paso === 2;
      rotulos[2].position.set(b.x, 1.5, 0);
    },
    destruir() {
      mundo?.free();
      mundo = null;
    },
  };
};

// ── El collider no es la malla ──────────────────────────────────────────────
// Un anillo de piedra tumbado (radio 1,25, grosor 0,45, centro en y = 0,45) y
// una lluvia de bolas. En cada paso el anillo choca con una forma distinta,
// dibujada en verde: caja, esfera, envolvente convexa o su propia malla.
export const colliders: Fabrica = async (e) => {
  await iniciar();
  e.luces();
  e.suelo(14);
  e.mirar([3.6, 4.4, 6.2], [0, 0.6, 0]);

  const geoAnillo = new THREE.TorusGeometry(1.25, 0.45, 12, 30).rotateX(Math.PI / 2).translate(0, 0.45, 0);
  const anillo = new THREE.Mesh(geoAnillo, new THREE.MeshStandardMaterial({ color: 0x9a8f80, roughness: 0.9, flatShading: true }));
  anillo.castShadow = anillo.receiveShadow = true;
  e.escena.add(anillo);

  const vertices = new Float32Array(geoAnillo.attributes.position.array);
  const indices = new Uint32Array(geoAnillo.index!.array);
  const puntos: THREE.Vector3[] = [];
  for (let i = 0; i < vertices.length; i += 3) puntos.push(new THREE.Vector3(vertices[i], vertices[i + 1], vertices[i + 2]));

  const verde = new THREE.LineBasicMaterial({ color: COLOR.verde });
  const alambre = (g: THREE.BufferGeometry) => {
    const l = new THREE.LineSegments(g, verde);
    e.escena.add(l);
    return l;
  };
  const envolvente = new ConvexGeometry(puntos);
  const formas = [
    alambre(new THREE.EdgesGeometry(new THREE.BoxGeometry(3.4, 0.9, 3.4).translate(0, 0.45, 0))),
    alambre(new THREE.WireframeGeometry(new THREE.SphereGeometry(1.7, 18, 12).translate(0, 0.45, 0))),
    alambre(new THREE.EdgesGeometry(envolvente, 1)),
    alambre(new THREE.WireframeGeometry(geoAnillo)),
  ];
  envolvente.dispose();

  const descripcion = (paso: number): RAPIER.ColliderDesc => {
    if (paso === 0) return RAPIER.ColliderDesc.cuboid(1.7, 0.45, 1.7).setTranslation(0, 0.45, 0);
    if (paso === 1) return RAPIER.ColliderDesc.ball(1.7).setTranslation(0, 0.45, 0);
    if (paso === 2) return RAPIER.ColliderDesc.convexHull(vertices) ?? RAPIER.ColliderDesc.ball(1.7);
    return RAPIER.ColliderDesc.trimesh(vertices, indices);
  };
  const NOMBRE = ["ColliderDesc.cuboid", "ColliderDesc.ball", "ColliderDesc.convexHull", "ColliderDesc.trimesh"];

  const geoBola = new THREE.SphereGeometry(0.13, 14, 10);
  const matBola = new THREE.MeshStandardMaterial({ color: COLOR.ambar, roughness: 0.4 });
  let mundo: RAPIER.World | null = null;
  let bolas: Par[] = [];
  let siguiente = 0;
  let cuenta = 0;
  let actual = 0;
  const pasos = reloj();

  const montar = (paso: number) => {
    mundo?.free();
    for (const b of bolas) e.escena.remove(b.malla);
    bolas = [];
    siguiente = 0;
    mundo = new RAPIER.World(GRAVEDAD);
    const fijo = mundo.createRigidBody(RAPIER.RigidBodyDesc.fixed());
    mundo.createCollider(RAPIER.ColliderDesc.cuboid(10, 0.1, 10).setTranslation(0, -0.1, 0), fijo);
    mundo.createCollider(descripcion(paso), fijo);
    formas.forEach((f, i) => (f.visible = i === paso));
  };
  montar(0);

  return {
    actualizar({ paso, entra, tp, dt }) {
      if (entra) montar(paso);
      if (!mundo) return;
      actual = paso;
      // Una bola nueva cada décima de segundo; como mucho, 70 a la vez.
      if (dt > 0 && tp >= siguiente) {
        siguiente = tp + 0.1;
        cuenta++;
        const cuerpo = mundo.createRigidBody(
          RAPIER.RigidBodyDesc.dynamic().setTranslation((azar(cuenta, 1) - 0.5) * 3.2, 4.2, (azar(cuenta, 2) - 0.5) * 3.2),
        );
        mundo.createCollider(RAPIER.ColliderDesc.ball(0.13).setRestitution(0.35), cuerpo);
        const malla = new THREE.Mesh(geoBola, matBola);
        malla.castShadow = true;
        e.escena.add(malla);
        bolas.push({ cuerpo, malla });
        if (bolas.length > 70) {
          const vieja = bolas.shift()!;
          mundo.removeRigidBody(vieja.cuerpo);
          e.escena.remove(vieja.malla);
        }
      }
      for (let n = pasos(dt); n > 0; n--) mundo.step();
      sincronizar(bolas);
    },
    dato: () => NOMBRE[actual],
    destruir() {
      mundo?.free();
      mundo = null;
    },
  };
};

// ── La cápsula del personaje ────────────────────────────────────────────────
// El robot (1,8 de alto) va dentro de una cápsula de radio 0,4. En el tercer
// paso sube cuatro escalones de 0,2 con el controlador de personaje de Rapier
// (autostep): lo que sube es la cápsula; la malla solo la sigue.
export const capsula: Fabrica = async (e) => {
  await iniciar();
  e.luces();
  e.suelo(14);
  e.mirar([0.6, 2.6, 8], [0.4, 1.1, 0]);

  // Algo más bajo que la cápsula (1,8): al andar se estira y no debe asomar.
  const { modelo, clips } = await e.robot(1.55);
  modelo.rotation.y = Math.PI / 2;
  e.escena.add(modelo);
  const mezclador = new THREE.AnimationMixer(modelo);
  const accion = (n: string) => mezclador.clipAction(clips.find((c) => c.name === n) ?? clips[0]);
  const reposo = accion("Idle");
  const andar = accion("Walking");
  reposo.play();
  andar.play();
  andar.setEffectiveWeight(0);

  const RADIO = 0.4;
  const MEDIA = 0.5; // media altura del tramo recto: 2·0,5 + 2·0,4 = 1,8
  const CENTRO = MEDIA + RADIO;
  const jaula = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.CapsuleGeometry(RADIO, MEDIA * 2, 5, 14)),
    new THREE.LineBasicMaterial({ color: COLOR.verde }),
  );
  e.escena.add(jaula);

  // Cuatro escalones de 0,2 de alto y 0,7 de fondo, a partir de x = −0,4.
  const ESCALONES = 4;
  const matEscalon = new THREE.MeshStandardMaterial({ color: e.tema.oscuro ? 0x64748b : 0x94a3b8, roughness: 0.8 });
  for (let i = 0; i < ESCALONES; i++) {
    const x0 = -0.4 + i * 0.7;
    const largo = 4.2 - x0;
    const losa = new THREE.Mesh(new THREE.BoxGeometry(largo, 0.2, 2.4), matEscalon);
    losa.position.set(x0 + largo / 2, 0.1 + i * 0.2, 0);
    losa.castShadow = losa.receiveShadow = true;
    e.escena.add(losa);
  }

  const X0 = -3.2;
  let mundo: RAPIER.World | null = null;
  let cuerpo: RAPIER.RigidBody;
  let forma: RAPIER.Collider;
  let control: RAPIER.KinematicCharacterController;
  const pasos = reloj();

  const montar = () => {
    mundo?.free();
    mundo = new RAPIER.World(GRAVEDAD);
    const fijo = mundo.createRigidBody(RAPIER.RigidBodyDesc.fixed());
    mundo.createCollider(RAPIER.ColliderDesc.cuboid(10, 0.1, 10).setTranslation(0, -0.1, 0), fijo);
    for (let i = 0; i < ESCALONES; i++) {
      const x0 = -0.4 + i * 0.7;
      const largo = 4.2 - x0;
      mundo.createCollider(RAPIER.ColliderDesc.cuboid(largo / 2, 0.1, 1.2).setTranslation(x0 + largo / 2, 0.1 + i * 0.2, 0), fijo);
    }
    cuerpo = mundo.createRigidBody(RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(X0, CENTRO + 0.02, 0));
    forma = mundo.createCollider(RAPIER.ColliderDesc.capsule(MEDIA, RADIO), cuerpo);
    control = mundo.createCharacterController(0.02);
    control.enableAutostep(0.3, 0.2, true);
    control.enableSnapToGround(0.3);
    mundo.step();
  };
  montar();

  const opacidad = (v: number) =>
    modelo.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      for (const mat of Array.isArray(m.material) ? m.material : [m.material]) {
        mat.transparent = v < 1;
        mat.opacity = v;
        mat.depthWrite = v >= 1;
        mat.needsUpdate = true;
      }
    });

  let anda = false;
  return {
    actualizar({ paso, entra, dt }) {
      if (entra) {
        montar();
        opacidad(paso === 0 ? 1 : 0.5);
        jaula.visible = paso >= 1;
      }
      if (!mundo) return;
      const t0 = cuerpo.translation();
      const quiereAndar = paso === 2 && t0.x < 2.6;
      if (quiereAndar !== anda) {
        anda = quiereAndar;
        if (anda) reposo.crossFadeTo(andar.reset().setEffectiveWeight(1), 0.25, false);
        else andar.crossFadeTo(reposo.reset().setEffectiveWeight(1), 0.25, false);
      }
      for (let n = pasos(dt); n > 0; n--) {
        if (anda) {
          // Hacia abajo, solo un empujoncito: con una caída grande en el mismo
          // movimiento, el autostep de Rapier no sube el escalón (comprobado).
          control.computeColliderMovement(forma, { x: 1.5 * TIC, y: -0.01, z: 0 });
          const m = control.computedMovement();
          const t = cuerpo.translation();
          cuerpo.setNextKinematicTranslation({ x: t.x + m.x, y: t.y + m.y, z: t.z + m.z });
        }
        mundo.step();
      }
      mezclador.update(dt);
      const t = cuerpo.translation();
      jaula.position.set(t.x, t.y, t.z);
      modelo.position.set(t.x, t.y - CENTRO, t.z);
    },
    dato: () => "ColliderDesc.capsule(0.5, 0.4)",
    destruir() {
      mezclador.stopAllAction();
      mundo?.free();
      mundo = null;
    },
  };
};

// ── Rebote y rozamiento ─────────────────────────────────────────────────────
// Paso 1: tres bolas (radio 0,35) caen desde 3,6 con restitución 0, 0,5 y 0,9.
// Paso 2: tres cajas en una rampa de 22° con rozamiento 0,02, 0,35 y 1
// (tan 22° = 0,40: la de 0,35 resbala despacio; la de 1 no se mueve).
export const rebote: Fabrica = async (e) => {
  await iniciar();
  e.luces();
  e.suelo(16);
  e.mirar([0, 3.6, 9.6], [0, 1.2, 0]);

  const XS = [-2.4, 0, 2.4];
  const REST = [0, 0.5, 0.9];
  const ROZ = [0.02, 0.35, 1];
  const TONOS = [COLOR.azul, COLOR.verde, COLOR.rosa];
  const ANGULO = THREE.MathUtils.degToRad(-22);

  const grupoA = new THREE.Group();
  const grupoB = new THREE.Group();
  e.escena.add(grupoA, grupoB);

  const bolas = XS.map((x, i) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.35, 32, 20), new THREE.MeshStandardMaterial({ color: TONOS[i], roughness: 0.4 }));
    m.castShadow = true;
    const r = e.etiqueta(num(REST[i], REST[i] === 0 ? 0 : 1), { alto: 0.4 });
    r.position.set(x, 0.3, 1.5);
    grupoA.add(m, r);
    return m;
  });

  const rampa = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.2, 5), new THREE.MeshStandardMaterial({ color: e.tema.oscuro ? 0x64748b : 0x94a3b8, roughness: 0.8 }));
  rampa.position.set(0, 1.5, 0);
  rampa.rotation.z = ANGULO;
  rampa.castShadow = rampa.receiveShadow = true;
  grupoB.add(rampa);
  const ZS = [-1.6, 0, 1.6];
  const cajas = ZS.map((z, i) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), new THREE.MeshStandardMaterial({ color: TONOS[i], roughness: 0.5 }));
    m.castShadow = true;
    const r = e.etiqueta(num(ROZ[i], i === 2 ? 0 : 2), { alto: 0.4 });
    grupoB.add(m, r);
    m.userData.rotulo = r;
    return m;
  });
  // Un tope al pie de la rampa: la caja que resbala no se sale de la escena.
  const tope = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.8, 5), rampa.material);
  tope.position.set(4.6, 0.4, 0);
  tope.castShadow = true;
  grupoB.add(tope);

  let mundo: RAPIER.World | null = null;
  let pares: Par[] = [];
  const pasos = reloj();
  const giroZ = { x: 0, y: 0, z: Math.sin(ANGULO / 2), w: Math.cos(ANGULO / 2) };

  const montar = (paso: number) => {
    mundo?.free();
    mundo = new RAPIER.World(GRAVEDAD);
    pares = [];
    const fijo = mundo.createRigidBody(RAPIER.RigidBodyDesc.fixed());
    mundo.createCollider(RAPIER.ColliderDesc.cuboid(12, 0.1, 12).setTranslation(0, -0.1, 0).setFriction(1), fijo);
    grupoA.visible = paso === 0;
    grupoB.visible = paso === 1;
    if (paso === 0) {
      XS.forEach((x, i) => {
        const cuerpo = mundo!.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(x, 3.6, 0));
        mundo!.createCollider(
          RAPIER.ColliderDesc.ball(0.35).setRestitution(REST[i]).setRestitutionCombineRule(RAPIER.CoefficientCombineRule.Max),
          cuerpo,
        );
        pares.push({ cuerpo, malla: bolas[i] });
      });
    } else {
      mundo.createCollider(RAPIER.ColliderDesc.cuboid(3.2, 0.1, 2.5).setTranslation(0, 1.5, 0).setRotation(giroZ).setFriction(1), fijo);
      mundo.createCollider(RAPIER.ColliderDesc.cuboid(0.15, 0.4, 2.5).setTranslation(4.6, 0.4, 0), fijo);
      // Cada caja, apoyada en lo alto de la rampa (x local −2,3) y girada como ella.
      const local = new THREE.Vector3(-2.3, 0.1 + 0.35 + 0.01, 0).applyAxisAngle(new THREE.Vector3(0, 0, 1), ANGULO);
      ZS.forEach((z, i) => {
        const cuerpo = mundo!.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(local.x, 1.5 + local.y, z).setRotation(giroZ));
        mundo!.createCollider(
          RAPIER.ColliderDesc.cuboid(0.35, 0.35, 0.35).setFriction(ROZ[i]).setFrictionCombineRule(RAPIER.CoefficientCombineRule.Min),
          cuerpo,
        );
        pares.push({ cuerpo, malla: cajas[i] });
      });
    }
  };
  montar(0);
  let actual = 0;
  const SOBRE = new THREE.Vector3(0, 0.85, 0);

  return {
    actualizar({ paso, entra, dt }) {
      if (entra) montar(paso);
      if (!mundo) return;
      actual = paso;
      for (let n = pasos(dt); n > 0; n--) mundo.step();
      sincronizar(pares);
      for (const c of cajas) (c.userData.rotulo as THREE.Sprite).position.copy(c.position).add(SOBRE);
    },
    dato: () => (actual === 0 ? "setRestitution(…)" : "setFriction(…)"),
    destruir() {
      mundo?.free();
      mundo = null;
    },
  };
};

// ── Sensores y rayos ────────────────────────────────────────────────────────
// Paso 1: bolas que cruzan una zona-sensor (1,8×1,4×2,4): la zona se enciende
// mientras hay alguna dentro y cuenta las que han entrado.
// Paso 2: una torreta en el origen gira un rayo de 6 m; tres obstáculos fijos.
export const sensor: Fabrica = async (e) => {
  await iniciar();
  e.luces();
  e.suelo(16);
  e.mirar([0, 5.2, 8.6], [0, 0.5, 0]);

  // — Sensor —
  const grupoA = new THREE.Group();
  const matZona = new THREE.MeshStandardMaterial({ color: e.tema.neutro, transparent: true, opacity: 0.25, depthWrite: false });
  const zona = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.4, 2.4), matZona);
  zona.position.set(0, 0.7, 0);
  const bordeZona = new THREE.LineSegments(new THREE.EdgesGeometry(zona.geometry), new THREE.LineBasicMaterial({ color: e.tema.neutro }));
  zona.add(bordeZona);
  grupoA.add(zona);
  const geoBola = new THREE.SphereGeometry(0.25, 24, 16);
  const matBola = new THREE.MeshStandardMaterial({ color: COLOR.azul, roughness: 0.4 });

  // — Rayo —
  const grupoB = new THREE.Group();
  const torreta = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.38, 0.9, 20), new THREE.MeshStandardMaterial({ color: COLOR.morado, roughness: 0.5 }));
  torreta.position.y = 0.45;
  torreta.castShadow = true;
  const haz = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 1, 8).rotateX(Math.PI / 2).translate(0, 0, 0.5),
    new THREE.MeshBasicMaterial({ color: COLOR.rosa }),
  );
  haz.position.y = 0.6;
  const impacto = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 10), new THREE.MeshBasicMaterial({ color: COLOR.rosa }));
  const OBST: { x: number; z: number; r?: number; hx?: number; hz?: number; color: number }[] = [
    { x: 3.2, z: 0.4, hx: 0.5, hz: 0.9, color: COLOR.azul },
    { x: -0.9, z: 2.3, r: 0.7, color: COLOR.verde },
    { x: -3.6, z: -1.5, hx: 0.9, hz: 0.5, color: COLOR.ambar },
  ];
  for (const o of OBST) {
    const m = o.r
      ? new THREE.Mesh(new THREE.CylinderGeometry(o.r, o.r, 1.2, 28), new THREE.MeshStandardMaterial({ color: o.color, roughness: 0.5 }))
      : new THREE.Mesh(new THREE.BoxGeometry(o.hx! * 2, 1.2, o.hz! * 2), new THREE.MeshStandardMaterial({ color: o.color, roughness: 0.5 }));
    m.position.set(o.x, 0.6, o.z);
    m.castShadow = true;
    grupoB.add(m);
  }
  grupoB.add(torreta, haz, impacto);
  e.escena.add(grupoA, grupoB);

  let mundo: RAPIER.World | null = null;
  let zonaFisica: RAPIER.Collider;
  let bolas: Par[] = [];
  let dentro = new Set<number>();
  let entradas = 0;
  let siguiente = 0;
  let lanzadas = 0;
  let texto = "";
  const pasos = reloj();
  const ALCANCE = 6;

  const montar = (paso: number) => {
    mundo?.free();
    for (const b of bolas) grupoA.remove(b.malla);
    bolas = [];
    dentro = new Set();
    entradas = 0;
    siguiente = 0;
    lanzadas = 0;
    mundo = new RAPIER.World(GRAVEDAD);
    const fijo = mundo.createRigidBody(RAPIER.RigidBodyDesc.fixed());
    mundo.createCollider(RAPIER.ColliderDesc.cuboid(12, 0.1, 12).setTranslation(0, -0.1, 0), fijo);
    grupoA.visible = paso === 0;
    grupoB.visible = paso === 1;
    if (paso === 0) {
      zonaFisica = mundo.createCollider(RAPIER.ColliderDesc.cuboid(0.9, 0.7, 1.2).setTranslation(0, 0.7, 0).setSensor(true), fijo);
    } else {
      for (const o of OBST) {
        const d = o.r ? RAPIER.ColliderDesc.cylinder(0.6, o.r) : RAPIER.ColliderDesc.cuboid(o.hx!, 0.6, o.hz!);
        mundo.createCollider(d.setTranslation(o.x, 0.6, o.z), fijo);
      }
      mundo.step(); // el primer paso prepara la estructura que consultan los rayos
    }
  };
  montar(0);

  return {
    actualizar({ paso, entra, tp, dt }) {
      if (entra) montar(paso);
      if (!mundo) return;
      if (paso === 0) {
        // Una bola cada 1,4 s, rodando de izquierda a derecha.
        if (dt > 0 && tp >= siguiente) {
          siguiente = tp + 1.4;
          const z = lanzadas++ % 2 ? 0.55 : -0.55;
          const cuerpo = mundo.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(-5, 0.25, z).setLinvel(3.4, 0, 0));
          mundo.createCollider(RAPIER.ColliderDesc.ball(0.25).setFriction(0.3), cuerpo);
          const malla = new THREE.Mesh(geoBola, matBola);
          malla.castShadow = true;
          grupoA.add(malla);
          bolas.push({ cuerpo, malla });
        }
        for (let n = pasos(dt); n > 0; n--) mundo.step();
        sincronizar(bolas);
        const ahora = new Set<number>();
        mundo.intersectionPairsWith(zonaFisica, (otro) => ahora.add(otro.handle));
        for (const h of ahora) if (!dentro.has(h)) entradas++;
        dentro = ahora;
        const ocupada = dentro.size > 0;
        matZona.color.set(ocupada ? COLOR.verde : e.tema.neutro);
        matZona.opacity = ocupada ? 0.5 : 0.25;
        (bordeZona.material as THREE.LineBasicMaterial).color.set(ocupada ? COLOR.verde : e.tema.neutro);
        texto = `dentro: ${dentro.size} · han entrado: ${entradas}`;
      } else {
        const a = tp * 0.75;
        const dir = { x: Math.cos(a), y: 0, z: Math.sin(a) };
        const golpe = mundo.castRay(new RAPIER.Ray({ x: 0, y: 0.6, z: 0 }, dir), ALCANCE, true);
        const d = golpe ? golpe.timeOfImpact : ALCANCE;
        haz.lookAt(dir.x * 10, 0.6, dir.z * 10);
        haz.scale.z = d;
        torreta.rotation.y = -a;
        impacto.visible = !!golpe;
        impacto.position.set(dir.x * d, 0.6, dir.z * d);
        texto = golpe ? `castRay → a ${num(d)} m` : `castRay → nada a menos de ${ALCANCE} m`;
      }
    },
    dato: () => texto,
    destruir() {
      mundo?.free();
      mundo = null;
    },
  };
};
