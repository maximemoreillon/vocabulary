import { sql } from "drizzle-orm"
import { integer, text, pgTable, serial, index } from "drizzle-orm/pg-core"

export const expressions = pgTable("expressions", {
  id: serial("id").primaryKey(),
  writing: text("writing"),
  reading: text("reading"),
  meaning: text("meaning"),
  score: integer("score").default(0),
})
