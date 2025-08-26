import { integer, text, pgTable, serial, timestamp } from "drizzle-orm/pg-core";

export const expressionsTable = pgTable(
  "expressions",
  {
    id: serial("id").primaryKey(),
    writing: text("writing"), //  NOTE: Removed unique
    reading: text("reading"),
    meaning: text("meaning"),
    score: integer("score").default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    userId: text("userId"),
  }
  // TODO: add unique on user_id + writing
);
