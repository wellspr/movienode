import { Locale } from "@/i18n/types";
import { FavoriteMoviesType, FavoriteTVShowsType, ListsType, RatedMoviesType, RatedTVShowsType, RecommendedMoviesType, RecommendedTVShowsType, WatchlistMoviesType, WatchlistTVShowsType } from "./types";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
};

const baseURL = "https://api.themoviedb.org/4/account";

export const getLists = async (accountId: string, locale: Locale, page?: string) => {

    const url = (page?: string) => {
        if (!page) {
            page = '1';
        }

        return baseURL + `/${accountId}/lists?page=${page}&language=${locale}`;
    };

    const response = await fetch(url(page), {
        cache: 'no-cache',
        ...options
    });

    const data = await response.json();

    return data as ListsType;
};

export const favoriteMovies = async (accountId: string, locale: Locale, page?: string) => {

    const url = baseURL + `/${accountId}/movie/favorites?page=${page}&language=${locale}`;

    const response = await fetch(url, {
        cache: 'no-cache',
        ...options
    });

    const data = await response.json();

    return data as FavoriteMoviesType;
};

export const favoriteTVShows = async (accountId: string, locale: Locale, page?: string) => {

    const url = baseURL + `/${accountId}/tv/favorites?page=${page}&language=${locale}`;

    const response = await fetch(url, {
        cache: 'no-cache',
        ...options
    });

    const data = await response.json();

    return data as FavoriteTVShowsType;
};

export const ratedMovies = async (accountId: string, locale: Locale, page?: string) => {

    const url = baseURL + `/${accountId}/movie/rated?page=${page}&language=${locale}`;

    const response = await fetch(url, {
        cache: 'no-cache',
        ...options
    });

    const data = await response.json();

    return data as RatedMoviesType;
};

export const ratedTVShows = async (accountId: string, locale: Locale, page?: string) => {

    const url = baseURL + `/${accountId}/tv/rated?page=${page}&language=${locale}`;

    const response = await fetch(url, {
        cache: 'no-cache',
        ...options
    });

    const data = await response.json();

    return data as RatedTVShowsType;
};

export const recommendedMovies = async (accountId: string, locale: Locale, page?: string) => {

    const url = baseURL + `/${accountId}/movie/recommendations?page=${page}&language=${locale}`;

    const response = await fetch(url, {
        cache: 'no-cache',
        ...options
    });

    const data = await response.json();

    console.log(data);

    return data as RecommendedMoviesType;
};

export const recommendedTVShows = async (accountId: string, locale: Locale, page?: string) => {

    const url = baseURL + `/${accountId}/tv/recommendations?page=${page}&language=${locale}`;

    const response = await fetch(url, {
        cache: 'no-cache',
        ...options
    });

    const data = await response.json();

    return data as RecommendedTVShowsType;
};

export const watchlistMovies = async (accountId: string, locale: Locale, page?: string) => {

    const url = baseURL + `/${accountId}/movie/watchlist?page=${page}&language=${locale}`;

    const response = await fetch(url, {
        cache: 'no-cache',
        ...options
    });

    const data = await response.json();

    return data as WatchlistMoviesType;
};

export const watchlistTVShows = async (accountId: string, locale: Locale, page?: string) => {

    const url = baseURL + `/${accountId}/tv/watchlist?page=${page}&language=${locale}`;

    const response = await fetch(url, {
        cache: 'no-cache',
        ...options
    });

    const data = await response.json();

    return data as WatchlistTVShowsType;
};
