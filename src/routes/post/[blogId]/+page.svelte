<script lang="ts">
    import { browser } from '$app/environment';

    // import type { PageData } from './$types';
    import pb from '$lib';
    export let data: any; // PageData;

    const created = new Date(data.blog.created);
    const month = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
</script>

<svelte:head>
    <title>{data.blog.title || '?'} - satr14's blog</title>
    <meta name="description" content={data.blog.desc || ''}>
    <meta property="og:title" content={data.blog.title || ''}>
    <meta property="og:description" content={data.blog.desc || ''}>
    <meta property="og:image" content={pb.files?.getUrl(data.blog, data.blog.thumbnail) || ''}>
    <meta property="article:published_time" content={data.blog.created || ''}>
    <meta property="article:modified_time" content={data.blog.updated || ''}>
    <meta property="article:author" content="satr14">
    <meta property="og:type" content="article">
</svelte:head>

{#if !data.blog?.error}
    <header class="w-full flex justify-center items-center">
        <div class="w-full my-4 max-w-[780px]">
            <img class="w-full shadow-lg" src={pb.files.getUrl(data.blog, data.blog.thumbnail, { thumb: '780x160' })} alt={data.blog.thumbnail}>
            <h1 class="my-0 md:my-4 text-4xl sm:text-6xl text-slate-300 font-normal">{data.blog.title}</h1>
            <p class="italic text-base sm:text-lg my-2">
                {#if data.blog.unlisted}
                    <span class="text-yellow-200">Unlisted</span> - 
                {/if}
                {month[created.getMonth()]} {created.getDate()}, {created.getFullYear()}
                - {data.blog.desc}
            </p>
        </div>
    </header>
    <main class="flex flex-col justify-start items-center w-full">
        <article class="max-w-3xl w-full shadow-lg">
            {@html data.blog.md}
        </article>
    </main>
    <footer class="text-center italic">Thanks for reading 👋</footer>
{:else}
    {data.blog.error}
{/if}