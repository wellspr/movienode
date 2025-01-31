import { getSimilarTVSeries, getTVSeriesCredits, getTVSeriesDetails, getTVSeriesRecommendations, getTVSeriesWatchProviders } from "@/actions";
import { TVSeries } from "@/components/TVSeries";
import { Locale } from "@/i18n/types";

export const TVSeriesServerComponent = async ({
    locale,
    seriesId,
}: {
    locale: Locale,
    seriesId: string
}) => {

    const series = await getTVSeriesDetails(locale, seriesId);
    
    const credits = await getTVSeriesCredits(locale, seriesId);
    
    const watchProviders = await getTVSeriesWatchProviders(locale, seriesId);

    const recommendations = await getTVSeriesRecommendations(locale, seriesId);
    
    const similar = await getSimilarTVSeries(locale, seriesId);
        
    /* 
    const releaseDates = await getReleaseDates(locale, seriesId);
    */
    return <TVSeries
        series={{
            ...series,
            credits,
            watch_providers: watchProviders,
            recommendations,
            similar,
            //release_dates: releaseDates,
        }}
        locale={locale}
    />;
};