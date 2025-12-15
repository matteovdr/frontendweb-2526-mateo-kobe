import * as schema from '../../src/drizzle/schema';
import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';

export async function seedLeiding(drizzle: DatabaseProvider) {
  console.log('🟦 Seeding leiding...');

  await drizzle.insert(schema.leiding).values([
    {
      persoonId: 1,
      ageGroup: 'Sloebers',
      imageUrl: '/src/images/helena.png',
      beschrijving: '...',
      isHoofdleiding: false,
    },

  ]);

  console.log('✅ Leiding seeded!\n');
}

export async function clearLeiding(drizzle: DatabaseProvider) {
  console.log('🗑️ Clearing leiding...');
  await drizzle.delete(schema.leiding);
  console.log('✅ Leiding cleared!\n');
}
