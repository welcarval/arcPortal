<script lang="ts">
    import Input from "$lib/components/Input.svelte";
    import Label from "$lib/components/Label.svelte";
    import { PUBLIC_API_URL, PUBLIC_VIACEP_URL } from "$env/static/public";
    import type { Address, User, ViaCepResult } from "$lib/types";

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

    const handleCep = async (address: Address) => {
        const response = await fetch(`${PUBLIC_VIACEP_URL}/${address.postalCode.replace(/\D/g, '')}/json`, {
            method: "GET",
            headers: { 'content-type': 'application/json' },
        })

        if (response.ok) {
            let result: ViaCepResult = await response.json();
            address.city = result.localidade
            address.street = result.logradouro
            address.country = "Brasil"
        }
    }


</script>

<div class="flex items-center justify-center min-h-screen my-20">
    <form class="flex flex-col items-left gap-4" method="post"
          onsubmit={handleSubmit}>
        <div class="flex flex-col w-full gap-4 p-8 rounded-2xl border border-gray-300">
            <h2 class="font-primary text-blue-800 text-2xl font-semibold">Basic Info</h2>
            <div class="flex flex-col gap-4 w-80">
                    <Input bind:value={user.firstName} name="first_name" label="First Name"
                           placeholder="Your First Name" required type="text"/>
                    <Input bind:value={user.lastName} name="last_name" label="Last Name" placeholder="Your Last Name"
                           required type="text"/>

                    <Input bind:value={user.email} name="email" label="Email" placeholder="Your Email" required
                           type="email"/>
                    <Input bind:value={user.birthDate} name="birth_date" label="Birth Date"
                           placeholder="Your Birth Date" required type="date"/>
            </div>
        </div>

        <div class="flex flex-col gap-4 bg-blue-50 p-8 rounded-md border border-blue-900">
            <h2 class="text-2xl font-primary font-semibold">Address</h2>

            {#each user.addresses as address, i}
                <h3 class="font-bold -mb-4">#{i + 1}</h3>
                <div class="flex flex-col w-full gap-4 bg-blue-100 p-4 rounded-md">
                    <div class="flex items-center justify-between gap-8">
                        <div class="flex flex-col">
                            <Input required onblur={() => handleCep(address)} bind:value={address.postalCode}
                                   name="postalCode" label="Postal Code" placeholder="Enter Your Postal Code"
                                   type="text"/>
                        </div>

                        <div class="flex flex-col">
                            <Input required bind:value={address.street} name="street" label="Street"
                                   placeholder="Your Street" type="text"/>
                        </div>

                        <div class="flex flex-col">
                            <Input required bind:value={address.number} name="number" label="Number"
                                   placeholder="Your House Number" type="number"/>
                        </div>

                    </div>

                    <div class="flex w-full gap-8">
                        <div class="flex flex-col">
                            <Input required bind:value={address.city} name="city" label="City" placeholder="Your City"
                                   type="text"/>
                        </div>
                        <div class="flex flex-col">
                            <Input required bind:value={address.country} name="country" label="Country"
                                   placeholder="Your Country" type="text"/>
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
