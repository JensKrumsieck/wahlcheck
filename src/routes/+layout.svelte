<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header class="bg-red-950 text-white text-xl py-2 px-1">
  <div class="container container-md mx-auto">Braunschweig Wahlcheck</div>
</header>
<main>
  {@render children()}
</main>
<footer>
</footer>