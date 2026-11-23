#!/usr/bin/env bash
# Commits del brief docs/briefs/proyecto-3-web.md (Proyecto 3 · Chispa en la web
# del curso). Un commit por tarea, solo con sus ficheros. Sin push ni despliegue.
#
#   bash docs/briefs/proyecto-3-web-commits.sh                    # compila y hace los commits
#   bash docs/briefs/proyecto-3-web-commits.sh --solo-comprobar   # solo compila
set -euo pipefail

cd "$(dirname "$0")/../.."

SOLO_COMPROBAR=0
case "${1:-}" in
  --solo-comprobar) SOLO_COMPROBAR=1 ;;
  "") ;;
  *) echo "Uso: $0 [--solo-comprobar]" >&2; exit 2 ;;
esac

echo "→ Comprobando tipos (tsc)…"
npx tsc -p tsconfig.json --noEmit
echo "✓ tsc sin errores"

if [ "$SOLO_COMPROBAR" -eq 1 ]; then
  exit 0
fi

rama="$(git rev-parse --abbrev-ref HEAD)"
if [ "$rama" != "main" ]; then
  echo "Estás en la rama «$rama», no en main. Me paro." >&2
  exit 1
fi

FIRMA="Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"

# Hace un commit solo con los ficheros indicados (aunque haya otras cosas preparadas).
commit() {
  local mensaje="$1"
  shift
  git add -- "$@"
  git commit -m "$mensaje" -m "$FIRMA" -- "$@"
}

T1=(
  app/programacion-ia/juego-3d/page.tsx
  app/programacion-ia/juego-3d/sesiones.tsx
)
T2=(
  app/programacion-ia/juego-3d/sesion-01/page.tsx
  app/programacion-ia/juego-3d/sesion-02/page.tsx
  app/programacion-ia/juego-3d/sesion-03/page.tsx
  app/programacion-ia/juego-3d/sesion-04/page.tsx
)
T3=(
  app/programacion-ia/page.tsx
  docs/plan-curso-programacion-ia-2026-27.md
)
REGISTRO=(
  docs/briefs/proyecto-3-web.md
  docs/briefs/proyecto-3-web-commits.sh
)

commit "Proyecto 3: portada de Chispa (estado v3.1.0, laboratorio, 8 sesiones y reglas del proyecto)" "${T1[@]}"
commit "Proyecto 3: sesiones 1 a 4 de Chispa, con sus prompts y visores del laboratorio" "${T2[@]}"
commit "Curso: el proyecto 3 (Chispa, videojuego 3D multijugador) visible en la portada y en el plan" "${T3[@]}"
commit "brief: registro de proyecto-3-web y script de commits" "${REGISTRO[@]}"

git log --oneline -4
echo "✓ Hecho. Sin push ni despliegue: eso lo decides tú."
