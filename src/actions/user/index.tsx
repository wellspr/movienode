"use server";

import * as db from "@/actions/db";
import { deleteSessionCookie, getSessionCookie } from "../cookies";

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
    const sessionCookie = await getSessionCookie();

    if (sessionCookie) {
        const session = db.getSession(sessionCookie.id);
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

        const session = await db.createSession(sessionData);
        
        return session;
    }

    return null;
};

export const destroySession = async () => {

    const logoutURL = "https://api.themoviedb.org/3/authentication/session";

    const session = await getAuthenticationDetails();

    if (session) {
        const { id, sessionId } = session;

        await fetch(logoutURL, {
            method: "DELETE",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
            body: JSON.stringify({ 'session_id': sessionId }),
        });

        await db.deleteSession(id);

        await deleteSessionCookie();
    }
};