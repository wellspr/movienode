import { searchMovie } from "@/actions";
import { Pagination, MovieResults } from "@/components/Search";
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

    const {
        results,
        total_pages,
    } = await searchMovie(locale, query, page);

    return (
        <>
            <MovieResults results={results} locale={locale} />
            <Pagination locale={locale} page={Number(page)} query={query} searchType="movie" totalPages={total_pages} />
        </>
    );
}