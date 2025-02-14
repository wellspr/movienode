"use server";

import { Locale } from "@/i18n/types";

import { CreditDetailsType } from "@/types";

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

export const getCreditDetails = async (locale: Locale, creditId: string) => {
    const url = `${baseURL}/credit/${creditId}`;

    const response = await fetch(url, options);

    const creditsDetails = await response.json();

    return creditsDetails as CreditDetailsType;
};
