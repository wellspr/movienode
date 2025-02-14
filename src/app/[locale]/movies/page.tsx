import { getMovieGenreList } from "@/actions/content/movies";
import { MoviesGenresList } from "@/components/Genres/MoviesGenresList";
import { Locale } from "@/i18n/types";
import { MoviesBannerServerComponent } from "@/serverComponents/MoviesBannerServerComponent";

export default async function Page({
    params
}: {
    params: Promise<{ locale: Locale }>
}) {

    const { locale } = await params;
    const genres = await getMovieGenreList(locale);

    return (
        <div className="movies">
            <div className="movies__genres-list">
                <MoviesGenresList genres={genres} locale={locale} />
            </div>

            <MoviesBannerServerComponent category="popular" locale={locale} />
            <MoviesBannerServerComponent category="now_playing" locale={locale} />
            <MoviesBannerServerComponent category="top_rated" locale={locale} />
            <MoviesBannerServerComponent category="upcoming" locale={locale} />
        </div>
    );
}