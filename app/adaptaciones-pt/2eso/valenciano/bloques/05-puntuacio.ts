// Bloc 5 · Els signes de puntuació · Tema 1 de Valencià · Adaptacions PT · 2n ESO
// Cinco niveles por actividad: [0] 2n ESO, [1] 1r ESO, [2] 6è, [3] 5è, [4] 4t.

import type { Ap, Act } from "../tipos";

export const AP: Ap = {
  slug: "05-puntuacio",
  n: 5,
  t: "Els signes de puntuació",
  teoria: [
    "Els signes de puntuació són marques gràfiques que indiquen les **pauses** o l'**entönació** de les oracions d'un text. Són necessaris per a fer-ne comprensible el contingut i facilitar-ne la lectura. El **punt (.)** marca el final d'una oració, d'un paràgraf o d'un text. La **coma (,)** indica una pausa menor.",
    "La **coma** s'usa: **a)** per a separar els elements d'una enumeració o els membres d'una oració composta: *Identifica els determinants, els adjectius, els adverbis i els verbs*; **b)** quan hi ha un **incís**: *Esmenta, almenys, dues fórmules d'inici*; **c)** per a marcar el **vocatiu** i el destinatari d'una carta: *Escolta, Helena, jo no vull eixir. / Benvolgut amic,*. **Recorda**: mai no es posa coma entre el subjecte i el verb, ni entre el verb i els complements.",
    "El **punt i coma (;)** indica una pausa més llarga que la coma i més curta que el punt: separa elements d'una enumeració quan ja hi ha comes dins de cada element (*En concurs de poesia, Maria Molins; en disseny, Assumpció Fuster; en cartells, Josep Roig*) o dues oracions estretament relacionades pel sentit. Els **dos punts (:)** introduïxen una enumeració, un exemple (*No he parat: ordenar l'habitació, traure la pols, baixar el fenestre…*) o una **citació textual** (*La jutgessa va dir: «En conseqüència…»*).",
    "Els **punts suspensius (…)** —sempre tres, no més— indiquen omissió o suspens: *Hi podem trobar romaners, pins, ullastres, ginebres…*. El **signe d'exclamació (!)** i el **d'interrogació (?)** marquen entönació i només se'n posa un, al final de l'expressió: *Quina calor! / On has anat de vacances?* En valencià, com en castellà, s'obri i es tanca… però llibres i premsa solen usar-ne només el de tancament: respecta el que decidisca el teu text, sempre que siga coherent.",
    "El **guió llarg (—)** té dos feines: indica les **intervencions dels personatges** en un diàleg i els **incisos del narrador**. S'escriu unit a la primera i a l'última paraula de l'incís, sense espai entre paraula i guió; si el segon guió coincidix amb un punt final, no es posa: *—No em pots fer això —li contestà Anna, enfurida—. Ets un mentider, i no et mereixes l'estima de ningú!*",
    "Fig:puntuacio",
  ],
  ej: [
    "*Va vindre, va vore i va vèncer*: comes que separen verbs d'una enumeració; l'últim va unit amb *i* sense coma.",
    "*Mira, Paco, que et drogues*: *Paco* és vocatiu i va entre comes (coma abans i després).",
    "*—On vas? —li va preguntar—. Respon.*: dues intervencions amb guió llarg; l'incís del narrador va entre guions i sense espais.",
  ],
};

export const ACTS: Act[] = [
  {
    t: "Anatomia d'un text puntuat",
    d: "Identifiques els signes d'un text literari i expliqueu la seua funció (llibre, act. 1).",
    ic: "lupa",
    fig: "puntuacio",
    nv: [
      {
        in: "Text (Mercè Canel i Garayoa, *El quadre de Monet*): «De fet, els vestits dels quaderns de la senyora Antonella els portaven dones diferents les unes de les altres: més altes, més baixes, més primes, més grasses, rosses, morenes, joves, grans… A sota hi havia el nom i la majoria hi sortien unes quantes vegades. Perquè la senyora Antonella, a més de ser molt bona modista, també era una gran retratista, i li agradava molt pintar. Si sortia a passejar, no es descuidava mai el bloc i la capsa d'aquarel·les. —Hi ha gent que fa fotografies; jo m'estime més els pinzells —li havia explicat una vegada.»",
        p: [
          "**a)** Identifica els signes de puntuació del text (comes, dos punts, punt, punts suspensius, punt i coma, guió llarg) i explica quina funció fan en cada cas.",
          "**b)** Els punts suspensius de «joves, grans…»: què esten ometent i què li guanyen al text?",
          "**c)** «la senyora Antonella, a més de ser molt bona modista, també era…»: quina fa la coma ací? Què passaria si la levaras?",
          "**d)** El punt i coma del diàleg: per què no s'ha fet servir una coma o un punt?",
        ],
        s: [
          "**a)** Comes: pausa menor, incisos («De fet,», «a més de ser molt bona modista,»), enumeracions («més altes, més baixes…»). Dos punts: introduïxen l'enumeració d'exemples de dones. Punt: final d'oració i de paràgraf. Punts suspensius: omissió d'exemples (la llista podria seguir). Punt i coma: separa dues oracions estretament lligades dins la mateixa intervenció. Guió llarg: obri la intervenció dialogada de la senyora.",
          "**b)** Ometen més adjectius: la llista de dones continuaria (pèl-roges, menudes…). Guanyen agilitat i fan entendre que l'enumeració és oberta, no taxada.",
          "**c)** L'encapsulen un incís (una informació complementària entre comes). Si la levaras, l'oració quedaria mal unida i el lector podria llegir «la senyora Antonella també era» de seguit, perdent el matit.",
          "**d)** Perquè una coma fora massa pausa xicoteta per a dues oracions completes, i un punt tallaria massa la relació de contrast entre «gent que fa fotografies» i «jo m'estime els pinzells». El punt i coma manté la unió i marca la pausa mitjana.",
        ],
      },
      {
        in: "Mateix text, retallat: «…dones diferents les unes de les altres: més altes, més baixes, més primes… Perquè la senyora Antonella, a més de ser molt bona modista, també era una gran retratista. —Hi ha gent que fa fotografies; jo m'estime més els pinzells.»",
        p: [
          "**a)** Senya dos punts, punts suspensius, comes del incís i el guió de diàleg, i digues a què servix cada un.",
          "**b)** Què indica el punt i coma dins la intervenció?",
        ],
        s: [
          "**a)** Dos punts: abans d'una enumeració. Punts suspensius: la llista continua. Comes: envolten l'incís «a més de ser molt bona modista». Guió: parla un personatge.",
          "**b)** Separa dues oracions relacionades que contrasten: uns fan fotos; ella, pinzells.",
        ],
        ad: "Text més curt, sense la pregunta d'interpretació literària: només identificar i una raó.",
      },
      {
        in: "Tres signes en gran: **:** … **—**. Text: «…dones diferents: més altes, més baixes, més primes… —Hi ha gent que fa fotografies.»",
        p: [
          "**a)** Uneix cada signe amb la seua feina: *dos punts → abans de l'enumeració · punts suspensius → la llista continua · guió → algú parla*.",
          "**b)** Rodreja on acabaria la llista si llevàrem els punts suspensius: *després de «primes»* / *no s'acaba mai*.",
        ],
        s: [
          "**a)** Com a l'enunciat: cada signe, la seua feina.",
          "**b)** *després de «primes»*.",
        ],
        ad: "Tres signes, unions ja escrites a l'enunciat i una pregunta tancada.",
      },
      {
        in: "Fitxes grosses: PUNT · COMA · DIÀLEG (un guió). Frase: «La senyora pintava i passejava.»",
        p: [
          "**a)** On posaries una coma per a fer una llista de dues paraules més? Prova: «La senyora pintava, passejava…»",
          "**b)** Assenya la fitxa del signe que diu que una oració s'ha acabat.",
        ],
        s: [
          "**a)** «La senyora pintava, passejava i ballava»: coma entre els primers elements.",
          "**b)** El PUNT.",
        ],
        ad: "Signes amb noms quotidians (punt, coma, el de «parla algú»); model donat.",
      },
      {
        in: "El mestre llig una oració fent parades molt exagerades amb la veu.",
        p: [
          "**a)** Cada vegada que faces una parada, ensenya la fitxa PAUSA; quan la veu puga com una pregunta, la fitxa ?. ",
          "**b)** Di quins dos signes ha tingut el text del mestre.",
        ],
        s: [
          "**a)** Punt → fitxa PAUSA; interrogada → fitxa ?.",
          "**b)** El punt i el signe d'interrogació.",
        ],
        ad: "Puntuació com a parades de veu; targetes i oralitat.",
      },
    ],
  },
  {
    t: "Interrogacions i exclamacions",
    d: "Col·loques els signes ? i ! que falten (llibre, act. 2).",
    ic: "megafono",
    nv: [
      {
        in: "Oracions sense signe: 1) «On vas» 2) «Has fet els deures» 3) «Has vist com s'apagava la lluna de sobte» 4) «D'on venia tota aquella gent on anava» 5) «Que fred que fa» 6) «Auxili».",
        p: [
          "**a)** Posa els signes d'interrogació o exclamació que calguen i copia les oracions.",
          "**b)** La 3 pot portar dos signes. Explica per què i on van.",
          "**c)** La 4 té dos verbs: torna-la puntuant amb coma.",
          "**d)** Transforma 5 i 6 en oracions completes subjecte+verb, mantenint la seua entönació.",
        ],
        s: [
          "**a)** 1) «On vas?» 2) «Has fet els deures?» 3) «Has vist com s'apagava la lluna de sobte?» 4) «D'on venia tota aquella gent? On anava?» 5) «Que fred que fa!» 6) «Auxili!»",
          "**b)** Pot ser: «¿Has vist…?» amb obertura i tancament (estil castellanitzat/normalitzat) o interrogació + exclamació si qui parla, a més de preguntar, s'admira: «Has vist com s'apagava la lluna de sobte?!» — van al final de l'expressió.",
          "**c)** «D'on venia tota aquella gent, on anava?»",
          "**d)** 5) «Fa un fred que pela!» / «Quina calor!» 6) «Que algú em socórrega!» / «Doneu-me auxili!»",
        ],
      },
      {
        in: "Oracions sense signe: 1) «On vas» 2) «Has fet els deures» 3) «Quina calor» 4) «Vine ací».",
        p: [
          "**a)** Posa ? o ! on calga.",
          "**b)** Tria: la 4 és pregunta o ordre?",
        ],
        s: [
          "**a)** 1) ? 2) ? 3) ! 4) ! (o punt: és una ordre).",
          "**b)** Ordre (exclamativa enunciativa): per això no porta ?. ",
        ],
        ad: "Quatre oracions i un sol signe per oració; la dubtosa es tria.",
      },
      {
        in: "Fitxes: «On vas», «Quina por». Signes a part: ? i !",
        p: [
          "**a)** Posa el signe que sona: si ho preguntes, ?; si t'admires o crides, !.",
          "**b)** Fes la veu de pregunta i la veu d'admiració.",
        ],
        s: [
          "**a)** «On vas?» · «Quina por!»",
          "**b)** Entonació ascendent / exclamativa.",
        ],
        ad: "Fitxes físiques i entonació; sense escriptura.",
      },
      {
        in: "El mestre diu «On vas?» amb veu de pregunta i «Auxili!» amb veu d'espant.",
        p: [
          "**a)** Ensenya el dit assenyalant (pregunta) o els dos braços (crida).",
          "**b)** Repetix les dues frases imitant la veu.",
        ],
        s: ["**a)** Pregunta → dit; crida → braços.", "**b)** Imitació oral."],
        ad: "Només gestos i imitació de veu.",
      },
      {
        in: "Dues targetes: ? i !.",
        p: [
          "**a)** Llig «Quina festa» i tria la targeta.",
          "**b)** Fes-ho otra vegada canviant la veu: ara com una pregunta (perquè «Quina festa?» també pot preguntar).",
        ],
        s: ["**a)** !", "**b)** ?"],
        ad: "Una frase i dues lectures; la tria és la targeta.",
      },
    ],
  },
  {
    t: "Les comes malmeses",
    d: "Corregixes l'ús de la coma d'un text (llibre, act. 3).",
    ic: "verdad",
    nv: [
      {
        in: "Text amb errades: «Jordi, se sentia com un ministre en una roda de premsa. Va haver de demanar, calma tot i que a ell mateix encara li, tremolaven les cames i fins i tot la parla.»",
        p: [
          "**a)** Corregix el text: leva les comes mal posades i posa les que falten, si n'hi ha.",
          "**b)** Explica per què estava malament la coma entre «Jordi» i «se sentia».",
          "**c)** Reescriviu el text amb almenys un incís ben coma-t i un vocatiu ben coma-t: transforma'l en una acotació teatral.",
        ],
        s: [
          "**a)** «Jordi se sentia com un ministre en una roda de premsa. Va haver de demanar calma, tot i que a ell mateix encara li tremolaven les cames i fins i tot la parla.»",
          "**b)** Perquè separava el subjecte (*Jordi*) del verb (*se sentia*): **mai** coma entre subjecte i verb. La de «demanar, calma» tallava el verb del seu complement directe; la de «li, tremolaven», el pronom feble del verb.",
          "**c)** Per exemple: «—Senyors periodistes (vocatiu amb coma: «Senyors periodistes, tranquils»), mantinguem la calma —va demanar el periodista, tot i que li tremolaven les cames.»",
        ],
      },
      {
        in: "Mateix text amb errades. Recorda: mai coma entre subjecte i verb.",
        p: [
          "**a)** Leva les tres comes mal posades i copia el text.",
          "**b)** Digues quina coma separava «qui» de «què feia».",
        ],
        s: [
          "**a)** «Jordi se sentia com un ministre en una roda de premsa. Va haver de demanar calma, tot i que a ell mateix encara li tremolaven les cames i fins i tot la parla.»",
          "**b)** La de «Jordi, se sentia».",
        ],
        ad: "Només llevar comes (cap d'afegir), regla donada i identificació oral.",
      },
      {
        in: "Dues versions: A) «Jordi, se sentia bé.» B) «Jordi se sentia bé.»",
        p: [
          "**a)** Rodreja la versió correcta.",
          "**b)** Pica la taula quan el grup lligga en veu alta el nom sense coma de company.",
        ],
        s: [
          "**a)** La B.",
          "**b)** En B.",
        ],
        ad: "Triar entre dues versions i confirmació coral.",
      },
      {
        in: "Fitxa: QUI | QUÈ FA. Exemple: «Maria | menja».",
        p: [
          "**a)** Digues en veu alta dues oracions qui+què fa sense posar-hi res en mitj.",
          "**b)** Regla: entre QUI i QUÈ FA, mai… (ho diu el mestre).",
        ],
        s: ["**a)** «Maria menja», «El gos dorm».", "**b)** «…coma!»"],
        ad: "Regla oral amb fitxa-rectangle; l'alumne la completa cantant-la.",
      },
      {
        in: "El mestre escriu en la pissarra: «Pa, formatge i peres.»",
        p: [
          "**a)** Compta les comes que hi ha.",
          "**b)** Afig-hi una paraula més i copia la llista puntuada.",
        ],
        s: [
          "**a)** Una.",
          "**b)** «Pa, formatge, peres i galetes.»",
        ],
        ad: "Comptar i còpia amb ampliació guiada.",
      },
    ],
  },
  {
    t: "L'asterisc mut",
    d: "Substituïx els asteriscos per signes de puntuació (llibre, act. 4).",
    ic: "repaso",
    nv: [
      {
        in: "Continuació del text de l'act. 1, amb * en lloc de signes: «—Com ho puc fer per atrapar la llum com al quadre de la saleta* —li va preguntar un dia. La senyora Antonella va somriure. *Per començar hauries de pintar a l'oli* no amb aquarel·les* li va dir*. I de totes maneres* és molt difícil* se n'ha de saber molt* l'artista que va pintar l'original d'aquell quadre era tot un mestre*»",
        p: [
          "**a)** Copia el text substituint cada * pel signe que toca.",
          "**b)** Justifica la teua elecció en els dos darrers * de la darrera intervenció.",
          "**c)** Explica per què el darrer * pot portar punt després del guió i no abans.",
        ],
        s: [
          "**a)** «—Com ho puc fer per atrapar la llum com al quadre de la saleta? —li va preguntar un dia. La senyora Antonella va somriure. —Per començar, hauries de pintar a l'oli, no amb aquarel·les —li va dir—. I, de totes maneres, és molt difícil: se n'ha de saber molt; l'artista que va pintar l'original d'aquell quadre era tot un mestre.»",
          "**b)** El penúltim *: dos punts (o punt i coma) perquè «se n'ha de saber molt» explica i justifica «és molt difícil». El *: punt i coma perquè separa dues oracions contrastades i relacionades.",
          "**c)** Perquè la intervenció s'acaba ací: el guió de tancament fa les vegades del punt final, i la regla diu que no es dupliquen (el punt s'entén darrere del guió; en este cas, punt abans del guió de tancament dins del diàleg narratiu).",
        ],
      },
      {
        in: "Text amb *: «—Com ho puc fer per atrapar la llum com al quadre de la saleta* —li va preguntar un dia.» / «—Per començar hauries de pintar a l'oli* no amb aquarel·les* li va dir*.»",
        p: [
          "**a)** Canvia els * per signes (ajuda: el primer * tanca una pregunta; els darrers tanquen un incís).",
          "**b)** Digues a quin signe pertoca el «?» ací.",
        ],
        s: [
          "**a)** «—Com ho puc fer per atrapar la llum com al quadre de la saleta? —li va preguntar un dia.» / «—Per començar, hauries de pintar a l'oli, no amb aquarel·les —li va dir—.»",
          "**b)** El del final de la pregunta de l'exclosa.",
        ],
        ad: "Només dues frases, les pistes dins de l'enunciat.",
      },
      {
        in: "Una sola intervenció amb *: «—I tu* també vols pintar* li va dir». Banc: ? — ,",
        p: [
          "**a)** Completa amb el banc: «I tu*, també vols pintar* —li va dir.»",
          "**b)** Digues on va el guió llarg.",
        ],
        s: [
          "**a)** «I tu, també vols pintar? —li va dir.»",
          "**b)** Davant de «li va dir», sense espai.",
        ],
        ad: "Banc de tres signes i una frase muntada.",
      },
      {
        in: "Fitxes: ? / ! / — . Frase en gran: «On aneu».",
        p: [
          "**a)** Poseu les fitxes on toquen.",
          "**b)** Llegiu la frase final en veu alta.",
        ],
        s: ["**a)** On aneu? —(o «—On aneu?»).", "**b)** Lectura oral."],
        ad: "Fitxes físiques i lectura.",
      },
      {
        in: "El mestre llig: «—Bon dia! —va saludar la Marta.»",
        p: [
          "**a)** Repetix-la posant la veu on toca.",
          "**b)** Assenya amb el dit el tros que parla Marta.",
        ],
        s: ["**a)** Exclamativa.", "**b)** «—Bon dia!»."],
        ad: "Repetició i assenyalament del parlament.",
      },
    ],
  },
  {
    t: "El xat sense puntuar",
    d: "Reescriviu una conversa de mòbil amb majúscules i signes (llibre, act. 5).",
    ic: "chat",
    nv: [
      {
        in: "Xat (Roser, de 2n B, escriu a Mireia): «hola soc roser de 2nB 🙂 / hola qui t'ha donat el meu nombre / mirea com que és el seu… he pensat que potser li podem fer un [regal] juntes què et sembla / genial tens alguna idea / ella va comentar que li feien il·lusió uns patins / uns patins si no té ni idea de patinar 🛼 / potser vol aprendre de tota manera anem pensant i demà a l'hora del pati en parlem va!»",
        p: [
          "**a)** Reescriu la conversa completa amb els signes de puntuació, majúscules i accents que li falten.",
          "**b)** Separa les paraules del missatge de Roser («potser vol aprendre…») en oracions i posa-hi els punts.",
          "**c)** El «va!» final: quin signe repeteix i per què es pot mantindre?",
          "**d)** Un xat puntuat com un text formal: argumenta si val la pena puntuar igual en els dos canals.",
        ],
        s: [
          "**a)** «Hola! Soc Roser, de 2n B. / Hola! Qui t'ha donat el meu nombre? / Mireia, com que és el seu… He pensat que potser li podem fer un regal juntes. Què et sembla? / Genial! Tens alguna idea? / Ella va comentar que li feien il·lusió uns patins. / Uns patins! Si no té ni idea de patinar! 🛼 / Potser vol aprendre. De tota manera, anem pensant i demà, a l'hora del pati, en parlem, va!»",
          "**b)** «Potser vol aprendre. De tota manera, anem pensant i demà, a l'hora del pati, en parlem, va!» — quatre oracions (o tres, segons com s'uneixin amb comes).",
          "**c)** El de l'exclamació, que ja fa el signe; és una interjecció de complicitat coloquial (com «ei!»): manté el to del canal informal.",
          "**d)** Resposta oberta: el xat admet omissions i minúscules perquè el canal és immediat i el context, compartit; en un text formal el lector no pot preguntar, així que la puntuació garantix que s'entenga. Cada canal, la seua puntuació.",
        ],
      },
      {
        in: "Missatge: «hola qui t'ha donat el meu numero» i «demà a l'hora del pati en parlem».",
        p: [
          "**a)** Posa majúscules, accents i signes a les dues frases.",
          "**b)** Digues quants punts (o signes) ha menester el segon missatge per a ser clar.",
        ],
        s: [
          "**a)** «Hola! Qui t'ha donat el meu nombre?» / «Demà, a l'hora del pati, en parlem.» (o «Demà a l'hora del pati en parlem.»)",
          "**b)** Un punt final (mínim); les comes del circumstancial són opcionals.",
        ],
        ad: "Dos missatges curts i una reflexió oral sobre el nombre de punts.",
      },
      {
        in: "Frases del xat sense majúscula ni signe: «hola», «qui t'ha donat el meu numero», «genial».",
        p: [
          "**a)** Canvia la primera lletra a majúscula i posa el signe que sona (tu tries: ! o ?).",
          "**b)** Llig-ho en veu alta amb la seua veu.",
        ],
        s: [
          "**a)** «Hola!» — «Qui t'ha donat el meu nombre?» — «Genial!»",
          "**b)** Oral.",
        ],
        ad: "Una majúscula i un signe per frase; el signe es tria per so.",
      },
      {
        in: "Fitxes: «hola», «?» i «!».",
        p: [
          "**a)** Muntar: fitxa de paraula + fitxa de signe, i lligir-ho.",
          "**b)** Dir si la fitxa ? es pot fer servir per a preguntar (diu-ho al company).",
        ],
        s: ["**a)** «hola!» o «hola?» (les dues són bones).", "**b)** Sí."],
        ad: "Muntar targetes; es valora la conversa entre companys.",
      },
      {
        in: "El mestre diu el missatge: «Hola! Soc Roser.»",
        p: [
          "**a)** Copia'l en la llibreta coma eixix (majúscula i signe inclosos).",
          "**b)** Compta les lletres majúscules.",
        ],
        s: ["**a)** «Hola! Soc Roser.»", "**b)** Tres (H, S, R)."],
        ad: "Còpia d'un model i comptar majúscules.",
      },
    ],
  },
  {
    t: "Puntuar la descripció del pare",
    d: "Apuntes o reordenes un text descriptiu curt: la coma que respira.",
    ic: "oreja",
    nv: [
      {
        in: "Text sense puntuar (del bloc 4, text de la mare): «El meu pare era alt i prim i tenia les mans grosses de treballar quan nos contava històries la veu li eixia greu com un llom de terra llaurada i nosaltres callàvem».",
        p: [
          "**a)** Puntua el text: posa comes, punts i els dos punts que facen falta.",
          "**b)** L'última comparació («com un llom…»): quin signe li va abans i per què?",
          "**c)** Afig-hi un incís entre comes ampliant la descripció de les mans.",
          "**d)** Llegix el text puntuat a un company i comprova que respira on tocats.",
        ],
        s: [
          "**a)** «El meu pare era alt i prim, i tenia les mans grosses de treballar. Quan nos contava històries, la veu li eixia greu, com un llom de terra llaurada; i nosaltres callàvem.»",
          "**b)** Coma (o punt i coma davant de la conjunció: coma després de «greu»): la comparació és un incís explicatiu.",
          "**c)** Exemple: «les mans, plenes de cicatrius, grosses de treballar».",
          "**d)** Coavaluació: on fan pausa els lectors, hi ha signe.",
        ],
      },
      {
        in: "Text: «El meu pare era alt i prim i tenia les mans grosses quan nos contava històries la veu li eixia greu».",
        p: [
          "**a)** Posa un punt on acaba la primera idea i una coma on comença la segona.",
          "**b)** Llig-ho fent la pausa del punt.",
        ],
        s: [
          "**a)** «El meu pare era alt i prim i tenia les mans grosses. Quan nos contava històries, la veu li eixia greu.»",
          "**b)** Pausa clara en el punt.",
        ],
        ad: "Un punt i una coma; la pausa es comprova llegint.",
      },
      {
        in: "Tres blocs: [El meu pare era alt i prim] [tenia les mans grosses] [la seua veu era greu].",
        p: [
          "**a)** Ordena'ls fent un retrat i posa comes entre els trossos curts.",
          "**b)** Llig el teu retrat en veu alta.",
        ],
        s: [
          "**a)** «El meu pare era alt i prim, tenia les mans grosses, la seua veu era greu.»",
          "**b)** Pausa en cada coma.",
        ],
        ad: "Blocs ja escrits que només s'ordenen i separem amb comes.",
      },
      {
        in: "El mestre lig la descripció del pare fent les pauses.",
        p: [
          "**a)** Alça la mà quan sentes una pausa (i diràs: coma o punt?).",
          "**b)** Alça el dit quan la pausa siga llarga.",
        ],
        s: [
          "**a)** Pausa curta → mà oberta: coma.",
          "**b)** Pausa llarga → dit: punt.",
        ],
        ad: "Puntuació com a gest: escoltar i respondre.",
      },
      {
        in: "Dues fitxes: COMA (mà oberta) i PUNT (puny tancat).",
        p: [
          "**a)** Fes el gest de la fitxa quan el grup lligga una oració i tu decidixes la pausa.",
          "**b)** Canvia el torn: un company llig i tu fas els gestos.",
        ],
        s: [
          "**a)** Gest segons la pausa que la oració demane.",
          "**b)** Torn invers.",
        ],
        ad: "Gestos i torns; sense escriptura.",
      },
    ],
  },
];
