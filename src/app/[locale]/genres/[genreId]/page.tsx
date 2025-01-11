import { discoverMovie, getMovieGenre, getMovieGenreList } from "@/actions";
import { GenresList } from "@/components/Genres/GenresList";
import { MoviesListPagination } from "@/components/MoviesListPagination";
import { Results } from "@/components/Search/Results";
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

    const genres = await getMovieGenreList(locale);
    const genre = await getMovieGenre(locale, genreId);
    const { results, total_pages } = await discoverMovie(locale, {
        with_genres: String(genre.id)
    }, page);

    return (
        <div className="search-by-genre">
            <GenresList genres={genres} locale={locale} />

            <div className="search-by-genre__title">
                <h2>{ genre.name }</h2>
            </div>

            <Results results={results} />

            <MoviesListPagination locale={locale} page={page} total_pages={total_pages} />
        </div>
    );
}