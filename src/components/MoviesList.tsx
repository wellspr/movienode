import { paths } from "@/config";
import { Locale } from "@/i18n/types";
import { MovieType } from "@/types";
import { Poster } from "./Poster";

export const MoviesList = ({ results, locale }: { results: MovieType[], locale: Locale }) => {
    return (
        <ul className="movies__list">
            {
                results && results.map((movie: MovieType) => {
                    return (
                        <Poster
                            key={movie.id}
                            baseClassName="movies"
                            locale={locale}
                            href={paths.movies(String(movie.id))}
                            placeholder={movie.title}
                            posterPath={movie.poster_path}
                        />
                    );
                })
            }
        </ul>
    );
};