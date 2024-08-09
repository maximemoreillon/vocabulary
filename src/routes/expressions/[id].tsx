import { Title } from "@solidjs/meta"
import { Show } from "solid-js"
import {
  createAsync,
  useParams,
  cache,
  action,
  useAction,
  useSubmission,
  redirect,
} from "@solidjs/router"
import { deleteExpression, readExpression } from "~/api/expressions"
import Button from "~/components/Button"
import { getUserCache } from "~/api"
import BackLink from "~/components/BackLink"

const getExpression = cache(async (id: number) => {
  "use server"
  return readExpression(id)
}, "getExpression")

const deleteExpressionAction = action(async (id: number) => {
  "use server"
  await deleteExpression(id)
  return redirect("expressions")
}, "deleteExpression")

export default function Expression() {
  createAsync(async () => getUserCache(true))
  const params = useParams()
  const expression = createAsync(async () => getExpression(Number(params.id)))

  const usedDeleteExpressionAction = useAction(deleteExpressionAction)
  const deleting = useSubmission(deleteExpressionAction)

  return (
    <>
      <Title>{expression()?.writing}</Title>
      <BackLink />
      <h1 class="text-6xl my-4">{expression()?.writing}</h1>
      <Show when={expression()}>
        <div>Writing: {expression()?.writing}</div>
        <div>Reading: {expression()?.reading}</div>
        <div>Meaning: {expression()?.meaning}</div>

        <div class="my-4">
          <Button
            onclick={() => {
              usedDeleteExpressionAction(Number(params.id))
            }}
          >
            Delete Expression
          </Button>
        </div>
      </Show>

      <p>{deleting.result}</p>
    </>
  )
}
