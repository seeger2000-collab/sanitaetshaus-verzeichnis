// PLZ-Bereiche (erste zwei Ziffern) als Einstieg: "Sanitätshaus PLZ 04" usw.
import { shops, providers, allCities } from './data';

export type Zone = { zone: string; label: string; cities: { slug: string; label: string }[] };
const all = [...shops.map((s) => ({ postcode: s.postcode, citySlug: s.citySlug })), ...providers.map((p) => ({ postcode: p.postcode, citySlug: p.citySlug }))];
const cityLabel = Object.fromEntries(allCities.map((c) => [c.slug, c.label]));
const byZone = new Map<string, Map<string, number>>();
for (const e of all) {
  if (!e.postcode || !/^\d{5}$/.test(e.postcode)) continue;
  const z = e.postcode.slice(0, 2);
  if (!byZone.has(z)) byZone.set(z, new Map());
  const m = byZone.get(z)!;
  m.set(e.citySlug, (m.get(e.citySlug) || 0) + 1);
}
export const zones: Zone[] = [...byZone.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([zone, m]) => {
  const cities = [...m.entries()].sort((a, b) => b[1] - a[1]).map(([slug]) => ({ slug, label: cityLabel[slug] ?? slug }));
  return { zone, label: cities.slice(0, 2).map((c) => c.label).join(', '), cities };
});
export const zoneOf = (postcode?: string | null) => (postcode && /^\d{5}$/.test(postcode) ? postcode.slice(0, 2) : null);
