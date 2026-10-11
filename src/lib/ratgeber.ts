// Ratgeber-Seiten. Themen und Fragen stammen aus der Keyword-Recherche (reports/keywords/keywords.json).
import { sgb5, sgb11, ktRL, hmv, estg, bgb, sgg } from './recht';
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
  {
    slug: 'pflegegrad-beantragen',
    title: 'Pflegegrad beantragen: Antrag, Begutachtung, Fristen',
    h1: 'Pflegegrad beantragen: so geht es Schritt für Schritt',
    description: 'Pflegegrad beantragen: Wo der Antrag hingeht, wie die Begutachtung abläuft, wie lange die Pflegekasse Zeit hat, ab wann es Geld gibt und wie Sie Widerspruch einlegen.',
    lead: `Den Pflegegrad beantragen Sie bei Ihrer Pflegekasse. Sie sitzt bei Ihrer Krankenkasse (${sgb11('46', 'Abs. 1')}). Ein Anruf oder ein kurzer Brief reicht, Leistungen gibt es ab dem Monat des Antrags.`,
    sections: [
      { h: 'Schritt 1: Antrag stellen', p: [
        `Leistungen der Pflegeversicherung gibt es nur auf Antrag (${sgb11('33', 'Abs. 1')} Satz 1). Rufen Sie Ihre Krankenkasse an und sagen Sie, dass Sie Leistungen der Pflegeversicherung beantragen. Auch Angehörige können anrufen, wenn Sie sie dazu bevollmächtigt haben. Notieren Sie sich das Datum.`,
        `Stellen Sie den Antrag früh. Wird er nicht im Monat gestellt, in dem die Pflegebedürftigkeit begonnen hat, sondern später, gibt es Leistungen erst ab Beginn des Antragsmonats (${sgb11('33', 'Abs. 1')} Satz 3).`,
      ] },
      { h: 'Schritt 2: Beratung', p: [
        `Nach dem ersten Antrag muss die Pflegekasse Ihnen innerhalb von zwei Wochen einen Beratungstermin anbieten oder einen Beratungsgutschein geben. Die Beratung geht zu Lasten der Pflegekasse und kommt auf Wunsch zu Ihnen nach Hause (${sgb11('7b', 'Abs. 1')}).`,
      ] },
      { h: 'Schritt 3: Begutachtung zu Hause', p: [
        `Die Pflegekasse beauftragt den Medizinischen Dienst oder unabhängige Gutachter (${sgb11('18', 'Abs. 1')}). Die Begutachtung findet in der Regel bei Ihnen zu Hause statt (${sgb11('18a', 'Abs. 2')}).`,
        `Begutachtet wird, wie selbständig Sie in sechs Bereichen sind, etwa Mobilität, Selbstversorgung, Erinnern und Orientierung, Umgang mit Krankheit und Alltag. Daraus ergeben sich Punkte: ab 12,5 Punkten Pflegegrad 1, ab 27 Pflegegrad 2, ab 47,5 Pflegegrad 3, ab 70 Pflegegrad 4, ab 90 Pflegegrad 5 (${sgb11('15', 'Abs. 3')}).`,
        'Tipp: Führen Sie ein bis zwei Wochen vorher ein Pflegetagebuch. Schreiben Sie auf, wobei Sie Hilfe brauchen und wie lange es dauert. Legen Sie Arztberichte und den Medikamentenplan bereit. Eine vertraute Person sollte beim Termin dabei sein. Zeigen Sie den Alltag, wie er wirklich ist, nicht wie an einem guten Tag.',
      ] },
      { h: 'Schritt 4: Bescheid und Widerspruch', p: [
        `Die Pflegekasse muss Ihnen spätestens 25 Arbeitstage nach Eingang des Antrags schriftlich mitteilen, wie sie entschieden hat. Mit dem Bescheid bekommen Sie das Gutachten, wenn Sie nicht widersprechen (${sgb11('18c', 'Abs. 1 und 2')}).`,
        `Sind Sie mit dem Pflegegrad nicht einverstanden, legen Sie innerhalb eines Monats Widerspruch ein (${sgg('84', 'Abs. 1')}). Ein kurzer Brief genügt, die Begründung können Sie nachreichen. Lesen Sie das Gutachten genau und vergleichen Sie es mit Ihrem Pflegetagebuch.`,
      ] },
      { h: 'Was es ab welchem Pflegegrad gibt', p: [
        `Schon ab Pflegegrad 1 gibt es unter anderem Pflegehilfsmittel wie die Pflegebox, Zuschüsse zum Umbau der Wohnung und den Entlastungsbetrag (${sgb11('28a')}). Der Entlastungsbetrag beträgt bis zu 131 € im Monat (${sgb11('45b', 'Abs. 1')}).`,
        `Ab Pflegegrad 2 gibt es Pflegegeld, wenn Angehörige oder Bekannte die Pflege übernehmen: 347 € bei Pflegegrad 2, 599 € bei Pflegegrad 3, 800 € bei Pflegegrad 4 und 990 € bei Pflegegrad 5 im Monat (${sgb11('37', 'Abs. 1')}). Statt Pflegegeld oder anteilig daneben können Sie einen Pflegedienst beauftragen (${sgb11('36')}, ${sgb11('38')}).`,
      ] },
    ],
    faq: [
      { q: 'Wo beantrage ich einen Pflegegrad?', a: `Bei der Pflegekasse. Sie gehört zu Ihrer Krankenkasse (${sgb11('46', 'Abs. 1')}). Ein Anruf genügt, das Formular schickt die Kasse zu.` },
      { q: 'Wie lange dauert es bis zum Bescheid?', a: `Höchstens 25 Arbeitstage ab Eingang des Antrags (${sgb11('18c', 'Abs. 1')}). Geld gibt es rückwirkend ab dem Antragsmonat (${sgb11('33', 'Abs. 1')}).` },
      { q: 'Was tun, wenn der Pflegegrad zu niedrig ist?', a: `Innerhalb eines Monats nach Erhalt des Bescheids Widerspruch einlegen (${sgg('84', 'Abs. 1')}). Ein Pflegedienst oder eine Pflegeberatung hilft bei der Begründung.` },
      { q: 'Gilt das auch für Privatversicherte?', a: `Privat Versicherte stellen den Antrag bei ihrer privaten Pflegeversicherung. Die Begutachtung macht dort Medicproof. Die Leistungen müssen gleichwertig sein (${sgb11('23', 'Abs. 1')}).` },
    ],
    pflegebox: true,
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
