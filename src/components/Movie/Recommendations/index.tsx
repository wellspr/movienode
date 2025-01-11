"use server";

import { getMovieDetails, getMovieRecommendations } from "@/actions";
import { Locale } from "@/i18n/types";
import { List } from "./List";
import { getLocale } from "next-intl/server";
import { Header } from "./Header";
import { MoviesListPagination } from "@/components/MoviesListPagination";

export const Recommendations = async ({ movieId, page }: { movieId: string, page: string }) => {

    const locale = await getLocale() as Locale;

    const { results, total_pages, total_results } = await getMovieRecommendations(locale, movieId, page);

    console.log(page, results, total_pages, total_results);

    const referenceMovie = await getMovieDetails(locale, movieId);

    return (
        <div className="recommendations">
            <Header referenceMovie={referenceMovie} />

            <List results={results} />

            <MoviesListPagination locale={locale} page={page} total_pages={total_pages} />
        </div>
    );
};