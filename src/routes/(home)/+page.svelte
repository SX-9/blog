<script lang="ts">
    import { goto } from '$app/navigation';
    import pb, { formatTime } from '$lib';
    import type { RecordModel } from 'pocketbase';
    import { onMount } from 'svelte';

    let blogs: Promise<RecordModel[]> = new Promise(() => []);

    onMount(() => {
        blogs = pb.collection('blogs').getFullList({
            sort: '-created',
            perPage: 8,
        });
    });
</script>

<svelte:head>
    <title>satr14's blog</title>
</svelte:head>

{#await blogs}
    <p>loading...</p>
{:then res}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each res as post}
            <div class="group">
                <button on:click={() => goto('/post/'+post.id)} class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto w-full gap-4">
                    <img
                        src={pb.files.getUrl(post, post.thumbnail)}
                        alt={post.thumbnail}
                        class="absolute inset-0 h-full w-full object-cover transition-all opacity-30 group-hover:opacity-70 group-hover:scale-150"
                    />
                    <div class="absolute inset-0 h-full w-full object-cover p-4 bg-gradient-to-tr from-slate-900 to-transparent text-white">
                        <div class="flex flex-col justify-end items-start h-full text-left">
                            <h2 class="my-0">{post.title}</h2>
                            <p class="my-0">{post.desc}</p>
                        </div>
                    </div>
                </button>
            </div>
        {/each}
    </div>
{:catch error}
    <p>{error.message}</p>
{/await}