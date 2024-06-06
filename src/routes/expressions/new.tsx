import { Title } from "@solidjs/meta"
import { Show } from "solid-js"
import { action, redirect, useSubmission } from "@solidjs/router"
import { createExpression } from "~/api/expressions"

const createExpressionAction = action(async (formData: FormData) => {
  const reading = String(formData.get("reading"))
  const writing = String(formData.get("writing"))
  const meaning = String(formData.get("meaning"))
  const newExpression = await createExpression({ reading, meaning, writing })
  return redirect(`/expressions/${newExpression.id}`)
}, "createExpression")

export default function NewExpression() {
  const submitting = useSubmission(createExpressionAction)

  return (
    <>
      <Title>New expression</Title>

      <p>
        <a href="/expressions"></a>
      </p>

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
      </form>

      {/* TODO: error handling */}
    </>
  )
}
