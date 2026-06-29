#!/usr/bin/env bash
# Despliega el clon en el docroot de un SUBDOMINIO de prueba (p.ej.
# nuevo.aulaenlanube.com), SIN tocar el WordPress de la raíz.
#
# A diferencia de staging (/preview-next/), el subdominio sirve desde su raíz,
# así que se compila SIN basePath. Como el subdominio es otro host, las imágenes
# /wp-content/... no existirían en su docroot: por eso, tras el rsync, se
# RE-CREAN symlinks a wp-content y a las carpetas estáticas heredadas del
# WordPress (uploads = 446 MB, no se duplican). Mantiene noindex + canonical al
# dominio real (STAGING=1) mientras es solo de revisión.
#
# Uso: bash tools/deploy-subdomain.sh <docroot-absoluto-del-subdominio>
set -euo pipefail
export MSYS_NO_PATHCONV=1

DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck disable=SC1091
source "$DIR/deploy.env" 2>/dev/null || { echo "Falta tools/deploy.env"; exit 1; }
PROJ="$(cd "$DIR/.." && pwd)"
DOCROOT="${1:?Uso: bash tools/deploy-subdomain.sh <docroot-del-subdominio>}"

# Salvaguarda: el docroot debe parecer de un subdominio, nunca el WP de la raíz.
case "$DOCROOT" in
  */public_html) echo "ABORTADO: '$DOCROOT' es la raíz del dominio (WordPress)."; exit 1 ;;
  *nuevo*|*sub*|*staging*|*preview*|*clon*|*demo*) : ;;
  *) echo "ABORTADO: '$DOCROOT' no parece un docroot de subdominio de prueba."; exit 1 ;;
esac

echo "==> Compilando para subdominio (sin basePath, noindex) ..."
( cd "$PROJ" && BASE_PATH="" STAGING=1 npx next build >/dev/null )

echo "==> Empaquetando out/ ..."
tar czf /tmp/aeln-sub.tgz -C "$PROJ/out" .

echo "==> Subiendo paquete ..."
scp -P "$SSH_PORT" -o BatchMode=yes /tmp/aeln-sub.tgz "$HOST:~/aeln-sub.tgz"

echo "==> Sincronizando + symlinks en el servidor ..."
ssh -p "$SSH_PORT" -o BatchMode=yes "$HOST" "
  set -e
  WP=\$(eval echo $WP_DIR)
  rm -rf ~/aeln-sub-tmp && mkdir -p ~/aeln-sub-tmp
  tar xzf ~/aeln-sub.tgz -C ~/aeln-sub-tmp
  mkdir -p '$DOCROOT'
  rsync -a --delete --exclude='.htaccess' --exclude='robots.txt' --exclude='wp-content' ~/aeln-sub-tmp/ '$DOCROOT/'
  # symlinks (se recrean tras cada deploy; rsync --delete los borra al sincronizar)
  ln -sfn \"\$WP/wp-content\" '$DOCROOT/wp-content'
  for f in piar pp1-simarro excelencia-simarro-javatutor cadenas-de-prompts simarro-semana-informatica-26 app-descargas-youtube enlazando-inteligencias enlazando-inteligencias-2 enlazando-inteligencias-3 iaparadocentes; do
    if [ -e \"\$WP/\$f\" ] && [ ! -e '$DOCROOT'/\"\$f\" ]; then ln -sfn \"\$WP/\$f\" '$DOCROOT'/\"\$f\"; fi
  done
  printf 'User-agent: *\nDisallow: /\n' > '$DOCROOT/robots.txt'
  printf 'RewriteEngine Off\nDirectoryIndex index.html\nOptions +FollowSymLinks\n' > '$DOCROOT/.htaccess'
  rm -rf ~/aeln-sub.tgz ~/aeln-sub-tmp
  echo -n 'Ficheros (sin symlinks): '; find '$DOCROOT' -type f | wc -l
  echo 'Symlinks:'; ls -la '$DOCROOT' | grep '\->' || true
"
rm -f /tmp/aeln-sub.tgz
echo "==> Hecho. Revisa el subdominio en el navegador."
