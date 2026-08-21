<script lang="ts">
  const SITE_URL = "https://bswahl.de";
  const SITE_NAME = "Braunschweig Wahlcheck";

  interface Props {
    title: string;
    description: string;
    path?: string;
    noindex?: boolean;
  }
  let { title, description, path = "/", noindex = false }: Props = $props();

  const url = $derived(`${SITE_URL}${path}`);
  const fullTitle = $derived(path === "/" ? title : `${title} · ${SITE_NAME}`);
  const imageUrl = `${SITE_URL}/og-image.png`;
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={url} />
  {#if noindex}
    <meta name="robots" content="noindex, follow" />
  {/if}

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:locale" content="de_DE" />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={imageUrl} />
  <meta property="og:image:width" content="1300" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={SITE_NAME} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={imageUrl} />
</svelte:head>
