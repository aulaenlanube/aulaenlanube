#!/usr/bin/env python3
# ─────────────────────────────────────────────────────────────────────────────
# Genera el PDF oficial de la Avaluació 1 (Tema 1 · Nombres enters · 2n ESO D)
# con la PLANTILLA DEL CENTRE idéntica a la del motor opos-pdf.js (banda de 3
# logos arriba: Generalitat · IES Simarro · FP Excelència; pie: banner
# UE/Ministerio/Recuperació/Generalitat/GVANEXT + «Generado con IA» + número
# de pàgina; geometría PP1: margen 15 mm, hueco 8 mm + banda 18 mm).
#
# Fuente de verdad de los ejercicios: app/adaptaciones-pt/2eso/matematicas/
# exportar.ts (const EXAMEN). Este script la parsea: edita el examen ahí y
# relanza este generador para mantener web, ficha del motor y PDF oficial
# sincronizados.
#
# Uso:   python3 tools/examen/generar.py
# Sale:  public/exams/mat-2eso/aci1-nombres-enters-2eso-d.pdf   (3 A4)
# Deps:  pymupdf (pip install pymupdf), fuentes Carlito en tools/examen/fonts/
# ─────────────────────────────────────────────────────────────────────────────
import re, sys, os

try:
    import pymupdf as fitz
except ImportError:
    sys.exit("Falta pymupdf:  python3 -m pip install pymupdf")

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))  # tools/examen → tools → repo
TS   = os.path.join(ROOT, "app/adaptaciones-pt/2eso/matematicas/exportar.ts")
BR   = os.path.join(ROOT, "public/branding")
IMG  = os.path.join(ROOT, "public/img/exams/mat-2eso/edifici-pisos.jpg")
OUT  = os.path.join(ROOT, "public/exams/mat-2eso/aci1-nombres-enters-2eso-d.pdf")
FDIR = os.path.join(HERE, "fonts")

# ── 1) Leer EXAMEN desde exportar.ts (parseo directo, sin Node) ──────────────
src = open(TS, encoding="utf-8").read()
m = re.search(r"export const EXAMEN: ExamenEx\[\] = \[(.*?)\n\];", src, re.S)
if not m:
    sys.exit("No se encuentra EXAMEN en exportar.ts")

def clean(s):  # **negrita** y escapados de la web → texto plano para el PDF
    return s.replace("**", "").strip()

EXS = []
for chunk in re.split(r"\{\s*n:\s*", m.group(1))[1:]:
    n     = int(chunk[:chunk.index(",")])
    t     = clean(re.search(r't:\s*"(.*?)"', chunk).group(1))
    espai = int(re.search(r"espai:\s*(\d+)", chunk).group(1))
    pm = re.search(r"parts:\s*\[(.*?)\]\s*\}", chunk, re.S)
    tm = re.search(r"text:\s*\[(.*?)\]\s*\}", chunk, re.S)
    parts = [clean(x) for x in re.findall(r'"(.*?)"', pm.group(1))] if pm else None
    texto = [clean(x) for x in re.findall(r'"(.*?)"', tm.group(1))] if tm else None
    EXS.append({"n": n, "t": t, "espai": espai, "parts": parts, "text": texto})
print(f"Examen llegit des d'exportar.ts: {len(EXS)} exercicis")

# ── 2) Geometría PP1 (los mismos números que opos-pdf.js) ────────────────────
MM = 2.8346
PW, PH = 595.28, 841.92
M_SIDE, M_TOPGAP, M_BAND, M_BOTTOM = 15*MM, 8*MM, 18*MM, 8*MM
CW = PW - 2*M_SIDE
LOGOS = [{"file": f"{BR}/header_left.jpg",   "w": 1024, "h": 546},
         {"file": f"{BR}/header_center.jpg", "w": 2042, "h": 800},
         {"file": f"{BR}/header_right.jpg",  "w": 502,  "h": 175}]
FOOTER = {"file": f"{BR}/footer.jpg", "w": 1024, "h": 91}
BANNER_H = CW * FOOTER["h"] / FOOTER["w"]

FONT = {"reg": (FDIR+"/Carlito-Regular.ttf", "carlito",   fitz.Font(fontfile=FDIR+"/Carlito-Regular.ttf")),
        "bold":(FDIR+"/Carlito-Bold.ttf",    "carlito-b", fitz.Font(fontfile=FDIR+"/Carlito-Bold.ttf")),
        "ital":(FDIR+"/Carlito-Italic.ttf",  "carlito-i", fitz.Font(fontfile=FDIR+"/Carlito-Italic.ttf"))}

doc = fitz.open()
def T(p, x, y, t, k="reg", sz=12):
    ff, fn, _ = FONT[k]
    p.insert_text(fitz.Point(x, y), t, fontname=fn, fontfile=ff, fontsize=sz, color=(0,0,0))
def C(p, y, t, k="bold", sz=11):
    ff, fn, fo = FONT[k]
    p.insert_text(fitz.Point(PW/2 - fo.text_length(t, sz)/2, y), t, fontname=fn, fontfile=ff, fontsize=sz, color=(0,0,0))
def wrap(t, k, sz, wmax):
    fo = FONT[k][2]; lines, cur = [], ""
    for w in t.split(" "):
        if fo.text_length(cur + " " + w, sz) > wmax and cur: lines.append(cur); cur = w
        else: cur = (cur + " " + w).strip()
    if cur: lines.append(cur)
    return lines
def title(p, y, n):
    T(p, 56.6, y, f"Exercici {n}", "bold")
    p.draw_line(fitz.Point(56.64, y+1.6), fitz.Point(102.96, y+1.6), color=(0,0,0), width=0.72)
def chrome(p, num, total):
    colW = CW/len(LOGOS); boxW = colW - 5*MM
    for i, l in enumerate(LOGOS):
        asp = l["h"]/l["w"]
        w, h = (boxW, boxW*asp) if boxW*asp <= M_BAND else (M_BAND/asp, M_BAND)
        x = M_SIDE + i*colW + (colW-w)/2
        ytop = M_TOPGAP + (M_BAND-h)/2
        p.insert_image(fitz.Rect(x, ytop, x+w, ytop+h), filename=l["file"], keep_proportion=True)
    p.insert_image(fitz.Rect(M_SIDE, PH-M_BOTTOM-BANNER_H, M_SIDE+CW, PH-M_BOTTOM),
                   filename=FOOTER["file"], keep_proportion=False)
    notaY = M_BOTTOM + BANNER_H + 1.5*MM
    col = (0.278, 0.333, 0.412)
    wi = fitz.get_text_length("Generado con IA", fontname="helv", fontsize=7)
    p.insert_text(fitz.Point(PW/2-wi/2, PH-notaY-6), "Generado con IA", fontname="helv", fontsize=7, color=col)
    s = f"Pàgina {num} de {total}"; ws = fitz.get_text_length(s, fontname="helv", fontsize=7)
    p.insert_text(fitz.Point(PW-M_SIDE-ws, PH-notaY-6), s, fontname="helv", fontsize=7, color=col)

# ── 3) Render por ejercicio (datos de EXAMEN; layouts fijos por número) ──────
def en_titulo(t):
    if t in ("Resol", "Calcula"): return t + " :"
    return t

def ex_parts(p, y, ex, modo, salto=None):
    """modo: 'abc3' = a,b,c,g | d,e,f · 'pair' = 2x2 adyacentes · 'single' = 1 línea"""
    parts = ex["parts"]
    title(p, y, ex["n"]); y += 22
    T(p, 56.6, y, en_titulo(ex["t"])); y += 28
    dy = salto or (40 if modo == "abc3" else 60)
    if modo == "single":
        for pt in parts:
            T(p, 77.9, y, pt[:2], "ital"); T(p, 95.9, y, pt[3:]); y += 66
    elif modo == "abc3":
        Izq = [parts[0], parts[1], parts[2], parts[6]]; Dret = parts[3:6]
        for i in range(4):
            T(p, 77.9, y, Izq[i][:2], "ital"); T(p, 97.5, y, Izq[i][3:])
            if i < len(Dret):
                T(p, 339.8, y, Dret[i][:2], "ital"); T(p, 359.4, y, Dret[i][3:])
            y += 40
    else:  # pair
        for i in range(0, len(parts), 2):
            T(p, 77.9, y, parts[i][:2], "ital"); T(p, 97.5, y, parts[i][3:])
            if i+1 < len(parts):
                T(p, 339.8, y, parts[i+1][:2], "ital"); T(p, 359.4, y, parts[i+1][3:])
            y += dy
    return y

def ex_texto(p, y, ex, img=False):
    title(p, y, ex["n"]); y += 22
    for t in ex["text"]:
        for ln in wrap(t, "reg", 11, CW - 8):
            T(p, 56.6, y, ln, "reg", 11); y += 16
    if img and os.path.exists(IMG):
        iw = 400; ih = iw * 590 / 1296
        p.insert_image(fitz.Rect((PW-iw)/2, y+14, (PW+iw)/2, y+14+ih), filename=IMG)
    return y

def cabecera(p):
    C(p, 116, "TEMA 1. NOMBRES ENTERS", "bold", 11)
    T(p, 56.6, 132, "DEPARTAMENT DE MATEMÀTIQUES", "ital", 11)
    T(p, 62.6, 152, "1a AVALUACIÓ", "bold", 12)
    T(p, 468, 151, "NOTA: __________", "bold", 11)
    T(p, 62.6, 174, "ALUMNE/A: _____________________________________________________")
    T(p, 62.6, 196, "GRUP: 2n ESO D              Curs: 26/27    Data: ______________")
    T(p, 56.6, 222, "Escriu les operacions pas a pas, de manera que es puga seguir el procés de", "bold", 10.5)
    T(p, 56.6, 238, "resolució. Exercicis sense el procés o raonament corresponent no es consideraran correctes.", "bold", 10.5)

e = {x["n"]: x for x in EXS}
TOT = 3
# Ojo pymupdf: los handles de página se invalidan al crear páginas posteriores;
# se crean las 3 de golpe y se re-obtienen los handles.
for _ in range(TOT):
    doc.new_page(width=PW, height=PH)
p1, p2, p3 = doc[0], doc[1], doc[2]
chrome(p1, 1, TOT); cabecera(p1)
chrome(p2, 2, TOT)
chrome(p3, 3, TOT)

if 1 in e: ex_parts(p1, 274, e[1], "abc3")                       # 1 · combinades · a,b,c,g | d,e,f
if 2 in e: ex_parts(p1, 500, e[2], "single")                     # 2 · parèntesis · 1 per línia
if 3 in e: ex_parts(p2, 122, e[3], "pair")                       # 3 · restes portant · 2x2
if 4 in e: ex_texto (p2, 436, e[4], img=True)                     # 4 · Malena · valencià + imagen
if 5 in e: ex_texto (p3, 122, e[5])                              # 5 · Marc · versió senzilla
if 6 in e: ex_parts(p3, 258, e[6], "pair")                        # 6 · mul/div · 2x2

doc.subset_fonts()
os.makedirs(os.path.dirname(OUT), exist_ok=True)
doc.save(OUT, garbage=3, deflate=True)
print(f"OK {OUT}  ·  {len(doc)} pàgines  ·  {os.path.getsize(OUT)//1024} KB")
