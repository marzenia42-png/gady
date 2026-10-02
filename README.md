# Terrarium Atlas (nazwa robocza)

Edukacyjny atlas opieki nad gadami terrariowymi. Statyczny serwis (HTML/CSS/vanilla JS, bez bibliotek).

> ⚕️ Treści edukacyjne — **nie zastępują porady lekarza weterynarii.** Przy objawach choroby zwierzęcia
> skontaktuj się z weterynarzem od zwierząt egzotycznych.

## Co jest w środku
- **Karta gatunku** (gekon lamparci) — metryczka z przypisami do źródeł, galeria, najczęstsze błędy, objawy alarmowe.
- **5 poradników** z testem po każdym (zakładanie terrarium, UVB, karmienie, higiena, kiedy do weterynarza).
- **Quiz „Dobrze czy źle?"** + **symulator warunków** + **Rekordy i dziwy** (15 kart) + quiz „prawda czy mit?".
- **Moje terrarium** — lista zapisywana wyłącznie lokalnie (bez kont i serwera).

## Źródła i licencje
- Liczby opieki: RSPCA, ReptiFiles, PetMD (recenzja weterynaryjna). Wikipedia tylko fakty ogólne.
- Rekordy: Guinness World Records, muzea, publikacje naukowe, Re:wild — linki w `data/rekordy.json`.
- Zdjęcia: Wikimedia Commons (licencje w `CREDITS.md`). Brak zdjęć generowanych przez AI.

## Dane = jedno źródło prawdy
- `dane.js` — gatunek (karta, quiz, symulator). Nazwa serwisu: `CONFIG.APP_NAME` (jedno miejsce).
- `poradniki.js` — poradniki + testy. `data/rekordy.json` — rekordy, quiz i ciekawostka dnia.

## Uruchomienie lokalne
```
python -m http.server 8077 --bind 127.0.0.1
```
→ http://127.0.0.1:8077/
