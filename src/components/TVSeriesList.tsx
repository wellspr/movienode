import { paths } from "@/config";
import { Locale } from "@/i18n/types";
import { TVSeriesType } from "@/types";
import { Poster } from "./Poster";

export const TVSeriesList = ({ results, locale }: { results: TVSeriesType[], locale: Locale }) => {
    return (
        <div className="movies__list">
            {
                results && results.map((tvSeries: TVSeriesType) => {
                    return (
                        <Poster
                            key={tvSeries.id}
                            locale={locale}
                            href={paths.tv(String(tvSeries.id))}
                            baseClassName="movies"
                            placeholder={tvSeries.name}
                            posterPath={tvSeries.poster_path}
                        />
                    );
                })
            }
        </div >
    );
};