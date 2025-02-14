import { getMovies, getTrendingMovies } from "@/actions/content/movies";
import { MoviesList } from "@/components/MoviesList";
import { MoviesListPagination } from "@/components/MoviesListPagination";
import { Locale } from "@/i18n/types";
import { MovieCategoryType } from "@/types";

export default async function Page({
	searchParams,
	params,
}: {
	searchParams: Promise<{ page: string }>,
	params: Promise<{ locale: Locale, category: MovieCategoryType }>
}) {

	const page = (await searchParams).page || '1';
	const { locale, category } = await params;

	const {
		results,
		total_pages,
	} = category === "trending" ? 
	await getTrendingMovies(locale, page) :
	await getMovies(locale, category, page);

	return (
		<div className="movies">
			<MoviesList results={results} locale={locale} />
			<MoviesListPagination page={page} total_pages={total_pages} locale={locale} />
		</div>
	);
}