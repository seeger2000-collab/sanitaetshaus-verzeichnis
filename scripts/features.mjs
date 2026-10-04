// Merkmale, die Google Maps nicht filtert. Erkennung über Stichwörter auf den Websites der Häuser.
// slug = URL-Teil der Leistungsseite, label = Anzeige, patterns = reguläre Ausdrücke (auf kleingeschriebenen Text)
export const FEATURES = [
  { key: 'hausbesuch', short: 'Hausbesuch', slug: 'hausbesuch', label: 'Hausbesuche', title: 'Sanitätshäuser mit Hausbesuch', patterns: [/hausbesuch/, /besuchen sie (gerne |auch )?(zu ?hause|daheim)/, /versorgung (bei ihnen )?zu ?hause/, /im pflegeheim/] },
  { key: 'lymph', short: 'Flachstrick', slug: 'lymph-flachstrick', label: 'Lymph- und Lipödem-Versorgung (Flachstrick)', title: 'Flachstrick-Kompression bei Lymph- und Lipödem', patterns: [/flachstrick/, /lymph(ödem|oedem|ologisch)/, /lip(ö|oe)dem/] },
  { key: 'kompression', short: 'Kompressionsstrümpfe', slug: 'kompressionsstruempfe', label: 'Kompressionsstrümpfe', title: 'Kompressionsstrümpfe anmessen lassen', patterns: [/kompressionsstr(ü|ue)mpf/, /kompressionsversorgung/, /kompressionstherapie/, /medizinische kompression/] },
  { key: 'brustprothetik', short: 'Brustprothetik', slug: 'brustprothetik', label: 'Brustprothetik nach Brust-OP', title: 'Brustprothetik und Spezial-BHs nach Brustkrebs', patterns: [/brustprothe/, /brustepithe/, /nach (einer )?brust(krebs|operation|op\b|amputation)/, /mammaversorgung/, /prothesen-?bh/] },
  { key: 'kinder', short: 'Kinderversorgung', slug: 'kinderversorgung', label: 'Kinderversorgung', title: 'Hilfsmittel und Reha-Versorgung für Kinder', patterns: [/kinderversorgung/, /kinderreha/, /kinder-reha/, /kinderorthop(ä|ae)die/, /p(ä|ae)diatrische/, /kinderrollst(u|ü)hl/, /therapiestuhl/, /versorgung von kindern/] },
  { key: 'rollstuhl', short: 'Rollstuhl-Service', slug: 'rollstuhl-werkstatt', label: 'Rollstuhl-Werkstatt und Reha-Technik', title: 'Rollstuhl-Reparatur und Reha-Technik', patterns: [/rollstuhl-?(service|werkstatt|reparatur|wartung)/, /reha-?werkstatt/, /reha-?technik/, /rehatechnik/, /elektrorollst(u|ü)hl/] },
  { key: 'einlagen', short: 'Einlagen & Fußanalyse', slug: 'einlagen-fussanalyse', label: 'Einlagen mit Fußanalyse', title: 'Orthopädische Einlagen mit Fußscan und Fußdruckmessung', patterns: [/fu(ß|ss)-?scan/, /fu(ß|ss)druckmessung/, /fu(ß|ss)analyse/, /pedobarograph/, /laufanalyse/, /ganganalyse/] },
  { key: 'orthopaedietechnik', short: 'Prothesen & Orthesen', slug: 'prothesen-orthesen', label: 'Prothesen und Orthesen (eigene Werkstatt)', title: 'Orthopädietechnik: Prothesen und Orthesen', patterns: [/orthop(ä|ae)dietechni/, /beinprothe/, /armprothe/, /prothetik/, /orthetik/] },
  { key: 'schuhtechnik', short: 'Orthopädieschuhe', slug: 'orthopaedische-schuhe', label: 'Orthopädie-Schuhtechnik', title: 'Orthopädische Maßschuhe und Schuhzurichtung', patterns: [/orthop(ä|ae)die-?schuhtechn/, /ma(ß|ss)schuh/, /schuhzurichtung/] },
  { key: 'stoma', short: 'Stoma & Inkontinenz', slug: 'stoma-inkontinenz', label: 'Stoma- und Inkontinenzversorgung', title: 'Stoma- und Inkontinenzversorgung', patterns: [/stoma/, /inkontinenz/, /homecare/] },
  { key: 'milchpumpe', short: 'Milchpumpe mieten', slug: 'milchpumpe-mieten', label: 'Milchpumpen-Verleih', title: 'Milchpumpe mieten', patterns: [/milchpumpe/] },
  { key: 'pflegehilfsmittel', short: 'Pflegehilfsmittel', slug: 'pflegehilfsmittel', label: 'Pflegehilfsmittel (Pflegebox)', title: 'Pflegehilfsmittel zum Verbrauch über die Pflegekasse', patterns: [/pflegehilfsmittel/, /pflegebox/, /zum verbrauch bestimmt/] },
];

// Krankenkassen, die auf der Website genannt werden. Eine Nennung ist kein Beleg für einen Vertrag.
export const KASSEN = [
  { key: 'aok', label: 'AOK', patterns: [/\baok\b/] },
  { key: 'tk', label: 'Techniker Krankenkasse', patterns: [/techniker krankenkasse/, /\btk\b(?!-)/] },
  { key: 'barmer', label: 'Barmer', patterns: [/\bbarmer\b/] },
  { key: 'dak', label: 'DAK-Gesundheit', patterns: [/\bdak\b/] },
  { key: 'ikk', label: 'IKK', patterns: [/\bikk\b/] },
  { key: 'bkk', label: 'BKK', patterns: [/\bbkk\b/] },
  { key: 'kkh', label: 'KKH', patterns: [/\bkkh\b/] },
  { key: 'hkk', label: 'hkk', patterns: [/\bhkk\b/] },
  { key: 'knappschaft', label: 'Knappschaft', patterns: [/knappschaft/] },
  { key: 'alle', label: 'alle Kassen', patterns: [/(alle|allen|sämtlichen|s(ä|ae)mtliche) (gesetzlichen )?(kranken)?kassen/] },
];

export function detect(text) {
  const t = text.toLowerCase();
  const features = FEATURES.filter((f) => f.patterns.some((p) => p.test(t))).map((f) => f.key);
  const kassen = KASSEN.filter((k) => k.patterns.some((p) => p.test(t))).map((k) => k.key);
  return { features, kassen };
}
