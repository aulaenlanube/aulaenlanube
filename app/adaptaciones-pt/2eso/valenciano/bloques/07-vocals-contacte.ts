// Bloc 7 · Vocals en contacte i diftongs (llibre 2n ESO, U6, p. 74-75)
// Contingut del llibre de text reorganitzat per a alumnat amb dislèxia o
// dificultat d'organització espacial: UNA paraula per línia, model visual
// abans de cada tasca, espais amplis, instrucció curta d'un sol pas.
// Classificació diftong/hiat segons les caixes de teòria del propi llibre.
// Cinc nivells: [0] 2n ESO base · [1] 1r ESO · [2] 6è · [3] 5è · [4] 4t.

import type { Ap, Act } from "../tipos";

export const AP: Ap = {
  slug: "07-vocals-contacte",
  n: 7,
  t: "Vocals en contacte i diftongs",
  teoria: [
    "Normalment, les paraules tenen tantes síl·labes com vocals. Però quan hi ha **vocals en contacte**, has de saber si formen un **diftong**, un **hiat** o un **triptong**. Per a eixò, distingueix: vocals **fortes = a, e, o** · vocals **febles = i, u**.",
    "Fig:vocals-contacte",
    "**Diftong** = dues vocals en la **mateixa** síl·laba. El llibre les posa en dues caixes: **Creixents** (forta + feble): *ai (a-re), ei (rei-na), oi (boi-ra), ui (frui-ta), au (cau-re), eu (teu-la), iu (ciu-tat), ou (cou-re)*. **Decreixents** (feble + forta): darrere de **g** i **q** (*guan-yar, pin-güi, qua-ran-ta*) i quan **i, u** van a **principi de paraula** o **entre vocals** (*io-de, lie-na, tu-gos-lau, jo-i-et, cre-uat*).",
    "**Hiat** = dues vocals juntes en **síl·labes diferents**. Dos casos: **①** les dues vocals són fortes (a, e, o): *a-e-ri, po-e-ta*. **②** **i, u** darrere de consonant i seguides de forta: *cièn-cia, ra-di-o, flu-or, di-a-da*.",
    "**Triptong** = **tres** vocals juntes en un sol colp de veu. La vocal del **mig** no pot ser *i* ni *u*: *guai-tar, cre-ueu, de-ieu, Pa-ra-guai*.",
    "**Recorda:** dues vocals **febles** juntes en la mateixa síl·laba → la primera fa de forta: *ciu-tat, huit*.",
    "**Dígrafs** (dos lletres, un so): *gu* (fogueró) · *qu* (hoquei) · *ny* (bunyol) · *ss* (travessar) · *rr* (ferro) · *ll* (colla) · *tg* (formatge) · *tj* (jutjat) · *ix* (caixa) · *tx* (dutxa) · *tz* (setze) · *ig* (faig) · *l·l* (til·la). No són dígrafs quan la vocal es pronuncia: *aigua, quadre*.",
    "**Separar a final de línia:** **①** mai una vocal tota sola (*i-sa-bel* ✗). **②** mai un diftong trencat (*ca-i-guda* ✗ → *caig-uda* ✓). **③** *gu, qu, ll, ny, ix* no se separen (*se-guir, es-quena, co-lla*); la resta sí (*mas-sa, car-ro*); el punt volat canvia a guionet: *col·le-gi*. **④** mots compostos intactes: *trans-atlàntic, bes-avi*.",
  ],
  ej: [
    "*di-jous* → diftong **creixent** (ou = forta + feble).",
    "*flu‑or* → **hiat** cas ② (u darrere consonant, seguida de forta).",
    "*guai‑ta* → **triptong**: u-a-i en un colp, i la del mig (a) no és ni i ni u.",
  ],
};

export const ACTS: Act[] = [
  {
    t: "Separa i classifica",
    d: "Activitat 1 del llibre: separa en síl·labes i classifica cada paraula. Ací: una paraula per línia i taula ampla per a escriure còmode.",
    ic: "puzzle",
    fig: "vocals-contacte",
    nv: [
      {
        in: "Les 27 paraules del llibre en llista vertical. Escriu al costat (o en esta taula): separació + classe.",
        p: [
          "**Model:** *dijous → di-jous → diftong creixent (ou)*.",
          "**Pas 1.** Separa amb guionets. **Pas 2.** Mira la taula: creixent (forta+feble: ai, eu, ou…) · decreixent (ia, io, iu inicials o entre vocals, i els de g/q) · hiat (forta+forta, o i/u darrere consonant + forta).",
          "1 · dijous", "2 · enraonar", "3 · adeu", "4 · piragüista", "5 · huit", "6 · quota", "7 · fluor",
          "8 · iogurt", "9 · medieval", "10 · ianqui", "11 · diumenge", "12 · acció", "13 · cel·luloide",
          "14 · afluent", "15 · hiena", "16 · reina", "17 · iuca", "18 · actual", "19 · aquarel·la",
          "20 · barroer", "21 · afaitar", "22 · nuclear", "23 · paraula", "24 · aire", "25 · diada",
          "26 · terraqüi", "27 · aigüera",
        ],
        s: [
          "**C (creixent, forta+feble o les dos febles):** 1 di-jous (ou) · 3 a-deu (eu) · 4 pi-ra-güis-ta (üi) · 5 huit (ui) · 11 diu-men-ge (iu) · 13 cel·lu-loi-de (oi) · 16 rei-na (ei) · 17 iu-ca (iu) · 21 a-fai-tar (ai) · 23 pa-rau-la (au) · 24 ai-re (ai) · 27 ai-güe-ra (ai).",
          "**D (decreixent, feble+forta a principi de mot):** 8 io-gurt (io) · 10 ian-qui (ia) · 26 ter-ra-qüi (qüi).",
          "**Especials (q+u, la u no compte):** 6 quo-ta · 19 a-qua-rel·la → ací *u* sí es pronuncia (no hi ha diftong); a final de línia: *a‑qua‑rel‑la* (punt volat → guionet).",
          "**H (hiat):** 2 en-ra-o-nar (①) · 7 flu-or (②) · 9 me-di-e-val (②) · 12 ac-ci-ó (②) · 14 a-flu-ent (②) · 15 hi-e-na (②) · 18 ac-tu-al (②) · 20 bar-ro-er (①) · 22 nu-cle-ar (①) · 25 di-a-da (②).",
          "Criteri: primer separar bé, després classificar. Dubte → torna a la taula de teòria.",
        ],
      },
      {
        in: "12 paraules, ja agrupades per color. Només has de separar-les.",
        p: [
          "**Model:** *adeu → a-deu* (caixa blava = diftong creixent).",
          "**a)** Separa les síl·labes de cada paraula.",
          "**b)** Digues a veu quin so vocal conté (eu, ou, io…).",
          "🟦 Creixents →",
          "· dijous", "· adeu", "· reina", "· aire",
          "🟨 Decreixents →",
          "· iogurt", "· ianqui",
          "🟥 Hiat →",
          "· enraonar", "· medieval", "· hiena", "· diada", "· fluor", "· barroer",
        ],
        s: [
          "🟦: di-jous · a-deu · rei-na · ai-re. 🟨: io-gurt · ian-qui. 🟥: en-ra-o-nar · me-di-e-val · hi-e-na · di-a-da · flu-or · bar-ro-er.",
        ],
        ad: "De 27 a 12; la classe ja ve donada pel COLOR de la caixa (s'estalvia la decisió, es guarda l'execució).",
      },
      {
        in: "8 fitxes amb la primera síl·laba escrita. Completa i penja-la al mur del color.",
        p: [
          "**Mur:** verd = diftong · blau = hiat.",
          "Completa cadascuna en la seua línia:",
          "di‑…", "a‑…", "rei‑…", "en‑ra‑…", "me‑…", "hi‑…", "flu‑…", "guai‑…",
          "Comprova: llig la paraula sencera i veu si la separació té sentit.",
        ],
        s: [
          "Verd: dijous · adeu · reina. Blau: enraonar · medieval · hiena · fluor. Verd especial: guaita (triptong → fitxa daurada).",
        ],
        ad: "Només 8 paraules, meitat fetes, mur de colors a la paret (memòria espacial).",
      },
      {
        in: "4 fitxes grans: *dijous · hiena · guaita · aire*.",
        p: [
          "**a)** Copia la fitxa calcant el punt que marca on es parteix.",
          "**b)** Pica les síl·labes amb el dit mentre les lliges.",
        ],
        s: ["di-jous (diftong) · hi-e-na (hiat) · guai-ta (triptong) · ai-re (diftong)."],
        ad: "4 paraules amb el punt de tall ja marcat; contrast diftong/hiat/triptong en eixida.",
      },
      {
        in: "2 fitxes: *dijous* i *hiena*, grans, amb les vocals acolorides.",
        p: [
          "**a)** Imita la lectura: *dijous* tot d'una peça; *hiena* parant a *hi / e / na*.",
          "**b)** Ensenya targeta VERDA (junts, diftong) o ROJA (separats, hiat).",
        ],
        s: ["dijous → VERDA · hiena → ROJA."],
        ad: "2 paraules, per canal ORAL (oïda del ritme) i targeta de color.",
      },
    ],
  },
  {
    t: "Triptong: sí o no?",
    d: "Activitat 2 del llibre: quines paraules contenen un triptong? Les sis paraules en fitxa, una per línia, amb casella SÍ/NO.",
    ic: "etiqueta",
    nv: [
      {
        in: "6 paraules del llibre, cadascuna dins de fitxa amb dos casellers (SÍ / NO) al costat.",
        p: [
          "**Model:** *guaita → guai‑ta → u-a-i en un colp, la del mig és a → **SÍ***.",
          "**a)** Separa les síl·labes.",
          "**b)** Marca SÍ o NO. Recorda: triptong = 3 vocals juntes i la del MIG no pot ser i ni u.",
          "1 · guaita", "2 · bioenergia", "3 · uruguaià", "4 · gaiato", "5 · estigueig", "6 · esquaix",
        ],
        s: [
          "SÍ: guaita (guai-ta) · uruguaià (u-ru-guai-à) · estigueig (es-ti-gueig) · esquaix (es-quai-x).",
          "NO: bioenergia (bi-o-e-ner-gi-a: van separades → hiat) · gaiato (gai-a-to: només 2 vocals juntes, la 3a va en una altra síl·laba).",
        ],
      },
      {
        in: "Les 6 paraules amb la separació començada (primera síl·laba feta).",
        p: [
          "**Model:** *guai‑… → SÍ* (u-a-i, mig = a).",
          "Completa i marca:",
          "guai…", "bio…energia", "uru…", "gai…", "estigue…", "esqua…",
        ],
        s: ["SÍ: guaita · uruguaià · estigueig · esquaix. NO: bioenergia · gaiato."],
        ad: "El triptong es veu 'a mig fer' perquè el reconeixement siga visual.",
      },
      {
        in: "4 fitxes amb 3 cercles de vocals. Pinta el cercle del MIG.",
        p: [
          "**Model (guaita):** cercles u‑a‑i → mig = a (no és i ni u) → SÍ.",
          "Pinta el cercle del MIG i marca SÍ/NO:",
          "· guaita", "· estigueig", "· bioenergia", "· gaiato",
        ],
        s: ["SÍ: guaita · estigueig. NO: bioenergia · gaiato."],
        ad: "4 paraules amb el gest de pinte com a criteri automàtic.",
      },
      {
        in: "2 fitxes: *guaita* i *bioenergia*.",
        p: [
          "**a)** Llig-les picant síl·labes.",
          "**b)** Si sents 3 vocals en un colp, fitxa VERDA; si no, ROJA.",
        ],
        s: ["guaita → VERDA · bioenergia → ROJA."],
        ad: "1 contrast oral ben marcat, targeta de color, sense escriptura.",
      },
    ],
  },
  {
    t: "Caçadors de dígrafs",
    d: "Activitat 3 del llibre: les paraules porten dígrafs. Troba'ls i separa en síl·labes. Aquí, en columna d'una en una.",
    ic: "lupa",
    nv: [
      {
        in: "Les 24 paraules del llibre, en llista vertical numerada.",
        p: [
          "**Model:** *formatge* → **tg** fa un so → for‑mat‑ge.",
          "**a)** Subratlla el dígraf.",
          "**b)** Separa amb guionets.",
          "1 · seguiment", "2 · horitzó", "3 · formatge", "4 · ferrer", "5 · arquitecta", "6 · safareig",
          "7 · empitjorar", "8 · espardenya", "9 · conillera", "10 · caputxa", "11 · coixa", "12 · massapà",
          "13 · ballester", "14 · el·lipse", "15 · sobrassada", "16 · civilitzar", "17 · falguera", "18 · ratlla",
          "19 · eixugar", "20 · pistatxo", "21 · carretó", "22 · afanyar", "23 · al·lèrgia", "24 · enutjós",
        ],
        s: [
          "1 se‑gui‑ment (gu) · 2 ho‑ri‑tzó (tz) · 3 for‑mat‑ge (tg) · 4 fer‑rer (rr) · 5 ar‑qui‑tec‑ta (qu) · 6 sa‑fa‑reig (ig) · 7 em‑pi‑tjo‑rar (tj) · 8 es‑par‑de‑nya (ny) · 9 co‑ni‑lle‑ra (ll) · 10 ca‑put‑xa (tx) · 11 coi‑xa (ix) · 12 mas‑sa‑pà (ss) · 13 bal·les‑ter (ll) · 14 e‑l·lip‑se (l·l) · 15 so‑bra‑ssa‑da (ss) · 16 ci‑vi‑li‑tzar (tz) · 17 fal‑gue‑ra (gu) · 18 rat‑lla (ll) · 19 ei‑xu‑gar (ix) · 20 pis‑tat‑xo (tx) · 21 ca‑rre‑tó (rr) · 22 a‑fa‑nyar (ny) · 23 al·lér‑gi‑a (l·l) · 24 e‑nu‑tjós (tj).",
          "Truc: si dubtes, pregunta't si les dos lletres fan UN so (ferro) o dos (aigua).",
        ],
      },
      {
        in: "6 paraules amb el dígraf ja en negreta.",
        p: [
          "**Model:** for**tg**e → for‑mat‑ge.",
          "**a)** Separa en síl·labes.",
          "**b)** Còpia el dígraf a la fitxa.",
          "hor**tz**ó", "for**tg**e", "capu**tx**a", "ma**ss**apà", "esparden**ny**a", "fer**rr**e",
        ],
        s: ["horitzó (tz) · formatge (tg) · caputxa (tx) · massapà (ss) · espardenya (ny) · ferrer (rr)."],
        ad: "El dígraf ja assenyalat: es redueix la cerca i es manté l'operació.",
      },
      {
        in: "3 fitxes per a 3 cartells de paret.",
        p: [
          "Porta cada fitxa al cartell del dígraf: **ny** · **tx** · **ss**.",
          "Fitxes per a penjar:", "· espardenya", "· caputxa", "· massapà",
        ],
        s: ["espardenya → ny · caputxa → tx · massapà → ss."],
        ad: "3 paraules en emparejament amb moviment (cartells a la paret).",
      },
      {
        in: "2 fitxes grans amb el dígraf encerclat.",
        p: [
          "**a)** Copia calcant el cercle.",
          "**b)** Digues el SO que fan les dos lletres juntes (en fan un sols).",
        ],
        s: ["caputxa (tx) · massapà (ss)."],
        ad: "2 paraules, còpia i canal oral.",
      },
    ],
  },
  {
    t: "Mots encreuats",
    d: "Activitat 4 del llibre: un crucigrama on cada casella és UNA SÍL·LABA. Les pistes, llistades d'una en una (més llegible que al voltant de la graella).",
    ic: "puzzle",
    nv: [
      {
        in: "Pistes en llista vertical. Graella del llibre: 1 síl·laba per casella.",
        p: [
          "**Com fer-lo:** llig la pista → pensa la paraula → sepàra‑la → una síl·laba per casella.",
          "**Horitzontals**",
          "1 · Dona que dirigix una abadia.",
          "2 · Substància enganxada als ulls en despertar (plural).",
          "3 · Embotit de color negre (plural).",
          "4 · Cursa de cotxes per pistes de muntanya.",
          "**Verticals**",
          "5 · Vehicle estirat per un animal: carro, carrossa.",
          "6 · Traure del bollic.",
          "7 · Lent que sosté nas i orelles per a veure millor (plural).",
          "8 · Cop donat amb un punyal.",
        ],
        s: [
          "**1** a‑ba‑des‑sa · **2** lle‑ga‑nyes · **3** bo‑ti‑fa‑rres (ne‑gres? — compte les caselles) · **4** ral·li.",
          "**5** ca‑rre‑ta (o ca‑le‑sa: quadra amb les caselles) · **6** pel‑lar (pell → *pellem*? quadra amb 5 vertical: **p‑e‑l‑a‑r**) · **7** u‑lle‑res · **8** pu‑nya‑la‑da.",
          "**Nota docent:** 3, 5 i 6 depenen del nombre exacte de caselles de la graella impresa; valida'ls abans. Les clares: 1 abadessa, 2 lleganyes, 4 ral·li, 7 ulleres, 8 punyalada.",
        ],
      },
      {
        in: "4 pistes horitzontals amb la primera síl·laba ja escrita a la graella.",
        p: [
          "**Model:** 1 comença per *a‑* → a‑ba‑des‑sa.",
          "Les verticals van caient soles. Completa.",
        ],
        s: ["1 abadessa · 4 ral‑li · 7 u‑lle‑res · 8 pu‑nya‑la‑da."],
        ad: "4 pistes amb eixida regalada; les interseccions resolen la resta (deducció espacial guiada).",
      },
      {
        in: "2 pistes amb dibuix: 👓 u‑… i 🔪 pu‑…",
        p: [
          "Pica les síl·labes i completa: u‑… (3 síl·labes) · pu‑… (4 síl·labes).",
        ],
        s: ["u‑lle‑res · pu‑nya‑la‑da."],
        ad: "2 pistes amb pictograma i primera síl·laba.",
      },
      {
        in: "1 targeta gran: 👓 u | lle | res.",
        p: ["Copia les 3 síl·labes en la columna vertical."],
        s: ["ulleres."],
        ad: "1 resposta calcada de targeta.",
      },
    ],
  },
  {
    t: "A final de línia: on tallo?",
    d: "Activitat 5 del llibre: com partiriaquestes paraules a final de línia, de totes les maneres possibles. Les regles, primer, en targeta.",
    ic: "repaso",
    nv: [
      {
        in: "Les 4 regles del llibre en targeta + 12 paraules en llista vertical.",
        p: [
          "**Primer:** passa el dit per les 4 regles: mai vocal sola · mai diftong trencat · gu‑qu‑ll‑ny‑ix junts, la resta separables (el punt volat → guionet) · mots compostos intactes.",
          "Ara escriu les parts possibles:",
          "1 · Núria", "2 · qüestió", "3 · roure", "4 · pianista", "5 · dutxa", "6 · aixeta",
          "7 · vosaltres", "8 · màrbre", "9 · enquesta", "10 · aquella", "11 · castanyer", "12 · audició",
        ],
        s: [
          "1 Nú‑ri‑a (mai *Núri‑a*: vocal sola) · 2 qües‑ti‑ó · 3 rou‑re · 4 pia‑nis‑ta (mai *pi‑a‑nis‑ta*: diftong intacte) · 5 dut‑xa · 6 ai‑xe‑ta · 7 vos‑al‑tres · 8 màr‑bre · 9 en‑ques‑ta · 10 a‑que‑lla · 11 cas‑ta‑nyer · 12 au‑di‑ci‑ó.",
          "Auto‑comprova cada una amb la targeta de regles.",
        ],
      },
      {
        in: "6 paraules amb 2 recordatoris al capdamunt (dígrafs junts · mai vocal sola).",
        p: [
          "**Model:** *dutxa → dut‑xa*.",
          "Separa:",
          "· pianista", "· castanyer", "· enquesta", "· vosaltres", "· qüestió", "· audició",
        ],
        s: ["pia‑nis‑ta · cas‑ta‑nyer · en‑ques‑ta · vos‑al‑tres · qües‑ti‑ó · au‑di‑ci‑ó."],
        ad: "12→6 paraules, 2 regles en compte de 4, model al principi.",
      },
      {
        in: "4 fitxes amb el punt de tall marcat amb llapis.",
        p: [
          "Comprova amb el dit i copia:",
          "· dutxa", "· aixeta", "· Núria", "· roure",
        ],
        s: ["dut‑xa · ai‑xe‑ta · Nú‑ria · rou‑re."],
        ad: "La separació ja ve feta a la fitxa: verificar i copiar.",
      },
      {
        in: "2 fitxes: *dutxa* i *Núria* amb la línia de tall de color.",
        p: ["Copia les dues amb el seu guió."],
        s: ["dut‑xa · Nú‑ria."],
        ad: "2 paraules calcades.",
      },
    ],
  },
];
