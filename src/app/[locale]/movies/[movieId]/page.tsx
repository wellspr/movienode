import { Locale } from "@/i18n/types";
import { MovieServerComponent } from "@/serverComponents/MovieServerComponent";

export default async function Page({
    params,
}: {
    params: Promise<{ movieId: string, locale: Locale }>
}) {
    const { movieId, locale } = await params;

    return <MovieServerComponent locale={locale} movieId={movieId} />
}