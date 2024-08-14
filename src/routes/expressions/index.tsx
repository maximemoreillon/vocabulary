import { For, Show, createResource } from "solid-js"
import { Title, MetaProvider } from "@solidjs/meta"
import { createAsync, cache, useSearchParams, A } from "@solidjs/router"
import { FaSolidPen, FaSolidPlus, FaSolidQuestion } from "solid-icons/fa"
import { readExpressions } from "~/api/expressions"
import { getUserCache } from "~/api/auth"
import Button from "~/components/Button"
import Pagination from "~/components/Pagination"
import SearchBar from "~/components/SearchBar"
import { defaultPageSize } from "~/config"

const getExpressionsCache = cache(async (options) => {
  "use server"
  return await readExpressions(options)
}, "getExpressions")

export default function ExpressionList() {
  createAsync(async () => getUserCache(true))

  // TODO: deduplicate
  const getQueryOptions = () => {
    const [searchParams] = useSearchParams()
    const { page = "1", pageSize = defaultPageSize, search } = searchParams
    return {
      page: Number(page),
      pageSize: Number(pageSize),
      search,
    }
  }

  // Calling refetch when source (getPaginationOptions) changes
  const [queryResult] = createResource(getQueryOptions, async () => {
    const options = getQueryOptions()
    return getExpressionsCache(options)
  })

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

        <div class="grow" />

        <SearchBar />
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

        <Pagination total={queryResult()?.total} />
      </Show>
    </>
  )
}
