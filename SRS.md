### **Specyfikacja Wymagań Oprogramowania (SRS) dla Aplikacji "Rozliczenie B2B"**

**Wersja 1.0**

**Data: 24.05.2024**

---

### **1. Wprowadzenie**

#### **1.1. Cel**
Celem tego dokumentu jest szczegółowe opisanie funkcjonalności, wymagań i ograniczeń aplikacji webowej "Rozliczenie B2B". Aplikacja ta jest narzędziem typu SPA (Single Page Application) przeznaczonym do zarządzania pracą świadczoną na rzecz klientów w modelu B2B, fakturowania i śledzenia postępów. Dokument służy jako punkt odniesienia dla deweloperów, testerów i interesariuszy.

#### **1.2. Zakres Produktu**
Aplikacja jest kompleksowym, działającym po stronie klienta (client-side) narzędziem do:
*   Zarządzania bazą klientów i kontaktów.
*   Rejestrowania i zarządzania zamówieniami od klientów, w tym limitami godzin i stawkami.
*   Ewidencjonowania comiesięcznych rozliczeń przepracowanych godzin na podstawie aktywnych zamówień.
*   Wizualizacji danych na pulpicie analitycznym (Dashboard).
*   Zarządzania dokumentami miesięcznymi (np. POZ, faktury) i łączenia ich w jeden plik PDF.
*   Przechowywania wszystkich danych lokalnie w przeglądarce użytkownika, z opcją importu/eksportu.

#### **1.3. Definicje, Akronimy i Skróty**
*   **B2B**: Business-to-Business.
*   **SPA**: Single Page Application.
*   **NIP**: Numer Identyfikacji Podatkowej.
*   **POZ**: Potwierdzenie Odbioru Zlecenia (lub podobny dokument potwierdzający wykonanie pracy).
*   **OPEX**: Operational Expenditure (Wydatki operacyjne).
*   **CAPEX**: Capital Expenditure (Wydatki inwestycyjne).
*   **CRUD**: Create, Read, Update, Delete.
*   **UI/UX**: User Interface / User Experience.

---

### **2. Ogólny Opis**

#### **2.1. Perspektywa Produktu**
Aplikacja jest samodzielnym produktem działającym w całości w przeglądarce internetowej użytkownika. Nie wymaga połączenia z serwerem ani bazą danych po stronie serwera, co zapewnia pełną funkcjonalność w trybie offline i wysoki poziom prywatności (wszystkie dane pozostają na urządzeniu użytkownika).

#### **2.2. Główne Funkcje**
Aplikacja składa się z następujących modułów:
1.  **Dashboard**: Pulpit nawigacyjny z kluczowymi wskaźnikami i wizualizacjami.
2.  **Klienci**: Moduł do zarządzania danymi klientów i osób kontaktowych.
3.  **Zamówienia**: Moduł do zarządzania zamówieniami, ich pozycjami i załącznikami.
4.  **Rozliczenia**: Moduł do ewidencjonowania i przeglądania miesięcznych rozliczeń pracy.
5.  **Zarządzanie Danymi**: Funkcje importu i eksportu danych aplikacji.
6.  **Personalizacja**: Możliwość zmiany motywu kolorystycznego (jasny/ciemny/systemowy).

#### **2.3. Użytkownicy**
Głównym użytkownikiem jest osoba samozatrudniona (freelancer, kontraktor) lub mała firma świadcząca usługi dla innych podmiotów gospodarczych, która potrzebuje narzędzia do śledzenia i rozliczania swojej pracy.

#### **2.4. Środowisko Operacyjne**
Aplikacja jest zaprojektowana do działania na nowoczesnych przeglądarkach internetowych (Chrome, Firefox, Safari, Edge) na systemach operacyjnych desktopowych i mobilnych (dzięki responsywnemu designowi).

#### **2.5. Ograniczenia Projektowe i Implementacyjne**
*   **Technologie**: React, TypeScript, Tailwind CSS.
*   **Przechowywanie Danych**: Wyłącznie po stronie klienta, z wykorzystaniem `localStorage` przeglądarki.
*   **Brak Backendu**: Aplikacja nie posiada logiki po stronie serwera ani centralnej bazy danych.
*   **Biblioteki Zewnętrzne**: Wykorzystuje `recharts` do wykresów oraz `pdf-lib` do manipulacji plikami PDF.

---

### **3. Wymagania Funkcjonalne**

#### **3.1. Moduł: Klienci**
*   **FR-1.1**: Użytkownik może dodać nowego klienta, podając jego nazwę, NIP i telefon.
*   **FR-1.2**: Użytkownik może dodać wiele osób kontaktowych do każdego klienta (imię i nazwisko, e-mail).
*   **FR-1.3**: Użytkownik może przeglądać listę wszystkich klientów w formie tabeli.
*   **FR-1.4**: Użytkownik może edytować dane istniejącego klienta i jego kontaktów.
*   **FR-1.5**: Użytkownik może usunąć klienta. Usunięcie klienta powoduje kaskadowe usunięcie wszystkich powiązanych z nim zamówień i rozliczeń. Operacja wymaga potwierdzenia.

#### **3.2. Moduł: Zamówienia**
*   **FR-2.1**: Użytkownik może dodać nowe zamówienie, które musi być powiązane z istniejącym klientem.
*   **FR-2.2**: Pola danych zamówienia obejmują: numer zamówienia, numer dostawcy, datę dokumentu, datę dostawy, numer umowy, osobę zamawiającą (wybieraną z kontaktów klienta).
*   **FR-2.3**: Użytkownik może dodać do zamówienia wiele pozycji, określając typ pracy (Konsultacje, OPEX, CAPEX), limit godzin i stawkę za godzinę.
*   **FR-2.4**: Użytkownik może zarządzać statusem zamówienia (aktywne, nieaktywne, archiwalne).
*   **FR-2.5**: Użytkownik może dołączać do zamówienia załączniki w formacie PDF, które są przechowywane jako Base64.
*   **FR-2.6**: System umożliwia podgląd i pobieranie załączonych plików PDF.
*   **FR-2.7**: Użytkownik może edytować i usuwać istniejące zamówienia.

#### **3.3. Moduł: Rozliczenia**
*   **FR-3.1**: Użytkownik może tworzyć rozliczenia dla danego miesiąca i roku. System zapobiega tworzeniu duplikatów dla tego samego okresu.
*   **FR-3.2**: W ramach rozliczenia użytkownik dodaje pozycje, które określają liczbę przepracowanych godzin.
*   **FR-3.3**: Każdą pozycję rozliczenia należy powiązać z aktywnym zamówieniem i konkretnym typem pracy z tego zamówienia.
*   **FR-3.4**: Po wybraniu zamówienia i typu pracy, system automatycznie podpowiada stawkę i waliduje dostępną liczbę godzin, zapobiegając przekroczeniu limitu z zamówienia.
*   **FR-3.5**: Użytkownik może skopiować strukturę pozycji z poprzedniego rozliczenia, aby przyspieszyć wprowadzanie danych.
*   **FR-3.6**: Użytkownik może przeglądać historię rozliczeń w formie listy pogrupowanej malejąco według okresów (rok/miesiąc).
*   **FR-3.7**: Dla każdego historycznego rozliczenia system wyświetla tabelę z pozycjami oraz sumaryczną wartość netto.

#### **3.4. Moduł: Zarządzanie Dokumentami Miesięcznymi**
*   **FR-4.1**: W widoku każdego historycznego rozliczenia, użytkownik ma możliwość wgrania dwóch dokumentów PDF: POZ i faktury.
*   **FR-4.2**: Po wgraniu obu dokumentów, system udostępnia funkcję ich scalenia w jeden plik PDF.
*   **FR-4.3**: Użytkownik może podejrzeć scalony dokument w nowej karcie przeglądarki lub go pobrać.

#### **3.5. Moduł: Dashboard**
*   **FR-5.1**: Dashboard prezentuje dane analityczne, które można filtrować według roku i miesiąca (lub całego roku).
*   **FR-5.2**: Wyświetlane są kluczowe wskaźniki: suma przepracowanych godzin i liczba rozliczanych zamówień w wybranym okresie.
*   **FR-5.3**: Wykres kołowy wizualizuje procentowy udział poszczególnych typów pracy (OPEX, CAPEX, etc.) w sumie godzin.
*   **FR-5.4**: Tabela postępu szczegółowo pokazuje wykorzystanie limitów godzin dla każdej pozycji w zamówieniach, które były rozliczane w danym okresie, wraz z graficzną reprezentacją postępu.

#### **3.6. Funkcje Ogólne**
*   **FR-6.1 (Eksport Danych)**: Użytkownik może wyeksportować wszystkie swoje dane (klienci, zamówienia, rozliczenia, dokumenty) do jednego pliku w formacie JSON.
*   **FR-6.2 (Import Danych)**: Użytkownik może zaimportować dane z pliku JSON. Operacja ta nadpisuje wszystkie istniejące dane i wymaga potwierdzenia.
*   **FR-6.3 (Motyw Graficzny)**: Użytkownik może przełączać się między jasnym, ciemnym i systemowym motywem interfejsu. Wybór jest zapisywany.

---

### **4. Wymagania Niefunkcjonalne**

*   **NFR-1 (Wydajność)**: Aplikacja musi działać płynnie i responsywnie, ponieważ wszystkie operacje odbywają się lokalnie, bez opóźnień sieciowych.
*   **NFR-2 (Użyteczność)**: Interfejs musi być intuicyjny, estetyczny i responsywny (RWD), zapewniając komfortową pracę zarówno na komputerach stacjonarnych, jak i urządzeniach mobilnych.
*   **NFR-3 (Niezawodność)**: Dane muszą być trwale zapisywane w `localStorage`. Aplikacja musi poprawnie obsługiwać błędy, np. przy imporcie nieprawidłowego pliku.
*   **NFR-4 (Bezpieczeństwo)**: Dane nie są przesyłane na żaden serwer zewnętrzny. Bezpieczeństwo danych jest tożsame z bezpieczeństwem urządzenia, na którym uruchomiona jest przeglądarka.
*   **NFR-5 (Dostępność Offline)**: Aplikacja musi być w 100% funkcjonalna bez dostępu do internetu po pierwszym załadowaniu.
