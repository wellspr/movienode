import { Link } from "@/i18n/routing";
import { TVSeriesDetailsType } from "@/types";
import { IconExternalLink } from "@tabler/icons-react";

export const Databases = ({
    series,
    className,
}:{
    series: TVSeriesDetailsType
    className: string
}) => {

    return (
        <div className={className ? `${className}__databases` : "movie-external__databases"}>
            {/*
                series. &&

                <Link className="link link-to-imdb" href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank">
                    <span>View on IMDB </span>
                    <IconExternalLink size={20} />
                </Link>

            */}

            <Link className="link link-to-tmdb" href={`https://www.themoviedb.org/tv/${series.id}`} target="_blank">
                <span>View on TMDB </span>
                <IconExternalLink size={20} />
            </Link>
        </div>
    );
}