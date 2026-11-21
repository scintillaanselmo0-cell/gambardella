/* =============================================================================
   GAMBARDELLA — LOGICA (vanilla JS, nessuna dipendenza)
   Legge sempre da DATA (data.js). Non contiene testi o prezzi: solo logica.
   ========================================================================== */
(function () {
  "use strict";
  const B = DATA.business;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const euro = (n) => "€ " + Number(n).toFixed(2).replace(".", ",").replace(",00", "");
  const DAYS = ["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"];
  const toMin = (hhmm) => { const [h,m] = hhmm.split(":").map(Number); return h*60+m; };

  /* ---------------------------------------------------- APERTO ORA / CHIUSO */
  // Ritorna {open:boolean, label:string, nextChange:string}
  function openState(now = new Date()) {
    const dow = now.getDay();
    const mins = now.getHours()*60 + now.getMinutes();
    const todays = B.hours[dow] || [];
    for (const f of todays) {
      const o = toMin(f.open), c = toMin(f.close); // close può essere 1440 (24:00)
      if (mins >= o && mins < c) {
        const closeTxt = f.close === "24:00" ? "00:00" : f.close;
        return { open: true, label: "Aperto ora", detail: "fino alle " + closeTxt };
      }
    }
    // Non aperto: trova la prossima apertura (oggi più tardi, poi giorni seguenti)
    for (const f of todays) {
      if (mins < toMin(f.open)) return { open: false, label: "Chiuso ora", detail: "apre alle " + f.open };
    }
    for (let i = 1; i <= 7; i++) {
      const d = (dow + i) % 7;
      const list = B.hours[d] || [];
      if (list.length) {
        const when = i === 1 ? "domani" : DAYS[d].toLowerCase();
        return { open: false, label: "Chiuso ora", detail: "apre " + when + " alle " + list[0].open };
      }
    }
    return { open: false, label: "Chiuso", detail: "" };
  }

  function renderOpenBadges() {
    const s = openState();
    $$("[data-openbadge]").forEach(el => {
      el.classList.toggle("is-open", s.open);
      el.classList.toggle("is-closed", !s.open);
      const dot = el.querySelector("[data-dot]");
      const txt = el.querySelector("[data-txt]");
      if (txt) txt.textContent = s.detail ? `${s.label} · ${s.detail}` : s.label;
      if (dot) dot.setAttribute("aria-hidden", "true");
      el.setAttribute("aria-label", s.detail ? `${s.label}, ${s.detail}` : s.label);
    });
  }

  /* -------------------------------------------------------- ORARI (CONTATTI) */
  function renderHours() {
    const wrap = $("#hours-list"); if (!wrap) return;
    const today = new Date().getDay();
    const order = [1,2,3,4,5,6,0]; // Lun→Dom
    wrap.innerHTML = order.map(d => {
      const list = B.hours[d] || [];
      const txt = list.length
        ? list.map(f => `${f.open}–${f.close === "24:00" ? "00:00" : f.close}`).join(" · ")
        : "Chiuso";
      return `<li class="${d===today?'is-today':''}"><span>${DAYS[d]}</span><span>${txt}</span></li>`;
    }).join("");
  }

  /* ------------------------------------------------------------- EVIDENZA */
  function renderFeatured() {
    const wrap = $("#featured-grid"); if (!wrap) return;
    wrap.innerHTML = DATA.featured.map((f, i) => `
      <a class="feat" href="#cat-${f.cat}">
        <div class="feat__img">
          <img src="${f.img}" alt="${f.name} — Gambardella" width="1000" height="1250"
               loading="lazy" decoding="async">
        </div>
        <div class="feat__body">
          <span class="kicker">${f.kicker}</span>
          <h3>${f.name}</h3>
          <p>${f.desc}</p>
          <span class="feat__price">da ${euro(f.price)}</span>
        </div>
      </a>`).join("");
  }

  /* ---------------------------------------------------------------- MENÙ */
  const TAGLABEL = { vegetariano:"Vegetariano", piccante:"Piccante", specialita:"Specialità", novita:"Novità" };
  function renderMenu() {
    const nav  = $("#menu-nav");
    const wrap = $("#menu-sections");
    if (!wrap) return;
    if (nav) {
      nav.innerHTML = DATA.categories.map(c =>
        `<a href="#cat-${c.id}" data-jump="${c.id}">${c.name}</a>`).join("");
    }
    wrap.innerHTML = DATA.categories.map(c => `
      <section class="cat" id="cat-${c.id}">
        <header class="cat__head">
          <h3>${c.name}</h3>
          ${c.note ? `<p class="cat__note">${c.note}</p>` : ""}
        </header>
        <ul class="cat__list">
          ${c.items.map(it => `
            <li class="dish">
              <div class="dish__top">
                <span class="dish__name">${it.name}</span>
                <span class="dish__dots" aria-hidden="true"></span>
                <span class="dish__price">${euro(it.price)}</span>
              </div>
              ${it.desc ? `<p class="dish__desc">${it.desc}</p>` : ""}
              ${(it.tags && it.tags.length) || (it.all && it.all.length) ? `
                <div class="dish__meta">
                  ${(it.tags||[]).map(t => `<span class="tag tag--${t}">${TAGLABEL[t]||t}</span>`).join("")}
                  ${(it.all||[]).map(a => `<abbr class="all" title="${DATA.allergenLegend[a]||a}">${a}</abbr>`).join("")}
                </div>` : ""}
            </li>`).join("")}
        </ul>
      </section>`).join("");
  }

  /* ------------------------------------------------- SLOT ORARI PRENOTAZIONE */
  function slotsForDate(dateStr) {
    if (!dateStr) return [];
    const d = new Date(dateStr + "T00:00:00");
    const list = B.hours[d.getDay()] || [];
    const out = [];
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    const nowMin = now.getHours()*60 + now.getMinutes();
    list.forEach(f => {
      let t = toMin(f.open);
      const end = toMin(f.close); // ultimo slot 30' prima della chiusura
      for (; t <= end - 30; t += 15) {
        if (isToday && t <= nowMin + 30) continue; // almeno 30' di margine
        const hh = String(Math.floor(t/60)).padStart(2,"0");
        const mm = String(t%60).padStart(2,"0");
        out.push(`${hh}:${mm}`);
      }
    });
    return out;
  }

  /* -------------------------------------------------- FORM PRENOTAZIONE */
  function setupBooking() {
    const form = $("#booking-form"); if (!form) return;
    const fName = $("#bk-nome"), fNum = $("#bk-persone"),
          fDate = $("#bk-data"), fTime = $("#bk-orario"),
          done = $("#booking-done");

    // data minima = oggi
    const today = new Date(); const tzoff = today.getTimezoneOffset()*60000;
    const isoToday = new Date(today - tzoff).toISOString().slice(0,10);
    fDate.min = isoToday;
    fDate.value = isoToday;

    function refreshTimes() {
      const slots = slotsForDate(fDate.value);
      if (!slots.length) {
        fTime.innerHTML = `<option value="">— chiuso in questa data —</option>`;
        fTime.disabled = true;
      } else {
        fTime.disabled = false;
        fTime.innerHTML = `<option value="">Scegli l’orario</option>` +
          slots.map(s => `<option value="${s}">${s}</option>`).join("");
      }
    }
    fDate.addEventListener("change", () => { clearErr(fDate); refreshTimes(); });
    refreshTimes();

    const err = (el, msg) => {
      const small = el.parentElement.querySelector(".err");
      if (small) small.textContent = msg;
      el.setAttribute("aria-invalid","true");
    };
    const clearErr = (el) => {
      const small = el.parentElement.querySelector(".err");
      if (small) small.textContent = "";
      el.removeAttribute("aria-invalid");
    };
    [fName,fNum,fDate,fTime].forEach(el => el.addEventListener("input", () => clearErr(el)));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      if (!fName.value.trim()) { err(fName, "Inserisci il tuo nome."); ok = false; }
      const n = parseInt(fNum.value, 10);
      if (!n || n < 1 || n > 20) { err(fNum, "Da 1 a 20 persone."); ok = false; }
      if (!fDate.value || fDate.value < isoToday) { err(fDate, "Scegli una data valida."); ok = false; }
      if (!fTime.value) { err(fTime, "Scegli un orario disponibile."); ok = false; }
      if (!ok) { form.querySelector('[aria-invalid="true"]')?.focus(); return; }

      const [y,m,dd] = fDate.value.split("-");
      const dataIt = `${dd}/${m}/${y}`;
      const msg = `Ciao, vorrei prenotare un tavolo.%0A` +
                  `Nome: ${encodeURIComponent(fName.value.trim())}%0A` +
                  `Persone: ${n}%0A` +
                  `Data: ${dataIt}%0A` +
                  `Orario: ${fTime.value}`;
      const url = `https://wa.me/${B.whatsapp}?text=${msg}`;

      // stato di conferma ONESTO sul flusso
      done.hidden = false;
      done.scrollIntoView({ behavior: "smooth", block: "center" });
      window.open(url, "_blank", "noopener");
    });
  }

  /* ------------------------------------------------------- LINK DINAMICI */
  function wireLinks() {
    const waBook = `https://wa.me/${B.whatsapp}?text=${
      "Ciao, vorrei prenotare un tavolo per…".split(" ").map(encodeURIComponent).join("%20")}`;
    $$("[data-tel]").forEach(a => { a.href = "tel:" + B.phone; });
    $$("[data-wa]").forEach(a => { a.href = waBook; });
    $$("[data-thefork]").forEach(a => { a.href = B.booking.thefork; });
    $$("[data-order]").forEach(a => { a.href = B.order.google; });
    $$("[data-menupdf]").forEach(a => { a.href = B.menuPdf; });

    // social: mostra solo se presenti
    const ig = B.socials.instagram, fb = B.socials.facebook;
    $$("[data-ig]").forEach(a => { if (ig) a.href = ig; else a.remove(); });
    $$("[data-fb]").forEach(a => { if (fb) a.href = fb; else a.remove(); });

    // testi anagrafici
    $$("[data-phone-text]").forEach(e => e.textContent = B.phoneDisplay);
    $$("[data-addr-text]").forEach(e =>
      e.textContent = `${B.address.street}, ${B.address.zip} ${B.address.city} (${B.address.province})`);
  }

  /* ----------------------------------------------------------- MAPPA */
  function renderMap() {
    const f = $("#map-frame"); if (!f) return;
    const q = encodeURIComponent(`${B.legalName}, ${B.address.street}, ${B.address.city} ${B.address.province}`);
    f.src = `https://www.google.com/maps?q=${q}&z=16&output=embed`;
  }

  /* ---------------------------------------------------- NAV MOBILE + SCROLL */
  function setupNav() {
    const toggle = $("#nav-toggle"), menu = $("#site-nav");
    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        const open = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      menu.addEventListener("click", (e) => {
        if (e.target.closest("a")) { menu.classList.remove("is-open");
          toggle.setAttribute("aria-expanded","false"); }
      });
    }
    // evidenzia categoria attiva nel menù
    const links = $$("#menu-nav a");
    if (links.length && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            const id = en.target.id.replace("cat-","");
            links.forEach(l => l.classList.toggle("is-active", l.dataset.jump === id));
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      $$(".cat").forEach(s => io.observe(s));
    }
  }

  /* --------------------------------------------------------------- INIT */
  document.addEventListener("DOMContentLoaded", () => {
    renderFeatured();
    renderMenu();
    renderHours();
    renderOpenBadges();
    renderMap();
    wireLinks();
    setupBooking();
    setupNav();
    const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
    // aggiorna lo stato apertura ogni minuto
    setInterval(renderOpenBadges, 60000);
  });
})();
