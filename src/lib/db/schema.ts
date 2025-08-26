import {
  integer,
  text,
  pgTable,
  serial,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const expressionsTable = pgTable(
  "expressions",
  {
    id: serial("id").primaryKey(),
    writing: text("writing"), //  NOTE: Removed unique
    reading: text("reading"),
    meaning: text("meaning"),
    score: integer("score").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    userId: text("userId"),
  },
  (t) => [unique().on(t.writing, t.userId)]
);
