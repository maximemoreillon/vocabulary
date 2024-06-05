"use server"

import { redirect } from "@solidjs/router"
import { db } from "./db"
import { expressions } from "~/api/schema"
import { eq } from "drizzle-orm"
export type NewExpression = {
  writing: string
  reading: string
  meaning: string
}

export async function createExpression(values: NewExpression) {
  const [newExpression] = await db
    .insert(expressions)
    .values(values)
    .returning()
  return newExpression
}

export async function readExpressions() {
  const items = await db.select().from(expressions)
  return items
}

export async function readExpression(id: number) {
  const [expression] = await db
    .select()
    .from(expressions)
    .where(eq(expressions.id, id))
  return expression
}

export async function deleteExpression(id: number) {
  const [expression] = await db
    .delete(expressions)
    .where(eq(expressions.id, id))
    .returning()
  return expression
}
