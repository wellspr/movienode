"use server";

import { getLocale } from "next-intl/server";
import { getSession } from "../session";
import { favoriteMovies, favoriteTVShows, watchlistMovies, watchlistTVShows } from "./lists";
import { FavoritePayloadType, WatchListPayloadType } from "./lists/types";
import { Locale } from "@/i18n/types";
import { redirect } from "next/navigation";
import { baseURL } from "@/config";
import { cookies } from "next/headers";

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

export const addFavorite = async (payload: FavoritePayloadType, pathname: string) => {

    const session = await getSession();

    const locale = await getLocale();

    const cookieSession = await cookies();
    cookieSession.set('returningPath', pathname);

    if (!session) {
        return redirect(baseURL() + `/${locale}/auth/login`);
    };

    const { accountId, sessionId } = session;

    const url = `https://api.themoviedb.org/3/account/${accountId}/favorite?session_id=${sessionId}`;

    const options: RequestInit = {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
        body: JSON.stringify(payload)
    };

    const response = await fetch(url, options);

    const data = await response.json();

    return data;
};

export const addToWatchlist = async (payload: WatchListPayloadType, pathname: string) => {

    const session = await getSession();

    const locale = await getLocale();

    const cookieSession = await cookies();
    cookieSession.set('returningPath', pathname);

    if (!session) {
        return redirect(baseURL() + `/${locale}/auth/login`);
    };

    const { accountId, sessionId } = session;

    const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist?session_id=${sessionId}`;

    const options: RequestInit = {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
        body: JSON.stringify(payload)
    };

    const response = await fetch(url, options);

    const data = await response.json();

    return data;
};

export const isItemInWatchList = async (id: number, mediaType: 'movie' | 'tv') => {

    const session = await getSession();

    const locale = await getLocale() as Locale;

    if (!session) return false;

    const { accountId } = session;

    /*  TODO: Take into account that there are many pages;
        There are 20 items max in each page.
    */

    const watchlist = mediaType === 'movie' ?
        await watchlistMovies(accountId, locale) :
        await watchlistTVShows(accountId, locale);

    return watchlist.results
        .filter(result => result.id === id)
        .map(result => result.id)
        .includes(id);
};

export const isItemInFavorites = async (id: number, mediaType: 'movie' | 'tv') => {

    const session = await getSession();

    const locale = await getLocale() as Locale;

    if (!session) return false;

    const { accountId } = session;

    /*  TODO: Take into account that there are many pages;
        There are 20 items max in each page.
    */

    const favorites = mediaType === 'movie' ?
        await favoriteMovies(accountId, locale) :
        await favoriteTVShows(accountId, locale);

    return favorites.results
        .filter(result => result.id === id)
        .map(result => result.id)
        .includes(id);
};
