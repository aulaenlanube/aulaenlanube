#!/usr/bin/env bash
# Ciclo de publicación SIN WordPress: app_content (MySQL vía túnel SSH) -> JSON ->
# build -> deploy. La fuente de verdad del contenido es la tabla app_content (la
# edita el panel admin). WordPress ya NO interviene en este flujo.
#
#   bash tools/publish.sh              # -> PRODUCCIÓN (https://aulaenlanube.com/)
#   bash tools/publish.sh --staging    # -> staging (/preview-next/, noindex)
set -euo pipefail
export MSYS_NO_PATHCONV=1
DIR="$(cd "$(dirname "$0")" && pwd)"
PROJ="$(cd "$DIR/.." && pwd)"
# shellcheck disable=SC1091
source "$DIR/deploy.env" 2>/dev/null || { echo "Falta tools/deploy.env"; exit 1; }

TARGET="prod"
[ "${1:-}" = "--staging" ] && TARGET="staging"

# Credenciales de la BD (las mismas que usa el panel admin). Se cargan solo las
# variables DB_*, de forma robusta ante comillas envolventes o retorno de carro.
[ -f "$PROJ/admin/.env.local" ] || { echo "Falta admin/.env.local (credenciales BD)"; exit 1; }
while IFS='=' read -r k v || [ -n "$k" ]; do
  case "$k" in
    DB_HOST|DB_PORT|DB_USER|DB_PASSWORD|DB_NAME)
      v="${v%$'\r'}"; v="${v#\"}"; v="${v%\"}"; v="${v#\'}"; v="${v%\'}"
      export "$k=$v" ;;
  esac
done < "$PROJ/admin/.env.local"
: "${DB_HOST:=127.0.0.1}"
: "${DB_PORT:=3307}"

echo "==> 1/3 Abriendo túnel SSH a MySQL (${DB_PORT}:127.0.0.1:3306) ..."
ssh -fN -o ExitOnForwardFailure=yes -o BatchMode=yes -L "${DB_PORT}:127.0.0.1:3306" -p "$SSH_PORT" "$HOST" >/dev/null 2>&1 \
  && echo "    túnel abierto" || echo "    túnel ya activo (o puerto ${DB_PORT} ocupado)"

echo "==> 2/3 Volcando app_content (MySQL) -> JSON ..."
( cd "$PROJ" && node tools/db-to-json.mjs )

if [ "$TARGET" = "prod" ]; then
  echo "==> 3/3 Build PRODUCCIÓN + deploy a la raíz ..."
  bash "$DIR/deploy-production.sh"
else
  echo "==> 3/3 Build staging + deploy a /preview-next/ ..."
  ( cd "$PROJ" && BASE_PATH=/preview-next STAGING=1 npm run build > /tmp/aeln-build.log 2>&1 ) \
    || { echo "BUILD FALLÓ:"; tail -25 /tmp/aeln-build.log; exit 1; }
  bash "$DIR/deploy-staging.sh" "$DOCROOT"
  echo "==> LISTO ✅  https://aulaenlanube.com/preview-next/"
fi
