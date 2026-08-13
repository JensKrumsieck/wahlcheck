<script lang="ts">
    import PartyChip from "$lib/components/PartyChip.svelte";

    const programmes = [
        {
            party: "SPD",
            title: "Weiter stark für Braunschweig",
            url: "https://www.spd-braunschweig.de/wp-content/uploads/sites/657/2026/04/Weiter_stark_f__r_Braunschweig_Kommunalwahlprogramm_SPD_2026_Website.pdf",
            format: "PDF",
        },
        {
            party: "GRÜNE",
            title: "Braunschweig kann mehr!",
            url: "https://gruene-braunschweig.gruenes-cms.de/userspace/NS/kv_braunschweig/Dokumente/Wahlprogramm_26.pdf",
            format: "PDF",
        },
        {
            party: "CDU",
            title: "Braunschweig-Plan. Braunschweig kann mehr. #mehrBraunschweig",
            url: "https://cdu-braunschweig.de/wp-content/uploads/2026/07/BS-Plan_Wahlprogramm_CDU-Braunschweig.pdf",
            format: "PDF",
        },
        {
            party: "AfD",
            title: "Zeit für Braunschweig",
            url: "https://afd-braunschweig.de/documents/6/Kommunalwahlprogramm_Braunschweig_2026_cyBrBzk.pdf",
            format: "PDF",
        },
        {
            party: "Die Linke",
            title: "Braunschweig gehört uns allen",
            url: "https://www.dielinke-braunschweig.de/kommunalwahl-2026/unser-wahlprogramm/",
            format: "HTML",
        },
        {
            party: "FDP",
            title: "Gemeinsam Braunschweig aufblühen lassen.",
            url: "https://freie-demokraten-bs.de/wp-content/uploads/2026/06/FDP-BS-Wahlprogramm.pdf",
            format: "PDF",
        },
        {
            party: "Volt",
            title: "Europäisch denken, lokal handeln – gemeinsam Braunschweig gestalten ",
            url: "https://voltdeutschland.org/storage/assets-niedersachsen/braunschweig/kommunalwahlprogram-2026-final-lang_druckvorlage-1.pdf",
            format: "PDF",
        },
        {
            party: "BSW",
            title: "Vernunft, Gerechtigkeit, Demokratie für unsere Kommunen in Niedersachsen",
            url: "https://bsw-so-nds.de/cms/wp-content/uploads/2026/07/BSW_Wahlprogramm_Niedersachsen.pdf",
            format: "PDF",
        },
    ];
</script>

<div class="container container-md mx-auto px-4 py-24">
    <h1 class="font-display text-2xl font-semibold text-balance text-ink sm:text-3xl">Wahlprogramme</h1>
    <ul class="my-3">
        {#each programmes as programme}
            <li>
                <a
                    href={programme.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group flex items-center justify-between rounded-xl border border-ink/10
                           bg-accent-ink px-5 py-4 shadow-sm transition
                           hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-md"
                >
                    <div class="flex min-w-0 items-center gap-4">
                        <div class="min-w-28"><PartyChip party={programme.party} /></div>

                        <div class="min-w-0">
                            <div class="font-medium text-ink group-hover:underline">
                                {programme.title}
                            </div>
                            <div class="text-sm text-ink/50">Wahlprogramm · {programme.format}</div>
                        </div>
                    </div>

                    <span
                        class="ml-4 shrink-0 text-ink/40 transition-transform
                               group-hover:translate-x-1 group-hover:text-ink"
                        aria-hidden="true"
                    >
                        ↗
                    </span>
                </a>
            </li>{/each}
    </ul>
</div>
