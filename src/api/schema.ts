// import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core"

export const expressions = sqliteTable("expressions", {
  id: integer("id").primaryKey().unique().notNull(),
  writing: text("writing"),
  reading: text("reading"),
  meaning: text("meaning"),
  score: integer("score").default(0),
})
