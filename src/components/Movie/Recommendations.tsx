import { getMovieRecommendations } from "@/actions";
import { baseImageUrl } from "@/config";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import Image from "next/image";

export const Recommendations = async ({ locale, movieId }: { locale: Locale, movieId: string }) => {

    const { page, results, total_pages, total_results } = await getMovieRecommendations(locale, movieId);

    console.log(page, results, total_pages, total_results);

    return (
        <div className="recommendations">
            <h2>Recommendations</h2>

            <ul className="recommendations__list">
                {
                    results.map((movie) => {
                        return (
                            <Link key={movie.id} href={`/details/${movie.id}`} locale={locale}>
                                <div key={movie.id} className="recommendations__list__item">
                                    <div className="movie-poster">
                                        <div className="movie-poster__wrapper">
                                            <Image src={baseImageUrl(500) + movie.poster_path} alt={movie.title} fill />
                                        </div>
                                    </div>
                                    <div className="movie-info">
                                        <h3 className="movie-info__title">{movie.title}</h3>
                                        {/* <p>{movie.overview}</p> */}
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                }
            </ul>
        </div>
    );
};