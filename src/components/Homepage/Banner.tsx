import { getMovies, getTrendingMovies } from "@/actions/content/movies";
import { Locale } from "@/i18n/types";
import { MovieList } from "./MovieList";
import { BannerType, MovieCategoryType, PeopleCategoryType, TVSeriesCategoryType } from "@/types";
import { getSession } from "@/actions/session";
import { favoriteMovies, favoriteTVShows, recommendedMovies, recommendedTVShows, watchlistMovies, watchlistTVShows } from "@/actions/user/lists";
import { TVSeriesList } from "./TVSeriesList";
import { getTrendingTVSeries, getTVSeries } from "@/actions/content/tv_series";
import { getPopularPeople, getTrendingPeople } from "@/actions/content/person";
import { PeopleList } from "./PeopleList";

export const HomepageBanner = async ({
    locale,
    banner_type,
    movieCategory,
    peopleCategory,
    tvSeriesCategory
}: {
    locale: Locale
    banner_type: BannerType
    movieCategory?: MovieCategoryType
    peopleCategory?: PeopleCategoryType
    tvSeriesCategory?: TVSeriesCategoryType
}) => {

    if (banner_type === 'movie' && movieCategory !== undefined) {
        const category = movieCategory;

        if (category === 'recommendations') {
            const session = await getSession();
            if (!session) return null;
            const { accountId } = session;
            const { results } = await recommendedMovies(accountId, locale);
            if (!results) return null;
            return <MovieList results={results} category={category} />;
        } else if (category === 'favorites') {
            const session = await getSession();
            if (!session) return null;
            const { accountId } = session;
            const { results } = await favoriteMovies(accountId, locale);
            if (!results || results.length === 0) return null;
            return <MovieList category={category} results={results} />
        } else if (category === 'watchlist') {
            const session = await getSession();
            if (!session) return null;
            const { accountId } = session; const { results } = await watchlistMovies(accountId, locale);
            if (!results || results.length === 0) return null;
            return <MovieList category={category} results={results} />
        } else if (category === 'trending') {
            const { results } = await getTrendingMovies(locale, '1');
            return <MovieList category={category} results={results} />
        } else {
            const { results } = await getMovies(locale, category);
            return <MovieList results={results} category={category} />;
        }
    }

    if (banner_type === 'tv' && tvSeriesCategory !== undefined) {
        const category = tvSeriesCategory;

        if (category === 'recommendations') {
            const session = await getSession();
            if (!session) return null;
            const { accountId } = session; const { results } = await recommendedTVShows(accountId, locale);
            if (!results) return null;
            return <TVSeriesList results={results} category={category} />;
        } else if (category === 'favorites') {
            const session = await getSession();
            if (!session) return null;
            const { accountId } = session;
            const { results } = await favoriteTVShows(accountId, locale);
            if (!results || results.length === 0) return null;
            return <TVSeriesList category={category} results={results} />
        } else if (category === 'watchlist') {
            const session = await getSession();
            if (!session) return null;
            const { accountId } = session;
            const { results } = await watchlistTVShows(accountId, locale);
            if (!results || results.length === 0) return null;
            return <TVSeriesList category={category} results={results} />
        } else if (category === 'trending') {
            const { results } = await getTrendingTVSeries(locale, '1');
            return <TVSeriesList category={category} results={results} />
        } else {
            const { results } = await getTVSeries(locale, category);
            return <TVSeriesList results={results} category={category} />
        }
    }

    if (banner_type === 'person' && peopleCategory !== undefined) {
        const category = peopleCategory;

        if (category === "trending") {
            const { results } = await getTrendingPeople(locale, '1');
            return <PeopleList category={category} results={results} />
        } else {
            const { results } = await getPopularPeople(locale, '1');
            return <PeopleList results={results} category={category} />
        }
    }

    return null;
}