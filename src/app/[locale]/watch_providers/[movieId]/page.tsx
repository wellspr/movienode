import { WatchProviders } from "@/components/Movie/WatchProviders";
import { Locale } from "@/i18n/types";

export default async function Page({
    params
}: {
    params: Promise<{ movieId: string, locale: Locale }>
}) {
    const { movieId, locale } = await params;
    
    return <WatchProviders movieId={movieId} locale={locale} />;
}