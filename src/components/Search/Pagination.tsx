import { searchAction } from "@/formActions";
import { Locale } from "@/i18n/types";
import { SearchType } from "@/types";

export const Pagination = ({
    query,
    page,
    totalPages,
    searchType,
    locale
}: {
    query: string,
    page: number,
    totalPages: number,
    searchType: SearchType,
    locale: Locale,
}) => {

    console.log("Data: ", query, page, totalPages, searchType, locale);
    return (
        <div className="search-pagination">
            {
                page > 1 &&
                <PageLink label="Previous" locale={locale} page={page - 1} query={query} searchType={searchType} />
            }

            {
                <div>Page: {page} / {totalPages}</div>
            }

            {
                page < totalPages &&
                <PageLink label="Next" locale={locale} page={page + 1} query={query} searchType={searchType} />
            }
        </div>
    );
};

const PageLink = ({
    query,
    page,
    searchType,
    locale,
    label,
}: {
    query: string,
    page: number,
    searchType: SearchType,
    locale: Locale,
    label: string
}) => {
    return (
        <form action={searchAction}>
            <input type="hidden" name="query" value={query} />
            <input type="hidden" name="page" value={page} />
            <input type="hidden" name="searchType" value={searchType} />
            <input type="hidden" name="locale" value={locale} />
            <button type="submit" className="button" >{label}</button>
        </form>
    );
}