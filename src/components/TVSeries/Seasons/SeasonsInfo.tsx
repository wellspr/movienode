import { TVSeriesDetailsType } from "@/types";
import { useTranslations } from "next-intl";

export const SeasonsInfo = ({ series }: { series: TVSeriesDetailsType }) => {

    const t = useTranslations('Series.Seasons.info');

    if (!series.seasons) return null;

    return (
        <div>
            {series.seasons.length} {" "}
            {t('seasons', {count: series.seasons.length})}.
            {
                series.seasons.map(season => {
                    return <div key={season.id}>
                        {/* {season.episode_count} {" "}
                        {t('episodes', { count: season.episode_count })} {", "} */}
                    </div>
                })
            }
        </div>
    );
};