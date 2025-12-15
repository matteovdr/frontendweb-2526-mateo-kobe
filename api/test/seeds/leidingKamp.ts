import * as schema from '../../src/drizzle/schema';
import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';

export async function seedLeidingKamp(drizzle: DatabaseProvider) {
  console.log('🟧 Seeding leiding-kamp...');

  await drizzle.insert(schema.leidingKamp).values([
    { leidingId: 1, kampId: 1 },
    // …
  ]);

  console.log('✅ Leiding-Kamp seeded!\n');
}

export async function clearLeidingKamp(drizzle: DatabaseProvider) {
  console.log('🗑️ Clearing leiding-kamp...');
  await drizzle.delete(schema.leidingKamp);
  console.log('✅ Leiding-Kamp cleared!\n');
}
