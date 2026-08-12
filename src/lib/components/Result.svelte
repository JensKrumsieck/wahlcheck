<script lang="ts">
  import { computeScore, type UserAnswers } from "$lib/types";
  interface Props {
    score: UserAnswers;
  }

  let { score }: Props = $props();

  let derived = $derived(computeScore(score));
</script>

{#each derived as party}
  {party.name}: {(party.totalScore / party.maxScore) * 100} %
{/each}
