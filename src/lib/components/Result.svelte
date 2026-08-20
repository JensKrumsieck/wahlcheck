<script lang="ts">
  import { computeScore, colorFor, type Question, type UserAnswers, parties } from "$lib/types";
  import { AxisX, AxisY, BarX, Plot, Text } from "svelteplot";
  import Answers from "./Answers.svelte";

  interface Props {
    score: UserAnswers;
    questions: Question[];
  }

  let { score, questions }: Props = $props();

  let raw = $derived(computeScore(score));
  let values = $derived(
    raw.map((i) => ({
      name: i.name,
      value: i.totalScore / i.maxScore,
      label: `${Math.round((i.totalScore / i.maxScore) * 100)}%`,
    })),
  );
  let hero = $derived([...values].sort((a, b) => b.value - a.value)[0]);
</script>

<div class="container container-md mx-auto px-4">
  {#if hero}
    {@const heroColor = colorFor(hero.name)}
    <div class="mb-8 rounded-2xl border-2 p-8 text-center shadow-xl" style="border-color: {heroColor}; background: color-mix(in srgb, {heroColor} 8%, var(--color-surface));">
      <p class="text-sm font-medium text-ink-muted">Deine größte Übereinstimmung</p>
      <p class="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
        {hero.name}
      </p>
      <p class="mt-1 font-display text-6xl font-bold text-ink sm:text-7xl">
        {hero.label}
      </p>
    </div>
  {/if}

  <div class="chart rounded-2xl border border-border bg-surface p-4 shadow-lg sm:p-6">
    <Plot y={{ type: "band" }} x={{ percent: true }} color={{ scheme: Object.fromEntries(parties.map((p) => [p.name, colorFor(p.name)])) }} marginRight={40}>
      <AxisX title="" />
      <AxisY title="" />
      <BarX data={values} y="name" x="value" fill="name" sort={{ channel: "x", order: "descending" }} />
      <Text data={values} y="name" x="value" text="label" dx={6} textAnchor="start" />
    </Plot>
  </div>
  <div class="relative mt-8 overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-lg sm:p-8">
    <div class="pointer-events-none absolute inset-0 bg-linear-to-br from-accent-soft via-transparent to-transparent"></div>
    <div class="relative">
      <span class="inline-flex items-center gap-1.5 rounded-full bg-accent-soft py-1 text-sm font-medium text-accent-strong"> 🧭 Deine Reise beginnt hier </span>
      <p class="mt-4 max-w-2xl text-ink-muted">
        Du hast jetzt einen Überblick über <span class="font-semibold text-ink">{questions.length} Positionen</span> aus den Wahlprogrammen der Parteien. Schau dir die Begründungen im Detail an oder lies direkt in den Original-Wahlprogrammen nach, um deine
        Wahlentscheidung zu treffen.
      </p>
      <div class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        <a href="#antworten" class="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong transition hover:text-accent">
          Zu den Antworten im Detail
          <span aria-hidden="true">↓</span>
        </a>
        <a href="/list" class="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted transition hover:text-ink">
          Alle Wahlprogramme im Original
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </div>
  <Answers {score} {questions} />
</div>

<style>
  .chart :global(text) {
    fill: var(--color-ink-muted);
    font-family: var(--font-sans);
  }
</style>
