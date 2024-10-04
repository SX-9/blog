<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
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
			<a href="//github.com/SX-9/blog">source</a>
		{:else}
			<a href="/#" on:click={() => pb.authStore.clear()}>logout</a>
			<a href={PUBLIC_POCKETBASE_URL + '/_'}>dash</a>
		{/if}
		<a href="/archive">archive</a>
		<a href="//satr14.my.id">main</a>
	</nav>
</header>

{#key data.url}
  	<div in:fly={{ y: -50, duration: 150 }}>
		<slot />
	</div>
{/key}