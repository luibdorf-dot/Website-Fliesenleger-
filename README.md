# Website Fliesenleger Cottbus

Statische One-Page-Website für einen Fliesenleger in Cottbus – ausgerichtet auf **mehr Anfragen und Aufträge**.
Kein Build-Schritt nötig: `index.html` im Browser öffnen oder den Ordner bei einem beliebigen Webhoster hochladen
(z. B. GitHub Pages, Netlify, Strato, IONOS).

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Hero mit Schnellanfrage, Leistungen, Vorteile, Ablauf, Referenzen, Kundenstimmen, Einzugsgebiet, FAQ, Kontaktformular |
| `impressum.html`, `datenschutz.html` | Rechtliche Seiten (Vorlagen) |
| `css/style.css` | Gestaltung; Farben oben als Variablen (`--c-primary`, `--c-accent`) |
| `js/main.js` | Mobilmenü und Formularversand; oben `CONTACT_EMAIL` und `FORM_ENDPOINT` |

## Was auf Anfragen optimiert ist

- Telefonnummer und „Angebot anfragen“ immer sichtbar (Kopfzeile, auf dem Handy feste Leiste unten)
- Kurzes Rückruf-Formular direkt im ersten Bildschirm, ausführliches Formular am Ende
- Vertrauenselemente: Festpreis, kostenlose Besichtigung, Ablauf in 4 Schritten, Kundenstimmen, FAQ
- Lokale Suchmaschinenoptimierung: „Fliesenleger Cottbus“ in Titel/Überschriften, Orte im Umkreis, strukturierte Daten (schema.org)

## Vor dem Livegang ersetzen (Platzhalter)

- [ ] Firmenname „Fliesen Mustermann“ (überall per Suchen & Ersetzen)
- [ ] Telefon `0355 123 456 78` / `+4935512345678` und E-Mail `kontakt@fliesenleger-beispiel.de` (ausgedacht)
- [ ] Zahlen in der Vertrauensleiste (Jahre Erfahrung, Projekte) – nur echte Werte angeben
- [ ] Referenzbilder: echte Projektfotos in `img/` ablegen und in den `<figure>` als `<img>` einsetzen
- [ ] Kundenstimmen: nur echte Bewertungen verwenden (erfundene Bewertungen sind wettbewerbswidrig)
- [ ] Gelbe „Platzhalter“-Hinweise entfernen
- [ ] Impressum und Datenschutzerklärung vollständig ausfüllen
- [ ] Domain in `canonical` und JSON-LD (`index.html`) anpassen
- [ ] Formularversand: Standard öffnet das E-Mail-Programm des Besuchers. Besser: kostenlosen Dienst wie Formspree oder Web3Forms einrichten und die URL in `js/main.js` bei `FORM_ENDPOINT` eintragen
- [ ] Google-Unternehmensprofil anlegen/pflegen – bringt bei Handwerkern oft die meisten Anfragen
