// Wandelt einfache OSM-Öffnungszeiten ("Mo-Fr 08:00-18:00; Sa 09:00-12:00") in lesbare Zeilen um.
const DAYS: Record<string, string> = { Mo: 'Montag', Tu: 'Dienstag', We: 'Mittwoch', Th: 'Donnerstag', Fr: 'Freitag', Sa: 'Samstag', Su: 'Sonntag', PH: 'Feiertage' };
export function formatHours(oh: string): string[] | null {
  const parts = oh.split(';').map((p) => p.trim()).filter(Boolean);
  const out: string[] = [];
  for (const p of parts) {
    const m = p.match(/^((?:Mo|Tu|We|Th|Fr|Sa|Su|PH)(?:[-,](?:Mo|Tu|We|Th|Fr|Sa|Su|PH))*)\s+(off|closed|(?:\d\d:\d\d-\d\d:\d\d,?\s*)+)$/);
    if (!m) return null;
    const days = m[1].replace(/(Mo|Tu|We|Th|Fr|Sa|Su|PH)/g, (d) => DAYS[d]).replace(/-/g, ' bis ').replace(/,/g, ', ');
    const times = /off|closed/.test(m[2]) ? 'geschlossen' : m[2].replace(/\s/g, '').split(',').map((t) => t.replace('-', '–') + ' Uhr').join(' und ');
    out.push(`${days}: ${times}`);
  }
  return out;
}
