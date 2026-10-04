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
});
