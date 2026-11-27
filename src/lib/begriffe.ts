// Begriffe für die Kästen „Begriff erklärt“ in den Ratgebern und die Liste auf /ratgeber/.
// Jede Definition nennt ihre Quelle (Norm mit Link aus recht.ts). Normen am 27.11.2026 auf gesetze-im-internet.de geprüft.
import { sgb5, sgb11, sgg, bgb, hmv } from './recht';

export type Begriff = { term: string; def: string; quelle: string };

export const BEGRIFFE: Record<string, Begriff> = {
  hilfsmittel: {
    term: 'Hilfsmittel',
    def: 'Sachen wie Rollator, Einlagen oder Kompressionsstrümpfe, die im Einzelfall erforderlich sind, um den Erfolg einer Krankenbehandlung zu sichern, einer drohenden Behinderung vorzubeugen oder eine Behinderung auszugleichen. Allgemeine Gebrauchsgegenstände des täglichen Lebens gehören nicht dazu. Zuständig ist die Krankenkasse.',
    quelle: `${sgb5('33', 'Abs. 1')} Satz 1`,
  },
  pflegehilfsmittel: {
    term: 'Pflegehilfsmittel',
    def: 'Hilfsmittel, die die Pflege erleichtern, Beschwerden lindern oder ein selbständigeres Leben ermöglichen, soweit nicht die Krankenkasse dafür zuständig ist. Zuständig ist die Pflegekasse, Voraussetzung ist ein Pflegegrad. Technische Pflegehilfsmittel wie das Pflegebett werden vorrangig verliehen.',
    quelle: `${sgb11('40', 'Abs. 1 und 3')}`,
  },
  doppelfunktional: {
    term: 'Doppelfunktionales Hilfsmittel',
    def: 'Ein Hilfsmittel, das sowohl Zwecken der Krankenkasse als auch der Pflegekasse dienen kann, etwa ein Pflegebett. Die Kasse, bei der Sie den Antrag stellen, prüft selbst, wer zuständig ist, und entscheidet. Die Zuzahlung richtet sich dann nach dem Recht der Krankenkasse.',
    quelle: `${sgb11('40', 'Abs. 5')} Satz 1 und 7`,
  },
  zuzahlung: {
    term: 'Zuzahlung',
    def: 'Ihr Eigenanteil ab 18 Jahren: 10 % des Abgabepreises, mindestens 5 € und höchstens 10 €, aber nie mehr als das Hilfsmittel kostet. Bei Hilfsmitteln zum Verbrauch (z. B. Inkontinenzartikel) 10 % des Betrags, den die Kasse übernimmt, höchstens 15 € für den ganzen Monatsbedarf.',
    quelle: `${sgb5('61')} Satz 1, ${sgb5('33', 'Abs. 8')}`,
  },
  belastungsgrenze: {
    term: 'Belastungsgrenze',
    def: 'Mehr als 2 % Ihrer jährlichen Bruttoeinnahmen zum Lebensunterhalt müssen Sie im Kalenderjahr nicht zuzahlen, chronisch Kranke in Dauerbehandlung 1 %. Ist die Grenze erreicht, stellt die Krankenkasse eine Bescheinigung aus, dass Sie für den Rest des Jahres befreit sind.',
    quelle: `${sgb5('62', 'Abs. 1')}`,
  },
  vertragspartner: {
    term: 'Vertragspartner der Kasse',
    def: 'Hilfsmittel auf Kassenkosten bekommen Sie bei allen Sanitätshäusern und anderen Leistungserbringern, die einen Versorgungsvertrag mit Ihrer Kasse haben. Unter ihnen dürfen Sie frei wählen; Arzt und Kasse dürfen Sie nicht zu einem bestimmten Anbieter schicken. Die Kasse zahlt den vertraglich vereinbarten Preis.',
    quelle: `${sgb5('33', 'Abs. 6 und 7')}, ${sgb5('127')}`,
  },
  genehmigungsfiktion: {
    term: 'Genehmigungsfiktion',
    def: 'Entscheidet die Kasse nicht rechtzeitig über Ihren Antrag und teilt Ihnen auch keinen hinreichenden Grund für die Verzögerung schriftlich mit, gilt die Leistung nach Ablauf der Frist als genehmigt. Die Frist beträgt drei Wochen, mit Gutachten fünf Wochen.',
    quelle: `${sgb5('13', 'Abs. 3a')} (Krankenkasse), ${sgb11('40', 'Abs. 7')} (Pflegehilfsmittel)`,
  },
  widerspruch: {
    term: 'Widerspruch',
    def: 'Ihr Rechtsbehelf gegen einen Bescheid der Kranken- oder Pflegekasse. Er muss innerhalb eines Monats nach Bekanntgabe des Bescheids schriftlich, elektronisch in der vorgeschriebenen Form oder zur Niederschrift bei der Kasse eingehen. Erst danach ist eine Klage beim Sozialgericht möglich.',
    quelle: `${sgg('84', 'Abs. 1')}`,
  },
  pflegebeduerftig: {
    term: 'Pflegebedürftigkeit',
    def: 'Pflegebedürftig ist, wer gesundheitlich bedingt in seiner Selbständigkeit oder seinen Fähigkeiten beeinträchtigt ist und deshalb Hilfe durch andere braucht, und zwar auf Dauer, voraussichtlich für mindestens sechs Monate.',
    quelle: `${sgb11('14', 'Abs. 1')}`,
  },
  pflegegrad: {
    term: 'Pflegegrad',
    def: 'Die Einstufung der Pflegebedürftigkeit in fünf Grade. Gutachter bewerten sechs Lebensbereiche (Module) mit Punkten. Ab 12,5 von 100 Gesamtpunkten gibt es Pflegegrad 1, ab 90 Punkten Pflegegrad 5.',
    quelle: `${sgb11('15', 'Abs. 1 bis 3')}`,
  },
  pflegekasse: {
    term: 'Pflegekasse',
    def: 'Träger der sozialen Pflegeversicherung. Bei jeder gesetzlichen Krankenkasse ist eine Pflegekasse errichtet. Sie erreichen sie also über Ihre Krankenkasse.',
    quelle: `${sgb11('46', 'Abs. 1')}`,
  },
  pflegestuetzpunkt: {
    term: 'Pflegestützpunkt',
    def: 'Beratungsstelle von Pflege- und Krankenkassen vor Ort, die unabhängig zu allen Leistungen rund um die Pflege berät. Es gibt sie in den Bundesländern, deren Landesbehörde das bestimmt hat.',
    quelle: `${sgb11('7c', 'Abs. 1 und 2')}`,
  },
  pflegefachperson: {
    term: 'Empfehlung einer Pflegefachperson',
    def: 'Empfiehlt eine Pflegefachperson (z. B. vom Pflegedienst) ein Pflegehilfsmittel oder Hilfsmittel beim Antrag, wird vermutet, dass es notwendig ist. Eine ärztliche Verordnung brauchen Sie dann nicht. Die Empfehlung darf bei Antragstellung höchstens zwei Wochen alt sein.',
    quelle: `${sgb11('40', 'Abs. 6')}`,
  },
  kompressionsklasse: {
    term: 'Kompressionsklasse',
    def: 'Die Stärke, mit der ein medizinischer Kompressionsstrumpf am Knöchel drückt: Klasse 1 leicht (18 bis 21 mmHg), Klasse 2 mittel (23 bis 32 mmHg), Klasse 3 kräftig (34 bis 46 mmHg), Klasse 4 sehr kräftig (ab 49 mmHg). Welche Klasse Sie brauchen, entscheidet der Arzt.',
    quelle: `Gütezeichen RAL-GZ 387/1 und ${hmv}, Produktgruppe 17`,
  },
  flachstrick: {
    term: 'Rundstrick und Flachstrick',
    def: 'Rundgestrickte Strümpfe sind nahtlos, dünner und meist Konfektionsware. Flachgestrickte Strümpfe haben eine Naht, sind fester und werden fast immer nach Maß gefertigt. Sie werden vor allem bei Lymph- und Lipödem verordnet.',
    quelle: `${hmv}, Produktgruppe 17`,
  },
  freiheitsentziehung: {
    term: 'Freiheitsentziehende Maßnahme',
    def: 'Werden Bettgitter, Gurte oder Medikamente bei einem Menschen mit Betreuer oder Vorsorgebevollmächtigtem in Krankenhaus, Heim oder einer sonstigen Einrichtung über längere Zeit oder regelmäßig eingesetzt, um ihn am Aufstehen zu hindern, braucht das die Genehmigung des Betreuungsgerichts.',
    quelle: `${bgb('1831', 'Abs. 2, 4 und 5')}`,
  },
};
