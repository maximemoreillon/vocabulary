import { Title } from "@solidjs/meta"
import { Show } from "solid-js"
import { useSubmission } from "@solidjs/router"
import { createExpressionAction } from "~/api"

export default function NewExpression() {
  const submission = useSubmission(createExpressionAction)

  return (
    <>
      <Title>New expression</Title>

      <form action={createExpressionAction} method="post">
        <div>
          <label>Writing</label>
          <input name="writing"></input>
        </div>
        <div>
          <label>Reading</label>
          <input name="reading"></input>
        </div>
        <div>
          <label>Meaning</label>
          <input name="meaning"></input>
        </div>
        <button type="submit">Submit</button>

        <Show when={submission.result}>
          {/* <Navigate href={`/expressions/2`} /> */}
          Registration complete!
        </Show>
      </form>
    </>
  )
}
