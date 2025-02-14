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

    const {
        results,
        total_pages
    } = category === "popular" ?
    await getPopularPeople(locale, page) :
    await getTrendingPeople(locale, page);

    return (
        <div className="people">
            <PeopleList results={results} locale={locale} />
            <MoviesListPagination locale={locale} page={page} total_pages={total_pages} />
        </div>
    );
}