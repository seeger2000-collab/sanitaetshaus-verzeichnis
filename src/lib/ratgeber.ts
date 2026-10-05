// Ratgeber-Seiten. Themen und Fragen stammen aus der Keyword-Recherche (reports/keywords/keywords.json).
import { sgb5, sgb11, ktRL, hmv } from './recht';
const Z = 'mindestens 5 € und höchstens 10 €';
// Rechtsstand Oktober 2026 (Normen am 5.10.2026 auf gesetze-im-internet.de geprüft), ohne Gewähr. Texte dürfen Links aus recht.ts enthalten. Bei Änderungen der Regeln hier anpassen.
export type Guide = {
  slug: string; title: string; h1: string; description: string; lead: string;
  sections: { h: string; p: string[] }[];
  faq: { q: string; a: string }[];
  buy?: { label: string; amazon: string }[];
  pflegebox?: boolean; hausnotruf?: boolean;
  finder: { href: string; label: string };
};

export const GUIDES: Guide[] = [
  {
    slug: 'rollator-auf-rezept',
    title: 'Rollator auf Rezept: Was die Krankenkasse zahlt',
    h1: 'Rollator auf Rezept oder selbst kaufen?',
    description: 'Rollator auf Rezept: Wer ihn verordnet, was die Krankenkasse zahlt, ob ein Pflegegrad nötig ist und wann sich ein leichter Rollator zum Selbstkaufen lohnt.',
    lead: 'Einen Rollator bekommen gesetzlich Versicherte mit ärztlicher Verordnung von der Krankenkasse. Einen Pflegegrad brauchen Sie dafür nicht.',
    sections: [
      { h: 'So bekommen Sie einen Rollator auf Rezept', p: [
        `Ihr Hausarzt oder Orthopäde verordnet den Rollator, wenn Sie ohne Hilfe nicht mehr sicher gehen können. Der Anspruch ergibt sich aus ${sgb5('33', 'Abs. 1')}. Mit dem Rezept gehen Sie in ein Sanitätshaus, das einen Vertrag mit Ihrer Krankenkasse hat (${sgb5('33', 'Abs. 6')}, ${sgb5('127')}). Das Sanitätshaus stellt den Antrag und rechnet direkt mit der Kasse ab.`,
        `Versicherte ab 18 Jahren zahlen 10 % des Preises zu, ${Z} (${sgb5('33', 'Abs. 8')}, ${sgb5('61')} Satz 1). Wer die Belastungsgrenze erreicht hat, ist für den Rest des Jahres von Zuzahlungen befreit (${sgb5('62')}).`,
      ] },
      { h: 'Leichter Rollator, Rollator für die Wohnung', p: [
        `Die Kasse zahlt das Modell, das medizinisch notwendig ist. Wünschen Sie ein besonders leichtes Modell aus Aluminium oder Carbon, ohne dass Sie es medizinisch brauchen, zahlen Sie die Mehrkosten selbst (${sgb5('33', 'Abs. 1')} Satz 9). Für enge Wohnungen gibt es schmale Indoor-Rollatoren mit Tablett.`,
        'Achten Sie beim Kauf auf das Gewicht (leichte Modelle wiegen etwa 5 bis 7 kg), die Sitzhöhe, die Faltmaße für den Kofferraum und auf große Räder, wenn Sie oft draußen unterwegs sind.',
      ] },
    ],
    faq: [
      { q: 'Brauche ich einen Pflegegrad für einen Rollator?', a: `Nein. Der Rollator ist ein Hilfsmittel der Krankenkasse nach ${sgb5('33')}. Es reicht eine ärztliche Verordnung.` },
      { q: 'Wie viel zahle ich zu?', a: `Ab 18 Jahren 10 % des Preises, ${Z}, aber nie mehr als der Rollator kostet (${sgb5('33', 'Abs. 8')}, ${sgb5('61')} Satz 1). Mehrkosten für ein Wunschmodell, das über das Notwendige hinausgeht, zahlen Sie selbst (${sgb5('33', 'Abs. 1')} Satz 9).` },
      { q: 'Wo bekomme ich den Rollator?', a: `Bei einem Sanitätshaus, das Vertragspartner Ihrer Kasse ist (${sgb5('33', 'Abs. 6')}). Viele liefern ihn auch nach Hause.` },
    ],
    buy: [
      { label: 'Leichter Rollator (unter 7 kg)', amazon: 'rollator leicht faltbar' },
      { label: 'Schmaler Rollator für die Wohnung', amazon: 'rollator für die wohnung schmal' },
      { label: 'Rollator-Zubehör (Tasche, Stockhalter)', amazon: 'rollator zubehör tasche' },
    ],
    finder: { href: '/leistung/rollstuhl-werkstatt/', label: 'Sanitätshaus mit Reha-Technik finden' },
  },
  {
    slug: 'kompressionsstruempfe-stuetzstruempfe',
    title: 'Kompressionsstrümpfe und Stützstrümpfe: Rezept, Klassen, Kauf',
    h1: 'Kompressionsstrümpfe und Stützstrümpfe',
    description: 'Unterschied zwischen Stützstrümpfen und medizinischen Kompressionsstrümpfen, Kompressionsklasse 1 und 2, Rezept, Zuzahlung, Anziehhilfe und wo Sie Strümpfe anmessen lassen.',
    lead: 'Stützstrümpfe gibt es frei zu kaufen. Medizinische Kompressionsstrümpfe werden im Sanitätshaus angemessen und von der Krankenkasse bezahlt, wenn der Arzt sie verordnet.',
    sections: [
      { h: 'Stützstrumpf oder Kompressionsstrumpf?', p: [
        'Stützstrümpfe haben einen leichten Druck und eignen sich zum Beispiel für lange Flüge oder Tage im Stehen. Sie sind kein Medizinprodukt und gibt es in Drogerie, Apotheke oder online.',
        'Medizinische Kompressionsstrümpfe haben einen festgelegten Druck in Klassen von 1 bis 4. Sie werden bei Venenleiden, Thrombose, Lymph- oder Lipödem verordnet. Bei Lymph- und Lipödem braucht man oft flachgestrickte Strümpfe nach Maß.',
      ] },
      { h: 'Rezept und Kosten', p: [
        `Mit Verordnung zahlt die Krankenkasse die Strümpfe (${sgb5('33')}). Üblich ist eine Erstversorgung mit zwei Strümpfen oder Paaren zum Wechseln und eine Folgeversorgung nach etwa sechs Monaten. Das ist keine gesetzliche Regel, sondern folgt aus dem ${hmv} (Produktgruppe 17) und den Verträgen Ihrer Kasse. Ab 18 Jahren zahlen Sie 10 % zu, ${Z} je Hilfsmittel (${sgb5('33', 'Abs. 8')}, ${sgb5('61')}).`,
        `An- und Ausziehhilfen für Kompressionsstrümpfe stehen ebenfalls im ${hmv} (Produktgruppe 02, Adaptionshilfen) und können verordnet werden, wenn Sie die Strümpfe allein nicht anziehen können.`,
      ] },
    ],
    faq: [
      { q: 'Kann ich Kompressionsstrümpfe Klasse 2 ohne Rezept kaufen?', a: 'Ja, aber ohne Rezept zahlen Sie den vollen Preis. Lassen Sie die Strümpfe trotzdem anmessen, sonst sitzen sie schlecht.' },
      { q: 'Wie lange halten Kompressionsstrümpfe?', a: 'Bei täglichem Tragen etwa sechs Monate. Danach lässt der Druck nach.' },
      { q: 'Wo bekomme ich Flachstrick-Strümpfe?', a: 'In Sanitätshäusern mit Lymph- und Lipödem-Versorgung. Diese finden Sie in unserer Liste.' },
    ],
    buy: [
      { label: 'Stützstrümpfe für Reisen', amazon: 'stützstrümpfe reise' },
      { label: 'Anziehhilfe für Kompressionsstrümpfe', amazon: 'anziehhilfe kompressionsstrümpfe' },
    ],
    finder: { href: '/leistung/lymph-flachstrick/', label: 'Sanitätshaus mit Flachstrick finden' },
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
    title: 'Pflegebett beantragen, mieten oder kaufen',
    h1: 'Pflegebett: beantragen, mieten oder kaufen',
    description: 'Pflegebett über Pflegekasse oder Krankenkasse beantragen, Zuzahlung, Pflegebett mieten oder gebraucht kaufen, Maße und Ausstattung.',
    lead: 'Ein Pflegebett bekommen gesetzlich Versicherte meist leihweise über die Pflegekasse, wenn ein Pflegegrad vorliegt, oder über die Krankenkasse mit ärztlicher Verordnung.',
    sections: [
      { h: 'Über die Pflegekasse', p: [
        `Mit Pflegegrad stellen Sie einen formlosen Antrag bei der Pflegekasse (${sgb11('40', 'Abs. 1')}), oft hilft eine ärztliche Empfehlung oder die Empfehlung einer Pflegefachkraft (${sgb11('40', 'Abs. 6')}). Technische Pflegehilfsmittel wie das Bett werden vorrangig leihweise überlassen (${sgb11('40', 'Abs. 3')}) und von einem Sanitätshaus geliefert und aufgebaut.`,
      ] },
      { h: 'Über die Krankenkasse', p: [
        `Ist das Bett aus medizinischen Gründen nötig, zum Beispiel nach einer Operation, kann der Arzt es verordnen. Dann zahlt die Krankenkasse, auch ohne Pflegegrad (${sgb5('33')}).`, `Pflegebetten können beiden Zwecken dienen. Die Kasse, bei der Sie den Antrag stellen, prüft selbst, ob Kranken- oder Pflegekasse zuständig ist (${sgb11('40', 'Abs. 5')}). Die Zuzahlung richtet sich bei Pflegebetten deshalb nach dem Recht der Krankenkasse: ab 18 Jahren 10 %, ${Z} (${sgb11('40', 'Abs. 5')} Satz 7 mit ${sgb5('33', 'Abs. 8')} und ${sgb5('61')}). Die sonst für technische Pflegehilfsmittel geltende Grenze von 25 € (${sgb11('40', 'Abs. 3')}) greift hier nicht.`,
      ] },
      { h: 'Mieten oder kaufen', p: [
        'Wer kein Bett von der Kasse bekommt oder ein besonderes Modell möchte, kann es bei Sanitätshäusern mieten oder kaufen. Ein Pflegebett mit Aufstehhilfe oder Drehfunktion kostet deutlich mehr als ein Standardbett. Achten Sie auf Liegefläche, Höhenverstellung und Seitengitter.',
      ] },
    ],
    faq: [
      { q: 'Brauche ich einen Pflegegrad für ein Pflegebett?', a: `Für die Pflegekasse ja (${sgb11('40')}). Über die Krankenkasse geht es auch ohne Pflegegrad, wenn der Arzt es verordnet (${sgb5('33')}).` },
      { q: 'Wer liefert und baut das Bett auf?', a: `Das Sanitätshaus, mit dem Ihre Kasse einen Vertrag hat (${sgb5('127')}). Fragen Sie nach der Lieferzeit.` },
    ],
    pflegebox: true,
    finder: { href: '/leistung/hausbesuch/', label: 'Sanitätshaus mit Hausbesuch finden' },
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
];
