"use server"

import { db } from "./db"
import { expressions } from "~/api/schema"
import { eq, sql } from "drizzle-orm"

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
  // TODO: pagination
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

export async function updateExpression(id: number, properties: any) {
  console.log("UPDATE")
  const [expression] = await db
    .update(expressions)
    .set(properties)
    .where(eq(expressions.id, id))
    .returning()
  return expression
}

export async function deleteExpression(id: number) {
  const [expression] = await db
    .delete(expressions)
    .where(eq(expressions.id, id))
    .returning()
  return expression
}

export async function readRandomExpressions(count: number = 4) {
  return await db
    .select()
    .from(expressions)
    .orderBy(sql`RANDOM()`)
    .limit(count)
}
