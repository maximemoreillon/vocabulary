import { Title, MetaProvider } from "@solidjs/meta"
import { For, Show } from "solid-js"
import { createAsync, cache, useSearchParams } from "@solidjs/router"
import { readExpressions } from "~/api/expressions"
import { getUserCache } from "~/api/auth"
import { FaSolidPen, FaSolidPlus, FaSolidQuestion } from "solid-icons/fa"
import Button from "~/components/Button"
import { createResource } from "solid-js"

const getExpressionsCache = cache(async (options) => {
  "use server"
  return await readExpressions(options)
}, "getExpressions")

export default function ExpressionList() {
  createAsync(async () => getUserCache(true))

  const [searchParams, setSearchParams] = useSearchParams()

  const [queryResult, { refetch }] = createResource(async () => {
    const { offset = "0", limit = "50" } = searchParams
    return getExpressionsCache({ limit: Number(limit), offset: Number(offset) })
  })

  function changePage(pageOffset: number) {
    const { offset = "0", limit = "50" } = searchParams

    if (pageOffset < 0 && Number(offset) <= 0) return
    if (!queryResult()?.items.length) return

    // TODO: find way to not ignore
    // @ts-ignore
    if (pageOffset > 0 && queryResult()?.items.length < Number(limit)) return

    const newOffset = Number(offset) + Number(limit) * pageOffset

    setSearchParams({
      ...searchParams,
      offset: newOffset,
    })

    // TODO: DIRTY, improve
    setTimeout(() => refetch(), 10)
  }

  return (
    <>
      <MetaProvider>
        <Title>My vocabulary list</Title>
      </MetaProvider>
      <h2 class="text-6xl">Vocabulary list</h2>
      <div class="my-8 flex gap-4">
        <Button href="/expressions/new">
          <FaSolidPlus />
          <span>Add</span>
        </Button>
        <Button href="/expressions/random">
          <FaSolidQuestion />
          <span>Quizz</span>
        </Button>
      </div>
      <Show when={queryResult()}>
        <table class="w-full text-center">
          <thead>
            <tr class="border-b border-secondary">
              <th>Writing</th>
              <th>Reading</th>
              <th>Meaning</th>
              <th>Score</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <For each={queryResult()?.items}>
              {({ meaning, writing, reading, score, id }) => (
                <tr>
                  <td>{writing}</td>
                  <td>{reading}</td>
                  <td>{meaning}</td>
                  <td>{score}</td>

                  <td class="p-2">
                    <Button href={`/expressions/${id}`}>
                      <FaSolidPen />
                    </Button>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>

        <div class="my-6 flex justify-center gap-4">
          <Button onclick={() => changePage(-1)}>Previous page</Button>
          <Button onclick={() => changePage(1)}>Next page</Button>
        </div>
      </Show>
    </>
  )
}
