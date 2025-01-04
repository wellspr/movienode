import { getWatchProviders } from "@/actions";
import { Locale } from "@/i18n/types";

export const WatchProviders = async ({ locale, movieId }: { locale: Locale, movieId: string }) => {

    const results = await getWatchProviders(locale, movieId);

    console.log(results.results[locale.split('-')[1]]);

    return (
        <div className="watch-providers">
            <h2>Watch Providers</h2>
            <p>Watch providers coming soon...</p>
        </div>
    );
}