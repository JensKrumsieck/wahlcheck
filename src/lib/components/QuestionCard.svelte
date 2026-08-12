<script lang="ts">
    import type { Question, Wertung } from "$lib/types";
    interface Props {
        question: Question;
        index: number;
        total: number;
        answer?: Wertung;
        onanswer: (value: Wertung) => void;
    }

    let { question, index, total, answer, onanswer }: Props = $props();

    const progress = $derived(((index + 1) / total) * 100);

    const answers = [
        { value: 1 as const, label: "Stimme zu", symbol: "👍" },
        { value: 0 as const, label: "Neutral", symbol: "⭕" },
        { value: -1 as const, label: "Lehne ab", symbol: "👎" },
    ];

    function selectAnswer(value: Wertung) {
        answer = value;
        onanswer(value);
    }
</script>

<article class="container container-md mx-auto rounded-lg shadow-xl p-5 border border-zinc-300">
    <header>
        <div><span class="rounded-full px-2 py-1 bg-pink-600 text-white">{question.kategorie}</span></div>
        <div class="my-2">
            Frage {index + 1} von {total}
        </div>
        <progress value={progress} max={100}></progress>
    </header>
    <section class="prose max-w-none my-5 h-100 flex flex-col justify-between">
        <h1>{question.these}</h1>

        <div class="mt-auto flex gap-4" role="radiogroup" aria-label="Deine Position">
            {#each answers as option}
                <button type="button" class:active={answer === option.value} class="answer" role="radio" aria-checked={answer === option.value} onclick={() => selectAnswer(option.value)}>
                    <span class="symbol">{option.symbol}</span>
                    <span>{option.label}</span>
                </button>
            {/each}
        </div>
    </section>
</article>
