import { For, Show, createResource } from "solid-js"
import { Title } from "@solidjs/meta"
import { cache, useSearchParams } from "@solidjs/router"
import { FaSolidPen, FaSolidPlus, FaSolidQuestion } from "solid-icons/fa"
import { readExpressions } from "~/lib/expressions"

import Button from "~/components/Button"
import Pagination from "~/components/Pagination"
import SearchBar from "~/components/SearchBar"
import { defaultOrder, defaultPageSize, defaultSort } from "~/config"
import TableHeader from "~/components/TableHeader"
import { enforceAuth } from "~/lib/auth"

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
      <Title>My vocabulary list</Title>
      <h2 class="text-5xl">Vocabulary list</h2>

      <div class="my-8 flex gap-4 flex-wrap">
        <Button href="/expressions/new">
          <FaSolidPlus />
          <span>Add</span>
        </Button>
        <Button href="/quizz">
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
