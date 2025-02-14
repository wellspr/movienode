import { getMovieDetails } from "@/actions/content/movies";
import { DetailsImages } from "@/components/DetailsImages";
import { Locale } from "@/i18n/types";

export default async function Page({
    params
}: {
    params: Promise<{ movieId: string, locale: Locale }>
}) {

    const { movieId, locale } = await params;

    const movie = await getMovieDetails(locale, movieId);

    if (!movie.images) return null;

    return <DetailsImages images={movie.images} />;
}