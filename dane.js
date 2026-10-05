/* === KONFIGURACJA — nazwę serwisu zmieniasz TYLKO tutaj === */
const CONFIG = {
  APP_NAME: "Terrarium Atlas",   // nazwa robocza — zmiana tutaj zmienia nazwę w całym serwisie
  DISCLAIMER: "Treści edukacyjne — nie zastępują porady lekarza weterynarii. Przy objawach choroby skontaktuj się z weterynarzem od zwierząt egzotycznych."
};

/* Terrarium Atlas — JEDNO ŹRÓDŁO PRAWDY.
   Dane każdego gatunku leżą w dane/gatunki/<slug>.json. Karta gatunku, katalog,
   quiz i symulator czytają ten sam plik. Nowy gatunek = wrzucasz plik JSON i dopisujesz
   slug do dane/gatunki/index.json — zero zmian w HTML.
   Liczby opieki (temp., wilgotność, UVB, karmienie, suplementacja, wymiary) TYLKO ze źródeł
   weterynaryjnych/hodowlanych (RSPCA, ReptiFiles, PetMD). Wikipedia = wyłącznie fakty ogólne
   (systematyka, zasięg, biologia). Sklepy NIE są źródłem liczb. Rozbieżności = zakres.
   Każdy gatunek niesie własną mapę źródeł w polu "zrodla". */

// aktywna mapa źródeł — ustawiana z pliku gatunku przez setZrodla()
let ZRODLA = {};
function setZrodla(z) { ZRODLA = z || {}; }

// helper: lista kluczy źródeł -> przypisy <sup> z linkami (pomija nieznane klucze)
function zrodlaSup(klucze) {
  return (klucze || []).map(function (k) {
    var z = ZRODLA[k];
    if (!z) return "";
    return '<a class="refnum" href="' + z.u + '" target="_blank" rel="noopener" title="' + z.t + '">[' + k + ']</a>';
  }).join("");
}
function zrodlaLista(klucze) {
  var uniq = [...new Set(klucze || [])];
  return uniq.filter(function (k) { return ZRODLA[k]; }).map(function (k) {
    return '<li><b>[' + k + ']</b> <a href="' + ZRODLA[k].u + '" target="_blank" rel="noopener">' + ZRODLA[k].t + '</a></li>';
  }).join("");
}

// wczytanie danych jednego gatunku
function loadGatunek(slug) {
  return fetch('dane/gatunki/' + slug + '.json?v=2', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
}
// wczytanie spisu gatunków (kolejność katalogu)
function loadKatalog() {
  return fetch('dane/gatunki/index.json?v=2', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (d) { return d.gatunki || []; });
}

/* Nazwa serwisu w JEDNYM miejscu (CONFIG.APP_NAME): wypełnia [data-app]
   i składa <title> z kontekstu strony (data-ctx na <title>) + nazwy serwisu.
   W HTML tytuł jest literalny (poprawny bez JS / dla crawlerów), a tu jest
   odświeżany z CONFIG — bez żadnych placeholderów. Zmiana nazwy = tylko CONFIG.APP_NAME. */
document.addEventListener("DOMContentLoaded", function () {
  var n = CONFIG.APP_NAME;
  var els = document.querySelectorAll("[data-app]");
  for (var i = 0; i < els.length; i++) els[i].textContent = n;
  var t = document.querySelector("title[data-ctx]");
  if (t) {
    var ctx = t.getAttribute("data-ctx");
    var order = t.getAttribute("data-order") || "suffix";
    document.title = ctx ? (order === "prefix" ? (n + " — " + ctx) : (ctx + " — " + n)) : n;
  }
  enhanceNav();
  addPrivacyLine();
});

/* Stopka — jedna linia o prywatności na KAŻDEJ stronie (serwis statyczny: brak danych, brak cookies). */
function addPrivacyLine() {
  var foots = document.querySelectorAll("footer.foot .wrap");
  for (var i = 0; i < foots.length; i++) {
    if (foots[i].querySelector(".privline")) continue;
    var p = document.createElement("div");
    p.className = "privline";
    p.textContent = "Serwis nie zbiera danych osobowych i nie używa cookies.";
    foots[i].appendChild(p);
  }
}

/* NAWIGACJA — jedno źródło treści dla desktopu i telefonu.
   Pozycje górne czytamy z istniejącego <nav class="menu"> (zachowana kolejność/etykiety),
   a listę gatunków z dane/gatunki/index.json (gekon lamparci pierwszy). Z tej samej listy
   budujemy: dropdown „Gatunki" na desktopie ORAZ pełny akordeon w menu mobilnym (hamburger).
   Dzięki temu liczba linków desktop == mobile i nic z desktopu nie znika na 390 px. */
function enhanceNav() {
  var navs = document.querySelectorAll("header.nav");
  if (!navs.length) return;
  loadKatalog().then(function (slugs) {
    return Promise.all(slugs.map(function (s) {
      return loadGatunek(s).then(function (g) { return { slug: g.slug, label: g.nazwaPL }; }).catch(function () { return null; });
    }));
  }).then(function (list) {
    var species = list.filter(Boolean);
    navs.forEach(function (nav) { buildNav(nav, species); });
  }).catch(function () {
    navs.forEach(function (nav) { buildNav(nav, []); });
  });
}

function buildNav(nav, species) {
  var wrap = nav.querySelector(".wrap"); if (!wrap || nav.dataset.navBuilt) return;
  nav.dataset.navBuilt = "1";
  var menu = wrap.querySelector(".menu");
  var search = wrap.querySelector(".search");
  var isGat = function (href, label) { return /index\.html#katalog/.test(href || "") || /gatunki/i.test(label || ""); };
  var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
  var sp = species.map(function (s) { return '<a href="gatunek.html?id=' + encodeURIComponent(s.slug) + '">' + esc(s.label) + "</a>"; }).join("");

  // --- DESKTOP: dropdown gatunków pod pozycją „Gatunki" ---
  if (menu && species.length) {
    var links = [].slice.call(menu.querySelectorAll("a.lnk"));
    var gLink = links.filter(function (a) { return isGat(a.getAttribute("href"), a.textContent); })[0];
    if (gLink) {
      var grp = document.createElement("span"); grp.className = "hasdrop";
      gLink.parentNode.insertBefore(grp, gLink); grp.appendChild(gLink);
      grp.insertAdjacentHTML("beforeend", '<span class="caret" aria-hidden="true">▾</span>');
      var dd = document.createElement("div"); dd.className = "dropdown";
      dd.innerHTML = species.map(function (s) { return '<a class="ddlnk" href="gatunek.html?id=' + encodeURIComponent(s.slug) + '">' + esc(s.label) + "</a>"; }).join("");
      grp.appendChild(dd);
    }
  }

  // --- MOBILE: hamburger + panel (akordeon z gatunkami) ---
  var btn = document.createElement("button");
  btn.className = "navtoggle"; btn.type = "button";
  btn.setAttribute("aria-label", "Menu"); btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = "<span></span><span></span><span></span>";
  wrap.appendChild(btn);

  var topLinks = menu ? [].slice.call(menu.querySelectorAll("a.lnk")).map(function (a) {
    return { label: a.textContent.trim(), href: a.getAttribute("href") };
  }) : [];
  var html = topLinks.map(function (tl) {
    if (isGat(tl.href, tl.label) && species.length) {
      return '<div class="npgroup"><button class="npacc" type="button" aria-expanded="false">' +
        '<a href="' + esc(tl.href) + '">' + esc(tl.label) + '</a><span class="accx" aria-hidden="true">+</span></button>' +
        '<div class="npsub">' + sp + "</div></div>";
    }
    return '<a class="nplnk" href="' + esc(tl.href) + '">' + esc(tl.label) + "</a>";
  }).join("");
  if (search) html += '<a class="npsearch" href="' + esc(search.getAttribute("href")) + '">' + esc(search.textContent.trim()) + "</a>";
  var panel = document.createElement("div"); panel.className = "navpanel"; panel.innerHTML = html;
  nav.appendChild(panel);

  function closeNav() { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  panel.querySelectorAll(".npacc").forEach(function (acc) {
    acc.addEventListener("click", function (e) {
      if (e.target.tagName === "A") return;           // klik w etykietę = nawigacja
      e.preventDefault(); e.stopPropagation();
      var g = acc.parentNode, exp = g.classList.toggle("exp");
      acc.setAttribute("aria-expanded", exp ? "true" : "false");
      acc.querySelector(".accx").textContent = exp ? "–" : "+";
    });
  });
  panel.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeNav); });
  document.addEventListener("click", function (e) { if (nav.classList.contains("open") && !nav.contains(e.target)) closeNav(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });
}
