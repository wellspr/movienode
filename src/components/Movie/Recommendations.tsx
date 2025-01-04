import { getMovieRecommendations } from "@/actions";
import { baseImageUrl } from "@/config";
import { Locale } from "@/i18n/types";
import Image from "next/image";

export const Recommendations = async ({ locale, movieId }: { locale: Locale, movieId: string }) => {

    console.log(movieId, locale);

    const { page, results, total_pages, total_results } = await getMovieRecommendations(locale, movieId);

    console.log(page, results, total_pages, total_results);

    return (
        <div className="recommendations">
            <h2>Recommendations</h2>

            {

                results.map((movie) => {
                    return (
                        <div key={movie.id} className="recommendations__movie">
                            <div  className="movie-poster">
                                <div className="movie-poster__wrapper">
                                    <Image src={baseImageUrl(500) + movie.poster_path} alt={movie.title} fill />
                                </div>
                            </div>
                            <h3>{movie.title}</h3>
                            <p>{movie.overview}</p>
                        </div>
                    );
                })
            }
        </div>
    );
};