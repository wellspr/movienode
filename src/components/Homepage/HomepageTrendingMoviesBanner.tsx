import { getTrendingMovies } from "@/actions";
import { Locale } from "@/i18n/types";
import { MovieList } from "./MovieList";

export const HomepageTrendingMoviesBanner = async ({locale}: {locale: Locale}) => {

    const {results} = await getTrendingMovies(locale, '1');

    return <MovieList category="trending" results={results} />
}