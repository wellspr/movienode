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

	const data = category === "trending" ?
	await getTrendingTVSeries(locale, page) :
	await getTVSeries(locale, category, page);

	if (!data) {
		return (
			<div className="tv">
				<h2>No results</h2>
			</div>
		);
	}

	const {
		results,
		total_pages,
	} = data;

	return (
		<div className="tv">
			<TVSeriesList results={results} locale={locale} />
			<MoviesListPagination page={page} total_pages={total_pages} locale={locale} />
		</div>
	);
}