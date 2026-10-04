// Bedarfs-Kategorien: wonach Menschen suchen (siehe suchanfragen.md), abgebildet auf Kategorien und Leistungen.
// match: Liste von [Kategorie, Leistung oder '*' für alle Einträge der Kategorie]
export const BEDARF = [
  { key: 'strumpf', label: 'Stützstrümpfe & Kompressionsstrümpfe', short: 'Stützstrümpfe', match: [['sanitaetshaus', 'kompression'], ['sanitaetshaus', 'lymph']], leistung: 'kompressionsstruempfe' },
  { key: 'einlagen', label: 'Einlagen & orthopädische Schuhe', short: 'Einlagen', match: [['sanitaetshaus', 'einlagen'], ['sanitaetshaus', 'schuhtechnik']], leistung: 'einlagen-fussanalyse' },
  { key: 'rollator', label: 'Rollator & Gehhilfen', short: 'Rollator', match: [['sanitaetshaus', 'rollator']], leistung: 'rollator' },
  { key: 'pflegebett', label: 'Pflegebett & Krankenbett', short: 'Pflegebett', match: [['sanitaetshaus', 'pflegebett']], leistung: 'pflegebett' },
  { key: 'rollstuhl', label: 'Rollstuhl & Reparatur', short: 'Rollstuhl', match: [['sanitaetshaus', 'rollstuhl']], leistung: 'rollstuhl-werkstatt' },
  { key: 'bandagen', label: 'Bandagen, Orthesen & Prothesen', short: 'Bandagen', match: [['sanitaetshaus', 'bandagen'], ['sanitaetshaus', 'orthopaedietechnik']], leistung: 'prothesen-orthesen' },
  { key: 'brust', label: 'Brustprothese nach Brust-OP', short: 'Brustprothese', match: [['sanitaetshaus', 'brustprothetik']], leistung: 'brustprothetik' },
  { key: 'inko', label: 'Inkontinenz & Stoma', short: 'Inkontinenz', match: [['sanitaetshaus', 'stoma']], leistung: 'stoma-inkontinenz' },
  { key: 'pflegebox', label: 'Pflegebox & Pflegehilfsmittel', short: 'Pflegebox', match: [['sanitaetshaus', 'pflegehilfsmittel']], leistung: 'pflegehilfsmittel' },
  { key: 'zuhause', label: 'Versorgung zu Hause', short: 'Zu Hause', hint: 'Pflegedienste und Hausbesuche', match: [['pflege', '*'], ['sanitaetshaus', 'hausbesuch'], ['physio', 'hausbesuch']], seite: 'pflegedienst' },
  { key: 'physio', label: 'Physiotherapie', short: 'Physiotherapie', match: [['physio', '*']], seite: 'physiotherapie' },
  { key: 'fahrt', label: 'Fahrt zur Behandlung', short: 'Krankenfahrt', hint: 'Krankenfahrten, Dialyse, Chemo', match: [['fahrt', '*']], seite: 'krankenfahrten' },
  { key: 'sanitaetshaus', label: 'Sanitätshaus allgemein', short: 'Sanitätshaus', match: [['sanitaetshaus', '*']] },
];
export const bedarfMask = (entry) => BEDARF.reduce((m, b, i) => (b.match.some(([c, f]) => entry.cat === c && (f === '*' || entry.features.includes(f))) ? m | (1 << i) : m), 0);
