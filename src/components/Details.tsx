import { getMovieCredits, getMovieDetails, getWatchProviders } from "@/actions";
import { Movie } from "./Movie";
import { Locale } from "@/i18n/types";

export const Details = async ({ movieId, locale }: { movieId: string, locale: Locale }) => {

    const movie = await getMovieDetails(locale, movieId);

    const credits = await getMovieCredits(locale, movieId);

    const watchProviders = await getWatchProviders(locale, movieId);
    
    return <Movie movie={{ ...movie, credits, watch_providers: watchProviders }} locale={locale} />;
};