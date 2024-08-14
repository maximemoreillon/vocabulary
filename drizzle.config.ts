import { defineConfig } from "drizzle-kit"
import { VOCABULARY_DB_URL } from "~/api/db"

export default defineConfig({
  schema: "./src/api/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: VOCABULARY_DB_URL,
  },
})
