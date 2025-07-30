import { defineConfig } from "drizzle-kit";
import { VOCABULARY_DB_URL } from "~/lib/db";

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: VOCABULARY_DB_URL,
  },
});
