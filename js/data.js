/* =============================================================================
   GAMBARDELLA — FILE DATI UNICO
   -----------------------------------------------------------------------------
   Questo è l'UNICO file da modificare per aggiornare il sito.
   Cambiare un prezzo, un orario, un numero di telefono o un piatto si fa QUI,
   senza toccare la grafica (css) o la logica (app.js).

   • ORARI: usa il formato 24h "HH:MM". La mezzanotte di chiusura = "24:00".
   • TAG piatti: "vegetariano", "piccante", "specialita", "novita".
   • ALLERGENI (indicativi): G=glutine, L=latticini, U=uova, P=pesce,
     F=frutta a guscio. Sono una guida: confermare sempre allo staff.
   ========================================================================== */

const DATA = {

  /* ---------------------------------------------------------------- AZIENDA */
  business: {
    name: "Gambardella",
    legalName: "Pizzeria Pub Braceria Gambardella",
    tagline: "Pizzeria · Pub · Braceria",
    claim: "Pizza verace, brace e panini. Ad Aversa.",
    dialect: "Uagliù, v’aspett.",                 // frase in copertina
    cuisine: ["Pizza napoletana", "Hamburger", "Braceria", "Pub"],

    address: {
      street: "Via Antonio Gramsci, 74",
      city: "Aversa",
      zip: "81031",
      province: "CE",
      country: "IT",
      area: "Ponte Mezzotta"
    },
    // Coordinate approssimative della zona (Via Gramsci, Ponte Mezzotta).
    geo: { lat: 40.95160, lng: 14.21350 },
    plusCode: "X627+C9 Aversa",

    phone: "+393290746127",            // formato internazionale per i link
    phoneDisplay: "329 074 6127",
    whatsapp: "393290746127",          // senza + e senza spazi

    priceRange: "€€",                  // 10–20 € a persona
    priceRangeLabel: "10–20 € a persona",
    rating: { value: 4.6, count: 40 },

    // Canali esterni confermati
    booking: {
      thefork: "https://thefork.it/ristorante/pub-grill-gambardella-r869001"
    },
    order: {
      // ordini online attivi tramite scheda Google
      google: "https://www.google.com/search?q=Pizzeria+Pub+Braceria+Gambardella+Aversa"
    },
    menuPdf: "https://www.canva.com/design/DAHRjyYUnN0/kUY8X7UJJVvr_wV5w-UYeQ/view",

    // Social: inserire gli URL reali quando disponibili (vedi ASSUNZIONI).
    socials: {
      instagram: "",
      facebook: ""
    },

    // Opzioni dietetiche segnalate
    options: {
      lactoseFree: "Opzione senza lattosio su tutte le pizze (+2€)",
      glutenFree: "Opzioni senza glutine disponibili — chiedere allo staff"
    },

    /* ORARI — array di fasce per ogni giorno (0 = Domenica ... 6 = Sabato) */
    hours: {
      0: [{ open: "12:00", close: "15:00" }, { open: "18:30", close: "24:00" }], // Dom
      1: [{ open: "18:30", close: "24:00" }],                                     // Lun
      2: [{ open: "18:30", close: "24:00" }],                                     // Mar
      3: [{ open: "18:30", close: "24:00" }],                                     // Mer
      4: [{ open: "18:00", close: "24:00" }],                                     // Gio
      5: [{ open: "18:00", close: "24:00" }],                                     // Ven
      6: [{ open: "12:00", close: "14:30" }, { open: "18:30", close: "24:00" }]   // Sab
    },

    services: ["Sul posto", "Asporto", "Consegna a domicilio",
               "Accessibile in sedia a rotelle", "LGBTQ+ friendly"]
  },

  /* ------------------------------------------------------- IMMAGINI / BRAND */
  media: {
    logo: "assets/img/logo.webp",
    hero: "assets/img/pizza-fuoco-oro.webp",
    about: "assets/img/staff.webp"
  },

  /* ----------------------------------------------------- PIATTI IN EVIDENZA
     I più citati dalle recensioni: panini (Jurassic Park), frittura/frittatina,
     crocchè, pizza. Ognuno rimanda alla sua categoria nel menù.          */
  featured: [
    { name: "Jurassic Park", kicker: "Il panino cult", img: "assets/img/panino-jurassic.webp",
      desc: "Hamburger di manzo, cheddar, bacon croccante, anelli di cipolla fritti e barbecue.",
      price: 14, cat: "panini" },
    { name: "Star Wars", kicker: "Panino", img: "assets/img/panino-starwars.webp",
      desc: "Pollo fritto, cheddar, bacon croccante, pomodoro, lattuga e maionese.",
      price: 12, cat: "panini" },
    { name: "Fuoco e Oro", kicker: "La pizza del mese", img: "assets/img/pizza-fuoco-oro.webp",
      desc: "Datterino giallo e rosso, provola di Agerola, pancetta arrotolata e basilico.",
      price: 14, cat: "mese" },
    { name: "I Fritti", kicker: "Crocchè & frittatine", img: "assets/img/fritti.webp",
      desc: "Crocchè, frittatine, anelli di bacon e cheddar fuso. La frittura che tutti nominano.",
      price: 3, cat: "fritti" },
    { name: "A’ faccia d’a dieta", kicker: "Le patate", img: "assets/img/patatine.webp",
      desc: "Steak house, waffle, stick con wurstel e provola. Da condividere (o no).",
      price: 5, cat: "patate" }
  ],

  /* --------------------------------------------------------------- MENÙ */
  categories: [

    { id: "pizze", name: "Le Pizze", items: [
      { name: "Margherita", price: 6, desc: "Pomodoro, fior di latte, basilico e olio.", tags: ["vegetariano"], all: ["G","L"] },
      { name: "Marinara", price: 6, desc: "Pomodoro, origano, aglio e olio.", tags: ["vegetariano"], all: ["G"] },
      { name: "Marinara Special", price: 7, desc: "Pomodoro, origano, acciughe, olive nere, olio e basilico.", tags: [], all: ["G","P"] },
      { name: "Diavola", price: 8, desc: "Pomodoro, fior di latte, salame piccante, olio e basilico.", tags: ["piccante"], all: ["G","L"] },
      { name: "Ripieno", price: 10, desc: "Ricotta, fior di latte, salame, pomodoro, basilico e olio.", tags: [], all: ["G","L"] },
      { name: "Capricciosa", price: 8, desc: "Pomodoro, fior di latte, prosciutto cotto, funghi, salame, basilico e olio.", tags: [], all: ["G","L"] },
      { name: "Capricciosa Special", price: 10, desc: "Prosciutto cotto, funghi, salame, carciofini, olive nere, fior di latte e pomodoro.", tags: [], all: ["G","L"] },
      { name: "Lasagna", price: 9, desc: "Pomodoro, fior di latte, ricotta, prosciutto cotto, pepe, olio e basilico.", tags: [], all: ["G","L"] },
      { name: "Primavera", price: 9, desc: "Fior di latte, salsiccia, patate fritte, pomodorini, basilico e olio.", tags: [], all: ["G","L"] },
      { name: "Pub", price: 8, desc: "Fior di latte, wurstel, patate fritte, olio e basilico.", tags: [], all: ["G","L"] },
      { name: "Siciliana", price: 9, desc: "Pomodoro, fior di latte, melanzane a funghetto, basilico e olio.", tags: ["vegetariano"], all: ["G","L"] },
      { name: "Pizza Fritta", price: 10, desc: "Pomodoro, fior di latte, ricotta, ciccioli, sale e pepe.", tags: [], all: ["G","L"] },
      { name: "Patanella", price: 9, desc: "Salsicce, fior di latte, patate al forno, basilico e olio.", tags: [], all: ["G","L"] },
      { name: "Tonnata", price: 8, desc: "Fior di latte, cipolla, tonno, olive nere, basilico e olio.", tags: [], all: ["G","L","P"] },
      { name: "Pizza Crocchè", price: 9, desc: "Fior di latte, panna, crocchè, prosciutto cotto, olio e basilico.", tags: [], all: ["G","L"] },
      { name: "4 Stagioni", price: 8, desc: "Pomodoro, fior di latte, prosciutto cotto, funghi, salame, basilico e olio.", tags: [], all: ["G","L"] },
      { name: "Bufalina", price: 10, desc: "Pomodorino, fior di latte, mozzarella di bufala, basilico e olio.", tags: ["vegetariano"], all: ["G","L"] },
      { name: "Carrettiera", price: 10, desc: "Fior di latte, salsiccia, friarielli, olio e basilico.", tags: [], all: ["G","L"] },
      { name: "Chef", price: 9, desc: "Fior di latte, panna, funghi, prosciutto cotto, basilico e olio.", tags: [], all: ["G","L"] },
      { name: "Filetto", price: 9, desc: "Fior di latte, pomodorini, olio e basilico.", tags: ["vegetariano"], all: ["G","L"] },
      { name: "Mimosa", price: 9, desc: "Fior di latte, panna, mais, prosciutto cotto, basilico e olio.", tags: [], all: ["G","L"] },
      { name: "4 Formaggi", price: 8, desc: "Fior di latte, emmenthal, gorgonzola, basilico e olio.", tags: ["vegetariano"], all: ["G","L"] },
      { name: "Giardino Reale", price: 10, desc: "Fior di latte, prosciutto crudo, rucola, scaglie di parmigiano, basilico e olio.", tags: [], all: ["G","L"] },
      { name: "Ortolana", price: 9, desc: "Pomodoro, melanzane, peperoni, friarielli, funghi, olio e basilico.", tags: ["vegetariano"], all: ["G"] },
      { name: "Contadina", price: 9, desc: "Pomodoro, fior di latte, salsiccia, peperoni, olio e basilico.", tags: [], all: ["G","L"] },
      { name: "Pistacchio", price: 12, desc: "Pistacchio di Bronte, fior di latte, mortadella, scaglie di parmigiano, olio e basilico.", tags: [], all: ["G","L","F"] },
      { name: "Tronchetto", price: 10, desc: "Fior di latte, emmenthal, prosciutto crudo, rucola e scaglie di parmigiano.", tags: [], all: ["G","L"] },
      { name: "Zucchetta", price: 12, desc: "Crema di zucca, fior di latte, salsicce, scaglie di parmigiano, basilico e olio.", tags: [], all: ["G","L"] },
      { name: "Pesto", price: 12, desc: "Pesto alla genovese, fior di latte, pomodorini, olive nere, basilico e olio.", tags: ["vegetariano"], all: ["G","L","F"] },
      { name: "Contadina Scomposta", price: 12, desc: "Crema di peperoni, fior di latte, olive nere, salsicce, olio e basilico.", tags: [], all: ["G","L"] },
      { name: "Giardino Reale a Filetto", price: 12, desc: "Fior di latte, pomodorini, prosciutto crudo, rucola, scaglie di parmigiano, basilico e olio.", tags: [], all: ["G","L"] }
    ]},

    { id: "speciali", name: "Le Speciali", note: "Le pizze firmate Gambardella.", items: [
      { name: "Stella", price: 12, desc: "Angoli a scelta del pizzaiolo; al centro pomodorini, fior di latte, crudo, rucola e parmigiano.", tags: ["specialita"], all: ["G","L"] },
      { name: "Cappiell e Totò", price: 12, desc: "Cornicione ripieno di ricotta; al centro pomodorini, fior di latte, crudo, rucola e parmigiano.", tags: ["specialita"], all: ["G","L"] },
      { name: "Papillon", price: 12, desc: "Un angolo panna, cotto, fior di latte e mais; uno pomodoro e basilico; al centro ricotta, mozzarella e salame.", tags: ["specialita"], all: ["G","L"] },
      { name: "Racchetta", price: 12, desc: "Manico ripieno di ricotta, fior di latte e salame; al centro salsicce, fior di latte e friarielli.", tags: ["specialita"], all: ["G","L"] },
      { name: "Vesuvio", price: 14, desc: "Dentro ricotta, ciccioli, salame, fior di latte; sopra pomodoro e mozzarella.", tags: ["specialita"], all: ["G","L"] },
      { name: "Racchettone Fritto", price: 15, desc: "Prima fritta poi al forno: manico di ricotta, salsicce, friarielli e provola; al centro montanara.", tags: ["specialita"], all: ["G","L"] },
      { name: "Gambardella", price: 12, desc: "Ricotta di bufala, ciccioli napoletani, provola di Agerola, pepe nero e basilico fresco.", tags: ["specialita"], all: ["G","L"] }
    ]},

    { id: "mese", name: "Le Pizze del Mese", note: "A rotazione, finché ci sono.", items: [
      { name: "Nerano", price: 12, desc: "Crema di zucchine, zucchine fritte, provola di Agerola, parmigiano e basilico.", tags: ["novita","vegetariano"], all: ["G","L"] },
      { name: "Genovese", price: 14, desc: "Carne alla genovese, provola e cipolla.", tags: ["novita"], all: ["G","L"] },
      { name: "Foglie Oro", price: 14, desc: "Datterino giallo e rosso, provola di Agerola, pancetta arrotolata e basilico.", tags: ["novita"], all: ["G","L"] },
      { name: "Pizza del Mese", price: 14, desc: "La proposta speciale del momento — chiedi al banco.", tags: ["novita"], all: ["G","L"] },
      { name: "Parmigiana", price: 14, desc: "Pomodoro, provola di Agerola e parmigiana di melanzane.", tags: ["novita","vegetariano"], all: ["G","L"] }
    ]},

    { id: "panini", name: "I Panini", note: "Nomi da cinema, porzioni da pub.", items: [
      { name: "The Godfather", price: 14, desc: "Doppio hamburger, cheddar fuso, bacon extra croccante, cipolla rossa caramellata e salsa burger.", tags: ["specialita"], all: ["G","L"] },
      { name: "Pulp Fiction", price: 10, desc: "Hamburger di chianina, provola di Agerola e friarielli saltati in padella.", tags: [], all: ["G","L"] },
      { name: "Top Gun", price: 14, desc: "Doppio hamburger di chianina, mortadella, provola impanata, crema di pistacchio e granella.", tags: [], all: ["G","L","F"] },
      { name: "Fight Club", price: 14, desc: "Hamburger di chianina, uovo all’occhio di bue, provola di Agerola, insalata, pomodoro e bacon croccante.", tags: [], all: ["G","L","U"] },
      { name: "Drive", price: 12, desc: "Hamburger di chianina, rucola, provola di Agerola, melanzane grigliate, crudo di Parma e pomodori secchi.", tags: [], all: ["G","L"] },
      { name: "Jurassic Park", price: 14, desc: "Hamburger di manzo, cheddar, bacon croccante, anelli di cipolla fritti e pastellati e salsa barbecue.", tags: ["specialita"], all: ["G","L"] },
      { name: "Forest Gump", price: 12, desc: "Pulled pork, patate french, cheddar, bacon, provola, salsa barbecue e maionese.", tags: [], all: ["G","L","U"] },
      { name: "Grande Lebowski", price: 12, desc: "Porchetta di Ariccia, provola, patate al forno, melanzane grigliate e maionese al pepe nero.", tags: [], all: ["G","L","U"] },
      { name: "The Dark Knight", price: 12, desc: "Porchetta di Ariccia, melanzane a funghetto, prosciutto cotto e provola.", tags: [], all: ["G","L"] },
      { name: "Ghostbusters", price: 12, desc: "Cotoletta di pollo croccante, provola affumicata, patate al forno e maionese al rosmarino.", tags: [], all: ["G","L","U"] },
      { name: "Star Wars", price: 12, desc: "Pollo fritto, cheddar, bacon croccante, pomodoro, lattuga e maionese.", tags: [], all: ["G","L","U"] },
      { name: "Matrix", price: 14, desc: "Cotoletta di pollo ripiena di formaggio filante, cheddar, doppio bacon e salsa burger.", tags: [], all: ["G","L"] }
    ]},

    { id: "baby", name: "Le Box Baby", note: "Panino + patatine + bibita. Componibile a piacere.", items: [
      { name: "Baby Gambardella · Hamburger", price: 7, desc: "Panino con hamburger, patatine fritte e bibita.", tags: [], all: ["G","L"] },
      { name: "Baby Gambardella · Cotoletta", price: 7, desc: "Panino con cotoletta, patatine fritte e bibita.", tags: [], all: ["G","L"] }
    ]},

    { id: "patate", name: "Le Patate", items: [
      { name: "Patatine fritte classiche", price: 5, desc: "La base di tutto.", tags: ["vegetariano"], all: [] },
      { name: "Stick con wurstel e provola", price: 7, desc: "Patatine stick, wurstel e provola.", tags: [], all: ["L"] },
      { name: "Dipper con salsiccia e cheddar", price: 7, desc: "Patatine dipper, salsiccia e cheddar fuso.", tags: [], all: ["L"] },
      { name: "Steak house con porchetta e provola", price: 7, desc: "Patatine steak house, porchetta e provola.", tags: [], all: ["L"] },
      { name: "Waffle con porchetta e cheddar", price: 7, desc: "Patatine waffle, porchetta e cheddar.", tags: [], all: ["L"] }
    ]},

    { id: "fritti", name: "I Fritti", items: [
      { name: "Anelli di bacon con cheddar fuso", price: 7, desc: "4 pezzi.", tags: [], all: ["G","L"] },
      { name: "Alette di pollo con barbecue", price: 7, desc: "4 pezzi.", tags: [], all: [] },
      { name: "Double stick", price: 8, desc: "4 pezzi.", tags: [], all: ["G","L"] },
      { name: "Anelli di cipolla", price: 6, desc: "4 pezzi.", tags: ["vegetariano"], all: ["G"] },
      { name: "Chele di granchio", price: 6, desc: "4 pezzi.", tags: [], all: ["G","P"] },
      { name: "Bruschette classiche", price: 4, desc: "4 pezzi.", tags: ["vegetariano"], all: ["G"] },
      { name: "Bruschette di verdure", price: 6, desc: "Pomodorini/friarielli e provola, melanzane e provola, peperoni e provola.", tags: ["vegetariano"], all: ["G","L"] },
      { name: "Crocchè classico", price: 3, desc: "Patate, prezzemolo, sale e pepe.", tags: ["vegetariano"], all: ["G","L"] },
      { name: "Crocchè prosciutto e provola", price: 4, desc: "Al centro cotto e provola.", tags: [], all: ["G","L"] },
      { name: "Crocchè mortadella e pistacchio", price: 4, desc: "Mortadella, provola e granella di pistacchio.", tags: [], all: ["G","L","F"] },
      { name: "Frittatina classica", price: 3, desc: "Besciamella e carne macinata.", tags: [], all: ["G","L","U"] },
      { name: "Frittatina cacio e pepe", price: 4, desc: "Besciamella, pecorino romano DOP e pepe.", tags: ["vegetariano"], all: ["G","L","U"] }
    ]},

    { id: "tagliate", name: "Le Tagliate", note: "La disponibilità varia con la frollatura.", items: [
      { name: "Filetto di scottona", price: 25, desc: "Alla brace, su rucola selvatica, datterini e veli di Parmigiano Reggiano DOP.", tags: ["specialita"], all: ["L"] },
      { name: "Lombata di Rubia di vacca bianca", price: 30, desc: "Con insalata mista e aceto balsamico.", tags: ["specialita"], all: [] },
      { name: "Controfiletto di Black Angus", price: 25, desc: "A piatto con patate al forno, burro e rosmarino.", tags: ["specialita"], all: ["L"] }
    ]},

    { id: "brace", name: "La Brace", note: "La disponibilità della carne varia con la frollatura.", items: [
      { name: "Hamburger di scottona (250 g)", price: 10, desc: "A piatto con patatine fritte o insalata.", tags: [], all: ["L"] },
      { name: "Spare ribs", price: 10, desc: "Marinate, con barbecue e patate al forno.", tags: [], all: [] }
    ]},

    { id: "bibite", name: "Le Bibite", items: [
      { name: "Acqua naturale 33 cl", price: 2, desc: "", tags: [], all: [] },
      { name: "Acqua frizzante 33 cl", price: 2, desc: "", tags: [], all: [] },
      { name: "Acqua naturale 1 L", price: 3, desc: "", tags: [], all: [] },
      { name: "Acqua frizzante 1 L", price: 3, desc: "", tags: [], all: [] },
      { name: "Coca Cola vetro 20 cl", price: 3, desc: "", tags: [], all: [] },
      { name: "Coca Cola Zero vetro 20 cl", price: 3, desc: "", tags: [], all: [] },
      { name: "Fanta vetro 20 cl", price: 3, desc: "", tags: [], all: [] }
    ]},

    { id: "birre", name: "Birre alla Spina", note: "33 cl — 6 € ciascuna.", items: [
      { name: "Rademberg", price: 6, desc: "German Pilsner · 4,8% vol.", tags: [], all: ["G"] },
      { name: "Brigand 9°", price: 6, desc: "Belgian Strong Ale · 9,0% vol.", tags: [], all: ["G"] },
      { name: "Guinness", price: 6, desc: "Dry Stout · 4,2% vol.", tags: [], all: ["G"] },
      { name: "Agricola", price: 6, desc: "Italian Grape Ale · 7% vol.", tags: [], all: ["G"] }
    ]},

    { id: "amari", name: "Amari, Grappe & Creme", items: [
      { name: "Amaro del Capo", price: 3, desc: "Amaro.", tags: [], all: [] },
      { name: "Amaro Montenero", price: 3, desc: "Amaro.", tags: [], all: [] },
      { name: "Jägermeister", price: 3, desc: "Amaro.", tags: [], all: [] },
      { name: "Amaro Lucano", price: 3, desc: "Amaro.", tags: [], all: [] },
      { name: "Grappa Julia", price: 4, desc: "Grappa.", tags: [], all: [] },
      { name: "Grappa di Amarone", price: 4, desc: "Grappa.", tags: [], all: [] },
      { name: "Limoncello", price: 3, desc: "Crema.", tags: [], all: [] },
      { name: "Meloncello", price: 3, desc: "Crema.", tags: [], all: [] },
      { name: "Anima Nera (liquirizia)", price: 4, desc: "Crema.", tags: [], all: [] }
    ]}
  ],

  allergenLegend: {
    G: "Glutine", L: "Latticini", U: "Uova", P: "Pesce", F: "Frutta a guscio"
  }
};
