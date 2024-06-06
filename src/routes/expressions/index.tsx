import { Title } from "@solidjs/meta"
import { For, Show } from "solid-js"
import { createAsync, cache } from "@solidjs/router"
import { readExpressions } from "~/api/expressions"

const getExpressions = cache(async () => {
  "use server"
  return readExpressions()
}, "expressions")

export default function Home() {
  const expressions = createAsync(() => getExpressions(), {
    deferStream: true,
  })

  return (
    <>
      <Title>My vocabulary list</Title>
      <p>
        <a href="/expressions/new">New expression</a>
      </p>
      <Show when={expressions()}>
        <table>
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
                  <td>
                    <a href={`/expressions/${id}`}>Details</a>
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
