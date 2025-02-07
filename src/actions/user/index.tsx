"use server";

import * as db from "@/db";

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

        const session = await db.prisma.session.findFirst({
            where: {
                accountId,
                accessToken
            }
        });

        await db.prisma.$disconnect();
        
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

export const createSession = async (accessToken: string) => {

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

    const data = await response.json() as SessionResponse;

    return data;
};