"use client";

import { search } from "@/formActions";
import { Locale } from "@/i18n/types";
import { MovieGenresType, SearchResultsType } from "@/types";
import { IconSearch } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useActionState, useState } from "react";
import { Results } from "./Results";
import { GenresList } from "../Genres/GenresList";

export const Search = ({ locale, genres }: { locale: Locale, genres: MovieGenresType }) => {

    const t = useTranslations("MovieSearch");

    //const localizedSearch = search.bind(null, { locale, results: null });

    const initialValue: { locale: Locale, query: string, page: string, results: SearchResultsType | null } = { locale, query: "", page: '1', results: null };

    const [state, formAction, pending] = useActionState(search, initialValue);

    const [query, setQuery] = useState("");

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

            {/* <Genres genres={genres} formAction={formAction} setExternalQuery={setQuery} /> */}
            <GenresList genres={genres} locale={locale} />

            {pending && <p>Loading...</p>}

            <div className="search-results">
                {state.results && <Results results={state.results.results} />}

                <div className="search-results__pagination">
                    <form action={formAction}>
                        <input type="hidden" value={query} name="query" />
                        {
                            state.results && Number(state.results.page) > 1 &&
                            <>
                                <input type="hidden" value={String(Number(state.results.page) - 1)} name="page" />

                                <button type="submit">
                                    Previous
                                </button>
                            </>
                        }
                    </form>
                    <div>
                        {
                            state.results && state.results.results.length > 0 &&
                            <p>page {state.results.page}</p>
                        }
                    </div>
                    <form action={formAction}>
                        <input type="hidden" value={query} name="query" />
                        {
                            state.results && Number(state.results.page) < Number(state.results.total_pages) &&
                            <>
                                <input type="hidden" value={String(Number(state.results.page) + 1)} name="page" />

                                <button type="submit">
                                    Next
                                </button>
                            </>
                        }
                    </form>
                </div>
            </div>

        </div>
    );
};



/* 
const Genres = ({
    genres,
    formAction,
    setExternalQuery,
}: {
    genres: MovieGenresType,
    formAction: (payload: FormData) => void
    setExternalQuery: React.Dispatch<React.SetStateAction<string>>
}) => {

    const { containerRef, scrollLeft, scrollRight, isOverflown } = useScroll({ wheelScroll: true });

    const [query, setQuery] = useState<string>("");

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const form = formRef.current;

        setExternalQuery(query);

        if (form) {
            form.requestSubmit();
        }
    }, [query, setExternalQuery]);

    return (
        <div className="genres">
            {
                isOverflown &&
                <button className="icon genres__icon genres__icon--left"
                    onClick={scrollLeft}>
                    <IconChevronLeft />
                </button>
            }
            <form action={formAction} ref={formRef}
                className="genres__list__form-wrapper">
                <input type="hidden" value={query} name="query" />
                <ul className="genres__list" ref={containerRef}>
                    {
                        genres.map(genre => {
                            return (
                                <li key={genre.id}
                                    onClick={() => setQuery(genre.name)}
                                    onMouseOver={() => console.log(genre)}
                                    className="genres__list__item pillbox">
                                    {genre.name}
                                </li>
                            );
                        })
                    }
                </ul>
            </form>
            {
                isOverflown &&
                <button className="icon genres__icon genres__icon--right"
                    onClick={scrollRight}>
                    <IconChevronRight />
                </button>
            }
        </div>
    );
}; */