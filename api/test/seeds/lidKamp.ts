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

export async function seedLidKamp() {
  console.log("🔵 Seeding lid-kamp...");

  await db.insert(schema.lidKamp).values([
    { lidId: 17, kampId: 1 },
    // …
  ]);

  console.log("✅ Lid-Kamp seeded!\n");
}

export async function clearLidKamp() {
  console.log("🗑️ Clearing lid-kamp...");
  await db.delete(schema.lidKamp);
  console.log("✅ Lid-Kamp cleared!\n");
}
