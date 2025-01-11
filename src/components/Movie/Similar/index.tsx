import { getMovieDetails, getSimilarMovies } from "@/actions";
import { Locale } from "@/i18n/types";
import { Header } from "./Header";
import { getLocale } from "next-intl/server";
import { List } from "./List";
import { MoviesListPagination } from "@/components/MoviesListPagination";


export const Similar = async ({ movieId, page}: { movieId: string, page: string }) => {

    const locale = await getLocale() as Locale;

    const { results, total_pages, total_results } = await getSimilarMovies(locale, movieId, page);

    const referenceMovie = await getMovieDetails(locale, movieId);

    console.log(page, results, total_pages, total_results);

    return (
        <div className="similar">
            <Header referenceMovie={referenceMovie} />
            <List results={results} />
            <MoviesListPagination locale={locale} page={page} total_pages={total_pages} />
        </div>
    );
};