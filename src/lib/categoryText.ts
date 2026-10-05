import { sgb5, sgb11, heilmRL, ktRL } from './recht';
// Texte je Kategorie. Inhalte orientieren sich an den häufigsten Suchanfragen (reports/keywords).
export const CATEGORY_TEXT: Record<string, { h1: (c: string) => string; title: (c: string, n: number) => string; intro: string; faq: { q: string; a: string }[]; guide?: string }> = {
  physio: {
    h1: (c) => `Physiotherapie in ${c}`,
    title: (c, n) => `Physiotherapie ${c}: Praxis mit Telefon, auch Hausbesuch und Online-Termin`,
    intro: 'Praxen für Physiotherapie und Krankengymnastik. Viele Patienten suchen gezielt nach Hausbesuchen, Krankengymnastik am Gerät, Lymphdrainage oder Bobath. Diese Angaben lesen wir von den Websites der Praxen.',
    faq: [
      { q: 'Wie lange ist ein Rezept für Physiotherapie gültig?', a: `Die Behandlung muss innerhalb von 28 Tagen nach Ausstellung beginnen, bei dringendem Bedarf innerhalb von 14 Tagen, wenn der Arzt das auf der Verordnung vermerkt (${heilmRL}). Fragen Sie die Praxis, ob noch Termine frei sind, bevor die Frist abläuft.` },
      { q: 'Bekomme ich Physiotherapie auch zu Hause?', a: `Ja, wenn der Arzt „Hausbesuch“ auf der Verordnung ankreuzt, weil Sie die Praxis aus medizinischen Gründen nicht aufsuchen können (${heilmRL}). Nicht jede Praxis macht Hausbesuche. In der Liste können Sie danach filtern.` },
      { q: 'Was zahle ich zu?', a: `Gesetzlich Versicherte ab 18 Jahren zahlen 10 % der Kosten plus 10 € je Verordnung (${sgb5('32', 'Abs. 2')} mit ${sgb5('61')} Satz 3). Wer die Belastungsgrenze erreicht hat, ist für den Rest des Jahres befreit (${sgb5('62')}).` },
    ],
  },
  pflege: {
    h1: (c) => `Ambulante Pflegedienste in ${c}`,
    title: (c, n) => `Pflegedienst ${c}: ambulante Pflege zu Hause mit Telefon`,
    intro: 'Ambulante Pflegedienste kommen nach Hause, helfen bei Grundpflege, Medikamenten und Haushalt und entlasten Angehörige. In OpenStreetMap sind noch nicht alle Dienste eingetragen. Fehlt einer, sagen Sie uns gern Bescheid.',
    faq: [
      { q: 'Wer bezahlt den Pflegedienst?', a: `Ab Pflegegrad 2 zahlt die Pflegekasse Pflegesachleistungen bis zu einem monatlichen Höchstbetrag je Pflegegrad (${sgb11('36')}). Behandlungspflege wie Spritzen oder Verbände verordnet der Arzt, sie zahlt die Krankenkasse (${sgb5('37')}).` },
      { q: 'Was ist ein Beratungsbesuch nach § 37.3?', a: `Wer Pflegegeld bekommt und Pflegegrad 2 bis 5 hat, muss halbjährlich eine Beratung zu Hause abrufen. Bei Pflegegrad 4 und 5 ist sie freiwillig auch vierteljährlich möglich (${sgb11('37', 'Abs. 3')}). Die Beratung machen zum Beispiel ambulante Pflegedienste.` },
    ],
  },
  heim: {
    h1: (c) => `Pflegeheime in ${c}`,
    title: (c, n) => `Pflegeheim ${c}: Heimplatz und Kurzzeitpflege mit Telefon`,
    intro: 'Pflegeheime, Seniorenheime und Einrichtungen mit Kurzzeitpflege. Rufen Sie direkt an und fragen Sie nach freien Plätzen, denn die ändern sich täglich. Angaben zu Kurzzeitpflege, Demenz-Wohnbereich oder betreutem Wohnen lesen wir von den Websites der Heime.',
    faq: [
      { q: 'Wie finde ich schnell einen freien Heimplatz?', a: 'Rufen Sie mehrere Heime in der Nähe an, am besten vormittags. Fragen Sie auch nach Kurzzeitpflege: Ein Kurzzeitplatz wird oft später zum Dauerplatz. Der Sozialdienst im Krankenhaus hilft, wenn die Pflege nach einem Klinikaufenthalt beginnt.' },
      { q: 'Was zahlt die Pflegekasse im Pflegeheim?', a: `Ab Pflegegrad 2 zahlt die Pflegekasse einen festen Betrag für die Pflege, je nach Pflegegrad (${sgb11('43')}). Dazu kommt ein Zuschlag auf den Eigenanteil, der mit der Dauer im Heim steigt (${sgb11('43c')}). Unterkunft, Verpflegung und Investitionskosten zahlen Sie selbst. Reicht das Geld nicht, hilft das Sozialamt mit Hilfe zur Pflege.` },
      { q: 'Was ist Kurzzeitpflege?', a: `Ein vorübergehender Heimplatz, etwa nach einem Krankenhausaufenthalt oder wenn pflegende Angehörige ausfallen. Die Pflegekasse zahlt ab Pflegegrad 2 bis zu acht Wochen im Kalenderjahr, bis zu einem Höchstbetrag (${sgb11('42')}).` },
    ],
  },
  apotheke: {
    h1: (c) => `Apotheken in ${c}`,
    title: (c, n) => `Apotheke ${c}: Telefon, Öffnungszeiten, Pflegeprodukte`,
    intro: 'Apotheken in der Nähe, mit Telefon und Öffnungszeiten. Viele Apotheken führen Pflegeprodukte wie Einmalhandschuhe, Desinfektion und Inkontinenzartikel und liefern per Botendienst nach Hause.',
    faq: [
      { q: 'Bekomme ich Pflegehilfsmittel in der Apotheke?', a: `Ja. Wer zu Hause gepflegt wird und einen Pflegegrad (1 bis 5) hat, bekommt von der Pflegekasse monatlich bis zu 42 € für Pflegehilfsmittel zum Verbrauch (${sgb11('40', 'Abs. 2')}). Viele Apotheken rechnen das direkt mit der Pflegekasse ab, fragen Sie danach.` },
      { q: 'Liefert die Apotheke nach Hause?', a: 'Viele Apotheken haben einen Botendienst, oft kostenlos. Rufen Sie an und fragen Sie, bis wann Sie bestellen müssen.' },
    ],
  },
  fahrt: {
    h1: (c) => `Krankenfahrten in ${c}`,
    title: (c, n) => `Krankenfahrt ${c}: Fahrdienst für Arzt, Dialyse, Reha`,
    intro: 'Taxi- und Fahrdienste, die Krankenfahrten anbieten, zum Beispiel zur Dialyse, Chemo- oder Strahlentherapie oder im Rollstuhl. Wir zeigen nur Dienste, die Krankenfahrten im Namen oder auf ihrer Website nennen.',
    faq: [
      { q: 'Wann zahlt die Krankenkasse die Fahrt?', a: `Fahrten zur ambulanten Behandlung zahlt die Kasse nur in Ausnahmefällen und nur nach vorheriger Genehmigung (${sgb5('60', 'Abs. 1')}), zum Beispiel zur Dialyse, Chemo- oder Strahlentherapie (${ktRL}). Bei Pflegegrad 4 oder 5, Pflegegrad 3 mit dauerhaft eingeschränkter Mobilität oder den Merkzeichen aG, Bl oder H gilt die Genehmigung als erteilt. Der Arzt stellt eine Verordnung aus.` },
      { q: 'Was muss ich zuzahlen?', a: `10 % der Fahrtkosten, mindestens 5 € und höchstens 10 € je Fahrt, aber nie mehr als die Fahrt kostet (${sgb5('60')} mit ${sgb5('61')} Satz 1).` },
      { q: 'Wie buche ich eine Krankenfahrt?', a: 'Rufen Sie den Fahrdienst direkt an und sagen Sie, dass es eine Krankenfahrt mit Verordnung ist. Nicht jedes Taxiunternehmen rechnet direkt mit allen Kassen ab, fragen Sie danach.' },
    ],
    guide: '/ratgeber/krankenfahrt-kostenuebernahme/',
  },
};
