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
  const [getUserAnswer, setUserAnswer] = createSignal<
    Expression | null | undefined
  >(null)
  const getCorrectAnswer = () => randomExpressions()?.at(0) as Expression

  const getExpressionClass = (id: number) => {
    if (getUserAnswer() && getCorrectAnswer()?.id === id) return "bg-success"
    else if (getUserAnswer()?.id === id && getCorrectAnswer()?.id !== id)
      return "bg-error"
    else return ""
  }

  const [randomExpressions, { refetch }] = createResource(
    async () => await getRandomExpressionsCache()
  )

  const updateExpressionUsedAction = useAction(updateExpressionAction)
  const submission = useSubmission(updateExpressionAction)

  async function handleButtonClicked(selectedExpression: Expression) {
    setUserAnswer(selectedExpression)

    if (!getCorrectAnswer()) return
    const { id, score } = getCorrectAnswer()

    let newScore = score ?? 0
    if (selectedExpression.id === id) newScore++
    else newScore--

    // Does this need to be an action? an used action? or just a function?
    await updateExpression(id, { score: newScore })
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
    setUserAnswer(null)
    refetch()
  }

  return (
    <>
      <MetaProvider>
        <Title>Random expression</Title>
        <BackLink />

        <Show when={randomExpressions()}>
          <div class="text-5xl my-4 text-center">
            {randomExpressions()?.at(0)?.writing}
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
              {(expression) => (
                <Button
                  onclick={() => handleButtonClicked(expression)}
                  loading={
                    submission.pending && getUserAnswer()?.id === expression.id
                  }
                  disabled={!!getUserAnswer()}
                  class={getExpressionClass(expression.id)}
                >
                  {expression.meaning}
                </Button>
              )}
            </For>
          </div>
        </Show>
        <Show when={getUserAnswer()}>
          <div class="my-4">
            <Button onclick={getNextExpression}>Next expression</Button>
          </div>
        </Show>
      </MetaProvider>
    </>
  )
}
