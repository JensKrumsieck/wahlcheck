<script lang="ts">
  import PartyChip from "$lib/components/PartyChip.svelte";
  import { questions, parties, colorFor } from "$lib/types";

  const total = questions.length;
</script>

<div class="container container-md mx-auto px-4 py-16 sm:py-24">
  <div class="mx-auto max-w-2xl text-center">
    <span class="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-ink-muted">
      {total} Thesen · {parties.length} Parteien · Kommunalwahl am 13.09.2026
    </span>

    <h1 class="mt-6 font-display text-4xl font-semibold tracking-tight text-ink text-balance sm:text-6xl">
      Wer passt zu dir in <span class="text-accent">Braunschweig</span>?
    </h1>

    <p class="mt-6 text-lg text-ink-muted text-balance">
      Am 13.09.2026 ist Kommunalwahl in der <em>City of Lions</em>. Für den Rat der Stadt treten SPD, CDU, DIE GRÜNEN, BIBS, FDP, AfD, Die Linke, Volt, Die PARTEI, FREIE WÄHLER, FWBS und 2 Einzelbewerber an. Mittels KI wurden
      {total} vordefinierte Thesen auf Basis der öffentlich verfügbaren Wahlprogramme beantwortet - beantworte sie selbst und vergleiche dein Ergebnis.
    </p>

    <div class="mt-8 flex flex-wrap justify-center gap-2">
      {#each parties as party}
        <PartyChip party={party.name} />
      {/each}
    </div>

    <a href="/check" class="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-lg font-semibold text-accent-ink shadow-lg shadow-accent/20 transition hover:bg-accent-strong hover:shadow-xl hover:shadow-accent/30">
      Jetzt starten
    </a>
    <div class="mt-10 md:flex-row flex-col flex gap-2 justify-center">
      <a href="/answers" class="text-ink underline transition hover:font-bold">Ich möchte nur die Antworten sehen</a>
      <div class="md:flex hidden">|</div>
      <a href="/list" class="text-ink underline transition hover:font-bold">Zu den Wahlprogrammen</a>
    </div>
  </div>
</div>
