#!/usr/bin/env bash
# ROLLBACK del cutover: restaura el .htaccess original de WordPress (guardado en
# .htaccess.wp-backup), con lo que la raíz vuelve a servir el WordPress de antes.
# Los ficheros estáticos del clon quedan en disco pero dejan de servirse como
# páginas (WordPress recupera el control del enrutado). No borra nada de WP.
#
# Uso: bash tools/rollback-production.sh
set -euo pipefail
export MSYS_NO_PATHCONV=1
DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck disable=SC1091
source "$DIR/deploy.env" 2>/dev/null || { echo "Falta tools/deploy.env"; exit 1; }
ROOT="${DOCROOT%/preview-next}"

ssh -p "$SSH_PORT" -o BatchMode=yes "$HOST" "
  set -e
  cd '$ROOT'
  if [ -f .htaccess.wp-backup ]; then
    cp -p .htaccess.wp-backup .htaccess
    echo 'WordPress restaurado: .htaccess original re-aplicado.'
  else
    echo 'No hay .htaccess.wp-backup; no se puede restaurar automáticamente.'; exit 1
  fi
"
echo "==> Rollback hecho. La raíz vuelve a WordPress."
