type SessionResponse = {
    success: boolean
    session_id: string
}

export type UserAgent = Awaited<ReturnType<typeof userAgent>> ;

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

import { Session } from "@prisma/client";
import { userAgent } from "next/server";
import { deleteSessionCookie, getSessionCookie, SessionCookie, setSessionCookie } from "./cookies";
import * as db from "@/actions/db";
import { sessionMaxAge } from "@/config";

export const createSession = async ({
    accessToken,
    accountId,
    userAgent,
}: {
    accessToken: string, 
    accountId: string,
    userAgent: UserAgent
}) => {

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

    if (!response.ok) {
        return null;
    }

    const data = await response.json() as SessionResponse;

    if (!data.success) {
        return null;
    }

    const sessionData: Omit<Session, "id"> = {
        accessToken,
        accountId,
        sessionId: data.session_id,
        userAgentString: userAgent.ua,
        date: new Date(Date.now()),
        expireDate: new Date(Date.now() + sessionMaxAge),
        sessionMaxAge: sessionMaxAge,
    };

    const session = await db.createSession(sessionData);

    const sessionCookie: SessionCookie = { id: session.id, userAgentString: userAgent.ua };
    await setSessionCookie(sessionCookie);

    return session;
};

export const getSession = async () => {
    const sessionCookie = await getSessionCookie();

    if (sessionCookie) {
        const session = db.getSession(sessionCookie.id);
        return session;
    }

    return null;
};

export const destroySession = async () => {

    const logoutURL = "https://api.themoviedb.org/3/authentication/session";

    const session = await getSession();

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