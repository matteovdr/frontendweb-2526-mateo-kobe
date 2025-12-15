import * as schema from '../../src/drizzle/schema';
import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';

export async function seedLid(drizzle: DatabaseProvider) {
  console.log('🟩 Seeding Leden...');

  await drizzle.insert(schema.lid).values([
    { persoonId: 17, ageGroup: 'Sloebers' },
    { persoonId: 18, ageGroup: 'Sloebers' },
    // …
  ]);

  console.log('✅ Leden seeded!\n');
}

export async function clearLid(drizzle: DatabaseProvider) {
  console.log('🗑️ Clearing leden...');
  await drizzle.delete(schema.lid);
  console.log('✅ Leden cleared!\n');
}
