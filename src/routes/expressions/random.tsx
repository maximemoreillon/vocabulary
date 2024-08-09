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
  createAsync(async () => getUserCache())
  const [getReadingShown, setReadingShown] = createSignal(false)
  const [getAnswer, setAnswer] = createSignal(null)
  const [randomExpressions, { refetch }] = createResource(
    async () => await getRandomExpressionsCache()
  )

  // TODO: use actions properly
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

  function getEach() {
    const expressions = randomExpressions()
    if (!expressions) return []

    return expressions
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  function getNextExpression() {
    setReadingShown(false)
    refresh()
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
            <Button onclick={getNextExpression}>Next expression</Button>
          </div>
        </Show>
      </MetaProvider>
    </>
  )
}
