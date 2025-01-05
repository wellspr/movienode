import { Similar } from "@/components/Movie/Similar";
import { Locale } from "@/i18n/types";

export default async function Page({
    params
}: {
    params: Promise<{ movieId: string, locale: Locale }>
}) {
    const { movieId, locale } = await params;
    
    return <Similar movieId={movieId} locale={locale} />;
}