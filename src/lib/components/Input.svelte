<script lang="ts">

    let { value = $bindable(), ...restProps } = $props()

</script>

<input
        bind:value
        {...restProps}
        class="rounded-md h-8 text-sm w-full border-gray-400"
>