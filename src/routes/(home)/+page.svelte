<script lang="ts">
    import pb, { authStore } from '$lib';
    import type { RecordModel } from 'pocketbase';
    import { onMount } from 'svelte';

    let blogs: RecordModel[] = [];
    let spotlight: RecordModel | null = null;

    onMount(async () => {
        const res = (await pb.collection('blogs').getFullList({
            sort: '-created',
            perPage: 9,
        })).slice(0, 9);

        blogs = res.slice(1, 9);
        spotlight = res[0];
    });
</script>

<svelte:head>
    <title>satr14's blog</title>
</svelte:head>

{#if spotlight}
    <button class="group relative isolate flex flex-col justify-end overflow-hidden px-8 pb-8 pt-40 w-full gap-4 bg-transparent shadow-lg border border-slate-900 my-4">
        <a href={'/post/'+spotlight.id}>
            {#if spotlight?.thumbnail}
                <img
                    src={pb.files.getURL(spotlight, spotlight.thumbnail, { thumb: '' })}
                    alt={spotlight.thumbnail}
                    class="absolute inset-0 h-full w-full object-cover transition-all dark:opacity-30 opacity-90 group-hover:opacity-100"
                />
            {:else}
                <div class="absolute inset-0 h-full w-full object-cover transition-all dark:opacity-30 opacity-90 group-hover:opacity-70 bg-slate-500"></div>
            {/if}
            <div class="absolute inset-0 h-full w-full object-cover p-4 bg-gradient-to-tr to-transparent from-slate-900 text-slate-300">
                <div class="flex flex-col justify-end items-start h-full text-left">
                    <h2 class="my-0 text-ellipsis w-full whitespace-nowrap max-w-full overflow-hidden">{spotlight.title}</h2>
                    <p class="my-0 text-ellipsis w-full whitespace-nowrap max-w-full overflow-hidden">{spotlight.desc}</p>
                </div>
            </div>
        </a>
    </button>
{/if}
<main class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {#each blogs as post}
        <button class="group relative isolate flex flex-col justify-end overflow-hidden px-8 pb-8 pt-40 w-full gap-4 bg-transparent shadow-lg border border-slate-900">
            <a href={'/post/'+post.id}>
                {#if post?.thumbnail}
                    <img
                        src={pb.files.getURL(post, post.thumbnail, { thumb: '320x160' })}
                        alt={post.thumbnail}
                        class="absolute inset-0 h-full w-full object-cover transition-all dark:opacity-30 opacity-90 group-hover:opacity-100"
                    />
                {:else}
                    <div class="absolute inset-0 h-full w-full object-cover transition-all dark:opacity-30 opacity-90 group-hover:opacity-70 bg-slate-500"></div>
                {/if}
                <div class="absolute inset-0 h-full w-full object-cover p-4 bg-gradient-to-tr to-transparent from-slate-900 text-slate-300">
                    <div class="flex flex-col justify-end items-start h-full text-left">
                        <h2 class="my-0 text-ellipsis w-full whitespace-nowrap max-w-full overflow-hidden">{post.title}</h2>
                        <p class="my-0 text-ellipsis w-full whitespace-nowrap max-w-full overflow-hidden">{post.desc}</p>
                    </div>
                </div>
            </a>
        </button>
    {/each}
</main>
<footer>
    {#if $authStore.isValid}
        Logged in as
        {$authStore.model?.email}
        -
    {/if}
    Homepage limited to 9 posts, use archive for all posts.
</footer>