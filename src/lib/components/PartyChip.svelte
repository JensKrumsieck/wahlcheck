<script lang="ts">
    import { colorFor } from "$lib/types";

    interface Props {
        party: string;
    }
    let { party }: Props = $props();
</script>

<span class="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-ink">
    <span class="h-2.5 w-2.5 rounded-full" style="background-color: {colorFor(party)}"></span>
    {party}
</span>
