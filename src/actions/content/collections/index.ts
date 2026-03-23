"use server";

import { Locale } from "@/i18n/types";
import { CollectionType } from "@/types";
import { TMDBIdValidator, TMDBRequest, withErrorHandling } from "../utils";

/**
 * Retrieves the details of a collection.
 * @param {Locale} locale - locale to retrieve the collection in
 * @param {string} collectionId - ID of the collection
 * @returns {Promise<CollectionType | null>} - a promise that resolves with the collection details or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getCollection = async (
    locale: Locale,
    collectionId: string,
): Promise<CollectionType | null> => {
    const fn = async (): Promise<CollectionType> => {
        const safeCollectionId = TMDBIdValidator(collectionId);

        const response = await TMDBRequest({
            queryParams: [{ key: "language", value: locale }],
            path: `/collection/${safeCollectionId}`,
        });

        const collection = await response.json();

        return collection as CollectionType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};
