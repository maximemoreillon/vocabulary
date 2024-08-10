import { Title } from "@solidjs/meta"
import { action, redirect, useSubmission, createAsync } from "@solidjs/router"
import { createExpression } from "~/api/expressions"
import { Show } from "solid-js"
import { getUserCache } from "~/api"
import { FaSolidFloppyDisk } from "solid-icons/fa"
import Input from "~/components/Input"
import Button from "~/components/Button"
import BackLink from "~/components/BackLink"

const postExpressionAction = action(async (formData: FormData) => {
  const reading = String(formData.get("reading"))
  const writing = String(formData.get("writing"))
  const meaning = String(formData.get("meaning"))
  const newExpression = await createExpression({ reading, meaning, writing })
  return redirect(`/expressions/${newExpression.id}`)
}, "postExpression")

export default function NewExpression() {
  createAsync(async () => getUserCache(true))
  const submission = useSubmission(postExpressionAction)

  return (
    <>
      <Title>New expression</Title>
      <BackLink />

      <h2 class="text-6xl my-4">New expression</h2>
      <form
        action={postExpressionAction}
        method="post"
        class="my-8 flex flex-col gap-8"
      >
        <Input label="Writing" name="writing" />
        <Input label="Reading" name="reading" />
        <Input label="Meaning" name="meaning" />

        <div class="text-center">
          <Button type="submit" loading={submission.pending}>
            <FaSolidFloppyDisk />
            <span>Save</span>
          </Button>
        </div>
      </form>
      <Show when={submission.error}>{submission.error}</Show>
    </>
  )
}
