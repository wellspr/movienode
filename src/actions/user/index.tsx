"use server";

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

export const getUserDetails = async (accountId: number, sessionId: string) => {

    const url = `https://api.themoviedb.org/3/account/${accountId}?session_id=${sessionId}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
    });

    const data = await response.json() as UserDetails;

    return data as UserDetails;
}

export const getGravatarDetails = async (hash: string) => {
    const response = await fetch(`https://gravatar.com/${hash}.json`);
    const data = await response.json();
    return data;
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

    console.log(data);

    return data;
};