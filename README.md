**1. Opis projektu:**
Jestem w trakcie realizowania projektu automatyzacji testów strony testerskiej [https://www.saucedemo.com/](https://www.saucedemo.com/).
Weryfikuje funkcjonalności logowania, sortowania produktów na stronie oraz kilka testów E2E.

**2. Technologie:**
- TypeScript – język testów
- Playwright – moduł do automatyzacji testów
- Node.js – środowisko uruchomieniowe
- Chromium / Firefox – przeglądarki testowe
- HTML Reporter – raportowanie wyników testów
- Prettier – formatowanie kodu

**3. Struktura projektu:**

src<br>
├── data<br>
     ├── types<br>
     └── json<br>
├── pages<br>
└── tests<br>
     
gdzie:
- data - folder z danymi testowymi
- types - folder z klasami za pomocą których dane testowe z plików json przenoszone są do klas testowych
- pages - Page Object Model
- tests - folder z klasami testowymi

**4. Wymagania:**
- Node.js 18 lub nowszy
- Git
- Edytor kodu (np Visual Studio Code)
- Dostęp do internetu

**5. Instalacja:**
* W wybranym lokalnie folderze należy za pomocą git sklonować repozytorium:
git clone https://github.com/JanuszDamian/SauceDemo-playwright.git
* Zainstalować moduł playwright do testów automatycznych: npm install @playwright/test
* Zainstalować przeglądarki do testowania, korzytając z komendy: npx playwright install

Uruchomienie wszystkich testów w przeglądarce:
- chrome: npm run tests:chrome
- firfox: npm run tests:firefox

Uruchomienie danego typu testów (używane są: @Sorting, @E2E, @Login):
- npm run tests:chrome -- --grep "@E2E"

Uruchomienie testów wizualnych:
- npm run tests:visual:chrome
  
**6. Raporty z testów:**

Jeżeli test zakończy się błędem, w formacie HTML zostaje wyświetlony raport zawierający screen, nagranie z przebiegu procesu, przyczynę wystąpienia błędu oraz w załączniku logi.
Jeżeli wszystkie testy zakończyły się pozytywnie, raport można uruchomić korzystając z komendy: npx playwright show-report.
