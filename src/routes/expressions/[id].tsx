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

const getExpression = cache(async (id: number) => {
  "use server"
  return readExpression(id)
}, "getExpression")

const deleteExpressionAction = action(async (id: number) => {
  "use server"
  await deleteExpression(id)
  return redirect("expressions")
}, "deleteExpression")

export default function Home() {
  const params = useParams()
  const user = createAsync(async () => getUserCache())
  const expression = createAsync(async () => getExpression(Number(params.id)))

  const useDeleteExpression = useAction(deleteExpressionAction)
  const deleting = useSubmission(deleteExpressionAction)

  return (
    <>
      <Title>{expression()?.writing}</Title>
      <h1 class="text-3xl my-4">{expression()?.writing}</h1>
      <div class="my-4">
        <Button href="/expressions">Back to my expressions</Button>
      </div>
      <Show when={expression()}>
        <div>Writing: {expression()?.writing}</div>
        <div>Reading: {expression()?.reading}</div>
        <div>Meaning: {expression()?.meaning}</div>

        <div class="my-4">
          <Button
            onclick={() => {
              useDeleteExpression(Number(params.id))
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
