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

export const KAMPEN_SEED = [
  {
    id: 1,
    naam: "Stadskamp Brussel Atomium",
    stad: "Brussel",
    beschrijving: "Beschrijving wordt later toegevoegd.",
    startDatum: new Date("2025-04-07"),
    eindDatum: new Date("2025-04-13"),
  },
  {
    id: 2,
    naam: "Zomerkamp Kortrijk aan Zee",
    stad: "Kortrijk",
    beschrijving: "Beschrijving wordt later toegevoegd.",
    startDatum: new Date("2025-07-07"),
    eindDatum: new Date("2025-07-13"),
  },
];

export async function seedKampen() {
  console.log("⛺ Seeding kampen...");
  await db.insert(schema.kampen).values(KAMPEN_SEED);
  console.log("✅ Kampen seeded!\n");
}

export async function clearKampen() {
  console.log("🗑️ Clearing kampen...");
  await db.delete(schema.kampen);
  console.log("✅ Kampen cleared!\n");
}
