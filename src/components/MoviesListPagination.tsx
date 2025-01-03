import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { Category } from "@/types";
import { useTranslations } from "next-intl";

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

    const t = useTranslations("MoviesListPagination");

    return (
        <div className="movies__list__pagination">
            {
                Number(page) > 1 &&
                (
                    category ?
                        <Link locale={locale} href={`/${category}?page=${Number(page) - 1}`}>{t('previous')}</Link> :
                        <Link locale={locale} href={`/?page=${Number(page) - 1}`}>{t('previous')}</Link>
                )
            }
            {
                Number(page) < total_pages &&
                (
                    category ?
                        <Link locale={locale} href={`/${category}?page=${Number(page) + 1}`}>{t('next')}</Link> :
                        <Link locale={locale} href={`/?page=${Number(page) + 1}`}>{t('next')}</Link>
                )
            }
        </div>
    );
}