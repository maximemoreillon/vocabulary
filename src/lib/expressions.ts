"use server"

import { db } from "./db"
import { expressions } from "~/lib/schema"
import { count, desc, eq, or, sql } from "drizzle-orm"
import { defaultOrder, defaultPageSize, defaultSort } from "~/config"

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

type ExpressionEdit = {
  score?: number
  writing?: string
  reading?: string
  meaning?: string
}

type ReadExpressionsOptions = {
  page?: number
  limit?: number
  search?: string
  sort?: "writing" | "meaning" | "reading" | "score"
  order?: "asc" | "desc"
}

export async function createExpression(values: NewExpression) {
  const [newExpression] = await db
    .insert(expressions)
    .values(values)
    .returning()
  return newExpression
}

export async function readExpressions(options: ReadExpressionsOptions) {
  const {
    limit = defaultPageSize,
    page = 1,
    search = "",
    sort = defaultSort,
    order = defaultOrder,
  } = options

  const orderBy = order === "desc" ? desc(expressions[sort]) : expressions[sort]

  const wehere = or(
    sql`LOWER(meaning) LIKE ${search.toLowerCase() + "%"}`,
    sql`LOWER(writing) LIKE ${search.toLowerCase() + "%"}`
  )

  const items = await db
    .select()
    .from(expressions)
    .orderBy(orderBy)
    .limit(limit)
    .offset((page - 1) * limit)
    .where(wehere)

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(expressions)
    .where(wehere)

  return { total, items, page, limit }
}

export async function readExpression(id: number) {
  const [expression] = await db
    .select()
    .from(expressions)
    .where(eq(expressions.id, id))
  return expression
}

export async function updateExpression(id: number, properties: ExpressionEdit) {
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

export async function readRandomExpressions(count: number = 6) {
  return await db
    .select()
    .from(expressions)
    .orderBy(sql`RANDOM()`)
    .limit(count)
}
