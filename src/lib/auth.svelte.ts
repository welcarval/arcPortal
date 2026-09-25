import { User, UserManager, WebStorageStateStore } from "oidc-client-ts";

const userManager: UserManager = new UserManager({
    authority: 'http://localhost:8180/realms/AccountManagementRealm',
    client_id: 'arc-portal',
    redirect_uri: 'http://localhost:5173/auth/callback',
    response_type: 'code',
    scope: 'openid profile email',
    userStore: new WebStorageStateStore({ store: window.sessionStorage })
})

export const authInit = userManager.getUser().then(u => userState = u);

let userState = $state<User | null>(null)

userManager.getUser().then(u => userState = u);

userManager.events.addUserLoaded((u) => { userState = u } );
userManager.events.addUserUnloaded(() => { userState = null });

export const auth = {
    get user() { return userState; },
    get token() { return userState?.access_token || null; },
    get isLoggedIn() { return !!userState; },

    login: () => userManager.signinRedirect(),
    logout: () => userManager.signoutRedirect(),
    handleCallback: () => userManager.signinRedirectCallback()
}