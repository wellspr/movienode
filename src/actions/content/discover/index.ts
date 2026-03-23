"use server";

import { Locale } from "@/i18n/types";
import { FilteringType, MovieDetailsType, MovieType, SearchMovieResultsType, TVSearchResultsType } from "@/types";
import { TMDBRequest, withErrorHandling } from "../utils";

/**
 * Discover movies by various filters such as genre, year, rating, etc.
 * @param {Locale} locale - The locale to use for the request.
 * @param {FilteringType} queryList - A list of filters to apply to the search.
 * @param {string} [page] - The page number to retrieve.
 * @returns {Promise<SearchMovieResultsType | null>} - A promise that resolves to the search results or null if an error occurs.
 */
export const discoverMovie = async (
    locale: Locale,
    queryList: FilteringType,
    page?: string,
): Promise<SearchMovieResultsType | null> => {
    const fn = async (): Promise<any> => {
        const queryArray = Object.entries(queryList).map(([key, value]) => {
            return {
                key: key,
                value: value,
            };
        });

        queryArray.push({
            key: "language",
            value: locale,
        });

        if (page) {
            queryArray.push({
                key: "page",
                value: page,
            });
        }

        const response = await TMDBRequest({
            queryParams: queryArray,
            path: `/discover/movie`,
        });

        const results = await response.json();

        return results;
    } 

    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves a list of TV series that match the given filters.
 * @param {Locale} locale - The locale to use for the request.
 * @param {FilteringType} queryList - A list of filters to apply to the search.
 * @param {string} [page] - The page number to retrieve.
 * @returns {Promise<TVSearchResultsType | null>} - A promise that resolves to the search results or null if an error occurs.
 */
export const discoverTVSeries = async (
    locale: Locale,
    queryList: FilteringType,
    page?: string,
): Promise<TVSearchResultsType | null> => {
    const fn = async (): Promise<any> => {
        const queryArray = Object.entries(queryList).map(([key, value]) => {
            return {
                key: key,
                value: value,
            };
        });

        queryArray.push({
            key: "language",
            value: locale,
        });

        if (page) {
            queryArray.push({
                key: "page",
                value: page,
            });
        }

        const response = await TMDBRequest({
            queryParams: queryArray,
            path: `/discover/tv`,
        });

        const results = await response.json();

        return results;
    }

    const safeFn = withErrorHandling(fn);

    return safeFn();
};
