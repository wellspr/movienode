import { searchTVSeries } from "@/actions/content/search";
import { Pagination } from "@/components/Search";
import { TVSeriesResults } from "@/components/Search/Results";
import { Locale } from "@/i18n/types";

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ locale: Locale }>,
    searchParams: Promise<{ query: string, page: string }>
}) {

    const { locale } = await params;
    const query = (await searchParams).query;
    const page = (await searchParams).page || '1';

    const data = await searchTVSeries(locale, query, page);

    if (!data) {
        return (
            <>
                <TVSeriesResults results={[]} locale={locale} />
                <Pagination locale={locale} page={Number(page)} query={query} searchType="movie" totalPages={0} />
            </>
        );
    }

    const {
        results,
        total_pages,
    } = data;

    return (
        <>
            <TVSeriesResults results={results} locale={locale} />
            <Pagination locale={locale} page={Number(page)} query={query} searchType="movie" totalPages={total_pages} />
        </>
    );
}