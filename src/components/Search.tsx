"use client";

import { baseImageUrl } from "@/config";
import { search } from "@/formActions";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { IconSearch } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useActionState, useState } from "react";

export const Search = ({ locale }: { locale: Locale }) => {

    const t = useTranslations("Search");

    //const localizedSearch = search.bind(null, { locale, results: null });

    const [state, formAction, pending] = useActionState(search, { locale, query: "", results: null });

    const [query, setQuery] = useState(state.query);

    console.log(state, pending);

    const renderResults = () => {
        if (!state.results) return null;

        const { results } = state.results;

        return results.map((result) => {
            return (
                <li key={result.id} className="search-results__list__item">
                    <Link href={`/details/${result.id}`}>
                        <div className="movie-poster">
                            <Image src={baseImageUrl() + result.poster_path} alt={result.title} width={200} height={300} />
                        </div>
                        <div className="movie-info">
                            <h3>{result.title} {result.release_date.split('-')[0]} </h3>
                            {/* <p>{result.overview}</p> */}
                        </div>
                    </Link>
                </li>
            );
        });
    };

    return (
        <div className="search">
            <form action={formAction} className="search__form">
                <div className="search__form__group">
                    <input
                        type="text"
                        name="query"
                        placeholder={t('placeholder')}
                        className="search__form__group__input"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <button className="icon search__form__group__icon"
                        disabled={query.length === 0}
                        type="submit">
                        <IconSearch />
                    </button>
                </div>
            </form>

            {
                pending &&
                <p>Loading...</p>
            }
            <div className="search-results">
                <ul className="search-results__list">
                    {

                        renderResults()
                    }
                </ul>
            </div>
        </div>
    );
}