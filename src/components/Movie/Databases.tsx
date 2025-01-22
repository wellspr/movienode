import { Link } from "@/i18n/routing";
import { MovieDetailsType } from "@/types";
import { IconExternalLink } from "@tabler/icons-react";

export const Databases = ({
    movie,
    className,
}:{
    movie: MovieDetailsType
    className: string
}) => {

    return (
        <div className={className ? `${className}__databases` : "movie-external__databases"}>
            {
                movie.imdb_id &&

                <Link className="link link-to-imdb" href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank">
                    <span>View on IMDB </span>
                    <IconExternalLink size={20} />
                </Link>

            }

            <Link className="link link-to-tmdb" href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank">
                <span>View on TMDB </span>
                <IconExternalLink size={20} />
            </Link>
        </div>
    );
}