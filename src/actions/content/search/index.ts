"use server";

import { Locale } from "@/i18n/types";

import {
	SearchMovieResultsType,
	SearchPersonResultsType,
	TVSearchResultsType,
} from "@/types";

const options: RequestInit = {
	method: 'GET',
	cache: 'no-cache',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
	},
};

const baseURL = `https://api.themoviedb.org/3`;

/* Search - All search routes use <<cache: 'no-cache'>> options */
export const searchMovie = async (locale: Locale, query: string, page: string = '1') => {
	const url = `${baseURL}/search/movie?language=${locale}&query=${query}&page=${page}`;

	const response = await fetch(url, options);

	const searchResults = await response.json();

	return searchResults as SearchMovieResultsType;
};

export const searchPerson = async (locale: Locale, query: string, page: string = '1') => {
	const url = `${baseURL}/search/person?language=${locale}&query=${query}&page=${page}`;

	const response = await fetch(url, options);

	const searchResults = await response.json();

	return searchResults as SearchPersonResultsType;
};

export const searchTVSeries = async (locale: Locale, query: string, page: string = '1') => {
	const url = `${baseURL}/search/tv?language=${locale}&query=${query}&page=${page}`;

	const response = await fetch(url, options);

	const searchResults = await response.json();

	return searchResults as TVSearchResultsType;
};