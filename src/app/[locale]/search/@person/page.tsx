import { searchPerson } from "@/actions";
import { Pagination, PersonResults } from "@/components/Search";
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
        total_results,
    } = await searchPerson(locale, query, page);

    console.log(query, results, total_pages, total_results);

    return (
        <>
            <PersonResults results={results} />
            <Pagination locale={locale} page={Number(page)} query={query} searchType="person" totalPages={total_pages} />
        </>
    );
}