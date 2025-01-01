import { getMovieDetails } from "@/actions";
import { MovieDetails } from "./MovieDetails";
import { Locale } from "@/i18n/types";

export const Details = async ({ movieId, locale }: { movieId: string, locale: Locale }) => {

    const movie = await getMovieDetails(locale, movieId);
    
    return <MovieDetails movie={movie} locale={locale} />;
};