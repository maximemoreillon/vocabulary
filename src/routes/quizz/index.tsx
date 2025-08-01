import { MetaProvider, Title } from "@solidjs/meta";
import { For, Show, createResource, createSignal } from "solid-js";
import {
  cache,
  action,
  useAction,
  useSubmission,
  useSearchParams,
} from "@solidjs/router";
import { readRandomExpressions, updateExpression } from "~/lib/expressions";
import { FaSolidArrowRight, FaSolidEye, FaSolidEyeSlash } from "solid-icons/fa";
import Button from "~/components/Button";
import BackLink from "~/components/BackLink";
import ModeSelect from "~/components/ModeSelect";
import { Mode } from "~/components/ModeSelect";
import { expressions } from "~/lib/db/schema";

const getRandomExpressionsCache = cache(async () => {
  "use server";
  return await readRandomExpressions();
}, "expression");

const updateExpressionScoreAction = action(
  async (id: number, newScore: number) => {
    "use server";
    await updateExpression(id, { score: newScore });
  },
  "updateExpression"
);

export default function QuizzPage() {
  const [searchParams] = useSearchParams();

  const guess = () => (searchParams.guess as Mode) || "meaning";
  const from = () => (searchParams.from as Mode) || "writing";

  const [getReadingShown, setReadingShown] = createSignal(false);
  const [getUserAnswerId, setUserAnswerId] = createSignal<
    number | null | undefined
  >(null);

  const [randomExpressions, { refetch }] = createResource(
    async () => await getRandomExpressionsCache()
  );

  const getCorrectAnswer = () =>
    randomExpressions()?.at(0) as typeof expressions.$inferSelect;

  const updateExpressionUsedAction = useAction(updateExpressionScoreAction);
  const submission = useSubmission(updateExpressionScoreAction);

  async function handleButtonClicked(
    selection: typeof expressions.$inferSelect
  ) {
    const { id: selectionId, score: selectionScore } = selection;

    const { id: correctAnswerId, score: correctAnswerScore = 0 } =
      getCorrectAnswer();

    setUserAnswerId(selectionId);

    if (selectionId === correctAnswerId) {
      await updateExpressionUsedAction(
        correctAnswerId,
        (correctAnswerScore ?? 0) + 1
      );
    } else {
      await updateExpressionUsedAction(
        correctAnswerId,
        (correctAnswerScore ?? 0) - 1
      );
      await updateExpressionUsedAction(selectionId, (selectionScore ?? 0) - 1);
    }
  }

  function getEach() {
    const randExp = randomExpressions();
    if (!randExp) return [];

    return randExp
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value) as (typeof expressions.$inferSelect)[];
  }

  function getNextExpression() {
    setReadingShown(false);
    setUserAnswerId(null);
    refetch();
  }

  const getExpressionClass = (id: number) => {
    if (getUserAnswerId() && getCorrectAnswer()?.id === id) return "bg-success";
    else if (getUserAnswerId() === id && getCorrectAnswer()?.id !== id)
      return "bg-problem";
    else return "";
  };

  return (
    <>
      <MetaProvider>
        <Title>Random expression</Title>

        <div class="flex justify-between items-center flex-wrap">
          <BackLink />
          <ModeSelect />
        </div>

        <Show when={getCorrectAnswer()}>
          <div class="my-8 text-center">
            <div class="text-6xl">
              {getCorrectAnswer()[from() as "writing" | "meaning"]}
            </div>

            <Show when={getReadingShown() && from() === "writing"}>
              <div class="text-center">{getCorrectAnswer().reading}</div>
            </Show>
          </div>

          <div class="flex justify-between items-center">
            <Button
              onclick={() => setReadingShown(!getReadingShown())}
              size="sm"
            >
              <Show when={getReadingShown()}>
                <FaSolidEyeSlash />
                <span>Hide reading</span>
              </Show>
              <Show when={!getReadingShown()}>
                <FaSolidEye />
                <span>Show reading</span>
              </Show>
            </Button>
            <div>Score: {randomExpressions()?.at(0)?.score} </div>
          </div>

          <div class="flex flex-col gap-4 my-8">
            <For each={getEach()}>
              {(expression) => (
                <Button
                  onclick={() => handleButtonClicked(expression)}
                  disabled={!!getUserAnswerId()}
                  class={getExpressionClass(expression.id)}
                >
                  {expression[guess()]}
                  <Show when={getReadingShown() && guess() === "writing"}>
                    <span>({expression.reading})</span>
                  </Show>
                </Button>
              )}
            </For>
          </div>
        </Show>
        <Show when={getUserAnswerId()}>
          <div class="my-4">
            <Button onclick={getNextExpression} loading={submission.pending}>
              <FaSolidArrowRight />
              <span>Next expression</span>
            </Button>
          </div>
        </Show>
      </MetaProvider>
    </>
  );
}
