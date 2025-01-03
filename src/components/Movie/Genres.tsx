import { MovieGenresType } from "@/types";

export const Genres = ({movieGenres}: {movieGenres: MovieGenresType}) => {
    return (
        <ul className="movie-info__genres">
            {
                movieGenres.map((genre) => {
                    return (
                        <li className="pillbox" key={genre.id}>
                            {genre.name}
                        </li>
                    );
                })
            }
        </ul>
    );
}