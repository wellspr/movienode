import { getTVSeries } from "@/actions/content/tv_series";
import { Banner } from "@/components/TVSeries/Banner";
import { Locale } from "@/i18n/types";
import { TVSeriesCategoryType } from "@/types";

export const TVSeriesBannerServerComponent = async ({ locale, category }: { locale: Locale, category: TVSeriesCategoryType }) => {

    const { results } = await getTVSeries(locale, category);

    return (
        <Banner results={results} category={category} />
    );
};