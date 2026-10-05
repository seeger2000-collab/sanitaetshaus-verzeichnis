// Normzitate mit Link auf gesetze-im-internet.de bzw. g-ba.de. Texte geprüft am 5. Oktober 2026.
const gii = (g: string, p: string) => `https://www.gesetze-im-internet.de/${g}/__${p}.html`;
const a = (href: string, label: string) => `<a href="${href}" target="_blank" rel="noopener">${label}</a>`;
// § (Paragraph, Gesetz, Zusatz wie „Abs. 8“): sgb5('33', 'Abs. 8') → „§ 33 Abs. 8 SGB V“
export const sgb5 = (p: string, zusatz = '') => a(gii('sgb_5', p), `§ ${p}${zusatz ? ' ' + zusatz : ''} SGB V`);
export const sgb11 = (p: string, zusatz = '') => a(gii('sgb_11', p), `§ ${p}${zusatz ? ' ' + zusatz : ''} SGB XI`);
export const heilmRL = a('https://www.g-ba.de/richtlinien/12/', 'Heilmittel-Richtlinie des G-BA');
export const ktRL = a('https://www.g-ba.de/richtlinien/25/', 'Krankentransport-Richtlinie des G-BA');
export const hmv = a('https://hilfsmittel.gkv-spitzenverband.de/', 'Hilfsmittelverzeichnis');
// Hinweis unter allen Kassen-Tipps
export const GKV_HINWEIS = `Alle Angaben gelten für die gesetzliche Kranken- und Pflegeversicherung. Privat Krankenversicherte bekommen, was ihr Tarif vorsieht. Die private Pflegepflichtversicherung muss gleichwertige Leistungen wie die gesetzliche bieten, meist als Kostenerstattung (${sgb11('23', 'Abs. 1')}). Wer beihilfeberechtigt ist, richtet sich zusätzlich nach der Beihilfeverordnung seines Dienstherrn.`;
export const stripTags = (s: string) => s.replace(/<[^>]+>/g, '');
