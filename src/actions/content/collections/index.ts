"use server";

import { Locale } from "@/i18n/types";
import { CollectionType } from "@/types";

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

export const getCollection = async (locale: Locale, collectionId: string) => {
    const url = `${baseURL}/collection/${collectionId}?language=${locale}`;

    const response = await fetch(url, options);

    const collection = await response.json();

    return collection as CollectionType;
};