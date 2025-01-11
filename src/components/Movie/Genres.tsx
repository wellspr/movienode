import { Link } from "@/i18n/routing";
import { MovieGenresType } from "@/types";

export const Genres = ({ movieGenres }: { movieGenres: MovieGenresType }) => {
    return (
        <ul className="movie-info__genres">
            {
                movieGenres.map((genre) => {
                    return (
                        <Link className="pillbox" key={genre.id}
                            href={`/genres/${genre.id}`}>
                            {genre.name}
                        </Link>
                    );
                })
            }
        </ul>
    );
}