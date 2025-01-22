import { MovieDetailsType } from "@/types";

export const OriginalTitle = ({ className, movie }: { className: string, movie: MovieDetailsType }) => {

    if (!movie.original_title) return null;

    return (
        <div className={className ? `${className}__original-title` : "original-title"}>
            {movie.original_title}
        </div>
    );
};