<script lang="ts">
  import { questions } from "$lib/types";

  const total = questions.length;
</script>

<div class=" container container-md mx-auto">
  <div class="prose max-w-none">
    <h1>Braunschweig Wahlcheck</h1>
    <p>
      Am 13.09.2026 ist Kommunalwahl in der <em>City of Lions</em>. Für den Rat
      der Stadt treten an: SPD, CDU, DIE GRÜNEN, BIBS, FDP, AfD, Die Linke,
      Volt, Die PARTEI, FREIE WÄHLER, FWBS und 2 Einzelbewerber. Sofern
      verfügbar wurden die Wahlprogramme der Parteien und Wählergruppen für
      Braunschweig als PDF von der Webseite der jeweiligen Partei bezogen.
      Mittels KI wurden {total} vordefinierte Fragen auf Basis der Wahlprogramme
      beantwortet.
    </p>
    <p>Folgende Wahlprogramme stehen zur Verfügung:</p>
    <ul>
      <li>Sozialdemokratische Partei Deutschlands (SPD)</li>
      <li>BÜNDNIS 90/DIE GRÜNEN (GRÜNE)</li>
      <li>Christlich Demokratische Union (CDU)</li>
      <li>Die Linke</li>
      <li>Alternative für Deutschland (AfD)</li>
      <li>Bündnis Sarah Wagenknecht (BSW) - Programm für Niedersachsen</li>
      <li>Volt</li>
    </ul>
    <a
      href="/check"
      class="border border-slate-300 bg-red-200 px-4 py-2 hover:bg-red-400 rounded-md text-xl no-underline"
    >
      Jetzt starten!
    </a>
  </div>
</div>
