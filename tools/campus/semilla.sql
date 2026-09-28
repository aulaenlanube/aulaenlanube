-- Entregas iniciales del campus. Idempotente: solo inserta si no existe ya una
-- entrega con el mismo curso + proyecto + título.

INSERT INTO app_campus_entregas (curso, proyecto, sesion, titulo, instrucciones, tipo, rubrica, fecha_limite, abierta, visible, orden, created_at)
SELECT c.curso, 'web-marca', NULL,
  'Entrega 1 · Repositorio de tu web de marca',
  'Pega la dirección de tu repositorio de GitHub (por ejemplo https://github.com/tu-usuario/mi-web) y, si ya la tienes publicada, la URL de GitHub Pages.\n\nEl repositorio tiene que ser PÚBLICO para que se pueda corregir. Se corrige con la rúbrica de la web de marca (sesión 3) sobre lo que haya en el repositorio: puedes seguir haciendo commits y actualizar esta entrega hasta que se cierre.',
  'github', 'web-marca', NULL, 1, 1, 10, '2026-09-28 12:00:00'
FROM (SELECT 'presencial' AS curso UNION ALL SELECT 'semipresencial') c
WHERE NOT EXISTS (
  SELECT 1 FROM app_campus_entregas x
   WHERE x.curso = c.curso AND x.proyecto = 'web-marca'
     AND x.titulo = 'Entrega 1 · Repositorio de tu web de marca'
);
