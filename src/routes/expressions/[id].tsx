import { Title } from "@solidjs/meta";
import { Show } from "solid-js";
import {
  createAsync,
  useParams,
  cache,
  action,
  useSubmission,
} from "@solidjs/router";
import { FaSolidFloppyDisk } from "solid-icons/fa";
import { readExpression, updateExpression } from "~/lib/expressions";
// import { getUserCache } from "~/lib/auth";
import BackLink from "~/components/BackLink";
import Button from "~/components/Button";
import Input from "~/components/Input";
import ExpressionDeleteButton from "~/components/ExpressionDeleteButton";

const getExpression = cache(async (id: number) => {
  "use server";
  return readExpression(id);
}, "getExpression");

const updateExpressionAction = action(async (formData: FormData) => {
  "use server";

  const id = formData.get("id");

  const reading = formData.get("reading")?.toString();
  const writing = formData.get("writing")?.toString();
  const meaning = formData.get("meaning")?.toString();

  await updateExpression(Number(id), { reading, meaning, writing });

  return;
}, "deleteExpression");

export default function Expression() {
  const params = useParams();
  const expression = createAsync(async () => getExpression(Number(params.id)));

  const updateSubmission = useSubmission(updateExpressionAction);

  return (
    <>
      <Title>Vocabulary</Title>
      <BackLink />
      <Show when={expression()}>
        <form
          action={updateExpressionAction}
          method="post"
          class="my-8 flex flex-col gap-8"
        >
          <input name="id" value={expression()?.id} type="hidden" readonly />
          <Input label="Writing" name="writing" value={expression()?.writing} />
          <Input label="Reading" name="reading" value={expression()?.reading} />
          <Input label="Meaning" name="meaning" value={expression()?.meaning} />

          <div class="flex gap-4">
            <Button type="submit" loading={updateSubmission.pending}>
              <FaSolidFloppyDisk />
              <span>Save</span>
            </Button>
            <ExpressionDeleteButton id={expression()?.id} />
          </div>
        </form>
      </Show>
    </>
  );
}
