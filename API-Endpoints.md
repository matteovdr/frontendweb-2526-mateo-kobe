TODO Dit moet verwijderd worden als alles klaar is.
Maak een markdown document waarin je alle API endpoints van je webservice beschrijft:

URL structuur: Schrijf de volledige URLs van alle API calls neer
Input/Output: Beschrijf kort wat elke endpoint verwacht als invoer en wat het teruggeeft
HTTP methoden: Gebruik de juiste HTTP methoden (GET, POST, PUT, DELETE)
Best practices: Pas de REST principes toe die je in dit hoofdstuk geleerd hebt

# API Endpoints Documentatie

Dit document beschrijft alle API endpoints van onze webservice, inclusief de URL-structuur, verwachte input/output, gebruikte HTTP-methoden en best practices volgens REST-principes.

---

## Kampen Endpoints

### 1. Haal alle kampen op

- **URL:** `http://localhost:3000/kampen`
- **Methode:** GET
- **Input:** Geen
- **Output:** Een lijst van alle kampen in JSON-formaat.
- **Beschrijving:** Haalt alle kampen op uit de database. Retourneert een array van kamp-objecten.

---

### 2. Haal een specifiek kamp op

- **URL:** `http://localhost:3000/kampen/{id}`
- **Methode:** GET
- **Input:**  
  - `id` (path parameter): Het unieke ID van het kamp dat opgehaald moet worden.
- **Output:** Een enkel kamp-object in JSON-formaat.
- **Beschrijving:** Haalt één kamp op basis van het opgegeven ID. Retourneert HTTP 404 als het kamp niet bestaat.

---

### 3. Voeg een nieuw kamp toe

- **URL:** `http://localhost:3000/kampen`
- **Methode:** POST
- **Input:** JSON-object met de gegevens van het nieuwe kamp (naam, locatie, startDatum, eindDatum).
- **Output:** Het nieuw aangemaakte kamp-object in JSON-formaat, inclusief automatisch gegenereerd ID.
- **Beschrijving:** Maakt een nieuw kamp aan in de database.

---

### 4. Update een bestaand kamp

- **URL:** `http://localhost:3000/kampen/{id}`
- **Methode:** PUT
- **Input:**  
  - `id` (path parameter): Het unieke ID van het kamp dat geüpdatet moet worden.  
  - JSON-object met de nieuwe gegevens van het kamp.
- **Output:** Het bijgewerkte kamp-object in JSON-formaat.
- **Beschrijving:** Wijzigt de gegevens van een bestaand kamp. Retourneert HTTP 404 als het kamp niet bestaat.

---

### 5. Verwijder een kamp

- **URL:** `http://localhost:3000/kampen/{id}`
- **Methode:** DELETE
- **Input:**  
  - `id` (path parameter): Het unieke ID van het kamp dat verwijderd moet worden.
- **Output:** Een bericht in JSON-formaat dat bevestigt dat het kamp verwijderd is.
- **Beschrijving:** Verwijdert een kamp uit de database. Retourneert HTTP 404 als het kamp niet bestaat.

---

TODO:
2 VOORBEELDEN (MOET NOG AANGEPAST WORDEM):

## Leden Endpoints

### 1. Haal alle leden op

- **URL:** `https://api.example.com/leden`
- **Methode:** GET
- **Input:** Geen
- **Output:** Een lijst van alle leden in JSON-formaat.
- **Beschrijving:** Deze endpoint haalt alle leden op uit de database. Het retourneert een array van ledenobjecten.

### 2. Haal een specifieke gebruiker op

- **URL:** `https://api.example.com/leden/{Id}`
- **Methode:** GET
- **Input:** - `Id` (path parameter): Het unieke ID van het lid die opgehaald moet worden.
- **Output:** Een lidobject in JSON-formaat.
- **Beschrijving:** Deze endpoint haalt een specifiek lid op basis van het opgegeven `Id`.
