"use server";

import { searchMovie } from "@/actions";
import { Locale } from "@/i18n/types";
import { SearchResultsType } from "@/types";

export async function search(state: { locale: Locale, query: string, results: SearchResultsType | null }, formData: FormData) {

    const { locale } = state;

    const query = formData.get("query")?.toString() as string;

    const results = await searchMovie(locale, query, "1") as SearchResultsType | null;

    console.log(locale, query, results);

    //redirect({ href: "/search", locale });
    return {
        locale,
        query,
        results,
    };
}