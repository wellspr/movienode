import { getMovies } from "@/actions";
import { Locale } from "@/i18n/types";
import { MovieCategoryType } from "@/types";
import { MovieList } from "./MovieList";

export const HomepageMovieBanner = async ({ locale, category }: { locale: Locale, category: MovieCategoryType }) => {

    const { results } = await getMovies(locale, category);

    return <MovieList results={results} category={category} />;
};