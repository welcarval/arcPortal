<script lang="ts">
    import type { Snippet } from "svelte";

    let { children, for: labelFor = $bindable() }: { children: Snippet, for: string } = $props();
</script>

<!--<label for={labelFor} class="font-primary font-semibold text-base text-primary">{@render children()}</label>-->