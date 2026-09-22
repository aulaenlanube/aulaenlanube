// Bloc 2 · Llengua i societat: la diversitat lingüística · Tema 1 de Valencià
// Cinco niveles por actividad: [0] 2n ESO, [1] 1r ESO, [2] 6è, [3] 5è, [4] 4t.

import type { Ap, Act } from "../tipos";

export const AP: Ap = {
  slug: "02-diversitat",
  n: 2,
  t: "La diversitat lingüística",
  teoria: [
    "Al món n'hi ha unes **set mil llengües** i uns dos-cents estats. No van repartides a parts iguals: hi ha estats on se'n parlen centenars, com **Papua Nova Guinea** (més de 800) o **Indonèsia** (més de 700), i d'altres on només se'n parla una, com Islàndia o l'Uruguai. La **Llengua de Senyals**, els silbats i les llengües indígenes recorden que comunicar-se no és només cosa de veu i paper.",
    "La riquesa lingüística també es veu en els **alfabets**: l'alfabet **llatí** és el que fem servir nosaltres, però existeixen el grec, el **ciríl·lic** (rus, búlgar), l'àrab, l'hebreu, el japonés i el xinés, que no és un alfabet sinó milers de caràcters.",
    "De totes les llengües del món, només **nou** són parlades com a primera llengua per més de cent milions de persones: el xinés (1.116 milions), l'**espanyol** (460), l'anglés (374), l'hindi/urdu, l'àrab, el portugués, el bengalí, el rus i el japonés. La nostra llengua ocupa la posició **85** amb uns **huit milions** de parlants: no és de les més parlades, però sí de les que tenen més pes cultural per nombre de parlants en proporció.",
    "RAW:<table><caption>Llengües amb més de 100 milions de parlants (primera llengua), extret d'ethnologue.com</caption><thead><tr><th>Llengua</th><th>Parlants</th></tr></thead><tbody><tr><td>Xinés</td><td>1.116.000.000</td></tr><tr><td>Espanyol</td><td>460.000.000</td></tr><tr><td>Anglés</td><td>374.000.000</td></tr><tr><td>Hindi/Urdu</td><td>341.000.000</td></tr><tr><td>Àrab</td><td>250.000.000</td></tr><tr><td>Portugués</td><td>217.000.000</td></tr><tr><td>Bengalí</td><td>200.000.000</td></tr><tr><td>Rus</td><td>170.000.000</td></tr><tr><td>Japonés</td><td>140.000.000</td></tr></tbody></table>",
    "Aproximadament **la meitat** de les llengües del món estan en **perill d'extinció**. A Mèxic, de les 300 llengües que es parlaven en el segle xv només en queden 175, i d'estes només cinc les parlen infants: la resta desapareixeran quan moren els parlants majors. Una llengua mor per **invasions, colonitzacions o guerres**, o pel **prestigi** d'una altra llengua, que fa que els parlants l'adopten com a llengua de cultura considerant inferior la pròpia.",
    "A Europa se'n parlen unes **setanta**, agrupades en **famílies**. Les **indoeuropees** venen d'una llengua comuna antigua i es repartixen en branques: germàniques (anglés, alemany, suec), eslaves (rus, polonés), romàniques (català/valencià, espanyol, francés, italià, romanés), cèltiques (gal·lès, bretó), bàltiques, hel·lènica (grec) i il·líria (albanés). Fora de la família indoeuropea queden les **uralianes** (hongarés, finés, estonià), les **altaiques** (turc), les **caucàsiques**, la semítica (maltés) i una llengua aïllada: el **basc**, que no ve de cap família coneguda i ja es parlava abans del llatí.",
    "Fig:paraules",
    "A Espanya, a més de la nostra llengua, són oficials el castellà, el gallec, el basc i l'aranés. Totes, **excepte el basc**, són **romàniques**: provenen del **llatí** que van portar els romans (segle iii aC). La caiguda de l'Imperi (segle v) va fragmentar el llatí parlat, i l'aïllament dels regnes cristians del nord després de la invasió àrab (segle viii) va ahondar les diferències fins a donar les llengües actuals. El valencià, el castellà, el gallec, l'aranés, el portugués, el francés o l'italià són germans.",
  ],
  ej: [
    "L'espanyol té 460 milions de parlants com a primera llengua; el valencià/català, uns 8 milions: per això el llibre diu que ocupem la posició 85.",
    "Anglés i alemany són **germàniques**; valencià i portugués, **romàniques**: per això «mother/mutter» i «mare» s'assemblen entre els seus grups.",
    "El basc **no** és romànic: no ve del llatí, és una llengua prerromana supervivent, una llengua aïllada.",
  ],
};

export const ACTS: Act[] = [
  {
    t: "Les nou grans llengües",
    d: "Lliges la taula de parlants, compares xifres i traius conclusions.",
    ic: "etiqueta",
    nv: [
      {
        in: "Taula del llibre (p. 20): xinés 1.116.000.000 · espanyol 460.000.000 · anglés 374.000.000 · hindi/urdu 341.000.000 · àrab 250.000.000 · portugués 217.000.000 · bengalí 200.000.000 · rus 170.000.000 · japonés 140.000.000.",
        p: [
          "**a)** Ordena de major a menor les tres llengües de la taula que es parlaren en la nostra Comunitat: espanyol, valencià (que no ix en la taula, posició 85) i anglés. Quina conclusió traus sobre la posició del valencià?",
          "**b)** Quantes llengües de la taula superen els 300 milions de parlants? Anota-les i calcula quantes vegades el xinés triplica el segon.",
          "**c)** El portugués i el castellà compartixen família i quasi frontera, però no xifra: quantes diferències de milions hi ha entre ells?",
          "**d)** El llibre diu que el valencià ocupa la posició 85 amb 8 milions de parlants. Explica per què una llengua pot ser oficial i estar en perill, i per què la posició no ho diu tot.",
        ],
        s: [
          "**a)** Espanyol (460), anglés (374)… i el valencià lluny, a la posició 85 amb uns 8 milions: és la llengua de menys parlants de les tres, i per això cal mantindre-la i transmetre-la.",
          "**b)** Quatre: xinés, espanyol, anglés i hindi/urdu. El xinés (1.116) triplica amb escreix l'espanyol: 1.116 ÷ 460 ≈ 2,4… Atenció, el segon és l'espanyol, així que NO el triplica: el duplica quasi per dos i mig (2,43 vegades).",
          "**c)** 460 − 217 = 243 milions de diferència.",
          "**d)** Resposta oberta: l'oficialitat és un reconeixement legal, no una garantia d'ús; el que decidix el futur és si els infants l'aprenen i la parlen (recorda Mèxic: 175 llengües i només 5 amb infants). La posició 85 mesura només el nombre de parlants, no l'ús, la presència en mitjans, escola o xarxes.",
        ],
      },
      {
        in: "Taula (cinc llengües): xinés 1.116 milions · espanyol 460 · anglés 374 · àrab 250 · japonés 140.",
        p: [
          "**a)** Copia la llista ordenada de la primera a la última.",
          "**b)** Quina llengua de la llista té quasi la meitat de parlants que l'espanyol? Justifica amb la xifra.",
          "**c)** Digues les dues llengües que es parlen a la teua classe o al teu barri.",
        ],
        s: [
          "**a)** Xinés, espanyol, anglés, àrab, japonés.",
          "**b)** L'anglés: 374 quasi es el doble de… no, l'anglés (374) supera la meitat (230); el que té quasi la meitat del castellà (230) és el portugués si fóra a la llista; ací es pot acceptar anglés (molt més) o arab (250 ≈ mitja de 460: 230; la resposta esperada, doncs, és **àrab**).",
          "**c)** Resposta personal: valencià i castellà, o les que siguen.",
        ],
        ad: "La taula baixa a cinc files i desapareix el càlcul de diferències; la comparació és directa entre xifres de la mateixa llista.",
      },
      {
        in: "Taula simplificada: xinés 1.116, espanyol 460, anglés 374.",
        p: [
          "**a)** Rodeja la llengua amb més parlants: *xinés* / *espanyol* / *anglés*.",
          "**b)** Copia els números de men a major: … < … < …",
          "**c)** Quantes llengües de la llista es parlen a la Comunitat Valenciana? Respon amb un número.",
        ],
        s: [
          "**a)** Xinés.",
          "**b)** 374 < 460 < 1.116.",
          "**c)** Dues: espanyol i, si comptem el valencià fora del rànquing de la taula, cap més de la llista; la resposta esperada: **1** (espanyol).",
        ],
        ad: "Només tres dades, opcions tancades i un sol número; sense càlcul.",
      },
      {
        in: "Fitxes amb banderes: XINA, ESPANYA, REGNE UNIT. Fitxes amb xifres: 460M, 374M, 1.116M.",
        p: [
          "**a)** Unix cada bandera amb la seua xifra.",
          "**b)** Digues en veu alta quina xifra és la més gran.",
        ],
        s: [
          "**a)** Xina→1.116M, Espanya→460M, Regne Unit→374M.",
          "**b)** La de la Xina.",
        ],
        ad: "Manipulatiu amb fitxes i resposta oral; no cal lligir grans xifres.",
      },
      {
        in: "El mestre diu tres nombres: «quatre-cents seixanta», «tres-cents setanta-quatre», «mil-cent setanta».",
        p: [
          "**a)** Assenya amb el dit amunt si el número que sent dir és el de l'espanyol, i estirat si és el de l'anglés.",
          "**b)** Repetix en veu alta el número més gran que has sentit.",
        ],
        s: [
          "**a)** «Quatre-cents seixanta» → amunt (espanyol); «tres-cents setanta-quatre» → estirat (anglés).",
          "**b)** Mil-cent-setanta (el xinés).",
        ],
        ad: "Només escoltar i fer un gest; el nombre gran es repetix oralment.",
      },
    ],
  },
  {
    t: "Un món de llengües",
    d: "Comprenes el text sobre quantes llengües hi ha i discrimines vertader i fals.",
    ic: "libro",
    nv: [
      {
        in: "Text (adaptat del llibre, p. 20): «Al món existixen unes set mil llengües i, aproximadament, dos-cents estats. Hi ha estats on es parlen moltíssimes llengües, com ara Papua Nova Guinea, on se'n parlen més de 800, o Indonèsia, on se'n parlen més de 700. En uns altres, però, només se'n parla una, com ara Islàndia o l'Uruguai.»",
        p: [
          "**a)** Vertader o fals: «hi ha més llengües que estats». Justifica-ho amb les dues xifres del text.",
          "**b)** Per què l'autor cita Papua Nova Guinea i l'Uruguai? Què vol demostrar amb eixos dos exemples?",
          "**c)** A Mèxic es parlaven 300 llengües en el s. xv, ara 175 i només 5 les parlen infants. Explica amb una frase què passarà amb les altres 170.",
          "**d)** Redacta dues raons per les quals una llengua pot desaparéixer, preses del text.",
        ],
        s: [
          "**a)** Vertader: unes 7.000 llengües i uns 200 estats; en la majoria d'estats se'n parlen moltes.",
          "**b)** Perquè són els dos extrems: Papua Nova Guinea demostra que un sol estat pot conindre més de 800 llengües; l'Uruguai, que un altre en pot tindre una de sola. Els dos exemples serveixen per a veure que la diversitat no es repartix igual.",
          "**c)** Desapareixeran: si cap infant les aprén, moriran amb les persones majors que les usen.",
          "**d)** Per invasions, colonitzacions o guerres; i pel prestige d'una altra llengua, que fa que els parlants abandonen la pròpia considerant-la inferior.",
        ],
      },
      {
        in: "Text (adaptat): «Al món hi ha unes set mil llengües i uns dos-cents estats. Papua Nova Guinea té més de 800 llengües; l'Uruguai, una de sola.»",
        p: [
          "**a)** Vertader o fals: «hi ha més estats que llengües». Corregix la falsedat.",
          "**b)** Quin exemple mostra més diversitat: Papua Nova Guinea o l'Uruguai?",
          "**c)** Completa: la majoria de llengües del món estan en perill de …",
        ],
        s: [
          "**a)** Fals: hi ha més llengües (7.000) que estats (200).",
          "**b)** Papua Nova Guinea, amb més de 800.",
          "**c)** … d'**extinció** (desaparéixer).",
        ],
        ad: "Text retallat a dos frases, un sol vertader/fals i un complet amb la paraula clau donada al banco mental.",
      },
      {
        in: "Text curt: «Al món hi ha unes 7.000 llengües. Papua Nova Guinea en té més de 800.»",
        p: [
          "**a)** Rodeja: al món hi ha *7.000 llengües* / *200 llengües*.",
          "**b)** Rodeja: Papua Nova Guinea té més de *800* / *8* llengües.",
          "**c)** Uneix: Uruguai → una llengua; Indonèsia → …",
        ],
        s: [
          "**a)** 7.000 llengües.",
          "**b)** Més de 800.",
          "**c)** Indonèsia → més de 700 llengües.",
        ],
        ad: "Tot es fa rodejant entre dos opcions i unint, sense redactar.",
      },
      {
        in: "Dues targetes: un planeta amb el número 7.000 i un mapa amb el número 800.",
        p: [
          "**a)** L'mestre llig i tu assenyes la targeta del número que sent.",
          "**b)** Digues en veu alta: al món hi ha moltes llengües o poques?",
        ],
        s: [
          "**a)** «set mil» → targeta 7.000; «vuit-cents» → targeta 800.",
          "**b)** Moltes (unes set mil).",
        ],
        ad: "Escelta de targeta gran i resposta oral binària.",
      },
      {
        in: "El mestre ensenya un planeta ple de punts de colors i diu: «Cada punt és una llengua.»",
        p: [
          "**a)** Fes un punt de colors al paper: quants més puntes millor. Compta els teus punts i digues en veu alta quants n'has fet.",
          "**b)** Escolta: al món hi ha unes *set mil* llengües. Repetix el número en veu alta.",
        ],
        s: [
          "**a)** (Resposta lliure; es valora entendre que un nombre gran com 7.000 no es pot fer a puntets.)",
          "**b)** Set mil.",
        ],
        ad: "Activitat manipulativa i d'ecolàlia: dibuixar i repetir; sense text imprés.",
      },
    ],
  },
  {
    t: "Les famílies de llengües d'Europa",
    d: "Classifiques llengües en famílies amb l'esquema del llibre (p. 21).",
    ic: "arbol",
    nv: [
      {
        in: "Esquema del llibre: famílies → LLENGÜES → Indoeuropees (bàltiques, cèltiques, eslaves, germàniques, romàniques, hel·lènica, il·líria) / Altres famílies (uralianes, altaiques, caucàsiques, semítiques, llengua aïllada: basc).",
        p: [
          "**a)** En quina família i quin branca està el valencià? I el portugués i el francés? Anota els tres.",
          "**b)** L'anglés, l'alemany i el suec s'entenen entre ells millor que amb l'espanyol. Explica-ho amb la llengua de famílies i branques.",
          "**c)** El basc és una llengua aïllada. Què vol dir ací «aïllada»? Per què és especial en el mapa d'Europa?",
          "**d)** El hongarés i el finés NO són indoeuropeus. En quina família cauen i per què sorpren al visitor?",
          "**e)** Construeix el teu esquema: 15 llengües del llibre en targetes i 5 famílies; classifica-les i justifica tres col·locacions.",
        ],
        s: [
          "**a)** Romànica: valencià, portugués i francés són llengües **romàniques**, germanes que vindrien del llatí.",
          "**b)** Perquè anglés, alemany i suec són **germàniques**: compartixen una llengua comuna més recent; l'espanyol, en canvi, és romànic.",
          "**c)** «Aïllada» vol dir que no té família coneguda: no prové del llatí ni de cap llengua comuna identificada. És especial perquè és l'única supervivent prerromana d'Europa occidental.",
          "**d)** Són **uralianes**: no deriven del llatí ni de l'indoeuropeu i, per això, sonen tan diferents als nostres oïda.",
          "**e)** Classificació: romàniques (valencià, espanyol, francés, portugués, italià), germàniques (anglés, alemany, suec, danés), eslaves (rus, polonés), uralianes (hongarés, finés, estonià) i aïllada (basc). Justificació: la proximitat del lèxic bàsic i les terminacions (‑ció/-tion, ‑ment) marquen la romania.",
        ],
      },
      {
        in: "Llista de deu llengües: valencià, espanyol, francés, anglés, alemany, rus, hongarés, basc, italià, portugués.",
        p: [
          "**a)** Fes cinc grups (famílies) com a l'esquema del llibre.",
          "**b)** Digues quines dues d'estes són les més paregudes al valencià i per què.",
        ],
        s: [
          "**a)** Romàniques: valencià, espanyol, francés, italià, portugués. Germàniques: anglés, alemany. Eslaves: rus. Uralianes: hongarés. Aïllada: basc.",
          "**b)** L'espanyol i el portugués (i el francés): totes romàniques, del llatí, amb lèxic i terminacions molt pròximes.",
        ],
        ad: "Deu llengües en lloc de 15, només cinc famílies i sense la justificació del lèxic; la pareguda es tria intuïtivament.",
      },
      {
        in: "Quatre famílies grans amb dibuixos: romànica (llatina), germànica (roblet), eslava (neu) i Uralianes (bosc). Targetes: valencià, anglés, rus, hongarés, basc.",
        p: [
          "**a)** Coloca cada targeta en la seua família.",
          "**b)** Explica amb una frase per què el valencià va amb la lletra del llatí.",
        ],
        s: [
          "**a)** Romànica: valencià. Germànica: anglés. Eslava: rus. Uralianes: hongarés. El basc no va amb cap: anota'l en «aïllada».",
          "**b)** Perquè el valencià ve del llatí que parlaven els romans.",
        ],
        ad: "Quatre famílies i targetes físiques; el basc queda com a cas a part amb explicació oral.",
      },
      {
        in: "Caixes: LLATÍ (amb una imatge de Roma) i ALTRES (bosc). Targetes: valencià, portugués, basc.",
        p: [
          "**a)** Fes dos montons: del llatí i d'un altre origen.",
          "**b)** Digues en veu alta quin és l'extranyet.",
        ],
        s: [
          "**a)** Del llatí: valencià i portugués. Altre origen: basc.",
          "**b)** El basc, que no ve del llatí.",
        ],
        ad: "Només dos caixes i una pregunta oral: ve del llatí o no.",
      },
      {
        in: "El mestre ensenya les paraules: «mare», «mare», «mère», «mother».",
        p: [
          "**a)** Fes palmas o digues «sí» quan dues paraules se pareguen.",
          "**b)** Escolta el conte del senyor Llatí: «Tots venim d'ell, i de camí van eixir l'espanyol, el valencià i el francés.» Digues en veu alta dues llengües germanes.",
        ],
        s: [
          "**a)** «mare» (valencià) i «mare» (italià) se pareguen → sí; «mother» va per una altra banda.",
          "**b)** Per exemple: valencià i espanyol.",
        ],
        ad: "Tot oral i rítmic: palmas i dos paraules del conte del mestre.",
      },
    ],
  },
  {
    t: "D'on ve el valencià?",
    d: "Ordenes els fets històrics que van fer nàixer les llengües romàniques.",
    ic: "lupa",
    nv: [
      {
        in: "Quatre fets del llibre (p. 21), desordenats: A) Caiguda de l'Imperi Romà (s. v dC) i fragmentació del llatí. B) Arribada dels romans a la península (s. iii aC) i adoptació del llatí vulgar. C) Invasió àrab (s. viii) i naixement de regnes cristians aïllats al nord. D) El llatí, única llengua comuna durant segles, donarà lloc a les llengües actuals.",
        p: [
          "**a)** Ordena'ls cronològicament i copia l'ordre amb lletres.",
          "**b)** Explica per què l'**aïllament** d'un territori afavorix que la llengua es divurca.",
          "**c)** Quina llengua de les oficials a Espanya NO ve del llatí i per què és un cas únic?",
          "**d)** Si el romà mai no haguera arribat, com creus que seria la llengua que parles hui? Raona la resposta en dos frases.",
        ],
        s: [
          "**a)** B, A, C, D.",
          "**b)** Perquè els grups separats deixen de parlar-se i cada comunitat conserva i transforma el seu llatí al seu modo; sense escola ni mitjans comuns que unificaren, les diferències creixen fins a fer llengües distintes.",
          "**c)** El **basc**: prerromànic, es parlava abans dels romans i va resistir; és una llengua aïllada, única supervivent d'aquell món anterior.",
          "**d)** Resposta oberta raonada: segurament parlariem alguna de les llengües prerromanes (com el basc), o una llengua portada per un altre poble; el fet històric decideix la llengua, no la biologia.",
        ],
      },
      {
        in: "Tres fets ordenats: arribada dels romans → llatí per tota la península → regnes cristians aïllats.",
        p: [
          "**a)** Numerosa'ls 1, 2, 3 segons quan van pasar.",
          "**b)** Tria: el valencià ve del llatí / del àrab.",
          "**c)** Quina llengua no ve del llatí? Elige: *català* / *basc*.",
        ],
        s: [
          "**a)** 1: arribada dels romans; 2: llatí comú; 3: regnes del nord.",
          "**b)** Del **llatí**.",
          "**c)** El *basc*.",
        ],
        ad: "Fets ja redactats en tres i només numerar; eleccions tancades.",
      },
      {
        in: "Tres làmines: (1) un soldat romà, (2) una mesquita, (3) un castell medieval.",
        p: [
          "**a)** Posa les làmines en l'ordre en què van passar.",
          "**b)** Di en veu alta: el valencià ve de la llengua del soldat o de la mesquita?",
        ],
        s: [
          "**a)** 1 (romans), 2 (invasió àrab), 3 (regnes cristians).",
          "**b)** De la llengua del soldat: el llatí.",
        ],
        ad: "Seqüència amb imatges i resposta oral d'una frase.",
      },
      {
        in: "Fitxa gran amb el llatí i tres sagetes: → valencià, → espanyol, → francés.",
        p: [
          "**a)** Assenya les sagetes: d'una sola mare llengua n'ixen tres filles. Repetix: «germanes».",
          "**b)** Abraca la fitxa: el valencià i l'espanyol són …",
        ],
        s: [
          "**a)** (Es repetix: germanes.)",
          "**b)** Germanes (llengües germanes).",
        ],
        ad: "Gest i repetició oral; concepte únic: germanes.",
      },
      {
        in: "El mestre conta: «Els romans van portar una llengua, el llatí. De tant de temps i de estar separats, eixa llengua va fer fills: valencià, castellà, francés…»",
        p: [
          "**a)** Assenya la targeta LLATÍ quan sentes el nom del pare d'unes llengües.",
          "**b)** Digues dos fills del llatí en veu alta.",
        ],
        s: [
          "**a)** A la menció de «llatina/llatina pare» → targeta LLATÍ.",
          "**b)** Per exemple: valencià i castellà.",
        ],
        ad: "Comprensió oral amb targeta i dos paraules produïdes.",
      },
    ],
  },
  {
    t: "Llengües que moren",
    d: "Interpretes les dades de l'extinció lingüística i valores la transmissió.",
    ic: "oreja",
    nv: [
      {
        in: "Dades del llibre (p. 20): Mèxic, s. xv: 300 llengües. Hoy: 175. D'estes, 5 les parlen infants.",
        p: [
          "**a)** Calcula quantes llengües han desaparegut a Mèxic i quin percentatge aproximat representen (orientatiu: 125 de 300 ≈ la quarta part de…).",
          "**b)** De les 175 supervivents, quante les parlen els infants? Què implica per als anys vinents?",
          "**c)** Busca i copia del text la frase que explica la causa final de la desaparició (la del prestige).",
          "**d)** Proposa dues accions perquè una llengua xicoteta no morisca.",
        ],
        s: [
          "**a)** 300 − 175 = 125 llengües menys, un poc menys de la meitat (42%).",
          "**b)** Només 5. Si cap xiquet les parla, la llengua està sentenciada: mourà amb els majors.",
          "**c)** «… al prestigi d'una llengua que fa que els parlants d'una altra l'adopten com a llengua de cultura en considerar inferior la pròpia.»",
          "**d)** Resposta oberta: parlar-la amb els fills, usar-la a l'escola i en xarxes, fer música i sèries en la llengua, donar-li ús públic i no averonyir-se'n.",
        ],
      },
      {
        in: "Dades: Mèxic tenia 300 llengües i ara en té 175; només 5 les parlen infants.",
        p: [
          "**a)** Quantes han desaparegut? Fes la resta.",
          "**b)** Quantes de les que queden aprenen els xiquets?",
          "**c)** Completa: si cap infant parla una llengua, aquesta …",
        ],
        s: [
          "**a)** 300 − 175 = 125.",
          "**b)** 5.",
          "**c)** … desapareixerà (morirà).",
        ],
        ad: "Només una resta i dues respostes curtes; el complement es completa d'una paraula.",
      },
      {
        in: "Fitxes: 300 → 175 → 5 (infants).",
        p: [
          "**a)** Ordena les fitxes de més llengües a menys.",
          "**b)** Digues en veu alta la xifra trista.",
        ],
        s: [
          "**a)** 300, 175, 5.",
          "**b)** 5 (només 5 les parlen xiquets).",
        ],
        ad: "Ordenar fitxes i una resposta oral.",
      },
      {
        in: "El mestre ensenya 10 dedals pintats i n'amaga 5: «Això fan les llengües: una a una s'amaguen.»",
        p: [
          "**a)** Amaga els teus dedals mentre l'mestre conta fins a 5.",
          "**b)** Di: les llengües moren si els xiquets les parlen o no les parlen?",
        ],
        s: [
          "**a)** (Joc de mans: queden 5 visibles.)",
          "**b)** Si els xiquets no les parlen.",
        ],
        ad: "Metàfora corporal i una pregunta oral binària.",
      },
      {
        in: "Una cançó en valencià (la del gegant del pi).",
        p: [
          "**a)** Canta la cançó amb el grup.",
          "**b)** Digues en veu alta: cantar en valencià ajuda a mantindre la llengua? Sí o no.",
        ],
        s: [
          "**a)** Cantada col·lectiva.",
          "**b)** Sí: usar-la és mantindre-la.",
        ],
        ad: "Experiència directa: cantar i respondre amb un sí/no.",
      },
    ],
  },
  {
    t: "Els alfabets del món",
    d: "Distinguis alfabets i escribes paraules en el teu codi.",
    ic: "lapiz",
    nv: [
      {
        in: "Text del llibre: «Aquesta riquesa lingüística afecta també la diversitat d'alfabets: l'alfabet llatí és el que utilitzem nosaltres, però també hi ha el grec, el ciríl·lic, l'àrab, l'hebreu, el japonés, el xinés, etc.»",
        p: [
          "**a)** Quin alfabet fem servir en valencià i quin en rus? Quin es llig dret a esquierda?",
          "**b)** El xinés no és un alfabet: explica per què el llibre el posa en la llista dels sistemes d'escriptura.",
          "**c)** Escriu el teu nom en l'alfabet que conegues, i busca en internet o la biblioteca com sonaria en ciríl·lic o grec (còpia'l com a decoració).",
          "**d)** Quatre mots del llibre: *alfabet, ciríl·lic, grec, xinés*. Ordena'ls segons si es fan servir en països limítrofs d'Espanya o no.",
        ],
        s: [
          "**a)** El **llatí** en valencià; el **ciríl·lic** en rus; l'**àrab** i l'hebreu es lliguen d'esquierda a dreta (o dreta a esquierda segons la convenció àrab: l'àrab, de dreta a esquierda).",
          "**b)** Perquè el xinés s'escriu amb milers de caràcters (logogrames), no amb unes poques lletres: es un sistema d'escriptura, tot i que no siga alfabet en sentit estricte.",
          "**c)** Resposta personal; es valora la recerca i la còpia acurada.",
          "**d)** De països limítrofs o propins: francès (grec? no)… Resposta: el **grec** no es fa servir en frontera; el **llatí** sí (Francia, Portugal — alfabet llatí); **ciríl·lic** no. Reorganitzat: limítrofes amb alfabet llatí: francès i portugués; la resta, no.",
        ],
      },
      {
        in: "Llista: alfabet llatí (nosaltres), ciríl·lic (rus), àrab.",
        p: [
          "**a)** Quin alfabet fem servir ací? Tria: *llatí* / *ciríl·lic*.",
          "**b)** Copia una paraula del revés (d'esquierda a dreta) per a vore el que significa escriure en altre sentit: *pau* → up.",
          "**c)** Posa la paraula «pau» en un paper i decora-la com si fóra àrab (roda la fulla).",
        ],
        s: [
          "**a)** Llatí.",
          "**b)** «up» — així es llig en sentit contrari; no és la paraula, és el sentit.",
          "**c)** Es valora la imitat del gest, no la correcció.",
        ],
        ad: "Un tria, una còpia al revés i joc decoratiu; sense terminologia.",
      },
      {
        in: "Targetes: LLETRES «abc», CERCLES «○○», ONDES «~».",
        p: [
          "**a)** Assenya la targeta del sistema amb què escrivim.",
          "**b)** Pinta amb el sistema de targetes la paraula «sol».",
        ],
        s: [
          "**a)** LLETRES.",
          "**b)** s-o-l.",
        ],
        ad: "Una assenyalament i escurar en tres lletres.",
      },
      {
        in: "L'mestre ensenya una imatge d'un carrer amb rètol en alfabet llatí i una altra amb rètol xinés.",
        p: [
          "**a)** Fes un cercle en la imatge que tú podries lligir.",
          "**b)** Digues: les dues imatges són carrers o boscos?",
        ],
        s: [
          "**a)** El rètol llatí.",
          "**b)** Carrers.",
        ],
        ad: "Cercle en una imatge i resposta oral d'una paraula.",
      },
      {
        in: "El mestre llig la paraula «aigua» i fa un dibuix d'una gota.",
        p: [
          "**a)** Escriu la paraula «aigua» sobre les línies.",
          "**b)** Fes-li un dibuix al costat.",
        ],
        s: [
          "**a)** aigua.",
          "**b)** (Dibuix lliure.)",
        ],
        ad: "Còpia d'una sola paraula sobre línies i dibuix.",
      },
    ],
  },
];
