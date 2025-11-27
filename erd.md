# ERD schema

Voor ons erd schema hebben we **kroki plantUML** gebruikt dat we ingeven via Postman.

> API: <https://kroki.io/plantuml/svg>

De volgende code genereert het diagram.

```plantuml
plantuml
@startuml
class Persoon {
    *id
    voornaam
    achternaam
    telefoon
    email
}
class Ouder {
    +persoonID
}

class Lid {
    +persoonID
    ageGroup
}

class Leiding {
    +persoonID
    ageGroup
    beschrijving
}

class Groep {
    *naam
    leeftijdscategorie
}

class Kamp {
    *id
    naam
    stad
    startDatum
    eindDatum
}

' Zero or One      |o--
' Exactly One     ||--
' Zero or Many      }o--
' One or Many       }|--
' Relaties (class-diagram syntax)

Ouder }|--|{ Lid : ouder van
Ouder }|--|{ Kamp : is kookploeg
Lid }o--o{ Kamp : schrijft in
Lid ||--o{ Groep : zit in
Leiding }o--o{ Kamp : schrijft in
Leiding ||--|{ Groep : beleid
Leiding |o--|{ Leiding : hoofd van

' Overerving
Persoon <|-- Lid
Persoon <|-- Ouder
Persoon <|-- Leiding

@enduml
```
