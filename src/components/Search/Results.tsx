import { paths } from "@/config";
import { Locale } from "@/i18n/types";
import { MovieType, PersonDetailsType, TVSeriesType } from "@/types";
import { Poster } from "../Poster";
import { Profile } from "../Profile";

export const MovieResults = ({ results, locale }: { results: MovieType[], locale: Locale }) => {
    return (
        <ul className="search-results__list">
            {
                results.map((result) => {
                    return (

                        <Poster
                            key={result.id}
                            baseClassName="search-results"
                            href={paths.movies(String(result.id))}
                            locale={locale}
                            placeholder={result.title}
                            posterPath={result.poster_path}
                        />
                    );
                })
            }
        </ul>
    );
};

export const TVSeriesResults = ({ results, locale }: { results: TVSeriesType[], locale: Locale }) => {
    return (
        <ul className="search-results__list">
            {
                results.map((result) => {
                    return (
                        <Poster
                            key={result.id}
                            baseClassName="search-results"
                            href={paths.tv(String(result.id))}
                            locale={locale}
                            placeholder={result.name}
                            posterPath={result.poster_path}
                        />
                    );
                })
            }
        </ul>
    );
};


export const PersonResults = ({ results, locale }: { results: PersonDetailsType[], locale: Locale }) => {
    return (
        <ul className="person-results__list">
            {
                results.map((result) => {
                    return (

                        <Profile
                            key={result.id}
                            baseClassName="person-results"
                            href={paths.person(String(result.id))}
                            locale={locale}
                            result={result}
                        />
                    );
                })
            }
        </ul>
    );
};