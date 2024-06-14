import { Title } from "@solidjs/meta"
import { action, redirect, useSubmission, createAsync } from "@solidjs/router"
import { createExpression } from "~/api/expressions"
import Input from "~/components/Input"
import Button from "~/components/Button"
import { Show } from "solid-js"
import { getUserCache } from "~/api"
const createExpressionAction = action(async (formData: FormData) => {
  const reading = String(formData.get("reading"))
  const writing = String(formData.get("writing"))
  const meaning = String(formData.get("meaning"))
  const newExpression = await createExpression({ reading, meaning, writing })
  return redirect(`/expressions/${newExpression.id}`)
}, "createExpression")

export default function NewExpression() {
  const user = createAsync(async () => getUserCache())
  const submission = useSubmission(createExpressionAction)

  return (
    <>
      <Title>New expression</Title>

      <h2 class="text-3xl my-4">New expression</h2>

      <div>
        <Button href="/expressions">Return to my expressions</Button>
      </div>

      <form
        action={createExpressionAction}
        method="post"
        class="my-8 flex flex-col gap-8"
      >
        <Input label="Writing" name="writing" />
        <Input label="Reading" name="reading" />
        <Input label="Meaning" name="meaning" />

        <Button type="submit">Submit</Button>
      </form>

      <Show when={submission.error}>{submission.error}</Show>
    </>
  )
}
