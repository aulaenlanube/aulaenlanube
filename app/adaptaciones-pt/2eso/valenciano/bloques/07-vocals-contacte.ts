// Bloc 7 · Vocals en contacte i diftongs (llibre 2n ESO, U6, p. 74-75)
// Format «plantilla» decidit per a l'aula (29-09): act. 1 i 2 = paraula + caixa
// de resposta per fila; act. 3 = paraula + espai de síl·labes + 2 caixes per a
// mots propis; act. 4 = crucigrama DIBUIXAT amb les pistes il·lustrades.
// Classificació diftong/hiat segons les caixes de teòria del propi llibre.
// Cinc nivells: [0] 2n ESO base · [1] 1r ESO · [2] 6è · [3] 5è · [4] 4t.

import type { Ap, Act, Fila } from "../tipos";

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

// ---- Files en format plantilla (es renderitzen com a taula fila per fila) ----
const F = (ws: string[], sep: boolean, cx: number): Fila[] => ws.map((w) => ({ w, sep, cx }));

const ACT1_27 = F(["dijous", "enraonar", "adeu", "piragüista", "huit", "quota", "fluor", "iogurt",
  "medieval", "ianqui", "diumenge", "acció", "cel·luloide", "afluent", "hiena", "reina", "iuca",
  "actual", "aquarel·la", "barroer", "afaitar", "nuclear", "paraula", "aire", "diada", "terraqüi",
  "aigüera"], true, 1);
const ACT1_12 = F(["dijous", "adeu", "reina", "aire", "iogurt", "ianqui", "enraonar", "medieval",
  "hiena", "diada", "fluor", "barroer"], true, 0);
const ACT1_8 = F(["dijous", "adeu", "reina", "enraonar", "medieval", "hiena", "fluor", "guaita"], true, 1);

const ACT2_6 = F(["guaita", "bioenergia", "uruguaià", "gaiato", "estigueig", "esquaix"], false, 1);
const ACT2_6S = F(["guaita", "bioenergia", "uruguaià", "gaiato", "estigueig", "esquaix"], true, 1);
const ACT2_4 = F(["guaita", "estigueig", "bioenergia", "gaiato"], true, 1);

const ACT3_24 = F(["seguiment", "horitzó", "formatge", "ferrer", "arquitecta", "safareig",
  "empitjorar", "espardenya", "conillera", "caputxa", "coixa", "massapà", "ballester", "el·lipse",
  "sobrassada", "civilitzar", "falguera", "ratlla", "eixugar", "pistatxo", "carretó", "afanyar",
  "al·lèrgia", "enutjós"], true, 2);
const ACT3_6 = F(["horitzó", "formatge", "caputxa", "massapà", "espardenya", "ferrer"], true, 2);
const ACT3_3 = F(["espardenya", "caputxa", "massapà"], true, 1);

const ACT5_12 = F(["Núria", "qüestió", "roure", "pianista", "dutxa", "aixeta", "vosaltres", "màrbre",
  "enquesta", "aquella", "castanyer", "audició"], true, 0);
const ACT5_6 = F(["pianista", "castanyer", "enquesta", "vosaltres", "qüestió", "audició"], true, 0);

export const ACTS: Act[] = [
  {
    t: "Separa i classifica",
    d: "Activitat 1 del llibre, en format plantilla: cada paraula en la seua fila, espai per a separar en síl·labes i caixa per a escriure la classe (C · D · H).",
    ic: "puzzle",
    fig: "vocals-contacte",
    nv: [
      {
        in: "En cada fila: escriu la separació sil·làbica en el quadre de punts i, a la caixa de la dreta, la classe: **C** (diftong creixent) · **D** (diftong decreixent) · **H** (hiat). En *quota* i *aquarel·la* escriu **Q**.",
        p: ["**Model:** *dijous → di-jous → C* (ou = forta + feble).",
            "**Abans de començar:** repassa l'esquema de dalt i les llistes de la teòria."],
        files: ACT1_27,
        s: [
          "**C:** 1 di-jous (ou) · 3 a-deu (eu) · 4 pi-ra-güis-ta (üi) · 5 huit (ui) · 11 diu-men-ge (iu) · 13 cel·lu-loi-de (oi) · 16 rei-na (ei) · 17 iu-ca (iu) · 21 a-fai-tar (ai) · 23 pa-rau-la (au) · 24 ai-re (ai) · 27 ai-güe-ra (ai).",
          "**D:** 8 io-gurt (io) · 10 ian-qui (ia) · 26 ter-ra-qüi (qüi).",
          "**Q (dígraf qu):** 6 quo-ta · 19 a-qua-rel·la → ací la *u* SÍ es pronuncia: no hi ha diftong.",
          "**H:** 2 en-ra-o-nar (①) · 7 flu-or (②) · 9 me-di-e-val (②) · 12 ac-ci-ó (②) · 14 a-flu-ent (②) · 15 hi-e-na (②) · 18 ac-tu-al (②) · 20 bar-ro-er (①) · 22 nu-cle-ar (①) · 25 di-a-da (②).",
          "Criteri: primer separar bé, després classificar. Dubte → torna a l'esquema de la teòria.",
        ],
      },
      {
        in: "12 paraules amb la classe ja donada pel COLOR de la fila: 🟦 diftong creixent · 🟨 decreixent · 🟥 hiat. Tu només escrius la separació en el quadre.",
        p: ["**Model:** *adeu → a-deu* (fila 🟦)."],
        files: ACT1_12,
        s: ["🟦: di-jous · a-deu · rei-na · ai-re. 🟨: io-gurt · ian-qui. 🟥: en-ra-o-nar · me-di-e-val · hi-e-na · di-a-da · flu-or · bar-ro-er."],
        ad: "De 27 a 12; la classe ve donada pel color (s'estalvia la decisió, es guarda l'execució). Sense caixa: una sola tasca per fila.",
      },
      {
        in: "8 paraules: separa en el quadre i escriu la classe a la caixa. Després comprova amb el mur de colors de la classe (verd = diftong, blau = hiat).",
        p: ["**Mur:** verd = diftong · blau = hiat · daurat = triptong."],
        files: ACT1_8,
        s: ["di-jous C · a-deu C · rei-na C · en-ra-o-nar H · me-di-e-val H · hi-e-na H · flu-or H · guai-ta → TRIPTONG (fitxa daurada)."],
        ad: "Només 8 paraules; la classe es valida en grup contra el mur (correcció externa, no de memòria).",
      },
      {
        in: "4 fitxes grans: *dijous · hiena · guaita · aire*, amb el punt de tall ja marcat.",
        p: ["**a)** Copia la fitxa calcant el punt que marca on es parteix.",
            "**b)** Pica les síl·labes amb el dit mentre les lliges."],
        s: ["di-jous (diftong) · hi-e-na (hiat) · guai-ta (triptong) · ai-re (diftong)."],
        ad: "4 paraules amb el punt de tall ja marcat; contrast diftong/hiat/triptong en eixida.",
      },
      {
        in: "2 fitxes: *dijous* i *hiena*, grans, amb les vocals acolorides.",
        p: ["**a)** Imita la lectura: *dijous* tot d'una peça; *hiena* parant a *hi / e / na*.",
            "**b)** Ensenya targeta VERDA (junts, diftong) o ROJA (separats, hiat)."],
        s: ["dijous → VERDA · hiena → ROJA."],
        ad: "2 paraules, per canal ORAL (oïda del ritme) i targeta de color.",
      },
    ],
  },
  {
    t: "Triptong: sí o no?",
    d: "Activitat 2 del llibre: cada paraula en la seua fila, amb la seua caixa SÍ / NO al costat.",
    ic: "etiqueta",
    nv: [
      {
        in: "Llig cada paraula, sepàra-la mentalment i escriu **SÍ** o **NO** en la caixa. Recorda: triptong = **3 vocals juntes** i la del **MIG** no pot ser *i* ni *u*.",
        p: ["**Model:** *guaita → guai-ta → u-a-i en un colp, la del mig és a → SÍ*."],
        files: ACT2_6,
        s: [
          "SÍ: guaita (guai-ta) · uruguaià (u-ru-guai-à) · estigueig (es-ti-gueig) · esquaix (es-quai-x).",
          "NO: bioenergia (bi-o-e-ner-gi-a: van separades → hiat) · gaiato (gai-a-to: només 2 vocals juntes a la mateixa síl·laba).",
        ],
      },
      {
        in: "Les mateixes 6 paraules, amb el quadre de síl·labes: escriu-les separades ANTES de decidir.",
        p: ["**Model:** *guai‑… → el mig és a → SÍ*. Si no veus 3 vocals juntes, escriu NO."],
        files: ACT2_6S,
        s: ["SÍ: guaita · uruguaià · estigueig · esquaix. NO: bioenergia · gaiato."],
        ad: "El quadre converteix la decisió en visual: el triptong es veu abans de marcar la caixa.",
      },
      {
        in: "4 paraules, cadascuna amb 3 cercles de vocals. Pinta el cercle del MIG i després escriu SÍ / NO.",
        p: ["**Model (guaita):** cercles u‑a‑i → mig = a (no és i ni u) → SÍ."],
        files: ACT2_4,
        s: ["SÍ: guaita · estigueig. NO: bioenergia · gaiato."],
        ad: "4 paraules; el gest de pintar el mig automàtiza el criteri.",
      },
      {
        in: "2 fitxes: *guaita* i *bioenergia*.",
        p: ["**a)** Llig-les picant síl·labes.",
            "**b)** Si sents 3 vocals en un colp, fitxa VERDA; si no, ROJA."],
        s: ["guaita → VERDA · bioenergia → ROJA."],
        ad: "1 contrast oral ben marcat, targeta de color, sense escriptura.",
      },
    ],
  },
  {
    t: "Caçadors de dígrafs",
    d: "Activitat 3 del llibre, en format plantilla: paraula + espai per a separar + DUES caixes on escrius TU dos mots més amb el mateix dígraf.",
    ic: "lupa",
    nv: [
      {
        in: "Per a cada fila: **(1)** troba el dígraf i subratlla'l, **(2)** separa la paraula en el quadre de punts, **(3)** escriu **dos mots teus** amb eixe mateix dígraf en les dues caixes.",
        p: ["**Model:** *formatge* → dígraf **tg** → *for‑mat‑ge* → caixes: *metge* i un altre que trobes tu.",
            "**Truc:** un dígraf fan les lletres que pronuncies com UN so sol (*ferro* ✓) o DOS so separats (*aigua* ✗)."],
        files: ACT3_24,
        s: [
          "**Dígrafs:** 1 se‑gui‑ment (gu) · 2 ho‑ri‑tzó (tz) · 3 for‑mat‑ge (tg) · 4 fer‑rer (rr) · 5 ar‑qui‑tec‑ta (qu) · 6 sa‑fa‑reig (ig) · 7 em‑pi‑tjo‑rar (tj) · 8 es‑par‑de‑nya (ny) · 9 co‑ni‑lle‑ra (ll) · 10 ca‑put‑xa (tx) · 11 coi‑xa (ix) · 12 mas‑sa‑pà (ss) · 13 bal·les‑ter (ll) · 14 e‑l·lip‑se (l·l) · 15 so‑bra‑ssa‑da (ss) · 16 ci‑vi‑li‑tzar (tz) · 17 fal‑gue‑ra (gu) · 18 rat‑lla (ll) · 19 ei‑xu‑gar (ix) · 20 pis‑tat‑xo (tx) · 21 ca‑rre‑tó (rr) · 22 a‑fa‑nyar (ny) · 23 al·lér‑gi‑a (l·l) · 24 e‑nu‑tjós (tj).",
          "**Exemples vàlids per a les caixes:** gu → guerra, guant · tz → dotze, cervatzer · tg → metge · rr → carro, terra · qu → quadre, quiet · ig → faig, manigu · tj → jutjat, enutjar · ny → bunyol, Catalunya · ll → collita, pilota · tx → dutxa, botiga?✗ (tx: matxo✓) · ix → caixa, feixa · ss → travessar, massa · l·l → col·legi, paral·lel.",
          "La segona caixa de cada fila la valida el grup: si les dos lletres fan UN so, val.",
        ],
      },
      {
        in: "6 paraules amb el dígraf JA en negreta. Separa en el quadre i escriu dos mots teus amb eixe dígraf.",
        p: ["**Model:** for**tg**e → for‑mat‑ge → caixes: *metge* + un altre teu."],
        files: ACT3_6,
        s: ["horitzó (tz) · formatge (tg) · caputxa (tx) · massapà (ss) · espardenya (ny) · ferrer (rr)."],
        ad: "El dígraf ja assenyalat: es redueix la cerca; el quadre i les 2 caixes mantenen l'execució.",
      },
      {
        in: "3 paraules: separa en el quadre i escriu a la caixa QUIN dígraf porten. Després porta la fitxa al cartell del mur (ny · tx · ss).",
        p: ["Mur de la classe amb tres cartells: **ny** · **tx** · **ss**."],
        files: ACT3_3,
        s: ["espardenya → ny · caputxa → tx · massapà → ss."],
        ad: "3 paraules; una sola caixa (identificar, no produir) + correcció kinestèsica al mur.",
      },
      {
        in: "2 fitxes grans amb el dígraf encerclat.",
        p: ["**a)** Copia calcant el cercle.",
            "**b)** Digues el SO que fan les dos lletres juntes (en fan un sols)."],
        s: ["caputxa (tx) · massapà (ss)."],
        ad: "2 paraules, còpia i canal oral.",
      },
    ],
  },
  {
    t: "Mots encreuats",
    d: "Activitat 4 del llibre: el crucigrama sil·làbic ACÍ dibuixat pas a pas, amb les pistes il·lustrades al costat. Cada casella = UNA síl·laba.",
    ic: "puzzle",
    fig: "crucigrama-vocals",
    nv: [
      {
        in: "Llig la pista → pensa la paraula → sepàra‑la → una síl·laba per casella. On dues paraules es toquen, la mateixa síl·laba val per a les dos. Comença per les pistes amb dibuix (7 👓 i 8 🔪): són les més fàcils.",
        p: [
          "**Horitzontals**",
          "1 ⛪ Dona que dirigix una abadia.",
          "2 😪 Substància que s'enganxa als ulls en despertar (plural).",
          "3 🥩 Embotit de color negre (plural).",
          "4 🏁 Cursa de cotxes per pistes de muntanya.",
          "**Verticals**",
          "5 🐴 Vehicle estirat per un animal: carro, carrossa.",
          "6 🧶 Traure allò que està embolicat.",
          "7 👓 Lent que sosté nas i orelles per a veure millor (plural).",
          "8 🔪 Cop donat amb un punyal.",
        ],
        s: [
          "**1** a‑ba‑des‑sa (4) · **2** lle‑gan‑yes (3) · **3** bo‑ti‑far‑res (4) · **4** ral·‑li (2) · **5** car‑re‑ta (3) · **6** des‑em‑bo‑li‑car (5) · **7** u‑lle‑res (3) · **8** pu‑nya‑la‑da (4).",
          "**Interseccions que quadren:** *des* (1↔6) · *bo* (3↔6) · *li* (4↔6) · *lle* (2↔7) · *res* (3↔7).",
          "**Nota docent:** graella redibuixada per a pantalla (al llibre, les pistes 5 i 6 anaven en un altre costat); el contingut i les síl·labes són els del llibre. La 6 («traure del embolic») admet *des‑em‑bo‑li‑car* — valida-la comptant les seues 5 caselles.",
        ],
      },
      {
        in: "4 pistes (1, 4, 7, 8) amb la PRIMERA síl·laba ja escrita en llapis a la graella. Completa; les altres cauen soles.",
        p: ["**Model:** 1 comença per *a‑* → abadessa → a · ba · des · sa."],
        s: ["1 a‑ba‑des‑sa · 4 ral·‑li · 7 u‑lle‑res · 8 pu‑nya‑la‑da. Cauen: 2 lleganyes · 3 botifarres · 5 carreta · 6 desembolicar."],
        ad: "Eixida regalada en 4 pistes; les interseccions guien la deducció espacial.",
      },
      {
        in: "2 pistes amb dibuix gran: 👓 i 🔪. La graella té la primera síl·laba escrita.",
        p: ["Pica les síl·labes en veu alta mentre les escrius: u‑… (3 caselles) · pu‑… (4 caselles)."],
        s: ["u‑lle‑res · pu‑nya‑la‑da."],
        ad: "2 pistes amb pictograma i primera síl·laba regalada.",
      },
      {
        in: "1 targeta gran: 👓 u | lle | res.",
        p: ["Copia les 3 síl·labes en la columna vertical de 3 caselles."],
        s: ["ulleres."],
        ad: "1 resposta calcada de la targeta: sense descodificar pistes.",
      },
    ],
  },
  {
    t: "A final de línia: on tallo?",
    d: "Activitat 5 del llibre: com partiries aquestes paraules a final de línia, de totes les maneres possibles. Fitxes en el quadre de cada fila.",
    ic: "repaso",
    nv: [
      {
        in: "Primer passa el dit per les 4 regles de la teòria: mai vocal sola · mai diftong trencat · *gu‑qu‑ll‑ny‑ix* junts (punt volat → guionet) · mots compostos intactes. Després escriu cada separació possible en el quadre de la fila.",
        p: ["**Model:** *dutxa → dut‑xa* (dígraf tx intacte).", "**Nota:** algunes paraules admeten DOS llocs de tall — escriu-les totes."],
        files: ACT5_12,
        s: [
          "1 Nú‑ri‑a (mai *Nú‑ri‑a…*: la *i* no pot eixir sola → Nú‑ri‑a ✓) · 2 qües‑ti‑ó · 3 rou‑re · 4 pia‑nis‑ta (mai *pi‑a‑nis‑ta*: diftong intacte) · 5 dut‑xa · 6 ai‑xe‑ta · 7 vos‑al‑tres · 8 màr‑bre · 9 en‑ques‑ta · 10 a‑que‑lla · 11 cas‑ta‑nyer · 12 au‑di‑ci‑ó.",
          "Auto‑comprova cada una amb la targeta de regles.",
        ],
      },
      {
        in: "6 paraules amb 2 recordatoris al capdamunt: dígrafs junts · mai vocal sola.",
        p: ["**Model:** *dutxa → dut‑xa*."],
        files: ACT5_6,
        s: ["pia‑nis‑ta · cas‑ta‑nyer · en‑ques‑ta · vos‑al‑tres · qües‑ti‑ó · au‑di‑ci‑ó."],
        ad: "12→6 paraules, 2 regles en compte de 4, model al principi.",
      },
      {
        in: "4 fitxes amb el punt de tall marcat amb llapis: verifica amb el dit i copia.",
        p: ["· dutxa", "· aixeta", "· Núria", "· roure"],
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
