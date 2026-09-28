<?php
// Router del servidor de PHP local (php -S no lee .htaccess): emula la
// reescritura de public/programacion-ia/plan/.htaccess hacia la puerta del plan.
$ruta = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if (preg_match('#^/programacion-ia/plan(/|$)#', $ruta)) {
  require $_SERVER['DOCUMENT_ROOT'] . '/campus-api/plan.php';
  return true;
}
return false;
