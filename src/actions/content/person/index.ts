"use server";

import { regions } from "@/i18n/config";
import { Locale } from "@/i18n/types";

import { PersonDetailsType, PeopleListType, TrendingPeopleType } from "@/types";

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

/* People */
export const getPersonDetails = async (locale: Locale, personId: string) => {
    try {
        const query = createQueryString([
            { key: "language", value: locale },
            { key: "region", value: regions[locale] },
            {
                key: "append_to_response",
                value: "images,movie_credits",
            },
            { key: "include_image_language", value: locale + ",null" },
        ]);

        const url = `${baseURL}/person/${personId}?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const personDetails = await response.json();

        return personDetails as PersonDetailsType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getPopularPeople = async (locale: Locale, page: string = "1") => {
    try {
        const query = createQueryString([
            { key: "language", value: locale },
            { key: "page", value: page },
        ]);

        const url = `${baseURL}/person/popular?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const results = await response.json();

        return results as PeopleListType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const getTrendingPeople = async (locale: Locale, page: string = "1") => {
    try {
        const query = createQueryString([
            { key: "language", value: locale },
            { key: "page", value: page },
        ]);

        const url = `${baseURL}/trending/person/week?${query}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const results = await response.json();

        return results as TrendingPeopleType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};
