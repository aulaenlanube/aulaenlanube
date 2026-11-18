// Escenas de «Animación»: el esqueleto y la mezcla de clips. Usan el robot de
// ejemplo (RobotExpressive, CC0 · Tomás Laulhé / Quaternius).

import { THREE, type Fabrica } from "../motor";

function transparencia(modelo: THREE.Object3D, opacidad: number) {
  modelo.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh) return;
    for (const mat of Array.isArray(m.material) ? m.material : [m.material]) {
      mat.transparent = opacidad < 1;
      mat.opacity = opacidad;
      mat.depthWrite = opacidad >= 1;
      mat.needsUpdate = true;
    }
  });
}

// ── El esqueleto ────────────────────────────────────────────────────────────
export const esqueleto: Fabrica = async (e) => {
  e.luces();
  e.suelo(10);
  e.mirar([2.6, 2.2, 5.4], [0, 1.25, 0]);

  const { modelo, clips } = await e.robot(2.5);
  e.escena.add(modelo);
  const huesos: THREE.Bone[] = [];
  modelo.traverse((o) => {
    if ((o as THREE.Bone).isBone) huesos.push(o as THREE.Bone);
  });
  const ayuda = new THREE.SkeletonHelper(modelo);
  (ayuda.material as THREE.LineBasicMaterial).linewidth = 2;
  e.escena.add(ayuda);

  // El hueso que se mueve «a mano»: el brazo izquierdo (los nombres llegan sin
  // puntos: GLTFLoader los limpia). Se guarda su giro de reposo.
  const brazo = huesos.find((h) => /UpperArm.?L/i.test(h.name)) ?? huesos.find((h) => /Arm/i.test(h.name)) ?? huesos[0];
  const reposo = brazo.quaternion.clone();
  const giro = new THREE.Quaternion();
  const EJE = new THREE.Vector3(0, 0, 1);

  const mezclador = new THREE.AnimationMixer(modelo);
  const clip = clips.find((c) => c.name === "Walking") ?? clips[0];
  const andar = mezclador.clipAction(clip);

  return {
    actualizar({ paso, entra, u, dt }) {
      if (entra) {
        transparencia(modelo, paso === 0 ? 1 : 0.28);
        ayuda.visible = paso >= 1;
        if (paso === 3) andar.reset().play();
        else {
          // Al parar la acción, el mezclador devuelve cada hueso a su reposo.
          andar.stop();
          brazo.quaternion.copy(reposo);
        }
      }
      if (paso === 2) {
        giro.setFromAxisAngle(EJE, 1.1 * Math.sin(u * Math.PI * 4));
        brazo.quaternion.copy(reposo).multiply(giro);
      }
      if (paso === 3) mezclador.update(dt);
      modelo.rotation.y = 0.35 * Math.sin(u * Math.PI * 2);
    },
    dato: () => `${huesos.length} huesos`,
    destruir() {
      mezclador.stopAllAction();
      ayuda.dispose();
    },
  };
};

// ── Clips y mezcla ──────────────────────────────────────────────────────────
// El robot anda «en el sitio»: lo que se mueve es la rejilla del suelo, a la
// velocidad que corresponde al peso de cada clip.
export const clips: Fabrica = async (e) => {
  e.luces();
  const suelo = e.suelo(20);
  const rejilla = suelo.children[1];
  e.mirar([3.4, 2.1, 4.6], [0, 1.0, 0]);

  const { modelo, clips: lista } = await e.robot(2);
  e.escena.add(modelo);
  const mezclador = new THREE.AnimationMixer(modelo);
  const accion = (nombre: string) => mezclador.clipAction(lista.find((c) => c.name === nombre) ?? lista[0]);
  const A = { Idle: accion("Idle"), Walking: accion("Walking"), Running: accion("Running"), Jump: accion("Jump") };
  type Nombre = keyof typeof A;
  A.Jump.setLoop(THREE.LoopOnce, 1);
  A.Jump.clampWhenFinished = true;
  for (const a of Object.values(A)) {
    a.enabled = true;
    a.setEffectiveWeight(0);
    a.play();
  }
  let actual: Nombre = "Idle";
  A.Idle.setEffectiveWeight(1);

  const ir = (a: Nombre, fundido: number) => {
    if (a === actual) return;
    const de = A[actual];
    const hacia = A[a];
    hacia.reset();
    hacia.setEffectiveTimeScale(1);
    hacia.setEffectiveWeight(1);
    de.crossFadeTo(hacia, fundido, false);
    actual = a;
  };
  // Al acabar el salto, vuelve solo al reposo.
  mezclador.addEventListener("finished", () => ir("Idle", 0.3));

  const PASO: Nombre[] = ["Idle", "Walking", "Running", "Walking", "Jump"];
  const VEL: Record<Nombre, number> = { Idle: 0, Walking: 1.5, Running: 4.2, Jump: 0 };
  let corrido = 0;
  let salto = -1;

  return {
    actualizar({ paso, entra, tp, dt }) {
      if (entra) {
        ir(PASO[paso], 0.45);
        salto = paso === 4 ? 0 : -1;
      }
      // Mezcla: cada 3 s cambia entre andar y correr, con un fundido de 0,8 s.
      if (paso === 3) ir(Math.floor(tp / 3) % 2 ? "Running" : "Walking", 0.8);
      // Salto: uno al entrar y otro a los 2 s.
      if (paso === 4 && salto === 0 && tp > 2) {
        salto = 1;
        ir("Jump", 0.2);
      }
      mezclador.update(dt);
      let v = 0;
      for (const n of Object.keys(A) as Nombre[]) v += VEL[n] * A[n].getEffectiveWeight();
      corrido = (corrido + v * dt) % 1;
      rejilla.position.z = -corrido;
    },
    dato: () =>
      (Object.keys(A) as Nombre[])
        .map((n) => [n, Math.round(A[n].getEffectiveWeight() * 100)] as const)
        .filter(([, p]) => p > 0)
        .map(([n, p]) => `${n} ${p} %`)
        .join(" · "),
    destruir() {
      mezclador.stopAllAction();
    },
  };
};
