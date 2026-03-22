"use server";

import { Locale } from "@/i18n/types";
import { FilteringType } from "@/types";

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

const createQueryString = (
    queryParams: {
        key: string;
        value: string | number | boolean | undefined;
    }[],
) => {
    const query = new URLSearchParams();
    queryParams.forEach((entry) => {
        query.set(entry.key, entry.value as string);
    });

    return query.toString();
};

export const discoverMovie = async (
    locale: Locale,
    queryList: FilteringType,
    page?: string,
) => {
    try {
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

        const queryString = createQueryString(queryArray);

        let url = `${baseURL}/discover/movie?${queryString}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const results = await response.json();

        return results;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const discoverTVSeries = async (
    locale: Locale,
    queryList: FilteringType,
    page?: string,
) => {
    try {
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

        const queryString = createQueryString(queryArray);

        let url = `${baseURL}/discover/tv?${queryString}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const results = await response.json();

        return results;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};
