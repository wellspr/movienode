import { recommendedMovies } from "@/actions/lists";
import { getSession } from "@/actions/session";
import { Locale } from "@/i18n/types";

export default async function Page({ params }: { params: Promise<{ locale: Locale, page?: string }> }) {

    const session = await getSession();

    const { locale, page } = await params;

    if (session) {

        const { accountId } = session;

        const { results, total_pages } = await recommendedMovies(accountId, locale, page || '1');

        console.log("Recommendations: ", results, total_pages);

        return (
            <div className="user-recommendations">
                Recommendations
            </div>
        );
    }
}