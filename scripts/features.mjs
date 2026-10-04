// Merkmale, die Google Maps nicht filtert. Erkennung über Stichwörter auf den Websites der Häuser.
// slug = URL-Teil der Leistungsseite, label = Anzeige, patterns = reguläre Ausdrücke (auf kleingeschriebenen Text)
export const FEATURES = [
  { key: 'hausbesuch', short: 'Hausbesuch', slug: 'hausbesuch', label: 'Hausbesuche', title: 'Sanitätshäuser mit Hausbesuch', patterns: [/hausbesuch/, /besuchen sie (gerne |auch )?(zu ?hause|daheim)/, /versorgung (bei ihnen )?zu ?hause/, /im pflegeheim/] },
  { key: 'lymph', short: 'Flachstrick', slug: 'lymph-flachstrick', label: 'Lymph- und Lipödem-Versorgung (Flachstrick)', title: 'Flachstrick-Kompression bei Lymph- und Lipödem', patterns: [/flachstrick/, /lymph(ödem|oedem|ologisch)/, /lip(ö|oe)dem/] },
  { key: 'kompression', short: 'Kompressionsstrümpfe', slug: 'kompressionsstruempfe', label: 'Kompressionsstrümpfe', title: 'Kompressionsstrümpfe anmessen lassen', patterns: [/kompressionsstr(ü|ue)mpf/, /kompressionsversorgung/, /kompressionstherapie/, /medizinische kompression/] },
  { key: 'brustprothetik', short: 'Brustprothetik', slug: 'brustprothetik', label: 'Brustprothetik nach Brust-OP', title: 'Brustprothetik und Spezial-BHs nach Brustkrebs', patterns: [/brustprothe/, /brustepithe/, /nach (einer )?brust(krebs|operation|op\b|amputation)/, /mammaversorgung/, /prothesen-?bh/] },
  { key: 'kinder', short: 'Kinderversorgung', slug: 'kinderversorgung', label: 'Kinderversorgung', title: 'Hilfsmittel und Reha-Versorgung für Kinder', patterns: [/kinderversorgung/, /kinderreha/, /kinder-reha/, /kinderorthop(ä|ae)die/, /p(ä|ae)diatrische/, /kinderrollst(u|ü)hl/, /therapiestuhl/, /versorgung von kindern/] },
  { key: 'rollstuhl', short: 'Rollstuhl-Service', slug: 'rollstuhl-werkstatt', label: 'Rollstuhl-Werkstatt und Reha-Technik', title: 'Rollstuhl-Reparatur und Reha-Technik', patterns: [/rollstuhl-?(service|werkstatt|reparatur|wartung)/, /reha-?werkstatt/, /reha-?technik/, /rehatechnik/, /elektrorollst(u|ü)hl/] },
  { key: 'rollator', short: 'Rollator & Gehhilfen', slug: 'rollator', label: 'Rollatoren und Gehhilfen', title: 'Rollator kaufen oder auf Rezept: Sanitätshäuser', patterns: [/rollator/, /gehhilfe/, /gehwagen/, /unterarmgehst(ü|ue)tze/] },
  { key: 'pflegebett', short: 'Pflegebett', slug: 'pflegebett', label: 'Pflegebetten und Krankenbetten', title: 'Pflegebett und Krankenbett für zu Hause', patterns: [/pflegebett/, /krankenbett/, /niedrigbett/, /pflegebetten/] },
  { key: 'bandagen', short: 'Bandagen', slug: 'bandagen', label: 'Bandagen', title: 'Bandagen anpassen lassen', patterns: [/bandage/] },
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

// Physiotherapie: was in Suchanfragen auftaucht (Hausbesuch, KG am Gerät, Bobath, Lymphdrainage …)
export const PHYSIO_FEATURES = [
  { key: 'hausbesuch', short: 'Hausbesuch', label: 'Hausbesuche', patterns: [/hausbesuch/, /haus-besuch/, /behandlung (bei ihnen )?zu ?hause/, /mobile physiotherapie/] },
  { key: 'lymphdrainage', short: 'Lymphdrainage', label: 'Manuelle Lymphdrainage', patterns: [/lymphdrainage/, /mld/, /komplexe physikalische entstauung/] },
  { key: 'kgg', short: 'KG am Gerät', label: 'Krankengymnastik am Gerät', patterns: [/krankengymnastik am ger(ä|ae)t/, /kg-?ger(ä|ae)t/, /kgg/, /medizinische trainingstherapie/] },
  { key: 'neuro', short: 'Bobath/PNF', label: 'Neurologische Behandlung (Bobath, PNF, Vojta)', patterns: [/bobath/, /pnf/, /vojta/, /kg-?zns/] },
  { key: 'kinder', short: 'Kinder', label: 'Kinderphysiotherapie', patterns: [/kinderphysio/, /physiotherapie f(ü|ue)r kinder/, /s(ä|ae)uglinge/, /vojta/] },
  { key: 'manuelle', short: 'Manuelle Therapie', label: 'Manuelle Therapie', patterns: [/manuelle therapie/] },
  { key: 'schroth', short: 'Schroth', label: 'Skoliosetherapie nach Schroth', patterns: [/schroth/] },
  { key: 'beckenboden', short: 'Beckenboden', label: 'Beckenbodentraining', patterns: [/beckenboden/] },
];
export const PFLEGE_FEATURES = [
  { key: 'intensiv', short: 'Intensivpflege', label: 'Außerklinische Intensivpflege', patterns: [/intensivpflege/, /beatmung/] },
  { key: 'demenz', short: 'Demenz', label: 'Betreuung bei Demenz', patterns: [/demenz/] },
  { key: 'palliativ', short: 'Palliativ', label: 'Palliativpflege', patterns: [/palliativ/, /sapv/] },
  { key: 'kinder', short: 'Kinder', label: 'Kinderkrankenpflege', patterns: [/kinderkrankenpflege/, /kinderintensiv/, /pflege von kindern/] },
  { key: 'verhinderung', short: 'Verhinderungspflege', label: 'Verhinderungspflege', patterns: [/verhinderungspflege/] },
  { key: 'hauswirtschaft', short: 'Haushaltshilfe', label: 'Hauswirtschaftliche Hilfe', patterns: [/hauswirtschaft/, /haushaltshilfe/] },
  { key: 'beratung', short: 'Beratungsbesuch', label: 'Beratungsbesuche nach § 37.3', patterns: [/37\s?(abs\.?\s?)?3/, /beratungsbesuch/, /beratungseinsatz/] },
  { key: 'tagespflege', short: 'Tagespflege', label: 'Tagespflege', patterns: [/tagespflege/] },
];
export const FAHRT_FEATURES = [
  { key: 'krankenfahrt', short: 'Krankenfahrten', label: 'Krankenfahrten (auch auf Kassenschein)', patterns: [/krankenfahrt/, /krankentransport/, /krankenkassenfahrt/, /fahrten zur dialyse/, /dialysefahrt/, /transportschein/] },
  { key: 'rollstuhl', short: 'Rollstuhl', label: 'Fahrten im Rollstuhl', patterns: [/rollstuhl(fahrt|transport|taxi|gerecht|beförderung|befoerderung)/, /im rollstuhl sitzend/, /rampe/] },
  { key: 'tragestuhl', short: 'Tragestuhl/liegend', label: 'Tragestuhl oder liegend', patterns: [/tragestuhl/, /liegend(transport|fahrt)/, /treppenraupe/] },
  { key: 'dialyse', short: 'Dialyse', label: 'Dialysefahrten', patterns: [/dialyse/] },
  { key: 'onkologie', short: 'Chemo/Bestrahlung', label: 'Fahrten zu Chemo und Bestrahlung', patterns: [/bestrahlung/, /chemo/] },
];
export const HEIM_FEATURES = [
  { key: 'kurzzeit', short: 'Kurzzeitpflege', label: 'Kurzzeitpflege', patterns: [/kurzzeitpflege/] },
  { key: 'tagespflege', short: 'Tagespflege', label: 'Tagespflege', patterns: [/tagespflege/] },
  { key: 'demenz', short: 'Demenz', label: 'Demenz-Wohnbereich', patterns: [/demenz/] },
  { key: 'betreutes', short: 'Betreutes Wohnen', label: 'Betreutes Wohnen', patterns: [/betreutes wohnen/, /service-?wohnen/] },
  { key: 'intensiv', short: 'Intensivpflege', label: 'Intensiv- und Beatmungspflege', patterns: [/intensivpflege/, /beatmung/] },
  { key: 'palliativ', short: 'Palliativ', label: 'Palliativpflege', patterns: [/palliativ/] },
];
export const FEATURES_BY_CAT = { sanitaetshaus: FEATURES, physio: PHYSIO_FEATURES, pflege: PFLEGE_FEATURES, heim: HEIM_FEATURES, fahrt: FAHRT_FEATURES };

export function detect(text, cat = 'sanitaetshaus') {
  const t = text.toLowerCase();
  const features = FEATURES_BY_CAT[cat].filter((f) => f.patterns.some((p) => p.test(t))).map((f) => f.key);
  const kassen = KASSEN.filter((k) => k.patterns.some((p) => p.test(t))).map((k) => k.key);
  return { features, kassen };
}
