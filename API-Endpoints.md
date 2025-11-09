TODO Dit moet verwijderd worden als alles klaar is.
Maak een markdown document waarin je alle API endpoints van je webservice beschrijft:

URL structuur: Schrijf de volledige URLs van alle API calls neer
Input/Output: Beschrijf kort wat elke endpoint verwacht als invoer en wat het teruggeeft
HTTP methoden: Gebruik de juiste HTTP methoden (GET, POST, PUT, DELETE)
Best practices: Pas de REST principes toe die je in dit hoofdstuk geleerd hebt

# API Endpoints Documentatie

Dit document beschrijft alle API endpoints van onze webservice, inclusief de URL-structuur, verwachte input/output, gebruikte HTTP-methoden en best practices volgens REST-principes.

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

## Leiding Endpoints
### 1. Haal alle leiding op
- **URL:** `https://api.example.com/leiding`
- **Methode:** GET
- **Input:** Geen
- **Output:** Een lijst van alle leiding in JSON-formaat.
- **Beschrijving:** Deze endpoint haalt alle leiding op uit de database en retourneert een array van leidingobjecten.



### 2. Haal een specifieke leiding op
- **URL:** `https://api.example.com/leiding/{id}`
- **Methode:** GET
- **Input:**  
  - `id` (path parameter): Het unieke ID van de leiding die opgehaald moet worden.
- **Output:** Een leidingobject in JSON-formaat.
- **Beschrijving:** Deze endpoint haalt een specifieke leiding op basis van het opgegeven id.



### 3. Maak een leiding aan
- **URL:** `https://api.example.com/leiding`
- **Methode:** POST
- **Input:**  
  - Request body met leidinggegevens (op basis van `CreateLeidingDto`).
- **Output:** Het nieuw aangemaakte leidingobject in JSON-formaat.
- **Beschrijving:** Hiermee wordt een nieuwe leiding aangemaakt met de opgegeven data en toegevoegd aan de database.


### 4. Werk leiding bij
- **URL:** `https://api.example.com/leiding/{id}`
- **Methode:** PATCH
- **Input:**  
  - `id` (path parameter): Het unieke ID van de leiding die je wilt aanpassen.  
  - Request body met nieuwe leidinggegevens (op basis van `UpdateLeidingDto`).
- **Output:** Het bijgewerkte leidingobject in JSON-formaat.
- **Beschrijving:** Update de gegevens van een bestaande leiding met de meegegeven waarden.


### 5. Verwijder een leiding
- **URL:** `https://api.example.com/leiding/{id}`
- **Methode:** DELETE
- **Input:**  
  - `id` (path parameter): Het unieke ID van de leiding die verwijderd moet worden.
- **Output:** Geen (of eventueel een statusmelding).
- **Beschrijving:** Verwijdert een leiding uit de database op basis van het ID.

