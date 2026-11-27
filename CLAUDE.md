# Regeln für dieses Repository (sanitaetshaus-suche.de)

## Darstellung eines Eintrags (gilt für jede Ansicht: Startseiten-Suche, Ortsseiten, Kategorie- und Leistungsseiten, Eintragsseite)
Reihenfolge von oben nach unten, in jeder neuen Ansicht genauso:
1. Bei Top-Einträgen zuerst das Etikett „Anzeige · TOP-Eintrag“, gelber Rahmen. „Anzeige“ bleibt immer sichtbar (§ 5a Abs. 4 UWG, § 6 Abs. 1 Nr. 1 DDG). Die Erklärung erscheint erst nach Klick auf das Etikett (Wunsch JS 21.11.2026), kein Hinweistext über der Liste.
2. Name (Link), Entfernung, ggf. „jetzt geöffnet“.
3. Art und Adresse.
4. Kontakt-Knöpfe (Telefon, Route, E-Mail, Website, Online-Termin).
5. Ganz unten, in eigener Zeile: Siegel „Vom Betrieb bestätigt · MM/JJJJ“ (Komponente Bestaetigt.astro, in der Suche gleiche Optik). Nie neben dem Namen (JS 16.11. und 21.11.2026).

Top-Einträge: höchstens 3 je Liste, nur im gewählten Umkreis, danach alles nach Entfernung.
Die Startseiten-Suche (src/components/Finder.astro) baut ihre Liste in JavaScript selbst. Jede Änderung an ShopCard/ProviderCard muss dort nachgezogen werden und umgekehrt.

## Inhalte
- Keine Anzahl von Einträgen auf der Seite zeigen.
- Jede Kosten- oder Rechtsaussage nennt ihre Norm mit Link (src/lib/recht.ts).
- Besucher werden gesiezt.

## Sprachen (JS 21.11.2026)
- Reihenfolge: Englisch (live 21.11.), Türkisch (live 26.11.), Polnisch (26.11.). Weitere Sprachen nur auf Wunsch von JS. Alle nur in der sparsamen Fassung (JS 21.11.). Aufbau und Anleitung für neue Sprachen: docs/sprachen.md.
- Neue Oberflächentexte in Base.astro oder Finder.astro gehören in src/i18n/de.ts und alle Sprachdateien, nicht direkt in den Code.
- Nur Startseite und Kategorieseiten werden übersetzt, Einträge nie. Keine automatische Umleitung nach Browsersprache, nur der Hinweis oben.
- Auch übersetzt bleibt das Etikett erkennbar als Werbung („Ad · TOP listing“).

## Google-Index (JS 27.11.2026)
- Ortsseiten (Kategorie-, Stadt- und Leistungsseiten) mit weniger als 3 Einträgen im Ort bekommen noindex und fehlen in der Sitemap (Integration `sitemapOhneNoindex` in astro.config.mjs). Grund: Google hatte nur 6 % der Seiten indexiert und die Seite ab 29.10.2026 kaum noch gezeigt; dünne Seiten ziehen die ganze Domain herunter. Neue Kategorien folgen derselben Grenze.
