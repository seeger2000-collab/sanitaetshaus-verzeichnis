// Kategorien des Verzeichnisses. filter = SPARQL-Bedingung auf ?osm (OpenStreetMap über QLever).
// detailPages: eigene Seite pro Eintrag (nur Sanitätshäuser, sonst würden es zu viele dünne Seiten).
// needsEvidence: Eintrag erscheint nur, wenn Name oder Website die Kernleistung belegt (z. B. Taxi mit Krankenfahrten).
const NAME = (re) => `?osm osmkey:name ?nm . FILTER(REGEX(LCASE(?nm), "${re}"))`;

export const CATEGORIES = [
  {
    key: 'sanitaetshaus', slug: 'sanitaetshaus', label: 'Sanitätshäuser', one: 'Sanitätshaus', many: 'Sanitätshäuser', color: '#0f6b57', detailPages: true,
    filter: `?osm osmkey:shop ?v . FILTER(?v IN ("medical_supply","orthopedics","orthopaedics"))`,
  },
  {
    key: 'physio', slug: 'physiotherapie', label: 'Physiotherapie', one: 'Physiotherapie-Praxis', many: 'Physiotherapie-Praxen', color: '#2a5db0',
    filter: `{ ?osm osmkey:healthcare "physiotherapist" } UNION { ?osm osmkey:amenity "physiotherapist" }`,
  },
  {
    key: 'pflege', slug: 'pflegedienst', label: 'Ambulante Pflegedienste', one: 'Pflegedienst', many: 'ambulante Pflegedienste', color: '#a0522d',
    filter: `{ ?osm osmkey:office "nursing_service" } UNION { ?osm osmkey:healthcare ?hc . FILTER(?hc IN ("nursing","home_care")) } UNION { ${NAME('pflegedienst|ambulante pflege|häusliche (kranken)?pflege|sozialstation|diakoniestation|hauskrankenpflege|ambulanter dienst')} }
      FILTER NOT EXISTS { ?osm osmkey:amenity ?am . FILTER(?am IN ("nursing_home","hospital","school","social_facility","pharmacy")) }
      FILTER NOT EXISTS { ?osm osmkey:social_facility "nursing_home" }`,
  },
  {
    key: 'fahrt', slug: 'krankenfahrten', label: 'Krankenfahrten', one: 'Fahrdienst', many: 'Fahrdienste mit Krankenfahrten', color: '#7b3fa0', needsEvidence: 'krankenfahrt',
    filter: `{ ?osm osmkey:amenity "taxi" } UNION { ?osm osmkey:office "taxi" } UNION { ${NAME('krankenfahrt|krankentransport|fahrdienst|rollstuhltaxi|rollstuhlbeförderung|behindertenfahrdienst|patientenfahrt|dialysefahrt')} FILTER NOT EXISTS { ?osm osmkey:emergency ?em } }`,
    nameEvidence: /krankenfahrt|krankentransport|fahrdienst|rollstuhltaxi|rollstuhlbeförderung|behindertenfahrdienst|patientenfahrt|dialysefahrt/i,
  },
];
export const categoryByKey = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));
