"use server"

import { db } from "./db"
import { expressions } from "~/api/schema"
import { count, eq, sql } from "drizzle-orm"

// TODO: infer from DB
export type Expression = {
  id: number
  writing: string | null
  reading: string | null
  meaning: string | null
  score: number | null
}

// TODO: find smarter way to go about this
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

// TODO: typing
type ReadExpressionsOptions = {
  limit?: number
  offset?: number
  search?: string
}

export async function readExpressions(options: ReadExpressionsOptions) {
  const { limit = 10, offset = 0, search = "" } = options

  const items = await db
    .select()
    .from(expressions)
    .limit(limit)
    .offset(offset)
    .where(sql`meaning LIKE ${search + "%"}`)

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(expressions)

  return { total, items, offset, limit }
}

export async function readExpression(id: number) {
  const [expression] = await db
    .select()
    .from(expressions)
    .where(eq(expressions.id, id))
  return expression
}

export async function updateExpression(id: number, properties: any) {
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
