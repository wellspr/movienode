import { baseImageUrl } from "@/config";
import { MovieDetailsType } from "@/types";
import Image from "next/image";

export const Poster = ({movie}:{movie: MovieDetailsType}) => {

    return (
        <div className="movie-poster">
            <div className="movie-poster__wrapper">
                <Image
                    src={baseImageUrl(500) + movie.poster_path}
                    alt={movie.title}
                    sizes="100vw, 50rem, 100%"
                    fill
                />
            </div>
        </div>
    );
}