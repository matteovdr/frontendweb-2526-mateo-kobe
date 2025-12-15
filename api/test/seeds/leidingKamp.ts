import * as schema from "../../src/drizzle/schema";
import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 5,
});

const db = drizzle(connection, {
  schema,
  mode: 'default',
});

export async function seedLeidingKamp() {
  console.log("🟧 Seeding leiding-kamp...");

  await db.insert(schema.leidingKamp).values([
    { leidingId: 1, kampId: 1 },
    // …
  ]);

  console.log("✅ Leiding-Kamp seeded!\n");
}

export async function clearLeidingKamp() {
  console.log("🗑️ Clearing leiding-kamp...");
  await db.delete(schema.leidingKamp);
  console.log("✅ Leiding-Kamp cleared!\n");
}
