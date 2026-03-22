import { getMovies } from "@/actions/content/movies";
import { Banner } from "@/components/Movie/Banner";
import { Locale } from "@/i18n/types";
import { MovieCategoryType } from "@/types";

export const MoviesBannerServerComponent = async ({ locale, category }: { locale: Locale, category: MovieCategoryType }) => {

    const data = await getMovies(locale, category);

    if (!data) return null;
    
    const { results } = data;

    return (
        <Banner results={results} category={category} />
    );
};