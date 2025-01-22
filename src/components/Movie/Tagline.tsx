import { MovieDetailsType } from "@/types"

export const Tagline = ({ movie, className }: { movie: MovieDetailsType, className: string }) => {
    return <h3 className={className ? `${className}__tagline` : "tagline"}>{movie.tagline}</h3>
};