// Bloc 4 · Els sintagmes · Tema 1 de Valencià · Adaptacions PT · 2n ESO
// Cinco niveles por actividad: [0] 2n ESO, [1] 1r ESO, [2] 6è, [3] 5è, [4] 4t.

import type { Ap, Act } from "../tipos";

export const AP: Ap = {
  slug: "04-sintagmes",
  n: 4,
  t: "Els sintagmes",
  teoria: [
    "Un **sintagma** és una paraula o un grup de paraules que fan una **funció** dins de l'oració. Fixa't: «La mare somreia» — tot el grup «La mare» fa la mateixa feina (qui somriu) que faria «Ella» sola. Totes les paraules del grup giren al voltant d'una de **nucli**, la que mana: si la trauras, el sintagma es trenca.",
    "**Segons la categoria gramatical del nucli**, distingim cinc classes de sintagmes. **Sintagma nominal (SN)**: el nucli és un nom o un pronom —*el **pare** de Miquel*, *cap d'**elles***, *tota la **classe***—. **Sintagma verbal (SV)**: el nucli és un verb —*no **anirem** a la biblioteca*, ***tinc** molta son*—.",
    "Fig:sintagmes",
    "**Sintagma adjectival (SAdj.)**: el nucli és un adjectiu —***vermell***, *un poc **cansat***, ***preocupat** pel medi ambient*—. **Sintagma adverbial (SAdv.)**: el nucli és un adverbi —***tard***, *molt **lluny** de ma casa*—. **Sintagma preposicional (SPrep.)**: no té nucli lexical propi; va format per una **preposició** seguida d'un sintagma nominal —*des de **ca** sa tia*, *sense **ganes***.",
    "El truc dels matrioshka: els sintagmes caben uns dins d'altres. A «**La mare** somreia **contenta** **tot el matí** **al costat de la finestra**» hi ha un SN (La mare), un SV que abarca tota la resta (somreia contenta…), un SAdj (contenta), un SAdv (tot el matí) i un SPrep (al costat de la finestra) dins del qual s'amaga un altre SN (la finestra).",
  ],
  ej: [
    "*no anirem a la biblioteca*: el nucli és *anirem* (verb), així que tot el sintagma és **SV**; «a la biblioteca» és un SPrep que hi penja dins.",
    "*un poc cansat*: nucli = *cansat* (adjectiu); *un poc* l'acompanya → **SAdj.**",
    "*sense ganes*: preposició *sense* + SN *ganes* → **SPrep.**, encara que siga de només dues paraules.",
  ],
};

export const ACTS: Act[] = [
  {
    t: "Cinc caixes, cinc sintagmes",
    d: "Identifiques la classe de sintagma pel nucli, amb exemples del llibre.",
    ic: "puzzle",
    fig: "sintagmes",
    nv: [
      {
        in: "Sintagmes del llibre: 1) *el pare de Miquel* · 2) *tinc molta son* · 3) *un poc cansat* · 4) *molt lluny de ma casa* · 5) *des de ca sa tia* · 6) *cap d'elles*.",
        p: [
          "**a)** Subratlla el nucli de cada sintagma i digue'n la classe (SN, SV, SAdj., SAdv., SPrep.).",
          "**b)** El 5 i el 2 contenen altres sintagmes dins: descompon-los (p. ex. *des de [ca sa tia]₍SN₎*).",
          "**c)** Inventa un sintagma de cada classe i escriu-los en una llista vertical.",
          "**d)** Per què *cap d'elles* és nominal si la última paraula («elles») és un pronom i no un nom? Resol el dubte amb la definició de nucli.",
        ],
        s: [
          "**a)** 1) SN (nucli: *pare*) · 2) SV (*tinc*) · 3) SAdj (*cansat*) · 4) SAdv (*lluny*) · 5) SPrep (*des de*) · 6) SN (*cap*, pronom nucli).",
          "**b)** 2) SV: *tinc* + [molta son]SN, i dins [molta son]: det + nom. 5) SPrep: *des de* + [ca sa tia]SN.",
          "**c)** Resposta oberta: per exemple — SN: *la meua cosina*; SV: *va cantar una cançó*; SAdj: *molt contents*; SAdv: *ací mateix*; SPrep: *per al concert*.",
          "**d)** Perquè el nucli del SN pot ser un **pronom** (la definició diu «nom **o pronom**»): a *cap d'elles*, *cap* és pronom indeterminat i mana, i *d'elles* hi penja com a SPrep.",
        ],
      },
      {
        in: "Sintagmes: 1) *el pare de Miquel* · 2) *tinc molta son* · 3) *un poc cansat* · 4) *des de ca sa tia*.",
        p: [
          "**a)** Subratlla el nucli i escriu la classe: SN · SV · SAdj · SPrep.",
          "**b)** Torna a fer-ho amb 6 sintagmes inventats? Escriu'n només dos, un de cada classe que tu triés.",
        ],
        s: [
          "**a)** 1) pare → SN · 2) tinc → SV · 3) cansat → SAdj · 4) des de → SPrep.",
          "**b)** Resposta oberta ben rotulada.",
        ],
        ad: "Quatre sintagmes en lloc de sis, sense anàlisi interna; la producció baixa a dos.",
      },
      {
        in: "Caixes etiquetades: SN · SV · SAdj · SAdv · SPrep. Fitxes: *la classe sencera*, *va riure molt*, *ben prompte*, *sobre la taula*, *fart de córrer*.",
        p: [
          "**a)** Fes dos sintagmes per caixa… per a començar, un per caixa, i justifica oralment on poses *va riure molt*.",
        ],
        s: [
          "**a)** SN: *la classe sencera*; SV: *va riure molt* (nucli: *riure*); SAdv: *ben prompte*; SPrep: *sobre la taula*; SAdj: *fart de córrer*. Justificació oral: «va riure molt» és SV perquè mana el verb.",
        ],
        ad: "Fitxes físiques, un sintagma per caixa i una sola justificació oral.",
      },
      {
        in: "Fitxes: *el gat* (SN dibuixat sencer), *dorm* (SV), *sobre la cadira* (SPrep).",
        p: [
          "**a)** Colpeja el nucli: on faries el colp més fort?",
          "**b)** Ordena les tres fitxes fent una oració i llig-la.",
        ],
        s: [
          "**a)** *gat*, *dorm*, *cadira*: els nuclis fan colp fort.",
          "**b)** «El gat dorm sobre la cadira.»",
        ],
        ad: "Només tres sintagmes ja rotulats; l'activitat és muntar l'oració.",
      },
      {
        in: "El mestre llig: «La meua mare camina lentament per la platja.»",
        p: [
          "**a)** Pica la taula quan sentes el verb (el nucli manaire).",
          "**b)** Assenya amb el dit el grup que diu on camina.",
        ],
        s: [
          "**a)** Pica en «camina».",
          "**b)** «per la platja» (SPrep).",
        ],
        ad: "Oral i corporal: picar i assenyalar; es diu la classe al final.",
      },
    ],
  },
  {
    t: "Descompon l'oració",
    d: "Reconegues els sintagmes que formen una oració i la seua funció.",
    ic: "arbol",
    nv: [
      {
        in: "Oració: «Les alumnes de 2n B van organitzar una exposició sobre mosaics romans en el pati de l'institut.»",
        p: [
          "**a)** Separa l'oració en dos grans sintagmes (SN i SV) i marca on comença i acaba cadascun.",
          "**b)** Dins del SV, identifica un SPrep i, dins d'ell, l'SN que l'acompanya.",
          "**c)** Canvia «en el pati de l'institut» per un SAdv: reescriu l'oració amb *ací* ben col·locada.",
          "**d)** Quants sintagmes en total? Compta'ls tots (els que caben dins també) i fes la llista.",
        ],
        s: [
          "**a)** SN: «Les alumnes de 2n B» · SV: «van organitzar una exposició sobre mosaics romans en el pati de l'institut».",
          "**b)** SPrep: «sobre mosaics romans» (i «en el pati de l'institut»); SN intern: «mosaics romans», «el pati de l'institut».",
          "**c)** «Les alumnes de 2n B van organitzar **ací** una exposició sobre mosaics romans.»",
          "**d)** SN subjecte (1) + SV (2) + SPrep «de 2n B» (3) dins del subjecte + SN «una exposició» (4) + SPrep «sobre mosaics romans» (5) + SPrep «en el pati de l'institut» (6) + SN «el pati de l'institut» (7) + SAdj? *romans* dins (8, opcional). Es valora el recompte raonat: entre 7 i 9 segons fins on descomponges.",
        ],
      },
      {
        in: "Oració: «La meua cosina guarda taronges al rebost de la iaia.»",
        p: [
          "**a)** Separa en SN i SV amb una barra: «… | …».",
          "**b)** Subratlla el SPrep que hi ha dins del SV.",
          "**c)** Digues quin sintagma podries substituir per un sol adverbi (p. ex. *ací*) i reescriu l'oració.",
        ],
        s: [
          "**a)** «La meua cosina | guarda taronges al rebost de la iaia.»",
          "**b)** «al rebost de la iaia» (SPrep).",
          "**c)** «La meua cosina guarda taronges **ací**.»",
        ],
        ad: "Una barra per a separar, un SPrep per a subratllar i la substitució ja exempleada a l'enunciat.",
      },
      {
        in: "Oració: «La iaia guarda taronges al rebost.» Targetes: QUI? / QUÈ FA? / QUÈ? / ON?",
        p: [
          "**a)** Uneix cada targeta amb el tros d'oració que correspon.",
          "**b)** Digues en veu alta quin tros és el verb.",
        ],
        s: [
          "**a)** QUI? → La iaia · QUÈ FA? → guarda · QUÈ? → taronges · ON? → al rebost.",
          "**b)** «guarda».",
        ],
        ad: "Preguntes-semàfor en lloc d'etiquetes gramaticals; unions amb fletxes.",
      },
      {
        in: "Oració: «El gat negre dorm al sofà.»",
        p: [
          "**a)** Assenya amb els dits: primer el qui, després el què fa, després on.",
          "**b)** Fes la prova de levar-lo: lleva «al sofà» i digues si l'oració seguix tenint sentit.",
        ],
        s: [
          "**a)** El gat negre → qui; dorm → què fa; al sofà → on.",
          "**b)** «El gat negre dorm»: sí, seguix sent oració; el SPrep era informatiu, no obligatori.",
        ],
        ad: "Oral i amb els dits; una prova que es respon en una frase.",
      },
      {
        in: "El mestre llig: «Els xiquets del barri juguen a la plaça.»",
        p: [
          "**a)** Bata aplaudiments: 1 quan sentes qui juguen, 2 quan sentes el verb, 3 quan sentes el lloc.",
          "**b)** Repetix la frase tocant el lloc.",
        ],
        s: [
          "**a)** 1 aplaudiment: «Els xiquets del barri»; 2: «juguen»; 3: «a la plaça».",
          "**b)** «…a la plaça.»",
        ],
        ad: "Aplaudiments comptats; cap escriptura.",
      },
    ],
  },
  {
    t: "Inventa amb l'estructura donada",
    d: "Construeixes oracions seguint una plantilla de sintagmes.",
    ic: "lapiz",
    nv: [
      {
        in: "Estructures del llibre (p. 27): 1) Det + nom + SPrep + verb + nom + SAdj. 2) Det + nom + *van arribar* + SAdv. 3) SAdv + SN + verb + Det + nom.",
        p: [
          "**a)** Inventa una oració per a cada estructura i rotula cada tros amb la seua etiqueta.",
          "**b)** Compara la teua oració 2 amb la d'un company: en què s'assemblen i en què es diferencien?",
          "**c)** Modifica l'estructura 1 afegint-hi un SAdj. al primer nom: escriu la nova oració.",
          "**d)** Inventa una cinquena estructura, barreja almenys 4 classes i intercanvia-la amb un company perquè l'complete.",
        ],
        s: [
          "**a)** 1) «La iaia de Xàtiva va cosir un vestit ben llarg.» 2) «Els excursionistes van arribar esgotats **tard**.» 3) «**A la vora del riu** els xiquets van mullar les sabates.» — amb tot rotulat.",
          "**b)** Resposta oberta: mateixa columna vertebral (Det+nom+van arribar), distint adverbi final.",
          "**c)** «La **menuda** iaia de Xàtiva…»; la plantilla eixix: Det + SAdj + nom + SPrep + verb + nom + SAdj.",
          "**d)** Resposta oberta; p. ex.: «SN + SPrep + verb + SAdv + SAdj.» → «La collita del mas es ven cara **ací** **i** ràpid.»",
        ],
      },
      {
        in: "Estructura: Det + nom + *van arribar* + SAdv. Model: «Els ciclistes van arribar prompte.»",
        p: [
          "**a)** Escriu la teua oració amb eixa estructura canviant el nom i l'adverbi.",
          "**b)** Subratlla el nucli del sintagma final.",
        ],
        s: [
          "**a)** Per exemple: «Les excursionistes van arribar esgotades…», compte: *esgotades* és adjectiu; millor: «van arribar **tard**».",
          "**b)** L'adverbi nucli: *tard*.",
        ],
        ad: "Una sola estructura amb model fet; es canvien dos peces.",
      },
      {
        in: "Banc per a l'estructura «Els ___ van arribar ___»: noms *xiquets, futbolistes, veïnes*; adverbis *tard, prompte, eixa nit*.",
        p: [
          "**a)** Completa l'oració triant una fitxa de cada columna.",
          "**b)** Llig-la en veu alta.",
        ],
        s: [
          "**a)** «Els futbolistes van arribar prompte.» (qualsevol combinació).",
          "**b)** Lectura oral.",
        ],
        ad: "Oració tancada amb dos buits i banc visual.",
      },
      {
        in: "Fitxes: els xiquets | van arribar | tard.",
        p: [
          "**a)** Muntar-les en ordre i lligir la frase.",
          "**b)** Canvia «tard» per la fitxa «prompte».",
        ],
        s: [
          "**a)** «Els xiquets van arribar tard.»",
          "**b)** «…van arribar prompte.»",
        ],
        ad: "Tres fitxes físiques, intercanviar una.",
      },
      {
        in: "El mestre diu: «Els xiquets van arribar…», i fa una pausa.",
        p: [
          "**a)** Completa en veu alta amb una paraula que diga COM o QUANT de temps després van arribar.",
          "**b)** Assenya amb el dit la paraula que has afegida.",
        ],
        s: [
          "**a)** «…tard», «…prompte», «…eixos dies».",
          "**b)** (Gest).",
        ],
        ad: "Pregunta incompleta oral i compliment gestual.",
      },
    ],
  },
  {
    t: "El truc del nucli: prova de substitució",
    d: "Aplicau la prova de canviar el sintagma per una sola paraula per a trobar-ne la classe.",
    ic: "verdad",
    nv: [
      {
        in: "Proves: si el grup es pot canviar per un NOM o PRONOM → SN; per un VERB → SV; per un ADJECTIU → SAdj.; per un ADVERBI (*ací, ahir, molt, així*) → SAdv.",
        p: [
          "**a)** Aplica la prova a «la nit passada», «sobre la cadira», «molt cansats» i «serà un desastre»: quina classe és cada grup?",
          "**b)** Per què «sobre la cadira» NO passa la prova de l'SN tot i tindre un nom dins? Explica-ho amb la preposició.",
          "**c)** Inventa un SPrep que es puga substituir per *ací* i un SN que es puga substituir per *això*: posa'ls en oracions.",
          "**d)** Un company diu que «molt» sempre és adverbi. Fes-li dos contraexemples amb «molt» de determinant i de nucli.",
        ],
        s: [
          "**a)** «la nit passada» → *ahir* (SAdv de temps, nucli *nit*… compte: tot el grup funciona com a adverbi temporal; com a sintagma, SAdv o SN temporal — accepta raonada); «sobre la cadira» → SPrep (nucli de funció locativa, substitueix *ací*); «molt cansats» → SAdj (substituïx *cansats*); «serà un desastre» → SV (nucli: *serà*).",
          "**b)** Perquè el grup **comença** per preposició: la preposició *sobre* encapçala i no es pot llevar; el nom és el nucli del sintagma **dins** del SPrep, no del grup sencer.",
          "**c)** Per exemple: «Deixa la motxilla **damunt de la tauleta** (= ací)» i «**Estos dos llibres nous** (= això) pesen molt.»",
          "**d)** Det: «Molts veïns aplaudiren» (acompanya un nom). Nucli/atribut: «Estic **molt**» no val; el contraexemple net és «Això és **molt**»*… La resposta esperada: com a pronom o determinant: «Molta aigua», «Vols molt?» — *molt* acompanyant nom = determinant; a «molt bé» és adverbi modificantd'altre adverbi. Qui diguera «sempre adverbi» oblida els determinants quantitatius *molta/molts*.",
        ],
      },
      {
        in: "Regla del tram: els grups es poden xicotetizar. «la meua germana petita» → «ella». «sobre la cadira» → «ací». «estava molt cansada» → «cansada».",
        p: [
          "**a)** Xicotetiza aquestos tres grups: «el gos del veí» → …, «cap al riu» → …, «van nanejar un gelat» → …",
          "**b)** Digues quina paraula va quedar de cada grup (la que mana).",
        ],
        s: [
          "**a)** «el gos del veí» → *ell* o *el gos*; «cap al riu» → *ací*; «van nanejar un gelat» → *van nanejar*.",
          "**b)** gos/ella, ací/riu, van nanejar.",
        ],
        ad: "La prova es dona ja feta en tres exemples i només cal imitar-la; sense nomenclatura SPrep.",
      },
      {
        in: "Fitxes grosses: «el meu gat gris» i «gato»; «al mercat» i «ací»; «va córrer molt» i «córrer».",
        p: [
          "**a)** Uneix cada parell: quina fitxa xicoteta substitueix la gran.",
          "**b)** Digues quin tros de la fitxa grossa era el que manava.",
        ],
        s: [
          "**a)** gat ↔ el meu gat gris; ací ↔ al mercat; córrer ↔ va córrer molt.",
          "**b)** gat, mercat, córrer.",
        ],
        ad: "Parelles visuals de substitució.",
      },
      {
        in: "El mestre diu «la meua amiga de Valéncia».",
        p: [
          "**a)** Substituïx-la en veu alta per una paraula sola.",
          "**b)** Assenya't a tu mateix o a l'amiga imaginary.",
        ],
        s: ["**a)** «ella».", "**b)** (Gest)."],
        ad: "Una sola substitució oral.",
      },
      {
        in: "Dues caixes: PERSONA/COSA i LLOC.",
        p: [
          "**a)** El mestre diu un grup («el gos roig», «dintre del calaix», «la meua motxilla»): tu el poses en la caixa de persona/cosa o de lloc.",
          "**b)** Digues per què «dintre del calaix» va on va.",
        ],
        s: [
          "**a)** gos roig i motxilla → persona/cosa; dintra del calaix → lloc.",
          "**b)** Perquè diu ON estan les coses, no què són.",
        ],
        ad: "Dues caixes semàntiques i una raó oral.",
      },
    ],
  },
  {
    t: "Ampliar o xicotetizar",
    d: "Expandixes un sintagma nu fins a la classe que se't demane.",
    ic: "paleta",
    nv: [
      {
        in: "Nuclis nus: *far* (per a fer un SN), *brillava* (per a un SV), *lluminós* (per a un SAdj), *lluny* (per a un SAdv).",
        p: [
          "**a)** Amplia *far* fins a un SN amb determinant i un adjectiu.",
          "**b)** Amplia *brillava* fins a un SV amb un SPrep de lloc.",
          "**c)** Amplia *lluminós* fins a un SAdj amb un adverbi de quantitat.",
          "**d)** Amplia *lluny* fins a un SAdv complet, com l'exemple del llibre (*molt lluny de ma casa*).",
        ],
        s: [
          "**a)** «El far xicotet», «Aquell far blanc».",
          "**b)** «brillava sobre la mar».",
          "**c)** «realment lluminós», «poc lluminós».",
          "**d)** «massa lluny del poble», «molt lluny de ma casa».",
        ],
      },
      {
        in: "Nuclis: *far*, *brillava*, *lluminós*.",
        p: [
          "**a)** Fes un SN amb determinant al davant de *far*.",
          "**b)** Amplia *brillava* afegint-li on.",
          "**c)** Amplia *lluminós* afegint-li «molt» o «poc».",
        ],
        s: [
          "**a)** «El far».",
          "**b)** «brillava sobre la mar».",
          "**c)** «molt lluminós».",
        ],
        ad: "Tres ampliacions d'una sola peça cadascuna.",
      },
      {
        in: "Fitxa: EL FAR. Fitxes addicionals: *xiquet*, *sobre la mar*, *molt*.",
        p: [
          "**a)** Fes l'oració més llarga que pugues amb totes les fitxes.",
          "**b)** Llig-la en veu alta.",
        ],
        s: [
          "**a)** «El far xiquet brillava molt sobre la mar.» (o sense afegir *brillava*: «El xiquet far…») — val la millor combinació possible.",
          "**b)** Lectura.",
        ],
        ad: "Ampliar movent fitxes físiques.",
      },
      {
        in: "El mestre diu «el far».",
        p: [
          "**a)** Fes-lo més llarg: afig una paraula que diga com és.",
          "**b)** Afig ara una que diga on.",
        ],
        s: [
          "**a)** «El far alt».",
          "**b)** «…sobre la mar».",
        ],
        ad: "Ampliació oral d'una paraula per torn.",
      },
      {
        in: "Dibuix: un far xicotet sobre la mar.",
        p: [
          "**a)** Di una oració mirant el dibuix.",
          "**b)** Afig-li tu una paraula de més.",
        ],
        s: [
          "**a)** Per exemple: «El far brilla».",
          "**b)** «El far llunyà brilla».",
        ],
        ad: "Des d'una imatge, sense nuclis abstractes.",
      },
    ],
  },
  {
    t: "Buscats: sintagmes en un text real",
    d: "Troba sintagmes reals en un text i classifica-los: caça de sintagmes.",
    ic: "semaforo",
    nv: [
      {
        in: "Paragraf: «El dimarts al matí, la classe de 2n B va fer una eixida al cim del Castellet. Des del camí, la vista de la Costera era impressionant: camps d'oliveres, teulades roges i, molt lluny, la mar. Els alumnes tornaren cansats però contents.»",
        p: [
          "**a)** Troba i copia un SPrep de temps, un SPrep de lloc i un SPrep d'origen/punt de vista.",
          "**b)** Copia tots els SN que tinguen determinant i digues quin tipus de determinant porta cadascun.",
          "**c)** Troba un SAdj i un SAdv i digues a quin sintagma pertanyen.",
          "**d)** Reescriu la primera oració canviant el SPrep de temps per un adverbi (*ahir*) i justificant el canvi de determinant si n'hi ha.",
        ],
        s: [
          "**a)** Temps: «El dimarts al matí» (o «al matí»); lloc: «al cim del Castellet», «des del camí» (origen: «Des del camí», «del mas»).",
          "**b)** «la classe» (article), «la vista» (article), «els alumnes» (article), «2n B» (possessiu numeral?). Es valora article com a determinant principal.",
          "**c)** SAdj: «cansats però contents», «impressionant» (atribut). SAdv: «molt lluny» (dins del parèntesi).",
          "**d)** «Ahir, la classe…»: l'adverbi *ahir* substitueix tot el SPrep de temps; no cal cap altre canvi. Si canviàvem «el dimarts» per «dimarts passat» també és SPrep→SAdv segons anàlisi: s'accepta raonat.",
        ],
      },
      {
        in: "Paràgraf retallat: «El dimarts, la classe va fer una eixida al cim. Des del camí, la vista era impressionant. Els alumnes tornaren cansats.»",
        p: [
          "**a)** Copia el SPrep de lloc.",
          "**b)** Rodreja el nucli del subjecte: *la classe* / *eixida*.",
          "**c)** Troba l'adjectiu i digues què qualifica.",
        ],
        s: [
          "**a)** «al cim» i «des del camí».",
          "**b)** *la classe*.",
          "**c)** *impressionant* (qualifica *la vista*) / *cansats* (els alumnes).",
        ],
        ad: "Text retallat i una pregunta tancada per a la cerca.",
      },
      {
        in: "Targetes: «DESMATEIXAT», «AL MATÍ», «ELS ALUMNES», «DE LA CLASSE».",
        p: [
          "**a)** Rodreja les dues fitxes que comencen per una preposició.",
          "**b)** Digues en veu alta què diuen (temps? lloc? possessió?).",
        ],
        s: [
          "**a)** «AL MATÍ» i «DE LA CLASSE».",
          "**b)** al matí → quan; de la classe → de qui.",
        ],
        ad: "Detectar SPrep perquè comença per preposició; lectura oral del sentit.",
      },
      {
        in: "El mestre llig «Els alumnes de la classe van anar al cim.»",
        p: [
          "**a)** Assenya el tros que comença per «de».",
          "**b)** Assenya el tros que comença per «a».",
        ],
        s: ["**a)** «de la classe».", "**b)** «al cim»."],
        ad: "Cerca per la primera lletra del tros; assenyalar, no escriure.",
      },
      {
        in: "Dibuix d'una excursió: xiquets, un camí, un cim, un sol.",
        p: [
          "**a)** Fes una oració assenyalant el dibuix.",
          "**b)** Afig-hi un tros que diga ON.",
        ],
        s: [
          "**a)** Per exemple: «Els xiquets miren el cim».",
          "**b)** «…des del camí».",
        ],
        ad: "Producció des d'una imatge.",
      },
    ],
  },
];
