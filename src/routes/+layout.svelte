<script lang="ts">
    import pb, { authStore } from "$lib";
    import "../app.css";
    import { fly } from 'svelte/transition';

    export let data;
</script>

<header>
    <h3><a href="/" class="text-gray-400 no-underline">satr14's blog</a></h3>
    <nav>
        {#if !$authStore.isValid}
            <a href="/login">login</a>
		{:else}
			<a href="/#" on:click={pb.authStore.clear}>logout</a>
        {/if}
        <a href="//satr14.my.id">main</a>
        <a href="/archive">archive</a>
    </nav>
</header>

{#key data.url}
  <div
    in:fly={{ y: -50, duration: 150 }}
  >
    <slot />
  </div>
{/key}