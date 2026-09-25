import { auth, authInit } from "$lib/auth.svelte";
import { redirect } from "@sveltejs/kit";

export const load = async ({ url }) => {

    await authInit;

    const isPublic = url.pathname.startsWith("/auth");

    if (!auth.isLoggedIn && !isPublic) {
        throw redirect(307, "/auth/login")
    }

    return {};
}
export const ssr = false