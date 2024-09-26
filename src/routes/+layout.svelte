<script lang="ts">
    import "../app.css";
    import { fly } from 'svelte/transition';

    export let data;
</script>

<header>
    <h3><a href="/" class="text-gray-400 no-underline">satr14's blog</a></h3>
    <nav>
        <a class="text-right" href="//satr14.my.id">main site</a>
        <a href="/archive">blog archive</a>
    </nav>
</header>

{#key data.url}
  <div
    in:fly={{ y: -50, duration: 150 }}
  >
    <slot />
  </div>
{/key}