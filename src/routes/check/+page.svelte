<script lang="ts">
    import QuestionCard from "$lib/components/QuestionCard.svelte";
    import { questions, type Wertung } from "$lib/types";

    let current = $state(0);
    let score: Number[] = $state([]);

    let onanswer = (value: Wertung) => {
        score[current] = value;
        current += 1;

        console.log(score);
    };
</script>

{#if current != questions.length}
    <QuestionCard question={questions[current]} index={current} total={questions.length} {onanswer}></QuestionCard>
{/if}
