<script lang="ts">
    import { formatTime } from '$lib';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<svelte:head>
    <title>satr14's blog archive</title>
</svelte:head>

<ul>
    {#each data.blogs as post}
        <li>{formatTime(post.created)} - <a href={'/post/'+post.id}>{post.title}</a></li>
    {/each}
</ul>