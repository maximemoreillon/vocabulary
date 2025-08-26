"use server";

import { db } from "./db";
import { expressionsTable } from "~/lib/db/schema";
import { and, count, desc, eq, not, or, sql } from "drizzle-orm";
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
  properties: typeof expressionsTable.$inferInsert
) {
  const userId = await getUserId();
  const values = { ...properties, userId };

  const [newExpression] = await db
    .insert(expressionsTable)
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
    order === "desc" ? desc(expressionsTable[sort]) : expressionsTable[sort];

  const where = and(
    eq(expressionsTable.userId, userId),
    or(
      sql`LOWER(meaning) LIKE ${search.toLowerCase() + "%"}`,
      sql`LOWER(writing) LIKE ${search.toLowerCase() + "%"}`
    )
  );

  const items = await db
    .select()
    .from(expressionsTable)
    .orderBy(orderBy)
    .limit(limit)
    .offset((page - 1) * limit)
    .where(where);

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(expressionsTable)
    .where(where);

  return { total, items, page, limit };
}

export async function readExpression(id: number) {
  const userId = await getUserId();
  const where = and(
    eq(expressionsTable.userId, userId),
    eq(expressionsTable.id, id)
  );
  const [expression] = await db.select().from(expressionsTable).where(where);
  return expression;
}

export async function updateExpression(
  id: number,
  properties: typeof expressionsTable.$inferInsert
) {
  const userId = await getUserId();
  const where = and(
    eq(expressionsTable.userId, userId),
    eq(expressionsTable.id, id)
  );

  const [updatedExpression] = await db
    .update(expressionsTable)
    .set(properties)
    .where(where)
    .returning();
  return updatedExpression;
}

export async function deleteExpression(id: number) {
  const userId = await getUserId();
  const where = and(
    eq(expressionsTable.userId, userId),
    eq(expressionsTable.id, id)
  );

  const [expression] = await db
    .delete(expressionsTable)
    .where(where)
    .returning();
  return expression;
}

export async function readExpressionsForQuizz(count: number = 6) {
  const userId = await getUserId();
  const where = eq(expressionsTable.userId, userId);

  const [expression] = await db
    .select()
    .from(expressionsTable)
    .where(where)
    .orderBy(sql`RANDOM() * EXP(score)`) // prioritizes those that are not well known
    .limit(1);

  const candidates = await db
    .select()
    .from(expressionsTable)
    .where(and(where, not(eq(expressionsTable.id, expression.id))))
    .orderBy(sql`RANDOM()`) // Pure random
    .limit(count - 1);

  // Correct answer is Array's first item
  return [expression, ...candidates];
}
