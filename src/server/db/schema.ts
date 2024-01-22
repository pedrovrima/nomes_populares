import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  numeric,
  integer,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";

export const species = pgTable("species", {
  id: serial("id").primaryKey(),
  scientificName: text("scientific_name"),
  brName: text("brName"),
  enName: text("enName"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const popular = pgTable("popular", {
  id: serial("id").primaryKey(),
  name: text("name"),
  region: text("region"),
  sourceName: text("source_name"),
  collector: text("collector"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  speciesId: integer("species_id").references(() => species.id),
});

export type Popular = InferInsertModel<typeof popular>;
