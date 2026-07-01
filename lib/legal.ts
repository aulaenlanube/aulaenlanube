// Páginas legales de la plataforma (contenido redactado para la versión ACTUAL:
// sitio estático, sin registro ni login de usuarios). Se sirven mediante una
// entrada sintética que getByPath intercepta, con su propia plantilla.
export interface LegalPage {
  title: string;        // título visible / <title> base
  description: string;  // meta description
  updated: string;      // fecha de última actualización (YYYY-MM-DD)
  html: string;         // cuerpo en HTML (se renderiza como prose)
}

const RESP = `Edu Torregrosa Llácer`;
const EMAIL = `info@aulaenlanube.com`;
const WEB = `https://aulaenlanube.com`;
const UPDATED = "2026-07-01";

export const LEGAL_PATHS = [
  "/politica-de-privacidad/",
  "/condiciones-de-uso/",
  "/politica-de-cookies/",
] as const;

export const LEGAL_PAGES: Record<string, LegalPage> = {
  "/politica-de-privacidad/": {
    title: "Política de privacidad",
    description:
      "Cómo trata Aula en la nube tus datos personales: responsable, finalidades, base legal, conservación, destinatarios y tus derechos (RGPD y LOPDGDD).",
    updated: UPDATED,
    html: `
<p>En <strong>Aula en la nube</strong> nos tomamos en serio tu privacidad. Esta política explica de forma clara y transparente qué datos personales tratamos, con qué finalidad y qué derechos tienes, conforme al <strong>Reglamento (UE) 2016/679 (RGPD)</strong> y a la <strong>Ley Orgánica 3/2018 (LOPDGDD)</strong>.</p>
<p><strong>En esta web no existe registro ni inicio de sesión de usuarios.</strong> Puedes consultar todos los cursos y tutoriales de forma anónima, sin crear ninguna cuenta.</p>

<h2>1. Responsable del tratamiento</h2>
<ul>
  <li><strong>Responsable:</strong> ${RESP}</li>
  <li><strong>Actividad:</strong> publicación de cursos y tutoriales gratuitos de informática y programación.</li>
  <li><strong>Correo de contacto:</strong> <a href="mailto:${EMAIL}">${EMAIL}</a></li>
  <li><strong>Sitio web:</strong> <a href="${WEB}/">${WEB}</a></li>
</ul>

<h2>2. Qué datos tratamos y con qué finalidad</h2>
<p>Solo tratamos los datos estrictamente necesarios, y únicamente en estos casos:</p>
<h3>a) Suscripción al boletín (newsletter)</h3>
<ul>
  <li><strong>Datos:</strong> nombre y dirección de correo electrónico (y la dirección IP desde la que te suscribes, con fines de seguridad y para evitar abusos).</li>
  <li><strong>Finalidad:</strong> enviarte información sobre los nuevos cursos y contenidos que se publican.</li>
  <li><strong>Base legal:</strong> tu <strong>consentimiento</strong> (art. 6.1.a RGPD), que otorgas al enviar el formulario y que puedes retirar en cualquier momento.</li>
</ul>
<h3>b) Consultas por correo electrónico</h3>
<ul>
  <li><strong>Datos:</strong> los que decidas incluir al escribirnos (normalmente nombre, correo y el contenido de tu mensaje).</li>
  <li><strong>Finalidad:</strong> atender y responder tu consulta.</li>
  <li><strong>Base legal:</strong> tu consentimiento y nuestro interés legítimo en atenderte (art. 6.1.a y 6.1.f RGPD).</li>
</ul>
<h3>c) Datos de navegación</h3>
<ul>
  <li><strong>Datos:</strong> los registros técnicos habituales del servidor (dirección IP, fecha y hora, páginas solicitadas, tipo de navegador).</li>
  <li><strong>Finalidad:</strong> mantener el sitio en funcionamiento, garantizar su seguridad y prevenir usos fraudulentos.</li>
  <li><strong>Base legal:</strong> interés legítimo (art. 6.1.f RGPD).</li>
</ul>
<p><strong>No realizamos perfilado ni decisiones automatizadas, no mostramos publicidad comportamental y no vendemos ni cedemos tus datos a terceros con fines comerciales.</strong></p>

<h2>3. Plazo de conservación</h2>
<ul>
  <li>Los datos de <strong>suscripción al boletín</strong> se conservan mientras sigas suscrito. Puedes darte de baja en cualquier momento y, cuando lo hagas, se eliminarán.</li>
  <li>Los datos de <strong>consultas por correo</strong> se conservan el tiempo necesario para atender tu solicitud y, después, durante los plazos legalmente exigibles.</li>
  <li>Los <strong>registros de navegación</strong> se conservan durante un periodo breve conforme a las prácticas habituales del proveedor de alojamiento.</li>
</ul>

<h2>4. Destinatarios y encargados del tratamiento</h2>
<p>Para prestar el servicio nos apoyamos en proveedores que actúan como encargados del tratamiento y solo acceden a los datos para prestarnos su servicio:</p>
<ul>
  <li><strong>Proveedor de alojamiento web</strong> (Hostinger), donde se aloja el sitio y la base de datos con las suscripciones. La infraestructura utilizada se ubica en la Unión Europea.</li>
  <li><strong>Google Ireland Ltd. (YouTube)</strong>: los vídeos se muestran incrustados desde YouTube en modo de privacidad mejorada (<code>youtube-nocookie.com</code>). Google solo recibe datos si <strong>reproduces</strong> un vídeo. Consulta la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener nofollow">política de privacidad de Google</a>.</li>
</ul>

<h2>5. Transferencias internacionales</h2>
<p>Cuando reproduces un vídeo incrustado, Google/YouTube puede tratar datos fuera del Espacio Económico Europeo. Estas transferencias se amparan en las garantías previstas por Google (cláusulas contractuales tipo y marcos de adecuación aplicables).</p>

<h2>6. Tus derechos</h2>
<p>Puedes ejercer en cualquier momento tus derechos de <strong>acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad</strong>, así como <strong>retirar el consentimiento</strong> prestado, escribiendo a <a href="mailto:${EMAIL}">${EMAIL}</a> e indicando el derecho que deseas ejercer.</p>
<ul>
  <li>La <strong>baja del boletín</strong> es inmediata: basta con solicitarlo en esa dirección.</li>
  <li>Si consideras que no hemos atendido correctamente tus derechos, puedes reclamar ante la <strong>Agencia Española de Protección de Datos</strong> (<a href="https://www.aepd.es/" target="_blank" rel="noopener nofollow">www.aepd.es</a>).</li>
</ul>

<h2>7. Seguridad</h2>
<p>Aplicamos medidas técnicas y organizativas razonables para proteger tus datos frente a accesos no autorizados, pérdida o alteración. El sitio se sirve íntegramente mediante conexión cifrada (HTTPS).</p>

<h2>8. Menores de edad</h2>
<p>Esta web ofrece contenido educativo apto para todos los públicos. No solicitamos datos a menores de forma consciente. La suscripción al boletín está pensada para personas mayores de 14 años; si eres menor de esa edad, pide a tu madre, padre o tutor que lo haga por ti.</p>

<h2>9. Enlaces externos y enlaces de afiliación</h2>
<p>Algunas páginas incluyen enlaces a sitios de terceros, incluidos <strong>enlaces de afiliados</strong> (por ejemplo, a Amazon). Al pulsarlos abandonas Aula en la nube y pasas a regirte por la política de privacidad de ese tercero, sobre la que no tenemos control. Consulta también nuestras <a href="/condiciones-de-uso/">condiciones de uso</a>.</p>

<h2>10. Cookies</h2>
<p>El uso de cookies y tecnologías similares se detalla en nuestra <a href="/politica-de-cookies/">política de cookies</a>.</p>

<h2>11. Cambios en esta política</h2>
<p>Podemos actualizar esta política para adaptarla a cambios normativos o de funcionamiento del sitio. Publicaremos siempre la versión vigente en esta misma página, con su fecha de actualización.</p>
`,
  },

  "/condiciones-de-uso/": {
    title: "Condiciones de uso",
    description:
      "Condiciones de uso de Aula en la nube: objeto, propiedad intelectual, enlaces de afiliados, exención de responsabilidad y legislación aplicable.",
    updated: UPDATED,
    html: `
<p>Estas condiciones regulan el acceso y el uso del sitio web <strong>Aula en la nube</strong> (<a href="${WEB}/">${WEB}</a>). El acceso al sitio y su utilización implican la aceptación de estas condiciones.</p>

<h2>1. Información legal</h2>
<ul>
  <li><strong>Titular:</strong> ${RESP}</li>
  <li><strong>Objeto de la actividad:</strong> divulgación educativa mediante cursos y tutoriales gratuitos de informática y programación.</li>
  <li><strong>Contacto:</strong> <a href="mailto:${EMAIL}">${EMAIL}</a></li>
</ul>

<h2>2. Objeto</h2>
<p>Aula en la nube es una plataforma <strong>gratuita</strong> de contenidos educativos (artículos, tutoriales y vídeos) sobre programación, informática y edición multimedia. <strong>No es necesario registrarse ni crear ninguna cuenta</strong> para acceder a los contenidos.</p>

<h2>3. Aceptación y uso correcto</h2>
<p>Como usuario te comprometes a utilizar el sitio conforme a la ley, a la buena fe y a estas condiciones, y a no emplearlo para fines ilícitos o que puedan dañar, sobrecargar o deteriorar el sitio o impedir su normal utilización por otras personas.</p>

<h2>4. Propiedad intelectual e industrial</h2>
<p>Los contenidos originales de este sitio (textos, diseño, estructura, marca y materiales elaborados por el titular) están protegidos por los derechos de propiedad intelectual e industrial.</p>
<ul>
  <li>Puedes <strong>consultar, compartir y enlazar</strong> los contenidos con fines personales y educativos, citando la fuente.</li>
  <li>No está permitida su <strong>reproducción total o parcial con fines comerciales</strong> ni la creación de obras derivadas sin autorización expresa.</li>
  <li>Los <strong>vídeos</strong> se alojan en YouTube y se muestran incrustados; se rigen por las condiciones de YouTube y pertenecen a sus respectivos titulares.</li>
  <li>Las marcas, logotipos y nombres de terceros que puedan aparecer son propiedad de sus titulares y se usan únicamente con fines identificativos o educativos.</li>
</ul>

<h2>5. Enlaces de afiliados</h2>
<p>Algunas páginas contienen <strong>enlaces de afiliados</strong> (por ejemplo, del programa de afiliados de Amazon). Esto significa que, si compras un producto a través de esos enlaces, Aula en la nube puede recibir una pequeña comisión <strong>sin coste adicional para ti</strong>. Estos enlaces ayudan a mantener el proyecto y no condicionan el contenido educativo, que se elabora con criterio propio. Los enlaces de afiliados se marcan técnicamente como <code>sponsored</code>/<code>nofollow</code>.</p>

<h2>6. Enlaces a sitios de terceros</h2>
<p>El sitio puede incluir enlaces a páginas externas. No nos hacemos responsables de los contenidos, productos o servicios de dichos sitios, cuya gestión corresponde a sus titulares. La inclusión de un enlace no implica recomendación ni relación con el sitio enlazado más allá de lo indicado.</p>

<h2>7. Boletín de novedades</h2>
<p>Puedes suscribirte voluntariamente al boletín para recibir información sobre nuevos cursos. La suscripción es gratuita y puedes darte de baja cuando quieras. El tratamiento de tus datos se rige por la <a href="/politica-de-privacidad/">política de privacidad</a>.</p>

<h2>8. Exención de responsabilidad</h2>
<p>Los contenidos se ofrecen con fines <strong>informativos y educativos</strong> y "tal cual". Aunque se elaboran con el máximo cuidado, no garantizamos que estén libres de errores ni que sean completos o estén siempre actualizados, dada la rápida evolución de la tecnología. El uso que hagas de la información es bajo tu responsabilidad; no nos hacemos responsables de los daños que pudieran derivarse de su aplicación.</p>

<h2>9. Disponibilidad del servicio</h2>
<p>Procuramos mantener el sitio disponible de forma continua, pero no podemos garantizar la ausencia de interrupciones por mantenimiento, causas técnicas o ajenas a nuestra voluntad. Nos reservamos el derecho de modificar, suspender o retirar contenidos sin previo aviso.</p>

<h2>10. Protección de datos</h2>
<p>El tratamiento de datos personales se describe en la <a href="/politica-de-privacidad/">política de privacidad</a> y el uso de cookies en la <a href="/politica-de-cookies/">política de cookies</a>.</p>

<h2>11. Modificaciones</h2>
<p>Podemos actualizar estas condiciones en cualquier momento. La versión vigente será siempre la publicada en esta página, con su fecha de actualización.</p>

<h2>12. Legislación aplicable y jurisdicción</h2>
<p>Estas condiciones se rigen por la <strong>legislación española</strong>. Para la resolución de cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a la normativa aplicable, respetando en todo caso los derechos que asisten a las personas consumidoras.</p>
`,
  },

  "/politica-de-cookies/": {
    title: "Política de cookies",
    description:
      "Qué cookies usa Aula en la nube (mínimas y técnicas, sin analítica ni publicidad), para qué sirven y cómo puedes gestionarlas o desactivarlas.",
    updated: UPDATED,
    html: `
<p>Esta política explica qué son las cookies y cómo las utiliza <strong>Aula en la nube</strong>. Queremos ser transparentes: este sitio hace un uso <strong>mínimo</strong> de cookies y <strong>no utiliza cookies de analítica ni de publicidad</strong>.</p>

<h2>1. ¿Qué son las cookies?</h2>
<p>Una cookie es un pequeño archivo de texto que un sitio web guarda en tu dispositivo cuando lo visitas. Sirven, por ejemplo, para recordar preferencias. En sentido amplio, se incluyen aquí también otras tecnologías de almacenamiento en el navegador (como <code>localStorage</code>).</p>

<h2>2. ¿Qué cookies usamos?</h2>
<p>Al ser un sitio estático sin registro de usuarios, no instalamos cookies de seguimiento propias. El detalle es el siguiente:</p>

<h3>Cookies propias (técnicas / necesarias)</h3>
<table>
  <thead>
    <tr><th>Nombre</th><th>Tipo</th><th>Finalidad</th><th>Duración</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><code>aeln_cookie_aviso</code></td>
      <td>Técnica (almacenamiento local)</td>
      <td>Recordar que ya has visto y cerrado el aviso de cookies para no volver a mostrártelo.</td>
      <td>Persistente (hasta que borres los datos del navegador)</td>
    </tr>
  </tbody>
</table>
<p>Esta información se guarda únicamente en tu navegador y <strong>no se envía a ningún servidor</strong>. Al ser estrictamente necesaria para el funcionamiento del aviso, no requiere consentimiento.</p>

<h3>Cookies de terceros (solo si reproduces un vídeo)</h3>
<table>
  <thead>
    <tr><th>Proveedor</th><th>Cuándo</th><th>Finalidad</th><th>Más información</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>YouTube (Google)</td>
      <td>Solo al pulsar <em>play</em> en un vídeo incrustado</td>
      <td>Reproducción del vídeo. Los vídeos se cargan en modo de privacidad mejorada (<code>youtube-nocookie.com</code>) y no se solicitan a YouTube hasta que decides reproducirlos.</td>
      <td><a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener nofollow">Cookies de Google</a></td>
    </tr>
  </tbody>
</table>
<p>Mientras no reproduzcas ningún vídeo, YouTube no instala cookies desde este sitio.</p>

<h2>3. Lo que NO usamos</h2>
<ul>
  <li>No usamos <strong>Google Analytics</strong> ni otras herramientas de analítica que te rastreen.</li>
  <li>No usamos <strong>cookies publicitarias</strong> ni de publicidad comportamental.</li>
  <li>No compartimos tu navegación con redes publicitarias.</li>
</ul>

<h2>4. Cómo gestionar o desactivar las cookies</h2>
<p>Puedes permitir, bloquear o eliminar las cookies instaladas en tu dispositivo desde la configuración de tu navegador:</p>
<ul>
  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener nofollow">Google Chrome</a></li>
  <li><a href="https://support.mozilla.org/es/kb/Deshabilitar%20cookies%20de%20terceros" target="_blank" rel="noopener nofollow">Mozilla Firefox</a></li>
  <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener nofollow">Safari</a></li>
  <li><a href="https://support.microsoft.com/es-es/microsoft-edge" target="_blank" rel="noopener nofollow">Microsoft Edge</a></li>
</ul>
<p>Ten en cuenta que desactivar por completo el almacenamiento del navegador podría hacer que el aviso de cookies se te muestre de nuevo en cada visita.</p>

<h2>5. Cambios en esta política</h2>
<p>Si en el futuro incorporamos nuevas cookies (por ejemplo, una herramienta de analítica), actualizaremos esta página y, cuando la normativa lo exija, te pediremos tu consentimiento previo. La versión vigente será siempre la publicada aquí, con su fecha de actualización.</p>
`,
  },
};
