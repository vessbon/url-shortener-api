import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import normalizeUrl from "@/utils/normalize-url";

export const users = sqliteTable("users", {
  id: integer().primaryKey({ autoIncrement: true }),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const urls = sqliteTable("urls", {
  id: integer().primaryKey({ autoIncrement: true }),
  url: text().notNull(),
  code: text().notNull().unique(),
});

export const urlSelectSchema = createSelectSchema(urls);
export const urlInsertSchema = createInsertSchema(urls, {
  url: (schema) =>
    schema
      .min(1)
      .max(256)
      .transform((input, ctx) => {
        const result = normalizeUrl(input);

        if (!result.success) {
          ctx.addIssue({
            code: "custom",
            message: "Invalid URL format",
          });
          return z.NEVER;
        }

        return result.data.href;
      })
      .pipe(z.httpUrl()),
})
  .required({
    url: true,
  })
  .omit({
    id: true,
    code: true,
  });
