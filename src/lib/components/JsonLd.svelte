<script lang="ts">
  interface Props {
    data: Record<string, unknown>;
  }
  let { data }: Props = $props();

  // Built from parts so the literal tag text never appears contiguously in this
  // file's source — Svelte's tag scanner otherwise treats it as a real tag boundary.
  const openTag = "<" + 'script type="application/ld+json">';
  const closeTag = "<" + "/script>";

  // Escape "<" in the payload too, so embedded text can't smuggle in a closing tag.
  const json = $derived(JSON.stringify(data).replace(/</g, "\\u003c"));
  const html = $derived(openTag + json + closeTag);
</script>

<svelte:head>
  {@html html}
</svelte:head>
