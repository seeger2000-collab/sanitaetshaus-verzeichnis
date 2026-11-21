# Klickzählung je Betrieb (GoatCounter)

Wann lesen: wenn ein Betrieb wissen will, wie oft er über die Seite kontaktiert wurde, oder wenn ein Verkaufsgespräch für einen Top-Eintrag Zahlen braucht.

## Was gezählt wird
Jeder Klick auf einen Kontakt-Knopf eines Eintrags wird in GoatCounter als **Ereignis** gezählt:

    klick/<art>/<eintrags-id>

- `<art>`: `telefon`, `route`, `email`, `website`, `buchung` (Online-Termin)
- `<eintrags-id>`: `<kategorie>/<OSM-ID mit Bindestrich>`, z. B. `sanitaetshaus/node-10753626300`, `pflegedienst/way-266238878`. Gebildet in `scripts/build-data.mjs` (`eintragId`) und `src/components/Kontakt.astro`, beide gleich.
- Titel des Ereignisses: Name des Betriebs.

Gezählt wird in allen Ansichten gleich (Startseiten-Suche, Orts-, Kategorie-, Leistungs- und Eintragsseite). Code: Klick-Listener in `src/layouts/Base.astro`. Ohne Einwilligung per Zählbild, mit Einwilligung über das GoatCounter-Skript. Der Knopf „Telefonnummer ergänzen“ wird nicht gezählt.

Achtung: Die ID hängt an der OpenStreetMap-ID. Ändert sich der OSM-Eintrag grundlegend (gelöscht und neu angelegt), bekommt der Betrieb eine neue ID. Bei Auswertungen beide IDs zusammenzählen.

## Auswertung für einen Betrieb erzeugen (auf Anfrage)
1. Eintrags-ID herausfinden: in `src/data/shops.json` bzw. `providers.json` nach dem Namen suchen, `cat` und `id` ablesen (`/` in der ID wird zu `-`).
2. Schnell ansehen: Dashboard https://sanitaetshaus-suche.goatcounter.com, Zeitraum wählen, im Filterfeld die Eintrags-ID eingeben. Es erscheinen die fünf Zeilen `klick/<art>/<id>` mit Zahlen.
3. Als Datei für den Betrieb: GoatCounter → Settings → Export → „Start export“ (CSV mit jedem Treffer, Spalten u. a. Path, Event, Date). Die Zeilen mit der Eintrags-ID nach Art und Monat zusammenzählen. Alternativ per API (Settings → API → Token mit Leserecht; Token nur in `.env`, nie ins Repo) mit `GET /api/v0/stats/hits?filter=<eintrags-id>`.
4. Bericht: Zeitraum, Klicks je Art, Summe, dazu Seitenaufrufe der Eintragsseite (`/sanitaetshaus/<slug>/`) falls vorhanden. Hinweis aufnehmen: Zahlen sind Klicks auf Knöpfe, keine tatsächlichen Anrufe oder Besuche; Besucher, die Werbeblocker nutzen, fehlen.

Ein fertiges Skript gibt es noch nicht (Wunsch JS 21.11.2026: erst bauen, wenn der erste Betrieb fragt).
