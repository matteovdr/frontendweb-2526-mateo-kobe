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

  await db.delete(schema.kampen);

  console.log('✅ Database reset completed\n');
}
async function seedPlaces() {
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
      naam: 'Zomerkamp Kortijk aan Zee',
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

  console.log('✅ Places seeded successfully\n');
}

async function main() {
  console.log('🌱 Starting database seeding...\n');

  await resetDatabase();
  await seedPlaces();
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



 async function seedLeiding() {
  console.log('Seeding leiding tabel...');

  await db.insert(schema.leiding).values([
   
  {
    "id": 1,
    "name": "Beau D’Hondt",
    "ageGroup": "Hoofdleiding",
    "imageUrl": "/images/beau.png",
    "description": "Hey hey! Mijn naam is Beau D’Hondt, 21 jaar, en het is al mijn 4de jaar leiding bij KSA Hillegem en mijn eerste jaar als hoofdleiding. 💪 Buiten de KSA probeer ik regelmatig naar de fitness te gaan in de Jims in Zottegem. Ik ga ook graag weg met mijn vrienden om te gaan biljarten 🎱. Een leuk weetje over mij is dat ik samen met mijn broer en mama in hetzelfde bedrijf werk in Lierde, namelijk bij De Cnijf. Mijn broer en ik zijn daar monteurs en onze mama werkt op de bureau. Ik kijk er alvast naar uit om er een superleuk jaar van te maken met de +16!!! 💚💚"
  },
  {
    "id": 2,
    "name": "Lotte",
    "ageGroup": "Hoofdleiding",
    "imageUrl": "/images/lotte.png",
    "description": "Heyhey, Lotte hier! Dit jaar begin ik aan mijn 5de jaar leiding en 3de jaar hoofdleiding 🤩. 21 jaar en mega veel goesting in een zot jaar vol plezier! Naast de jeugdbeweging studeer ik klinische orthopedagogiek & disability studies 🎓. In mijn vrije tijd ga ik graag koffie drinken met vriendinnen ☕️. Fun fact: ik ski al sinds mijn 4 jaar ⛷️."
  },
  {
    "id": 3,
    "name": "Helena",
    "ageGroup": "Sloebers",
    "imageUrl": "/images/helena.png",
    "description": "Hallooo, ik ben Helena, 2e jaar als leiding en dit jaar sta ik bij de tofste sloebsss. Ik studeer geneeskunde en ben net begonnen aan mijn tweede jaar 🧠💉💊. In de week ben ik in Gent te vinden, waar ik graag iets ga drinken met vriendinnen of met vriendinnen sporten! Een cool weetje over mij is dat ik het eerste leerjaar ben overgeslagen! 📚🖋️"
  },
  {
    "id": 4,
    "name": "Lotte",
    "ageGroup": "Sloebers",
    "imageUrl": "/images/lotte.png",
    "description": "Heyhey, Lotte hier! Dit jaar begin ik aan mijn 5de jaar leiding en 3de jaar hoofdleiding 🤩. 21 jaar en mega veel goesting in een zot jaar vol plezier! Naast de jeugdbeweging studeer ik klinische orthopedagogiek & disability studies 🎓. In mijn vrije tijd ga ik graag koffie drinken met vriendinnen ☕️. Fun fact: ik ski al sinds mijn 4 jaar ⛷️."
  },
  {
    "id": 5,
    "name": "Liam",
    "ageGroup": "Sloebers",
    "imageUrl": "/images/liam.png",
    "description": "Hey, ik ben Liam Van de Walle! Ik zit pas bij de KSA sinds mijn eerste jaar in de +16 en ben nu leiding. Als ik niet achter mijn boeken zit voor mijn studies industrieel ingenieur, dan kun je mij wel altijd vinden aan een dartbord 🎯. Een-eye lukt niet altijd, maar ik doe alsof het de bedoeling was. 🫣"
  },
  {
    "id": 6,
    "name": "Jos",
    "ageGroup": "Paggaders",
    "imageUrl": "/images/jos.jpg",
    "description": "Mijn naam is Jos Van de Meulebroucke en ik ben 18 jaar oud. In mijn vrije tijd ga ik graag naar de fitness en houd ik van vissen 🐠🎣. Ik ben een sociaal persoon en ik kijk ernaar uit om er samen een leuk jaar van te maken! 🥳"
  },
  {
    "id": 7,
    "name": "Maud",
    "ageGroup": "Paggaders",
    "imageUrl": "/images/maud.png",
    "description": "Hooiii. Mijn naam is Maud en dit is mijn tweede jaar als leiding. Ik ben 19 jaar en ik studeer farmaceutische wetenschappen aan de UGent 💊🦠🧪. Naast naar de KSA gaan, ga ik in mijn vrije tijd ook wel eens graag op restaurant 🌮🍱. Een leuk weetje over mezelf is dat ik een KSA-baby ben: zowel mijn mama als papa hebben als kind en als leiding ook in de KSA gezeten. ❤️"
  },
  {
    "id": 8,
    "name": "Inge",
    "ageGroup": "Joro’s",
    "imageUrl": "/images/inge.png",
    "description": "Hoipiepeloi! Ik ben Inge, en dit is al mijn tweede jaar als leiding. Overdag ben ik te vinden aan HoGent, waar ik Marketing studeer🧾📚, maar in mijn vrije tijd zit ik zelden stil. Naast KSA trek ik regelmatig naar de atletiekpiste. 🥇💪 Een leuk weetje? Ik ben live naar Adele gaan kijken, samen met mijn papa in München.🎤🎵"
  },
  {
    "id": 9,
    "name": "Senne",
    "ageGroup": "Joro’s",
    "imageUrl": "/images/senne.png",
    "description": "Dag iedereen! Mijn naam is Senne. Ik ben 20 jaar en student rechtspraktijk🧑‍⚖️✒️. Dit is alweer mijn 3de jaar als leider in de KSA. Naast mijn leidinggevende vaardigheden kan ik ook jongleren🤹! Ik heb alvast zin om er een topjaar van te maken, samen met mijn Joro’s. ❤️"
  },
  {
    "id": 10,
    "name": "Sander",
    "ageGroup": "Joro’s",
    "imageUrl": "/images/sander.png",
    "description": "Hallo mijn naam is Sander, ik ben 19 en het is mijn tweede jaar dat ik leiding sta in de KSA. Ik studeer toegepaste informatica in HoGent op de campus in Aalst en mijn hobby is fitness💪🏋️. Een leuk weetje over mij is dat ik een halve Hollander ben 🇳🇱🧀."
  },
  {
    "id": 11,
    "name": "Sarah",
    "ageGroup": "Knimmers",
    "imageUrl": "/images/sarah.png",
    "description": "Heyhey! Ik ben Sarah, 21 lentes jong en ondertussen al aan mijn 5e jaar als leiding bezig!😊 Overdag zit ik in Gent als student klinische psychologie, en in het weekend ben ik te vinden op de KSA💙. In mijn vrije tijd verdwijn ik graag in een goed boek 📖, liefst met ne goeie koffie erbij☕. Een leuk weetje is dat ik jarig ben op kerst, dubbel feest dus🎉!"
  },
  {
    "id": 12,
    "name": "Michiel",
    "ageGroup": "Knimmers",
    "imageUrl": "/images/michiel.png",
    "description": "Ik ben Michiel en ben 21 jaar. Mijn hobby’s zijn zwemmen en KSA 🏊💦. Momenteel werk ik bij Heyo Vakantiekampen en zorg ik voor de logistieke werking achter de kampen. Weetje: ik heb in 2019 in Zuid-Afrika een leeuw in een boom zien kruipen omdat hij bang was van hyena’s 🌍🦁😮"
  },
  {
    "id": 13,
    "name": "Lauren",
    "ageGroup": "Knimmers",
    "imageUrl": "/images/lauren.png",
    "description": "Hey! Ik ben Lauren, 19 jaar en dit is mijn tweede jaar leiding. Ik studeer architectuur aan de KuLeuven in Gent 🏛️✍️. In het weekend ben ik natuurlijk te vinden op de KSA, maar je zal me ook vaak op concerten zien 🎵🎸. En een klein weetje: ik ben 5 minuten jonger dan Sander, maar velen denken dat het andersom is 😉."
  },
  {
    "id": 14,
    "name": "Laure",
    "ageGroup": "Sjo’ers",
    "imageUrl": "/images/laure.jpg",
    "description": "Heyyy! Ik ben Laure, 19 jaar en dit is mijn 2de jaar in de leiding 😊. Ik studeer psychologie aan de UGent. Naast KSA doe ik ook nog wedstrijddans, geef ik dansles en ga ik graag ééntje gaan drinken met mijn vriendinnen. 🍸 Een weetje over mezelf: toen ik 3 jaar was, ben ik eens bijna verdronken omdat ik zonder zwembandjes in het zwembad sprong 🫣. Ik kijk er heel hard naar uit om dit jaar leiding te staan voor de sjoooo! 💙"
  },
  {
    "id": 15,
    "name": "Matteo",
    "ageGroup": "Sjo’ers",
    "imageUrl": "/images/matteo.png",
    "description": "Hallo! Ik ben Matteo, 18 jaar en ik zit in mijn tweede jaar als leiding. Ik studeer toegepaste informatica aan de HoGent. In mijn vrije tijd breng ik veel tijd door met mijn hond Ubby en trek ik er graag op uit met mijn vrienden. 🐶🌳 Ik kijk er enorm naar uit om er dit jaar een fantastisch jaar van te maken met de Sjo! Fun fact: mijn mama kreeg ooit het beste verjaardagscadeau ooit — mij! We zijn namelijk allebei jarig op 28 oktober! 🎉"
  },
  {
    "id": 16,
    "name": "Beau D’Hondt",
    "ageGroup": "+16",
    "imageUrl": "/images/beau.png",
    "description": "Hey hey! Mijn naam is Beau D’Hondt, 21 jaar, en het is al mijn 4de jaar leiding bij KSA Hillegem en mijn eerste jaar als hoofdleiding. 💪 Buiten de KSA probeer ik regelmatig naar de fitness te gaan in de Jims in Zottegem. Ik ga ook graag weg met mijn vrienden om te gaan biljarten 🎱. Een leuk weetje over mij is dat ik samen met mijn broer en mama in hetzelfde bedrijf werk in Lierde, namelijk bij De Cnijf. Mijn broer en ik zijn daar monteurs en onze mama werkt op de bureau. Ik kijk er alvast naar uit om er een superleuk jaar van te maken met de +16!!! 💚💚"
  },
  {
    "id": 17,
    "name": "Chloë",
    "ageGroup": "+16",
    "imageUrl": "/images/chloë.jpg",
    "description": "Heyy! Ik ben Chloë, 19 jaar en studeer accountancy en fiscaliteit🧾👩‍💼. Het is mijn 2e jaar als leiding en ik kijk weer uit naar een jaar vol plezier! In mijn vrije tijd shop ik graag in tweedehandswinkels👛, maar het liefst ben ik natuurlijk op de KSA. 💙"
  },
  {
    "id": 18,
    "name": "Jorben",
    "ageGroup": "+16",
    "imageUrl": "/images/jorben.png",
    "description": "Hey allemaal! Ik ben Jorben en dit is al mijn 8ste jaar leiding! Voor mijn 8ste jaar koos ik (opnieuw) voor de +16. Ik werk in Melle bij de NMBS 🚆. In mijn vrije tijd doe ik aan fitness 💪, gitaar spelen 🎸, bergen beklimmen 🗻 en natuurlijk ook KSA!! 💙"
  }


  ]);

  console.log('✅ Leiding seeded successfully\n');
}