import { MetaProvider, Title } from "@solidjs/meta"
import { For, Show } from "solid-js"
import {
  createAsync,
  useParams,
  cache,
  action,
  useAction,
  useSubmission,
  redirect,
} from "@solidjs/router"
import { readRandomExpressions } from "~/api/expressions"
import Button from "~/components/Button"

const getExpressions = cache(async () => {
  "use server"
  return readRandomExpressions()
}, "expression")

export default function Home() {
  const randomExpressions = createAsync(async () => getExpressions())

  return (
    <>
      <MetaProvider>
        <Title>Random expression</Title>
        <p>
          <a href="/expressions">Back to my expressions</a>
        </p>
        <Show when={randomExpressions()}>
          <div class="text-5xl my-4 text-center">
            {randomExpressions()[0].writing}
          </div>

          <div class="flex flex-col gap-4">
            <For
              each={randomExpressions()
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)}
            >
              {(expression) => <Button>{expression.meaning}</Button>}
            </For>
          </div>
        </Show>
      </MetaProvider>
    </>
  )
}
