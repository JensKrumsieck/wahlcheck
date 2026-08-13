<script lang="ts">
  import * as Swetrix from "swetrix";
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import { onMount } from "svelte";
  import { dev } from "$app/environment";

  let { children } = $props();
  onMount(() => {
    Swetrix.init("B00OcPR84UWL", {
      devMode: dev,
      disabled: dev,
      apiURL: "https://api.analytics.jenskrumsieck.de/log",
    });
    Swetrix.trackViews();
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Braunschweig Wahlcheck</title>
  <meta
    name="description"
    content="Am 13.09.2026 ist Kommunalwahl in der City of Lions. Für den Rat der Stadt treten SPD, CDU, DIE GRÜNEN, BIBS, FDP, AfD, Die Linke, Volt, Die PARTEI, FREIE WÄHLER, FWBS und 2 Einzelbewerber an. Mittels KI wurden 40 vordefinierte Thesen auf Basis der öffentlich verfügbaren Wahlprogramme beantwortet - beantworte sie selbst und vergleiche dein Ergebnis."
  />
</svelte:head>

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
  <div>
    <small class="text-ink"><span class="font-bold">KI kann Fehler machen!</span> Überprüfe die Aussagen anhand der Parteiprogramme.</small>
    <small class="text-ink">Hinweis: Für das BSW stand nur ein Niedersachsen-weites Programm zur Verfügung. Die BIBS hat zum aktuellen Zeitpunkt kein aktuelles & öffentliches Wahlprogramm.</small>
  </div>
  <div>
    <small class="text-ink-muted"
      >Der Ersteller dieser Seite steht selbst als Kandidat auf Listen bei der Kommunalwahl. Dies hat ausdrücklich keinen Einfluss auf die Neutraltität dieser Seite. Alle Aussagen basieren auf KI-generierten Antworten auf Basis der vorliegenden
      Kommunalwahlprogramme. Fehler gefunden? <a class="underline hover:text-ink-faint" target="_blank" href="https://github.com/JensKrumsieck/wahlcheck">Kannst du gerne bei GitHub melden!</a></small
    >
  </div>
  <div class="my-1">
    <small class="text-ink-muted">Lust auf <a class="underline hover:text-ink-faint" target="_blank" href="https://wahl.jenskrumsieck.de">Wahlvorhersagen für die Stadt Braunschweig</a>?</small>
  </div>
  <div class="my-5 text-ink-faint text-xs">
    Ein Projekt von <a class="underline font-medium" href="https://jenskrumsieck.de">Dr. Jens Krumsieck</a>.
  </div>
  <div class="my-1">
    <small class="text-ink-muted">
      <a class="underline hover:text-ink-faint" target="_blank" href="https://jenskrumsieck.de/impressum">Impressum</a> |
      <a class="underline hover:text-ink-faint" target="_blank" href="https://jenskrumsieck.de/privacy">Datenschutzerklärung</a>
    </small>
  </div>
</footer>
