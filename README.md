# Website Fliesenleger Roman Delev, Cottbus

Mobilfreundlicher One-Pager für einen Fliesenleger-Betrieb in Cottbus – Ziel: mehr Anfragen und Aufträge.
Nur HTML, CSS und etwas JavaScript, keine Frameworks, keine externen Dateien. Zum Ansehen `index.html`
im Browser öffnen; zum Veröffentlichen den Ordner bei einem Webhoster hochladen (z. B. GitHub Pages, Netlify, IONOS).

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Start, Leistungen, Über uns, Referenzen, Ablauf, Kontakt, Footer |
| `css/style.css` | Design – Farben oben als Variablen (`--navy`, `--grey`, `--accent`) |
| `js/main.js` | Mobilmenü, aktiver Menüpunkt, Formularprüfung und -versand (`CONTACT_EMAIL`, `FORM_ENDPOINT`) |
| `img/` | Favicon und Platzhalterbilder |
| `impressum.html`, `datenschutz.html` | Vorlagen der Pflichtseiten |

## Vor dem Livegang ersetzen

- [ ] Telefon `0355 123 456 78` / `+4935512345678`, E-Mail `kontakt@fliesenleger-delev-beispiel.de` und Adresse `Musterstraße 1` (alle ausgedacht) – per Suchen & Ersetzen in allen HTML-Dateien und `js/main.js`
- [ ] Öffnungszeiten prüfen (Platzhalter: Mo–Fr 7–17 Uhr)
- [ ] „Über uns“-Text und Foto (`img/portrait-platzhalter.svg`)
- [ ] Referenzfotos: echte Bilder z. B. als `img/referenz-1.jpg` ablegen und in `index.html` den Dateinamen anpassen (Bilder vorher auf ca. 1200 px Breite verkleinern)
- [ ] Gelbe Platzhalter-Hinweise entfernen
- [ ] Impressum und Datenschutzerklärung vervollständigen
- [ ] Domain in `canonical` und in den Firmendaten (JSON-LD) in `index.html` anpassen
- [ ] Formular: Standard öffnet das E-Mail-Programm. Besser einen Dienst wie Formspree einrichten und die Adresse in `js/main.js` bei `FORM_ENDPOINT` eintragen (dann Datenschutzerklärung ergänzen)
- [ ] Google-Unternehmensprofil anlegen und auf die Website verlinken
