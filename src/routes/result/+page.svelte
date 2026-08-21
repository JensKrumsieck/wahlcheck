<script lang="ts">
  import { onMount } from "svelte";
  import { Jumper } from "svelte-loading-spinners";
  import { goto } from "$app/navigation";
  import Result from "$lib/components/Result.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import { questions, type UserAnswers } from "$lib/types";
  import { loadAnswers, clearAnswers } from "$lib/storage";

  let loaded = $state(false);
  let score: UserAnswers | null = $state(null);

  onMount(() => {
    score = loadAnswers();
    loaded = true;
  });

  function restart() {
    clearAnswers();
    goto("/check");
  }
</script>

<Seo
  title="Dein Ergebnis"
  description="Dein persönliches Ergebnis aus dem Braunschweig Wahlcheck zur Kommunalwahl 2026."
  path="/result"
  noindex
/>

{#if loaded}
  {#if score}
    {@const finalScore = score}
    <div class="py-5">
      <Result score={finalScore} {questions} />
      <div class="container container-md mx-auto px-4 pb-16 text-center">
        <button class="text-sm font-medium text-ink-muted underline transition hover:text-ink" onclick={restart}> Wahlcheck erneut starten </button>
      </div>
    </div>
  {:else}
    <div class="container container-md mx-auto px-4 py-24 text-center">
      <p class="text-lg text-ink-muted">Es wurde noch kein Ergebnis gefunden. Bitte fülle zuerst den Wahlcheck aus.</p>
      <a href="/check" class="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink transition hover:bg-accent-strong"> Zum Wahlcheck </a>
    </div>
  {/if}
{:else}
<div class="container container-md mx-auto px-4 py-24 text-center">
  <Jumper />
</div>
{/if}
