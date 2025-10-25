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
