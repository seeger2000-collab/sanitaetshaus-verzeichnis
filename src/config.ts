// Zentrale Einstellungen. Alles, was später Geld bringt, wird hier eingeschaltet.
export const SITE = {
  name: 'Sanitätshaus-Verzeichnis',
  claim: 'Sanitätshäuser in Deutschland nach Leistung finden',
  // Erst auf true stellen, wenn das Impressum ausgefüllt ist. Bis dahin: noindex für Suchmaschinen.
  indexing: false,
  // Formular für Korrekturen und neue Einträge (z. B. Tally). Leer = Link auf GitHub-Issue.
  correctionFormUrl: '',
  repoUrl: 'https://github.com/seeger2000-collab/sanitaetshaus-verzeichnis',
};

// Top-Einträge für Sanitätshäuser (Stripe Payment Link). Leer = Hinweis "bald verfügbar".
export const FEATURED = {
  paymentUrl: '',
  priceText: '',
};

// Affiliate: Pflegehilfsmittel-Box (Kostenübernahme durch die Pflegekasse). Leer = Box wird nicht angezeigt.
export const AFFILIATE = {
  pflegeboxUrl: '',
  pflegeboxAnbieter: '',
};
