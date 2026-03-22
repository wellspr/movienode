"use server";

import { regions } from "@/i18n/config";
import { Locale } from "@/i18n/types";

import {
    MovieCategoryType,
    MovieCast,
    MovieCrew,
    MovieDetailsType,
    GenresType,
    GenreType,
    MovieRecommendationsType,
    SimilarMoviesType,
    ReleaseDatesType,
    WatchProvidersType,
    TrendingMoviesType,
} from "@/types";

const options: RequestInit = {
    method: "GET",
    cache: "force-cache",
    next: { revalidate: 3600 },
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
};

const baseURL = `https://api.themoviedb.org/3`;

const createQueryString = (queryParams: { key: string; value: string }[]) => {
    const query = new URLSearchParams();
    queryParams.forEach((entry) => {
        query.set(entry.key, entry.value);
    });

    return query.toString();
};

/* Movies */
export const getMovies = async (
    locale: Locale,
    category: MovieCategoryType,
    page: string = "1",
) => {
    try {
        const query = createQueryString([
            { key: "page", value: page },
            { key: "language", value: locale },
            { key: "region", value: regions[locale] },
        ]);

        const url = `${baseURL}/movie/${category}?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { results, total_pages, total_results } = await response.json();

        return {
            results,
            total_pages,
            total_results,
        };
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getMovieDetails = async (locale: Locale, movieId: string) => {
    try {
        const query = createQueryString([
            { key: "language", value: locale },
            { key: "region", value: regions[locale] },
            {
                key: "append_to_response",
                value: "images,videos,release_dates,translations",
            },
            {
                key: "include_image_language",
                value: locale + ",null",
            },
        ]);

        const url = `${baseURL}/movie/${movieId}?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const movieDetails = await response.json();

        return movieDetails as MovieDetailsType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getMovieCredits = async (locale: Locale, movieId: string) => {
    try {
        const query = createQueryString([{ key: "language", value: locale }]);

        const url = `${baseURL}/movie/${movieId}/credits?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const movieCredits = await response.json();

        return movieCredits as { id: string; cast: MovieCast; crew: MovieCrew };
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getMovieRecommendations = async (
    locale: Locale,
    movieId: string,
    page: string = "1",
) => {
    try {
        const query = createQueryString([
            { key: "language", value: locale },
            { key: "page", value: page },
        ]);

        const url = `${baseURL}/movie/${movieId}/recommendations?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const movieRecommendations = await response.json();

        return movieRecommendations as MovieRecommendationsType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getSimilarMovies = async (
    locale: Locale,
    movieId: string,
    page: string = "1",
) => {
    try {
        const query = createQueryString([
            { key: "language", value: locale },
            { key: "page", value: page },
        ]);
        const url = `${baseURL}/movie/${movieId}/similar?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const similarMovies = await response.json();

        return similarMovies as SimilarMoviesType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getMovieGenreList = async (locale: Locale) => {
    try {
        const query = createQueryString([{ key: "language", value: locale }]);

        const url = `${baseURL}/genre/movie/list?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { genres } = await response.json();

        return genres as GenresType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getMovieGenre = async (locale: Locale, id: string) => {
    const genres = await getMovieGenreList(locale);

    if (!genres) {
        return null;
    }

    const genre = genres.filter((genre) => {
        return String(genre.id) === id;
    })[0];

    return genre as GenreType;
};

export const getReleaseDates = async (locale: Locale, movieId: string) => {
    try {
        const query = createQueryString([
            { key: "language", value: locale },
            { key: "region", value: regions[locale] },
        ]);

        const url = `${baseURL}/movie/${movieId}/release_dates?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const releaseDates = await response.json();

        return releaseDates as ReleaseDatesType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getWatchProviders = async (locale: Locale, movieId: string) => {
    try {
        const query = createQueryString([
            { key: "language", value: locale },
            { key: "region", value: regions[locale] },
        ]);

        const url = `${baseURL}/movie/${movieId}/watch/providers?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const watchProviders = await response.json();

        return watchProviders as WatchProvidersType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getTrendingMovies = async (locale: Locale, page: string = "1") => {
    try {
        const query = createQueryString([
            { key: "language", value: locale },
            { key: "page", value: page },
        ]);

        const url = `${baseURL}/trending/movie/week?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const results = await response.json();

        return results as TrendingMoviesType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};
