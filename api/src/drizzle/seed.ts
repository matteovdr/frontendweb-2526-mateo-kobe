// src/drizzle/seed.ts
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

async function resetDatabase() {
  console.log('🗑️ Resetting database...');

  await db.delete(schema.kampLeiding);
  await db.delete(schema.leiding);
  await db.delete(schema.kampen);

  console.log('✅ Database reset completed\n');
}

async function seedKampen() {
  console.log('📍 Seeding kampen...');

  await db.insert(schema.kampen).values([
    {
      id: 1,
      naam: 'Stadskamp Brussel Atomium',
      stad: 'Brussel',
      startDatum: new Date('2025-04-07'),
      eindDatum: new Date('2025-04-13'),
    },
    {
      id: 2,
      naam: 'Zomerkamp Kortrijk aan Zee',
      stad: 'Kortrijk',
      startDatum: new Date('2025-07-07'),
      eindDatum: new Date('2025-07-13'),
    },
    {
      id: 3,
      naam: 'Avonturenkamp Ardennen',
      stad: 'La Roche-en-Ardenne',
      startDatum: new Date('2025-07-21'),
      eindDatum: new Date('2025-07-27'),
    },
    {
      id: 4,
      naam: 'Muziekkamp bij de Saxophone Stad',
      stad: 'Dinant',
      startDatum: new Date('2025-08-04'),
      eindDatum: new Date('2025-08-10'),
    },
    {
      id: 5,
      naam: 'Natuurkamp Saint-Hubert',
      stad: 'Saint-Hubert',
      startDatum: new Date('2025-10-27'),
      eindDatum: new Date('2025-11-02'),
    },
    {
      id: 6,
      naam: 'Rivierenkamp bij de Maas',
      stad: 'Namur',
      startDatum: new Date('2026-02-16'),
      eindDatum: new Date('2026-02-22'),
    },
  ]);

  console.log('✅ Kampen seeded successfully\n');
}

async function seedLeiding() {
  console.log('🧑‍🏫 Seeding leiding...');

  await db.insert(schema.leiding).values([
    {
  voornaam: "Helena",
  achternaam: "Miserez",
  leeftijdsgroep: "Sloebers",
  imageUrl: "/images/helena.png",
  beschrijving: "Hallooo, ik ben Helena, 2e jaar als leiding en dit jaar sta ik bij de tofste sloebsss. Ik studeer geneeskunde en ben net begonnen aan mijn tweede jaar 🧠💉💊. In de week ben ik in Gent te vinden, waar ik graag iets ga drinken met vriendinnen of met vriendinnen sporten! Een cool weetje over mij is dat ik het eerste leerjaar ben overgeslagen! 📚🖋️",
  telefoon: "0470 11 22 33",
  email: "helena.miserez@gmail.com"
},
{
  voornaam: "Lotte",
  achternaam: "Staes",
  leeftijdsgroep: "Sloebers",
  imageUrl: "/images/lotte.png",
  beschrijving: "Heyhey, Lotte hier! Dit jaar begin ik aan mijn 5de jaar leiding en 3de jaar hoofdleiding 🤩. 21 jaar en mega veel goesting in een zot jaar vol plezier! Naast de jeugdbeweging studeer ik klinische orthopedagogiek & disability studies 🎓. In mijn vrije tijd ga ik graag koffie drinken met vriendinnen ☕️. Fun fact: ik ski al sinds mijn 4 jaar ⛷️.",
  telefoon: "0479 22 33 44",
  email: "lotte.staes@gmail.com"
},
{
  voornaam: "Liam",
  achternaam: "Robyns",
  leeftijdsgroep: "Sloebers",
  imageUrl: "/images/liam.png",
  beschrijving: "Hey, ik ben Liam Van de Walle! Ik zit pas bij de KSA sinds mijn eerste jaar in de +16 en ben nu leiding. Als ik niet achter mijn boeken zit voor mijn studies industrieel ingenieur, dan kun je mij wel altijd vinden aan een dartbord 🎯. Een-eye lukt niet altijd, maar ik doe alsof het de bedoeling was. 🫣",
  telefoon: "0468 33 44 55",
  email: "liam.robyns@gmail.com"
},
{
  voornaam: "Jos",
  achternaam: "Traas",
  leeftijdsgroep: "Paggaders",
  imageUrl: "/images/jos.jpg",
  beschrijving: "Mijn naam is Jos Van de Meulebroucke en ik ben 18 jaar oud. In mijn vrije tijd ga ik graag naar de fitness en houd ik van vissen 🐠🎣. Ik ben een sociaal persoon en ik kijk ernaar uit om er samen een leuk jaar van te maken! 🥳",
  telefoon: "0486 44 55 66",
  email: "jos.traas@gmail.com"
},
{
  voornaam: "Maud",
  achternaam: "Keppens",
  leeftijdsgroep: "Paggaders",
  imageUrl: "/images/maud.png",
  beschrijving: "Hooiii. Mijn naam is Maud en dit is mijn tweede jaar als leiding. Ik ben 19 jaar en ik studeer farmaceutische wetenschappen aan de UGent 💊🦠🧪. Naast naar de KSA gaan, ga ik in mijn vrije tijd ook wel eens graag op restaurant 🌮🍱. Een leuk weetje over mezelf is dat ik een KSA-baby ben: zowel mijn mama als papa hebben als kind en als leiding ook in de KSA gezeten. ❤️",
  telefoon: "0497 55 66 77",
  email: "maud.keppens@gmail.com"
},
{
  voornaam: "Inge",
  achternaam: "Baetens",
  leeftijdsgroep: "Joro’s",
  imageUrl: "/images/inge.png",
  beschrijving: "Hoipiepeloi! Ik ben Inge, en dit is al mijn tweede jaar als leiding. Overdag ben ik te vinden aan HoGent, waar ik Marketing studeer🧾📚, maar in mijn vrije tijd zit ik zelden stil. Naast KSA trek ik regelmatig naar de atletiekpiste. 🥇💪 Een leuk weetje? Ik ben live naar Adele gaan kijken, samen met mijn papa in München.🎤🎵",
  telefoon: "0478 66 77 88",
  email: "inge.baetens@gmail.com"
},
{
  voornaam: "Senne",
  achternaam: "Le Percq",
  leeftijdsgroep: "Joro’s",
  imageUrl: "/images/senne.png",
  beschrijving: "Dag iedereen! Mijn naam is Senne. Ik ben 20 jaar en student rechtspraktijk🧑‍⚖️✒️. Dit is alweer mijn 3de jaar als leider in de KSA. Naast mijn leidinggevende vaardigheden kan ik ook jongleren🤹! Ik heb alvast zin om er een topjaar van te maken, samen met mijn Joro’s. ❤️",
  telefoon: "0491 77 88 99",
  email: "senne.lepercq@gmail.com"
},
{
  voornaam: "Sander",
  achternaam: "van Schaik",
  leeftijdsgroep: "Joro’s",
  imageUrl: "/images/sander.png",
  beschrijving: "Hallo mijn naam is Sander, ik ben 19 en het is mijn tweede jaar dat ik leiding sta in de KSA. Ik studeer toegepaste informatica in HoGent op de campus in Aalst en mijn hobby is fitness💪🏋️. Een leuk weetje over mij is dat ik een halve Hollander ben 🇳🇱🧀.",
  telefoon: "0489 88 99 00",
  email: "sander.vanschaik@gmail.com"
},
{
  voornaam: "Sarah",
  achternaam: "Van Syngel",
  leeftijdsgroep: "Knimmers",
  imageUrl: "/images/sarah.png",
  beschrijving: "Heyhey! Ik ben Sarah, 21 lentes jong en ondertussen al aan mijn 5e jaar als leiding bezig!😊 Overdag zit ik in Gent als student klinische psychologie, en in het weekend ben ik te vinden op de KSA💙. In mijn vrije tijd verdwijn ik graag in een goed boek 📖, liefst met ne goeie koffie erbij☕. Een leuk weetje is dat ik jarig ben op kerst, dubbel feest dus🎉!",
  telefoon: "0470 12 34 56",
  email: "sarah.vansyngel@gmail.com"
},
{
  voornaam: "Michiel",
  achternaam: "De Boeck",
  leeftijdsgroep: "Knimmers",
  imageUrl: "/images/michiel.png",
  beschrijving: "Ik ben Michiel en ben 21 jaar. Mijn hobby’s zijn zwemmen en KSA 🏊💦. Momenteel werk ik bij Heyo Vakantiekampen en zorg ik voor de logistieke werking achter de kampen. Weetje: ik heb in 2019 in Zuid-Afrika een leeuw in een boom zien kruipen omdat hij bang was van hyena’s 🌍🦁😮",
  telefoon: "0472 23 45 67",
  email: "michiel.deboeck@gmail.com"
},
{
  voornaam: "Lauren",
  achternaam: "Van Godtsenhoven",
  leeftijdsgroep: "Knimmers",
  imageUrl: "/images/lauren.png",
  beschrijving: "Hey! Ik ben Lauren, 19 jaar en dit is mijn tweede jaar leiding. Ik studeer architectuur aan de KuLeuven in Gent 🏛️✍️. In het weekend ben ik natuurlijk te vinden op de KSA, maar je zal me ook vaak op concerten zien 🎵🎸. En een klein weetje: ik ben 5 minuten jonger dan Sander, maar velen denken dat het andersom is 😉.",
  telefoon: "0476 34 56 78",
  email: "lauren.vangodtsenhoven@gmail.com"
},
{
  voornaam: "Laure",
  achternaam: "Van Wesemael",
  leeftijdsgroep: "Sjo’ers",
  imageUrl: "/images/laure.jpg",
  beschrijving: "Heyyy! Ik ben Laure, 19 jaar en dit is mijn 2de jaar in de leiding 😊. Ik studeer psychologie aan de UGent. Naast KSA doe ik ook nog wedstrijddans, geef ik dansles en ga ik graag ééntje gaan drinken met mijn vriendinnen. 🍸 Een weetje over mezelf: toen ik 3 jaar was, ben ik eens bijna verdronken omdat ik zonder zwembandjes in het zwembad sprong 🫣. Ik kijk er heel hard naar uit om dit jaar leiding te staan voor de sjoooo! 💙",
  telefoon: "0465 45 67 89",
  email: "laure.vanwesemael@gmail.com"
},
{
  voornaam: "Matteo",
  achternaam: "Van Droogenbroeck",
  leeftijdsgroep: "Sjo’ers",
  imageUrl: "/images/matteo.png",
  beschrijving: "Hallo! Ik ben Matteo, 18 jaar en ik zit in mijn tweede jaar als leiding. Ik studeer toegepaste informatica aan de HoGent. In mijn vrije tijd breng ik veel tijd door met mijn hond Ubby en trek ik er graag op uit met mijn vrienden. 🐶🌳 Ik kijk er enorm naar uit om er dit jaar een fantastisch jaar van te maken met de Sjo! Fun fact: mijn mama kreeg ooit het beste verjaardagscadeau ooit — mij! We zijn namelijk allebei jarig op 28 oktober! 🎉",
  telefoon: "0483 56 78 90",
  email: "matteo.vandroogenbroeck@gmail.com"
},
{
  voornaam: "Beau",
  achternaam: "D’Hondt",
  leeftijdsgroep: "+16",
  imageUrl: "/images/beau.png",
  beschrijving: "Hey hey! Mijn naam is Beau D’Hondt, 21 jaar, en het is al mijn 4de jaar leiding bij KSA Hillegem en mijn eerste jaar als hoofdleiding. 💪 Buiten de KSA probeer ik regelmatig naar de fitness te gaan in de Jims in Zottegem. Ik ga ook graag weg met mijn vrienden om te gaan biljarten 🎱. Een leuk weetje over mij is dat ik samen met mijn broer en mama in hetzelfde bedrijf werk in Lierde, namelijk bij De Cnijf. Mijn broer en ik zijn daar monteurs en onze mama werkt op de bureau. Ik kijk er alvast naar uit om er een superleuk jaar van te maken met de +16!!! 💚💚",
  telefoon: "0473 67 89 01",
  email: "beau.dhondt@gmail.com"
},
{
  voornaam: "Chloë",
  achternaam: "Dekoster",
  leeftijdsgroep: "+16",
  imageUrl: "/images/chloë.jpg",
  beschrijving: "Heyy! Ik ben Chloë, 19 jaar en studeer accountancy en fiscaliteit🧾👩‍💼. Het is mijn 2e jaar als leiding en ik kijk weer uit naar een jaar vol plezier! In mijn vrije tijd shop ik graag in tweedehandswinkels👛, maar het liefst ben ik natuurlijk op de KSA. 💙",
  telefoon: "0460 78 90 12",
  email: "chloe.dekoster@gmail.com"
},
{
  voornaam: "Jorben",
  achternaam: "Ruysseveldt",
  leeftijdsgroep: "+16",
  imageUrl: "/images/jorben.png",
  beschrijving: "Hey allemaal! Ik ben Jorben en dit is al mijn 8ste jaar leiding! Voor mijn 8ste jaar koos ik (opnieuw) voor de +16. Ik werk in Melle bij de NMBS 🚆. In mijn vrije tijd doe ik aan fitness 💪, gitaar spelen 🎸, bergen beklimmen 🗻 en natuurlijk ook KSA!! 💙",
  telefoon: "0477 89 01 23",
  email: "jorben.ruysseveldt@gmail.com"
}

  ]);

  console.log('✅ Leiding seeded successfully\n');
}

async function main() {
  console.log('🌱 Starting database seeding...\n');

  await resetDatabase();
  await seedKampen();
  await seedLeiding();

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
