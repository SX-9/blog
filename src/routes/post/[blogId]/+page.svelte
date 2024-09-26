<script lang="ts">
    // import type { PageData } from './$types';
    import pb, { formatTime } from '$lib';
    export let data: any; // PageData;
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
    <img class="-z-10 opacity-10 absolute top-0 left-0 right-0 max-h-[40vh] min-h-[40vh] w-screen" src={pb.files.getUrl(data.blog, data.blog.thumbnail)} alt={data.blog.thumbnail}>
    <main class="flex flex-col justify-start items-center w-full">
        <div class="max-w-[780px] w-full mx-8">
            <div>
                <h1 class="text-4xl text-slate-300">{data.blog.title}</h1>
                <span class="text-md italic">
                    {#if data.blog.unlisted}
                        <span class="text-yellow-200">Unlisted Post</span> -
                    {/if}
                    Published {formatTime(data.blog.created)}
                    {#if data.blog.updated !== data.blog.created}
                        - Updated {formatTime(data.blog.updated)}
                    {/if}
                </span>
            </div>
        </div>
        <article class="max-w-[780px] w-full my-4 p-6 bg-slate-900 text-slate-300 shadow-lg">
            {@html data.blog.md}
        </article>
        <span class="text-center">Thanks for reading 👋</span>
    </main>
{:else}
    {data.blog.error}
{/if}