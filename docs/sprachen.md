# Mehrsprachigkeit (Stand 21.11.2026)

Lesen, wenn eine neue Sprache dazukommt oder Oberflächentexte geändert werden.

## Aufbau
- Deutsch liegt unter `/`, jede weitere Sprache unter `/<code>/` (z. B. `/en/`).
- Übersetzt sind nur die Startseite und die Kategorieseiten (`/en/`, `/en/physiotherapie/` …). Orts-, Eintrags-, Leistungs- und Ratgeberseiten bleiben deutsch (Seite hat schon rund 25.000 Seiten, GitHub Pages erlaubt etwa 1 GB).
- Einträge (Namen, Adressen) werden nie übersetzt.
- Impressum und Datenschutz bleiben deutsch; die Übersetzung weist darauf hin, dass die deutsche Fassung maßgeblich ist.
- Texte: `src/i18n/de.ts` (Ausgangssprache) und je Sprache eine Datei mit denselben Schlüsseln (`en.ts`). Platzhalter `{r}`, `{what}` usw. nicht übersetzen.
- hreflang: `Base.astro` setzt `<link rel="alternate" hreflang>` auf allen Seiten mit Übersetzung, die Sitemap verknüpft die Sprachen (`astro.config.mjs`, Option `i18n`).
- Sprachhinweis: Passt die Browsersprache zu einer Übersetzung der aktuellen Seite, erscheint oben einmal „Diese Seite auf X anzeigen?“. Keine automatische Umleitung. Die Wahl wird im Browser unter `sh-sprache` gespeichert.

## Neue Sprache (z. B. Türkisch `tr`)
1. `src/i18n/en.ts` nach `src/i18n/tr.ts` kopieren, `code`, `htmlLang`, `ogLocale`, `dateLocale`, `decimal` anpassen und alle Texte übersetzen. Bei `bedarf.*.words` Suchwörter in der neuen Sprache eintragen.
2. In `src/i18n/index.ts` in `LANGS` eintragen.
3. In `astro.config.mjs` bei `sitemap({ i18n: { locales } })` eintragen.
4. Seiten anlegen: `src/pages/en/` nach `src/pages/tr/` kopieren und darin `const lang = 'en'` bzw. `LANGS.en` auf `tr` ändern.
5. Bauen, Startseite und eine Kategorieseite auf Desktop und Handy prüfen, alle Links testen.

Rechts- oder Kostenaussagen in Übersetzungen nur mit Normzitat (src/lib/recht.ts), sonst weglassen.
