import { getSimilarMovies } from "@/actions";
import { baseImageUrl } from "@/config";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import Image from "next/image";


export const Similar = async ({ locale, movieId }: { locale: Locale, movieId: string }) => {

    const { page, results, total_pages, total_results } = await getSimilarMovies(locale, movieId);

    console.log(page, results, total_pages, total_results);

    return (
        <div className="similar">
            <h2>Similar Movies</h2>

            <ul className="similar__list">
                {
                    results.map((movie) => {
                        return (
                            <Link key={movie.id} href={`/details/${movie.id}`} locale={locale}>
                                <div key={movie.id} className="similar__list__item">
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