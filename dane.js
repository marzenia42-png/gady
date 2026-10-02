/* === KONFIGURACJA — nazwę serwisu zmieniasz TYLKO tutaj === */
const CONFIG = {
  APP_NAME: "Terrarium Atlas",   // nazwa robocza — zmiana tutaj zmienia nazwę w całym serwisie
  DISCLAIMER: "Treści edukacyjne — nie zastępują porady lekarza weterynarii. Przy objawach choroby skontaktuj się z weterynarzem od zwierząt egzotycznych."
};

/* Terrarium Atlas — JEDNO ŹRÓDŁO PRAWDY.
   Karta gatunku, quiz i symulator czytają te same dane.
   Liczby opieki (temp., wilgotność, UVB, karmienie, suplementacja, wymiary) TYLKO ze źródeł
   weterynaryjnych/hodowlanych: RSPCA, ReptiFiles. Wikipedia = wyłącznie fakty ogólne
   (systematyka, zasięg, biologia). Sklepy NIE są źródłem liczb. Rozbieżności = zakres. */

const ZRODLA = {
  rspca:      { t: "RSPCA — Leopard gecko care (organizacja dobrostanu)", u: "https://www.rspca.org.uk/adviceandwelfare/pets/other/leopardgecko" },
  reptifiles: { t: "ReptiFiles — Leopard Gecko Care (renomowany poradnik hodowlany)", u: "https://reptifiles.com/leopard-gecko-care/" },
  petmd:      { t: "PetMD — Leopard Gecko Care Sheet (recenzja weterynaryjna)", u: "https://www.petmd.com/reptile/leopard-gecko-care-sheet" },
  wiki:       { t: "Wikipedia — Common leopard gecko (fakty ogólne: systematyka, zasięg, biologia)", u: "https://en.wikipedia.org/wiki/Common_leopard_gecko" },
  cites:      { t: "CITES — wykaz gatunków (Checklist)", u: "https://checklist.cites.org/" },
};

const GEKON = {
  id: "gekon-lamparci",
  nazwaPL: "Gekon lamparci",
  nazwaLac: "Eublepharis macularius",
  grupa: "Jaszczurka (gad)",
  grupaMenu: "Gady · Jaszczurki",
  trudnosc: "łatwy — dobry na start",
  typTerrarium: "pustynne / suche, naziemne",
  // metryczka: [etykieta, wartość, [klucze źródeł]]
  metryczka: [
    ["Grupa",           "jaszczurka (gad)",                                 ["wiki"]],
    ["Rozmiar",         "17–25 cm (z ogonem)",                              ["reptifiles"]],
    ["Długość życia",   "15–20+ lat w niewoli",                             ["reptifiles"]],
    ["Typ terrarium",   "pustynne / naziemne",                              ["rspca","reptifiles"]],
    ["Min. wymiary",    "min. 60×40×30 cm; zalecane ≥ 90×45×45 cm",         ["rspca","reptifiles"]],
    ["Temp. — strefa ciepła", "28–36°C (powierzchnia wygrzewania)",         ["rspca","reptifiles"]],
    ["Temp. — chłodny kąt",   "21–26°C",                                    ["rspca","reptifiles"]],
    ["Temp. nocą",      "16–20°C (poniżej 18°C dogrzewanie)",               ["rspca","reptifiles"]],
    ["Wilgotność",      "30–40% (wilgotna kryjówka 70–80%)",                ["rspca","reptifiles"]],
    ["Oświetlenie UVB", "2–7% (T5), UVI ~0,5–1,5, ~10–14 h",               ["rspca","reptifiles"]],
    ["Podłoże",         "dorosłe: twarde/gliniasto-piaskowe; młode: mata (ryzyko zatkania)", ["rspca","reptifiles"]],
    ["Dieta",           "owady; młode codziennie, dorosłe co 2 dni",        ["rspca","reptifiles"]],
    ["Suplementacja",   "wapń (często) + D3/witaminy; miseczka czystego wapnia na stałe", ["rspca","reptifiles"]],
    ["Trudność",        "łatwy",                                            ["reptifiles"]],
  ],
  // sekcje opisowe
  autotomia:  { t: "Może odrzucić ogon w obronie — odrasta krótszy i grubszy niż oryginalny.", src: ["wiki"] },
  linienie:   { t: "Linieje regularnie; wilgotna kryjówka (70–80%) ułatwia proces. Pilnuj resztek wylinki na palcach i wokół oczu.", src: ["rspca","reptifiles"] },
  choroby:    { t: "Najczęstsze: metaboliczna choroba kości (MBD) z niedoboru wapnia/UVB, zatrzymana wylinka, zatkanie przewodu pokarmowego, utrata masy.", src: ["rspca"] },
  objawyAlarm:{ t: "Drżenie mięśni, obrzęk nóg, miękkie/łamliwe kości, nietypowe odchody, zaleganie wylinki na palcach lub oczach → weterynarz od zwierząt egzotycznych. Serwis nie stawia diagnoz ani nie podaje leków.", src: ["rspca"] },
  przepisy:   { t: "Nie figuruje w załącznikach CITES; w Polsce gatunek hodowlany nie wymaga rejestracji. Status potwierdź aktualnym wykazem przed zakupem.", src: ["cites"] },
  bledy: [
    ["Brak wapnia / UVB → krzywica (MBD).", ["rspca"]],
    ["Piasek sypki u młodych → ryzyko zatkania jelit.", ["reptifiles"]],
    ["Brak wilgotnej kryjówki → problemy z linieniem.", ["rspca","reptifiles"]],
    ["Za niska temperatura strefy ciepła → gorsze trawienie i apetyt.", ["reptifiles"]],
  ],
  // zakresy dla SYMULATORA (identyczne z metryczką — jedno źródło prawdy)
  sim: {
    temp: { min: 28, max: 36, abs: [15, 45], jedn: "°C", etyk: "Temperatura (strefa ciepła)", src: ["rspca","reptifiles"] },
    wilg: { min: 30, max: 40, abs: [20, 90], jedn: "%",  etyk: "Wilgotność (otoczenie)",       src: ["rspca","reptifiles"] },
    uvb:  { min: 2,  max: 7,  abs: [0, 14],  jedn: "%",  etyk: "UVB",                          src: ["rspca","reptifiles"] },
  },
};

// helper: zamienia listę kluczy źródeł na przypisy <sup> z linkami
function zrodlaSup(klucze) {
  return klucze.map(k => {
    const z = ZRODLA[k];
    return `<a class="refnum" href="${z.u}" target="_blank" rel="noopener" title="${z.t}">[${k}]</a>`;
  }).join("");
}
function zrodlaLista(klucze) {
  const uniq = [...new Set(klucze)];
  return uniq.map(k => `<li><b>[${k}]</b> <a href="${ZRODLA[k].u}" target="_blank" rel="noopener">${ZRODLA[k].t}</a></li>`).join("");
}

/* Nazwa serwisu w jednym miejscu: wypełnia [data-app] i token {APP} w <title>. */
document.addEventListener("DOMContentLoaded", function () {
  var n = CONFIG.APP_NAME;
  var els = document.querySelectorAll("[data-app]");
  for (var i = 0; i < els.length; i++) els[i].textContent = n;
  if (document.title.indexOf("{APP}") >= 0) document.title = document.title.replace(/\{APP\}/g, n);
});
