import { baseImageUrl } from "@/config";
import { MovieDetailsType } from "@/types";
import { IconMovie } from "@tabler/icons-react";
import Image from "next/image";

export const Poster = ({ movie }: { movie: MovieDetailsType }) => {

    return (
        <div className="movie-poster">
            <div className="movie-poster__wrapper">
                {
                    movie.poster_path ?
                        <Image
                            src={baseImageUrl(500) + movie.poster_path}
                            alt={movie.title}
                            sizes="100vw, 50rem, 100%"
                            fill
                            draggable={false}
                        /> :
                        <div className="movie-poster__placeholder">
                            <div className="movie-poster__placeholder__title">
                                {movie.title}
                            </div>
                            <IconMovie size={40} />
                        </div>
                }
            </div>
        </div>
    );
}