<script lang="ts">
  import type { Question, Wertung } from "$lib/types";
  import { fly } from "svelte/transition";

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const transitionDuration = reducedMotion ? 0 : 220;

  interface Props {
    question: Question;
    index: number;
    total: number;
    answer?: Wertung;
    onanswer: (id: string, value: Wertung) => void;
    onback: () => void;
  }

  let { question, index, total, answer, onanswer, onback }: Props = $props();

  const progress = $derived(((index + 1) / total) * 100);

  const answers = [
    { value: 1 as const, label: "Stimme zu", symbol: "👍" },
    { value: 0 as const, label: "Neutral", symbol: "⭕" },
    { value: -1 as const, label: "Lehne ab", symbol: "👎" },
  ];

  function selectAnswer(id: string, value: Wertung) {
    answer = value;
    onanswer(id, value);
  }
</script>

<article
  in:fly={{ x: 24, duration: transitionDuration }}
  class="container container-md mx-auto rounded-2xl border border-border bg-surface p-6 shadow-xl shadow-ink/5 sm:p-8"
>
  <header>
    <div class="flex items-center justify-between gap-3">
      <span
        class="inline-block rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-strong"
      >
        {question.kategorie}
      </span>
      {#if index > 0}
        <button
          class="text-sm font-medium text-ink-muted transition hover:text-ink"
          onclick={onback}
        >
          ← Zurück
        </button>
      {/if}
    </div>

    <div class="mt-4">
      <div class="mb-2 flex justify-between text-sm text-ink-muted">
        <span>Frage {index + 1} von {total}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div class="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          class="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
          style="width: {progress}%"
        ></div>
      </div>
    </div>
  </header>

  <section class="my-6 flex min-h-72 flex-col justify-between gap-8">
    <h1
      class="font-display text-2xl font-semibold text-balance text-ink sm:text-3xl"
    >
      {question.these}
    </h1>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Deine Position">
      {#each answers as option}
        {@const selected = answer === option.value}
        <button
          type="button"
          class="flex flex-col items-center gap-1 rounded-xl border-2 py-4 font-semibold transition
            {selected
            ? 'border-accent bg-accent text-accent-ink shadow-lg shadow-accent/25'
            : 'border-border bg-surface-2 text-ink hover:border-accent/40 hover:bg-accent-soft'}"
          role="radio"
          aria-checked={selected}
          onclick={() => selectAnswer(question.id, option.value)}
        >
          <span class="text-2xl">{option.symbol}</span>
          <span>{option.label}</span>
        </button>
      {/each}
    </div>
  </section>
</article>
