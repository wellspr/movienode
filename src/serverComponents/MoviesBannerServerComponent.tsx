import { getMovies } from "@/actions";
import { Banner } from "@/components/Movie/Banner";
import { Locale } from "@/i18n/types";
import { MovieCategoryType } from "@/types";

export const MoviesBannerServerComponent = async ({ locale, category }: { locale: Locale, category: MovieCategoryType }) => {

    const { results } = await getMovies(locale, category);

    return (
        <Banner results={results} category={category} />
    );
};