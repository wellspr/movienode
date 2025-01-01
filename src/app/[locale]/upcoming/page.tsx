import { getMovies } from "@/actions";
import { MoviesList } from "@/components/MoviesList";
import { MoviesListPagination } from "@/components/MoviesListPagination";
import { Locale } from "@/i18n/types";

export default async function Page({
	searchParams,
	params,
}: {
	searchParams: Promise<{ page: string }>,
	params: Promise<{ locale: Locale }>
}) {

	const page = (await searchParams).page || '1';
	const { locale } = await params;

	const {
		results,
		total_pages,
		//total_results 
	} = await getMovies(locale, "upcoming", page);

	return (
		<div className="movies">
			<MoviesList results={results} locale={locale} />
			<MoviesListPagination page={page} total_pages={total_pages} category="upcoming" locale={locale} />
		</div>
	);
}
