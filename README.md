# Gambardella — sito statico

Pizzeria Pub Braceria Gambardella (Aversa, CE). HTML + CSS + JS vanilla, **zero build**, pronto per GitHub Pages.

## Struttura
```
index.html          → la pagina (SEO + schema JSON-LD)
css/style.css       → stile (palette brand nei :root)
js/data.js          → ⭐ UNICO file dati: menù, prezzi, orari, telefono, social
js/app.js           → logica (aperto/chiuso, menù, prenotazione WhatsApp)
assets/img/         → foto in .webp
.nojekyll           → serve i file così come sono su GitHub Pages
robots.txt / sitemap.xml
```

## Aggiornare il sito
Apri **`js/data.js`** e modifica una riga. Esempi:
- **Prezzo:** cambia `price: 8` nel piatto.
- **Orario:** modifica la fascia in `hours` (formato `"HH:MM"`, mezzanotte = `"24:00"`).
- **Telefono / WhatsApp:** campi `phone`, `phoneDisplay`, `whatsapp`.
- **Instagram / Facebook:** campi `socials.instagram` / `socials.facebook` (se vuoti, i bottoni spariscono da soli).

Non serve toccare `css` o `app.js`.

## Pubblicare su GitHub Pages
1. Crea un repo e carica questi file nella root.
2. Settings → Pages → Branch `main` / `/root` → Save.
3. Online in ~1 min. Per un dominio (es. `gambardella.it`) aggiungi un file `CNAME` e aggiorna gli URL assoluti in `index.html` (canonical, og:image, schema).

Sito by SCINTILLA.DIGITAL.WEB
