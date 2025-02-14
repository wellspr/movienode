import { getMovieCredits, getMovieDetails, getMovieRecommendations, getReleaseDates, getSimilarMovies, getWatchProviders } from "@/actions/content/movies";
import { Movie } from "@/components/Movie";
import { Locale } from "@/i18n/types";

export const MovieServerComponent = async ({
    locale,
    movieId,
}: {
    locale: Locale,
    movieId: string
}) => {

    const movie = await getMovieDetails(locale, movieId);

    const credits = await getMovieCredits(locale, movieId);

    const watchProviders = await getWatchProviders(locale, movieId);

    const recommendations = await getMovieRecommendations(locale, movieId);

    const similar = await getSimilarMovies(locale, movieId);

    const releaseDates = await getReleaseDates(locale, movieId);

    return <Movie
        movie={{
            ...movie,
            credits,
            watch_providers: watchProviders,
            recommendations,
            similar,
            release_dates: releaseDates,
        }}
        locale={locale}
    />;
};