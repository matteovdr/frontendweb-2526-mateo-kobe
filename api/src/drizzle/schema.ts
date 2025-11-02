// src/drizzle/schema.ts
import { mysqlTable, int, varchar, date } from 'drizzle-orm/mysql-core';

export const kampen = mysqlTable('kampen', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  naam: varchar('naam', { length: 255 }).notNull(),
  stad: varchar('stad', { length: 255 }).notNull(),
  startDatum: date('startDatum').notNull(),
  eindDatum: date('eindDatum').notNull(),
});
