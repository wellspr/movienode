"use server";

import { searchMovie } from "@/actions";
import { Locale } from "@/i18n/types";
import { SearchResultsType } from "@/types";

export async function search(
    state: { locale: Locale, query: string, page: string, results: SearchResultsType | null },
    formData: FormData
) {

    const { locale } = state;

    const query = formData.get("query")?.toString() as string;
    const page = formData.get("page")?.toString() || '1' as string;

    const results = await searchMovie(locale, query, page) as SearchResultsType | null;

    console.log(locale, query, page, results);

    return {
        locale,
        query,
        page,
        results,
    };
}