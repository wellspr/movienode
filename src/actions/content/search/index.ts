"use server";

import { Locale } from "@/i18n/types";

import {
    SearchMovieResultsType,
    SearchPersonResultsType,
    TVSearchResultsType,
} from "@/types";
import { TMDBRequest, withErrorHandling } from "../utils";

/* Search - All search routes use <<cache: 'no-cache'>> options */

/**
 * Searches for movies based on a query.
 * @param {Locale} locale - locale to retrieve the search results in
 * @param {string} query - query string to search for
 * @param {string} [page=1] - page number to retrieve
 * @returns {Promise<SearchMovieResultsType | null>} - a promise that resolves with the search results or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const searchMovie = async (
    locale: Locale,
    query: string,
    page: string = "1",
): Promise<SearchMovieResultsType | null> => {
    const fn = async (): Promise<SearchMovieResultsType> => {
        const response = await TMDBRequest({
            queryParams: [
                { key: "page", value: page },
                { key: "language", value: locale },
                { key: "query", value: query },
            ],
            path: `/search/movie`,
        });

        const searchResults = await response.json();

        return searchResults as SearchMovieResultsType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Searches for a person by name or keyword.
 * @param {Locale} locale - The locale to search in.
 * @param {string} query - The query to search for.
 * @param {string} [page=1] - The page number to retrieve.
 * @returns {Promise<SearchPersonResultsType | null>} - A promise that resolves with the search results or null if there is an error.
 * @throws {Error} - If there is an HTTP error.
 */
export const searchPerson = async (
    locale: Locale,
    query: string,
    page: string = "1",
): Promise<SearchPersonResultsType | null> => {
    const fn = async (): Promise<SearchPersonResultsType> => {
        const response = await TMDBRequest({
            queryParams: [
                { key: "page", value: page },
                { key: "language", value: locale },
                { key: "query", value: query },
            ],
            path: `/search/person`,
        });

        const searchResults = await response.json();

        return searchResults as SearchPersonResultsType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Searches for TV series by name or keyword.
 * @param {Locale} locale - The locale to search in.
 * @param {string} query - The query to search for.
 * @param {string} [page=1] - The page number to retrieve.
 * @returns {Promise<TVSearchResultsType | null>} - A promise that resolves with the search results or null if there is an error.
 * @throws {Error} - If there is an HTTP error.
 */
export const searchTVSeries = async (
    locale: Locale,
    query: string,
    page: string = "1",
): Promise<TVSearchResultsType | null> => {
    const fn = async (): Promise<TVSearchResultsType> => {
        const response = await TMDBRequest({
            queryParams: [
                { key: "page", value: page },
                { key: "language", value: locale },
                { key: "query", value: query },
            ],
            path: `/search/tv`,
        });

        const searchResults = await response.json();

        return searchResults as TVSearchResultsType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};
