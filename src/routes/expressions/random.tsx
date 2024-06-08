import { MetaProvider, Title } from "@solidjs/meta"
import { For, Show, createResource, createSignal } from "solid-js"
import {
  createAsync,
  useParams,
  cache,
  action,
  useAction,
  useSubmission,
  redirect,
  Navigate,
  useNavigate,
} from "@solidjs/router"
import { readRandomExpressions, updateExpression } from "~/api/expressions"
import Button from "~/components/Button"

const getExpressions = cache(async () => {
  "use server"
  return readRandomExpressions()
}, "expression")

const updateExpressionAction = action(async (id: number, newScore: number) => {
  "use server"
  await updateExpression(id, { score: newScore })
}, "updateExpression")

export default function Home() {
  const [getAnswer, setAnswer] = createSignal(null)
  const [randomExpressions, { refetch }] = createResource(
    async () => await readRandomExpressions()
  )

  async function handleButtonClicked(selectedExpression: any) {
    const expression = randomExpressions()?.at(0)
    if (!expression) return
    const { id, score } = expression
    let newScore = score ?? 0
    if (selectedExpression.id === id) newScore++
    else newScore--

    setAnswer(selectedExpression)

    // Does this need to be an action?
    await updateExpression(id, { score: newScore })
  }

  function refresh() {
    setAnswer(null)
    refetch()
  }

  return (
    <>
      <MetaProvider>
        <Title>Random expression</Title>

        <Show when={randomExpressions()}>
          <div class="text-5xl my-4 text-center">
            {randomExpressions()?.at(0)?.writing}
          </div>

          <div>Score: {randomExpressions()?.at(0)?.score} </div>

          <div class="flex flex-col gap-4">
            <For
              each={randomExpressions()
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)}
            >
              {(expression) => (
                <Button onclick={() => handleButtonClicked(expression)}>
                  {expression.meaning}
                </Button>
              )}
            </For>
          </div>
        </Show>
        <Show when={getAnswer()}>
          <div>Answer was: {randomExpressions()?.at(0)?.meaning}</div>
          <div class="my-4">
            <Button onclick={refresh}>Next expression</Button>
          </div>
        </Show>
      </MetaProvider>
    </>
  )
}
