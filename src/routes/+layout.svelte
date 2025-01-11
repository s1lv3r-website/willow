<script lang="ts">
  import '../app.scss';
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" type="image/icon" href="/favicon.png" />
  <title>WillowWould donation pages</title>
</svelte:head>

<div class="flex h-full flex-col overflow-auto [&>*]:m-auto">
  {@render children()}
</div>
