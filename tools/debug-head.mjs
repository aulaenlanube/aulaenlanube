const urls = [
  'https://aulaenlanube.com/',
  'https://aulaenlanube.com/cursos/curso-gimp-basico/instalar-y-personalizar-gimp/',
];
for (const u of urls) {
  const html = await (await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0' } })).text();
  const head = (/<head[\s\S]*?<\/head>/i.exec(html) || [''])[0];
  console.log('\n========== ' + u + ' ==========');
  console.log('HEAD length:', head.length, ' HTML length:', html.length);
  console.log('--- meta tags ---');
  for (const m of head.matchAll(/<meta[^>]*>/gi)) console.log(m[0].slice(0, 220));
  console.log('--- link canonical/alternate/amphtml ---');
  for (const m of head.matchAll(/<link[^>]*rel=["'](?:canonical|alternate|amphtml)["'][^>]*>/gi)) console.log(m[0].slice(0, 220));
  console.log('--- title ---');
  console.log((/<title[^>]*>[\s\S]*?<\/title>/i.exec(head) || [''])[0]);
  console.log('--- ld+json ---');
  const ld = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)];
  console.log('count:', ld.length);
  for (const m of ld) console.log(m[1].slice(0, 400));
}
