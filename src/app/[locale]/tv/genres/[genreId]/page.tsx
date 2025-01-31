import { discoverTVSeries, getTVSeriesGenre, getTVSeriesGenreList } from "@/actions";
import { TVSeriesGenresList } from "@/components/Genres/TVSeriesGenresList";
import { MoviesListPagination } from "@/components/MoviesListPagination";
import { TVSeriesResults } from "@/components/Search/Results";
import { Locale } from "@/i18n/types";

export default async function Page({
    params,
    searchParams
}: {
    params: Promise<{ genreId: string, locale: Locale }>,
    searchParams: Promise<{ page: string }>
}) {

    const { genreId, locale } = await params
    const page = (await searchParams).page || '1';

    const genres = await getTVSeriesGenreList(locale);
    const genre = await getTVSeriesGenre(locale, genreId);

    const { results, total_pages } = await discoverTVSeries(locale, {
        with_genres: String(genre.id)
    }, page);

    return (
        <div className="search-by-genre">
            <TVSeriesGenresList genres={genres} locale={locale} />

            <div className="search-by-genre__title">
                <h2>{genre.name}</h2>
            </div>

            <TVSeriesResults results={results} locale={locale} />

            <MoviesListPagination locale={locale} page={page} total_pages={total_pages} />
        </div>
    );
}