import { getTrendingTVSeries } from "@/actions";
import { Locale } from "@/i18n/types";
import { TVSeriesList } from "./TVSeriesList";

export const HomepageTrendingTVSeriesBanner = async ({ locale }: { locale: Locale }) => {

    const { results } = await getTrendingTVSeries(locale, '1');

    return <TVSeriesList category="trending" results={results} />
}