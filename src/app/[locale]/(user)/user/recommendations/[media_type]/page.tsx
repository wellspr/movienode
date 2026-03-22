import { recommendedMovies, recommendedTVShows } from "@/actions/user/lists";
import { getSession } from "@/actions/session";
import { Locale } from "@/i18n/types";
import { MoviesList } from "@/components/MoviesList";
import { TVSeriesList } from "@/components/TVSeriesList";
import { MoviesListPagination } from "@/components/MoviesListPagination";
import { NoSession } from "@/app/[locale]/(auth)/components/NoSession";

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ locale: Locale; media_type: string }>;
    searchParams: Promise<{ page: string }>;
}) {
    const session = await getSession();

    const page = (await searchParams).page || "1";
    const { locale, media_type } = await params;

    if (session) {
        const { accountId } = session;

        if (media_type === "movie") {
            const data = await recommendedMovies(locale, page || "1");

            if (!data) {
                return (
                    <div className="user-recommendations">
                        <h2>No recommendations yet</h2>
                    </div>
                );
            }

            const { results, total_pages } = data;

            return (
                <div className="user-recommendations">
                    <MoviesList locale={locale} results={results} />
                    <MoviesListPagination
                        page={page}
                        total_pages={total_pages}
                        locale={locale}
                    />
                </div>
            );
        }

        if (media_type === "tv") {

            const data = await recommendedTVShows(
                accountId,
                locale,
                page || "1",
            );

            if (!data) {
                return (
                    <div className="user-recommendations">
                        <h2>No recommendations yet</h2>
                    </div>
                );
            }

            const { results, total_pages } = data;

            return (
                <div className="user-recommendations">
                    <TVSeriesList locale={locale} results={results} />
                    <MoviesListPagination
                        page={page}
                        total_pages={total_pages}
                        locale={locale}
                    />
                </div>
            );
        }
    } else {
        return <NoSession />;
    }
}
