import { Link } from "@/i18n/routing"
import { MovieDetailsType } from "@/types"
import { IconExternalLink } from "@tabler/icons-react"

export const Homepage = ({ movie, className }: { movie: MovieDetailsType, className: string }) => {
    if (movie.homepage) {
        return (
            <Link
                className={className ? `link ${className}__link` : "link"}
                href={movie.homepage}
                target="_blank">
                {movie.homepage} <IconExternalLink />
            </Link>
        );
    }
};