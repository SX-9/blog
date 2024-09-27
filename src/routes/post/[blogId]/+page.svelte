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
    <img class="opacity-50 -z-20 absolute top-0 left-0 right-0 max-h-[50vh] min-h-[40vh] w-full overflow-hidden" src={pb.files.getUrl(data.blog, data.blog.thumbnail)} alt={data.blog.thumbnail}>
    <div class="w-full h-full bg-gradient-to-t from-slate-950 to-transparent absolute -z-10 top-0 left-0 right-0 max-h-[50vh] min-h-[40vh] overflow-hidden"></div>
    <main class="flex flex-col justify-start items-center w-full">
        <div class="max-w-[780px] w-full mx-8">
            <div>
                <h1 class="text-4xl text-slate-300 my-0">{data.blog.title}</h1>
                <p class="my-0 italic">{data.blog.desc}</p>
            </div>
        </div>
        <article class="max-w-[780px] w-full shadow-lg">
            <span class="text-md italic">
                {#if data.blog.unlisted}
                    <span class="text-yellow-200">Unlisted Post</span> -
                {/if}
                Published {formatTime(data.blog.created)}
                {#if data.blog.updated !== data.blog.created}
                    - Updated {formatTime(data.blog.updated)}
                {/if}
            </span>
            <hr>
            {@html data.blog.md}
        </article>
        <span class="text-center italic">Thanks for reading 👋</span>
    </main>
{:else}
    {data.blog.error}
{/if}