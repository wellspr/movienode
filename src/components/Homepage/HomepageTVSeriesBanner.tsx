import { getTVSeries } from "@/actions";
import { Locale } from "@/i18n/types";
import { TVSeriesCategoryType } from "@/types";
import { TVSeriesList } from "./TVSeriesList";

export const HomepageTVSeriesBanner = async ({ locale, category }: { locale: Locale, category: TVSeriesCategoryType }) => {

    const { results } = await getTVSeries(locale, category);

    return <TVSeriesList results={results} category={category} />
};