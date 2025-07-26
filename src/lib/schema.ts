import { integer, text, pgTable, serial, timestamp } from "drizzle-orm/pg-core";

// TODO: user_id
export const expressions = pgTable("expressions", {
  id: serial("id").primaryKey(),
  writing: text("writing").unique(),
  reading: text("reading"),
  meaning: text("meaning"),
  score: integer("score").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
