<script lang="ts">
    import Input from "$lib/components/Input.svelte";
    import { PUBLIC_API_URL } from "$env/static/public";
    import type { User } from "$lib/types";

    let user: User = $state({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: new Date(),
    });

    const handleSubmit = async (event: SubmitEvent) => {
        event.preventDefault();

        console.log($state.snapshot(user))
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

        <button class="px-8 py-2 w-full cursor-pointer text-white text-base font-semibold bg-blue-400 rounded-xl"
                type="submit">
            Submit
        </button>
    </form>
</div>
