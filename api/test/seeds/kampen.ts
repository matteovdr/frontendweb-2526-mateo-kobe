import * as schema from '../../src/drizzle/schema';
import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';

export const KAMPEN_SEED = [
  {
    id: 1,
    naam: 'Stadskamp Brussel Atomium',
    stad: 'Brussel',
    beschrijving: 'Beschrijving wordt later toegevoegd.',
    startDatum: new Date('2025-04-07'),
    eindDatum: new Date('2025-04-13'),
  },
  {
    id: 2,
    naam: 'Zomerkamp Kortrijk aan Zee',
    stad: 'Kortrijk',
    beschrijving: 'Beschrijving wordt later toegevoegd.',
    startDatum: new Date('2025-07-07'),
    eindDatum: new Date('2025-07-13'),
  },
];

export async function seedKampen(drizzle: DatabaseProvider) {
  console.log('⛺ Seeding kampen...');
  await drizzle.insert(schema.kampen).values(KAMPEN_SEED);
  console.log('✅ Kampen seeded!\n');
}

export async function clearKampen(drizzle: DatabaseProvider) {
  console.log('🗑️ Clearing kampen...');
  await drizzle.delete(schema.kampen);
  console.log('✅ Kampen cleared!\n');
}
