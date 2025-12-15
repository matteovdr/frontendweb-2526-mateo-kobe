// import { DatabaseProvider } from "../../src/drizzle/drizzle.provider";
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

export async function seedLeiding() {
  console.log("🟦 Seeding leiding...");

  await db.insert(schema.leiding).values([
    {
      persoonId: 1,
      ageGroup: "Sloebers",
      imageUrl: "/src/images/helena.png",
      beschrijving: "...",
      isHoofdleiding: false
    },
    // … alles van jouw originele code
  ]);

  console.log("✅ Leiding seeded!\n");
}

export async function clearLeiding() {
  console.log("🗑️ Clearing leiding...");
  await db.delete(schema.leiding);
  console.log("✅ Leiding cleared!\n");
}
