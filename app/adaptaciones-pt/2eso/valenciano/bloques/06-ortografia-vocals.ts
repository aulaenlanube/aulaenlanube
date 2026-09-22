// Bloc 6 · Ortografia de les vocals · Tema 1 de Valencià · Adaptacions PT · 2n ESO
// Cinco niveles por actividad: [0] 2n ESO, [1] 1r ESO, [2] 6è, [3] 5è, [4] 4t.

import type { Ap, Act } from "../tipos";

export const AP: Ap = {
  slug: "06-ortografia-vocals",
  n: 6,
  t: "L'ortografia de les vocals",
  teoria: [
    "En valencià el sistema vocàlic tònic té **set sons** representats per **cinc grafies** (a, e, i, o, u). Per què? Perquè en **posició tònica** les vocals **e, o** poden pronunciar-se **obertes** (*obert, mel, soc, cor*) o **tancades** (*paper, gens, remor, gos*), i en **posició àtona** sempre es pronuncien tancades. Quan cal posar-los accent, porten accent **obert (à, è, ò)** o **tancat (é, í, ó, ú)** segons com es pronuncien.",
    "Fig:vocals",
    "**Divergències vocàliques**: moltes paraules semblants al castellà divergixen en l'escriptura d'alguna vocal. Amb **a**: *afaitar, ambaixada, assassí, avaluar*. Amb **e**: *assemblea, emparar, enyorar, espàrrec*. Amb **i**: *diabetis, línia, nucli*. Amb **o**: *botifarra, brúixola, capítol, cartolina*. Amb **u**: *bufetada, muntanya, suborn, cacau*. No és captrucu: cada llengua té la seua vocal, i eixes diferències s'aprenen llegint.",
    "**Confusions vocàliques**: una pronúncia poc acurada conduïx a escriptures incorrectes del tot: *\\*Jusep, \\*artista, \\*pacència*, en compte de *Josep, artista, paciència*. I **mai** no s'escriu la [a] que sona en paraules que comencen per *em-, en-, es-, eix-*: *esperar* es diu [asperar], però s'escriu **esperar**; *encendre*, no *\\*ancendre*.",
    "El truc del diccionari interior: quan dubtes entre dues vocals, pensa en una **paraula de la mateixa família** que la traga. *Condició* → *condicionari*? no: però *nubes → nuvolat* et diu la u; *creuar → creu* et diu la u; *pobre → pobresa* et manté la o. Quan la família no t'ajuda, eixa vocal s'apren com un nom propi.",
    "RAW:<table><caption>Les cinc regles d'or del bloc</caption><thead><tr><th>Regla</th><th>Exemple</th><th>Mai mai</th></tr></thead><tbody><tr><td>e/o tòniques poden ser obertes o tancades</td><td>mel / paper</td><td>confondre la grafia amb el so</td></tr><tr><td>Les àtones sempre tancades</td><td>cabina, cotxer</td><td>accentuar àtones</td></tr><tr><td>Divergències amb el castellà</td><td>muntanya, capítol</td><td>calcar la vocal del castellà</td></tr><tr><td>No escriure la [a] prostètica</td><td>esperar, encendre</td><td>*aspetar, *ancendre</td></tr><tr><td>Accent obert o tancat segons so</td><td>caixó (ò oberta?) — soc, pèl</td><td>posar accent «perquè sí»</td></tr></tbody></table>",
  ],
  ej: [
    "*soc* (ò oberta com en *sol*) i *gos* (ò tancada com en *dolç*): mateixa grafia o, distint so.",
    "*muntanya* i *cacau*, amb u, no *\\*montanya* ni *\\*cacao*: divergixen del castellà.",
    "*Espera!* s'escriu amb e, tot i que sona [aspera]: la [a] del principi mai no s'escriu.",
  ],
};

export const ACTS: Act[] = [
  {
    t: "Oerta o tancada?",
    d: "Escoltes paraules i les classifiques pel so de la vocal tònica (llibre, act. 1).",
    ic: "oreja",
    fig: "vocals",
    nv: [
      {
        in: "Llista de 24 paraules amb la tònica subratllada: *mos, expert, diners, xafogor, plor, pitjor / incerta, enginyer, bord, plec, geni, xiprer / llosa, infern, somni, arrel, viver, tendre / trespol, batec, gent, verd, ona, confort*.",
        p: [
          "**a)** Escolta-les (o consulta la locució) i clasifica-les en una graella de quatre caselles: **e oberta** (com *mel*), **e tancada** (com *gens*), **o oberta** (com *sort*), **o tancada** (com *gos*).",
          "**b)** De les que són **o oberta**, copia'n tres i posa'ls l'accent obert si el porten.",
          "**c)** *mos, plor, bord*… soonen igual que en castellà? Explica en dues frases per què les vocals obertes sense accent (monosíl·labs) no porten accent.",
          "**d)** Tria 6 paraules de la llista i escriu-ne una oració amb cada una; revisa la vocal tònica abans de entregar.",
        ],
        s: [
          "**a)** e oberta (è): *incerta, llosa? — no, llosa és o*, correcció: e oberta → *expert, incerta, plec, arrel? (arrel és e oberta: arrel [arrèl]), batec, verd, tendre…; e tancada (é): enginyer, geni, viver, gent…; o oberta (ò): mos, plor, bord, trespol, ona…; o tancada (ó): xafogor, pitjor, infern, somni, confort, llosa.* Es valora el criteri: la grafia és sempre e/o, el que canvia és el **so**.",
          "**b)** Exemples: *mos, plor, bord, soc, tot, camí no* — els monosíl·labs d'o oberta no porten accent; només quan cal (els homòfons: *sò/so*…). Resposta esperada: «els monosíl·labs no porten accent llevat de les distintives». Es pot acceptar sense accent.",
          "**c)** Perquè l'ortografia valenciana no marca la vocal oberta/tancada si no cal: el monosíl·lab ja porta tot el so i l'accent només s'usa per a distingir homòfons (*és/ets…*). La obertura és de **pronúncia**, no de grafia.",
          "**d)** Resposta oberta; es valora la coherència so-grafia.",
        ],
      },
      {
        in: "Deu paraules: *mos, expert, xafogor, plor, bord, plec, somni, tendre, batec, confort*.",
        p: [
          "**a)** Separa-les en dues columnes: les que sonen **ò oberta** i les que sonen **ó tancada**.",
          "**b)** Rodreja: «expert» porta e oberta o tancada? *oberta* / *tancada*.",
        ],
        s: [
          "**a)** Ò oberta: mos, plor, bord, plec? (plec és e)… Resposta correcta: **ò oberta** → *mos, plor, bord*; **ó tancada** → *xafogor, somni, batec? (batec és e)*… Columna e: oberta *expert, plec, tendre, batec*; tancada… En esta versió xicoteta: e oberta → expert, plec, tendre, batec; o oberta → mos, plor, bord; o tancada → xafogor, somni, confort.",
          "**b)** Oberta: *expert* sona com *mel*.",
        ],
        ad: "De 24 paraules a 10; la graella passa a dues columnes i una pregunta tancada.",
      },
      {
        in: "Sis fitxes: *mos, plec, somni, bord, batec, xafogor*. Caixes: O com en SOL · O com en DOLÇ · E com en MEL · E com en GENS.",
        p: [
          "**a)** Fes quatre muntets amb les fitxes.",
          "**b)** Digues en veu alta una paraula que soni com «mos».",
        ],
        s: [
          "**a)** O oberta: mos, bord. O tancada: somni, xafogor. E oberta: plec, batec.",
          "**b)** Per exemple: *sol, foc, rock*.",
        ],
        ad: "Es parteix del so de model (mel/gens/sol/dolç) i es manipulen fitxes; l'explicació és oral.",
      },
      {
        in: "El mestre diu les paraules i mostra el model escrit: mel (è), gens (é), sort (ò), gos (ó).",
        p: [
          "**a)** Si la paraula que sent es pareix al model de mel, ensenya la targeta VERDA; si se pareix a gens, la ROJA.",
          "**b)** Repetix la paraula imitant el so obert o tancat.",
        ],
        s: [
          "**a)** Verda (e oberta): *mel, soc*… Roja: *gens, paper*.",
          "**b)** Imitació oral.",
        ],
        ad: "Només dues targetes de colors i imitació oral.",
      },
      {
        in: "Dues targetes grans: boca OBERTA (○) i boca CHICOTETA (·).",
        p: [
          "**a)** Fes el gest d'obrir la boca gran quan sentes *mel* i xicotet quan sentes *gens*.",
          "**b)** Fes el gest gran quan sentes *sol*.",
        ],
        s: ["**a)** mel → oberta; gens → xicoteta.", "**b)** sol → oberta."],
        ad: "Tot corporal: la boca com a model del so.",
      },
    ],
  },
  {
    t: "Ací no hi va cap vocal",
    d: "Corregix confusions: \\*Jusep, \\*artista i la [a] que no s'escriu.",
    ic: "verdad",
    nv: [
      {
        in: "Oracions amb errades: 1) «Jusep va pintar un quadro de Monet.» 2) «L'artista ens va fer una demostració.» 3) «Espera, que anem a encendre la llum.» 4) «Ahir em vaig aixecar tard i vaig eixir corrent.» 5) «El pacient del metge estava impacient.»",
        p: [
          "**a)** Identifica les grafies vocals incorrectes i corregeix-les, o confirma que no n'hi ha.",
          "**b)** Explica per què *esperar* comença per e i no per a, si així ho sent l'orella.",
          "**c)** Classifica les cinc oracions: divergència vocàlica / confusió vocàlica / correcta.",
          "**d)** Escriu tres paraules més que comencen per *em-, en-, es-* i posa'les en una oració.",
        ],
        s: [
          "**a)** Només la 1 porta faltes: «**Jusep** va pintar un **quadro** de Monet» → *Josep* i *quadre*. Les altres quatre són trampa i estan ben escrites: *artista* (no «\\*artista»), *esperar/encendre* (e-, no a-), *aixecar/eixir* i *pacient/impacient* (‑ient). Repassa: quan dubtes, paraula de la mateixa família o diccionari.",
          "**b)** Perquè la [a] que sent l'orella és una vocal prostètica, un so afegit a la parla coloquial que l'ortografia **no** recull mai: l'etimologia llatina (*spectare → esperar*) i la norma diuen e.",
          "**c)** Divergència vocàlica: cap; confusió: *Jusep* i *quadro* (frase 1, pronúncia descuidada); correctes: 2, 3, 4 i 5.",
          "**d)** Per exemple: *embull, eixamplar, emmetxar*: «Vam **eixamplar** el camí i va caldre **emmetxar** el mur sense fer cap **embull**.»",
        ],
      },
      {
        in: "Oracions: 1) «Jusep va arribar tard.» 2) «Espera'm, que vaig al metge.» 3) «L'artista va cantar bé.»",
        p: [
          "**a)** Rodreja la paraula mal escrita, si n'hi ha, i escriu-la ben.",
          "**b)** Digues per què «espera» no comença per a.",
        ],
        s: [
          "**a)** «Jusep → Josep». Les altres són correctes.",
          "**b)** Perquè la [a] només es diu; escriure-la és falta.",
        ],
        ad: "Una sola falta real i una pregunta oral; les frases trampa es mantenen.",
      },
      {
        in: "Parells: JOSEP–Jusep · ESPERAR–aspetar · ARTISTA–artista.",
        p: [
          "**a)** Posa en la caixa OK la forma correcta; en la caixa NO, la que no.",
          "**b)** Digues en veu alta el nom del company Josep.",
        ],
        s: [
          "**a)** OK: Josep, esperar, artista. NO: Jusep, aspetar.",
          "**b)** «Josep».",
        ],
        ad: "Classificar parells ja formats; resposta oral final.",
      },
      {
        in: "Targeta VERDA = ben escrit; targeta ROJA = cal corregir. El mestre llig: «esperar».",
        p: [
          "**a)** Ensenya la targeta.",
          "**b)** Repetix la paraula ben dita.",
        ],
        s: ["**a)** VERDA.", "**b)** «esperar»."],
        ad: "Targetes i repetició oral.",
      },
      {
        in: "Fitxa gran: ESPERA, amb la primera lletra en color gris molt tenç.",
        p: [
          "**a)** Assenya la lletra gris: s'escriu o no s'escriu?",
          "**b)** Repetix «espera» sense la lletra gris.",
        ],
        s: ["**a)** No s'escriu.", "**b)** «espera»."],
        ad: "Suport visual (lletra tenç) i oralitat.",
      },
    ],
  },
  {
    t: "La vocal divergent",
    d: "Detectes paraules que en valencià tenen una vocal distinta del castellà (llibre, act. 5).",
    ic: "lupa",
    nv: [
      {
        in: "Oracions: 1) «Va quedar atordit a conseqüència del colp que va rebre.» 2) «Per a mi sempre és un turment fer les maletes.» 3) «La infermera va tallar l'hemorràgia amb moltes dificultats.» 4) «Aquesta ploma no és de colom, sinó de tórtora.»",
        p: [
          "**a)** Rodreja les paraules amb **divergència vocàlica** respecte del castellà i escriu-les ben.",
          "**b)** Escriu la **família lèxica** de les paraules que has trobat.",
          "**c)** De *colom / tórtora*, tria la parella correcta de la divergència: on creus que el castellà i el valencià canvien la vocal?",
          "**d)** Crea la teua oració amb *muntanya* i *boira*, vigilant les vocals.",
        ],
        s: [
          "**a)** *atordit* (es. aturdido), *conseqüència* (consecuencia), *colp* (golpe), *turment* (tortura/tormento), *maletes* (maletas — mateixa, no divergix), *hemorràgia* (hemorragia), *colom* (paloma), *tórtora* (tórtola). Les divergents: atordit, conseqüència, colp, turment, hemorràgia, colom, tórtora.",
          "**b)** atordir/atordiment · conseqüent/consegüent... norma: *conseqüent* · colpejar/colpu? → *colp, colpejar* · turmentar · hemorràgic · colomar? *colom, colomina, colomar* · tórtora, tortoreta? → *tortoreta* (xicoteta de tórtora).",
          "**c)** En *colom*, el castellà *paloma* no s'assembla: ací la divergència és de paraula completa; en *tórtora* vs *tórtola*, la i o: tórt**o**la → tórt**o**ra (canvia la líquida final). Es valora raonar-ho.",
          "**d)** Resposta oberta: «La muntanya eixia de boira.»",
        ],
      },
      {
        in: "Oracions: 1) «Va rebre un colp.» 2) «Fer les maletes és un turment.» 3) «La ploma era de tórtora.»",
        p: [
          "**a)** Rodreja les paraules la vocal de les quals NO coincideix amb el castellà i copia-les.",
          "**b)** Digues en veu alta la seua versió castellana.",
        ],
        s: [
          "**a)** *colp* (golpe), *turment* (tortura/tormento), *tórtora* (tórtola).",
          "**b)** golpe, tormento/tortura, tórtola.",
        ],
        ad: "Tres paraules clau i traducció oral.",
      },
      {
        in: "Fitxes valencianes: COLP, MUNTANYA, TÓRTORA. Fitxes castellanes: golpe, montaña, tórtola.",
        p: [
          "**a)** Uneix cada fitxa amb la seua traducció.",
          "**b)** Rodreja la que canvia la vocal: *muntanya* o *tórtora*.",
        ],
        s: [
          "**a)** colp–golpe (canvia la u per o), muntanya–montaña, tórtora–tórtola.",
          "**b)** *muntanya* (u) vs *montaña* (o): la vocal del mig.",
        ],
        ad: "Parelles visuals i una comparació senzilla.",
      },
      {
        in: "El mestre ensenya la foto d'una tórtora i diu «tórtora». Després, la d'una muntanya i diu «muntanya».",
        p: [
          "**a)** Repetix les dues paraules tres vegades.",
          "**b)** Assenya la fitxa que té la u.",
        ],
        s: ["**a)** Repetició.", "**b)** muntanya."],
        ad: "Repetició i assenyalament; només una vocal comparada.",
      },
      {
        in: "Fitxa d'una tórtora (foto) amb el nom tapat.",
        p: [
          "**a)** Di el nom en veu alta.",
          "**b)** Destapa la fitxa i comprova si portava la u o la o.",
        ],
        s: ["**a)** tórtora.", "**b)** Cap de les dues: t-O-rtora, porta dues os."],
        ad: "Endevinalla visual i autocorrecció.",
      },
    ],
  },
  {
    t: "Vocals a l'obert",
    d: "Escrius les vocals que falten en paraules reals del teu entorn (llibre, act. 9).",
    ic: "lapiz",
    nv: [
      {
        in: "Paraules amb buit: *…stendre, …smorzar, …mbut, g…gant / s…ncer, …mbulància, …mpinar, …ntendre / …stirar, …nsabonar, …mbaixada, …stella / …staca, …spolsar, …mbafar, b…tifarra / emb…tit, b…llir, J…sep, …fegar*.",
        p: [
          "**a)** Completa-les amb la vocal que falta.",
          "**b)** Marca quina d'elles comença amb vocal prostètica (no s'escriu la a) i escriu-la sencera.",
          "**c)** Explica com has sabut quina vocal anava a *botifarra* i a *cartolina*… (orienta't per la divergència).",
          "**d)** Escriu dues paraules del teu dia a dia que comencen per *en-* i *es-*.",
        ],
        s: [
          "**a)** estendre, esmorzar, embut, gegant; sincer, ambulància, empinar? — **omplir/emplenar**: *emplenar? Empinar* → **empinar** no: «empinar» és vàlid (de *empinar el colze*)… Forma correcta: *empinar*. entendre → **entendre**: *entendre*; estirar, ensabonar,ambaixada → **ambaixada**; estrella; estaca, esponjar? *espolssar*→**exsudar?** → el llibre diu *espolvar*? Correcció final: *estaca, esponjar? espolssar* → **espolssar** no existeix: *espolsar* (compte: **espolsar**, e); embafar → **ambafar**? → *abafar*… Forma llibre: *am bafar* → **ambafar**; embatit → **embtit?** → *embadurnat*… La solució neta de la llista: **estendre, esmorzar, embut, gegant, sincer, ambulància, empinar, entendre, estirar, ensabonar, ambaixada, estrella, estaca, espolsar, ambafar, botifarra, embolicat? («embtit» = **embotit**), bullir, Josep, negar** (efegar → **negar**? no: «efegar» → *ofegar*). Versió definitiva per a l'alumne: estendre, esmorzar, embut, gegant, sincer, ambulància, empinar, entendre, estirar, ensabonar, ambaixada, estrella, estaca, espolsar, ambafar, botifarra, embotit, bullir, Josep, ofegar.",
          "**b)** *Esmorzar*: no *\\*asmorezar*. *Estendre*: no *\\*astendre*.",
          "**c)** *Botifarra* porta o (com *bot*, no *\\*butifarra*); «cartolina» porta i (com *carta* + -ina, i com l'objecte: les targetes es fan de cartró → *cartolina*).",
          "**d)** Per exemple: *entorn, espera, encesa, escarràs…*.",
        ],
      },
      {
        in: "Paraules: *…stendre, …smorzar, g…gant, s…ncer, J…sep, b…tifarra*.",
        p: [
          "**a)** Escriu la vocal que falta en cada una.",
          "**b)** Rodeja la que comença amb [a] en la parla però no en l'escriptura.",
        ],
        s: [
          "**a)** estendre, esmorzar, gegant, sincer, Josep, botifarra.",
          "**b)** *esmorzar* (i *estendre*).",
        ],
        ad: "Sis paraules i dues respostes; cap pregunta d'explicació.",
      },
      {
        in: "Fitxes: _stendre, _smorzar, g_gant. Banc de vocals: E · O · A.",
        p: [
          "**a)** Pon la vocal que falta.",
          "**b)** Digues en veu alta «esmorzar» sense la a del davant.",
        ],
        s: [
          "**a)** estendre, esmorzar, gegant.",
          "**b)** «esmorzar».",
        ],
        ad: "Fitxes i banc de tres vocals.",
      },
      {
        in: "Imatge d'un esmorzar i imatge d'un gegant.",
        p: [
          "**a)** Digues els noms en veu alta.",
          "**b)** Tria la vocal que sent obri la paraula: *a* o *e*.",
        ],
        s: ["**a)** esmorzar, gegant.", "**b)** e."],
        ad: "imatge → oral → tria binària.",
      },
      {
        in: "Fitxa gran de l'esmorzar.",
        p: [
          "**a)** Senyal-la en l'esmorzar real (foto) i digues la paraula.",
          "**b)** Fes el so de la vocal inicial: e o a?",
        ],
        s: ["**a)** «esmorzar».", "**b)** e."],
        ad: "Fotografia i escolta del so inicial.",
      },
    ],
  },
  {
    t: "Verbs amb trampa vocàlica",
    d: "Completes oracions amb la forma verbal que toca (llibre, act. 10).",
    ic: "palmas",
    nv: [
      {
        in: "Oracions amb buit: 1) «Els alumnes que … al passadís cometen una falta greu.» (*escopir*) 2) «Jo no … fer l'examen demà!» (*voler*) 3) «Tant de bo jo … fer totes les coses que tu fas!» (*poder*) 4) «Els malalts crònics de bronquitis … molt.» (*tossir*) 5) «El meu company m'ha ensenyat com es … els botons.» (*cosir*) 6) «Si vols, jo ara … acompanyar-te, però demà no … .» (*poder*)",
        p: [
          "**a)** Completa amb la forma correcta del verb indicat.",
          "**b)** Quin comú patró ortogràfic compartixen les formes de les oracions 1, 4 i 5? Explica'l.",
          "**c)** En l'oració 2, què canviaria si el subjecte fóra *nosaltres*?",
          "**d)** Escriu una oració amb *escopir* i una amb *tossir* que no siguen la de l'exercici.",
        ],
        s: [
          "**a)** 1) *escupen* 2) *vull* (no *\\*vol*: «vull») 3) *puga* («Tant de bo…» subjuntiu) 4) *tosseixen* 5) *cosen* (cosir → es cousen? forma: **cosen**) 6) *puc / puc*.",
          "**b)** Els verbs del tipus *escopir/tossir/cosir* canvien la vocal temàtica: i → ix (escupen, tosseixen) o e (cosen): vocal trampa, com *servir → servix*.",
          "**c)** «Nosaltres no volem fer l'examen demà!»",
          "**d)** Per exemple: «No escupis al terra», «El meu avi tosseix de nit».",
        ],
      },
      {
        in: "Oracions: 1) «Els alumnes que … al passadís cometen una falta.» (*escopir*) 2) «Jo no … fer l'examen!» (*voler*) 3) «Els malalts … molt.» (*tossir*)",
        p: [
          "**a)** Completa.",
          "**b)** Tria: la forma de *escopir* és *escupen* o *escopirien*.",
        ],
        s: [
          "**a)** escupen, vull, tosseixen.",
          "**b)** *escupen*.",
        ],
        ad: "Tres formes i una elecció tancada.",
      },
      {
        in: "Banc: *escupen · vull · tosseixen*.",
        p: [
          "**a)** Uneix cada forma amb la seua oració.",
          "**b)** Digues en veu alta la que porta ix.",
        ],
        s: [
          "**a)** «…escupen al passadís»; «Jo no vull fer l'examen»; «Els malalts tosseixen molt».",
          "**b)** tosseixen.",
        ],
        ad: "Banc amb les respostes fetes.",
      },
      {
        in: "Fitxes: ESCUPIR → ESCUPEN. TOSSIR → TOSSEIXEN.",
        p: [
          "**a)** Llig el parell dues vegades.",
          "**b)** Digues quina lletra eixix dins del mot: ix o res.",
        ],
        s: ["**a)** Lectura.", "**b)** ix."],
        ad: "Parell visual i observació.",
      },
      {
        in: "El mestre diu: «Jo no … fer l'examen.»",
        p: [
          "**a)** Completa en veu alta: «vull».",
          "**b)** Repetix la frase sencera.",
        ],
        s: ["**a)** vull.", "**b)** «Jo no vull fer l'examen!»"],
        ad: "Complet oral d'una forma.",
      },
    ],
  },
  {
    t: "Dictat de la Garrotxa",
    d: "Escrites al dictat un text curt i comproveu les vocals (activitat 12 del llibre).",
    ic: "repaso",
    nv: [
      {
        in: "Dictat (text de la zona volcànica de la Garrotxa, adaptat): «La Garrotxa és una comarca volcànica de Catalunya. Els seus volcanis van estar actius durant segles i van eixir colades de lava que van modelar el paisatge. Avui, la muntanya de Montsacopa i la Fageda d'en Jordà demostren que la natura ho cubrix tot de verd.»",
        p: [
          "**a)** Escriu el text al dictat (dos llegides).",
          "**b)** Subratlla les paraules amb divergència vocàlica (les que en castellà tenen una altra vocal) i copia-les.",
          "**c)** Comprova i autocorregeix: quina vocal dubtes? Consulta el diccionari i anota la teua decisió.",
          "**d)** Tornes a escriure el text al cap de tres dies: quantes faltes has tret?",
        ],
        s: [
          "**a)** El text complet, amb la puntuació del model.",
          "**b)** *volcànica* (cast. volcánica), *comarca* (igual), *colada* (igual), *lava*, *paisatge* (cast. paisaje, sense la *i*), *muntanya* (cast. montaña), *cubrix* (cast. cubre: canvia vocal i desinència).",
          "**c)** Es valora la consulta al diccionari i l'anotació de la decisió, no tindre cap falta.",
          "**d)** Es valora la millora; registrar el nombre.",
        ],
      },
      {
        in: "Dictat curt (quatre frases del mateix text).",
        p: [
          "**a)** Escriu-lo al dictat.",
          "**b)** Compara'l amb el model escrit i cercla les vocals que has fallat.",
        ],
        s: ["**a)** Quatre frases completes.", "**b)** Autocorrecció visual."],
        ad: "Quatre frases i autocorrecció amb model.",
      },
      {
        in: "Dictat de dues frases curtes: «La Fageda d'en Jordà és un bosc.» «La lava va fer muntanyes.»",
        p: [
          "**a)** Escriu-les al dictat (tres vegades).",
          "**b)** Compta les vocals de la paraula *muntanyes*.",
        ],
        s: [
          "**a)** Les dues frases.",
          "**b)** Quatre (u-a-e…: m-u-n-t-a-n-y-e-s: u, a, e = 3 vocals).",
        ],
        ad: "Dos frases i un conteig simple de vocals.",
      },
      {
        in: "El mestre diu una frase i l'escriu a la pissarra.",
        p: [
          "**a)** Copia-la mirant la pissarra.",
          "**b)** Tapa-la i llig-la en veu alta.",
        ],
        s: ["**a)** Còpia.", "**b)** Lectura."],
        ad: "Còpia i lectura; sense dictat pur.",
      },
      {
        in: "Fitxa amb el mot «muntanya» i una foto d'una muntanya.",
        p: [
          "**a)** Digues la paraula.",
          "**b)** Tria la vocal del mig: *o* o *u*.",
        ],
        s: ["**a)** muntanya.", "**b)** u."],
        ad: "Tria binària amb suport visual.",
      },
    ],
  },
];
