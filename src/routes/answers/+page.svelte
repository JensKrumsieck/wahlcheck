<script lang="ts">
  import { goto } from "$app/navigation";
  import Answers from "$lib/components/Answers.svelte";
  import { questions } from "$lib/types";
  import { clearAnswers } from "$lib/storage";

  function restart() {
    clearAnswers();
    goto("/check");
  }
</script>

<div class="py-5">
  <div class="container container-md mx-auto px-4">
    <Answers score={undefined} {questions} />
  </div>
  <div class="container container-md mx-auto px-4 pb-16 text-center">
    <button onclick={restart} class="cursor-pointer mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink transition hover:bg-accent-strong"> Zum Wahlcheck </button>
  </div>
</div>
