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
  A,
} from "@solidjs/router"
import { readRandomExpressions, updateExpression } from "~/api/expressions"
import Button from "~/components/Button"
import { getUserCache } from "~/api"
import BackLink from "~/components/BackLink"
import { FaSolidEye, FaSolidEyeSlash } from "solid-icons/fa"

// TODO: define typing centrally
type Expression = {
  id: number
  score: number
  meaning: string
  writing: string
}

const getRandomExpressionsCache = cache(async () => {
  "use server"
  if (!process.env.VOCABULARY_DB_URL)
    return [
      {
        reading: "てすと",
        meaning: "Test",
        writing: "テスト",
        id: 1,
        score: 12,
      },
      {
        reading: "てすと",
        meaning: "Test",
        writing: "テスト",
        id: 1,
        score: 12,
      },
      {
        reading: "てすと",
        meaning: "Test",
        writing: "テスト",
        id: 1,
        score: 12,
      },
      {
        reading: "てすと",
        meaning: "Test",
        writing: "テスト",
        id: 1,
        score: 12,
      },
    ]

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

  async function handleButtonClicked(selectionIndex: number) {
    const selectionId = randomExpressions()?.at(selectionIndex)?.id
    setUserAnswerId(selectionId)

    if (!getCorrectAnswer()) return
    const { id, score } = getCorrectAnswer()

    let newScore = score ?? 0
    if (selectionId === id) newScore++
    else newScore--

    // Does this need to be an action? an used action? or just a function?
    // await updateExpression(id, { score: newScore })
    // await updateExpressionUsedAction(id, newScore)
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

  const getExpressionClass = (selectionIndex: number) => {
    const id = randomExpressions()?.at(selectionIndex)?.id

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
          <div class="text-5xl my-4 text-center">
            {getCorrectAnswer()?.writing}
          </div>

          <Show when={getReadingShown()}>
            <div class="text-center">{randomExpressions()?.at(0)?.reading}</div>
          </Show>

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
              {(expression, i) => (
                <Button
                  onclick={() => handleButtonClicked(i())}
                  loading={
                    submission.pending && getUserAnswerId() === expression.id
                  }
                  disabled={!!getUserAnswerId()}
                  class={getExpressionClass(i())}
                >
                  {expression.meaning}
                </Button>
              )}
            </For>
          </div>
        </Show>
        <Show when={getUserAnswerId()}>
          <div class="my-4">
            <Button onclick={getNextExpression}>Next expression</Button>
          </div>
        </Show>
      </MetaProvider>
    </>
  )
}
