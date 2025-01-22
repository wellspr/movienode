import { MovieDetailsType } from "@/types"
import { IconClock } from "@tabler/icons-react"

export const Runtime = ({ movie, className }: { movie: MovieDetailsType, className: string }) => {
    if (movie.runtime) {
        return (
            <div className={className ? `${className}__runtime` : "runtime"}>
                <IconClock size={18} />
                {movie.runtime}
                <span>min</span>
            </div>
        );
    }
};