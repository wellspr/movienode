import { getTVSeriesGenreList } from "@/actions";
import { TVSeriesGenresList } from "@/components/Genres/TVSeriesGenresList";
import { Locale } from "@/i18n/types";
import { TVSeriesBannerServerComponent } from "@/serverComponents/TVSeriesBannerServerComponent";

export default async function Page({
    params
}: {
    params: Promise<{ locale: Locale }>
}) {

    const { locale } = await params;
    const genres = await getTVSeriesGenreList(locale);

    return (
        <div className="tv">
            {/* <h2>TV Series</h2> */}

            <div className="tv__genres-list">
                <TVSeriesGenresList genres={genres} locale={locale} />
            </div>

            <TVSeriesBannerServerComponent locale={locale} category="popular" />
            <TVSeriesBannerServerComponent locale={locale} category="on_the_air" />
            <TVSeriesBannerServerComponent locale={locale} category="top_rated" />
            <TVSeriesBannerServerComponent locale={locale} category="airing_today" />
        </div>
    );
}