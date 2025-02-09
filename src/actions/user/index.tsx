"use server";

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


export const getUserDetails = async (accountId: string, sessionId: string) => {

    const url = `https://api.themoviedb.org/3/account/${accountId}?session_id=${sessionId}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
    });

    if (!response.ok) {
        return null;
    }

    const data = await response.json();
    return data as UserDetails;
};

export const getGravatarDetails = async (hash: string) => {
    const response = await fetch(`https://gravatar.com/${hash}.json`);

    if (!response.ok) {
        return null;
    };

    const data = await response.json();
    return data;
};