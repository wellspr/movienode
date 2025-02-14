import { getTrendingTVSeries, getTVSeries } from "@/actions/content/tv_series";
import { MoviesListPagination } from "@/components/MoviesListPagination";
import { TVSeriesList } from "@/components/TVSeriesList";
import { Locale } from "@/i18n/types";
import { TVSeriesCategoryType } from "@/types";

export default async function Page({
	searchParams,
	params,
}: {
	searchParams: Promise<{ page: string }>,
	params: Promise<{ locale: Locale, category: TVSeriesCategoryType }>
}) {

	const page = (await searchParams).page || '1';
	const { locale, category } = await params;

	const {
		results,
		total_pages,
	} = category === "trending" ?
	await getTrendingTVSeries(locale, page) :
	await getTVSeries(locale, category, page);

	return (
		<div className="tv">
			<TVSeriesList results={results} locale={locale} />
			<MoviesListPagination page={page} total_pages={total_pages} locale={locale} />
		</div>
	);
}