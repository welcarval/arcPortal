<script lang="ts">
    import { auth } from "$lib/auth.svelte";
</script>

<h1> clique para fazer login</h1>
<button onclick={() => auth.login()}>Login</button>
