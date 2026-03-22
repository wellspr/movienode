import { searchPerson } from "@/actions/content/search";
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

    const data = await searchPerson(locale, query, page);

    if (!data) {
        return (
            <>
                <PersonResults results={[]} locale={locale} />
                <Pagination locale={locale} page={Number(page)} query={query} searchType="person" totalPages={0} />
            </>
        );
    }

    const {
        results,
        total_pages,
    } = data;

    return (
        <>
            <PersonResults results={results} locale={locale} />
            <Pagination locale={locale} page={Number(page)} query={query} searchType="person" totalPages={total_pages} />
        </>
    );
}