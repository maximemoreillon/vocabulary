import { MetaProvider, Title } from "@solidjs/meta"
import { For, Show } from "solid-js"
import { createAsync, cache, RouteDefinition } from "@solidjs/router"
import { readExpressions } from "~/api/expressions"
import Button from "~/components/Button"
import { getUserCache } from "~/api"

const getExpressionsCache = cache(async () => {
  "use server"
  return await readExpressions()
}, "getExpressions")

export default function Home() {
  const user = createAsync(async () => getUserCache())
  const expressions = createAsync(async () => getExpressionsCache())

  return (
    <MetaProvider>
      <Title>My vocabulary list</Title>
      <h2 class="text-3xl my-4">My vocabulary list</h2>
      <div class="my-4">
        <Button href="/expressions/new">New expression</Button>
      </div>
      <Show when={expressions()}>
        <table class="w-full text-center">
          <thead>
            <tr>
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
    </MetaProvider>
  )
}
