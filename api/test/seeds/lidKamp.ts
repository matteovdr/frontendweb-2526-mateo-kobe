import * as schema from '../../src/drizzle/schema';
import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';

export async function seedLidKamp(drizzle: DatabaseProvider) {
  console.log('🔵 Seeding lid-kamp...');

  await drizzle.insert(schema.lidKamp).values([
    { lidId: 17, kampId: 1 },
  ]);

  console.log('✅ Lid-Kamp seeded!\n');
}

export async function clearLidKamp(drizzle: DatabaseProvider) {
  console.log('🗑️ Clearing lid-kamp...');
  await drizzle.delete(schema.lidKamp);
  console.log('✅ Lid-Kamp cleared!\n');
}
