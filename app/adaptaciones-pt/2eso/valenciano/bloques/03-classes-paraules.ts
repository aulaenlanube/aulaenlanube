// Bloc 3 · Classes de paraules · Tema 1 de Valencià · Adaptacions PT · 2n ESO
// Cinco niveles por actividad: [0] 2n ESO, [1] 1r ESO, [2] 6è, [3] 5è, [4] 4t.

import type { Ap, Act } from "../tipos";

export const AP: Ap = {
  slug: "03-classes-paraules",
  n: 3,
  t: "Les classes de paraules",
  teoria: [
    "Les paraules es classifiquen en **huit classes o categories gramaticals** segons la **forma** (com canvien), el **significat** (què volen dir) i la **funció** (què fan en l'oració). Cinc són **variables** —tenen flexió de gènere i nombre, i el verb també de persona, temps i mode—: el **nom**, l'**adjectiu**, els **determinants**, els **pronoms** i el **verb**. Tres són **invariables**: l'**adverbi**, la **preposició** i la **conjunció** (les dues darreres formen el grup dels **connectors**). A més, la **interjecció** expressa emocions: *visca, hola, xe!*",
    "Fig:paraules",
    "**Nom**: designa persones, animals, objectes, llocs o idees, i pot flexionar nombre i gènere: *gos, gossa, gossos, gosses*. **Adjectiu**: senyala característiques i qualitats del nom, concorda amb ell i també flexiona: *xic simpàtic, xiques simpàtiques*.",
    "**Determinants**: acompanyen el nom i n'hi ha de sis menes —*articles* (el, uns), *possessius* (la seua), *quantitatius* (molts, quatre), *demostratius* (aquelles), *indefinits* (alguns, totes) i *interrogatius* (quin, quines)—. **Pronoms**: fan les vegades del nom: *jo, tu, nosaltres…* i eviten repeticions: «Pep i Pau vindran demà. **Ells** duran fruita» (*Ells* = Pep i Pau).",
    "**Verb**: indica accions, estats o processos i porta marques de persona, nombre, temps i mode: *Et contaria una història. El capità caminava lentament.* **Adverbi**: modifica un verb, un adjectiu o un altre adverbi i expressa lloc, temps, manera, quantitat…: *tard, molt, ací, bé*. **Preposicions**: *a, amb, contra, de, entre, fins, per…*; **conjuncions**: *però, i, perquè…*.",
    "El truc per a no equivocarte: les paraules variables es poden transformar (afegir ‑a, ‑os, canviar de temps) i les invariables mai no canvien: prova de dir *\\*moltos* o *\\*perès*: no existeixen, perquè *molt* i *per* són invariables.",
  ],
  ej: [
    "*les nostres hortes noves*: determinants *les, nostres*; nom *hortes*; adjectiu *noves*; totes en femení plural.",
    "*Ella sempre arriba tard*: pronom *Ella*, adverbi de temps *sempre* i d'afirmació…, adverbi de manera *tard*: cap no canvia mai de forma.",
    "*Corre i salta, però no camines!: conjuncions *i* i *però* unixen oracions; el *no* és adverbi de negació.",
  ],
};

export const ACTS: Act[] = [
  {
    t: "La graella del text de la mare",
    d: "Classifiques les paraules subratllades d'un text literari en vuit categories.",
    ic: "lupa",
    fig: "paraules",
    nv: [
      {
        in: "Text (adaptat de *Coppelius, el creador d'autòmats*, de Rosa M. Colom): «**La** **mare** era **blanca** de pell **i** **amb** **els** cabells castany fosc que **formaven** espirals **i** **se** t'enganxaven **als** dits **quan** l'abraçaves. **Els** **ulls**, els tenia verds **com** una fulla d'arbre **i** **les** celles igual que **dos** semicercles fets amb un retolador **gruixut**.»",
        p: [
          "**a)** Completa la graella amb les paraules subratllades: Noms, Adjectius, Determinants, Pronoms, Verbs, Adverbis, Preposicions, Conjuncions.",
          "**b)** *Com* en «verds com una fulla» és adverbi, però també pot ser conjunció comparativa. Explica la prova que faries per a decidir-ho.",
          "**c)** Busca en el text dues paraules que siguen del mateix camp semàntic (parts del cos) i una de la mateixa família lèxica que *ull*.",
          "**d)** Reescriviu la primera oració canviant *mare* per *pare*: quantes paraules has de tocar? Marca-les totes i explica la concordància.",
        ],
        s: [
          "**a)** Noms: *mare, ulls* (i *pell, cabells, dits…* si no estan subratllats, valen). Adjectius: *blanca, gruixut* (i *verds*). Determinants: *la, els, les*. Pronoms: *se, t', l'*. Verbs: *formaven, tenia, abraçaves*. Preposicions: *amb, de*. Conjuncions: *i*. Adverbis: *com, igual* (en «igual que»).",
          "**b)** Si puc substituir-la per *semblant a* i introduix una comparació entre dos elements oracionals, funciona com a nexe; si només modifica l'adjectiu (*verds com*) i no introduïx cap verb, és adverbi de manera. Al text, «com una fulla d'arbre» comparar un sintagma: funciona de nexe comparatiu (per a moltes gramàtiques, preposició); el que importa és justificar la prova de substitució.",
          "**c)** Camp semàntic del cos: *ulls, celles, dits, pell…* (dous qualssevols). Família d'*ull*: *ulleta, ullals, ullopen*… (val *ulleta*).",
          "**d)** Cal tocar el determinant i l'adjectiu: «**El** **pare** era **blanc** de pell…». Concordància: el determinant i l'adjectiu copien el gènere i el nombre del nom; en pasar a masculí singular, *la → el*, *mare → pare*, *blanca → blanc*. Són tres canvis com a mínim.",
        ],
      },
      {
        in: "Mateix text, paraules subratllades: «**La** **mare** era **blanca** … **i** **amb** **els** cabells … que **formaven** espirals **i** **se** t'enganxaven … **quan** l'abraçaves.»",
        p: [
          "**a)** Completa la graella: Noms, Adjectius, Determinants, Pronoms, Verbs, Preposicions, Conjuncions (amb *quan*).",
          "**b)** Tria: *blanca* és un nom / un adjectiu / un verb. Justifica-ho amb el que copia.",
          "**c)** Passa *La mare era blanca* al masculí.",
        ],
        s: [
          "**a)** Noms: *mare, cabells, espirals*. Adjectius: *blanca*. Determinants: *la, els*. Pronoms: *se*. Verbs: *formaven, abraçaves*. Preposicions: *amb, de*. Conjuncions: *i, quan*.",
          "**b)** Adjectiu: acompanya i copia el nom *mare* (femení singular).",
          "**c)** *El pare era blanc.*",
        ],
        ad: "Traen la fila d'adverbis (la més difícil), el banc de subratllats es reduïx i l'apartat d'anàlisi de *com* desapareix.",
      },
      {
        in: "Banc de paraules del text: *mare, blanca, la, formaven, amb, i*.",
        p: [
          "**a)** Coloca cada paraula del banc en la seua columna: NOM · ADJETIU · DETERMINANT · VERB · PREPOSICIÓ · CONJUNCIÓ.",
          "**b)** Digues en veu alta per què *formaven* és un verb.",
        ],
        s: [
          "**a)** NOM: mare · ADJETIU: blanca · DETERMINANT: la · VERB: formaven · PREPOSICIÓ: amb · CONJUNCIÓ: i.",
          "**b)** Perquè indica allò que feien (acció) i pot canviar: *formava, formarem, formaven*.",
        ],
        ad: "El banc ja tria les paraules: només cal col·locar-les en sis columnes; la justificació és oral.",
      },
      {
        in: "Fitxes: MARE, BLANCA, FORMAVA, AMB. Caixes: NOM · ADJETIU · VERB · ALTRES.",
        p: [
          "**a)** Fes quatre montons amb les fitxes.",
          "**b)** Digues en veu alta el muntó on has posat AMB.",
        ],
        s: [
          "**a)** NOM: MARE · ADJETIU: BLANCA · VERB: FORMAVA · ALTRES: AMB.",
          "**b)** A la caixa ALTRES (és una preposició).",
        ],
        ad: "Quatre fitxes i quatre caixes; la preposició es queda en «altres» per a no carregar la classificació.",
      },
      {
        in: "El mestre diu tres paraules: «gossa», «bonica», «corre».",
        p: [
          "**a)** Assenya la targeta NOM si és un nom, la targeta ADJETIU si és un adjectiu o la targeta VERB si és una acció.",
          "**b)** Repetix el gest de *corre* amb el cos.",
        ],
        s: [
          "**a)** gossa → NOM; bonica → ADJETIU; corre → VERB.",
          "**b)** Còrrer amb el cos o amb el dit.",
        ],
        ad: "Targetes i cos: tres paraules, modelat oral, res escrit.",
      },
    ],
  },
  {
    t: "El fragment de Moccia",
    d: "Lliges un text narratiu i comptes, copies i anotau les categories.",
    ic: "libro",
    nv: [
      {
        in: "Fragment (adaptat de *A tres metres sobre el cel*, F. Moccia): «Una brisa lleugera mou les capçades dels arbres. Se sent sola i perduda. A esta hora és veritat. Té por. A la dreta, lluny, sent renillar uns cavalls. Estables perduts enmig de camps foscos. Es dirigix cap al xicotet far. Camina lentament, arran del mur, amb la mà recolzada sobre la tanca, atenta on fica els peus, entre matolls d'herba alta i silvestre. Hi pot haver escurçons? Un vell record del llibre de ciències la tranquil·litza. Els escurçons no ixen de nit. Però els ratolins, sí.»",
        p: [
          "**a)** De qui parla el text? Com ho saps si el nom del personatge no hi apareix mai?",
          "**b)** Copia tots els **adverbis de lloc** i tots els de **manera**.",
          "**c)** Quants **adjectius** hi ha en «sola i perduda», «camps foscos», «xicotet far», «herba alta i silvestre»? Conta'ls i enumera'ls.",
          "**d)** Anota tots els verbs de la primera conjugació (‑ar) i un d'una altra conjugació.",
        ],
        s: [
          "**a)** D'una xica: ho deduïm de les marques de femení dels adjectius (*sola, perduda, atenta*) que funcionen com a claus gramaticals del personatge.",
          "**b)** Lloc: *acà*, «a la dreta», «lluny», «enmig (de)», «cap al far», «arran del mur», «sobre la tanca»; temps: «de nit»; manera: *lentament*. (Es valora trobar *lluny* i *lentament*.)",
          "**c)** Sis: *sola, perduda, foscos, xicotet, alta, silvestre*.",
          "**d)** Són de primera conjugació, perquè l'infinitiu acaba en ‑ar: *renillar*, i també *camina* (caminar), *fica* (fixar) i *tranquil·litza* (tranquil·litzar). *Sent*, *té* i *ixen* no ho són.",
        ],
      },
      {
        in: "«Se sent sola i perduda. A la dreta, lluny, sent renillar uns cavalls. Camina lentament, arran del mur. Els escurçons no ixen de nit.»",
        p: [
          "**a)** Rodreja els adjectius: *sola* / *cavalls* / *perduda* / *mur*.",
          "**b)** Copia els dos adverbis que hi ha en el fragment (*lluny*, *lentament*) i digues què modifica cadascun.",
          "**c)** Tria: *ixen* és un nom / un verb.",
        ],
        s: [
          "**a)** *sola* i *perduda*.",
          "**b)** *lluny* modifica on sent els cavalls (lloc); *lentament* modifica com camina (manera).",
          "**c)** Un verb.",
        ],
        ad: "El text baixa a quatre frases, els adverbis estan acotats en l'enunciat i l'última pregunta és tancada.",
      },
      {
        in: "Banc: *sola, lentament, renillar, nit*.",
        p: [
          "**a)** Uneix cada fitxa amb la seua classe: ADJECTIU · ADVERBI · VERB · NOM.",
          "**b)** Digues en veu alta quin mot del fragment diu *com* camina la xica.",
        ],
        s: [
          "**a)** sola → ADJECTIU; lentament → ADVERBI; renillar → VERB; nit → NOM.",
          "**b)** lentament.",
        ],
        ad: "Quatre fitxes amb la classe donada i una pregunta oral de comprensió.",
      },
      {
        in: "Fitxes: SOLA, CAVALLS, CAMINA.",
        p: [
          "**a)** Posa cada fitxa en el montó que li tocare: COSA, QUALITAT, ACCIÓ.",
          "**b)** Fes el gest de *camina*.",
        ],
        s: [
          "**a)** SOLA → QUALITAT; CAVALLS → COSA; CAMINA → ACCIÓ.",
          "**b)** Gest de caminar.",
        ],
        ad: "Etiquetes semàntiques (cosa/qualitat/acció) en lloc de noms gramaticals.",
      },
      {
        in: "El mestre llig: «La xica camina lentament.»",
        p: [
          "**a)** Camina tu també a poc a poc mentre l'mestre llig.",
          "**b)** Repetix la frase assenyalant la paraula que diu COM camina.",
        ],
        s: [
          "**a)** Caminar pausat.",
          "**b)** «lentament».",
        ],
        ad: "Totalment oral i corporal; la meta es comprova assenyalant.",
      },
    ],
  },
  {
    t: "Variables o invariables",
    d: "Apliques la prova de la flexió per a separar uns grups d'altres.",
    ic: "puzzle",
    nv: [
      {
        in: "Llista: *blanc, aquell, per, molt, córrer, ahir, amb, les*.",
        p: [
          "**a)** Clasifica-les en variables i invariables i explica la prova que has fet a cadascuna.",
          "**b)** Aplia la prova del plural a *aquell* i la del temps a *córrer*: escriu les formes que eixixen.",
          "**c)** Per què *ahir* és invariable si es pot entendre de formes? Argumenta: una paraula és invariable quan…",
          "**d)** Inventa una oració amb un determinant demostratiu, un nom i un adjectiu, tot concordat en femení plural.",
        ],
        s: [
          "**a)** Variables: *blanc* (blanca/blancs), *aquell* (aquella/allò/allòs? —aquells), *córrer*→*corro, correries* (el verb és variable). Invariables: *per, molt, ahir, amb, les* — «molt» sembla variable (*molts*) per a *tot* és… Compte: *molts* eixix! Per tant **molt** és variable (quantitatiu): la llista correcta: variables = *blanc, aquell, molt, córrer*; invariables = *per, ahir, amb, les*.",
          "**b)** *aquell → aquells*; *córrer → corro/corries/correrem*.",
          "**c)** Quan no admet **cap** canvi de forma en cap context, no quan «no se'n veu cap». *Ahir* no fa *\\*ahirs* ni *\\*ahira*: invariable.",
          "**d)** Per exemple: *Aquestes hores noves…* — model: «Aquelles taronges madures omplin la caixa» (determinant + nom + adjectiu, femení plural).",
        ],
      },
      {
        in: "Llista: *blanc, per, molt, les*.",
        p: [
          "**a)** Fes dos llistes: les que canvien i les que no.",
          "**b)** Escriu el plural de *blanc* i un femení.",
          "**c)** Rodeja: *per* canvia de forma o no? *sí* / *no*.",
        ],
        s: [
          "**a)** Canvien: *blanc, molt* (molta/molts). No canvien: *per, les*.",
          "**b)** *blancs, blanca*.",
          "**c)** *no*.",
        ],
        ad: "Quatre paraules, dues columnes i una prova tancada.",
      },
      {
        in: "Fitxes: GOSSES, PER, BLANCA, MOLT.",
        p: [
          "**a)** Posa-les en el montó CAMVIA o NO CAMVIA.",
          "**b)** Digues en veu alta per què *gosses* està en CAMVIA.",
        ],
        s: [
          "**a)** CAMVIA: gosses, blanca, molt. NO CAMVIA: per.",
          "**b)** Perquè ve de *gos/gossa*: si afegixo ‑os canvia.",
        ],
        ad: "Fitxes físiques i justificació oral.",
      },
      {
        in: "El mestre diu «gos». Tu dius «gossa» (cambi). Després diu «per»: no hi ha cambi.",
        p: [
          "**a)** Fes el gest de CANVI (espatles amunt i avall) amb les paraules que poden canviar; NO CANVI (palma única) amb les que no.",
          "**b)** Digues en veu alta una paraula que puga canviar.",
        ],
        s: [
          "**a)** gos → CANVI; per → NO CANVI; xica → CANVI; amb → NO CANVI.",
          "**b)** Exemple propi.",
        ],
        ad: "Tot amb gestos i una paraula produïda oralment.",
      },
      {
        in: "La targeta CANVI és verda; la targeta NO CANVI, roja.",
        p: [
          "**a)** El mestre llig: *llibre, sobre, roig*. Ensenya la targeta verda o roja.",
          "**b)** Digues el plural d'una de les que poden canviar.",
        ],
        s: [
          "**a)** llibre→verda; sobre→verda; roig→verda. Si el mestre diu *amb* o *ahir*: roja.",
          "**b)** Per exemple: *llibres*.",
        ],
        ad: "Dues targetes i un sol plural produït.",
      },
    ],
  },
  {
    t: "Els sis determinants",
    d: "Distinguis articles, possessius, quantitatius, demostratius, indefinits i interrogatius.",
    ic: "etiqueta",
    nv: [
      {
        in: "Oracions: 1) «**Les** taronges de la colla són grans.» 2) «**La seua** cosina ve de l'Alcúdia.» 3) «**Quatre** caixes ja estan plenes.» 4) «**Aquelles** moreres no es cullen.» 5) «**Alguns** veïns vindran a la vesprada.» 6) «**Quina** hora és?»",
        p: [
          "**a)** Classifica el determinant de cada oració: article, possessiu, quantitatiu, demostratiu, indefinit o interrogatiu.",
          "**b)** Explica quina diferència hi ha entre *aquelles* i *algunes* quant a precisió del que determinen.",
          "**c)** Canvia el determinant de la 3 per un altre de la mateixa mena i di què passa amb el nom.",
          "**d)** Escriu dues oracions noves: una amb un **possessiu** i una amb un **indefinit**, i assenya'ls.",
        ],
        s: [
          "**a)** 1) article; 2) possessiu; 3) quantitatiu; 4) demostratiu; 5) indefinit; 6) interrogatiu.",
          "**b)** *Aquelles* senyala amb precisió (indicà la situació respecte del parlant: lluny); *algunes* no diu quines, determinen amb poca precisió.",
          "**c)** Per exemple «**Vuit** caixes»: el nom seguix igual, *caixes*, perquè el determinant copia el nombre, no l'influïx. Si el canvi fora de quantitat singular (*una caixa*), el nom hauria de passar a singular: concordança.",
          "**d)** Resposta oberta concordada: «La meua germana estudia», «Unes quantes veïnes aplaudiren».",
        ],
      },
      {
        in: "Oracions: «**Les** taronges són grans.» «**La seua** cosina ve de l'Alcúdia.» «**Quina** hora és?»",
        p: [
          "**a)** Tria la mena de cada determinant: article / possessiu / interrogatiu.",
          "**b)** Canvia *Les* per *Aquelles*: què canvien de significat?",
          "**c)** Escriu una oració amb *molts* i assenya'l.",
        ],
        s: [
          "**a)** Les → article; La seua → possessiu; Quina → interrogatiu.",
          "**b)** *Aquelles* concreta quines taronges (les llunyanes); *les* no en fa selectives: són totes les del context.",
          "**c)** Per exemple: «Molts veïns van vindre.»",
        ],
        ad: "Tres oracions i triar entre les tres menes donades; el canvi de sentit es diu en una frase.",
      },
      {
        in: "Banc: *article (el, la) · possessiu (meua) · demostratiu (aquell)*.",
        p: [
          "**a)** Uneix cada fitxa amb la seua mena.",
          "**b)** Rodreja el demostratiu: *el* / *aquell* / *meua*.",
        ],
        s: [
          "**a)** el/la → article; meua → possessiu; aquell → demostratiu.",
          "**b)** *aquell*.",
        ],
        ad: "Tres menes amb un exemple cadascuna; unint i rodrejant.",
      },
      {
        in: "Fitxes: EL, LA MEUA, AQUELL.",
        p: [
          "**a)** El mestre diu «el que senyala, el que és meu, el que acompanya»: tu assenyes.",
          "**b)** Abraca la fitxa LA MEUA: els possessius són del que parla.",
        ],
        s: [
          "**a)** senyala → AQUELL; és meu → LA MEUA; acompanya el nom nu → EL.",
          "**b)** (gest).",
        ],
        ad: "Instruccions orals amb fitxes grans; una sola idea: el possessiu és «meu».",
      },
      {
        in: "El mestre diu: «el llibre», «el meu llibre», «aqueix llibre».",
        p: [
          "**a)** Assenya't a tu mateix quan sentes el que és teu; assenya el de lluny quan sentes el d'aqueix.",
          "**b)** Repetix «el meu llibre».",
        ],
        s: [
          "**a)** «el meu» → mà al pit; «aqueix» → braç estirat.",
          "**b)** Repetició oral.",
        ],
        ad: "Gestos i repetició; no hi ha classificació escrita.",
      },
    ],
  },
  {
    t: "Pronoms: dir-ho sense repetir",
    d: "Uses pronoms per a evitar repeticions i reconéixes a qui es referixen.",
    ic: "chat",
    nv: [
      {
        in: "Parells del llibre: 1) «Pep i Pau vindran demà. **Ells** duran fruita.» 2) «He amagat el llapis i ara no **el** trobe.» 3) «Les xiques van vindre i **les** he vistes.»",
        p: [
          "**a)** Di a qui o a què es referix cada pronom i reescriu l'oració sense ell (com tornaria a sonar?).",
          "**b)** Explica per què els pronoms són útils en un text: posa l'exemple del llapis.",
          "**c)** Substitueix el nom repetit per un pronom: «La Marta ama la Marta?» → «La Marta **s'**ama?» (pronom reflexiu). Comenta el canvi de significat.",
          "**d)** Escriu un diàleg de dues intervencions on el segon parlant use un pronom en lloc d'un nom llarg.",
        ],
        s: [
          "**a)** 1) *Ells* = Pep i Pau; sense pronom: «Pep i Pau vindran demà. Pep i Pau duran fruita.» 2) *el* = el llapis: «…ara no trobe el llapis.» 3) *les* = les xiques: «…i he vistes les xiques.»",
          "**b)** Eviten repeticions carregoses i fan el text més lleuger: «He amagat el llapis i ara no el trobe» sona millor que repetir *el llapis*.",
          "**c)** Sense el pronom reflexiu, «La Marta ama la Marta» és estrany i redundante; *s'ama* indica que l'acció recau sobre la mateixa subjecte… En este cas el pronom *s'* és reflexiu: el significat passa d'una repetició xocant a una oració natural amb subjecte i objecte idèntics.",
          "**d)** Per exemple: —«Has guardat els patins?» —«Sí, **els** he guardats al traster.»",
        ],
      },
      {
        in: "«Pep i Pau vindran demà. **Ells** duran fruita.» / «He amagat el llapis i no **el** trobe.»",
        p: [
          "**a)** Uneix cada pronom amb allò que substituir: *Ells* → …; *el* → …",
          "**b)** Reescriu la primera oració sense pronom i di què passa llegint-la.",
          "**c)** Completa amb un pronom: «Les ntaronges ja les he collides» → «He collides ___».",
        ],
        s: [
          "**a)** *Ells* → Pep i Pau; *el* → el llapis.",
          "**b)** «Pep i Pau vindran demà. Pep i Pau duran fruita»: sona repetitiu; el pronom ho arregla.",
          "**c)** «…les he collides.»",
        ],
        ad: "Dos exemples del llibre i una substitució guiada; la reescriptura només per a oir la repetició.",
      },
      {
        in: "Fitxes: ELLS · EL · LES. Caixes: PEP I PAU · LLAPIS · XIQUES.",
        p: [
          "**a)** Uneix la fitxa amb la caixa on va.",
          "**b)** Digues una frase amb «ells».",
        ],
        s: [
          "**a)** ELLS → Pep i Pau; EL → llapis; LES → xiques.",
          "**b)** Per exemple: «Ells juguen a pilota.»",
        ],
        ad: "Parelles físiques i una frase oral.",
      },
      {
        in: "Targetes: una imatge de dos xics (PEP I PAU) i un dit assenyalant (ells).",
        p: [
          "**a)** Ensensya la targeta que fa estalvis de «Pep i Pau».",
          "**b)** Fes el gest d'assenyalar dos amics i di «ells».",
        ],
        s: [
          "**a)** La del dit: ELLS.",
          "**b)** Gest + «ells».",
        ],
        ad: "Una sola equivalència, amb gest.",
      },
      {
        in: "El mestre diu: «El llapis». Després diu: «No ___ trobe».",
        p: [
          "**a)** Tria la targeta que va en el buit: *el* / *la* / *els*.",
          "**b)** Repetix la frase completa: «No el trobe».",
        ],
        s: [
          "**a)** *el*.",
          "**b)** «No el trobe.»",
        ],
        ad: "Tria de targeta i repetició coral.",
      },
    ],
  },
  {
    t: "Quatre oracions de deu paraules",
    d: "Produïx oracions llargues i identifica les categories que has usat.",
    ic: "lapiz",
    nv: [
      {
        in: "Consigna de producció lliure amb llista de verificació de categories (nom, adjectiu, determinant, pronom, verb, adverbi, preposició, conjunció).",
        p: [
          "**a)** Escriu quatre oracions de més de deu paraules cadascuna, cadascuna sobre un tema diferent (esport, música, natura, tecnologia).",
          "**b)** En cada oració, assenya amb colors distints un nom, un verb, un adjectiu i un adverbi.",
          "**c)** De quines categories n'has fet servir menys? Compta-ho en una taula de 8 files.",
          "**d)** Reescriu la que menys t'haja eixit afillada afegint-hi una conjunció i una preposició.",
        ],
        s: [
          "**a)** Resposta oberta; criteri: >10 paraules, sentit complet, ortografia.",
          "**b)** Es valora que l'alumne siga capaç d'assenyar cada categoria amb raó (no per colors cecs).",
          "**c)** Solén faltar pronoms i conjuncions: la taula ho farà visible; si n'hi ha 0 de cap, no compta com a oració completa.",
          "**d)** Per exemple: «Ahre va ploure molt **i** els xiquets **del** pati van eixir corrents.»",
        ],
      },
      {
        in: "Model: «La meua cosina de l'Alcúdia sempre porta taronges en la motxilla.» (9 paraules)",
        p: [
          "**a)** Copia el model i allarga'l fins a 10 paraules o més.",
          "**b)** Assenya un nom, un verb i un adjectiu de la teua oració.",
          "**c)** Quina categoria no has fet servir? Tria'n una i afegix-la.",
        ],
        s: [
          "**a)** Per exemple: «…i les reparteix entre els veïns.»",
          "**b)** *cosina* (nom), *porta* (verb), *meua* (adjectiu-possessiu o determinant, segons anàlisi: accepta).",
          "**c)** Per exemple el pronom *les* o la conjunció *i*.",
        ],
        ad: "Una sola oració des d'un model copiat; assenyar tres categories i completar-ne una de donada.",
      },
      {
        in: "Oració amb buits: «___ (determinant) gos ___ (verb) ___ (adverbi) pel ___ (nom).»",
        p: [
          "**a)** Completa els buits segons la marca que hi va.",
          "**b)** Llig en veu alta la teua oració.",
        ],
        s: [
          "**a)** «El gos corre ràpid pel carrer.» (accepta qualsevol opció de la classe indicada).",
          "**b)** Lectura en veu alta.",
        ],
        ad: "Estructura buidada amb la classe de cada paraula escrita dins del buit; l'ortografia no es penalitza.",
      },
      {
        in: "Bancos: EL/LA · CORRE/SAUTA · MOLT/POC · CARRER/TERRA.",
        p: [
          "**a)** Fes una oració triant una paraula de cada banc, en ordre.",
          "**b)** Llig-la en veu alta al company.",
        ],
        s: [
          "**a)** «El terra corre molt carrer» NO: cal triar un ordre amb sentit → «El carrer corre…» tampoc. Model vàlid: «El gos corre molt pel carrer» — el banc guia, l'ordre el posa l'alumne.",
          "**b)** Lectura oral.",
        ],
        ad: "Banc de quatre columnes d'on pillar; només una oració.",
      },
      {
        in: "Fitxes de colors: BLAU=nom, VERD=verb, GROC=adjectiu.",
        p: [
          "**a)** Colpeja la taula i digues una paraula de cada color.",
          "**b)** Digues les tres juntes i fes una oració.",
        ],
        s: [
          "**a)** Exemples: gat (azul), dorm (verd, groc) grossa (groc).",
          "**b)** «Gat grossa dorm» → «La gata grossa dorm.»",
        ],
        ad: "Producció oral amb colors com a suport; es corregeix l'article «la gat» en eixir.",
      },
    ],
  },
];
