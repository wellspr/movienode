import { paths } from "@/config";
import { Link } from "@/i18n/routing";
import { MovieDetailsType, MovieGenresType } from "@/types";

export const Genres = ({
    movie,
    className
}: {
    movie: MovieDetailsType,
    className: string
}) => {

    if (!movie.genres) return null;
    if (movie.genres && movie.genres.length === 0) return null;

    const movieGenres = movie.genres as MovieGenresType;

    return (
        <div className={className ? `${className}__genres` : "genres"}>
            <ul className={className ? `${className}__genres__list` : "genres__list"}>
                {
                    movieGenres.map((genre) => {
                        return (
                            <Link className="pillbox" key={genre.id}
                                href={paths.genres(String(genre.id))}>
                                {genre.name}
                            </Link>
                        );
                    })
                }
            </ul>
        </div>
    );
}