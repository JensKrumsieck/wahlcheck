<script lang="ts">
    import QuestionCard from "$lib/components/QuestionCard.svelte";
    import { questions } from "$lib/types";

    let current = 0;
</script>

<QuestionCard question={questions[current]} index={current} total={questions.length}></QuestionCard>
