import { Locale } from "@/i18n/types";
import { TVSeriesServerComponent } from "@/serverComponents/TVSeriesServerComponent";

export default async function Page({
    params,
}: {
    params: Promise<{ seriesId: string, locale: Locale }>
}) {
    const { seriesId, locale } = await params;

    return <TVSeriesServerComponent locale={locale} seriesId={seriesId} />
}