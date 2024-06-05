import { Title } from "@solidjs/meta"
import { For, Show } from "solid-js"
import { createAsync, useParams } from "@solidjs/router"
import { readExpressionsCache } from "~/api"
import { deleteExpression, readExpression } from "~/api/expressions"

export default function Home() {
  const params = useParams()

  const expression = createAsync(
    async () => readExpression(Number(params.id)),
    {
      deferStream: true,
    }
  )

  return (
    <main>
      <Title>My vocabulary list</Title>
      <p>
        <a href="/expressions">Back to my expressions</a>
      </p>
      <Show when={expression()}>
        <div>Writing: {expression()?.writing}</div>
        <div>Reading: {expression()?.reading}</div>
        <div>Meaning: {expression()?.meaning}</div>

        <div>
          <button
            onclick={() => {
              deleteExpression(Number(params.id))
            }}
          >
            Delete Expression
          </button>
        </div>
      </Show>
    </main>
  )
}
