"use server";

import { Locale } from "@/i18n/types";
import { CollectionType } from "@/types";

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

export const getCollection = async (locale: Locale, collectionId: string) => {
    try {
        const query = createQueryString([{ key: "language", value: locale }]);

        const url = `${baseURL}/collection/${collectionId}?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const collection = await response.json();

        return collection as CollectionType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};
