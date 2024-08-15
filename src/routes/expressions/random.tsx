import { MetaProvider, Title } from "@solidjs/meta"
import { For, Show, createResource, createSignal } from "solid-js"
import {
  createAsync,
  cache,
  action,
  useAction,
  useSubmission,
} from "@solidjs/router"
import {
  readRandomExpressions,
  updateExpression,
  Expression,
} from "~/api/expressions"
import Button from "~/components/Button"
import { getUserCache } from "~/api/auth"
import BackLink from "~/components/BackLink"
import { FaSolidEye, FaSolidEyeSlash } from "solid-icons/fa"

const getRandomExpressionsCache = cache(async () => {
  "use server"
  return await readRandomExpressions()
}, "expression")

const updateExpressionAction = action(async (id: number, newScore: number) => {
  "use server"
  await updateExpression(id, { score: newScore })
}, "updateExpression")

export default function Quizz() {
  createAsync(async () => getUserCache(true))
  const [getReadingShown, setReadingShown] = createSignal(false)
  const [getUserAnswerId, setUserAnswerId] = createSignal<
    number | null | undefined
  >(null)

  const [randomExpressions, { refetch }] = createResource(
    async () => await getRandomExpressionsCache()
  )

  const getCorrectAnswer = () => randomExpressions()?.at(0) as Expression

  const updateExpressionUsedAction = useAction(updateExpressionAction)
  const submission = useSubmission(updateExpressionAction)

  async function handleButtonClicked(selectionId: number) {
    setUserAnswerId(selectionId)

    const { id, score } = getCorrectAnswer()

    let newScore = score ?? 0
    if (selectionId === id) newScore++
    else newScore--

    // Does this need to be an action? an used action? or just a function?
    // Using a submission allows to check for pending state
    // updateExpression(id, { score: newScore })
    await updateExpressionUsedAction(id, newScore)
  }

  function getEach() {
    const expressions = randomExpressions()
    if (!expressions) return []

    return expressions
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value) as Expression[]
  }

  function getNextExpression() {
    setReadingShown(false)
    setUserAnswerId(null)
    refetch()
  }

  const getExpressionClass = (id: number) => {
    if (getUserAnswerId() && getCorrectAnswer()?.id === id) return "bg-success"
    else if (getUserAnswerId() === id && getCorrectAnswer()?.id !== id)
      return "bg-problem"
    else return ""
  }

  return (
    <>
      <MetaProvider>
        <Title>Random expression</Title>
        <BackLink />

        <Show when={getCorrectAnswer()}>
          <div class="my-8 text-center">
            <div class="text-5xl">{getCorrectAnswer()?.writing}</div>

            <Show when={getReadingShown()}>
              <div class="text-center">{getCorrectAnswer()?.reading}</div>
            </Show>
          </div>

          <div class="flex justify-between items-center">
            <Button onclick={() => setReadingShown(!getReadingShown())}>
              <Show when={getReadingShown()}>
                <FaSolidEyeSlash />
                <span>Hide reading</span>
              </Show>
              <Show when={!getReadingShown()}>
                <FaSolidEye />
                <span>Show reading</span>
              </Show>
            </Button>
            <div>Score: {randomExpressions()?.at(0)?.score} </div>
          </div>

          <div class="flex flex-col gap-4 my-4">
            <For each={getEach()}>
              {(expression) => (
                <Button
                  onclick={() => handleButtonClicked(expression.id)}
                  disabled={!!getUserAnswerId()}
                  class={getExpressionClass(expression.id)}
                >
                  {expression.meaning}
                </Button>
              )}
            </For>
          </div>
        </Show>
        <Show when={getUserAnswerId()}>
          <div class="my-4">
            <Button onclick={getNextExpression} loading={submission.pending}>
              Next expression
            </Button>
          </div>
        </Show>
      </MetaProvider>
    </>
  )
}
