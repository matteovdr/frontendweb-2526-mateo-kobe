import {
  mysqlTable,
  int,
  varchar,
  text,
  date,
  primaryKey,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const persoon = mysqlTable("persoon", {
  id: int("id", { unsigned: true }).primaryKey().autoincrement(),
  voornaam: varchar("voornaam", { length: 255 }).notNull(),
  achternaam: varchar("achternaam", { length: 255 }).notNull(),
  telefoon: varchar("telefoon", { length: 50 }),
  email: varchar("email", { length: 255 }).notNull(),
});

export const persoonRelations = relations(persoon, ({ many }) => ({
  leden: many(lid),
  leiding: many(leiding),
}));
/* --------------------------------- */
export const lid = mysqlTable("lid", {
  persoonId: int("persoonId", { unsigned: true })
    .primaryKey()
    .references(() => persoon.id, { onDelete: "cascade" }),
});

export const lidRelations = relations(lid, ({ one, many }) => ({
  persoon: one(persoon, {
    fields: [lid.persoonID],
    references: [persoon.id],
  }),

  kampen: many(lidKamp),
}));
/* --------------------------------- */

export const leiding = mysqlTable("leiding", {
  id: int("id", { unsigned: true }).primaryKey().autoincrement(),
  persoonID: int("persoonID", { unsigned: true })
    .notNull()
    .references(() => persoon.id, { onDelete: "cascade" }),
  ageGroup: varchar("ageGroup", { length: 255 }).notNull(),
  imageUrl: varchar("imageUrl", { length: 255 }).notNull(),
  beschrijving: text("beschrijving").notNull(),
});


export const leidingRelations = relations(leiding, ({ one, many }) => ({
  persoon: one(persoon, {
    fields: [leiding.persoonID],
    references: [persoon.id],
  }),

  kampen: many(leidingKamp),
}));
/* --------------------------------- */

export const kampen = mysqlTable("kampen", {
  id: int("id", { unsigned: true }).primaryKey().autoincrement(),
  naam: varchar("naam", { length: 255 }).notNull(),
  stad: varchar("stad", { length: 255 }).notNull(),
  beschrijving: text("beschrijving").notNull(),
  startDatum: date("startDatum").notNull(),
  eindDatum: date("eindDatum").notNull(),
});

export const kampenRelations = relations(kampen, ({ many }) => ({
  leden: many(lidKamp),
  leiding: many(leidingKamp),
}));

export const lidKamp = mysqlTable(
  "lid_kamp",
  {
    lidId: int("lidId", { unsigned: true })
      .notNull()
      .references(() => lid.id, { onDelete: "cascade" }),

    kampId: int("kampId", { unsigned: true })
      .notNull()
      .references(() => kampen.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.lidId, table.kampId] }),
  ]
);

export const lidKampRelations = relations(lidKamp, ({ one }) => ({
  lid: one(lid, {
    fields: [lidKamp.lidId],
    references: [lid.id],
  }),
  kamp: one(kampen, {
    fields: [lidKamp.kampId],
    references: [kampen.id],
  }),
}));

export const leidingKamp = mysqlTable(
  "leiding_kamp",
  {
    leidingId: int("leidingId", { unsigned: true })
      .notNull()
      .references(() => leiding.id, { onDelete: "cascade" }),

    kampId: int("kampId", { unsigned: true })
      .notNull()
      .references(() => kampen.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.leidingId, table.kampId] }),
  ]
);

export const leidingKampRelations = relations(
  leidingKamp,
  ({ one }) => ({
    leiding: one(leiding, {
      fields: [leidingKamp.leidingId],
      references: [leiding.id],
    }),
    kamp: one(kampen, {
      fields: [leidingKamp.kampId],
      references: [kampen.id],
    }),
  })
);
