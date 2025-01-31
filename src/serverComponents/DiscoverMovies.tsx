import { discoverMovie } from "@/actions";
import { Locale } from "@/i18n/types";
import { FilteringType } from "@/types";

export const DiscoverMovies = async ({locale}: {locale: Locale}) => {

    const queryList: FilteringType = {
        language: "pt-BR",
        with_watch_providers: 'netflix',
        primary_release_year: 2025,
    };

    const results = await discoverMovie(locale, queryList, '1');

    console.log(results)

    return (
        <div></div>
    );
};