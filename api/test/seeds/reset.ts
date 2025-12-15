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

export async function resetDatabase() {
  console.log("🗑️ Resetting database...");

  await db.delete(schema.leidingKamp);
  await db.delete(schema.lidKamp);
  await db.delete(schema.leiding);
  await db.delete(schema.lid);
  await db.delete(schema.persoon);
  await db.delete(schema.kampen);

  console.log("✅ Full reset done!\n");
}
