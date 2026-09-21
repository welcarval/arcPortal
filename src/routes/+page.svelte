<script lang="ts">
    import Input from "$lib/components/Input.svelte";
    import Label from "$lib/components/Label.svelte";
    import { PUBLIC_API_URL } from "$env/static/public";
    import type { Address, User } from "$lib/types";

    let user: User = $state({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: new Date(),
        addresses: [{
            postalCode: '',
            street: '',
            number: '',
            city: '',
            country: ''
        }]
    });

    const addAddress = () => {
        user.addresses.push({
            postalCode: '',
            street: '',
            number: '',
            city: '',
            country: ''
        });
    }

    const removeAddress = (index: number) => {
        if (user.addresses.length > 1) {
            user.addresses.splice(index, 1);
        }
    }

    const handleSubmit = async (event: SubmitEvent) => {
        event.preventDefault();

        console.log(user)
        const response = await fetch(`${PUBLIC_API_URL}/user`, {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
    };
</script>

<div class="flex items-center justify-center min-h-screen my-20">
    <form class="flex flex-col items-left gap-4" method="post"
          onsubmit={handleSubmit}>
        <div class="flex flex-col w-full gap-4 bg-blue-50 p-8 rounded-md border border-blue-900">
            <h2 class="font-primary text-2xl font-semibold">Basic Info</h2>
            <div class="flex items-center gap-8">
                <div class="flex flex-col">
                    <Label for="first_name">First Name</Label>
                    <Input bind:value={user.firstName} id="first_name" name="first_name" required type="text"/>
                </div>

                <div class="flex flex-col">
                    <Label for="last_name">Last Name</Label>
                    <Input bind:value={user.lastName} id="last_name" name="last_name" required type="text"/>
                </div>
            </div>

            <div class="flex w-full gap-8">
                <div class="flex flex-col">
                    <Label for="email">Email</Label>
                    <Input bind:value={user.email} id="email" name="email" required type="email"/>
                </div>
                <div class="flex flex-col">
                    <Label for="birth_date">Birth Date</Label>
                    <Input bind:value={user.birthDate} id="birth_date" name="birth_date" required type="date"/>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-4 bg-blue-50 p-8 rounded-md border border-blue-900">
            <h2 class="text-2xl font-primary font-semibold">Address</h2>

            {#each user.addresses as address, i}
                <h3 class="font-bold -mb-4">#{i + 1}</h3>
                <div class="flex flex-col w-full gap-4 bg-blue-100 p-4 rounded-md">
                    <div class="flex items-center justify-between gap-8">
                        <div class="flex flex-col">
                            <Label for="street">Street</Label>
                            <Input required id="street" bind:value={address.street} name="street" type="text"/>
                        </div>

                        <div class="flex flex-col">
                            <Label for="number">Number</Label>
                            <Input required id="number" bind:value={address.number} name="number" type="number"/>
                        </div>

                        <div class="flex flex-col">
                            <Label for="postalCode">postal Code</Label>
                            <Input required id="postalCode" bind:value={address.postalCode} name="postalCode"
                                   type="text"/>
                        </div>
                    </div>

                    <div class="flex w-full gap-8">
                        <div class="flex flex-col">
                            <Label for="city">City</Label>
                            <Input required id="city" bind:value={address.city} name="city" type="text"/>
                        </div>
                        <div class="flex flex-col">
                            <Label for="country">Country</Label>
                            <Input required id="country" bind:value={address.country} name="country" type="text"/>
                        </div>
                    </div>
                    <button type="button" onclick={() => removeAddress(i)}
                            class="px-4 {user.addresses.length > 1 ? '': 'hidden'} p-1 hover:bg-red-200 cursor-pointer rounded-xl text-sm font-semibold text-red-500 w-fit">
                        remove
                    </button>
                </div>
            {/each}

            <button type="button" onclick={addAddress}
                    class="px-4 py-1.5 font-semibold cursor-pointer text-sm font-primary border-2 text-blue-500 border-blue-500 rounded-xl w-fit">
                + Add
            </button>
        </div>

        <button class="px-8 py-2 w-full cursor-pointer text-white text-base font-semibold bg-blue-400 rounded-xl"
                type="submit">
            Submit
        </button>
    </form>
</div>
