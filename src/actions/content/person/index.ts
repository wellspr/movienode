"use server";

import { regions } from "@/i18n/config";
import { Locale } from "@/i18n/types";

import { PersonDetailsType, PeopleListType, TrendingPeopleType } from "@/types";
import { TMDBIdValidator, TMDBRequest, withErrorHandling } from "../utils";

/* People */

/**
 * Retrieves the details of a person.
 * @param {Locale} locale - locale to retrieve the details in
 * @param {string} personId - ID of the person
 * @returns {Promise<PersonDetailsType | null>} - a promise that resolves with the details of the person or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getPersonDetails = async (
    locale: Locale,
    personId: string,
): Promise<PersonDetailsType | null> => {
    const fn = async (): Promise<PersonDetailsType> => {
        const safePersonId = TMDBIdValidator(personId);

        const response = await TMDBRequest({
            queryParams: [
                { key: "language", value: locale },
                { key: "region", value: regions[locale] },
                {
                    key: "append_to_response",
                    value: "images,movie_credits",
                },
                { key: "include_image_language", value: locale + ",null" },
            ],
            path: `/person/${safePersonId}`,
        });

        const personDetails = await response.json();

        return personDetails as PersonDetailsType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves a list of popular people.
 * @param {Locale} locale - locale to retrieve the list in
 * @param {string} page - page number of the popular people to retrieve
 * @returns {Promise<PeopleListType | null>} - a promise that resolves with the list of popular people or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getPopularPeople = async (
    locale: Locale,
    page: string = "1",
): Promise<PeopleListType | null> => {
    const fn = async (): Promise<PeopleListType> => {
        const response = await TMDBRequest({
            queryParams: [
                { key: "language", value: locale },
                { key: "page", value: page },
            ],
            path: `/person/popular`,
        });

        const results = await response.json();

        return results as PeopleListType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};

/**
 * Retrieves a list of trending people.
 * @param {Locale} locale - locale to retrieve the trending people in
 * @param {string} page - page number of the trending people to retrieve
 * @returns {Promise<TrendingPeopleType | null>} - a promise that resolves with the list of trending people or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getTrendingPeople = async (
    locale: Locale,
    page: string = "1",
): Promise<TrendingPeopleType | null> => {
    const fn = async (): Promise<TrendingPeopleType> => {
        const response = await TMDBRequest({
            queryParams: [
                { key: "language", value: locale },
                { key: "page", value: page },
            ],
            path: `/trending/person/week`,
        });

        const results = await response.json();

        return results as TrendingPeopleType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};
