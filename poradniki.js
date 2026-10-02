/* Poradniki — treść ze źródeł (RSPCA, ReptiFiles, PetMD — recenzja wet.).
   Rozbieżności między źródłami podajemy jako zakres.
   Token {klucz,klucz} w treści = przypis do źródła (renderowany jako <sup>).
   Każdy poradnik ma test: 5 pytań, każda odpowiedź z wyjaśnieniem i źródłem.
   Nic nie zastępuje porady weterynarza; przy objawach choroby — weterynarz. */

const PORADNIKI = [
  {
    id: "zakladanie-terrarium",
    kicker: "Start · ~8 min",
    tytul: "Jak założyć pierwsze terrarium krok po kroku",
    foto: "_media/gekon_portret.jpg", fotoCredit: "G. Chernilevsky · domena publiczna",
    lede: "Dobre terrarium zaczyna się od właściwego pudła, gradientu ciepła i trzech kryjówek. Pokazujemy, co przygotować, zanim gekon wejdzie do środka.",
    sekcje: [
      { h: "1. Typ i wymiary", t: "<p>Gekon lamparci to gatunek <b>naziemny, pustynny</b> — liczy się powierzchnia podłogi, nie wysokość. Minimalne wymiary to <b>60×40×30 cm</b> wg RSPCA, a zalecane <b>≥ 90×45×45 cm</b> wg ReptiFiles {rspca,reptifiles}. Większe terrarium ułatwia zbudowę gradientu temperatur.</p>" },
      { h: "2. Podłoże", t: "<p>Dla dorosłych sprawdza się podłoże twarde / gliniasto-piaskowe, płytki lub mata; u młodych bezpieczniej jest użyć maty lub papieru, bo <b>sypki piasek grozi zatkaniem przewodu pokarmowego</b> {rspca,reptifiles}.</p>" },
      { h: "3. Kryjówki i gradient ciepła", t: "<p>Zapewnij <b>co najmniej trzy kryjówki</b>: na ciepłej stronie, na chłodnej i <b>wilgotną kryjówkę</b> ułatwiającą linienie {rspca,reptifiles}. Źródło ciepła ustaw po jednej stronie — strefa ciepła ma mieć <b>28–36 °C</b>, a chłodny kąt <b>21–26 °C</b> {rspca,reptifiles}. Grzanie zawsze przez <b>termostat</b>.</p>" },
      { h: "4. Pierwszy tydzień", t: "<p>Po wstawieniu zwierzęcia daj mu kilka dni spokoju: ogranicz branie do ręki, obserwuj apetyt, odchody i aktywność. Stabilne temperatury i kryjówki są ważniejsze niż „oswajanie” na siłę.</p>" }
    ],
    test: [
      { q: "Jakie minimalne wymiary terrarium podaje RSPCA dla dorosłego gekona?", opcje: ["30×20×20 cm", "60×40×30 cm", "120×60×60 cm"], ok: 1, wyj: "RSPCA podaje min. 60×40×30 cm; ReptiFiles zaleca więcej (≥90×45×45 cm). Podajemy to jako zakres.", src: ["rspca", "reptifiles"] },
      { q: "Które podłoże jest ryzykowne u młodych gekonów?", opcje: ["Mata/papier", "Sypki piasek", "Płytki"], ok: 1, wyj: "Sypki piasek grozi zatkaniem przewodu pokarmowego, zwłaszcza u młodych.", src: ["reptifiles"] },
      { q: "Ile kryjówek powinien mieć gekon?", opcje: ["Jedną", "Dwie", "Co najmniej trzy (w tym wilgotną)"], ok: 2, wyj: "Minimum trzy: ciepła, chłodna i wilgotna (ułatwia linienie).", src: ["rspca", "reptifiles"] },
      { q: "Jaka jest zalecana temperatura strefy ciepła?", opcje: ["18–22 °C", "28–36 °C", "40–45 °C"], ok: 1, wyj: "Strefa ciepła 28–36 °C (łącząc RSPCA i ReptiFiles), chłodny kąt 21–26 °C.", src: ["rspca", "reptifiles"] },
      { q: "Czy grzanie powinno być sterowane termostatem?", opcje: ["Tak, zawsze", "Nie, to zbędne", "Tylko latem"], ok: 0, wyj: "Termostat chroni przed przegrzaniem i poparzeniem — obowiązkowy przy każdym źródle ciepła.", src: ["reptifiles"] }
    ]
  },
  {
    id: "oswietlenie-uvb",
    kicker: "Technika · ~7 min",
    tytul: "Oświetlenie i UVB — bez czego gad choruje",
    foto: "_media/gekon_2.jpg", fotoCredit: "G. Chernilevsky · domena publiczna",
    lede: "Nieprawidłowe światło to jedna z najczęstszych przyczyn chorób gadów. Wyjaśniamy, czym jest UVB i jak je dobrać.",
    sekcje: [
      { h: "1. Po co gadowi UVB", t: "<p>Promieniowanie <b>UVB</b> pozwala gadom wytwarzać witaminę D3, niezbędną do przyswajania wapnia. Jej niedobór prowadzi do <b>metabolicznej choroby kości (MBD)</b> {rspca,petmd}. Zwykła żarówka daje światło i ciepło, ale <b>nie emituje UVB</b>.</p>" },
      { h: "2. Jak dobrać UVB i godziny", t: "<p>Dla gekona lamparciego stosuje się świetlówki <b>2–7% (T5)</b>, dające UVI ok. 0,5–1,5, świecące <b>~10–14 h</b> dziennie {rspca,reptifiles}. Świetlówki UVB <b>zużywają się</b> — wymieniaj je zgodnie z zaleceniem producenta (często co ~6–12 mies.), nawet jeśli nadal świecą {petmd}.</p>" },
      { h: "3. Suplementacja a UVB", t: "<p>Przy sprawnym UVB stosuje się wapń bez D3; <b>bez UVB</b> konieczny jest wapń z D3 {reptifiles}. Niezależnie od tego — miseczka czystego wapnia na stałe.</p>" },
      { h: "4. Najczęstsze błędy", t: "<ul><li>Brak UVB przy diecie ubogiej w D3.</li><li>Zużyta świetlówka (świeci, ale nie emituje UVB).</li><li>Promiennik za szkłem/plastikiem blokującym UVB.</li></ul>" }
    ],
    test: [
      { q: "Do czego gadowi potrzebne jest UVB?", opcje: ["Do ładnego koloru", "Do wytwarzania witaminy D3 i przyswajania wapnia", "Do nawilżenia"], ok: 1, wyj: "UVB umożliwia syntezę D3; jej brak → MBD.", src: ["rspca", "petmd"] },
      { q: "Jaki zakres UVB stosuje się dla gekona lamparciego?", opcje: ["2–7% (T5)", "10–12% (T8)", "UVB jest zbędne"], ok: 0, wyj: "2–7% T5, UVI ~0,5–1,5, ~10–14 h dziennie.", src: ["rspca", "reptifiles"] },
      { q: "Czy świetlówkę UVB trzeba wymieniać, mimo że świeci?", opcje: ["Nie", "Tak, emisja UVB spada z czasem", "Tylko gdy zgaśnie"], ok: 1, wyj: "Emisja UVB spada zanim lampa zgaśnie — wymieniaj wg zaleceń (często co 6–12 mies.).", src: ["petmd"] },
      { q: "Jak suplementować przy BRAKU UVB?", opcje: ["Wapń bez D3", "Wapń z D3", "Bez suplementów"], ok: 1, wyj: "Bez UVB potrzebny wapń z D3; przy UVB — wapń bez D3.", src: ["reptifiles"] },
      { q: "Co blokuje UVB?", opcje: ["Siatka", "Szkło/plastik między lampą a gadem", "Powietrze"], ok: 1, wyj: "Zwykłe szkło i plastik pochłaniają UVB — promiennik nie może świecić przez szybę.", src: ["reptifiles"] }
    ]
  },
  {
    id: "karmienie-suplementacja",
    kicker: "Opieka · ~7 min",
    tytul: "Karmienie i suplementacja wapniem",
    foto: "_media/gekon_mlody.jpg", fotoCredit: "C. von Faber-Castell · CC BY 4.0",
    lede: "Gekon lamparci to owadożerca. Kluczem jest różnorodność owadów, regularność i wapń — bez niego grozi krzywica.",
    sekcje: [
      { h: "1. Co podawać", t: "<p>Podstawą są <b>owady karmowe</b>: świerszcze i karaczany; mącznik tylko okazjonalnie, bo jest tłusty {rspca,reptifiles}. Nie podajemy owoców ani warzyw — to gatunek owadożerny {petmd}.</p>" },
      { h: "2. Jak często", t: "<p><b>Młode</b> karmimy codziennie, <b>dorosłe</b> co 2 dni {rspca,reptifiles}. Owady powinny być <b>„nakarmione” (gut-loading)</b> przed podaniem — wtedy przekazują gekonowi więcej wartości.</p>" },
      { h: "3. Suplementacja", t: "<p>Owady <b>obtaczamy w wapniu</b> (często), dodajemy D3/witaminy, a w terrarium zostawiamy <b>miseczkę czystego wapnia</b> na stałe {rspca,reptifiles}. Dawkowanie D3 zależy od obecności UVB (patrz poradnik o UVB). Świeża woda w misce zawsze dostępna.</p>" }
    ],
    test: [
      { q: "Czym jest gekon lamparci pod względem diety?", opcje: ["Roślinożerca", "Owadożerca", "Wszystkożerca"], ok: 1, wyj: "To owadożerca — tylko owady karmowe, bez owoców/warzyw.", src: ["petmd"] },
      { q: "Który owad powinien być tylko okazjonalny?", opcje: ["Świerszcz", "Karaczan", "Mącznik (tłusty)"], ok: 2, wyj: "Mącznik jest tłusty — okazjonalnie; podstawą świerszcze/karaczany.", src: ["rspca", "reptifiles"] },
      { q: "Jak często karmić dorosłego gekona?", opcje: ["Codziennie", "Co 2 dni", "Raz w tygodniu"], ok: 1, wyj: "Dorosłe co 2 dni, młode codziennie.", src: ["rspca", "reptifiles"] },
      { q: "Co to gut-loading?", opcje: ["Nakarmienie owadów przed podaniem", "Zamrażanie owadów", "Podawanie na siłę"], ok: 0, wyj: "Gut-loading = nakarmienie owadów wartościowym pokarmem, by przekazały go gekonowi.", src: ["reptifiles"] },
      { q: "Co zostawiamy w terrarium na stałe?", opcje: ["Miseczkę czystego wapnia", "Miód", "Suchą karmę dla psów"], ok: 0, wyj: "Miseczka czystego wapnia pozwala uzupełniać niedobory; plus obtaczanie owadów.", src: ["rspca", "reptifiles"] }
    ]
  },
  {
    id: "higiena",
    kicker: "Opieka · ~6 min",
    tytul: "Higiena terrarium — codziennie, co tydzień, bezpiecznie",
    foto: "_media/gekon_6.jpg", fotoCredit: "G. Chernilevsky · domena publiczna",
    lede: "Czyste terrarium to mniej pasożytów i infekcji. Dobra wiadomość: gekony zwykle załatwiają się w jednym narożniku.",
    sekcje: [
      { h: "1. Codziennie", t: "<p>Usuwaj odchody na bieżąco (spot-clean) i wymieniaj wodę na świeżą {reptifiles}. Gekony często wybierają jeden „narożnik toaletowy” — sprzątanie jest wtedy proste.</p>" },
      { h: "2. Co jakiś czas", t: "<p>Okresowo czyść i dezynfekuj terrarium bezpiecznym środkiem, dokładnie spłukując — resztki chemii są szkodliwe. Podłoże wymieniaj/odświeżaj zależnie od typu {reptifiles}. Pilnuj <b>wilgotnej kryjówki</b>: wilgotny substrat wymieniaj, by nie pleśniał.</p>" },
      { h: "3. Bezpieczeństwo (zoonozy)", t: "<p>Gady mogą być nosicielami bakterii (m.in. <i>Salmonella</i>), dlatego <b>myj ręce przed i po</b> kontakcie ze zwierzęciem i wyposażeniem {petmd}. Akcesoriów do terrarium nie myj tam, gdzie przygotowujesz jedzenie.</p>" }
    ],
    test: [
      { q: "Co robimy z odchodami?", opcje: ["Zostawiamy do generalnego sprzątania", "Usuwamy na bieżąco (spot-clean)", "Przykrywamy podłożem"], ok: 1, wyj: "Spot-clean codziennie ogranicza bakterie i pasożyty.", src: ["reptifiles"] },
      { q: "Dlaczego trzeba dokładnie spłukać środek do dezynfekcji?", opcje: ["Dla zapachu", "Resztki chemii są szkodliwe dla gada", "To niepotrzebne"], ok: 1, wyj: "Pozostałości środków chemicznych mogą zaszkodzić zwierzęciu.", src: ["reptifiles"] },
      { q: "Co grozi w zaniedbanej wilgotnej kryjówce?", opcje: ["Pleśń", "Za dużo UVB", "Nic"], ok: 0, wyj: "Wilgotny substrat trzeba wymieniać, by nie pleśniał.", src: ["reptifiles"] },
      { q: "Dlaczego myjemy ręce przed i po kontakcie?", opcje: ["Dla zapachu", "Gady mogą przenosić bakterie (np. Salmonella)", "To zbędne"], ok: 1, wyj: "Higiena rąk ogranicza ryzyko zoonoz.", src: ["petmd"] },
      { q: "Gdzie NIE myć akcesoriów terrariowych?", opcje: ["W miejscu przygotowania jedzenia", "W wiadrze", "Na dworze"], ok: 0, wyj: "Unikaj mycia sprzętu tam, gdzie przygotowujesz posiłki — ryzyko przeniesienia bakterii.", src: ["petmd"] }
    ]
  },
  {
    id: "kiedy-do-weterynarza",
    kicker: "Zdrowie · ~6 min",
    tytul: "Kiedy do weterynarza — objawy alarmowe",
    foto: "_media/gekon_wylinka.jpg", fotoCredit: "Kinori · CC0",
    lede: "Ten poradnik nie służy do stawiania diagnoz ani dawkowania leków. Uczy rozpoznać sygnały, przy których trzeba iść do weterynarza od zwierząt egzotycznych.",
    sekcje: [
      { h: "1. Zasada nadrzędna", t: "<p><b>Zero samodzielnych diagnoz i leków.</b> Gady maskują chorobę — jeśli coś niepokoi, umów wizytę u <b>weterynarza od zwierząt egzotycznych</b> {rspca}.</p>" },
      { h: "2. Objawy alarmowe", t: "<ul><li>Brak apetytu i utrata masy, zapadnięty brzuch, chudnący ogon.</li><li>Drżenie mięśni, krzywe lub miękkie kości — podejrzenie <b>MBD</b> (niedobór wapnia/UVB).</li><li>Zaleganie wylinki na palcach lub wokół oczu.</li><li>Obrzęk nóg, nietypowe odchody, apatia.</li></ul><p>Przy tych sygnałach — do weterynarza {rspca,petmd}.</p>" },
      { h: "3. Najczęstsze choroby", t: "<p>MBD, zatrzymana wylinka (dysekdyza), zatkanie przewodu pokarmowego (impakcja), pasożyty {rspca,reptifiles}. Większości zapobiega prawidłowa opieka: temperatura, UVB, wapń i wilgotna kryjówka.</p>" }
    ],
    test: [
      { q: "Co robi ten poradnik?", opcje: ["Stawia diagnozy", "Uczy rozpoznać, kiedy iść do weterynarza", "Podaje dawki leków"], ok: 1, wyj: "Serwis nie diagnozuje ani nie podaje leków — wskazuje, kiedy potrzebny jest weterynarz.", src: ["rspca"] },
      { q: "Drżenie mięśni i miękkie kości to podejrzenie…", opcje: ["MBD (niedobór wapnia/UVB)", "Przejedzenia", "Nadmiaru UVB"], ok: 0, wyj: "To typowe objawy metabolicznej choroby kości — pilnie do weterynarza.", src: ["rspca"] },
      { q: "Zaleganie wylinki na palcach może prowadzić do…", opcje: ["Ładniejszego koloru", "Niedokrwienia i utraty palców", "Niczego"], ok: 1, wyj: "Resztki wylinki zaciskają się na palcach — dlatego ważna wilgotna kryjówka i kontrola.", src: ["rspca", "reptifiles"] },
      { q: "Do jakiego weterynarza się zgłosić?", opcje: ["Dowolnego", "Od zwierząt egzotycznych", "Do apteki"], ok: 1, wyj: "Gady wymagają weterynarza specjalizującego się w zwierzętach egzotycznych.", src: ["rspca"] },
      { q: "Co najlepiej zapobiega większości chorób?", opcje: ["Leki „na zapas”", "Prawidłowa opieka (temp., UVB, wapń, wilgotna kryjówka)", "Częste branie do ręki"], ok: 1, wyj: "Profilaktyka = właściwe warunki; leków nie podajemy samodzielnie.", src: ["rspca", "reptifiles"] }
    ]
  }
];
