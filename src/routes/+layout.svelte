<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header class="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur">
  <div class="container container-md mx-auto px-4 py-3">
    <a href="/"
      ><span class="font-display text-xl font-semibold tracking-tight text-ink">
        Braunschweig <span class="text-accent">Wahlcheck</span>
      </span></a
    >
  </div>
</header>
<main>
  {@render children()}
</main>
<footer></footer>
