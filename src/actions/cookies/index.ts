"use server";

import { cookies } from "next/headers";

type SessionCookie = {
    id: string
}

/* Session cookie functions */
export const setSessionCookie = async (data: SessionCookie) => {
    const cookieStore = await cookies();
    cookieStore.set("sessionCookie", JSON.stringify(data));
};

export const getSessionCookie = async () => {
    const cookieStore = await cookies();
    const value = cookieStore.get("sessionCookie")?.value;
    if (value) {
        const data = JSON.parse(value);
        return data as SessionCookie;
    }
};

export const deleteSessionCookie = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("sessionCookie");
};

/* Request token functions */
export const setRequestToken = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set("token", token);
};

export const getRequestToken = async () => {
    const cookieStore = await cookies();
    const requestToken = cookieStore.get("token")?.value;
    cookieStore.delete('token');
    return requestToken;
};