<script lang="ts">
	import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
    import { fly } from 'svelte/transition';
	import pb, { authStore } from "$lib";
	import { page } from "$app/stores";
    import "../app.css";
 	import { goto } from "$app/navigation";

    export let data;
	const params = new URLSearchParams($page.url.search);
	let hidden = params.has('hide-nav');

	function showNav() {
		params.delete('hide-nav');
		goto(`?${params.toString()}`);
		hidden = false;
	}
</script>

<svelte:head>
	<script defer data-domain="blog.satr14.my.id" src="https://plausible.io/js/script.js"></script>
</svelte:head>

{#if hidden}
	<div class="fixed top-0 right-4 w-12 h-2 hover:h-auto group rounded-b-lg cursor-pointer bg-slate-700 dark:bg-slate-300" role="button" tabindex="0" on:click={showNav} on:keydown={showNav}>
		<svg class="group-hover:block hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#777777"><path d="M480-360 280-559.33h400L480-360Z"/></svg>
	</div>
{:else}
	<header class="bg-gray-950 px-8 py-4">
		<h3><a href="/" class="text-slate-100 no-underline">satr14's blog</a></h3>
		<nav>
			{#if !$authStore.isValid}
				<a class="text-sky-300" href="/login">login</a>
				<a class="text-sky-300" href="//github.com/SX-9/blog">source</a>
			{:else}
				<a class="text-sky-300" href="/#" on:click={() => pb.authStore.clear()}>logout</a>
				<a class="text-sky-300" href={PUBLIC_POCKETBASE_URL + '/_'}>dash</a>
			{/if}
			<a class="text-sky-300" href="/archive">archive</a>
			<a class="text-sky-300" href="//satr14.my.id">main</a>
		</nav>
	</header>
{/if}

{#key data.url}
  	<div in:fly={{ y: -50, duration: 150 }} class="mx-8 mb-8">
		<slot />
	</div>
{/key}