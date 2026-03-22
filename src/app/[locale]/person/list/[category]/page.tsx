import { getPopularPeople, getTrendingPeople } from "@/actions/content/person";
import { MoviesListPagination } from "@/components/MoviesListPagination";
import { PeopleList } from "@/components/PeopleList";
import { Locale } from "@/i18n/types";
import { PeopleCategoryType } from "@/types";

export default async function Page({
    searchParams,
    params,
}: {
    searchParams: Promise<{ page: string }>,
    params: Promise<{ locale: Locale, category: PeopleCategoryType }>
}) {

    const page = (await searchParams).page || '1';
	const { locale, category } = await params;

    const data = category === "popular" ?
    await getPopularPeople(locale, page) :
    await getTrendingPeople(locale, page);

    if (!data) {
        return (
            <div className="people">
                <h2>No results</h2>
            </div>
        );
    }
    
    const {
        results,
        total_pages
    } = data;

    return (
        <div className="people">
            <PeopleList results={results} locale={locale} />
            <MoviesListPagination locale={locale} page={page} total_pages={total_pages} />
        </div>
    );
}