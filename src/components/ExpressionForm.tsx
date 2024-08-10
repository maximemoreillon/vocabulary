// This is unused
import { useSubmission } from "@solidjs/router"
import Button from "~/components/Button"
import Input from "~/components/Input"
import { FaSolidFloppyDisk } from "solid-icons/fa"

type Props = {
  formAction: any
  values?: {
    reading: string
    writing: string
    meaning: string
  }
}

export default function ExpressionForm(props: Props) {
  const submission = useSubmission(props.formAction)

  return (
    <form
      action={props.formAction}
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
  )
}
