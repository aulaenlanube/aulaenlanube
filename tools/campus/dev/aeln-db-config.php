<?php
// Configuración de BD SOLO para el entorno local de pruebas (Docker). La de
// producción vive en el servidor, fuera del docroot, y nunca entra en el repo.
return ['host' => 'db', 'user' => 'campus', 'pass' => 'campus-local', 'name' => 'campus_dev', 'port' => 3306];
