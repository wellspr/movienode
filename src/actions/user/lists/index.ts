"use server";

import { Locale } from "@/i18n/types";
import { FavoriteMoviesType, FavoriteTVShowsType, ListsType, RatedMoviesType, RatedTVShowsType, RecommendedMoviesType, RecommendedTVShowsType, WatchlistMoviesType, WatchlistTVShowsType } from "./types";
import { getSession } from "@/actions/session";

const options = (token: string): RequestInit => {
    return {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }
};

const baseURL = "https://api.themoviedb.org/4/account";

export const getLists = async (accountId: string, locale: Locale, page: string = '1') => {

    const url = baseURL + `/${accountId}/lists?page=${page}&language=${locale}`;
    const session = await getSession();

    const response = await fetch(url, {
        ...options(session?.accessToken as string)
    });

    const data = await response.json();

    return data as ListsType;
};

export const favoriteMovies = async (accountId: string, locale: Locale, page: string = '1') => {

    const url = baseURL + `/${accountId}/movie/favorites?page=${page}&language=${locale}&sort_by=created_at.desc`;

    const session = await getSession();

    const response = await fetch(url, {
        ...options(session?.accessToken as string)
    });

    const data = await response.json();

    return data as FavoriteMoviesType;
};

export const favoriteTVShows = async (accountId: string, locale: Locale, page: string = '1') => {

    const url = baseURL + `/${accountId}/tv/favorites?page=${page}&language=${locale}&sort_by=created_at.desc`;

    const session = await getSession();

    const response = await fetch(url, {
        ...options(session?.accessToken as string)
    });

    const data = await response.json();

    return data as FavoriteTVShowsType;
};

export const ratedMovies = async (accountId: string, locale: Locale, page: string = '1') => {

    const url = baseURL + `/${accountId}/movie/rated?page=${page}&language=${locale}`;

    const session = await getSession();

    const response = await fetch(url, {
        ...options(session?.accessToken as string)
    });

    const data = await response.json();

    return data as RatedMoviesType;
};

export const ratedTVShows = async (accountId: string, locale: Locale, page: string = '1') => {

    const url = baseURL + `/${accountId}/tv/rated?page=${page}&language=${locale}`;

    const session = await getSession();

    const response = await fetch(url, {
        ...options(session?.accessToken as string)
    });

    const data = await response.json();

    return data as RatedTVShowsType;
};

export const recommendedMovies = async (accountId: string, locale: Locale, page: string = '1') => {

    const url = baseURL + `/${accountId}/movie/recommendations?page=${page}&language=${locale}`;

    const session = await getSession();

    const response = await fetch(url, {
        ...options(session?.accessToken as string)
    });

    const data = await response.json();

    return data as RecommendedMoviesType;
};

export const recommendedTVShows = async (accountId: string, locale: Locale, page: string = '1') => {

    const url = baseURL + `/${accountId}/tv/recommendations?page=${page}&language=${locale}`;

    const session = await getSession();

    const response = await fetch(url, {
        ...options(session?.accessToken as string)
    });

    const data = await response.json();

    return data as RecommendedTVShowsType;
};

export const watchlistMovies = async (accountId: string, locale: Locale, page: string = '1') => {

    const url = baseURL + `/${accountId}/movie/watchlist?page=${page}&language=${locale}&sort_by=created_at.desc`;

    const session = await getSession();

    const response = await fetch(url, {
        ...options(session?.accessToken as string)
    });

    const data = await response.json();

    return data as WatchlistMoviesType;
};

export const watchlistTVShows = async (accountId: string, locale: Locale, page: string = '1') => {

    const url = baseURL + `/${accountId}/tv/watchlist?page=${page}&language=${locale}&sort_by=created_at.desc`;

    const session = await getSession();

    const response = await fetch(url, {
        ...options(session?.accessToken as string)
    });

    const data = await response.json();

    return data as WatchlistTVShowsType;
};
