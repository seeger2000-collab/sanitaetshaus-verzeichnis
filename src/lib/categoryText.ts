// Texte je Kategorie. Inhalte orientieren sich an den häufigsten Suchanfragen (reports/keywords).
export const CATEGORY_TEXT: Record<string, { h1: (c: string) => string; title: (c: string, n: number) => string; intro: string; faq: { q: string; a: string }[]; guide?: string }> = {
  physio: {
    h1: (c) => `Physiotherapie in ${c}`,
    title: (c, n) => `Physiotherapie ${c}: Praxis mit Telefon, auch Hausbesuch und Online-Termin`,
    intro: 'Praxen für Physiotherapie und Krankengymnastik. Viele Patienten suchen gezielt nach Hausbesuchen, Krankengymnastik am Gerät, Lymphdrainage oder Bobath. Diese Angaben lesen wir von den Websites der Praxen.',
    faq: [
      { q: 'Wie lange ist ein Rezept für Physiotherapie gültig?', a: 'Die Behandlung muss in der Regel innerhalb von 28 Tagen nach Ausstellung beginnen, bei dringendem Bedarf innerhalb von 14 Tagen, wenn der Arzt das vermerkt. Fragen Sie die Praxis, ob noch Termine frei sind, bevor die Frist abläuft.' },
      { q: 'Bekomme ich Physiotherapie auch zu Hause?', a: 'Ja, wenn der Arzt „Hausbesuch“ auf der Verordnung ankreuzt, weil Sie die Praxis nicht aufsuchen können. Nicht jede Praxis macht Hausbesuche. In der Liste können Sie danach filtern.' },
      { q: 'Was zahle ich zu?', a: 'Gesetzlich Versicherte zahlen 10 % der Kosten plus 10 € pro Verordnung. Wer von der Zuzahlung befreit ist, zahlt nichts.' },
    ],
  },
  pflege: {
    h1: (c) => `Ambulante Pflegedienste in ${c}`,
    title: (c, n) => `Pflegedienst ${c}: ambulante Pflege zu Hause mit Telefon`,
    intro: 'Ambulante Pflegedienste kommen nach Hause, helfen bei Grundpflege, Medikamenten und Haushalt und entlasten Angehörige. In OpenStreetMap sind noch nicht alle Dienste eingetragen. Fehlt einer, sagen Sie uns gern Bescheid.',
    faq: [
      { q: 'Wer bezahlt den Pflegedienst?', a: 'Ab Pflegegrad 2 zahlt die Pflegekasse Pflegesachleistungen bis zu einem monatlichen Höchstbetrag. Behandlungspflege wie Spritzen oder Verbände verordnet der Arzt, sie zahlt die Krankenkasse.' },
      { q: 'Was ist ein Beratungsbesuch nach § 37.3?', a: 'Wer nur Pflegegeld bekommt, muss bei Pflegegrad 2 und 3 halbjährlich, bei 4 und 5 vierteljährlich einen Beratungsbesuch nachweisen. Den machen ambulante Pflegedienste.' },
    ],
  },
  heim: {
    h1: (c) => `Pflegeheime in ${c}`,
    title: (c, n) => `Pflegeheim ${c}: Heimplatz und Kurzzeitpflege mit Telefon`,
    intro: 'Pflegeheime, Seniorenheime und Einrichtungen mit Kurzzeitpflege. Rufen Sie direkt an und fragen Sie nach freien Plätzen, denn die ändern sich täglich. Angaben zu Kurzzeitpflege, Demenz-Wohnbereich oder betreutem Wohnen lesen wir von den Websites der Heime.',
    faq: [
      { q: 'Wie finde ich schnell einen freien Heimplatz?', a: 'Rufen Sie mehrere Heime in der Nähe an, am besten vormittags. Fragen Sie auch nach Kurzzeitpflege: Ein Kurzzeitplatz wird oft später zum Dauerplatz. Der Sozialdienst im Krankenhaus hilft, wenn die Pflege nach einem Klinikaufenthalt beginnt.' },
      { q: 'Was zahlt die Pflegekasse im Pflegeheim?', a: 'Ab Pflegegrad 2 zahlt die Pflegekasse einen festen Betrag für die Pflege, je nach Pflegegrad. Dazu kommt ein Zuschlag, der mit der Dauer im Heim steigt. Unterkunft, Verpflegung und Investitionskosten zahlen Sie selbst, notfalls hilft das Sozialamt.' },
      { q: 'Was ist Kurzzeitpflege?', a: 'Ein vorübergehender Heimplatz, etwa nach einem Krankenhausaufenthalt oder wenn pflegende Angehörige ausfallen. Die Pflegekasse zahlt ab Pflegegrad 2 bis zu acht Wochen im Jahr.' },
    ],
  },
  fahrt: {
    h1: (c) => `Krankenfahrten in ${c}`,
    title: (c, n) => `Krankenfahrt ${c}: Fahrdienst für Arzt, Dialyse, Reha`,
    intro: 'Taxi- und Fahrdienste, die Krankenfahrten anbieten, zum Beispiel zur Dialyse, Chemo- oder Strahlentherapie oder im Rollstuhl. Wir zeigen nur Dienste, die Krankenfahrten im Namen oder auf ihrer Website nennen.',
    faq: [
      { q: 'Wann zahlt die Krankenkasse die Fahrt?', a: 'Fahrten zur ambulanten Behandlung zahlt die Kasse nur in Ausnahmen und meist nur nach Genehmigung, zum Beispiel zur Dialyse, Chemo- oder Strahlentherapie, oder wenn Sie Pflegegrad 4 oder 5, Pflegegrad 3 mit dauerhaft eingeschränkter Mobilität oder die Merkzeichen aG, Bl oder H haben. Der Arzt stellt dafür eine Verordnung aus.' },
      { q: 'Was muss ich zuzahlen?', a: '10 % der Fahrtkosten, mindestens 5 € und höchstens 10 € pro Fahrt.' },
      { q: 'Wie buche ich eine Krankenfahrt?', a: 'Rufen Sie den Fahrdienst direkt an und sagen Sie, dass es eine Krankenfahrt mit Verordnung ist. Nicht jedes Taxiunternehmen rechnet direkt mit allen Kassen ab, fragen Sie danach.' },
    ],
    guide: '/ratgeber/krankenfahrt-kostenuebernahme/',
  },
};
