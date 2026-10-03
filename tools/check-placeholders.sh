#!/usr/bin/env bash
# Bramka przed pushem: blokuje placeholdery i napisy "w toku".
# Uruchom ręcznie:  bash tools/check-placeholders.sh
# Działa też jako git hook: .git/hooks/pre-push -> wywołuje ten plik.
set -u
ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || { echo "Nie jestem w repo git."; exit 1; }
cd "$ROOT" || exit 1

# Tylko śledzone pliki tekstowe (pomija _media, .git itd.)
FILES=$(git ls-files '*.html' '*.js' '*.json' '*.css' '*.md' '*.txt')
[ -z "$FILES" ] && { echo "Brak plików do sprawdzenia."; exit 0; }

# Wzorce zabronione: token {APP}, dowolny {TOKEN} wielkimi literami, napisy "w toku".
PATTERNS='(\{APP\}|\{[A-Z_]{2,}\}|w przygotowaniu|wybór w przygotowaniu|docelowo możliwe|W budowie)'

HITS=$(grep -nEI "$PATTERNS" $FILES 2>/dev/null)
if [ -n "$HITS" ]; then
  echo "=========================================================="
  echo " STOP — bramka znalazła niedokończone wpisy (placeholder / 'w toku'):"
  echo "----------------------------------------------------------"
  echo "$HITS"
  echo "----------------------------------------------------------"
  echo " Usuń powyższe ZANIM zrobisz push."
  echo "=========================================================="
  exit 1
fi
echo "OK — brak placeholderów ({...}) ani napisów 'w toku'."
exit 0
