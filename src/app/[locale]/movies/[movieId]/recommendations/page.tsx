import { getMovieDetails, getMovieRecommendations } from "@/actions/content/movies";
import { Header } from "@/components/Movie/Recommendations/Header";
import { MoviesListPagination } from "@/components/MoviesListPagination";
import { baseImageUrl, paths } from "@/config";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import Image from "next/image";

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ movieId: string, locale: Locale }>
    searchParams: Promise<{ page: string }>
}) {
    const { movieId, locale } = await params;

    const page = (await searchParams).page || '1';

    const { results, total_pages } = await getMovieRecommendations(locale, movieId, page);

    const referenceMovie = await getMovieDetails(locale, movieId);

    return (
        <div className="recommendations">
            <Header referenceMovie={referenceMovie} />

            <ul className={`recommendations__list`}>
                {
                    results.map((movie) => {
                        return (
                            <Link key={movie.id} href={paths.movies(String(movie.id))} locale={locale}>
                                <div key={movie.id} className={`recommendations__list__item`}>
                                    <div className="movie-poster">
                                        <div className="movie-poster__wrapper">
                                            <Image src={baseImageUrl(500) + movie.poster_path} alt={movie.title} fill />
                                        </div>
                                    </div>
                                    <div className="movie-info">
                                        <h3 className="movie-info__title">{movie.title}</h3>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                }
            </ul>

            <MoviesListPagination locale={locale} page={page} total_pages={total_pages} />
        </div>
    );
}