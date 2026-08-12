<script lang="ts">
    import QuestionCard from "$lib/components/QuestionCard.svelte";
    import { questions, type Wertung } from "$lib/types";

    let current = $state(0);

    let onanswer = (value: Wertung) => (current += 1);
</script>

<QuestionCard question={questions[current]} index={current} total={questions.length} {onanswer}></QuestionCard>
