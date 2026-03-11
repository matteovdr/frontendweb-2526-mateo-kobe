// seeds/personen.ts
import * as schema from '../../src/drizzle/schema';
import { Role } from '../../auth/roles';
import * as argon2 from 'argon2';
import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';

async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    hashLength: 32,
    timeCost: 2,
    memoryCost: 2 ** 16,
  });
}

export async function seedPersoon(drizzle: DatabaseProvider) {
  console.log('🟦 Seeding persoon...');

  await drizzle.insert(schema.persoon).values([
    {
      id: 1,
      voornaam: 'Hoofd',
      achternaam: 'Leiding',
      geboorteDatum: new Date('2000-01-01'),
      telefoon: '0400 00 00 01',
      email: 'hoofd.leiding@test.be',
      passwordHash: await hashPassword('12345678'),
      roles: [Role.HOOFDLEIDING],
    },
    {
      id: 2,
      voornaam: 'Leiding',
      achternaam: 'User',
      geboorteDatum: new Date('2000-01-02'),
      telefoon: '0400 00 00 02',
      email: 'leiding.user@test.be',
      passwordHash: await hashPassword('12345678'),
      roles: [Role.LEIDING],
    },
    {
      id: 3,
      voornaam: 'Lid',
      achternaam: 'User',
      geboorteDatum: new Date('2010-01-01'),
      telefoon: '0400 00 00 03',
      email: 'lid.user@test.be',
      passwordHash: await hashPassword('12345678'),
      roles: [Role.LID],
    },
    {
      id: 17,
      voornaam: 'Lid',
      achternaam: 'Zeventien',
      geboorteDatum: new Date('2012-01-01'),
      telefoon: '0400 00 00 17',
      email: 'lid17@test.be',
      passwordHash: await hashPassword('12345678'),
      roles: [Role.LID],
    },
    {
      id: 18,
      voornaam: 'Lid',
      achternaam: 'Achttien',
      geboorteDatum: new Date('2012-01-02'),
      telefoon: '0400 00 00 18',
      email: 'lid18@test.be',
      passwordHash: await hashPassword('12345678'),
      roles: [Role.LID],
    },
  ]);
}

export async function clearPersoon(drizzle: DatabaseProvider) {
  console.log('🗑️ Clearing persoon...');
  await drizzle.delete(schema.persoon);
  console.log('✅ persoon cleared!\n');
}
