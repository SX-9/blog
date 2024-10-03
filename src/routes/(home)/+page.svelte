<script lang="ts">
    import pb, { authStore } from '$lib';
    import type { RecordModel } from 'pocketbase';

    export let data;

    let blogs: RecordModel[] = data.blogs;
</script>

<svelte:head>
    <title>satr14's blog</title>
</svelte:head>

<main class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {#each blogs as post}
        <button class="group relative isolate flex flex-col justify-end overflow-hidden px-8 pb-8 pt-40 max-w-sm mx-auto w-full gap-4">
            <a href={'/post/'+post.id}>
                <img
                    src={pb.files.getUrl(post, post.thumbnail, { thumb: '320x160' })}
                    alt={post.thumbnail}
                    class="absolute inset-0 h-full w-full object-cover transition-all opacity-30 group-hover:opacity-70"
                />
                <div class="absolute inset-0 h-full w-full object-cover p-4 bg-gradient-to-tr from-slate-900 to-transparent text-white">
                    <div class="flex flex-col justify-end items-start h-full text-left">
                        <h2 class="my-0">{post.title}</h2>
                        <p class="my-0">{post.desc}</p>
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
    Homepage limited to 8 posts, use archive for all posts.
</footer>