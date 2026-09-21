<script lang="ts">
    let { required, id, value = $bindable(), name, type }: {
        required: boolean,
        id: string,
        value: string,
        name: string,
        type: string
    } = $props();
</script>
<input {required} {id} bind:value {name} {type} class="rounded-md h-8 text-sm w-full border-gray-400"/>
