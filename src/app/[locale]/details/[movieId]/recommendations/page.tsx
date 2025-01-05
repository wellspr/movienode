import { Recommendations } from "@/components/Movie/Recommendations";
import { Locale } from "@/i18n/types";

export default async function Page({
    params
}: {
    params: Promise<{ movieId: string, locale: Locale }>
}) {
    const { movieId, locale } = await params;
    
    return <Recommendations movieId={movieId} locale={locale} />;
}