// Ratgeber-Seiten. Themen und Fragen stammen aus der Keyword-Recherche (reports/keywords/keywords.json).
import { sgb5, sgb11, sgb9, ktRL, hmv, estg, bgb, sgg, hilfsmRL } from './recht';
// Häufige Suchanfrage (Keywords November 2026): „Rezept Gültigkeit“. Fassung der Richtlinie vom 20.02.2025, geprüft am 2.11.2026.
const REZEPT_GUELTIG = { q: 'Wie lange ist das Rezept gültig?', a: `28 Kalendertage ab Ausstellung. Beginnt die Versorgung im Sanitätshaus nicht innerhalb dieser Zeit, verliert das Rezept seine Gültigkeit. Geht der Antrag in dieser Zeit bei der Krankenkasse ein, ist die Frist gewahrt (${hilfsmRL('§ 8 Abs. 2')}). Ein Rezept aus dem Krankenhaus bei der Entlassung gilt nur bis sieben Kalendertage nach der Entlassung (${hilfsmRL('§ 6a Abs. 2')}).` };
const Z = 'mindestens 5 € und höchstens 10 €';
// Rechtsstand Oktober 2026 (Normen am 5.10.2026 auf gesetze-im-internet.de geprüft), ohne Gewähr. Texte dürfen Links aus recht.ts enthalten. Bei Änderungen der Regeln hier anpassen.
export type Guide = {
  slug: string; title: string; h1: string; description: string; lead: string;
  // steps: nummerierte Schritte, list: Aufzählung, after: Absätze nach der Liste. Alles darf Normlinks enthalten.
  sections: { h: string; p: string[]; steps?: string[]; list?: string[]; after?: string[] }[];
  faq: { q: string; a: string }[];
  buy?: { label: string; amazon: string }[];
  pflegebox?: boolean; hausnotruf?: boolean;
  finder: { href: string; label: string };
  // Schlüssel aus begriffe.ts: Kästen „Begriff erklärt“
  begriffe?: string[];
  // Tabelle „auf einen Blick“ (Zellen dürfen Normlinks enthalten)
  table?: { caption: string; head: string[]; rows: string[][]; note?: string };
  // „Vor Ort finden“: Städte mit mindestens 3 passenden Einträgen (nur indexierte Ortsseiten), Leistung (feature) oder Kategorie (cat)
  local?: { feature?: string; cat?: string; label: string; extra?: { feature: string; label: string } };
  related?: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: 'rollator-auf-rezept',
    title: 'Rollator auf Rezept: Was die Krankenkasse zahlt (2026)',
    h1: 'Rollator auf Rezept oder selbst kaufen?',
    description: 'Rollator auf Rezept: wer ihn verordnet, was die Krankenkasse zahlt, Zuzahlung, ob ein Pflegegrad nötig ist, Reparatur, Ablehnung und Widerspruch, und welcher Rollator für Wohnung und draußen passt.',
    lead: 'Einen Rollator bekommen gesetzlich Versicherte mit ärztlicher Verordnung von der Krankenkasse. Einen Pflegegrad brauchen Sie dafür nicht. Sie zahlen höchstens 10 € zu.',
    begriffe: ['hilfsmittel', 'zuzahlung', 'vertragspartner', 'genehmigungsfiktion'],
    sections: [
      { h: 'So bekommen Sie einen Rollator auf Rezept', p: [
        `Der Rollator ist ein Hilfsmittel der Krankenkasse (${sgb5('33', 'Abs. 1')} Satz 1). Im ${hmv} stehen Rollatoren in der Produktgruppe 10 (Gehhilfen) unter „fahrbare Gehhilfen“ (Positionsnummer 10.50.04). Diese Nummer muss nicht auf dem Rezept stehen, die Bezeichnung „Rollator“ und die Diagnose reichen.`,
      ], steps: [
        'Termin beim Hausarzt oder Orthopäden: Schildern Sie, wann und wo Sie unsicher gehen, ob Sie schon gestürzt sind und wie weit Sie ohne Pause kommen.',
        'Der Arzt stellt eine Verordnung aus, mit Diagnose und „Rollator“. Besondere Anforderungen (z. B. Körpergewicht über 130 kg, sehr schmal für die Wohnung) sollte er dazuschreiben.',
        `Gehen Sie mit dem Rezept innerhalb von 28 Tagen zu einem Sanitätshaus, das Vertragspartner Ihrer Kasse ist (${hilfsmRL('§ 8 Abs. 2')}, ${sgb5('33', 'Abs. 6')}). Unter den Vertragspartnern dürfen Sie frei wählen.`,
        'Das Sanitätshaus fragt bei der Kasse an oder gibt den Rollator direkt ab, stellt ihn auf Ihre Größe ein und erklärt Bremsen und Falten. Viele liefern auch nach Hause.',
        `Sie zahlen ab 18 Jahren die Zuzahlung im Sanitätshaus (${sgb5('33', 'Abs. 8')}). Den Rest rechnet das Sanitätshaus mit der Kasse ab.`,
      ] },
      { h: 'Was die Krankenkasse zahlt und was Sie zahlen', p: [
        `Die Kasse zahlt einen Rollator, der für Sie medizinisch notwendig ist, zu dem Preis, den sie mit dem Sanitätshaus vereinbart hat (${sgb5('33', 'Abs. 7')}). Sie zahlen 10 % des Preises zu, mindestens 5 € und höchstens 10 € (${sgb5('61')} Satz 1). Kostet der Rollator die Kasse 90 €, zahlen Sie also 9 €, bei 150 € die Höchstgrenze von 10 €.`,
        `Wünschen Sie ein Modell, das mehr kann als nötig, etwa einen besonders leichten Carbon-Rollator ohne medizinischen Grund, zahlen Sie die Mehrkosten und dadurch höhere Folgekosten selbst (${sgb5('33', 'Abs. 1')} Satz 9). Fragen Sie im Sanitätshaus, welches Modell ohne Aufzahlung zu haben ist.`,
        `Haben Sie im Jahr schon viel zugezahlt, prüfen Sie die Befreiung: Mehr als 2 % der Bruttoeinnahmen zum Lebensunterhalt, bei chronisch Kranken 1 %, müssen Sie nicht zuzahlen (${sgb5('62', 'Abs. 1')}).`,
      ] },
      { h: 'Leihweise, gebraucht, Reparatur', p: [
        `Die Kasse darf Hilfsmittel auch leihweise überlassen (${sgb5('33', 'Abs. 5')}). Deshalb bekommen Sie oft einen geprüften, gebrauchten Rollator aus dem Bestand der Kasse. Er gehört dann der Kasse, nicht Ihnen. Brauchen Sie ihn nicht mehr, geben Sie ihn zurück.`,
        `Zum Anspruch gehören auch die notwendige Änderung, Reparatur und Ersatzbeschaffung (${sgb5('33', 'Abs. 1')} Satz 5). Bremsen nachstellen, Reifen oder Griffe tauschen: Wenden Sie sich an das Sanitätshaus, das den Rollator geliefert hat, und zahlen Sie keine Reparatur selbst, bevor Sie gefragt haben.`,
        `Ein Zweitgerät, etwa für ein anderes Stockwerk, zahlt die Kasse nur, wenn es im Einzelfall erforderlich ist (${sgb5('33', 'Abs. 1')} Satz 1). Lassen Sie sich die Begründung vom Arzt aufschreiben.`,
      ] },
      { h: 'Wenn die Kasse ablehnt oder sich Zeit lässt', p: [
        `Die Krankenkasse muss über einen Antrag innerhalb von drei Wochen entscheiden, wenn sie ein Gutachten des Medizinischen Dienstes einholt, innerhalb von fünf Wochen. Schafft sie das nicht und nennt Ihnen keinen hinreichenden Grund, gilt der Antrag als genehmigt (${sgb5('13', 'Abs. 3a')} Satz 1, 5 und 6). Dient der Rollator dazu, eine Behinderung auszugleichen, können stattdessen die Fristen des Rehabilitationsrechts gelten (${sgb5('13', 'Abs. 3a')} Satz 9, ${sgb9('18')}). Notieren Sie sich deshalb, wann der Antrag bei der Kasse eingegangen ist.`,
        `Gegen eine Ablehnung legen Sie innerhalb eines Monats Widerspruch ein (${sgg('84', 'Abs. 1')}). Ein kurzer Brief genügt: „Gegen Ihren Bescheid vom … lege ich Widerspruch ein. Die Begründung reiche ich nach.“ Bitten Sie dann den Arzt um eine kurze Stellungnahme, warum Sie ohne Rollator nicht sicher gehen können.`,
      ] },
      { h: 'Welcher Rollator passt?', p: [
        'Für draußen sind große, weiche Räder und eine gute Feststellbremse wichtig, damit Bordsteine und Waldwege gehen. Für die Wohnung gibt es schmale Indoor-Rollatoren mit Tablett, die durch Türen passen und in denen man Teller oder Tasse tragen kann. Messen Sie die schmalste Tür und den Abstand zwischen Möbeln, bevor Sie sich entscheiden.',
        'Die Griffe stehen richtig, wenn sie bei locker hängenden Armen etwa auf Höhe Ihrer Handgelenke sind. Leichte Modelle wiegen etwa 5 bis 7 kg, Standardmodelle deutlich mehr. Das zählt, wenn Sie den Rollator oft in den Kofferraum oder eine Stufe hinauf heben. Achten Sie auf das zulässige Höchstgewicht des Nutzers und auf eine Sitzfläche, wenn Sie unterwegs Pausen brauchen.',
        'Rollatoren mit Unterarmauflage helfen, wenn Sie sich mit den Händen nicht gut abstützen können, etwa bei Rheuma. Elektrische Rollatoren mit Schiebe- und Bremshilfe sind noch selten und teuer; ob die Kasse einen zahlt, hängt davon ab, ob ein einfacher Rollator für Sie nicht ausreicht.',
      ] },
    ],
    table: { caption: 'Rollator: die Kosten auf einen Blick (gesetzliche Krankenversicherung)', head: ['Frage', 'Antwort', 'Norm'], rows: [
      ['Wer zahlt?', 'Krankenkasse, mit ärztlicher Verordnung', sgb5('33', 'Abs. 1')],
      ['Pflegegrad nötig?', 'Nein', sgb5('33', 'Abs. 1')],
      ['Zuzahlung', '10 % des Preises, mindestens 5 €, höchstens 10 €', `${sgb5('33', 'Abs. 8')}, ${sgb5('61')}`],
      ['Wunschmodell', 'Mehrkosten zahlen Sie selbst', `${sgb5('33', 'Abs. 1')} Satz 9`],
      ['Reparatur', 'gehört zum Anspruch', `${sgb5('33', 'Abs. 1')} Satz 5`],
      ['Rezept gültig', '28 Kalendertage', hilfsmRL('§ 8 Abs. 2')],
    ] },
    faq: [
      REZEPT_GUELTIG,
      { q: 'Brauche ich einen Pflegegrad für einen Rollator?', a: `Nein. Der Rollator ist ein Hilfsmittel der Krankenkasse nach ${sgb5('33')}. Es reicht eine ärztliche Verordnung.` },
      { q: 'Wie viel zahle ich zu?', a: `Ab 18 Jahren 10 % des Preises, ${Z}, aber nie mehr als der Rollator kostet (${sgb5('33', 'Abs. 8')}, ${sgb5('61')} Satz 1). Mehrkosten für ein Wunschmodell, das über das Notwendige hinausgeht, zahlen Sie selbst (${sgb5('33', 'Abs. 1')} Satz 9).` },
      { q: 'Wer repariert meinen Rollator?', a: `Das Sanitätshaus, das ihn geliefert hat. Reparaturen gehören zum Anspruch gegen die Kasse (${sgb5('33', 'Abs. 1')} Satz 5). Fragen Sie vorher, bevor Sie selbst bezahlen.` },
      { q: 'Wo bekomme ich den Rollator?', a: `Bei einem Sanitätshaus, das Vertragspartner Ihrer Kasse ist (${sgb5('33', 'Abs. 6')}). Viele liefern ihn auch nach Hause.` },
      { q: 'Kann ich einen Rollator ohne Rezept kaufen?', a: 'Ja, im Sanitätshaus, im Handel oder online. Dann zahlen Sie den vollen Preis. Lassen Sie ihn trotzdem einstellen, damit Griffhöhe und Bremsen stimmen.' },
    ],
    buy: [
      { label: 'Leichter Rollator (unter 7 kg)', amazon: 'rollator leicht faltbar' },
      { label: 'Schmaler Rollator für die Wohnung', amazon: 'rollator für die wohnung schmal' },
      { label: 'Rollator-Zubehör (Tasche, Stockhalter)', amazon: 'rollator zubehör tasche' },
    ],
    local: { feature: 'rollator', label: 'Sanitätshäuser mit Rollatoren und Gehhilfen' },
    related: ['pflegegrad-beantragen', 'badumbau-pflegekasse', 'orthopaedische-einlagen-krankenkasse'],
    finder: { href: '/leistung/rollator/', label: 'Sanitätshaus mit Rollatoren finden' },
  },
  {
    slug: 'kompressionsstruempfe-stuetzstruempfe',
    title: 'Kompressionsstrümpfe: Rezept, Kosten, Klasse 1 und 2',
    h1: 'Kompressionsstrümpfe und Stützstrümpfe',
    description: 'Kompressionsstrümpfe auf Rezept: was die Krankenkasse zahlt, Zuzahlung, Kompressionsklasse 1 und 2, Unterschied zu Stützstrümpfen, Anmessen, Anziehhilfe, Waschen und Schwangerschaft.',
    lead: 'Stützstrümpfe gibt es frei zu kaufen. Medizinische Kompressionsstrümpfe werden im Sanitätshaus angemessen und von der Krankenkasse bezahlt, wenn der Arzt sie verordnet. Sie zahlen höchstens 10 € je Strumpf oder Paar zu.',
    begriffe: ['kompressionsklasse', 'flachstrick', 'hilfsmittel', 'zuzahlung'],
    sections: [
      { h: 'Stützstrumpf oder Kompressionsstrumpf?', p: [
        'Stützstrümpfe haben einen leichten Druck und eignen sich zum Beispiel für lange Flüge oder Tage im Stehen. Sie sind kein Hilfsmittel der Kasse und gibt es in Drogerie, Apotheke oder online.',
        'Medizinische Kompressionsstrümpfe haben einen festgelegten Druck, der vom Knöchel nach oben abnimmt. Er wird in Kompressionsklassen von 1 bis 4 angegeben. Verordnet werden sie zum Beispiel bei Krampfadern, nach einer Thrombose, bei offenen Beinen und bei Lymph- oder Lipödem. Bei Lymph- und Lipödem braucht man oft flachgestrickte Strümpfe nach Maß.',
      ] },
      { h: 'Rezept und Kosten', p: [
        `Mit ärztlicher Verordnung zahlt die Krankenkasse die Strümpfe (${sgb5('33', 'Abs. 1')}). Auf dem Rezept stehen Diagnose, Kompressionsklasse, Art (z. B. Wadenstrumpf, Schenkelstrumpf, Strumpfhose) und ob Maßanfertigung nötig ist. Kompressionsstrümpfe stehen im ${hmv} in der Produktgruppe 17.`,
        `Üblich ist eine Erstversorgung mit zwei Strümpfen oder Paaren, damit Sie wechseln und waschen können, und eine Folgeversorgung nach etwa sechs Monaten. Das steht nicht im Gesetz, sondern folgt aus dem ${hmv} und den Verträgen Ihrer Kasse. Ab 18 Jahren zahlen Sie 10 % zu, ${Z} je Hilfsmittel (${sgb5('33', 'Abs. 8')}, ${sgb5('61')}).`,
        `Wünschen Sie Farben, Muster oder Material über das Notwendige hinaus, zahlen Sie die Mehrkosten selbst (${sgb5('33', 'Abs. 1')} Satz 9). Viele Hersteller bieten aber Farben ohne Aufpreis an; fragen Sie danach.`,
      ] },
      { h: 'Anmessen im Sanitätshaus', p: [
        'Gute Kompression sitzt nur, wenn richtig gemessen wird. Lassen Sie morgens messen, wenn die Beine noch nicht geschwollen sind, oder direkt nach einer Lymphdrainage. Gemessen werden Umfang und Länge an mehreren Punkten des Beins. Bei Maßanfertigung dauert es meist ein bis drei Wochen, bis die Strümpfe da sind.',
        'Drückt oder rutscht ein neuer Strumpf, bringen Sie ihn ins Sanitätshaus zurück. Ein Strumpf, der nicht passt, wird nicht getragen und hilft nicht.',
      ] },
      { h: 'Anziehen, Waschen, Haltbarkeit', p: [
        `Kompressionsstrümpfe zieht man morgens an, am besten bevor man aufsteht. Gummihandschuhe helfen beim Greifen. Wer die Strümpfe allein nicht anziehen kann, kann eine An- und Ausziehhilfe verordnet bekommen; sie steht im ${hmv} (Produktgruppe 02, Adaptionshilfen). Kann auch das nicht helfen, kann der Arzt häusliche Krankenpflege für das An- und Ausziehen verordnen (${sgb5('37', 'Abs. 2')}).`,
        'Waschen Sie die Strümpfe möglichst täglich, handwarm mit Feinwaschmittel, ohne Weichspüler, und lassen Sie sie an der Luft trocknen. Das erhält den Druck. Bei täglichem Tragen lässt die Wirkung nach etwa sechs Monaten nach.',
      ] },
      { h: 'In der Schwangerschaft', p: [
        `Bei Schwangerschaftsbeschwerden, etwa Krampfadern oder schweren Beinen, kann der Arzt Kompressionsstrümpfe verordnen. Dann fällt keine Zuzahlung an (${sgb5('24e')} Satz 2, der ${sgb5('33', 'Abs. 8')} für diese Fälle ausschließt).`,
      ] },
    ],
    table: { caption: 'Kompressionsstrümpfe: die Kosten auf einen Blick (gesetzliche Krankenversicherung)', head: ['Frage', 'Antwort', 'Norm'], rows: [
      ['Wer zahlt?', 'Krankenkasse, mit ärztlicher Verordnung', sgb5('33', 'Abs. 1')],
      ['Zuzahlung', '10 %, mindestens 5 €, höchstens 10 € je Hilfsmittel', `${sgb5('33', 'Abs. 8')}, ${sgb5('61')}`],
      ['Schwangerschaft', 'keine Zuzahlung bei Schwangerschaftsbeschwerden', sgb5('24e')],
      ['Farben, Muster', 'Mehrkosten selbst', `${sgb5('33', 'Abs. 1')} Satz 9`],
      ['Stützstrümpfe', 'selbst zahlen, kein Kassen-Hilfsmittel', '–'],
      ['Rezept gültig', '28 Kalendertage', hilfsmRL('§ 8 Abs. 2')],
    ] },
    faq: [
      REZEPT_GUELTIG,
      { q: 'Kompressionsklasse 1 oder 2: was ist der Unterschied?', a: 'Klasse 1 drückt am Knöchel mit 18 bis 21 mmHg und wird eher bei leichten Beschwerden verordnet. Klasse 2 drückt mit 23 bis 32 mmHg und ist die häufigste Klasse bei Krampfadern und nach Thrombose. Welche Sie brauchen, entscheidet der Arzt.' },
      { q: 'Kann ich Kompressionsstrümpfe Klasse 2 ohne Rezept kaufen?', a: 'Ja, aber ohne Rezept zahlen Sie den vollen Preis. Lassen Sie die Strümpfe trotzdem anmessen, sonst sitzen sie schlecht.' },
      { q: 'Wie viele Paar zahlt die Kasse?', a: `Üblich sind zwei Strümpfe oder Paare zum Wechseln und nach etwa sechs Monaten neue. Das regeln das ${hmv} und die Verträge Ihrer Kasse, nicht das Gesetz. Fragen Sie im Sanitätshaus nach den Regeln Ihrer Kasse.` },
      { q: 'Wie lange halten Kompressionsstrümpfe?', a: 'Bei täglichem Tragen etwa sechs Monate. Danach lässt der Druck nach.' },
      { q: 'Wo bekomme ich Flachstrick-Strümpfe?', a: 'In Sanitätshäusern mit Lymph- und Lipödem-Versorgung. Diese finden Sie in unserer Liste unten auf dieser Seite.' },
    ],
    buy: [
      { label: 'Stützstrümpfe für Reisen', amazon: 'stützstrümpfe reise' },
      { label: 'Anziehhilfe für Kompressionsstrümpfe', amazon: 'anziehhilfe kompressionsstrümpfe' },
    ],
    local: { feature: 'kompression', label: 'Sanitätshäuser mit Kompressionsstrümpfen', extra: { feature: 'lymph', label: 'Flachstrick bei Lymph- und Lipödem' } },
    related: ['orthopaedische-einlagen-krankenkasse', 'rollator-auf-rezept'],
    finder: { href: '/leistung/kompressionsstruempfe/', label: 'Sanitätshaus für Kompressionsstrümpfe finden' },
  },
  {
    slug: 'orthopaedische-einlagen-krankenkasse',
    title: 'Orthopädische Einlagen: Rezept, Kosten, Krankenkasse',
    h1: 'Orthopädische Einlagen auf Rezept oder ohne',
    description: 'Was orthopädische Einlagen kosten, wie viele Paar die Krankenkasse zahlt, wer sie verordnet und wann Einlagen ohne Rezept reichen.',
    lead: 'Orthopädische Einlagen nach Maß bekommen gesetzlich Versicherte mit ärztlicher Verordnung im Sanitätshaus oder beim Orthopädieschuhtechniker. Die Kasse zahlt sie bis auf eine kleine Zuzahlung.',
    sections: [
      { h: 'Verordnung und Anfertigung', p: [
        'Einlagen verordnet meist der Orthopäde, oft auch der Hausarzt. Im Sanitätshaus wird Ihr Fuß vermessen, häufig mit Fußscan oder Fußdruckmessung, dann werden die Einlagen angefertigt.',
        `Der Anspruch ergibt sich aus ${sgb5('33')}. Ab 18 Jahren zahlen Sie 10 % zu, ${Z} pro Paar (${sgb5('33', 'Abs. 8')}, ${sgb5('61')}). Wie viele Paar bezahlt werden, steht nicht im Gesetz. Es richtet sich nach dem medizinischen Bedarf und den Verträgen Ihrer Kasse mit den Sanitätshäusern (${sgb5('127')}). Üblich sind ein bis zwei Paar im Jahr. Für Sport- oder Arbeitsschuhe lohnt es sich, nach einem zweiten Paar zu fragen.`,
      ] },
      { h: 'Einlagen ohne Rezept', p: [
        'Fertige Einlagen aus Drogerie oder Online-Handel können bei leichten Beschwerden helfen, etwa bei müden Füßen. Bei Fersensporn, Plattfuß oder Schmerzen sollten Sie sich untersuchen lassen und Einlagen nach Maß bekommen.',
      ] },
    ],
    faq: [
      REZEPT_GUELTIG,
      { q: 'Was kosten orthopädische Einlagen ohne Kasse?', a: 'Einlagen nach Maß kosten meist zwischen 50 und 150 € pro Paar, je nach Material.' },
      { q: 'Wie lange halten Einlagen?', a: 'Bei täglichem Tragen etwa ein Jahr.' },
    ],
    buy: [
      { label: 'Fertige Einlagen für Arbeitsschuhe', amazon: 'einlagen arbeitsschuhe' },
      { label: 'Einlagen bei Fersensporn', amazon: 'einlagen fersensporn' },
    ],
    finder: { href: '/leistung/einlagen-fussanalyse/', label: 'Sanitätshaus mit Fußanalyse finden' },
  },
  {
    slug: 'pflegebett-beantragen-mieten',
    title: 'Pflegebett beantragen: Pflegekasse, Rezept, Zuzahlung',
    h1: 'Pflegebett: beantragen, mieten oder kaufen',
    description: 'Pflegebett für zu Hause beantragen: über Pflegekasse oder Krankenkasse, mit Rezept oder Empfehlung vom Pflegedienst, Fristen, Zuzahlung, Ausstattung, Maße, Seitengitter, mieten oder kaufen.',
    lead: 'Ein Pflegebett bekommen gesetzlich Versicherte meist leihweise und fast kostenlos: über die Pflegekasse, wenn ein Pflegegrad vorliegt, oder über die Krankenkasse mit ärztlicher Verordnung. Die Kasse muss in drei bis fünf Wochen entscheiden.',
    begriffe: ['pflegehilfsmittel', 'doppelfunktional', 'pflegefachperson', 'genehmigungsfiktion', 'freiheitsentziehung'],
    sections: [
      { h: 'Wer zahlt: Pflegekasse oder Krankenkasse?', p: [
        `Mit Pflegegrad ist meist die Pflegekasse zuständig, weil das Bett die Pflege erleichtert (${sgb11('40', 'Abs. 1')}). Ist das Bett aus medizinischen Gründen nötig, zum Beispiel nach einer Operation, kann es auch ohne Pflegegrad die Krankenkasse zahlen (${sgb5('33', 'Abs. 1')}).`,
        `Sie müssen das nicht selbst klären. Pflegebetten können beiden Zwecken dienen. Die Kasse, bei der Sie den Antrag stellen, prüft selbst, ob Kranken- oder Pflegekasse zuständig ist, und entscheidet (${sgb11('40', 'Abs. 5')} Satz 1). Im Pflegehilfsmittelverzeichnis stehen Pflegebetten in der Produktgruppe 50 unter der Positionsnummer 50.45.01.`,
      ] },
      { h: 'So beantragen Sie ein Pflegebett', p: [], steps: [
        `Holen Sie eine Verordnung vom Hausarzt oder eine schriftliche Empfehlung einer Pflegefachperson, etwa vom Pflegedienst oder aus dem Beratungsbesuch. Mit der Empfehlung einer Pflegefachperson wird vermutet, dass das Bett nötig ist, ein Rezept brauchen Sie dann nicht. Die Empfehlung darf beim Antrag höchstens zwei Wochen alt sein (${sgb11('40', 'Abs. 6')}).`,
        'Wählen Sie ein Sanitätshaus, das Vertragspartner Ihrer Kasse ist. Es stellt den Antrag meist für Sie und schickt Verordnung oder Empfehlung mit. Sie können den Antrag auch selbst formlos bei der Kasse stellen.',
        `Notieren Sie das Datum, an dem der Antrag bei der Kasse eingeht. Die Pflegekasse muss innerhalb von drei Wochen entscheiden, wenn sie eine Pflegefachperson oder den Medizinischen Dienst einschaltet, innerhalb von fünf Wochen (${sgb11('40', 'Abs. 7')} Satz 1). Für die Krankenkasse gilt dasselbe (${sgb5('13', 'Abs. 3a')}).`,
        `Hört die Kasse in der Frist nichts von sich hören und nennt Ihnen keinen hinreichenden Grund, gilt das Bett als genehmigt (${sgb11('40', 'Abs. 7')} Satz 4).`,
        'Das Sanitätshaus liefert das Bett, baut es auf und zeigt Ihnen und den Angehörigen die Bedienung. Fragen Sie vorher nach der Lieferzeit, vor allem wenn jemand aus dem Krankenhaus nach Hause kommt.',
      ] },
      { h: 'Was es kostet', p: [
        `Die Pflegekasse überlässt technische Pflegehilfsmittel wie das Bett vorrangig leihweise (${sgb11('40', 'Abs. 3')} Satz 1). Reparatur, Änderung und Einweisung gehören zum Anspruch (${sgb11('40', 'Abs. 3')} Satz 3). Lehnen Sie das Leihbett ohne zwingenden Grund ab, müssen Sie das Bett ganz selbst bezahlen (${sgb11('40', 'Abs. 3')} letzter Satz).`,
        `Weil Pflegebetten doppelfunktional sind, richtet sich die Zuzahlung nach dem Recht der Krankenkasse: ab 18 Jahren 10 %, ${Z} (${sgb11('40', 'Abs. 5')} Satz 7 mit ${sgb5('33', 'Abs. 8')} und ${sgb5('61')}). Die sonst für technische Pflegehilfsmittel geltende Grenze von 25 € (${sgb11('40', 'Abs. 3')} Satz 4) greift hier nicht.`,
        `Wünschen Sie eine Ausstattung, die über das Notwendige hinausgeht, etwa eine Holzverkleidung im Wohnzimmerstil, zahlen Sie die Mehrkosten selbst (${sgb11('40', 'Abs. 1')} Satz 3).`,
      ] },
      { h: 'Ausstattung, Maße und Platz', p: [
        'Ein Standard-Pflegebett hat eine Liegefläche von 90 × 200 cm, ist elektrisch in der Höhe verstellbar und hat ein verstellbares Rücken- und Beinteil. Die Höhe ist wichtig für den Rücken der Pflegenden und zum sicheren Aufstehen. Dazu gehören meist ein Aufrichter (Galgen) mit Haltegriff und Seitengitter.',
        'Planen Sie Platz ein: Das Bett sollte von beiden Seiten und vom Fußende aus erreichbar sein, damit man waschen, umlagern und einen Rollstuhl heranfahren kann. Messen Sie Türen und Flur für die Lieferung. Für Menschen mit hohem Gewicht, sehr großer oder kleiner Körpergröße und für Kinder gibt es besondere Betten; das muss auf Verordnung oder Empfehlung stehen.',
        'Pflegebetten mit Aufstehhilfe oder Drehfunktion setzen den Menschen im Bett auf und drehen ihn zur Bettkante. Sie kosten deutlich mehr. Die Kasse zahlt sie, wenn ein Standardbett im Einzelfall nicht ausreicht; das sollte der Arzt oder die Pflegefachperson begründen.',
        'Wer weiter neben dem Partner schlafen möchte, kann nach einem Einlegerahmen fragen, der in ein vorhandenes Bettgestell gesetzt wird, oder nach einem Pflegebett, das optisch zu einem Doppelbett passt.',
      ] },
      { h: 'Matratze und Seitengitter', p: [
        `Zum Pflegebett gehört eine einfache Matratze. Besteht die Gefahr, sich wund zu liegen (Dekubitus), kann der Arzt eine Weichlagerungs- oder Wechseldruckmatratze verordnen. Sie ist ein eigenes Hilfsmittel der Krankenkasse (${sgb5('33', 'Abs. 1')}, ${hmv}, Produktgruppe 11).`,
        `Seitengitter schützen vor dem Herausfallen, sie können aber auch einsperren. Bei Menschen mit Betreuer oder Vorsorgevollmacht braucht ein regelmäßiges oder längeres Hochstellen in Krankenhaus, Heim oder einer sonstigen Einrichtung die Genehmigung des Betreuungsgerichts (${bgb('1831', 'Abs. 4 und 5')}). Auch zu Hause lohnt sich ein Gespräch mit Arzt oder Pflegedienst über mildere Mittel, etwa ein Niedrigbett, geteilte Seitengitter oder eine Sturzmatte.`,
      ] },
      { h: 'Mieten oder kaufen', p: [
        'Wer kein Bett von der Kasse bekommt, schnell eines braucht oder ein besonderes Modell möchte, kann es bei vielen Sanitätshäusern mieten oder kaufen, auch gebraucht. Fragen Sie nach Monatsmiete, Lieferung, Aufbau und Abholung. Eine Miete lohnt sich vor allem bei kurzer Pflege, etwa nach einer Operation.',
      ] },
    ],
    table: { caption: 'Pflegebett: die wichtigsten Regeln (gesetzliche Kranken- und Pflegeversicherung)', head: ['Frage', 'Antwort', 'Norm'], rows: [
      ['Mit Pflegegrad', 'Pflegekasse, leihweise', sgb11('40', 'Abs. 1 und 3')],
      ['Ohne Pflegegrad', 'Krankenkasse, mit ärztlicher Verordnung', sgb5('33', 'Abs. 1')],
      ['Rezept nötig?', 'Nein, wenn eine Pflegefachperson das Bett empfiehlt', sgb11('40', 'Abs. 6')],
      ['Entscheidung der Kasse', '3 Wochen, mit Gutachten 5 Wochen', `${sgb11('40', 'Abs. 7')}, ${sgb5('13', 'Abs. 3a')}`],
      ['Zuzahlung', '10 %, mindestens 5 €, höchstens 10 €', `${sgb11('40', 'Abs. 5')} Satz 7, ${sgb5('61')}`],
      ['Reparatur', 'gehört zum Anspruch', `${sgb11('40', 'Abs. 3')} Satz 3`],
    ] },
    faq: [
      { q: 'Brauche ich einen Pflegegrad für ein Pflegebett?', a: `Für die Pflegekasse ja (${sgb11('40')}). Über die Krankenkasse geht es auch ohne Pflegegrad, wenn der Arzt es verordnet (${sgb5('33')}).` },
      { q: 'Brauche ich ein Rezept für das Pflegebett?', a: `Nicht unbedingt. Empfiehlt eine Pflegefachperson das Bett schriftlich beim Antrag, wird vermutet, dass es nötig ist, und eine ärztliche Verordnung ist nicht erforderlich (${sgb11('40', 'Abs. 6')}). Die Empfehlung darf höchstens zwei Wochen alt sein.` },
      { q: 'Wie schnell bekomme ich ein Pflegebett?', a: `Die Kasse muss in drei Wochen entscheiden, mit Gutachten in fünf Wochen (${sgb11('40', 'Abs. 7')}). Danach liefert das Sanitätshaus. Bei Entlassung aus dem Krankenhaus kümmert sich oft der Sozialdienst der Klinik schon vorher darum.` },
      { q: 'Was zahle ich für ein Pflegebett zu?', a: `Ab 18 Jahren 10 % des Preises, ${Z} (${sgb11('40', 'Abs. 5')} Satz 7, ${sgb5('61')}).` },
      { q: 'Wer liefert und baut das Bett auf?', a: `Das Sanitätshaus, mit dem Ihre Kasse einen Vertrag hat (${sgb5('127')}). Fragen Sie nach der Lieferzeit.` },
    ],
    pflegebox: true,
    local: { feature: 'pflegebett', label: 'Sanitätshäuser mit Pflegebetten' },
    related: ['pflegegrad-beantragen', 'pflegebox-pflegehilfsmittel', 'hausnotruf-kosten-pflegekasse'],
    finder: { href: '/leistung/pflegebett/', label: 'Sanitätshaus mit Pflegebetten finden' },
  },
  {
    slug: 'pflegebox-pflegehilfsmittel',
    title: 'Pflegebox: 42 € Pflegehilfsmittel im Monat beantragen',
    h1: 'Pflegebox und Pflegehilfsmittel zum Verbrauch',
    description: 'Wer Anspruch auf die Pflegebox hat, was drin ist (Handschuhe, Desinfektion, Bettschutz), wie Sie sie beantragen und warum sie nichts kostet.',
    lead: `Wer zu Hause gepflegt wird und einen Pflegegrad hat (1 bis 5), bekommt von der Pflegekasse bis zu 42 € im Monat für Pflegehilfsmittel zum Verbrauch (${sgb11('40', 'Abs. 2')}, für Pflegegrad 1 ${sgb11('28a')}).`,
    sections: [
      { h: 'Was ist in der Pflegebox?', p: [
        'Einmalhandschuhe, Hände- und Flächendesinfektion, Bettschutzeinlagen, Schutzschürzen, Mundschutz und Fingerlinge. Was genau, stellen Sie selbst zusammen.',
      ] },
      { h: 'So beantragen Sie die Pflegebox', p: [
        'Anbieter von Pflegeboxen stellen den Antrag bei der Pflegekasse für Sie und rechnen direkt ab. Sie unterschreiben ein Formular, danach kommt die Box jeden Monat nach Hause. Sie können den Inhalt ändern oder den Anbieter wechseln.',
        'Auch viele Sanitätshäuser und Apotheken vor Ort liefern Pflegehilfsmittel zum Verbrauch.',
      ] },
    ],
    faq: [
      { q: 'Kostet die Pflegebox etwas?', a: `Nein, solange der Inhalt im Monat nicht mehr als 42 € kostet (${sgb11('40', 'Abs. 2')}). Eine Zuzahlung gibt es dafür nicht, denn die Zuzahlung nach ${sgb11('40', 'Abs. 3')} Satz 4 nimmt Verbrauchsprodukte ausdrücklich aus.` },
      { q: 'Bekommen Privatversicherte die Pflegebox?', a: `Ja. Die private Pflegepflichtversicherung muss Leistungen bieten, die denen der gesetzlichen gleichwertig sind, statt Sachleistung meist als Kostenerstattung (${sgb11('23', 'Abs. 1')}). Meist zahlen Sie zuerst und reichen die Rechnung ein. Viele Anbieter rechnen inzwischen auch direkt mit privaten Versicherern ab.` },
    ],
    pflegebox: true,
    finder: { href: '/leistung/pflegehilfsmittel/', label: 'Sanitätshaus mit Pflegehilfsmitteln finden' },
  },
  {
    slug: 'krankenfahrt-kostenuebernahme',
    title: 'Krankenfahrt: Wann zahlt die Krankenkasse?',
    h1: 'Krankenfahrt: Wann zahlt die Krankenkasse die Fahrt?',
    description: 'Fahrten zur Dialyse, Chemo, Bestrahlung oder zum Arzt: wann die Krankenkasse zahlt, welche Verordnung nötig ist, Zuzahlung und wie Sie einen Fahrdienst finden.',
    lead: 'Fahrten zur ambulanten Behandlung zahlt die gesetzliche Krankenkasse nur in bestimmten Fällen. Dann brauchen Sie eine ärztliche Verordnung und eine Genehmigung der Kasse, die in einigen Fällen als erteilt gilt.',
    sections: [
      { h: 'Wann die Kasse zahlt', p: [
        `Fahrten zu stationären Behandlungen, also ins Krankenhaus, zahlt die Kasse, wenn sie aus zwingenden medizinischen Gründen notwendig sind (${sgb5('60', 'Abs. 1 und 2')}). Fahrten zur ambulanten Behandlung zahlt sie nur in Ausnahmefällen, die der Gemeinsame Bundesausschuss festlegt (${sgb5('60', 'Abs. 1')} Satz 3, ${ktRL}), zum Beispiel bei Dialyse, Chemotherapie und Strahlentherapie, und wenn Sie Pflegegrad 4 oder 5, Pflegegrad 3 mit dauerhaft eingeschränkter Mobilität oder einen Schwerbehindertenausweis mit den Merkzeichen aG, Bl oder H haben.`,
        `Der Arzt stellt dafür eine Verordnung einer Krankenbeförderung aus. Bei Fahrten zur ambulanten Behandlung muss die Kasse sie vorher genehmigen (${sgb5('60', 'Abs. 1')} Satz 4). Bei den Merkzeichen aG, Bl oder H, bei Pflegegrad 4 oder 5 und bei Pflegegrad 3 mit dauerhaft eingeschränkter Mobilität gilt die Genehmigung als erteilt (${sgb5('60', 'Abs. 1')} Satz 5).`,
      ] },
      { h: 'Taxi, Mietwagen oder Krankentransport', p: [
        'Wer sitzen kann, fährt mit Taxi oder Mietwagen. Wer im Rollstuhl sitzen bleiben muss, braucht einen Fahrdienst mit Rampe oder Lift. Wer unterwegs medizinisch betreut werden muss, fährt im Krankentransportwagen.',
        `Sie zahlen 10 % der Fahrtkosten zu, ${Z} je Fahrt, aber nie mehr als die Fahrt kostet (${sgb5('60', 'Abs. 2')}, ${sgb5('61')} Satz 1).`,
      ] },
    ],
    faq: [
      { q: 'Zahlt die Kasse die Fahrt zur Dialyse?', a: `Ja, mit ärztlicher Verordnung und Genehmigung der Kasse (${sgb5('60', 'Abs. 1')}, ${ktRL}). Fragen Sie den Fahrdienst, ob er direkt mit Ihrer Kasse abrechnet.` },
      { q: 'Was kostet eine Krankenfahrt ohne Kasse?', a: 'So viel wie eine normale Taxifahrt, bei Rollstuhl- oder Liegendtransport mehr. Fragen Sie vorher nach dem Preis.' },
    ],
    hausnotruf: true,
    finder: { href: '/krankenfahrten/', label: 'Krankenfahrten in Ihrer Nähe finden' },
  },
  {
    slug: 'pflegegrad-beantragen',
    title: 'Pflegegrad beantragen: Antrag, Begutachtung, Fristen 2026',
    h1: 'Pflegegrad beantragen: so geht es Schritt für Schritt',
    description: 'Pflegegrad beantragen: wo der Antrag hingeht, wie die Begutachtung abläuft, Punkte und Module, 25 Arbeitstage Frist und 70 € bei Verzögerung, Leistungen je Pflegegrad, Widerspruch und Höherstufung.',
    lead: `Den Pflegegrad beantragen Sie bei Ihrer Pflegekasse. Sie sitzt bei Ihrer Krankenkasse (${sgb11('46', 'Abs. 1')}). Ein Anruf oder ein kurzer Brief reicht. Leistungen gibt es ab dem Monat des Antrags, und die Kasse muss innerhalb von 25 Arbeitstagen entscheiden.`,
    begriffe: ['pflegebeduerftig', 'pflegegrad', 'pflegekasse', 'widerspruch', 'pflegestuetzpunkt'],
    sections: [
      { h: 'Wer einen Pflegegrad bekommt', p: [
        `Einen Pflegegrad bekommt, wer wegen seiner Gesundheit im Alltag nicht mehr selbständig zurechtkommt und deshalb Hilfe braucht, voraussichtlich für mindestens sechs Monate (${sgb11('14', 'Abs. 1')}). Auf die Ursache kommt es nicht an: Auch Demenz, eine psychische Erkrankung oder eine Behinderung zählen. Ein bestimmtes Alter ist nicht nötig, auch Kinder können einen Pflegegrad bekommen (${sgb11('15', 'Abs. 6 und 7')}).`,
      ] },
      { h: 'Schritt 1: Antrag stellen', p: [
        `Leistungen der Pflegeversicherung gibt es nur auf Antrag (${sgb11('33', 'Abs. 1')} Satz 1). Rufen Sie Ihre Krankenkasse an und sagen Sie, dass Sie Leistungen der Pflegeversicherung beantragen. Auch Angehörige können anrufen, wenn Sie sie dazu bevollmächtigt haben. Notieren Sie sich das Datum und den Namen der Person am Telefon.`,
        `Stellen Sie den Antrag früh. Wird er nicht im Monat gestellt, in dem die Pflegebedürftigkeit begonnen hat, sondern später, gibt es Leistungen erst ab Beginn des Antragsmonats (${sgb11('33', 'Abs. 1')} Satz 3). Das Formular, das die Kasse danach schickt, ist nur noch die Ergänzung.`,
      ] },
      { h: 'Schritt 2: Beratung nutzen', p: [
        `Nach dem ersten Antrag muss die Pflegekasse Ihnen innerhalb von zwei Wochen einen Beratungstermin anbieten oder einen Beratungsgutschein geben. Die Beratung kommt auf Wunsch zu Ihnen nach Hause (${sgb11('7b', 'Abs. 1')}). Daneben gibt es in vielen Regionen Pflegestützpunkte, die unabhängig beraten (${sgb11('7c')}).`,
      ] },
      { h: 'Schritt 3: Begutachtung zu Hause', p: [
        `Die Pflegekasse beauftragt den Medizinischen Dienst oder unabhängige Gutachter (${sgb11('18', 'Abs. 1')}). Die Begutachtung findet in der Regel bei Ihnen zu Hause statt (${sgb11('18a', 'Abs. 2')} Satz 1). Liegen Sie im Krankenhaus oder in der Reha und muss die Versorgung danach geklärt werden, muss die Begutachtung spätestens am fünften Arbeitstag nach dem Antrag stattfinden (${sgb11('18a', 'Abs. 5')}). Haben Angehörige Pflegezeit beim Arbeitgeber angekündigt, gilt zu Hause eine Frist von zehn Arbeitstagen (${sgb11('18a', 'Abs. 6')}).`,
        `Begutachtet wird, wie selbständig Sie in sechs Bereichen sind. Die Bereiche zählen unterschiedlich viel (${sgb11('15', 'Abs. 2')}):`,
      ], list: [
        'Mobilität, zum Beispiel aufstehen, umsetzen, Treppen steigen: 10 %',
        'Geistige und kommunikative Fähigkeiten oder Verhalten und psychische Probleme, es zählt der höhere Wert: 15 %',
        'Selbstversorgung, zum Beispiel waschen, anziehen, essen, Toilette: 40 %',
        'Umgang mit Krankheit und Therapie, zum Beispiel Medikamente, Verbände, Arztbesuche: 20 %',
        'Alltag und soziale Kontakte, zum Beispiel Tagesablauf, Beschäftigung, Kontakt zu anderen: 15 %',
      ], after: [
        `Aus den Punkten ergibt sich der Pflegegrad: ab 12,5 Punkten Pflegegrad 1, ab 27 Pflegegrad 2, ab 47,5 Pflegegrad 3, ab 70 Pflegegrad 4, ab 90 Pflegegrad 5 (${sgb11('15', 'Abs. 3')}). Weil die Selbstversorgung 40 % ausmacht, lohnt es sich, gerade hier genau zu schildern, wobei Sie Hilfe brauchen.`,
      ] },
      { h: 'So bereiten Sie die Begutachtung vor', p: [], list: [
        'Führen Sie ein bis zwei Wochen vorher ein Pflegetagebuch: Wobei brauchen Sie Hilfe, wie oft, wie lange, auch nachts?',
        'Legen Sie Arztberichte, Krankenhausbriefe, den Medikamentenplan und vorhandene Hilfsmittel bereit.',
        'Bitten Sie eine vertraute Person dazu, die Ihren Alltag kennt und ergänzen kann.',
        'Zeigen Sie den Alltag, wie er wirklich ist, nicht wie an einem guten Tag. Viele Menschen spielen ihre Probleme vor Fremden herunter.',
        'Sprechen Sie auch über Vergesslichkeit, Unruhe, Ängste oder nächtliches Aufstehen. Das zählt in Modul 2 und 3.',
        `Fragen Sie am Ende, welche Hilfsmittel der Gutachter empfiehlt. Stimmen Sie zu, gilt seine Empfehlung als Antrag, ein Rezept brauchen Sie dafür nicht (${sgb11('18b', 'Abs. 3')}).`,
      ] },
      { h: 'Schritt 4: Bescheid, Frist und Entschädigung', p: [
        `Die Pflegekasse muss Ihnen spätestens 25 Arbeitstage nach Eingang des Antrags schriftlich mitteilen, wie sie entschieden hat. Mit dem Bescheid bekommen Sie das Gutachten, wenn Sie nicht widersprechen (${sgb11('18c', 'Abs. 1 und 2')}).`,
        `Hält die Kasse die Frist nicht ein, muss sie Ihnen für jede angefangene Woche der Verspätung 70 € zahlen, außer sie hat die Verzögerung nicht zu vertreten (${sgb11('18c', 'Abs. 5')}). Haben Sie etwa einen Termin abgesagt, verschiebt sich die Frist. Fragen Sie nach, wenn die 25 Arbeitstage um sind.`,
      ] },
      { h: 'Schritt 5: Widerspruch, wenn der Pflegegrad zu niedrig ist', p: [
        `Sind Sie mit dem Pflegegrad nicht einverstanden, legen Sie innerhalb eines Monats Widerspruch ein (${sgg('84', 'Abs. 1')}). Ein kurzer Brief genügt: „Gegen Ihren Bescheid vom … lege ich Widerspruch ein. Die Begründung reiche ich nach.“ Dann haben Sie Zeit.`,
        'Lesen Sie das Gutachten Punkt für Punkt und vergleichen Sie es mit Ihrem Pflegetagebuch. Schreiben Sie auf, wo der Gutachter etwas übersehen oder zu gut bewertet hat. Ein Pflegedienst, ein Pflegestützpunkt oder ein Sozialverband hilft bei der Begründung.',
        'Verschlechtert sich der Zustand später, stellen Sie einen Antrag auf Höherstufung. Er läuft genauso ab wie der erste Antrag, mit neuer Begutachtung.',
      ] },
      { h: 'Was es ab welchem Pflegegrad gibt', p: [
        `Schon ab Pflegegrad 1 gibt es unter anderem Pflegehilfsmittel wie die Pflegebox, Zuschüsse zum Umbau der Wohnung und den Entlastungsbetrag (${sgb11('28a')}). Der Entlastungsbetrag beträgt bis zu 131 € im Monat und wird für anerkannte Hilfen erstattet, etwa Alltagsbegleitung oder Tagespflege (${sgb11('45b', 'Abs. 1')}).`,
        `Ab Pflegegrad 2 gibt es Pflegegeld, wenn Angehörige oder Bekannte die Pflege übernehmen (${sgb11('37', 'Abs. 1')}). Statt Pflegegeld oder anteilig daneben können Sie einen Pflegedienst beauftragen, der mit der Pflegekasse abrechnet (Pflegesachleistung, ${sgb11('36', 'Abs. 3')}, ${sgb11('38')}). Wer Pflegegeld bezieht, muss halbjährlich einen Beratungsbesuch abrufen, bei Pflegegrad 4 und 5 kann er vierteljährlich kommen (${sgb11('37', 'Abs. 3')}).`,
      ] },
    ],
    table: { caption: 'Leistungen je Pflegegrad im Monat (häusliche Pflege, Stand 2026)', head: ['Pflegegrad', 'Punkte', 'Pflegegeld', 'Pflegedienst (Sachleistung)', 'Entlastungsbetrag'], rows: [
      ['1', '12,5 bis unter 27', '–', '–', '131 €'],
      ['2', '27 bis unter 47,5', '347 €', 'bis 796 €', '131 €'],
      ['3', '47,5 bis unter 70', '599 €', 'bis 1.497 €', '131 €'],
      ['4', '70 bis unter 90', '800 €', 'bis 1.859 €', '131 €'],
      ['5', '90 bis 100', '990 €', 'bis 2.299 €', '131 €'],
    ], note: `Quellen: Punkte ${sgb11('15', 'Abs. 3')}, Pflegegeld ${sgb11('37', 'Abs. 1')}, Sachleistung ${sgb11('36', 'Abs. 3')}, Entlastungsbetrag ${sgb11('45b', 'Abs. 1')}, Pflegegrad 1 ${sgb11('28a')}.` },
    faq: [
      { q: 'Wo beantrage ich einen Pflegegrad?', a: `Bei der Pflegekasse. Sie gehört zu Ihrer Krankenkasse (${sgb11('46', 'Abs. 1')}). Ein Anruf genügt, das Formular schickt die Kasse zu.` },
      { q: 'Wie lange dauert es bis zum Bescheid?', a: `Höchstens 25 Arbeitstage ab Eingang des Antrags (${sgb11('18c', 'Abs. 1')}). Geld gibt es rückwirkend ab dem Antragsmonat (${sgb11('33', 'Abs. 1')}). Ist die Kasse zu spät, zahlt sie 70 € je angefangene Woche (${sgb11('18c', 'Abs. 5')}).` },
      { q: 'Was tun, wenn der Pflegegrad zu niedrig ist?', a: `Innerhalb eines Monats nach Erhalt des Bescheids Widerspruch einlegen (${sgg('84', 'Abs. 1')}). Ein Pflegedienst oder eine Pflegeberatung hilft bei der Begründung.` },
      { q: 'Wie viele Punkte brauche ich für Pflegegrad 2?', a: `Mindestens 27 von 100 Gesamtpunkten (${sgb11('15', 'Abs. 3')}). Für Pflegegrad 3 sind es 47,5 Punkte.` },
      { q: 'Kann ich den Pflegegrad im Krankenhaus beantragen?', a: `Ja. Muss geklärt werden, wie es nach der Entlassung weitergeht, muss die Begutachtung spätestens am fünften Arbeitstag nach dem Antrag stattfinden (${sgb11('18a', 'Abs. 5')}). Der Sozialdienst des Krankenhauses hilft beim Antrag.` },
      { q: 'Gilt das auch für Privatversicherte?', a: `Privat Versicherte stellen den Antrag bei ihrer privaten Pflegeversicherung. Die Begutachtung macht dort Medicproof. Die Leistungen müssen gleichwertig sein (${sgb11('23', 'Abs. 1')}).` },
    ],
    pflegebox: true,
    local: { cat: 'pflege', label: 'Pflegedienste in Ihrer Stadt' },
    related: ['pflegebett-beantragen-mieten', 'pflegebox-pflegehilfsmittel', 'treppenlift-zuschuss', 'badumbau-pflegekasse'],
    finder: { href: '/pflegedienst/', label: 'Pflegedienst in Ihrer Nähe finden' },
  },
  {
    slug: 'hausnotruf-kosten-pflegekasse',
    title: 'Hausnotruf: Kosten, Pflegekasse, Anbieter vor Ort',
    h1: 'Hausnotruf: Was er kostet und wann die Pflegekasse zahlt',
    description: 'Hausnotruf für Senioren: wie er funktioniert, was er kostet, wann die Pflegekasse die Grundgebühr übernimmt und worauf Sie bei Anbietern achten sollten.',
    lead: 'Ein Hausnotruf verbindet Sie per Knopfdruck mit einer Notrufzentrale, rund um die Uhr. Mit Pflegegrad übernimmt die Pflegekasse unter bestimmten Voraussetzungen die Grundgebühr.',
    sections: [
      { h: 'So funktioniert ein Hausnotruf', p: [
        'Sie tragen einen Knopf am Handgelenk oder als Kette. Ein Druck verbindet Sie über ein Gerät in der Wohnung mit der Notrufzentrale. Sie können frei sprechen, auch wenn Sie am Boden liegen. Die Zentrale ruft Angehörige, Nachbarn, den Rettungsdienst oder einen Bereitschaftsdienst, der einen Schlüssel für Ihre Wohnung hat.',
        'Mobile Notrufgeräte mit GPS funktionieren auch unterwegs. Manche Geräte erkennen Stürze von selbst.',
      ] },
      { h: 'Wann die Pflegekasse zahlt', p: [
        `Der Hausnotruf kann ein Pflegehilfsmittel sein, das ein selbständigeres Leben ermöglicht (${sgb11('40', 'Abs. 1')}). Das gilt ab Pflegegrad 1 (${sgb11('28a')}). Welche Geräte die Pflegekasse bezahlt, steht im Pflegehilfsmittelverzeichnis (${sgb11('78', 'Abs. 2')}). Dort wird in der Regel verlangt, dass Sie allein leben oder lange Zeit allein sind und im Notfall nicht selbst Hilfe rufen könnten.`,
        'Die Pflegekasse zahlt dann die Grundgebühr für das Basisgerät bis zu einem festen Monatsbetrag. Zusatzleistungen wie Schlüsselhinterlegung, Bereitschaftsdienst oder Sturzsensor zahlen Sie meist selbst. Fragen Sie Ihre Pflegekasse vorher, mit welchen Anbietern sie zusammenarbeitet.',
        `Wer keinen Pflegegrad hat, zahlt selbst. Die Kosten können als haushaltsnahe Dienstleistung die Einkommensteuer mindern (${estg('35a', 'Abs. 2')}). Ob das in Ihrem Fall gilt, klärt Ihre Steuerberatung.`,
      ] },
      { h: 'Worauf Sie achten sollten', p: [
        'Vergleichen Sie Monatspreis, einmalige Anschlussgebühr und Kündigungsfrist. Fragen Sie, wer im Notfall kommt und wie schnell. Hausnotruf bieten Wohlfahrtsverbände, viele Pflegedienste und private Firmen an.',
      ] },
    ],
    faq: [
      { q: 'Was kostet ein Hausnotruf?', a: 'Das Basisgerät kostet je nach Anbieter einen niedrigen zweistelligen Betrag im Monat. Mit Pflegegrad und wenn die Voraussetzungen erfüllt sind, übernimmt die Pflegekasse die Grundgebühr. Zusatzleistungen kosten extra.' },
      { q: 'Brauche ich einen Pflegegrad?', a: `Für die Kostenübernahme durch die Pflegekasse ja, Pflegegrad 1 reicht (${sgb11('28a')}, ${sgb11('40', 'Abs. 1')}). Ohne Pflegegrad können Sie einen Hausnotruf selbst bezahlen.` },
      { q: 'Wie beantrage ich den Hausnotruf?', a: 'Meist stellt der Anbieter den Antrag bei Ihrer Pflegekasse für Sie. Sie können ihn auch selbst formlos stellen.' },
    ],
    hausnotruf: true,
    finder: { href: '/pflegedienst/', label: 'Pflegedienst in Ihrer Nähe finden' },
  },
  {
    slug: 'treppenlift-zuschuss',
    title: 'Treppenlift: 4.180 € Zuschuss von der Pflegekasse',
    h1: 'Treppenlift: Zuschuss der Pflegekasse und weitere Hilfen',
    description: 'Treppenlift mit Zuschuss: bis zu 4.180 € von der Pflegekasse ab Pflegegrad 1, bis zu 16.720 € bei mehreren Pflegebedürftigen, Antrag, Mietwohnung und Steuer.',
    lead: `Für einen Treppenlift gibt die Pflegekasse bis zu 4.180 € Zuschuss, wenn ein Pflegegrad vorliegt (${sgb11('40', 'Abs. 4')}). Schon Pflegegrad 1 reicht (${sgb11('28a')}).`,
    sections: [
      { h: 'Zuschuss der Pflegekasse', p: [
        `Die Pflegekasse kann Maßnahmen zur Verbesserung des Wohnumfeldes bezuschussen, wenn dadurch die Pflege zu Hause möglich wird, deutlich leichter wird oder Sie wieder selbständiger leben können. Der Zuschuss beträgt höchstens 4.180 € je Maßnahme (${sgb11('40', 'Abs. 4')} Satz 1 und 2).`,
        `Leben mehrere Pflegebedürftige in einer Wohnung, zum Beispiel ein Ehepaar, gibt es bis zu 4.180 € je Person, zusammen höchstens 16.720 € (${sgb11('40', 'Abs. 4')} Satz 3 und 4).`,
        'Die Pflegekassen werten in der Praxis alle Umbauten, die zur gleichen Zeit nötig sind, als eine Maßnahme. Ändert sich die Pflegesituation später, kann es erneut einen Zuschuss geben. Das steht nicht im Gesetz, sondern folgt aus den gemeinsamen Hinweisen der Pflegekassen; fragen Sie Ihre Kasse.',
      ] },
      { h: 'So gehen Sie vor', p: [
        'Holen Sie ein oder zwei Angebote ein und stellen Sie den Antrag bei der Pflegekasse, bevor Sie den Auftrag erteilen. Legen Sie das Angebot bei. Viele Kassen lehnen nachträgliche Anträge ab, weil sie die Notwendigkeit nicht mehr prüfen können.',
        'Ein gebrauchter oder gemieteter Treppenlift ist oft deutlich günstiger, besonders bei geraden Treppen.',
      ] },
      { h: 'Mietwohnung', p: [
        `Mieter können verlangen, dass der Vermieter bauliche Veränderungen für Menschen mit Behinderungen erlaubt, außer sie sind ihm nicht zumutbar. Der Vermieter kann eine Sicherheit für den späteren Rückbau verlangen (${bgb('554', 'Abs. 1')}).`,
      ] },
      { h: 'Steuer', p: [
        `Für den Arbeitslohn von Handwerkern mindert sich die Einkommensteuer um 20 %, höchstens um 1.200 € im Jahr (${estg('35a', 'Abs. 3')}). Das gilt nicht für öffentlich geförderte Maßnahmen, für die zinsverbilligte Darlehen oder steuerfreie Zuschüsse in Anspruch genommen werden (${estg('35a', 'Abs. 3')} Satz 2). Ob und wie viel Sie geltend machen können, klärt Ihre Steuerberatung.`,
      ] },
    ],
    faq: [
      { q: 'Zahlt die Krankenkasse einen Treppenlift?', a: `Einen fest eingebauten Treppenlift nicht, er ist kein Hilfsmittel der Krankenkasse. Zuständig ist die Pflegekasse mit bis zu 4.180 € Zuschuss (${sgb11('40', 'Abs. 4')}). Ein mobiler Treppensteiger kann dagegen ein Hilfsmittel der Krankenkasse sein (${sgb5('33')}, ${hmv}).` },
      { q: 'Brauche ich einen Pflegegrad?', a: `Ja, für den Zuschuss der Pflegekasse. Pflegegrad 1 reicht (${sgb11('28a')}).` },
      { q: 'Muss ich den Antrag vor dem Einbau stellen?', a: 'Das Gesetz schreibt es nicht vor, aber es ist dringend zu empfehlen. Sonst riskieren Sie, dass die Kasse nicht zahlt.' },
    ],
    finder: { href: '/leistung/hausbesuch/', label: 'Sanitätshaus mit Hausbesuch finden' },
  },
  {
    slug: 'badumbau-pflegekasse',
    title: 'Badumbau: 4.180 € Zuschuss für bodengleiche Dusche',
    h1: 'Barrierefreies Bad: Zuschuss der Pflegekasse',
    description: 'Badumbau für Senioren: Wanne raus, bodengleiche Dusche rein, Haltegriffe, Toilette. Bis zu 4.180 € Zuschuss von der Pflegekasse, dazu Hilfsmittel auf Rezept.',
    lead: `Für einen Badumbau gibt die Pflegekasse bis zu 4.180 € Zuschuss, wenn ein Pflegegrad vorliegt (${sgb11('40', 'Abs. 4')}, ab Pflegegrad 1 ${sgb11('28a')}). Viele kleine Badhilfen gibt es zusätzlich auf Rezept.`,
    sections: [
      { h: 'Was als Umbau bezuschusst wird', p: [
        `Typisch sind der Austausch der Badewanne gegen eine bodengleiche Dusche, fest montierte Haltegriffe, ein unterfahrbares Waschbecken, ein erhöhtes WC und breitere Türen. Gezahlt wird, wenn die Pflege dadurch zu Hause möglich oder deutlich leichter wird oder Sie selbständiger leben können, bis zu 4.180 € je Maßnahme (${sgb11('40', 'Abs. 4')}).`,
        `Leben mehrere Pflegebedürftige im Haushalt, gibt es bis zu 4.180 € je Person, höchstens 16.720 € (${sgb11('40', 'Abs. 4')} Satz 3 und 4). Werden Bad und Treppenlift zur gleichen Zeit gebraucht, werten die Pflegekassen das in der Praxis als eine Maßnahme.`,
      ] },
      { h: 'Was es ohne Umbau gibt', p: [
        `Duschhocker, Badewannenlifter, Badewannenbrett, Toilettensitzerhöhung und Toilettenstuhl sind Hilfsmittel. Mit ärztlicher Verordnung zahlt sie die Krankenkasse, auch ohne Pflegegrad (${sgb5('33', 'Abs. 1')}, ${hmv}). Ab 18 Jahren zahlen Sie 10 % zu, ${Z} (${sgb5('33', 'Abs. 8')}, ${sgb5('61')}). Viele davon haben Sanitätshäuser vorrätig.`,
      ] },
      { h: 'So gehen Sie vor', p: [
        'Lassen Sie sich von einem Sanitätshaus oder einer Wohnberatung beraten, holen Sie ein Angebot eines Handwerksbetriebs ein und stellen Sie den Antrag bei der Pflegekasse, bevor Sie den Auftrag erteilen.',
        `In einer Mietwohnung brauchen Sie die Erlaubnis des Vermieters. Sie haben einen Anspruch darauf, wenn der Umbau dem Vermieter zumutbar ist (${bgb('554', 'Abs. 1')}).`,
        `Für den Arbeitslohn der Handwerker mindert sich die Einkommensteuer um 20 %, höchstens um 1.200 € im Jahr, nicht aber für Maßnahmen, für die steuerfreie Zuschüsse oder zinsverbilligte Darlehen genutzt werden (${estg('35a', 'Abs. 3')}). Klären Sie das mit Ihrer Steuerberatung.`,
      ] },
    ],
    faq: [
      { q: 'Wie viel zahlt die Pflegekasse für den Badumbau?', a: `Bis zu 4.180 € je Maßnahme, bei mehreren Pflegebedürftigen in der Wohnung bis zu 16.720 € (${sgb11('40', 'Abs. 4')}).` },
      { q: 'Bekomme ich auch ohne Pflegegrad Hilfe?', a: `Für Hilfsmittel wie Duschhocker oder Toilettensitzerhöhung ja, mit ärztlicher Verordnung über die Krankenkasse (${sgb5('33')}). Den Zuschuss für den Umbau gibt es nur mit Pflegegrad (${sgb11('40', 'Abs. 4')}).` },
    ],
    finder: { href: '/alltagshelfer/', label: 'Alltagshilfen für Bad und Toilette ansehen' },
  },
];
