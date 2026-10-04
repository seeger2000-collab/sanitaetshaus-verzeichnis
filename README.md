# Sanitätshaus-Verzeichnis

Statisches Verzeichnis aller Sanitätshäuser in Deutschland, filterbar nach Leistungen, die Google Maps nicht zeigt (Hausbesuch, Flachstrick-Kompression, Brustprothetik, Kinderversorgung, Rollstuhl-Werkstatt, …).

Live: https://seeger2000-collab.github.io/sanitaetshaus-verzeichnis/

## Wie es funktioniert

1. `npm run fetch:osm`: holt alle `shop=medical_supply`/`shop=orthopedics` in Deutschland aus OpenStreetMap (über den QLever-SPARQL-Endpunkt) nach `data/osm.json`, inkl. Bundesland, Kreis und Gemeinde.
2. `npm run enrich`: liest die Websites der Häuser (Startseite + bis zu 6 passende Unterseiten) und erkennt Leistungen und genannte Krankenkassen per Stichwort (`scripts/features.mjs`). Cache in `data/enrichment.json`, neu geprüft wird nach 30 Tagen.
3. `npm run build`: `scripts/build-data.mjs` erzeugt `src/data/*.json`, danach baut Astro alle Seiten (Stadt, Bundesland, Leistung, Leistung × Stadt, Einzelseite).

GitHub Actions baut bei jedem Push und lädt die Daten jeden Monat neu (`.github/workflows/deploy.yml`).

## Geld verdienen (vorbereitet, noch aus)

- **Top-Einträge:** in `data/overrides.json` für eine OSM-ID `{ "featured": true }` setzen; Zahlungslink in `src/config.ts` (`FEATURED`).
- **Affiliate Pflegehilfsmittel-Box:** Link in `src/config.ts` (`AFFILIATE.pflegeboxUrl`) eintragen, dann erscheint der Hinweis auf Stadt-, Detail- und Leistungsseiten.
- **Korrekturen/Neueinträge:** Formular-URL (z. B. Tally) in `SITE.correctionFormUrl`.

## Vor dem Start

- Impressum in `src/pages/impressum.astro` ausfüllen, dann `SITE.indexing = true` in `src/config.ts` (bis dahin `noindex`).

## Lizenz der Daten

Adressdaten © OpenStreetMap-Mitwirkende, ODbL. Abgeleitete Daten in `data/` und `src/data/` stehen ebenfalls unter ODbL.
