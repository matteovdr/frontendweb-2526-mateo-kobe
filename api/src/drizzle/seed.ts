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
