"use server";

import { cookies } from "next/headers";
import { decrypt, encrypt } from "../crypto";
import { UserAgent } from "..";
import { sessionMaxAge } from "@/config";

export type SessionCookie = {
    id: string,
    userAgentString: UserAgent['ua'],
}

/* Session cookie functions */
export const setSessionCookie = async (data: SessionCookie) => {
    const cookieStore = await cookies();
    const expiresAt = new Date(Date.now() + sessionMaxAge);
    const encryptedData = await encrypt(data);
    cookieStore.set("sessionCookie", encryptedData, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    });
};

export const getSessionCookie = async () => {
    const cookieStore = await cookies();
    const encryptedData = cookieStore.get("sessionCookie")?.value;
    const data = await decrypt(encryptedData);
    if (data) {
        return data as SessionCookie;
    }
};

export const deleteSessionCookie = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("sessionCookie");
};