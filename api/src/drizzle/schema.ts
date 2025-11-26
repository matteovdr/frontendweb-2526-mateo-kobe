// src/drizzle/schema.ts
import { mysqlTable, int, varchar, date, text, boolean } from 'drizzle-orm/mysql-core';

export const kampen = mysqlTable('kampen', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  naam: varchar('naam', { length: 255 }).notNull(),
  stad: varchar('stad', { length: 255 }).notNull(),
  startDatum: date('startDatum').notNull(),
  eindDatum: date('eindDatum').notNull(),
});

export const leiding = mysqlTable('leiding', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  ageGroup: varchar('ageGroup', { length: 255 }).notNull(),
  imageUrl: varchar('imageUrl', { length: 255 }).notNull(),
  description: text('description'),
  isHoofdleiding: boolean('isHoofdleiding').notNull().default(false),

});