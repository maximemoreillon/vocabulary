import {
  integer,
  text,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core"

export const expressions = pgTable("expressions", {
  id: serial("id").primaryKey(),
  writing: text("writing"),
  reading: text("reading"),
  meaning: text("meaning"),
  score: integer("score").default(0),
})
