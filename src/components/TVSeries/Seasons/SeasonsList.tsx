import { paths } from "@/config";
import { Link } from "@/i18n/routing";
import { TVSeriesDetailsType } from "@/types";

export const SeasonsList = ({ series }: { series: TVSeriesDetailsType }) => {

    if (!series.seasons) return null;

    return (
        <div className="seasons">
            <div className="seasons__list">
                {
                    series.seasons.map(season => {
                        return <div key={season.id}
                            className="seasons__list__item">
                            <details>
                                <summary className="seasons__list__item__heading">
                                    Season {season.season_number}
                                </summary>
                                <div className="seasons__list__item__data">
                                    {season.air_date &&
                                        <p className="seasons__list__item__date">
                                            {season.air_date.split('-')[0]}
                                        </p>}
                                    <p className="seasons__list__item__episode-count">{season.episode_count} Episodes</p>
                                    <p className="seasons__list__item__overview">{season.overview}</p>
                                    <Link href={paths.tv_season(String(series.id), String(season.season_number))}>
                                        Season {season.season_number}
                                    </Link>
                                </div>
                            </details>
                        </div>
                    })
                }
            </div>
        </div>
    );
};