"use server";

import { regions } from "@/i18n/config";
import { Locale } from "@/i18n/types";

import {
	PersonDetailsType,
	PeopleListType,
	TrendingPeopleType,
} from "@/types";

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


/* People */
export const getPersonDetails = async (locale: Locale, personId: string) => {
    const url = `${baseURL}/person/${personId}?language=${locale}&region=${regions[locale]}&append_to_response=images,movie_credits&include_image_language=${locale},null`;

    const response = await fetch(url, options);

    const personDetails = await response.json();

    return personDetails as PersonDetailsType;
};

export const getPopularPeople = async (locale: Locale, page: string = '1') => {
    const url = `${baseURL}/person/popular?language=${locale}&page=${page}`;

    const response = await fetch(url, options);

    const results = await response.json();

    return results as PeopleListType;
};

export const getTrendingPeople = async (locale: Locale, page: string = '1') => {
    const url = `${baseURL}/trending/person/week?language=${locale}&page=${page}`;

    const response = await fetch(url, options);

    const results = await response.json();

    return results as TrendingPeopleType;
};