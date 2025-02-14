import { getTVSeriesDetails } from "@/actions/content/tv_series";
import { DetailsImages } from "@/components/DetailsImages";
import { Locale } from "@/i18n/types";

export default async function Page({
    params
}: {
    params: Promise<{ seriesId: string, locale: Locale }>
}) {

    const { seriesId, locale } = await params;

    const tvSeries = await getTVSeriesDetails(locale, seriesId);

    if (!tvSeries.images) return null;

    return <DetailsImages images={tvSeries.images} />;
}