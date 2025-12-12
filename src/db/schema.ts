import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const urls = sqliteTable("urls", {
  id: integer().primaryKey({ autoIncrement: true }),
  code: text().notNull().unique(),
  url: text().notNull().unique(),
});

export const urlSelectSchema = createSelectSchema(urls);
export const urlInsertSchema = createInsertSchema(urls);
