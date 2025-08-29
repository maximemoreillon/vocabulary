import { MetaProvider, Title } from "@solidjs/meta";
import { For, Show, createResource, createSignal } from "solid-js";
import {
  cache,
  action,
  useAction,
  useSubmission,
  useSearchParams,
  query,
} from "@solidjs/router";
import { readExpressionsForQuizz, updateExpression } from "~/lib/expressions";
import {
  FaSolidArrowRight,
  FaSolidEye,
  FaSolidEyeSlash,
  FaSolidQuestion,
} from "solid-icons/fa";
import Button from "~/components/Button";
import BackLink from "~/components/BackLink";
import ModeSelect from "~/components/ModeSelect";
import { Mode } from "~/components/ModeSelect";
import { expressionsTable } from "~/lib/db/schema";

// Not used because cache undesired
// const getExpressionsQuery = query(async () => {
//   "use server";
//   return await readExpressionsForQuizz();
// }, "expressions");

const updateExpressionScoreAction = action(
  async (id: number, newScore: number) => {
    "use server";
    await updateExpression(id, { score: newScore });
  },
  "updateExpression"
);

type Expression = typeof expressionsTable.$inferSelect;

export default function QuizzPage() {
  const [searchParams] = useSearchParams();

  const guess = () => (searchParams.guess as Mode) || "meaning";
  const from = () => (searchParams.from as Mode) || "writing";

  const [getReadingShown, setReadingShown] = createSignal(false);
  const [getUserAnswerId, setUserAnswerId] = createSignal<
    number | null | undefined
  >(null);

  const [getQuizzData, { refetch }] = createResource(
    async () => await readExpressionsForQuizz()
  );

  const updateExpressionUsedAction = useAction(updateExpressionScoreAction);
  const submission = useSubmission(updateExpressionScoreAction);

  async function handleButtonClicked(selection: Expression) {
    // Dirty
    const correctAnswer = getQuizzData()?.correctAnswer;
    if (!correctAnswer) throw new Error("Missing quizz data");

    const { id: selectionId, score: selectionScore } = selection;
    const { id: correctAnswerId, score: correctAnswerScore } = correctAnswer;

    setUserAnswerId(selectionId);

    if (selectionId === correctAnswerId) {
      await updateExpressionUsedAction(correctAnswerId, correctAnswerScore + 1);
    } else {
      await updateExpressionUsedAction(correctAnswerId, correctAnswerScore - 1);
      await updateExpressionUsedAction(selectionId, selectionScore - 1);
    }
  }

  async function iDontKnow() {
    // Dirty
    const correctAnswer = getQuizzData()?.correctAnswer;
    if (!correctAnswer) throw new Error("Missing quizz data");
    const { id: correctAnswerId, score: correctAnswerScore } = correctAnswer;

    await updateExpressionUsedAction(correctAnswerId, correctAnswerScore - 1);

    getNextExpression();
  }

  function getNextExpression() {
    setReadingShown(false);
    setUserAnswerId(null);
    refetch();
  }

  const getExpressionClass = (id: number) => {
    if (getUserAnswerId() && getQuizzData()?.correctAnswer.id === id)
      return "bg-success";
    else if (
      getUserAnswerId() === id &&
      getQuizzData()?.correctAnswer.id !== id
    )
      return "bg-problem";
    else return "";
  };

  return (
    <>
      <MetaProvider>
        <Title>Quizz</Title>

        <div class="flex justify-between items-center flex-wrap">
          <BackLink />
          <ModeSelect />
        </div>

        <Show when={getQuizzData()}>
          <div class="my-8 text-center">
            <div class="text-6xl">
              {getQuizzData()?.correctAnswer[from() as "writing" | "meaning"]}
            </div>

            <Show when={getReadingShown() && from() === "writing"}>
              <div class="text-center">
                {getQuizzData()?.correctAnswer.reading}
              </div>
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
            <div>Score: {getQuizzData()?.correctAnswer.score} </div>
          </div>

          <div class="flex flex-col gap-4 my-8">
            <For each={getQuizzData()?.candidates}>
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
        <Show when={!getUserAnswerId()}>
          <div class="my-4">
            <Button onclick={iDontKnow} loading={submission.pending}>
              <FaSolidQuestion />
              <span>I don't know</span>
            </Button>
          </div>
        </Show>
      </MetaProvider>
    </>
  );
}
