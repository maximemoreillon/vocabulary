"use server";

import { db } from "./db";
import { expressions } from "~/lib/schema";
import { and, count, desc, eq, or, sql } from "drizzle-orm";
import { defaultOrder, defaultPageSize, defaultSort } from "~/config";
import { getUserId } from "./auth";

type ReadExpressionsOptions = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: "writing" | "meaning" | "reading" | "score";
  order?: "asc" | "desc";
};

export async function createExpression(
  properties: typeof expressions.$inferInsert
) {
  const userId = await getUserId();
  const values = { ...properties, userId };

  const [newExpression] = await db
    .insert(expressions)
    .values(values)
    .returning();
  return newExpression;
}

export async function readExpressions(options: ReadExpressionsOptions) {
  const {
    limit = defaultPageSize,
    page = 1,
    search = "",
    sort = defaultSort,
    order = defaultOrder,
  } = options;

  const userId = await getUserId();

  const orderBy =
    order === "desc" ? desc(expressions[sort]) : expressions[sort];

  const where = and(
    eq(expressions.userId, userId),
    or(
      sql`LOWER(meaning) LIKE ${search.toLowerCase() + "%"}`,
      sql`LOWER(writing) LIKE ${search.toLowerCase() + "%"}`
    )
  );

  const items = await db
    .select()
    .from(expressions)
    .orderBy(orderBy)
    .limit(limit)
    .offset((page - 1) * limit)
    .where(where);

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(expressions)
    .where(where);

  return { total, items, page, limit };
}

export async function readExpression(id: number) {
  const userId = await getUserId();
  const where = and(eq(expressions.userId, userId), eq(expressions.id, id));
  const [expression] = await db.select().from(expressions).where(where);
  return expression;
}

export async function updateExpression(
  id: number,
  properties: typeof expressions.$inferInsert
) {
  const userId = await getUserId();
  const where = and(eq(expressions.userId, userId), eq(expressions.id, id));

  const [updatedExpression] = await db
    .update(expressions)
    .set(properties)
    .where(where)
    .returning();
  return updatedExpression;
}

export async function deleteExpression(id: number) {
  const userId = await getUserId();
  const where = and(eq(expressions.userId, userId), eq(expressions.id, id));

  const [expression] = await db.delete(expressions).where(where).returning();
  return expression;
}

export async function readRandomExpressions(count: number = 6) {
  // TODO: find way to prioritize query of items with low score
  const userId = await getUserId();
  const where = eq(expressions.userId, userId);

  return await db
    .select()
    .from(expressions)
    .where(where)
    .orderBy(sql`RANDOM()`)
    .limit(count);
}
