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
<footer class="text-center py-2 container container-md mx-auto">
  <div class="mt-5 text-green-200 text-sm">
    Ein Projekt von <a class="underline font-medium" href="https://jenskrumsieck.de">Dr. Jens Krumsieck</a>.
  </div>
  <div>    
    <small class="text-ink-muted">Der Ersteller dieser Seite steht selbst als Kandidat auf Listen bei der Kommunalwahl. Dies hat ausdrücklich keinen Einfluss auf die Neutraltität dieser Seite.</small>
  </div>
</footer>
