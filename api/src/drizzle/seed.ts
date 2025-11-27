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

  // await resetDatabase();
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

  await db.delete(schema.kampen);
  await db.delete(schema.persoon);
  await db.delete(schema.leiding);
  await db.delete(schema.lid);
  await db.delete(schema.lidKamp);
  await db.delete(schema.leidingKamp);

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
      ageGroup: "Kapoenen",
      imageUrl: "/leiding/beau.webp",
      beschrijving: "Beau zorgt altijd voor sfeer, enthousiasme en het organiseren van creatieve activiteiten."
    },
    {
      persoonId: 2,
      ageGroup: "Welpen",
      imageUrl: "/leiding/matteo.webp",
      beschrijving: "Matteo staat bekend om zijn verantwoordelijkheidsgevoel en zijn talent voor het begeleiden van groepen."
    },
    {
      persoonId: 3,
      ageGroup: "Jonggivers",
      imageUrl: "/leiding/laure.webp",
      beschrijving: "Laure brengt rust en structuur terwijl ze altijd klaarstaat voor een goed gesprek."
    },
    {
      persoonId: 4,
      ageGroup: "Givers",
      imageUrl: "/leiding/chloe.webp",
      beschrijving: "Chloë barst van de energie en motiveert iedereen met haar positieve ingesteldheid."
    },
    {
      persoonId: 5,
      ageGroup: "Kapoenen",
      imageUrl: "/leiding/jorben.webp",
      beschrijving: "Jorben houdt van avontuur en laat zijn leden graag nieuwe uitdagingen aangaan."
    },
    {
      persoonId: 6,
      ageGroup: "Welpen",
      imageUrl: "/leiding/sarah.webp",
      beschrijving: "Sarah is zorgzaam, geduldig en zet zich volledig in voor elk kind."
    },
    {
      persoonId: 7,
      ageGroup: "Jonggivers",
      imageUrl: "/leiding/michiel.webp",
      beschrijving: "Michiel staat bekend om zijn humor en zijn talent om iedereen te laten lachen."
    },
    {
      persoonId: 8,
      ageGroup: "Givers",
      imageUrl: "/leiding/lauren.webp",
      beschrijving: "Lauren zorgt voor orde, planning en een warme groepssfeer."
    },
    {
      persoonId: 9,
      ageGroup: "Kapoenen",
      imageUrl: "/leiding/sander.webp",
      beschrijving: "Sander is creatief, muzikaal en brengt altijd leven in de groep."
    },
    {
      persoonId: 10,
      ageGroup: "Welpen",
      imageUrl: "/leiding/senne.webp",
      beschrijving: "Senne is sportief, uitdagend en weet elk spel naar een hoger niveau te tillen."
    },
    {
      persoonId: 11,
      ageGroup: "Jonggivers",
      imageUrl: "/leiding/inge.webp",
      beschrijving: "Inge straalt vriendelijkheid uit en zorgt ervoor dat niemand zich buitengesloten voelt."
    },
    {
      persoonId: 12,
      ageGroup: "Givers",
      imageUrl: "/leiding/maud.webp",
      beschrijving: "Maud is creatief, behulpzaam en altijd klaar om bij te springen waar nodig."
    },
    {
      persoonId: 13,
      ageGroup: "Kapoenen",
      imageUrl: "/leiding/jos.webp",
      beschrijving: "Jos heeft bakken ervaring en weet elke activiteit veilig en leuk te maken."
    },
    {
      persoonId: 14,
      ageGroup: "Welpen",
      imageUrl: "/leiding/liam.webp",
      beschrijving: "Liam is sociaal, grappig en heeft meteen een goede band met de leden."
    },
    {
      persoonId: 15,
      ageGroup: "Jonggivers",
      imageUrl: "/leiding/lotte.webp",
      beschrijving: "Lotte brengt structuur, gezelligheid en een luisterend oor."
    },
    {
      persoonId: 16,
      ageGroup: "Givers",
      imageUrl: "/leiding/helena.webp",
      beschrijving: "Helena is zorgzaam en staat bekend om haar sterke verantwoordelijkheidsgevoel."
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