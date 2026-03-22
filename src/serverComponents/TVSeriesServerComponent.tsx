import { getSimilarTVSeries, getTVSeriesCredits, getTVSeriesDetails, getTVSeriesRecommendations, getTVSeriesWatchProviders } from "@/actions/content/tv_series";
import { TVSeries } from "@/components/TVSeries";
import { Locale } from "@/i18n/types";
import { TVSeriesDetailsType } from "@/types";

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

    const seriesData = { ...series as TVSeriesDetailsType };

    if (credits) seriesData.credits = credits;
    if (watchProviders) seriesData.watch_providers = watchProviders;
    if (recommendations) seriesData.recommendations = recommendations;
    if (similar) seriesData.similar = similar;
    //if (releaseDates) seriesData.release_dates = releaseDates;
    
    return <TVSeries
        series={seriesData}
        locale={locale}
    />;
};