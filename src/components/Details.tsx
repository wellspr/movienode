import { getMovieCredits, getMovieDetails } from "@/actions";
import { Movie } from "./Movie";
import { Locale } from "@/i18n/types";

export const Details = async ({ movieId, locale }: { movieId: string, locale: Locale }) => {

    const movie = await getMovieDetails(locale, movieId);

    const credits = await getMovieCredits(locale, movieId);
    
    return <Movie movie={{ ...movie, credits }} locale={locale} />;
};