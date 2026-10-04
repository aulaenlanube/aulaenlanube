// Bloc 8 · Narrativa de tradició oral: rondalles i llegendes
// (llibre 2n ESO, U1 «Coneix la literatura · Educació literària», p. 28-30).
// Fotografiat i transcrit LITERALMENT per a l'aula PT (04-10): les qüestions
// dels exercicis 1 (p. 29) i 2 (p. 30) van copiades tal com estan al llibre —
// incloent-hi el punt final del 2.b) i la grafia «qüestions» del 1 — amb
// renglons amplis per a escriure la resposta a mà. L'activitat 3 (p. 30) porta
// un exemple ja fet i els models de fórmules d'inici i d'acabament del llibre
// (p. 28), i s'hi afegeix l'activitat 4 (representar de rondallaires).
// Cinc nivells: [0] 2n ESO base · [1] 1r ESO · [2] 6è · [3] 5è · [4] 4t.

import type { Ap, Act } from "../tipos";

export const AP: Ap = {
  slug: "08-narrativa-oral",
  n: 8,
  t: "Narrativa de tradició oral: rondalles i llegendes",
  teoria: [
    "Les **rondalles i les llegendes** són relats de **tradició oral**: són anònims, passen de generació en generació i servien per a explicar fets de la vida i de la mort, fenòmens meteorològics o accidents geogràfics, i per a donar a conéixer costums i valors. Moltes tenen caràcter universal: trobem versions diferents en pobles, cultures i llengües distintes.",
    "A Europa, a finals del segle XVIII i començaments del XIX, autors com els **germans Grimm** van posar per escrit contes de tradició oral popular, com ara el de *Blancaneu*, la *Bella dormint* o la *Caputxeta roja*. En el nostre entorn, els reculls més coneguts són els de Joan Amades, Antoni M. Alcover i, sobretot, **Enric Valor**, que va arreplegar el vocabulari i els relats de les nostres comarques.",
    "La **llegenda** naix d'un fet històric **real** al qual la imaginació popular incorpora elements meravellosos (el rei en Jaume, els atacs pirates, la convivència amb els musulmans...). Sol dir **on i quan** passen els fets.",
    "La **rondalla** partix d'un fet **imaginari** que pot contindre elements reals. L'argument és molt senzill, l'espai és indeterminat i el temps, passat; els personatges són **plans** (no canvien al llarg del relat): l'heroi, el fals heroi, la víctima, l'agressor, els ajudants, el donant de l'objecte màgic, la princesa... Tenen intenció al·liconadora i es classifiquen en: **d'animals** (protagonistes animals personificats; la fam sol ser el motiu del conflicte), **meravelloses** (éssers amb facultats sobrenaturals i objectes màgics) i **de costums** (persones corrents que resolen els conflictes sense intervencions meravelloses).",
    "Tant les llegendes com les rondalles presenten **elements característics**: l'esquema del llibre (p. 28) els resumeix així.",
    "Fig:esquema-rondalles",
    "RAW:<table><caption>Els models del llibre (p. 28): tria'n un de cada columna per a escriure el teu relat</caption><thead><tr><th>Fórmules d'inici</th><th>Fórmules d'acabament</th></tr></thead><tbody><tr><td>Això era una vegada...</td><td>...i visqueren una mala fi d'anys</td></tr><tr><td>Això era i no era...</td><td>...i encara són vius si no són morts</td></tr><tr><td>Açò diu que era...</td><td>...i catacric-catacrac, conte acabat</td></tr><tr><td>Ve't ací que en aquell temps...</td><td>Ací tens conte, d'altre n'hi ha (d'ús també habitual)</td></tr></tbody></table>",
    "Per què serveixen? Les fórmules, les repeticions d'expressions i les cries al lector ajuden a **memoritzar** el relat i a mantindre l'**atenció** de qui escolta: són la caixa d'eines del rondallaire professional (el *contacontes*), que a més fa servir la gestualitat, els canvis de veu per personatge, els titelles i altres objectes.",
  ],
  ej: [
    "*Això era una vegada...* és fórmula d'**inici**; *...i catacric-catacrac, conte acabat*, fórmula d'**acabament**. Les dues van al relat perquè el recorden qui el conta i qui l'escolta.",
    "*La flor del lliri blau* (p. 29) comença «Això era una família en la qual...»: variant de la fórmula d'inici. Té element màgic (la flor), personatges plans i regla del set → rondalla del grup **meravelloses**.",
    "La llegenda de **Rotlan** (p. 30) partix de llocs reals (el Puigcampana, la badia de Benidorm) i explica d'on ixen la obertura del cim i l'illa → **llegenda**: fet real + imaginació popular.",
  ],
};

// Les qüestions dels apartats van COPIATES TAL COM al llibre. Darrere de cada
// una, el marcador [[espai:N]] dibuixa N renglons per a escriure a mà
// (web: línies puntejades · PDF: huecos rayados del motor).
const Q = (q: string, n: number): string[] => [`**${q}**`, `[[espai:${n}]]`];

export const ACTS: Act[] = [
  {
    t: "Qüestions sobre «La flor del lliri blau»",
    d: "Activitat 1 del llibre (p. 29): llig la rondalla i respon les qüestions, copiades tal qual i amb renglons amplis per a escriure la resposta a mà.",
    ic: "libro",
    nv: [
      {
        in: "Llig la rondalla «**La flor del lliri blau**» (pàgina 29 del llibre) i respon les qüestions ací davall. Tens espai de sobres per a escriure a mà.",
        p: [
          "Rondalla: *La flor del lliri blau* — Adaptat de *Rondalles de la Ribera*. Ll. Torres i Ll. Giménez.",
          ...Q("a) Quina fórmula d'inici apareix en la rondalla?", 3),
          ...Q("b) Quins personatges hi apareixen? Qui és el protagonista? I l'antagonista? Quina característica té cada un?", 5),
          ...Q("c) Apareix cap element màgic? Quin?", 3),
          ...Q("d) Quines altres característiques de les rondalles hi identifiques?", 4),
          ...Q("e) A quin grup pertany aquesta rondalla?", 3),
        ],
        s: [
          "**a)** Comença «Això era una família en la qual...»: és una variant de la fórmula d'inici (com «Això era una vegada...»).",
          "**b)** Hi apareixen el pare (malalt), la mare, els set germans i una velleta. Protagonista: el germà més xicotet (bo, obedient, perdonador). Antagonista: el germà major (envejós: el mata per a quedar-se la flor). La velleta fa d'ajudant o *donant* de l'objecte màgic. Personatges **plans**: són així des del principi i no canvien.",
          "**c)** Sí: la flor del lliri blau, que cura el pare i que manté viu el xiquet soterrat; també la velleta que desapareix quan tornen a agrair-li-ho.",
          "**d)** Espai i temps indeterminats al principi, regla del set (set fills, set dies), repetició d'expressions (la flor del lliri blau; «Passa, passa...»), cançó que revela la veritat, final amb justícia i perdó.",
          "**e)** Al grup de les **meravelloses**: hi ha un objecte màgic (la flor) i un ésser quasi màgic (la velleta).",
        ],
      },
      {
        in: "Les mateixes cinc qüestions, però cadascuna porta l'inici de la resposta ja escrit. Completa la frase i prou.",
        p: [
          ...Q("a) Quina fórmula d'inici apareix en la rondalla?", 2),
          "La rondalla comença així: «...»",
          ...Q("b) Quins personatges hi apareixen? Qui és el protagonista? I l'antagonista? Quina característica té cada un?", 3),
          "Els personatges són ... . El protagonista és ... perquè ... . L'antagonista és ... perquè ... .",
          ...Q("c) Apareix cap element màgic? Quin?", 2),
          "L'element màgic és ... perquè ... .",
          ...Q("d) Quines altres característiques de les rondalles hi identifiques?", 3),
          "Una característica que he trobat és ... perquè ... .",
          ...Q("e) A quin grup pertany aquesta rondalla?", 2),
          "Pertany al grup de les rondalles ... perquè ... .",
        ],
        s: [
          "Mateixes solucions que al nivell anterior: la frase inicial ja donada és el suport d'expressió, no del contingut (veure solució del nivell 2n ESO).",
        ],
        ad: "Les cinc qüestions es mantenen; cada una porta l'inici de la frase-resposta escrit (andamiatge de l'expressió).",
      },
      {
        in: "Respon **només les qüestions a) i c)**, i després completa la frase de tancament. Les altres tres les treballem en veu alta a classe.",
        p: [
          ...Q("a) Quina fórmula d'inici apareix en la rondalla?", 3),
          ...Q("c) Apareix cap element màgic? Quin?", 3),
          "**Completa:** «El protagonista és ..., l'antagonista és ... i l'element màgic és ...»",
          "[[espai:2]]",
        ],
        s: ["a) «Això era una família...» (variant de fórmula d'inici) · c) la flor del lliri blau · Tancament: el germà xicotet · el germà major · la flor del lliri blau."],
        ad: "De 5 preguntes a 2 + una frase amb els tres mots clau: la mateixa comprensió amb menys càrrega d'escriptura; el que no s'escriu, es diu en veu alta.",
      },
      {
        in: "Veritable o fals. Llig cada frase, pensa i escriu **V** o **F** al costat. Després, en veu alta, digues per què.",
        p: [
          "**a)** La rondalla comença amb una fórmula d'inici: «Això era una família...». [[espai:1]]",
          "**b)** El protagonista és el germà major. [[espai:1]]",
          "**c)** Hi ha un element màgic: la flor del lliri blau. [[espai:1]]",
          "**d)** El germà xicotet estava mort de veritat. [[espai:1]]",
          "En veu alta: «Aquesta rondalla és d'animals, meravelloses o de costums?»",
        ],
        s: ["a) V · b) F (és el xicotet) · c) V · d) F (no havia mort: es va quedar amb la flor)."],
        ad: "Circunstàncies d'elecció binària en compte de resposta oberta; la classificació final es fa oralment.",
      },
      {
        in: "Tres preguntes orals amb dibuix. Respon-les de paraula mentre l'escoltes: tu dibuixes i el profe escriu.",
        p: [
          "📖 1. La rondalla comença dient «Això era...». Què passava a la família? Dibuiixa-ho.",
          "🌸 2. Troba la flor màgica: on és el dibuix de la flor? Pinta-la.",
          "🗣️ 3. Qui es porta malament i qui perdona? Digues-ho i posa'ls una etiqueta.",
        ],
        s: ["1) El pare està malalt i només el salva la flor del lliri blau · 2) el dibuix de la flor (el del llibre o un de fet per l'alumne) · 3) el germà major s'porta malament; el xicotet el perdona."],
        ad: "Canal oral i gràfic, sense escriptura: es manté la comprensió del text amb suport visual.",
      },
    ],
  },
  {
    t: "Qüestions sobre la llegenda de Rotlan",
    d: "Activitat 2 del llibre (p. 30): llig la llegenda (Rotlan i l'origen de l'illa de Benidorm) i respon les qüestions, copiades tal qual i amb renglons amplis.",
    ic: "lupa",
    nv: [
      {
        in: "Llig la llegenda «Rotlan i l'origen de l'illa de Benidorm» (Extret de <www.omnium.cat>, pàgina 30 del llibre) i respon ací davall.",
        p: [
          ...Q("a) Qui va ser Rotlan? Busca'n informació i digues quina relació té amb l'emperador Carlemany i amb la batalla de Roncesvalls.", 4),
          ...Q("b) On se situen els fets que narren la llegenda.", 2),
          ...Q("c) Resumix breument la història.", 5),
          ...Q("d) Quins elements reals hi apareixen? Quins d'imaginaris?", 4),
          ...Q("e) Quines altres característiques de les llegendes hi identifiques?", 4),
        ],
        s: [
          "**a)** Rotlan (Roldán/Roland) fou un paladí de l'emperador Carlemany, el seu cavaller més famós; segons la *Cançó de Rotlan*, va morir a la batalla de Roncesvalls (778) tocant el seu corn, l'olifant. Buscat en dues fonts: el text del llibre i una enciclopèdia o web de consulta.",
          "**b)** Al «rodal de Mediterrània» nostre: al cim del Puigcampana i a la badia de Benidorm (Alacant).",
          "**c)** Model de resum: Un gegant invulnerable, Rotlan, criat per una lloba, s'enamora d'una donzella. Una profecia diu que ella morirà quan els últims rajos del dia més llarg de l'any deixen d'il·luminar-la. Rotlan obri el cim d'un colp d'espasa per a guanyar uns instants de llum, però la donzella mor. Llença el tros de muntanya al mar i naix l'illa de Benidorm; per això el Puigcampana té eixa forma i per això l'illa hi encaixa.",
          "**d)** **Reals:** el Puigcampana, l'illa de Benidorm, la badia, l'obertura del cim visible hui, la posta de sol del dia de sant Joan, el caràcter mediterrani. **Imaginari:** el gegant criat per una lloba invulnerable, la profecia, l'amor que li dona l'obertura i l'illa, la desesperació que mou el colp.",
          "**e)** Explica un accident geogràfic real amb la imaginació popular; anomena llocs i temps concrets; hi ha un personatge llegendari (Rotlan, ja històric); es dirigeix a l'oient per a creure's el relat («Podeu imaginar-ne la desesperació?», «com tots els viatgers podeu comprovar»).",
        ],
      },
      {
        in: "Les mateixes cinc qüestions amb l'inici de la resposta ja escrit. Completa.",
        p: [
          ...Q("a) Qui va ser Rotlan? Busca'n informació i digues quina relació té amb l'emperador Carlemany i amb la batalla de Roncesvalls.", 3),
          "Rotlan va ser ... i per això surt en esta llegenda. Va morir a la batalla de ... , on lluitava al costat de ... .",
          "Fonts on ho he buscat: 1) ... 2) ...",
          ...Q("b) On se situen els fets que narren la llegenda.", 2),
          "Els fets passen a ... , vora la mar ... .",
          ...Q("c) Resumix breument la història.", 4),
          "Al començament ... . Després ... . Quan el sol es pon ... . Al final ... .",
          ...Q("d) Quins elements reals hi apareixen? Quins d'imaginaris?", 2),
          "De veritat hi ha ... . D'imaginació popular són ... .",
          ...Q("e) Quines altres característiques de les llegendes hi identifiques?", 3),
          "És una llegenda perquè explica ..., diu on i quan ..., i s'adreça al lector dient ... .",
        ],
        s: ["Mateixes solucions que al nivell 2n ESO; els connectors (al començament / després / al final) ja ordenen el resum."],
        ad: "Preguntes íntegres amb andamiatge: connectors d'ordenació i buits curts. La cerca de fonts (a) es guia amb una línia per a les dues fonts.",
      },
      {
        in: "Respon **b), d) i e)**, i per a la pregunta c) usa els quatre connectors del quadre. La pregunta a) la fem en veu alta entre tots.",
        p: [
          "**Connectors per al resum (c):** AL COMENÇAMENT · DESPRÉS · QUAN EL SOL ES PON · AL FINAL",
          "c) Resumix breument la història.",
          "[[espai:4]]",
          ...Q("b) On se situen els fets que narren la llegenda.", 2),
          ...Q("d) Quins elements reals hi apareixen? Quins d'imaginaris?", 3),
          ...Q("e) Quines altres característiques de les llegendes hi identifiques?", 3),
        ],
        s: [
          "b) Puigcampana i badia de Benidorm (Mediterrània alacantina). d) Reals: la muntanya, l'illa, la seua forma, la posta de sant Joan. Imaginaris: el gegant, la profecia, l'origen dels forats i l'illa. e) Explica un lloc real, diu on i quan, es dirigeix a l'oient.",
          "Oral (a): Rotlan = Rotlan de la Cançó de Rotlan, paladí de Carlemany, mort a Roncesvalls.",
        ],
        ad: "De 5 a 3+1 preguntes escrites; els connectors del resum van en un quadre separat; la de recerca es fa oralment al grup.",
      },
      {
        in: "Quatre afirmacions i un dibuix. Escriu V o F; després dibuiixa el Puigcampana i l'illa com diu la llegenda.",
        p: [
          "**a)** Rotlan era un gegant criat per una lloba. [[espai:1]]",
          "**b)** La llegenda conta una història d'amor. [[espai:1]]",
          "**c)** El colp d'espasa va tancar el cim. [[espai:1]]",
          "**d)** L'illa de Benidorm va nàixer d'un tros de la muntanya. [[espai:1]]",
          "Dibuiixa: el Puigcampana amb l'obertura i, davant, l'illa de Benidorm.",
          "[[espai:4]]",
        ],
        s: ["a) V · b) V · c) F (va fer un colp, va obrir-lo) · d) V. Dibuix: muntanya amb el forat al cim + illa a la badia, davant de l'obertura."],
        ad: "Resposta binària + un dibuix de comprovació en compte de resum escrit: la comprensió es mostra dibuixant el que la llegenda explica.",
      },
      {
        in: "Preguntes orals amb la imatge del Puigcampana de fons. Respon de paraula; el profe escriu el que digues.",
        p: [
          "⛰️ 1. On passa esta història? Ensenya-ho en la foto.",
          "🌅 2. Què fa Rotlan quan veu que el sol es pon? Digues-ho com si ho contares.",
          "💔 3. Què va passar després, que va nàixer l'illa?",
        ],
        s: ["1) Al Puigcampana, a la costa de Benidorm · 2) li dona un colp d'espasa al cim per a guanyar llum · 3) llença el tros de muntanya al mar i naix l'illa."],
        ad: "Canal oral amb suport fotogràfic: reconéixer el lloc i recontar els fets principals sense escriure.",
      },
    ],
  },
  {
    t: "Escriu la teua rondalla o llegenda",
    d: "Activitat 3 del llibre (p. 30): pregunta a la gent major una rondalla o llegenda i escriu-la amb les teues paraules, incloent-hi fórmules d'inici i d'acabament. Ací tens un exemple ja fet i els models de fórmules.",
    ic: "lapiz",
    nv: [
      {
        in: "Demana a la gent major que coneixes que et conte alguna rondalla o alguna llegenda. Escriu-la amb les teues paraules. Inclou fórmules d'inici i d'acabament.",
        p: [
          "**MODELS DE FÓRMULES D'INICI** (tria'n una i posa-la al principi): «Això era una vegada...» · «Això era i no era...» · «Açò diu que era...» · «Ve't ací que en aquell temps...»",
          "**MODELS DE FÓRMULES D'ACABAMENT** (tria'n una i posa-la al final): «...i visqueren una mala fi d'anys» · «...i encara són vius si no són morts» · «...i catacric-catacrac, conte acabat» · «Ací tens conte, d'altre n'hi ha»",
          "**EXEMPLE JA FET** (una rondalla d'animals escrita «amb les teues paraules», com demana el llibre):",
          "*La fam del conet* — Això era i no era un conill que tenia una fam de tres dies. Va trobar una coa de napa mig tapada per la terra i, just quan començava a estirar, li va eixir un caragol del forat dient: «Deixa-la, que és la meua casa!». El conill, que no era gosat però tenia molt de finura, va canviar la coa de napa per tres fulles tendres del hort del costat, i el caragol li va ensenyar on hi havia el napar complet. Van menjar fins a rebentar. I encara són vius si no són morts.",
          "**Per què és vàlid l'exemple?** Obri amb fórmula d'inici, conta uns fets senzills amb un animal personificat (la fam causa el conflicte, com diu la teoria), i es tanca amb fórmula d'acabament. La taula de fórmules d'ací dalt te les posa fàcils: copia la tria en els renglons de cada pas.",
          "**Títol de la teua rondalla o llegenda:**",
          "[[espai:1]]",
          "**Inici** (comença amb la fórmula que has triat):",
          "[[espai:3]]",
          "**Part central** (conta els fets amb les teues paraules: qui són, què passa, com es resol):",
          "[[espai:6]]",
          "**Acabament** (tanca amb la fórmula d'acabament triada):",
          "[[espai:2]]",
        ],
        s: [
          "Resposta oberta: no hi ha una solució única. Criteris de validació: ① fórmula d'inici al primer racó; ② els fets s'entenen (personatges, conflicte, resò); ③ fórmula d'acabament al final, lligada; ④ lletra llegible i majúscules on toca.",
          "Escriu la font: «Me la va contar ...» (gent major de la família, de la residència, del barri...). Si ningú no te'n conta cap, agafa'n una del recull d'Enric Valor o de la bibliotecària.",
        ],
      },
      {
        in: "Mateixa activitat amb les fórmules mig escrites: tu completes els forquets dels dos marcadors i redactes la història.",
        p: [
          "Tria i completa la fórmula d'inici: «Això era ...» o «Ve't ací que en ... temps...»",
          "[[espai:1]]",
          "Títol: [[espai:1]]",
          "Escriu la història: va a faltar solament el que tu inventes — quins personatges, quin problema, com es resol. Ací tens l'inici donat:",
          "«[Fórmula d'inici que has completat] ...»",
          "[[espai:5]]",
          "Completa la fórmula d'acabament i escriu-la al final: «...i visqueren ...» o «...i catacric-..., conte ...»",
          "[[espai:2]]",
        ],
        s: ["Oberta. Es valida: fórmula d'inici completable escrita sencera, història compresa, fórmula d'acabament escrita sencera. L'alumne només redacta el centre: l'arrencada i el tancament estan andamiats."],
        ad: "Les fórmules venen mig escrites (completar, no evocar-les de zero) i el relat es retalla a 5 renglons de nucli.",
      },
      {
        in: "Primer uneix cada fórmula amb la seua funció; després escriu la història triant-ne una de cada columna.",
        p: [
          "**UNEIX:** «Això era una vegada...» → INICI o ACABAMENT? | «...i catacric-catacrac, conte acabat» → INICI o ACABAMENT? | «...i encara són vius si no són morts» → INICI o ACABAMENT?",
          "[[espai:2]]",
          "**LA TEUA HISTÒRIA** — Títol: ______ · Personatges: ______ · Què passa: ______ · Com acaba: ______",
          "[[espai:4]]",
          "Escriu-la sencera començant per una fórmula d'inici i tancant amb una fórmula d'acabament:",
          "[[espai:4]]",
        ],
        s: ["Model de resposta de la unió: «Això era una vegada...» → INICI · «...i catacric-catacrac, conte acabat» → ACABAMENT · «...i encara són vius si no són morts» → ACABAMENT. Història: oberta, criteris del nivell base."],
        ad: "Andamiatge doble: primer un exercici de reconéixer (unir) les fórmules; el guió de quatre buits (títol, personatges, què passa, com acaba) ordena l'escriptura abans de redactar.",
      },
      {
        in: "Tria les fórmules, dibuixa la teua història i copia sols les dues frases que no poden faltar: l'inici i el final.",
        p: [
          "**Cerca i encerra en un cercle** la fórmula d'inici que vols (les de l'esquerra de la taula) i en un quadrat la d'acabament (les de la dreta).",
          "Dibuiixa la teua història ací baix: pot ser un animal amb fam, un gegant, una princesa, un objecte màgic...",
          "[[espai:6]]",
          "Sota el dibuix, copia les dues frases triades: Inici: ______ Final: ______",
          "[[espai:2]]",
        ],
        s: ["Oberta: el dibuix ha de correspondre's amb una història recontable; les dues frases copiades han de ser una fórmula d'inici i una d'acabament exactes."],
        ad: "La producció escrita es redueix a dues frases; el relat es mostra pel dibuix i es conta oralment.",
      },
      {
        in: "Conta la història a un company o companya: ell o ella posa la primera lletra de cada frase que entén. Les fórmules van de paraula en paraula.",
        p: [
          "1. Conta-la tu en veu alta, com un rondallaire: mira els teus companys, canvia la veu pels personatges.",
          "2. Comença sempre amb la fórmula d'inici que triïs i acaba sempre amb la fórmula d'acabament.",
          "3. Qui escolta: ensenya el dit quan sentes la fórmula d'inici i la mà oberta quan sentes la d'acabament.",
        ],
        s: ["Avaluació oral: la fórmula d'inici al principi, la fórmula d'acabament al final, i el centre de la història s'entén. El receptor ho valida amb el gest pactat."],
        ad: "Producció oral (és el format original de la tradició!): s'avalen les dues fórmules i la comprensió del recont, sense cap escriptura.",
      },
    ],
  },
  {
    t: "Fem de rondallaires",
    d: "Activitat 4 del llibre (p. 30): per grups, anotau títols, trieu-ne un, estudiéu-lo i representéu-lo a la classe, amb guió i checklist.",
    ic: "mascaras",
    nv: [
      {
        in: "Ara, per grups, fareu de rondallaires. Anoteu el títol d'unes quantes rondalles i trieu-ne una cada grup. Després d'estudiar-la bé, representeu-la a la classe.",
        p: [
          "**Anotem títols** (tants com pogueu, quatre com a mínim):",
          "[[espai:2]]",
          "**Triem** un títol i escrivim-lo ací, amb la font on el trobareu (llibre, web del recollidor, familiar):",
          "[[espai:1]]",
          "**Guions d'estudi** (repartiu-vos els papers: qui conta, qui fa els personatges, qui prepara el so o l'objecte):",
          "□ La història sencera, ordre inclòs □ Les fórmules d'inici i d'acabament, memoritzades □ Veus i gestos de cada personatge □ Un objecte o detall de vestuari □ Assajat dos voltes en veu alta",
          "**Dia de la representació:** davant la classe, fórmula d'inici → història → fórmula d'acabament. La resta del públic: aixeca el dit a l'inici i la mà oberta a l'acabament.",
        ],
        s: [
          "Rúbrica d'observació del professorat: ① tots els membres del grup intervenen ② la fórmula d'inici i la d'acabament apareixen exactes ③ la història s'entén sense el text a la mà ④ gestualitat i volum de veu. Autoavaluació del grup: quatre caselles = quatre punts.",
        ],
      },
      {
        in: "Per grups triau una rondalla d'una llista ja feta i repartiu-vos les targetes de veus. Assageu dues voltes i representau.",
        p: [
          "**Llista per a triar:** *La flor del lliri blau* · la llegenda de *Rotlan* · *Blancaneu* · la rondalla del conill i el caragol. El nostre títol triat:",
          "[[espai:1]]",
          "**Targetes de veus** (una per membre): NARRADOR O NARRADORA · PROTAGONISTA · ANTAGONISTA · AJUDANT/AJUDANTA · PERSONATGE DE FONS",
          "**Checklist d'assaig:** □ sabem l'inici □ sabem el final □ cadascú sap la seua frase □ assajats dos voltes",
        ],
        s: ["Mateixa rúbrica de representació que al nivell base; la cerca i l'anotació de títols ja ve donada per evitar el coll d'ampolla de la decisió."],
        ad: "L'elecció de títol es limita a una llista i el treball es reparteix en targetes de paper: cada membre té un rol visible.",
      },
      {
        in: "En grup de dos o tres, representau la rondalla del conill i el caragol de l'activitat anterior: les fórmules, de memòria; el que volgueu, inventat.",
        p: [
          "Repartiu veus: CONILL, CARAGOL i NARRADOR/NARRADORA.",
          "Assageu: inici → la fam → el bescanvi → el final → acabament.",
          "[[espai:2]]",
        ],
        s: ["Se valora: fórmula d'inici al començament, fórmula d'acabament al final i que s'entenga el conflicte (fam) i la resolució (bescanvi)."],
        ad: "El text ja el coneixen (exemple resolt de l'act. 3): no cal buscar-lo ni memoritzar-ne un d'nou; grup menut i rols fixos.",
      },
      {
        in: "Tu i un company o companya: imitau la ronda del conte que faça el profe. Quan digues «Això era...», entra tu; quan digues el final, totes dues mans amunt.",
        p: [
          "1. Escolta com el profe o la profa conta la rondalla.",
          "2. Tu fas els gestos: menjar (fam del conill), bescanviar les fulles, mans a la boca (menjar fins a rebentar).",
          "3. A la segona volta, diu amb ell o ella les fórmules d'inici i d'acabament.",
        ],
        s: ["Se valora la participació: gestos en els moments clau i repetir les dues fórmules al cor del final."],
        ad: "Participació gestual i coral dins del grup: no cal triar, estudiar ni memoritzar un text sencer.",
      },
    ],
  },
];
