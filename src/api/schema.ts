import { integer, text, pgTable, serial } from "drizzle-orm/pg-core"

export const expressions = pgTable("expressions", {
  id: serial("id").primaryKey(),
  writing: text("writing").unique(),
  reading: text("reading"),
  meaning: text("meaning"),
  score: integer("score").default(0),
})
