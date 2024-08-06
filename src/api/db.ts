// Does not work if using "use server"
//"use server"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

export const { DB_URL = "postgres://localhost:5432/vocabulary" } = process.env

const queryClient = postgres(DB_URL)
export const db = drizzle(queryClient)
