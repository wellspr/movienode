"use server";

import { CreditDetailsType } from "@/types";
import { TMDBIdValidator, TMDBRequest, withErrorHandling } from "../utils";

/**
 * Retrieves the details of a credit.
 * @param {string} creditId - ID of the credit
 * @returns {Promise<CreditDetailsType | null>} - a promise that resolves with the details of the credit or null if there is an error
 * @throws {Error} - if there is an HTTP error
 */
export const getCreditDetails = async (
    creditId: string,
): Promise<CreditDetailsType | null> => {
    const fn = async (): Promise<CreditDetailsType> => {
        const safeCreditId = TMDBIdValidator(creditId);

        const response = await TMDBRequest({
            queryParams: [],
            path: `/credit/${safeCreditId}`,
        });

        const credit = await response.json();

        return credit as CreditDetailsType;
    };

    const safeFn = withErrorHandling(fn);

    return safeFn();
};
