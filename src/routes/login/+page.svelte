<script lang="ts">
  import { goto } from '$app/navigation';
  import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
    import pb from '$lib';

    let email = '';
    let password = '';
    let busy = false;

    function login(e: Event) {
        e.preventDefault();
        pb.admins.authWithPassword(email, password)
            .catch(err => {
                console.error(err);
                alert('login failed');
            })
            .then(() => {
                busy = false;
            })
            .finally(() => {
                busy = false;
                goto('/');
            });
    }
</script>

<svelte:head>
    <title>login - satr14's blog</title>
</svelte:head>

<main class="flex flex-col justify-center items-center">
    <form on:submit={login}>
        <span>admin login</span>
        <input type="text" id="email" bind:value={email} required disabled={busy} placeholder="email">
        <input type="password" id="password" bind:value={password} required disabled={busy} placeholder="password">
        <button type="submit" disabled={busy}>Login</button>
        <a href={PUBLIC_POCKETBASE_URL+'/_'}>pocketbase dashboard</a>
    </form>
</main>