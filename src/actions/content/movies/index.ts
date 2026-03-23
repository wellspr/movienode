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
    MovieType,
} from "@/types";
import { TMDBIdValidator, TMDBMovieCategoryValidator, TMDBRequest, withErrorHandling } from "../utils";

/* Movies */

/**
 * Retrieves a list of movies based on the category.
 * @param {Locale} locale - locale to retrieve the list in
 * @param {MovieCategoryType} category - category of movies to retrieve
 * @param {string} [page=1] - page number to retrieve
 * @returns {Promise<{ results: MovieType[], total_pages: number, total_results: number } | null>} - a promise that resolves with the list of movies and pagination information or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getMovies = async (
    locale: Locale,
    category: MovieCategoryType, /* TODO: add validation for category */
    page: string = "1",
): Promise<{
    results: MovieType[];
    total_pages: number;
    total_results: number;
} | null> => {
    const fn = async (): Promise<any> => {

        const safeCategory = TMDBMovieCategoryValidator(category);

        const response = await TMDBRequest({
            queryParams: [
                { key: "page", value: page },
                { key: "language", value: locale },
                { key: "region", value: regions[locale] },
            ],
            path: `/movie/${safeCategory}`,
        });

        const movies = await response.json();

        return {
            results: movies.results as MovieType[],
            total_pages: movies.total_pages,
            total_results: movies.total_results,
        };
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves the details of a movie.
 * @param {Locale} locale - locale to retrieve the details in
 * @param {string} movieId - ID of the movie
 * @returns {Promise<MovieDetailsType | null>} - a promise that resolves with the details of the movie or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getMovieDetails = async (
    locale: Locale,
    movieId: string,
): Promise<MovieDetailsType | null> => {
    const fn = async (): Promise<MovieDetailsType> => {
        const safeMovieId = TMDBIdValidator(movieId);

        const response = await TMDBRequest({
            queryParams: [
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
            ],
            path: `/movie/${safeMovieId}`,
        });

        const movieDetails = await response.json();

        return movieDetails as MovieDetailsType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves the credits of a movie.
 * @param {Locale} locale - locale to retrieve the credits in
 * @param {string} movieId - ID of the movie
 * @returns {Promise<{ id: string; cast: MovieCast; crew: MovieCrew } | null>} - a promise that resolves with the credits of the movie or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getMovieCredits = async (
    locale: Locale,
    movieId: string,
): Promise<{ id: string; cast: MovieCast; crew: MovieCrew } | null> => {
    const fn = async (): Promise<any> => {
        const safeMovieId = TMDBIdValidator(movieId);

        const response = await TMDBRequest({
            queryParams: [
                { key: "language", value: locale },
                { key: "region", value: regions[locale] },
            ],
            path: `/movie/${safeMovieId}/credits`,
        });

        const movieCredits = await response.json();

        return movieCredits as { id: string; cast: MovieCast; crew: MovieCrew };
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves a list of movies that are recommended based on the given movie.
 * @param {Locale} locale - locale to retrieve the recommended movies in
 * @param {string} movieId - ID of the movie
 * @param {string} page - page number of the recommended movies to retrieve
 * @returns {Promise<MovieRecommendationsType | null>} - a promise that resolves with the list of recommended movies or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getMovieRecommendations = async (
    locale: Locale,
    movieId: string,
    page: string = "1",
): Promise<MovieRecommendationsType | null> => {
    const fn = async (): Promise<MovieRecommendationsType> => {
        const safeMovieId = TMDBIdValidator(movieId);

        const response = await TMDBRequest({
            queryParams: [
                { key: "language", value: locale },
                { key: "page", value: page },
            ],
            path: `/movie/${safeMovieId}/recommendations`,
        });

        const movieRecommendations = await response.json();

        return movieRecommendations as MovieRecommendationsType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves a list of movies that are similar to the given movie.
 * @param {Locale} locale - locale to retrieve the similar movies in
 * @param {string} movieId - ID of the movie
 * @param {string} page - page number of the similar movies to retrieve
 * @returns {Promise<SimilarMoviesType | null>} - a promise that resolves with the list of similar movies or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getSimilarMovies = async (
    locale: Locale,
    movieId: string,
    page: string = "1",
): Promise<SimilarMoviesType | null> => {
    const fn = async (): Promise<SimilarMoviesType> => {
        const safeMovieId = TMDBIdValidator(movieId);

        const response = await TMDBRequest({
            queryParams: [
                { key: "language", value: locale },
                { key: "page", value: page },
            ],
            path: `/movie/${safeMovieId}/similar`,
        });

        const similarMovies = await response.json();

        return similarMovies as SimilarMoviesType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves a list of movie genres.
 * @param {Locale} locale - locale to retrieve the list in
 * @returns {Promise<GenresType | null>} - a promise that resolves with the list of movie genres or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getMovieGenreList = async (
    locale: Locale,
): Promise<GenresType | null> => {
    const fn = async (): Promise<GenresType> => {
        const response = await TMDBRequest({
            queryParams: [{ key: "language", value: locale }],
            path: `/genre/movie/list`,
        });

        const { genres } = await response.json();

        return genres as GenresType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};

export const getMovieGenre = async (locale: Locale, id: string) => {
    /* TODO: add validation for id */
    const safeId = TMDBIdValidator(id);

    const genres = await getMovieGenreList(locale);

    if (!genres) {
        return null;
    }

    const genre = genres.filter((genre) => {
        return String(genre.id) === safeId;
    })[0];

    return genre as GenreType;
};

/**
 * Retrieves the release dates of a movie.
 * @param {Locale} locale - locale to retrieve the release dates in
 * @param {string} movieId - ID of the movie
 * @returns {Promise<ReleaseDatesType | null>} - a promise that resolves with the release dates of the movie or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getReleaseDates = async (
    locale: Locale,
    movieId: string,
): Promise<ReleaseDatesType | null> => {
    const fn = async (): Promise<ReleaseDatesType> => {
        const safeMovieId = TMDBIdValidator(movieId);

        const response = await TMDBRequest({
            queryParams: [
                { key: "language", value: locale },
                { key: "region", value: regions[locale] },
            ],
            path: `/movie/${safeMovieId}/release_dates`,
        });

        const releaseDates = await response.json();

        return releaseDates as ReleaseDatesType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves the watch providers of a movie.
 * @param {Locale} locale - locale to retrieve the watch providers in
 * @param {string} movieId - ID of the movie
 * @returns {Promise<WatchProvidersType | null>} - a promise that resolves with the watch providers of the movie or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getWatchProviders = async (
    locale: Locale,
    movieId: string,
): Promise<WatchProvidersType | null> => {
    const fn = async (): Promise<WatchProvidersType> => {
        const safeMovieId = TMDBIdValidator(movieId);

        const response = await TMDBRequest({
            queryParams: [
                { key: "language", value: locale },
                { key: "region", value: regions[locale] },
            ],
            path: `/movie/${safeMovieId}/watch/providers`,
        });

        const watchProviders = await response.json();

        return watchProviders as WatchProvidersType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves a list of trending movies.
 * @param {Locale} locale - locale to retrieve the trending movies in
 * @param {string} page - page number of the trending movies to retrieve
 * @returns {Promise<TrendingMoviesType | null>} - a promise that resolves with the list of trending movies or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getTrendingMovies = async (
    locale: Locale,
    page: string = "1",
): Promise<TrendingMoviesType | null> => {
    const fn = async (): Promise<TrendingMoviesType> => {
        const response = await TMDBRequest({
            queryParams: [
                { key: "language", value: locale },
                { key: "page", value: page },
            ],
            path: `/trending/movie/week`,
        });

        const results = await response.json();

        return results as TrendingMoviesType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};
