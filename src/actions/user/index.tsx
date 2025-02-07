"use server";

import * as db from "@/actions/db";
import { cookies } from "next/headers";

type SessionResponse = {
    success: boolean
    session_id: string
}

export type UserDetails = {
    avatar: {
        gravatar: {
            hash: string
        }
    }
    tmdb: {
        avatar_path: string
    }
    id: number
    iso_639_1: string
    iso_3166_1: string
    name: string
    include_adult: boolean
    username: string
}

export const getAuthenticationDetails = async () => {
    const cookieStore = await cookies();
    const accountId = cookieStore.get('accountId')?.value;
    const accessToken = cookieStore.get('accessToken')?.value;

    if (accountId && accessToken) {
        const session = db.getSession(accountId, accessToken);
        return session;
    }

    return null;
};

export const getUserDetails = async (accountId: string, sessionId: string) => {

    const url = `https://api.themoviedb.org/3/account/${accountId}?session_id=${sessionId}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data as UserDetails;
    }

    return null;
};

export const getGravatarDetails = async (hash: string) => {
    const response = await fetch(`https://gravatar.com/${hash}.json`);

    if (response.ok) {
        const data = await response.json();
        return data;
    }

    return null;
};

export const createSession = async (accessToken: string, accountId: string) => {

    const url = `https://api.themoviedb.org/3/authentication/session/convert/4`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
        body: JSON.stringify({ 'access_token': accessToken }),
    });

    if (response.ok) {
        const data = await response.json() as SessionResponse;

        const sessionData = {
            accessToken,
            accountId,
            sessionId: data.session_id,
        };

        const newSession = await db.createSession(sessionData);

        console.log("New Session: ", newSession);

        return data;
    }

    return null;
};

export const destroySession = async () => {

    const logoutURL = "https://api.themoviedb.org/3/authentication/session";

    const session = await getAuthenticationDetails();

    if (session) {
        const { sessionId, accessToken } = session;

        await fetch(logoutURL, {
            method: "DELETE",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
            body: JSON.stringify({ 'session_id': sessionId }),
        });

        await db.deleteSession(sessionId, accessToken);

        const cookieStore = await cookies();
        cookieStore.delete('accessToken');
        cookieStore.delete('accountId');
    }
};