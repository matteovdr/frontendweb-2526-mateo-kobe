import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from './schema';

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 5,
});

const db = drizzle(connection, {
  schema,
  mode: 'default',
});

async function main() {
  console.log('🌱 Starting database seeding...\n');

  await resetDatabase();
  await seedKampen();
  await seedPersonen();
  await seedLeiding();
  await seedLid();
  await seedLidKamp();
  await seedLeidingKamp();

  console.log('🎉 Database seeding completed successfully!');
}
main()
  .then(async () => {
    await connection.end();
  })
  .catch(async (e) => {
    console.error(e);
    await connection.end();
    process.exit(1);
  });

async function resetDatabase() {
  console.log('🗑️ Resetting database...');

  // Remove pivot tables first
  await db.delete(schema.leidingKamp);
  await db.delete(schema.lidKamp);

  // Then remove child tables
  await db.delete(schema.leiding);
  await db.delete(schema.lid);
  await db.delete(schema.persoon);

  // Finally remove parent tables
  await db.delete(schema.kampen);

  console.log('✅ Database reset completed\n');
}
async function seedKampen() {
  console.log("⛺ Seeding kampen...");

  await db.insert(schema.kampen).values([
    {
      id: 1,
      naam: "Stadskamp Brussel Atomium",
      stad: "Brussel",
      beschrijving: "Beschrijving wordt later toegevoegd.",
      startDatum: new Date("2025-04-07"),
      eindDatum: new Date("2025-04-13"),
    },
    {
      id: 2,
      naam: "Zomerkamp Kortrijk aan Zee",
      stad: "Kortrijk",
      beschrijving: "Beschrijving wordt later toegevoegd.",
      startDatum: new Date("2025-07-07"),
      eindDatum: new Date("2025-07-13"),
    },
    {
      id: 3,
      naam: "Avonturenkamp Ardennen",
      stad: "La Roche-en-Ardenne",
      beschrijving: "Beschrijving wordt later toegevoegd.",
      startDatum: new Date("2025-07-21"),
      eindDatum: new Date("2025-07-27"),
    },
    {
      id: 4,
      naam: "Muziekkamp bij de Saxophone Stad",
      stad: "Dinant",
      beschrijving: "Beschrijving wordt later toegevoegd.",
      startDatum: new Date("2025-08-04"),
      eindDatum: new Date("2025-08-10"),
    },
    {
      id: 5,
      naam: "Natuurkamp Saint-Hubert",
      stad: "Saint-Hubert",
      beschrijving: "Beschrijving wordt later toegevoegd.",
      startDatum: new Date("2025-10-27"),
      eindDatum: new Date("2025-11-02"),
    },
    {
      id: 6,
      naam: "Rivierenkamp bij de Maas",
      stad: "Namur",
      beschrijving: "Beschrijving wordt later toegevoegd.",
      startDatum: new Date("2026-02-16"),
      eindDatum: new Date("2026-02-22"),
    },
  ]);

  console.log("✅ Kampen seeded succesfully!\n");
}
async function seedPersonen() {
console.log("👤 Seeding Personen...");

await db.insert(schema.persoon).values([
  {
    id: 1,
    voornaam: "Beau",
    achternaam: "D’Hondt",
    geboorteDatum: new Date("2005-04-07"),
    telefoon: "0471 22 33 44",
    email: "beau.dhondt@gmail.com",
},
{
    id: 2,
    voornaam: "Matteo",
    achternaam: "Van Droogenbroeck",
    geboorteDatum: new Date("2005-04-07"),
    telefoon: "0472 11 22 33",
    email: "matteo.vandroogenbroeck@gmail.com",
},
{
    id: 3,
    voornaam: "Laure",
    achternaam: "Van Wesemael",
    geboorteDatum: new Date("2005-04-07"),
    telefoon: "0473 55 66 77",
    email: "laure.vanwesemael@gmail.com",
},
{
    id: 4,
    voornaam: "Chloë",
    achternaam: "Dekoster",
    geboorteDatum: new Date("2005-04-07"),
    telefoon: "0474 77 88 99",
    email: "chloe.dekoster@gmail.com",
},
{
    id: 5,
    voornaam: "Jorben",
    achternaam: "Ruysseveldt",
    geboorteDatum: new Date("2005-04-07"),
    telefoon: "0479 12 34 56",
    email: "jorben.ruysseveldt@gmail.com",
},
{
    id: 6,
    voornaam: "Sarah",
    achternaam: "Van Syngel",
    geboorteDatum: new Date("2005-04-07"),
    telefoon: "0480 44 55 66",
    email: "sarah.vansyngel@gmail.com",
},
{
    id: 7,
    voornaam: "Michiel",
    achternaam: "De Boeck",
    geboorteDatum: new Date("2005-04-07"),
    telefoon: "0481 66 77 88",
    email: "michiel.deboeck@gmail.com",
},
{
    id: 8,
    voornaam: "Lauren",
    achternaam: "Van Godtsenhoven",
    geboorteDatum: new Date("2005-04-07"),
    telefoon: "0482 33 44 55",
    email: "lauren.vangodtsenhoven@gmail.com",
},
{
    id: 9,
    voornaam: "Sander",
    achternaam: "van Schaik",
    geboorteDatum: new Date("2005-04-07"),
    telefoon: "0483 55 66 77",
    email: "sander.vanschaik@gmail.com",
},
{
    id: 10,
    voornaam: "Senne",
    achternaam: "Le Percq",
    geboorteDatum: new Date("2005-04-07"),
    telefoon: "0484 99 00 11",
    email: "senne.lepercq@gmail.com",
},
{
    id: 11,
    voornaam: "Inge",
    achternaam: "Baetens",
    geboorteDatum: new Date("2005-04-07"),
    telefoon: "0485 12 87 33",
    email: "inge.baetens@gmail.com",
},
{
    id: 12,
    voornaam: "Maud",
    achternaam: "Keppens",
    geboorteDatum: new Date("2005-04-07"),
    telefoon: "0486 66 12 98",
    email: "maud.keppens@gmail.com",
},
{
    id: 13,
    voornaam: "Jos",
    achternaam: "Traas",
    geboorteDatum: new Date("2005-04-07"),
    telefoon: "0487 45 33 21",
    email: "jos.traas@gmail.com",
},
{
    id: 14,
    voornaam: "Liam",
    achternaam: "Robyns",
    geboorteDatum: new Date("2005-04-07"),
    telefoon: "0488 99 88 77",
    email: "liam.robyns@gmail.com",
},
{
    id: 15,
    voornaam: "Lotte",
    achternaam: "Staes",
    geboorteDatum: new Date("2005-04-07"),
    telefoon: "0489 11 22 44",
    email: "lotte.staes@gmail.com",
},
{
    id: 16,
    voornaam: "Helena",
    achternaam: "Miserez",
    geboorteDatum: new Date("2005-04-07"),
    telefoon: "0490 77 44 11",
    email: "helena.miserez@gmail.com",
},
{
    id: 17,
    voornaam: "Finn",
    achternaam: "Verstraeten",
    geboorteDatum: new Date("2018-01-12"),
    telefoon: "0471 20 30 40",
    email: "finn.verstraeten@gmail.com",
},
{
    id: 18,
    voornaam: "Nora",
    achternaam: "De Bruyn",
    geboorteDatum: new Date("2017-06-03"),
    telefoon: "0472 21 31 41",
    email: "nora.debruyn@gmail.com",
},
{
    id: 19,
    voornaam: "Mats",
    achternaam: "Lefevre",
    geboorteDatum: new Date("2016-11-20"),
    telefoon: "0473 22 32 42",
    email: "mats.lefevre@gmail.com",
},
{
    id: 20,
    voornaam: "Ella",
    achternaam: "Deprez",
    geboorteDatum: new Date("2015-08-09"),
    telefoon: "0474 23 33 43",
    email: "ella.deprez@gmail.com",
},
{
    id: 21,
    voornaam: "Victor",
    achternaam: "De Ridder",
    geboorteDatum: new Date("2014-03-27"),
    telefoon: "0475 24 34 44",
    email: "victor.deridder@gmail.com",
},
{
    id: 22,
    voornaam: "Lotte",
    achternaam: "Declercq",
    geboorteDatum: new Date("2013-10-15"),
    telefoon: "0476 25 35 45",
    email: "lotte.declercq@gmail.com",
},
{
    id: 23,
    voornaam: "Jasper",
    achternaam: "Vanhoutte",
    geboorteDatum: new Date("2012-05-06"),
    telefoon: "0477 26 36 46",
    email: "jasper.vanhoutte@gmail.com",
},
{
    id: 24,
    voornaam: "Amélie",
    achternaam: "De Pauw",
    geboorteDatum: new Date("2011-09-28"),
    telefoon: "0478 27 37 47",
    email: "amelie.depauw@gmail.com",
},
{
    id: 25,
    voornaam: "Robbe",
    achternaam: "Van Damme",
    geboorteDatum: new Date("2010-02-18"),
    telefoon: "0479 28 38 48",
    email: "robbe.vandamme@gmail.com",
},
{
    id: 26,
    voornaam: "Hanne",
    achternaam: "De Vos",
    geboorteDatum: new Date("2009-11-07"),
    telefoon: "0480 29 39 49",
    email: "hanne.devos@gmail.com",
},
{
    id: 27,
    voornaam: "Simon",
    achternaam: "Wouters",
    geboorteDatum: new Date("2008-04-30"),
    telefoon: "0481 30 40 50",
    email: "simon.wouters@gmail.com",
},
{
    id: 28,
    voornaam: "Jade",
    achternaam: "De Backer",
    geboorteDatum: new Date("2007-09-11"),
    telefoon: "0482 31 41 51",
    email: "jade.debacker@gmail.com",
},
{
    id: 29,
    voornaam: "Tibo",
    achternaam: "De Meyer",
    geboorteDatum: new Date("2017-02-22"),
    telefoon: "0483 32 42 52",
    email: "tibo.demeyer@gmail.com",
},
{
    id: 30,
    voornaam: "Mira",
    achternaam: "De Graeve",
    geboorteDatum: new Date("2015-12-01"),
    telefoon: "0484 33 43 53",
    email: "mira.degraeve@gmail.com",
},
{
    id: 31,
    voornaam: "Owen",
    achternaam: "Claes",
    geboorteDatum: new Date("2013-06-19"),
    telefoon: "0485 34 44 54",
    email: "owen.claes@gmail.com",
},

]);
console.log('✅ Personen seeded successfully\n');
}

async function seedLeiding() {
  console.log("⛺ Seeding leiding...");

await db.insert(schema.leiding).values([
  {
    persoonId: 1,
    ageGroup: "Sloebers",
    imageUrl: "/src/images/helena.png",
    beschrijving: "Hallooo, ik ben Helena, 2e jaar als leiding en dit jaar sta ik bij de tofste sloebsss. Ik studeer geneeskunde en ben net begonnen aan mijn tweede jaar 🧠💉💊. In de week ben ik in Gent te vinden, waar ik graag iets ga drinken met vriendinnen of met vriendinnen sporten! Een cool weetje over mij is dat ik het eerste leerjaar ben overgeslagen! 📚🖋️",
    isHoofdleiding: false
  },
  {
    persoonId: 2,
    ageGroup: "Sloebers",
    imageUrl: "/src/images/lotte.png",
    beschrijving: "Heyhey, Lotte hier! Dit jaar begin ik aan mijn 5de jaar leiding en 3de jaar hoofdleiding 🤩. 21 jaar en mega veel goesting in een zot jaar vol plezier! Naast de jeugdbeweging studeer ik klinische orthopedagogiek & disability studies 🎓. In mijn vrije tijd ga ik graag koffie drinken met vriendinnen ☕️. Fun fact: ik ski al sinds mijn 4 jaar ⛷️.",
    isHoofdleiding: true
  },
  {
    persoonId: 3,
    ageGroup: "Sloebers",
    imageUrl: "/src/images/liam.png",
    beschrijving: "Hey, ik ben Liam Van de Walle! Ik zit pas bij de KSA sinds mijn eerste jaar in de +16 en ben nu leiding. Als ik niet achter mijn boeken zit voor mijn studies industrieel ingenieur, dan kun je mij wel altijd vinden aan een dartbord 🎯. Een-eye lukt niet altijd, maar ik doe alsof het de bedoeling was. 🫣",
    isHoofdleiding: false
  },
  {
    persoonId: 4,
    ageGroup: "Paggaders",
    imageUrl: "/src/images/jos.jpg",
    beschrijving: "Mijn naam is Jos Van de Meulebroucke en ik ben 18 jaar oud. In mijn vrije tijd ga ik graag naar de fitness en houd ik van vissen 🐠🎣. Ik ben een sociaal persoon en ik kijk ernaar uit om er samen een leuk jaar van te maken! 🥳",
    isHoofdleiding: false
  },
  {
    persoonId: 5,
    ageGroup: "Paggaders",
    imageUrl: "/src/images/maud.png",
    beschrijving: "Hooiii. Mijn naam is Maud en dit is mijn tweede jaar als leiding. Ik ben 19 jaar en ik studeer farmaceutische wetenschappen aan de UGent 💊🦠🧪. Naast naar de KSA gaan, ga ik in mijn vrije tijd ook wel eens graag op restaurant 🌮🍱. Een leuk weetje over mezelf is dat ik een KSA-baby ben: zowel mijn mama als papa hebben als kind en als leiding ook in de KSA gezeten. ❤️",
    isHoofdleiding: false
  },
  {
    persoonId: 6,
    ageGroup: "Joro’s",
    imageUrl: "/src/images/inge.png",
    beschrijving: "Hoipiepeloi! Ik ben Inge, en dit is al mijn tweede jaar als leiding. Overdag ben ik te vinden aan HoGent, waar ik Marketing studeer🧾📚, maar in mijn vrije tijd zit ik zelden stil. Naast KSA trek ik regelmatig naar de atletiekpiste. 🥇💪 Een leuk weetje? Ik ben live naar Adele gaan kijken, samen met mijn papa in München.🎤🎵",
    isHoofdleiding: false
  },
  {
    persoonId: 7,
    ageGroup: "Joro’s",
    imageUrl: "/src/images/senne.png",
    beschrijving: "Dag iedereen! Mijn naam is Senne. Ik ben 20 jaar en student rechtspraktijk🧑‍⚖️✒️. Dit is alweer mijn 3de jaar als leider in de KSA. Naast mijn leidinggevende vaardigheden kan ik ook jongleren🤹! Ik heb alvast zin om er een topjaar van te maken, samen met mijn Joro’s. ❤️",
    isHoofdleiding: false
  },
  {
    persoonId: 8,
    ageGroup: "Joro’s",
    imageUrl: "/src/images/sander.png",
    beschrijving: "Hallo mijn naam is Sander, ik ben 19 en het is mijn tweede jaar dat ik leiding sta in de KSA. Ik studeer toegepaste informatica in HoGent op de campus in Aalst en mijn hobby is fitness💪🏋️. Een leuk weetje over mij is dat ik een halve Hollander ben 🇳🇱🧀.",
    isHoofdleiding: false
  },
  {
    persoonId: 9,
    ageGroup: "Knimmers",
    imageUrl: "/src/images/sarah.png",
    beschrijving: "Heyhey! Ik ben Sarah, 21 lentes jong en ondertussen al aan mijn 5e jaar als leiding bezig!😊 Overdag zit ik in Gent als student klinische psychologie, en in het weekend ben ik te vinden op de KSA💙. In mijn vrije tijd verdwijn ik graag in een goed boek 📖, liefst met ne goeie koffie erbij☕. Een leuk weetje is dat ik jarig ben op kerst, dubbel feest dus🎉!",
    isHoofdleiding: false
  },
  {
    persoonId: 10,
    ageGroup: "Knimmers",
    imageUrl: "/src/images/michiel.png",
    beschrijving: "Ik ben Michiel en ben 21 jaar. Mijn hobby’s zijn zwemmen en KSA 🏊💦. Momenteel werk ik bij Heyo Vakantiekampen en zorg ik voor de logistieke werking achter de kampen. Weetje: ik heb in 2019 in Zuid-Afrika een leeuw in een boom zien kruipen omdat hij bang was van hyena’s 🌍🦁😮",
    isHoofdleiding: false
  },
  {
    persoonId: 11,
    ageGroup: "Knimmers",
    imageUrl: "/src/images/lauren.png",
    beschrijving: "Hey! Ik ben Lauren, 19 jaar en dit is mijn tweede jaar leiding. Ik studeer architectuur aan de KuLeuven in Gent 🏛️✍️. In het weekend ben ik natuurlijk te vinden op de KSA, maar je zal me ook vaak op concerten zien 🎵🎸. En een klein weetje: ik ben 5 minuten jonger dan Sander, maar velen denken dat het andersom is 😉.",
    isHoofdleiding: false
  },
  {
    persoonId: 12,
    ageGroup: "Sjo’ers",
    imageUrl: "/src/images/laure.jpg",
    beschrijving: "Heyyy! Ik ben Laure, 19 jaar en dit is mijn 2de jaar in de leiding 😊. Ik studeer psychologie aan de UGent. Naast KSA doe ik ook nog wedstrijddans, geef ik dansles en ga ik graag ééntje gaan drinken met mijn vriendinnen. 🍸 Een weetje over mezelf: toen ik 3 jaar was, ben ik eens bijna verdronken omdat ik zonder zwembandjes in het zwembad sprong 🫣. Ik kijk er heel hard naar uit om dit jaar leiding te staan voor de sjoooo! 💙",
    isHoofdleiding: false
  },
  {
    persoonId: 13,
    ageGroup: "Sjo’ers",
    imageUrl: "/src/images/matteo.png",
    beschrijving: "Hallo! Ik ben Matteo, 18 jaar en ik zit in mijn tweede jaar als leiding. Ik studeer toegepaste informatica aan de HoGent. In mijn vrije tijd breng ik veel tijd door met mijn hond Ubby en trek ik er graag op uit met mijn vrienden. 🐶🌳 Ik kijk er enorm naar uit om er dit jaar een fantastisch jaar van te maken met de Sjo! Fun fact: mijn mama kreeg ooit het beste verjaardagscadeau ooit — mij! We zijn namelijk allebei jarig op 28 oktober! 🎉",
    isHoofdleiding: false
  },
  {
    persoonId: 14,
    ageGroup: "+16",
    imageUrl: "/src/images/beau.png",
    beschrijving: "Hey hey! Mijn naam is Beau D’Hondt, 21 jaar, en het is al mijn 4de jaar leiding bij KSA Hillegem en mijn eerste jaar als hoofdleiding. 💪 Buiten de KSA probeer ik regelmatig naar de fitness te gaan in de Jims in Zottegem. Ik ga ook graag weg met mijn vrienden om te gaan biljarten 🎱. Een leuk weetje over mij is dat ik samen met mijn broer en mama in hetzelfde bedrijf werk in Lierde, namelijk bij De Cnijf. Mijn broer en ik zijn daar monteurs en onze mama werkt op de bureau. Ik kijk er alvast naar uit om er een superleuk jaar van te maken met de +16!!! 💚💚",
    isHoofdleiding: true
  },
  {
    persoonId: 15,
    ageGroup: "+16",
    imageUrl: "/src/images/chloë.jpg",
    beschrijving: "Heyy! Ik ben Chloë, 19 jaar en studeer accountancy en fiscaliteit🧾👩‍💼. Het is mijn 2e jaar als leiding en ik kijk weer uit naar een jaar vol plezier! In mijn vrije tijd shop ik graag in tweedehandswinkels👛, maar het liefst ben ik natuurlijk op de KSA. 💙",
    isHoofdleiding: false
  },
  {
    persoonId: 16,
    ageGroup: "+16",
    imageUrl: "/src/images/jorben.png",
    beschrijving: "Hey allemaal! Ik ben Jorben en dit is al mijn 8ste jaar leiding! Voor mijn 8ste jaar koos ik (opnieuw) voor de +16. Ik werk in Melle bij de NMBS 🚆. In mijn vrije tijd doe ik aan fitness 💪, gitaar spelen 🎸, bergen beklimmen 🗻 en natuurlijk ook KSA!! 💙",
    isHoofdleiding: false
  }
]);
  console.log('✅ Leiding seeded successfully\n');
}

async function seedLid() {
console.log("👤 Seeding Leden...");

await db.insert(schema.lid).values(
  [{
      persoonId: 17,
      ageGroup: "Sloebers"
    },
    {
      persoonId: 18,
      ageGroup: "Sloebers"
    },
    {
      persoonId: 19,
      ageGroup: "Paggaders"
    },
    {
      persoonId: 20,
      ageGroup: "Paggaders"
    },
    {
      persoonId: 21,
      ageGroup: "Joro"
    },
    {
      persoonId: 22,
      ageGroup: "Joro"
    },
    {
      persoonId: 23,
      ageGroup: "Knim"
    },
    {
      persoonId: 24,
      ageGroup: "Knim"
    },
    {
      persoonId: 25,
      ageGroup: "Sjo"
    },
    {
      persoonId: 26,
      ageGroup: "Sjo"
    },
    {
      persoonId: 27,
      ageGroup: "+16"
    },
    {
      persoonId: 28,
      ageGroup: "+16"
    },
    {
      persoonId: 29,
      ageGroup: "Sloebers"
    },
    {
      persoonId: 30,
      ageGroup: "Paggaders"
    },
    {
      persoonId: 31,
      ageGroup: "Joro"
    }]
  ); 
  console.log('✅ Leden seeded successfully\n');
}

async function seedLidKamp() {
console.log("👤 Seeding Lid Kampen...");

await db.insert(schema.lidKamp).values([
    // Kamp 1: 5 Leden
    {
      lidId: 17,
      kampId: 1
    },
    {
      lidId: 18,
      kampId: 1
    },
    {
      lidId: 19,
      kampId: 1
    },
    {
      lidId: 20,
      kampId: 1
    },
    {
      lidId: 21,
      kampId: 1
    },

    // Kamp 2: 2 Leden
    {
      lidId: 22,
      kampId: 2
    },
    {
      lidId: 23,
      kampId: 2
    },

    // Kamp 3: 7 Leden
    {
      lidId: 24,
      kampId: 3
    },
    {
      lidId: 25,
      kampId: 3
    },
    {
      lidId: 26,
      kampId: 3
    },
    {
      lidId: 27,
      kampId: 3
    },
    {
      lidId: 28,
      kampId: 3
    },
    {
      lidId: 17,
      kampId: 3
    },
    {
      lidId: 18,
      kampId: 3
    },

    // Kamp 4: 3 Leden
    {
      lidId: 29,
      kampId: 4
    },
    {
      lidId: 30,
      kampId: 4
    },
    {
      lidId: 31,
      kampId: 4
    },

    // Kamp 5: 4 Leden
    {
      lidId: 19,
      kampId: 5
    },
    {
      lidId: 21,
      kampId: 5
    },
    {
      lidId: 23,
      kampId: 5
    },
    {
      lidId: 25,
      kampId: 5
    },

    // Kamp 6: 2 Leden
    {
      lidId: 27,
      kampId: 6
    },
    {
      lidId: 29,
      kampId: 6
    }
  ]);
console.log('✅ Lid Kampen seeded successfully\n');
}

async function  seedLeidingKamp() {
console.log("👤 Seeding Leiding Kampen...");
await db.insert(schema.leidingKamp).values([
  // Kamp 1: 2 Leiding
  {
    leidingId: 1,
    kampId: 1
  },
  {
    leidingId: 2,
    kampId: 1
  },

  // Kamp 2: 5 Leiding
  {
    leidingId: 3,
    kampId: 2
  },
  {
    leidingId: 4,
    kampId: 2
  },
  {
    leidingId: 5,
    kampId: 2
  },
  {
    leidingId: 6,
    kampId: 2
  },
  {
    leidingId: 7,
    kampId: 2
  },

  // Kamp 3: 3 Leiding
  {
    leidingId: 8,
    kampId: 3
  },
  {
    leidingId: 9,
    kampId: 3
  },
  {
    leidingId: 10,
    kampId: 3
  },

  // Kamp 4: 4 Leiding
  {
    leidingId: 11,
    kampId: 4
  },
  {
    leidingId: 12,
    kampId: 4
  },
  {
    leidingId: 13,
    kampId: 4
  },
  {
    leidingId: 14,
    kampId: 4
  },

  // Kamp 5: 2 Leiding
  {
    leidingId: 15,
    kampId: 5
  },
  {
    leidingId: 16,
    kampId: 5
  },

  // Kamp 6: 3 Leiding
  {
    leidingId: 1,
    kampId: 6
  },
  {
    leidingId: 3,
    kampId: 6
  },
  {
    leidingId: 5,
    kampId: 6
  }
]);
console.log('✅ Leiding Kampen seeded successfully\n');
}