// Bloc 0 · Repàs · Tema 1 de Valencià · Adaptacions PT · 2n ESO
// Cinco niveles por actividad: [0] 2n ESO (ejercicio de referencia del curso),
// [1] 1r ESO, [2] 6è, [3] 5è y [4] 4t de primaria (adaptaciones descendentes).

import type { Ap, Act } from "../tipos";

export const AP: Ap = {
  slug: "00-repas",
  n: 0,
  t: "Repàs: paraules, síl·labes i gènere",
  teoria: [
    "Abans d'obrir el tema cal tenir a punt el que vas aprendre a primària. En valencià, una **paraula** es pot separar en **síl·labes**: tantes síl·labes com vocals que s'especen juntes, per exemple *ca-mi-se-TE-ra* en té cinc. Dins de cada paraula, una síl·laba sona més fort: és la **síl·laba tònica** (*ca‑mi‑se‑**TE**‑ra*). Marcar-la bé és el primer pas per a escribir sense faltes.",
    "Els **noms** i els **adjectius** canvien de forma: tenen **gènere** (masculí i femení) i **nombre** (singular i plural). *gos → gossa*, *xic → xica*, *llibre → llibres*, *gossa → gosses*. L'adjectiu sempre **concorda** amb el nom: *el xic alt*, *la xica alta*, *els xics alts*.",
    "Els **articles** acompanyen els noms: *el, la, els, les, un, una, uns, unes*. Davant de vocal, els articles *el* i *la* s'apostrofen: *l'horta*, *l'escola*. Les preposicions *a* i *de* es contrauen amb l'article *el*: *a + el → al*, *de + el → del*: *Baixem **al** pati, eixim **del** mercat*.",
    "RAW:<table><caption>El que has de tindre automàtic abans del tema 1</caption><thead><tr><th>Concepte</th><th>Exemple</th><th>Truc</th></tr></thead><tbody><tr><td>Síl·laba tònica</td><td>par-LE-ta</td><td>colpeja amb la mà: on dius més fort</td></tr><tr><td>Femení</td><td>xica, mestra, gossa</td><td>normalment acaba en ‑a</td></tr><tr><td>Plural</td><td>llibres, cases</td><td>afegeix ‑s, o ‑os/-es si acaba en consonant</td></tr><tr><td>Contracció</td><td>al, del</td><td>a+el, de+el: mai *a el*</td></tr><tr><td>Apostrofació</td><td>l'escola</td><td>el/la davant de vocal o hac</td></tr></tbody></table>",
    "Per a acabar, dos repassos que tornen tot el curs: l'**ordre alfabètic**, en què alguns grups de dues lletres fan un sol so i als diccionaris es busquen com una sola lletra: són els **dígrafs** *ll* (*colla*), *ny* (*bunyol*) i *ig* final (*faig*); i la **família de paraules**, que són les que compartixen arrel: *casa, caseta, caseriu* són de la mateixa família; *casaqueta*, no.",
  ],
  ej: [
    "*maneta*: ma‑NE‑ta, tres síl·labes, la tònica és la del mig, i és el diminutiu de *ma*.",
    "*les xiques altes*: article *les* (femení plural), nom *xiques* i adjectiu *altes*, tots tres concordants.",
    "*Baixem al pati i eixcunes de l'aula*: *al* = a + el; *de l'aula* porta article apostrofat.",
  ],
};

export const ACTS: Act[] = [
  {
    t: "Colps de veu",
    d: "Separes paraules en síl·labes i marques la tònica: la base de tota ortografia.",
    ic: "palmas",
    nv: [
      {
        in: "Oració del diari escolar: «La **representant** de la classe ha explicat el **funcionament** de la biblioteca i ha demanat **paciència** a tothom.»",
        p: [
          "**a)** Separa en síl·labes les tres paraules en negreta i marca amb un cercle la síl·laba tònica de cadascuna.",
          "**b)** Explica per què *paciència* té més síl·labes del que semblen vocals a simple vista: conta-les i justifica-ho.",
          "**c)** Escriu dues paraules més del mateix camp semàntic que *biblioteca* (una biblioteca del poble) i separa-les en síl·labes.",
          "**d)** Busca en l'oració una paraula amb dígraf i explica quina parella de lletres forma un sol so.",
        ],
        s: [
          "**a)** re‑pre‑sen‑**TANT** (4 síl·labes); fun‑cio‑na‑**MENT** (4); pa‑ci‑**ÈN**‑cia (4). En *paciència*, la tònica és *èn* i porta accent obert.",
          "**b)** Perquè *i* i *e* juntes en *cièn* formen un diftong (una sola síl·laba amb dues vocals), i la segona *ia* final és un hiat: pa‑ci‑**èn**‑ci/a dona 4 síl·labes, no 3 ni 5.",
          "**c)** Resposta oberta: per exemple *llibret* (lli‑BRET), *prestatge* (pres‑TAT‑ge), *lectora* (lec‑TO‑ra).",
          "**d)** *funcionament* no en porta; *representant* porta *ent* final. El dígraf clar és *rr* o *ll*: a *biblioteca* no n'hi ha, així que val *representant* no… La resposta correcta: *paciència* no en porta; **cap paraula de l'oració no porta dígraf**, excepte si comptes *ci* de *paciència*, que no ho és. Si un alumne tria *representant* amb la *r* simple, ha de dir que NO és dígraf perquè portaria *rr*: *representant* s'escriu amb una sola ere. (Accepta qualsevol resposta raonada que distinga dígraf de simple.)",
        ],
      },
      {
        in: "Oració: «La representant de la classe ha demanat paciència a tothom.»",
        p: [
          "**a)** Separa en síl·labes *representant*, *paciència* i *tothom*, i digues quants colps de veu té cada una.",
          "**b)** Marca la síl·laba tònica en les tres paraules.",
          "**c)** Escriu una paraula de la mateixa família que *classe* i separa-la en síl·labes.",
        ],
        s: [
          "**a)** re‑pre‑sen‑TANT (4), pa‑ci‑ÈN‑cia (4), TOT‑hom (2).",
          "**b)** Les tòniques són *tant*, *èn* i *tot*.",
          "**c)** Per exemple *classista* (cla‑SSIS‑ta) o *aclassar*; qualsevol de la família amb la separació ben feta.",
        ],
        ad: "Dues paraules menys i desapareix l'apartat del dígraf: separen, compten i marquen tònica sobre paraules ja triades.",
      },
      {
        in: "Paraules: *casa – ma‑ne‑ta – lli‑bre* (ja separades per l'ordre).",
        p: [
          "**a)** Compta els colps de veu de cada paraula i escriu el nombre.",
          "**b)** Rodeja la síl·laba que sona més fort en *maneta*.",
          "**c)** Uneix cada paraula amb la seua família: *caseta → casa*, *llibreta → …*",
        ],
        s: [
          "**a)** casa: 2; maneta: 3; llibre: 2.",
          "**b)** La síl·laba fort de *maneta* és *ne*: ma‑**NE**‑ta.",
          "**c)** *llibreta* va amb *llibre*: compartixen l'arrel *llib-*.",
        ],
        ad: "Les paraules arriben ya separades: la tasca es redueix a comptar colps, rodejar i unir amb fletxes.",
      },
      {
        in: "Fitxes de paraules: *SA‑BE*, *CA‑SA*, *LLOP*. Banc de nombres: *2 · 2 · 1*.",
        p: [
          "**a)** Enganxa al costat de cada fitxa el nombre de síl·labes del banc.",
          "**b)** Fes colps amb la mà mentre dius *SA‑BE* i digues en veu alta quina síl·laba va més forta.",
        ],
        s: [
          "**a)** SA‑BE: 2; CA‑SA: 2; LLOP: 1.",
          "**b)** La forta és la primera: **SA**‑be. Un síl·laba sola no es pot partir.",
        ],
        ad: "Es manipulen fitxes físiques i el banc té els nombres fets: marquen la tònica colpejant, de forma oral.",
      },
      {
        in: "El mestre diu en veu alta: *CA‑SA*, *LI‑BRE*, *MA‑NE‑TA*.",
        p: [
          "**a)** Repetix cada paraula fent un colp de mà per síl·laba.",
          "**b)** Colpeja més fort on sona fort: digues en veu alta la síl·laba forta de *maneta*.",
        ],
        s: [
          "**a)** CA‑SA (dos colps), LI‑BRE (dos), MA‑NE‑TA (tres).",
          "**b)** La forta és *ne*: **NE**. Tots hem colpejat: ma‑NE‑ta.",
        ],
        ad: "Tot és oral i amb el cos: l'adult diu, l'alumne repetix i colpeja; no cal escriure.",
      },
    ],
  },
  {
    t: "Masculí, femení, u, molts",
    d: "Convertixes gènere i nombre i comproves que l'adjectiu copie el nom.",
    ic: "puzzle",
    nv: [
      {
        in: "Targetes amb sintagmes del patidell: «el gos ros», «la nena xicoteta», «els xics tranquil·lets», «les muralles antigues».",
        p: [
          "**a)** Passa cada sintagma al gènere contrari i escriu-lo sencer.",
          "**b)** Passa el sintagma 3 al singular i el 4 al plural… el 4 ja és plural: passa'l al singular.",
          "**c)** Explica amb un exemple de la llista què vol dir que l'adjectiu «concorda» amb el nom.",
          "**d)** Eskriu el teu sintagma amb *muralla*: un article, el nom i un adjectiu ben concordats.",
        ],
        s: [
          "**a)** la gossa rosa; el nen xicotet; la xica tranquil·la / el xic tranquil·let; el muralla antiqua? — compte: *muralla* és femení sempre, així que no té masculí: queda *les muralles antigues → la muralla antiga* només en nombre.",
          "**b)** *el xic tranquil·let*; *la muralla antiga*.",
          "**c)** Que copia el gènere i el nombre del nom: a *les muralles antigues*, el nom és femení plural i l'adjectiu acaba en ‑es i també és femení plural. Si canvie el nom, canvie l'adjectiu: *la muralla antiga*.",
          "**d)** Resposta oberta concordada: *la muralla llarga*, *les muralles grosses*…",
        ],
      },
      {
        in: "Sintagmes: «el gos ros» i «les xiques contentes».",
        p: [
          "**a)** Escriu *el gos ros* en femení.",
          "**b)** Escriu *les xiques contentes* en singular.",
          "**c)** Rodeja l'adjectiu de cada sintagma i digues si copia el nom en gènere o en nombre.",
        ],
        s: [
          "**a)** la gossa rosa.",
          "**b)** la xica contenta.",
          "**c)** *ros* i *contentes*: l'adjectiu copia el nom en gènere i en nombre a la vegada (femení singular; femení plural).",
        ],
        ad: "Només dos sintagmes i dos canvis; la tercera pregunta es respon rodejant i triant gènere o nombre.",
      },
      {
        in: "Fitxes: GOS/GOSSA, XIC/XICA, LLIBRE/LLIBRES. Frase amb forats: «La ___ és molt bonita.»",
        p: [
          "**a)** Emballa cada fitxa mascle amb el seu femení o el seu plural.",
          "**b)** Tria la fitxa que va en el forat: *xic* / *xicoteta* / *llibre*.",
          "**c)** Digues en veu alta per què has triat eixa.",
        ],
        s: [
          "**a)** GOS–GOSSA, XIC–XICA, LLIBRE–LLIBRES.",
          "**b)** *xicoteta*: *La xicoteta és molt bonita.*",
          "**c)** Perquè *la* i *bonita* són femenins: el nom del forat també ha de ser femení.",
        ],
        ad: "Treball amb fitxes d'embalar i un sol forat; la raó es diu oralment.",
      },
      {
        in: "Dues caixes: MAR i TERRA. Paraules: *gos, gossa, nen, nena, cases, gossets*.",
        p: [
          "**a)** Fes dos montons: paraules que acaben en so de A (femení) i la resta.",
          "**b)** Compta les paraules de cada montó.",
        ],
        s: [
          "**a)** *gossa* i *nena* acaben en so de A; compte amb *cases*, que acaba en ‑es i també és femení. Al montó femení: *gossa, nena, cases*; a l'altre: *gos, nen, gossets*.",
          "**b)** Tres i tres.",
        ],
        ad: "Només classifiquen per terminació (so de A o no) i compten; sense canviar formes.",
      },
      {
        in: "El mestre diu *gos*. Targeta A: GOSSETA. Targeta B: GOS.",
        p: [
          "**a)** Quan l'mestre diga una paraula en femení, ensenya la targeta A; si és masculina, la B.",
          "**b)** Digues en veu alta el femení de *xic*.",
        ],
        s: [
          "**a)** *gossa* → A; *gos* → B; *nena* → A; *llibre* → B.",
          "**b)** xica.",
        ],
        ad: "Resposta amb targetes i oral: el mestre parla, l'alumne ensenya; dues paraules i prou.",
      },
    ],
  },
  {
    t: "Articles, contraccions i apostrofacions",
    d: "Tries l'article que toca i entens al, del i l'.",
    ic: "etiqueta",
    nv: [
      {
        in: "Frases del diari del centre: «\\_\\_\\_ pati és net», «\\_\\_\\_ horta està verda», «Baixem \\_\\_\\_ menjador», «Venim \\_\\_\\_ mercat».",
        p: [
          "**a)** Completa els forats amb *el, la, l', al, del* (cadascun, una volta).",
          "**b)** Explica per què *horta* porta apòstrof i no *el horta*.",
          "**c)** Explica què conté la contracció *del* i escriu la frase desplegada.",
          "**d)** Escriu dues frases curtes: una amb *al* i una amb *a l'*, i digues la diferència.",
        ],
        s: [
          "**a)** El pati és net. L'horta està verda. Baixem al menjador. Venim del mercat.",
          "**b)** Perquè *horta* comença per vocal: *el horta* no es pot dir de seguit, i l'article *el* perd la vocal i esdevé *l'*.",
          "**c)** *del* = *de + el*. Desplegat: *Venim de el mercat* → *del mercat*: la preposició *de* i l'article *el* es fan una sola paraula.",
          "**d)** *Baixem al pati* (a+el: anem cap al pati concret) / *Baixem a l'horta* (preposició *a* davant d'article apostrofat: no hi ha contracció quan l'article és *l'*).",
        ],
      },
      {
        in: "Frases: «\\_\\_\\_ pati», «\\_\\_\\_ escola», «baixem \\_\\_\\_ gimnàs», «eixe \\_\\_\\_ mercat».",
        p: [
          "**a)** Completa amb *el, la, l', al, del*.",
          "**b)** Rodeja on hi ha una contracció.",
          "**c)** Diu per què *escola* porta apòstrof.",
        ],
        s: [
          "**a)** el pati, l'escola, baixem al gimnàs, eixim del mercat.",
          "**b)** *al* i *del*.",
          "**c)** Perquè comença per vocal i *la* s'apostrofa: *la escola → l'escola*.",
        ],
        ad: "Quatre forats amb banc de cinc peces; la contracció només es rodeja i l'apostrofació es justifica oralment.",
      },
      {
        in: "Banc: *EL · LA · L'*. Frases: «\\_\\_\\_ llibre», «\\_\\_\\_ motxilla», «\\_\\_\\_ aula».",
        p: [
          "**a)** Escriu l'article del banc davant de cada paraula.",
          "**b)** Marca quins articles porten apòstrof.",
        ],
        s: [
          "**a)** el llibre, la motxilla, l'aula.",
          "**b)** *l'aula*: el que porta apòstrof és l'article davant de vocal.",
        ],
        ad: "Banc de tres articles i una sola marca; sense contraccions.",
      },
      {
        in: "Fitxa gran: EL PATI. Fitxa xicoteta: L'HORTA. Targetes EL / L'.",
        p: [
          "**a)** Pon la targeta correcta damunt de cada fitxa.",
          "**b)** Digues en veu alta per què *L'HORTA* porta palito.",
        ],
        s: [
          "**a)** EL sobre PATI, L' sobre HORTA.",
          "**b)** Perquè HORTA comença per vocal i l'article perd la lletra; es diu d'un sol colp.",
        ],
        ad: "Manipulatiu: targetes físiques sobre fitxes i resposta oral d'una frase.",
      },
      {
        in: "El mestre ensenya una foto: una horta. Diu: « hort».",
        p: [
          "**a)** Repetix en veu alta «l'horta» fent un colp en la pausa de l'apòstrof.",
          "**b)** Assenya la targeta L' quan l'mestre diga paraules que comencen per vocal; la targeta EL si comencen per consonant.",
        ],
        s: [
          "**a)** l'horta: un sol colp de veu, la palito no fa pausa.",
          "**b)** *horta* → L'; *pati* → EL; *escola* → L'; *llibre* → EL.",
        ],
        ad: "Modelat oral i targetes; no s'escriu res.",
      },
    ],
  },
  {
    t: "Llegir i respondre: un diumenge a Xàtiva",
    d: "Comprenés un text curt i cerques la informació com en un examen.",
    ic: "libro",
    nv: [
      {
        in: "«Ahir, els germans Sanchis van eixir de casa a les nou del matí per a pujar al Castell. Portaven una motxilla amb dues ampolles d'aigua, pa i unes quantes taronges. Al camí van trobar la muralla del Castell, van comptar vuit torres i van fer vint-i-dos passos. La Marta va dir que volia tornar en la nit, quan les llums fan brillar laforat del Sant Sepulcre.»",
        p: [
          "**a)** Respon: a quina hora van eixir, quants fills anaven i què portaven a la motxilla (tres dades).",
          "**b)** Veritable o fals: «van pujar al Castell», «era de nit quan van eixir», «la muralla té vuit torres». Justifica la falsa.",
          "**c)** Què vol dir l'expressió *fer passos* ací? Tria: *caminar comptant* / *córrer* / *balle*. Justifica amb el text.",
          "**d)** La Marta vol tornar de nit. Explica per què ho diu i quina paraula del text t'ho dona.",
        ],
        s: [
          "**a)** A les nou del matí; anaven dos germans (els germans Sanchis); portaven una motxilla amb dues ampolles d'aigua, pa i unes quantes taronges.",
          "**b)** Vertader; FALS (era de matí, «a les nou del matí»); la tercera és falsa: el text diu que *van comptar vuit torres*, no que la muralla en tinga vuit.",
          "**c)** *caminar comptant*: el text parla de «vint‑i‑dos passos» fets al camí, una xicoteta conta de qui camina i compta.",
          "**d)** Perquè vol veure «les llums»: la paraula *llums* explica el seu desig de tornar quan el Castell està il·luminat.",
        ],
      },
      {
        in: "«Ahir els germans Sanchis van eixir de casa a les nou del matí per a pujar al Castell. Portaven una motxilla amb aigua, pa i taronges. Van comptar vuit torres. La Marta vol tornar en la nit, quan les llums fan brillar el Castell.»",
        p: [
          "**a)** Copia: hora d'eixida \\_\\_\\_\\_\\_, què portaven \\_\\_\\_\\_\\_, quantes torres \\_\\_\\_\\_\\_.",
          "**b)** Veritable o fals: «era de nit quan van eixir». Corregix la falsa.",
          "**c)** Per què la Marta vol tornar de nit? Respon en una frase.",
        ],
        s: [
          "**a)** a les nou del matí; aigua, pa i taronges; vuit.",
          "**b)** Fals: era de matí.",
          "**c)** Perquè vol veure les llums del Castell de nit.",
        ],
        ad: "Text més curt i sense la xifra de passos; la primera resposta és copiar dades, i només un vertader/fals amb correcció.",
      },
      {
        in: "«Els germans Sanchis van pujar al Castell de Xàtiva de matí. Van comptar vuit torres i van fer una foto. La Marta vol tornar de nit.»",
        p: [
          "**a)** Rodea: van pujar *de matí* o *de nit*?",
          "**b)** Rodeja el nombre de torres: *vuit* / *deu*.",
          "**c)** Uneix: Marta → vol tornar *de nit* perquè → *les llums*.",
        ],
        s: [
          "**a)** de matí.",
          "**b)** vuit.",
          "**c)** Marta vol tornar de nit perquè li agraden les llums del Castell il·luminat.",
        ],
        ad: "Tot es fa rodejant i unint: dues opcions per ítem, cap resposta escrita.",
      },
      {
        in: "Quatre làmines: (1) el Castell de dia, (2) un nen que conta torres, (3) una lluna, (4) una motxilla.",
        p: [
          "**a)** El mestre lig el text i tu assenyalis la làmina que correspon a cada frase.",
          "**b)** Digues en veu alta: Marta vol tornar de dia o de nit?",
        ],
        s: [
          "**a)** «van pujar» → làmina 1; «van comptar» → làmina 2; «vol tornar quan brillen les llums» → làmina 3 (nit).",
          "**b)** De nit, per veure les llums.",
        ],
        ad: "La comprensió es faassenyant làmines mentre un adult llegix; l'última pregunta és oral.",
      },
      {
        in: "El mestre lig en veu alta: «La Marta vol tornar de nit.»",
        p: [
          "**a)** Fes un senyal amb el dit: DÍA si entens que és de dia, NIT si és de nit.",
          "**b)** Repetix la frase en veu alta i digues UNA paraula que ha sentit (Marta, tornar, nit…).",
        ],
        s: [
          "**a)** NIT.",
          "**b)** Qualsevol paraula de la frase ben repetida.",
        ],
        ad: "Escoltar i respondre amb un senyal i una sola paraula; dos passos, sense text imprés.",
      },
    ],
  },
  {
    t: "En què ordre va?",
    d: "Ordens llistes alfabèticament i no et confongues amb els dígrafs.",
    ic: "llapis",
    nv: [
      {
        in: "La llista del concurs d'escriptura: **Xelo, Roig, Banyeres, Aina, Ferran**.",
        p: [
          "**a)** Ordena els noms de la A a la Z i escriu-los.",
          "**b)** En eixa llista, quin nom aniria entre *Ferran* i *Roig*: *Mireia* o *Aurora*? Justifica per la lletra inicial.",
          "**c)** En els diccionaris en valencià, els noms amb *ll* (com *Costura*) i *ny* (com *Any*) busquen-se com si foren una sola lletra. Digues dues paraules amb dígraf *ll* i dues amb dígraf *ny*.",
          "**d)** Ordena alfabèticament: *llibre, llop, llavor*. (Pista: *lla < lli < llo*; compara la segona lletra.)",
        ],
        s: [
          "**a)** Aina, Banyeres, Ferran, Roig, Xelo.",
          "**b)** *Mireia*, perquè la m va després de la f i abans de la r; *Aurora* aniria al principi (la a).",
          "**c)** Amb *ll*: *colla, llavor* (i moltes més). Amb *ny*: *bunyol, any*. Als diccionaris valencians *ll* i *ny* es busquen en l'apartat de la l i la n, respectivament.",
          "**d)** llavor, llibre, llop: la a va abans que la i, la i abans que la o.",
        ],
      },
      {
        in: "Llista: **Aina, Ferran, Xelo**.",
        p: [
          "**a)** Ordena'ls de la A a la Z i copia'ls.",
          "**b)** Afegix *Roig* on tocara i torna a escriure la llista.",
          "**c)** Escriu dues paraules que tinguen *ll*.",
        ],
        s: [
          "**a)** Aina, Ferran, Xelo.",
          "**b)** Aina, Ferran, Roig, Xelo.",
          "**c)** Per exemple: *colla, mullar, lluç, ballar*.",
        ],
        ad: "Menys noms, un afegit a la vegada, i el dígraf només s'exemplifica sense parlar de diccionaris.",
      },
      {
        in: "Fitxes: FERRAN, AINA, XELO.",
        p: [
          "**a)** Poseu-les en ordre amb la primera lletra: quina va primera?",
          "**b)** Digues en veu alta la llista completa ordenada.",
        ],
        s: [
          "**a)** La primera és AINA (lletra A, la primera de l'alfabet).",
          "**b)** Aina, Ferran, Xelo.",
        ],
        ad: "Fitxes per a muntar l'ordre amb les mans i resposta oral de la llista.",
      },
      {
        in: "Quatre lletres d'impremta: A, F, X, R.",
        p: [
          "**a)** Busca-les en l'alfabet pegat de la paret i posa-les en ordre.",
          "**b)** Diu en veu alta: quina lletra va primer, l'A o la X?",
        ],
        s: [
          "**a)** A, F, R, X.",
          "**b)** L'A: és la primera de l'alfabet.",
        ],
        ad: "Només lletres, amb l'alfabet de paret com a mira; sense paraules.",
      },
      {
        in: "Targeta grossa A, targeta grossa X.",
        p: [
          "**a)** Ensenya la lletra amb què comença el teu nom.",
          "**b)** Quan l'mestre diga una lletra que va primer en l'alfabet, ensenya la targeta A.",
        ],
        s: [
          "**a)** Segons el nom de cada alumne.",
          "**b)** Amb «A» o «F»: es mostra la targeta A (A va abans que F, i F abans que X).",
        ],
        ad: "Joc de targetes personalitzat i només dues comparacions; tot oral.",
      },
    ],
  },
  {
    t: "Famílies de paraules",
    d: "Reconeixes paraules de la mateixa família i les diminutius.",
    ic: "arbol",
    nv: [
      {
        in: "Del text del Castell: *Castell, castellet, costura, costurera, muralla, murallet*.",
        p: [
          "**a)** Classifica les sis paraules en tres famílies (dues paraules per família).",
          "**b)** Els diminutius porten *‑et/‑eta* (xicotet). Separa quines de la llista són diminutius i quines no, i digues la paraula gran de cada diminutiu.",
          "**c)** *costurera* és una persona que…? Deduïx el significat pels sufixos *‑er/-era* i explica el truc.",
          "**d)** Escriu tu una família nova (tres paraules) a partir de *pa*: *panís, palet…*.",
        ],
        s: [
          "**a)** Família *Castell*: Castell, castellet. Família *costura*: costura, costurera. Família *muralla*: muralla, murallet.",
          "**b)** Diminutius: *castellet* (de Castell), *murallet* (de muralla). No ho són: *Castell, costura, muralla, costurera*. *‑et/‑eta* significa 'xicotet de'.",
          "**c)** Que cosix: el sufix *‑er/-era* forma oficis (sabater, flequer, costurera). El truc: mira l'últim troço de la paraula.",
          "**d)** Per exemple: pa, panet, palet, panís… (família de l'arrel *pa-*).",
        ],
      },
      {
        in: "Paraules: *castellet, costura, murallet, costurera, castell, muralla*.",
        p: [
          "**a)** Fes tres parelles de la mateixa família.",
          "**b)** Rodeja els diminutius.",
          "**c)** Què vol dir el sufix *‑et*? Elige: *xicotet* / *gran* / *major*. Respon en veu alta.",
        ],
        s: [
          "**a)** castell–castellet, costura–costurera, muralla–murallet.",
          "**b)** castellet, murallet.",
          "**c)** *xicotet*: castellet = castell xicotet.",
        ],
        ad: "Parelles amb les sis paraules donades i el sufix en opció cerrada; només una explicació oral.",
      },
      {
        in: "Fitxes: MA → MANETA. CASTELL → ? TARGETES: *castellet* / *caseta*.",
        p: [
          "**a)** Uneix cada fitxa gran amb el seu diminutiu.",
          "**b)** Digues en veu alta una paraula xicoteta teu (un mot de la teua casa).",
        ],
        s: [
          "**a)** MA–maneta, CASTELL–castellet, CASA–caseta.",
          "**b)** Resposta personal: cadira→cadireta, gat→gato… (s'accepta *go* → *go* si és de la seua parla).",
        ],
        ad: "Parelles fetes i diminutiu amb banc de dues fitxes; la producció és oral.",
      },
      {
        in: "Dos caixes: GRAN i XICOTET. Paraules: *flor, florita, gat, gatet, casa*.",
        p: [
          "**a)** Posa cada paraula en la seua caixa.",
          "**b)** Digues en veu alta a quina caixa va *casa*.",
        ],
        s: [
          "**a)** GRAN: flor, gat, casa. XICOTET: florita, gatet.",
          "**b)** A GRAN (encara no té el ‑eta del diminutiu).",
        ],
        ad: "Només classifiquen GRAN/XICOTET sense paraules tècniques.",
      },
      {
        in: "El mestre ensenya un flors (flor) i dibuixa una flor xicoteta al costat.",
        p: [
          "**a)** Diu en veu alta el nom de la flor xicoteta imitant el model: *flor… florita*.",
          "**b)** Ara dibuixa't tu una cosa xicoteta i posa-li el nom amb *‑eta*.",
        ],
        s: [
          "**a)** florita.",
          "**b)** Per exemple: *cadireta* (cadira xicoteta), *tauleta*, *caseta*.",
        ],
        ad: "Modelat visual i producció oral/dibuix; sense cap llista escrita.",
      },
    ],
  },
];
