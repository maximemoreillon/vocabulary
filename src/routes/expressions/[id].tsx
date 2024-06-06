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

const getExpression = cache(async (id: number) => {
  "use server"
  return readExpression(id)
}, "expression")

const deleteExpressionAction = action(async (id: number) => {
  "use server"
  await deleteExpression(id)
  return redirect("expressions")
})

export default function Home() {
  const params = useParams()
  const expression = createAsync(async () => getExpression(Number(params.id)))

  const useDeleteExpression = useAction(deleteExpressionAction)
  const deleting = useSubmission(deleteExpressionAction)

  return (
    <main>
      <Title>My vocabulary list</Title>
      <p>
        <a href="/expressions">Back to my expressions</a>
      </p>
      <Show when={expression()}>
        <div>Writing: {expression()?.writing}</div>
        <div>Reading: {expression()?.reading}</div>
        <div>Meaning: {expression()?.meaning}</div>

        <div>
          <button
            onclick={() => {
              useDeleteExpression(Number(params.id))
            }}
          >
            Delete Expression
          </button>
        </div>
      </Show>

      <p>{deleting.result}</p>
    </main>
  )
}
