import { paths } from "@/config";
import { Link } from "@/i18n/routing";
import { GenresType, TVSeriesDetailsType } from "@/types";

export const Genres = ({
    series,
    className
}: {
    series: TVSeriesDetailsType,
    className: string
}) => {

    if (!series.genres) return null;
    if (series.genres && series.genres.length === 0) return null;

    const seriesGenres = series.genres as GenresType;

    return (
        <div className={className ? `${className}__genres` : "genres"}>
            <ul className={className ? `${className}__genres__list` : "genres__list"}>
                {
                    seriesGenres.map((genre) => {
                        return (
                            <Link className="pillbox" key={genre.id}
                                href={paths.tv_genres(String(genre.id))}>
                                {genre.name}
                            </Link>
                        );
                    })
                }
            </ul>
        </div>
    );
}