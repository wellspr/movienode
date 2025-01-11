"use client";

import { Link, usePathname } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { useTranslations } from "next-intl";

export const MoviesListPagination = ({
    page,
    total_pages,
    locale,
}: {
    page: string,
    total_pages: number,
    locale: Locale
}) => {

    const t = useTranslations("Movies.ListPagination");

    const path = usePathname();

    console.log(path);

    return (
        <div className="movies__list__pagination">
            {
                Number(page) > 1 &&
                <Link locale={locale} href={`/${path}?page=${Number(page) - 1}`}>{t('previous')}</Link>
            }
            {
                Number(page) < total_pages &&
                <Link locale={locale} href={`/${path}?page=${Number(page) + 1}`}>{t('next')}</Link>
            }
        </div>
    );
}