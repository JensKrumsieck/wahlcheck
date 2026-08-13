<script lang="ts">
  import QuestionCard from "$lib/components/QuestionCard.svelte";
  import Result from "$lib/components/Result.svelte";
  import { questions, type UserAnswers, type Wertung } from "$lib/types";

  let current = $state(0);
  let score: UserAnswers = $state({});

  let onanswer = (id: string, value: Wertung) => {
    score[id] = value;
    current += 1;
  };

  let onback = () => {
    current -= 1;
  };
</script>

<div class="py-5">
  {#if current < questions.length}
    {#key questions[current].id}
      <QuestionCard
        question={questions[current]}
        index={current}
        total={questions.length}
        {onanswer}
        {onback}
      ></QuestionCard>
    {/key}
  {:else}
    <Result {score} {questions} />
  {/if}
</div>
