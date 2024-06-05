import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/api/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "./drizzle/sqlite.db",
  },
})
