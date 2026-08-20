<script lang="ts">
  import { goto } from "$app/navigation";
  import { Jumper } from "svelte-loading-spinners";
  import QuestionCard from "$lib/components/QuestionCard.svelte";
  import { questions, type UserAnswers, type Wertung } from "$lib/types";
  import { saveAnswers } from "$lib/storage";

  let current = $state(0);
  let score: UserAnswers = $state({});

  let onanswer = (id: string, value: Wertung) => {
    score[id] = value;
    current += 1;

    if (current >= questions.length) {
      saveAnswers(score);
      goto("/result");
    }
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
    <div class="flex justify-center py-24">
      <Jumper />
    </div>
  {/if}
</div>
