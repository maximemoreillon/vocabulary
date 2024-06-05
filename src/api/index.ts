import { action, cache } from "@solidjs/router"
import {
  createExpression,
  deleteExpression,
  readExpressions,
} from "./expressions"

export const createExpressionAction = action(async (formData: FormData) => {
  const reading = String(formData.get("reading"))
  const writing = String(formData.get("writing"))
  const meaning = String(formData.get("meaning"))
  await createExpression({ reading, meaning, writing })
}, "createExpression")

export const deleteExpressionAction = action(async (id: number) => {
  await deleteExpression(id)
}, "deleteExpression")

export const readExpressionsCache = cache(readExpressions, "readExpressions")
