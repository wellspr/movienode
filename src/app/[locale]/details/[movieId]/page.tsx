import { Details } from "@/components/Details";
import { Locale } from "@/i18n/types";

export default async function Page({
    params
}: {
    params: Promise<{ movieId: string, locale: Locale }>
}) {
    const { movieId, locale } = await params;
    
    return <Details movieId={movieId} locale={locale} />;
}