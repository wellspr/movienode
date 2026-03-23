"use server";

import { regions } from "@/i18n/config";
import { Locale } from "@/i18n/types";

import {
    GenresType,
    GenreType,
    TVSeriesCategoryType,
    WatchProvidersType,
    TVSeriesDetailsType,
    TVSeriesCast,
    TVSeriesCrew,
    TVSeriesRecommendationsType,
    SimilarTVSeriesType,
    TVSeasonsType,
    TVEpisodesType,
    TrendingTVSeriesType,
    TVSeriesType,
} from "@/types";
import { TMDBIdValidator, TMDBRequest, withErrorHandling } from "../utils";



/* TV Series */

/**
 * Retrieves a list of TV series based on the category.
 * @param {Locale} locale - locale to retrieve the list in
 * @param {TVSeriesCategoryType} category - category of TV series to retrieve
 * @param {string} [page=1] - page number to retrieve
 * @returns {Promise<{ results: TVSeriesType[], total_pages: number, total_results: number } | null>} - a promise that resolves with the list of TV series and pagination information or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getTVSeries = async (
    locale: Locale,
    category: TVSeriesCategoryType, /* TODO: add validation for category */
    page: string = "1",
): Promise<{
    results: TVSeriesType[];
    total_pages: number;
    total_results: number;
} | null> => {

    const fn = async (): Promise<{
        results: TVSeriesType[];
        total_pages: number;
        total_results: number;
    }> => {
        const response = await TMDBRequest({
            queryParams: [
                { key: "page", value: page },
                { key: "language", value: locale },
                { key: "region", value: regions[locale] },
            ],
            path: `/tv/${category}`,
        });

        const tvSeries = await response.json();

        return {
            results: tvSeries.results as TVSeriesType[],
            total_pages: tvSeries.total_pages,
            total_results: tvSeries.total_results,
        };
    };
    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves the details of a TV series.
 * @param {Locale} locale - locale to retrieve the details in
 * @param {string} seriesId - ID of the TV series
 * @returns {Promise<TVSeriesDetailsType>} - a promise that resolves with the details of the TV series
 * @throws {Error} - if there is an HTTP error
 */
export const getTVSeriesDetails = async (
    locale: Locale,
    seriesId: string,
): Promise<TVSeriesDetailsType | null> => {
    const fn = async (): Promise<TVSeriesDetailsType> => {
        const safeSeriesId = TMDBIdValidator(seriesId);

        const response = await TMDBRequest({
            queryParams: [
                { key: "language", value: locale },
                { key: "region", value: regions[locale] },
                {
                    key: "append_to_response",
                    value: "images,videos,release_dates,translations",
                },
                { key: "include_image_language", value: locale + ",null" },
            ],
            path: `/tv/${safeSeriesId}`,
        });

        const tvSeriesDetails = await response.json();

        return tvSeriesDetails as TVSeriesDetailsType;
    };
    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves the details of a TV series season.
 * @param {Locale} locale - locale to retrieve the details in
 * @param {string} seriesId - ID of the TV series
 * @param {string} seasonNumber - number of the season to retrieve
 * @returns {Promise<TVSeasonsType | null>} - a promise that resolves with the details of the TV series season or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getTVSeriesSeasonDetails = async (
    locale: Locale,
    seriesId: string,
    seasonNumber: string,
): Promise<TVSeasonsType | null> => {
    const fn = async (): Promise<TVSeasonsType> => {
        const safeSeriesId = TMDBIdValidator(seriesId);

        const response = await TMDBRequest({
            queryParams: [
                { key: "language", value: locale },
                { key: "region", value: regions[locale] },
                {
                    key: "append_to_response",
                    value: "images,videos,release_dates,translations",
                },
                { key: "include_image_language", value: locale + ",null" },
            ],
            path: `/tv/${safeSeriesId}/season/${seasonNumber}`,
        });

        const season = await response.json();

        return season as TVSeasonsType;
    };
    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves the details of a TV series episode.
 * @param {Locale} locale - locale to retrieve the details in
 * @param {string} seriesId - ID of the TV series
 * @param {string} seasonNumber - number of the season to retrieve
 * @param {string} episodeNumber - number of the episode to retrieve
 * @returns {Promise<TVEpisodesType | null>} - a promise that resolves with the details of the TV series episode or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getTVSeriesEpisodeDetails = async (
    locale: Locale,
    seriesId: string,
    seasonNumber: string,
    episodeNumber: string,
): Promise<TVEpisodesType | null> => {
    const fn = async (): Promise<TVEpisodesType> => {
        const safeSeriesId = TMDBIdValidator(seriesId);

        const response = await TMDBRequest({
            queryParams: [
                { key: "language", value: locale },
                { key: "region", value: regions[locale] },
                {
                    key: "append_to_response",
                    value: "images,videos,release_dates,translations",
                },
                { key: "include_image_language", value: locale + ",null" },
            ],
            path: `/tv/${safeSeriesId}/season/${seasonNumber}/episode/${episodeNumber}`,
        });

        const episode = await response.json();

        return episode as TVEpisodesType;
    };
    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves the credits of a TV series.
 * @param {Locale} locale - locale to retrieve the credits in
 * @param {string} seriesId - ID of the TV series
 * @returns {Promise<{ id: string; cast: TVSeriesCast; crew: TVSeriesCrew } | null>} - a promise that resolves with the credits of the TV series or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getTVSeriesCredits = async (
    locale: Locale,
    seriesId: string,
): Promise<{ id: string; cast: TVSeriesCast; crew: TVSeriesCrew } | null> => {
    const fn = async (): Promise<{
        id: string;
        cast: TVSeriesCast;
        crew: TVSeriesCrew;
    }> => {
        const safeSeriesId = TMDBIdValidator(seriesId);

        const response = await TMDBRequest({
            queryParams: [{ key: "language", value: locale }],
            path: `/tv/${safeSeriesId}/credits`,
        });

        const credits = await response.json();

        return credits as {
            id: string;
            cast: TVSeriesCast;
            crew: TVSeriesCrew;
        };
    };
    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves the recommendations of a TV series.
 * @param {Locale} locale - locale to retrieve the recommendations in
 * @param {string} seriesId - ID of the TV series
 * @param {string} page - page number of the recommendations to retrieve
 * @returns {Promise<TVSeriesRecommendationsType | null>} - a promise that resolves with the recommendations of the TV series or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getTVSeriesRecommendations = async (
    locale: Locale,
    seriesId: string,
    page: string = "1",
): Promise<TVSeriesRecommendationsType | null> => {
    const fn = async (): Promise<TVSeriesRecommendationsType> => {
        const safeSeriesId = TMDBIdValidator(seriesId);

        const response = await TMDBRequest({
            queryParams: [
                { key: "page", value: page },
                { key: "language", value: locale },
            ],
            path: `/tv/${safeSeriesId}/recommendations`,
        });

        const recommendations = await response.json();

        return recommendations as TVSeriesRecommendationsType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves a list of TV series that are similar to the given TV series.
 * @param {Locale} locale - locale to retrieve the similar TV series in
 * @param {string} seriesId - ID of the TV series
 * @param {string} page - page number of the similar TV series to retrieve
 * @returns {Promise<SimilarTVSeriesType | null>} - a promise that resolves with the list of similar TV series or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getSimilarTVSeries = async (
    locale: Locale,
    seriesId: string,
    page: string = "1",
): Promise<SimilarTVSeriesType | null> => {
    const fn = async (): Promise<SimilarTVSeriesType> => {
        const safeSeriesId = TMDBIdValidator(seriesId);

        const response = await TMDBRequest({
            queryParams: [
                { key: "page", value: page },
                { key: "language", value: locale },
            ],
            path: `/tv/${safeSeriesId}/similar`,
        });

        const similar = await response.json();

        return similar as SimilarTVSeriesType;
    };
    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves a list of TV series genres.
 * @param {Locale} locale - locale to retrieve the TV series genres in
 * @returns {Promise<GenresType | null>} - a promise that resolves with the list of TV series genres or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getTVSeriesGenreList = async (
    locale: Locale,
): Promise<GenresType | null> => {
    const fn = async (): Promise<GenresType> => {
        const response = await TMDBRequest({
            queryParams: [{ key: "language", value: locale }],
            path: `/genre/tv/list`,
        });

        const { genres } = await response.json();

        return genres as GenresType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves a TV series genre by its ID.
 * @param {Locale} locale - locale to retrieve the genre in
 * @param {string} genreId - ID of the genre to retrieve
 * @returns {Promise<GenreType | null>} - a promise that resolves with the genre or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getTVSeriesGenre = async (
    locale: Locale,
    genreId: string,
): Promise<GenreType | null> => {
    const genres = await getTVSeriesGenreList(locale);

    if (!genres) {
        return null;
    }

    const genre = genres.filter((genre) => {
        return String(genre.id) === genreId;
    })[0];

    return genre as GenreType;
};

/**
 * Retrieves the watch providers of a TV series.
 * @param {Locale} locale - locale to retrieve the watch providers in
 * @param {string} seriesId - ID of the TV series
 * @returns {Promise<WatchProvidersType | null>} - a promise that resolves with the watch providers of the TV series or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getTVSeriesWatchProviders = async (
    locale: Locale,
    seriesId: string,
): Promise<WatchProvidersType | null> => {

    const fn = async (): Promise<WatchProvidersType> => {
        const safeSeriesId = TMDBIdValidator(seriesId);

        const response = await TMDBRequest({
            queryParams: [{ key: "language", value: locale }],
            path: `/tv/${safeSeriesId}/watch/providers`,
        });

        const watchProviders = await response.json();

        return watchProviders as WatchProvidersType;
    }; 

    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves a list of trending TV series.
 * @param {Locale} locale - locale to retrieve the trending TV series in
 * @param {string} page - page number of the trending TV series to retrieve
 * @returns {Promise<TrendingTVSeriesType | null>} - a promise that resolves with the list of trending TV series or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getTrendingTVSeries = async (
    locale: Locale,
    page: string = "1",
): Promise<TrendingTVSeriesType | null> => {
    
    const fn = async (): Promise<TrendingTVSeriesType> => {
        const response = await TMDBRequest({
            queryParams: [
                { key: "page", value: page },
                { key: "language", value: locale },
            ],
            path: `/trending/tv/week`,
        });

        const results = await response.json();

        return results as TrendingTVSeriesType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};
