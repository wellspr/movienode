"use server";

import { Locale } from "@/i18n/types";
import {
    FavoriteMoviesType,
    FavoriteTVShowsType,
    ListsType,
    RatedMoviesType,
    RatedTVShowsType,
    RecommendedMoviesType,
    RecommendedTVShowsType,
    WatchlistMoviesType,
    WatchlistTVShowsType,
} from "./types";
import { getSession } from "@/actions/session";

const options = (token: string): RequestInit => {
    return {
        method: "GET",
        cache: "no-cache",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
};

const baseURL = "https://api.themoviedb.org/4/account";

const createQueryString = (queryParams: { key: string; value: string }[]) => {
    const query = new URLSearchParams();
    queryParams.forEach((entry) => {
        query.set(entry.key, entry.value);
    });

    return query.toString();
};

export const getLists = async (locale: Locale, page: string = "1") => {
    try {
        const session = await getSession();

        if (!session?.accessToken || !session?.accountId) {
            throw new Error("Invalid session");
        }

        const { accountId, accessToken } = session;

        const query = createQueryString([
            { key: "page", value: page },
            { key: "language", value: locale },
        ]);

        const url = baseURL + `/${accountId}/lists?${query}`;

        const response = await fetch(url, {
            ...options(accessToken),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data as ListsType;

    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const favoriteMovies = async (locale: Locale, page: string = "1") => {
    try {
        const session = await getSession();

        if (!session?.accessToken || !session?.accountId) {
            throw new Error("Invalid session");
        }

        const { accessToken, accountId } = session;

        const query = createQueryString([
            { key: "page", value: page.toString() },
            { key: "language", value: locale },
            { key: "sort_by", value: "created_at.desc" },
        ]);

        const url = baseURL + `/${accountId}/movie/favorites?${query}`;

        const response = await fetch(url, {
            ...options(accessToken as string),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data as FavoriteMoviesType;

    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const favoriteTVShows = async (locale: Locale, page: string = "1") => {
    try {
        const session = await getSession();

        if (!session?.accessToken || !session?.accountId) {
            throw new Error("Invalid session");
        }

        const { accountId, accessToken } = session;

        const query = createQueryString([
            { key: "page", value: page.toString() },
            { key: "language", value: locale },
            { key: "sort_by", value: "created_at.desc" },
        ]);

        const url = baseURL + `/${accountId}/tv/favorites?${query}`;

        const response = await fetch(url, {
            ...options(accessToken),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data as FavoriteTVShowsType;

    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const ratedMovies = async (
    accountId: string,
    locale: Locale,
    page: string = "1",
) => {
    
    try {
        const session = await getSession();

        if (!session?.accessToken || !session?.accountId) {
            throw new Error("Invalid session");
        }

        const { accountId, accessToken } = session;
   
        const query = createQueryString([
            { key: "page", value: page },
            { key: "language", value: locale },
        ]);

        const url = baseURL + `/${accountId}/movie/rated?${query}}`;
        
        const response = await fetch(url, {
            ...options(accessToken as string),
        });
   
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data as RatedMoviesType;

    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const ratedTVShows = async (
    accountId: string,
    locale: Locale,
    page: string = "1",
) => {
    
    try {

        const session = await getSession();

        if (!session?.accessToken || !session?.accountId) {
            throw new Error("Invalid session");
        }

        const { accountId, accessToken } = session;
        
        const query = createQueryString([
            { key: "page", value: page },
            { key: "language", value: locale },
        ]);

        const url = baseURL + `/${accountId}/tv/rated?${query}`;
        
        const response = await fetch(url, {
            ...options(accessToken as string),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();    
        return data as RatedTVShowsType;

    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const recommendedMovies = async (
    locale: Locale,
    page: string = "1",
) => {
    
    try {

        const session = await getSession();

        if (!session?.accessToken || !session?.accountId) {
            throw new Error("Invalid session");
        }

        const { accountId, accessToken } = session;

        const query = createQueryString([
            { key: "page", value: page },
            { key: "language", value: locale },
        ]);
    
        const url = baseURL + `/${accountId}/movie/recommendations?${query}`;
        
        const response = await fetch(url, {
            ...options(accessToken as string),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data as RecommendedMoviesType;

    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const recommendedTVShows = async (
    accountId: string,
    locale: Locale,
    page: string = "1",
) => {
    
    try {

        const session = await getSession();
    
        if (!session?.accessToken || !session?.accountId) {
            throw new Error("Invalid session");
        }

        const { accountId, accessToken } = session;

        const query = createQueryString([
            { key: "page", value: page },
            { key: "language", value: locale },
        ]);

        const url = baseURL + `/${accountId}/tv/recommendations?${query}`;
        
        const response = await fetch(url, {
            ...options(accessToken as string),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        return data as RecommendedTVShowsType;

    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const watchlistMovies = async (
    locale: Locale,
    page: string = "1",
) => {

    try {
        
        const session = await getSession();

        if (!session?.accessToken || !session?.accountId) {
            throw new Error("Invalid session");
        }

        const { accessToken, accountId } = session;

        const query = createQueryString([
            { key: "page", value: page },
            { key: "language", value: locale },
            { key: "sort_by", value: "created_at.desc" },
        ]);

        const url = baseURL + `/${accountId}/movie/watchlist?${query}`;
        
        const response = await fetch(url, {
            ...options(accessToken as string),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        return data as WatchlistMoviesType;

    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
    
};

export const watchlistTVShows = async (
    locale: Locale,
    page: string = "1",
) => {
    
    try {
        const session = await getSession();

        if (!session?.accessToken || !session?.accountId) {
            throw new Error("Invalid session");
        }

        const { accessToken, accountId } = session;

        const query = createQueryString([
            { key: "page", value: page },
            { key: "language", value: locale },
            { key: "sort_by", value: "created_at.desc" },
        ]);
        
        const url = baseURL + `/${accountId}/tv/watchlist?${query}`;
    
        const response = await fetch(url, {
            ...options(accessToken as string),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        return data as WatchlistTVShowsType;

    } catch (error) {

    }
};
