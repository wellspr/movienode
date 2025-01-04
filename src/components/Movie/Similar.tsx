import { getSimilarMovies } from "@/actions";
import { baseImageUrl } from "@/config";
import { Locale } from "@/i18n/types";
import Image from "next/image";

export const Similar = async ({ locale, movieId }: { locale: Locale, movieId: string }) => {

    const { page, results, total_pages, total_results } = await getSimilarMovies(locale, movieId);

    console.log(page, results, total_pages, total_results);

    return (
        <div className="similar">
            <h2>Similar Movies</h2>

            {
                results.map((movie) => {
                    return (
                        <div key={movie.id} className="similar__movie">
                            <div className="movie-poster">
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