"use client";

import { searchAction } from "@/formActions";
import { Locale } from "@/i18n/types";
import { SearchType } from "@/types";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

export const searchTypes: { type: SearchType }[] = [
    /*  { type: "collection" },
        { type: "company" },
        { type: "keyword" }, */
    { type: "movie" },
    /*  { type: "multi" }, */
    { type: "person" },
    /*  { type: "tv" }, */
];

export const Form = () => {

    const t = useTranslations("MovieSearch");

    const searchParams = useSearchParams();
    const params = useParams();

    const q = searchParams.get('query')?.toString() || "";
    const searchType = searchParams.get('type')?.toString() || "movie" as SearchType;
    const locale = params.locale as Locale;

    const [query, setQuery] = useState(decodeURI(q));

    return (
        <form action={searchAction} className="search__form">
            <div className="search__form__group__radio-input">
                {
                    searchTypes.map(({ type }) => {
                        return (
                            <div className="search__form__group" key={type}>
                                <div className="search__form__group__radio-input__option" tabIndex={0}>
                                    <input type="radio" name="searchType" id={`option-${type}`} value={type} defaultChecked={type === searchType} />
                                    <label htmlFor={`option-${type}`}>{type}</label>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className="search__form__group">
                <input
                    type="text"
                    name="query"
                    placeholder={t('placeholder')}
                    className="search__form__group__input"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    autoFocus
                />
                {
                    query.length > 0 &&
                    <button className="icon search__form__group__icon search__form__group__icon--clear"
                        type="button"
                        onClick={() => setQuery("")}>
                        <IconX size={20} />
                    </button>
                }
                <button className="icon search__form__group__icon"
                    disabled={query.length === 0}
                    type="submit">
                    <IconSearch />
                </button>
            </div>
            <input type="hidden" name="locale" value={locale} />
        </form>
    );
}