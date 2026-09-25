import { auth } from "$lib/auth.svelte";
import { redirect } from "@sveltejs/kit";

export const load = async () => {
    try {
        await auth.handleCallback()
        console.log("Login efetuado com sucesso");
    } catch (error) {
        console.error("Erro ao processar o callback do Keycloak:", error);
        throw redirect(307, '/?error=login_failed');
    }

    throw redirect(303, '/');
}