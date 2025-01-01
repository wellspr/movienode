import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { Category } from "@/types";

export const MoviesListPagination = ({
    page,
    total_pages,
    category,
    locale,
}: {
    page: string,
    total_pages: number,
    category?: Category,
    locale: Locale
}) => {
    return (
        <div className="movies__list__pagination">
            {
                Number(page) > 1 &&
                (
                    category ?
                        <Link locale={locale} href={`/${category}?page=${Number(page) - 1}`}>Previous</Link> :
                        <Link locale={locale} href={`/?page=${Number(page) - 1}`}>Previous</Link>
                )
            }
            {
                Number(page) < total_pages &&
                (
                    category ?
                        <Link locale={locale} href={`/${category}?page=${Number(page) + 1}`}>Next</Link> :
                        <Link locale={locale} href={`/?page=${Number(page) + 1}`}>Next</Link>
                )
            }
        </div>
    );
}