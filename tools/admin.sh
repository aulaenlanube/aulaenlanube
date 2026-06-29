#!/usr/bin/env bash
# Abre el túnel SSH a MySQL del servidor y arranca el panel admin local.
# Uso: bash tools/admin.sh   (luego abre http://127.0.0.1:4399)
set -e
DIR="$(dirname "$0")"
# shellcheck disable=SC1091
source "$DIR/deploy.env" 2>/dev/null || { echo "Falta tools/deploy.env (copia tools/deploy.env.example y rellena)"; exit 1; }

echo "==> Abriendo túnel SSH a MySQL (127.0.0.1:3307 -> servidor:3306) ..."
ssh -fN -o ExitOnForwardFailure=yes -o BatchMode=yes -L 3307:127.0.0.1:3306 -p "$SSH_PORT" "$HOST" >/dev/null 2>&1 \
  && echo "    Túnel abierto." \
  || echo "    Túnel ya activo (o puerto 3307 ocupado)."

cd "$DIR/../admin"
echo "==> Arrancando panel en http://127.0.0.1:4399  (Ctrl+C para parar)"
node server.js
