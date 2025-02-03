import localforage from "localforage";

export const authStore = localforage.createInstance({
    name: "AuthDB"
});

export type UserData = {
    account_id: number
    access_token: string
}

export type sessionId = string