import { Title } from "@solidjs/meta"
import { For, Show } from "solid-js"
import { createAsync, cache } from "@solidjs/router"
import { readExpressions } from "~/api/expressions"
import Button from "~/components/Button"
import { getUserCache } from "~/api"
import { FaSolidPlus, FaSolidQuestion } from "solid-icons/fa"

const getExpressionsCache = cache(async () => {
  "use server"
  if (!process.env.VOCABULARY_DB_URL) return []
  return await readExpressions()
}, "getExpressions")

export default function Home() {
  createAsync(async () => getUserCache(true))

  const expressions = createAsync(async () => getExpressionsCache())

  return (
    <>
      <Title>My vocabulary list</Title>
      <h2 class="text-6xl">Vocabulary list</h2>
      <div class="my-8 flex gap-4">
        <Button href="/expressions/new">
          <FaSolidPlus />
          <span>New expression</span>
        </Button>
        <Button href="/expressions/random">
          <FaSolidQuestion />
          <span>Quizz</span>
        </Button>
      </div>
      <Show when={expressions()}>
        <table class="w-full text-center">
          <thead>
            <tr class="border-b border-secondary">
              <th>Writing</th>
              <th>Reading</th>
              <th>Meaning</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <For each={expressions()}>
              {({ meaning, writing, reading, id }) => (
                <tr>
                  <td>{writing}</td>
                  <td>{reading}</td>
                  <td>{meaning}</td>
                  <td class="p-2">
                    <Button href={`/expressions/${id}`}>Details</Button>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </Show>
    </>
  )
}
