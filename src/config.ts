// Zentrale Einstellungen. Alles, was später Geld bringt, wird hier eingeschaltet.
export const SITE = {
  name: 'Sanitätshaus-Suche',
  claim: 'Sanitätshaus, Physiotherapie, Pflege und Krankenfahrten in der Nähe',
  // Erst auf true stellen, wenn das Impressum ausgefüllt ist. Bis dahin: noindex für Suchmaschinen.
  indexing: true,
  // Formular für Korrekturen und neue Einträge (z. B. Tally). Leer = Link auf GitHub-Issue.
  correctionFormUrl: '',
  repoUrl: 'https://github.com/seeger2000-collab/sanitaetshaus-verzeichnis',
  // Straßenfotos aus Panoramax/Mapillary anzeigen. Aus, weil frei verfügbare Fotos meist nur die Straße zeigen, nicht die Fassade.
  streetPhotos: false,
};

// Top-Einträge für Sanitätshäuser (Stripe Payment Link). Leer = Hinweis "bald verfügbar".
export const FEATURED = {
  paymentUrl: '',
  priceText: '',
};

// Affiliate-Links. Alles leer = keine Werbelinks auf der Seite. Eintragen, sobald die Partnerprogramme bestätigt sind.
export const AFFILIATE = {
  // Amazon PartnerNet (kostenlos): Partner-Tag, z. B. "meinname-21". Dann erscheinen Kauf-Links in den Ratgebern.
  amazonTag: '',
  // Pflegebox (z. B. PflegeBox.de über Awin, pflegebox by pflegetipp, Pflegehase): Deeplink inkl. Tracking
  pflegeboxUrl: '',
  pflegeboxAnbieter: '',
  // Online-Sanitätshaus (z. B. WalzVital über Awin, Sani-Fuchs): Deeplink-Basis, an die ?q=… nicht angehängt wird
  sanishopUrl: '',
  sanishopName: '',
  // Hausnotruf (z. B. Libify, GEOCARE, Pflegehase): Deeplink
  hausnotrufUrl: '',
  hausnotrufAnbieter: '',
};
