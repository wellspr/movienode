"use server";

import { Locale } from "@/i18n/types";
import { FilteringType } from "@/types";

const options: RequestInit = {
    method: 'GET',
    cache: 'force-cache',
    next: { revalidate: 3600 },
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
};

const baseURL = `https://api.themoviedb.org/3`;


export const discoverMovie = async (locale: Locale, queryList: FilteringType, page?: string) => {

    let url = `${baseURL}/discover/movie?language=${locale}`;

    if (page) {
        url = url + `&page=${page}`;
    }

    Object.entries(queryList).forEach(([key, value]) => {
        url = url + `&${key}=${value}`;
    });

    const response = await fetch(url, options);

    const results = await response.json();

    return results;
};

export const discoverTVSeries = async (locale: Locale, queryList: FilteringType, page?: string) => {

	let url = `${baseURL}/discover/tv?language=${locale}`;

	if (page) {
		url = url + `&page=${page}`;
	}

	Object.entries(queryList).forEach(([key, value]) => {
		url = url + `&${key}=${value}`;
	});

	const response = await fetch(url, options);

	const results = await response.json();

	return results;
};