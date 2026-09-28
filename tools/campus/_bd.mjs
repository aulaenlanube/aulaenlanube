// Conexión a la BD del campus para las herramientas de tools/campus.
//  - Por defecto: MySQL de PRODUCCIÓN por túnel SSH (127.0.0.1:3307), con las
//    credenciales de admin/.env.local y el host de tools/deploy.env (ambos
//    gitignored), igual que el panel admin y publish.sh.
//  - Con --local: la BD de pruebas de Docker (bash tools/campus/dev.sh up).

import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { spawnSync } from "node:child_process";
import mysql from "mysql2/promise";

export const RAIZ = path.resolve(import.meta.dirname, "../..");
export const TRABAJO = path.join(RAIZ, ".campus-trabajo"); // gitignored: datos del alumnado
export const LOCAL = process.argv.includes("--local");

function leerEnv(fichero) {
  if (!fs.existsSync(fichero)) throw new Error(`Falta ${path.relative(RAIZ, fichero)}`);
  const env = {};
  for (const l of fs.readFileSync(fichero, "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*"?(.*?)"?\s*$/);
    if (m) env[m[1]] = m[2];
  }
  return env;
}

function puertoAbierto(puerto) {
  return new Promise((ok) => {
    const s = net.connect(puerto, "127.0.0.1");
    s.once("connect", () => (s.end(), ok(true)));
    s.once("error", () => ok(false));
  });
}

async function asegurarTunel(puerto) {
  if (await puertoAbierto(puerto)) return;
  const d = leerEnv(path.join(RAIZ, "tools/deploy.env"));
  console.error(`==> Abriendo túnel SSH a MySQL (127.0.0.1:${puerto} → servidor:3306)…`);
  const r = spawnSync(
    "ssh",
    ["-fN", "-o", "ExitOnForwardFailure=yes", "-o", "BatchMode=yes", "-L", `${puerto}:127.0.0.1:3306`, "-p", d.SSH_PORT, d.HOST],
    { stdio: ["ignore", "ignore", "inherit"] },
  );
  if (r.status !== 0 || !(await puertoAbierto(puerto))) throw new Error("No se pudo abrir el túnel SSH.");
}

export async function conectar() {
  const comunes = { charset: "utf8mb4", multipleStatements: true, dateStrings: true };
  if (LOCAL) {
    return mysql.createConnection({ host: "127.0.0.1", port: 3399, user: "campus", password: "campus-local", database: "campus_dev", ...comunes });
  }
  const env = leerEnv(path.join(RAIZ, "admin/.env.local"));
  const puerto = Number(env.DB_PORT || 3307);
  await asegurarTunel(puerto);
  return mysql.createConnection({ host: "127.0.0.1", port: puerto, user: env.DB_USER, password: env.DB_PASSWORD, database: env.DB_NAME, ...comunes });
}

/** Fecha/hora local de Madrid en formato DATETIME (como las escribe la API PHP). */
export function ahora() {
  return new Date().toLocaleString("sv-SE", { timeZone: "Europe/Madrid" }).slice(0, 19);
}

/** --clave valor  →  valor */
export function arg(nombre, defecto = null) {
  const i = process.argv.indexOf(`--${nombre}`);
  return i > -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : defecto;
}

export function destino() {
  return LOCAL ? "BD LOCAL (Docker)" : "BD de PRODUCCIÓN";
}
