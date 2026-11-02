// Ficheros de OpenCode 2 del proyecto 2 (CLI «tareas con IA»): fuente única
// para la guía de OpenCode y las sesiones de la CLI, así lo que copia el
// alumnado es lo mismo en todas las páginas. Comprobados con OpenCode 2.2.5 real
// (opencode debug agents / debug config / models) el 2026-11-02.

export const CONFIG_GLOBAL = String.raw`
{
  "$schema": "https://opencode.ai/config.json",
  "model": "centro/qwen3.8-flash-next",
  "providers": {
    "centro": {
      "package": "@opencode/ai/providers/openai-compatible",
      "env": ["CENTRO_IA_KEY"],
      "settings": { "baseURL": "{env:CENTRO_IA_URL}" },
      "models": {
        "qwen3.8-flash-next": {
          "name": "Qwen 3.8 Flash-Next (centro)",
          "limit": { "context": 524288, "output": 65536 },
          "capabilities": { "tools": true, "input": ["text"], "output": ["text"] }
        }
      }
    }
  }
}
`;

// Se enseña en tres trozos (ficheros 1-10, órdenes 11-22, lo que nunca hará
// 23-33 en la guía de OpenCode) y cada trozo copia el fichero entero. Comprobado con OpenCode 2.2.5
// (opencode debug agents): las reglas generales van DESPUÉS de las de fábrica
// de cada agente, así que plan y explore necesitan su propio edit: deny. Si cambia el número de líneas,
// hay que mover los rangos de los tres bloques.
export const CONFIG_PROYECTO = String.raw`
{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "edit", "resource": "*", "effect": "ask" },
    { "action": "webfetch", "resource": "*", "effect": "ask" },
    { "action": "external_directory", "resource": "*", "effect": "ask" },
    { "action": "read", "resource": "*", "effect": "allow" },
    { "action": "read", "resource": "*.env", "effect": "deny" },
    { "action": "read", "resource": "*.env.*", "effect": "deny" },
    { "action": "read", "resource": "*.env.example", "effect": "allow" },
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "ls *", "effect": "allow" },
    { "action": "shell", "resource": "pwd", "effect": "allow" },
    { "action": "shell", "resource": "cat *", "effect": "allow" },
    { "action": "shell", "resource": "git status *", "effect": "allow" },
    { "action": "shell", "resource": "git diff *", "effect": "allow" },
    { "action": "shell", "resource": "git log *", "effect": "allow" },
    { "action": "shell", "resource": "uv run tareas --help", "effect": "allow" },
    { "action": "shell", "resource": "uv run tareas validar *", "effect": "allow" },
    { "action": "shell", "resource": "uv run pytest *", "effect": "allow" },
    { "action": "shell", "resource": "git commit *", "effect": "ask" }
  ],
  "policies": [
    { "action": "tool.use", "resource": "shell:git push *", "effect": "deny" },
    { "action": "tool.use", "resource": "shell:git reset *", "effect": "deny" },
    { "action": "tool.use", "resource": "shell:rm *", "effect": "deny" },
    { "action": "tool.use", "resource": "shell:sudo *", "effect": "deny" }
  ],
  "agents": {
    "plan": { "permissions": [{ "action": "edit", "resource": "*", "effect": "deny" }] },
    "explore": { "permissions": [{ "action": "edit", "resource": "*", "effect": "deny" }] }
  }
}
`;

export const AGENTS_MD = String.raw`
# tareas · CLI de tareas con ficheros (proyecto de 1º DAM)
## Stack y órdenes
- Python 3.12 + Typer + Rich, gestionado con uv (src layout, paquete src/tareas).
- Ejecutar: ` + "`uv run tareas --help`" + String.raw` · Validar config: ` + "`uv run tareas validar`" + String.raw` · Pruebas (semana 4): ` + "`uv run pytest`" + String.raw`.
## Normas
- Mensajes y comentarios en español; código claro antes que listo.
- pathlib siempre, encoding="utf-8", nada de os.system ni shell=True: tiene que funcionar en Linux, Windows y macOS.
- Nunca ejecutes acciones sobre carpetas reales: solo en ~/pruebas-tareas y con --simular.
- No toques .env ni escribas claves en ningún fichero. No hagas git push ni commits: los hace el alumno.
- Antes de cambiar un fichero, explica en 2-3 líneas qué vas a hacer.
`;

export const REVISOR_MD = String.raw`
---
description: Revisa el código de la CLI tareas sin modificar nada y señala errores, casos feos y problemas multiplataforma
mode: subagent
permissions:
  - { action: edit, resource: "*", effect: deny }
  - { action: webfetch, resource: "*", effect: deny }
  - { action: shell, resource: "*", effect: deny }
  - { action: shell, resource: "git diff *", effect: allow }
  - { action: shell, resource: "git log *", effect: allow }
  - { action: shell, resource: "git status *", effect: allow }
---
Eres el revisor de código del proyecto (1º DAM). Revisa lo que te indiquen y responde en español con:
1. Errores seguros (con fichero y línea).
2. Casos feos sin cubrir: ruta inexistente, carpeta vacía, nombres con tildes o espacios, JSON roto, destino que ya existe.
3. Problemas en Windows/macOS (rutas, encoding, shell).
4. Una pregunta que el alumno debería saber responder sobre ese código.
No reescribas el código: señala y explica.
`;

export const NUEVA_ACCION_MD = String.raw`
---
description: Añade una acción nueva a acciones.json y, si hace falta, el código que la soporta
agent: build
---
Quiero añadir la acción: $ARGUMENTS
1. Carga la skill acciones-json.
2. Propón primero la entrada JSON y espera mi visto bueno.
3. Si el tipo ya existe, solo edita acciones.json. Si no, añade la clase en src/tareas/acciones.py siguiendo el patrón de las demás.
4. Termina ejecutando ` + "`uv run tareas validar`" + String.raw` y dime qué orden con --simular debo probar yo.
Estado actual del repo:
!` + "`git status --short`";

export const SKILL_MD = String.raw`
---
name: acciones-json
description: Reglas del fichero acciones.json de la CLI tareas (campos, tipos, filtros, plantillas y validación). Úsala siempre que crees o cambies acciones o el código que las lee (config.py, acciones.py, motor.py).
---
# Esquema de acciones.json
- Raíz: {"version": 1, "acciones": [...]}. Cada acción: nombre (único, minúsculas-con-guiones), descripcion, tipo.
- Tipos: mover y copiar (requieren destino), renombrar (requiere plantilla), borrar (siempre pide confirmación salvo --si).
- filtro opcional: extensiones (lista, en minúsculas), patron (regex válida), mas_antiguo_que_dias, mayor_que_mb.
- plantilla: huecos {fecha:%Y-%m-%d}, {n:03}, {ext}, {nombre}.
## Reglas al programar
- Valida el JSON en config.py ANTES de ejecutar; errores con AccionNoValida(accion, campo, motivo).
- pathlib y shutil; encoding="utf-8"; nunca shell=True; nunca sobrescribir (destino_libre).
- Toda acción admite --simular y devuelve list[Resultado].
- Si añades un campo o un tipo nuevo, documéntalo en el README y en esta skill.
`;

export const MCP_JSON = String.raw`
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "context7": {
        "type": "remote",
        "url": "https://mcp.context7.com/mcp",
        "disabled": true
      },
      "apuntes": {
        "type": "local",
        "command": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "./docs"],
        "disabled": true
      }
    }
  }
}
`;

// Variables de entorno: la dirección y la clave del servidor del centro, y el
// certificado del instituto. El servidor va por https con una CA propia
// (ca-ies-simarro.crt, se descarga de la página «Certificado del centro» de la
// plataforma); sin NODE_EXTRA_CA_CERTS, opencode run reintenta sin fin.
// Comprobado con OpenCode 2.2.5 contra el servidor real el 2026-11-02.
export const VARIABLES_SH = String.raw`
# Añade al final de ~/.bashrc (o ~/.zshrc en macOS)
export CENTRO_IA_URL="…"
export CENTRO_IA_KEY="…"
export NODE_EXTRA_CA_CERTS="$HOME/ca-ies-simarro.crt"
`;

export const VARIABLES_PS = String.raw`
setx CENTRO_IA_URL "…"
setx CENTRO_IA_KEY "…"
setx NODE_EXTRA_CA_CERTS "$HOME\ca-ies-simarro.crt"
`;
