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
export async function seedLid() {
  console.log("🟩 Seeding Leden...");

  await db.insert(schema.lid).values([
    { persoonId: 17, ageGroup: "Sloebers" },
    { persoonId: 18, ageGroup: "Sloebers" },
    // …
  ]);

  console.log("✅ Leden seeded!\n");
}

export async function clearLid() {
  console.log("🗑️ Clearing leden...");
  await db.delete(schema.lid);
  console.log("✅ Leden cleared!\n");
}
