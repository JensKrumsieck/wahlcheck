<script lang="ts">
  import { page } from "$app/state";
  import Seo from "$lib/components/Seo.svelte";
</script>

<Seo
  title="Seite nicht gefunden"
  description="Diese Seite gibt es nicht oder nicht mehr. Zurück zum Braunschweig Wahlcheck."
  path="/404"
  noindex
/>

<div class="container container-md mx-auto px-4 py-24 text-center">
  <p class="text-sm font-semibold text-accent">{page.status}</p>
  <h1 class="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
    {page.status === 404 ? "Seite nicht gefunden" : "Etwas ist schiefgelaufen"}
  </h1>
  <p class="mt-4 text-lg text-ink-muted">
    {page.status === 404
      ? "Die Seite, die du suchst, gibt es nicht oder nicht mehr."
      : (page.error?.message ?? "Ein unerwarteter Fehler ist aufgetreten.")}
  </p>
  <a
    href="/"
    class="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink shadow-lg shadow-accent/20 transition hover:bg-accent-strong hover:shadow-xl hover:shadow-accent/30"
  >
    Zur Startseite
  </a>
</div>
