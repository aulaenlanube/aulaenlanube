// @ts-nocheck
/* ======================================================================
   Motor de exportacion PDF portado VERBATIM del repositorio OposicionesIA
   (resources/views/partials/document-downloads.blade.php). Formato exacto:
   A4 595x842 pt, margen 50, cabecera = logo-documentos.jpg + titulo a la
   derecha + linea; pie = titulo / Generado con IA (Reglamento UE
   2024/1689 art. 50) / Pagina X de Y; marca de agua OposicionesIA.com
   al 8%; metricas reales Helvetica (AFM); tablas con cabecera; figuras
   SVG rasterizadas a JPEG; LaTeX via MathJax. Unica adaptacion: el logo
   se carga en runtime desde /img/logo-documentos.jpg (antes @json Blade).
   ====================================================================== */
(function () {
if (window.OposDownloads) return;
    const BRAND = {
        name: 'OposicionesIA',
        domain: 'oposicionesia.com',
        pdf: {
            primary: [0.118, 0.251, 0.686], // #1E40AF
            accent:  [0.961, 0.620, 0.043], // #F59E0B
            muted:   [0.392, 0.455, 0.545], // #64748B slate-500
            line:    [0.796, 0.835, 0.882], // #CBD5E1 slate-300
            ink:     [0.094, 0.110, 0.165], // #18181F (texto cuerpo)
        },
        docx: {
            primary: '1E40AF',
            accent:  'F59E0B',
            muted:   '64748B',
            line:    'CBD5E1',
            ink:     '111827',
        },
    };
    // ── Marca institucional IES Dr. Lluís Simarro (plantilla del repo PP1
    //    de titan: backend/src/services/assets/branding). Cabecera = fila de
    //    3 logos (Generalitat · IES Simarro · Red Excelencia FP) en columnas
    //    iguales con ajuste "contain"; pie = banner de financiacion a todo el
    //    ancho + linea «Generado con IA» centrada + «Pagina X de Y» a la
    //    derecha (7 pt, #475569). Sin marca de agua: el PP1 no la lleva.
    //    Si faltan las imagenes, el documento sale sin marca (igual que PP1).
    const MM = 2.8346; // puntos por milimetro
    const LOGOS = [
      { file: '/branding/header_left.jpg',  w: 1024, h: 546 },
      { file: '/branding/header_center.jpg', w: 2042, h: 800 },
      { file: '/branding/header_right.jpg', w: 502, h: 175 },
    ];
    const FOOTER_IMG = { file: '/branding/footer.jpg', w: 1024, h: 91 };
    let _brandP = null;
    function ensureBranding() {
        if (_brandP) return _brandP;
        _brandP = (async function () {
            const carga = async function (img) {
                try {
                    const r = await fetch(img.file);
                    if (!r.ok) return;
                    const buf = await r.arrayBuffer();
                    img.bytes = new Uint8Array(buf);
                } catch (e) { /* sin marca: igual que PP1 */ }
            };
            await Promise.all(LOGOS.map(carga).concat([carga(FOOTER_IMG)]));
        })();
        return _brandP;
    }
    // Geometria del PP1 (mm -> pt): margenes 15, hueco superior 8, banda 18,
    // hueco inferior 8; pie = banner + 1.5 + nota 4 + 6 de aire.
    const M_TOPGAP = 8 * MM, M_BAND = 18 * MM, M_SIDE = 15 * MM, M_BOTTOM = 8 * MM;
    // ── Idioma de cabecera y pie ──
    // El pie ("Página X de Y") y la cabecera deben ir en el idioma del
    // contenido. Quien exporta pasa el idioma en options.lang. Además, si el
    // texto es claramente inglés —caso de los temas/supuestos de la
    // especialidad de Inglés, que en BD pueden constar como castellano o
    // valenciano— se fuerza inglés para que el documento sea coherente.
    const FOOTER_LABELS = {
        castellano: { page: 'Página', sep: 'de' },
        valenciano: { page: 'Pàgina', sep: 'de' },
        gallego:    { page: 'Páxina', sep: 'de' },
        galego:     { page: 'Páxina', sep: 'de' },
        ingles:     { page: 'Page',   sep: 'of' },
        frances:    { page: 'Page',   sep: 'sur' },
    };
    function footerLabel(lang) {
        return FOOTER_LABELS[String(lang || '').toLowerCase()] || FOOTER_LABELS.castellano;
    }
    function looksEnglish(content) {
        const sample = String(content || '').toLowerCase().slice(0, 2000);
        const count = (re) => (sample.match(re) || []).length;
        const en = count(/\b(the|and|of|to|for|with|this|that|learning|teaching|language|students)\b/g);
        const es = count(/\b(de|la|el|los|las|que|para|con|una|del|en|aprendizaje|alumnado)\b/g);
        // Margen para no confundir textos romances con alguna cita en inglés.
        return en >= 6 && en > es;
    }
    function effectiveLang(content, lang) {
        if (looksEnglish(content)) return 'ingles';
        const l = String(lang || '').toLowerCase();
        return FOOTER_LABELS[l] ? l : 'castellano';
    }
    function stripInline(text) {
        return text
            .replace(/\*\*(.+?)\*\*/g, '$1')
            .replace(/\*(.+?)\*/g, '$1')
            // Al desenvolver `código entre backticks` se pierde la marca que
            // protegía su contenido: un "$" suelto dentro (p. ej. una
            // referencia de regex `$2` o un `$` literal citado en prosa)
            // queda desprotegido y splitInlineMath() lo malinterpreta luego
            // como delimitador de fórmula, tragándose todo el texto hasta el
            // siguiente "$" que encuentre. Se sustituye por un marcador de
            // Área de Uso Privado invisible a esa regex; pdfEsc()/DOCX esc()
            // lo devuelven a "$" literal justo al escribir el texto final.
            .replace(/`([^`]+)`/g, function (m, inner) { return inner.replace(/\$/g, ''); });
    }
    function parseMarkdownBlocks(md) {
        const blocks = [];
        const lines = md.split('\n');
        let i = 0;
        while (i < lines.length) {
            const line = lines[i];
            if (line.startsWith('```')) {
                const isSvg = /^```svg\b/i.test(line.trim());
                let code = '';
                i++;
                while (i < lines.length && !lines[i].startsWith('```')) {
                    code += (code ? '\n' : '') + lines[i];
                    i++;
                }
                i++;
                blocks.push(isSvg ? { type: 'svg', svg: code } : { type: 'code', text: code });
                continue;
            }
            // Bloque de fórmula $$ … $$ repartido en varias líneas (p. ej. con
            // \begin{aligned}), incluso cuando los delimitadores van pegados al
            // contenido ("$$\begin{aligned}" / "\end{aligned}$$") en vez de ir
            // solos en su propia línea. Un número impar de "$$" en la línea
            // indica que abre un bloque que no se cierra en la misma línea:
            // acumulamos líneas hasta que el total de "$$" vuelva a ser par,
            // igual que hace MathMarkdown.php para el renderizado en pantalla.
            // Se ignoran los "$$" dentro de `código entre backticks` (p. ej.
            // texto explicando el escape "$$" de String.replace): no son
            // delimitadores de fórmula y contarlos rompería el resto del
            // documento al no encontrar nunca un cierre real.
            const countDollarPairs = function (l) { return (l.replace(/`[^`]*`/g, '').match(/\$\$/g) || []).length; };
            const dollarPairs = countDollarPairs(line);
            if (dollarPairs % 2 === 1) {
                let body = line;
                let total = dollarPairs;
                i++;
                while (i < lines.length && total % 2 === 1) {
                    body += '\n' + lines[i];
                    total += countDollarPairs(lines[i]);
                    i++;
                }
                blocks.push({ type: 'paragraph', text: body });
                continue;
            }
            if (line.startsWith('|') && i + 1 < lines.length && /^\|[\s\-:|]+\|$/.test(lines[i + 1].trim())) {
                const rows = [];
                while (i < lines.length && lines[i].startsWith('|')) {
                    if (!/^\|[\s\-:|]+\|$/.test(lines[i].trim())) {
                        rows.push(lines[i].split('|').filter(function (c, idx, a) { return idx > 0 && idx < a.length - 1; }).map(function (c) { return stripInline(c.trim()); }));
                    }
                    i++;
                }
                blocks.push({ type: 'table', rows: rows });
                continue;
            }
            const hMatch = line.match(/^(#{1,3})\s+(.+)$/);
            if (hMatch) {
                blocks.push({ type: 'heading', level: hMatch[1].length, text: stripInline(hMatch[2]) });
                i++; continue;
            }
            if (line.startsWith('> ')) {
                blocks.push({ type: 'quote', text: stripInline(line.substring(2)) });
                i++; continue;
            }
            if (/^---+$/.test(line.trim())) {
                blocks.push({ type: 'hr' });
                i++; continue;
            }
            const ulMatch = line.match(/^[\-\*]\s+(.+)$/);
            if (ulMatch) {
                blocks.push({ type: 'li', text: stripInline(ulMatch[1]) });
                i++; continue;
            }
            const olMatch = line.match(/^(\d+)\.\s+(.+)$/);
            if (olMatch) {
                blocks.push({ type: 'oli', number: olMatch[1], text: stripInline(olMatch[2]) });
                i++; continue;
            }
            if (line.trim() === '') {
                blocks.push({ type: 'empty' });
                i++; continue;
            }
            // Pie de figura/tabla: línea entera en cursiva «*Figura N. …*»
            // (un solo asterisco, sin negrita). Solo se trata como caption si
            // empieza por una palabra de figura o si sigue a un diagrama/tabla,
            // para no convertir un énfasis suelto en caption.
            const capMatch = line.match(/^\*(?!\*)\s*(.+?)\s*\*$/);
            if (capMatch && line.indexOf('**') === -1) {
                const capInner = stripInline(capMatch[1]);
                let prevSig = null;
                for (let k = blocks.length - 1; k >= 0; k--) { if (blocks[k].type !== 'empty') { prevSig = blocks[k]; break; } }
                // Las inglesas son para el banco de Inglés de Maestros, cuyo tema va
                // entero en inglés y rotula «Figure 3.» (App\Support\PieDeFigura). Un
                // pie que va detrás de un SVG ya se reconoce sin esto; la lista salva
                // al que va detrás de una tabla o de un párrafo.
                const isFigWord = /^(figura|figure|fig\.|tabla|table|esquema|diagrama|diagram|gr[áa]fico|chart|imagen|image|cuadro)\b/i.test(capInner);
                if (isFigWord || (prevSig && (prevSig.type === 'svg' || prevSig.type === 'table'))) {
                    blocks.push({ type: 'caption', text: capInner });
                    i++; continue;
                }
            }
            blocks.push({ type: 'paragraph', text: stripInline(line) });
            i++;
        }
        return blocks;
    }

    // Inserta saltos de página antes de secciones clave: la 1ª sección tras
    // el índice (para que el contenido arranque en página nueva), la
    // BIBLIOGRAFÍA (siempre en página nueva, al terminar el contenido) y las
    // ORIENTACIONES PARA EL ESTUDIO (también en página nueva, después de la
    // bibliografía). Útil sobre todo para temas; en supuestos no hay esa
    // estructura y la mayoría de veces el algoritmo no añade nada.
    function insertPageBreaks(blocks) {
        const norm = function (text) {
            if (!text) return '';
            return text
                .normalize('NFD').replace(/[̀-ͯ]/g, '')
                .toLowerCase()
                .replace(/^\s*[\divxlcm]+([.\)]\s*[\divxlcm]+)*[.\)]?\s*/i, '')
                .replace(/[^a-z0-9\s]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        };
        const rawText = function (b) {
            if (!b || typeof b.text !== 'string') return '';
            return b.text.replace(/\*\*/g, '').trim();
        };
        const startsWithNumber = function (b) { return /^\s*\d+\s*[.\)]/.test(rawText(b)); };
        const isBibliografiaText = function (b) {
            return norm(rawText(b)).startsWith('bibliograf');
        };
        const isOrientacionesText = function (b) {
            const n = norm(rawText(b));
            return n.startsWith('orientacion') || n.startsWith('orientacions');
        };
        const isCandidate = function (b) {
            if (!b) return false;
            if (b.type === 'heading') return true;
            if (b.type !== 'paragraph') return false;
            const t = (b.text || '').trim();
            if (t.length === 0 || t.length > 160) return false;
            if (/^\*\*[^*]+\*\*$/.test(t)) return true;
            const stripped = t.replace(/\*\*/g, '').trim();
            if (stripped === stripped.toUpperCase() && /[A-ZÁÉÍÓÚÑÀÈÌÒÙÇ]/.test(stripped)) return true;
            return false;
        };

        const numberedSections = [];
        let bibliografiaIdx = -1, orientacionesIdx = -1;
        for (let i = 0; i < blocks.length; i++) {
            const b = blocks[i];
            if (!isCandidate(b)) continue;
            if (startsWithNumber(b)) numberedSections.push(i);
            if (bibliografiaIdx === -1 && isBibliografiaText(b)) bibliografiaIdx = i;
            if (orientacionesIdx === -1 && isOrientacionesText(b)) orientacionesIdx = i;
        }

        const breakBefore = new Set();
        if (numberedSections.length >= 1) breakBefore.add(numberedSections[0]);
        if (bibliografiaIdx !== -1) breakBefore.add(bibliografiaIdx);
        if (orientacionesIdx !== -1) breakBefore.add(orientacionesIdx);

        const result = [];
        for (let i = 0; i < blocks.length; i++) {
            if (breakBefore.has(i)) result.push({ type: 'pagebreak' });
            result.push(blocks[i]);
        }
        return result;
    }

    // Vincula cada pie de figura/tabla («caption») a su diagrama/tabla
    // inmediatamente anterior, guardándolo en `block.caption` y eliminando el
    // bloque de caption suelto. Así el pie se dibuja junto a la figura y, en
    // PDF, puede mantenerse en la misma página (keep-with-figure). Los captions
    // que no siguen a una figura/tabla se conservan como bloque suelto.
    function attachCaptions(blocks) {
        const out = [];
        for (let i = 0; i < blocks.length; i++) {
            const b = blocks[i];
            if (b.type === 'caption') {
                let j = out.length - 1;
                while (j >= 0 && out[j].type === 'empty') j--;
                if (j >= 0 && (out[j].type === 'svg' || out[j].type === 'table')) {
                    out[j].caption = b.text;
                    continue; // se absorbe en la figura/tabla
                }
            }
            out.push(b);
        }
        return out;
    }
    // ── Helpers comunes ──
    // Invoca un callback de toast de forma segura: un fallo dentro del propio
    // callback (p. ej. un onToast mal cableado en la vista que invoca) NUNCA
    // debe abortar la exportación. Aísla el error y sigue.
    function safeToast(fn, m) { try { if (typeof fn === 'function') fn(m); } catch (e) { /* noop */ } }
    function downloadBlob(blob, name, onToast) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        safeToast(onToast, 'Archivo descargado');
    }

    function copyContent(content, onToast) {
        return navigator.clipboard.writeText(content).then(function () {
            safeToast(onToast, 'Contenido copiado al portapapeles');
        });
    }

    function b64ToBytes(b64) {
        if (!b64) return null;
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
        return arr;
    }
    // Rasteriza un diagrama SVG (circuito, esquema) a JPEG para incrustarlo en
    // el PDF/DOCX con el mismo mecanismo que el logo. El SVG se renderiza
    // aislado: `currentColor` no resuelve ahí, así que se fija tinta oscura, y
    // se pinta sobre fondo blanco. Devuelve Promise<{bytes, wpx, hpx, aspect}>
    // o null si algo falla (el llamador cae entonces a texto). Sin recursos
    // externos (solo formas + texto) el canvas no queda «tainted».
    function rasterizeSvg(svgString, scale) {
        return new Promise(function (resolve) {
            try {
                scale = scale || 2;
                let svg = String(svgString || '').trim().replace(/currentColor/g, '#18181f');
                if (!/^<svg[\s>]/i.test(svg)) { resolve(null); return; }
                const vb = /viewBox\s*=\s*["']\s*([-\d.]+)\s+([-\d.]+)\s+([\d.]+)\s+([\d.]+)/i.exec(svg);
                let w = vb ? parseFloat(vb[3]) : 460;
                let h = vb ? parseFloat(vb[4]) : 240;
                if (!w || !h || !isFinite(w) || !isFinite(h)) { w = 460; h = 240; }
                if (!/<svg[^>]*\bwidth\s*=/i.test(svg)) {
                    svg = svg.replace(/<svg\b/i, '<svg width="' + w + '" height="' + h + '"');
                }
                if (!/<svg[^>]*\bxmlns\s*=/i.test(svg)) {
                    svg = svg.replace(/<svg\b/i, '<svg xmlns="http://www.w3.org/2000/svg"');
                }
                const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const img = new Image();
                img.onload = function () {
                    try {
                        const cw = Math.max(1, Math.round(w * scale));
                        const ch = Math.max(1, Math.round(h * scale));
                        const canvas = document.createElement('canvas');
                        canvas.width = cw; canvas.height = ch;
                        const ctx = canvas.getContext('2d');
                        ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, cw, ch);
                        ctx.drawImage(img, 0, 0, cw, ch);
                        URL.revokeObjectURL(url);
                        const b64 = canvas.toDataURL('image/jpeg', 0.95).split(',')[1];
                        resolve({ bytes: b64ToBytes(b64), wpx: cw, hpx: ch, aspect: w / h, vbw: w, vbh: h });
                    } catch (e) { URL.revokeObjectURL(url); resolve(null); }
                };
                img.onerror = function () { URL.revokeObjectURL(url); resolve(null); };
                img.src = url;
            } catch (e) { resolve(null); }
        });
    }

    // ── Fórmulas LaTeX → imagen (MathJax SVG, glyphs como paths) ──
    // Se carga MathJax (tex-svg) bajo demanda solo al exportar. fontCache:'none'
    // hace cada SVG autocontenido (sin <use> a defs externas), así rasteriza
    // bien aislado y sin «taint» (no usa fuentes externas, son trazados).
    let _mjPromise = null;
    function loadMathJax() {
        if (window.MathJax && typeof window.MathJax.tex2svg === 'function') return Promise.resolve();
        if (_mjPromise) return _mjPromise;
        _mjPromise = new Promise(function (resolve, reject) {
            window.MathJax = { svg: { fontCache: 'none' }, startup: { typeset: false } };
            const s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
            s.async = true;
            s.onload = function () {
                const p = (window.MathJax.startup && window.MathJax.startup.promise) || Promise.resolve();
                p.then(function () { resolve(); }).catch(function () { resolve(); });
            };
            s.onerror = function () { _mjPromise = null; reject(new Error('MathJax load failed')); };
            document.head.appendChild(s);
        });
        return _mjPromise;
    }

    // Renderiza una expresión LaTeX a imagen JPEG. Mide su tamaño real a `fontPt`
    // (insertándola oculta en el DOM) para encajar con el texto del cuerpo y
    // captura la profundidad bajo la línea base (vertical-align) para alinear el
    // math en línea. Devuelve {bytes,wpx,hpx,wpt,hpt,depthPt} o null.
    function renderMathImage(latex, display, fontPt, bg) {
        bg = bg || '#ffffff';
        return new Promise(function (resolve) {
            try {
                if (!window.MathJax || typeof window.MathJax.tex2svg !== 'function') { resolve(null); return; }
                const node = window.MathJax.tex2svg(String(latex || ''), { display: !!display });
                const svgEl = node.querySelector('svg');
                if (!svgEl) { resolve(null); return; }
                svgEl.setAttribute('fill', 'currentColor');
                const holder = document.createElement('div');
                holder.style.cssText = 'position:absolute;left:-99999px;top:0;visibility:hidden;font-size:' + fontPt + 'pt;line-height:normal;';
                const wrap = document.createElement('span');
                wrap.appendChild(svgEl);
                holder.appendChild(wrap);
                document.body.appendChild(holder);
                const rect = svgEl.getBoundingClientRect();
                const PX2PT = 72 / 96;
                const wpt = Math.max(0.5, rect.width * PX2PT);
                const hpt = Math.max(0.5, rect.height * PX2PT);
                let depthPt = 0;
                const mva = /vertical-align:\s*(-?[\d.]+)ex/.exec(svgEl.getAttribute('style') || '');
                if (mva) depthPt = (-parseFloat(mva[1])) * (fontPt * 0.5);
                document.body.removeChild(holder);
                const sc = 4;
                const wpx = Math.max(1, Math.round(wpt * sc));
                const hpx = Math.max(1, Math.round(hpt * sc));
                svgEl.setAttribute('width', wpx);
                svgEl.setAttribute('height', hpx);
                svgEl.removeAttribute('style');
                let svgStr = svgEl.outerHTML.replace(/currentColor/g, '#18181f');
                if (!/<svg[^>]*\bxmlns=/i.test(svgStr)) svgStr = svgStr.replace(/<svg\b/i, '<svg xmlns="http://www.w3.org/2000/svg"');
                const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const img = new Image();
                img.onload = function () {
                    try {
                        const canvas = document.createElement('canvas');
                        canvas.width = wpx; canvas.height = hpx;
                        const ctx = canvas.getContext('2d');
                        ctx.fillStyle = bg; ctx.fillRect(0, 0, wpx, hpx);
                        ctx.drawImage(img, 0, 0, wpx, hpx);
                        URL.revokeObjectURL(url);
                        const b64 = canvas.toDataURL('image/jpeg', 0.95).split(',')[1];
                        resolve({ bytes: b64ToBytes(b64), wpx: wpx, hpx: hpx, wpt: wpt, hpt: hpt, depthPt: depthPt });
                    } catch (e) { URL.revokeObjectURL(url); resolve(null); }
                };
                img.onerror = function () { URL.revokeObjectURL(url); resolve(null); };
                img.src = url;
            } catch (e) { resolve(null); }
        });
    }

    // Trocea un texto en segmentos de texto y math en línea: $...$ y $$...$$.
    // Cada math → {math:'latex', display:bool}; el resto → {text:'...'}.
    function splitInlineMath(text) {
        const out = [];
        const re = /\$\$([^$]+?)\$\$|\$([^$\n]+?)\$/g;
        let last = 0, m;
        while ((m = re.exec(text)) !== null) {
            if (m.index > last) out.push({ text: text.slice(last, m.index) });
            out.push({ math: (m[1] !== undefined ? m[1] : m[2]), display: m[1] !== undefined });
            last = m.index + m[0].length;
        }
        if (last < text.length) out.push({ text: text.slice(last) });
        return out.length ? out : [{ text: text }];
    }
    const pageWidth = 595;
    const pageHeight = 842;
    const margin = M_SIDE;                 // 15 mm como en PP1
    const contentWidth = pageWidth - 2 * margin;

    // Banda de cabecera y pie (plantilla Simarro/PP1). La cabecera ocupa
    // 8 mm de hueco + 18 mm de banda + titulo (13 pt) + linea + aire ≈ 34 mm;
    // el pie, 8 mm de hueco + banner (ancho*91/1024) + 1.5 + nota 4 + 6 de
    // aire ≈ 12.6 mm + banner.
    const footerBannerH = contentWidth * (FOOTER_IMG.h / FOOTER_IMG.w);
    const contentTop = pageHeight - (M_TOPGAP + M_BAND + 34);
    const contentBottom = M_BOTTOM + footerBannerH + (1.5 + 4) * MM + 6 * MM;

    // Tamaños de fuente
    const BODY_SIZE = 12;                  // antes 11pt
    const H1_SIZE   = 20;
    const H2_SIZE   = 16;
    const H3_SIZE   = 13;

    // ── Métricas reales de Helvetica (Adobe AFM) ──
    // Usamos los anchos por carácter (en 1/1000 em) para que el
    // wrap y el cálculo de Tw para justificar coincidan con el
    // dibujado real. Un factor único subestima la diferencia
    // entre minúsculas estrechas (i, l, t) y mayúsculas anchas
    // (M, W), y por eso los párrafos no llegaban al margen.
    const HELV_REG_W = {
        ' ':278,'!':278,'"':355,'#':556,'$':556,'%':889,'&':667,"'":191,
        '(':333,')':333,'*':389,'+':584,',':278,'-':333,'.':278,'/':278,
        '0':556,'1':556,'2':556,'3':556,'4':556,'5':556,'6':556,'7':556,'8':556,'9':556,
        ':':278,';':278,'<':584,'=':584,'>':584,'?':556,'@':1015,
        'A':667,'B':667,'C':722,'D':722,'E':667,'F':611,'G':778,'H':722,'I':278,
        'J':500,'K':667,'L':556,'M':833,'N':722,'O':778,'P':667,'Q':778,'R':722,
        'S':667,'T':611,'U':722,'V':667,'W':944,'X':667,'Y':667,'Z':611,
        '[':278,']':278,'_':556,'`':222,
        'a':556,'b':556,'c':500,'d':556,'e':556,'f':278,'g':556,'h':556,'i':222,
        'j':222,'k':500,'l':222,'m':833,'n':556,'o':556,'p':556,'q':556,'r':333,
        's':500,'t':278,'u':556,'v':500,'w':722,'x':500,'y':500,'z':500,
        '{':334,'|':260,'}':334,'~':584,
        '«':556,'»':556
    };
    const HELV_BLD_W = {
        ' ':278,'!':333,'"':474,'#':556,'$':556,'%':889,'&':722,"'":238,
        '(':333,')':333,'*':389,'+':584,',':278,'-':333,'.':278,'/':278,
        '0':556,'1':556,'2':556,'3':556,'4':556,'5':556,'6':556,'7':556,'8':556,'9':556,
        ':':333,';':333,'<':584,'=':584,'>':584,'?':611,'@':975,
        'A':722,'B':722,'C':722,'D':722,'E':667,'F':611,'G':778,'H':722,'I':278,
        'J':556,'K':722,'L':611,'M':833,'N':722,'O':778,'P':667,'Q':778,'R':722,
        'S':667,'T':611,'U':722,'V':667,'W':944,'X':667,'Y':667,'Z':611,
        '[':333,']':333,'_':556,'`':278,
        'a':556,'b':611,'c':556,'d':611,'e':556,'f':333,'g':611,'h':611,'i':278,
        'j':278,'k':556,'l':278,'m':889,'n':611,'o':611,'p':611,'q':611,'r':389,
        's':556,'t':333,'u':611,'v':556,'w':778,'x':556,'y':556,'z':500,
        '{':389,'|':280,'}':389,'~':584,
        '«':556,'»':556
    };
    // Latin-1 acentuados → letra base (la tilde/diéresis no añade
    // ancho horizontal en Helvetica).
    const LATIN_TO_BASE = {
        0xC0:'A',0xC1:'A',0xC2:'A',0xC3:'A',0xC4:'A',0xC5:'A',
        0xC7:'C',0xC8:'E',0xC9:'E',0xCA:'E',0xCB:'E',
        0xCC:'I',0xCD:'I',0xCE:'I',0xCF:'I',
        0xD0:'D',0xD1:'N',0xD2:'O',0xD3:'O',0xD4:'O',0xD5:'O',0xD6:'O',0xD8:'O',
        0xD9:'U',0xDA:'U',0xDB:'U',0xDC:'U',0xDD:'Y',0xDF:'s',
        0xE0:'a',0xE1:'a',0xE2:'a',0xE3:'a',0xE4:'a',0xE5:'a',
        0xE7:'c',0xE8:'e',0xE9:'e',0xEA:'e',0xEB:'e',
        0xEC:'i',0xED:'i',0xEE:'i',0xEF:'i',
        0xF1:'n',0xF2:'o',0xF3:'o',0xF4:'o',0xF5:'o',0xF6:'o',0xF8:'o',
        0xF9:'u',0xFA:'u',0xFB:'u',0xFC:'u',0xFD:'y',0xFF:'y',
        0xA1:'!',0xBF:'?',0xB7:'.'
    };
    // Símbolos Unicode sin glifo real en Helvetica/WinAnsi que pdfEsc()
    // sustituye por un equivalente ASCII. El ancho debe corresponder a ese
    // sustituto, no a un carácter suelto, o el texto que sigue queda
    // desplazado (demasiado pegado o con hueco de más).
    const SUBSTITUTED_W = {
        '→': 917, '←': 917, '↔': 1501, '↓': 500, '↑': 500,
        '…': 834, '−': 333,
        // Superíndices/subíndices Unicode sin código Latin-1 (log₂, xⁿ, etc.)
        // que pdfEsc() sustituye por el dígito normal: mismo ancho que un
        // dígito en Helvetica (556). ¹²³ no están aquí porque sí tienen
        // glifo propio en WinAnsi (code <= 255) y siguen esa ruta.
        '⁰':556,'⁴':556,'⁵':556,'⁶':556,'⁷':556,'⁸':556,'⁹':556,
        '₀':556,'₁':556,'₂':556,'₃':556,'₄':556,'₅':556,'₆':556,'₇':556,'₈':556,'₉':556,
        // Marcador de "$" protegido (ver stripInline): pdfEsc() lo
        // devuelve a '$' literal, así que mide igual que '$' (556).
        '': 556
    };
    const helvCharWidth = function (c, bold) {
        const table = bold ? HELV_BLD_W : HELV_REG_W;
        if (table[c] !== undefined) return table[c];
        if (SUBSTITUTED_W[c] !== undefined) return SUBSTITUTED_W[c];
        const base = LATIN_TO_BASE[c.charCodeAt(0)];
        if (base !== undefined) return table[base] || (bold ? 540 : 500);
        return bold ? 540 : 500; // fallback razonable para no-ASCII raros
    };
    const helvWidth = function (text, size, bold) {
        let units = 0;
        for (let i = 0; i < text.length; i++) units += helvCharWidth(text[i], bold);
        return units * size / 1000;
    };

    const pdfEsc = function (s) {
        let result = '';
        for (let i = 0; i < s.length; i++) {
            const code = s.charCodeAt(i);
            if (code === 92) { result += '\\\\'; }
            else if (code === 40) { result += '\\('; }
            else if (code === 41) { result += '\\)'; }
            else if (code > 126 && code <= 255) {
                result += '\\' + code.toString(8).padStart(3, '0');
            } else if (code > 255) {
                // Bullet: WinAnsiEncoding (cp1252) SÍ tiene glifo propio en el
                // byte 0x95 (\225 en octal) — usarlo en vez de degradar a '*'.
                if (code === 0x2022 || code === 0x2023 || code === 0x25cf || code === 0x25cb) result += '\\225';
                else if (code === 0x2013 || code === 0x2014) result += '-';
                else if (code === 0x201c || code === 0x201d) result += '"';
                else if (code === 0x2018 || code === 0x2019) result += "'";
                // Flechas: sin glifo en Helvetica/WinAnsi — sin este sustituto
                // ASCII el carácter se perdía sin más (hueco en blanco).
                else if (code === 0x2192) result += '->';
                else if (code === 0x2190) result += '<-';
                else if (code === 0x2194) result += '<->';
                else if (code === 0x2193) result += 'v';
                else if (code === 0x2191) result += '^';
                // Puntos suspensivos y signo menos matemático: sin glifo en
                // WinAnsi; mismo motivo que las flechas.
                else if (code === 0x2026) result += '...';
                else if (code === 0x2212) result += '-';
                // Super/subíndices Unicode (log₂4, xⁿ, etc.): sin glifo en
                // WinAnsi, se perdían sin más. Se sustituyen por el dígito
                // normal en vez de desaparecer.
                else if (code === 0x2070) result += '0';
                else if (code >= 0x2074 && code <= 0x2079) result += String.fromCharCode(code - 0x2074 + 52);
                else if (code >= 0x2080 && code <= 0x2089) result += String.fromCharCode(code - 0x2080 + 48);
                // "$" protegido por stripInline (ver comentario allí):
                // se devuelve a un "$" literal normal aquí, al escribir
                // el texto definitivo, ya después de splitInlineMath().
                else if (code === 0xE000) result += '$';
            } else {
                result += s[i];
            }
        }
        return result;
    };

    // Mismo nombre y firma de antes — ahora se apoya en helvWidth.
    const approxWidth = function (text, size, bold) {
        return helvWidth(text, size, bold);
    };

const P = BRAND.pdf;
    // ── Logo vectorial: birrete de licenciatura ──
    // Coordenadas calibradas a partir del SVG real (viewBox 100x80):
    //   mortarboard: rombo (50,14)-(94,30)-(50,42)-(6,30)
    //   capucha:     M22,30 V46 C22,58 34,67 50,67 C66,67 78,58 78,46 V30
    //   botón:       circle cx=50 cy=28 r=3 (en SVG; aquí cy+5 sobre tabla)
    // Escala para que ocupe ~26pt de ancho × 18pt de alto.
    // El centro vertical del logo es cy y se usa como referencia
    // para alinear el wordmark a la derecha.
    const F = function (n) { return Number(n).toFixed(2); };
    const C3 = function (rgb) { return rgb[0].toFixed(3) + ' ' + rgb[1].toFixed(3) + ' ' + rgb[2].toFixed(3); };
    const buildLogoVector = function (cx, cy) {
        let s = '';
        // ── Capucha (skull cap) en azul marca ──
        s += C3(P.primary) + ' rg\n';
        s += F(cx - 8.26) + ' ' + F(cy + 3.57) + ' m\n';                       // start (22,30)
        s += F(cx - 8.26) + ' ' + F(cy - 1.87) + ' l\n';                       // V46
        s += F(cx - 8.26) + ' ' + F(cy - 5.95) + ' '                           // C control1
           + F(cx - 4.72) + ' ' + F(cy - 9.01) + ' '                           //   control2
           + F(cx)        + ' ' + F(cy - 9.01) + ' c\n';                       //   end (50,67)
        s += F(cx + 4.72) + ' ' + F(cy - 9.01) + ' '                           // C control1
           + F(cx + 8.26) + ' ' + F(cy - 5.95) + ' '                           //   control2
           + F(cx + 8.26) + ' ' + F(cy - 1.87) + ' c\n';                       //   end (78,46)
        s += F(cx + 8.26) + ' ' + F(cy + 3.57) + ' l\n';                       // V30 right
        s += F(cx)        + ' ' + F(cy - 0.51) + ' l\n';                       // diagonal a punta inferior tabla
        s += 'h f\n';
        // ── Tabla / mortarboard (rombo plano) sobre la capucha ──
        s += F(cx)        + ' ' + F(cy + 9.01) + ' m '                         // top (50,14)
           + F(cx + 13.0) + ' ' + F(cy + 3.57) + ' l '                         // right (94,30)
           + F(cx)        + ' ' + F(cy - 0.51) + ' l '                         // bottom (50,42)
           + F(cx - 13.0) + ' ' + F(cy + 3.57) + ' l h f\n';                   // left (6,30)
        // ── Botón ámbar (círculo aprox. con 4 Bézier cúbicas) ──
        const br = 1.6, bx = cx, by = cy + 4.76, bk = br * 0.5523;
        s += C3(P.accent) + ' rg\n';
        s += F(bx + br) + ' ' + F(by)      + ' m '
           + F(bx + br) + ' ' + F(by + bk) + ' '
           + F(bx + bk) + ' ' + F(by + br) + ' '
           + F(bx)      + ' ' + F(by + br) + ' c '
           + F(bx - bk) + ' ' + F(by + br) + ' '
           + F(bx - br) + ' ' + F(by + bk) + ' '
           + F(bx - br) + ' ' + F(by)      + ' c '
           + F(bx - br) + ' ' + F(by - bk) + ' '
           + F(bx - bk) + ' ' + F(by - br) + ' '
           + F(bx)      + ' ' + F(by - br) + ' c '
           + F(bx + bk) + ' ' + F(by - br) + ' '
           + F(bx + br) + ' ' + F(by - bk) + ' '
           + F(bx + br) + ' ' + F(by)      + ' c h f\n';
        return s;
    };

    // ── Cabecera: logo (JPG incrustado o vector de fallback) + ──
    //    (opcional) título a la derecha + línea fina.
    const buildHeaderStream = function (chrome, firstPage) {
        const { headerTitle } = chrome;
        const showTitle = firstPage;
        let s = '';
        const logos = LOGOS.filter(function (l) { return l.bytes; });
        if (logos.length) {
            // Columnas iguales; contain dentro de (col_w - 5mm) x banda; centrado.
            const n = logos.length;
            const colW = contentWidth / n;
            const boxW = colW - 5 * MM;
            logos.forEach(function (l, i) {
                const asp = l.h / l.w;
                let w, h;
                if (boxW * asp <= M_BAND) { w = boxW; h = boxW * asp; }
                else { w = M_BAND / asp; h = M_BAND; }
                const colLeft = margin + i * colW;
                const x = colLeft + (colW - w) / 2;
                const yTop = M_TOPGAP + (M_BAND - h) / 2;
                const yPdf = pageHeight - yTop - h;
                s += 'q ' + F(w) + ' 0 0 ' + F(h) + ' ' + F(x) + ' ' + F(yPdf) + ' cm /Logo' + i + ' Do Q\n';
            });
        }
        // Titulo del documento bajo la banda, como en PP1: negrita 13 pt
        // gris pizarra + linea fina gris.
        if (headerTitle && logos.length && showTitle) {
            s += 'q\n';
            s += '0.122 0.161 0.216 rg\n'; // #1f2937 slate-800 (PP1 _SLATE)
            const ty = pageHeight - M_TOPGAP - M_BAND - 13;
            s += 'BT /F2 13 Tf ' + margin + ' ' + F(ty) + ' Td (' + pdfEsc(headerTitle.slice(0, 120)) + ') Tj ET\n';
            s += '0.863 0.863 0.863 RG 0.57 w\n'; // #dcdcdc
            const ly = ty - 4;
            s += margin + ' ' + F(ly) + ' m ' + (pageWidth - margin) + ' ' + F(ly) + ' l S\n';
            s += 'Q\n';
        }
        return s;
    };

    const buildFooterStream = function (chrome, pageNum, totalPages) {
        const { footerTitle, FL } = chrome;
        let s = 'q\n';
        const bannerY = M_BOTTOM;
        if (FOOTER_IMG.bytes) {
            s += 'q ' + F(contentWidth) + ' 0 0 ' + F(footerBannerH) + ' ' + F(margin) + ' ' + F(bannerY) + ' cm /LogoFoot Do Q\n';
        }
        // Nota sobre el banner: aviso IA centrado + numeracion a la derecha,
        // 7 pt #475569 (PP1 _FOOTER_FONT_PT / _SLATE_SOFT).
        const notaY = bannerY + footerBannerH + 1.5 * MM;
        s += '0.278 0.333 0.412 rg\n';
        s += 'BT /F1 7 Tf ' + F(pageWidth / 2 - approxWidth('Generado con IA', 7) / 2) + ' ' + F(notaY + 1) + ' Td (Generado con IA) Tj ET\n';
        const pageStr = FL.page + ' ' + pageNum + ' ' + FL.sep + ' ' + totalPages;
        s += 'BT /F1 7 Tf ' + F(pageWidth - margin - approxWidth(pageStr, 7)) + ' ' + F(notaY + 1) + ' Td (' + pdfEsc(pageStr) + ') Tj ET\n';
        s += 'Q\n';
        return s;
    };

    const buildWatermark = function () { return ''; };

    // Construye un PDF con header/footer brandeados. Cuando el logo
    // JPG está disponible se incrusta como XObject de imagen (PDF
    // soporta JPEG directo vía /DCTDecode, sin decodificar en cliente)
    // y se dibuja en la cabecera. Si no, cae a un logo vectorial de
    // licenciatura + wordmark "OposicionesIA". headerTitle aparece a
    // la derecha (ej. "Tema 5 · Primaria"); si está vacío no se imprime.
    async function exportPdf(content, filename, onToast, headerTitle, lang, sections, headerSubtitle, footerTitle) {
        const P = BRAND.pdf;
        const langSample = (sections && sections.length) ? sections.map(function (s) { return s.content || ''; }).join(' ') : content;
        const FL = footerLabel(effectiveLang(langSample, lang));
        await ensureBranding();
        // Lo que la cabecera y el pie necesitan saber de ESTE documento.
        const chrome = { headerTitle, footerTitle, FL };
        safeToast(onToast, 'Generando PDF…');
        // Modo multi-sección (enunciado + ORIENTACIÓN + SOLUCIÓN en un único PDF):
        // cada sección con `title` genera una página divisoria (título centrado) y
        // arranca en página nueva. Sin `sections`, modo clásico de un solo contenido.
        let blocks;
        if (sections && sections.length) {
            blocks = [];
            sections.forEach(function (sec) {
                if (!sec.content || !String(sec.content).trim()) return;
                if (sec.title) blocks.push({ type: '__cover', title: sec.title });
                const sub = attachCaptions(parseMarkdownBlocks(String(sec.content)));
                for (const b of sub) blocks.push(b);
            });
        } else {
            blocks = insertPageBreaks(attachCaptions(parseMarkdownBlocks(content)));
        }

        // Pre-rasteriza los diagramas SVG a JPEG (asíncrono) para incrustarlos
        // como imagen. Cada bloque svg guarda en `_img` el índice de su imagen
        // en svgImages, o -1 si la rasterización falló (entonces cae a texto).
        const svgImages = [];
        for (const b of blocks) {
            if (b.type === 'svg') {
                const im = await rasterizeSvg(b.svg, 3);
                b._img = im ? (svgImages.push(im) - 1) : -1;
            }
        }

        // Pre-renderiza la math (en línea $…$ y en bloque $$…$$) de los bloques de
        // texto a imagen con MathJax. Se cachea por (display|tex) y se reutiliza la
        // misma lista de imágenes que los diagramas. Si MathJax no carga, la math
        // cae a texto crudo sin romper la exportación.
        const mathCache = {};
        const mathKey = function (tex, display, bg) { return (display ? 'D|' : 'I|') + (bg || '#ffffff') + '|' + tex; };
        // Fondo de la cabecera de tabla: la math de esas celdas se rasteriza con
        // este color de fondo para que no salga un recuadro blanco sobre el relleno.
        const TABLE_HEADER_FILL = '#eff3fb';
        const TABLE_HEADER_FILL_RGB = [0.937, 0.953, 0.984];
        const _mathSegs = [];
        const RICH_TYPES = { paragraph: 1, heading: 1, li: 1, oli: 1, quote: 1 };
        for (const b of blocks) {
            if (b.type === 'table' && Array.isArray(b.rows)) {
                // La math vive también en celdas de tabla; la fila 0 (cabecera) se
                // rasteriza con el fondo de cabecera.
                for (let ri = 0; ri < b.rows.length; ri++) {
                    const bg = ri === 0 ? TABLE_HEADER_FILL : '#ffffff';
                    for (const cell of b.rows[ri]) {
                        if (typeof cell === 'string' && cell.indexOf('$') !== -1) {
                            for (const seg of splitInlineMath(cell)) { if (seg.math !== undefined) _mathSegs.push({ math: seg.math, display: seg.display, bg: bg }); }
                        }
                    }
                }
                continue;
            }
            if (!RICH_TYPES[b.type]) continue; // los bloques de código se dibujan literales, no por emitRich
            if (typeof b.text !== 'string' || b.text.indexOf('$') === -1) continue;
            for (const seg of splitInlineMath(b.text)) {
                if (seg.math !== undefined) _mathSegs.push({ math: seg.math, display: seg.display, bg: '#ffffff' });
            }
        }
        if (_mathSegs.length) {
            try {
                await loadMathJax();
                for (const seg of _mathSegs) {
                    const k = mathKey(seg.math, seg.display, seg.bg);
                    if (mathCache[k] !== undefined) continue;
                    const im = await renderMathImage(seg.math, seg.display, seg.display ? 13 : 12, seg.bg);
                    mathCache[k] = im ? (svgImages.push(im) - 1) : -1;
                }
            } catch (e) { /* MathJax no disponible: la math se mostrará como texto */ }
        }



        // Caracteres tras los que se PUEDE cortar una palabra más ancha que su
        // caja (equivalente a overflow-wrap: break-word con puntos de corte
        // «amables»: URLs, subredes, rutas, compuestos con guion, siglas con
        // barra…). Si la palabra no contiene ninguno, se corta por carácter.
        // NUNCA se añade un guion inventado: en identificadores técnicos
        // (IPs, URLs, comandos) un guion extra cambia el significado.
        const SOFT_BREAK_CHARS = '/-.,;:_)]}=&';
        // Parte `word` en trozos que quepan cada uno en `maxWidth`, prefiriendo
        // cortar justo después del último carácter de SOFT_BREAK_CHARS visto.
        // Garantiza avance (mínimo 1 carácter por trozo), así que termina
        // siempre, incluso con cajas degeneradamente estrechas.
        const breakLongWord = function (word, size, maxWidth, bold, mono) {
            const chunks = [];
            let start = 0;
            while (start < word.length) {
                let w = 0, lastSoft = -1, end = start;
                while (end < word.length) {
                    const cw = (mono ? 600 : helvCharWidth(word[end], bold)) * size / 1000;
                    if (w + cw > maxWidth && end > start) break;
                    w += cw;
                    if (SOFT_BREAK_CHARS.indexOf(word[end]) !== -1) lastSoft = end + 1;
                    end++;
                }
                if (end >= word.length) { chunks.push(word.slice(start)); break; }
                const cut = lastSoft > start ? lastSoft : end;
                chunks.push(word.slice(start, cut));
                start = cut;
            }
            return chunks.length ? chunks : [word];
        };

        // Envuelve `text` por ancho real en puntos usando métricas
        // Helvetica reales. Va acumulando ancho carácter a carácter
        // (incremental) para no remedir desde cero en cada palabra.
        // Una palabra más ancha que `maxWidth` se parte con breakLongWord:
        // cada trozo sale como línea propia (no se re-unen con espacio, que
        // corrompería la palabra), y el último trozo abre la línea siguiente.
        // `mono` mide con Courier (600/1000 fijo por carácter): las líneas de
        // código se DIBUJAN con /F4 Courier, y medirlas en Helvetica (~10-20 %
        // más estrecha) dejaba líneas que «cabían» al medir pero asomaban por
        // el margen derecho al renderizar.
        const wrapByWidth = function (text, size, maxWidth, bold, mono) {
            const words = text.split(' ');
            const measure = function (t) { return mono ? t.length * 600 * size / 1000 : helvWidth(t, size, bold); };
            const spaceW = (mono ? 600 : helvCharWidth(' ', bold)) * size / 1000;
            const lines = [];
            let current = '', currentW = 0;
            for (const word of words) {
                const wordW = measure(word);
                if (wordW > maxWidth) {
                    if (current) { lines.push(current); current = ''; currentW = 0; }
                    const chunks = breakLongWord(word, size, maxWidth, bold, mono);
                    for (let k = 0; k < chunks.length - 1; k++) lines.push(chunks[k]);
                    current = chunks[chunks.length - 1];
                    currentW = measure(current);
                    continue;
                }
                const candidateW = current ? (currentW + spaceW + wordW) : wordW;
                if (candidateW <= maxWidth || !current) {
                    current = current ? (current + ' ' + word) : word;
                    currentW = candidateW;
                } else {
                    lines.push(current);
                    current = word;
                    currentW = wordW;
                }
            }
            if (current) lines.push(current);
            return lines.length ? lines : [''];
        };

        // Construye las líneas (texto + math en imagen) de un texto, envuelto a
        // `maxW`. Cada línea: {segs, w, ascent, descent}. La math se busca en
        // mathCache con la clave que incluye el fondo (bg) con que se rasterizó.
        const buildRichLines = function (raw, size, bold, maxW, bg) {
            bg = bg || '#ffffff';
            const spaceW = helvCharWidth(' ', bold) * size / 1000;
            const units = [];
            const addText = function (t) {
                const parts = t.split(/(\s+)/);
                for (const p of parts) {
                    if (p === '') continue;
                    if (/^\s+$/.test(p)) { units.push({ sp: true }); continue; }
                    const ww = helvWidth(p, size, bold);
                    if (ww > maxW) {
                        // Palabra más ancha que la caja: se parte en trozos que
                        // quepan. Como unidades consecutivas SIN espacio entre
                        // ellas, si varios trozos caben en la misma línea se
                        // dibujan contiguos (idéntico a la palabra sin partir);
                        // si no, el corte cae en un límite de trozo y la línea
                        // nunca rebasa la caja (= nunca invade la celda vecina).
                        for (const ch of breakLongWord(p, size, maxW, bold)) {
                            units.push({ w: ch, ww: helvWidth(ch, size, bold) });
                        }
                    } else {
                        units.push({ w: p, ww: ww });
                    }
                }
            };
            for (const seg of splitInlineMath(raw)) {
                if (seg.math !== undefined) {
                    const idx = mathCache[mathKey(seg.math, seg.display, bg)];
                    if (idx !== undefined && idx >= 0) {
                        const im = svgImages[idx];
                        units.push({ m: idx, ww: im.wpt, hh: im.hpt, depth: im.depthPt || 0 });
                    } else {
                        addText('$' + seg.math + '$');
                    }
                } else {
                    addText(seg.text);
                }
            }
            const textAsc = size * 0.78, textDesc = size * 0.22;
            const lines = [];
            let line = [], lineW = 0, mAsc = 0, mDesc = 0;
            const flush = function () {
                while (line.length && line[line.length - 1].sp) { lineW -= spaceW; line.pop(); }
                if (line.length) lines.push({ segs: line, w: lineW, ascent: Math.max(textAsc, mAsc), descent: Math.max(textDesc, mDesc) });
                line = []; lineW = 0; mAsc = 0; mDesc = 0;
            };
            for (const u of units) {
                if (u.sp) { if (line.length) { line.push(u); lineW += spaceW; } continue; }
                if (lineW + u.ww > maxW && line.length) flush();
                line.push(u); lineW += u.ww;
                if (u.m !== undefined) {
                    const a = u.hh - (u.depth || 0); if (a > mAsc) mAsc = a;
                    if ((u.depth || 0) > mDesc) mDesc = u.depth || 0;
                }
            }
            flush();
            return lines;
        };

        // Ancho natural (sin envolver) de un texto con math: dimensiona columnas.
        const cellNaturalWidth = function (raw, size, bold, bg) {
            bg = bg || '#ffffff';
            let w = 0;
            for (const seg of splitInlineMath(raw)) {
                if (seg.math !== undefined) {
                    const idx = mathCache[mathKey(seg.math, seg.display, bg)];
                    if (idx !== undefined && idx >= 0) w += svgImages[idx].wpt;
                    else w += helvWidth('$' + seg.math + '$', size, bold);
                } else {
                    w += helvWidth(seg.text, size, bold);
                }
            }
            return w;
        };

        // Ancho mínimo («min-content», como el de CSS) de una celda: el
        // fragmento indivisible más ancho, usando los mismos puntos de corte
        // que breakLongWord. Es el suelo del reparto de columnas: por debajo
        // de él, alguna palabra tendría que partirse dentro de la celda.
        const cellMinWidth = function (raw, size, bold, bg) {
            bg = bg || '#ffffff';
            let maxFrag = 0;
            const scanText = function (t) {
                for (const word of t.split(/\s+/)) {
                    if (!word) continue;
                    let frag = 0;
                    for (let k = 0; k < word.length; k++) {
                        frag += helvCharWidth(word[k], bold) * size / 1000;
                        if (SOFT_BREAK_CHARS.indexOf(word[k]) !== -1) {
                            if (frag > maxFrag) maxFrag = frag;
                            frag = 0;
                        }
                    }
                    if (frag > maxFrag) maxFrag = frag;
                }
            };
            for (const seg of splitInlineMath(raw)) {
                if (seg.math !== undefined) {
                    const idx = mathCache[mathKey(seg.math, seg.display, bg)];
                    if (idx !== undefined && idx >= 0) {
                        // Una fórmula-imagen no se parte, pero al dibujarla ya
                        // se reescala al ancho de su celda; se acota su
                        // exigencia de mínimo para que no monopolice el reparto.
                        const w = Math.min(svgImages[idx].wpt, 120);
                        if (w > maxFrag) maxFrag = w;
                    } else {
                        // MathJax caído o LaTeX no rasterizable: buildRichLines
                        // pintará el LaTeX crudo como texto ('$…$'). Se mide ese
                        // mismo fallback (coherente con cellNaturalWidth) para
                        // que el min-content no quede en 0 y la columna no se
                        // colapse mientras el texto real sí ocupa sitio.
                        scanText('$' + seg.math + '$');
                    }
                } else {
                    scanText(seg.text);
                }
            }
            return maxFrag;
        };

        // Emite instrucciones para un texto que puede llevar math en línea ($…$)
        // o ser un bloque de fórmula ($$…$$). El texto normal sigue como texto
        // vectorial (nítido, seleccionable); la math va como imagen incrustada.
        const emitRich = function (raw, o) {
            o = o || {};
            const size = o.size || BODY_SIZE;
            const bold = !!o.bold, italic = !!o.italic;
            const color = o.color || P.ink;
            const indent = o.indent || 0;
            const x0 = (o.x || margin) + indent;
            const maxW = (o.maxW || contentWidth) - indent;
            const spaceW = helvCharWidth(' ', bold) * size / 1000;

            // ¿bloque de fórmula en solitario? → imagen centrada. Aire generoso
            // antes/después SIEMPRE (no solo proporcional a la altura de la
            // imagen): una fórmula corta de una línea necesita casi tanto
            // respiro como una alta, o el párrafo siguiente queda pegado.
            const bm = /^\s*\$\$([\s\S]+?)\$\$\s*$/.exec(raw);
            if (bm) {
                const idx = mathCache[mathKey(bm[1], true, '#ffffff')];
                if (idx !== undefined && idx >= 0) {
                    const im = svgImages[idx];
                    let dW = im.wpt, dH = im.hpt;
                    if (dW > contentWidth) { dH *= contentWidth / dW; dW = contentWidth; }
                    instructions.push({ text: '', fontSize: 4, x: margin, gap: 12 });
                    instructions.push({ image: idx, imgW: dW, imgH: dH, gap: Math.max(dH + 10, 26) });
                    instructions.push({ text: '', fontSize: 4, x: margin, gap: 12 });
                    return;
                }
            }

            const lines = buildRichLines(raw, size, bold, maxW, '#ffffff');
            lines.forEach(function (ln, i) {
                const isLast = i === lines.length - 1;
                const inst = {
                    rich: ln.segs, fontSize: size, x: x0, bold: bold, italic: italic, color: color,
                    justify: !!(o.justify && !isLast && lines.length > 1),
                    naturalW: ln.w, maxW: maxW, spaceW: spaceW,
                    ascent: ln.ascent, descent: ln.descent,
                    gap: Math.max(size * 1.7, ln.ascent + ln.descent + size * 0.45)
                };
                // Viñeta/número de lista: se dibuja aparte, a la izquierda del
                // indent, solo en la primera línea (sangría francesa).
                if (i === 0 && o.bulletText) { inst.bulletText = o.bulletText; inst.bulletX = o.x || margin; }
                instructions.push(inst);
            });
            if (o.gap) instructions.push({ text: '', fontSize: 4, x: margin, gap: o.gap });
        };

        // Pie de figura/tabla: texto en NEGRITA + cursiva, gris, CENTRADO y estrecho
        // (cada línea ocupa como máximo ~66 % del ancho útil; el bloque queda
        // centrado en una columna, con más aire lateral que el cuerpo). Tamaño
        // claramente menor que el texto normal (9 vs 12pt), como corresponde a
        // un pie de figura. Las instrucciones que emite quedan dentro del grupo
        // «keep» de la figura que las llama (las marca el caller).
        const emitCaption = function (text) {
            const capSize = 9;                                    // claramente menor que el cuerpo (12pt)
            const capMaxW = Math.max(150, contentWidth * 0.66);   // más ancho que antes (0.5), pero centrado
            const capLines = wrapByWidth(String(text || ''), capSize, capMaxW, true);  // métrica BOLD
            instructions.push({ text: '', fontSize: 3, x: margin, gap: 4 });
            for (const wl of capLines) {
                const lw = helvWidth(wl, capSize, true);          // ancho en negrita para centrar exacto
                const cx = margin + (contentWidth - lw) / 2;
                instructions.push({ text: wl, fontSize: capSize, x: cx, bold: true, italic: true, color: P.muted });
            }
        };

        // Estado: ¿estamos listando las entradas del ÍNDICE? (para numerarlas
        // por página y enlazarlas a su sección).
        let inIndex = false;

        const instructions = [];
        for (const block of blocks) {
            switch (block.type) {
                case 'heading': {
                    const fs    = block.level === 1 ? H1_SIZE : block.level === 2 ? H2_SIZE : H3_SIZE;
                    const color = block.level <= 2  ? P.primary : P.muted;
                    // ¿es el encabezado del ÍNDICE? activa/desactiva el modo índice.
                    const headNorm = String(block.text || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
                    inIndex = (headNorm === 'indice' || headNorm === 'index');
                    // Sección de nivel 2 numerada → destino de los enlaces del índice.
                    const secM = block.level === 2 ? String(block.text || '').match(/^\s*(\d+)\b/) : null;
                    const hStart = instructions.length;
                    // Aire extra antes de un cambio de sección — SOLO cuando el
                    // encabezado no cae justo al inicio de una página (si no,
                    // se sumaría a la cabecera dejando un hueco enorme). Las
                    // secciones numeradas «## N. TITULO» (level 2, el nivel que
                    // marca cambio de tema) necesitan más separación que un
                    // simple cambio de párrafo; las «### N.M subsección»
                    // (level 3) solo un poco más.
                    const extraBefore = block.level === 2 ? 26 : block.level === 1 ? 16 : 6;
                    instructions.push({ conditionalGap: true, gap: extraBefore });
                    instructions.push({ text: '', fontSize: BODY_SIZE, x: margin, gap: 8 });
                    const lineStartIdx = instructions.length;
                    if (block.text.indexOf('$') !== -1) {
                        emitRich(block.text, { size: fs, bold: true, color: color });
                    } else {
                        for (const wl of wrapByWidth(block.text, fs, contentWidth, true)) {
                            instructions.push({ text: wl, fontSize: fs, x: margin, bold: true, color: color });
                        }
                    }
                    if (block.level === 1) {
                        instructions.push({ rule: true, color: P.primary, weight: 1.2, gap: 4 });
                    }
                    instructions.push({ text: '', fontSize: 4, x: margin, gap: 6 });
                    // Grupo «keep-with-next»: el encabezado no puede quedar como
                    // última línea de página (Regla 1).
                    for (let t = hStart; t < instructions.length; t++) instructions[t].kh = true;
                    if (secM && instructions[lineStartIdx]) instructions[lineStartIdx].sectionNumber = parseInt(secM[1], 10);
                    break;
                }
                case 'paragraph': {
                    if (block.text.indexOf('$') !== -1) {
                        emitRich(block.text, { size: BODY_SIZE, color: P.ink, justify: true, gap: 4 });
                        break;
                    }
                    // Justifica todas las líneas excepto la última del
                    // párrafo (y excepto cuando el párrafo solo tiene
                    // una línea: ahí el efecto sería antinatural).
                    const lines = wrapByWidth(block.text, BODY_SIZE, contentWidth);
                    lines.forEach(function (wl, idx) {
                        const isLast = idx === lines.length - 1;
                        const shouldJustify = !isLast && lines.length > 1;
                        instructions.push({ text: wl, fontSize: BODY_SIZE, x: margin, color: P.ink, justify: shouldJustify });
                    });
                    instructions.push({ text: '', fontSize: 6, x: margin, gap: 4 });
                    break;
                }
                case 'li': {
                    // Viñeta real (•) dibujada aparte del texto, con sangría
                    // francesa consistente tanto si el item lleva math ($…$)
                    // como si no — antes un item con math se salía del flujo
                    // (sin indent, ancho completo) y quedaba desalineado y sin
                    // aire respecto a sus hermanos sin math.
                    emitRich(block.text, { size: BODY_SIZE, color: P.ink, indent: 18, bulletText: '•', gap: 6 });
                    break;
                }
                case 'oli': {
                    const oStart = instructions.length;
                    if (block.text.indexOf('$') !== -1) {
                        emitRich(block.text, { size: BODY_SIZE, color: P.ink, indent: 22, bulletText: block.number + '.', gap: 6 });
                    } else {
                        const oliPrefix = '  ' + block.number + '. ';
                        const oliIndent = ' '.repeat(oliPrefix.length);
                        const oliW = contentWidth - 18;
                        const oliLines = wrapByWidth(block.text, BODY_SIZE, oliW);
                        oliLines.forEach(function (wl, idx) {
                            instructions.push({ text: (idx === 0 ? oliPrefix : oliIndent) + wl, fontSize: BODY_SIZE, x: margin, color: P.ink });
                        });
                        instructions.push({ text: '', fontSize: 3, x: margin, gap: 2 });
                    }
                    // Entrada del índice: numerar por página + enlazar a su sección.
                    if (inIndex && instructions[oStart]) instructions[oStart].indexNum = parseInt(block.number, 10);
                    break;
                }
                case 'quote': {
                    if (block.text.indexOf('$') !== -1) {
                        emitRich('    | ' + block.text, { size: BODY_SIZE, italic: true, color: P.muted, gap: 3 });
                        break;
                    }
                    const quoteIndent = 30;
                    const quoteW = contentWidth - quoteIndent;
                    for (const wl of wrapByWidth(block.text, BODY_SIZE, quoteW)) {
                        instructions.push({ text: '    | ' + wl, fontSize: BODY_SIZE, x: margin, italic: true, color: P.muted });
                    }
                    instructions.push({ text: '', fontSize: 4, x: margin, gap: 3 });
                    break;
                }
                case 'code':
                    instructions.push({ text: '', fontSize: 3, x: margin, gap: 2 });
                    for (const cl of block.text.split('\n')) {
                        // Courier es monoespaciada: envolver con su métrica real (mono).
                        for (const wl of wrapByWidth(cl, 10, contentWidth - 12, false, true)) {
                            instructions.push({ text: '  ' + wl, fontSize: 10, x: margin, font: 'Courier', color: P.ink, codeBg: true });
                        }
                    }
                    instructions.push({ text: '', fontSize: 3, x: margin, gap: 2 });
                    break;
                case 'svg': {
                    const figStart = instructions.length;
                    if (typeof block._img === 'number' && block._img >= 0) {
                        // Diagrama rasterizado → imagen centrada. Tamaño natural
                        // (viewBox, ≈ wpx/scale) acotado al ancho útil y a casi una
                        // página de alto; manteniendo proporción.
                        const im = svgImages[block._img];
                        // Ancho de presentación proporcional a la complejidad (ancho
                        // del viewBox), como en la web: figura contenida, nunca a
                        // página completa. ~0.6 pt por unidad de viewBox, con suelo y
                        // tope en el ancho útil.
                        let dispW = Math.min(contentWidth, Math.max(170, (im.vbw || 460) * 0.6));
                        let dispH = dispW / im.aspect;
                        const maxH = contentTop - contentBottom - 20;
                        if (dispH > maxH) { dispH = maxH; dispW = dispH * im.aspect; }
                        // Más aire arriba y abajo de la figura (Regla 3). El pie va
                        // pegado a la imagen (gap pequeño) y el aire grande va después.
                        instructions.push({ text: '', fontSize: 4, x: margin, gap: 18 });
                        instructions.push({ image: block._img, imgW: dispW, imgH: dispH, gap: dispH + 6 });
                        if (block.caption) emitCaption(block.caption);
                        instructions.push({ text: '', fontSize: 4, x: margin, gap: 18 });
                    } else {
                        // Fallback: si no se pudo rasterizar, va como código.
                        instructions.push({ text: '', fontSize: 3, x: margin, gap: 8 });
                        for (const cl of (block.svg || '').split('\n')) {
                            for (const wl of wrapByWidth(cl, 9, contentWidth - 12, false, true)) {
                                instructions.push({ text: '  ' + wl, fontSize: 9, x: margin, font: 'Courier', color: P.ink, codeBg: true });
                            }
                        }
                        if (block.caption) emitCaption(block.caption);
                        instructions.push({ text: '', fontSize: 3, x: margin, gap: 8 });
                    }
                    // Grupo «keep»: la figura y su pie no se separan entre páginas.
                    for (let t = figStart; t < instructions.length; t++) instructions[t].kf = true;
                    break;
                }
                case 'table': {
                    if (!block.rows.length) break;
                    const cols = block.rows.reduce(function (m, r) { return Math.max(m, r.length); }, 0);
                    const tsize = 10, tpad = 5;   // tipografía de tabla algo menor que el cuerpo (12pt) para compactar filas
                    // Anchos de columna al estilo «auto table layout» de CSS:
                    //  - Si el contenido natural cabe en el ancho útil, reparto
                    //    proporcional al natural (comportamiento de siempre).
                    //  - Si NO cabe, cada columna recibe al menos su min-content
                    //    (su palabra indivisible más ancha, con tope del 60 % del
                    //    ancho útil) y el espacio restante se reparte en
                    //    proporción a lo que cada columna «querría» de más. Así
                    //    una palabra larga ya no queda en una columna más
                    //    estrecha que ella (que era lo que la hacía invadir las
                    //    celdas vecinas).
                    //  - Si ni siquiera los mínimos caben (tablas extremas), se
                    //    escalan por igual y breakLongWord parte las palabras
                    //    dentro de la celda: puede quedar apretado, pero NUNCA
                    //    se solapa.
                    const colNat = [], colMin = [];
                    for (let ci = 0; ci < cols; ci++) { colNat[ci] = 0; colMin[ci] = 0; }
                    for (let ri = 0; ri < block.rows.length; ri++) {
                        const bg = ri === 0 ? TABLE_HEADER_FILL : '#ffffff';
                        for (let ci = 0; ci < cols; ci++) {
                            const w = cellNaturalWidth(block.rows[ri][ci] || '', tsize, ri === 0, bg);
                            if (w > colNat[ci]) colNat[ci] = w;
                            const wm = cellMinWidth(block.rows[ri][ci] || '', tsize, ri === 0, bg);
                            if (wm > colMin[ci]) colMin[ci] = wm;
                        }
                    }
                    const natW = colNat.map(function (w) { return Math.max(30, w + 2 * tpad); });
                    const sumNat = natW.reduce(function (a, b) { return a + b; }, 0);
                    let colW;
                    if (sumNat <= contentWidth) {
                        const kW = contentWidth / sumNat;
                        colW = natW.map(function (w) { return w * kW; });
                    } else {
                        const minW = colMin.map(function (w) { return Math.min(Math.max(24, w + 2 * tpad), contentWidth * 0.6); });
                        const sumMin = minW.reduce(function (a, b) { return a + b; }, 0);
                        if (sumMin >= contentWidth) {
                            const kW = contentWidth / sumMin;
                            colW = minW.map(function (w) { return w * kW; });
                        } else {
                            let flex = natW.map(function (w, fi) { return Math.max(0, w - minW[fi]); });
                            let sumFlex = flex.reduce(function (a, b) { return a + b; }, 0);
                            if (sumFlex <= 0) { flex = natW.map(function () { return 1; }); sumFlex = flex.length; }
                            const extra = contentWidth - sumMin;
                            colW = minW.map(function (w, fi) { return w + extra * flex[fi] / sumFlex; });
                        }
                    }
                    instructions.push({ text: '', fontSize: 4, x: margin, gap: 14 });
                    const rowStart = instructions.length;
                    for (let ri = 0; ri < block.rows.length; ri++) {
                        const row = block.rows[ri];
                        const isHeader = ri === 0;
                        const bg = isHeader ? TABLE_HEADER_FILL : '#ffffff';
                        const cells = [];
                        let rowH = 2 * tpad;
                        for (let ci = 0; ci < cols; ci++) {
                            const lns = buildRichLines(row[ci] || '', tsize, isHeader, colW[ci] - 2 * tpad, bg);
                            cells.push(lns);
                            let h = 2 * tpad;
                            for (const ln of lns) h += Math.max(tsize * 1.45, ln.ascent + ln.descent + 3);
                            if (h > rowH) rowH = h;
                        }
                        instructions.push({
                            tableRow: { cells: cells, colW: colW, rowHeight: rowH, isHeader: isHeader, pad: tpad, tsize: tsize, color: isHeader ? P.primary : P.ink },
                            x: margin, gap: rowH
                        });
                    }
                    // Cada fila se mantiene con la siguiente (keepWithNext, ver
                    // Reparto en páginas): así la cabecera nunca queda sola tras
                    // un salto de página, ni una única fila colgada al final o
                    // al principio de una página. Una tabla pequeña que quepa
                    // entera en una página nueva acaba, por el efecto en cadena
                    // de estos pares, moviéndose completa; una tabla grande que
                    // no quepa en ninguna página sigue partiéndose, pero siempre
                    // por un límite «limpio» entre filas completas.
                    for (let t = rowStart; t < instructions.length; t++) instructions[t].keepWithNext = true;
                    if (block.caption) {
                        // Aire extra antes del pie: sin esto, la última fila
                        // (cuyo alto ya incluye su propio padding interno) deja
                        // el pie casi pegado al borde inferior de la tabla.
                        const capGapIdx = instructions.length;
                        instructions.push({ text: '', fontSize: 3, x: margin, gap: 6 });
                        instructions[capGapIdx].keepWithNext = true;
                        emitCaption(block.caption);
                    }
                    instructions.push({ text: '', fontSize: 4, x: margin, gap: 20 });
                    break;
                }
                case 'caption':
                    emitCaption(block.text);
                    instructions.push({ text: '', fontSize: 4, x: margin, gap: 6 });
                    break;
                case 'hr':
                    instructions.push({ rule: true, color: P.line, weight: 0.6, gap: 6 });
                    instructions.push({ text: '', fontSize: 4, x: margin, gap: 3 });
                    break;
                case 'empty':
                    instructions.push({ text: '', fontSize: 6, x: margin, gap: 4 });
                    break;
                case 'pagebreak':
                    instructions.push({ pagebreak: true });
                    break;
                case '__cover':
                    instructions.push({ cover: block.title });
                    break;
            }
        }

        const lineH = function (instr) {
            if (instr.rule) return instr.gap || 6;
            return (instr.gap || (instr.fontSize || 11) * 1.7);
        };

        const isVisible = function (x) {
            return !!(x && (x.image !== undefined || x.rich || x.tableRow || x.rule || (typeof x.text === 'string' && x.text.length)));
        };

        // Grupos «keep-with-next»: marca el inicio de cada grupo (encabezado, o
        // figura+pie) con keepStart/keepSpan para que NO se parta dejando un
        // encabezado huérfano al pie de página (Regla 1) ni una figura separada
        // de su pie.
        for (let i = 0; i < instructions.length; i++) {
            const ins = instructions[i];
            if (ins.kh && (i === 0 || !instructions[i - 1].kh)) {
                let j = i; while (j < instructions.length && instructions[j].kh) j++;
                // Arrastra hasta 2 líneas de contenido posteriores: el encabezado
                // debe ir acompañado de algo de su texto en la misma página.
                let k = j, taken = 0;
                while (k < instructions.length && taken < 2) {
                    const x = instructions[k];
                    if (x.pagebreak || x.cover) break;
                    k++;
                    if (isVisible(x)) taken++;
                }
                ins.keepStart = true; ins.keepSpan = k - i;
            } else if (ins.kf && (i === 0 || !instructions[i - 1].kf)) {
                let j = i; while (j < instructions.length && instructions[j].kf) j++;
                ins.keepStart = true; ins.keepSpan = j - i;
            }
        }

        // Reparto en páginas
        const pages = [[]];
        let currentY = contentTop;
        for (let ii = 0; ii < instructions.length; ii++) {
            const instr = instructions[ii];
            if (instr.pagebreak) {
                pages.push([]);
                currentY = contentTop;
                continue;
            }
            if (instr.cover) {
                pages.push([{ coverTitle: instr.cover }]); // página divisoria dedicada
                pages.push([]);                             // el contenido sigue en página nueva
                currentY = contentTop;
                continue;
            }
            // Inicio de grupo «keep»: si el grupo entero no cabe en lo que queda
            // de página, salta de página ANTES (salvo que ya estemos al inicio de
            // una página, donde forzar otro salto no ayudaría). Se evalúa ANTES
            // del espaciador condicional de más abajo porque ese espaciador
            // puede ser el primer elemento del grupo (un encabezado) y aun así
            // debe decidirse el salto de página con el grupo completo.
            if (instr.keepStart && currentY < contentTop - 0.5) {
                let need = 0;
                for (let j = ii; j < ii + instr.keepSpan && j < instructions.length; j++) {
                    const x = instructions[j];
                    if (x.pagebreak || x.cover) break;
                    // El espaciador condicional SÍ se cuenta: si no forzamos un
                    // salto aquí (currentY < contentTop - 0.5, comprobado justo
                    // arriba), su gap se va a restar de verdad al procesarlo más
                    // abajo. No contarlo aquí infravalora «need» y puede dejar el
                    // encabezado solo al pie de página con su contenido empujado
                    // a la siguiente (el bug de la Regla 1 antes de esta corrección).
                    need += lineH(x);
                }
                if (currentY - need < contentBottom) { pages.push([]); currentY = contentTop; }
            }
            // Fila de tabla «keepWithNext»: si esta fila y la siguiente no caben
            // juntas en lo que queda de página, el salto se fuerza ANTES de esta
            // fila (nunca después), para que la cabecera de la tabla no quede
            // sola tras el salto ni ninguna fila individual quede colgada sin
            // acompañamiento al pie o al inicio de una página (Regla 6).
            if (instr.keepWithNext && currentY < contentTop - 0.5) {
                const nextInstr = instructions[ii + 1];
                const need2 = lineH(instr) + (nextInstr ? lineH(nextInstr) : 0);
                if (currentY - need2 < contentBottom) { pages.push([]); currentY = contentTop; }
            }
            // Espaciador condicional (cambio de sección): solo cuenta si NO
            // estamos ya al principio de una página — si no, se sumaría al
            // margen superior y dejaría un hueco enorme bajo la cabecera.
            if (instr.conditionalGap) {
                if (currentY < contentTop - 0.5) currentY -= instr.gap;
                continue;
            }
            const h = lineH(instr);
            if (currentY - h < contentBottom) {
                pages.push([]);
                currentY = contentTop;
            }
            // Para líneas mixtas (rich) la base se baja por su ascenso, de modo que
            // el math (que sube desde la base) quede dentro del hueco reservado.
            pages[pages.length - 1].push(Object.assign({}, instr, { y: currentY - (instr.ascent || 0) }));
            currentY -= h;
        }


        // ── Composición del PDF ──
        // Cada entrada de `objects` es o bien un string ASCII (objeto
        // de texto) o un descriptor { header, binary, footer } para el
        // XObject de imagen, donde `binary` son los bytes crudos JPEG
        // (van como tales al stream, sin escapar). Eso obliga a sumar
        // offsets en bytes mezclando .length (texto ASCII = 1 byte/char)
        // y .byteLength (Uint8Array), y a entregar el PDF como un
        // array de partes al constructor de Blob.
        const objects = [];
        let objCount = 0;
        const addObj = function (c) { objCount++; objects.push(c); return objCount; };

        addObj('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
        addObj(''); // se completa después con /Pages
        addObj('3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj');
        addObj('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj');
        addObj('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>\nendobj');
        addObj('6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>\nendobj');
        addObj('7 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-BoldOblique /Encoding /WinAnsiEncoding >>\nendobj');
        // ExtGState (obj 8) para la marca de agua: alfa de relleno y de trazo muy
        // bajo, de modo que el texto grande de fondo apenas tiña la página y no
        // dificulte la lectura del contenido.
        addObj('8 0 obj\n<< /Type /ExtGState /ca 0.08 /CA 0.08 >>\nendobj');
        // Marcado IA (Reglamento (UE) 2024/1689, art. 50): diccionario /Info con
        // metadatos que identifican el documento como generado con IA. El id se
        // obtiene de addObj() (dinámico, nunca hardcodeado) y se referencia en el
        // trailer vía infoObjId. Strings ASCII puro (pdfEsc octaliza el resto).
        const infoObjId = addObj((objCount + 1) + ' 0 obj\n<< /Title (' + pdfEsc(String(headerTitle || filename || 'Documento')) + ')'
            + ' /Producer (' + pdfEsc('OposicionesIA (oposicionesia.com)') + ')'
            + ' /Creator (' + pdfEsc('OposicionesIA (oposicionesia.com)') + ')'
            + ' /Subject (' + pdfEsc('Contenido generado con inteligencia artificial (IA)') + ')'
            + ' /Keywords (' + pdfEsc('AI-generated, IA, Reglamento (UE) 2024/1689') + ') >>\nendobj');

        // ── XObjects de imagen: logo (/Im0) + diagramas SVG rasterizados
        // (/Im1, /Im2, …). Todos JPEG baseline RGB embebidos vía /DCTDecode.
        const xobjs = [];
        const addImageObj = function (name, bytes, wpx, hpx) {
            const header = (objCount + 1) + ' 0 obj\n'
                + '<< /Type /XObject /Subtype /Image'
                + ' /Width ' + wpx + ' /Height ' + hpx
                + ' /ColorSpace /DeviceRGB /BitsPerComponent 8'
                + ' /Filter /DCTDecode /Length ' + bytes.byteLength
                + ' >>\nstream\n';
            const id = addObj({ header: header, binary: bytes, footer: '\nendstream\nendobj' });
            xobjs.push({ name: name, id: id });
        };
                LOGOS.forEach(function (l, i) { if (l.bytes) addImageObj('Logo' + i, l.bytes, l.w, l.h); });
        if (FOOTER_IMG.bytes) addImageObj('LogoFoot', FOOTER_IMG.bytes, FOOTER_IMG.w, FOOTER_IMG.h);
        for (let k = 0; k < svgImages.length; k++) {
            addImageObj('Im' + (k + 1), svgImages[k].bytes, svgImages[k].wpx, svgImages[k].hpx);
        }

        // Las páginas declaran todos los XObjects usados como recursos.
        const xObjResource = xobjs.length
            ? ' /XObject << ' + xobjs.map(function (x) { return '/' + x.name + ' ' + x.id + ' 0 R'; }).join(' ') + ' >>'
            : '';
        // Recurso de estado gráfico para la marca de agua (transparencia).
        const extGStateResource = '';


        // ── Regla 2: índice numerado por página + enlaces internos ──
        // Aterrizaje de cada sección de nivel 2 (página, y) tras paginar.
        const sectionLanding = {};
        for (let p = 0; p < pages.length; p++) {
            for (const ins of pages[p]) {
                if (ins.sectionNumber !== undefined && sectionLanding[ins.sectionNumber] === undefined) {
                    sectionLanding[ins.sectionNumber] = { page: p, y: ins.y };
                }
            }
        }
        // Para cada entrada del índice: su nº de página y el destino del enlace.
        const pageAnnots = pages.map(function () { return []; });
        for (let p = 0; p < pages.length; p++) {
            for (const ins of pages[p]) {
                if (ins.indexNum === undefined) continue;
                const land = sectionLanding[ins.indexNum];
                if (!land) continue;
                ins._idxPage = land.page + 1;
                pageAnnots[p].push({ ins: ins, land: land });
            }
        }
        // Pre-asignación de números de objeto (stream + page + anotaciones por
        // página) para poder referenciar páginas destino aún no escritas.
        let _objCursor = objCount;
        const _pageId = [];
        for (let p = 0; p < pages.length; p++) {
            _objCursor++;               // id del stream
            _pageId[p] = ++_objCursor;  // id de la página
            _objCursor += pageAnnots[p].length; // ids de las anotaciones
        }

        const totalPages = Math.max(1, pages.length);
        const pageObjIds = [];
        for (let p = 0; p < pages.length; p++) {
            const page = pages[p];
            let stream = '';
            const coverInstr = (page.length === 1 && page[0].coverTitle) ? page[0] : null;
            if (coverInstr) {
                // Página divisoria entre partes: SOLO el título, grande y centrado
                // (vertical + horizontal), sin cabecera ni pie.
                const t = String(coverInstr.coverTitle || '');
                const tSize = 30;
                const tw = helvWidth(t, tSize, true);
                const tx = (pageWidth - tw) / 2;
                const ty = pageHeight / 2 - tSize * 0.34;
                stream += C3(P.primary) + ' rg BT /F2 ' + tSize + ' Tf ' + tx.toFixed(2) + ' ' + ty.toFixed(2) + ' Td (' + pdfEsc(t) + ') Tj ET\n';
                const sIdC = addObj((objCount + 1) + ' 0 obj\n<< /Length ' + stream.length + ' >>\nstream\n' + stream + 'endstream\nendobj');
                const pIdC = addObj((objCount + 1) + ' 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + pageWidth + ' ' + pageHeight + '] /Contents ' + sIdC + ' 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R /F4 6 0 R /F5 7 0 R >>' + xObjResource + extGStateResource + ' >> >>\nendobj');
                pageObjIds.push(pIdC);
                continue;
            }
            stream += buildHeaderStream(chrome, p === 0);
            for (const instr of page) {
                if (instr.rule) {
                    const c = instr.color || P.line;
                    const wt = (instr.weight || 0.6).toFixed(2);
                    const ry = (instr.y + 4).toFixed(2);
                    stream += 'q ' + c[0].toFixed(3) + ' ' + c[1].toFixed(3) + ' ' + c[2].toFixed(3) + ' RG ' + wt + ' w '
                           + margin + ' ' + ry + ' m ' + (pageWidth - margin) + ' ' + ry + ' l S Q\n';
                    continue;
                }
                if (instr.image !== undefined) {
                    // `cm` posiciona la esquina inferior-izquierda; instr.y es el
                    // tope de la imagen. Centrada en el ancho útil. Aislada en q..Q.
                    const iw = instr.imgW, ih = instr.imgH;
                    const ix = margin + (contentWidth - iw) / 2;
                    const iy = instr.y - ih;
                    stream += 'q ' + iw.toFixed(2) + ' 0 0 ' + ih.toFixed(2) + ' ' + ix.toFixed(2) + ' ' + iy.toFixed(2) + ' cm /Im' + (instr.image + 1) + ' Do Q\n';
                    continue;
                }
                if (instr.rich) {
                    // Línea mixta: palabras (texto vectorial) + math (imagen). El
                    // math se ancla a la línea base (instr.y) restando su profundidad.
                    const rsize = instr.fontSize || BODY_SIZE;
                    const rc = instr.color;
                    const rColorPart = rc ? (rc[0].toFixed(3) + ' ' + rc[1].toFixed(3) + ' ' + rc[2].toFixed(3) + ' rg ') : '';
                    const rFont = instr.bold ? '/F2' : instr.italic ? '/F3' : '/F1';
                    const rsp = instr.spaceW || (helvCharWidth(' ', instr.bold) * rsize / 1000);
                    let extraSp = 0;
                    if (instr.justify) {
                        let nsp = 0; for (const s of instr.rich) if (s.sp) nsp++;
                        const g = instr.maxW - instr.naturalW;
                        if (nsp > 0 && g > 0 && g < 90) extraSp = g / nsp;
                    }
                    if (instr.bulletText) {
                        const bx = instr.bulletX !== undefined ? instr.bulletX : margin;
                        stream += 'q ' + rColorPart + 'BT ' + rFont + ' ' + rsize + ' Tf ' + bx.toFixed(2) + ' ' + instr.y + ' Td (' + pdfEsc(instr.bulletText) + ') Tj ET Q\n';
                    }
                    let cx = instr.x || margin;
                    for (const s of instr.rich) {
                        if (s.sp) { cx += rsp + extraSp; continue; }
                        if (s.m !== undefined) {
                            const iy2 = instr.y - (s.depth || 0);
                            stream += 'q ' + s.ww.toFixed(2) + ' 0 0 ' + s.hh.toFixed(2) + ' ' + cx.toFixed(2) + ' ' + iy2.toFixed(2) + ' cm /Im' + (s.m + 1) + ' Do Q\n';
                            cx += s.ww;
                        } else {
                            stream += 'q ' + rColorPart + 'BT ' + rFont + ' ' + rsize + ' Tf ' + cx.toFixed(2) + ' ' + instr.y + ' Td (' + pdfEsc(s.w) + ') Tj ET Q\n';
                            cx += s.ww;
                        }
                    }
                    continue;
                }
                if (instr.tableRow) {
                    // Tabla real: relleno de cabecera + rejilla (borde por celda) +
                    // contenido por celda (texto vectorial + math), alineado arriba.
                    const tr = instr.tableRow;
                    const rowTop = instr.y;
                    const rowBot = instr.y - tr.rowHeight;
                    const totalW = tr.colW.reduce(function (a, b) { return a + b; }, 0);
                    const x0 = instr.x || margin;
                    if (tr.isHeader) {
                        const f = TABLE_HEADER_FILL_RGB;
                        stream += 'q ' + f[0].toFixed(3) + ' ' + f[1].toFixed(3) + ' ' + f[2].toFixed(3) + ' rg ' + x0.toFixed(2) + ' ' + rowBot.toFixed(2) + ' ' + totalW.toFixed(2) + ' ' + tr.rowHeight.toFixed(2) + ' re f Q\n';
                    }
                    const L = P.line;
                    const tFont = tr.isHeader ? '/F2' : '/F1';
                    const tc = tr.color;
                    const tColorPart = tc ? (tc[0].toFixed(3) + ' ' + tc[1].toFixed(3) + ' ' + tc[2].toFixed(3) + ' rg ') : '';
                    const tsp = helvCharWidth(' ', tr.isHeader) * tr.tsize / 1000;
                    let cx = x0;
                    for (let ci = 0; ci < tr.cells.length; ci++) {
                        const w = tr.colW[ci];
                        stream += 'q ' + L[0].toFixed(3) + ' ' + L[1].toFixed(3) + ' ' + L[2].toFixed(3) + ' RG 0.7 w ' + cx.toFixed(2) + ' ' + rowBot.toFixed(2) + ' ' + w.toFixed(2) + ' ' + tr.rowHeight.toFixed(2) + ' re S Q\n';
                        // Alineación vertical CENTRADA dentro de la celda: se mide la
                        // altura real del bloque de líneas y se reparte el hueco
                        // sobrante de forma simétrica (con un mínimo del padding).
                        // La alineación horizontal se mantiene a la izquierda.
                        let cellContentH = 0;
                        for (const ln of tr.cells[ci]) cellContentH += ln.ascent + ln.descent + 3;
                        if (cellContentH > 0) cellContentH -= 3;
                        const vpad = Math.max(tr.pad, (tr.rowHeight - cellContentH) / 2);
                        let by = rowTop - vpad;
                        for (const ln of tr.cells[ci]) {
                            by -= ln.ascent;
                            let lx = cx + tr.pad;
                            for (const s of ln.segs) {
                                if (s.sp) { lx += tsp; continue; }
                                if (s.m !== undefined) {
                                    // No dejar que una fórmula ancha rebase el borde de su celda.
                                    let iw = s.ww, ih = s.hh, dep = (s.depth || 0);
                                    const availW = w - 2 * tr.pad;
                                    if (availW > 0 && iw > availW) { const r = availW / iw; iw = availW; ih *= r; dep *= r; }
                                    const iy2 = by - dep;
                                    stream += 'q ' + iw.toFixed(2) + ' 0 0 ' + ih.toFixed(2) + ' ' + lx.toFixed(2) + ' ' + iy2.toFixed(2) + ' cm /Im' + (s.m + 1) + ' Do Q\n';
                                    lx += iw;
                                } else {
                                    stream += 'q ' + tColorPart + 'BT ' + tFont + ' ' + tr.tsize + ' Tf ' + lx.toFixed(2) + ' ' + by.toFixed(2) + ' Td (' + pdfEsc(s.w) + ') Tj ET Q\n';
                                    lx += s.ww;
                                }
                            }
                            by -= ln.descent + 3;
                        }
                        cx += w;
                    }
                    continue;
                }
                if (!instr.text && !instr.gap) continue;
                if (instr.text) {
                    const fontKey = instr.font === 'Courier' ? '/F4' : (instr.bold && instr.italic) ? '/F5' : instr.bold ? '/F2' : instr.italic ? '/F3' : '/F1';
                    const size = instr.fontSize || BODY_SIZE;
                    if (instr.codeBg) {
                        // Fondo gris claro (#f1f5f9) tras cada línea de código. Las
                        // bandas se solapan por línea formando un bloque continuo.
                        const bgH = size * 1.7;
                        const bgBottom = instr.y + size * 0.72 - bgH;
                        stream += 'q 0.945 0.961 0.976 rg ' + (margin - 4).toFixed(2) + ' ' + bgBottom.toFixed(2) + ' ' + (contentWidth + 8).toFixed(2) + ' ' + bgH.toFixed(2) + ' re f Q\n';
                    }
                    const c = instr.color;
                    const colorPart = c ? (c[0].toFixed(3) + ' ' + c[1].toFixed(3) + ' ' + c[2].toFixed(3) + ' rg ') : '';
                    // Justificación por reparto de Tw entre espacios de la línea.
                    // Saltamos si: la línea no es justificable, no tiene espacios,
                    // el hueco es negativo (línea más ancha de lo esperado), o el
                    // hueco es enorme (la línea es muy corta y se vería rara).
                    let twPart = '';
                    if (instr.justify) {
                        const natural   = approxWidth(instr.text, size, instr.bold);
                        const spaces    = instr.text.split(' ').length - 1;
                        const gap       = contentWidth - natural;
                        if (spaces > 0 && gap > 0 && gap < 80) {
                            const tw = gap / spaces;
                            twPart = tw.toFixed(3) + ' Tw ';
                        }
                    }
                    stream += 'q ' + colorPart + 'BT ' + twPart + fontKey + ' ' + size + ' Tf '
                           + (instr.x || margin) + ' ' + instr.y + ' Td (' + pdfEsc(instr.text) + ') Tj ET Q\n';
                    // Entrada del índice: líderes punteados + número de página (Regla 2).
                    if (instr._idxPage !== undefined) {
                        const numStr = String(instr._idxPage);
                        const textEndX = (instr.x || margin) + approxWidth(instr.text, size, instr.bold);
                        const numW = approxWidth(numStr, size, false);
                        const numX = pageWidth - margin - numW;
                        const leadStart = textEndX + 6, leadEnd = numX - 6;
                        if (leadEnd > leadStart) {
                            stream += 'q ' + C3(P.line) + ' RG 0.8 w [0.6 3] 0 d ' + leadStart.toFixed(2) + ' ' + (instr.y + 2).toFixed(2) + ' m ' + leadEnd.toFixed(2) + ' ' + (instr.y + 2).toFixed(2) + ' l S Q\n';
                        }
                        stream += 'q ' + C3(P.muted) + ' rg BT /F1 ' + size + ' Tf ' + numX.toFixed(2) + ' ' + instr.y + ' Td (' + pdfEsc(numStr) + ') Tj ET Q\n';
                    }
                }
            }
            // Marca de agua AL FINAL (por encima de imágenes SVG y fórmulas
            // rasterizadas): si se pintara antes que el contenido, cualquier
            // imagen opaca (diagrama, fórmula) la taparía por completo y
            // dejaría un «hueco» rectangular sin marca de agua en mitad de la
            // página — inconsistente y visible. Pintándola la última, a alfa
            // muy bajo, queda como un velo uniforme sobre toda la página,
            // incluidas las imágenes, sin ocultar el contenido.
                        stream += buildFooterStream(chrome, p + 1, totalPages);

            const sId = addObj((objCount + 1) + ' 0 obj\n<< /Length ' + stream.length + ' >>\nstream\n' + stream + 'endstream\nendobj');
            // Anotaciones de enlace de esta página (van inmediatamente después
            // del objeto de página: ids _pageId[p]+1, +2, …).
            const annRefs = pageAnnots[p].map(function (a, k) { return (_pageId[p] + 1 + k) + ' 0 R'; });
            const annotsPart = annRefs.length ? ' /Annots [' + annRefs.join(' ') + ']' : '';
            const pId = addObj((objCount + 1) + ' 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + pageWidth + ' ' + pageHeight + '] /Contents ' + sId + ' 0 R' + annotsPart + ' /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R /F4 6 0 R /F5 7 0 R >>' + xObjResource + extGStateResource + ' >> >>\nendobj');
            pageObjIds.push(pId);
            for (let a = 0; a < pageAnnots[p].length; a++) {
                const an = pageAnnots[p][a];
                const eSize = an.ins.fontSize || BODY_SIZE;
                const rx1 = (margin - 2).toFixed(2);
                const ry1 = (an.ins.y - 3).toFixed(2);
                const rx2 = (pageWidth - margin + 2).toFixed(2);
                const ry2 = (an.ins.y + eSize).toFixed(2);
                const destTop = Math.min(pageHeight - 4, an.land.y + H2_SIZE + 8).toFixed(2);
                addObj((objCount + 1) + ' 0 obj\n<< /Type /Annot /Subtype /Link /Rect [' + rx1 + ' ' + ry1 + ' ' + rx2 + ' ' + ry2 + '] /Border [0 0 0] /Dest [' + _pageId[an.land.page] + ' 0 R /XYZ ' + margin + ' ' + destTop + ' 0] >>\nendobj');
            }
        }

        const kids = pageObjIds.map(function (id) { return id + ' 0 R'; }).join(' ');
        objects[1] = '2 0 obj\n<< /Type /Pages /Kids [' + kids + '] /Count ' + pageObjIds.length + ' >>\nendobj';

        // ── Ensamblado byte-aware ──
        const parts = [];
        const offsets = [];
        let pos = 0;
        const pushText = function (s) { parts.push(s); pos += s.length; };       // ASCII puro → 1 byte/char
        const pushBin  = function (b) { parts.push(b); pos += b.byteLength; };

        pushText('%PDF-1.4\n');
        for (const obj of objects) {
            offsets.push(pos);
            if (typeof obj === 'string') {
                pushText(obj + '\n');
            } else {
                pushText(obj.header);
                pushBin(obj.binary);
                pushText(obj.footer + '\n');
            }
        }
        const xrefOffset = pos;
        let xrefText = 'xref\n0 ' + (objCount + 1) + '\n0000000000 65535 f \n';
        for (const off of offsets) { xrefText += String(off).padStart(10, '0') + ' 00000 n \n'; }
        // Marcado IA (Reglamento (UE) 2024/1689, art. 50): referencia al /Info.
        xrefText += 'trailer\n<< /Size ' + (objCount + 1) + ' /Root 1 0 R /Info ' + infoObjId + ' 0 R >>\nstartxref\n' + xrefOffset + '\n%%EOF';
        pushText(xrefText);

        downloadBlob(new Blob(parts, { type: 'application/pdf' }), filename, onToast);
    }

window.OposDownloads = { exportPdf: exportPdf, downloadBlob: downloadBlob };
})();
