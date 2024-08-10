import { action, useAction, useSubmission, redirect } from "@solidjs/router"
import { FaSolidTrash } from "solid-icons/fa"
import { deleteExpression } from "~/api/expressions"
import Button from "~/components/Button"

type Props = {
  id?: number
}

const deleteExpressionAction = action(async (id?: number) => {
  "use server"
  if (!id) throw "ID not defined"
  await deleteExpression(id)
  return redirect("expressions")
}, "deleteExpression")

export default function ExpressionDeleteButton(props: Props) {
  const usedDeleteExpressionAction = useAction(deleteExpressionAction)
  const deleting = useSubmission(deleteExpressionAction)

  function handleClick() {
    if (!confirm("Delete expression?")) return
    usedDeleteExpressionAction(props.id)
  }
  return (
    <Button
      loading={deleting.pending}
      onclick={() => {
        handleClick()
      }}
    >
      <FaSolidTrash />
      <span>Delete</span>
    </Button>
  )
}
