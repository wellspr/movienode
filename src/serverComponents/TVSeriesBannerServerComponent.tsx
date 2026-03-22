import { getTVSeries } from "@/actions/content/tv_series";
import { Banner } from "@/components/TVSeries/Banner";
import { Locale } from "@/i18n/types";
import { TVSeriesCategoryType } from "@/types";

export const TVSeriesBannerServerComponent = async ({ locale, category }: { locale: Locale, category: TVSeriesCategoryType }) => {

    const data = await getTVSeries(locale, category);

    if (!data) return null;

    const { results } = data;

    return (
        <Banner results={results} category={category} />
    );
};