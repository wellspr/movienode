import { getMovieCredits, getMovieDetails, getMovieRecommendations, getReleaseDates, getSimilarMovies, getWatchProviders } from "@/actions/content/movies";
import { Movie } from "@/components/Movie";
import { Locale } from "@/i18n/types";
import { MovieDetailsType } from "@/types";

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


    const movieData = {...movie as MovieDetailsType}

    if (credits) movieData.credits = credits;
    if (watchProviders) movieData.watch_providers = watchProviders;
    if (recommendations) movieData.recommendations = recommendations;
    if (similar) movieData.similar = similar;
    if (releaseDates) movieData.release_dates = releaseDates;
        
    return <Movie
        movie={movieData}
        locale={locale}
    />;
};