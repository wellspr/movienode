import { getTVSeriesDetails, getTVSeriesSeasonDetails } from "@/actions";
import { baseImageUrl, paths } from "@/config";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { IconChevronLeft, IconClock } from "@tabler/icons-react";
import Image from "next/image";

export default async function Page({
    params,
}: {
    params: Promise<{ seriesId: string, season_number: string, locale: Locale }>
}) {
    const { seriesId, season_number, locale } = await params;

    const series = await getTVSeriesDetails(locale, seriesId);
    const season = await getTVSeriesSeasonDetails(locale, seriesId, season_number);

    console.log(season);
    
    return (
        <div className="season">
            <h2 className="season__series-name">
                <Link href={paths.tv(seriesId)}>
                    <IconChevronLeft size={30}/>
                    {series.name}
                </Link>
            </h2>

            <h3 className="season__name">{season.name}</h3>

            <div className="season__episodes">{
                season.episodes.map(episode => {
                    return (
                        <div key={episode.id} className="season__episodes__list">
                            <div className="season__episodes__list__episode-number">
                                Episode {episode.episode_number}
                            </div>
                            <div className="season__episodes__list__main">
                                <div className="season__episodes__list__image">
                                    <Image
                                        src={baseImageUrl() + episode.still_path}
                                        alt={episode.name}
                                        fill
                                    />
                                </div>
                                <div className="season__episodes__list__info">
                                    <div className="season__episodes__list__episode-name">
                                        {episode.name}
                                    </div>
                                    <p className="season__episodes__list__episode-overview">
                                        {episode.overview}
                                    </p>
                                    <div className="season__episodes__list__episode-runtime">
                                        <IconClock size={16} />
                                        {episode.runtime}
                                        {"min"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}