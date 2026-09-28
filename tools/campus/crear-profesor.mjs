// Crea la cuenta de profesor del campus (o le pone una contraseña nueva).
//   node tools/campus/crear-profesor.mjs <usuario> "<Nombre>" "<Apellidos>" [--local]
//   node tools/campus/crear-profesor.mjs <usuario> --reset [--local]
// La contraseña se genera aquí, se muestra UNA vez y se guarda cifrada con
// bcrypt (password_hash de PHP, el mismo formato que usa la API).

import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { ahora, conectar, destino } from "./_bd.mjs";

const pos = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const reset = process.argv.includes("--reset");
const [usuario, nombre = "", apellidos = ""] = pos;
if (!usuario || !/^[a-z0-9._-]{3,60}$/.test(usuario) || (!reset && !nombre)) {
  console.error('Uso: node tools/campus/crear-profesor.mjs <usuario> "<Nombre>" "<Apellidos>" [--local]\n     node tools/campus/crear-profesor.mjs <usuario> --reset [--local]');
  process.exit(1);
}

const clave = crypto.randomBytes(12).toString("base64url");
// La contraseña va por stdin (no aparece en la lista de procesos).
const php = spawnSync("php", ["-r", "echo password_hash(stream_get_contents(STDIN), PASSWORD_BCRYPT, ['cost' => 10]);"], { input: clave, encoding: "utf8" });
if (php.status !== 0 || !php.stdout.startsWith("$2y$")) {
  console.error("No se pudo cifrar la contraseña con PHP:", php.stderr);
  process.exit(1);
}

const db = await conectar();
try {
  const [[existe]] = await db.query("SELECT id, rol FROM app_campus_usuarios WHERE usuario = ?", [usuario]);
  if (reset) {
    if (!existe || existe.rol !== "profesor") throw new Error(`No existe el profesor «${usuario}».`);
    await db.query("UPDATE app_campus_usuarios SET pass_hash = ?, activo = 1 WHERE id = ?", [php.stdout, existe.id]);
    await db.query("DELETE FROM app_campus_sesiones WHERE usuario_id = ?", [existe.id]);
  } else {
    if (existe) throw new Error(`El usuario «${usuario}» ya existe (usa --reset para cambiarle la contraseña).`);
    await db.query(
      "INSERT INTO app_campus_usuarios (rol, usuario, nombre, apellidos, pass_hash, activo, created_at) VALUES ('profesor', ?, ?, ?, ?, 1, ?)",
      [usuario, nombre, apellidos, php.stdout, ahora()],
    );
  }
  console.log(`✓ Profesor «${usuario}» ${reset ? "con contraseña nueva" : "creado"} en la ${destino()}`);
  console.log(`  Contraseña: ${clave}   (cámbiala dentro, en Cuenta)`);
} finally {
  await db.end();
}
