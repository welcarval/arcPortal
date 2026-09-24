<script lang="ts">

    let { value = $bindable(), label, placeholder, ...restProps } = $props()
    const id = $props.id()

</script>

<div class="flex flex-col gap-1 relative border-1 rounded-md py-2 px-3 bg-white border-gray-300 has-focus:border-blue-500 has-focus:border-2">
    <label for={id} class="text-xs font-primary text-gray-500">
        {label}
    </label>
    <input {id}
           class="bg-transparent text-sm border-0 placeholder:text-gray-400 focus:outline-none focus:ring-0 p-0"
           type="text" name="label" {placeholder}
           bind:value
           {...restProps}
    />
</div>