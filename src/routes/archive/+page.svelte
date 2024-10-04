<script lang="ts">
    import { formatTime } from '$lib';
    import pb from '$lib';
    import type { RecordModel } from 'pocketbase';
    import { onMount } from 'svelte';

    let blogs = [] as RecordModel[];
    let query = '';

    async function search(e: Event) {
        e.preventDefault();
        blogs = await pb.collection('blogs').getFullList({
            sort: '-created',
            fields: 'id,title,desc,created',
            filter: query ? `title ~ '${query}' || desc ~ '${query}'` : '',
        });
    }

    onMount(() => {
        search(new Event('submit'));
    });
</script>

<svelte:head>
    <title>satr14's blog archive</title>
</svelte:head>

<form on:submit={search}>
    <input bind:value={query} type="search" placeholder="search...">
</form>
<table>
    <colgroup>
        <col style="width: min-content">
        <col style="width: min-content">
        <col style="width: auto">
    </colgroup>
    <thead>
        <tr>
            <th>created</th>
            <th>title</th>
            <th>desc</th>
        </tr>
    </thead>
    <tbody>
        {#each blogs as post}
            <tr>
                <td>{formatTime(post.created)}</td>
                <td><a href={'/post/'+post.id}>{post.title}</a></td>
                <td>{post.desc}</td>
            </tr>
        {/each}
    </tbody>
</table>