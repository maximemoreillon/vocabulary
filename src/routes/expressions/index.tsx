import { For, Show, createResource } from "solid-js"
import { Title, MetaProvider } from "@solidjs/meta"
import { cache, createAsync, redirect, useSearchParams } from "@solidjs/router"
import { FaSolidPen, FaSolidPlus, FaSolidQuestion } from "solid-icons/fa"
import { readExpressions } from "~/api/expressions"

import Button from "~/components/Button"
import Pagination from "~/components/Pagination"
import SearchBar from "~/components/SearchBar"
import { defaultOrder, defaultPageSize, defaultSort } from "~/config"
import TableHeader from "~/components/TableHeader"
import { enforceAuth, enforceAuthCache } from "~/api/auth"

const getExpressionsCache = cache(async (options) => {
  "use server"
  await enforceAuth()
  return await readExpressions(options)
}, "getExpressions")

export default function ExpressionList() {
  const [searchParams] = useSearchParams()

  const getQueryOptions = () => {
    const {
      page = "1",
      pageSize = defaultPageSize,
      search,
      sort = defaultSort,
      order = defaultOrder,
    } = searchParams
    return {
      page: Number(page),
      pageSize: Number(pageSize),
      search,
      sort,
      order,
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

      <div class="my-8 flex gap-4 flex-wrap">
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
              <TableHeader text="Writing" field="writing" />
              <TableHeader text="Reading" field="reading" />
              <TableHeader text="Meaning" field="meaning" />
              <TableHeader text="Score" field="score" />

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
