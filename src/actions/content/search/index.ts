"use server";

import { Locale } from "@/i18n/types";

import {
    SearchMovieResultsType,
    SearchPersonResultsType,
    TVSearchResultsType,
} from "@/types";

const options: RequestInit = {
    method: "GET",
    cache: "no-cache",
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

/* Search - All search routes use <<cache: 'no-cache'>> options */
export const searchMovie = async (
    locale: Locale,
    query: string,
    page: string = "1",
) => {
    try {

		const queryString = createQueryString([
			{ key: "page", value: page },
			{ key: "language", value: locale },
			{ key: "query", value: query },	
		]);

        const url = `${baseURL}/search/movie?${queryString}`;

        const response = await fetch(url, options);

        const searchResults = await response.json();

        return searchResults as SearchMovieResultsType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const searchPerson = async (
    locale: Locale,
    query: string,
    page: string = "1",
) => {
    try {

		const queryString = createQueryString([
			{ key: "page", value: page },
			{ key: "language", value: locale },
			{ key: "query", value: query },
		]);

        const url = `${baseURL}/search/person?${queryString}`;

        const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

        const searchResults = await response.json();

        return searchResults as SearchPersonResultsType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};

export const searchTVSeries = async (
    locale: Locale,
    query: string,
    page: string = "1",
) => {
    try {

		const queryString = createQueryString([
			{ key: "page", value: page },
			{ key: "language", value: locale },
			{ key: "query", value: query },
		]);

        const url = `${baseURL}/search/tv?${queryString}`;

        const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

        const searchResults = await response.json();

        return searchResults as TVSearchResultsType;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
};
