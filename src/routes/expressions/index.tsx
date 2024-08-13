import { For, Show, createResource } from "solid-js"
import { Title, MetaProvider } from "@solidjs/meta"
import { createAsync, cache, useSearchParams, A } from "@solidjs/router"
import {
  FaSolidArrowLeft,
  FaSolidArrowRight,
  FaSolidPen,
  FaSolidPlus,
  FaSolidQuestion,
} from "solid-icons/fa"
import { readExpressions } from "~/api/expressions"
import { getUserCache } from "~/api/auth"
import Button from "~/components/Button"

const getExpressionsCache = cache(async (options) => {
  "use server"
  return await readExpressions(options)
}, "getExpressions")

export default function ExpressionList() {
  const pageSize = 50

  createAsync(async () => getUserCache(true))

  const [searchParams] = useSearchParams()

  const getPaginationOptions = () => {
    const { offset = "0", limit = pageSize } = searchParams
    return {
      limit: Number(limit),
      offset: Number(offset),
    }
  }

  // Calling refetch when source (getPaginationOptions) changes
  const [queryResult] = createResource(getPaginationOptions, async () => {
    const options = getPaginationOptions()
    return getExpressionsCache(options)
  })

  const pageLinkHref = (direction: number) => {
    const { offset, limit } = getPaginationOptions()

    const currentPageItemCount = queryResult()?.items.length

    if (direction < 0 && offset <= 0) return ""
    if (!currentPageItemCount) return ""
    if (direction > 0 && currentPageItemCount < limit) return ""

    const newOffset = offset + limit * direction

    return `/expressions?offset=${newOffset}`
  }

  const getItemCount = () => queryResult()?.total || 0
  const getPageCount = () =>
    Math.ceil(getItemCount() / getPaginationOptions().limit)

  const getCurrentPageNumber = () =>
    Math.floor(
      (getPageCount() * getPaginationOptions().offset) / getItemCount()
    ) + 1

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

        <div class="my-6 flex justify-center gap-8 items-center">
          <Button href={pageLinkHref(-1)}>
            <FaSolidArrowLeft />
          </Button>
          <div>
            {getCurrentPageNumber()}/{getPageCount()}
          </div>
          <Button href={pageLinkHref(1)}>
            <FaSolidArrowRight />
          </Button>
        </div>
      </Show>
    </>
  )
}
