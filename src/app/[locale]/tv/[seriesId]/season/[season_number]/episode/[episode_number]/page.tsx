import { getTVSeriesEpisodeDetails } from "@/actions";
import { Locale } from "@/i18n/types";

export default async function Page({
    params,
}: {
    params: Promise<{ seriesId: string, season_number: string, episode_number: string, locale: Locale }>
}) {
    const { seriesId, season_number, episode_number, locale } = await params;

    const episode = await getTVSeriesEpisodeDetails(locale, seriesId, season_number, episode_number);

    console.log(episode);

    return (
        <div>{episode_number}</div>
    );
}